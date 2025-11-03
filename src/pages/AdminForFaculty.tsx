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
//   BarChartIcon
// } from 'lucide-react';
// import { toast } from 'sonner';

// interface FacultyData {
//   _id: string;
//   instituteName: string;
//   reportingPeriod: string;
//   headName: string;
//   phone: string;
//   email: string;
//   submissionDate: string;
//   academicPrograms: string[];
//   specializationAreas: string[];
//   studentEnrollment: Array<{
//     program: string;
//     constituentCampus: number;
//     affiliatedCampus: number;
//     examAppearedM: number;
//     examAppearedF: number;
//     examAppearedT: number;
//     examPassedM: number;
//     examPassedF: number;
//     examPassedT: number;
//   }>;
//   graduates: Array<{
//     program: string;
//     semester: string;
//     constituentM: number;
//     constituentF: number;
//     constituentT: number;
//     affiliatedM: number;
//     affiliatedF: number;
//     affiliatedT: number;
//   }>;
//   researchProjectsInitiated: number;
//   researchProjectsCompleted: number;
//   collaborations: Array<{
//     institutionName: string;
//     objective: string;
//   }>;
//   // ... other fields
// }

// const COLORS = ['#4f46e5', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// const AdminForFaculty: React.FC = () => {
//   const [facultyData, setFacultyData] = useState<FacultyData[]>([]);
//   const [filteredData, setFilteredData] = useState<FacultyData[]>([]);
//   const [selectedFaculty, setSelectedFaculty] = useState<FacultyData | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     fetchFacultyData();
//   }, []);

//   useEffect(() => {
//     const filtered = facultyData.filter(faculty =>
//       faculty.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faculty.reportingPeriod.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }, [searchTerm, facultyData]);

//   const fetchFacultyData = async () => {
//     try {
//       const response = await fetch('/api/faculty-forms');
//       if (response.ok) {
//         const data = await response.json();
//         setFacultyData(data);
//         setFilteredData(data);
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       toast.error('Error fetching faculty data');
//       console.error('Error:', error);
//       // Mock data for demonstration
//       setFacultyData(mockFacultyData);
//       setFilteredData(mockFacultyData);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Analytics calculations
//   const getAnalytics = () => {
//     if (facultyData.length === 0) return null;

//     const totalStudents = facultyData.reduce((sum, faculty) => 
//       sum + faculty.studentEnrollment.reduce((enrollSum, enrollment) => 
//         enrollSum + enrollment.examAppearedT, 0), 0);

//     const totalGraduates = facultyData.reduce((sum, faculty) => 
//       sum + faculty.graduates.reduce((gradSum, grad) => 
//         gradSum + grad.constituentT + grad.affiliatedT, 0), 0);

//     const totalResearchProjects = facultyData.reduce((sum, faculty) => 
//       sum + faculty.researchProjectsInitiated + faculty.researchProjectsCompleted, 0);

//     const totalCollaborations = facultyData.reduce((sum, faculty) => 
//       sum + faculty.collaborations.length, 0);

//     return {
//       totalFaculties: facultyData.length,
//       totalStudents,
//       totalGraduates,
//       totalResearchProjects,
//       totalCollaborations,
//       averageStudentsPerFaculty: Math.round(totalStudents / facultyData.length),
//     };
//   };

//   // Chart data preparations
//   const getEnrollmentByProgram = () => {
//     const programData: { [key: string]: number } = {};
//     facultyData.forEach(faculty => {
//       faculty.studentEnrollment.forEach(enrollment => {
//         if (enrollment.program) {
//           programData[enrollment.program] = (programData[enrollment.program] || 0) + enrollment.examAppearedT;
//         }
//       });
//     });
//     return Object.entries(programData).map(([program, count]) => ({ program, count }));
//   };

//   const getResearchTrends = () => {
//     return facultyData.map(faculty => ({
//       faculty: faculty.instituteName.substring(0, 20) + '...',
//       initiated: faculty.researchProjectsInitiated,
//       completed: faculty.researchProjectsCompleted,
//       total: faculty.researchProjectsInitiated + faculty.researchProjectsCompleted
//     }));
//   };

//   const getGenderDistribution = () => {
//     let totalMale = 0, totalFemale = 0;
//     facultyData.forEach(faculty => {
//       faculty.studentEnrollment.forEach(enrollment => {
//         totalMale += enrollment.examAppearedM;
//         totalFemale += enrollment.examAppearedF;
//       });
//     });
//     return [
//       { name: 'Male', value: totalMale, percentage: Math.round((totalMale / (totalMale + totalFemale)) * 100) },
//       { name: 'Female', value: totalFemale, percentage: Math.round((totalFemale / (totalMale + totalFemale)) * 100) }
//     ];
//   };

//   const getPassRateAnalysis = () => {
//     return facultyData.map(faculty => {
//       const totalAppeared = faculty.studentEnrollment.reduce((sum, e) => sum + e.examAppearedT, 0);
//       const totalPassed = faculty.studentEnrollment.reduce((sum, e) => sum + e.examPassedT, 0);
//       const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;
      
//       return {
//         faculty: faculty.instituteName.substring(0, 15) + '...',
//         appeared: totalAppeared,
//         passed: totalPassed,
//         passRate
//       };
//     });
//   };

//   const analytics = getAnalytics();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                 <BarChart3 className="w-8 h-8 text-indigo-600" />
//                 Faculty Analytics Dashboard
//               </h1>
//               <p className="text-gray-600 mt-2">Comprehensive overview of faculty performance and metrics</p>
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
//               <Button variant="outline" className="flex items-center gap-2">
//                 <Download className="w-4 h-4" />
//                 Export
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Analytics Overview Cards */}
//         {analytics && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//             <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-blue-100">Total Faculties</p>
//                     <p className="text-3xl font-bold">{analytics.totalFaculties}</p>
//                   </div>
//                   <Building className="w-8 h-8 text-blue-200" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-green-100">Total Students</p>
//                     <p className="text-3xl font-bold">{analytics.totalStudents.toLocaleString()}</p>
//                   </div>
//                   <Users className="w-8 h-8 text-green-200" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-purple-100">Total Graduates</p>
//                     <p className="text-3xl font-bold">{analytics.totalGraduates.toLocaleString()}</p>
//                   </div>
//                   <Award className="w-8 h-8 text-purple-200" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-orange-100">Research Projects</p>
//                     <p className="text-3xl font-bold">{analytics.totalResearchProjects}</p>
//                   </div>
//                   <BookOpen className="w-8 h-8 text-orange-200" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-teal-100">Collaborations</p>
//                     <p className="text-3xl font-bold">{analytics.totalCollaborations}</p>
//                   </div>
//                   <Target className="w-8 h-8 text-teal-200" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-indigo-100">Avg Students/Faculty</p>
//                     <p className="text-3xl font-bold">{analytics.averageStudentsPerFaculty}</p>
//                   </div>
//                   <TrendingUp className="w-8 h-8 text-indigo-200" />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Main Content Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//             <TabsTrigger value="research">Research</TabsTrigger>
//             <TabsTrigger value="students">Students</TabsTrigger>
//             <TabsTrigger value="performance">Performance</TabsTrigger>
//             <TabsTrigger value="data">Faculty Data</TabsTrigger>
//           </TabsList>

//           {/* Overview Tab */}
//           <TabsContent value="overview" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Enrollment by Program */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <BarChartIcon className="w-5 h-5" />
//                     Student Enrollment by Program
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={getEnrollmentByProgram()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="count" fill="#4f46e5" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>

//               {/* Gender Distribution */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <PieChartIcon className="w-5 h-5" />
//                     Gender Distribution
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={getGenderDistribution()}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, percentage }) => `${name}: ${percentage}%`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {getGenderDistribution().map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Analytics Tab */}
//           <TabsContent value="analytics" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Pass Rate Analysis */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <LineChartIcon className="w-5 h-5" />
//                     Pass Rate Analysis
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={350}>
//                     <ComposedChart data={getPassRateAnalysis()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="faculty" angle={-45} textAnchor="end" height={80} />
//                       <YAxis yAxisId="left" />
//                       <YAxis yAxisId="right" orientation="right" />
//                       <Tooltip />
//                       <Legend />
//                       <Bar yAxisId="left" dataKey="appeared" fill="#8884d8" name="Students Appeared" />
//                       <Bar yAxisId="left" dataKey="passed" fill="#82ca9d" name="Students Passed" />
//                       <Line yAxisId="right" type="monotone" dataKey="passRate" stroke="#ff7300" strokeWidth={3} name="Pass Rate %" />
//                     </ComposedChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>

//               {/* Research Trends */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <TrendingUp className="w-5 h-5" />
//                     Research Project Trends
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={350}>
//                     <AreaChart data={getResearchTrends()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="faculty" angle={-45} textAnchor="end" height={80} />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Area type="monotone" dataKey="initiated" stackId="1" stroke="#8884d8" fill="#8884d8" name="Initiated" />
//                       <Area type="monotone" dataKey="completed" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Completed" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Research Tab */}
//           <TabsContent value="research" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Research Performance Overview</CardTitle>
//                 <CardDescription>Detailed analysis of research activities across faculties</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={400}>
//                   <RadarChart data={getResearchTrends().slice(0, 6)}>
//                     <PolarGrid />
//                     <PolarAngleAxis dataKey="faculty" />
//                     <PolarRadiusAxis />
//                     <Radar name="Initiated" dataKey="initiated" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//                     <Radar name="Completed" dataKey="completed" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
//                     <Legend />
//                   </RadarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Students Tab */}
//           <TabsContent value="students" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Student Enrollment Trends</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={getEnrollmentByProgram()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="program" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Campus-wise Distribution</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {facultyData.slice(0, 5).map((faculty, index) => {
//                       const totalConstituent = faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentCampus, 0);
//                       const totalAffiliated = faculty.studentEnrollment.reduce((sum, e) => sum + e.affiliatedCampus, 0);
//                       const total = totalConstituent + totalAffiliated;
                      
//                       return (
//                         <div key={index} className="space-y-2">
//                           <div className="flex justify-between text-sm">
//                             <span>{faculty.instituteName.substring(0, 30)}...</span>
//                             <span>{total} students</span>
//                           </div>
//                           <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
//                             <div 
//                               className="bg-blue-500" 
//                               style={{ width: `${(totalConstituent / total) * 100}%` }}
//                             ></div>
//                             <div 
//                               className="bg-green-500" 
//                               style={{ width: `${(totalAffiliated / total) * 100}%` }}
//                             ></div>
//                           </div>
//                           <div className="flex justify-between text-xs text-gray-500">
//                             <span>Constituent: {totalConstituent}</span>
//                             <span>Affiliated: {totalAffiliated}</span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Performance Tab */}
//           <TabsContent value="performance" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Faculty Performance Metrics</CardTitle>
//                 <CardDescription>Comprehensive performance analysis</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                   {facultyData.slice(0, 4).map((faculty, index) => (
//                     <Card key={index} className="bg-gradient-to-r from-indigo-50 to-blue-50">
//                       <CardContent className="p-4">
//                         <h4 className="font-semibold text-sm mb-2">{faculty.instituteName.substring(0, 20)}...</h4>
//                         <div className="space-y-2 text-xs">
//                           <div className="flex justify-between">
//                             <span>Students:</span>
//                             <span className="font-semibold">
//                               {faculty.studentEnrollment.reduce((sum, e) => sum + e.examAppearedT, 0)}
//                             </span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span>Research:</span>
//                             <span className="font-semibold">
//                               {faculty.researchProjectsInitiated + faculty.researchProjectsCompleted}
//                             </span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span>Programs:</span>
//                             <span className="font-semibold">{faculty.academicPrograms.length}</span>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
                
//                 <ResponsiveContainer width="100%" height={400}>
//                   <BarChart data={getPassRateAnalysis()}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="faculty" angle={-45} textAnchor="end" height={80} />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="passRate" fill="#4f46e5" name="Pass Rate %" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Faculty Data Table Tab */}
//           <TabsContent value="data" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <FileText className="w-5 h-5" />
//                   Faculty Data Records
//                 </CardTitle>
//                 <CardDescription>
//                   Detailed view of all faculty submissions with action buttons
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="rounded-lg border overflow-hidden">
//                   <Table>
//                     <TableHeader>
//                       <TableRow className="bg-gray-50">
//                         <TableHead>Institute Name</TableHead>
//                         <TableHead>Head/Coordinator</TableHead>
//                         <TableHead>Reporting Period</TableHead>
//                         <TableHead>Students</TableHead>
//                         <TableHead>Research Projects</TableHead>
//                         <TableHead>Submission Date</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead>Actions</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {filteredData.map((faculty, index) => {
//                         const totalStudents = faculty.studentEnrollment.reduce((sum, e) => sum + e.examAppearedT, 0);
//                         const totalResearch = faculty.researchProjectsInitiated + faculty.researchProjectsCompleted;
                        
//                         return (
//                           <TableRow key={faculty._id || index} className="hover:bg-gray-50">
//                             <TableCell className="font-medium">
//                               {faculty.instituteName.length > 30 
//                                 ? faculty.instituteName.substring(0, 30) + '...' 
//                                 : faculty.instituteName}
//                             </TableCell>
//                             <TableCell>{faculty.headName}</TableCell>
//                             <TableCell>{faculty.reportingPeriod}</TableCell>
//                             <TableCell>
//                               <Badge variant="secondary">{totalStudents.toLocaleString()}</Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Badge variant="outline">{totalResearch}</Badge>
//                             </TableCell>
//                             <TableCell>{new Date(faculty.submissionDate).toLocaleDateString()}</TableCell>
//                             <TableCell>
//                               <Badge className="bg-green-100 text-green-800">Submitted</Badge>
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
//                                     View Details
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//                                   <DialogHeader>
//                                     <DialogTitle>{faculty.instituteName}</DialogTitle>
//                                     <DialogDescription>
//                                       Detailed faculty report for {faculty.reportingPeriod}
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
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// // Faculty Detail View Component
// const FacultyDetailView: React.FC<{ faculty: FacultyData }> = ({ faculty }) => {
//   return (
//     <div className="space-y-6">
//       <Tabs defaultValue="general" className="w-full">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="general">General</TabsTrigger>
//           <TabsTrigger value="academic">Academic</TabsTrigger>
//           <TabsTrigger value="research">Research</TabsTrigger>
//           <TabsTrigger value="analytics">Analytics</TabsTrigger>
//         </TabsList>

//         <TabsContent value="general" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>General Information</CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="font-semibold">Institute Name:</label>
//                 <p>{faculty.instituteName}</p>
//               </div>
//               <div>
//                 <label className="font-semibold">Head/Coordinator:</label>
//                 <p>{faculty.headName}</p>
//               </div>
//               <div>
//                 <label className="font-semibold">Reporting Period:</label>
//                 <p>{faculty.reportingPeriod}</p>
//               </div>
//               <div>
//                 <label className="font-semibold">Contact:</label>
//                 <p>{faculty.email}</p>
//                 <p>{faculty.phone}</p>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="academic" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Academic Programs</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <label className="font-semibold">Programs Offered:</label>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {faculty.academicPrograms.map((program, index) => (
//                       <Badge key={index} variant="secondary">{program}</Badge>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="font-semibold">Specialization Areas:</label>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {faculty.specializationAreas.map((area, index) => (
//                       <Badge key={index} variant="outline">{area}</Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Student Enrollment</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Program</TableHead>
//                     <TableHead>Appeared</TableHead>
//                     <TableHead>Passed</TableHead>
//                     <TableHead>Pass Rate</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {faculty.studentEnrollment.map((enrollment, index) => {
//                     const passRate = enrollment.examAppearedT > 0 
//                       ? Math.round((enrollment.examPassedT / enrollment.examAppearedT) * 100) 
//                       : 0;
//                     return (
//                       <TableRow key={index}>
//                         <TableCell>{enrollment.program}</TableCell>
//                         <TableCell>{enrollment.examAppearedT}</TableCell>
//                         <TableCell>{enrollment.examPassedT}</TableCell>
//                         <TableCell>
//                           <Badge variant={passRate >= 70 ? "default" : "destructive"}>
//                             {passRate}%
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="research" className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Research Projects</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>Initiated:</span>
//                     <Badge>{faculty.researchProjectsInitiated}</Badge>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Completed:</span>
//                     <Badge variant="secondary">{faculty.researchProjectsCompleted}</Badge>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Collaborations</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   {faculty.collaborations.map((collab, index) => (
//                     <div key={index} className="p-2 bg-gray-50 rounded">
//                       <p className="font-semibold text-sm">{collab.institutionName}</p>
//                       <p className="text-xs text-gray-600">{collab.objective}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="analytics" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Performance Analytics</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={[
//                   { name: 'Students', value: faculty.studentEnrollment.reduce((sum, e) => sum + e.examAppearedT, 0) },
//                   { name: 'Graduates', value: faculty.graduates.reduce((sum, g) => sum + g.constituentT + g.affiliatedT, 0) },
//                   { name: 'Research Projects', value: faculty.researchProjectsInitiated + faculty.researchProjectsCompleted },
//                   { name: 'Collaborations', value: faculty.collaborations.length },
//                   { name: 'Programs', value: faculty.academicPrograms.length }
//                 ]}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#4f46e5" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// // Mock data for demonstration
// const mockFacultyData: FacultyData[] = [
//   {
//     _id: '1',
//     instituteName: 'Faculty of Computer Science and Engineering',
//     reportingPeriod: '2023-2024',
//     headName: 'Dr. John Smith',
//     phone: '+1-234-567-8900',
//     email: 'john.smith@university.edu',
//     submissionDate: '2024-03-15',
//     academicPrograms: ['Bachelor of Computer Science', 'Master of Software Engineering', 'PhD in Computer Science'],
//     specializationAreas: ['Artificial Intelligence', 'Software Engineering', 'Data Science'],
//     studentEnrollment: [
//       {
//         program: 'Bachelor CS',
//         constituentCampus: 150,
//         affiliatedCampus: 80,
//         examAppearedM: 120,
//         examAppearedF: 110,
//         examAppearedT: 230,
//         examPassedM: 108,
//         examPassedF: 102,
//         examPassedT: 210
//       }
//     ],
//     graduates: [
//       {
//         program: 'Bachelor CS',
//         semester: 'Spring 2024',
//         constituentM: 45,
//         constituentF: 35,
//         constituentT: 80,
//         affiliatedM: 25,
//         affiliatedF: 20,
//         affiliatedT: 45
//       }
//     ],
//     researchProjectsInitiated: 15,
//     researchProjectsCompleted: 12,
//     collaborations: [
//       {
//         institutionName: 'MIT Technology Institute',
//         objective: 'AI Research Collaboration'
//       },
//       {
//         institutionName: 'Stanford University',
//         objective: 'Data Science Partnership'
//       }
//     ]
//   },
//   // Add more mock data as needed...
// ];

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
//   PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, ScatterChart, Scatter
// } from 'recharts';
// import { 
//   Eye, Search, Download, Filter, TrendingUp, Users, BookOpen, 
//   Award, DollarSign, Building, Calendar, Target, FileText,
//   BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
//   BarChartIcon, GraduationCap, Cpu, Network, UserCheck
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
//   const [activeTab, setActiveTab] = useState('overview');

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
//       const response =  await axios.get('http://localhost:4000/api/faculty-forms', {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log(response,"response value")

//       if (response.ok) {
//         const data = await response;
//         setFacultyData(data.data || []);
//         setFilteredData(data.data || []);
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

//   // Analytics calculations for individual faculty
//   const getFacultyAnalytics = (faculty: FacultyData) => {
//     const totalStudents = faculty.studentEnrollment.reduce((sum, enrollment) => 
//       sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
    
//     const totalGraduates = faculty.graduates.reduce((sum, graduate) => 
//       sum + graduate.constituentExamPassedT + graduate.affiliatedExamPassedT, 0);
    
//     const totalResearch = faculty.researchProjectsInitiated + faculty.researchProjectsCompleted;
    
//     const totalPrograms = faculty.academicPrograms.length;
    
//     const totalCollaborations = faculty.collaborations.length;

//     // Calculate pass rates
//     const totalAppeared = faculty.studentEnrollment.reduce((sum, enrollment) => 
//       sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
    
//     const totalPassed = faculty.studentEnrollment.reduce((sum, enrollment) => 
//       sum + enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT, 0);
    
//     const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;

//     return {
//       totalStudents,
//       totalGraduates,
//       totalResearch,
//       totalPrograms,
//       totalCollaborations,
//       passRate,
//       totalAppeared,
//       totalPassed
//     };
//   };

//   // Chart data preparations for individual faculty
//   const getEnrollmentByProgram = (faculty: FacultyData) => {
//     return faculty.studentEnrollment.map(enrollment => ({
//       program: enrollment.program,
//       constituent: enrollment.constituentExamAppearedT,
//       affiliated: enrollment.affiliatedExamAppearedT,
//       total: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT
//     }));
//   };

//   const getGenderDistribution = (faculty: FacultyData) => {
//     let totalMale = 0, totalFemale = 0;
//     faculty.studentEnrollment.forEach(enrollment => {
//       totalMale += enrollment.constituentExamAppearedM + enrollment.affiliatedExamAppearedM;
//       totalFemale += enrollment.constituentExamAppearedF + enrollment.affiliatedExamAppearedF;
//     });
    
//     const total = totalMale + totalFemale;
//     return [
//       { 
//         name: 'Male', 
//         value: totalMale, 
//         percentage: total > 0 ? Math.round((totalMale / total) * 100) : 0,
//         color: '#4f46e5'
//       },
//       { 
//         name: 'Female', 
//         value: totalFemale, 
//         percentage: total > 0 ? Math.round((totalFemale / total) * 100) : 0,
//         color: '#ec4899'
//       }
//     ];
//   };

//   const getPassRateByProgram = (faculty: FacultyData) => {
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

//   const getCampusDistribution = (faculty: FacultyData) => {
//     const constituentTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentExamAppearedT, 0);
//     const affiliatedTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.affiliatedExamAppearedT, 0);
//     const total = constituentTotal + affiliatedTotal;
    
//     return [
//       { name: 'Constituent Campus', value: constituentTotal, percentage: total > 0 ? Math.round((constituentTotal / total) * 100) : 0 },
//       { name: 'Affiliated Campus', value: affiliatedTotal, percentage: total > 0 ? Math.round((affiliatedTotal / total) * 100) : 0 }
//     ];
//   };

//   const getProgramTypes = (faculty: FacultyData) => {
//     const types: { [key: string]: number } = {};
//     faculty.academicPrograms.forEach(program => {
//       types[program.programType] = (types[program.programType] || 0) + 1;
//     });
//     return Object.entries(types).map(([type, count]) => ({ type, count }));
//   };

//   const getLevelDistribution = (faculty: FacultyData) => {
//     const levels: { [key: string]: number } = {};
//     faculty.academicPrograms.forEach(program => {
//       levels[program.level] = (levels[program.level] || 0) + 1;
//     });
//     return Object.entries(levels).map(([level, count]) => ({ level, count }));
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
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                 <BarChart3 className="w-8 h-8 text-indigo-600" />
//                 Faculty Analytics Dashboard
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
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="faculties">Faculties</TabsTrigger>
//             <TabsTrigger value="academics">Academics</TabsTrigger>
//             <TabsTrigger value="research">Research</TabsTrigger>
//             <TabsTrigger value="performance">Performance</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           {/* Overview Tab */}
//           <TabsContent value="overview" className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {facultyData.slice(0, 6).map((faculty, index) => {
//                 const analytics = getFacultyAnalytics(faculty);
//                 return (
//                   <Card key={faculty._id} className="hover:shadow-lg transition-shadow cursor-pointer">
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
//                             <span className="font-semibold">{analytics.totalStudents}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <GraduationCap className="w-4 h-4 text-green-500" />
//                             <span className="font-semibold">{analytics.totalGraduates}</span>
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
//           </TabsContent>

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
//                                 <span className="font-semibold">{analytics.totalStudents}</span>
//                                 <div className="text-xs text-gray-500">
//                                   {analytics.totalGraduates} graduates
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
//                                 <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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
//             <FacultyDetailView faculty={selectedFaculty} />
//           )}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// // Faculty Detail View Component
// const FacultyDetailView: React.FC<{ faculty: FacultyData }> = ({ faculty }) => {
//   const analytics = {
//     totalStudents: faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentExamAppearedT + e.affiliatedExamAppearedT, 0),
//     totalGraduates: faculty.graduates.reduce((sum, g) => sum + g.constituentExamPassedT + g.affiliatedExamPassedT, 0),
//     totalResearch: faculty.researchProjectsInitiated + faculty.researchProjectsCompleted,
//     totalPrograms: faculty.academicPrograms.length,
//     totalCollaborations: faculty.collaborations.length,
//     passRate: (() => {
//       const totalAppeared = faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentExamAppearedT + e.affiliatedExamAppearedT, 0);
//       const totalPassed = faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentExamPassedT + e.affiliatedExamPassedT, 0);
//       return totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;
//     })()
//   };

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
//       return { program: enrollment.program, passRate, level: enrollment.level };
//     });
//   };

//   const getCampusDistribution = () => {
//     const constituent = faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentExamAppearedT, 0);
//     const affiliated = faculty.studentEnrollment.reduce((sum, e) => sum + e.affiliatedExamAppearedT, 0);
//     return [
//       { name: 'Constituent', value: constituent, color: '#10b981' },
//       { name: 'Affiliated', value: affiliated, color: '#f59e0b' }
//     ];
//   };

//   const getProgramTypes = () => {
//     const types: { [key: string]: number } = {};
//     faculty.academicPrograms.forEach(program => {
//       types[program.programType] = (types[program.programType] || 0) + 1;
//     });
//     return Object.entries(types).map(([type, count]) => ({ type, count }));
//   };

//   return (
//     <div className="space-y-6">
//       {/* Overview Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-blue-900">Total Students</p>
//                 <p className="text-2xl font-bold text-blue-700">{analytics.totalStudents}</p>
//               </div>
//               <Users className="w-8 h-8 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-green-50 to-green-100">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-green-900">Total Graduates</p>
//                 <p className="text-2xl font-bold text-green-700">{analytics.totalGraduates}</p>
//               </div>
//               <GraduationCap className="w-8 h-8 text-green-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
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

//         <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
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

//       <Tabs defaultValue="academics" className="w-full">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="academics">Academics</TabsTrigger>
//           <TabsTrigger value="students">Students</TabsTrigger>
//           <TabsTrigger value="research">Research</TabsTrigger>
//           <TabsTrigger value="details">Details</TabsTrigger>
//         </TabsList>

//         <TabsContent value="academics" className="space-y-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Program Types */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Program Types Distribution</CardTitle>
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

//             {/* Academic Programs List */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Academic Programs</CardTitle>
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
//           </div>
//         </TabsContent>

//         <TabsContent value="students" className="space-y-4">
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
//                       label={({ name, value }) => `${name}: ${value}`}
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
//                       label={({ name, value }) => `${name}: ${value}`}
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
//           </div>
//         </TabsContent>

//         <TabsContent value="research" className="space-y-4">
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
//                 <CardTitle>Collaborations & Partnerships</CardTitle>
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

//             {/* Publications & Conferences */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle>Research Output</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {faculty.publications && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Publications</h4>
//                       <div className="p-3 bg-gray-50 rounded-lg text-sm">
//                         {faculty.publications}
//                       </div>
//                     </div>
//                   )}
//                   {faculty.conferences && (
//                     <div>
//                       <h4 className="font-semibold mb-2">Conferences & Seminars</h4>
//                       <div className="p-3 bg-gray-50 rounded-lg text-sm">
//                         {faculty.conferences}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="details" className="space-y-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* General Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>General Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="font-semibold text-sm">Institute Name:</label>
//                     <p className="text-sm">{faculty.instituteName}</p>
//                   </div>
//                   <div>
//                     <label className="font-semibold text-sm">Head/Coordinator:</label>
//                     <p className="text-sm">{faculty.headName}</p>
//                   </div>
//                   <div>
//                     <label className="font-semibold text-sm">Reporting Period:</label>
//                     <p className="text-sm">{faculty.reportingPeriod}</p>
//                   </div>
//                   <div>
//                     <label className="font-semibold text-sm">Submission Date:</label>
//                     <p className="text-sm">{new Date(faculty.submissionDate).toLocaleDateString()}</p>
//                   </div>
//                   <div className="col-span-2">
//                     <label className="font-semibold text-sm">Contact Information:</label>
//                     <p className="text-sm">{faculty.email}</p>
//                     <p className="text-sm">{faculty.phone}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Infrastructure & Facilities */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Infrastructure & Facilities</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
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
//               </CardContent>
//             </Card>

//             {/* Student Support Services */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Student Support</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 {faculty.scholarships && (
//                   <div>
//                     <label className="font-semibold text-sm">Scholarships:</label>
//                     <p className="text-sm">{faculty.scholarships}</p>
//                   </div>
//                 )}
//                 {faculty.careerCounseling && (
//                   <div>
//                     <label className="font-semibold text-sm">Career Counseling:</label>
//                     <p className="text-sm">{faculty.careerCounseling}</p>
//                   </div>
//                 )}
//                 {faculty.extracurricular && (
//                   <div>
//                     <label className="font-semibold text-sm">Extracurricular Activities:</label>
//                     <p className="text-sm">{faculty.extracurricular}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Future Plans */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Future Plans & Goals</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 {faculty.majorGoals && (
//                   <div>
//                     <label className="font-semibold text-sm">Major Goals:</label>
//                     <p className="text-sm">{faculty.majorGoals}</p>
//                   </div>
//                 )}
//                 {faculty.proposedProjects && (
//                   <div>
//                     <label className="font-semibold text-sm">Proposed Projects:</label>
//                     <p className="text-sm">{faculty.proposedProjects}</p>
//                   </div>
//                 )}
//                 {faculty.supportNeeded && (
//                   <div>
//                     <label className="font-semibold text-sm">Support Needed:</label>
//                     <p className="text-sm">{faculty.supportNeeded}</p>
//                   </div>
//                 )}
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
  Shield, HeartHandshake,
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

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
      const response = await axios.get('http://202.70.90.11:81/api/faculty-forms', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setFacultyData(response.data.data || []);
        setFilteredData(response.data.data || []);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      toast.error('Error fetching faculty data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
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
            {/* <TabsTrigger value="overview">Overview</TabsTrigger> */}
            <TabsTrigger value="faculties">Faculties</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          {/* <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facultyData.slice(0, 6).map((faculty) => {
                const analytics = getFacultyAnalytics(faculty);
                return (
                  <Card 
                    key={faculty._id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedFaculty(faculty)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg leading-6">
                            {faculty.instituteName.length > 40 
                              ? faculty.instituteName.substring(0, 40) + '...' 
                              : faculty.instituteName}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {faculty.reportingPeriod}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{faculty.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold">{analytics.totalStudents.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-green-500" />
                            <span className="font-semibold">{analytics.totalGraduates.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-purple-500" />
                            <span className="font-semibold">{analytics.totalResearch}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Network className="w-4 h-4 text-orange-500" />
                            <span className="font-semibold">{analytics.totalCollaborations}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t">
                        <div className="flex justify-between items-center text-xs">
                          <span>Pass Rate</span>
                          <Badge variant={analytics.passRate >= 70 ? "default" : "destructive"}>
                            {analytics.passRate}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent> */}

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
                              <Dialog >
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
                                <DialogContent className="  overflow-y-auto" style={{width:"90vw",maxWidth:'98vw',height:'98vh'}}>
                                  <DialogHeader>
                                    <DialogTitle>{faculty.instituteName}</DialogTitle>
                                    <DialogDescription>
                                      Comprehensive analytics for {faculty.reportingPeriod} • Submitted on {new Date(faculty.submissionDate).toLocaleDateString()}
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedFaculty && <FacultyDetailView faculty={selectedFaculty} />}
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
              <FacultyDetailView faculty={selectedFaculty} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

// Analytics calculations for individual faculty
const getFacultyAnalytics = (faculty: FacultyData) => {

  console.log('Calculating analytics for faculty:',faculty, faculty.instituteName); 
  const totalGraduates = faculty.studentEnrollment.reduce((sum, enrollment) => 
    sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
  
  const totalStudents = faculty.graduates.reduce((sum, graduate) => 
    sum + graduate.constituentExamPassedT + graduate.affiliatedExamPassedT, 0);
  
  const totalResearch = faculty.researchProjectsInitiated + faculty.researchProjectsCompleted;
  
  const totalPrograms = faculty.academicPrograms.length;
  
  const totalCollaborations = faculty.collaborations.length;

  // Calculate pass rates
  const totalAppeared = faculty.studentEnrollment.reduce((sum, enrollment) => 
    sum + enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT, 0);
  
  const totalPassed = faculty.studentEnrollment.reduce((sum, enrollment) => 
    sum + enrollment.constituentExamPassedT + enrollment.affiliatedExamPassedT, 0);
  
  const passRate = totalAppeared > 0 ? Math.round((totalPassed / totalAppeared) * 100) : 0;

  return {
    totalStudents,
    totalGraduates,
    totalResearch,
    totalPrograms,
    totalCollaborations,
    passRate,
    totalAppeared,
    totalPassed
  };
};

// Faculty Detail View Component
const FacultyDetailView: React.FC<{ faculty: FacultyData }> = ({ faculty }) => {

  console.log("oohhhh faculty in detail view:", faculty);
  const analytics = getFacultyAnalytics(faculty);

  // Chart data preparations
  const getEnrollmentByProgram = () => {
    return faculty.studentEnrollment.map(enrollment => ({
      program: enrollment.program,
      constituent: enrollment.constituentExamAppearedT,
      affiliated: enrollment.affiliatedExamAppearedT,
      total: enrollment.constituentExamAppearedT + enrollment.affiliatedExamAppearedT
    }));
  };

  const getGenderDistribution = () => {
    let totalMale = 0, totalFemale = 0;
    faculty.studentEnrollment.forEach(enrollment => {
      totalMale += enrollment.constituentExamAppearedM + enrollment.affiliatedExamAppearedM;
      totalFemale += enrollment.constituentExamAppearedF + enrollment.affiliatedExamAppearedF;
    });
    
    return [
      { name: 'Male', value: totalMale, color: '#4f46e5' },
      { name: 'Female', value: totalFemale, color: '#ec4899' }
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
    const constituentTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.constituentExamAppearedT, 0);
    const affiliatedTotal = faculty.studentEnrollment.reduce((sum, e) => sum + e.affiliatedExamAppearedT, 0);
    const total = constituentTotal + affiliatedTotal;
    
    return [
      { name: 'Constituent Campus', value: constituentTotal, percentage: total > 0 ? Math.round((constituentTotal / total) * 100) : 0, color: '#10b981' },
      { name: 'Affiliated Campus', value: affiliatedTotal, percentage: total > 0 ? Math.round((affiliatedTotal / total) * 100) : 0, color: '#f59e0b' }
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
      program: graduate.program
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

  return (
    <div className="space-y-6 ">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Total Students</p>
                <p className="text-2xl font-bold text-blue-700">{analytics.totalStudents.toLocaleString()}</p>
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
              </div>
              <UserCheck className="w-8 h-8 text-orange-600" />
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

        {/* Overview Tab */}
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

        {/* Academics Tab */}
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

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enrollment by Program */}
            <Card>
              <CardHeader>
                <CardTitle>Student Enrollment by Program</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

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

            {/* Pass Rate by Program */}
            <Card>
              <CardHeader>
                <CardTitle>Pass Rate by Program</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getPassRateByProgram()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="passRate" fill="#4f46e5" name="Pass Rate %">
                      {getPassRateByProgram().map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.passRate >= 70 ? '#10b981' : entry.passRate >= 50 ? '#f59e0b' : '#ef4444'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
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

            {/* Graduates Trend */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Graduates Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getGraduatesTrend()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="graduates" stroke="#8b5cf6" name="Graduates" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Research Tab */}
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

        {/* Administration Tab */}
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