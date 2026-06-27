import { useNavigate } from "react-router-dom";
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

  const transitionNavigate = (to, options) => {
    // Prevent transition if already on the requested page
    if (to === window.location.pathname) return;

    const overlay = document.getElementById("page-transition-overlay");

    if (!overlay) {
      navigate(to, options);
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
        navigate(to, options);
        window.scrollTo(0, 0);
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
