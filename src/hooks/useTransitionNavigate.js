import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export const useTransitionNavigate = () => {
  const navigate = useNavigate();

  const transitionNavigate = (to, options) => {
    // Prevent transition if already on the requested page
    if (to === window.location.pathname) return;

    const overlay = document.getElementById('page-transition-overlay');
    
    if (!overlay) {
      navigate(to, options);
      return;
    }

    const tl = gsap.timeline();

    tl.to(overlay, {
      yPercent: 0,
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: () => {
        navigate(to, options);
        window.scrollTo(0, 0);
      }
    }).to(overlay, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: () => {
        // Reset the overlay back to the bottom for the next transition
        gsap.set(overlay, { yPercent: 100 });
      }
    });
  };

  return transitionNavigate;
};
