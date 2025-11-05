import React from 'react';

const QAIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 17h.01" />
    <path d="M15 6.343A6.5 6.5 0 1 0 5.657 15" />
    <path d="M12 11h.01" />
    <path d="M17 14.586A6.5 6.5 0 1 0 14.586 17" />
  </svg>
);

export default QAIcon;
