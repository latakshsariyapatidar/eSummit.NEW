import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  TransitionLink as Link,
  TransitionLink as NavLink,
} from "./ui/TransitionLink";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/schedule", label: "Schedule" },
  { to: "/events", label: "Events" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/team", label: "Team" },
  { to: "/buy", label: "Passes" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Toggle compact/full styling based on scroll position
      setScrolled(currentScrollY > 30);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (!open) setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, open]);

  // Lock scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* FLOATING HEADER */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out w-[92%] md:w-[85%] max-w-6xl border-border/40 shadow-2xl ${
          visible
            ? "top-4 opacity-100"
            : "-translate-y-24 opacity-0 pointer-events-none"
        } ${
          scrolled
            ? "rounded-full bg-background/85 backdrop-blur-md py-2 px-5 md:px-6"
            : "rounded-full bg-background/60 backdrop-blur-sm py-3.5 px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display tracking-[0.2em] text-xs md:text-sm font-semibold uppercase leading-none">
                ESUMMIT'26
              </span>
              <span className="font-mono text-[8px] tracking-[0.25em] text-muted-foreground uppercase mt-1 leading-none">
                IIT Dharwad
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1.5 rounded-full">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/10"
                      : "text-white hover:text-primary hover:bg-white/5"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* BUTTON / CTA */}
          <div className="flex items-center gap-4">
            <Link
              to="/buy"
              onClick={closeMenu}
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-semibold hover:bg-primary/90 transition rounded-full shadow-sm hover:scale-105 duration-300"
            >
              Get Pass
              <svg
                width="12"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="shrink-0"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden p-2 text-white hover:text-primary transition-colors focus:outline-none"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* FULL SCREEN MOBILE OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-50 bg-background/98 backdrop-blur-lg md:hidden flex flex-col justify-between p-8 transition-all duration-500 ease-in-out ${
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full"
        }`}
      >
        {/* Header row in mobile drawer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display tracking-[0.2em] text-xs font-semibold uppercase leading-none">
                ESUMMIT'26
              </span>
              <span className="font-mono text-[8px] tracking-[0.25em] text-muted-foreground uppercase mt-1 leading-none">
                IIT Dharwad
              </span>
            </div>
          </div>
          <button
            className="p-2 text-white hover:text-primary transition-colors focus:outline-none"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Big Navigation Links */}
        <nav className="flex flex-col gap-6 my-auto text-left">
          {NAV.map((n, idx) => (
            <div
              key={n.to}
              style={{
                transitionDelay: `${idx * 75}ms`,
              }}
              className={`transition-all duration-500 transform ${
                open ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
            >
              <NavLink
                to={n.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight block ${
                    isActive ? "text-primary" : "text-white"
                  }`
                }
              >
                {n.label}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Footer actions in mobile drawer */}
        <div className="flex flex-col gap-6">
          <Link
            to="/buy"
            onClick={closeMenu}
            className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-xl font-mono text-sm uppercase tracking-[0.2em] font-semibold hover:bg-primary/90 transition-all shadow-lg"
          >
            Get Pass →
          </Link>
          <div className="flex flex-col gap-1 text-left font-mono text-[9px] uppercase tracking-widest text-muted-foreground border-t border-border/40 pt-4">
            <div>IIT Dharwad · March 06—08, 2026</div>
            <div>Designed for the next generation of builders</div>
          </div>
        </div>
      </div>
    </>
  );
}
