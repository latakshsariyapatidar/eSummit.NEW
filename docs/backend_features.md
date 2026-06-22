# E-Summit Backend Features — Complete Reference

> This document catalogs **every backend API endpoint, data model, and server-side feature** required to support the E-Summit website. Derived from all frontend API calls, data flows, and admin operations in the existing codebase. Use this as the definitive specification for building the new backend from scratch.

---

## 1. API Base URL

- **Production**: `https://iic.iitdh.ac.in/api`
- All endpoints listed below are relative to this base.

---

## 2. Authentication System

### 2.1 Admin Key Verification

**Endpoint**: `POST /admin/verify-key`

**Purpose**: Authenticates admin users to access the admin dashboard.

**Request**:

```json
{
  "admin_key": "string"
}
```

**Headers**:

```
Content-Type: application/json
```

**Success Response** (expected by frontend):

```json
{
  "status": "success"
}
```

**Error Response**:

```json
{
  "status": "error",
  "message": "Invalid admin key"
}
```

**Backend Implementation Requirements**:

- Store admin key(s) securely (environment variable or hashed in database)
- Support multiple admin keys if needed (for different admin roles)
- Rate-limit login attempts to prevent brute force attacks
- Log authentication attempts for audit trail
- Timeout: Frontend expects response within 10 seconds

---

## 3. Order Management System

### 3.1 Submit Order

**Endpoint**: `POST /order/submit`

**Purpose**: Creates a new order when a user purchases passes or merchandise.

**Request**:

```json
{
  "phone": "string (10 digits)",
  "email": "string (valid email)",
  "gender": "string (male/female)",
  "order_type": "string (pass/merch)",
  "items": ["string array — item descriptions"],
  "payment_utr": "string (Unique Transaction Reference)",
  "payment_screenshot": "string (base64 encoded image)",
  "showPassDetails": true,
  "pass_details": [
    {
      "passType": "string (e.g. '1 Day Visitor Pass')",
      "passPrice": "number (e.g. 100)",
      "attendeeName": "string",
      "attendeeEmail": "string (valid email)",
      "attendeeGender": "string (male/female)",
      "collegeName": "string"
    }
  ]
}
```

**Headers**:

```
Content-Type: application/json
```

**Success Response** (HTTP 201):

```json
{
  "status": "success",
  "order_id": "number or string"
}
```

**Error Response**:

```json
{
  "status": "error",
  "message": "string describing the error"
}
```

**Backend Implementation Requirements**:

- **User creation/lookup**: Create or find user by phone/email
- **Order creation**: Save order with status `pending`
- **Payment screenshot storage**: Decode base64 image and save to file system (in `screenshots/` directory)
- **Pass creation**: For each pass_detail, create individual pass records linked to the order
- **Pass ID generation**: Generate unique pass IDs server-side (do NOT rely on frontend-generated IDs)
- **Validation**:
  - Required fields: phone, email, gender, order_type, items, payment_utr, payment_screenshot
  - Email format validation
  - Phone number format validation (10 digits)
  - Maximum 5 passes per order (DoS protection)
  - Duplicate UTR detection
- **Email notification**: Send confirmation email to buyer with order details
- **Timeout**: Frontend expects response within 30 seconds

---

### 3.2 Check Order Status

**Endpoint**: `GET /order/status?phone={phone}`

**Purpose**: Allows users to look up their orders by phone number.

**Query Parameters**:

- `phone` (required): 10-digit phone number

**Success Response** (HTTP 200):

```json
{
  "status": "success",
  "data": [
    {
      "ID": "number",
      "Status": "string (pending/verified/rejected)",
      "OrderType": "string (pass/merch)",
      "PaymentUTR": "string",
      "Items": ["string array"],
      "CreatedAt": "ISO 8601 datetime string",
      "UpdatedAt": "ISO 8601 datetime string"
    }
  ]
}
```

**Not Found Response** (HTTP 404):

```json
{
  "status": "error",
  "message": "No orders found for this phone number"
}
```

**Backend Implementation Requirements**:

- Look up user by phone number
- Return all orders for that user
- Include order items as array
- Return proper date formatting (ISO 8601)
- Timeout: Frontend expects response within 25 seconds

---

## 4. Admin API Endpoints

> **All admin endpoints require the `X-Admin-Key` header for authentication.**

### Common Admin Headers

```
X-Admin-Key: {admin_key_string}
Content-Type: application/json
```

### Admin Authentication Middleware

- Validate `X-Admin-Key` header on every admin request
- Return 401/403 if key is invalid or missing
- Log all admin actions for audit trail

---

### 4.1 Get Full Database State

**Endpoint**: `GET /admin/db-state`

**Purpose**: Returns all orders and users for the admin dashboard (analytics, order management, user management).

**Headers**: Admin auth headers (see above)

**Success Response**:

```json
{
  "status": "success",
  "data": {
    "orders": [
      {
        "ID": "number",
        "UserID": "number (foreign key to users)",
        "Status": "string (pending/verified/rejected)",
        "OrderType": "string (pass/merch)",
        "PaymentUTR": "string",
        "PaymentSSPath": "string (file path like 'screenshots/filename.png')",
        "Items": ["string array"],
        "CreatedAt": "ISO 8601 datetime",
        "UpdatedAt": "ISO 8601 datetime",
        "amount": "number (optional — total order amount)"
      }
    ],
    "users": [
      {
        "ID": "number",
        "Email": "string",
        "Phone": "string",
        "Name": "string",
        "CreatedAt": "ISO 8601 datetime"
      }
    ]
  }
}
```

**Backend Implementation Requirements**:

- Return ALL orders and ALL users (the frontend handles filtering/merging)
- The frontend merges orders with user data client-side using `UserID → user.ID` mapping
- Orders must include: ID, UserID, Status, OrderType, PaymentUTR, PaymentSSPath, Items (as array), CreatedAt, amount
- Users must include: ID, Email, Phone, Name, CreatedAt
- Timeout: Frontend expects response within 15 seconds
- Consider pagination for large datasets in future

---

### 4.2 Update Order Status (Verify/Reject)

**Endpoint**: `POST /admin/order/verify`

**Purpose**: Allows admin to verify or reject a pending order.

**Request**:

```json
{
  "order_id": "number",
  "status": "string (verified/rejected)"
}
```

**Headers**: Admin auth headers

**Success Response** (HTTP 200):

```json
{
  "status": "success",
  "message": "Order status updated"
}
```

**Backend Implementation Requirements**:

- Update order status in database
- **On verification (`verified`)**:
  - Generate QR codes for each pass in the order
  - Send email to buyer with passes/QR codes attached
  - Send individual emails to each attendee with their specific pass
- **On rejection (`rejected`)**:
  - Optionally send rejection notification email to buyer
- Log the status change with admin info and timestamp
- Validate that order exists and status transition is valid
- Timeout: Frontend expects response within 10 seconds

---

### 4.3 Get Payment Screenshot

**Endpoint**: `GET /admin/payment-screenshot/{filename}`

**Purpose**: Serves the uploaded payment screenshot image for admin review.

**URL Parameters**:

- `filename`: The filename from the order's `PaymentSSPath` field (with `screenshots/` prefix stripped by frontend)

**Headers**: Admin auth headers (X-Admin-Key only, no Content-Type needed)

**Response**: Binary image data (blob)

- Content-Type should be the image MIME type (image/png, image/jpeg, etc.)

**Backend Implementation Requirements**:

- Serve static files from the screenshots storage directory
- Validate admin authentication before serving
- Return appropriate MIME type headers
- Handle file-not-found gracefully
- Timeout: Frontend expects response within 15 seconds

---

### 4.4 Get Pass Data (Optional)

**Endpoint**: `GET /admin/passes`

**Purpose**: Retrieves current pass availability configuration.

**Headers**: Admin auth headers

**Success Response**:

```json
{
  "passes": [
    {
      "id": 1,
      "name": "1 Day Visitor Pass",
      "description": "string",
      "price": 100,
      "soldOut": false
    }
  ]
}
```

**Notes**:

- Frontend falls back to localStorage if this endpoint isn't available (5-second timeout)
- This is optional for MVP — the frontend currently works with localStorage fallback

---

### 4.5 Update Pass Availability (Optional)

**Endpoint**: `POST /admin/passes/update`

**Purpose**: Updates which passes are available for purchase.

**Request**:

```json
{
  "passes": [
    {
      "id": 1,
      "name": "1 Day Visitor Pass",
      "description": "string",
      "price": 100,
      "soldOut": false
    }
  ]
}
```

**Headers**: Admin auth headers

**Success Response**:

```json
{
  "status": "success",
  "message": "Pass availability updated"
}
```

**Notes**:

- Frontend falls back to localStorage if this endpoint isn't available (10-second timeout)
- Optional for MVP

---

## 5. Attendance System

### 5.1 Verify QR Code

**Endpoint**: `POST /attendance/verify-qr`

**Purpose**: Verifies a scanned QR code and returns attendee information.

**Request**:

```json
{
  "qr_content": "string (raw QR code content)"
}
```

**Headers**:

```
Content-Type: application/json
```

> **Note**: This endpoint does NOT require `X-Admin-Key` header in the current implementation.

**Success Response**:

```json
{
  "status": "success",
  "data": {
    "attendee_name": "string",
    "attendee_email": "string",
    "college_name": "string",
    "pass_type": "string (e.g. '1 Day Visitor Pass')",
    "pass_price": "number",
    "is_present": "boolean (whether already marked present)"
  }
}
```

**Error Response**:

```json
{
  "status": "error",
  "message": "Not a valid QR code"
}
```

**Backend Implementation Requirements**:

- Parse QR content to find matching pass/attendee record
- Return attendee details from the pass record
- Include `is_present` flag to prevent double check-ins
- QR content should encode a unique pass identifier

---

### 5.2 Mark Attendance

**Endpoint**: `POST /attendance/mark`

**Purpose**: Marks an attendee as present at the event.

**Request**:

```json
{
  "qr_content": "string (same QR content used for verification)"
}
```

**Headers**:

```
Content-Type: application/json
```

> **Note**: This endpoint does NOT require `X-Admin-Key` header in the current implementation.

**Success Response**:

```json
{
  "status": "success",
  "data": {
    "attendee_name": "string",
    "attendee_email": "string",
    "attended_at": "ISO 8601 datetime"
  }
}
```

**Error Response**:

```json
{
  "status": "error",
  "message": "string (e.g. 'Already marked present' or 'Invalid QR code')"
}
```

**Backend Implementation Requirements**:

- Look up pass by QR content
- Check if already marked present (prevent double check-in)
- Update attendance timestamp
- Return attendee info with attendance time
- Consider adding admin auth to these endpoints for security

---

## 6. Data Models

### 6.1 User

| Field     | Type                         | Description                     |
| --------- | ---------------------------- | ------------------------------- |
| ID        | Integer (PK, auto-increment) | Unique user identifier          |
| Email     | String (unique)              | User's email address            |
| Phone     | String                       | User's phone number (10 digits) |
| Name      | String                       | User's full name                |
| Gender    | String                       | male/female                     |
| CreatedAt | DateTime                     | Account creation timestamp      |
| UpdatedAt | DateTime                     | Last update timestamp           |

---

### 6.2 Order

| Field         | Type                         | Description                                                       |
| ------------- | ---------------------------- | ----------------------------------------------------------------- |
| ID            | Integer (PK, auto-increment) | Unique order identifier                                           |
| UserID        | Integer (FK → User.ID)       | Reference to the ordering user                                    |
| Status        | String                       | `pending`, `verified`, `rejected`                                 |
| OrderType     | String                       | `pass` or `merch`                                                 |
| PaymentUTR    | String                       | UPI transaction reference number                                  |
| PaymentSSPath | String                       | File path to payment screenshot (e.g. `screenshots/filename.png`) |
| Items         | JSON Array / Text            | Array of item description strings                                 |
| Amount        | Float (optional)             | Total order amount in INR                                         |
| CreatedAt     | DateTime                     | Order creation timestamp                                          |
| UpdatedAt     | DateTime                     | Last status update timestamp                                      |

---

### 6.3 Pass

| Field          | Type                         | Description                           |
| -------------- | ---------------------------- | ------------------------------------- |
| ID             | Integer (PK, auto-increment) | Unique pass identifier                |
| OrderID        | Integer (FK → Order.ID)      | Reference to the parent order         |
| PassType       | String                       | Pass name (e.g. "1 Day Visitor Pass") |
| PassPrice      | Float                        | Price in INR                          |
| AttendeeName   | String                       | Name of the pass holder               |
| AttendeeEmail  | String                       | Email of the pass holder              |
| AttendeeGender | String                       | Gender of the pass holder             |
| CollegeName    | String                       | College/university of the pass holder |
| QRCode         | String                       | Unique QR code content for this pass  |
| IsPresent      | Boolean (default: false)     | Whether attendee has checked in       |
| AttendedAt     | DateTime (nullable)          | Timestamp of attendance marking       |
| CreatedAt      | DateTime                     | Pass creation timestamp               |

---

### 6.4 PassAvailability (Optional)

| Field       | Type         | Description                        |
| ----------- | ------------ | ---------------------------------- |
| ID          | Integer (PK) | Pass type identifier (1-4)         |
| Name        | String       | Pass name                          |
| Description | String       | Pass description                   |
| Price       | Float        | Price in INR                       |
| SoldOut     | Boolean      | Whether this pass type is sold out |
| UpdatedAt   | DateTime     | Last availability change timestamp |

---

## 7. File Storage Requirements

### 7.1 Payment Screenshots

- **Storage path**: `screenshots/` directory on server
- **Format**: Images (PNG, JPEG, etc.)
- **Received as**: Base64 encoded string in order submission
- **Filename strategy**: Generate unique filename (e.g. `{orderID}_{timestamp}.{ext}`)
- **Served via**: `GET /admin/payment-screenshot/{filename}` (authenticated)

### 7.2 QR Code Generation

- Generate unique QR codes for each pass upon order verification
- QR content should encode a unique identifier that maps to a pass record
- QR codes need to be attached to emails sent to attendees

---

## 8. Email Service Requirements

### 8.1 Order Confirmation Email

- **Trigger**: On successful order submission (`POST /order/submit`)
- **Recipient**: Buyer's email
- **Content**: Order ID, items ordered, total amount, status ("pending verification")

### 8.2 Order Verification Email

- **Trigger**: When admin verifies an order (`POST /admin/order/verify` with status `verified`)
- **Recipient**: Buyer's email + individual attendee emails
- **Content**:
  - For buyer: Order confirmed, pass details, general info
  - For each attendee: Individual pass with QR code, event details, check-in instructions

### 8.3 Order Rejection Email (Optional)

- **Trigger**: When admin rejects an order
- **Recipient**: Buyer's email
- **Content**: Order rejected notification, reason if applicable, contact info for support

---

## 9. Security Requirements

### 9.1 Authentication

- Admin key stored as environment variable (not in code)
- All admin endpoints validate `X-Admin-Key` header
- Consider implementing:
  - JWT tokens for admin sessions (more secure than raw key on every request)
  - Token expiration and refresh mechanism
  - Rate limiting on admin auth endpoint

### 9.2 Input Validation

- Validate all user inputs server-side (email format, phone format, required fields)
- Sanitize text inputs to prevent XSS/injection
- Validate file uploads (type, size limits for payment screenshots)
- Maximum 5 passes per order (enforced server-side)

### 9.3 DoS Protection

- Rate limit order submissions per IP/phone number
- Max 5 passes per order
- File upload size limits
- API request timeouts

### 9.4 Data Protection

- Hash/encrypt sensitive data at rest
- Use HTTPS for all API communications
- Don't expose internal IDs unnecessarily
- Validate QR codes server-side (don't trust client-generated pass IDs)

---

## 10. CORS Configuration

The frontend is hosted on a different domain/port from the API. Configure CORS to allow:

```
Access-Control-Allow-Origin: https://your-frontend-domain.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Admin-Key
Access-Control-Max-Age: 86400
```

---

## 11. API Endpoint Summary

| Method | Endpoint                               | Auth        | Purpose                             |
| ------ | -------------------------------------- | ----------- | ----------------------------------- |
| `POST` | `/admin/verify-key`                    | None        | Admin login                         |
| `GET`  | `/admin/db-state`                      | X-Admin-Key | Get all orders + users              |
| `POST` | `/admin/order/verify`                  | X-Admin-Key | Update order status                 |
| `GET`  | `/admin/payment-screenshot/{filename}` | X-Admin-Key | Serve payment images                |
| `GET`  | `/admin/passes`                        | X-Admin-Key | Get pass availability (optional)    |
| `POST` | `/admin/passes/update`                 | X-Admin-Key | Update pass availability (optional) |
| `POST` | `/order/submit`                        | None        | Submit new order                    |
| `GET`  | `/order/status`                        | None        | Check order status by phone         |
| `POST` | `/attendance/verify-qr`                | None        | Verify QR code                      |
| `POST` | `/attendance/mark`                     | None        | Mark attendance                     |

---

## 12. Error Handling Standards

All API responses should follow this structure:

**Success**:

```json
{
  "status": "success",
  "data": { ... },
  "message": "optional success message"
}
```

**Error**:

```json
{
  "status": "error",
  "message": "Human-readable error description"
}
```

**HTTP Status Codes Used**:

- `200` — Success (GET, POST updates)
- `201` — Created (order submission)
- `400` — Bad Request (validation errors)
- `401` — Unauthorized (missing/invalid admin key)
- `404` — Not Found (no orders for phone, invalid screenshot)
- `500` — Internal Server Error

---

## 13. Recommended Technology Stack

Based on the requirements, the backend should support:

| Requirement        | Recommendation                                                        |
| ------------------ | --------------------------------------------------------------------- |
| Language/Framework | Go (Gin/Fiber), Node.js (Express/Fastify), or Python (FastAPI)        |
| Database           | PostgreSQL or MySQL (relational, for structured order/user data)      |
| File Storage       | Local filesystem or S3-compatible object storage                      |
| Email Service      | SendGrid, AWS SES, or Resend                                          |
| QR Code Generation | `go-qrcode`, `qrcode` (npm), or `qrcode` (Python)                     |
| Authentication     | Environment variable + middleware validation                          |
| Deployment         | Docker container on VPS, or serverless (AWS Lambda / Cloud Functions) |

---

## 14. Development Priority Order

### Phase 1 — Core (Must Have)

1. ✅ User model + creation
2. ✅ `POST /order/submit` — Order creation with payment screenshot storage
3. ✅ `GET /order/status` — Order lookup by phone
4. ✅ `POST /admin/verify-key` — Admin authentication
5. ✅ `GET /admin/db-state` — Full data export for admin dashboard
6. ✅ `POST /admin/order/verify` — Order status updates

### Phase 2 — Essential

7. ✅ `GET /admin/payment-screenshot/{filename}` — Serve payment screenshots
8. ✅ Email service — Order confirmation + verification emails
9. ✅ QR code generation on order verification
10. ✅ Pass model + individual attendee tracking

### Phase 3 — Attendance & Management

11. ✅ `POST /attendance/verify-qr` — QR verification
12. ✅ `POST /attendance/mark` — Attendance marking
13. ✅ `GET /admin/passes` + `POST /admin/passes/update` — Pass availability management

### Phase 4 — Polish

14. Rate limiting and DoS protection
15. Advanced logging and audit trail
16. Admin role management
17. Automated email notifications
18. Database backups
