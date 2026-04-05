export interface Program {
  institution: string;
  level: string;
  programName: string;
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  scholarshipStudents: number;
  isScholarshipRuleApplied: boolean;
  newAdmissions: number;
  graduatedStudents: number;
  passPercentage: number;
  approvalLetterPath: string | null;
  approvalLetterFilename: string | null;
  cloudinaryPublicId?: string | null;
}

export interface FinancialCategoryStatus {
  annualBudget: number;
  actualExpenditure: number;
  revenueGenerated: number;
  sources: string[];
}

export interface FinancialAttachments {
  auditedFinancialStatements: string | null;
  auditedFinancialStatementsFilename: string | null;
  budgetCopy: string | null;
  budgetCopyFilename: string | null;
}

export interface FinancialStatus {
  salaries: FinancialCategoryStatus;
  capital: FinancialCategoryStatus;
  operational: FinancialCategoryStatus;
  research: FinancialCategoryStatus;
  totalAnnualBudget: number;
  totalActualExpenditure: number;
  totalRevenueGenerated: number;
  attachments: FinancialAttachments;
}

export interface ProgressReport {
  id?: string;
  collegeId: string;
  collegeName: string;
  academicYear: string;
  submissionDate: string;
  
  // Academic Progress
  totalStudents: number;
  newAdmissions: number;
  graduatedStudents: number;
  passPercentage: number;
  facultyTraining: number;
  facultyResearch: number;
  
  // Financial Status
  approvedBudget: number;
  actualExpenditure: number;
  revenueGenerated: number;
  salariesAllowances: number;
  capitalExpenditure: number;
  operationalCosts: number;
  researchDevelopment: number;
  fundingSource: string;
  
  // Infrastructure
  buildingStatus: string;
  classroomCount: number;
  labCount: number;
  libraryBooks: number;
  itConnectivity: string;
  
  // Progress and Challenges
  academicProgress: string;
  researchProgress: string;
  adminProgress: string;
  qualityProgress: string;
  majorChallenges: string;
  nextYearPlan: string;
  
  // Declaration
  headName: string;
  principalName: string;
  submittedBy: string;
  programs?: Program[];
  financialStatus?: FinancialStatus;
  
  createdAt?: string;
  updatedAt?: string;
}

export interface CollegeSummary {
  collegeId: string;
  collegeName: string;
  totalReports: number;
  latestReport?: ProgressReport;
  budgetUtilization: number;
  studentGrowth: number;
}

export interface AnalyticsData {
  totalColleges: number;
  totalStudents: number;
  totalBudget: number;
  averagePassRate: number;
  budgetUtilization: number;
  collegePerformance: CollegeSummary[];
}

export interface SurveyReport {
  _id?: string;
  collegeName: string;
  reportYear: string;
  description?: string;
  pdfFile?: {
    filename: string;
    path: string;
    originalName: string;
    size: number;
    uploadDate: string;
  };
  uploadedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  remarks?: string;
  viewCount: number;
  college?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CollegeFormData {
  _id?: string;
  collegeName: string;
  campusType: string;
  establishmentDate: string;
  location?: {
    province: string;
    district: string;
    localLevel: string;
  };
  principalInfo?: {
    name: string;
    email?: string;
    contactNumber?: string;
  };
  formStatus: string;
  createdAt?: string;
  updatedAt?: string;
}