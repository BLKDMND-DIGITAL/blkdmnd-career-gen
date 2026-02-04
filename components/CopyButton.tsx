
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, label = "Copy", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 border shadow-sm ${
        copied 
          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30' 
          : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600'
      } ${className}`}
      title="Copy to clipboard"
    >
      {copied ? <Check size={12} strokeWidth={3} /> : <Copy size={12} strokeWidth={3} />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  );
};
