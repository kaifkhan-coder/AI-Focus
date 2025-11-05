import React from 'react';

const KeyConceptsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="m15.5 7.5 3-3-3-3" />
    <path d="M18.5 4.5h-12c-2.2 0-4 1.8-4 4v0c0 2.2 1.8 4 4 4h5" />
    <path d="m8.5 16.5-3 3 3 3" />
    <path d="M5.5 19.5h12c2.2 0 4-1.8 4-4v0c0-2.2-1.8-4-4-4h-5" />
  </svg>
);

export default KeyConceptsIcon;
