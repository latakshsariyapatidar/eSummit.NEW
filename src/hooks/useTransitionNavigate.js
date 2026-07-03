import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";

// Each direction defines where the overlay hides offscreen
const DIRECTIONS = [
  { xPercent: 0, yPercent: 100 }, // bottom
  { xPercent: 0, yPercent: -100 }, // top
  { xPercent: 100, yPercent: 0 }, // right
  { xPercent: -100, yPercent: 0 }, // left
];

const randomDir = (exclude) => {
  const options = DIRECTIONS.filter((d) => d !== exclude);
  return options[Math.floor(Math.random() * options.length)];
};

export const useTransitionNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNavigatingRef = useRef(false);

  const transitionNavigate = (to, options) => {
    // Prevent transition if already on the requested page
    if (to === location.pathname) return;

    // Prevent multiple simultaneous navigations
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    // If navigating away from /admin, clear the auth check flag
    if (location.pathname.includes("/admin") && !to.includes("/admin")) {
      sessionStorage.removeItem("_admin_auth_checked");
    }

    const overlay = document.getElementById("page-transition-overlay");

    if (!overlay) {
      navigate(to, options);
      isNavigatingRef.current = false;
      return;
    }

    const enterFrom = randomDir(null);
    const exitTo = randomDir(enterFrom);

    // Position overlay at its entry edge
    gsap.set(overlay, {
      xPercent: enterFrom.xPercent,
      yPercent: enterFrom.yPercent,
    });

    const tl = gsap.timeline();

    tl.to(overlay, {
      xPercent: 0,
      yPercent: 0,
      duration: 0.35,
      ease: "power4.inOut",
      onComplete: () => {
        // Use replace: true to prevent history duplication
        navigate(to, { ...options, replace: true });
        window.scrollTo(0, 0);

        // Reset flag after route change is processed
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 50);
      },
    }).to(overlay, {
      xPercent: exitTo.xPercent,
      yPercent: exitTo.yPercent,
      duration: 0.35,
      ease: "power4.inOut",
    });
  };

  return transitionNavigate;
};
