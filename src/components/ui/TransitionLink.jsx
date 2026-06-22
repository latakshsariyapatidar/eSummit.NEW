import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTransitionNavigate } from '../../hooks/useTransitionNavigate';

export const TransitionLink = ({ to, children, className, onClick, ...props }) => {
  const navigate = useTransitionNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  const finalClassName = typeof className === 'function' 
    ? className({ isActive })
    : className;

  return (
    <a href={to} onClick={handleClick} className={finalClassName} {...props}>
      {children}
    </a>
  );
};
