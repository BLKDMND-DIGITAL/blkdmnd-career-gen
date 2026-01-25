
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
  FileCode,
  Edit3,
  X,
  Save,
  BookmarkPlus,
  Zap,
  Target,
  Search,
  ShieldCheck,
  HelpCircle,
  BookOpen,
  ArrowRight,
  MousePointer2,
  FileSearch,
  ClipboardCheck,
  ZapOff,
  GraduationCap
} from 'lucide-react';

const OnboardingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const steps = [
    {
      icon: <User className="text-primary-500" size={24} />,
      title: "1. Foundation",
      desc: "Upload your current Resume (PDF). Our engine uses AI to extract your skills, roles, and signature projects into a digital foundation."
    },
    {
      icon: <FileSearch className="text-primary-500" size={24} />,
      title: "2. Market Signal",
      desc: "Paste the Job Description (JD) you're targeting. This gives the engine the 'target signals' it needs to bridge the gap."
    },
    {
      icon: <Zap className="text-amber-500" size={24} />,
      title: "3. Calibration",
      desc: "Select your desired role and hit 'Calibrate Narrative'. The AI performs a semantic cross-reference to align your history with the JD."
    },
    {
      icon: <Rocket className="text-emerald-500" size={24} />,
      title: "4. Deployment",
      desc: "The result? A perfectly tailored Resume, Cover Letter, and LinkedIn profile designed to pass both AI filters and human recruiters."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden ring-1 ring-white/10">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-500/10 rounded-xl">
              <BookOpen className="text-primary-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Onboarding Guide</h2>
              <p className="text-xs text-slate-500 font-medium">How to master the BLKDMND Career Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors hover:bg-slate-800 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="p-5 bg-slate-950/50 border border-slate-800 rounded-2xl space-y-3 group hover:border-slate-700 transition-all duration-300">
                <div className="p-3 bg-slate-900 rounded-xl w-fit shadow-inner group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-primary-500/5 border border-primary-500/20 rounded-2xl flex items-start gap-4">
            <div className="p-2 bg-primary-500/10 rounded-lg shrink-0">
              <ShieldCheck className="text-primary-500" size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest">Stakeholder Note</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                This engine does not replace your experience; it recalibrates the **narrative** around it. By using semantic analysis, it ensures your high-stakes expertise is never lost in translation.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold transition-all shadow-xl hover:shadow-primary-500/40 active:scale-95"
          >
            Start Calibrating <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const MatchMeter: React.FC<{ score: number; explanation: string; userName: string }> = ({ score, explanation, userName }) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayScore(score);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  const getColorClass = () => {
    if (score >= 85) return 'from-emerald-500 to-teal-400';
    if (score >= 65) return 'from-amber-500 to-orange-400';
    return 'from-rose-500 to-red-400';
  };

  const getTextClass = () => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 65) return 'text-amber-400';
    return 'text-rose-400';
  };

  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5">
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-48 h-24 overflow-hidden">
          <svg className="w-48 h-48 transform translate-y-2">
            <path
              d={`M ${strokeWidth/2},${radius} A ${normalizedRadius},${normalizedRadius} 0 0,1 ${radius*2 - strokeWidth/2},${radius}`}
              fill="none"
              stroke="#1e293b"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d={`M ${strokeWidth/2},${radius} A ${normalizedRadius},${normalizedRadius} 0 0,1 ${radius*2 - strokeWidth/2},${radius}`}
              fill="none"
              stroke={`url(#gauge-gradient)`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
            <span className={`text-4xl font-black tracking-tighter ${getTextClass()}`}>{displayScore}%</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Match Score</span>
          </div>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full blur-xl opacity-50 bg-gradient-to-r ${getColorClass()}`}></div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-slate-800 border border-slate-700 ${getTextClass()}`}>
              <Target size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Calibration Insights</h3>
              <p className="text-xs text-slate-500 font-medium">Narrative alignment for {userName}</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-2 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-primary-500/50 to-transparent"></div>
            <p className="text-sm text-slate-300 leading-relaxed pl-4 italic">
              "{explanation}"
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700 text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
              <Zap size={10} className="text-amber-400" /> Signal Strength: {score > 80 ? 'High' : 'Moderate'}
            </span>
            <span className="px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700 text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
              <Check size={10} className="text-emerald-400" /> Semantic Verification Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  // Persistence Initialization
  const loadProfile = () => {
    const saved = localStorage.getItem('blkdmnd_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  };

  const loadJDs = () => {
    const saved = localStorage.getItem('blkdmnd_jds');
    return saved ? JSON.parse(saved) : MEDIA_PRODUCTION_JDS;
  };

  const [profile, setProfile] = useState<CandidateProfile>(loadProfile());
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState<TargetRole>(profile.roles[0] || 'AI Solutions Engineer');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TailoredContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showJDLibrary, setShowJDLibrary] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState<CandidateProfile>(profile);
  const [jdLibrary, setJdLibrary] = useState(loadJDs());
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jdPdfInputRef = useRef<HTMLInputElement>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('blkdmnd_profile', JSON.stringify(profile));
    setEditForm(profile);
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('blkdmnd_jds', JSON.stringify(jdLibrary));
  }, [jdLibrary]);

  useEffect(() => {
    if (profile.roles.length > 0 && !jobDescription) {
       setTargetRole(profile.roles[0]);
    }
  }, [profile, jobDescription]);

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
    setUploadSuccess(null);

    try {
      if (file.type === 'application/pdf') {
        const base64 = await fileToBase64(file);
        const parsedProfile = await parseResumePDF(base64);
        setProfile(parsedProfile);
        setResult(null);
        setUploadSuccess(file.name);
        setTimeout(() => setUploadSuccess(null), 5000);
      } else if (file.type === 'application/json' || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target?.result as string);
            if (!json.name || !json.roles) throw new Error("Invalid format.");
            setProfile(json);
            setResult(null);
            setUploadSuccess(file.name);
            setTimeout(() => setUploadSuccess(null), 5000);
          } catch (err) {
            setError("Invalid Profile JSON format.");
          }
        };
        reader.readAsText(file);
      } else {
        setError("Unsupported format. Use PDF or JSON.");
      }
    } catch (err) {
      setError("Engine failed to parse PDF. Ensure it's a standard resume PDF.");
    } finally {
      setLoading(false);
      if (event.target) event.target.value = '';
    }
  };

  const handleProfileSave = () => {
    setProfile(editForm);
    setIsEditingProfile(false);
    setResult(null);
  };

  const handleSaveCurrentJDToLibrary = () => {
    if (!jobDescription.trim() || !targetRole.trim()) return;
    const newJD = {
      id: Date.now().toString(),
      source: 'User Custom',
      title: targetRole,
      description: jobDescription
    };
    setJdLibrary([newJD, ...jdLibrary]);
    setShowJDLibrary(true);
  };

  const handleDeleteJDFromLibrary = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Remove this entry from your library?")) {
      setJdLibrary(jdLibrary.filter(jd => jd.id !== id));
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
      setError("Failed to extract signals from JD PDF.");
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
    doc.setTextColor(236, 157, 52); // Gold color #ec9d34
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

    addSection("The Problem", "Static applications fail in a dynamic market. Expertise must be semantically aligned with recruiter and AI expectations.");
    addSection("The Solution", "BLKDMND is an AI-orchestrated translation layer that recalibrates professional brand signals for 100% narrative resonance.");
    addSection("Core Capabilities", "• Semantic Mapping: Technical history to recruiter pain points.\n• High Velocity: Optimized assets in seconds.\n• Brand Consistency: Unified voice across all channels.", true);

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
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = 20;

    // Standard high-contrast ATS settings
    const fontPrimary = "helvetica";
    const textBlack = [0, 0, 0] as [number, number, number];

    const checkPageBreak = (needed: number) => {
      if (yPos + needed > pageHeight - 15) {
        doc.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    const addText = (text: string, size = 10, isBold = false) => {
      doc.setFont(fontPrimary, isBold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor(textBlack[0], textBlack[1], textBlack[2]);
      const lines = doc.splitTextToSize(text, contentWidth);
      lines.forEach((line: string) => {
        checkPageBreak(size * 0.5);
        doc.text(line, margin, yPos);
        yPos += size * 0.45;
      });
      yPos += 2;
    };

    const addHeaderSection = (title: string) => {
      checkPageBreak(12);
      yPos += 4;
      doc.setFont(fontPrimary, "bold");
      doc.setFontSize(11);
      doc.setTextColor(textBlack[0], textBlack[1], textBlack[2]);
      doc.text(title.toUpperCase(), margin, yPos);
      yPos += 2;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.3);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 6;
    };

    // 1. Identification Header
    doc.setFont(fontPrimary, "bold");
    doc.setFontSize(18);
    const nameStr = profile.name.toUpperCase();
    const nameWidth = doc.getTextWidth(nameStr);
    doc.text(nameStr, (pageWidth - nameWidth) / 2, yPos);
    yPos += 8;

    doc.setFont(fontPrimary, "normal");
    doc.setFontSize(10);
    const contactInfo = `${profile.location}${profile.email ? ' | ' + profile.email : ''}${profile.linkedin ? ' | ' + profile.linkedin : ''}${profile.github ? ' | ' + profile.github : ''}`;
    const contactWidth = doc.getTextWidth(contactInfo);
    doc.text(contactInfo, (pageWidth - contactWidth) / 2, yPos);
    yPos += 12;

    doc.setFont(fontPrimary, "bold");
    doc.setFontSize(12);
    const targetTitle = result.resume_target_title.toUpperCase();
    const titleWidth = doc.getTextWidth(targetTitle);
    doc.text(targetTitle, (pageWidth - titleWidth) / 2, yPos);
    yPos += 10;

    // 2. Summary
    addHeaderSection("Professional Summary");
    addText(result.resume_professional_summary);

    // 3. Specialized Experience
    addHeaderSection("Core Competencies & Impact");
    const combinedExperience = [...result.resume_role_specific_bullets, ...result.resume_core_bullets];
    combinedExperience.forEach(item => {
      doc.setFont(fontPrimary, "normal");
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(item, contentWidth - 8);
      checkPageBreak(lines.length * 5 + 2);
      doc.text("•", margin, yPos);
      lines.forEach((line: string) => {
        doc.text(line, margin + 5, yPos);
        yPos += 5;
      });
      yPos += 1;
    });

    // 4. Skills & Assets
    addHeaderSection("Technical Skills & Signature Assets");
    const skillsText = profile.core_skills.join(", ");
    addText(skillsText);

    doc.save(`${profile.name.replace(/\s+/g, '_')}_Resume_Tailored.pdf`);
  };

  const handleDownloadCoverLetterPDF = () => {
    if (!result) return;
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 25;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(profile.name.toUpperCase(), margin, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(profile.location, margin, yPos);
    yPos += 15;

    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(today, margin, yPos);
    yPos += 15;

    doc.text("To the Hiring Team,", margin, yPos);
    yPos += 10;

    const bodyText = result.cover_letter_body;
    const lines = doc.splitTextToSize(bodyText, contentWidth);
    doc.setFontSize(11);
    lines.forEach((line: string) => {
      if (yPos > 275) { doc.addPage(); yPos = 25; }
      doc.text(line, margin, yPos);
      yPos += 6.5;
    });

    yPos += 10;
    doc.text("Sincerely,", margin, yPos);
    yPos += 10;
    doc.setFont("helvetica", "bold");
    doc.text(profile.name, margin, yPos);

    doc.save(`${profile.name.replace(/\s+/g, '_')}_CoverLetter_Tailored.pdf`);
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) { setError("Input required: JD signals missing."); return; }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await generateContent(jobDescription, targetRole, profile);
      setResult(data);
    } catch (err) {
      setError("Calibrator failure. Verify API connection.");
    } finally {
      setLoading(false);
    }
  };

  const filteredJDs = jdLibrary.filter(jd => 
    jd.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    jd.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-primary-500/30 selection:text-white font-sans">
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-2 rounded-lg shadow-lg">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">BLKDMND <span className="text-slate-400 font-light italic">Career Engine</span></h1>
              <p className="text-xs text-slate-500 font-medium">Session Active: {profile.name}</p>
            </div>
          </div>
           <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-800/50 rounded-lg border border-slate-800 p-1">
              <button onClick={handleDownloadPitchPDF} className="text-[10px] font-bold text-slate-400 hover:text-primary-400 transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-slate-800">
                <Rocket size={12} className="text-primary-500" /> Engine Pitch
              </button>
              <div className="w-px h-4 bg-slate-700 mx-1"></div>
              <button onClick={() => setShowOnboarding(true)} className="text-[10px] font-bold text-slate-400 hover:text-primary-400 transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-slate-800">
                <BookOpen size={12} className="text-primary-500" /> Onboarding
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${process.env.API_KEY ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></span>
              <span className="text-xs text-slate-500 font-mono hidden sm:block">Calibration {process.env.API_KEY ? 'Synced' : 'Missing Signal'}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-primary-500/10">
                 <Rocket size={120} />
              </div>
              <div className="space-y-6 relative z-10">
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Settings size={14} /> Profile Bootstrap
                    </label>
                    {!isEditingProfile && (
                      <button 
                        onClick={() => setIsEditingProfile(true)}
                        className="text-[10px] text-primary-400 hover:text-primary-300 font-bold uppercase flex items-center gap-1 transition-colors"
                      >
                        <Edit3 size={10} /> Edit Base Data
                      </button>
                    )}
                  </div>

                  {isEditingProfile ? (
                    <div className="space-y-4 animate-in fade-in duration-300 bg-slate-950/40 p-4 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase">Profile Editor</h4>
                        <button onClick={() => setIsEditingProfile(false)} className="text-slate-500 hover:text-rose-400">
                          <X size={14} />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 uppercase font-bold">Full Name</label>
                          <input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-primary-500" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 uppercase font-bold">Roles (CSV)</label>
                          <textarea value={editForm.roles.join(', ')} onChange={(e) => setEditForm({...editForm, roles: e.target.value.split(',').map(s => s.trim())})} className="w-full h-16 bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-primary-500 resize-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 uppercase font-bold">Signature Projects (CSV)</label>
                          <textarea value={editForm.signature_projects.join(', ')} onChange={(e) => setEditForm({...editForm, signature_projects: e.target.value.split(',').map(s => s.trim())})} className="w-full h-16 bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-primary-500 resize-none" />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button onClick={handleProfileSave} className="flex-1 bg-primary-600 hover:bg-primary-500 text-white text-[10px] font-bold py-2 rounded flex items-center justify-center gap-1 shadow-lg transition-all active:scale-95">
                          <Save size={12} /> Sync Changes
                        </button>
                        <button onClick={() => setIsEditingProfile(false)} className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px] font-bold py-2 rounded transition-all">
                          Discard
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      <div className="relative group">
                        <button onClick={() => fileInputRef.current?.click()} className={`w-full flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-xs font-bold text-white transition-all shadow-xl active:scale-95 ring-1 ${uploadSuccess ? 'bg-emerald-600 ring-emerald-400/40' : 'bg-slate-800 hover:bg-slate-700 ring-white/10'}`}>
                          {uploadSuccess ? <ShieldCheck size={16} /> : <FileUp size={16} />}
                          {uploadSuccess ? 'Resume Sync Active' : 'Import Resume (PDF)'}
                        </button>
                        {uploadSuccess && (
                          <div className="absolute -top-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-lg animate-bounce">
                             <Check size={10} strokeWidth={4} />
                          </div>
                        )}
                      </div>
                      
                      {uploadSuccess && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-900/20 border border-emerald-800/50 rounded-lg animate-in fade-in slide-in-from-top-1 duration-300">
                           <div className="p-1 rounded bg-emerald-500/20">
                              <ShieldCheck size={12} className="text-emerald-400" />
                           </div>
                           <p className="text-[10px] text-emerald-400 font-bold truncate">
                             Signals extracted from <span className="text-white">{uploadSuccess}</span>
                           </p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <button onClick={handleDownloadTemplate} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium transition-colors">
                          <Download size={14} /> Export
                        </button>
                        <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium transition-colors">
                          <FileCode size={14} /> Import
                        </button>
                      </div>
                      <input type="file" ref={fileInputRef} onChange={handleProfileUpload} accept=".pdf,.json" className="hidden" />
                      <p className="text-[10px] text-slate-600 text-center font-mono">Profile state persisted to localStorage</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Database size={14} /> JD Library
                    </label>
                    <button onClick={() => setShowJDLibrary(!showJDLibrary)} className="text-[10px] text-primary-400 hover:text-primary-300 font-bold uppercase flex items-center gap-1 transition-all">
                      {showJDLibrary ? 'Collapse' : 'Manage Data'}
                    </button>
                  </div>
                  {showJDLibrary && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="relative group">
                         <input 
                           type="text" 
                           placeholder="Search library..." 
                           value={searchTerm} 
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full bg-slate-950 border border-slate-800 rounded px-8 py-1.5 text-[10px] text-slate-300 outline-none focus:border-primary-500"
                         />
                         <Search size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600" />
                      </div>
                      <div className="bg-slate-950/80 rounded-lg border border-slate-800 p-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
                        {filteredJDs.map((jd) => (
                          <div key={jd.id} className="relative group mb-1">
                            <button 
                              onClick={() => { setJobDescription(jd.description); setTargetRole(jd.title); setShowJDLibrary(false); }} 
                              className="w-full text-left px-3 py-2 pr-10 rounded border border-transparent hover:border-slate-700 hover:bg-slate-900 transition-all flex flex-col"
                            >
                              <div className="text-xs font-bold text-slate-200 group-hover:text-primary-400 line-clamp-1">{jd.title}</div>
                              <div className="text-[9px] text-slate-600 uppercase tracking-tighter mt-0.5">{jd.source}</div>
                            </button>
                            <button 
                              onClick={(e) => handleDeleteJDFromLibrary(jd.id, e)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-800 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                        {filteredJDs.length === 0 && (
                          <p className="text-[10px] text-slate-600 text-center py-4 italic">No matching records.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Briefcase size={14} /> Target Strategy
                  </label>
                  <input list="role-suggestions" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. Creative Producer" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-primary-500 hover:border-slate-600 transition-colors" />
                  <datalist id="role-suggestions">{profile.roles.map((r, i) => <option key={i} value={r} />)}</datalist>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <FileText size={14} /> Job Description
                    </label>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleSaveCurrentJDToLibrary}
                        disabled={!jobDescription.trim() || !targetRole.trim()}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 disabled:text-slate-800 uppercase font-bold tracking-tighter transition-colors flex items-center gap-1"
                      >
                        <BookmarkPlus size={10} /> Save Lib
                      </button>
                      <button onClick={() => jdPdfInputRef.current?.click()} className="text-[10px] text-primary-400 hover:text-primary-300 uppercase font-bold tracking-tighter transition-colors flex items-center gap-1">
                        <Upload size={10} /> PDF
                      </button>
                      <button onClick={() => setJobDescription('')} className="text-[10px] text-slate-500 hover:text-rose-400 uppercase font-bold tracking-tighter transition-colors flex items-center gap-1">
                        <Trash2 size={10} /> Reset
                      </button>
                    </div>
                  </div>
                  <input type="file" ref={jdPdfInputRef} onChange={handleJDPDFUpload} accept=".pdf" className="hidden" />
                  <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste JD signals or upload PDF..." className="w-full h-72 bg-slate-950 border border-slate-700 rounded-lg p-4 text-xs font-mono text-slate-300 outline-none resize-none focus:ring-1 focus:ring-primary-500 scrollbar-thin scrollbar-thumb-slate-800 transition-colors hover:border-slate-600" />
                </div>

                <button onClick={handleGenerate} disabled={loading || !jobDescription.trim()} className="w-full bg-primary-600 hover:bg-primary-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-primary-500/20 active:scale-95 group">
                  {loading ? <><Loader2 className="animate-spin" size={18} /> Engine Processing...</> : <><Sparkles size={18} className="group-hover:animate-pulse" /> Calibrate Narrative</>}
                </button>
                {error && <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-lg text-rose-400 text-[10px] text-center font-bold tracking-tight">{error}</div>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl min-h-[600px] bg-slate-900/10">
                <div className="p-8 bg-slate-900 rounded-full mb-6 ring-1 ring-slate-800 shadow-2xl relative">
                  <Film size={64} className="text-primary-500/30" />
                  <div className="absolute inset-0 border-2 border-primary-500/20 rounded-full animate-ping pointer-events-none"></div>
                </div>
                <h3 className="text-slate-300 font-bold uppercase tracking-[0.2em] text-sm">System Ready</h3>
                <p className="text-xs mt-3 text-slate-500 max-w-xs text-center leading-relaxed">Engine synchronized for <b>{profile.name}</b>. Insert Job Description signals to initiate semantic calibration.</p>
                <button onClick={() => setShowOnboarding(true)} className="mt-6 flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-primary-400 border border-slate-700 rounded-xl text-xs font-bold transition-all">
                  <HelpCircle size={14} /> Need Help Getting Started?
                </button>
              </div>
            )}
            
            {loading && (
              <div className="h-full flex flex-col items-center justify-center min-h-[600px] space-y-8">
                 <div className="relative">
                    <div className="w-24 h-24 border-4 border-slate-900 border-t-primary-500 rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <Rocket size={40} className="text-primary-500 animate-bounce" />
                    </div>
                 </div>
                 <div className="text-center space-y-2">
                    <p className="text-slate-200 font-bold text-lg tracking-tight">Extracting High-Value Signals</p>
                    <p className="text-slate-500 text-xs font-mono uppercase tracking-widest animate-pulse">Running semantic cross-reference engine...</p>
                 </div>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <MatchMeter 
                  score={result.match_score} 
                  explanation={result.match_explanation}
                  userName={profile.name} 
                />

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center justify-between shadow-2xl ring-1 ring-white/5">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-slate-800 rounded-2xl text-primary-400 shadow-inner ring-1 ring-white/10">
                      <Share2 size={28} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">Deployment Assets</h3>
                      <p className="text-[11px] text-slate-500 uppercase font-bold tracking-[0.1em]">Engine optimized for {targetRole}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                    <button onClick={handleDownloadResumePDF} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 transition-all active:scale-95 shadow-lg group">
                      <User size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" /> Resume.pdf
                    </button>
                    <button onClick={handleDownloadCoverLetterPDF} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold transition-all shadow-xl hover:shadow-primary-500/40 active:scale-95 group">
                      <Mail size={18} className="group-hover:animate-pulse" /> Cover_Letter.pdf
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                  <section className="space-y-6">
                    <div className="flex items-center gap-4 text-primary-400 pb-3 border-b border-slate-800/50">
                      <div className="p-2 rounded-lg bg-primary-500/10">
                        <FileText size={20} />
                      </div>
                      <h2 className="text-lg font-black text-white uppercase tracking-widest">Resume Strategy</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ResultCard title="Narrative Thesis" content={result.resume_professional_summary} className="md:col-span-2 border-primary-500/10 bg-primary-500/[0.02]" />
                      <ResultCard title="Target Impact" content={result.resume_role_specific_bullets} />
                      <ResultCard title="Core Operations" content={result.resume_core_bullets} />
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-4 text-primary-400 pb-3 border-b border-slate-800/50">
                      <div className="p-2 rounded-lg bg-primary-500/10">
                        <MessageSquare size={20} />
                      </div>
                      <h2 className="text-lg font-black text-white uppercase tracking-widest">Interview Intelligence</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ResultCard 
                        title="Recruiter Talking Points" 
                        content={result.interview_bullets} 
                        description="Key signals for phone screens and technical rounds"
                      />
                      <ResultCard 
                        title="Interview Study Tips" 
                        content={result.interview_prep_tips} 
                        description="Strategic areas to review before the meeting"
                      />
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-4 text-primary-400 pb-3 border-b border-slate-800/50">
                      <div className="p-2 rounded-lg bg-primary-500/10">
                        <Linkedin size={20} />
                      </div>
                      <h2 className="text-lg font-black text-white uppercase tracking-widest">Digital Presence</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      <ResultCard title="Headline Optimization" content={result.linkedin_headline} />
                      <ResultCard title="Brand 'About' Narrative" content={result.linkedin_about_section} />
                    </div>
                  </section>
                </div>

                <footer className="pt-8 pb-4 text-center border-t border-slate-900">
                   <p className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.4em]">Proprietary Calibration Protocol • BLKDMND Digital</p>
                </footer>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
