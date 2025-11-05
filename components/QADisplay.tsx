import React from 'react';
import { QuestionAnswer } from '../types';

interface QADisplayProps {
  qa: QuestionAnswer[];
}

const QADisplay: React.FC<QADisplayProps> = ({ qa }) => {
  return (
    <div className="space-y-4">
      {qa.map((item, index) => (
        <details key={index} className="bg-slate-800/50 p-5 rounded-lg border border-slate-700/50 group cursor-pointer" name="qa-accordion">
          <summary className="flex justify-between items-center list-none">
            <span className="font-medium text-slate-200 group-hover:text-sky-400 transition-colors">{item.question}</span>
            <span className="text-slate-500 group-open:rotate-90 transform transition-transform ml-2">▶</span>
          </summary>
          <div className="mt-4 pt-4 border-t border-slate-700 text-slate-300">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
};

export default QADisplay;
