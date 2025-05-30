import React from "react";

interface IconProps {
  className?: string;
}

const LogoutIcon: React.FC<IconProps> = ({
  className = "w-5 h-5 fill-current",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
  >
    <g transform="translate(24 0) scale(-1 1)">
      <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </g>
  </svg>
);

export default LogoutIcon;
