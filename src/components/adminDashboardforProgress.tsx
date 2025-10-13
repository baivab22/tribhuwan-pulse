// import React, { useState, useEffect, useRef } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
// import { Download, Search, Eye, TrendingUp, Users, DollarSign, Building, BookOpen, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
// import { toast } from 'sonner';
// import { ProgressReport, AnalyticsData } from '@/types';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// const API_BASE_URL = 'http://localhost:4000/api/progress';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#ff7300'];

// export default function AdminDashboardForProgress() {
//   const [reports, setReports] = useState<ProgressReport[]>([]);
//   const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCollege, setSelectedCollege] = useState<ProgressReport | null>(null);
//   const chartRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [reportsResponse, analyticsResponse] = await Promise.all([
//         fetch(`${API_BASE_URL}`),
//         fetch(`${API_BASE_URL}/analytics`)
//       ]);

//       if (reportsResponse.ok) {
//         const reportsData = await reportsResponse.json();
//         setReports(reportsData.data || []);
//       }

//       if (analyticsResponse.ok) {
//         const analyticsData = await analyticsResponse.json();
//         setAnalytics(analyticsData.data);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       toast.error('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExportCSV = async (report?: ProgressReport) => {
//     try {
//       if (report) {
//         // Export individual college CSV
//         const csvData = convertCollegeToCSV(report);
//         downloadCSV(csvData, `${report.collegeName}_${report.academicYear}_raw_data.csv`);
//         toast.success('College CSV exported successfully');
//       } else {
//         // Export all colleges CSV
//         const response = await fetch(`${API_BASE_URL}/export/csv`);
//         if (response.ok) {
//           const blob = await response.blob();
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.style.display = 'none';
//           a.href = url;
//           a.download = 'progress_reports.csv';
//           document.body.appendChild(a);
//           a.click();
//           window.URL.revokeObjectURL(url);
//           toast.success('CSV exported successfully');
//         } else {
//           toast.error('Failed to export CSV');
//         }
//       }
//     } catch (error) {
//       console.error('Error exporting CSV:', error);
//       toast.error('Failed to export CSV');
//     }
//   };

//   const handleExportPDF = async (report: ProgressReport) => {
//     try {
//       const pdf = new jsPDF();
//       const analysis = getCollegeAnalysis(report);
      
//       // Add title
//       pdf.setFontSize(20);
//       pdf.text(`${report.collegeName} - Progress Report`, 20, 20);
//       pdf.setFontSize(12);
//       pdf.text(`Academic Year: ${report.academicYear} | Submission Date: ${report.submissionDate}`, 20, 30);

//       // Add overall score
//       pdf.setFontSize(16);
//       pdf.text(`Overall Performance Score: ${analysis.overallScore}/100`, 20, 45);
      
//       // Add key metrics table
//       pdf.autoTable({
//         startY: 55,
//         head: [['Metric', 'Value', 'Score']],
//         body: [
//           ['Academic Performance', `${report.passPercentage}% Pass Rate`, `${analysis.academicScore}/100`],
//           ['Financial Management', `${analysis.budgetUtilization}% Budget Used`, `${analysis.financialScore}/100`],
//           ['Infrastructure', `${analysis.studentClassroomRatio}:1 Ratio`, `${analysis.infrastructureScore}/100`],
//           ['Total Students', report.totalStudents.toLocaleString(), '-'],
//           ['New Admissions', report.newAdmissions.toLocaleString(), '-'],
//           ['Graduated Students', report.graduatedStudents.toLocaleString(), '-']
//         ]
//       });

//       // Add financial details
//       const finalY = (pdf as any).lastAutoTable.finalY + 15;
//       pdf.setFontSize(14);
//       pdf.text('Financial Details', 20, finalY);
      
//       pdf.autoTable({
//         startY: finalY + 5,
//         head: [['Financial Item', 'Amount (NPR)']],
//         body: [
//           ['Approved Budget', formatCurrency(report.approvedBudget)],
//           ['Actual Expenditure', formatCurrency(report.actualExpenditure)],
//           ['Revenue Generated', formatCurrency(report.revenueGenerated)],
//           ['Salaries & Allowances', formatCurrency(report.salariesAllowances)],
//           ['Capital Expenditure', formatCurrency(report.capitalExpenditure)],
//           ['Operational Costs', formatCurrency(report.operationalCosts)],
//           ['Research & Development', formatCurrency(report.researchDevelopment)]
//         ]
//       });

//       // Add infrastructure details
//       const finalY2 = (pdf as any).lastAutoTable.finalY + 15;
//       pdf.setFontSize(14);
//       pdf.text('Infrastructure Details', 20, finalY2);
      
//       pdf.autoTable({
//         startY: finalY2 + 5,
//         head: [['Facility', 'Count/Status']],
//         body: [
//           ['Building Status', report.buildingStatus],
//           ['Classrooms', report.classroomCount.toString()],
//           ['Labs/Workshops', report.labCount.toString()],
//           ['Library Books', report.libraryBooks.toLocaleString()],
//           ['IT Connectivity', report.itConnectivity]
//         ]
//       });

//       // Add progress updates
//       const finalY3 = (pdf as any).lastAutoTable.finalY + 15;
//       pdf.setFontSize(14);
//       pdf.text('Progress Updates', 20, finalY3);
      
//       pdf.autoTable({
//         startY: finalY3 + 5,
//         head: [['Area', 'Progress']],
//         body: [
//           ['Academic Progress', report.academicProgress || 'Not specified'],
//           ['Research Progress', report.researchProgress || 'Not specified'],
//           ['Administrative Progress', report.adminProgress || 'Not specified'],
//           ['Quality Progress', report.qualityProgress || 'Not specified']
//         ]
//       });

//       // Download PDF
//       pdf.save(`${report.collegeName}_${report.academicYear}_report.pdf`);
//       toast.success('PDF report exported successfully');
//     } catch (error) {
//       console.error('Error exporting PDF:', error);
//       toast.error('Failed to export PDF');
//     }
//   };

//   const convertCollegeToCSV = (report: ProgressReport): string => {
//     const headers = [
//       'College Name', 'Academic Year', 'Total Students', 'New Admissions', 'Graduated Students',
//       'Pass Percentage', 'Faculty Training', 'Faculty Research', 'Approved Budget', 'Actual Expenditure',
//       'Revenue Generated', 'Salaries Allowances', 'Capital Expenditure', 'Operational Costs',
//       'Research Development', 'Funding Source', 'Building Status', 'Classroom Count', 'Lab Count',
//       'Library Books', 'IT Connectivity', 'Academic Progress', 'Research Progress', 'Admin Progress',
//       'Quality Progress', 'Major Challenges', 'Next Year Plan'
//     ];

//     const data = [
//       report.collegeName,
//       report.academicYear,
//       report.totalStudents,
//       report.newAdmissions,
//       report.graduatedStudents,
//       report.passPercentage,
//       report.facultyTraining,
//       report.facultyResearch,
//       report.approvedBudget,
//       report.actualExpenditure,
//       report.revenueGenerated,
//       report.salariesAllowances,
//       report.capitalExpenditure,
//       report.operationalCosts,
//       report.researchDevelopment,
//       report.fundingSource,
//       report.buildingStatus,
//       report.classroomCount,
//       report.labCount,
//       report.libraryBooks,
//       report.itConnectivity,
//       report.academicProgress,
//       report.researchProgress,
//       report.adminProgress,
//       report.qualityProgress,
//       report.majorChallenges,
//       report.nextYearPlan
//     ];

//     return [headers.join(','), data.join(',')].join('\n');
//   };

//   const downloadCSV = (csvData: string, filename: string) => {
//     const blob = new Blob([csvData], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const formatCurrency = (amount: number): string => {
//     return `NPR ${(amount / 1000000).toFixed(2)}M`;
//   };

//   const filteredReports = reports.filter(report =>
//     report.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     report.collegeId.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getCollegeAnalysis = (report: ProgressReport) => {
//     const budgetUtilization = report.approvedBudget > 0 ? (report.actualExpenditure / report.approvedBudget) * 100 : 0;
//     const studentClassroomRatio = Math.round(report.totalStudents / Math.max(report.classroomCount, 1));
//     const infrastructureScore = getInfrastructureScore(report);
//     const academicScore = getAcademicScore(report);
//     const financialScore = getFinancialScore(report);
    
//     return {
//       budgetUtilization: Math.round(budgetUtilization),
//       studentClassroomRatio,
//       infrastructureScore,
//       academicScore,
//       financialScore,
//       overallScore: Math.round((infrastructureScore + academicScore + financialScore) / 3)
//     };
//   };

//   const getInfrastructureScore = (report: ProgressReport) => {
//     let score = 0;
//     const studentClassroomRatio = report.totalStudents / Math.max(report.classroomCount, 1);
    
//     if (studentClassroomRatio <= 30) score += 40;
//     else if (studentClassroomRatio <= 50) score += 25;
//     else if (studentClassroomRatio <= 80) score += 15;
//     else score += 5;
    
//     const studentLabRatio = report.totalStudents / Math.max(report.labCount, 1);
//     if (studentLabRatio <= 100) score += 30;
//     else if (studentLabRatio <= 200) score += 20;
//     else if (studentLabRatio <= 300) score += 10;
//     else score += 5;
    
//     if (report.itConnectivity === 'Excellent') score += 20;
//     else if (report.itConnectivity === 'Good') score += 15;
//     else if (report.itConnectivity === 'Average') score += 10;
//     else score += 5;
    
//     if (report.buildingStatus === 'Complete') score += 10;
//     else if (report.buildingStatus === 'In Progress') score += 7;
//     else score += 3;
    
//     return score;
//   };

//   const getAcademicScore = (report: ProgressReport) => {
//     let score = 0;
    
//     if (report.passPercentage >= 90) score += 60;
//     else if (report.passPercentage >= 80) score += 50;
//     else if (report.passPercentage >= 70) score += 40;
//     else if (report.passPercentage >= 60) score += 30;
//     else score += 15;
    
//     const facultyTrainingRatio = report.facultyTraining / Math.max(report.totalStudents / 50, 1);
//     if (facultyTrainingRatio >= 0.8) score += 25;
//     else if (facultyTrainingRatio >= 0.6) score += 20;
//     else if (facultyTrainingRatio >= 0.4) score += 15;
//     else score += 10;
    
//     const facultyResearchRatio = report.facultyResearch / Math.max(report.totalStudents / 50, 1);
//     if (facultyResearchRatio >= 0.5) score += 15;
//     else if (facultyResearchRatio >= 0.3) score += 12;
//     else if (facultyResearchRatio >= 0.2) score += 8;
//     else score += 5;
    
//     return score;
//   };

//   const getFinancialScore = (report: ProgressReport) => {
//     let score = 0;
//     const budgetUtilization = report.approvedBudget > 0 ? (report.actualExpenditure / report.approvedBudget) * 100 : 0;
    
//     if (budgetUtilization >= 85 && budgetUtilization <= 95) score += 70;
//     else if (budgetUtilization >= 75 && budgetUtilization <= 100) score += 60;
//     else if (budgetUtilization >= 60) score += 45;
//     else if (budgetUtilization >= 40) score += 30;
//     else score += 15;
    
//     const revenueRatio = report.approvedBudget > 0 ? (report.revenueGenerated / report.approvedBudget) * 100 : 0;
//     if (revenueRatio >= 20) score += 30;
//     else if (revenueRatio >= 15) score += 25;
//     else if (revenueRatio >= 10) score += 20;
//     else if (revenueRatio >= 5) score += 15;
//     else score += 10;
    
//     return score;
//   };

//   const getExpenditureData = (report: ProgressReport) => [
//     { name: 'Salaries & Allowances', value: report.salariesAllowances },
//     { name: 'Capital Expenditure', value: report.capitalExpenditure },
//     { name: 'Operational Costs', value: report.operationalCosts },
//     { name: 'Research & Development', value: report.researchDevelopment }
//   ];

//   const getStudentData = (report: ProgressReport) => [
//     { name: 'Total Students', value: report.totalStudents },
//     { name: 'New Admissions', value: report.newAdmissions },
//     { name: 'Graduated Students', value: report.graduatedStudents }
//   ];

//   const getInfrastructureData = (report: ProgressReport) => [
//     { name: 'Classrooms', value: report.classroomCount },
//     { name: 'Labs/Workshops', value: report.labCount },
//     { name: 'Library Books', value: Math.min(report.libraryBooks / 1000, 100) } // Normalized for chart
//   ];

//   const getProgressData = (report: ProgressReport) => {
//     const progressValues = {
//       'Excellent': 100,
//       'Good': 75,
//       'Average': 50,
//       'Poor': 25,
//       '': 0
//     };
    
//     return [
//       { area: 'Academic', progress: progressValues[report.academicProgress as keyof typeof progressValues] || 0 },
//       { area: 'Research', progress: progressValues[report.researchProgress as keyof typeof progressValues] || 0 },
//       { area: 'Administrative', progress: progressValues[report.adminProgress as keyof typeof progressValues] || 0 },
//       { area: 'Quality', progress: progressValues[report.qualityProgress as keyof typeof progressValues] || 0 }
//     ];
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-lg">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (selectedCollege) {
//     const analysis = getCollegeAnalysis(selectedCollege);
//     const expenditureData = getExpenditureData(selectedCollege);
//     const studentData = getStudentData(selectedCollege);
//     const infrastructureData = getInfrastructureData(selectedCollege);
//     const progressData = getProgressData(selectedCollege);

//     return (
//       <div className="max-w-7xl mx-auto p-6" ref={chartRef}>
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <Button variant="outline" onClick={() => setSelectedCollege(null)} className="mb-2">
//               ← Back to College List
//             </Button>
//             <h1 className="text-3xl font-bold text-blue-600">{selectedCollege.collegeName}</h1>
//             <p className="text-gray-600">Detailed Analysis - {selectedCollege.academicYear}</p>
//           </div>
//           <div className="flex space-x-2">
//             <Button 
//               onClick={() => handleExportCSV(selectedCollege)}
//               className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
//             >
//               <Download className="h-4 w-4" />
//               <span>Export CSV</span>
//             </Button>
//             <Button 
//               onClick={() => handleExportPDF(selectedCollege)}
//               className="flex items-center space-x-2 bg-red-600 hover:bg-red-700"
//             >
//               <FileText className="h-4 w-4" />
//               <span>Export PDF</span>
//             </Button>
//           </div>
//         </div>

//         {/* Key Metrics Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm flex items-center">
//                 <Users className="h-4 w-4 mr-2" />
//                 Student Statistics
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-blue-600">{selectedCollege.totalStudents.toLocaleString()}</div>
//               <div className="text-sm text-gray-600">
//                 New: {selectedCollege.newAdmissions} | Graduated: {selectedCollege.graduatedStudents}
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm flex items-center">
//                 <TrendingUp className="h-4 w-4 mr-2" />
//                 Academic Performance
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-600">{selectedCollege.passPercentage}%</div>
//               <div className="text-sm text-gray-600">Pass Rate | Score: {analysis.academicScore}/100</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm flex items-center">
//                 <DollarSign className="h-4 w-4 mr-2" />
//                 Financial Overview
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-purple-600">{analysis.budgetUtilization}%</div>
//               <div className="text-sm text-gray-600">
//                 Budget Used | Score: {analysis.financialScore}/100
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm flex items-center">
//                 <Building className="h-4 w-4 mr-2" />
//                 Infrastructure
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-orange-600">{analysis.studentClassroomRatio}:1</div>
//               <div className="text-sm text-gray-600">Student:Classroom | Score: {analysis.infrastructureScore}/100</div>
//             </CardContent>
//           </Card>
//         </div>

//         <Tabs defaultValue="financial" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
//             <TabsTrigger value="academic">Academic & Students</TabsTrigger>
//             <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
//             <TabsTrigger value="progress">Progress & Planning</TabsTrigger>
//           </TabsList>

//           {/* Financial Analysis Tab */}
//           <TabsContent value="financial" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Budget Allocation & Expenditure</CardTitle>
//                   <CardDescription>Comparison of approved vs actual spending</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={[
//                       { 
//                         category: 'Budget', 
//                         Approved: selectedCollege.approvedBudget / 1000000, 
//                         Actual: selectedCollege.actualExpenditure / 1000000 
//                       }
//                     ]}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="category" />
//                       <YAxis label={{ value: 'Amount (NPR Millions)', angle: -90, position: 'insideLeft' }} />
//                       <Tooltip formatter={(value) => [`NPR ${Number(value).toFixed(2)}M`, 'Amount']} />
//                       <Legend />
//                       <Bar dataKey="Approved" fill="#0088FE" name="Approved Budget" />
//                       <Bar dataKey="Actual" fill="#00C49F" name="Actual Expenditure" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Expenditure Breakdown</CardTitle>
//                   <p>Distribution of actual expenditure across categories</p>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={expenditureData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {expenditureData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                       </Pie>
//                       <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </div>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Detailed Financial Metrics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div className="text-center p-4 border rounded-lg">
//                     <div className="text-2xl font-bold text-blue-600">{formatCurrency(selectedCollege.approvedBudget)}</div>
//                     <div className="text-sm text-gray-600">Approved Budget</div>
//                   </div>
//                   <div className="text-center p-4 border rounded-lg">
//                     <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedCollege.actualExpenditure)}</div>
//                     <div className="text-sm text-gray-600">Actual Expenditure</div>
//                   </div>
//                   <div className="text-center p-4 border rounded-lg">
//                     <div className="text-2xl font-bold text-purple-600">{formatCurrency(selectedCollege.revenueGenerated)}</div>
//                     <div className="text-sm text-gray-600">Revenue Generated</div>
//                   </div>
//                   <div className="text-center p-4 border rounded-lg">
//                     <div className="text-2xl font-bold text-orange-600">{analysis.budgetUtilization}%</div>
//                     <div className="text-sm text-gray-600">Budget Utilization</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Academic & Students Tab */}
//           <TabsContent value="academic" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Student Population Overview</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={studentData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="#8884d8" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Faculty Development</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={[
//                       { name: 'Training Sessions', value: selectedCollege.facultyTraining },
//                       { name: 'Research Projects', value: selectedCollege.facultyResearch }
//                     ]}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="#00C49F" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </div>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Academic Performance Metrics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div className="text-center p-4 border rounded-lg">
//                     <div className="text-2xl font-bold text-blue-600">{selectedCollege.passPercentage}%</div>
//                     <div className="text-sm text-gray-600">Pass Percentage</div>
//                   </div>
//                   <div className="text-center p-4 border rounded-lg">
//                     <div className="text-2xl font-bold text-green-600">{selectedCollege.facultyTraining}</div>
//                     <div className="text-sm text-gray-600">Faculty Training</div>
//                   </div>
//                   <div className="text-center p-4 border rounded-lg">
//                     <div className="text-2xl font-bold text-purple-600">{selectedCollege.facultyResearch}</div>
//                     <div className="text-sm text-gray-600">Research Projects</div>
//                   </div>
//                   <div className="text-center p-4 border rounded-lg">
//                     <div className="text-2xl font-bold text-orange-600">{analysis.academicScore}/100</div>
//                     <div className="text-sm text-gray-600">Academic Score</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Infrastructure Tab */}
//           <TabsContent value="infrastructure" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Physical Facilities</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={infrastructureData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="#FF8042" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Infrastructure Status</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex justify-between items-center p-3 border rounded-lg">
//                     <span>Building Status:</span>
//                     <Badge variant={selectedCollege.buildingStatus === 'Complete' ? "default" : "secondary"}>
//                       {selectedCollege.buildingStatus}
//                     </Badge>
//                   </div>
//                   <div className="flex justify-between items-center p-3 border rounded-lg">
//                     <span>IT Connectivity:</span>
//                     <Badge variant={
//                       selectedCollege.itConnectivity === 'Excellent' ? "default" :
//                       selectedCollege.itConnectivity === 'Good' ? "secondary" : "destructive"
//                     }>
//                       {selectedCollege.itConnectivity}
//                     </Badge>
//                   </div>
//                   <div className="flex justify-between items-center p-3 border rounded-lg">
//                     <span>Student:Classroom Ratio:</span>
//                     <Badge variant={analysis.studentClassroomRatio <= 50 ? "default" : "destructive"}>
//                       {analysis.studentClassroomRatio}:1
//                     </Badge>
//                   </div>
//                   <div className="flex justify-between items-center p-3 border rounded-lg">
//                     <span>Library Collection:</span>
//                     <span className="font-semibold">{selectedCollege.libraryBooks.toLocaleString()} books</span>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Progress & Planning Tab */}
//           <TabsContent value="progress" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Progress Across Areas</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={progressData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="area" />
//                       <YAxis domain={[0, 100]} />
//                       <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
//                       <Bar dataKey="progress" fill="#8884d8" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Planning & Challenges</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <h4 className="font-semibold mb-2">Major Challenges:</h4>
//                     <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded border">
//                       {selectedCollege.majorChallenges || 'No challenges reported'}
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold mb-2">Next Year Plan:</h4>
//                     <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded border">
//                       {selectedCollege.nextYearPlan || 'No plans reported'}
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold mb-2">Funding Source:</h4>
//                     <p className="text-sm text-gray-600 bg-green-50 p-3 rounded border">
//                       {selectedCollege.fundingSource || 'Not specified'}
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>

//         {/* Recommendations Section */}
//         <Card className="mt-6">
//           <CardHeader>
//             <CardTitle>Performance Insights & Recommendations</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {/* Academic Recommendations */}
//             {analysis.academicScore >= 80 ? (
//               <div className="flex items-start space-x-2">
//                 <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
//                 <div>
//                   <div className="font-semibold text-green-700">Strong Academic Performance</div>
//                   <div className="text-sm text-gray-600">Excellent pass rate and faculty development. Consider expanding course offerings.</div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-start space-x-2">
//                 <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
//                 <div>
//                   <div className="font-semibold text-orange-700">Academic Improvement Needed</div>
//                   <div className="text-sm text-gray-600">Focus on improving pass rates and increasing faculty training programs.</div>
//                 </div>
//               </div>
//             )}

//             {/* Financial Recommendations */}
//             {analysis.budgetUtilization >= 85 && analysis.budgetUtilization <= 95 ? (
//               <div className="flex items-start space-x-2">
//                 <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
//                 <div>
//                   <div className="font-semibold text-green-700">Optimal Budget Utilization</div>
//                   <div className="text-sm text-gray-600">Excellent financial management. Budget allocation is efficient.</div>
//                 </div>
//               </div>
//             ) : analysis.budgetUtilization < 60 ? (
//               <div className="flex items-start space-x-2">
//                 <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
//                 <div>
//                   <div className="font-semibold text-orange-700">Low Budget Utilization</div>
//                   <div className="text-sm text-gray-600">Consider reallocating unused funds to infrastructure or faculty development.</div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-start space-x-2">
//                 <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
//                 <div>
//                   <div className="font-semibold text-red-700">High Budget Utilization</div>
//                   <div className="text-sm text-gray-600">Monitor spending closely to avoid budget overruns.</div>
//                 </div>
//               </div>
//             )}

//             {/* Infrastructure Recommendations */}
//             {analysis.studentClassroomRatio > 50 ? (
//               <div className="flex items-start space-x-2">
//                 <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
//                 <div>
//                   <div className="font-semibold text-red-700">Infrastructure Expansion Needed</div>
//                   <div className="text-sm text-gray-600">High student-classroom ratio requires additional classroom construction.</div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-start space-x-2">
//                 <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
//                 <div>
//                   <div className="font-semibold text-green-700">Adequate Infrastructure</div>
//                   <div className="text-sm text-gray-600">Good student-classroom ratio maintained. Infrastructure supports current enrollment.</div>
//                 </div>
//               </div>
//             )}

//             {/* New Course Authorization Recommendation */}
//             {analysis.overallScore >= 70 && analysis.academicScore >= 75 && analysis.infrastructureScore >= 65 ? (
//               <div className="flex items-start space-x-2 bg-blue-50 p-3 rounded border">
//                 <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
//                 <div>
//                   <div className="font-semibold text-blue-700">Ready for New Course Authorization</div>
//                   <div className="text-sm text-gray-600">Strong overall performance indicates capacity for program expansion.</div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-start space-x-2 bg-orange-50 p-3 rounded border">
//                 <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
//                 <div>
//                   <div className="font-semibold text-orange-700">Not Ready for New Courses</div>
//                   <div className="text-sm text-gray-600">Address performance gaps before considering new program authorization.</div>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   // Main dashboard view (college list)
//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-blue-600 mb-2">College Progress Monitoring Dashboard</h1>
//         <p className="text-gray-600">Track individual college performance and make informed planning decisions</p>
//       </div>

//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search colleges..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-8 w-64"
//             />
//           </div>
//         </div>
//         <Button onClick={() => handleExportCSV()} className="flex items-center space-x-2">
//           <Download className="h-4 w-4" />
//           <span>Export All CSV</span>
//         </Button>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>College Performance Overview</CardTitle>
//           <CardDescription>
//             Click on any college to view detailed analysis and export reports ({filteredReports.length} colleges)
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>College</TableHead>
//                 <TableHead>Academic Year</TableHead>
//                 <TableHead>Students</TableHead>
//                 <TableHead>Academic Score</TableHead>
//                 <TableHead>Financial Score</TableHead>
//                 <TableHead>Infrastructure Score</TableHead>
//                 <TableHead>Overall Score</TableHead>
//                 <TableHead>Budget Utilization</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredReports.map((report) => {
//                 const analysis = getCollegeAnalysis(report);
//                 return (
//                   <TableRow key={report.id} className="hover:bg-gray-50">
//                     <TableCell>
//                       <div>
//                         <div className="font-medium">{report.collegeName}</div>
//                         <div className="text-sm text-muted-foreground">{report.collegeId}</div>
//                       </div>
//                     </TableCell>
//                     <TableCell>{report.academicYear}</TableCell>
//                     <TableCell>{report.totalStudents.toLocaleString()}</TableCell>
//                     <TableCell>
//                       <Badge variant={analysis.academicScore >= 80 ? "default" : analysis.academicScore >= 60 ? "secondary" : "destructive"}>
//                         {analysis.academicScore}/100
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={analysis.financialScore >= 80 ? "default" : analysis.financialScore >= 60 ? "secondary" : "destructive"}>
//                         {analysis.financialScore}/100
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={analysis.infrastructureScore >= 80 ? "default" : analysis.infrastructureScore >= 60 ? "secondary" : "destructive"}>
//                         {analysis.infrastructureScore}/100
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center space-x-2">
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className={`h-2 rounded-full ${
//                               analysis.overallScore >= 80 ? 'bg-green-600' : 
//                               analysis.overallScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'
//                             }`}
//                             style={{ width: `${analysis.overallScore}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-sm font-semibold">{analysis.overallScore}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={
//                         analysis.budgetUtilization >= 85 && analysis.budgetUtilization <= 95 ? "default" :
//                         analysis.budgetUtilization >= 60 ? "secondary" : "destructive"
//                       }>
//                         {analysis.budgetUtilization}%
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => setSelectedCollege(report)}
//                         className="flex items-center space-x-1"
//                       >
//                         <Eye className="h-4 w-4" />
//                         <span>View Details</span>
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Area } from 'recharts';
import { Download, Search, Eye, TrendingUp, Users, DollarSign, Building, BookOpen, AlertTriangle, CheckCircle, FileText, GraduationCap, FlaskConical, Wifi, Library, School, TrendingDown, PieChart as PieChartIcon, Activity, Target, Award } from 'lucide-react';
import { toast } from 'sonner';
import { ProgressReport, AnalyticsData } from '@/types';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const API_BASE_URL = 'http://localhost:4000/api/progress';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  tertiary: '#f59e0b',
  quaternary: '#ef4444',
  gradient1: '#6366f1',
  gradient2: '#8b5cf6'
};

export default function AdminDashboardForProgress() {
  const [reports, setReports] = useState<ProgressReport[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<ProgressReport | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

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
      
      pdf.setFontSize(20);
      pdf.text(`${report.collegeName} - Progress Report`, 20, 20);
      pdf.setFontSize(12);
      pdf.text(`Academic Year: ${report.academicYear} | Submission Date: ${report.submissionDate}`, 20, 30);

      pdf.setFontSize(16);
      pdf.text(`Overall Performance Score: ${analysis.overallScore}/100`, 20, 45);
      
      pdf.autoTable({
        startY: 55,
        head: [['Metric', 'Value', 'Score']],
        body: [
          ['Academic Performance', `${report.passPercentage}% Pass Rate`, `${analysis.academicScore}/100`],
          ['Financial Management', `${analysis.budgetUtilization}% Budget Used`, `${analysis.financialScore}/100`],
          ['Infrastructure', `${analysis.studentClassroomRatio}:1 Ratio`, `${analysis.infrastructureScore}/100`],
          ['Total Students', report.totalStudents.toLocaleString(), '-'],
          ['New Admissions', report.newAdmissions.toLocaleString(), '-'],
          ['Graduated Students', report.graduatedStudents.toLocaleString(), '-']
        ]
      });

      const finalY = (pdf as any).lastAutoTable.finalY + 15;
      pdf.setFontSize(14);
      pdf.text('Financial Details', 20, finalY);
      
      pdf.autoTable({
        startY: finalY + 5,
        head: [['Financial Item', 'Amount (NPR)']],
        body: [
          ['Approved Budget', formatCurrency(report.approvedBudget)],
          ['Actual Expenditure', formatCurrency(report.actualExpenditure)],
          ['Revenue Generated', formatCurrency(report.revenueGenerated)],
          ['Salaries & Allowances', formatCurrency(report.salariesAllowances)],
          ['Capital Expenditure', formatCurrency(report.capitalExpenditure)],
          ['Operational Costs', formatCurrency(report.operationalCosts)],
          ['Research & Development', formatCurrency(report.researchDevelopment)]
        ]
      });

      pdf.save(`${report.collegeName}_${report.academicYear}_report.pdf`);
      toast.success('PDF report exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
    }
  };

  const convertCollegeToCSV = (report: ProgressReport): string => {
    const headers = [
      'College Name', 'Academic Year', 'Total Students', 'New Admissions', 'Graduated Students',
      'Pass Percentage', 'Faculty Training', 'Faculty Research', 'Approved Budget', 'Actual Expenditure',
      'Revenue Generated', 'Salaries Allowances', 'Capital Expenditure', 'Operational Costs',
      'Research Development', 'Funding Source', 'Building Status', 'Classroom Count', 'Lab Count',
      'Library Books', 'IT Connectivity', 'Academic Progress', 'Research Progress', 'Admin Progress',
      'Quality Progress', 'Major Challenges', 'Next Year Plan'
    ];

    const data = [
      report.collegeName, report.academicYear, report.totalStudents, report.newAdmissions,
      report.graduatedStudents, report.passPercentage, report.facultyTraining, report.facultyResearch,
      report.approvedBudget, report.actualExpenditure, report.revenueGenerated, report.salariesAllowances,
      report.capitalExpenditure, report.operationalCosts, report.researchDevelopment, report.fundingSource,
      report.buildingStatus, report.classroomCount, report.labCount, report.libraryBooks,
      report.itConnectivity, report.academicProgress, report.researchProgress, report.adminProgress,
      report.qualityProgress, report.majorChallenges, report.nextYearPlan
    ];

    return [headers.join(','), data.join(',')].join('\n');
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
    return `NPR ${(amount / 1000000).toFixed(2)}M`;
  };

  const filteredReports = reports.filter(report =>
    report.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.collegeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCollegeAnalysis = (report: ProgressReport) => {
    const budgetUtilization = report.approvedBudget > 0 ? (report.actualExpenditure / report.approvedBudget) * 100 : 0;
    const studentClassroomRatio = Math.round(report.totalStudents / Math.max(report.classroomCount, 1));
    const studentLabRatio = Math.round(report.totalStudents / Math.max(report.labCount, 1));
    const infrastructureScore = getInfrastructureScore(report);
    const academicScore = getAcademicScore(report);
    const financialScore = getFinancialScore(report);
    const graduationRate = report.totalStudents > 0 ? (report.graduatedStudents / report.totalStudents) * 100 : 0;
    const admissionGrowth = report.totalStudents > 0 ? (report.newAdmissions / report.totalStudents) * 100 : 0;
    
    return {
      budgetUtilization: Math.round(budgetUtilization),
      studentClassroomRatio,
      studentLabRatio,
      infrastructureScore,
      academicScore,
      financialScore,
      overallScore: Math.round((infrastructureScore + academicScore + financialScore) / 3),
      graduationRate: Math.round(graduationRate),
      admissionGrowth: Math.round(admissionGrowth),
      revenueToExpenseRatio: report.actualExpenditure > 0 ? Math.round((report.revenueGenerated / report.actualExpenditure) * 100) : 0
    };
  };

  const getInfrastructureScore = (report: ProgressReport) => {
    let score = 0;
    const studentClassroomRatio = report.totalStudents / Math.max(report.classroomCount, 1);
    
    if (studentClassroomRatio <= 30) score += 40;
    else if (studentClassroomRatio <= 50) score += 25;
    else if (studentClassroomRatio <= 80) score += 15;
    else score += 5;
    
    const studentLabRatio = report.totalStudents / Math.max(report.labCount, 1);
    if (studentLabRatio <= 100) score += 30;
    else if (studentLabRatio <= 200) score += 20;
    else if (studentLabRatio <= 300) score += 10;
    else score += 5;
    
    if (report.itConnectivity === 'Excellent') score += 20;
    else if (report.itConnectivity === 'Good') score += 15;
    else if (report.itConnectivity === 'Average') score += 10;
    else score += 5;
    
    if (report.buildingStatus === 'Complete') score += 10;
    else if (report.buildingStatus === 'In Progress') score += 7;
    else score += 3;
    
    return score;
  };

  const getAcademicScore = (report: ProgressReport) => {
    let score = 0;
    
    if (report.passPercentage >= 90) score += 60;
    else if (report.passPercentage >= 80) score += 50;
    else if (report.passPercentage >= 70) score += 40;
    else if (report.passPercentage >= 60) score += 30;
    else score += 15;
    
    const facultyTrainingRatio = report.facultyTraining / Math.max(report.totalStudents / 50, 1);
    if (facultyTrainingRatio >= 0.8) score += 25;
    else if (facultyTrainingRatio >= 0.6) score += 20;
    else if (facultyTrainingRatio >= 0.4) score += 15;
    else score += 10;
    
    const facultyResearchRatio = report.facultyResearch / Math.max(report.totalStudents / 50, 1);
    if (facultyResearchRatio >= 0.5) score += 15;
    else if (facultyResearchRatio >= 0.3) score += 12;
    else if (facultyResearchRatio >= 0.2) score += 8;
    else score += 5;
    
    return score;
  };

  const getFinancialScore = (report: ProgressReport) => {
    let score = 0;
    const budgetUtilization = report.approvedBudget > 0 ? (report.actualExpenditure / report.approvedBudget) * 100 : 0;
    
    if (budgetUtilization >= 85 && budgetUtilization <= 95) score += 70;
    else if (budgetUtilization >= 75 && budgetUtilization <= 100) score += 60;
    else if (budgetUtilization >= 60) score += 45;
    else if (budgetUtilization >= 40) score += 30;
    else score += 15;
    
    const revenueRatio = report.approvedBudget > 0 ? (report.revenueGenerated / report.approvedBudget) * 100 : 0;
    if (revenueRatio >= 20) score += 30;
    else if (revenueRatio >= 15) score += 25;
    else if (revenueRatio >= 10) score += 20;
    else if (revenueRatio >= 5) score += 15;
    else score += 10;
    
    return score;
  };

  const getExpenditureData = (report: ProgressReport) => [
    { name: 'Salaries', value: report.salariesAllowances, percentage: (report.salariesAllowances / report.actualExpenditure * 100).toFixed(1) },
    { name: 'Capital', value: report.capitalExpenditure, percentage: (report.capitalExpenditure / report.actualExpenditure * 100).toFixed(1) },
    { name: 'Operations', value: report.operationalCosts, percentage: (report.operationalCosts / report.actualExpenditure * 100).toFixed(1) },
    { name: 'R&D', value: report.researchDevelopment, percentage: (report.researchDevelopment / report.actualExpenditure * 100).toFixed(1) }
  ];

  const getStudentFlowData = (report: ProgressReport) => [
    { category: 'Total', count: report.totalStudents, label: 'Enrolled' },
    { category: 'New', count: report.newAdmissions, label: 'Admissions' },
    { category: 'Graduated', count: report.graduatedStudents, label: 'Graduated' }
  ];

  const getFinancialComparisonData = (report: ProgressReport) => [
    { category: 'Budget', approved: report.approvedBudget / 1000000, actual: report.actualExpenditure / 1000000, revenue: report.revenueGenerated / 1000000 }
  ];

  const getRadarData = (report: ProgressReport) => {
    const analysis = getCollegeAnalysis(report);
    return [
      { subject: 'Academic', value: analysis.academicScore, fullMark: 100 },
      { subject: 'Financial', value: analysis.financialScore, fullMark: 100 },
      { subject: 'Infrastructure', value: analysis.infrastructureScore, fullMark: 100 },
      { subject: 'Pass Rate', value: report.passPercentage, fullMark: 100 },
      { subject: 'Research', value: Math.min(report.facultyResearch * 2, 100), fullMark: 100 }
    ];
  };

  const getResourceEfficiencyData = (report: ProgressReport) => [
    { metric: 'Students per Classroom', value: Math.round(report.totalStudents / report.classroomCount), benchmark: 40 },
    { metric: 'Students per Lab', value: Math.round(report.totalStudents / report.labCount), benchmark: 150 },
    { metric: 'Books per Student', value: Math.round(report.libraryBooks / report.totalStudents), benchmark: 50 }
  ];

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
    const expenditureData = getExpenditureData(selectedCollege);
    const studentFlowData = getStudentFlowData(selectedCollege);
    const financialComparisonData = getFinancialComparisonData(selectedCollege);
    const radarData = getRadarData(selectedCollege);
    const resourceEfficiencyData = getResourceEfficiencyData(selectedCollege);

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

          {/* Overall Performance Score */}
          <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Overall Performance Score</h2>
                  <p className="text-blue-100">Comprehensive institutional assessment</p>
                </div>
                <div className="text-center">
                  <div className="text-7xl font-bold">{analysis.overallScore}</div>
                  <div className="text-xl text-blue-100">out of 100</div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  New: {selectedCollege.newAdmissions} | Graduated: {selectedCollege.graduatedStudents}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge variant="secondary">Score: {analysis.academicScore}/100</Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900">{selectedCollege.passPercentage}%</div>
                <div className="text-sm text-gray-600 mt-1">Pass Rate</div>
                <div className="text-xs text-gray-500 mt-2">
                  Training: {selectedCollege.facultyTraining} | Research: {selectedCollege.facultyResearch}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                  <Badge variant="secondary">Score: {analysis.financialScore}/100</Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900">{analysis.budgetUtilization}%</div>
                <div className="text-sm text-gray-600 mt-1">Budget Utilization</div>
                <div className="text-xs text-gray-500 mt-2">
                  Revenue Ratio: {analysis.revenueToExpenseRatio}%
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Building className="h-6 w-6 text-orange-600" />
                  </div>
                  <Badge variant="secondary">Score: {analysis.infrastructureScore}/100</Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900">{analysis.studentClassroomRatio}:1</div>
                <div className="text-sm text-gray-600 mt-1">Student:Classroom Ratio</div>
                <div className="text-xs text-gray-500 mt-2">
                  Lab Ratio: {analysis.studentLabRatio}:1
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-white shadow-lg">
              <TabsTrigger value="overview" className="py-3 text-sm font-semibold">
                <Activity className="h-4 w-4 mr-2" />
                Overview
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
              <TabsTrigger value="insights" className="py-3 text-sm font-semibold">
                <Target className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Award className="h-5 w-5 mr-2 text-blue-600" />
                      Performance Radar
                    </CardTitle>
                    <CardDescription>Multi-dimensional performance assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <Radar name="Performance" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Users className="h-5 w-5 mr-2 text-green-600" />
                      Student Flow Analysis
                    </CardTitle>
                    <CardDescription>Enrollment, admissions, and graduation trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={studentFlowData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                          formatter={(value) => [Number(value).toLocaleString(), 'Count']}
                        />
                        <Legend />
                        <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Target className="h-5 w-5 mr-2 text-purple-600" />
                    Resource Efficiency Metrics
                  </CardTitle>
                  <CardDescription>Comparison against institutional benchmarks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg border-t-4 border-t-blue-500">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{analysis.graduationRate}%</div>
                    <div className="text-sm text-gray-600 mt-2">Graduation Rate</div>
                    <div className="text-xs text-gray-500 mt-1">{selectedCollege.graduatedStudents} graduated</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-t-4 border-t-green-500">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <FlaskConical className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{selectedCollege.facultyResearch}</div>
                    <div className="text-sm text-gray-600 mt-2">Research Projects</div>
                    <div className="text-xs text-gray-500 mt-1">Faculty-led initiatives</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-t-4 border-t-purple-500">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Library className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{selectedCollege.libraryBooks.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 mt-2">Library Books</div>
                    <div className="text-xs text-gray-500 mt-1">{Math.round(selectedCollege.libraryBooks / selectedCollege.totalStudents)} per student</div>
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
                      <BarChart data={financialComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} label={{ value: 'NPR (Millions)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: 12 } }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                          formatter={(value) => [`NPR ${Number(value).toFixed(2)}M`, '']}
                        />
                        <Legend />
                        <Bar dataKey="approved" fill="#3b82f6" name="Approved Budget" radius={[8, 8, 0, 0]} />
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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-blue-700 font-semibold mb-2">Approved Budget</div>
                    <div className="text-2xl font-bold text-blue-900">{formatCurrency(selectedCollege.approvedBudget)}</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-green-700 font-semibold mb-2">Actual Expenditure</div>
                    <div className="text-2xl font-bold text-green-900">{formatCurrency(selectedCollege.actualExpenditure)}</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-purple-700 font-semibold mb-2">Revenue Generated</div>
                    <div className="text-2xl font-bold text-purple-900">{formatCurrency(selectedCollege.revenueGenerated)}</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-orange-700 font-semibold mb-2">Utilization Rate</div>
                    <div className="text-2xl font-bold text-orange-900">{analysis.budgetUtilization}%</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Activity className="h-5 w-5 mr-2 text-indigo-600" />
                    Detailed Expenditure Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={expenditureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        formatter={(value) => [formatCurrency(Number(value)), 'Amount']}
                      />
                      <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]}>
                        {expenditureData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Salaries & Allowances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{formatCurrency(selectedCollege.salariesAllowances)}</div>
                    <div className="text-sm text-gray-600 mt-2">
                      {((selectedCollege.salariesAllowances / selectedCollege.actualExpenditure) * 100).toFixed(1)}% of total expenditure
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${(selectedCollege.salariesAllowances / selectedCollege.actualExpenditure) * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Capital Expenditure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{formatCurrency(selectedCollege.capitalExpenditure)}</div>
                    <div className="text-sm text-gray-600 mt-2">
                      {((selectedCollege.capitalExpenditure / selectedCollege.actualExpenditure) * 100).toFixed(1)}% of total expenditure
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-600 h-3 rounded-full transition-all"
                        style={{ width: `${(selectedCollege.capitalExpenditure / selectedCollege.actualExpenditure) * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Operational Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">{formatCurrency(selectedCollege.operationalCosts)}</div>
                    <div className="text-sm text-gray-600 mt-2">
                      {((selectedCollege.operationalCosts / selectedCollege.actualExpenditure) * 100).toFixed(1)}% of total expenditure
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-orange-600 h-3 rounded-full transition-all"
                        style={{ width: `${(selectedCollege.operationalCosts / selectedCollege.actualExpenditure) * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Research & Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">{formatCurrency(selectedCollege.researchDevelopment)}</div>
                    <div className="text-sm text-gray-600 mt-2">
                      {((selectedCollege.researchDevelopment / selectedCollege.actualExpenditure) * 100).toFixed(1)}% of total expenditure
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-purple-600 h-3 rounded-full transition-all"
                        style={{ width: `${(selectedCollege.researchDevelopment / selectedCollege.actualExpenditure) * 100}%` }}
                      ></div>
                    </div>
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
                      Faculty Development Metrics
                    </CardTitle>
                    <CardDescription>Training sessions and research projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={[
                        { category: 'Training', count: selectedCollege.facultyTraining },
                        { category: 'Research', count: selectedCollege.facultyResearch }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        />
                        <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} />
                      </ComposedChart>
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
                    <div className="text-3xl font-bold text-green-900">{selectedCollege.passPercentage}%</div>
                    <div className="text-sm text-green-700 font-semibold mt-1">Pass Percentage</div>
                    <div className="text-xs text-green-600 mt-2">Academic Score: {analysis.academicScore}/100</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-cyan-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-blue-600 rounded-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-900">{selectedCollege.facultyTraining}</div>
                    <div className="text-sm text-blue-700 font-semibold mt-1">Training Sessions</div>
                    <div className="text-xs text-blue-600 mt-2">Faculty development programs</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-pink-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-purple-600 rounded-lg">
                        <FlaskConical className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-purple-900">{selectedCollege.facultyResearch}</div>
                    <div className="text-sm text-purple-700 font-semibold mt-1">Research Projects</div>
                    <div className="text-xs text-purple-600 mt-2">Active research initiatives</div>
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
                    <div className="text-xs text-orange-600 mt-2">{selectedCollege.graduatedStudents} students</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Activity className="h-5 w-5 mr-2 text-indigo-600" />
                    Student Performance Trends
                  </CardTitle>
                  <CardDescription>Year-over-year growth analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-4xl font-bold text-blue-600">{selectedCollege.newAdmissions}</div>
                      <div className="text-sm text-gray-600 mt-2 font-semibold">New Admissions</div>
                      <div className="text-xs text-gray-500 mt-1">{analysis.admissionGrowth}% of total enrollment</div>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-4xl font-bold text-green-600">{selectedCollege.totalStudents}</div>
                      <div className="text-sm text-gray-600 mt-2 font-semibold">Total Enrolled</div>
                      <div className="text-xs text-gray-500 mt-1">Current academic year</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <div className="text-4xl font-bold text-purple-600">{selectedCollege.graduatedStudents}</div>
                      <div className="text-sm text-gray-600 mt-2 font-semibold">Graduated</div>
                      <div className="text-xs text-gray-500 mt-1">{analysis.graduationRate}% graduation rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                        { name: 'Classrooms', count: selectedCollege.classroomCount },
                        { name: 'Labs', count: selectedCollege.labCount },
                        { name: 'Library (K)', count: Math.round(selectedCollege.libraryBooks / 1000) }
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
                      Infrastructure Quality Score
                    </CardTitle>
                    <CardDescription>Comprehensive facility assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-[350px]">
                      <div className="text-center">
                        <div className="relative inline-flex">
                          <svg className="w-48 h-48">
                            <circle
                              className="text-gray-200"
                              strokeWidth="12"
                              stroke="currentColor"
                              fill="transparent"
                              r="88"
                              cx="96"
                              cy="96"
                            />
                            <circle
                              className="text-blue-600 transition-all duration-1000"
                              strokeWidth="12"
                              strokeDasharray={2 * Math.PI * 88}
                              strokeDashoffset={2 * Math.PI * 88 * (1 - analysis.infrastructureScore / 100)}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="88"
                              cx="96"
                              cy="96"
                              transform="rotate(-90 96 96)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold text-gray-900">{analysis.infrastructureScore}</span>
                            <span className="text-sm text-gray-600">out of 100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-lg border-t-4 border-t-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <School className="h-8 w-8 text-orange-600" />
                      <Badge variant={selectedCollege.buildingStatus === 'Complete' ? 'default' : 'secondary'}>
                        {selectedCollege.buildingStatus}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{selectedCollege.classroomCount}</div>
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
                    <div className="text-2xl font-bold text-gray-900">{selectedCollege.labCount}</div>
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
                    <div className="text-2xl font-bold text-gray-900">{(selectedCollege.libraryBooks / 1000).toFixed(1)}K</div>
                    <div className="text-sm text-gray-600 mt-1">Books Available</div>
                    <div className="text-xs text-gray-500 mt-2">{Math.round(selectedCollege.libraryBooks / selectedCollege.totalStudents)} per student</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-t-4 border-t-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Wifi className="h-8 w-8 text-green-600" />
                      <Badge variant={
                        selectedCollege.itConnectivity === 'Excellent' ? 'default' :
                        selectedCollege.itConnectivity === 'Good' ? 'secondary' : 'destructive'
                      }>
                        {selectedCollege.itConnectivity}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">IT</div>
                    <div className="text-sm text-gray-600 mt-1">Connectivity</div>
                    <div className="text-xs text-gray-500 mt-2">Network infrastructure</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Activity className="h-5 w-5 mr-2 text-indigo-600" />
                    Facility Utilization Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Student:Classroom Ratio</span>
                        <span className="text-sm font-bold text-gray-900">{analysis.studentClassroomRatio}:1</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full transition-all ${
                            analysis.studentClassroomRatio <= 30 ? 'bg-green-600' :
                            analysis.studentClassroomRatio <= 50 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${Math.min((analysis.studentClassroomRatio / 80) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {analysis.studentClassroomRatio <= 30 ? 'Excellent capacity' :
                         analysis.studentClassroomRatio <= 50 ? 'Good capacity' : 'Needs expansion'}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Student:Lab Ratio</span>
                        <span className="text-sm font-bold text-gray-900">{analysis.studentLabRatio}:1</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full transition-all ${
                            analysis.studentLabRatio <= 100 ? 'bg-green-600' :
                            analysis.studentLabRatio <= 200 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${Math.min((analysis.studentLabRatio / 300) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {analysis.studentLabRatio <= 100 ? 'Excellent lab facilities' :
                         analysis.studentLabRatio <= 200 ? 'Adequate lab capacity' : 'More labs needed'}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Books per Student</span>
                        <span className="text-sm font-bold text-gray-900">{Math.round(selectedCollege.libraryBooks / selectedCollege.totalStudents)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full transition-all ${
                            (selectedCollege.libraryBooks / selectedCollege.totalStudents) >= 50 ? 'bg-green-600' :
                            (selectedCollege.libraryBooks / selectedCollege.totalStudents) >= 30 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${Math.min(((selectedCollege.libraryBooks / selectedCollege.totalStudents) / 100) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {(selectedCollege.libraryBooks / selectedCollege.totalStudents) >= 50 ? 'Excellent library resources' :
                         (selectedCollege.libraryBooks / selectedCollege.totalStudents) >= 30 ? 'Good collection' : 'Expand collection'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
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
                        <span className="text-sm font-bold text-blue-600">{selectedCollege.academicProgress || 'Not reported'}</span>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700">{selectedCollege.academicProgress || 'No progress details available'}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Research Progress</span>
                        <span className="text-sm font-bold text-purple-600">{selectedCollege.researchProgress || 'Not reported'}</span>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-sm text-gray-700">{selectedCollege.researchProgress || 'No research progress details'}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Administrative Progress</span>
                        <span className="text-sm font-bold text-green-600">{selectedCollege.adminProgress || 'Not reported'}</span>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700">{selectedCollege.adminProgress || 'No administrative progress details'}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Quality Progress</span>
                        <span className="text-sm font-bold text-orange-600">{selectedCollege.qualityProgress || 'Not reported'}</span>
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

                    <div>
                      <div className="flex items-center mb-3">
                        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-semibold text-gray-700">Funding Source</span>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <p className="text-sm text-gray-700">{selectedCollege.fundingSource || 'Not specified'}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center mb-3">
                        <Users className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="text-sm font-semibold text-gray-700">Leadership</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-xs text-gray-600 mb-1">Head</div>
                          <div className="text-sm font-semibold text-gray-900">{selectedCollege.headName || 'N/A'}</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-xs text-gray-600 mb-1">Principal</div>
                          <div className="text-sm font-semibold text-gray-900">{selectedCollege.principalName || 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Award className="h-5 w-5 mr-2 text-indigo-600" />
                    Performance Summary & Key Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="p-4 bg-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-blue-900">{analysis.academicScore}</div>
                      <div className="text-sm text-blue-700 font-semibold mt-2">Academic Excellence</div>
                      <div className="text-xs text-blue-600 mt-1">Performance rating out of 100</div>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <div className="p-4 bg-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <DollarSign className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-purple-900">{analysis.financialScore}</div>
                      <div className="text-sm text-purple-700 font-semibold mt-2">Financial Health</div>
                      <div className="text-xs text-purple-600 mt-1">Budget management rating</div>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                      <div className="p-4 bg-orange-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Building className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-orange-900">{analysis.infrastructureScore}</div>
                      <div className="text-sm text-orange-700 font-semibold mt-2">Infrastructure Quality</div>
                      <div className="text-xs text-orange-600 mt-1">Facility assessment rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysis.academicScore >= 70 && (
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-green-900 text-sm">Strong Academic Performance</div>
                          <div className="text-xs text-green-700 mt-1">Pass rate of {selectedCollege.passPercentage}% demonstrates quality education</div>
                        </div>
                      </div>
                    )}
                    {analysis.financialScore >= 70 && (
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-blue-900 text-sm">Effective Financial Management</div>
                          <div className="text-xs text-blue-700 mt-1">Budget utilization at {analysis.budgetUtilization}% shows efficient resource use</div>
                        </div>
                      </div>
                    )}
                    {analysis.infrastructureScore >= 70 && (
                      <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-purple-900 text-sm">Quality Infrastructure</div>
                          <div className="text-xs text-purple-700 mt-1">Well-maintained facilities with good student-classroom ratio</div>
                        </div>
                      </div>
                    )}
                    {selectedCollege.facultyResearch > 10 && (
                      <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-indigo-900 text-sm">Active Research Culture</div>
                          <div className="text-xs text-indigo-700 mt-1">{selectedCollege.facultyResearch} research projects demonstrate innovation focus</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysis.academicScore < 70 && (
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-yellow-900 text-sm">Academic Enhancement Needed</div>
                          <div className="text-xs text-yellow-700 mt-1">Focus on improving pass rates and faculty development programs</div>
                        </div>
                      </div>
                    )}
                    {analysis.budgetUtilization < 60 && (
                      <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-orange-900 text-sm">Low Budget Utilization</div>
                          <div className="text-xs text-orange-700 mt-1">Consider reallocating unused funds to high-priority areas</div>
                        </div>
                      </div>
                    )}
                    {analysis.budgetUtilization > 95 && (
                      <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-red-900 text-sm">Budget Overutilization Risk</div>
                          <div className="text-xs text-red-700 mt-1">Monitor spending to prevent budget overruns</div>
                        </div>
                      </div>
                    )}
                    {analysis.studentClassroomRatio > 50 && (
                      <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-red-900 text-sm">Infrastructure Expansion Required</div>
                          <div className="text-xs text-red-700 mt-1">High student-classroom ratio needs additional facilities</div>
                        </div>
                      </div>
                    )}
                    {selectedCollege.facultyTraining < 5 && (
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-yellow-900 text-sm">Faculty Development Gap</div>
                          <div className="text-xs text-yellow-700 mt-1">Increase training opportunities for teaching staff</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
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
                    <TableHead className="font-bold">Students</TableHead>
                    <TableHead className="font-bold">Academic</TableHead>
                    <TableHead className="font-bold">Financial</TableHead>
                    <TableHead className="font-bold">Infrastructure</TableHead>
                    <TableHead className="font-bold">Overall Score</TableHead>
                    <TableHead className="font-bold">Budget Use</TableHead>
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
                          <Badge variant={analysis.academicScore >= 80 ? "default" : analysis.academicScore >= 60 ? "secondary" : "destructive"}>
                            {analysis.academicScore}/100
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={analysis.financialScore >= 80 ? "default" : analysis.financialScore >= 60 ? "secondary" : "destructive"}>
                            {analysis.financialScore}/100
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={analysis.infrastructureScore >= 80 ? "default" : analysis.infrastructureScore >= 60 ? "secondary" : "destructive"}>
                            {analysis.infrastructureScore}/100
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3 min-w-[80px]">
                              <div
                                className={`h-3 rounded-full transition-all ${
                                  analysis.overallScore >= 80 ? 'bg-green-600' : 
                                  analysis.overallScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                                }`}
                                style={{ width: `${analysis.overallScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-gray-900 min-w-[30px]">{analysis.overallScore}</span>
                          </div>
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedCollege(report)}
                            className="shadow-sm hover:shadow-md transition-all hover:bg-blue-600 hover:text-white"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
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