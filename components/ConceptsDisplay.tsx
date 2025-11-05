import React from 'react';
import { KeyConcept } from '../types';

interface ConceptsDisplayProps {
  concepts: KeyConcept[];
}

const ConceptsDisplay: React.FC<ConceptsDisplayProps> = ({ concepts }) => {
  return (
    <div className="space-y-4">
      {concepts.map((item, index) => (
        <div key={index} className="bg-slate-800/50 p-5 rounded-lg border border-slate-700/50 transition-shadow hover:shadow-lg hover:border-slate-600">
          <h3 className="text-lg font-semibold text-sky-400">{item.concept}</h3>
          <p className="mt-2 text-slate-300">{item.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default ConceptsDisplay;
