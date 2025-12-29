
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid,
//   PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart
// } from 'recharts';
// import { 
//   Eye, Search, Download, Filter, TrendingUp, Users, BookOpen, 
//   Award, DollarSign, Building, Calendar, Target, FileText,
//   BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
//   BarChartIcon, GraduationCap, Cpu, Network, UserCheck, Mail, Phone,
//   School, BookText, Users2, Building2, TargetIcon, Lightbulb,
//   Shield, HeartHandshake,
// } from 'lucide-react';
// import { toast } from 'sonner';
// import axios from 'axios';

// interface AcademicProgram {
//   level: string;
//   programName: string;
//   programType: string;
//   specializationAreas: string[];
// }

// interface StudentEnrollment {
//   program: string;
//   level: string;
//   constituentExamAppearedM: number;
//   constituentExamAppearedF: number;
//   constituentExamAppearedT: number;
//   constituentExamPassedM: number;
//   constituentExamPassedF: number;
//   constituentExamPassedT: number;
//   affiliatedExamAppearedM: number;
//   affiliatedExamAppearedF: number;
//   affiliatedExamAppearedT: number;
//   affiliatedExamPassedM: number;
//   affiliatedExamPassedF: number;
//   affiliatedExamPassedT: number;
// }

// interface Graduate {
//   program: string;
//   semester: string;
//   constituentExamAppearedM: number;
//   constituentExamAppearedF: number;
//   constituentExamAppearedT: number;
//   constituentExamPassedM: number;
//   constituentExamPassedF: number;
//   constituentExamPassedT: number;
//   affiliatedExamAppearedM: number;
//   affiliatedExamAppearedF: number;
//   affiliatedExamAppearedT: number;
//   affiliatedExamPassedM: number;
//   affiliatedExamPassedF: number;
//   affiliatedExamPassedT: number;
// }

// interface Collaboration {
//   institutionName: string;
//   objective: string;
// }

// interface FacultyData {
//   _id: string;
//   instituteName: string;
//   reportingPeriod: string;
//   headName: string;
//   phone: string;
//   email: string;
//   submissionDate: string;
//   academicPrograms: AcademicProgram[];
//   newPrograms: string[];
//   studentEnrollment: StudentEnrollment[];
//   graduates: Graduate[];
//   curriculumUpdates: string;
//   teachingInnovations: string;
//   digitalTools: string;
//   studentFeedback: string;
//   academicChallenges: string;
//   researchProjectsInitiated: number;
//   researchProjectsCompleted: number;
//   researchFunding: string;
//   publications: string;
//   patents: string;
//   conferences: string;
//   facultyParticipation: string;
//   studentResearch: string;
//   collaborations: Collaboration[];
//   academicStaff: string;
//   adminStaff: string;
//   newRecruitments: string;
//   trainings: string;
//   promotions: string;
//   retirements: string;
//   developmentNeeds: string;
//   infrastructureAdditions: string;
//   newFacilities: string;
//   constructionStatus: string;
//   equipmentProcured: string;
//   infrastructureChallenges: string;
//   accessibilityMeasures: string;
//   budgetAllocated: string;
//   actualExpenditure: string;
//   revenueGenerated: string;
//   financialChallenges: string;
//   auditStatus: string;
//   meetingsHeld: string;
//   keyDecisions: string;
//   policyUpdates: string;
//   grievanceHandling: string;
//   transparencyInitiatives: string;
//   scholarships: string;
//   careerCounseling: string;
//   extracurricular: string;
//   alumniEngagement: string;
//   studentAchievements: string;
//   outreachPrograms: string;
//   communityCollaborations: string;
//   socialResponsibility: string;
//   continuingEducation: string;
//   awards: string;
//   successStories: string;
//   reputationContributions: string;
//   keyChallenges: string;
//   strategies: string;
//   lessonsLearned: string;
//   majorGoals: string;
//   proposedProjects: string;
//   supportNeeded: string;
//   policyReforms: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const COLORS = ['#4f46e5', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// const AdminForFaculty: React.FC = () => {
//   const [facultyData, setFacultyData] = useState<FacultyData[]>([]);
//   const [filteredData, setFilteredData] = useState<FacultyData[]>([]);
//   const [selectedFaculty, setSelectedFaculty] = useState<FacultyData | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('faculties');

//   useEffect(() => {
//     fetchFacultyData();
//   }, []);

//   useEffect(() => {
//     const filtered = facultyData.filter(faculty =>
//       faculty.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.reportingPeriod.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }, [searchTerm, facultyData]);

//   const fetchFacultyData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('https://digitaldashboard.tu.edu.np/api/faculty-forms', {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data.success) {
//         setFacultyData(response.data.data || []);
//         setFilteredData(response.data.data || []);
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       toast.error('Error fetching faculty data');
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
//       <div className="mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                 <BarChart3 className="w-8 h-8 text-indigo-600" />
//                 Institute/Faculty Analytics Dashboard
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 {facultyData.length} faculty reports analyzed • Real-time performance metrics
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search faculties..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-64"
//                 />
//               </div>
//               <Button 
//                 variant="outline" 
//                 className="flex items-center gap-2"
//                 onClick={fetchFacultyData}
//               >
//                 <Download className="w-4 h-4" />
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
//             {/* <TabsTrigger value="overview">Overview</TabsTrigger> */}
//             <TabsTrigger value="faculties">Faculties</TabsTrigger>
//             <TabsTrigger value="academics">Academics</TabsTrigger>
//             <TabsTrigger value="research">Research</TabsTrigger>
//             <TabsTrigger value="performance">Performance</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           {/* Overview Tab */}
//           {/* <TabsContent value="overview" className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {facultyData.slice(0, 6).map((faculty) => {
//                 const analytics = getFacultyAnalytics(faculty);
//                 return (
//                   <Card 
//                     key={faculty._id} 
//                     className="hover:shadow-lg transition-shadow cursor-pointer"
//                     onClick={() => setSelectedFaculty(faculty)}
//                   >
//                     <CardHeader className="pb-3">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <CardTitle className="text-lg leading-6">
//                             {faculty.instituteName.length > 40 
//                               ? faculty.instituteName.substring(0, 40) + '...' 
//                               : faculty.instituteName}
//                           </CardTitle>
//                           <CardDescription className="flex items-center gap-2 mt-1">
//                             <Calendar className="w-4 h-4" />
//                             {faculty.reportingPeriod}
//                           </CardDescription>
//                         </div>
//                         <Badge variant="secondary">{faculty.status}</Badge>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div className="space-y-2">
//                           <div className="flex items-center gap-2">
//                             <Users className="w-4 h-4 text-blue-500" />
//                             <span className="font-semibold">{analytics.totalStudents.toLocaleString()}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <GraduationCap className="w-4 h-4 text-green-500" />
//                             <span className="font-semibold">{analytics.totalGraduates.toLocaleString()}</span>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center gap-2">
//                             <BookOpen className="w-4 h-4 text-purple-500" />
//                             <span className="font-semibold">{analytics.totalResearch}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Network className="w-4 h-4 text-orange-500" />
//                             <span className="font-semibold">{analytics.totalCollaborations}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-4 pt-3 border-t">
//                         <div className="flex justify-between items-center text-xs">
//                           <span>Pass Rate</span>
//                           <Badge variant={analytics.passRate >= 70 ? "default" : "destructive"}>
//                             {analytics.passRate}%
//                           </Badge>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           </TabsContent> */}

//           {/* Faculties Tab */}
//           <TabsContent value="faculties" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>All Faculty Reports</CardTitle>
//                 <CardDescription>
//                   Detailed view of all faculty submissions with comprehensive analytics
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="rounded-lg border overflow-hidden">
//                   <Table>
//                     <TableHeader>
//                       <TableRow className="bg-gray-50">
//                         <TableHead>Institute</TableHead>
//                         <TableHead>Head</TableHead>
//                         <TableHead>Period</TableHead>
//                         <TableHead>Programs</TableHead>
//                         <TableHead>Students</TableHead>
//                         <TableHead>Research</TableHead>
//                         <TableHead>Pass Rate</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead>Actions</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {filteredData.map((faculty) => {
//                         const analytics = getFacultyAnalytics(faculty);
//                         return (
//                           <TableRow key={faculty._id} className="hover:bg-gray-50">
//                             <TableCell className="font-medium">
//                               <div>
//                                 <p className="font-semibold">
//                                   {faculty.instituteName.length > 35 
//                                     ? faculty.instituteName.substring(0, 35) + '...' 
//                                     : faculty.instituteName}
//                                 </p>
//                                 <p className="text-xs text-gray-500">{faculty.email}</p>
//                               </div>
//                             </TableCell>
//                             <TableCell>{faculty.headName}</TableCell>
//                             <TableCell>
//                               <Badge variant="outline">{faculty.reportingPeriod}</Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Badge variant="secondary">{faculty.academicPrograms.length}</Badge>
//                             </TableCell>
//                             <TableCell>
//                               <div className="text-center">
//                                 <span className="font-semibold">{analytics.totalStudents.toLocaleString()}</span>
//                                 <div className="text-xs text-gray-500">
//                                   {analytics.totalGraduates.toLocaleString()} graduates
//                                 </div>
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <div className="text-center">
//                                 <span className="font-semibold">{analytics.totalResearch}</span>
//                                 <div className="text-xs text-gray-500">
//                                   {faculty.collaborations.length} collabs
//                                 </div>
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <Badge 
//                                 variant={analytics.passRate >= 70 ? "default" : 
//                                         analytics.passRate >= 50 ? "secondary" : "destructive"}
//                               >
//                                 {analytics.passRate}%
//                               </Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Badge 
//                                 className={
//                                   faculty.status === 'approved' ? 'bg-green-100 text-green-800' :
//                                   faculty.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
//                                   'bg-yellow-100 text-yellow-800'
//                                 }
//                               >
//                                 {faculty.status}
//                               </Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Dialog >
//                                 <DialogTrigger asChild>
//                                   <Button 
//                                     variant="outline" 
//                                     size="sm" 
//                                     className="flex items-center gap-2"
//                                     onClick={() => setSelectedFaculty(faculty)}
//                                   >
//                                     <Eye className="w-4 h-4" />
//                                     View
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="  overflow-y-auto" style={{width:"90vw",maxWidth:'98vw',height:'98vh'}}>
//                                   <DialogHeader>
//                                     <DialogTitle>{faculty.instituteName}</DialogTitle>
//                                     <DialogDescription>
//                                       Comprehensive analytics for {faculty.reportingPeriod} • Submitted on {new Date(faculty.submissionDate).toLocaleDateString()}
//                                     </DialogDescription>
//                                   </DialogHeader>
//                                   {selectedFaculty && <FacultyDetailView faculty={selectedFaculty} />}
//                                 </DialogContent>
//                               </Dialog>
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Individual Faculty Detail View */}
//           {selectedFaculty && (
//             <TabsContent value="details">
//               <FacultyDetailView faculty={selectedFaculty} />
//             </TabsContent>
//           )}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// // Analytics calculations for individual faculty
// const getFacultyAnalytics = (faculty: FacultyData) => {

//   console.log('Calculating analytics for faculty:',faculty, faculty.instituteName); 
//   const totalGraduates = faculty.studentEnrollment.reduce((sum, enrollment) => 
//     sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
  
//   const totalStudents = faculty.graduates.reduce((sum, graduate) => 
//     sum + graduate.constituentExamPassedT + graduate.affiliatedExamPassedT, 0);
  
//   const totalResearch = faculty.researchProjectsInitiated + faculty.researchProjectsCompleted;
  
//   const totalPrograms = faculty.academicPrograms.length;
  
//   const totalCollaborations = faculty.collaborations.length;

//   // Calculate pass rates
//   const totalAppeared = faculty.studentEnrollment.reduce((sum, enrollment) => 
//     sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
  
//   const totalPassed = faculty.studentEnrollment.reduce((sum, enrollment) => 
//     sum + enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT, 0);
  
//   const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;

//   return {
//     totalStudents,
//     totalGraduates,
//     totalResearch,
//     totalPrograms,
//     totalCollaborations,
//     passRate,
//     totalAppeared,
//     totalPassed
//   };
// };

// // Faculty Detail View Component
// const FacultyDetailView: React.FC<{ faculty: FacultyData }> = ({ faculty }) => {

//   console.log("oohhhh faculty in detail view:", faculty);
//   const analytics = getFacultyAnalytics(faculty);

//   // Chart data preparations
//   const getEnrollmentByProgram = () => {
//     return faculty.studentEnrollment.map(enrollment => ({
//       program: enrollment.program,
//       constituent: enrollment.constituentExamAppearedT,
//       affiliated: enrollment.affiliatedExamAppearedT,
//       total: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT
//     }));
//   };

//   const getGenderDistribution = () => {
//     let totalMale = 0, totalFemale = 0;
//     faculty.studentEnrollment.forEach(enrollment => {
//       totalMale += enrollment.constituentExamAppearedM + enrollment.affiliatedExamAppearedM;
//       totalFemale += enrollment.constituentExamAppearedF + enrollment.affiliatedExamAppearedF;
//     });
    
//     return [
//       { name: 'Male', value: totalMale, color: '#4f46e5' },
//       { name: 'Female', value: totalFemale, color: '#ec4899' }
//     ];
//   };

//   const getPassRateByProgram = () => {
//     return faculty.studentEnrollment.map(enrollment => {
//       const totalAppeared = enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT;
//       const totalPassed = enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT;
//       const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;
      
//       return {
//         program: enrollment.program,
//         appeared: totalAppeared,
//         passed: totalPassed,
//         passRate,
//         level: enrollment.level
//       };
//     });
//   };

//   const getCampusDistribution = () => {
//     const constituentTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentExamAppearedT, 0);
//     const affiliatedTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.affiliatedExamAppearedT, 0);
//     const total = constituentTotal + affiliatedTotal;
    
//     return [
//       { name: 'Constituent Campus', value: constituentTotal, percentage: total > 0 ? Math.round((constituentTotal / total) * 100) : 0, color: '#10b981' },
//       { name: 'Affiliated Campus', value: affiliatedTotal, percentage: total > 0 ? Math.round((affiliatedTotal / total) * 100) : 0, color: '#f59e0b' }
//     ];
//   };

//   const getProgramTypes = () => {
//     const types: { [key: string]: number } = {};
//     faculty.academicPrograms.forEach(program => {
//       types[program.programType] = (types[program.programType] || 0) + 1;
//     });
//     return Object.entries(types).map(([type, count]) => ({ type, count }));
//   };

//   const getLevelDistribution = () => {
//     const levels: { [key: string]: number } = {};
//     faculty.academicPrograms.forEach(program => {
//       levels[program.level] = (levels[program.level] || 0) + 1;
//     });
//     return Object.entries(levels).map(([level, count]) => ({ level, count }));
//   };

//   const getResearchProgress = () => {
//     return [
//       { name: 'Initiated', value: faculty.researchProjectsInitiated, color: '#4f46e5' },
//       { name: 'Completed', value: faculty.researchProjectsCompleted, color: '#10b981' }
//     ];
//   };

//   const getGraduatesTrend = () => {
//     return faculty.graduates.map((graduate, index) => ({
//       semester: graduate.semester,
//       graduates: graduate.constituentExamPassedT + graduate.affiliatedExamPassedT,
//       program: graduate.program
//     }));
//   };

//   const getStudentPerformance = () => {
//     return faculty.studentEnrollment.map(enrollment => ({
//       program: enrollment.program,
//       appeared: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT,
//       passed: enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT,
//       passRate: ((enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT) / 
//                 (enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT) * 100) || 0
//     }));
//   };

//   return (
//     <div className="space-y-6 ">
//       {/* Overview Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-blue-900">Total Students</p>
//                 <p className="text-2xl font-bold text-blue-700">{analytics.totalStudents.toLocaleString()}</p>
//               </div>
//               <Users className="w-8 h-8 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-green-900">Total Graduates</p>
//                 <p className="text-2xl font-bold text-green-700">{analytics.totalGraduates.toLocaleString()}</p>
//               </div>
//               <GraduationCap className="w-8 h-8 text-green-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-purple-900">Research Projects</p>
//                 <p className="text-2xl font-bold text-purple-700">{analytics.totalResearch}</p>
//               </div>
//               <BookOpen className="w-8 h-8 text-purple-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-orange-900">Pass Rate</p>
//                 <p className="text-2xl font-bold text-orange-700">{analytics.passRate}%</p>
//               </div>
//               <UserCheck className="w-8 h-8 text-orange-600" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="overview" className="w-full">
//         <TabsList className="grid w-full grid-cols-5">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="academics">Academics</TabsTrigger>
//           <TabsTrigger value="students">Students</TabsTrigger>
//           <TabsTrigger value="research">Research</TabsTrigger>
//           <TabsTrigger value="administration">Administration</TabsTrigger>
//         </TabsList>

//         {/* Overview Tab */}
//         <TabsContent value="overview" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Key Metrics */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Target className="w-5 h-5" />
//                   Key Performance Indicators
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="p-3 bg-blue-50 rounded-lg">
//                       <p className="text-sm font-medium text-blue-900">Academic Programs</p>
//                       <p className="text-2xl font-bold text-blue-700">{faculty.academicPrograms.length}</p>
//                     </div>
//                     <div className="p-3 bg-green-50 rounded-lg">
//                       <p className="text-sm font-medium text-green-900">Collaborations</p>
//                       <p className="text-2xl font-bold text-green-700">{faculty.collaborations.length}</p>
//                     </div>
//                     <div className="p-3 bg-purple-50 rounded-lg">
//                       <p className="text-sm font-medium text-purple-900">New Programs</p>
//                       <p className="text-2xl font-bold text-purple-700">{faculty.newPrograms.filter(p => p.trim()).length}</p>
//                     </div>
//                     <div className="p-3 bg-orange-50 rounded-lg">
//                       <p className="text-sm font-medium text-orange-900">Staff Development</p>
//                       <p className="text-2xl font-bold text-orange-700">{faculty.trainings ? faculty.trainings.split(',').length : 0}</p>
//                     </div>
//                   </div>
                  
//                   {/* Institution Info */}
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <h4 className="font-semibold mb-2">Institution Information</h4>
//                     <div className="grid grid-cols-2 gap-2 text-sm">
//                       <div className="flex items-center gap-2">
//                         <Building className="w-4 h-4 text-gray-500" />
//                         <span>{faculty.instituteName}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Users2 className="w-4 h-4 text-gray-500" />
//                         <span>{faculty.headName}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Mail className="w-4 h-4 text-gray-500" />
//                         <span>{faculty.email}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone className="w-4 h-4 text-gray-500" />
//                         <span>{faculty.phone}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Performance Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5" />
//                   Performance Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <ComposedChart data={getStudentPerformance()}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                     <YAxis yAxisId="left" />
//                     <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
//                     <Tooltip />
//                     <Legend />
//                     <Bar yAxisId="left" dataKey="appeared" fill="#4f46e5" name="Students Appeared" />
//                     <Bar yAxisId="left" dataKey="passed" fill="#10b981" name="Students Passed" />
//                     <Line yAxisId="right" dataKey="passRate" stroke="#ef4444" name="Pass Rate %" />
//                   </ComposedChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* Academics Tab */}
//         <TabsContent value="academics" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Program Types */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <PieChart className="w-5 h-5" />
//                   Program Types Distribution
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={getProgramTypes()}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ type, count }) => `${type}: ${count}`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="count"
//                     >
//                       {getProgramTypes().map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             {/* Level Distribution */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <School className="w-5 h-5" />
//                   Program Levels Distribution
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={getLevelDistribution()}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="level" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="count" fill="#7c3aed" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             {/* Academic Programs List */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <BookText className="w-5 h-5" />
//                   Academic Programs Details
//                 </CardTitle>
//                 <CardDescription>{faculty.academicPrograms.length} programs offered</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4 max-h-96 overflow-y-auto">
//                   {faculty.academicPrograms.map((program, index) => (
//                     <div key={index} className="p-4 border rounded-lg bg-gray-50">
//                       <div className="flex justify-between items-start mb-2">
//                         <h4 className="font-semibold text-lg">{program.programName}</h4>
//                         <div className="flex gap-2">
//                           <Badge variant="outline">{program.level}</Badge>
//                           <Badge variant="secondary">{program.programType}</Badge>
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <p className="text-sm font-medium">Specializations:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {program.specializationAreas.map((area, areaIndex) => (
//                             <Badge key={areaIndex} variant="outline" className="text-xs">
//                               {area}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Curriculum & Innovations */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Lightbulb className="w-5 h-5" />
//                   Curriculum Updates & Innovations
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {faculty.curriculumUpdates && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Curriculum Updates</h4>
//                       <div className="p-3 bg-blue-50 rounded-lg text-sm">
//                         {faculty.curriculumUpdates}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.teachingInnovations && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Teaching Innovations</h4>
//                       <div className="p-3 bg-green-50 rounded-lg text-sm">
//                         {faculty.teachingInnovations}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.digitalTools && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Digital Tools</h4>
//                       <div className="p-3 bg-purple-50 rounded-lg text-sm">
//                         {faculty.digitalTools}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.academicChallenges && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Academic Challenges</h4>
//                       <div className="p-3 bg-orange-50 rounded-lg text-sm">
//                         {faculty.academicChallenges}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* Students Tab */}
//         <TabsContent value="students" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Enrollment by Program */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Student Enrollment by Program</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={getEnrollmentByProgram()}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="constituent" fill="#10b981" name="Constituent Campus" />
//                     <Bar dataKey="affiliated" fill="#f59e0b" name="Affiliated Campus" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             {/* Gender Distribution */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Gender Distribution</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={getGenderDistribution()}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {getGenderDistribution().map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             {/* Pass Rate by Program */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Pass Rate by Program</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={getPassRateByProgram()}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                     <YAxis domain={[0, 100]} />
//                     <Tooltip />
//                     <Bar dataKey="passRate" fill="#4f46e5" name="Pass Rate %">
//                       {getPassRateByProgram().map((entry, index) => (
//                         <Cell 
//                           key={`cell-${index}`} 
//                           fill={entry.passRate >= 70 ? '#10b981' : entry.passRate >= 50 ? '#f59e0b' : '#ef4444'} 
//                         />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             {/* Campus Distribution */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Campus Distribution</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={getCampusDistribution()}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, value, percentage }) => `${name}: ${percentage}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {getCampusDistribution().map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             {/* Graduates Trend */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle>Graduates Trend</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={getGraduatesTrend()}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="semester" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="graduates" stroke="#8b5cf6" name="Graduates" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* Research Tab */}
//         <TabsContent value="research" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Research Projects */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Research Projects</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="text-center p-4 bg-blue-50 rounded-lg">
//                       <p className="text-2xl font-bold text-blue-700">{faculty.researchProjectsInitiated}</p>
//                       <p className="text-sm text-blue-600">Initiated</p>
//                     </div>
//                     <div className="text-center p-4 bg-green-50 rounded-lg">
//                       <p className="text-2xl font-bold text-green-700">{faculty.researchProjectsCompleted}</p>
//                       <p className="text-sm text-green-600">Completed</p>
//                     </div>
//                   </div>
                  
//                   <ResponsiveContainer width="100%" height={200}>
//                     <PieChart>
//                       <Pie
//                         data={getResearchProgress()}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, value }) => `${name}: ${value}`}
//                         outerRadius={60}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {getResearchProgress().map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>

//                   {faculty.researchFunding && (
//                     <div>
//                       <p className="font-semibold">Research Funding:</p>
//                       <p className="text-sm text-gray-600">{faculty.researchFunding}</p>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Collaborations */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Network className="w-5 h-5" />
//                   Collaborations & Partnerships
//                 </CardTitle>
//                 <CardDescription>{faculty.collaborations.length} active collaborations</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3 max-h-80 overflow-y-auto">
//                   {faculty.collaborations.map((collab, index) => (
//                     <div key={index} className="p-3 border rounded-lg bg-gray-50">
//                       <p className="font-semibold text-sm">{collab.institutionName}</p>
//                       <p className="text-xs text-gray-600 mt-1">{collab.objective}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Research Output */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle>Research Output & Intellectual Property</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {faculty.publications && (
//                     <div className="p-4 bg-blue-50 rounded-lg">
//                       <h4 className="font-semibold mb-2 flex items-center gap-2">
//                         <BookText className="w-4 h-4" />
//                         Publications
//                       </h4>
//                       <div className="text-sm">
//                         {faculty.publications}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.patents && (
//                     <div className="p-4 bg-green-50 rounded-lg">
//                       <h4 className="font-semibold mb-2 flex items-center gap-2">
//                         <Award className="w-4 h-4" />
//                         Patents
//                       </h4>
//                       <div className="text-sm">
//                         {faculty.patents}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.conferences && (
//                     <div className="p-4 bg-purple-50 rounded-lg">
//                       <h4 className="font-semibold mb-2 flex items-center gap-2">
//                         <Users2 className="w-4 h-4" />
//                         Conferences & Seminars
//                       </h4>
//                       <div className="text-sm">
//                         {faculty.conferences}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Additional Research Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                   {faculty.facultyParticipation && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Faculty Participation</h4>
//                       <div className="p-3 bg-gray-50 rounded-lg text-sm">
//                         {faculty.facultyParticipation}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.studentResearch && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Student Research</h4>
//                       <div className="p-3 bg-gray-50 rounded-lg text-sm">
//                         {faculty.studentResearch}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* Administration Tab */}
//         <TabsContent value="administration" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Staff Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Users2 className="w-5 h-5" />
//                   Staff Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {faculty.academicStaff && (
//                   <div>
//                     <label className="font-semibold text-sm">Academic Staff:</label>
//                     <p className="text-sm">{faculty.academicStaff}</p>
//                   </div>
//                 )}
//                 {faculty.adminStaff && (
//                   <div>
//                     <label className="font-semibold text-sm">Administrative Staff:</label>
//                     <p className="text-sm">{faculty.adminStaff}</p>
//                   </div>
//                 )}
//                 {faculty.newRecruitments && (
//                   <div>
//                     <label className="font-semibold text-sm">New Recruitments:</label>
//                     <p className="text-sm">{faculty.newRecruitments}</p>
//                   </div>
//                 )}
//                 {faculty.trainings && (
//                   <div>
//                     <label className="font-semibold text-sm">Staff Trainings:</label>
//                     <p className="text-sm">{faculty.trainings}</p>
//                   </div>
//                 )}
//                 {faculty.promotions && (
//                   <div>
//                     <label className="font-semibold text-sm">Promotions:</label>
//                     <p className="text-sm">{faculty.promotions}</p>
//                   </div>
//                 )}
//                 {faculty.retirements && (
//                   <div>
//                     <label className="font-semibold text-sm">Retirements:</label>
//                     <p className="text-sm">{faculty.retirements}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Infrastructure & Facilities */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Building2 className="w-5 h-5" />
//                   Infrastructure & Facilities
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {faculty.infrastructureAdditions && (
//                   <div>
//                     <label className="font-semibold text-sm">Infrastructure Additions:</label>
//                     <p className="text-sm">{faculty.infrastructureAdditions}</p>
//                   </div>
//                 )}
//                 {faculty.equipmentProcured && (
//                   <div>
//                     <label className="font-semibold text-sm">Equipment Procured:</label>
//                     <p className="text-sm">{faculty.equipmentProcured}</p>
//                   </div>
//                 )}
//                 {faculty.newFacilities && (
//                   <div>
//                     <label className="font-semibold text-sm">New Facilities:</label>
//                     <p className="text-sm">{faculty.newFacilities}</p>
//                   </div>
//                 )}
//                 {faculty.constructionStatus && (
//                   <div>
//                     <label className="font-semibold text-sm">Construction Status:</label>
//                     <p className="text-sm">{faculty.constructionStatus}</p>
//                   </div>
//                 )}
//                 {faculty.infrastructureChallenges && (
//                   <div>
//                     <label className="font-semibold text-sm">Infrastructure Challenges:</label>
//                     <p className="text-sm">{faculty.infrastructureChallenges}</p>
//                   </div>
//                 )}
//                 {faculty.accessibilityMeasures && (
//                   <div>
//                     <label className="font-semibold text-sm">Accessibility Measures:</label>
//                     <p className="text-sm">{faculty.accessibilityMeasures}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Financial Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <DollarSign className="w-5 h-5" />
//                   Financial Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {faculty.budgetAllocated && (
//                   <div>
//                     <label className="font-semibold text-sm">Budget Allocated:</label>
//                     <p className="text-sm">{faculty.budgetAllocated}</p>
//                   </div>
//                 )}
//                 {faculty.actualExpenditure && (
//                   <div>
//                     <label className="font-semibold text-sm">Actual Expenditure:</label>
//                     <p className="text-sm">{faculty.actualExpenditure}</p>
//                   </div>
//                 )}
//                 {faculty.revenueGenerated && (
//                   <div>
//                     <label className="font-semibold text-sm">Revenue Generated:</label>
//                     <p className="text-sm">{faculty.revenueGenerated}</p>
//                   </div>
//                 )}
//                 {faculty.financialChallenges && (
//                   <div>
//                     <label className="font-semibold text-sm">Financial Challenges:</label>
//                     <p className="text-sm">{faculty.financialChallenges}</p>
//                   </div>
//                 )}
//                 {faculty.auditStatus && (
//                   <div>
//                     <label className="font-semibold text-sm">Audit Status:</label>
//                     <p className="text-sm">{faculty.auditStatus}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Governance & Policies */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Shield className="w-5 h-5" />
//                   Governance & Policies
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {faculty.meetingsHeld && (
//                   <div>
//                     <label className="font-semibold text-sm">Meetings Held:</label>
//                     <p className="text-sm">{faculty.meetingsHeld}</p>
//                   </div>
//                 )}
//                 {faculty.keyDecisions && (
//                   <div>
//                     <label className="font-semibold text-sm">Key Decisions:</label>
//                     <p className="text-sm">{faculty.keyDecisions}</p>
//                   </div>
//                 )}
//                 {faculty.policyUpdates && (
//                   <div>
//                     <label className="font-semibold text-sm">Policy Updates:</label>
//                     <p className="text-sm">{faculty.policyUpdates}</p>
//                   </div>
//                 )}
//                 {faculty.grievanceHandling && (
//                   <div>
//                     <label className="font-semibold text-sm">Grievance Handling:</label>
//                     <p className="text-sm">{faculty.grievanceHandling}</p>
//                   </div>
//                 )}
//                 {faculty.transparencyInitiatives && (
//                   <div>
//                     <label className="font-semibold text-sm">Transparency Initiatives:</label>
//                     <p className="text-sm">{faculty.transparencyInitiatives}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Student Support & Community */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <HeartHandshake className="w-5 h-5" />
//                   Student Support & Community Engagement
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     {faculty.scholarships && (
//                       <div>
//                         <label className="font-semibold text-sm">Scholarships:</label>
//                         <p className="text-sm">{faculty.scholarships}</p>
//                       </div>
//                     )}
//                     {faculty.careerCounseling && (
//                       <div>
//                         <label className="font-semibold text-sm">Career Counseling:</label>
//                         <p className="text-sm">{faculty.careerCounseling}</p>
//                       </div>
//                     )}
//                     {faculty.extracurricular && (
//                       <div>
//                         <label className="font-semibold text-sm">Extracurricular Activities:</label>
//                         <p className="text-sm">{faculty.extracurricular}</p>
//                       </div>
//                     )}
//                     {faculty.alumniEngagement && (
//                       <div>
//                         <label className="font-semibold text-sm">Alumni Engagement:</label>
//                         <p className="text-sm">{faculty.alumniEngagement}</p>
//                       </div>
//                     )}
//                   </div>
//                   <div className="space-y-4">
//                     {faculty.studentAchievements && (
//                       <div>
//                         <label className="font-semibold text-sm">Student Achievements:</label>
//                         <p className="text-sm">{faculty.studentAchievements}</p>
//                       </div>
//                     )}
//                     {faculty.outreachPrograms && (
//                       <div>
//                         <label className="font-semibold text-sm">Outreach Programs:</label>
//                         <p className="text-sm">{faculty.outreachPrograms}</p>
//                       </div>
//                     )}
//                     {faculty.communityCollaborations && (
//                       <div>
//                         <label className="font-semibold text-sm">Community Collaborations:</label>
//                         <p className="text-sm">{faculty.communityCollaborations}</p>
//                       </div>
//                     )}
//                     {faculty.socialResponsibility && (
//                       <div>
//                         <label className="font-semibold text-sm">Social Responsibility:</label>
//                         <p className="text-sm">{faculty.socialResponsibility}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Future Plans & Challenges */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <TargetIcon className="w-5 h-5" />
//                   Future Plans & Institutional Development
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     {faculty.continuingEducation && (
//                       <div>
//                         <label className="font-semibold text-sm">Continuing Education:</label>
//                         <p className="text-sm">{faculty.continuingEducation}</p>
//                       </div>
//                     )}
//                     {faculty.awards && (
//                       <div>
//                         <label className="font-semibold text-sm">Awards & Recognition:</label>
//                         <p className="text-sm">{faculty.awards}</p>
//                       </div>
//                     )}
//                     {faculty.successStories && (
//                       <div>
//                         <label className="font-semibold text-sm">Success Stories:</label>
//                         <p className="text-sm">{faculty.successStories}</p>
//                       </div>
//                     )}
//                     {faculty.reputationContributions && (
//                       <div>
//                         <label className="font-semibold text-sm">Reputation Contributions:</label>
//                         <p className="text-sm">{faculty.reputationContributions}</p>
//                       </div>
//                     )}
//                   </div>
//                   <div className="space-y-4">
//                     {faculty.keyChallenges && (
//                       <div>
//                         <label className="font-semibold text-sm">Key Challenges:</label>
//                         <p className="text-sm">{faculty.keyChallenges}</p>
//                       </div>
//                     )}
//                     {faculty.strategies && (
//                       <div>
//                         <label className="font-semibold text-sm">Strategies:</label>
//                         <p className="text-sm">{faculty.strategies}</p>
//                       </div>
//                     )}
//                     {faculty.lessonsLearned && (
//                       <div>
//                         <label className="font-semibold text-sm">Lessons Learned:</label>
//                         <p className="text-sm">{faculty.lessonsLearned}</p>
//                       </div>
//                     )}
//                     {faculty.majorGoals && (
//                       <div>
//                         <label className="font-semibold text-sm">Major Goals:</label>
//                         <p className="text-sm">{faculty.majorGoals}</p>
//                       </div>
//                     )}
//                     {faculty.proposedProjects && (
//                       <div>
//                         <label className="font-semibold text-sm">Proposed Projects:</label>
//                         <p className="text-sm">{faculty.proposedProjects}</p>
//                       </div>
//                     )}
//                     {faculty.supportNeeded && (
//                       <div>
//                         <label className="font-semibold text-sm">Support Needed:</label>
//                         <p className="text-sm">{faculty.supportNeeded}</p>
//                       </div>
//                     )}
//                     {faculty.policyReforms && (
//                       <div>
//                         <label className="font-semibold text-sm">Policy Reforms:</label>
//                         <p className="text-sm">{faculty.policyReforms}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default AdminForFaculty;

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid,
//   PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart
// } from 'recharts';
// import { 
//   Eye, Search, Download, Filter, TrendingUp, Users, BookOpen, 
//   Award, DollarSign, Building, Calendar, Target, FileText,
//   BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
//   BarChartIcon, GraduationCap, Cpu, Network, UserCheck, Mail, Phone,
//   School, BookText, Users2, Building2, TargetIcon, Lightbulb,
//   Shield, HeartHandshake,
// } from 'lucide-react';
// import { toast } from 'sonner';
// import axios from 'axios';
// import * as XLSX from 'xlsx';

// interface AcademicProgram {
//   level: string;
//   programName: string;
//   programType: string;
//   specializationAreas: string[];
// }

// interface StudentEnrollment {
//   program: string;
//   level: string;
//   constituentExamAppearedM: number;
//   constituentExamAppearedF: number;
//   constituentExamAppearedT: number;
//   constituentExamPassedM: number;
//   constituentExamPassedF: number;
//   constituentExamPassedT: number;
//   affiliatedExamAppearedM: number;
//   affiliatedExamAppearedF: number;
//   affiliatedExamAppearedT: number;
//   affiliatedExamPassedM: number;
//   affiliatedExamPassedF: number;
//   affiliatedExamPassedT: number;
// }

// interface Graduate {
//   program: string;
//   semester: string;
//   constituentExamAppearedM: number;
//   constituentExamAppearedF: number;
//   constituentExamAppearedT: number;
//   constituentExamPassedM: number;
//   constituentExamPassedF: number;
//   constituentExamPassedT: number;
//   affiliatedExamAppearedM: number;
//   affiliatedExamAppearedF: number;
//   affiliatedExamAppearedT: number;
//   affiliatedExamPassedM: number;
//   affiliatedExamPassedF: number;
//   affiliatedExamPassedT: number;
// }

// interface Collaboration {
//   institutionName: string;
//   objective: string;
// }

// interface FacultyData {
//   _id: string;
//   instituteName: string;
//   reportingPeriod: string;
//   headName: string;
//   phone: string;
//   email: string;
//   submissionDate: string;
//   academicPrograms: AcademicProgram[];
//   newPrograms: string[];
//   studentEnrollment: StudentEnrollment[];
//   graduates: Graduate[];
//   curriculumUpdates: string;
//   teachingInnovations: string;
//   digitalTools: string;
//   studentFeedback: string;
//   academicChallenges: string;
//   researchProjectsInitiated: number;
//   researchProjectsCompleted: number;
//   researchFunding: string;
//   publications: string;
//   patents: string;
//   conferences: string;
//   facultyParticipation: string;
//   studentResearch: string;
//   collaborations: Collaboration[];
//   academicStaff: string;
//   adminStaff: string;
//   newRecruitments: string;
//   trainings: string;
//   promotions: string;
//   retirements: string;
//   developmentNeeds: string;
//   infrastructureAdditions: string;
//   newFacilities: string;
//   constructionStatus: string;
//   equipmentProcured: string;
//   infrastructureChallenges: string;
//   accessibilityMeasures: string;
//   budgetAllocated: string;
//   actualExpenditure: string;
//   revenueGenerated: string;
//   financialChallenges: string;
//   auditStatus: string;
//   meetingsHeld: string;
//   keyDecisions: string;
//   policyUpdates: string;
//   grievanceHandling: string;
//   transparencyInitiatives: string;
//   scholarships: string;
//   careerCounseling: string;
//   extracurricular: string;
//   alumniEngagement: string;
//   studentAchievements: string;
//   outreachPrograms: string;
//   communityCollaborations: string;
//   socialResponsibility: string;
//   continuingEducation: string;
//   awards: string;
//   successStories: string;
//   reputationContributions: string;
//   keyChallenges: string;
//   strategies: string;
//   lessonsLearned: string;
//   majorGoals: string;
//   proposedProjects: string;
//   supportNeeded: string;
//   policyReforms: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const COLORS = ['#4f46e5', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// const AdminForFaculty: React.FC = () => {
//   const [facultyData, setFacultyData] = useState<FacultyData[]>([]);
//   const [filteredData, setFilteredData] = useState<FacultyData[]>([]);
//   const [selectedFaculty, setSelectedFaculty] = useState<FacultyData | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('faculties');

//   useEffect(() => {
//     fetchFacultyData();
//   }, []);

//   useEffect(() => {
//     const filtered = facultyData.filter(faculty =>
//       faculty.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.reportingPeriod.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }, [searchTerm, facultyData]);

//   const fetchFacultyData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('https://digitaldashboard.tu.edu.np/api/faculty-forms', {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data.success) {
//         setFacultyData(response.data.data || []);
//         setFilteredData(response.data.data || []);
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       toast.error('Error fetching faculty data');
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportStudentDataToExcel = (faculty: FacultyData) => {
//     try {
//       // Create workbook
//       const workbook = XLSX.utils.book_new();

//       // Student Enrollment Data
//       const enrollmentData = faculty.studentEnrollment.map((enrollment, index) => ({
//         'S.N.': index + 1,
//         'Program': enrollment.program,
//         'Level': enrollment.level,
//         'Constituent Campus - Exam Appeared - Male': enrollment.constituentExamAppearedM,
//         'Constituent Campus - Exam Appeared - Female': enrollment.constituentExamAppearedF,
//         'Constituent Campus - Exam Appeared - Total': enrollment.constituentExamAppearedT,
//         'Constituent Campus - Exam Passed - Male': enrollment.constituentExamPassedM,
//         'Constituent Campus - Exam Passed - Female': enrollment.constituentExamPassedF,
//         'Constituent Campus - Exam Passed - Total': enrollment.constituentExamPassedT,
//         'Affiliated Campus - Exam Appeared - Male': enrollment.affiliatedExamAppearedM,
//         'Affiliated Campus - Exam Appeared - Female': enrollment.affiliatedExamAppearedF,
//         'Affiliated Campus - Exam Appeared - Total': enrollment.affiliatedExamAppearedT,
//         'Affiliated Campus - Exam Passed - Male': enrollment.affiliatedExamPassedM,
//         'Affiliated Campus - Exam Passed - Female': enrollment.affiliatedExamPassedF,
//         'Affiliated Campus - Exam Passed - Total': enrollment.affiliatedExamPassedT,
//       }));

//       // Graduates Data
//       const graduatesData = faculty.graduates.map((graduate, index) => ({
//         'S.N.': index + 1,
//         'Program': graduate.program,
//         'Semester': graduate.semester,
//         'Constituent Campus - Exam Appeared - Male': graduate.constituentExamAppearedM,
//         'Constituent Campus - Exam Appeared - Female': graduate.constituentExamAppearedF,
//         'Constituent Campus - Exam Appeared - Total': graduate.constituentExamAppearedT,
//         'Constituent Campus - Exam Passed - Male': graduate.constituentExamPassedM,
//         'Constituent Campus - Exam Passed - Female': graduate.constituentExamPassedF,
//         'Constituent Campus - Exam Passed - Total': graduate.constituentExamPassedT,
//         'Affiliated Campus - Exam Appeared - Male': graduate.affiliatedExamAppearedM,
//         'Affiliated Campus - Exam Appeared - Female': graduate.affiliatedExamAppearedF,
//         'Affiliated Campus - Exam Appeared - Total': graduate.affiliatedExamAppearedT,
//         'Affiliated Campus - Exam Passed - Male': graduate.affiliatedExamPassedM,
//         'Affiliated Campus - Exam Passed - Female': graduate.affiliatedExamPassedF,
//         'Affiliated Campus - Exam Passed - Total': graduate.affiliatedExamPassedT,
//       }));

//       // Create worksheets
//       const enrollmentWS = XLSX.utils.json_to_sheet(enrollmentData);
//       const graduatesWS = XLSX.utils.json_to_sheet(graduatesData);

//       // Add worksheets to workbook
//       XLSX.utils.book_append_sheet(workbook, enrollmentWS, 'Student Enrollment');
//       XLSX.utils.book_append_sheet(workbook, graduatesWS, 'Graduates Data');

//       // Export the workbook
//       XLSX.writeFile(workbook, `${faculty.instituteName}_Student_Data_${faculty.reportingPeriod}.xlsx`);
//       toast.success('Student data exported successfully');
//     } catch (error) {
//       toast.error('Error exporting student data');
//       console.error('Export error:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
//       <div className="mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                 <BarChart3 className="w-8 h-8 text-indigo-600" />
//                 Institute/Faculty Analytics Dashboard
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 {facultyData.length} faculty reports analyzed • Real-time performance metrics
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search faculties..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-64"
//                 />
//               </div>
//               <Button 
//                 variant="outline" 
//                 className="flex items-center gap-2"
//                 onClick={fetchFacultyData}
//               >
//                 <Download className="w-4 h-4" />
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
//             <TabsTrigger value="faculties">Faculties</TabsTrigger>
//             <TabsTrigger value="academics">Academics</TabsTrigger>
//             <TabsTrigger value="research">Research</TabsTrigger>
//             <TabsTrigger value="performance">Performance</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           {/* Faculties Tab */}
//           <TabsContent value="faculties" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>All Faculty Reports</CardTitle>
//                 <CardDescription>
//                   Detailed view of all faculty submissions with comprehensive analytics
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="rounded-lg border overflow-hidden">
//                   <Table>
//                     <TableHeader>
//                       <TableRow className="bg-gray-50">
//                         <TableHead>Institute</TableHead>
//                         <TableHead>Head</TableHead>
//                         <TableHead>Period</TableHead>
//                         <TableHead>Programs</TableHead>
//                         <TableHead>Students</TableHead>
//                         <TableHead>Research</TableHead>
//                         <TableHead>Pass Rate</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead>Actions</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {filteredData.map((faculty) => {
//                         const analytics = getFacultyAnalytics(faculty);
//                         return (
//                           <TableRow key={faculty._id} className="hover:bg-gray-50">
//                             <TableCell className="font-medium">
//                               <div>
//                                 <p className="font-semibold">
//                                   {faculty.instituteName.length > 35 
//                                     ? faculty.instituteName.substring(0, 35) + '...' 
//                                     : faculty.instituteName}
//                                 </p>
//                                 <p className="text-xs text-gray-500">{faculty.email}</p>
//                               </div>
//                             </TableCell>
//                             <TableCell>{faculty.headName}</TableCell>
//                             <TableCell>
//                               <Badge variant="outline">{faculty.reportingPeriod}</Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Badge variant="secondary">{faculty.academicPrograms.length}</Badge>
//                             </TableCell>
//                             <TableCell>
//                               <div className="text-center">
//                                 <span className="font-semibold">{analytics.totalStudents.toLocaleString()}</span>
//                                 <div className="text-xs text-gray-500">
//                                   {analytics.totalGraduates.toLocaleString()} graduates
//                                 </div>
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <div className="text-center">
//                                 <span className="font-semibold">{analytics.totalResearch}</span>
//                                 <div className="text-xs text-gray-500">
//                                   {faculty.collaborations.length} collabs
//                                 </div>
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <Badge 
//                                 variant={analytics.passRate >= 70 ? "default" : 
//                                         analytics.passRate >= 50 ? "secondary" : "destructive"}
//                               >
//                                 {analytics.passRate}%
//                               </Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Badge 
//                                 className={
//                                   faculty.status === 'approved' ? 'bg-green-100 text-green-800' :
//                                   faculty.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
//                                   'bg-yellow-100 text-yellow-800'
//                                 }
//                               >
//                                 {faculty.status}
//                               </Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button 
//                                     variant="outline" 
//                                     size="sm" 
//                                     className="flex items-center gap-2"
//                                     onClick={() => setSelectedFaculty(faculty)}
//                                   >
//                                     <Eye className="w-4 h-4" />
//                                     View
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="overflow-y-auto" style={{width:"90vw",maxWidth:'98vw',height:'98vh'}}>
//                                   <DialogHeader>
//                                     <DialogTitle>{faculty.instituteName}</DialogTitle>
//                                     <DialogDescription>
//                                       Comprehensive analytics for {faculty.reportingPeriod} • Submitted on {new Date(faculty.submissionDate).toLocaleDateString()}
//                                     </DialogDescription>
//                                   </DialogHeader>
//                                   {selectedFaculty && <FacultyDetailView faculty={selectedFaculty} onExportStudentData={exportStudentDataToExcel} />}
//                                 </DialogContent>
//                               </Dialog>
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Individual Faculty Detail View */}
//           {selectedFaculty && (
//             <TabsContent value="details">
//               <FacultyDetailView faculty={selectedFaculty} onExportStudentData={exportStudentDataToExcel} />
//             </TabsContent>
//           )}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// // Analytics calculations for individual faculty
// const getFacultyAnalytics = (faculty: FacultyData) => {
//   const totalStudents = faculty.studentEnrollment.reduce((sum, enrollment) => 
//     sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
  
//   const totalGraduates = faculty.graduates.reduce((sum, graduate) => 
//     sum + graduate.constituentExamPassedT + graduate.affiliatedExamPassedT, 0);
  
//   const totalResearch = faculty.researchProjectsInitiated + faculty.researchProjectsCompleted;
  
//   const totalPrograms = faculty.academicPrograms.length;
  
//   const totalCollaborations = faculty.collaborations.length;

//   // Calculate pass rates
//   const totalAppeared = faculty.studentEnrollment.reduce((sum, enrollment) => 
//     sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
  
//   const totalPassed = faculty.studentEnrollment.reduce((sum, enrollment) => 
//     sum + enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT, 0);
  
//   const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;

//   return {
//     totalStudents,
//     totalGraduates,
//     totalResearch,
//     totalPrograms,
//     totalCollaborations,
//     passRate,
//     totalAppeared,
//     totalPassed
//   };
// };

// // Faculty Detail View Component
// interface FacultyDetailViewProps {
//   faculty: FacultyData;
//   onExportStudentData: (faculty: FacultyData) => void;
// }

// const FacultyDetailView: React.FC<FacultyDetailViewProps> = ({ faculty, onExportStudentData }) => {
//   const analytics = getFacultyAnalytics(faculty);

//   // Chart data preparations
//   const getEnrollmentByProgram = () => {
//     return faculty.studentEnrollment.map(enrollment => ({
//       program: enrollment.program,
//       constituent: enrollment.constituentExamAppearedT,
//       affiliated: enrollment.affiliatedExamAppearedT,
//       total: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT
//     }));
//   };

//   const getGenderDistribution = () => {
//     let totalMale = 0, totalFemale = 0;
//     faculty.studentEnrollment.forEach(enrollment => {
//       totalMale += enrollment.constituentExamAppearedM + enrollment.affiliatedExamAppearedM;
//       totalFemale += enrollment.constituentExamAppearedF + enrollment.affiliatedExamAppearedF;
//     });
    
//     return [
//       { name: 'Male', value: totalMale, color: '#4f46e5' },
//       { name: 'Female', value: totalFemale, color: '#ec4899' }
//     ];
//   };

//   const getPassRateByProgram = () => {
//     return faculty.studentEnrollment.map(enrollment => {
//       const totalAppeared = enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT;
//       const totalPassed = enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT;
//       const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;
      
//       return {
//         program: enrollment.program,
//         appeared: totalAppeared,
//         passed: totalPassed,
//         passRate,
//         level: enrollment.level
//       };
//     });
//   };

//   const getCampusDistribution = () => {
//     const constituentTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentExamAppearedT, 0);
//     const affiliatedTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.affiliatedExamAppearedT, 0);
//     const total = constituentTotal + affiliatedTotal;
    
//     return [
//       { name: 'Constituent Campus', value: constituentTotal, percentage: total > 0 ? Math.round((constituentTotal / total) * 100) : 0, color: '#10b981' },
//       { name: 'Affiliated Campus', value: affiliatedTotal, percentage: total > 0 ? Math.round((affiliatedTotal / total) * 100) : 0, color: '#f59e0b' }
//     ];
//   };

//   const getProgramTypes = () => {
//     const types: { [key: string]: number } = {};
//     faculty.academicPrograms.forEach(program => {
//       types[program.programType] = (types[program.programType] || 0) + 1;
//     });
//     return Object.entries(types).map(([type, count]) => ({ type, count }));
//   };

//   const getLevelDistribution = () => {
//     const levels: { [key: string]: number } = {};
//     faculty.academicPrograms.forEach(program => {
//       levels[program.level] = (levels[program.level] || 0) + 1;
//     });
//     return Object.entries(levels).map(([level, count]) => ({ level, count }));
//   };

//   const getResearchProgress = () => {
//     return [
//       { name: 'Initiated', value: faculty.researchProjectsInitiated, color: '#4f46e5' },
//       { name: 'Completed', value: faculty.researchProjectsCompleted, color: '#10b981' }
//     ];
//   };

//   const getGraduatesTrend = () => {
//     return faculty.graduates.map((graduate, index) => ({
//       semester: graduate.semester,
//       graduates: graduate.constituentExamPassedT + graduate.affiliatedExamPassedT,
//       program: graduate.program
//     }));
//   };

//   const getStudentPerformance = () => {
//     return faculty.studentEnrollment.map(enrollment => ({
//       program: enrollment.program,
//       appeared: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT,
//       passed: enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT,
//       passRate: ((enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT) / 
//                 (enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT) * 100) || 0
//     }));
//   };

//   const getGraduatesByProgram = () => {
//     const programMap: { [key: string]: number } = {};
//     faculty.graduates.forEach(graduate => {
//       programMap[graduate.program] = (programMap[graduate.program] || 0) + 
//         (graduate.constituentExamPassedT + graduate.affiliatedExamPassedT);
//     });
//     return Object.entries(programMap).map(([program, count]) => ({ program, count }));
//   };

//   const getGraduatesBySemester = () => {
//     const semesterMap: { [key: string]: number } = {};
//     faculty.graduates.forEach(graduate => {
//       semesterMap[graduate.semester] = (semesterMap[graduate.semester] || 0) + 
//         (graduate.constituentExamPassedT + graduate.affiliatedExamPassedT);
//     });
//     return Object.entries(semesterMap).map(([semester, count]) => ({ semester, count }));
//   };

//   const getEnrollmentTrend = () => {
//     return faculty.studentEnrollment.map(enrollment => ({
//       program: enrollment.program,
//       level: enrollment.level,
//       totalEnrolled: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT,
//       totalPassed: enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT,
//       passPercentage: ((enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT) / 
//                       (enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT) * 100) || 0
//     }));
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header with Export Button */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold">{faculty.instituteName}</h2>
//           <p className="text-gray-600">Reporting Period: {faculty.reportingPeriod}</p>
//         </div>
//         <Button 
//           onClick={() => onExportStudentData(faculty)}
//           className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
//         >
//           <Download className="w-4 h-4" />
//           Export Student Data
//         </Button>
//       </div>

//       {/* Overview Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-blue-900">Total Students</p>
//                 <p className="text-2xl font-bold text-blue-700">{analytics.totalStudents.toLocaleString()}</p>
//               </div>
//               <Users className="w-8 h-8 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-green-900">Total Graduates</p>
//                 <p className="text-2xl font-bold text-green-700">{analytics.totalGraduates.toLocaleString()}</p>
//               </div>
//               <GraduationCap className="w-8 h-8 text-green-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-purple-900">Research Projects</p>
//                 <p className="text-2xl font-bold text-purple-700">{analytics.totalResearch}</p>
//               </div>
//               <BookOpen className="w-8 h-8 text-purple-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-orange-900">Pass Rate</p>
//                 <p className="text-2xl font-bold text-orange-700">{analytics.passRate}%</p>
//               </div>
//               <UserCheck className="w-8 h-8 text-orange-600" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="students" className="w-full">
//         <TabsList className="grid w-full grid-cols-5">
//           <TabsTrigger value="students">Students & Graduates</TabsTrigger>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="academics">Academics</TabsTrigger>
//           <TabsTrigger value="research">Research</TabsTrigger>
//           <TabsTrigger value="administration">Administration</TabsTrigger>
//         </TabsList>

//         {/* Students & Graduates Tab - Enhanced */}
//         <TabsContent value="students" className="space-y-6">
//           {/* Student Enrollment Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Users className="w-5 h-5" />
//                 Student Enrollment Analysis
//               </CardTitle>
//               <CardDescription>
//                 Program-wise enrollment data for constituent and affiliated campuses
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 {/* Enrollment by Program */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={getEnrollmentByProgram()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="constituent" fill="#10b981" name="Constituent Campus" />
//                       <Bar dataKey="affiliated" fill="#f59e0b" name="Affiliated Campus" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Gender Distribution */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={getGenderDistribution()}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {getGenderDistribution().map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Detailed Enrollment Table */}
//               <div className="mt-6">
//                 <h4 className="font-semibold mb-4">Detailed Enrollment Data</h4>
//                 <div className="overflow-x-auto">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Program</TableHead>
//                         <TableHead>Level</TableHead>
//                         <TableHead colSpan={3} className="text-center">Constituent Campus - Appeared</TableHead>
//                         <TableHead colSpan={3} className="text-center">Constituent Campus - Passed</TableHead>
//                         <TableHead colSpan={3} className="text-center">Affiliated Campus - Appeared</TableHead>
//                         <TableHead colSpan={3} className="text-center">Affiliated Campus - Passed</TableHead>
//                       </TableRow>
//                       <TableRow>
//                         <TableHead></TableHead>
//                         <TableHead></TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {faculty.studentEnrollment.map((enrollment, index) => (
//                         <TableRow key={index}>
//                           <TableCell className="font-medium">{enrollment.program}</TableCell>
//                           <TableCell>{enrollment.level}</TableCell>
//                           <TableCell>{enrollment.constituentExamAppearedM}</TableCell>
//                           <TableCell>{enrollment.constituentExamAppearedF}</TableCell>
//                           <TableCell>{enrollment.constituentExamAppearedT}</TableCell>
//                           <TableCell>{enrollment.constituentExamPassedM}</TableCell>
//                           <TableCell>{enrollment.constituentExamPassedF}</TableCell>
//                           <TableCell>{enrollment.constituentExamPassedT}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamAppearedM}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamAppearedF}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamAppearedT}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamPassedM}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamPassedF}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamPassedT}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Graduates Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <GraduationCap className="w-5 h-5" />
//                 Graduates Analysis
//               </CardTitle>
//               <CardDescription>
//                 Program-wise and semester-wise graduate data
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 {/* Graduates by Program */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={getGraduatesByProgram()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="count" fill="#8b5cf6" name="Graduates" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Graduates Trend */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={getGraduatesTrend()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="semester" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Line type="monotone" dataKey="graduates" stroke="#8b5cf6" name="Graduates" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Detailed Graduates Table */}
//               <div className="mt-6">
//                 <h4 className="font-semibold mb-4">Detailed Graduates Data</h4>
//                 <div className="overflow-x-auto">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>S.N.</TableHead>
//                         <TableHead>Program</TableHead>
//                         <TableHead>Semester</TableHead>
//                         <TableHead colSpan={3} className="text-center">Constituent Campus - Appeared</TableHead>
//                         <TableHead colSpan={3} className="text-center">Constituent Campus - Passed</TableHead>
//                         <TableHead colSpan={3} className="text-center">Affiliated Campus - Appeared</TableHead>
//                         <TableHead colSpan={3} className="text-center">Affiliated Campus - Passed</TableHead>
//                       </TableRow>
//                       <TableRow>
//                         <TableHead></TableHead>
//                         <TableHead></TableHead>
//                         <TableHead></TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {faculty.graduates.map((graduate, index) => (
//                         <TableRow key={index}>
//                           <TableCell>{index + 1}</TableCell>
//                           <TableCell className="font-medium">{graduate.program}</TableCell>
//                           <TableCell>{graduate.semester}</TableCell>
//                           <TableCell>{graduate.constituentExamAppearedM}</TableCell>
//                           <TableCell>{graduate.constituentExamAppearedF}</TableCell>
//                           <TableCell>{graduate.constituentExamAppearedT}</TableCell>
//                           <TableCell>{graduate.constituentExamPassedM}</TableCell>
//                           <TableCell>{graduate.constituentExamPassedF}</TableCell>
//                           <TableCell>{graduate.constituentExamPassedT}</TableCell>
//                           <TableCell>{graduate.affiliatedExamAppearedM}</TableCell>
//                           <TableCell>{graduate.affiliatedExamAppearedF}</TableCell>
//                           <TableCell>{graduate.affiliatedExamAppearedT}</TableCell>
//                           <TableCell>{graduate.affiliatedExamPassedM}</TableCell>
//                           <TableCell>{graduate.affiliatedExamPassedF}</TableCell>
//                           <TableCell>{graduate.affiliatedExamPassedT}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Performance Metrics */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5" />
//                 Performance Metrics
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Pass Rate by Program */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={getPassRateByProgram()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                       <YAxis domain={[0, 100]} />
//                       <Tooltip />
//                       <Bar dataKey="passRate" fill="#4f46e5" name="Pass Rate %">
//                         {getPassRateByProgram().map((entry, index) => (
//                           <Cell 
//                             key={`cell-${index}`} 
//                             fill={entry.passRate >= 70 ? '#10b981' : entry.passRate >= 50 ? '#f59e0b' : '#ef4444'} 
//                           />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Campus Distribution */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={getCampusDistribution()}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, value, percentage }) => `${name}: ${percentage}%`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {getCampusDistribution().map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Other tabs remain the same as before */}
//         <TabsContent value="overview" className="space-y-6">
//           {/* Overview content remains the same */}
//         </TabsContent>

//         <TabsContent value="academics" className="space-y-6">
//           {/* Academics content remains the same */}
//         </TabsContent>

//         <TabsContent value="research" className="space-y-6">
//           {/* Research content remains the same */}
//         </TabsContent>

//         <TabsContent value="administration" className="space-y-6">
//           {/* Administration content remains the same */}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default AdminForFaculty;

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid,
//   PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart
// } from 'recharts';
// import { 
//   Eye, Search, Download, Filter, TrendingUp, Users, BookOpen, 
//   Award, DollarSign, Building, Calendar, Target, FileText,
//   BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
//   BarChartIcon, GraduationCap, Cpu, Network, UserCheck, Mail, Phone,
//   School, BookText, Users2, Building2, TargetIcon, Lightbulb,
//   Shield, HeartHandshake,
// } from 'lucide-react';
// import { toast } from 'sonner';
// import axios from 'axios';
// import * as XLSX from 'xlsx';

// interface AcademicProgram {
//   level: string;
//   programName: string;
//   programType: string;
//   specializationAreas: string[];
// }

// interface StudentEnrollment {
//   program: string;
//   level: string;
//   constituentExamAppearedM: number;
//   constituentExamAppearedF: number;
//   constituentExamAppearedT: number;
//   constituentExamPassedM: number;
//   constituentExamPassedF: number;
//   constituentExamPassedT: number;
//   affiliatedExamAppearedM: number;
//   affiliatedExamAppearedF: number;
//   affiliatedExamAppearedT: number;
//   affiliatedExamPassedM: number;
//   affiliatedExamPassedF: number;
//   affiliatedExamPassedT: number;
// }

// interface Graduate {
//   program: string;
//   semester: string;
//   constituentExamAppearedM: number;
//   constituentExamAppearedF: number;
//   constituentExamAppearedT: number;
//   constituentExamPassedM: number;
//   constituentExamPassedF: number;
//   constituentExamPassedT: number;
//   affiliatedExamAppearedM: number;
//   affiliatedExamAppearedF: number;
//   affiliatedExamAppearedT: number;
//   affiliatedExamPassedM: number;
//   affiliatedExamPassedF: number;
//   affiliatedExamPassedT: number;
// }

// interface Collaboration {
//   institutionName: string;
//   objective: string;
// }

// interface FacultyData {
//   _id: string;
//   instituteName: string;
//   reportingPeriod: string;
//   headName: string;
//   phone: string;
//   email: string;
//   submissionDate: string;
//   academicPrograms: AcademicProgram[];
//   newPrograms: string[];
//   studentEnrollment: StudentEnrollment[];
//   graduates: Graduate[];
//   curriculumUpdates: string;
//   teachingInnovations: string;
//   digitalTools: string;
//   studentFeedback: string;
//   academicChallenges: string;
//   researchProjectsInitiated: number;
//   researchProjectsCompleted: number;
//   researchFunding: string;
//   publications: string;
//   patents: string;
//   conferences: string;
//   facultyParticipation: string;
//   studentResearch: string;
//   collaborations: Collaboration[];
//   academicStaff: string;
//   adminStaff: string;
//   newRecruitments: string;
//   trainings: string;
//   promotions: string;
//   retirements: string;
//   developmentNeeds: string;
//   infrastructureAdditions: string;
//   newFacilities: string;
//   constructionStatus: string;
//   equipmentProcured: string;
//   infrastructureChallenges: string;
//   accessibilityMeasures: string;
//   budgetAllocated: string;
//   actualExpenditure: string;
//   revenueGenerated: string;
//   financialChallenges: string;
//   auditStatus: string;
//   meetingsHeld: string;
//   keyDecisions: string;
//   policyUpdates: string;
//   grievanceHandling: string;
//   transparencyInitiatives: string;
//   scholarships: string;
//   careerCounseling: string;
//   extracurricular: string;
//   alumniEngagement: string;
//   studentAchievements: string;
//   outreachPrograms: string;
//   communityCollaborations: string;
//   socialResponsibility: string;
//   continuingEducation: string;
//   awards: string;
//   successStories: string;
//   reputationContributions: string;
//   keyChallenges: string;
//   strategies: string;
//   lessonsLearned: string;
//   majorGoals: string;
//   proposedProjects: string;
//   supportNeeded: string;
//   policyReforms: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const COLORS = ['#4f46e5', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// const AdminForFaculty: React.FC = () => {
//   const [facultyData, setFacultyData] = useState<FacultyData[]>([]);
//   const [filteredData, setFilteredData] = useState<FacultyData[]>([]);
//   const [selectedFaculty, setSelectedFaculty] = useState<FacultyData | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('faculties');

//   useEffect(() => {
//     fetchFacultyData();
//   }, []);

//   useEffect(() => {
//     const filtered = facultyData.filter(faculty =>
//       faculty.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.reportingPeriod.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }, [searchTerm, facultyData]);

//   const fetchFacultyData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('https://digitaldashboard.tu.edu.np/api/faculty-forms', {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data.success) {
//         setFacultyData(response.data.data || []);
//         setFilteredData(response.data.data || []);
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       toast.error('Error fetching faculty data');
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportStudentDataToExcel = (faculty: FacultyData) => {
//     try {
//       // Create workbook
//       const workbook = XLSX.utils.book_new();

//       // Student Enrollment Data
//       const enrollmentData = faculty.studentEnrollment.map((enrollment, index) => ({
//         'S.N.': index + 1,
//         'Program': enrollment.program,
//         'Level': enrollment.level,
//         'Constituent Campus - Exam Appeared - Male': enrollment.constituentExamAppearedM,
//         'Constituent Campus - Exam Appeared - Female': enrollment.constituentExamAppearedF,
//         'Constituent Campus - Exam Appeared - Total': enrollment.constituentExamAppearedT,
//         'Constituent Campus - Exam Passed - Male': enrollment.constituentExamPassedM,
//         'Constituent Campus - Exam Passed - Female': enrollment.constituentExamPassedF,
//         'Constituent Campus - Exam Passed - Total': enrollment.constituentExamPassedT,
//         'Affiliated Campus - Exam Appeared - Male': enrollment.affiliatedExamAppearedM,
//         'Affiliated Campus - Exam Appeared - Female': enrollment.affiliatedExamAppearedF,
//         'Affiliated Campus - Exam Appeared - Total': enrollment.affiliatedExamAppearedT,
//         'Affiliated Campus - Exam Passed - Male': enrollment.affiliatedExamPassedM,
//         'Affiliated Campus - Exam Passed - Female': enrollment.affiliatedExamPassedF,
//         'Affiliated Campus - Exam Passed - Total': enrollment.affiliatedExamPassedT,
//       }));

//       // Graduates Data
//       const graduatesData = faculty.graduates.map((graduate, index) => ({
//         'S.N.': index + 1,
//         'Program': graduate.program,
//         'Semester': graduate.semester,
//         'Constituent Campus - Exam Appeared - Male': graduate.constituentExamAppearedM,
//         'Constituent Campus - Exam Appeared - Female': graduate.constituentExamAppearedF,
//         'Constituent Campus - Exam Appeared - Total': graduate.constituentExamAppearedT,
//         'Constituent Campus - Exam Passed - Male': graduate.constituentExamPassedM,
//         'Constituent Campus - Exam Passed - Female': graduate.constituentExamPassedF,
//         'Constituent Campus - Exam Passed - Total': graduate.constituentExamPassedT,
//         'Affiliated Campus - Exam Appeared - Male': graduate.affiliatedExamAppearedM,
//         'Affiliated Campus - Exam Appeared - Female': graduate.affiliatedExamAppearedF,
//         'Affiliated Campus - Exam Appeared - Total': graduate.affiliatedExamAppearedT,
//         'Affiliated Campus - Exam Passed - Male': graduate.affiliatedExamPassedM,
//         'Affiliated Campus - Exam Passed - Female': graduate.affiliatedExamPassedF,
//         'Affiliated Campus - Exam Passed - Total': graduate.affiliatedExamPassedT,
//       }));

//       // Create worksheets
//       const enrollmentWS = XLSX.utils.json_to_sheet(enrollmentData);
//       const graduatesWS = XLSX.utils.json_to_sheet(graduatesData);

//       // Add worksheets to workbook
//       XLSX.utils.book_append_sheet(workbook, enrollmentWS, 'Student Enrollment');
//       XLSX.utils.book_append_sheet(workbook, graduatesWS, 'Graduates Data');

//       // Export the workbook
//       XLSX.writeFile(workbook, `${faculty.instituteName}_Student_Data_${faculty.reportingPeriod}.xlsx`);
//       toast.success('Student data exported successfully');
//     } catch (error) {
//       toast.error('Error exporting student data');
//       console.error('Export error:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
//       <div className="mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                 <BarChart3 className="w-8 h-8 text-indigo-600" />
//                 Institute/Faculty Analytics Dashboard
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 {facultyData.length} faculty reports analyzed • Real-time performance metrics
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search faculties..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-64"
//                 />
//               </div>
//               <Button 
//                 variant="outline" 
//                 className="flex items-center gap-2"
//                 onClick={fetchFacultyData}
//               >
//                 <Download className="w-4 h-4" />
//                 Refresh
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
//             <TabsTrigger value="faculties">Faculties</TabsTrigger>
//             <TabsTrigger value="academics">Academics</TabsTrigger>
//             <TabsTrigger value="research">Research</TabsTrigger>
//             <TabsTrigger value="performance">Performance</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           {/* Faculties Tab */}
//           <TabsContent value="faculties" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>All Faculty Reports</CardTitle>
//                 <CardDescription>
//                   Detailed view of all faculty submissions with comprehensive analytics
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="rounded-lg border overflow-hidden">
//                   <Table>
//                     <TableHeader>
//                       <TableRow className="bg-gray-50">
//                         <TableHead>Institute</TableHead>
//                         <TableHead>Head</TableHead>
//                         <TableHead>Period</TableHead>
//                         <TableHead>Programs</TableHead>
//                         <TableHead>Students</TableHead>
//                         <TableHead>Research</TableHead>
//                         <TableHead>Pass Rate</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead>Actions</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {filteredData.map((faculty) => {
//                         const analytics = getFacultyAnalytics(faculty);
//                         return (
//                           <TableRow key={faculty._id} className="hover:bg-gray-50">
//                             <TableCell className="font-medium">
//                               <div>
//                                 <p className="font-semibold">
//                                   {faculty.instituteName.length > 35 
//                                     ? faculty.instituteName.substring(0, 35) + '...' 
//                                     : faculty.instituteName}
//                                 </p>
//                                 <p className="text-xs text-gray-500">{faculty.email}</p>
//                               </div>
//                             </TableCell>
//                             <TableCell>{faculty.headName}</TableCell>
//                             <TableCell>
//                               <Badge variant="outline">{faculty.reportingPeriod}</Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Badge variant="secondary">{faculty.academicPrograms.length}</Badge>
//                             </TableCell>
//                             <TableCell>
//                               <div className="text-center">
//                                 <span className="font-semibold">{analytics.totalStudents.toLocaleString()}</span>
//                                 <div className="text-xs text-gray-500">
//                                   {analytics.totalGraduates.toLocaleString()} graduates
//                                 </div>
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <div className="text-center">
//                                 <span className="font-semibold">{analytics.totalResearch}</span>
//                                 <div className="text-xs text-gray-500">
//                                   {faculty.collaborations.length} collabs
//                                 </div>
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <Badge 
//                                 variant={analytics.passRate >= 70 ? "default" : 
//                                         analytics.passRate >= 50 ? "secondary" : "destructive"}
//                               >
//                                 {analytics.passRate}%
//                               </Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Badge 
//                                 className={
//                                   faculty.status === 'approved' ? 'bg-green-100 text-green-800' :
//                                   faculty.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
//                                   'bg-yellow-100 text-yellow-800'
//                                 }
//                               >
//                                 {faculty.status}
//                               </Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button 
//                                     variant="outline" 
//                                     size="sm" 
//                                     className="flex items-center gap-2"
//                                     onClick={() => setSelectedFaculty(faculty)}
//                                   >
//                                     <Eye className="w-4 h-4" />
//                                     View
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="overflow-y-auto" style={{width:"90vw",maxWidth:'98vw',height:'98vh'}}>
//                                   <DialogHeader>
//                                     <DialogTitle>{faculty.instituteName}</DialogTitle>
//                                     <DialogDescription>
//                                       Comprehensive analytics for {faculty.reportingPeriod} • Submitted on {new Date(faculty.submissionDate).toLocaleDateString()}
//                                     </DialogDescription>
//                                   </DialogHeader>
//                                   {selectedFaculty && <FacultyDetailView faculty={selectedFaculty} onExportStudentData={exportStudentDataToExcel} />}
//                                 </DialogContent>
//                               </Dialog>
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Individual Faculty Detail View */}
//           {selectedFaculty && (
//             <TabsContent value="details">
//               <FacultyDetailView faculty={selectedFaculty} onExportStudentData={exportStudentDataToExcel} />
//             </TabsContent>
//           )}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// // Analytics calculations for individual faculty
// const getFacultyAnalytics = (faculty: FacultyData) => {
//   const totalStudents = faculty.studentEnrollment.reduce((sum, enrollment) => 
//     sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
  
//   const totalGraduates = faculty.graduates.reduce((sum, graduate) => 
//     sum + graduate.constituentExamPassedT + graduate.affiliatedExamPassedT, 0);
  
//   const totalResearch = faculty.researchProjectsInitiated + faculty.researchProjectsCompleted;
  
//   const totalPrograms = faculty.academicPrograms.length;
  
//   const totalCollaborations = faculty.collaborations.length;

//   // Calculate pass rates
//   const totalAppeared = faculty.studentEnrollment.reduce((sum, enrollment) => 
//     sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
  
//   const totalPassed = faculty.studentEnrollment.reduce((sum, enrollment) => 
//     sum + enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT, 0);
  
//   const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;

//   return {
//     totalStudents,
//     totalGraduates,
//     totalResearch,
//     totalPrograms,
//     totalCollaborations,
//     passRate,
//     totalAppeared,
//     totalPassed
//   };
// };

// // Faculty Detail View Component
// interface FacultyDetailViewProps {
//   faculty: FacultyData;
//   onExportStudentData: (faculty: FacultyData) => void;
// }

// const FacultyDetailView: React.FC<FacultyDetailViewProps> = ({ faculty, onExportStudentData }) => {
//   const analytics = getFacultyAnalytics(faculty);

//   // Chart data preparations
//   const getEnrollmentByProgram = () => {
//     return faculty.studentEnrollment.map(enrollment => ({
//       program: enrollment.program,
//       constituent: enrollment.constituentExamAppearedT,
//       affiliated: enrollment.affiliatedExamAppearedT,
//       total: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT
//     }));
//   };

//   const getGenderDistribution = () => {
//     let totalMale = 0, totalFemale = 0;
//     faculty.studentEnrollment.forEach(enrollment => {
//       totalMale += enrollment.constituentExamAppearedM + enrollment.affiliatedExamAppearedM;
//       totalFemale += enrollment.constituentExamAppearedF + enrollment.affiliatedExamAppearedF;
//     });
    
//     return [
//       { name: 'Male', value: totalMale, color: '#4f46e5' },
//       { name: 'Female', value: totalFemale, color: '#ec4899' }
//     ];
//   };

//   const getPassRateByProgram = () => {
//     return faculty.studentEnrollment.map(enrollment => {
//       const totalAppeared = enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT;
//       const totalPassed = enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT;
//       const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;
      
//       return {
//         program: enrollment.program,
//         appeared: totalAppeared,
//         passed: totalPassed,
//         passRate,
//         level: enrollment.level
//       };
//     });
//   };

//   const getCampusDistribution = () => {
//     const constituentTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentExamAppearedT, 0);
//     const affiliatedTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.affiliatedExamAppearedT, 0);
//     const total = constituentTotal + affiliatedTotal;
    
//     return [
//       { name: 'Constituent Campus', value: constituentTotal, percentage: total > 0 ? Math.round((constituentTotal / total) * 100) : 0, color: '#10b981' },
//       { name: 'Affiliated Campus', value: affiliatedTotal, percentage: total > 0 ? Math.round((affiliatedTotal / total) * 100) : 0, color: '#f59e0b' }
//     ];
//   };

//   const getProgramTypes = () => {
//     const types: { [key: string]: number } = {};
//     faculty.academicPrograms.forEach(program => {
//       types[program.programType] = (types[program.programType] || 0) + 1;
//     });
//     return Object.entries(types).map(([type, count]) => ({ type, count }));
//   };

//   const getLevelDistribution = () => {
//     const levels: { [key: string]: number } = {};
//     faculty.academicPrograms.forEach(program => {
//       levels[program.level] = (levels[program.level] || 0) + 1;
//     });
//     return Object.entries(levels).map(([level, count]) => ({ level, count }));
//   };

//   const getResearchProgress = () => {
//     return [
//       { name: 'Initiated', value: faculty.researchProjectsInitiated, color: '#4f46e5' },
//       { name: 'Completed', value: faculty.researchProjectsCompleted, color: '#10b981' }
//     ];
//   };

//   const getGraduatesTrend = () => {
//     return faculty.graduates.map((graduate, index) => ({
//       semester: graduate.semester,
//       graduates: graduate.constituentExamPassedT + graduate.affiliatedExamPassedT,
//       program: graduate.program
//     }));
//   };

//   const getStudentPerformance = () => {
//     return faculty.studentEnrollment.map(enrollment => ({
//       program: enrollment.program,
//       appeared: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT,
//       passed: enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT,
//       passRate: ((enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT) / 
//                 (enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT) * 100) || 0
//     }));
//   };

//   const getGraduatesByProgram = () => {
//     const programMap: { [key: string]: number } = {};
//     faculty.graduates.forEach(graduate => {
//       programMap[graduate.program] = (programMap[graduate.program] || 0) + 
//         (graduate.constituentExamPassedT + graduate.affiliatedExamPassedT);
//     });
//     return Object.entries(programMap).map(([program, count]) => ({ program, count }));
//   };

//   const getGraduatesBySemester = () => {
//     const semesterMap: { [key: string]: number } = {};
//     faculty.graduates.forEach(graduate => {
//       semesterMap[graduate.semester] = (semesterMap[graduate.semester] || 0) + 
//         (graduate.constituentExamPassedT + graduate.affiliatedExamPassedT);
//     });
//     return Object.entries(semesterMap).map(([semester, count]) => ({ semester, count }));
//   };

//   const getEnrollmentTrend = () => {
//     return faculty.studentEnrollment.map(enrollment => ({
//       program: enrollment.program,
//       level: enrollment.level,
//       totalEnrolled: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT,
//       totalPassed: enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT,
//       passPercentage: ((enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT) / 
//                       (enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT) * 100) || 0
//     }));
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header with Export Button */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold">{faculty.instituteName}</h2>
//           <p className="text-gray-600">Reporting Period: {faculty.reportingPeriod}</p>
//         </div>
//         <Button 
//           onClick={() => onExportStudentData(faculty)}
//           className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
//         >
//           <Download className="w-4 h-4" />
//           Export Student Data
//         </Button>
//       </div>

//       {/* Overview Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-blue-900">Total Students</p>
//                 <p className="text-2xl font-bold text-blue-700">{analytics.totalStudents.toLocaleString()}</p>
//               </div>
//               <Users className="w-8 h-8 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-green-900">Total Graduates</p>
//                 <p className="text-2xl font-bold text-green-700">{analytics.totalGraduates.toLocaleString()}</p>
//               </div>
//               <GraduationCap className="w-8 h-8 text-green-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-purple-900">Research Projects</p>
//                 <p className="text-2xl font-bold text-purple-700">{analytics.totalResearch}</p>
//               </div>
//               <BookOpen className="w-8 h-8 text-purple-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-orange-900">Pass Rate</p>
//                 <p className="text-2xl font-bold text-orange-700">{analytics.passRate}%</p>
//               </div>
//               <UserCheck className="w-8 h-8 text-orange-600" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="overview" className="w-full">
//         <TabsList className="grid w-full grid-cols-5">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="academics">Academics</TabsTrigger>
//           <TabsTrigger value="students">Students</TabsTrigger>
//           <TabsTrigger value="research">Research</TabsTrigger>
//           <TabsTrigger value="administration">Administration</TabsTrigger>
//         </TabsList>

//         {/* Overview Tab */}
//         <TabsContent value="overview" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Key Metrics */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Target className="w-5 h-5" />
//                   Key Performance Indicators
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="p-3 bg-blue-50 rounded-lg">
//                       <p className="text-sm font-medium text-blue-900">Academic Programs</p>
//                       <p className="text-2xl font-bold text-blue-700">{faculty.academicPrograms.length}</p>
//                     </div>
//                     <div className="p-3 bg-green-50 rounded-lg">
//                       <p className="text-sm font-medium text-green-900">Collaborations</p>
//                       <p className="text-2xl font-bold text-green-700">{faculty.collaborations.length}</p>
//                     </div>
//                     <div className="p-3 bg-purple-50 rounded-lg">
//                       <p className="text-sm font-medium text-purple-900">New Programs</p>
//                       <p className="text-2xl font-bold text-purple-700">{faculty.newPrograms.filter(p => p.trim()).length}</p>
//                     </div>
//                     <div className="p-3 bg-orange-50 rounded-lg">
//                       <p className="text-sm font-medium text-orange-900">Staff Development</p>
//                       <p className="text-2xl font-bold text-orange-700">{faculty.trainings ? faculty.trainings.split(',').length : 0}</p>
//                     </div>
//                   </div>
                  
//                   {/* Institution Info */}
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <h4 className="font-semibold mb-2">Institution Information</h4>
//                     <div className="grid grid-cols-2 gap-2 text-sm">
//                       <div className="flex items-center gap-2">
//                         <Building className="w-4 h-4 text-gray-500" />
//                         <span>{faculty.instituteName}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Users2 className="w-4 h-4 text-gray-500" />
//                         <span>{faculty.headName}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Mail className="w-4 h-4 text-gray-500" />
//                         <span>{faculty.email}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone className="w-4 h-4 text-gray-500" />
//                         <span>{faculty.phone}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Performance Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5" />
//                   Performance Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <ComposedChart data={getStudentPerformance()}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                     <YAxis yAxisId="left" />
//                     <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
//                     <Tooltip />
//                     <Legend />
//                     <Bar yAxisId="left" dataKey="appeared" fill="#4f46e5" name="Students Appeared" />
//                     <Bar yAxisId="left" dataKey="passed" fill="#10b981" name="Students Passed" />
//                     <Line yAxisId="right" dataKey="passRate" stroke="#ef4444" name="Pass Rate %" />
//                   </ComposedChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* Academics Tab */}
//         <TabsContent value="academics" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Program Types */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <PieChart className="w-5 h-5" />
//                   Program Types Distribution
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={getProgramTypes()}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ type, count }) => `${type}: ${count}`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="count"
//                     >
//                       {getProgramTypes().map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             {/* Level Distribution */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <School className="w-5 h-5" />
//                   Program Levels Distribution
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={getLevelDistribution()}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="level" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="count" fill="#7c3aed" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             {/* Academic Programs List */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <BookText className="w-5 h-5" />
//                   Academic Programs Details
//                 </CardTitle>
//                 <CardDescription>{faculty.academicPrograms.length} programs offered</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4 max-h-96 overflow-y-auto">
//                   {faculty.academicPrograms.map((program, index) => (
//                     <div key={index} className="p-4 border rounded-lg bg-gray-50">
//                       <div className="flex justify-between items-start mb-2">
//                         <h4 className="font-semibold text-lg">{program.programName}</h4>
//                         <div className="flex gap-2">
//                           <Badge variant="outline">{program.level}</Badge>
//                           <Badge variant="secondary">{program.programType}</Badge>
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <p className="text-sm font-medium">Specializations:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {program.specializationAreas.map((area, areaIndex) => (
//                             <Badge key={areaIndex} variant="outline" className="text-xs">
//                               {area}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Curriculum & Innovations */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Lightbulb className="w-5 h-5" />
//                   Curriculum Updates & Innovations
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {faculty.curriculumUpdates && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Curriculum Updates</h4>
//                       <div className="p-3 bg-blue-50 rounded-lg text-sm">
//                         {faculty.curriculumUpdates}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.teachingInnovations && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Teaching Innovations</h4>
//                       <div className="p-3 bg-green-50 rounded-lg text-sm">
//                         {faculty.teachingInnovations}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.digitalTools && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Digital Tools</h4>
//                       <div className="p-3 bg-purple-50 rounded-lg text-sm">
//                         {faculty.digitalTools}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.academicChallenges && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Academic Challenges</h4>
//                       <div className="p-3 bg-orange-50 rounded-lg text-sm">
//                         {faculty.academicChallenges}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* Students Tab - Enhanced */}
//         <TabsContent value="students" className="space-y-6">
//           {/* Student Enrollment Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Users className="w-5 h-5" />
//                 Student Enrollment Analysis
//               </CardTitle>
//               <CardDescription>
//                 Program-wise enrollment data for constituent and affiliated campuses
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 {/* Enrollment by Program */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={getEnrollmentByProgram()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="constituent" fill="#10b981" name="Constituent Campus" />
//                       <Bar dataKey="affiliated" fill="#f59e0b" name="Affiliated Campus" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Gender Distribution */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={getGenderDistribution()}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {getGenderDistribution().map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Detailed Enrollment Table */}
//               <div className="mt-6">
//                 <h4 className="font-semibold mb-4">Detailed Enrollment Data</h4>
//                 <div className="overflow-x-auto">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Program</TableHead>
//                         <TableHead>Level</TableHead>
//                         <TableHead colSpan={3} className="text-center">Constituent Campus - Appeared</TableHead>
//                         <TableHead colSpan={3} className="text-center">Constituent Campus - Passed</TableHead>
//                         <TableHead colSpan={3} className="text-center">Affiliated Campus - Appeared</TableHead>
//                         <TableHead colSpan={3} className="text-center">Affiliated Campus - Passed</TableHead>
//                       </TableRow>
//                       <TableRow>
//                         <TableHead></TableHead>
//                         <TableHead></TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {faculty.studentEnrollment.map((enrollment, index) => (
//                         <TableRow key={index}>
//                           <TableCell className="font-medium">{enrollment.program}</TableCell>
//                           <TableCell>{enrollment.level}</TableCell>
//                           <TableCell>{enrollment.constituentExamAppearedM}</TableCell>
//                           <TableCell>{enrollment.constituentExamAppearedF}</TableCell>
//                           <TableCell>{enrollment.constituentExamAppearedT}</TableCell>
//                           <TableCell>{enrollment.constituentExamPassedM}</TableCell>
//                           <TableCell>{enrollment.constituentExamPassedF}</TableCell>
//                           <TableCell>{enrollment.constituentExamPassedT}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamAppearedM}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamAppearedF}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamAppearedT}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamPassedM}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamPassedF}</TableCell>
//                           <TableCell>{enrollment.affiliatedExamPassedT}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Graduates Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <GraduationCap className="w-5 h-5" />
//                 Graduates Analysis
//               </CardTitle>
//               <CardDescription>
//                 Program-wise and semester-wise graduate data
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                 {/* Graduates by Program */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={getGraduatesByProgram()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="count" fill="#8b5cf6" name="Graduates" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Graduates Trend */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={getGraduatesTrend()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="semester" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Line type="monotone" dataKey="graduates" stroke="#8b5cf6" name="Graduates" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Detailed Graduates Table */}
//               <div className="mt-6">
//                 <h4 className="font-semibold mb-4">Detailed Graduates Data</h4>
//                 <div className="overflow-x-auto">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>S.N.</TableHead>
//                         <TableHead>Program</TableHead>
//                         <TableHead>Semester</TableHead>
//                         <TableHead colSpan={3} className="text-center">Constituent Campus - Appeared</TableHead>
//                         <TableHead colSpan={3} className="text-center">Constituent Campus - Passed</TableHead>
//                         <TableHead colSpan={3} className="text-center">Affiliated Campus - Appeared</TableHead>
//                         <TableHead colSpan={3} className="text-center">Affiliated Campus - Passed</TableHead>
//                       </TableRow>
//                       <TableRow>
//                         <TableHead></TableHead>
//                         <TableHead></TableHead>
//                         <TableHead></TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                         <TableHead>M</TableHead>
//                         <TableHead>F</TableHead>
//                         <TableHead>T</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {faculty.graduates.map((graduate, index) => (
//                         <TableRow key={index}>
//                           <TableCell>{index + 1}</TableCell>
//                           <TableCell className="font-medium">{graduate.program}</TableCell>
//                           <TableCell>{graduate.semester}</TableCell>
//                           <TableCell>{graduate.constituentExamAppearedM}</TableCell>
//                           <TableCell>{graduate.constituentExamAppearedF}</TableCell>
//                           <TableCell>{graduate.constituentExamAppearedT}</TableCell>
//                           <TableCell>{graduate.constituentExamPassedM}</TableCell>
//                           <TableCell>{graduate.constituentExamPassedF}</TableCell>
//                           <TableCell>{graduate.constituentExamPassedT}</TableCell>
//                           <TableCell>{graduate.affiliatedExamAppearedM}</TableCell>
//                           <TableCell>{graduate.affiliatedExamAppearedF}</TableCell>
//                           <TableCell>{graduate.affiliatedExamAppearedT}</TableCell>
//                           <TableCell>{graduate.affiliatedExamPassedM}</TableCell>
//                           <TableCell>{graduate.affiliatedExamPassedF}</TableCell>
//                           <TableCell>{graduate.affiliatedExamPassedT}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Performance Metrics */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5" />
//                 Performance Metrics
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Pass Rate by Program */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={getPassRateByProgram()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                       <YAxis domain={[0, 100]} />
//                       <Tooltip />
//                       <Bar dataKey="passRate" fill="#4f46e5" name="Pass Rate %">
//                         {getPassRateByProgram().map((entry, index) => (
//                           <Cell 
//                             key={`cell-${index}`} 
//                             fill={entry.passRate >= 70 ? '#10b981' : entry.passRate >= 50 ? '#f59e0b' : '#ef4444'} 
//                           />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Campus Distribution */}
//                 <div>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={getCampusDistribution()}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, value, percentage }) => `${name}: ${percentage}%`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {getCampusDistribution().map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Research Tab */}
//         <TabsContent value="research" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Research Projects */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Research Projects</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="text-center p-4 bg-blue-50 rounded-lg">
//                       <p className="text-2xl font-bold text-blue-700">{faculty.researchProjectsInitiated}</p>
//                       <p className="text-sm text-blue-600">Initiated</p>
//                     </div>
//                     <div className="text-center p-4 bg-green-50 rounded-lg">
//                       <p className="text-2xl font-bold text-green-700">{faculty.researchProjectsCompleted}</p>
//                       <p className="text-sm text-green-600">Completed</p>
//                     </div>
//                   </div>
                  
//                   <ResponsiveContainer width="100%" height={200}>
//                     <PieChart>
//                       <Pie
//                         data={getResearchProgress()}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, value }) => `${name}: ${value}`}
//                         outerRadius={60}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {getResearchProgress().map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>

//                   {faculty.researchFunding && (
//                     <div>
//                       <p className="font-semibold">Research Funding:</p>
//                       <p className="text-sm text-gray-600">{faculty.researchFunding}</p>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Collaborations */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Network className="w-5 h-5" />
//                   Collaborations & Partnerships
//                 </CardTitle>
//                 <CardDescription>{faculty.collaborations.length} active collaborations</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3 max-h-80 overflow-y-auto">
//                   {faculty.collaborations.map((collab, index) => (
//                     <div key={index} className="p-3 border rounded-lg bg-gray-50">
//                       <p className="font-semibold text-sm">{collab.institutionName}</p>
//                       <p className="text-xs text-gray-600 mt-1">{collab.objective}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Research Output */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle>Research Output & Intellectual Property</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {faculty.publications && (
//                     <div className="p-4 bg-blue-50 rounded-lg">
//                       <h4 className="font-semibold mb-2 flex items-center gap-2">
//                         <BookText className="w-4 h-4" />
//                         Publications
//                       </h4>
//                       <div className="text-sm">
//                         {faculty.publications}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.patents && (
//                     <div className="p-4 bg-green-50 rounded-lg">
//                       <h4 className="font-semibold mb-2 flex items-center gap-2">
//                         <Award className="w-4 h-4" />
//                         Patents
//                       </h4>
//                       <div className="text-sm">
//                         {faculty.patents}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.conferences && (
//                     <div className="p-4 bg-purple-50 rounded-lg">
//                       <h4 className="font-semibold mb-2 flex items-center gap-2">
//                         <Users2 className="w-4 h-4" />
//                         Conferences & Seminars
//                       </h4>
//                       <div className="text-sm">
//                         {faculty.conferences}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Additional Research Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                   {faculty.facultyParticipation && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Faculty Participation</h4>
//                       <div className="p-3 bg-gray-50 rounded-lg text-sm">
//                         {faculty.facultyParticipation}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.studentResearch && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Student Research</h4>
//                       <div className="p-3 bg-gray-50 rounded-lg text-sm">
//                         {faculty.studentResearch}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* Administration Tab */}
//         <TabsContent value="administration" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Staff Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Users2 className="w-5 h-5" />
//                   Staff Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {faculty.academicStaff && (
//                   <div>
//                     <label className="font-semibold text-sm">Academic Staff:</label>
//                     <p className="text-sm">{faculty.academicStaff}</p>
//                   </div>
//                 )}
//                 {faculty.adminStaff && (
//                   <div>
//                     <label className="font-semibold text-sm">Administrative Staff:</label>
//                     <p className="text-sm">{faculty.adminStaff}</p>
//                   </div>
//                 )}
//                 {faculty.newRecruitments && (
//                   <div>
//                     <label className="font-semibold text-sm">New Recruitments:</label>
//                     <p className="text-sm">{faculty.newRecruitments}</p>
//                   </div>
//                 )}
//                 {faculty.trainings && (
//                   <div>
//                     <label className="font-semibold text-sm">Staff Trainings:</label>
//                     <p className="text-sm">{faculty.trainings}</p>
//                   </div>
//                 )}
//                 {faculty.promotions && (
//                   <div>
//                     <label className="font-semibold text-sm">Promotions:</label>
//                     <p className="text-sm">{faculty.promotions}</p>
//                   </div>
//                 )}
//                 {faculty.retirements && (
//                   <div>
//                     <label className="font-semibold text-sm">Retirements:</label>
//                     <p className="text-sm">{faculty.retirements}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Infrastructure & Facilities */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Building2 className="w-5 h-5" />
//                   Infrastructure & Facilities
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {faculty.infrastructureAdditions && (
//                   <div>
//                     <label className="font-semibold text-sm">Infrastructure Additions:</label>
//                     <p className="text-sm">{faculty.infrastructureAdditions}</p>
//                   </div>
//                 )}
//                 {faculty.equipmentProcured && (
//                   <div>
//                     <label className="font-semibold text-sm">Equipment Procured:</label>
//                     <p className="text-sm">{faculty.equipmentProcured}</p>
//                   </div>
//                 )}
//                 {faculty.newFacilities && (
//                   <div>
//                     <label className="font-semibold text-sm">New Facilities:</label>
//                     <p className="text-sm">{faculty.newFacilities}</p>
//                   </div>
//                 )}
//                 {faculty.constructionStatus && (
//                   <div>
//                     <label className="font-semibold text-sm">Construction Status:</label>
//                     <p className="text-sm">{faculty.constructionStatus}</p>
//                   </div>
//                 )}
//                 {faculty.infrastructureChallenges && (
//                   <div>
//                     <label className="font-semibold text-sm">Infrastructure Challenges:</label>
//                     <p className="text-sm">{faculty.infrastructureChallenges}</p>
//                   </div>
//                 )}
//                 {faculty.accessibilityMeasures && (
//                   <div>
//                     <label className="font-semibold text-sm">Accessibility Measures:</label>
//                     <p className="text-sm">{faculty.accessibilityMeasures}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Financial Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <DollarSign className="w-5 h-5" />
//                   Financial Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {faculty.budgetAllocated && (
//                   <div>
//                     <label className="font-semibold text-sm">Budget Allocated:</label>
//                     <p className="text-sm">{faculty.budgetAllocated}</p>
//                   </div>
//                 )}
//                 {faculty.actualExpenditure && (
//                   <div>
//                     <label className="font-semibold text-sm">Actual Expenditure:</label>
//                     <p className="text-sm">{faculty.actualExpenditure}</p>
//                   </div>
//                 )}
//                 {faculty.revenueGenerated && (
//                   <div>
//                     <label className="font-semibold text-sm">Revenue Generated:</label>
//                     <p className="text-sm">{faculty.revenueGenerated}</p>
//                   </div>
//                 )}
//                 {faculty.financialChallenges && (
//                   <div>
//                     <label className="font-semibold text-sm">Financial Challenges:</label>
//                     <p className="text-sm">{faculty.financialChallenges}</p>
//                   </div>
//                 )}
//                 {faculty.auditStatus && (
//                   <div>
//                     <label className="font-semibold text-sm">Audit Status:</label>
//                     <p className="text-sm">{faculty.auditStatus}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Governance & Policies */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Shield className="w-5 h-5" />
//                   Governance & Policies
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {faculty.meetingsHeld && (
//                   <div>
//                     <label className="font-semibold text-sm">Meetings Held:</label>
//                     <p className="text-sm">{faculty.meetingsHeld}</p>
//                   </div>
//                 )}
//                 {faculty.keyDecisions && (
//                   <div>
//                     <label className="font-semibold text-sm">Key Decisions:</label>
//                     <p className="text-sm">{faculty.keyDecisions}</p>
//                   </div>
//                 )}
//                 {faculty.policyUpdates && (
//                   <div>
//                     <label className="font-semibold text-sm">Policy Updates:</label>
//                     <p className="text-sm">{faculty.policyUpdates}</p>
//                   </div>
//                 )}
//                 {faculty.grievanceHandling && (
//                   <div>
//                     <label className="font-semibold text-sm">Grievance Handling:</label>
//                     <p className="text-sm">{faculty.grievanceHandling}</p>
//                   </div>
//                 )}
//                 {faculty.transparencyInitiatives && (
//                   <div>
//                     <label className="font-semibold text-sm">Transparency Initiatives:</label>
//                     <p className="text-sm">{faculty.transparencyInitiatives}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Student Support & Community */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <HeartHandshake className="w-5 h-5" />
//                   Student Support & Community Engagement
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     {faculty.scholarships && (
//                       <div>
//                         <label className="font-semibold text-sm">Scholarships:</label>
//                         <p className="text-sm">{faculty.scholarships}</p>
//                       </div>
//                     )}
//                     {faculty.careerCounseling && (
//                       <div>
//                         <label className="font-semibold text-sm">Career Counseling:</label>
//                         <p className="text-sm">{faculty.careerCounseling}</p>
//                       </div>
//                     )}
//                     {faculty.extracurricular && (
//                       <div>
//                         <label className="font-semibold text-sm">Extracurricular Activities:</label>
//                         <p className="text-sm">{faculty.extracurricular}</p>
//                       </div>
//                     )}
//                     {faculty.alumniEngagement && (
//                       <div>
//                         <label className="font-semibold text-sm">Alumni Engagement:</label>
//                         <p className="text-sm">{faculty.alumniEngagement}</p>
//                       </div>
//                     )}
//                   </div>
//                   <div className="space-y-4">
//                     {faculty.studentAchievements && (
//                       <div>
//                         <label className="font-semibold text-sm">Student Achievements:</label>
//                         <p className="text-sm">{faculty.studentAchievements}</p>
//                       </div>
//                     )}
//                     {faculty.outreachPrograms && (
//                       <div>
//                         <label className="font-semibold text-sm">Outreach Programs:</label>
//                         <p className="text-sm">{faculty.outreachPrograms}</p>
//                       </div>
//                     )}
//                     {faculty.communityCollaborations && (
//                       <div>
//                         <label className="font-semibold text-sm">Community Collaborations:</label>
//                         <p className="text-sm">{faculty.communityCollaborations}</p>
//                       </div>
//                     )}
//                     {faculty.socialResponsibility && (
//                       <div>
//                         <label className="font-semibold text-sm">Social Responsibility:</label>
//                         <p className="text-sm">{faculty.socialResponsibility}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Future Plans & Challenges */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <TargetIcon className="w-5 h-5" />
//                   Future Plans & Institutional Development
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     {faculty.continuingEducation && (
//                       <div>
//                         <label className="font-semibold text-sm">Continuing Education:</label>
//                         <p className="text-sm">{faculty.continuingEducation}</p>
//                       </div>
//                     )}
//                     {faculty.awards && (
//                       <div>
//                         <label className="font-semibold text-sm">Awards & Recognition:</label>
//                         <p className="text-sm">{faculty.awards}</p>
//                       </div>
//                     )}
//                     {faculty.successStories && (
//                       <div>
//                         <label className="font-semibold text-sm">Success Stories:</label>
//                         <p className="text-sm">{faculty.successStories}</p>
//                       </div>
//                     )}
//                     {faculty.reputationContributions && (
//                       <div>
//                         <label className="font-semibold text-sm">Reputation Contributions:</label>
//                         <p className="text-sm">{faculty.reputationContributions}</p>
//                       </div>
//                     )}
//                   </div>
//                   <div className="space-y-4">
//                     {faculty.keyChallenges && (
//                       <div>
//                         <label className="font-semibold text-sm">Key Challenges:</label>
//                         <p className="text-sm">{faculty.keyChallenges}</p>
//                       </div>
//                     )}
//                     {faculty.strategies && (
//                       <div>
//                         <label className="font-semibold text-sm">Strategies:</label>
//                         <p className="text-sm">{faculty.strategies}</p>
//                       </div>
//                     )}
//                     {faculty.lessonsLearned && (
//                       <div>
//                         <label className="font-semibold text-sm">Lessons Learned:</label>
//                         <p className="text-sm">{faculty.lessonsLearned}</p>
//                       </div>
//                     )}
//                     {faculty.majorGoals && (
//                       <div>
//                         <label className="font-semibold text-sm">Major Goals:</label>
//                         <p className="text-sm">{faculty.majorGoals}</p>
//                       </div>
//                     )}
//                     {faculty.proposedProjects && (
//                       <div>
//                         <label className="font-semibold text-sm">Proposed Projects:</label>
//                         <p className="text-sm">{faculty.proposedProjects}</p>
//                       </div>
//                     )}
//                     {faculty.supportNeeded && (
//                       <div>
//                         <label className="font-semibold text-sm">Support Needed:</label>
//                         <p className="text-sm">{faculty.supportNeeded}</p>
//                       </div>
//                     )}
//                     {faculty.policyReforms && (
//                       <div>
//                         <label className="font-semibold text-sm">Policy Reforms:</label>
//                         <p className="text-sm">{faculty.policyReforms}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default AdminForFaculty;


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart
} from 'recharts';
import { 
  Eye, Search, Download, Filter, TrendingUp, Users, BookOpen, 
  Award, DollarSign, Building, Calendar, Target, FileText,
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
  BarChartIcon, GraduationCap, Cpu, Network, UserCheck, Mail, Phone,
  School, BookText, Users2, Building2, TargetIcon, Lightbulb,
  Shield, HeartHandshake, User, UserCog, Bookmark, Activity,
  Clock, MapPin, Star, Zap, Target as TargetLucide
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { API_BASE } from '@/lib/api';
// import { API_BASE } from '@/lib/api';

interface AcademicProgram {
  level: string;
  programName: string;
  programType: string;
  specializationAreas: string[];
}

interface StudentEnrollment {
  program: string;
  level: string;
  constituentExamAppearedM: number;
  constituentExamAppearedF: number;
  constituentExamAppearedT: number;
  constituentExamPassedM: number;
  constituentExamPassedF: number;
  constituentExamPassedT: number;
  affiliatedExamAppearedM: number;
  affiliatedExamAppearedF: number;
  affiliatedExamAppearedT: number;
  affiliatedExamPassedM: number;
  affiliatedExamPassedF: number;
  affiliatedExamPassedT: number;
}

interface Graduate {
  program: string;
  semester: string;
  constituentExamAppearedM: number;
  constituentExamAppearedF: number;
  constituentExamAppearedT: number;
  constituentExamPassedM: number;
  constituentExamPassedF: number;
  constituentExamPassedT: number;
  affiliatedExamAppearedM: number;
  affiliatedExamAppearedF: number;
  affiliatedExamAppearedT: number;
  affiliatedExamPassedM: number;
  affiliatedExamPassedF: number;
  affiliatedExamPassedT: number;
}

interface Collaboration {
  institutionName: string;
  objective: string;
}

interface FacultyData {
  _id: string;
  instituteName: string;
  reportingPeriod: string;
  headName: string;
  phone: string;
  email: string;
  submissionDate: string;
  academicPrograms: AcademicProgram[];
  newPrograms: string[];
  studentEnrollment: StudentEnrollment[];
  graduates: Graduate[];
  curriculumUpdates: string;
  teachingInnovations: string;
  digitalTools: string;
  studentFeedback: string;
  academicChallenges: string;
  researchProjectsInitiated: number;
  researchProjectsCompleted: number;
  researchFunding: string;
  publications: string;
  patents: string;
  conferences: string;
  facultyParticipation: string;
  studentResearch: string;
  collaborations: Collaboration[];
  academicStaff: string;
  adminStaff: string;
  newRecruitments: string;
  trainings: string;
  promotions: string;
  retirements: string;
  developmentNeeds: string;
  infrastructureAdditions: string;
  newFacilities: string;
  constructionStatus: string;
  equipmentProcured: string;
  infrastructureChallenges: string;
  accessibilityMeasures: string;
  budgetAllocated: string;
  actualExpenditure: string;
  revenueGenerated: string;
  financialChallenges: string;
  auditStatus: string;
  meetingsHeld: string;
  keyDecisions: string;
  policyUpdates: string;
  grievanceHandling: string;
  transparencyInitiatives: string;
  scholarships: string;
  careerCounseling: string;
  extracurricular: string;
  alumniEngagement: string;
  studentAchievements: string;
  outreachPrograms: string;
  communityCollaborations: string;
  socialResponsibility: string;
  continuingEducation: string;
  awards: string;
  successStories: string;
  reputationContributions: string;
  keyChallenges: string;
  strategies: string;
  lessonsLearned: string;
  majorGoals: string;
  proposedProjects: string;
  supportNeeded: string;
  policyReforms: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const COLORS = ['#4f46e5', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const AdminForFaculty: React.FC = () => {
  const [facultyData, setFacultyData] = useState<FacultyData[]>([]);
  const [filteredData, setFilteredData] = useState<FacultyData[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('faculties');

  useEffect(() => {
    fetchFacultyData();
  }, []);

  useEffect(() => {
    const filtered = facultyData.filter(faculty =>
      faculty.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.reportingPeriod.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, facultyData]);

const fetchFacultyData = async () => {
  try {
    setLoading(true);

    const response = await axios.get(`${API_BASE}/api/faculty-forms`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      const data = response.data.data || [];
      setFacultyData(data);
      setFilteredData(data);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    toast.error("Error fetching faculty data");
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};


  const exportStudentDataToExcel = (faculty: FacultyData) => {
    try {
      const workbook = XLSX.utils.book_new();

      // Student Enrollment Data
      const enrollmentData = faculty.studentEnrollment.map((enrollment, index) => ({
        'S.N.': index + 1,
        'Program': enrollment.program,
        'Level': enrollment.level,
        'Constituent Campus - Exam Appeared - Male': enrollment.constituentExamAppearedM,
        'Constituent Campus - Exam Appeared - Female': enrollment.constituentExamAppearedF,
        'Constituent Campus - Exam Appeared - Total': enrollment.constituentExamAppearedT,
        'Constituent Campus - Exam Passed - Male': enrollment.constituentExamPassedM,
        'Constituent Campus - Exam Passed - Female': enrollment.constituentExamPassedF,
        'Constituent Campus - Exam Passed - Total': enrollment.constituentExamPassedT,
        'Affiliated Campus - Exam Appeared - Male': enrollment.affiliatedExamAppearedM,
        'Affiliated Campus - Exam Appeared - Female': enrollment.affiliatedExamAppearedF,
        'Affiliated Campus - Exam Appeared - Total': enrollment.affiliatedExamAppearedT,
        'Affiliated Campus - Exam Passed - Male': enrollment.affiliatedExamPassedM,
        'Affiliated Campus - Exam Passed - Female': enrollment.affiliatedExamPassedF,
        'Affiliated Campus - Exam Passed - Total': enrollment.affiliatedExamPassedT,
      }));

      // Graduates Data
      const graduatesData = faculty.graduates.map((graduate, index) => ({
        'S.N.': index + 1,
        'Program': graduate.program,
        'Semester': graduate.semester,
        'Constituent Campus - Exam Appeared - Male': graduate.constituentExamAppearedM,
        'Constituent Campus - Exam Appeared - Female': graduate.constituentExamAppearedF,
        'Constituent Campus - Exam Appeared - Total': graduate.constituentExamAppearedT,
        'Constituent Campus - Exam Passed - Male': graduate.constituentExamPassedM,
        'Constituent Campus - Exam Passed - Female': graduate.constituentExamPassedF,
        'Constituent Campus - Exam Passed - Total': graduate.constituentExamPassedT,
        'Affiliated Campus - Exam Appeared - Male': graduate.affiliatedExamAppearedM,
        'Affiliated Campus - Exam Appeared - Female': graduate.affiliatedExamAppearedF,
        'Affiliated Campus - Exam Appeared - Total': graduate.affiliatedExamAppearedT,
        'Affiliated Campus - Exam Passed - Male': graduate.affiliatedExamPassedM,
        'Affiliated Campus - Exam Passed - Female': graduate.affiliatedExamPassedF,
        'Affiliated Campus - Exam Passed - Total': graduate.affiliatedExamPassedT,
      }));

      const enrollmentWS = XLSX.utils.json_to_sheet(enrollmentData);
      const graduatesWS = XLSX.utils.json_to_sheet(graduatesData);

      XLSX.utils.book_append_sheet(workbook, enrollmentWS, 'Student Enrollment');
      XLSX.utils.book_append_sheet(workbook, graduatesWS, 'Graduates Data');

      XLSX.writeFile(workbook, `${faculty.instituteName}_Student_Data_${faculty.reportingPeriod}.xlsx`);
      toast.success('Student data exported successfully');
    } catch (error) {
      toast.error('Error exporting student data');
      console.error('Export error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
                Institute/Faculty Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                {facultyData.length} faculty reports analyzed • Real-time performance metrics
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search faculties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={fetchFacultyData}
              >
                <Download className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="faculties">Faculties</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Faculties Tab */}
          <TabsContent value="faculties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Faculty Reports</CardTitle>
                <CardDescription>
                  Detailed view of all faculty submissions with comprehensive analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Institute</TableHead>
                        <TableHead>Head</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Programs</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Research</TableHead>
                        <TableHead>Pass Rate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((faculty) => {
                        const analytics = getFacultyAnalytics(faculty);
                        return (
                          <TableRow key={faculty._id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">
                              <div>
                                <p className="font-semibold">
                                  {faculty.instituteName.length > 35 
                                    ? faculty.instituteName.substring(0, 35) + '...' 
                                    : faculty.instituteName}
                                </p>
                                <p className="text-xs text-gray-500">{faculty.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{faculty.headName}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{faculty.reportingPeriod}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{faculty.academicPrograms.length}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-center">
                                <span className="font-semibold">{analytics.totalStudents.toLocaleString()}</span>
                                <div className="text-xs text-gray-500">
                                  {analytics.totalGraduates.toLocaleString()} graduates
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-center">
                                <span className="font-semibold">{analytics.totalResearch}</span>
                                <div className="text-xs text-gray-500">
                                  {faculty.collaborations.length} collabs
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={analytics.passRate >= 70 ? "default" : 
                                        analytics.passRate >= 50 ? "secondary" : "destructive"}
                              >
                                {analytics.passRate}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  faculty.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  faculty.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {faculty.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex items-center gap-2"
                                    onClick={() => setSelectedFaculty(faculty)}
                                  >
                                    <Eye className="w-4 h-4" />
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="overflow-y-auto" style={{width:"90vw",maxWidth:'98vw',height:'98vh'}}>
                                  <DialogHeader>
                                    <DialogTitle>{faculty.instituteName}</DialogTitle>
                                    <DialogDescription>
                                      Comprehensive analytics for {faculty.reportingPeriod} • Submitted on {new Date(faculty.submissionDate).toLocaleDateString()}
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedFaculty && <FacultyDetailView faculty={selectedFaculty} onExportStudentData={exportStudentDataToExcel} />}
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Individual Faculty Detail View */}
          {selectedFaculty && (
            <TabsContent value="details">
              <FacultyDetailView faculty={selectedFaculty} onExportStudentData={exportStudentDataToExcel} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

// Analytics calculations for individual faculty - FIXED
const getFacultyAnalytics = (faculty: FacultyData) => {
  // Calculate total students (appeared for exams)
  const totalStudents = faculty.studentEnrollment.reduce((sum, enrollment) => 
    sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
  
  // Calculate total graduates (passed exams)
  const totalGraduates = faculty.graduates.reduce((sum, graduate) => 
    sum + graduate.constituentExamPassedT + graduate.affiliatedExamPassedT, 0);
  
  const totalResearch = faculty.researchProjectsInitiated + faculty.researchProjectsCompleted;
  
  const totalPrograms = faculty.academicPrograms.length;
  
  const totalCollaborations = faculty.collaborations.length;

  // Calculate gender distribution for students
  const totalMaleStudents = faculty.studentEnrollment.reduce((sum, enrollment) => 
    sum + enrollment.constituentExamAppearedM + enrollment.affiliatedExamAppearedM, 0);
  
  const totalFemaleStudents = faculty.studentEnrollment.reduce((sum, enrollment) => 
    sum + enrollment.constituentExamAppearedF + enrollment.affiliatedExamAppearedF, 0);

  // Calculate gender distribution for graduates
  const totalMaleGraduates = faculty.graduates.reduce((sum, graduate) => 
    sum + graduate.constituentExamPassedM + graduate.affiliatedExamPassedM, 0);
  
  const totalFemaleGraduates = faculty.graduates.reduce((sum, graduate) => 
    sum + graduate.constituentExamPassedF + graduate.affiliatedExamPassedF, 0);

  // Calculate pass rates
  const totalAppeared = faculty.studentEnrollment.reduce((sum, enrollment) => 
    sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
  
  const totalPassed = faculty.studentEnrollment.reduce((sum, enrollment) => 
    sum + enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT, 0);
  
  const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;

  // Calculate campus distribution
  const constituentTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentExamAppearedT, 0);
  const affiliatedTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.affiliatedExamAppearedT, 0);

  return {
    totalStudents,
    totalGraduates,
    totalResearch,
    totalPrograms,
    totalCollaborations,
    passRate,
    totalAppeared,
    totalPassed,
    totalMaleStudents,
    totalFemaleStudents,
    totalMaleGraduates,
    totalFemaleGraduates,
    constituentTotal,
    affiliatedTotal
  };
};

// Faculty Detail View Component
interface FacultyDetailViewProps {
  faculty: FacultyData;
  onExportStudentData: (faculty: FacultyData) => void;
}

const FacultyDetailView: React.FC<FacultyDetailViewProps> = ({ faculty, onExportStudentData }) => {
  const analytics = getFacultyAnalytics(faculty);

  // Enhanced chart data preparations
  const getEnrollmentByProgram = () => {
    return faculty.studentEnrollment.map(enrollment => ({
      program: enrollment.program,
      constituent: enrollment.constituentExamAppearedT,
      affiliated: enrollment.affiliatedExamAppearedT,
      total: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT,
      male: enrollment.constituentExamAppearedM + enrollment.affiliatedExamAppearedM,
      female: enrollment.constituentExamAppearedF + enrollment.affiliatedExamAppearedF
    }));
  };

  const getGenderDistribution = () => {
    return [
      { name: 'Male Students', value: analytics.totalMaleStudents, color: '#4f46e5' },
      { name: 'Female Students', value: analytics.totalFemaleStudents, color: '#ec4899' },
      { name: 'Male Graduates', value: analytics.totalMaleGraduates, color: '#06b6d4' },
      { name: 'Female Graduates', value: analytics.totalFemaleGraduates, color: '#f59e0b' }
    ];
  };

  const getPassRateByProgram = () => {
    return faculty.studentEnrollment.map(enrollment => {
      const totalAppeared = enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT;
      const totalPassed = enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT;
      const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;
      
      return {
        program: enrollment.program,
        appeared: totalAppeared,
        passed: totalPassed,
        passRate,
        level: enrollment.level
      };
    });
  };

  const getCampusDistribution = () => {
    const total = analytics.constituentTotal + analytics.affiliatedTotal;
    
    return [
      { name: 'Constituent Campus', value: analytics.constituentTotal, percentage: total > 0 ? Math.round((analytics.constituentTotal / total) * 100) : 0, color: '#10b981' },
      { name: 'Affiliated Campus', value: analytics.affiliatedTotal, percentage: total > 0 ? Math.round((analytics.affiliatedTotal / total) * 100) : 0, color: '#f59e0b' }
    ];
  };

  const getProgramTypes = () => {
    const types: { [key: string]: number } = {};
    faculty.academicPrograms.forEach(program => {
      types[program.programType] = (types[program.programType] || 0) + 1;
    });
    return Object.entries(types).map(([type, count]) => ({ type, count }));
  };

  const getLevelDistribution = () => {
    const levels: { [key: string]: number } = {};
    faculty.academicPrograms.forEach(program => {
      levels[program.level] = (levels[program.level] || 0) + 1;
    });
    return Object.entries(levels).map(([level, count]) => ({ level, count }));
  };

  const getResearchProgress = () => {
    return [
      { name: 'Initiated', value: faculty.researchProjectsInitiated, color: '#4f46e5' },
      { name: 'Completed', value: faculty.researchProjectsCompleted, color: '#10b981' }
    ];
  };

  const getGraduatesTrend = () => {
    return faculty.graduates.map((graduate, index) => ({
      semester: graduate.semester,
      graduates: graduate.constituentExamPassedT + graduate.affiliatedExamPassedT,
      program: graduate.program,
      male: graduate.constituentExamPassedM + graduate.affiliatedExamPassedM,
      female: graduate.constituentExamPassedF + graduate.affiliatedExamPassedF
    }));
  };

  const getStudentPerformance = () => {
    return faculty.studentEnrollment.map(enrollment => ({
      program: enrollment.program,
      appeared: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT,
      passed: enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT,
      passRate: ((enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT) / 
                (enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT) * 100) || 0
    }));
  };

  const getGraduatesByProgram = () => {
    const programMap: { [key: string]: { total: number, male: number, female: number } } = {};
    faculty.graduates.forEach(graduate => {
      if (!programMap[graduate.program]) {
        programMap[graduate.program] = { total: 0, male: 0, female: 0 };
      }
      programMap[graduate.program].total += graduate.constituentExamPassedT + graduate.affiliatedExamPassedT;
      programMap[graduate.program].male += graduate.constituentExamPassedM + graduate.affiliatedExamPassedM;
      programMap[graduate.program].female += graduate.constituentExamPassedF + graduate.affiliatedExamPassedF;
    });
    return Object.entries(programMap).map(([program, data]) => ({ 
      program, 
      count: data.total,
      male: data.male,
      female: data.female
    }));
  };

  const getGraduatesBySemester = () => {
    const semesterMap: { [key: string]: number } = {};
    faculty.graduates.forEach(graduate => {
      semesterMap[graduate.semester] = (semesterMap[graduate.semester] || 0) + 
        (graduate.constituentExamPassedT + graduate.affiliatedExamPassedT);
    });
    return Object.entries(semesterMap).map(([semester, count]) => ({ semester, count }));
  };

  const getProgramWiseGenderDistribution = () => {
    return faculty.studentEnrollment.map(enrollment => ({
      program: enrollment.program,
      male: enrollment.constituentExamAppearedM + enrollment.affiliatedExamAppearedM,
      female: enrollment.constituentExamAppearedF + enrollment.affiliatedExamAppearedF,
      total: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT
    }));
  };

  const getSuccessRateByLevel = () => {
    const levelMap: { [key: string]: { appeared: number, passed: number } } = {};
    faculty.studentEnrollment.forEach(enrollment => {
      if (!levelMap[enrollment.level]) {
        levelMap[enrollment.level] = { appeared: 0, passed: 0 };
      }
      levelMap[enrollment.level].appeared += enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT;
      levelMap[enrollment.level].passed += enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT;
    });
    
    return Object.entries(levelMap).map(([level, data]) => ({
      level,
      appeared: data.appeared,
      passed: data.passed,
      successRate: data.appeared > 0 ? Math.round((data.passed / data.appeared) * 100) : 0
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with Export Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{faculty.instituteName}</h2>
          <p className="text-gray-600">Reporting Period: {faculty.reportingPeriod}</p>
        </div>
        <Button 
          onClick={() => onExportStudentData(faculty)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          <Download className="w-4 h-4" />
          Export Student Data
        </Button>
      </div>

      {/* Enhanced Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Total Students</p>
                <p className="text-2xl font-bold text-blue-700">{analytics.totalStudents.toLocaleString()}</p>
                <p className="text-xs text-blue-600">
                  {analytics.totalMaleStudents.toLocaleString()}M • {analytics.totalFemaleStudents.toLocaleString()}F
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">Total Graduates</p>
                <p className="text-2xl font-bold text-green-700">{analytics.totalGraduates.toLocaleString()}</p>
                <p className="text-xs text-green-600">
                  {analytics.totalMaleGraduates.toLocaleString()}M • {analytics.totalFemaleGraduates.toLocaleString()}F
                </p>
              </div>
              <GraduationCap className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-900">Research Projects</p>
                <p className="text-2xl font-bold text-purple-700">{analytics.totalResearch}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-900">Pass Rate</p>
                <p className="text-2xl font-bold text-orange-700">{analytics.passRate}%</p>
                <p className="text-xs text-orange-600">
                  {analytics.totalPassed.toLocaleString()}/{analytics.totalAppeared.toLocaleString()}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-900">Constituent Campus</p>
                <p className="text-2xl font-bold text-indigo-700">{analytics.constituentTotal.toLocaleString()}</p>
                <p className="text-xs text-indigo-600">
                  {Math.round((analytics.constituentTotal / analytics.totalStudents) * 100)}% of total
                </p>
              </div>
              <Building className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-900">Affiliated Campus</p>
                <p className="text-2xl font-bold text-amber-700">{analytics.affiliatedTotal.toLocaleString()}</p>
                <p className="text-xs text-amber-600">
                  {Math.round((analytics.affiliatedTotal / analytics.totalStudents) * 100)}% of total
                </p>
              </div>
              <Building2 className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="administration">Administration</TabsTrigger>
        </TabsList>

        {/* Overview Tab - COMPLETE */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Key Performance Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Academic Programs</p>
                      <p className="text-2xl font-bold text-blue-700">{faculty.academicPrograms.length}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-900">Collaborations</p>
                      <p className="text-2xl font-bold text-green-700">{faculty.collaborations.length}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-900">New Programs</p>
                      <p className="text-2xl font-bold text-purple-700">{faculty.newPrograms.filter(p => p.trim()).length}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium text-orange-900">Staff Development</p>
                      <p className="text-2xl font-bold text-orange-700">{faculty.trainings ? faculty.trainings.split(',').length : 0}</p>
                    </div>
                  </div>
                  
                  {/* Institution Info */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Institution Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        <span>{faculty.instituteName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users2 className="w-4 h-4 text-gray-500" />
                        <span>{faculty.headName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{faculty.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{faculty.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={getStudentPerformance()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="appeared" fill="#4f46e5" name="Students Appeared" />
                    <Bar yAxisId="left" dataKey="passed" fill="#10b981" name="Students Passed" />
                    <Line yAxisId="right" dataKey="passRate" stroke="#ef4444" name="Pass Rate %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Academics Tab - COMPLETE */}
        <TabsContent value="academics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Program Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Program Types Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getProgramTypes()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, count }) => `${type}: ${count}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {getProgramTypes().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Level Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="w-5 h-5" />
                  Program Levels Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getLevelDistribution()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#7c3aed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Academic Programs List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookText className="w-5 h-5" />
                  Academic Programs Details
                </CardTitle>
                <CardDescription>{faculty.academicPrograms.length} programs offered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {faculty.academicPrograms.map((program, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{program.programName}</h4>
                        <div className="flex gap-2">
                          <Badge variant="outline">{program.level}</Badge>
                          <Badge variant="secondary">{program.programType}</Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Specializations:</p>
                        <div className="flex flex-wrap gap-1">
                          {program.specializationAreas.map((area, areaIndex) => (
                            <Badge key={areaIndex} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Curriculum & Innovations */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Curriculum Updates & Innovations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {faculty.curriculumUpdates && (
                    <div>
                      <h4 className="font-semibold mb-2">Curriculum Updates</h4>
                      <div className="p-3 bg-blue-50 rounded-lg text-sm">
                        {faculty.curriculumUpdates}
                      </div>
                    </div>
                  )}
                  {faculty.teachingInnovations && (
                    <div>
                      <h4 className="font-semibold mb-2">Teaching Innovations</h4>
                      <div className="p-3 bg-green-50 rounded-lg text-sm">
                        {faculty.teachingInnovations}
                      </div>
                    </div>
                  )}
                  {faculty.digitalTools && (
                    <div>
                      <h4 className="font-semibold mb-2">Digital Tools</h4>
                      <div className="p-3 bg-purple-50 rounded-lg text-sm">
                        {faculty.digitalTools}
                      </div>
                    </div>
                  )}
                  {faculty.academicChallenges && (
                    <div>
                      <h4 className="font-semibold mb-2">Academic Challenges</h4>
                      <div className="p-3 bg-orange-50 rounded-lg text-sm">
                        {faculty.academicChallenges}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Students Tab - ENHANCED */}
        <TabsContent value="students" className="space-y-6">
          {/* Summary Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Student & Graduate Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-700">{analytics.totalMaleStudents.toLocaleString()}</p>
                  <p className="text-sm text-blue-600">Male Students</p>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <p className="text-2xl font-bold text-pink-700">{analytics.totalFemaleStudents.toLocaleString()}</p>
                  <p className="text-sm text-pink-600">Female Students</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-700">{analytics.totalMaleGraduates.toLocaleString()}</p>
                  <p className="text-sm text-green-600">Male Graduates</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-700">{analytics.totalFemaleGraduates.toLocaleString()}</p>
                  <p className="text-sm text-orange-600">Female Graduates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gender Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getGenderDistribution()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getGenderDistribution().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Campus Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Campus Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getCampusDistribution()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getCampusDistribution().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Student Enrollment Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Student Enrollment Analysis
              </CardTitle>
              <CardDescription>
                Program-wise enrollment data with gender breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Enrollment by Program */}
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getEnrollmentByProgram()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="constituent" fill="#10b981" name="Constituent Campus" />
                      <Bar dataKey="affiliated" fill="#f59e0b" name="Affiliated Campus" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Program-wise Gender Distribution */}
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getProgramWiseGenderDistribution()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" fill="#4f46e5" name="Male Students" />
                      <Bar dataKey="female" fill="#ec4899" name="Female Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Success Rate by Level */}
              <div className="mb-6">
                <h4 className="font-semibold mb-4">Success Rate by Academic Level</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getSuccessRateByLevel()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="appeared" fill="#4f46e5" name="Students Appeared" />
                    <Bar dataKey="passed" fill="#10b981" name="Students Passed" />
                    <Line type="monotone" dataKey="successRate" stroke="#ef4444" name="Success Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed Enrollment Table */}
              <div className="mt-6">
                <h4 className="font-semibold mb-4">Detailed Enrollment Data</h4>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Program</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead colSpan={3} className="text-center">Constituent Campus - Appeared</TableHead>
                        <TableHead colSpan={3} className="text-center">Constituent Campus - Passed</TableHead>
                        <TableHead colSpan={3} className="text-center">Affiliated Campus - Appeared</TableHead>
                        <TableHead colSpan={3} className="text-center">Affiliated Campus - Passed</TableHead>
                        <TableHead className="text-center">Total Students</TableHead>
                        <TableHead className="text-center">Pass Rate</TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead>M</TableHead>
                        <TableHead>F</TableHead>
                        <TableHead>T</TableHead>
                        <TableHead>M</TableHead>
                        <TableHead>F</TableHead>
                        <TableHead>T</TableHead>
                        <TableHead>M</TableHead>
                        <TableHead>F</TableHead>
                        <TableHead>T</TableHead>
                        <TableHead>M</TableHead>
                        <TableHead>F</TableHead>
                        <TableHead>T</TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {faculty.studentEnrollment.map((enrollment, index) => {
                        const totalAppeared = enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT;
                        const totalPassed = enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT;
                        const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;
                        
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{enrollment.program}</TableCell>
                            <TableCell>{enrollment.level}</TableCell>
                            <TableCell>{enrollment.constituentExamAppearedM}</TableCell>
                            <TableCell>{enrollment.constituentExamAppearedF}</TableCell>
                            <TableCell>{enrollment.constituentExamAppearedT}</TableCell>
                            <TableCell>{enrollment.constituentExamPassedM}</TableCell>
                            <TableCell>{enrollment.constituentExamPassedF}</TableCell>
                            <TableCell>{enrollment.constituentExamPassedT}</TableCell>
                            <TableCell>{enrollment.affiliatedExamAppearedM}</TableCell>
                            <TableCell>{enrollment.affiliatedExamAppearedF}</TableCell>
                            <TableCell>{enrollment.affiliatedExamAppearedT}</TableCell>
                            <TableCell>{enrollment.affiliatedExamPassedM}</TableCell>
                            <TableCell>{enrollment.affiliatedExamPassedF}</TableCell>
                            <TableCell>{enrollment.affiliatedExamPassedT}</TableCell>
                            <TableCell className="text-center font-semibold">{totalAppeared}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={passRate >= 70 ? "default" : passRate >= 50 ? "secondary" : "destructive"}>
                                {passRate}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Graduates Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Graduates Analysis
              </CardTitle>
              <CardDescription>
                Program-wise and semester-wise graduate data with gender breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Graduates by Program */}
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getGraduatesByProgram()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" fill="#4f46e5" name="Male Graduates" />
                      <Bar dataKey="female" fill="#ec4899" name="Female Graduates" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Graduates Trend */}
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getGraduatesTrend()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="semester" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="graduates" stroke="#8b5cf6" name="Total Graduates" />
                      <Line type="monotone" dataKey="male" stroke="#4f46e5" name="Male Graduates" />
                      <Line type="monotone" dataKey="female" stroke="#ec4899" name="Female Graduates" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Graduates Table */}
              <div className="mt-6">
                <h4 className="font-semibold mb-4">Detailed Graduates Data</h4>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>S.N.</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead colSpan={3} className="text-center">Constituent Campus - Appeared</TableHead>
                        <TableHead colSpan={3} className="text-center">Constituent Campus - Passed</TableHead>
                        <TableHead colSpan={3} className="text-center">Affiliated Campus - Appeared</TableHead>
                        <TableHead colSpan={3} className="text-center">Affiliated Campus - Passed</TableHead>
                        <TableHead className="text-center">Total Graduates</TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead>M</TableHead>
                        <TableHead>F</TableHead>
                        <TableHead>T</TableHead>
                        <TableHead>M</TableHead>
                        <TableHead>F</TableHead>
                        <TableHead>T</TableHead>
                        <TableHead>M</TableHead>
                        <TableHead>F</TableHead>
                        <TableHead>T</TableHead>
                        <TableHead>M</TableHead>
                        <TableHead>F</TableHead>
                        <TableHead>T</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {faculty.graduates.map((graduate, index) => {
                        const totalGraduates = graduate.constituentExamPassedT + graduate.affiliatedExamPassedT;
                        return (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{graduate.program}</TableCell>
                            <TableCell>{graduate.semester}</TableCell>
                            <TableCell>{graduate.constituentExamAppearedM}</TableCell>
                            <TableCell>{graduate.constituentExamAppearedF}</TableCell>
                            <TableCell>{graduate.constituentExamAppearedT}</TableCell>
                            <TableCell>{graduate.constituentExamPassedM}</TableCell>
                            <TableCell>{graduate.constituentExamPassedF}</TableCell>
                            <TableCell>{graduate.constituentExamPassedT}</TableCell>
                            <TableCell>{graduate.affiliatedExamAppearedM}</TableCell>
                            <TableCell>{graduate.affiliatedExamAppearedF}</TableCell>
                            <TableCell>{graduate.affiliatedExamAppearedT}</TableCell>
                            <TableCell>{graduate.affiliatedExamPassedM}</TableCell>
                            <TableCell>{graduate.affiliatedExamPassedF}</TableCell>
                            <TableCell>{graduate.affiliatedExamPassedT}</TableCell>
                            <TableCell className="text-center font-semibold">{totalGraduates}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Tab - COMPLETE */}
        <TabsContent value="research" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Research Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Research Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-700">{faculty.researchProjectsInitiated}</p>
                      <p className="text-sm text-blue-600">Initiated</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-700">{faculty.researchProjectsCompleted}</p>
                      <p className="text-sm text-green-600">Completed</p>
                    </div>
                  </div>
                  
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={getResearchProgress()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getResearchProgress().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  {faculty.researchFunding && (
                    <div>
                      <p className="font-semibold">Research Funding:</p>
                      <p className="text-sm text-gray-600">{faculty.researchFunding}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Collaborations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Collaborations & Partnerships
                </CardTitle>
                <CardDescription>{faculty.collaborations.length} active collaborations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {faculty.collaborations.map((collab, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-gray-50">
                      <p className="font-semibold text-sm">{collab.institutionName}</p>
                      <p className="text-xs text-gray-600 mt-1">{collab.objective}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Research Output */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Research Output & Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {faculty.publications && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <BookText className="w-4 h-4" />
                        Publications
                      </h4>
                      <div className="text-sm">
                        {faculty.publications}
                      </div>
                    </div>
                  )}
                  {faculty.patents && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Patents
                      </h4>
                      <div className="text-sm">
                        {faculty.patents}
                      </div>
                    </div>
                  )}
                  {faculty.conferences && (
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Users2 className="w-4 h-4" />
                        Conferences & Seminars
                      </h4>
                      <div className="text-sm">
                        {faculty.conferences}
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Research Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {faculty.facultyParticipation && (
                    <div>
                      <h4 className="font-semibold mb-2">Faculty Participation</h4>
                      <div className="p-3 bg-gray-50 rounded-lg text-sm">
                        {faculty.facultyParticipation}
                      </div>
                    </div>
                  )}
                  {faculty.studentResearch && (
                    <div>
                      <h4 className="font-semibold mb-2">Student Research</h4>
                      <div className="p-3 bg-gray-50 rounded-lg text-sm">
                        {faculty.studentResearch}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Administration Tab - COMPLETE */}
        <TabsContent value="administration" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Staff Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users2 className="w-5 h-5" />
                  Staff Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faculty.academicStaff && (
                  <div>
                    <label className="font-semibold text-sm">Academic Staff:</label>
                    <p className="text-sm">{faculty.academicStaff}</p>
                  </div>
                )}
                {faculty.adminStaff && (
                  <div>
                    <label className="font-semibold text-sm">Administrative Staff:</label>
                    <p className="text-sm">{faculty.adminStaff}</p>
                  </div>
                )}
                {faculty.newRecruitments && (
                  <div>
                    <label className="font-semibold text-sm">New Recruitments:</label>
                    <p className="text-sm">{faculty.newRecruitments}</p>
                  </div>
                )}
                {faculty.trainings && (
                  <div>
                    <label className="font-semibold text-sm">Staff Trainings:</label>
                    <p className="text-sm">{faculty.trainings}</p>
                  </div>
                )}
                {faculty.promotions && (
                  <div>
                    <label className="font-semibold text-sm">Promotions:</label>
                    <p className="text-sm">{faculty.promotions}</p>
                  </div>
                )}
                {faculty.retirements && (
                  <div>
                    <label className="font-semibold text-sm">Retirements:</label>
                    <p className="text-sm">{faculty.retirements}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Infrastructure & Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Infrastructure & Facilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faculty.infrastructureAdditions && (
                  <div>
                    <label className="font-semibold text-sm">Infrastructure Additions:</label>
                    <p className="text-sm">{faculty.infrastructureAdditions}</p>
                  </div>
                )}
                {faculty.equipmentProcured && (
                  <div>
                    <label className="font-semibold text-sm">Equipment Procured:</label>
                    <p className="text-sm">{faculty.equipmentProcured}</p>
                  </div>
                )}
                {faculty.newFacilities && (
                  <div>
                    <label className="font-semibold text-sm">New Facilities:</label>
                    <p className="text-sm">{faculty.newFacilities}</p>
                  </div>
                )}
                {faculty.constructionStatus && (
                  <div>
                    <label className="font-semibold text-sm">Construction Status:</label>
                    <p className="text-sm">{faculty.constructionStatus}</p>
                  </div>
                )}
                {faculty.infrastructureChallenges && (
                  <div>
                    <label className="font-semibold text-sm">Infrastructure Challenges:</label>
                    <p className="text-sm">{faculty.infrastructureChallenges}</p>
                  </div>
                )}
                {faculty.accessibilityMeasures && (
                  <div>
                    <label className="font-semibold text-sm">Accessibility Measures:</label>
                    <p className="text-sm">{faculty.accessibilityMeasures}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faculty.budgetAllocated && (
                  <div>
                    <label className="font-semibold text-sm">Budget Allocated:</label>
                    <p className="text-sm">{faculty.budgetAllocated}</p>
                  </div>
                )}
                {faculty.actualExpenditure && (
                  <div>
                    <label className="font-semibold text-sm">Actual Expenditure:</label>
                    <p className="text-sm">{faculty.actualExpenditure}</p>
                  </div>
                )}
                {faculty.revenueGenerated && (
                  <div>
                    <label className="font-semibold text-sm">Revenue Generated:</label>
                    <p className="text-sm">{faculty.revenueGenerated}</p>
                  </div>
                )}
                {faculty.financialChallenges && (
                  <div>
                    <label className="font-semibold text-sm">Financial Challenges:</label>
                    <p className="text-sm">{faculty.financialChallenges}</p>
                  </div>
                )}
                {faculty.auditStatus && (
                  <div>
                    <label className="font-semibold text-sm">Audit Status:</label>
                    <p className="text-sm">{faculty.auditStatus}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Governance & Policies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Governance & Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faculty.meetingsHeld && (
                  <div>
                    <label className="font-semibold text-sm">Meetings Held:</label>
                    <p className="text-sm">{faculty.meetingsHeld}</p>
                  </div>
                )}
                {faculty.keyDecisions && (
                  <div>
                    <label className="font-semibold text-sm">Key Decisions:</label>
                    <p className="text-sm">{faculty.keyDecisions}</p>
                  </div>
                )}
                {faculty.policyUpdates && (
                  <div>
                    <label className="font-semibold text-sm">Policy Updates:</label>
                    <p className="text-sm">{faculty.policyUpdates}</p>
                  </div>
                )}
                {faculty.grievanceHandling && (
                  <div>
                    <label className="font-semibold text-sm">Grievance Handling:</label>
                    <p className="text-sm">{faculty.grievanceHandling}</p>
                  </div>
                )}
                {faculty.transparencyInitiatives && (
                  <div>
                    <label className="font-semibold text-sm">Transparency Initiatives:</label>
                    <p className="text-sm">{faculty.transparencyInitiatives}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Student Support & Community */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5" />
                  Student Support & Community Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {faculty.scholarships && (
                      <div>
                        <label className="font-semibold text-sm">Scholarships:</label>
                        <p className="text-sm">{faculty.scholarships}</p>
                      </div>
                    )}
                    {faculty.careerCounseling && (
                      <div>
                        <label className="font-semibold text-sm">Career Counseling:</label>
                        <p className="text-sm">{faculty.careerCounseling}</p>
                      </div>
                    )}
                    {faculty.extracurricular && (
                      <div>
                        <label className="font-semibold text-sm">Extracurricular Activities:</label>
                        <p className="text-sm">{faculty.extracurricular}</p>
                      </div>
                    )}
                    {faculty.alumniEngagement && (
                      <div>
                        <label className="font-semibold text-sm">Alumni Engagement:</label>
                        <p className="text-sm">{faculty.alumniEngagement}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {faculty.studentAchievements && (
                      <div>
                        <label className="font-semibold text-sm">Student Achievements:</label>
                        <p className="text-sm">{faculty.studentAchievements}</p>
                      </div>
                    )}
                    {faculty.outreachPrograms && (
                      <div>
                        <label className="font-semibold text-sm">Outreach Programs:</label>
                        <p className="text-sm">{faculty.outreachPrograms}</p>
                      </div>
                    )}
                    {faculty.communityCollaborations && (
                      <div>
                        <label className="font-semibold text-sm">Community Collaborations:</label>
                        <p className="text-sm">{faculty.communityCollaborations}</p>
                      </div>
                    )}
                    {faculty.socialResponsibility && (
                      <div>
                        <label className="font-semibold text-sm">Social Responsibility:</label>
                        <p className="text-sm">{faculty.socialResponsibility}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Future Plans & Challenges */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TargetIcon className="w-5 h-5" />
                  Future Plans & Institutional Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {faculty.continuingEducation && (
                      <div>
                        <label className="font-semibold text-sm">Continuing Education:</label>
                        <p className="text-sm">{faculty.continuingEducation}</p>
                      </div>
                    )}
                    {faculty.awards && (
                      <div>
                        <label className="font-semibold text-sm">Awards & Recognition:</label>
                        <p className="text-sm">{faculty.awards}</p>
                      </div>
                    )}
                    {faculty.successStories && (
                      <div>
                        <label className="font-semibold text-sm">Success Stories:</label>
                        <p className="text-sm">{faculty.successStories}</p>
                      </div>
                    )}
                    {faculty.reputationContributions && (
                      <div>
                        <label className="font-semibold text-sm">Reputation Contributions:</label>
                        <p className="text-sm">{faculty.reputationContributions}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {faculty.keyChallenges && (
                      <div>
                        <label className="font-semibold text-sm">Key Challenges:</label>
                        <p className="text-sm">{faculty.keyChallenges}</p>
                      </div>
                    )}
                    {faculty.strategies && (
                      <div>
                        <label className="font-semibold text-sm">Strategies:</label>
                        <p className="text-sm">{faculty.strategies}</p>
                      </div>
                    )}
                    {faculty.lessonsLearned && (
                      <div>
                        <label className="font-semibold text-sm">Lessons Learned:</label>
                        <p className="text-sm">{faculty.lessonsLearned}</p>
                      </div>
                    )}
                    {faculty.majorGoals && (
                      <div>
                        <label className="font-semibold text-sm">Major Goals:</label>
                        <p className="text-sm">{faculty.majorGoals}</p>
                      </div>
                    )}
                    {faculty.proposedProjects && (
                      <div>
                        <label className="font-semibold text-sm">Proposed Projects:</label>
                        <p className="text-sm">{faculty.proposedProjects}</p>
                      </div>
                    )}
                    {faculty.supportNeeded && (
                      <div>
                        <label className="font-semibold text-sm">Support Needed:</label>
                        <p className="text-sm">{faculty.supportNeeded}</p>
                      </div>
                    )}
                    {faculty.policyReforms && (
                      <div>
                        <label className="font-semibold text-sm">Policy Reforms:</label>
                        <p className="text-sm">{faculty.policyReforms}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminForFaculty;