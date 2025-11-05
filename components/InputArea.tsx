import React from 'react';
import { Feature } from '../types';
import LoadingSpinner from './LoadingSpinner';
import SummarizeIcon from './icons/SummarizeIcon';
import KeyConceptsIcon from './icons/KeyConceptsIcon';
import QAIcon from './icons/QAIcon';

interface InputAreaProps {
  inputText: string;
  setInputText: (text: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  feature: Feature;
}

const featureConfig = {
    [Feature.SUMMARY]: { 
        icon: SummarizeIcon,
        placeholder: "Paste your article, lecture notes, or any text here to get a concise summary..."
    },
    [Feature.CONCEPTS]: { 
        icon: KeyConceptsIcon,
        placeholder: "Paste your text here and the AI will extract and explain the most important concepts..."
    },
    [Feature.QA]: { 
        icon: QAIcon,
        placeholder: "Paste your study material here to generate a set of questions and answers for self-testing..."
    },
}

const InputArea: React.FC<InputAreaProps> = ({ inputText, setInputText, onGenerate, isLoading, feature }) => {
  const { icon: Icon, placeholder } = featureConfig[feature];
  
  return (
    <div>
      <label htmlFor="study-text" className="block text-sm font-medium text-slate-300 mb-2">
        Your Study Material
      </label>
      <div className="relative">
        <textarea
          id="study-text"
          rows={10}
          className="block w-full bg-slate-900 border border-slate-700 rounded-md shadow-sm p-4 text-slate-300 placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          placeholder={placeholder}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isLoading || !inputText.trim()}
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-all duration-200 transform active:scale-95"
        >
          {isLoading ? (
            <>
              <LoadingSpinner className="w-5 h-5 mr-3 -ml-1" />
              Generating...
            </>
          ) : (
            <>
              <Icon className="w-5 h-5 mr-2 -ml-1"/>
              Generate {feature}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputArea;
