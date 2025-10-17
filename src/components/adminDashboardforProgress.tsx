import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ComposedChart, Area } from 'recharts';
import { Download, Search, Eye, TrendingUp, Users, DollarSign, Building, BookOpen, AlertTriangle, CheckCircle, FileText, GraduationCap, FlaskConical, Wifi, Library, School, PieChart as PieChartIcon, Activity, Target, Award } from 'lucide-react';
import { toast } from 'sonner';
import { ProgressReport, AnalyticsData } from '@/types';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Import the required icons
import { X } from 'lucide-react';
import FinancialDocumentsSection from './pdfViewer.component';

const API_BASE_URL = 'https://feedbackbackend-4.onrender.com/api/progress';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  tertiary: '#f59e0b',
  quaternary: '#ef4444',
  gradient1: '#6366f1',
  gradient2: '#8b5cf6'
};

// Extend jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: {
      finalY: number;
    };
    autoTable: (options: any) => jsPDF;
  }
}

export default function AdminDashboardForProgress() {
  const [reports, setReports] = useState<ProgressReport[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<ProgressReport | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Add these state variables to your component
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<{url: string, filename: string, type: string} | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reportsResponse, analyticsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}`),
        fetch(`${API_BASE_URL}/analytics`)
      ]);

      if (reportsResponse.ok) {
        const reportsData = await reportsResponse.json();
        setReports(reportsData.data || []);
      }

      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setAnalytics(analyticsData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async (report?: ProgressReport) => {
    try {
      if (report) {
        const csvData = convertCollegeToCSV(report);
        downloadCSV(csvData, `${report.collegeName}_${report.academicYear}_raw_data.csv`);
        toast.success('College CSV exported successfully');
      } else {
        const response = await fetch(`${API_BASE_URL}/export/csv`);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'progress_reports.csv';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          toast.success('CSV exported successfully');
        } else {
          toast.error('Failed to export CSV');
        }
      }
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast.error('Failed to export CSV');
    }
  };

  const handleExportPDF = async (report: ProgressReport) => {
    try {
      const pdf = new jsPDF();
      const analysis = getCollegeAnalysis(report);
      
      // Set document properties
      pdf.setProperties({
        title: `${report.collegeName} - Progress Report ${report.academicYear}`,
        subject: 'College Progress Monitoring Report',
        author: 'Education Monitoring System',
        keywords: 'college, progress, report, education',
        creator: 'Education Monitoring System'
      });

      // Add header with styling
      pdf.setFillColor(59, 130, 246); // Blue color
      pdf.rect(0, 0, 220, 30, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('EDUCATION PROGRESS REPORT', 105, 15, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.text(`${report.collegeName}`, 105, 22, { align: 'center' });
      
      // Reset text color for content
      pdf.setTextColor(0, 0, 0);
      
      let currentY = 40;

      // College Information Section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('COLLEGE INFORMATION', 14, currentY);
      currentY += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const collegeInfo = [
        ['College Name:', report.collegeName || 'N/A'],
        ['College ID:', report.collegeId || 'N/A'],
        ['Academic Year:', report.academicYear || 'N/A'],
        ['Submission Date:', report.submissionDate || 'N/A'],
        ['Head of Planning/QAAC:', report.headName || 'N/A'],
        ['Campus Chief/Principal:', report.principalName || 'N/A'],
        ['Submitted By:', report.submittedBy || 'N/A']
      ];

      collegeInfo.forEach(([label, value]) => {
        pdf.text(`${label}`, 14, currentY);
        pdf.text(`${value}`, 60, currentY);
        currentY += 6;
      });

      currentY += 5;

      // Key Metrics Section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('KEY PERFORMANCE METRICS', 14, currentY);
      currentY += 10;

      const metricsData = [
        ['Total Students', report.totalStudents?.toLocaleString() || '0'],
        ['Total Programs', (report.programs?.length || 0).toString()],
        ['Budget Utilization', `${analysis.budgetUtilization}%`],
        ['Student:Classroom Ratio', `${analysis.studentClassroomRatio}:1`],
        ['Student:Lab Ratio', `${analysis.studentLabRatio}:1`],
        ['Graduation Rate', `${analysis.graduationRate}%`],
        ['New Admissions', analysis.totalNewAdmissions?.toLocaleString() || '0'],
        ['Graduated Students', analysis.totalGraduated?.toLocaleString() || '0']
      ];

      pdf.autoTable({
        startY: currentY,
        head: [['Metric', 'Value']],
        body: metricsData,
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 3 },
        margin: { left: 14, right: 14 }
      });

      currentY = (pdf as any).lastAutoTable.finalY + 15;

      // Infrastructure Overview
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('INFRASTRUCTURE OVERVIEW', 14, currentY);
      currentY += 10;

      const infrastructureData = [
        ['Building Status', report.buildingStatus || 'N/A'],
        ['Classroom Count', (report.classroomCount || 0).toString()],
        ['Laboratory Count', (report.labCount || 0).toString()],
        ['Library Books', (report.libraryBooks || 0).toLocaleString()],
        ['IT Connectivity', report.itConnectivity || 'N/A'],
        ['Books per Student', Math.round((report.libraryBooks || 0) / (report.totalStudents || 1)).toString()]
      ];

      pdf.autoTable({
        startY: currentY,
        head: [['Infrastructure Item', 'Details']],
        body: infrastructureData,
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 3 },
        margin: { left: 14, right: 14 }
      });

      currentY = (pdf as any).lastAutoTable.finalY + 15;

      // Program-wise Student Data
      if (report.programs && report.programs.length > 0) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('PROGRAM-WISE STUDENT DATA', 14, currentY);
        currentY += 10;

        const programData = report.programs.map(program => [
          program.programName || 'N/A',
          (program.totalStudents || 0).toString(),
          (program.maleStudents || 0).toString(),
          (program.femaleStudents || 0).toString(),
          (program.scholarshipStudents || 0).toString(),
          program.isScholarshipRuleApplied ? 'Yes' : 'No',
          (program.newAdmissions || 0).toString(),
          (program.graduatedStudents || 0).toString(),
          `${program.passPercentage || 0}%`,
          program.approvalLetterPath ? 'Available' : 'Not Available'
        ]);

        pdf.autoTable({
          startY: currentY,
          head: [
            ['Program Name', 'Total', 'Male', 'Female', 'Scholarship', 'Rule Applied', 'New Adm', 'Graduated', 'Pass %', 'Approval']
          ],
          body: programData,
          theme: 'grid',
          headStyles: { fillColor: [139, 92, 246], textColor: 255, fontStyle: 'bold' },
          styles: { fontSize: 8, cellPadding: 2 },
          margin: { left: 14, right: 14 },
          pageBreak: 'auto'
        });

        currentY = (pdf as any).lastAutoTable.finalY + 15;
      }

      // Financial Summary
      if (report.financialStatus) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('FINANCIAL SUMMARY', 14, currentY);
        currentY += 10;

        const financial = report.financialStatus;
        
        // Overall Financial Summary
        const overallFinancial = [
          ['Total Annual Budget', formatCurrency(financial.totalAnnualBudget)],
          ['Total Actual Expenditure', formatCurrency(financial.totalActualExpenditure)],
          ['Total Revenue Generated', formatCurrency(financial.totalRevenueGenerated)],
          ['Budget Utilization Rate', `${analysis.budgetUtilization}%`],
          ['Financial Efficiency', analysis.budgetUtilization >= 85 && analysis.budgetUtilization <= 95 ? 'Optimal' : 'Needs Review']
        ];

        pdf.autoTable({
          startY: currentY,
          head: [['Financial Item', 'Amount']],
          body: overallFinancial,
          theme: 'grid',
          headStyles: { fillColor: [245, 158, 11], textColor: 255, fontStyle: 'bold' },
          styles: { fontSize: 10, cellPadding: 3 },
          margin: { left: 14, right: 14 }
        });

        currentY = (pdf as any).lastAutoTable.finalY + 15;

        // Detailed Financial Breakdown
        const financialCategories = [
          {
            category: 'Salaries',
            data: financial.salaries
          },
          {
            category: 'Capital',
            data: financial.capital
          },
          {
            category: 'Operational',
            data: financial.operational
          },
          {
            category: 'Research',
            data: financial.research
          }
        ];

        const detailedFinancialData = financialCategories.map(item => {
          const data = item.data;
          if (!data) return [item.category, 'N/A', 'N/A', 'N/A', 'N/A'];
          
          return [
            item.category,
            formatCurrency(data.annualBudget || 0),
            formatCurrency(data.actualExpenditure || 0),
            formatCurrency(data.revenueGenerated || 0),
            data.sources?.join(', ') || 'N/A'
          ];
        });

        pdf.autoTable({
          startY: currentY,
          head: [['Category', 'Annual Budget', 'Actual Expenditure', 'Revenue Generated', 'Funding Sources']],
          body: detailedFinancialData,
          theme: 'grid',
          headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
          styles: { fontSize: 8, cellPadding: 2 },
          margin: { left: 14, right: 14 }
        });

        currentY = (pdf as any).lastAutoTable.finalY + 15;
      }

      // Progress and Development Section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PROGRESS & DEVELOPMENT', 14, currentY);
      currentY += 10;

      const progressData = [
        ['Academic Progress', report.academicProgress || 'No information provided'],
        ['Research Progress', report.researchProgress || 'No information provided'],
        ['Administrative Progress', report.adminProgress || 'No information provided'],
        ['Quality Progress', report.qualityProgress || 'No information provided']
      ];

      progressData.forEach(([category, progress]) => {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${category}:`, 14, currentY);
        currentY += 4;
        
        pdf.setFont('helvetica', 'normal');
        const lines = pdf.splitTextToSize(progress, 180);
        pdf.text(lines, 20, currentY);
        currentY += (lines.length * 5) + 8;
        
        // Check if we need a new page
        if (currentY > 250) {
          pdf.addPage();
          currentY = 20;
        }
      });

      // Challenges and Future Plans
      if (report.majorChallenges || report.nextYearPlan) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('CHALLENGES & FUTURE PLANS', 14, currentY);
        currentY += 10;

        if (report.majorChallenges) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Major Challenges:', 14, currentY);
          currentY += 4;
          
          pdf.setFont('helvetica', 'normal');
          const challengeLines = pdf.splitTextToSize(report.majorChallenges, 180);
          pdf.text(challengeLines, 20, currentY);
          currentY += (challengeLines.length * 5) + 8;
        }

        if (report.nextYearPlan) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Next Year Plan:', 14, currentY);
          currentY += 4;
          
          pdf.setFont('helvetica', 'normal');
          const planLines = pdf.splitTextToSize(report.nextYearPlan, 180);
          pdf.text(planLines, 20, currentY);
          currentY += (planLines.length * 5) + 8;
        }
      }

      // Performance Analysis Section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PERFORMANCE ANALYSIS', 14, currentY);
      currentY += 10;

      const performanceAnalysis = [
        ['Overall Performance Rating', getPerformanceRating(analysis)],
        ['Budget Efficiency', analysis.budgetUtilization >= 85 && analysis.budgetUtilization <= 95 ? 'Optimal' : 'Needs Improvement'],
        ['Resource Utilization', analysis.studentClassroomRatio <= 40 ? 'Good' : 'Overcrowded'],
        ['Academic Performance', analysis.graduationRate >= 75 ? 'Good' : 'Needs Attention'],
        ['Infrastructure Status', report.buildingStatus === 'Complete' ? 'Adequate' : 'Development Needed']
      ];

      pdf.autoTable({
        startY: currentY,
        head: [['Aspect', 'Assessment']],
        body: performanceAnalysis,
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 3 },
        margin: { left: 14, right: 14 }
      });

      currentY = (pdf as any).lastAutoTable.finalY + 15;

      // Summary and Recommendations
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SUMMARY & RECOMMENDATIONS', 14, currentY);
      currentY += 10;

      const summary = generateSummary(report, analysis);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const summaryLines = pdf.splitTextToSize(summary, 180);
      pdf.text(summaryLines, 14, currentY);
      currentY += (summaryLines.length * 5) + 10;

      // Footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text(
          `Page ${i} of ${pageCount} | Generated on ${new Date().toLocaleDateString()} | Education Monitoring System`,
          105,
          290,
          { align: 'center' }
        );
      }

      // Save the PDF
      pdf.save(`${report.collegeName}_Progress_Report_${report.academicYear}.pdf`);
      toast.success('PDF report exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
    }
  };

  // Helper function to generate performance rating
  const getPerformanceRating = (analysis: any) => {
    let score = 0;
    
    // Budget utilization (30%)
    if (analysis.budgetUtilization >= 85 && analysis.budgetUtilization <= 95) score += 30;
    else if (analysis.budgetUtilization >= 70) score += 20;
    else score += 10;

    // Student-classroom ratio (25%)
    if (analysis.studentClassroomRatio <= 30) score += 25;
    else if (analysis.studentClassroomRatio <= 40) score += 20;
    else score += 10;

    // Graduation rate (25%)
    if (analysis.graduationRate >= 80) score += 25;
    else if (analysis.graduationRate >= 60) score += 20;
    else score += 10;

    // Infrastructure (20%)
    if (analysis.studentLabRatio <= 100) score += 20;
    else if (analysis.studentLabRatio <= 150) score += 15;
    else score += 5;

    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  // Helper function to generate summary
  const generateSummary = (report: ProgressReport, analysis: any) => {
    const strengths = [];
    const areasForImprovement = [];

    // Identify strengths
    if (analysis.budgetUtilization >= 85 && analysis.budgetUtilization <= 95) {
      strengths.push('optimal budget utilization');
    }
    if (analysis.studentClassroomRatio <= 40) {
      strengths.push('good classroom capacity management');
    }
    if (analysis.graduationRate >= 75) {
      strengths.push('strong academic performance');
    }
    if (report.programs && report.programs.length >= 3) {
      strengths.push('diverse program offerings');
    }

    // Identify areas for improvement
    if (analysis.budgetUtilization < 70 || analysis.budgetUtilization > 100) {
      areasForImprovement.push('budget management needs optimization');
    }
    if (analysis.studentClassroomRatio > 40) {
      areasForImprovement.push('classroom infrastructure requires expansion');
    }
    if (analysis.graduationRate < 60) {
      areasForImprovement.push('academic outcomes need enhancement');
    }
    if (analysis.studentLabRatio > 150) {
      areasForImprovement.push('laboratory facilities are insufficient');
    }

    let summary = `The ${report.collegeName} has demonstrated `;
    
    if (strengths.length > 0) {
      summary += strengths.join(', ') + '. ';
    } else {
      summary += 'satisfactory performance across basic metrics. ';
    }

    if (areasForImprovement.length > 0) {
      summary += `Key areas requiring attention include ${areasForImprovement.join(', ')}. `;
    }

    summary += `Overall institutional performance is rated as "${getPerformanceRating(analysis)}". `;
    summary += `Recommendations include continuous monitoring of resource allocation and strategic planning for infrastructure development.`;

    return summary;
  };

  const convertCollegeToCSV = (report: ProgressReport): string => {
    const headers = [
      'College Name', 'Academic Year', 'Total Students', 'Building Status', 'Classroom Count', 
      'Lab Count', 'Library Books', 'IT Connectivity', 'Head Name', 'Principal Name', 'Submitted By'
    ];

    const data = [
      report.collegeName, report.academicYear, report.totalStudents, report.buildingStatus,
      report.classroomCount, report.labCount, report.libraryBooks, report.itConnectivity,
      report.headName, report.principalName, report.submittedBy
    ];

    // Add program-wise data
    let programCSV = '';
    if (report.programs && report.programs.length > 0) {
      const programHeaders = [
        'Program Name', 'Program Total Students', 'Program Male Students', 'Program Female Students',
        'Program Scholarship Students', 'Program Scholarship Rule Applied', 'Program New Admissions',
        'Program Graduated Students', 'Program Pass Percentage', 'Program Approval Letter'
      ];
      
      programCSV = '\n\nProgram-wise Data:\n' + programHeaders.join(',') + '\n';
      
      report.programs.forEach(program => {
        const programRow = [
          program.programName,
          program.totalStudents,
          program.maleStudents,
          program.femaleStudents,
          program.scholarshipStudents,
          program.isScholarshipRuleApplied ? 'Yes' : 'No',
          program.newAdmissions,
          program.graduatedStudents,
          program.passPercentage,
          program.approvalLetterPath ? 'Yes' : 'No'
        ];
        programCSV += programRow.join(',') + '\n';
      });
    }

    // Add financial data
    let financialCSV = '';
    if (report.financialStatus) {
      const financialHeaders = [
        'Financial Category', 'Annual Budget', 'Actual Expenditure', 'Revenue Generated', 'Sources'
      ];
      
      financialCSV = '\n\nFinancial Data:\n' + financialHeaders.join(',') + '\n';
      
      const categories = ['salaries', 'capital', 'operational', 'research'];
      categories.forEach(category => {
        const financial = report.financialStatus[category];
        if (financial) {
          const financialRow = [
            category.charAt(0).toUpperCase() + category.slice(1),
            financial.annualBudget,
            financial.actualExpenditure,
            financial.revenueGenerated,
            financial.sources?.join('; ') || ''
          ];
          financialCSV += financialRow.join(',') + '\n';
        }
      });
    }

    return [headers.join(','), data.join(',')].join('\n') + programCSV + financialCSV;
  };

  const downloadCSV = (csvData: string, filename: string) => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000000) {
      return `NPR ${(amount / 1000000000).toFixed(2)}B`;
    } else if (amount >= 1000000) {
      return `NPR ${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `NPR ${(amount / 1000).toFixed(2)}K`;
    }
    return `NPR ${amount}`;
  };

  const filteredReports = reports.filter(report =>
    report.collegeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.collegeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCollegeAnalysis = (report: ProgressReport) => {
    const totalStudents = report.totalStudents || 0;
    const financial = report.financialStatus;
    
    const budgetUtilization = financial?.totalAnnualBudget > 0 
      ? (financial.totalActualExpenditure / financial.totalAnnualBudget) * 100 
      : 0;
    
    const studentClassroomRatio = Math.round(totalStudents / Math.max(report.classroomCount || 1, 1));
    const studentLabRatio = Math.round(totalStudents / Math.max(report.labCount || 1, 1));
    
    // Calculate total graduated students from programs
    const totalGraduated = report.programs?.reduce((sum, program) => sum + (program.graduatedStudents || 0), 0) || 0;
    const totalNewAdmissions = report.programs?.reduce((sum, program) => sum + (program.newAdmissions || 0), 0) || 0;
    
    const graduationRate = totalStudents > 0 ? (totalGraduated / totalStudents) * 100 : 0;
    const admissionGrowth = totalStudents > 0 ? (totalNewAdmissions / totalStudents) * 100 : 0;
    
    return {
      budgetUtilization: Math.round(budgetUtilization),
      studentClassroomRatio,
      studentLabRatio,
      graduationRate: Math.round(graduationRate),
      admissionGrowth: Math.round(admissionGrowth),
      totalGraduated,
      totalNewAdmissions
    };
  };

  const getFinancialData = (report: ProgressReport) => {
    if (!report.financialStatus) return [];
    
    const financial = report.financialStatus;
    return [
      { 
        category: 'Salaries', 
        budget: financial.salaries?.annualBudget || 0, 
        expenditure: financial.salaries?.actualExpenditure || 0,
        revenue: financial.salaries?.revenueGenerated || 0
      },
      { 
        category: 'Capital', 
        budget: financial.capital?.annualBudget || 0, 
        expenditure: financial.capital?.actualExpenditure || 0,
        revenue: financial.capital?.revenueGenerated || 0
      },
      { 
        category: 'Operational', 
        budget: financial.operational?.annualBudget || 0, 
        expenditure: financial.operational?.actualExpenditure || 0,
        revenue: financial.operational?.revenueGenerated || 0
      },
      { 
        category: 'Research', 
        budget: financial.research?.annualBudget || 0, 
        expenditure: financial.research?.actualExpenditure || 0,
        revenue: financial.research?.revenueGenerated || 0
      }
    ];
  };

  const getExpenditureDistribution = (report: ProgressReport) => {
    if (!report.financialStatus) return [];
    
    const financial = report.financialStatus;
    const totalExpenditure = financial.totalActualExpenditure;
    if (totalExpenditure === 0) return [];

    return [
      { 
        name: 'Salaries', 
        value: financial.salaries?.actualExpenditure || 0, 
        percentage: ((financial.salaries?.actualExpenditure || 0) / totalExpenditure * 100).toFixed(1) 
      },
      { 
        name: 'Capital', 
        value: financial.capital?.actualExpenditure || 0, 
        percentage: ((financial.capital?.actualExpenditure || 0) / totalExpenditure * 100).toFixed(1) 
      },
      { 
        name: 'Operational', 
        value: financial.operational?.actualExpenditure || 0, 
        percentage: ((financial.operational?.actualExpenditure || 0) / totalExpenditure * 100).toFixed(1) 
      },
      { 
        name: 'Research', 
        value: financial.research?.actualExpenditure || 0, 
        percentage: ((financial.research?.actualExpenditure || 0) / totalExpenditure * 100).toFixed(1) 
      }
    ];
  };

  const getBudgetVsActualData = (report: ProgressReport) => {
    if (!report.financialStatus) return [];
    
    const financial = report.financialStatus;
    return [
      { 
        category: 'Total', 
        budget: financial.totalAnnualBudget / 1000000, 
        actual: financial.totalActualExpenditure / 1000000,
        revenue: financial.totalRevenueGenerated / 1000000
      }
    ];
  };

  const getStudentFlowData = (report: ProgressReport) => {
    const totalStudents = report.totalStudents || 0;
    const totalNewAdmissions = report.programs?.reduce((sum, program) => sum + (program.newAdmissions || 0), 0) || 0;
    const totalGraduated = report.programs?.reduce((sum, program) => sum + (program.graduatedStudents || 0), 0) || 0;
    
    return [
      { category: 'Total', count: totalStudents, label: 'Enrolled' },
      { category: 'New', count: totalNewAdmissions, label: 'Admissions' },
      { category: 'Graduated', count: totalGraduated, label: 'Graduated' }
    ];
  };

  const getResourceEfficiencyData = (report: ProgressReport) => {
    const totalStudents = report.totalStudents || 0;
    return [
      { metric: 'Students per Classroom', value: Math.round(totalStudents / (report.classroomCount || 1)), benchmark: 40 },
      { metric: 'Students per Lab', value: Math.round(totalStudents / (report.labCount || 1)), benchmark: 150 },
      { metric: 'Books per Student', value: Math.round((report.libraryBooks || 0) / totalStudents), benchmark: 50 }
    ];
  };

  const getGenderDistributionData = (report: ProgressReport) => {
    if (!report.programs) return [];
    
    const genderData = report.programs.map(program => ({
      program: program.programName,
      male: program.maleStudents || 0,
      female: program.femaleStudents || 0
    }));
    
    return genderData;
  };

  const getScholarshipData = (report: ProgressReport) => {
    if (!report.programs) return [];
    
    return report.programs.map(program => ({
      program: program.programName,
      scholarship: program.scholarshipStudents || 0,
      total: program.totalStudents || 0,
      percentage: program.totalStudents > 0 ? ((program.scholarshipStudents || 0) / program.totalStudents * 100).toFixed(1) : 0
    }));
  };

  const getPassRateData = (report: ProgressReport) => {
    if (!report.programs) return [];
    
    return report.programs.map(program => ({
      program: program.programName,
      passRate: program.passPercentage || 0
    }));
  };

  const handleFileView = (url: string, filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(extension || '')) {
      setSelectedImage(url);
      setIsFullScreenOpen(true);
    } else if (['pdf'].includes(extension || '')) {
      setSelectedDocument({ url, filename, type: 'pdf' });
      setIsFullScreenOpen(true);
    } else {
      // For other file types, trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-xl font-semibold text-gray-700">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (selectedCollege) {
    const analysis = getCollegeAnalysis(selectedCollege);
    const financialData = getFinancialData(selectedCollege);
    const expenditureData = getExpenditureDistribution(selectedCollege);
    const budgetVsActualData = getBudgetVsActualData(selectedCollege);
    const studentFlowData = getStudentFlowData(selectedCollege);
    const resourceEfficiencyData = getResourceEfficiencyData(selectedCollege);
    const genderDistributionData = getGenderDistributionData(selectedCollege);
    const scholarshipData = getScholarshipData(selectedCollege);
    const passRateData = getPassRateData(selectedCollege);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" ref={chartRef}>
        <div className="max-w-[1600px] mx-auto p-8">
          {/* Header Section */}
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setSelectedCollege(null)} 
              className="mb-4 shadow-sm hover:shadow-md transition-all"
            >
              ← Back to College List
            </Button>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{selectedCollege.collegeName}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <Badge variant="outline" className="text-base px-4 py-1">
                    <School className="h-4 w-4 mr-2" />
                    {selectedCollege.academicYear}
                  </Badge>
                  <span className="text-sm">Submitted: {selectedCollege.submissionDate}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={() => handleExportCSV(selectedCollege)}
                  className="shadow-md hover:shadow-lg transition-all bg-emerald-600 hover:bg-emerald-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  onClick={() => handleExportPDF(selectedCollege)}
                  className="shadow-md hover:shadow-lg transition-all bg-rose-600 hover:bg-rose-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge variant="secondary">{analysis.admissionGrowth}% growth</Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900">{selectedCollege.totalStudents.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">Total Students</div>
                <div className="text-xs text-gray-500 mt-2">
                  New: {analysis.totalNewAdmissions} | Graduated: {analysis.totalGraduated}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge variant="secondary">Programs</Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900">{selectedCollege.programs?.length || 0}</div>
                <div className="text-sm text-gray-600 mt-1">Total Programs</div>
                <div className="text-xs text-gray-500 mt-2">
                  Active academic programs
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <p className="h-6 w-6 text-purple-600 text-xl">
                      
                       रु</p>
                  </div>
                  <Badge variant="secondary">Budget Usage</Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900">{analysis.budgetUtilization}%</div>
                <div className="text-sm text-gray-600 mt-1">Budget Utilization</div>
                <div className="text-xs text-gray-500 mt-2">
                  {selectedCollege.financialStatus && formatCurrency(selectedCollege.financialStatus.totalAnnualBudget)}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Building className="h-6 w-6 text-orange-600" />
                  </div>
                  <Badge variant="secondary">Capacity</Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900">{analysis.studentClassroomRatio}:1</div>
                <div className="text-sm text-gray-600 mt-1">Student:Classroom Ratio</div>
                <div className="text-xs text-gray-500 mt-2">
                  Lab Ratio: {analysis.studentLabRatio}:1
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="programs" className="space-y-8">
            <TabsList className="grid w-full grid-cols-6 h-auto p-1 bg-white shadow-lg">
              <TabsTrigger value="programs" className="py-3 text-sm font-semibold">
                <Users className="h-4 w-4 mr-2" />
                Programs
              </TabsTrigger>
              <TabsTrigger value="financial" className="py-3 text-sm font-semibold">
                <DollarSign className="h-4 w-4 mr-2" />
                Financial
              </TabsTrigger>
              <TabsTrigger value="academic" className="py-3 text-sm font-semibold">
                <GraduationCap className="h-4 w-4 mr-2" />
                Academic
              </TabsTrigger>
              <TabsTrigger value="infrastructure" className="py-3 text-sm font-semibold">
                <Building className="h-4 w-4 mr-2" />
                Infrastructure
              </TabsTrigger>
              <TabsTrigger value="progress" className="py-3 text-sm font-semibold">
                <Activity className="h-4 w-4 mr-2" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="insights" className="py-3 text-sm font-semibold">
                <Target className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
            </TabsList>

            {/* Programs Tab */}
            <TabsContent value="programs" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Program-wise Student Data
                  </CardTitle>
                  <CardDescription>Detailed breakdown of students by program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Program Name</TableHead>
                          <TableHead>Total Students</TableHead>
                          <TableHead>Male</TableHead>
                          <TableHead>Female</TableHead>
                          <TableHead>Scholarship</TableHead>
                          <TableHead>Scholarship Rule</TableHead>
                          <TableHead>New Admissions</TableHead>
                          <TableHead>Graduated</TableHead>
                          <TableHead>Pass %</TableHead>
                          <TableHead>Approval Letter</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCollege.programs?.map((program, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-semibold">{program.programName}</TableCell>
                            <TableCell>{program.totalStudents}</TableCell>
                            <TableCell>{program.maleStudents}</TableCell>
                            <TableCell>{program.femaleStudents}</TableCell>
                            <TableCell>
                              <Badge variant={program.scholarshipStudents > 0 ? "default" : "secondary"}>
                                {program.scholarshipStudents}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={program.isScholarshipRuleApplied ? "default" : "outline"}>
                                {program.isScholarshipRuleApplied ? 'Applied' : 'Not Applied'}
                              </Badge>
                            </TableCell>
                            <TableCell>{program.newAdmissions}</TableCell>
                            <TableCell>{program.graduatedStudents}</TableCell>
                            <TableCell>
                              <Badge variant={
                                program.passPercentage >= 80 ? "default" :
                                program.passPercentage >= 60 ? "secondary" : "destructive"
                              }>
                                {program.passPercentage}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {program.approvalLetterPath ? (
                                <div className="flex items-center space-x-2">
                                  <div 
                                    className="relative group cursor-pointer"
                                    onClick={() => handleFileView(program.approvalLetterPath!, program.approvalLetterFilename || 'approval_letter')}
                                  >
                                    {program.approvalLetterPath.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                      <img 
                                        src={program.approvalLetterPath} 
                                        alt="Approval letter preview"
                                        className="w-12 h-12 object-cover rounded border border-gray-300 hover:border-blue-500 transition-colors"
                                      />
                                    ) : (
                                      <div className="w-12 h-12 bg-gray-100 rounded border border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors">
                                        <FileText className="h-6 w-6 text-gray-500" />
                                      </div>
                                    )}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded transition-all flex items-center justify-center">
                                      <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                  </div>
                                  
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleFileView(program.approvalLetterPath!, program.approvalLetterFilename || 'approval_letter')}
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                </div>
                              ) : (
                                <Badge variant="outline" className="px-3 py-1">
                                  Not Available
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Users className="h-5 w-5 mr-2 text-green-600" />
                      Gender Distribution by Program
                    </CardTitle>
                    <CardDescription>Male vs Female student distribution across programs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={genderDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="program" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Bar dataKey="male" fill="#3b82f6" name="Male Students" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="female" fill="#ec4899" name="Female Students" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Award className="h-5 w-5 mr-2 text-purple-600" />
                      Scholarship Distribution
                    </CardTitle>
                    <CardDescription>Scholarship students across different programs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={scholarshipData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="program" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                          formatter={(value, name) => [value, name === 'percentage' ? 'Percentage' : 'Students']}
                        />
                        <Legend />
                        <Bar dataKey="scholarship" fill="#8b5cf6" name="Scholarship Students" radius={[8, 8, 0, 0]} />
                        <Line type="monotone" dataKey="percentage" stroke="#ef4444" name="Scholarship %" strokeWidth={2} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-blue-900">
                      {selectedCollege.programs?.reduce((sum, prog) => sum + (prog.maleStudents || 0), 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700 font-semibold mt-2">Total Male Students</div>
                    <div className="text-xs text-blue-600 mt-2">Across all programs</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-pink-50 to-pink-100">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-pink-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-pink-900">
                      {selectedCollege.programs?.reduce((sum, prog) => sum + (prog.femaleStudents || 0), 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-pink-700 font-semibold mt-2">Total Female Students</div>
                    <div className="text-xs text-pink-600 mt-2">Across all programs</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-purple-900">
                      {selectedCollege.programs?.reduce((sum, prog) => sum + (prog.scholarshipStudents || 0), 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-purple-700 font-semibold mt-2">Total Scholarship Students</div>
                    <div className="text-xs text-purple-600 mt-2">Across all programs</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                      Budget vs Expenditure vs Revenue
                    </CardTitle>
                    <CardDescription>Financial performance comparison (NPR Millions)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={budgetVsActualData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: 'NPR (Millions)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: 12 } }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                          formatter={(value) => [`NPR ${Number(value).toFixed(2)}M`, '']}
                        />
                        <Legend />
                        <Bar dataKey="budget" fill="#3b82f6" name="Approved Budget" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="actual" fill="#10b981" name="Actual Expenditure" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="revenue" fill="#f59e0b" name="Revenue Generated" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <PieChartIcon className="h-5 w-5 mr-2 text-purple-600" />
                      Expenditure Distribution
                    </CardTitle>
                    <CardDescription>Breakdown of total spending by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={expenditureData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percentage }) => `${name} (${percentage}%)`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {expenditureData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      Financial Trend Analysis
                    </CardTitle>
                    <CardDescription>Budget vs Actual expenditure trend</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={financialData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                          formatter={(value) => [formatCurrency(Number(value)), '']}
                        />
                        <Legend />
                        <Bar dataKey="budget" fill="#3b82f6" name="Budget" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="expenditure" fill="#10b981" name="Expenditure" radius={[8, 8, 0, 0]} />
                        <Line type="monotone" dataKey="revenue" stroke="#f59e0b" name="Revenue" strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <FileText className="h-5 w-5 mr-2 text-orange-600" />
                      Financial Documents
                    </CardTitle>
                    <CardDescription>Audited statements and budget documents</CardDescription>
                  </CardHeader>
                  <FinancialDocumentsSection selectedCollege={selectedCollege}/>
                </Card>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-blue-700 font-semibold mb-2">Total Budget</div>
                    <div className="text-2xl font-bold text-blue-900">
                      {selectedCollege.financialStatus ? formatCurrency(selectedCollege.financialStatus.totalAnnualBudget) : 'N/A'}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-green-700 font-semibold mb-2">Total Expenditure</div>
                    <div className="text-2xl font-bold text-green-900">
                      {selectedCollege.financialStatus ? formatCurrency(selectedCollege.financialStatus.totalActualExpenditure) : 'N/A'}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-purple-700 font-semibold mb-2">Total Revenue</div>
                    <div className="text-2xl font-bold text-purple-900">
                      {selectedCollege.financialStatus ? formatCurrency(selectedCollege.financialStatus.totalRevenueGenerated) : 'N/A'}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-orange-700 font-semibold mb-2">Utilization Rate</div>
                    <div className="text-2xl font-bold text-orange-900">{analysis.budgetUtilization}%</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Academic Tab */}
            <TabsContent value="academic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      Student Statistics Overview
                    </CardTitle>
                    <CardDescription>Enrollment and graduation metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={studentFlowData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                          formatter={(value) => [Number(value).toLocaleString(), 'Students']}
                        />
                        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                          {studentFlowData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                      Program Pass Rates
                    </CardTitle>
                    <CardDescription>Pass percentage across different programs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={passRateData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="program" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                          formatter={(value) => [`${value}%`, 'Pass Rate']}
                        />
                        <Bar dataKey="passRate" fill="#10b981" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-green-600 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-green-900">
                      {passRateData.length > 0 ? 
                        Math.round(passRateData.reduce((sum, item) => sum + item.passRate, 0) / passRateData.length) : 0
                      }%
                    </div>
                    <div className="text-sm text-green-700 font-semibold mt-1">Average Pass Percentage</div>
                    <div className="text-xs text-green-600 mt-2">Across all programs</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-cyan-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-blue-600 rounded-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-900">{analysis.totalNewAdmissions}</div>
                    <div className="text-sm text-blue-700 font-semibold mt-1">Total New Admissions</div>
                    <div className="text-xs text-blue-600 mt-2">Current academic year</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-pink-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-purple-600 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-purple-900">{analysis.totalGraduated}</div>
                    <div className="text-sm text-purple-700 font-semibold mt-1">Total Graduated</div>
                    <div className="text-xs text-purple-600 mt-2">Completed programs</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-orange-50 to-amber-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-orange-600 rounded-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-orange-900">{analysis.graduationRate}%</div>
                    <div className="text-sm text-orange-700 font-semibold mt-1">Graduation Rate</div>
                    <div className="text-xs text-orange-600 mt-2">{analysis.totalGraduated} students</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Infrastructure Tab */}
            <TabsContent value="infrastructure" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Building className="h-5 w-5 mr-2 text-orange-600" />
                      Physical Facilities Overview
                    </CardTitle>
                    <CardDescription>Classrooms, labs, and library resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={[
                        { name: 'Classrooms', count: selectedCollege.classroomCount || 0 },
                        { name: 'Labs', count: selectedCollege.labCount || 0 },
                        { name: 'Library (K)', count: Math.round((selectedCollege.libraryBooks || 0) / 1000) }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        />
                        <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Target className="h-5 w-5 mr-2 text-blue-600" />
                      Resource Utilization
                    </CardTitle>
                    <CardDescription>Student to resource ratios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={resourceEfficiencyData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <YAxis dataKey="metric" type="category" width={150} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Bar dataKey="value" fill="#8b5cf6" name="Actual" radius={[0, 8, 8, 0]} />
                        <Bar dataKey="benchmark" fill="#e2e8f0" name="Benchmark" radius={[0, 8, 8, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-lg border-t-4 border-t-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <School className="h-8 w-8 text-orange-600" />
                      <Badge variant={selectedCollege.buildingStatus === 'Complete' ? "default" : "secondary"}>
                        {selectedCollege.buildingStatus || 'N/A'}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{selectedCollege.classroomCount || 0}</div>
                    <div className="text-sm text-gray-600 mt-1">Classrooms</div>
                    <div className="text-xs text-gray-500 mt-2">Ratio: {analysis.studentClassroomRatio}:1</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-t-4 border-t-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <FlaskConical className="h-8 w-8 text-blue-600" />
                      <Badge variant="secondary">Labs</Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{selectedCollege.labCount || 0}</div>
                    <div className="text-sm text-gray-600 mt-1">Labs/Workshops</div>
                    <div className="text-xs text-gray-500 mt-2">Ratio: {analysis.studentLabRatio}:1</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-t-4 border-t-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <BookOpen className="h-8 w-8 text-purple-600" />
                      <Badge variant="secondary">Library</Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{((selectedCollege.libraryBooks || 0) / 1000).toFixed(1)}K</div>
                    <div className="text-sm text-gray-600 mt-1">Books Available</div>
                    <div className="text-xs text-gray-500 mt-2">{Math.round((selectedCollege.libraryBooks || 0) / (selectedCollege.totalStudents || 1))} per student</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-t-4 border-t-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Wifi className="h-8 w-8 text-green-600" />
                      <Badge variant={
                        selectedCollege.itConnectivity === 'Excellent' ? "default" :
                        selectedCollege.itConnectivity === 'Good' ? "secondary" : "destructive"
                      }>
                        {selectedCollege.itConnectivity || 'N/A'}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">IT</div>
                    <div className="text-sm text-gray-600 mt-1">Connectivity</div>
                    <div className="text-xs text-gray-500 mt-2">Network infrastructure</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Activity className="h-5 w-5 mr-2 text-blue-600" />
                      Progress Tracking
                    </CardTitle>
                    <CardDescription>Key progress areas and development status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Academic Progress</span>
                        <span className="text-sm font-bold text-blue-600">Reported</span>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700">{selectedCollege.academicProgress || 'No progress details available'}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Research Progress</span>
                        <span className="text-sm font-bold text-purple-600">Reported</span>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-sm text-gray-700">{selectedCollege.researchProgress || 'No research progress details'}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Administrative Progress</span>
                        <span className="text-sm font-bold text-green-600">Reported</span>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700">{selectedCollege.adminProgress || 'No administrative progress details'}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Quality Progress</span>
                        <span className="text-sm font-bold text-orange-600">Reported</span>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-gray-700">{selectedCollege.qualityProgress || 'No quality progress details'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Target className="h-5 w-5 mr-2 text-green-600" />
                      Strategic Planning
                    </CardTitle>
                    <CardDescription>Challenges and future initiatives</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center mb-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="text-sm font-semibold text-gray-700">Major Challenges</span>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                        <p className="text-sm text-gray-700">{selectedCollege.majorChallenges || 'No challenges reported'}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center mb-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-gray-700">Next Year Plan</span>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm text-gray-700">{selectedCollege.nextYearPlan || 'No plans reported'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Award className="h-5 w-5 mr-2 text-indigo-600" />
                    Key Highlights & Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="p-4 bg-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-blue-900">{selectedCollege.totalStudents.toLocaleString()}</div>
                      <div className="text-sm text-blue-700 font-semibold mt-2">Total Students</div>
                      <div className="text-xs text-blue-600 mt-1">Across all programs</div>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <div className="p-4 bg-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <GraduationCap className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-purple-900">
                        {passRateData.length > 0 ? 
                          Math.round(passRateData.reduce((sum, item) => sum + item.passRate, 0) / passRateData.length) : 0
                        }%
                      </div>
                      <div className="text-sm text-purple-700 font-semibold mt-2">Average Pass Rate</div>
                      <div className="text-xs text-purple-600 mt-1">Academic performance</div>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                      <div className="p-4 bg-orange-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-orange-900">
                        {selectedCollege.programs?.filter(p => p.approvalLetterPath).length || 0}
                      </div>
                      <div className="text-sm text-orange-700 font-semibold mt-2">Programs with Approval</div>
                      <div className="text-xs text-orange-600 mt-1">Approval letters available</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Users className="h-5 w-5 mr-2 text-green-600" />
                      Leadership & Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Head of Planning/QAAC:</span>
                      <span>{selectedCollege.headName || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Campus Chief/Principal:</span>
                      <span>{selectedCollege.principalName || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Submitted By:</span>
                      <span>{selectedCollege.submittedBy || 'Not specified'}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" />
                      Report Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Report ID:</span>
                      <span className="font-mono text-sm">{selectedCollege.id}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Created:</span>
                      <span>{new Date(selectedCollege.createdAt!).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Last Updated:</span>
                      <span>{new Date(selectedCollege.updatedAt!).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Full Screen Modal */}
        {isFullScreenOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100"
                onClick={() => {
                  setIsFullScreenOpen(false);
                  setSelectedImage(null);
                  setSelectedDocument(null);
                }}
              >
                <X className="h-6 w-6" />
              </Button>
              
              {/* Download button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-16 z-10 bg-white hover:bg-gray-100"
                onClick={() => {
                  const url = selectedImage || selectedDocument?.url;
                  const filename = selectedDocument?.filename || `document-${Date.now()}`;
                  if (url) {
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = filename;
                    link.click();
                  }
                }}
              >
                <Download className="h-6 w-6" />
              </Button>
              
              {/* Content */}
              <div className="max-w-4xl max-h-[90vh] overflow-auto">
                {selectedImage ? (
                  <img 
                    src={selectedImage} 
                    alt="Document full view"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : selectedDocument?.type === 'pdf' ? (
                  <iframe 
                    src={selectedDocument.url} 
                    className="w-full h-[80vh] border-0 rounded-lg"
                    title={selectedDocument.filename}
                  />
                ) : (
                  <div className="bg-white p-8 rounded-lg max-w-4xl">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <FileText className="h-16 w-16 text-gray-400" />
                      <p className="text-lg font-semibold">Document Preview</p>
                      <p className="text-gray-500 text-center">
                        This document cannot be previewed in full screen. Please download to view.
                      </p>
                      <Button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = selectedDocument!.url;
                          link.download = selectedDocument!.filename;
                          link.click();
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Document
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main dashboard view (college list)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-[1600px] mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">College Progress Monitoring Dashboard</h1>
          <p className="text-lg text-gray-600">Comprehensive institutional performance tracking and analysis</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by college name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 shadow-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button 
            onClick={() => handleExportCSV()} 
            className="h-12 shadow-md hover:shadow-lg transition-all bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-5 w-5 mr-2" />
            Export All Data
          </Button>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="">
            <CardTitle className="text-2xl">College Performance Overview</CardTitle>
            <CardDescription className="">
              Click on any college to view detailed analysis and export reports ({filteredReports.length} colleges)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-bold">College</TableHead>
                    <TableHead className="font-bold">Academic Year</TableHead>
                    <TableHead className="font-bold">Total Students</TableHead>
                    <TableHead className="font-bold">Programs</TableHead>
                    <TableHead className="font-bold">Budget Utilization</TableHead>
                    <TableHead className="font-bold">Infrastructure</TableHead>
                    <TableHead className="font-bold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => {
                    const analysis = getCollegeAnalysis(report);
                    return (
                      <TableRow key={report.id} className="hover:bg-blue-50 transition-colors">
                        <TableCell>
                          <div>
                            <div className="font-semibold text-gray-900">{report.collegeName}</div>
                            <div className="text-sm text-gray-500">{report.collegeId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {report.academicYear}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{report.totalStudents.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {report.programs?.length || 0} programs
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            analysis.budgetUtilization >= 85 && analysis.budgetUtilization <= 95 ? "default" :
                            analysis.budgetUtilization >= 60 ? "secondary" : "destructive"
                          }>
                            {analysis.budgetUtilization}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <School className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{report.classroomCount || 0} classes</span>
                            <BookOpen className="h-4 w-4 text-gray-500 ml-2" />
                            <span className="text-sm">{((report.libraryBooks || 0) / 1000).toFixed(1)}K books</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedCollege(report)}
                            className="shadow-sm hover:shadow-md transition-all hover:bg-blue-600 hover:text-white"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}