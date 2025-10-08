// components/ui/LinkButton.tsx
import Link, { LinkProps } from 'next/link';
import React from 'react';

// 1. Tentukan Tipe Props: Gabungan LinkProps dan Button Props
// LinkProps<T> mengambil semua props dari next/link.
// React.AnchorHTMLAttributes<HTMLAnchorElement> mengambil semua props dari tag <a>.

interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  // Membolehkan semua properti tag <a> untuk styling/aksesibilitas
  // 'href' sudah diwariskan dari LinkProps
  target?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  className = '',
  ...props
}) => {
  return (
    <Link
      href={href}
      className={`
        px-4 py-2 
        rounded-md font-medium 
        text-white 
        bg-blue-2 hover:bg-blue-700 
        transition-colors duration-200 
        text-center 
        inline-flex items-center justify-center 
        ${className}
      `}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;