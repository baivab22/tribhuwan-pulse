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