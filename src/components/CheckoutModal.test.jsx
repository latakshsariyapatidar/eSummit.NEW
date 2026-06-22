import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { CheckoutModal } from "./CheckoutModal";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal cart with one "pit" pass (matches PASSES data in store). */
const singlePassCart = [{ passId: "pit", qty: 1 }];

/** Props that make the component renderable out of the box. */
const defaultProps = {
  cart: singlePassCart,
  total: 299,
  onClose: vi.fn(),
  onDone: vi.fn(),
};

/**
 * Fill every required field so the "Confirm order" button becomes enabled.
 *
 * Input order in the rendered form (1 attendee):
 *   [0] Buyer phone
 *   [1] Buyer email
 *   [2] Attendee name      (placeholder="Name")
 *   [3] Attendee email     (placeholder="Email")
 *   [4] Attendee college   (placeholder="College")
 *   [5] Payment UTR
 *
 * Select order:
 *   [0] Buyer gender
 *   [1] Attendee gender
 */
function fillValidForm() {
  const inputs = document.querySelectorAll("input");
  const selects = document.querySelectorAll("select");

  fireEvent.change(inputs[0], { target: { value: "9876543210" } }); // buyer phone
  fireEvent.change(inputs[1], { target: { value: "buyer@example.com" } }); // buyer email
  fireEvent.change(selects[0], { target: { value: "male" } });             // buyer gender

  fireEvent.change(inputs[2], { target: { value: "Jane Doe" } });          // attendee name
  fireEvent.change(inputs[3], { target: { value: "jane@example.com" } });  // attendee email
  fireEvent.change(selects[1], { target: { value: "female" } });           // attendee gender
  fireEvent.change(inputs[4], { target: { value: "IIT Dharwad" } });       // attendee college

  fireEvent.change(inputs[5], { target: { value: "123456789012" } });      // UTR
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("CheckoutModal – submit() with useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without crashing", () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
  });

  it("submit button is disabled when form is incomplete", () => {
    render(<CheckoutModal {...defaultProps} />);
    const btn = screen.getByRole("button", { name: /confirm order/i });
    expect(btn).toBeDisabled();
  });

  it("submit button becomes enabled once all fields are valid", () => {
    render(<CheckoutModal {...defaultProps} />);
    fillValidForm();
    const btn = screen.getByRole("button", { name: /confirm order/i });
    expect(btn).not.toBeDisabled();
  });

  it("saves a new order to localStorage under 'es26_orders' after submit", () => {
    render(<CheckoutModal {...defaultProps} />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /confirm order/i }));

    const stored = JSON.parse(localStorage.getItem("es26_orders"));
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      phone: "9876543210",
      email: "buyer@example.com",
      total: 299,
      utr: "123456789012",
      status: "pending",
    });
  });

  it("order id follows the 'ORD-<timestamp>' pattern", () => {
    render(<CheckoutModal {...defaultProps} />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /confirm order/i }));

    const stored = JSON.parse(localStorage.getItem("es26_orders"));
    expect(stored[0].id).toMatch(/^ORD-\d+$/);
  });

  it("order contains passes array with pass details and a generated passId", () => {
    render(<CheckoutModal {...defaultProps} />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /confirm order/i }));

    const stored = JSON.parse(localStorage.getItem("es26_orders"));
    expect(stored[0].passes).toHaveLength(1);
    expect(stored[0].passes[0]).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      gender: "female",
      college: "IIT Dharwad",
    });
    expect(typeof stored[0].passes[0].passId).toBe("string");
    expect(stored[0].passes[0].passId.length).toBeGreaterThan(0);
  });

  it("appends to existing orders — does NOT overwrite previous orders (core PR behavior)", () => {
    // Pre-populate localStorage with an existing order
    const preExistingOrder = {
      id: "ORD-0000000001",
      phone: "1111111111",
      email: "old@example.com",
      total: 499,
      utr: "000000000001",
      status: "pending",
      passes: [],
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("es26_orders", JSON.stringify([preExistingOrder]));

    render(<CheckoutModal {...defaultProps} />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /confirm order/i }));

    const stored = JSON.parse(localStorage.getItem("es26_orders"));
    // Must have TWO orders: the pre-existing one AND the newly submitted one
    expect(stored).toHaveLength(2);
    expect(stored[0].id).toBe("ORD-0000000001");
    expect(stored[1]).toMatchObject({
      phone: "9876543210",
      status: "pending",
    });
  });

  it("accumulates multiple orders across successive component mounts", () => {
    // First mount + submit
    const { unmount } = render(<CheckoutModal {...defaultProps} />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /confirm order/i }));
    unmount();

    expect(JSON.parse(localStorage.getItem("es26_orders"))).toHaveLength(1);

    // Second mount reads existing order from localStorage then appends a new one
    render(<CheckoutModal {...defaultProps} onDone={vi.fn()} />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /confirm order/i }));

    const stored = JSON.parse(localStorage.getItem("es26_orders"));
    expect(stored).toHaveLength(2);
  });

  it("shows confirmation screen with order id and pass ids after successful submit", async () => {
    render(<CheckoutModal {...defaultProps} />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /confirm order/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/order placed — pending verification/i)
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/ORD-\d+/)).toBeInTheDocument();
  });

  it("stored order has a valid ISO 8601 createdAt timestamp", () => {
    render(<CheckoutModal {...defaultProps} />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /confirm order/i }));

    const stored = JSON.parse(localStorage.getItem("es26_orders"));
    expect(() => new Date(stored[0].createdAt).toISOString()).not.toThrow();
    expect(new Date(stored[0].createdAt).toString()).not.toBe("Invalid Date");
  });

  it("does not write to localStorage before submit is clicked", () => {
    render(<CheckoutModal {...defaultProps} />);
    // useLocalStorage reads existing value on mount but must not write anything new
    expect(localStorage.getItem("es26_orders")).toBeNull();
  });

  it("order with pre-existing orders preserves original order data intact", () => {
    const originalOrder = {
      id: "ORD-PRESERVED",
      phone: "5555555555",
      email: "preserved@example.com",
      total: 899,
      utr: "999999999999",
      status: "pending",
      passes: [{ passId: "podium", name: "VIP Guest" }],
      createdAt: "2026-01-01T00:00:00.000Z",
    };
    localStorage.setItem("es26_orders", JSON.stringify([originalOrder]));

    render(<CheckoutModal {...defaultProps} />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /confirm order/i }));

    const stored = JSON.parse(localStorage.getItem("es26_orders"));
    // The original order object should be entirely unchanged
    expect(stored[0]).toEqual(originalOrder);
  });
});