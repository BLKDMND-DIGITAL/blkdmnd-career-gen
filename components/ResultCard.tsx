import React from 'react';
import { CopyButton } from './CopyButton';

interface ResultCardProps {
  title: string;
  content: string | string[];
  description?: string;
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, content, description, className = "" }) => {
  const contentString = Array.isArray(content) ? content.map(i => `• ${i}`).join('\n') : content;

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-700 transition-colors ${className}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">{title}</h3>
          {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
        </div>
        <CopyButton text={contentString} />
      </div>
      
      <div className="bg-slate-950/50 rounded p-3 border border-slate-800/50">
        {Array.isArray(content) ? (
          <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-slate-300">
            {content.map((item, idx) => (
              <li key={idx} className="leading-relaxed pl-1">{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
            {content}
          </p>
        )}
      </div>
    </div>
  );
};