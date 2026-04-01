import type { MouseEvent, ReactNode } from 'react';

interface LinkProps {
  to: string;
  children: ReactNode;
  hoverColor: string;
}

const Link = ({ to, children, hoverColor }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (window.location.pathname === to) return;

    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 ${hoverColor}`}
    >
      {children}
    </a>
  );
};

export default Link;