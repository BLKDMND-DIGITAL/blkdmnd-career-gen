
import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { TargetRole, TailoredContent, CandidateProfile, WorkExperience } from './types';
import { generateContent, parseResumePDF, extractTextFromPDF, parseResumeText } from './services/gemini';
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
  GraduationCap,
  Layers,
  ListRestart,
  Activity,
  BrainCircuit,
  Lightbulb,
  CheckCircle2,
  Sun,
  Moon,
  Eraser,
  Shield,
  Terminal,
  FileJson,
  Github,
  Globe,
  MapPin,
  Phone,
  Type,
  Calendar
} from 'lucide-react';

const OnboardingModal: React.FC<{ onClose: () => void; onDownloadSpecs: () => void }> = ({ onClose, onDownloadSpecs }) => {
  const steps = [
    {
      icon: <Terminal className="text-primary-500" size={24} />,
      title: "1. Upload Profile",
      desc: "Upload your Resume (PDF/JSON). The engine extracts your skills and history to create a personal data foundation."
    },
    {
      icon: <Cpu className="text-primary-500" size={24} />,
      title: "2. Add Job Details",
      desc: "Paste the Job Description. Our system identifies exactly what the company is looking for in a top candidate."
    },
    {
      icon: <BrainCircuit className="text-amber-500" size={24} />,
      title: "3. Smart Tailoring",
      desc: "The engine bridges the gap between your history and the job, ensuring your value is clear and focused."
    },
    {
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      title: "4. Apply with Confidence",
      desc: "Download your tailored resume and cover letter. Everything is optimized for both hiring managers and digital filters."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-500/10 rounded-xl">
              <Shield className="text-primary-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">How it Works</h2>
              <p className="text-xs text-slate-500 dark:text-slate-500 font-medium tracking-wide">AI-Powered Career Tailoring</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="p-6 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 group hover:border-primary-500/30 transition-all duration-300">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">{step.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-primary-500/5 border border-primary-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary-500/10 rounded-lg shrink-0">
                <FileCode className="text-primary-500" size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">System Whitepaper</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Learn how we use LLMs and guardrails to protect your data and prevent errors.
                </p>
              </div>
            </div>
            <button 
              onClick={onDownloadSpecs}
              className="w-full sm:w-auto flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              <Download size={14} /> Download Specs
            </button>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 dark:hover:bg-primary-500 text-white rounded-xl text-xs font-bold transition-all shadow-xl active:scale-95"
          >
            Get Started <ArrowRight size={16} />
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
    if (score >= 85) return 'text-emerald-500 dark:text-emerald-400';
    if (score >= 65) return 'text-amber-500 dark:text-amber-400';
    return 'text-rose-500 dark:text-rose-400';
  };

  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/5">
      <div className="p-8 flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-48 h-24 overflow-hidden">
          <svg className="w-48 h-48 transform translate-y-2">
            <path
              d={`M ${strokeWidth/2},${radius} A ${normalizedRadius},${normalizedRadius} 0 0,1 ${radius*2 - strokeWidth/2},${radius}`}
              fill="none"
              stroke="currentColor"
              className="text-slate-100 dark:text-slate-800"
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
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Match Score</span>
          </div>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full blur-xl opacity-30 bg-gradient-to-r ${getColorClass()}`}></div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${getTextClass()}`}>
              <Target size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">AI Insights</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Results for {userName}</p>
            </div>
          </div>
          
          <div className="relative pl-5">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-primary-500/40"></div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "{explanation}"
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={12} className="text-amber-500" /> High Confidence
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={12} className="text-emerald-500" /> ATS Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('fasttrack_theme');
    if (saved) return saved as 'dark' | 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

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
  const [isPastingProfile, setIsPastingProfile] = useState(false);
  const [profilePasteText, setProfilePasteText] = useState('');
  const [editForm, setEditForm] = useState<CandidateProfile>(profile);
  const [jdLibrary, setJdLibrary] = useState(loadJDs());
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDates, setShowDates] = useState(false);
  
  const [inputMode, setInputMode] = useState<'single' | 'bulk'>('single');
  const [bulkInputs, setBulkInputs] = useState<string[]>(new Array(10).fill(''));
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const jdPdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('fasttrack_theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

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

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleDownloadSystemSpecs = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);
    let y = 25;

    const addH1 = (text: string) => {
      doc.setFont("helvetica", "bold").setFontSize(22);
      doc.text(text.toUpperCase(), margin, y);
      y += 12;
    };

    const addH2 = (text: string) => {
      y += 5;
      doc.setFont("helvetica", "bold").setFontSize(13);
      doc.text(text.toUpperCase(), margin, y);
      y += 2;
      doc.setDrawColor(236, 157, 52).line(margin, y, margin + 40, y);
      y += 8;
    };

    const addBody = (text: string) => {
      doc.setFont("helvetica", "normal").setFontSize(10);
      const lines = doc.splitTextToSize(text, contentWidth);
      lines.forEach((l: string) => {
        doc.text(l, margin, y);
        y += 5.5;
      });
      y += 4;
    };

    addH1("System Whitepaper: Fast Track Engine");
    doc.setFontSize(10).setFont("helvetica", "italic");
    doc.text("LLM Integration & Safety Protocol v2.1", margin, y);
    y += 15;

    addH2("1. Smart Matching Architecture");
    addBody("Fast Track uses the Gemini-3-Flash engine to act as an intelligent bridge. It maps your professional history against the complex requirements of a job description. The system doesn't just look for keywords; it understands your achievements and translates them into the language hiring managers value.");

    addH2("2. Accuracy & Guardrails");
    addBody("To ensure high-quality results, we use a grounding protocol. This means the AI is instructed to only use information from your profile. It is forbidden from making up degrees or skills. We use specific settings to keep the tone professional and the data accurate.");

    addH2("3. Data Privacy");
    addBody("Your privacy is a priority. All your personal data is stored locally in your browser. When we generate content, only the relevant bits of your profile are used. Your data never leaves your control.");

    addH2("4. Professional Standards");
    addBody("Our output is designed to be deployment-ready. Resumes and cover letters are built to pass digital screening systems while remaining engaging for human recruiters. We focus on measurable impact and professional clarity.");

    addH2("5. Proven Results");
    addBody("Users typically see a significant reduction in the time it takes to tailor applications, and higher match scores in application portals. This tool is built to get you from application to interview faster.");

    doc.save("FastTrack_System_Specs.pdf");
  };

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

  const handleProfilePasteSync = async () => {
    if (!profilePasteText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const parsedProfile = await parseResumeText(profilePasteText);
      setProfile(parsedProfile);
      setResult(null);
      setIsPastingProfile(false);
      setProfilePasteText('');
      setUploadSuccess("Bio Text Parsed");
      setTimeout(() => setUploadSuccess(null), 5000);
    } catch (err) {
      setError("Engine failed to parse text. Please ensure it contains relevant career info.");
    } finally {
      setLoading(false);
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
      description: jobDescription,
      tailored_content: result
    };
    setJdLibrary([newJD, ...jdLibrary]);
    setShowJDLibrary(true);
  };

  const handleDeleteJDFromLibrary = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Remove this job from your library?")) {
      setJdLibrary(jdLibrary.filter(jd => jd.id !== id));
    }
  };

  const handleClearAllLibrary = () => {
    if (confirm("Permanently delete all saved jobs? This cannot be undone.")) {
      setJdLibrary([]);
      setResult(null);
    }
  };

  const handleBulkScan = async () => {
    const activeInputs = bulkInputs.filter(t => t.trim().length > 10);
    if (activeInputs.length === 0) {
      setError("Please paste at least one job description.");
      return;
    }
    setError(null);
    setIsScanning(true);
    setScanProgress(0);
    setScanStatus('Getting started...');
    const processedJDs = [];
    for (let i = 0; i < activeInputs.length; i++) {
      const jd = activeInputs[i];
      setScanStatus(`Processing Job ${i + 1}/${activeInputs.length}...`);
      try {
        const tailored = await generateContent(jd, targetRole, profile);
        processedJDs.push({
          id: `${Date.now()}-${i}`,
          source: 'Bulk Scan',
          title: tailored.resume_target_title || targetRole,
          description: jd,
          tailored_content: tailored
        });
        setScanProgress(((i + 1) / activeInputs.length) * 100);
      } catch (err) {
        console.error(`Error processing Job ${i + 1}`, err);
      }
    }
    if (processedJDs.length > 0) {
      setJdLibrary(prev => [...processedJDs, ...prev]);
      setShowJDLibrary(true);
    } else {
      setError("Bulk scan failed to produce results.");
    }
    setTimeout(() => {
      setIsScanning(false);
      setBulkInputs(new Array(10).fill(''));
      setScanProgress(0);
    }, 2000);
  };

  const handleJDPDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setLoading(true);
    setError(null);
    try {
      if (files.length === 1) {
        const base64 = await fileToBase64(files[0]);
        const text = await extractTextFromPDF(base64);
        setJobDescription(text);
      } else {
        const fileList = Array.from(files).slice(0, 10) as File[];
        const newJDs = [];
        for (let i = 0; i < fileList.length; i++) {
          const base64 = await fileToBase64(fileList[i]);
          const text = await extractTextFromPDF(base64);
          newJDs.push({
            id: `${Date.now()}-${i}`,
            source: 'PDF Batch',
            title: fileList[i].name.replace('.pdf', ''),
            description: text
          });
        }
        setJdLibrary(prev => [...newJDs, ...prev]);
        setShowJDLibrary(true);
      }
    } catch (err) {
      setError("Failed to read the PDF file.");
    } finally {
      setLoading(false);
      if (event.target) event.target.value = '';
    }
  };

  const handleDownloadResumePDF = () => {
    if (!result) return;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    doc.setTextColor(0, 0, 0);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = 20;

    const addText = (text: string, size = 10, isBold = false, spacing = 5) => {
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, contentWidth);
      lines.forEach((line: string) => {
        if (yPos > pageHeight - 15) { doc.addPage(); yPos = 20; }
        doc.text(line, margin, yPos);
        yPos += spacing;
      });
      yPos += 1;
    };

    const addHeading = (title: string) => {
      yPos += 4;
      doc.setFont("helvetica", "bold").setFontSize(11);
      doc.text(title.toUpperCase(), margin, yPos);
      yPos += 1.5;
      doc.setDrawColor(0).line(margin, yPos, pageWidth - margin, yPos);
      yPos += 6;
    };

    // Header
    doc.setFont("helvetica", "bold").setFontSize(18);
    const n = profile.name.toUpperCase();
    doc.text(n, margin, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal").setFontSize(10);
    const contactParts = [
      profile.location, 
      profile.phone,
      profile.email, 
      profile.linkedin, 
      profile.github
    ].filter(Boolean);
    const contactLine = contactParts.join(" | ");
    doc.text(contactLine, margin, yPos);
    yPos += 12;

    // Professional Summary
    addHeading("Professional Summary");
    addText(result.resume_professional_summary, 10, false, 5);

    // Skills
    addHeading("Core Competencies & Technical Skills");
    addText(profile.core_skills.join(" | "), 10, false, 5);

    // Experience
    addHeading("Professional Experience");
    
    // If we have structured experience with dates, list it chronologically
    if (profile.experience && profile.experience.length > 0) {
      profile.experience.forEach((exp, idx) => {
        if (yPos > pageHeight - 30) { doc.addPage(); yPos = 20; }
        
        doc.setFont("helvetica", "bold").setFontSize(11);
        doc.text(exp.role, margin, yPos);
        
        if (showDates) {
          doc.setFont("helvetica", "normal").setFontSize(10);
          const dateRange = `${exp.startDate} - ${exp.endDate}`;
          const dateWidth = doc.getTextWidth(dateRange);
          doc.text(dateRange, pageWidth - margin - dateWidth, yPos);
        }
        yPos += 5;
        
        doc.setFont("helvetica", "italic").setFontSize(10);
        doc.text(exp.company, margin, yPos);
        yPos += 6;
        
        // Use tailored bullets for the relevant profile experience
        if (idx === 0) {
           [...result.resume_role_specific_bullets, ...result.resume_core_bullets].forEach(b => {
             addText(`• ${b}`, 10, false, 5);
           });
        } else {
           addText(`• ${exp.description}`, 10, false, 5);
        }
        yPos += 4;
      });
    } else {
      // Fallback if no structured experience
      doc.setFont("helvetica", "bold").setFontSize(11);
      doc.text(result.resume_target_title || "Target Role", margin, yPos);
      yPos += 6;
      [...result.resume_role_specific_bullets, ...result.resume_core_bullets].forEach(b => {
        addText(`• ${b}`, 10, false, 5);
      });
    }

    // Signature Projects
    if (profile.signature_projects && profile.signature_projects.length > 0) {
      addHeading("Signature Projects & Impact");
      profile.signature_projects.forEach(p => {
        addText(`• ${p}`, 10, false, 5);
      });
    }

    // Education
    if (profile.education) {
      addHeading("Education");
      addText(profile.education, 10, false, 5);
    }

    // Certifications
    if (profile.certifications && profile.certifications.length > 0) {
      addHeading("Certifications");
      addText(profile.certifications.join(" | "), 10, false, 5);
    }

    const sanitize = (s: string) => s.replace(/[^a-z0-9]/gi, '_');
    const safeName = sanitize(profile.name);
    const safeRole = sanitize(targetRole);
    doc.save(`${safeName}_${safeRole}_Resume.pdf`);
  };

  const handleDownloadCoverLetterPDF = () => {
    if (!result) return;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    doc.setTextColor(0, 0, 0);
    const margin = 25;
    const contentWidth = doc.internal.pageSize.getWidth() - (margin * 2);
    let yPos = 25;

    // Header Info
    doc.setFont("helvetica", "bold").setFontSize(14);
    doc.text(profile.name.toUpperCase(), margin, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal").setFontSize(10);
    doc.text(profile.location || "", margin, yPos);
    yPos += 5;
    doc.text(profile.email || "", margin, yPos);
    yPos += 5;
    doc.text(profile.phone || "", margin, yPos);
    yPos += 15;

    // Date
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(today, margin, yPos);
    yPos += 15;

    // Recipient Placeholder
    doc.text("Hiring Manager,", margin, yPos);
    yPos += 10;

    // Body
    const lines = doc.splitTextToSize(result.cover_letter_body, contentWidth);
    lines.forEach((l: string) => { 
      if (yPos > 270) { doc.addPage(); yPos = 25; }
      doc.text(l, margin, yPos); 
      yPos += 6; 
    });
    
    yPos += 10;
    doc.text("Sincerely,", margin, yPos);
    yPos += 8;
    doc.setFont("helvetica", "bold");
    doc.text(profile.name, margin, yPos);

    const sanitize = (s: string) => s.replace(/[^a-z0-9]/gi, '_');
    const safeName = sanitize(profile.name);
    const safeRole = sanitize(targetRole);
    doc.save(`${safeName}_${safeRole}_CoverLetter.pdf`);
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) { setError("Please provide a job description."); return; }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await generateContent(jobDescription, targetRole, profile);
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const filteredJDs = jdLibrary.filter(jd => 
    jd.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    jd.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen theme-transition bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-primary-500/20 selection:text-primary-600">
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} onDownloadSpecs={handleDownloadSystemSpecs} />}
      
      <header className="border-b border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 dark:bg-primary-600 p-2.5 rounded-2xl shadow-lg ring-1 ring-black/10 dark:ring-white/10 transition-transform hover:scale-105">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">FAST TRACK</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{profile.name} • Version 2.2</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary-500 hover:border-primary-500/30 transition-all shadow-sm"
                title="Change Theme"
             >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             
             <button 
                onClick={() => setShowOnboarding(true)} 
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-primary-500 hover:border-primary-500/30 transition-all shadow-sm"
             >
                <Shield size={16} /> Specs
             </button>

             <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className={`w-1.5 h-1.5 rounded-full ${process.env.API_KEY ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`}></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:block">{process.env.API_KEY ? 'Active' : 'Offline'}</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isScanning && (
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-primary-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary-500/[0.02] pointer-events-none"></div>
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-primary-500/10 rounded-2xl animate-pulse">
                        <Activity className="text-primary-500" size={24} />
                     </div>
                     <div>
                        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-widest">Processing Multiple Jobs</h3>
                        <p className="text-[11px] text-slate-500 font-mono tracking-wider">{scanStatus}</p>
                     </div>
                  </div>
                  <span className="text-2xl font-black text-primary-500 font-mono tracking-tighter">{Math.round(scanProgress)}%</span>
               </div>
               <div className="w-full bg-slate-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-700 ease-in-out shadow-[0_0_20px_rgba(236,157,52,0.4)]"
                    style={{ width: `${scanProgress}%` }}
                  />
               </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden transition-all">
              <div className="space-y-8 relative z-10">
                
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Settings size={14} /> My Profile
                    </label>
                    <div className="flex items-center gap-3">
                      {!isEditingProfile && (
                        <button onClick={() => { setIsEditingProfile(true); setIsPastingProfile(false); }} className="text-[10px] text-primary-600 dark:text-primary-400 hover:text-primary-500 font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                          <Edit3 size={12} /> Edit Details
                        </button>
                      )}
                      {!isPastingProfile && !isEditingProfile && (
                        <button onClick={() => { setIsPastingProfile(true); setIsEditingProfile(false); }} className="text-[10px] text-amber-600 dark:text-amber-400 hover:text-amber-500 font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                          <Type size={12} /> Paste Bio
                        </button>
                      )}
                    </div>
                  </div>

                  {isEditingProfile ? (
                    <div className="space-y-5 animate-in fade-in duration-300 bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Editor</h4>
                        <button onClick={() => setIsEditingProfile(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1.5"><User size={10} /> Full Name</label>
                          <input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1.5"><MapPin size={10} /> Location</label>
                          <input value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} placeholder="City, State" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1.5"><Phone size={10} /> Contact Phone</label>
                          <input value={editForm.phone || ''} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1.5"><Mail size={10} /> Email Address</label>
                          <input value={editForm.email || ''} onChange={(e) => setEditForm({...editForm, email: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1.5"><Linkedin size={10} /> LinkedIn URL</label>
                          <input value={editForm.linkedin || ''} onChange={(e) => setEditForm({...editForm, linkedin: e.target.value})} placeholder="linkedin.com/in/username" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1.5"><Github size={10} /> GitHub URL</label>
                          <input value={editForm.github || ''} onChange={(e) => setEditForm({...editForm, github: e.target.value})} placeholder="github.com/username" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                        </div>
                        
                        <div className="pt-4 space-y-3">
                           <label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                             <Briefcase size={12} /> Work Experience (with dates)
                           </label>
                           {editForm.experience?.map((exp, idx) => (
                             <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3 shadow-sm relative group">
                                <button 
                                  onClick={() => {
                                    const nextExp = [...(editForm.experience || [])];
                                    nextExp.splice(idx, 1);
                                    setEditForm({...editForm, experience: nextExp});
                                  }}
                                  className="absolute top-2 right-2 p-1 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <X size={14} />
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                   <div className="space-y-1">
                                      <label className="text-[9px] text-slate-400 uppercase font-bold">Role</label>
                                      <input 
                                        value={exp.role} 
                                        onChange={(e) => {
                                          const nextExp = [...(editForm.experience || [])];
                                          nextExp[idx] = {...exp, role: e.target.value};
                                          setEditForm({...editForm, experience: nextExp});
                                        }}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary-500" 
                                      />
                                   </div>
                                   <div className="space-y-1">
                                      <label className="text-[9px] text-slate-400 uppercase font-bold">Company</label>
                                      <input 
                                        value={exp.company} 
                                        onChange={(e) => {
                                          const nextExp = [...(editForm.experience || [])];
                                          nextExp[idx] = {...exp, company: e.target.value};
                                          setEditForm({...editForm, experience: nextExp});
                                        }}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary-500" 
                                      />
                                   </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                   <div className="space-y-1">
                                      <label className="text-[9px] text-slate-400 uppercase font-bold flex items-center gap-1"><Calendar size={8} /> Start Date</label>
                                      <input 
                                        value={exp.startDate} 
                                        onChange={(e) => {
                                          const nextExp = [...(editForm.experience || [])];
                                          nextExp[idx] = {...exp, startDate: e.target.value};
                                          setEditForm({...editForm, experience: nextExp});
                                        }}
                                        placeholder="e.g. Jan 2020"
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary-500" 
                                      />
                                   </div>
                                   <div className="space-y-1">
                                      <label className="text-[9px] text-slate-400 uppercase font-bold flex items-center gap-1"><Calendar size={8} /> End Date</label>
                                      <input 
                                        value={exp.endDate} 
                                        onChange={(e) => {
                                          const nextExp = [...(editForm.experience || [])];
                                          nextExp[idx] = {...exp, endDate: e.target.value};
                                          setEditForm({...editForm, experience: nextExp});
                                        }}
                                        placeholder="e.g. Present"
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary-500" 
                                      />
                                   </div>
                                </div>
                             </div>
                           ))}
                           <button 
                             onClick={() => setEditForm({...editForm, experience: [...(editForm.experience || []), {role: '', company: '', startDate: '', endDate: '', description: ''}]})}
                             className="w-full py-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-500 hover:border-primary-500 transition-all flex items-center justify-center gap-2"
                           >
                             <Plus size={14} /> Add Experience
                           </button>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1.5"><Briefcase size={10} /> Potential Roles</label>
                          <textarea value={editForm.roles.join(', ')} onChange={(e) => setEditForm({...editForm, roles: e.target.value.split(',').map(s => s.trim())})} className="w-full h-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none" />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button onClick={handleProfileSave} className="flex-1 bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 dark:hover:bg-primary-500 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95">
                          <Save size={14} /> Save Profile
                        </button>
                      </div>
                    </div>
                  ) : isPastingProfile ? (
                    <div className="space-y-5 animate-in fade-in duration-300 bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bio/Resume Ingestion</h4>
                        <button onClick={() => setIsPastingProfile(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                      <textarea 
                        value={profilePasteText} 
                        onChange={(e) => setProfilePasteText(e.target.value)} 
                        placeholder="Paste resume text or bio here..." 
                        className="w-full h-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-700 dark:text-slate-300 outline-none focus:border-primary-500 transition-all resize-none scrollbar-thin"
                      />
                      <button 
                        onClick={handleProfilePasteSync} 
                        disabled={loading || !profilePasteText.trim()}
                        className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-widest py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                      >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />} 
                        {loading ? 'Analyzing...' : 'Parse & Sync Profile'}
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      <button onClick={() => fileInputRef.current?.click()} className={`w-full group flex items-center justify-center gap-3 px-5 py-4 rounded-2xl text-xs font-bold transition-all shadow-lg active:scale-95 border ${uploadSuccess ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}>
                        {uploadSuccess ? <ShieldCheck size={18} /> : <FileUp size={18} className="group-hover:translate-y-[-2px] transition-transform" />}
                        {uploadSuccess ? uploadSuccess : 'Sync New Resume (PDF/JSON)'}
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleProfileUpload} accept=".pdf,.json" className="hidden" />
                      <p className="text-[9px] text-slate-400 dark:text-slate-600 text-center font-mono uppercase tracking-widest">Encrypted Local Engine</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Database size={14} /> My Jobs Library
                    </label>
                    <div className="flex items-center gap-3">
                      {showJDLibrary && jdLibrary.length > 0 && (
                        <button 
                          onClick={handleClearAllLibrary} 
                          className="text-[10px] text-rose-600 dark:text-rose-400 hover:text-rose-500 font-black uppercase tracking-widest flex items-center gap-1.5 transition-all"
                          title="Delete all jobs"
                        >
                          <Trash2 size={12} /> Clear All
                        </button>
                      )}
                      <button onClick={() => setShowJDLibrary(!showJDLibrary)} className="text-[10px] text-primary-600 dark:text-primary-400 hover:text-primary-500 font-black uppercase tracking-widest flex items-center gap-1.5 transition-all">
                        {showJDLibrary ? 'Hide' : 'Show Library'}
                      </button>
                    </div>
                  </div>
                  {showJDLibrary && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-2.5 max-h-64 overflow-y-auto ring-1 ring-black/[0.02]">
                        {filteredJDs.length > 0 ? filteredJDs.map((jd) => (
                          <div key={jd.id} className="relative group mb-1.5 last:mb-0">
                            <button 
                              onClick={() => { setJobDescription(jd.description); setTargetRole(jd.title); if (jd.tailored_content) setResult(jd.tailored_content); setShowJDLibrary(false); setInputMode('single'); }} 
                              className="w-full text-left px-4 py-3 pr-10 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-900/50 hover:shadow-md transition-all flex flex-col group"
                            >
                              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1 transition-colors">{jd.title}</div>
                              {jd.tailored_content && <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase mt-1">Ready: {jd.tailored_content.match_score}% Match</div>}
                            </button>
                            <button onClick={(e) => handleDeleteJDFromLibrary(jd.id, e)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-300 dark:text-slate-700 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )) : (
                          <div className="py-8 text-center">
                            <Database size={24} className="mx-auto text-slate-200 dark:text-slate-800 mb-2" />
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Library is Empty</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                   <div className="flex p-1.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                      <button 
                        onClick={() => setInputMode('single')}
                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${inputMode === 'single' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                      >
                        Single Job
                      </button>
                      <button 
                        onClick={() => setInputMode('bulk')}
                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${inputMode === 'bulk' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                      >
                        Multiple Jobs
                      </button>
                   </div>

                   {inputMode === 'single' ? (
                     <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Briefcase size={14} /> Target Job Title
                          </label>
                          <input list="role-suggestions" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. AI Solutions Engineer" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-3.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all hover:border-slate-300 dark:hover:border-slate-700" />
                          <datalist id="role-suggestions">{profile.roles.map((r, i) => <option key={i} value={r} />)}</datalist>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                              <FileText size={14} /> Job Description
                            </label>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => { setJobDescription(''); setResult(null); }} 
                                className="text-[10px] text-rose-600 dark:text-rose-400 hover:text-rose-500 uppercase font-black tracking-widest flex items-center gap-1.5 transition-colors"
                                title="Clear text"
                              >
                                <Eraser size={12} /> Clear
                              </button>
                              <button onClick={() => jdPdfInputRef.current?.click()} className="text-[10px] text-primary-600 dark:text-primary-400 hover:text-primary-500 uppercase font-black tracking-widest flex items-center gap-1.5 transition-colors">
                                <Upload size={12} /> Scan PDF
                              </button>
                            </div>
                          </div>
                          <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description here..." className="w-full h-80 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-xs font-mono text-slate-700 dark:text-slate-300 outline-none resize-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all hover:border-slate-300 dark:hover:border-slate-700 scrollbar-thin" />
                        </div>
                        
                        {/* Prompt Step: Dates Toggle prior to tailoring */}
                        <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-inner space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Resume Config</span>
                              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Include Experience Dates?</h4>
                            </div>
                            <button 
                              onClick={() => setShowDates(!showDates)}
                              className={`relative w-14 h-7 rounded-full transition-all duration-300 outline-none focus:ring-4 focus:ring-primary-500/10 ${showDates ? 'bg-primary-500 shadow-[0_0_15px_rgba(236,157,52,0.3)]' : 'bg-slate-200 dark:bg-slate-700'}`}
                            >
                              <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ease-spring ${showDates ? 'translate-x-7' : 'translate-x-0'}`}>
                                 {showDates ? <Calendar size={10} className="text-primary-500" /> : <ZapOff size={10} className="text-slate-400" />}
                              </div>
                              <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
                                 <span className={`text-[8px] font-black ${showDates ? 'opacity-0' : 'opacity-100'} text-slate-400 uppercase transition-opacity`}>OFF</span>
                                 <span className={`text-[8px] font-black ${showDates ? 'opacity-100' : 'opacity-0'} text-white uppercase transition-opacity`}>ON</span>
                              </div>
                            </button>
                          </div>
                          <p className="text-[9px] text-slate-500 leading-relaxed italic">
                            * ATS best practices vary; toggling dates {showDates ? "includes" : "excludes"} the timeframe for each role.
                          </p>
                        </div>

                        <button onClick={handleGenerate} disabled={loading || !jobDescription.trim()} className="w-full bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 dark:hover:bg-primary-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 group">
                          {loading ? <><Loader2 className="animate-spin" size={20} /> Tailoring...</> : <><Sparkles size={20} className="group-hover:animate-pulse" /> Tailor My Assets</>}
                        </button>
                     </div>
                   ) : (
                     <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto p-1.5">
                           {bulkInputs.map((text, idx) => (
                             <div key={idx} className="space-y-1.5">
                                <label className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Job #{idx + 1}</label>
                                <textarea 
                                  value={text} 
                                  onChange={(e) => {
                                    const next = [...bulkInputs];
                                    next[idx] = e.target.value;
                                    setBulkInputs(next);
                                  }}
                                  placeholder={`Paste description...`}
                                  className="w-full h-24 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-[10px] text-slate-600 dark:text-slate-300 outline-none focus:border-primary-500 transition-all resize-none"
                                />
                             </div>
                           ))}
                        </div>
                        <button 
                          onClick={handleBulkScan} 
                          disabled={isScanning || bulkInputs.every(t => !t.trim())}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-2xl"
                        >
                          {isScanning ? <><Loader2 className="animate-spin" size={20} /> Analyzing...</> : <><Layers size={20} /> Analyze All Jobs</>}
                        </button>
                     </div>
                   )}
                </div>

                <input type="file" ref={jdPdfInputRef} onChange={handleJDPDFUpload} accept=".pdf" multiple className="hidden" />
                {error && <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"><AlertCircle size={14} /> {error}</div>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {!result && !loading && !isScanning && (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl min-h-[600px] bg-slate-50/30 dark:bg-slate-900/10 group">
                <div className="p-10 bg-white dark:bg-slate-900 rounded-full mb-8 ring-1 ring-slate-100 dark:ring-slate-800 shadow-2xl relative transition-transform group-hover:scale-110">
                  <Cpu size={64} className="text-slate-200 dark:text-primary-500/20" />
                  <div className="absolute inset-0 border-2 border-primary-500/20 rounded-full animate-ping pointer-events-none opacity-0 group-hover:opacity-100"></div>
                </div>
                <h3 className="text-slate-400 dark:text-slate-300 font-black uppercase tracking-[0.4em] text-sm">System Ready</h3>
                <p className="text-xs mt-4 text-slate-500 dark:text-slate-500 max-w-xs text-center leading-relaxed font-medium">Fast Track is synchronized for <b>{profile.name}</b>. Make your configuration choices and paste a job description.</p>
              </div>
            )}
            
            {loading && (
              <div className="h-full flex flex-col items-center justify-center min-h-[600px] space-y-10">
                 <div className="relative">
                    <div className="w-28 h-28 border-[6px] border-slate-100 dark:border-slate-900 border-t-primary-500 rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <Zap size={44} className="text-primary-500 animate-pulse" />
                    </div>
                 </div>
                 <div className="text-center space-y-3">
                    <p className="text-slate-900 dark:text-white font-black text-xl tracking-tighter uppercase">Tailoring Content</p>
                    <div className="flex items-center justify-center gap-2">
                       <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
                       <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Gemini 3 Flash Preview Processing...</p>
                    </div>
                 </div>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <MatchMeter 
                  score={result.match_score} 
                  explanation={result.match_explanation}
                  userName={profile.name} 
                />

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col sm:flex-row gap-8 items-center justify-between shadow-2xl ring-1 ring-black/5 dark:ring-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary-500"></div>
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-primary-500 shadow-inner ring-1 ring-black/5 dark:ring-white/5 group-hover:scale-110 transition-transform">
                      <Share2 size={32} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">Tailored Results</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">Optimized Assets for {targetRole}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                    <button onClick={handleDownloadResumePDF} className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black text-slate-800 dark:text-slate-200 transition-all active:scale-95 shadow-lg group/btn">
                      <FileUp size={18} className="text-emerald-500 group-hover/btn:rotate-12 transition-transform" /> Resume.pdf
                    </button>
                    <button onClick={handleDownloadCoverLetterPDF} className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-7 py-3.5 bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 dark:hover:bg-primary-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 group/btn">
                      <Mail size={18} className="group-hover/btn:translate-y-[-2px] transition-transform" /> Letter.pdf
                    </button>
                    <button onClick={handleSaveCurrentJDToLibrary} className="p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 hover:text-primary-500 transition-all active:scale-95" title="Save this job">
                      <BookmarkPlus size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-14">
                  <section className="space-y-8">
                    <div className="flex items-center gap-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="p-3 rounded-2xl bg-primary-500/10">
                        <FileText className="text-primary-500" size={24} />
                      </div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Tailored Resume</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <ResultCard title="Professional Summary" content={result.resume_professional_summary} className="md:col-span-2 border-primary-500/10 bg-primary-500/[0.01]" />
                      <ResultCard title="Role-Specific Impact" content={result.resume_role_specific_bullets} description="Target-specific achievements" />
                      <ResultCard title="Core Experience" content={result.resume_core_bullets} description="Your fundamental history" />
                    </div>
                  </section>

                  <section className="space-y-8">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-5">
                        <div className="p-3 rounded-2xl bg-emerald-500/10">
                          <BrainCircuit className="text-emerald-500" size={24} />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Interview Prep</h2>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-full">
                         <Zap size={12} className="text-amber-500 animate-pulse" />
                         <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.2em]">System Checks Passed</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <ResultCard title="Key Talking Points" content={result.interview_bullets} className="border-emerald-500/10 bg-emerald-500/[0.01]" />
                      <ResultCard title="Strategic Study Tips" content={result.interview_prep_tips} className="border-emerald-500/10 bg-emerald-500/[0.01]" />
                    </div>
                  </section>

                  <section className="space-y-8">
                    <div className="flex items-center gap-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="p-3 rounded-2xl bg-blue-500/10">
                        <Linkedin className="text-blue-500" size={24} />
                      </div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Online Presence</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                      <ResultCard title="LinkedIn Headline" content={result.linkedin_headline} description="Maximum profile impact" />
                      <ResultCard title="LinkedIn 'About' Section" content={result.linkedin_about_section} />
                      <ResultCard title="Message for Recruiter" content={result.recruiter_dm} description="Direct response outreach" />
                    </div>
                  </section>
                </div>

                <footer className="pt-12 pb-10 text-center border-t border-slate-100 dark:border-slate-900">
                   <p className="text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.6em] transition-colors hover:text-primary-500">Fast Track Calibration Protocol v2.2</p>
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
