import { useLocation, useHref } from "react-router-dom";
import { useTransitionNavigate } from "../../hooks/useTransitionNavigate";

export const TransitionLink = ({
  to,
  children,
  className,
  onClick,
  ...props
}) => {
  const navigate = useTransitionNavigate();
  const location = useLocation();
  const href = useHref(to);
  const isActive = location.pathname === to;

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  const finalClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <a href={href} onClick={handleClick} className={finalClassName} {...props}>
      {children}
    </a>
  );
};
