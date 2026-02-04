
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
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col ${className}`}>
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">{title}</h3>
          {description && <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-1 font-bold uppercase tracking-wider">{description}</p>}
        </div>
        <CopyButton text={contentString} className="shrink-0" />
      </div>
      
      <div className="flex-1 bg-slate-50 dark:bg-slate-950/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800/50 ring-1 ring-black/[0.02]">
        {Array.isArray(content) ? (
          <ul className="list-disc list-outside ml-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {content.map((item, idx) => (
              <li key={idx} className="leading-relaxed pl-1 marker:text-primary-500">{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed font-medium">
            {content}
          </p>
        )}
      </div>
    </div>
  );
};
