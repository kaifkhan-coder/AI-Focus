import React, { useState, useCallback } from 'react';
import { Feature, KeyConcept, QuestionAnswer } from './types';
import { generateSummary, extractKeyConcepts, generateQA } from './services/geminiService';
import Header from './components/Header';
import Tabs from './components/Tabs';
import InputArea from './components/InputArea';
import SummaryDisplay from './components/SummaryDisplay';
import ConceptsDisplay from './components/ConceptsDisplay';
import QADisplay from './components/QADisplay';
import LoadingSpinner from './components/LoadingSpinner';
import BrainIcon from './components/icons/BrainIcon';

const App: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<Feature>(Feature.SUMMARY);
  const [inputText, setInputText] = useState<string>('');
  const [summary, setSummary] = useState<string | null>(null);
  const [concepts, setConcepts] = useState<KeyConcept[] | null>(null);
  const [qa, setQa] = useState<QuestionAnswer[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please paste some text into the text area first.');
      return;
    }
    setIsLoading(true);
    setError(null);

    // Clear previous results for the current tab to avoid showing stale data
    if (activeFeature === Feature.SUMMARY) setSummary(null);
    if (activeFeature === Feature.CONCEPTS) setConcepts(null);
    if (activeFeature === Feature.QA) setQa(null);

    try {
      switch (activeFeature) {
        case Feature.SUMMARY:
          const summaryResult = await generateSummary(inputText);
          setSummary(summaryResult);
          break;
        case Feature.CONCEPTS:
          const conceptsResult = await extractKeyConcepts(inputText);
          setConcepts(conceptsResult);
          break;
        case Feature.QA:
          const qaResult = await generateQA(inputText);
          setQa(qaResult);
          break;
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(`Failed to generate content. ${errorMessage}. Please check your API key and try again.`);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, activeFeature]);

  const renderResult = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-lg text-center">
          <LoadingSpinner />
          <p className="mt-4 text-sky-300 animate-pulse">AI is thinking...</p>
        </div>
      );
    }

    if (error) {
      return <div className="p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">{error}</div>;
    }

    switch (activeFeature) {
      case Feature.SUMMARY:
        if (summary) return <SummaryDisplay summary={summary} />;
        break;
      case Feature.CONCEPTS:
        if (concepts) return <ConceptsDisplay concepts={concepts} />;
        break;
      case Feature.QA:
        if (qa) return <QADisplay qa={qa} />;
        break;
    }

    return (
       <div className="text-center p-10 border-2 border-dashed border-slate-700 rounded-lg">
          <BrainIcon className="mx-auto h-16 w-16 text-slate-600" />
          <h3 className="mt-4 text-lg font-medium text-slate-300">Your AI-powered study results will appear here.</h3>
          <p className="mt-1 text-sm text-slate-500">
            Paste your notes, select a feature, and click 'Generate'.
          </p>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-slate-800 shadow-2xl shadow-slate-950/50 rounded-lg p-4 sm:p-6">
          <Tabs activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
          
          <div className="mt-6">
            <InputArea
              inputText={inputText}
              setInputText={setInputText}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              feature={activeFeature}
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-300 mb-4">{activeFeature} Results</h2>
          <div className="min-h-[200px]">
            {renderResult()}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 mt-8 text-sm text-slate-600">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
