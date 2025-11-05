import React from 'react';

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 prose-strong:text-sky-300 prose-ul:text-slate-300 max-w-none">
      <div dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }} />
    </div>
  );
};

export default SummaryDisplay;
