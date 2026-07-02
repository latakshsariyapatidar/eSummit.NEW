import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

/**
 * AdminLayout - Single auth guard for all /admin/* routes
 *
 * Uses a flag to ensure we only check auth ONCE, preventing re-redirects after login
 */
export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Only run auth check if not already done
    if (sessionStorage.getItem("_admin_auth_checked")) {
      setChecked(true);
      return;
    }

    const token = sessionStorage.getItem("auth_token");
    const role = sessionStorage.getItem("auth_role");

    const pathname = location.pathname;
    const isLoginPage =
      pathname.includes("/admin") && !pathname.includes("/admin/");

    console.log("🔐 AdminLayout auth check:", {
      pathname,
      isLoginPage,
      hasToken: !!token,
      role,
    });

    // On login page, always allow it
    if (isLoginPage) {
      sessionStorage.setItem("_admin_auth_checked", "true");
      setChecked(true);
      return;
    }

    // On protected routes, require token
    if (!token || !role) {
      console.warn("❌ No auth token/role found, redirecting to login");
      navigate("/admin", { replace: true });
      return;
    }

    // Token exists, allow access
    console.log("✅ Auth valid, allowing access");
    sessionStorage.setItem("_admin_auth_checked", "true");
    setChecked(true);
  }, []); // Run only once on mount

  if (!checked) {
    return null;
  }

  return <Outlet />;
}
