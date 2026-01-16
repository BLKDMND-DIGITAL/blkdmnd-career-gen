
import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { TargetRole, TailoredContent, CandidateProfile } from './types';
import { generateContent, parseResumePDF, extractTextFromPDF } from './services/gemini';
import { DEFAULT_PROFILE, MEDIA_PRODUCTION_JDS } from './constants';
import { ResultCard } from './components/ResultCard';
import { CopyButton } from './components/CopyButton';
import { 
  Briefcase, 
  Sparkles, 
  Linkedin, 
  FileText, 
  MessageSquare, 
  Loader2,
  Cpu,
  Download,
  Copy,
  Check,
  Share2,
  Trophy,
  AlertCircle,
  User,
  Trash2,
  Mail,
  Upload,
  Settings,
  ChevronDown,
  Film,
  Database,
  ExternalLink,
  Plus,
  Rocket,
  FileUp,
  FileCode
} from 'lucide-react';

const MatchMeter: React.FC<{ score: number; userName: string }> = ({ score, userName }) => {
  const [offset, setOffset] = useState(251.2);
  
  useEffect(() => {
    const progress = (score / 100) * 251.2;
    setOffset(251.2 - progress);
  }, [score]);

  const getColor = () => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 65) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getStrokeColor = () => {
    if (score >= 85) return '#10b981';
    if (score >= 65) return '#f59e0b';
    return '#f43f5e';
  };

  return (
    <div className="flex items-center gap-6 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
          <circle
            cx="48" cy="48" r="40" stroke={getStrokeColor()} strokeWidth="8" fill="transparent"
            strokeDasharray="251.2" strokeDashoffset={offset} strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${getColor()}`}>{score}%</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={16} className={getColor()} />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Alignment Score</h4>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Based on {userName}'s background vs. the target requirements.
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [profile, setProfile] = useState<CandidateProfile>(DEFAULT_PROFILE);
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState<TargetRole>(DEFAULT_PROFILE.roles[0] || 'AI Solutions Engineer');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TailoredContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showJDLibrary, setShowJDLibrary] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jdPdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile.roles.length > 0 && !jobDescription) {
       setTargetRole(profile.roles[0]);
    }
  }, [profile]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleProfileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      if (file.type === 'application/pdf') {
        const base64 = await fileToBase64(file);
        const parsedProfile = await parseResumePDF(base64);
        setProfile(parsedProfile);
        setResult(null);
      } else if (file.type === 'application/json' || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target?.result as string);
            if (!json.name || !json.roles) throw new Error("Invalid format.");
            setProfile(json);
            setResult(null);
          } catch (err) {
            setError("Invalid Profile JSON format.");
          }
        };
        reader.readAsText(file);
      } else {
        setError("Unsupported file format. Please upload PDF or JSON.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to parse profile. Ensure the PDF is a valid resume.");
    } finally {
      setLoading(false);
      if (event.target) event.target.value = '';
    }
  };

  const handleJDPDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const base64 = await fileToBase64(file);
      const text = await extractTextFromPDF(base64);
      setJobDescription(text);
    } catch (err) {
      setError("Failed to extract text from JD PDF.");
    } finally {
      setLoading(false);
      if (event.target) event.target.value = '';
    }
  };

  const handleDownloadTemplate = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${profile.name.replace(/\s+/g, '_')}_Career_Profile.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDownloadPitchPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);
    let y = 30;

    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("BLKDMND CAREER ENGINE", margin, y);
    y += 10;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(56, 189, 248); 
    doc.text("Precision Engineering for High-Stakes Professional Narrative", margin, y);
    y = 65;

    const addSection = (title: string, body: string, highlight: boolean = false) => {
      if (highlight) {
        doc.setFillColor(241, 245, 249);
        doc.rect(margin - 5, y - 5, contentWidth + 10, 35, 'F');
      }
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text(title.toUpperCase(), margin, y);
      y += 8;
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(body, contentWidth);
      doc.text(lines, margin, y);
      y += (lines.length * 6) + 12;
    };

    addSection("The Problem", "Traditional applications are static. The market is dynamic. Candidates fail when they can't translate deep expertise into the specific language recruiters and AI demand.");
    addSection("The Solution: The Engine", "A sophisticated AI-orchestrated translation layer that recalibrates your brand. By ingesting your history and JD signals, it ensures 100% resonance.");
    addSection("Why It Wins", "• Semantic Mapping: Bridges technical history to recruiter pain points.\n• Speed: Optimized assets in seconds.\n• Brand Consistency: Unified voice across all channels.", true);

    y = doc.internal.pageSize.getHeight() - 30;
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 116, 139);
    doc.text("DOMINATE THE NARRATIVE. SECURE THE ROLE.", (pageWidth / 2), y, { align: 'center' });
    doc.save("BLKDMND_Engine_Pitch.pdf");
  };

  const handleDownloadResumePDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = 20;
    const c = { primary: [0, 0, 0] as [number, number, number], accent: [100, 116, 139] as [number, number, number], text: [30, 41, 59] as [number, number, number] };
    const lineHeight = (fontSize: number) => fontSize * 0.3527 * 1.4;
    const checkPageBreak = (heightNeeded: number) => { if (yPos + heightNeeded > pageHeight - margin) { doc.addPage(); yPos = 20; return true; } return false; };

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(c.primary[0], c.primary[1], c.primary[2]);
    const nameWidth = doc.getTextWidth(profile.name.toUpperCase());
    doc.text(profile.name.toUpperCase(), (pageWidth - nameWidth) / 2, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(c.accent[0], c.accent[1], c.accent[2]);
    const contactText = `${profile.location} | GitHub: ${profile.github || 'N/A'}`;
    const contactWidth = doc.getTextWidth(contactText);
    doc.text(contactText, (pageWidth - contactWidth) / 2, yPos);
    yPos += 12;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(c.primary[0], c.primary[1], c.primary[2]);
    const titleWidth = doc.getTextWidth(result.resume_target_title.toUpperCase());
    doc.text(result.resume_target_title.toUpperCase(), (pageWidth - titleWidth) / 2, yPos);
    yPos += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    const addResumeSection = (title: string) => {
      checkPageBreak(15);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(c.primary[0], c.primary[1], c.primary[2]);
      doc.text(title.toUpperCase(), margin, yPos);
      yPos += 3;
      doc.setDrawColor(230, 230, 230);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;
    };

    const addPara = (text: string) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(c.text[0], c.text[1], c.text[2]);
      const lines = doc.splitTextToSize(text, contentWidth);
      const h = lineHeight(10);
      lines.forEach((line: string) => { checkPageBreak(h); doc.text(line, margin, yPos); yPos += h; });
      yPos += 4;
    };

    addResumeSection("Professional Summary");
    addPara(result.resume_professional_summary);
    addResumeSection("Relevant Experience & Impact");
    const combined = [...result.resume_role_specific_bullets, ...result.resume_core_bullets];
    combined.forEach(item => {
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(item, contentWidth - 6);
      checkPageBreak(lines.length * 4);
      doc.text("•", margin + 1, yPos);
      lines.forEach(line => { doc.text(line, margin + 6, yPos); yPos += 4.5; checkPageBreak(4.5); });
      yPos += 1;
    });

    doc.save(`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`);
  };

  const handleDownloadCoverLetterPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    const margin = 25;
    const contentWidth = doc.internal.pageSize.getWidth() - (margin * 2);
    let yPos = 25;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(profile.name.toUpperCase(), margin, yPos);
    yPos += 15;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const bodyText = result.cover_letter_body;
    const lines = doc.splitTextToSize(bodyText, contentWidth);
    lines.forEach((line: string) => {
      if (yPos > 270) { doc.addPage(); yPos = 25; }
      doc.text(line, margin, yPos);
      yPos += 6;
    });

    doc.save(`${profile.name.replace(/\s+/g, '_')}_CoverLetter.pdf`);
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) { setError("Please enter or upload a JD."); return; }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await generateContent(jobDescription, targetRole, profile);
      setResult(data);
    } catch (err) {
      setError("Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-primary-500/30 selection:text-white font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">AI <span className="text-slate-400 font-light">Career Engine</span></h1>
              <p className="text-xs text-slate-500 font-medium">Calibrated for {profile.name}</p>
            </div>
          </div>
           <div className="flex items-center gap-4">
            <button onClick={handleDownloadPitchPDF} className="text-xs font-bold text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800">
              <Rocket size={14} className="text-primary-500" /> Engine Pitch
            </button>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${process.env.API_KEY ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></span>
              <span className="text-xs text-slate-500 font-mono hidden sm:block">Engine {process.env.API_KEY ? 'Active' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
              <div className="space-y-6">
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Settings size={14} /> Profile Bootstrap
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/50 rounded-lg text-xs font-bold text-white transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95">
                      <FileUp size={16} /> Upload Resume (PDF)
                    </button>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button onClick={handleDownloadTemplate} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium transition-colors">
                        <Download size={14} /> Export JSON
                      </button>
                      <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium transition-colors">
                        <FileCode size={14} /> Import JSON
                      </button>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleProfileUpload} accept=".pdf,.json" className="hidden" />
                    <p className="text-[10px] text-slate-500 text-center italic">Supported: PDF Resumes & JSON Configs</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Database size={14} /> JD Database
                    </label>
                    <button onClick={() => setShowJDLibrary(!showJDLibrary)} className="text-[10px] text-primary-400 hover:text-primary-300 font-bold uppercase flex items-center gap-1">
                      {showJDLibrary ? 'Collapse' : 'Expand Library'}
                    </button>
                  </div>
                  {showJDLibrary && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                      <div className="bg-slate-950/80 rounded-lg border border-slate-800 p-2 max-h-48 overflow-y-auto">
                        {MEDIA_PRODUCTION_JDS.map((jd) => (
                          <button key={jd.id} onClick={() => { setJobDescription(jd.description); setTargetRole(jd.title); setShowJDLibrary(false); }} className="w-full text-left px-3 py-2 rounded border border-transparent hover:border-slate-700 hover:bg-slate-900 group">
                            <div className="text-xs font-bold text-slate-200 group-hover:text-primary-400">{jd.title}</div>
                            <div className="text-[10px] text-slate-500 truncate">{jd.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Briefcase size={14} /> Target Strategy
                  </label>
                  <input list="role-suggestions" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. Creative Director" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-primary-500" />
                  <datalist id="role-suggestions">{profile.roles.map((r, i) => <option key={i} value={r} />)}</datalist>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <FileText size={14} /> Job Description
                    </label>
                    <div className="flex gap-2">
                      <button onClick={() => jdPdfInputRef.current?.click()} className="text-[10px] text-indigo-400 hover:text-indigo-300 uppercase font-bold tracking-tighter transition-colors flex items-center gap-1">
                        <Upload size={10} /> Upload PDF
                      </button>
                      <button onClick={() => setJobDescription('')} className="text-[10px] text-slate-500 hover:text-rose-400 uppercase font-bold tracking-tighter transition-colors flex items-center gap-1">
                        <Trash2 size={10} /> Clear
                      </button>
                    </div>
                  </div>
                  <input type="file" ref={jdPdfInputRef} onChange={handleJDPDFUpload} accept=".pdf" className="hidden" />
                  <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste JD text or upload a PDF from Glimmer/LinkedIn..." className="w-full h-72 bg-slate-950 border border-slate-700 rounded-lg p-4 text-xs font-mono text-slate-300 outline-none resize-none focus:ring-1 focus:ring-primary-500" />
                </div>

                <button onClick={handleGenerate} disabled={loading || !jobDescription.trim()} className="w-full bg-primary-600 hover:bg-primary-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                  {loading ? <><Loader2 className="animate-spin" size={18} /> Processing Signals...</> : <><Sparkles size={18} /> Synthesize Narrative</>}
                </button>
                {error && <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-lg text-rose-400 text-[10px] text-center">{error}</div>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl min-h-[500px] bg-slate-900/10">
                <div className="p-6 bg-slate-900 rounded-full mb-4 ring-1 ring-slate-800 shadow-2xl">
                  <Film size={48} className="text-primary-500/40" />
                </div>
                <h3 className="text-slate-300 font-bold uppercase tracking-widest text-sm">Ready to Calibrate</h3>
                <p className="text-xs mt-2 text-slate-500 max-w-xs text-center">Upload a PDF Resume to bootstrap your profile, or a JD PDF from Glimmer to start the engine.</p>
              </div>
            )}
            
            {loading && (
              <div className="h-full flex flex-col items-center justify-center min-h-[500px] space-y-6">
                 <div className="relative">
                    <div className="w-20 h-20 border-4 border-slate-800 border-t-primary-500 rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <Rocket size={32} className="text-primary-500 animate-pulse" />
                    </div>
                 </div>
                 <p className="text-slate-400 font-medium animate-pulse">Running semantic analysis on signals...</p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MatchMeter score={result.match_score} userName={profile.name} />
                  <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col justify-center shadow-lg ring-1 ring-slate-800/50">
                    <div className="flex items-center gap-2 mb-2">
                       <AlertCircle size={16} className="text-primary-400" />
                       <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alignment Thesis</h4>
                    </div>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed italic">"{result.match_explanation}"</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-2xl ring-1 ring-primary-500/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-800 rounded-xl text-primary-400 shadow-inner">
                      <Share2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight">Final Output Library</h3>
                      <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Optimized Assets for {targetRole}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button onClick={handleDownloadResumePDF} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-200 transition-all active:scale-95 shadow-md">
                      <User size={16} className="text-emerald-400" /> Resume (PDF)
                    </button>
                    <button onClick={handleDownloadCoverLetterPDF} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg text-xs font-bold transition-all shadow-xl hover:shadow-primary-500/20 active:scale-95">
                      <Mail size={16} /> Cover Letter
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10">
                  <section className="space-y-4">
                    <div className="flex items-center gap-3 text-primary-400 pb-2 border-b border-slate-800">
                      <FileText size={20} />
                      <h2 className="text-md font-bold text-white uppercase tracking-widest">Resume Architecture</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ResultCard title="Narrative Summary" content={result.resume_professional_summary} className="md:col-span-2" />
                      <ResultCard title="Calibrated Impact" content={result.resume_role_specific_bullets} />
                      <ResultCard title="Core Performance" content={result.resume_core_bullets} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3 text-blue-400 pb-2 border-b border-slate-800">
                      <Linkedin size={20} />
                      <h2 className="text-md font-bold text-white uppercase tracking-widest">Digital Brand Optimization</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <ResultCard title="LinkedIn Headline" content={result.linkedin_headline} />
                      <ResultCard title="LinkedIn 'About' Narrative" content={result.linkedin_about_section} />
                    </div>
                  </section>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
