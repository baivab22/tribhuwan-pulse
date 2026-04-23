import { useScrollToTop } from '@/hooks/useScrollToTop';
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Building2, ClipboardList, Wallet, Building, TrendingUp, BadgeCheck, ChevronLeft, ChevronRight, Save, Send, ImageIcon, FileText, Loader2, Download, Trash2, Mail, ShieldCheck, KeyRound, LockKeyhole, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE } from '@/lib/api';
import { ProgressReport, Program } from '@/types';

interface ProgressFormProps {
  onSubmit: (data: ProgressReport, verificationToken: string) => void | Promise<void>;
  initialData?: ProgressReport;
  isLoading?: boolean;
}

type FinancialCategoryKey = 'salaries' | 'capital' | 'operational' | 'research';

const tabOrder = ['basic', 'programs', 'financial', 'infrastructure', 'progress', 'declaration'] as const;
const DRAFT_STORAGE_PREFIX = 'progress_form_draft_v1';

type ProgressDraft = {
  formData: Partial<ProgressReport>;
  programs: Program[];
  activeTab: (typeof tabOrder)[number];
  maxUnlockedStep: number;
  verifiedEmail: string;
  isOtpVerified: boolean;
  savedAt: string;
};

// Tribhuvan University Programs Data Structure
const tuPrograms = {
  "Institute of Science and Technology (IoST)": {
    "Bachelor": [
      "B.Sc. General (Annual System)",
      "B.Sc. (MB)",
      "B.Sc. (Environmental Science)",
      "B.Tech. (Food)",
      "B.Sc. (CSIT) - Semester System",
      "Bachelor of IT (BIT) - Semester System",
      "B. Math.Sc. (Actuarial Science) - Semester System",
      "B.Sc. (Nutrition & Dietetics)"
    ],
    "Master": [
      "M.Sc. CSIT",
      "M.Sc. Mathematics",
      "M.Sc. Microbiology",
      "M.Sc. Environmental Science",
      "M.Sc. Environmental Health in Disaster",
      "M.Sc. Statistics",
      "M.Sc. Biotechnology",
      "M.Sc. Biodiversity and Environmental Management",
      "M.Sc. Physics",
      "M.Sc. Chemistry",
      "M.Sc. Zoology",
      "M.Sc. Biology",
      "M.Sc. Geology",
      "M.Sc. Hydrology & Meteorology",
      "M.Tech. Food Technology",
      "MIT"
    ],
    "MPhil": [
      "M.Phil Mathematics"
    ],
    "PhD": [
      "Biotechnology",
      "Botany",
      "Chemistry",
      "CSIT",
      "Environmental Science",
      "Food Technology",
      "Geology",
      "Hydrology & Meteorology",
      "Mathematics",
      "Microbiology",
      "Physics",
      "Statistics",
      "Zoology"
    ]
  },
  "Institute of Engineering (IOE)": {
    "Bachelor": [
      "Civil Engineering",
      "Electrical Engineering",
      "Electronics Engineering",
      "Computer Engineering",
      "Mechanical Engineering",
      "Automobile Engineering",
      "Geomatics Engineering",
      "Industrial Engineering",
      "Agriculture Engineering",
      "Architecture",
      "Aerospace Engineering",
      "Chemical Engineering"
    ],
    "Master": [
      "Urban Planning",
      "Energy for Sustainable Social Development",
      "Energy Efficient Buildings",
      "Transportation Engineering",
      "Structural Engineering",
      "Construction Management",
      "Disaster Risk Management",
      "Water Resources Engineering",
      "Geo-technical Engineering",
      "Environmental Engineering",
      "Hydropower Engineering",
      "Power System Engineering",
      "Information & Communication Engineering",
      "Computer System & Knowledge Engineering",
      "Renewable Energy Engineering",
      "Energy System Planning & Management",
      "Mechanical System Design and Engineering",
      "Climate Change and Development",
      "Material Science & Engineering",
      "Electrical Engineering in Distributed Generation",
      "Communication & Knowledge Engineering",
      "Infrastructure Engineering and Management",
      "Earthquake Engineering",
      "Land and Water Engineering",
      "Master in Architecture",
      "Rock and Tunnel Engineering",
      "Geospatial Engineering",
      "Sanitation Engineering/Science",
      "Distributed Generation Engineering",
      "Informatics and Intelligent Engineering",
      "Mechanical Engineering Design and Manufacturing",
      "Power Electronics and Drives Engineering",
      "Computer Engineering Specialization in Network and Cyber Security"
    ],
    "PhD": [
      "PhD in Engineering (various disciplines)"
    ]
  },
  "Institute of Medicine (IOM)": {
    "Bachelor": [
      "Bachelor in Dental Surgery (BDS)",
      "Bachelor of Audiology and Speech Language Pathology (BASLP)",
      "Bachelor of Medicine & Bachelor of Surgery (MBBS)",
      "Bachelor of Optometry (B.Optom)",
      "Bachelor of Perfusion Technology (B.Perfusion Tech)",
      "Bachelor of Pharmacy (B.Pharm)",
      "Bachelor of Science in Medical Imaging Technology (B.Sc.MIT)",
      "Bachelor of Science in Medical Laboratory Technology (BSc.MLT)",
      "Bachelor of Ayurvedic Medicine & Surgery (BAMS)",
      "Bachelor of Science in Nursing (B.Sc. Nursing)",
      "BNS (Adult Health Nursing)",
      "BNS (Child Health Nursing)",
      "BNS (Community Health Nursing)",
      "BNS (Psychiatric Nursing)",
      "Bachelor in Public Health (BPH)",
      "Bachelor of Midwifery Science (BMS)",
      "Bachelor of Science in Midwifery (BScM)"
    ],
    "Master": [
      "MD Anaesthesiology",
      "MD Biochemistry",
      "MD Clinical Pharmacology",
      "MD Clinical Physiology",
      "MD Dermatology, Venereology & Leprology",
      "MD Forensic Medicine",
      "MD General Practice",
      "MD Internal Medicine",
      "MD Microbiology",
      "MD Obstetrics & Gynaecology",
      "MD Ophthalmology",
      "MD Pathology",
      "MD Pediatrics",
      "MD Psychiatry",
      "MD Radiodiagnosis",
      "MD Kayachikista",
      "MD Community Medicine",
      "MD Emergency Medicine",
      "MS Otorhinolaryngology (ENT)",
      "MS General Surgery",
      "MS Orthopaedics and Trauma Surgery",
      "MS Clinical Anatomy",
      "MDS Conservative Dentistry & Endodontics",
      "MDS Oral & Maxillofacial Surgery",
      "MDS Orthodontics and Dentofacial Orthopedics",
      "MDS Pedodontics & Preventive Dentistry",
      "MDS Periodontology & Oral Implantology",
      "MDS Prosthodontics & Maxillofacial Prosthesis",
      "MDS Oral Medicine & Radiology",
      "MDS Community Health Dentistry",
      "MSc Clinical Biochemistry",
      "MSc Clinical Microbiology",
      "MSc Medical Imaging Technology (MIT)",
      "MN (Adult Nursing)",
      "MN (Pediatric Nursing)",
      "MN (Psychiatric Nursing)",
      "MN (Women Health Development)",
      "MN (Community Health Nursing)",
      "MN (Critical Care Nursing)",
      "Master of Public Health (MPH)",
      "Master of Public Health Nutrition (MPHN)",
      "Master of Health Promotion and Education (MHP&E)",
      "MD Kaumarbhriya"
    ],
    "MPhil": [
      "M.Phil Clinical Psychology"
    ],
    "PhD": [
      "PhD in Microbiology",
      "PhD in Nursing",
      "PhD in Public Health"
    ]
  },
  "Institute of Forestry (IOF)": {
    "Bachelor": [
      "B.Sc. Forestry"
    ],
    "Master": [
      "M.Sc. Forestry",
      "M.Sc. Natural Resources Management and Rural Development",
      "M.Sc. Watershed Management",
      "M.Sc. Wildlife Management and Biodiversity Conservation",
      "M.Sc. Mountain Environment and Development Studies",
      "M.Sc. Community Forestry"
    ],
    "PhD": [
      "PhD in Forestry",
      "PhD in Watershed Management",
      "PhD in Community Forestry",
      "PhD in Natural Resource Management and Rural Development",
      "PhD in Wildlife Management and Biodiversity Conservation"
    ]
  },
  "Institute of Agriculture and Animal Science (IAAS)": {
    "Bachelor": [
      "Bachelor of Science in Agriculture (B.Sc.Ag.)",
      "Bachelor of Veterinary Science and Animal Husbandry (B.V.Sc & A.H.)"
    ],
    "Master": [
      "Master of Science in Agriculture (M.Sc.Ag.)",
      "Master of Science in Animal Science (M.Sc. An.Sc.)",
      "Master of Veterinary Science (M.V.Sc.)",
      "Master of Science in Aquaculture (M.Sc. Aqua.)"
    ],
    "PhD": [
      "Doctor of Philosophy (PhD) in Agriculture and Animal Science"
    ]
  },
  "Faculty of Humanities and Social Sciences (FoHSS)": {
    "Bachelor": [
      "BA (Various subjects)",
      "BFA (Bachelor in Fine Arts)",
      "BFS (Bachelor in Film Study)",
      "BCA (Bachelor in Computer Application)",
      "BPSG (Bachelor in Public Service and Governance)",
      "BSW (Bachelor in Social Work)"
    ],
    "Post Graduate Diploma": [
      "Counseling Psychology",
      "School Counseling",
      "Woman Studies",
      "Yoga Bigyan",
      "Nutrition and Dietetics",
      "Security and Disaster Management"
    ],
    "Master": [
      "Nepali",
      "English",
      "Maithili",
      "Sanskrit",
      "Nepal Bhasa",
      "Hindi",
      "Linguistics",
      "Geography",
      "Economics",
      "Home Science",
      "Political Science",
      "Library Science",
      "Sociology",
      "Anthropology",
      "Psychology",
      "Journalism and Mass Communication",
      "Population Studies",
      "Buddhist Studies",
      "Rural Development",
      "Fine Arts (Music and Sculpture)",
      "History",
      "Nepalese History Culture and Archeology",
      "International Relation and Diplomacy",
      "Conflict, Peace and Development",
      "Gender Studies",
      "Social Work",
      "Counseling Psychology",
      "Sports Science",
      "Tourism and Hospitality",
      "Strategic Studies",
      "Security Peace and Development",
      "Crisis Management",
      "Dance",
      "Labor Studies",
      "Governance and Anti Corruptions",
      "Yogic Science"
    ],
    "MPhil": [
      "M.Phil in Nepali",
      "M.Phil in English",
      "M.Phil in Nepal Bhasa",
      "M.Phil in Hindi",
      "M.Phil in Linguistics",
      "M.Phil in Geography",
      "M.Phil in Economics",
      "M.Phil in Home Science",
      "M.Phil in Political Science",
      "M.Phil in Sociology",
      "M.Phil in Anthropology",
      "M.Phil in Psychology",
      "M.Phil in Journalism and Mass Communication",
      "M.Phil in Population Studies",
      "M.Phil in Buddhist Studies",
      "M.Phil in Rural Development",
      "M.Phil in Fine Arts (Music and Sculpture)",
      "M.Phil in History",
      "M.Phil in Nepalese History, Culture and Archeology",
      "M.Phil in International Relation and Diplomacy",
      "M.Phil in Conflict, Peace and Development",
      "M.Phil in Gender Studies",
      "M.Phil in Social Work"
    ],
    "PhD": [
      "PhD in Nepali",
      "PhD in English",
      "PhD in Nepal Bhasa",
      "PhD in Hindi",
      "PhD in Linguistics",
      "PhD in Geography",
      "PhD in Economics",
      "PhD in Home Science",
      "PhD in Political Science",
      "PhD in Sociology",
      "PhD in Anthropology",
      "PhD in Psychology",
      "PhD in Journalism and Mass Communication",
      "PhD in Population Studies",
      "PhD in Buddhist Studies",
      "PhD in Rural Development",
      "PhD in Fine Arts (Music and Sculpture)",
      "PhD in History",
      "PhD in Nepalese History, Culture and Archeology",
      "PhD in International Relation and Diplomacy",
      "PhD in Conflict, Peace and Development",
      "PhD in Gender Studies",
      "PhD in Social Work"
    ]
  },
  "Faculty of Education (FoE)": {
    "Bachelor": [
      "Four-year B.Ed (Annual)",
      "Eight-Semester Bachelor of Information and Communication Technology Education (BICTE)"
    ],
    "Post Graduate Diploma": [
      "Post-Graduate Diploma in Education (Three-Semester)"
    ],
    "Master": [
      "M.Ed (four semesters)",
      "Master of Social Studies Education (MSSEd) - six semesters",
      "Three-Semester M.Ed. in Science Education (ODL)",
      "M.Ed in ICT",
      "Master in Inclusive Education",
      "Master of Educational Sciences in Digital Pedagogy"
    ],
    "MPhil": [
      "Master of Philosophy (M.Phil) in Education"
    ],
    "PhD": [
      "Doctor of Philosophy (PhD) in Education"
    ]
  },
  "Faculty of Management (FoM)": {
    "Bachelor": [
      "Bachelor of Business Studies (BBS) - Annual System",
      "Bachelor of Business Administration (BBA) - Semester System",
      "Bachelor of Business Administration in Finance (BBA-F) - Semester System",
      "Bachelor of Information Management (BIM) - Semester System",
      "Bachelor of Travel and Tourism Management (BTTM) - Semester System",
      "Bachelor of Hotel Management (BHM) - Semester System",
      "Bachelor of Business Management (BBM) - Semester System",
      "Bachelor of Public Administration (BPA) - Semester System",
      "Bachelor of Mountaineering Studies (BMS) - Semester System"
    ],
    "Post Graduate Diploma": [
      "Post Graduate Diploma in Police Sciences (PGDPS)"
    ],
    "Master": [
      "Master of Business Administration (MBA)",
      "Master of Business Administration in Finance (MBA-F)",
      "Master of Business Administration in Marketing (MBA-Marketing)",
      "Master of Business Administration in Information Technology (MBA-IT)",
      "Master of Business Administration in Corporate Leadership (MBA-Corporate Leadership)",
      "Master of Travel and Tourism Management (MTTM)",
      "Master of Hospitality Management (MHM)",
      "Master of Business Administration in Finance and Control (MBA-FC)",
      "Master of Business Management (MBM)",
      "MBA in Global Leadership Development (MBA-GLM)",
      "Master of Business Studies (MBS)",
      "Master of Adventure Tourism Studies (MATS)",
      "Master of Public Administration (MPA)",
      "Master of Police Science (MPS)"
    ],
    "MPhil": [
      "M.Phil in Management",
      "M.Phil in Public Administration"
    ],
    "PhD": [
      "Ph.D in Management",
      "Ph.D in Public Administration"
    ]
  },
  "Faculty of Law (FoL)": {
    "Bachelor": [
      "LL.B. (Bachelor of Laws) - 3 years",
      "B.A.LL.B. (Bachelor of Arts-Bachelor of Laws) - 5 years"
    ],
    "Master": [
      "LL.M. (Master of Laws) – 2 Years",
      "LL.M (Master of Laws) – 3 Years"
    ],
    "PhD": [
      "Ph.D. (Doctor of Philosophy) in Law"
    ]
  },
  "Open and Distance Education Centre (ODEC)": {
    "Master": [
      "M. Ed. in English Education",
      "M. Ed. in Mathematics Education",
      "Master of Educational Sciences in Digital Pedagogy"
    ]
  }
};

export default function ProgressForm({ onSubmit, initialData, isLoading = false }: ProgressFormProps) {
  useScrollToTop();
  const createEmptyProgram = (): Program => ({
    institution: '',
    level: '',
    programName: '',
    totalStudents: 0,
    maleStudents: 0,
    femaleStudents: 0,
    scholarshipStudents: 0,
    isScholarshipRuleApplied: false,
    newAdmissions: 0,
    graduatedStudents: 0,
    passPercentage: 0,
    approvalLetterPath: null,
    approvalLetterFilename: null
  });

  const [activeTab, setActiveTab] = useState<(typeof tabOrder)[number]>('basic');
  const [formData, setFormData] = useState<Partial<ProgressReport>>(
    initialData || {
      collegeId: '',
      collegeName: '',
      verificationEmail: '',
      academicYear: '',
      submissionDate: new Date().toISOString().split('T')[0],
      totalStudents: 0,
      programs: [],
      approvedBudget: 0,
      actualExpenditure: 0,
      revenueGenerated: 0,
      buildingStatus: '',
      classroomCount: 0,
      labCount: 0,
      libraryBooks: 0,
      itConnectivity: '',
      academicProgress: '',
      researchProgress: '',
      adminProgress: '',
      qualityProgress: '',
      majorChallenges: '',
      nextYearPlan: '',
      headName: '',
      principalName: '',
      submittedBy: '',
      financialStatus: {
        salaries: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        capital: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        operational: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        research: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        totalAnnualBudget: 0,
        totalActualExpenditure: 0,
        totalRevenueGenerated: 0,
        attachments: {
          auditedFinancialStatements: null,
          auditedFinancialStatementsFilename: null,
          budgetCopy: null,
          budgetCopyFilename: null
        }
      }
    }
  );

  const [programs, setPrograms] = useState<Program[]>(
    initialData?.programs && initialData.programs.length > 0
      ? initialData.programs
      : [createEmptyProgram()]
  );
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: number]: boolean }>({});
  const [uploadingFinancialFiles, setUploadingFinancialFiles] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(Boolean(initialData?.verificationEmail));
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(!(initialData?.verificationEmail));
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationToken, setVerificationToken] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState(initialData?.verificationEmail?.toLowerCase() || '');
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(0);
  const autoRestoredEmailRef = useRef('');

  const getDraftKey = (email: string) => `${DRAFT_STORAGE_PREFIX}_${email.trim().toLowerCase()}`;

  const loadDraftForEmail = (email: string): ProgressDraft | null => {
    if (typeof window === 'undefined' || !email) return null;

    try {
      const rawDraft = window.localStorage.getItem(getDraftKey(email));
      if (!rawDraft) return null;
      return JSON.parse(rawDraft) as ProgressDraft;
    } catch {
      return null;
    }
  };

  const persistDraftForEmail = (email: string) => {
    if (typeof window === 'undefined') return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      toast.error('Enter and verify your email before saving draft.');
      return;
    }

    const currentMaxUnlockedStep = Math.max(maxUnlockedStep, tabOrder.indexOf(activeTab));
    const draftPayload: ProgressDraft = {
      formData: {
        ...formData,
        verificationEmail: normalizedEmail,
      },
      programs,
      activeTab,
      maxUnlockedStep: currentMaxUnlockedStep,
      verifiedEmail: normalizedEmail,
      isOtpVerified,
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(getDraftKey(normalizedEmail), JSON.stringify(draftPayload));
    setMaxUnlockedStep(currentMaxUnlockedStep);
  };

  const restoreDraft = (draft: ProgressDraft) => {
    const safeStep = Math.min(
      Math.max(draft.maxUnlockedStep ?? tabOrder.indexOf(draft.activeTab ?? 'basic'), 0),
      tabOrder.length - 1
    );
    const safeTab = tabOrder[safeStep];

    setFormData(draft.formData);
    setPrograms(draft.programs?.length ? draft.programs : [createEmptyProgram()]);
    setMaxUnlockedStep(safeStep);
    setActiveTab(safeTab);
    setIsOtpVerified(Boolean(draft.isOtpVerified));
    setVerifiedEmail(draft.verifiedEmail || draft.formData.verificationEmail?.toLowerCase() || '');
    setIsOtpModalOpen(!Boolean(draft.isOtpVerified));
    setIsOtpSent(Boolean(draft.isOtpVerified));
  };

  const scrollNearTop = () => {
    const rectTop = formContainerRef.current?.getBoundingClientRect().top ?? 0;
    const targetTop = Math.max(0, window.scrollY + rectTop - window.innerHeight * 0.2);
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const intervalId = window.setInterval(() => {
      setResendCooldown((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [resendCooldown]);

  useEffect(() => {
    const normalizedEmail = formData.verificationEmail?.trim().toLowerCase() || '';
    if (!normalizedEmail || isOtpVerified) return;
    if (autoRestoredEmailRef.current === normalizedEmail) return;

    const savedDraft = loadDraftForEmail(normalizedEmail);
    if (savedDraft?.isOtpVerified) {
      restoreDraft(savedDraft);
      autoRestoredEmailRef.current = normalizedEmail;
      toast.success('Saved draft restored. Continuing from your last saved step.');
    }
  }, [formData.verificationEmail, isOtpVerified]);

  useEffect(() => {
    const currentStep = tabOrder.indexOf(activeTab);
    if (currentStep > maxUnlockedStep) {
      setMaxUnlockedStep(currentStep);
    }
  }, [activeTab, maxUnlockedStep]);

  const handleInputChange = (field: keyof ProgressReport, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVerificationEmailChange = (value: string) => {
    const normalizedValue = value.trim().toLowerCase();
    handleInputChange('verificationEmail', normalizedValue);

    if (isOtpSent || (verifiedEmail && normalizedValue !== verifiedEmail)) {
      setIsOtpSent(false);
      setOtpCode('');
    }

    if (verifiedEmail && normalizedValue !== verifiedEmail) {
      setIsOtpVerified(false);
      setVerificationToken('');
      setVerifiedEmail('');
    }
  };

  const handleFinancialChange = (category: FinancialCategoryKey, field: string, value: number) => {
    setFormData(prev => {
      const currentFinancial = prev.financialStatus || {
        salaries: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        capital: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        operational: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        research: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        totalAnnualBudget: 0,
        totalActualExpenditure: 0,
        totalRevenueGenerated: 0,
        attachments: {
          auditedFinancialStatements: null,
          auditedFinancialStatementsFilename: null,
          budgetCopy: null,
          budgetCopyFilename: null
        }
      };

      const updatedFinancial = {
        ...currentFinancial,
        [category]: {
          ...currentFinancial[category],
          [field]: value
        }
      };

      // Recalculate totals
      updatedFinancial.totalAnnualBudget = 
        updatedFinancial.salaries.annualBudget + 
        updatedFinancial.capital.annualBudget + 
        updatedFinancial.operational.annualBudget + 
        updatedFinancial.research.annualBudget;

      updatedFinancial.totalActualExpenditure = 
        updatedFinancial.salaries.actualExpenditure + 
        updatedFinancial.capital.actualExpenditure + 
        updatedFinancial.operational.actualExpenditure + 
        updatedFinancial.research.actualExpenditure;

      updatedFinancial.totalRevenueGenerated = 
        updatedFinancial.salaries.revenueGenerated + 
        updatedFinancial.capital.revenueGenerated + 
        updatedFinancial.operational.revenueGenerated + 
        updatedFinancial.research.revenueGenerated;

      return {
        ...prev,
        financialStatus: updatedFinancial
      };
    });
  };

  const handleSourceChange = (category: FinancialCategoryKey, index: number, value: string) => {
    setFormData(prev => {
      const currentFinancial = prev.financialStatus || {
        salaries: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        capital: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        operational: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        research: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        totalAnnualBudget: 0,
        totalActualExpenditure: 0,
        totalRevenueGenerated: 0,
        attachments: {
          auditedFinancialStatements: null,
          auditedFinancialStatementsFilename: null,
          budgetCopy: null,
          budgetCopyFilename: null
        }
      };

      const updatedSources = [...(currentFinancial[category].sources || [])];
      updatedSources[index] = value;

      return {
        ...prev,
        financialStatus: {
          ...currentFinancial,
          [category]: {
            ...currentFinancial[category],
            sources: updatedSources
          }
        }
      };
    });
  };

  const addSource = (category: FinancialCategoryKey) => {
    setFormData(prev => {
      const currentFinancial = prev.financialStatus || {
        salaries: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        capital: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        operational: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        research: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        totalAnnualBudget: 0,
        totalActualExpenditure: 0,
        totalRevenueGenerated: 0,
        attachments: {
          auditedFinancialStatements: null,
          auditedFinancialStatementsFilename: null,
          budgetCopy: null,
          budgetCopyFilename: null
        }
      };

      return {
        ...prev,
        financialStatus: {
          ...currentFinancial,
          [category]: {
            ...currentFinancial[category],
            sources: [...(currentFinancial[category].sources || []), '']
          }
        }
      };
    });
  };

  const removeSource = (category: FinancialCategoryKey, index: number) => {
    setFormData(prev => {
      const currentFinancial = prev.financialStatus || {
        salaries: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        capital: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        operational: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        research: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
        totalAnnualBudget: 0,
        totalActualExpenditure: 0,
        totalRevenueGenerated: 0,
        attachments: {
          auditedFinancialStatements: null,
          auditedFinancialStatementsFilename: null,
          budgetCopy: null,
          budgetCopyFilename: null
        }
      };

      const updatedSources = [...(currentFinancial[category].sources || [])];
      updatedSources.splice(index, 1);

      return {
        ...prev,
        financialStatus: {
          ...currentFinancial,
          [category]: {
            ...currentFinancial[category],
            sources: updatedSources
          }
        }
      };
    });
  };

  const handleProgramChange = (index: number, field: keyof Program, value: string | number | boolean) => {
    const updatedPrograms = [...programs];
    updatedPrograms[index] = {
      ...updatedPrograms[index],
      [field]: value
    };

    // Auto-calculate total students if male/female students change
    if (field === 'maleStudents' || field === 'femaleStudents') {
      const maleStudents = field === 'maleStudents' ? Number(value) : updatedPrograms[index].maleStudents || 0;
      const femaleStudents = field === 'femaleStudents' ? Number(value) : updatedPrograms[index].femaleStudents || 0;
      updatedPrograms[index].totalStudents = maleStudents + femaleStudents;
    }

    // Validate scholarship students don't exceed total students
    if (field === 'scholarshipStudents') {
      const scholarshipStudents = Number(value);
      const totalStudents = updatedPrograms[index].totalStudents || 0;
      if (scholarshipStudents > totalStudents) {
        toast.error(`Scholarship students cannot exceed total students in ${updatedPrograms[index].programName}`);
        return;
      }
    }

    setPrograms(updatedPrograms);
  };

  const handleProgramSelection = (index: number, institution: string, level: string, programName: string) => {
    const updatedPrograms = [...programs];
    updatedPrograms[index] = {
      ...updatedPrograms[index],
      institution,
      level,
      programName
    };
    setPrograms(updatedPrograms);
  };

  const addProgram = () => {
    setPrograms(prev => [
      ...prev,
      createEmptyProgram()
    ]);
  };

  const removeProgram = (index: number) => {
    setPrograms(prev => prev.filter((_, i) => i !== index));
  };

  const requestOtp = async () => {
    const email = formData.verificationEmail?.trim().toLowerCase() || '';

    if (!email) {
      toast.error('Enter your email first.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Enter a valid email address.');
      return;
    }

    setOtpSending(true);
    try {
      const response = await fetch(`${API_BASE}/api/progress/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || 'Failed to send OTP');
      }

      setIsOtpSent(true);
      setOtpCode('');
      setResendCooldown(payload.resendAfterSeconds || 60);
      if (payload.deliveryMode === 'smtp') {
        toast.success(payload.message || 'OTP sent to your email address. Check your inbox to continue.');
      } else {
        toast.info(payload.message || 'OTP was generated for development and logged on the server. No email was sent.');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send OTP');
    } finally {
      setOtpSending(false);
    }
  };

  const verifyOtp = async () => {
    const email = formData.verificationEmail?.trim().toLowerCase() || '';
    const otp = otpCode.trim();

    if (!email) {
      toast.error('Enter your email first.');
      return;
    }

    if (otp.length < 4) {
      toast.error('Enter the full verification code.');
      return;
    }

    setOtpVerifying(true);
    try {
      const response = await fetch(`${API_BASE}/api/progress/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || 'Failed to verify OTP');
      }

      setVerificationToken(payload.verificationToken);
      setIsOtpVerified(true);
      setIsOtpSent(true);
      setVerifiedEmail(email);
      setActiveTab('basic');
      setOtpCode('');
      setIsOtpModalOpen(false);
      toast.success('Email verified. You can now complete the progress form.');
      const savedDraft = loadDraftForEmail(email);
      if (savedDraft?.isOtpVerified) {
        restoreDraft(savedDraft);
        toast.success('Saved draft found. Continued from your last saved position.');
      }
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollNearTop);
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to verify OTP');
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleFileUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid file (PDF, DOC, DOCX, JPG, JPEG, PNG)');
      return;
    }

    // Validate file size (10MB max for Cloudinary)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploadingFiles(prev => ({ ...prev, [index]: true }));

    try {
      // Cloudinary Configuration - UPDATED WITH CORRECT PRESET
      const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
      const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';
      
      // Create FormData for Cloudinary upload
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      // Optional: Add a folder structure for better organization
      const folderPath = `tu-progress-reports/${formData.collegeId || 'default'}/${formData.academicYear || 'unknown'}`;
      uploadFormData.append('folder', folderPath);
      
      // Optional: Add public_id for better file naming
      const publicId = `${programs[index].programName?.replace(/\s+/g, '_') || 'program'}_${Date.now()}`;
      uploadFormData.append('public_id', publicId);

      // Upload to Cloudinary (NO API KEY NEEDED for unsigned uploads with preset)
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: 'POST',
          body: uploadFormData,
        }
      );

      if (!cloudinaryResponse.ok) {
        const errorText = await cloudinaryResponse.text();
        console.error('Cloudinary upload failed:', errorText);
        throw new Error(`Cloudinary upload failed: ${cloudinaryResponse.status}`);
      }

      const cloudinaryResult = await cloudinaryResponse.json();

      // Extract Cloudinary URL and public_id
      const cloudinaryUrl = cloudinaryResult.secure_url;
      const cloudinaryPublicId = cloudinaryResult.public_id;

      // Update program with Cloudinary information
      const updatedPrograms = [...programs];
      updatedPrograms[index] = {
        ...updatedPrograms[index],
        approvalLetterPath: cloudinaryUrl,
        approvalLetterFilename: file.name,
        cloudinaryPublicId: cloudinaryPublicId
      };
      setPrograms(updatedPrograms);
      
      toast.success(`Approval letter "${file.name}" uploaded successfully`);
    } catch (_error) {
      console.error('File upload error:', _error);
      toast.error('Failed to upload approval letter. Please try again.');
    } finally {
      setUploadingFiles(prev => ({ ...prev, [index]: false }));
      // Clear the file input
      event.target.value = '';
    }
  };

  const handleFinancialFileUpload = async (documentType: 'auditedFinancialStatements' | 'budgetCopy', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max for Cloudinary)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploadingFinancialFiles(prev => ({ ...prev, [documentType]: true }));

    try {
      // Cloudinary Configuration
      const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
      const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';
      
      // Create FormData for Cloudinary upload
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      // Add folder structure
      const folderPath = `tu-progress-reports/${formData.collegeId || 'default'}/${formData.academicYear || 'unknown'}/financial`;
      uploadFormData.append('folder', folderPath);
      
      // Add public_id
      const publicId = `${documentType}_${formData.collegeId || 'college'}_${Date.now()}`;
      uploadFormData.append('public_id', publicId);

      // Upload to Cloudinary
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: 'POST',
          body: uploadFormData,
        }
      );

      if (!cloudinaryResponse.ok) {
        const errorText = await cloudinaryResponse.text();
        console.error('Cloudinary upload failed:', errorText);
        throw new Error(`Cloudinary upload failed: ${cloudinaryResponse.status}`);
      }

      const cloudinaryResult = await cloudinaryResponse.json();

      // Update financial attachments
      setFormData(prev => ({
        ...prev,
        financialStatus: {
          ...prev.financialStatus!,
          attachments: {
            ...prev.financialStatus!.attachments,
            [documentType]: cloudinaryResult.secure_url,
            [`${documentType}Filename`]: file.name
          }
        }
      }));
      
      toast.success(`${documentType.replace(/([A-Z])/g, ' $1')} uploaded successfully`);
    } catch (_error) {
      console.error('Financial file upload error:', _error);
      toast.error(`Failed to upload ${documentType.replace(/([A-Z])/g, ' $1')}. Please try again.`);
    } finally {
      setUploadingFinancialFiles(prev => ({ ...prev, [documentType]: false }));
      event.target.value = '';
    }
  };

  const removeApprovalLetter = (index: number) => {
    const updatedPrograms = [...programs];
    updatedPrograms[index] = {
      ...updatedPrograms[index],
      approvalLetterPath: null,
      approvalLetterFilename: null
    };
    setPrograms(updatedPrograms);
    toast.success('Approval letter removed');
  };

  const removeFinancialDocument = (documentType: 'auditedFinancialStatements' | 'budgetCopy') => {
    setFormData(prev => ({
      ...prev,
      financialStatus: {
        ...prev.financialStatus!,
        attachments: {
          ...prev.financialStatus!.attachments,
          [documentType]: null,
          [`${documentType}Filename`]: null
        }
      }
    }));
    toast.success(`${documentType.replace(/([A-Z])/g, ' $1')} removed`);
  };

  const downloadApprovalLetter = async (index: number) => {
    const program = programs[index];
    if (!program.approvalLetterPath) return;

    try {
      const response = await fetch(program.approvalLetterPath);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = program.approvalLetterFilename || 'approval_letter';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Download failed');
      }
    } catch {
      toast.error('Failed to download approval letter');
    }
  };

  const downloadFinancialDocument = async (documentType: 'auditedFinancialStatements' | 'budgetCopy') => {
    const documentPath = formData.financialStatus?.attachments?.[documentType];
    const filename = formData.financialStatus?.attachments?.[`${documentType}Filename`];

    if (!documentPath) return;

    try {
      const response = await fetch(documentPath);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `${documentType}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Download failed');
      }
    } catch {
      toast.error(`Failed to download ${documentType.replace(/([A-Z])/g, ' $1')}`);
    }
  };

  const validateCurrentTab = (): boolean => {
    if (activeTab === 'basic') {
      if (!formData.verificationEmail?.trim()) {
        toast.error('Enter and verify your email before continuing.');
        return false;
      }

      if (!formData.collegeId?.trim() || !formData.collegeName?.trim() || !formData.academicYear?.trim()) {
        toast.error('Campus ID, campus name, and academic year are required.');
        return false;
      }
    }

    if (activeTab === 'programs') {
      if (!programs.length) {
        toast.error('Add at least one program.');
        return false;
      }

      const incompleteProgramIndex = programs.findIndex((program) => {
        return !program.institution.trim() || !program.level.trim() || !program.programName.trim() || !program.approvalLetterPath;
      });

      if (incompleteProgramIndex !== -1) {
        toast.error(`Complete program ${incompleteProgramIndex + 1} and upload its approval letter before continuing.`);
        return false;
      }
    }

    if (activeTab === 'declaration') {
      if (!formData.headName?.trim() || !formData.principalName?.trim() || !formData.submittedBy?.trim()) {
        toast.error('Fill all declaration fields before submitting.');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!isOtpVerified) {
      toast.error('Verify your email first to unlock the progress form.');
      return;
    }

    if (!validateCurrentTab()) return;
    
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      const nextIndex = currentIndex + 1;
      setMaxUnlockedStep((previousMaxStep) => Math.max(previousMaxStep, nextIndex));
      setActiveTab(tabOrder[nextIndex]);
      if (verifiedEmail) {
        persistDraftForEmail(verifiedEmail);
      }
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollNearTop);
      });
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    if (isLoading || isSubmitting) return;

    if (!isOtpVerified || !verificationToken) {
      toast.error('Verify your email before submitting the progress form.');
      return;
    }

    if (!isLastTab) {
      toast.error('Please complete the Declaration step before submitting.');
      return;
    }

    if (!validateCurrentTab()) return;

    if (!formData.headName?.trim() || !formData.principalName?.trim() || !formData.submittedBy?.trim()) {
      toast.error('Please fill Head Name, Campus Chief/Principal, and Submitted By before submitting.');
      return;
    }
    
    const submitData = {
      ...formData,
      programs,
      totalStudents: programs.reduce((sum, program) => sum + program.totalStudents, 0)
    } as ProgressReport;

    setIsSubmitting(true);
    const submitToastId = toast.loading('Submitting progress report...');

    try {
      await Promise.resolve(onSubmit(submitData, verificationToken));
      if (typeof window !== 'undefined' && verifiedEmail) {
        window.localStorage.removeItem(getDraftKey(verifiedEmail));
      }
      toast.success('Progress report submitted successfully', { id: submitToastId });
    } catch (error) {
      console.error('Error submitting progress report:', error);
      toast.error('Failed to submit progress report. Please try again.', { id: submitToastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const financialData = formData.financialStatus || {
    salaries: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
    capital: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
    operational: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
    research: { annualBudget: 0, actualExpenditure: 0, revenueGenerated: 0, sources: [] },
    totalAnnualBudget: 0,
    totalActualExpenditure: 0,
    totalRevenueGenerated: 0,
    attachments: {
      auditedFinancialStatements: null,
      auditedFinancialStatementsFilename: null,
      budgetCopy: null,
      budgetCopyFilename: null
    }
  };

  const isLastTab = activeTab === 'declaration';
  const isFirstTab = activeTab === 'basic';
  const numberValue = (value: number | null | undefined) => (value === 0 || value == null ? '' : value);
  const normalizedVerificationEmail = formData.verificationEmail?.trim().toLowerCase() || '';
  const canRequestOtp = !otpSending && !!normalizedVerificationEmail;
  const canVerifyOtp = !otpVerifying && isOtpSent && otpCode.trim().length >= 4;
  const otpStepItems = [
    {
      label: 'Enter email',
      complete: Boolean(normalizedVerificationEmail),
    },
    {
      label: 'Send OTP',
      complete: isOtpSent,
    },
    {
      label: 'Verify code',
      complete: isOtpVerified,
    },
  ];
  const isImageFile = (filename?: string | null, filePath?: string | null) => {
    const source = `${filename || ''} ${filePath || ''}`.toLowerCase();
    return /(\.png|\.jpe?g|\.gif|\.webp|\.bmp|\.svg)/.test(source);
  };
  const currentStepIndex = tabOrder.indexOf(activeTab);
  const completionPercentage = ((currentStepIndex + 1) / tabOrder.length) * 100;
  const tabMeta = [
    { value: 'basic', label: 'Basic Info', icon: Building2 },
    { value: 'programs', label: 'Programs', icon: ClipboardList },
    { value: 'financial', label: 'Financial', icon: Wallet },
    { value: 'infrastructure', label: 'Infrastructure', icon: Building },
    { value: 'progress', label: 'Progress', icon: TrendingUp },
    { value: 'declaration', label: 'Declaration', icon: BadgeCheck }
  ] as const;
  return (
    <div ref={formContainerRef} className="mx-auto w-full max-w-[1400px] px-3 py-4 text-slate-900 sm:px-6 lg:px-10">
      <Card className="mb-6 overflow-hidden border-blue-100 shadow-lg shadow-blue-100/40">
        <CardHeader className="relative bg-gradient-to-r from-slate-50 via-blue-50 to-cyan-50">
          <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-blue-200/30 blur-2xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
            
              <CardDescription className="mt-1 text-base text-slate-600 sm:text-lg">
                Annual Progress Report Form
              </CardDescription>
            </div>
        
          </div>
          <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </CardHeader>
      </Card>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-1 [&_label]:mb-2 [&_label]:block [&_label]:text-sm [&_label]:font-semibold [&_label]:text-slate-800 [&_input]:border-2 [&_input]:border-slate-400 [&_input]:bg-white [&_input]:text-[15px] [&_input]:font-medium [&_input]:text-slate-900 [&_input]:placeholder:text-slate-500 [&_input]:focus-visible:border-blue-600 [&_input]:focus-visible:ring-2 [&_input]:focus-visible:ring-blue-200 [&_textarea]:border-2 [&_textarea]:border-slate-400 [&_textarea]:bg-white [&_textarea]:text-[15px] [&_textarea]:font-medium [&_textarea]:text-slate-900 [&_textarea]:placeholder:text-slate-500 [&_textarea]:focus-visible:border-blue-600 [&_textarea]:focus-visible:ring-2 [&_textarea]:focus-visible:ring-blue-200 [&_button[role=combobox]]:border-2 [&_button[role=combobox]]:border-slate-400 [&_button[role=combobox]]:bg-white [&_button[role=combobox]]:text-[15px] [&_button[role=combobox]]:font-medium [&_button[role=combobox]]:text-slate-900 [&_button[role=combobox]]:focus:ring-2 [&_button[role=combobox]]:focus:ring-blue-200"
      >
        <Card className="mb-6 overflow-hidden border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 text-white shadow-2xl shadow-slate-900/20">
          <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            {isOtpVerified ? (
              <div className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6 backdrop-blur">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
                <div className="relative flex items-center gap-3 text-emerald-50">
                  <ShieldCheck className="h-6 w-6" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-100/90">Verification completed</p>
                    <p className="mt-1 text-sm text-emerald-50/90">{verifiedEmail}</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl" />
                  <div className="relative space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                      <Sparkles className="h-3.5 w-3.5" />
                      Verification first
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold sm:text-3xl">Unlock the progress form with email verification</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                        Enter your email, receive a one-time code, and verify it before you can continue to campus details,
                        program approvals, financials, and the final declaration.
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        '1. Enter email',
                        '2. Verify OTP',
                        '3. Complete report',
                      ].map((item) => (
                        <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-100">
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-amber-50">
                      <LockKeyhole className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Form locked</p>
                        <p className="text-sm text-amber-50/90">The rest of the report remains read-only until verification succeeds.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 shadow-inner shadow-black/10 backdrop-blur sm:p-5">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100/90">Email verification</p>
                      {isOtpSent ? (
                        <span className="rounded-full border border-blue-300/40 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-100">
                          Code sent
                        </span>
                      ) : (
                        <span className="rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-100">
                          Awaiting email
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {otpStepItems.map((step, index) => (
                        <div key={step.label} className={step.complete ? 'rounded-lg border border-emerald-300/40 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-100' : 'rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200'}>
                          {index + 1}. {step.label}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-slate-200">
                      <p>Open the verification modal to send the code and confirm your email.</p>
                      <p className="mt-1 font-medium text-cyan-100">{isOtpSent ? (resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : 'Resend is ready now.') : 'Verification required before report entry.'}</p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => setIsOtpModalOpen(true)}
                      className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                    >
                      <KeyRound className="mr-2 h-4 w-4" />
                      {isOtpSent ? 'Enter code and verify' : 'Open verification'}
                    </Button>

                    <Dialog open={isOtpModalOpen} onOpenChange={setIsOtpModalOpen}>
                      <DialogContent className="max-h-[90vh] overflow-y-auto border-slate-200 bg-white sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-slate-900">
                            <ShieldCheck className="h-5 w-5 text-blue-600" />
                            इमेल प्रमाणिकरण
                          </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                          {!isOtpSent ? (
                            <>
                              <div>
                                <Label htmlFor="verificationEmail" className="text-slate-900">इमेल</Label>
                                <div className="relative mt-2">
                                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                  <Input
                                    id="verificationEmail"
                                    type="email"
                                    value={formData.verificationEmail || ''}
                                    onChange={(e) => handleVerificationEmailChange(e.target.value)}
                                    placeholder="आफ्नो इमेल ठेगाना लेख्नुहोस्"
                                    className="pl-10"
                                  />
                                </div>
                                <p className="mt-2 text-xs text-slate-500">OTP पठाउन सकिने इमेल लेख्नुहोस्। ओटीपी १० मिनेटका लागि मान्य हुन्छ।</p>
                              </div>

                              <Button
                                type="button"
                                onClick={requestOtp}
                                disabled={!canRequestOtp}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                              >
                                {otpSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
                                ओटीपी पठाउनुहोस्
                              </Button>
                            </>
                          ) : (
                            <>
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                                <p>ओटीपी <span className="font-semibold">{formData.verificationEmail}</span> मा पठाइएको छ। तल कोड लेख्नुहोस्।</p>
                                <p className="mt-1 font-semibold text-slate-700">{resendCooldown > 0 ? `पुन: पठाउन ${resendCooldown} सेकेन्ड कुर्नुहोस्` : 'कोड लेख्न तयार छ।'}</p>
                              </div>

                              <div>
                                <Label htmlFor="otpCode" className="text-slate-900">ओटीपी कोड</Label>
                                <Input
                                  id="otpCode"
                                  inputMode="numeric"
                                  autoComplete="one-time-code"
                                  value={otpCode}
                                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && canVerifyOtp) {
                                      e.preventDefault();
                                      verifyOtp();
                                    }
                                  }}
                                  placeholder="६-अङ्कको कोड लेख्नुहोस्"
                                  maxLength={6}
                                  className="mt-2 font-mono tracking-[0.28em] text-center text-lg sm:tracking-[0.4em]"
                                />
                              </div>

                              <Button
                                type="button"
                                variant="outline"
                                onClick={verifyOtp}
                                disabled={!canVerifyOtp}
                                className="w-full"
                              >
                                {otpVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                                प्रमाणित गर्नुहोस्
                              </Button>

                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                  setIsOtpSent(false);
                                  setOtpCode('');
                                }}
                                className="h-auto justify-start px-0 text-xs font-semibold text-slate-600 hover:bg-transparent hover:text-slate-900"
                              >
                                इमेल परिवर्तन गर्नुहोस् र ओटीपी पुन: पठाउनुहोस्
                              </Button>
                            </>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            const targetTab = value as typeof activeTab;
            const targetIndex = tabOrder.indexOf(targetTab);
            if (targetIndex > maxUnlockedStep) {
              toast.info(`Complete previous sections first. You can continue up to step ${maxUnlockedStep + 1}.`);
              return;
            }
            setActiveTab(targetTab);
          }}
          className={isOtpVerified ? 'space-y-6' : 'pointer-events-none space-y-6 opacity-50'}
        >
          <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 md:grid-cols-3 xl:grid-cols-6">
            {tabMeta.map((tab, index) => {
              const Icon = tab.icon;

              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="group h-auto justify-start rounded-lg border border-transparent px-3 py-3 text-left data-[state=active]:border-blue-200 data-[state=active]:bg-white data-[state=active]:shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 group-data-[state=active]:bg-blue-600 group-data-[state=active]:text-white">
                      {index + 1}
                    </span>
                    <span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </span>
                    </span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Campus identification and academic year details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="collegeId">Campus Code</Label>
                    <Input
                      id="collegeId"
                      value={formData.collegeId}
                      onChange={(e) => handleInputChange('collegeId', e.target.value)}
                      placeholder="Type your campus Code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="collegeName">Campus Name</Label>
                    <Input
                      id="collegeName"
                      value={formData.collegeName}
                      onChange={(e) => handleInputChange('collegeName', e.target.value)}
                      placeholder="Type your campus name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Select
                      value={formData.academicYear}
                      onValueChange={(value) => handleInputChange('academicYear', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select academic year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2082-2083">2082-2083</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="submissionDate">Submission Date</Label>
                    <Input
                      id="submissionDate"
                      type="date"
                      value={formData.submissionDate}
                      onChange={(e) => handleInputChange('submissionDate', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Programs Tab - COMPLETELY REWRITTEN */}
          <TabsContent value="programs">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Program-wise Academic Data</CardTitle>
                <CardDescription>Select programs from Tribhuvan University's official program list</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {programs.map((program, index) => (
                  <div key={index} className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                      <h4 className="font-semibold">Program {index + 1}</h4>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeProgram(index)}
                      >
                        Remove
                      </Button>
                    </div>

                    {/* Program Selection Hierarchy */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                      <div>
                        <Label htmlFor={`institution-${index}`}>Institution/Faculty</Label>
                        <Select
                          value={program.institution}
                          onValueChange={(value) => handleProgramSelection(index, value, program.level, program.programName)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select institution" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(tuPrograms).map((institution) => (
                              <SelectItem key={institution} value={institution}>
                                {institution}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`level-${index}`}>Academic Level</Label>
                        <Select
                          value={program.level}
                          onValueChange={(value) => handleProgramSelection(index, program.institution, value, program.programName)}
                          disabled={!program.institution}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {program.institution && 
                              Object.keys(tuPrograms[program.institution as keyof typeof tuPrograms] || {}).map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`programName-${index}`}>Program Name</Label>
                        <Select
                          value={program.programName}
                          onValueChange={(value) => handleProgramSelection(index, program.institution, program.level, value)}
                          disabled={!program.level || !program.institution}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            {program.institution && program.level && 
                              tuPrograms[program.institution as keyof typeof tuPrograms]?.[program.level as keyof typeof tuPrograms[keyof typeof tuPrograms]]?.map((programName) => (
                                <SelectItem key={programName} value={programName}>
                                  {programName}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Student Statistics */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor={`maleStudents-${index}`}>Male Students</Label>
                        <Input
                          id={`maleStudents-${index}`}
                          type="number"
                          min="0"
                          value={numberValue(program.maleStudents)}
                          onChange={(e) => handleProgramChange(index, 'maleStudents', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`femaleStudents-${index}`}>Female Students</Label>
                        <Input
                          id={`femaleStudents-${index}`}
                          type="number"
                          min="0"
                          value={numberValue(program.femaleStudents)}
                          onChange={(e) => handleProgramChange(index, 'femaleStudents', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor={`totalStudents-${index}`}>Total Students</Label>
                        <Input
                          id={`totalStudents-${index}`}
                          type="number"
                          value={numberValue(program.totalStudents)}
                          readOnly
                          className="border-slate-500 bg-slate-100 text-slate-900"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`scholarshipStudents-${index}`}>Scholarship Students</Label>
                        <Input
                          id={`scholarshipStudents-${index}`}
                          type="number"
                          min="0"
                          max={program.totalStudents}
                          value={numberValue(program.scholarshipStudents)}
                          onChange={(e) => handleProgramChange(index, 'scholarshipStudents', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                      <div>
                        <Label htmlFor={`newAdmissions-${index}`}>New Admissions</Label>
                        <Input
                          id={`newAdmissions-${index}`}
                          type="number"
                          min="0"
                          value={numberValue(program.newAdmissions)}
                          onChange={(e) => handleProgramChange(index, 'newAdmissions', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`graduatedStudents-${index}`}>Graduated Students</Label>
                        <Input
                          id={`graduatedStudents-${index}`}
                          type="number"
                          min="0"
                          value={numberValue(program.graduatedStudents)}
                          onChange={(e) => handleProgramChange(index, 'graduatedStudents', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`passPercentage-${index}`}>Pass Percentage (%)</Label>
                        <Input
                          id={`passPercentage-${index}`}
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={numberValue(program.passPercentage)}
                          onChange={(e) => handleProgramChange(index, 'passPercentage', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2">
                      <input
                        type="checkbox"
                        id={`isScholarshipRuleApplied-${index}`}
                        checked={program.isScholarshipRuleApplied}
                        onChange={(e) => handleProgramChange(index, 'isScholarshipRuleApplied', e.target.checked)}
                        className="h-5 w-5 rounded-md border-2 border-slate-400 text-blue-600 accent-blue-600 focus-visible:ring-2 focus-visible:ring-blue-200"
                      />
                      <Label htmlFor={`isScholarshipRuleApplied-${index}`} className="cursor-pointer text-slate-800">
                        Scholarship Rule Applied
                      </Label>
                    </div>

                    {/* Approval Letter Upload */}
                    <div className="border-t pt-4">
                      <Label htmlFor={`approvalLetter-${index}`}>Approval Letter</Label>
                      <div className="space-y-2">
                        {program.approvalLetterFilename ? (
                          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                              <div className="flex items-start gap-2">
                                {isImageFile(program.approvalLetterFilename, program.approvalLetterPath) ? (
                                  <ImageIcon className="mt-0.5 h-4 w-4 text-green-700" />
                                ) : (
                                  <FileText className="mt-0.5 h-4 w-4 text-green-700" />
                                )}
                                <span className="break-all text-sm font-medium text-green-800">{program.approvalLetterFilename}</span>
                              </div>
                              <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => downloadApprovalLetter(index)}
                              >
                                <Download className="mr-1 h-4 w-4" />
                                Download
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeApprovalLetter(index)}
                              >
                                <Trash2 className="mr-1 h-4 w-4" />
                                Remove
                              </Button>
                            </div>
                          </div>
                            {isImageFile(program.approvalLetterFilename, program.approvalLetterPath) && program.approvalLetterPath && (
                              <div className="mt-3 overflow-hidden rounded-md border border-green-200 bg-white p-2">
                                <img
                                  src={program.approvalLetterPath}
                                  alt={program.approvalLetterFilename || 'Approval letter preview'}
                                  className="h-40 w-full rounded object-contain sm:h-48"
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <label
                              htmlFor={`approvalLetter-${index}`}
                              className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2.5 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center transition-colors hover:border-blue-400 hover:bg-blue-50"
                            >
                              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-blue-100 shadow-sm">
                                <FileText className="h-5 w-5 text-blue-700" />
                              </span>
                              <span className="text-sm font-semibold text-slate-800">Tap to upload approval letter</span>
                              <span className="text-xs text-slate-500">PDF, DOC, DOCX, JPG, JPEG, PNG</span>
                            </label>
                            <Input
                              id={`approvalLetter-${index}`}
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileUpload(index, e)}
                              disabled={uploadingFiles[index]}
                              className="hidden"
                            />
                            <p className="text-xs text-gray-500">
                              Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
                            </p>
                          </div>
                        )}
                        {uploadingFiles[index] && (
                          <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Uploading file...
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />
                  </div>
                ))}

                <div>
                  <Button type="button" onClick={addProgram} className="w-max font-semibold">
                    Add More Program
                  </Button>
                </div>

                {/* Program Summary */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Program Summary</h4>
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 xl:grid-cols-4">
                    <div>
                      <span className="font-medium">Total Programs:</span> {programs.length}
                    </div>
                    <div>
                      <span className="font-medium">Total Students:</span>{' '}
                      {programs.reduce((sum, program) => sum + program.totalStudents, 0)}
                    </div>
                    <div>
                      <span className="font-medium">Male Students:</span>{' '}
                      {programs.reduce((sum, program) => sum + program.maleStudents, 0)}
                    </div>
                    <div>
                      <span className="font-medium">Female Students:</span>{' '}
                      {programs.reduce((sum, program) => sum + program.femaleStudents, 0)}
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-4 text-sm md:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <span className="font-medium">Scholarship Students:</span>{' '}
                      {programs.reduce((sum, program) => sum + program.scholarshipStudents, 0)}
                    </div>
                    <div>
                      <span className="font-medium">New Admissions:</span>{' '}
                      {programs.reduce((sum, program) => sum + program.newAdmissions, 0)}
                    </div>
                    <div>
                      <span className="font-medium">Graduated Students:</span>{' '}
                      {programs.reduce((sum, program) => sum + program.graduatedStudents, 0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab - COMPLETE */}
          <TabsContent value="financial">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Financial Status (Summary)</CardTitle>
                <CardDescription>Annual budget, expenditure, and revenue details by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Salaries & Allowances */}
                <div className="rounded-lg border border-slate-200 p-4">
                  <h4 className="font-semibold mb-4">4.1 Salaries & Allowances</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <Label htmlFor="salaries-budget">Annual Budget (NPR)</Label>
                      <Input
                        id="salaries-budget"
                        type="number"
                        min="0"
                        value={numberValue(financialData.salaries.annualBudget)}
                        onChange={(e) => handleFinancialChange('salaries', 'annualBudget', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salaries-expenditure">Actual Expenditure (NPR)</Label>
                      <Input
                        id="salaries-expenditure"
                        type="number"
                        min="0"
                        value={numberValue(financialData.salaries.actualExpenditure)}
                        onChange={(e) => handleFinancialChange('salaries', 'actualExpenditure', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salaries-revenue">Revenue Generated (NPR)</Label>
                      <Input
                        id="salaries-revenue"
                        type="number"
                        min="0"
                        value={numberValue(financialData.salaries.revenueGenerated)}
                        onChange={(e) => handleFinancialChange('salaries', 'revenueGenerated', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Sources (TU Grant, Fees, Other)</Label>
                    {financialData.salaries.sources?.map((source, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={source}
                          onChange={(e) => handleSourceChange('salaries', index, e.target.value)}
                          placeholder="Source of funding"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSource('salaries', index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => addSource('salaries')}
                    >
                      Add Source
                    </Button>
                  </div>
                </div>

                {/* Capital Expenditure */}
                <div className="rounded-lg border border-slate-200 p-4">
                  <h4 className="font-semibold mb-4">4.2 Capital Expenditure (Infrastructure, Equipment)</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <Label htmlFor="capital-budget">Annual Budget (NPR)</Label>
                      <Input
                        id="capital-budget"
                        type="number"
                        min="0"
                        value={numberValue(financialData.capital.annualBudget)}
                        onChange={(e) => handleFinancialChange('capital', 'annualBudget', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="capital-expenditure">Actual Expenditure (NPR)</Label>
                      <Input
                        id="capital-expenditure"
                        type="number"
                        min="0"
                        value={numberValue(financialData.capital.actualExpenditure)}
                        onChange={(e) => handleFinancialChange('capital', 'actualExpenditure', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="capital-revenue">Revenue Generated (NPR)</Label>
                      <Input
                        id="capital-revenue"
                        type="number"
                        min="0"
                        value={numberValue(financialData.capital.revenueGenerated)}
                        onChange={(e) => handleFinancialChange('capital', 'revenueGenerated', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Sources (TU Grant, Fees, Other)</Label>
                    {financialData.capital.sources?.map((source, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={source}
                          onChange={(e) => handleSourceChange('capital', index, e.target.value)}
                          placeholder="Source of funding"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSource('capital', index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => addSource('capital')}
                    >
                      Add Source
                    </Button>
                  </div>
                </div>

                {/* Operational & Contingency */}
                <div className="rounded-lg border border-slate-200 p-4">
                  <h4 className="font-semibold mb-4">4.3 Operational & Contingency</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <Label htmlFor="operational-budget">Annual Budget (NPR)</Label>
                      <Input
                        id="operational-budget"
                        type="number"
                        min="0"
                        value={numberValue(financialData.operational.annualBudget)}
                        onChange={(e) => handleFinancialChange('operational', 'annualBudget', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="operational-expenditure">Actual Expenditure (NPR)</Label>
                      <Input
                        id="operational-expenditure"
                        type="number"
                        min="0"
                        value={numberValue(financialData.operational.actualExpenditure)}
                        onChange={(e) => handleFinancialChange('operational', 'actualExpenditure', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="operational-revenue">Revenue Generated (NPR)</Label>
                      <Input
                        id="operational-revenue"
                        type="number"
                        min="0"
                        value={numberValue(financialData.operational.revenueGenerated)}
                        onChange={(e) => handleFinancialChange('operational', 'revenueGenerated', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Sources (TU Grant, Fees, Other)</Label>
                    {financialData.operational.sources?.map((source, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={source}
                          onChange={(e) => handleSourceChange('operational', index, e.target.value)}
                          placeholder="Source of funding"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSource('operational', index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => addSource('operational')}
                    >
                      Add Source
                    </Button>
                  </div>
                </div>

                {/* Research & Development */}
                <div className="rounded-lg border border-slate-200 p-4">
                  <h4 className="font-semibold mb-4">4.4 Research & Development</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <Label htmlFor="research-budget">Annual Budget (NPR)</Label>
                      <Input
                        id="research-budget"
                        type="number"
                        min="0"
                        value={numberValue(financialData.research.annualBudget)}
                        onChange={(e) => handleFinancialChange('research', 'annualBudget', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="research-expenditure">Actual Expenditure (NPR)</Label>
                      <Input
                        id="research-expenditure"
                        type="number"
                        min="0"
                        value={numberValue(financialData.research.actualExpenditure)}
                        onChange={(e) => handleFinancialChange('research', 'actualExpenditure', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="research-revenue">Revenue Generated (NPR)</Label>
                      <Input
                        id="research-revenue"
                        type="number"
                        min="0"
                        value={numberValue(financialData.research.revenueGenerated)}
                        onChange={(e) => handleFinancialChange('research', 'revenueGenerated', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Sources (TU Grant, Fees, Other)</Label>
                    {financialData.research.sources?.map((source, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={source}
                          onChange={(e) => handleSourceChange('research', index, e.target.value)}
                          placeholder="Source of funding"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSource('research', index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => addSource('research')}
                    >
                      Add Source
                    </Button>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h4 className="font-semibold text-blue-800 mb-4">Financial Summary</h4>
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <span className="font-medium">Total Annual Budget:</span><br />
                      <span className="text-lg">NPR {financialData.totalAnnualBudget.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium">Total Actual Expenditure:</span><br />
                      <span className="text-lg">NPR {financialData.totalActualExpenditure.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium">Total Revenue Generated:</span><br />
                      <span className="text-lg">NPR {financialData.totalRevenueGenerated.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium">Budget Utilization:</span>{' '}
                    {financialData.totalAnnualBudget > 0 
                      ? `${((financialData.totalActualExpenditure / financialData.totalAnnualBudget) * 100).toFixed(2)}%`
                      : '0%'}
                  </div>
                </div>

                {/* Financial Attachments */}
                <div className="rounded-lg border border-slate-200 p-4">
                  <h4 className="font-semibold mb-4">Financial Documents</h4>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* Audited Financial Statements */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <Label className="text-sm font-semibold text-slate-800">Audited Financial Statements</Label>
                      <div className="space-y-2">
                        {financialData.attachments.auditedFinancialStatementsFilename ? (
                          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                              <div className="flex items-start gap-2">
                                {isImageFile(
                                  financialData.attachments.auditedFinancialStatementsFilename,
                                  financialData.attachments.auditedFinancialStatements
                                ) ? (
                                  <ImageIcon className="mt-0.5 h-4 w-4 text-green-700" />
                                ) : (
                                  <FileText className="mt-0.5 h-4 w-4 text-green-700" />
                                )}
                                <span className="break-all text-sm font-medium text-green-800">
                                  {financialData.attachments.auditedFinancialStatementsFilename}
                                </span>
                              </div>
                              <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => downloadFinancialDocument('auditedFinancialStatements')}
                              >
                                <Download className="mr-1 h-4 w-4" />
                                Download
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeFinancialDocument('auditedFinancialStatements')}
                              >
                                <Trash2 className="mr-1 h-4 w-4" />
                                Remove
                              </Button>
                            </div>
                          </div>
                            {isImageFile(
                              financialData.attachments.auditedFinancialStatementsFilename,
                              financialData.attachments.auditedFinancialStatements
                            ) && financialData.attachments.auditedFinancialStatements && (
                              <div className="mt-3 overflow-hidden rounded-md border border-green-200 bg-white p-2">
                                <img
                                  src={financialData.attachments.auditedFinancialStatements}
                                  alt={financialData.attachments.auditedFinancialStatementsFilename || 'Audited statement preview'}
                                  className="h-40 w-full rounded object-contain sm:h-48"
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2 pt-1">
                            <label
                              htmlFor="auditedFinancialStatements-upload"
                              className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-slate-300 bg-gradient-to-b from-slate-50 to-white px-4 py-6 text-center transition-colors hover:border-blue-400 hover:from-blue-50 hover:to-white"
                            >
                              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 shadow-sm">
                                <FileText className="h-5 w-5 text-emerald-700" />
                              </span>
                              <span className="text-sm font-semibold text-slate-800">Upload audited financial statements</span>
                              <span className="text-xs text-slate-500">Drag and drop, or click to browse</span>
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium tracking-wide text-slate-600">PDF, DOC, DOCX, JPG, JPEG, PNG</span>
                            </label>
                            <Input
                              id="auditedFinancialStatements-upload"
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => handleFinancialFileUpload('auditedFinancialStatements', e)}
                              disabled={uploadingFinancialFiles.auditedFinancialStatements}
                              className="hidden"
                            />
                            <p className="text-xs text-slate-500">
                              Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
                            </p>
                          </div>
                        )}
                        {uploadingFinancialFiles.auditedFinancialStatements && (
                          <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Uploading file...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Budget Copy */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <Label className="text-sm font-semibold text-slate-800">Budget Copy</Label>
                      <div className="space-y-2">
                        {financialData.attachments.budgetCopyFilename ? (
                          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                              <div className="flex items-start gap-2">
                                {isImageFile(financialData.attachments.budgetCopyFilename, financialData.attachments.budgetCopy) ? (
                                  <ImageIcon className="mt-0.5 h-4 w-4 text-green-700" />
                                ) : (
                                  <FileText className="mt-0.5 h-4 w-4 text-green-700" />
                                )}
                                <span className="break-all text-sm font-medium text-green-800">
                                  {financialData.attachments.budgetCopyFilename}
                                </span>
                              </div>
                              <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => downloadFinancialDocument('budgetCopy')}
                              >
                                <Download className="mr-1 h-4 w-4" />
                                Download
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeFinancialDocument('budgetCopy')}
                              >
                                <Trash2 className="mr-1 h-4 w-4" />
                                Remove
                              </Button>
                            </div>
                          </div>
                            {isImageFile(financialData.attachments.budgetCopyFilename, financialData.attachments.budgetCopy) && financialData.attachments.budgetCopy && (
                              <div className="mt-3 overflow-hidden rounded-md border border-green-200 bg-white p-2">
                                <img
                                  src={financialData.attachments.budgetCopy}
                                  alt={financialData.attachments.budgetCopyFilename || 'Budget copy preview'}
                                  className="h-40 w-full rounded object-contain sm:h-48"
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2 pt-1">
                            <label
                              htmlFor="budgetCopy-upload"
                              className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-slate-300 bg-gradient-to-b from-slate-50 to-white px-4 py-6 text-center transition-colors hover:border-blue-400 hover:from-blue-50 hover:to-white"
                            >
                              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-amber-200 bg-amber-100 shadow-sm">
                                <Wallet className="h-5 w-5 text-amber-700" />
                              </span>
                              <span className="text-sm font-semibold text-slate-800">Upload budget copy</span>
                              <span className="text-xs text-slate-500">Drag and drop, or click to browse</span>
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium tracking-wide text-slate-600">PDF, DOC, DOCX, JPG, JPEG, PNG</span>
                            </label>
                            <Input
                              id="budgetCopy-upload"
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => handleFinancialFileUpload('budgetCopy', e)}
                              disabled={uploadingFinancialFiles.budgetCopy}
                              className="hidden"
                            />
                            <p className="text-xs text-slate-500">
                              Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
                            </p>
                          </div>
                        )}
                        {uploadingFinancialFiles.budgetCopy && (
                          <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Uploading file...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Tab - COMPLETE */}
          <TabsContent value="infrastructure">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Infrastructure & Physical Progress</CardTitle>
                <CardDescription>Building, facilities, and equipment status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="buildingStatus">Building Status</Label>
                    <Select
                      value={formData.buildingStatus}
                      onValueChange={(value) => handleInputChange('buildingStatus', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Complete">Complete</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Planned">Planned</SelectItem>
                        <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="itConnectivity">IT/Internet Connectivity</Label>
                    <Select
                      value={formData.itConnectivity}
                      onValueChange={(value) => handleInputChange('itConnectivity', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select connectivity status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent (&gt;100 Mbps)</SelectItem>
                        <SelectItem value="Good">Good (50-100 Mbps)</SelectItem>
                        <SelectItem value="Average">Average (10-50 Mbps)</SelectItem>
                        <SelectItem value="Poor">Poor (&lt;10 Mbps)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <Label htmlFor="classroomCount">Number of Classrooms</Label>
                    <Input
                      id="classroomCount"
                      type="number"
                      min="0"
                      value={numberValue(formData.classroomCount)}
                      onChange={(e) => handleInputChange('classroomCount', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="labCount">Number of Labs/Workshops</Label>
                    <Input
                      id="labCount"
                      type="number"
                      min="0"
                      value={numberValue(formData.labCount)}
                      onChange={(e) => handleInputChange('labCount', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="libraryBooks">Total Library Books</Label>
                    <Input
                      id="libraryBooks"
                      type="number"
                      min="0"
                      value={numberValue(formData.libraryBooks)}
                      onChange={(e) => handleInputChange('libraryBooks', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab - COMPLETE */}
          <TabsContent value="progress">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Key Progress, Challenges, and Future Plans</CardTitle>
                <CardDescription>Detailed progress report and planning for next year</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="academicProgress">Academic/Curricular Progress</Label>
                  <Textarea
                    id="academicProgress"
                    value={formData.academicProgress}
                    onChange={(e) => handleInputChange('academicProgress', e.target.value)}
                    placeholder="New programs started, curriculum review, result improvement..."
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="researchProgress">Research & Innovation Progress</Label>
                  <Textarea
                    id="researchProgress"
                    value={formData.researchProgress}
                    onChange={(e) => handleInputChange('researchProgress', e.target.value)}
                    placeholder="Research projects completed, conferences held, patents..."
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="adminProgress">Administration & Governance Progress</Label>
                  <Textarea
                    id="adminProgress"
                    value={formData.adminProgress}
                    onChange={(e) => handleInputChange('adminProgress', e.target.value)}
                    placeholder="Policy updates, efficiency improvements, committee formation..."
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="qualityProgress">Quality Enhancement Progress</Label>
                  <Textarea
                    id="qualityProgress"
                    value={formData.qualityProgress}
                    onChange={(e) => handleInputChange('qualityProgress', e.target.value)}
                    placeholder="QAAC activities, student feedback system implementation..."
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="majorChallenges">Major Challenges/Issues Faced</Label>
                  <Textarea
                    id="majorChallenges"
                    value={formData.majorChallenges}
                    onChange={(e) => handleInputChange('majorChallenges', e.target.value)}
                    placeholder="Key challenges and obstacles encountered this year..."
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="nextYearPlan">Action Plan for Next Year</Label>
                  <Textarea
                    id="nextYearPlan"
                    value={formData.nextYearPlan}
                    onChange={(e) => handleInputChange('nextYearPlan', e.target.value)}
                    placeholder="Strategic plans aligned with TU goals..."
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Declaration Tab - COMPLETE */}
          <TabsContent value="declaration">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Declaration and Signatures</CardTitle>
                <CardDescription>Official declaration and responsible person details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Declaration:</strong> I hereby certify that the information provided in this Annual Progress Report 
                    is accurate and complete to the best of my knowledge and is based on the official records of the campus.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="headName">Head of Planning/QAAC Committee</Label>
                    <Input
                      id="headName"
                      value={formData.headName}
                      onChange={(e) => handleInputChange('headName', e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="principalName">Campus Chief/Principal</Label>
                    <Input
                      id="principalName"
                      value={formData.principalName}
                      onChange={(e) => handleInputChange('principalName', e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="submittedBy">Submitted By</Label>
                  <Input
                    id="submittedBy"
                    value={formData.submittedBy}
                    onChange={(e) => handleInputChange('submittedBy', e.target.value)}
                    placeholder="Name and designation"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className={isOtpVerified ? 'mt-6 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4' : 'mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 shadow-sm sm:p-4'}>
          <div className="mb-3 flex items-center justify-between text-sm">
            <p className="font-medium text-slate-700">Step {currentStepIndex + 1} of {tabOrder.length}</p>
            <p className="text-slate-500">{completionPercentage.toFixed(0)}% complete</p>
          </div>
          {!isOtpVerified && (
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900">
              <LockKeyhole className="h-4 w-4" />
              Verify your email above to unlock navigation and submission.
            </div>
          )}
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
            {!isFirstTab && (
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={!isOtpVerified}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
            )}
            </div>
            <div className="ml-auto flex flex-wrap gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (!isOtpVerified || !verifiedEmail) {
                  toast.error('Verify your email first to save draft.');
                  return;
                }
                persistDraftForEmail(verifiedEmail);
                toast.success('Draft saved successfully.');
              }}
              disabled={!isOtpVerified}
            >
              <Save className="mr-1 h-4 w-4" />
              Save as Draft
            </Button>
            
            {!isLastTab ? (
              <Button type="button" onClick={handleNext} disabled={!isOtpVerified} className="bg-blue-600 hover:bg-blue-700">
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={!isOtpVerified || isLoading || isSubmitting} className="bg-green-600 hover:bg-green-700">
                <Send className="mr-1 h-4 w-4" />
                {isLoading || isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}