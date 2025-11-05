import React from 'react';
import BrainIcon from './icons/BrainIcon';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center space-x-3">
        <BrainIcon className="h-8 w-8 text-sky-400" />
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">
          Focus AI <span className="text-slate-400 font-normal hidden sm:inline">— Smart Study Companion</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
