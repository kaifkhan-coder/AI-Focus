import React from 'react';
import { Feature } from '../types';
import SummarizeIcon from './icons/SummarizeIcon';
import KeyConceptsIcon from './icons/KeyConceptsIcon';
import QAIcon from './icons/QAIcon';

interface TabsProps {
  activeFeature: Feature;
  setActiveFeature: (feature: Feature) => void;
}

const featureConfig = {
    [Feature.SUMMARY]: { icon: SummarizeIcon },
    [Feature.CONCEPTS]: { icon: KeyConceptsIcon },
    [Feature.QA]: { icon: QAIcon },
}

const Tabs: React.FC<TabsProps> = ({ activeFeature, setActiveFeature }) => {
  return (
    <div className="border-b border-slate-700">
      <nav className="-mb-px flex space-x-4" aria-label="Tabs">
        {(Object.values(Feature) as Feature[]).map((feature) => {
          const Icon = featureConfig[feature].icon;
          const isActive = activeFeature === feature;
          return (
            <button
              key={feature}
              onClick={() => setActiveFeature(feature)}
              className={`
                ${isActive
                  ? 'border-sky-400 text-sky-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
                }
                group inline-flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200
              `}
              aria-current={isActive ? 'page' : undefined}
            >
             <Icon className={`
                ${isActive ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-400'}
                 -ml-0.5 mr-2 h-5 w-5 transition-colors duration-200
             `} />
              <span>{feature}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;
