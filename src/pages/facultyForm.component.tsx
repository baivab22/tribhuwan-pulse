// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Plus, Minus, Save, FileText } from 'lucide-react';
// import { toast } from 'sonner';
// import './facultyForm.component.css';

// // Define interfaces for academic programs with specializations
// interface AcademicProgram {
//   level: string;
//   programName: string;
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
//   constituentM: number;
//   constituentF: number;
//   constituentT: number;
//   affiliatedM: number;
//   affiliatedF: number;
//   affiliatedT: number;
// }

// interface Collaboration {
//   institutionName: string;
//   objective: string;
// }

// const facultyFormSchema = z.object({
//   // Section 1: General Information
//   instituteName: z.string().min(1, 'Institute name is required'),
//   reportingPeriod: z.string().min(1, 'Reporting period is required'),
//   headName: z.string().min(1, 'Head/Coordinator name is required'),
//   phone: z.string().min(1, 'Phone is required'),
//   email: z.string().email('Invalid email format'),
//   submissionDate: z.string().min(1, 'Submission date is required'),

//   // Section 2: Academic Programs
//   academicPrograms: z.array(z.object({
//     level: z.string(),
//     programName: z.string(),
//     specializationAreas: z.array(z.string())
//   })).min(1, 'At least one program required'),
//   newPrograms: z.array(z.string()),
//   studentEnrollment: z.array(z.object({
//     program: z.string(),
//     level: z.string(),
//     constituentExamAppearedM: z.number(),
//     constituentExamAppearedF: z.number(),
//     constituentExamAppearedT: z.number(),
//     constituentExamPassedM: z.number(),
//     constituentExamPassedF: z.number(),
//     constituentExamPassedT: z.number(),
//     affiliatedExamAppearedM: z.number(),
//     affiliatedExamAppearedF: z.number(),
//     affiliatedExamAppearedT: z.number(),
//     affiliatedExamPassedM: z.number(),
//     affiliatedExamPassedF: z.number(),
//     affiliatedExamPassedT: z.number(),
//   })),
//   graduates: z.array(z.object({
//     program: z.string(),
//     semester: z.string(),
//     constituentM: z.number(),
//     constituentF: z.number(),
//     constituentT: z.number(),
//     affiliatedM: z.number(),
//     affiliatedF: z.number(),
//     affiliatedT: z.number(),
//   })),
//   curriculumUpdates: z.string(),
//   teachingInnovations: z.string(),
//   digitalTools: z.string(),
//   studentFeedback: z.string(),
//   academicChallenges: z.string(),

//   // Section 3: Research and Innovation
//   researchProjectsInitiated: z.number().min(0),
//   researchProjectsCompleted: z.number().min(0),
//   researchFunding: z.string(),
//   publications: z.string(),
//   patents: z.string(),
//   conferences: z.string(),
//   facultyParticipation: z.string(),
//   studentResearch: z.string(),
//   collaborations: z.array(z.object({
//     institutionName: z.string(),
//     objective: z.string(),
//   })),

//   // Section 4: Human Resources
//   academicStaff: z.string(),
//   adminStaff: z.string(),
//   newRecruitments: z.string(),
//   trainings: z.string(),
//   promotions: z.string(),
//   retirements: z.string(),
//   developmentNeeds: z.string(),

//   // Section 5: Infrastructure and Facilities
//   infrastructureAdditions: z.string(),
//   newFacilities: z.string(),
//   constructionStatus: z.string(),
//   equipmentProcured: z.string(),
//   infrastructureChallenges: z.string(),
//   accessibilityMeasures: z.string(),

//   // Section 6: Financial Status
//   budgetAllocated: z.string(),
//   actualExpenditure: z.string(),
//   revenueGenerated: z.string(),
//   financialChallenges: z.string(),
//   auditStatus: z.string(),

//   // Section 7: Governance and Management
//   meetingsHeld: z.string(),
//   keyDecisions: z.string(),
//   policyUpdates: z.string(),
//   grievanceHandling: z.string(),
//   transparencyInitiatives: z.string(),

//   // Section 8: Student Affairs and Support Services
//   scholarships: z.string(),
//   careerCounseling: z.string(),
//   extracurricular: z.string(),
//   alumniEngagement: z.string(),
//   studentAchievements: z.string(),

//   // Section 9: Community Engagement and Extension Activities
//   outreachPrograms: z.string(),
//   communityCollaborations: z.string(),
//   socialResponsibility: z.string(),
//   continuingEducation: z.string(),

//   // Section 10: Achievements and Recognition
//   awards: z.string(),
//   successStories: z.string(),
//   reputationContributions: z.string(),

//   // Section 11: Challenges and Lessons Learned
//   keyChallenges: z.string(),
//   strategies: z.string(),
//   lessonsLearned: z.string(),

//   // Section 12: Future Plans and Recommendations
//   majorGoals: z.string(),
//   proposedProjects: z.string(),
//   supportNeeded: z.string(),
//   policyReforms: z.string(),
// });

// type FacultyFormData = z.infer<typeof facultyFormSchema>;

// const FacultyForm: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('general');
//   const [academicPrograms, setAcademicPrograms] = useState<AcademicProgram[]>([{ level: '', programName: '', specializationAreas: [''] }]);
//   const [newPrograms, setNewPrograms] = useState<string[]>(['']);
//   const [studentEnrollment, setStudentEnrollment] = useState<StudentEnrollment[]>([{
//     program: '', level: '',
//     constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
//     constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
//     affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
//     affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
//   }]);
//   const [graduates, setGraduates] = useState<Graduate[]>([{
//     program: '', semester: '', constituentM: 0, constituentF: 0, constituentT: 0,
//     affiliatedM: 0, affiliatedF: 0, affiliatedT: 0
//   }]);
//   const [collaborations, setCollaborations] = useState<Collaboration[]>([{ institutionName: '', objective: '' }]);

//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FacultyFormData>({
//     resolver: zodResolver(facultyFormSchema),
//     defaultValues: {
//       academicPrograms: [{ level: '', programName: '', specializationAreas: [''] }],
//       newPrograms: [''],
//       studentEnrollment: studentEnrollment,
//       graduates: graduates,
//       collaborations: collaborations,
//       researchProjectsInitiated: 0,
//       researchProjectsCompleted: 0,
//     }
//   });

//   const addArrayField = <T,>(
//     setter: React.Dispatch<React.SetStateAction<T[]>>,
//     defaultValue: T,
//     fieldName: keyof FacultyFormData
//   ) => {
//     setter(prev => {
//       const newArray = [...prev, defaultValue];
//       setValue(fieldName, newArray as FacultyFormData[keyof FacultyFormData]);
//       return newArray;
//     });
//   };

//   const removeArrayField = <T,>(
//     setter: React.Dispatch<React.SetStateAction<T[]>>,
//     index: number,
//     fieldName: keyof FacultyFormData
//   ) => {
//     setter(prev => {
//       const newArray = prev.filter((_, i) => i !== index);
//       setValue(fieldName, newArray as FacultyFormData[keyof FacultyFormData]);
//       return newArray;
//     });
//   };

//   const addSpecializationArea = (programIndex: number) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].specializationAreas.push('');
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const removeSpecializationArea = (programIndex: number, areaIndex: number) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].specializationAreas = newPrograms[programIndex].specializationAreas.filter((_, i) => i !== areaIndex);
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const updateSpecializationArea = (programIndex: number, areaIndex: number, value: string) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].specializationAreas[areaIndex] = value;
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const onSubmit = async (data: FacultyFormData) => {
//     try {
//       const response = await fetch('/api/faculty-forms', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         toast.success('Faculty form submitted successfully!');
//       } else {
//         throw new Error('Failed to submit form');
//       }
//     } catch (error) {
//       toast.error('Error submitting form. Please try again.');
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="faculty-form-container">
//       <Card className="faculty-form-card">
//         <CardHeader className="faculty-form-header">
//           <CardTitle className="faculty-form-title">
//             <FileText className="w-8 h-8" />
//             Faculty Annual Report Form
//           </CardTitle>
//           <CardDescription>
//             Complete all sections of the annual faculty report
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="faculty-form">
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="faculty-form-tabs">
//               <TabsList className="faculty-tabs-list">
//                 <TabsTrigger value="general">General</TabsTrigger>
//                 <TabsTrigger value="academic">Academic</TabsTrigger>
//                 <TabsTrigger value="research">Research</TabsTrigger>
//                 <TabsTrigger value="hr">HR</TabsTrigger>
//                 <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
//                 <TabsTrigger value="financial">Financial</TabsTrigger>
//                 <TabsTrigger value="governance">Governance</TabsTrigger>
//                 <TabsTrigger value="student">Student Affairs</TabsTrigger>
//                 <TabsTrigger value="community">Community</TabsTrigger>
//                 <TabsTrigger value="achievements">Achievements</TabsTrigger>
//                 <TabsTrigger value="challenges">Challenges</TabsTrigger>
//                 <TabsTrigger value="future">Future Plans</TabsTrigger>
//               </TabsList>

//               {/* Section 1: General Information */}
//               <TabsContent value="general" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 1: General Information</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="instituteName">Name of Institute/Faculty/Department/Unit *</Label>
//                         <Input
//                           id="instituteName"
//                           {...register('instituteName')}
//                           placeholder="Enter institute name"
//                         />
//                         {errors.instituteName && (
//                           <p className="text-red-500 text-sm">{errors.instituteName.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="reportingPeriod">Year/Reporting Period *</Label>
//                         <Input
//                           id="reportingPeriod"
//                           {...register('reportingPeriod')}
//                           placeholder="e.g., 2023-2024"
//                         />
//                         {errors.reportingPeriod && (
//                           <p className="text-red-500 text-sm">{errors.reportingPeriod.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="headName">Head/Coordinator Name *</Label>
//                         <Input
//                           id="headName"
//                           {...register('headName')}
//                           placeholder="Enter head/coordinator name"
//                         />
//                         {errors.headName && (
//                           <p className="text-red-500 text-sm">{errors.headName.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="phone">Phone *</Label>
//                         <Input
//                           id="phone"
//                           {...register('phone')}
//                           placeholder="Enter phone number"
//                         />
//                         {errors.phone && (
//                           <p className="text-red-500 text-sm">{errors.phone.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="email">Email *</Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           {...register('email')}
//                           placeholder="Enter email address"
//                         />
//                         {errors.email && (
//                           <p className="text-red-500 text-sm">{errors.email.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="submissionDate">Date of Submission *</Label>
//                         <Input
//                           id="submissionDate"
//                           type="date"
//                           {...register('submissionDate')}
//                         />
//                         {errors.submissionDate && (
//                           <p className="text-red-500 text-sm">{errors.submissionDate.message}</p>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 2: Academic Programs */}
//               <TabsContent value="academic" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 2: Academic Programs</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {/* Academic Programs with Levels and Specializations */}
//                     <div>
//                       <Label>List of Academic Programs Offered with Specializations *</Label>
//                       {academicPrograms.map((program, programIndex) => (
//                         <div key={programIndex} className="border rounded-lg p-4 mt-4">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                             <div>
//                               <Label>Level *</Label>
//                               <Select
//                                 value={program.level}
//                                 onValueChange={(value) => {
//                                   const newPrograms = [...academicPrograms];
//                                   newPrograms[programIndex].level = value;
//                                   setAcademicPrograms(newPrograms);
//                                   setValue('academicPrograms', newPrograms);
//                                 }}
//                               >
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select level" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectItem value="Bachelor">Bachelor</SelectItem>
//                                   <SelectItem value="Master">Master</SelectItem>
//                                   <SelectItem value="MPhil">MPhil</SelectItem>
//                                   <SelectItem value="PhD">PhD</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                             <div>
//                               <Label>Program Name *</Label>
//                               <Input
//                                 value={program.programName}
//                                 onChange={(e) => {
//                                   const newPrograms = [...academicPrograms];
//                                   newPrograms[programIndex].programName = e.target.value;
//                                   setAcademicPrograms(newPrograms);
//                                   setValue('academicPrograms', newPrograms);
//                                 }}
//                                 placeholder="Enter program name"
//                               />
//                             </div>
//                           </div>

//                           <div>
//                             <Label>Areas of Specialization *</Label>
//                             {program.specializationAreas.map((area, areaIndex) => (
//                               <div key={areaIndex} className="flex gap-2 mt-2">
//                                 <Input
//                                   value={area}
//                                   onChange={(e) => updateSpecializationArea(programIndex, areaIndex, e.target.value)}
//                                   placeholder="Enter specialization area"
//                                 />
//                                 {program.specializationAreas.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => removeSpecializationArea(programIndex, areaIndex)}
//                                   >
//                                     <Minus className="w-4 h-4" />
//                                   </Button>
//                                 )}
//                               </div>
//                             ))}
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               className="mt-2"
//                               onClick={() => addSpecializationArea(programIndex)}
//                             >
//                               <Plus className="w-4 h-4 mr-2" />
//                               Add Specialization
//                             </Button>
//                           </div>

//                           {academicPrograms.length > 1 && (
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               className="mt-4"
//                               onClick={() => removeArrayField(setAcademicPrograms, programIndex, 'academicPrograms')}
//                             >
//                               <Minus className="w-4 h-4 mr-2" />
//                               Remove Program
//                             </Button>
//                           )}
//                         </div>
//                       ))}
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="mt-4"
//                         onClick={() => addArrayField(
//                           setAcademicPrograms,
//                           { level: '', programName: '', specializationAreas: [''] },
//                           'academicPrograms'
//                         )}
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Program
//                       </Button>
//                     </div>

//                     {/* Student Enrollment Table - Updated to match the image */}
//                     <div>
//                       <Label>3. Number of Students enrolled (program-wise, year-wise)</Label>
//                       <Table className="mt-2">
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead rowSpan={2}>Program</TableHead>
//                             <TableHead rowSpan={2}>Level</TableHead>
//                             <TableHead colSpan={6} className="text-center">Constituent Campus</TableHead>
//                             <TableHead colSpan={6} className="text-center">Affiliated Campus</TableHead>
//                             <TableHead rowSpan={2}>Actions</TableHead>
//                           </TableRow>
//                           <TableRow>
//                             {/* Constituent Campus Headers */}
//                             <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
//                             <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
//                             {/* Affiliated Campus Headers */}
//                             <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
//                             <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
//                           </TableRow>
//                           <TableRow>
//                             <TableHead></TableHead>
//                             <TableHead></TableHead>
//                             {/* Constituent Campus Sub-headers */}
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             {/* Affiliated Campus Sub-headers */}
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead></TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {studentEnrollment.map((enrollment, index) => (
//                             <TableRow key={index}>
//                               <TableCell>
//                                 <Input
//                                   value={enrollment.program}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].program = e.target.value;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   placeholder="Program"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Select
//                                   value={enrollment.level}
//                                   onValueChange={(value) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].level = value;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 >
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="Select level" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="Bachelor">Bachelor</SelectItem>
//                                     <SelectItem value="Master">Master</SelectItem>
//                                     <SelectItem value="MPhil">MPhil</SelectItem>
//                                     <SelectItem value="PhD">PhD</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </TableCell>
//                               {/* Constituent Campus - Exam Appeared */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamAppearedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamAppearedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamAppearedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamAppearedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamAppearedT}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamAppearedT = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               {/* Constituent Campus - Exam Passed */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamPassedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamPassedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamPassedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamPassedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamPassedT}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamPassedT = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               {/* Affiliated Campus - Exam Appeared */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamAppearedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamAppearedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamAppearedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamAppearedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamAppearedT}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamAppearedT = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               {/* Affiliated Campus - Exam Passed */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamPassedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamPassedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamPassedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamPassedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamPassedT}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamPassedT = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 {studentEnrollment.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => removeArrayField(setStudentEnrollment, index, 'studentEnrollment')}
//                                   >
//                                     <Minus className="w-4 h-4" />
//                                   </Button>
//                                 )}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="mt-2"
//                         onClick={() => addArrayField(
//                           setStudentEnrollment,
//                           {
//                             program: '', level: '',
//                             constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
//                             constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
//                             affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
//                             affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
//                           },
//                           'studentEnrollment'
//                         )}
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Enrollment Record
//                       </Button>
//                     </div>

//                     {/* Additional Academic Fields */}
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="curriculumUpdates">Curriculum Updates or Revisions Undertaken</Label>
//                         <Textarea
//                           id="curriculumUpdates"
//                           {...register('curriculumUpdates')}
//                           placeholder="Describe curriculum updates..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="teachingInnovations">Innovations in Teaching-Learning Methods</Label>
//                         <Textarea
//                           id="teachingInnovations"
//                           {...register('teachingInnovations')}
//                           placeholder="Describe teaching innovations..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="digitalTools">Use of Online/Digital Tools in Education</Label>
//                         <Textarea
//                           id="digitalTools"
//                           {...register('digitalTools')}
//                           placeholder="Describe digital tools usage..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="studentFeedback">Student Feedback Mechanisms and Key Outcomes</Label>
//                         <Textarea
//                           id="studentFeedback"
//                           {...register('studentFeedback')}
//                           placeholder="Describe feedback mechanisms..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="academicChallenges">Challenges Faced in Academic Delivery</Label>
//                         <Textarea
//                           id="academicChallenges"
//                           {...register('academicChallenges')}
//                           placeholder="Describe academic challenges..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* The rest of the tabs remain unchanged */}
//               {/* Section 3: Research and Innovation */}
//               <TabsContent value="research" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 3: Research and Innovation</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="researchProjectsInitiated">Number of Research Projects Initiated</Label>
//                         <Input
//                           id="researchProjectsInitiated"
//                           type="number"
//                           {...register('researchProjectsInitiated', { valueAsNumber: true })}
//                           placeholder="0"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="researchProjectsCompleted">Number of Research Projects Completed</Label>
//                         <Input
//                           id="researchProjectsCompleted"
//                           type="number"
//                           {...register('researchProjectsCompleted', { valueAsNumber: true })}
//                           placeholder="0"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="researchFunding">Research Funding Received (Internal/External)</Label>
//                         <Textarea
//                           id="researchFunding"
//                           {...register('researchFunding')}
//                           placeholder="Describe research funding received..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="publications">Publications (Books, Journals, Conferences)</Label>
//                         <Textarea
//                           id="publications"
//                           {...register('publications')}
//                           placeholder="List publications..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="patents">Patents Filed/Granted (if any)</Label>
//                         <Textarea
//                           id="patents"
//                           {...register('patents')}
//                           placeholder="List patents..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="conferences">Conferences/Seminars/Workshops Organized</Label>
//                         <Textarea
//                           id="conferences"
//                           {...register('conferences')}
//                           placeholder="List conferences organized..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="facultyParticipation">Faculty Participation in External Research Events</Label>
//                         <Textarea
//                           id="facultyParticipation"
//                           {...register('facultyParticipation')}
//                           placeholder="Describe faculty participation..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="studentResearch">Student Involvement in Research Activities</Label>
//                         <Textarea
//                           id="studentResearch"
//                           {...register('studentResearch')}
//                           placeholder="Describe student research involvement..."
//                         />
//                       </div>
//                     </div>

//                     {/* Collaborations Table */}
//                     <div>
//                       <Label>Collaborations/MoUs with National or International Institutions</Label>
//                       <Table className="mt-2">
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead>Institution's Name</TableHead>
//                             <TableHead>Objective</TableHead>
//                             <TableHead>Actions</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {collaborations.map((collaboration, index) => (
//                             <TableRow key={index}>
//                               <TableCell>
//                                 <Input
//                                   value={collaboration.institutionName}
//                                   onChange={(e) => {
//                                     const newCollaborations = [...collaborations];
//                                     newCollaborations[index].institutionName = e.target.value;
//                                     setCollaborations(newCollaborations);
//                                     setValue('collaborations', newCollaborations);
//                                   }}
//                                   placeholder="Institution name"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   value={collaboration.objective}
//                                   onChange={(e) => {
//                                     const newCollaborations = [...collaborations];
//                                     newCollaborations[index].objective = e.target.value;
//                                     setCollaborations(newCollaborations);
//                                     setValue('collaborations', newCollaborations);
//                                   }}
//                                   placeholder="Objective"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 {collaborations.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => removeArrayField(setCollaborations, index, 'collaborations')}
//                                   >
//                                     <Minus className="w-4 h-4" />
//                                   </Button>
//                                 )}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="mt-2"
//                         onClick={() => addArrayField(
//                           setCollaborations,
//                           { institutionName: '', objective: '' },
//                           'collaborations'
//                         )}
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Collaboration
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Continue with remaining sections... */}
//               {/* Section 4: Human Resources */}
//               <TabsContent value="hr" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 4: Human Resources</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="academicStaff">Current Number of Academic Staff (by Rank)</Label>
//                         <Textarea
//                           id="academicStaff"
//                           {...register('academicStaff')}
//                           placeholder="List academic staff by rank..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="adminStaff">Current Number of Administrative/Technical Staff</Label>
//                         <Textarea
//                           id="adminStaff"
//                           {...register('adminStaff')}
//                           placeholder="List administrative/technical staff..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="newRecruitments">New Recruitments During Reporting Period</Label>
//                         <Textarea
//                           id="newRecruitments"
//                           {...register('newRecruitments')}
//                           placeholder="Describe new recruitments..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="trainings">Trainings/Workshops Attended by Staff</Label>
//                         <Textarea
//                           id="trainings"
//                           {...register('trainings')}
//                           placeholder="List trainings and workshops..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="promotions">Promotions or Achievements</Label>
//                         <Textarea
//                           id="promotions"
//                           {...register('promotions')}
//                           placeholder="Describe promotions and achievements..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="retirements">Major Retirements/Resignations</Label>
//                         <Textarea
//                           id="retirements"
//                           {...register('retirements')}
//                           placeholder="List retirements and resignations..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="developmentNeeds">Staff Development Needs Identified</Label>
//                         <Textarea
//                           id="developmentNeeds"
//                           {...register('developmentNeeds')}
//                           placeholder="Describe development needs..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 5: Infrastructure and Facilities */}
//               <TabsContent value="infrastructure" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 5: Infrastructure and Facilities</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="infrastructureAdditions">Additions to Existing Infrastructure</Label>
//                         <Textarea
//                           id="infrastructureAdditions"
//                           {...register('infrastructureAdditions')}
//                           placeholder="Describe infrastructure additions..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="newFacilities">New Facilities Added or Upgraded</Label>
//                         <Textarea
//                           id="newFacilities"
//                           {...register('newFacilities')}
//                           placeholder="Describe new facilities..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="constructionStatus">Status of Major Construction/Renovation Projects</Label>
//                         <Textarea
//                           id="constructionStatus"
//                           {...register('constructionStatus')}
//                           placeholder="Describe construction status..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="equipmentProcured">Equipment Procured</Label>
//                         <Textarea
//                           id="equipmentProcured"
//                           {...register('equipmentProcured')}
//                           placeholder="List equipment procured..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="infrastructureChallenges">Challenges Related to Infrastructure</Label>
//                         <Textarea
//                           id="infrastructureChallenges"
//                           {...register('infrastructureChallenges')}
//                           placeholder="Describe infrastructure challenges..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="accessibilityMeasures">Accessibility and Inclusivity Measures</Label>
//                         <Textarea
//                           id="accessibilityMeasures"
//                           {...register('accessibilityMeasures')}
//                           placeholder="Describe accessibility measures..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 6: Financial Status */}
//               <TabsContent value="financial" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 6: Financial Status</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="budgetAllocated">Total Annual Budget Allocated</Label>
//                         <Textarea
//                           id="budgetAllocated"
//                           {...register('budgetAllocated')}
//                           placeholder="Describe budget allocation..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="actualExpenditure">Actual Expenditure (by Major Heads)</Label>
//                         <Textarea
//                           id="actualExpenditure"
//                           {...register('actualExpenditure')}
//                           placeholder="Describe actual expenditure..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="revenueGenerated">Revenue Generated (Tuition Fees, Grants, Consultancies)</Label>
//                         <Textarea
//                           id="revenueGenerated"
//                           {...register('revenueGenerated')}
//                           placeholder="Describe revenue generated..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="financialChallenges">Financial Challenges Faced</Label>
//                         <Textarea
//                           id="financialChallenges"
//                           {...register('financialChallenges')}
//                           placeholder="Describe financial challenges..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="auditStatus">Audit and Compliance Status</Label>
//                         <Textarea
//                           id="auditStatus"
//                           {...register('auditStatus')}
//                           placeholder="Describe audit status..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 7: Governance and Management */}
//               <TabsContent value="governance" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 7: Governance and Management</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="meetingsHeld">Meetings Held (Faculty Board, Committees, etc.)</Label>
//                         <Textarea
//                           id="meetingsHeld"
//                           {...register('meetingsHeld')}
//                           placeholder="Describe meetings held..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="keyDecisions">Key Decisions Taken</Label>
//                         <Textarea
//                           id="keyDecisions"
//                           {...register('keyDecisions')}
//                           placeholder="Describe key decisions..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="policyUpdates">Policy Updates or Changes</Label>
//                         <Textarea
//                           id="policyUpdates"
//                           {...register('policyUpdates')}
//                           placeholder="Describe policy updates..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="grievanceHandling">Grievance Handling Mechanisms</Label>
//                         <Textarea
//                           id="grievanceHandling"
//                           {...register('grievanceHandling')}
//                           placeholder="Describe grievance handling..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="transparencyInitiatives">Initiatives for Transparency and Accountability</Label>
//                         <Textarea
//                           id="transparencyInitiatives"
//                           {...register('transparencyInitiatives')}
//                           placeholder="Describe transparency initiatives..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 8: Student Affairs and Support Services */}
//               <TabsContent value="student" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 8: Student Affairs and Support Services</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="scholarships">Scholarships and Financial Aid Programs</Label>
//                         <Textarea
//                           id="scholarships"
//                           {...register('scholarships')}
//                           placeholder="Describe scholarship programs..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="careerCounseling">Career Counseling and Placement Services</Label>
//                         <Textarea
//                           id="careerCounseling"
//                           {...register('careerCounseling')}
//                           placeholder="Describe career services..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="extracurricular">Extracurricular Activities (Sports, Cultural, Clubs)</Label>
//                         <Textarea
//                           id="extracurricular"
//                           {...register('extracurricular')}
//                           placeholder="Describe extracurricular activities..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="alumniEngagement">Alumni Engagement Activities</Label>
//                         <Textarea
//                           id="alumniEngagement"
//                           {...register('alumniEngagement')}
//                           placeholder="Describe alumni engagement..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="studentAchievements">Major Achievements of Students</Label>
//                         <Textarea
//                           id="studentAchievements"
//                           {...register('studentAchievements')}
//                           placeholder="Describe student achievements..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 9: Community Engagement and Extension Activities */}
//               <TabsContent value="community" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 9: Community Engagement and Extension Activities</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="outreachPrograms">Community Outreach Programs Conducted</Label>
//                         <Textarea
//                           id="outreachPrograms"
//                           {...register('outreachPrograms')}
//                           placeholder="Describe outreach programs..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="communityCollaborations">Collaborations with Local Communities/Organizations</Label>
//                         <Textarea
//                           id="communityCollaborations"
//                           {...register('communityCollaborations')}
//                           placeholder="Describe community collaborations..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="socialResponsibility">Social Responsibility Initiatives</Label>
//                         <Textarea
//                           id="socialResponsibility"
//                           {...register('socialResponsibility')}
//                           placeholder="Describe social responsibility initiatives..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="continuingEducation">Continuing Education or Non-Degree Programs</Label>
//                         <Textarea
//                           id="continuingEducation"
//                           {...register('continuingEducation')}
//                           placeholder="Describe continuing education programs..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 10: Achievements and Recognition */}
//               <TabsContent value="achievements" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 10: Achievements and Recognition</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="awards">Major Awards, Honors, or Recognitions Received</Label>
//                         <Textarea
//                           id="awards"
//                           {...register('awards')}
//                           placeholder="Describe awards and recognitions..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="successStories">Success Stories and Best Practices</Label>
//                         <Textarea
//                           id="successStories"
//                           {...register('successStories')}
//                           placeholder="Describe success stories..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="reputationContributions">Significant Contributions to the University's Reputation</Label>
//                         <Textarea
//                           id="reputationContributions"
//                           {...register('reputationContributions')}
//                           placeholder="Describe contributions to reputation..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 11: Challenges and Lessons Learned */}
//               <TabsContent value="challenges" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 11: Challenges and Lessons Learned</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="keyChallenges">Key Challenges Faced During the Year</Label>
//                         <Textarea
//                           id="keyChallenges"
//                           {...register('keyChallenges')}
//                           placeholder="Describe key challenges..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="strategies">Strategies Adopted to Address Them</Label>
//                         <Textarea
//                           id="strategies"
//                           {...register('strategies')}
//                           placeholder="Describe strategies adopted..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="lessonsLearned">Lessons Learned for Future Activities</Label>
//                         <Textarea
//                           id="lessonsLearned"
//                           {...register('lessonsLearned')}
//                           placeholder="Describe lessons learned..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 12: Future Plans and Recommendations */}
//               <TabsContent value="future" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 12: Future Plans and Recommendations</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="majorGoals">Major Goals and Priorities for Next Academic Year</Label>
//                         <Textarea
//                           id="majorGoals"
//                           {...register('majorGoals')}
//                           placeholder="Describe major goals..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="proposedProjects">Proposed Projects/Initiatives</Label>
//                         <Textarea
//                           id="proposedProjects"
//                           {...register('proposedProjects')}
//                           placeholder="Describe proposed projects..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="supportNeeded">Support Needed from Central Administration</Label>
//                         <Textarea
//                           id="supportNeeded"
//                           {...register('supportNeeded')}
//                           placeholder="Describe support needed..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="policyReforms">Policy or Structural Reforms Suggested</Label>
//                         <Textarea
//                           id="policyReforms"
//                           {...register('policyReforms')}
//                           placeholder="Describe policy reforms..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>

//             <div className="faculty-form-actions">
//               <Button type="submit" className="faculty-submit-btn">
//                 <Save className="w-4 h-4 mr-2" />
//                 Submit Faculty Report
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default FacultyForm;

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Plus, Minus, Save, FileText } from 'lucide-react';
// import { toast } from 'sonner';
// import './facultyForm.component.css';

// // Define interfaces for academic programs with specializations and year/semester structure
// interface AcademicProgram {
//   level: string;
//   programName: string;
//   duration: string;
//   years: ProgramYear[];
// }

// interface ProgramYear {
//   year: string;
//   semesters: ProgramSemester[];
// }

// interface ProgramSemester {
//   semester: string;
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

// const facultyFormSchema = z.object({
//   // Section 1: General Information
//   instituteName: z.string().min(1, 'Institute name is required'),
//   reportingPeriod: z.string().min(1, 'Reporting period is required'),
//   headName: z.string().min(1, 'Head/Coordinator name is required'),
//   phone: z.string().min(1, 'Phone is required'),
//   email: z.string().email('Invalid email format'),
//   submissionDate: z.string().min(1, 'Submission date is required'),

//   // Section 2: Academic Programs
//   academicPrograms: z.array(z.object({
//     level: z.string(),
//     programName: z.string(),
//     duration: z.string(),
//     years: z.array(z.object({
//       year: z.string(),
//       semesters: z.array(z.object({
//         semester: z.string(),
//         specializationAreas: z.array(z.string())
//       }))
//     }))
//   })).min(1, 'At least one program required'),
//   newPrograms: z.array(z.string()),
//   studentEnrollment: z.array(z.object({
//     program: z.string(),
//     level: z.string(),
//     constituentExamAppearedM: z.number(),
//     constituentExamAppearedF: z.number(),
//     constituentExamAppearedT: z.number(),
//     constituentExamPassedM: z.number(),
//     constituentExamPassedF: z.number(),
//     constituentExamPassedT: z.number(),
//     affiliatedExamAppearedM: z.number(),
//     affiliatedExamAppearedF: z.number(),
//     affiliatedExamAppearedT: z.number(),
//     affiliatedExamPassedM: z.number(),
//     affiliatedExamPassedF: z.number(),
//     affiliatedExamPassedT: z.number(),
//   })),
//   graduates: z.array(z.object({
//     program: z.string(),
//     semester: z.string(),
//     constituentExamAppearedM: z.number(),
//     constituentExamAppearedF: z.number(),
//     constituentExamAppearedT: z.number(),
//     constituentExamPassedM: z.number(),
//     constituentExamPassedF: z.number(),
//     constituentExamPassedT: z.number(),
//     affiliatedExamAppearedM: z.number(),
//     affiliatedExamAppearedF: z.number(),
//     affiliatedExamAppearedT: z.number(),
//     affiliatedExamPassedM: z.number(),
//     affiliatedExamPassedF: z.number(),
//     affiliatedExamPassedT: z.number(),
//   })),
//   curriculumUpdates: z.string(),
//   teachingInnovations: z.string(),
//   digitalTools: z.string(),
//   studentFeedback: z.string(),
//   academicChallenges: z.string(),

//   // Section 3: Research and Innovation
//   researchProjectsInitiated: z.number().min(0),
//   researchProjectsCompleted: z.number().min(0),
//   researchFunding: z.string(),
//   publications: z.string(),
//   patents: z.string(),
//   conferences: z.string(),
//   facultyParticipation: z.string(),
//   studentResearch: z.string(),
//   collaborations: z.array(z.object({
//     institutionName: z.string(),
//     objective: z.string(),
//   })),

//   // Section 4: Human Resources
//   academicStaff: z.string(),
//   adminStaff: z.string(),
//   newRecruitments: z.string(),
//   trainings: z.string(),
//   promotions: z.string(),
//   retirements: z.string(),
//   developmentNeeds: z.string(),

//   // Section 5: Infrastructure and Facilities
//   infrastructureAdditions: z.string(),
//   newFacilities: z.string(),
//   constructionStatus: z.string(),
//   equipmentProcured: z.string(),
//   infrastructureChallenges: z.string(),
//   accessibilityMeasures: z.string(),

//   // Section 6: Financial Status
//   budgetAllocated: z.string(),
//   actualExpenditure: z.string(),
//   revenueGenerated: z.string(),
//   financialChallenges: z.string(),
//   auditStatus: z.string(),

//   // Section 7: Governance and Management
//   meetingsHeld: z.string(),
//   keyDecisions: z.string(),
//   policyUpdates: z.string(),
//   grievanceHandling: z.string(),
//   transparencyInitiatives: z.string(),

//   // Section 8: Student Affairs and Support Services
//   scholarships: z.string(),
//   careerCounseling: z.string(),
//   extracurricular: z.string(),
//   alumniEngagement: z.string(),
//   studentAchievements: z.string(),

//   // Section 9: Community Engagement and Extension Activities
//   outreachPrograms: z.string(),
//   communityCollaborations: z.string(),
//   socialResponsibility: z.string(),
//   continuingEducation: z.string(),

//   // Section 10: Achievements and Recognition
//   awards: z.string(),
//   successStories: z.string(),
//   reputationContributions: z.string(),

//   // Section 11: Challenges and Lessons Learned
//   keyChallenges: z.string(),
//   strategies: z.string(),
//   lessonsLearned: z.string(),

//   // Section 12: Future Plans and Recommendations
//   majorGoals: z.string(),
//   proposedProjects: z.string(),
//   supportNeeded: z.string(),
//   policyReforms: z.string(),
// });

// type FacultyFormData = z.infer<typeof facultyFormSchema>;

// const FacultyForm: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('general');
//   const [academicPrograms, setAcademicPrograms] = useState<AcademicProgram[]>([
//     { 
//       level: '', 
//       programName: '', 
//       duration: '',
//       years: [{ year: 'First Year', semesters: [{ semester: '1st', specializationAreas: [''] }] }]
//     }
//   ]);
//   const [newPrograms, setNewPrograms] = useState<string[]>(['']);
//   const [studentEnrollment, setStudentEnrollment] = useState<StudentEnrollment[]>([{
//     program: '', level: '',
//     constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
//     constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
//     affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
//     affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
//   }]);
//   const [graduates, setGraduates] = useState<Graduate[]>([{
//     program: '', semester: '',
//     constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
//     constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
//     affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
//     affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
//   }]);
//   const [collaborations, setCollaborations] = useState<Collaboration[]>([{ institutionName: '', objective: '' }]);

//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FacultyFormData>({
//     resolver: zodResolver(facultyFormSchema),
//     defaultValues: {
//       academicPrograms: academicPrograms,
//       newPrograms: [''],
//       studentEnrollment: studentEnrollment,
//       graduates: graduates,
//       collaborations: collaborations,
//       researchProjectsInitiated: 0,
//       researchProjectsCompleted: 0,
//     }
//   });

//   const addArrayField = <T,>(
//     setter: React.Dispatch<React.SetStateAction<T[]>>,
//     defaultValue: T,
//     fieldName: keyof FacultyFormData
//   ) => {
//     setter(prev => {
//       const newArray = [...prev, defaultValue];
//       setValue(fieldName, newArray as FacultyFormData[keyof FacultyFormData]);
//       return newArray;
//     });
//   };

//   const removeArrayField = <T,>(
//     setter: React.Dispatch<React.SetStateAction<T[]>>,
//     index: number,
//     fieldName: keyof FacultyFormData
//   ) => {
//     setter(prev => {
//       const newArray = prev.filter((_, i) => i !== index);
//       setValue(fieldName, newArray as FacultyFormData[keyof FacultyFormData]);
//       return newArray;
//     });
//   };

//   // Academic Program Management Functions
//   const addAcademicProgram = () => {
//     addArrayField(
//       setAcademicPrograms,
//       { 
//         level: '', 
//         programName: '', 
//         duration: '',
//         years: [{ year: 'First Year', semesters: [{ semester: '1st', specializationAreas: [''] }] }]
//       },
//       'academicPrograms'
//     );
//   };

//   const removeAcademicProgram = (index: number) => {
//     removeArrayField(setAcademicPrograms, index, 'academicPrograms');
//   };

//   const updateAcademicProgram = (index: number, field: keyof AcademicProgram, value: any) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[index] = { ...newPrograms[index], [field]: value };
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const addYear = (programIndex: number) => {
//     const newPrograms = [...academicPrograms];
//     const yearCount = newPrograms[programIndex].years.length;
//     const yearNames = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'];
//     newPrograms[programIndex].years.push({
//       year: yearNames[yearCount] || `Year ${yearCount + 1}`,
//       semesters: [{ semester: '1st', specializationAreas: [''] }]
//     });
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const removeYear = (programIndex: number, yearIndex: number) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].years = newPrograms[programIndex].years.filter((_, i) => i !== yearIndex);
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const addSemester = (programIndex: number, yearIndex: number) => {
//     const newPrograms = [...academicPrograms];
//     const semesterCount = newPrograms[programIndex].years[yearIndex].semesters.length;
//     const semesterNames = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
//     newPrograms[programIndex].years[yearIndex].semesters.push({
//       semester: semesterNames[semesterCount] || `Semester ${semesterCount + 1}`,
//       specializationAreas: ['']
//     });
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const removeSemester = (programIndex: number, yearIndex: number, semesterIndex: number) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].years[yearIndex].semesters = 
//       newPrograms[programIndex].years[yearIndex].semesters.filter((_, i) => i !== semesterIndex);
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const addSpecializationArea = (programIndex: number, yearIndex: number, semesterIndex: number) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].years[yearIndex].semesters[semesterIndex].specializationAreas.push('');
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const removeSpecializationArea = (programIndex: number, yearIndex: number, semesterIndex: number, areaIndex: number) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].years[yearIndex].semesters[semesterIndex].specializationAreas = 
//       newPrograms[programIndex].years[yearIndex].semesters[semesterIndex].specializationAreas.filter((_, i) => i !== areaIndex);
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const updateSpecializationArea = (programIndex: number, yearIndex: number, semesterIndex: number, areaIndex: number, value: string) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].years[yearIndex].semesters[semesterIndex].specializationAreas[areaIndex] = value;
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const onSubmit = async (data: FacultyFormData) => {
//     try {
//       const response = await fetch('/api/faculty-forms', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         toast.success('Faculty form submitted successfully!');
//       } else {
//         throw new Error('Failed to submit form');
//       }
//     } catch (error) {
//       toast.error('Error submitting form. Please try again.');
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="faculty-form-container">
//       <Card className="faculty-form-card">
//         <CardHeader className="faculty-form-header">
//           <CardTitle className="faculty-form-title">
//             <FileText className="w-8 h-8" />
//             Faculty Annual Report Form
//           </CardTitle>
//           <CardDescription>
//             Complete all sections of the annual faculty report
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="faculty-form">
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="faculty-form-tabs">
//               <TabsList className="faculty-tabs-list">
//                 <TabsTrigger value="general">General</TabsTrigger>
//                 <TabsTrigger value="academic">Academic</TabsTrigger>
//                 <TabsTrigger value="research">Research</TabsTrigger>
//                 <TabsTrigger value="hr">HR</TabsTrigger>
//                 <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
//                 <TabsTrigger value="financial">Financial</TabsTrigger>
//                 <TabsTrigger value="governance">Governance</TabsTrigger>
//                 <TabsTrigger value="student">Student Affairs</TabsTrigger>
//                 <TabsTrigger value="community">Community</TabsTrigger>
//                 <TabsTrigger value="achievements">Achievements</TabsTrigger>
//                 <TabsTrigger value="challenges">Challenges</TabsTrigger>
//                 <TabsTrigger value="future">Future Plans</TabsTrigger>
//               </TabsList>

//               {/* Section 1: General Information */}
//               <TabsContent value="general" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 1: General Information</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="instituteName">Name of Institute/Faculty/Department/Unit *</Label>
//                         <Input
//                           id="instituteName"
//                           {...register('instituteName')}
//                           placeholder="Enter institute name"
//                         />
//                         {errors.instituteName && (
//                           <p className="text-red-500 text-sm">{errors.instituteName.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="reportingPeriod">Year/Reporting Period *</Label>
//                         <Input
//                           id="reportingPeriod"
//                           {...register('reportingPeriod')}
//                           placeholder="e.g., 2023-2024"
//                         />
//                         {errors.reportingPeriod && (
//                           <p className="text-red-500 text-sm">{errors.reportingPeriod.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="headName">Head/Coordinator Name *</Label>
//                         <Input
//                           id="headName"
//                           {...register('headName')}
//                           placeholder="Enter head/coordinator name"
//                         />
//                         {errors.headName && (
//                           <p className="text-red-500 text-sm">{errors.headName.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="phone">Phone *</Label>
//                         <Input
//                           id="phone"
//                           {...register('phone')}
//                           placeholder="Enter phone number"
//                         />
//                         {errors.phone && (
//                           <p className="text-red-500 text-sm">{errors.phone.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="email">Email *</Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           {...register('email')}
//                           placeholder="Enter email address"
//                         />
//                         {errors.email && (
//                           <p className="text-red-500 text-sm">{errors.email.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="submissionDate">Date of Submission *</Label>
//                         <Input
//                           id="submissionDate"
//                           type="date"
//                           {...register('submissionDate')}
//                         />
//                         {errors.submissionDate && (
//                           <p className="text-red-500 text-sm">{errors.submissionDate.message}</p>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 2: Academic Programs */}
//               <TabsContent value="academic" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 2: Academic Programs</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {/* Academic Programs with Year/Semester Structure */}
//                     <div>
//                       <Label>List of Academic Programs Offered with Year/Semester-wise Specializations *</Label>
//                       {academicPrograms.map((program, programIndex) => (
//                         <div key={programIndex} className="border rounded-lg p-4 mt-4">
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                             <div>
//                               <Label>Level *</Label>
//                               <Select
//                                 value={program.level}
//                                 onValueChange={(value) => updateAcademicProgram(programIndex, 'level', value)}
//                               >
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select level" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectItem value="Bachelor">Bachelor</SelectItem>
//                                   <SelectItem value="Master">Master</SelectItem>
//                                   <SelectItem value="MPhil">MPhil</SelectItem>
//                                   <SelectItem value="PhD">PhD</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                             <div>
//                               <Label>Program Name *</Label>
//                               <Input
//                                 value={program.programName}
//                                 onChange={(e) => updateAcademicProgram(programIndex, 'programName', e.target.value)}
//                                 placeholder="Enter program name"
//                               />
//                             </div>
//                             <div>
//                               <Label>Duration *</Label>
//                               <Input
//                                 value={program.duration}
//                                 onChange={(e) => updateAcademicProgram(programIndex, 'duration', e.target.value)}
//                                 placeholder="e.g., 4 years, 2 years"
//                               />
//                             </div>
//                           </div>

//                           {/* Years and Semesters */}
//                           <div className="space-y-4">
//                             {program.years.map((year, yearIndex) => (
//                               <div key={yearIndex} className="border rounded p-3">
//                                 <div className="flex justify-between items-center mb-2">
//                                   <Label className="font-semibold">{year.year}</Label>
//                                   {program.years.length > 1 && (
//                                     <Button
//                                       type="button"
//                                       variant="outline"
//                                       size="sm"
//                                       onClick={() => removeYear(programIndex, yearIndex)}
//                                     >
//                                       <Minus className="w-4 h-4" />
//                                     </Button>
//                                   )}
//                                 </div>
                                
//                                 {year.semesters.map((semester, semesterIndex) => (
//                                   <div key={semesterIndex} className="border rounded p-2 mb-2">
//                                     <div className="flex justify-between items-center mb-2">
//                                       <Label className="font-medium">{semester.semester} Semester</Label>
//                                       {year.semesters.length > 1 && (
//                                         <Button
//                                           type="button"
//                                           variant="outline"
//                                           size="sm"
//                                           onClick={() => removeSemester(programIndex, yearIndex, semesterIndex)}
//                                         >
//                                           <Minus className="w-4 h-4" />
//                                         </Button>
//                                       )}
//                                     </div>

//                                     <div>
//                                       <Label>Specialization Areas</Label>
//                                       {semester.specializationAreas.map((area, areaIndex) => (
//                                         <div key={areaIndex} className="flex gap-2 mt-2">
//                                           <Input
//                                             value={area}
//                                             onChange={(e) => updateSpecializationArea(programIndex, yearIndex, semesterIndex, areaIndex, e.target.value)}
//                                             placeholder="Enter specialization area"
//                                           />
//                                           {semester.specializationAreas.length > 1 && (
//                                             <Button
//                                               type="button"
//                                               variant="outline"
//                                               size="sm"
//                                               onClick={() => removeSpecializationArea(programIndex, yearIndex, semesterIndex, areaIndex)}
//                                             >
//                                               <Minus className="w-4 h-4" />
//                                             </Button>
//                                           )}
//                                         </div>
//                                       ))}
//                                       <Button
//                                         type="button"
//                                         variant="outline"
//                                         size="sm"
//                                         className="mt-2"
//                                         onClick={() => addSpecializationArea(programIndex, yearIndex, semesterIndex)}
//                                       >
//                                         <Plus className="w-4 h-4 mr-2" />
//                                         Add Specialization
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 ))}

//                                 <Button
//                                   type="button"
//                                   variant="outline"
//                                   size="sm"
//                                   className="mt-2"
//                                   onClick={() => addSemester(programIndex, yearIndex)}
//                                 >
//                                   <Plus className="w-4 h-4 mr-2" />
//                                   Add Semester
//                                 </Button>
//                               </div>
//                             ))}

//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               onClick={() => addYear(programIndex)}
//                             >
//                               <Plus className="w-4 h-4 mr-2" />
//                               Add Year
//                             </Button>
//                           </div>

//                           {academicPrograms.length > 1 && (
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               className="mt-4"
//                               onClick={() => removeAcademicProgram(programIndex)}
//                             >
//                               <Minus className="w-4 h-4 mr-2" />
//                               Remove Program
//                             </Button>
//                           )}
//                         </div>
//                       ))}
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="mt-4"
//                         onClick={addAcademicProgram}
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Program
//                       </Button>
//                     </div>

//                     {/* Student Enrollment Table */}
//                     <div>
//                       <Label>3. Number of Students enrolled (program-wise, year-wise)</Label>
//                       <Table className="mt-2">
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead rowSpan={2}>Program</TableHead>
//                             <TableHead rowSpan={2}>Level</TableHead>
//                             <TableHead colSpan={6} className="text-center">Constituent Campus</TableHead>
//                             <TableHead colSpan={6} className="text-center">Affiliated Campus</TableHead>
//                             <TableHead rowSpan={2}>Actions</TableHead>
//                           </TableRow>
//                           <TableRow>
//                             {/* Constituent Campus Headers */}
//                             <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
//                             <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
//                             {/* Affiliated Campus Headers */}
//                             <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
//                             <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
//                           </TableRow>
//                           <TableRow>
//                             <TableHead></TableHead>
//                             <TableHead></TableHead>
//                             {/* Constituent Campus Sub-headers */}
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             {/* Affiliated Campus Sub-headers */}
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead></TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {studentEnrollment.map((enrollment, index) => (
//                             <TableRow key={index}>
//                               <TableCell>
//                                 <Input
//                                   value={enrollment.program}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].program = e.target.value;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   placeholder="Program"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Select
//                                   value={enrollment.level}
//                                   onValueChange={(value) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].level = value;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 >
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="Select level" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="Bachelor">Bachelor</SelectItem>
//                                     <SelectItem value="Master">Master</SelectItem>
//                                     <SelectItem value="MPhil">MPhil</SelectItem>
//                                     <SelectItem value="PhD">PhD</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </TableCell>
//                               {/* Constituent Campus - Exam Appeared */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamAppearedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamAppearedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamAppearedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamAppearedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamAppearedT}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamAppearedT = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               {/* Constituent Campus - Exam Passed */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamPassedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamPassedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamPassedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamPassedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamPassedT}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamPassedT = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               {/* Affiliated Campus - Exam Appeared */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamAppearedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamAppearedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamAppearedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamAppearedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamAppearedT}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamAppearedT = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               {/* Affiliated Campus - Exam Passed */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamPassedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamPassedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamPassedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamPassedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamPassedT}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamPassedT = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 {studentEnrollment.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => removeArrayField(setStudentEnrollment, index, 'studentEnrollment')}
//                                   >
//                                     <Minus className="w-4 h-4" />
//                                   </Button>
//                                 )}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="mt-2"
//                         onClick={() => addArrayField(
//                           setStudentEnrollment,
//                           {
//                             program: '', level: '',
//                             constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
//                             constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
//                             affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
//                             affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
//                           },
//                           'studentEnrollment'
//                         )}
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Enrollment Record
//                       </Button>
//                     </div>

//                     {/* Number of Graduates Table */}
//                     <div>
//                       <Label>4. Number of Graduates (Program-wise)</Label>
//                       <Table className="mt-2">
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead rowSpan={2}>S.N.</TableHead>
//                             <TableHead rowSpan={2}>Program</TableHead>
//                             <TableHead rowSpan={2}>Semester</TableHead>
//                             <TableHead colSpan={6} className="text-center">Constituent Campus</TableHead>
//                             <TableHead colSpan={6} className="text-center">Affiliated Campus</TableHead>
//                             <TableHead rowSpan={2}>Actions</TableHead>
//                           </TableRow>
//                           <TableRow>
//                             {/* Constituent Campus Headers */}
//                             <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
//                             <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
//                             {/* Affiliated Campus Headers */}
//                             <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
//                             <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
//                           </TableRow>
//                           <TableRow>
//                             <TableHead></TableHead>
//                             <TableHead></TableHead>
//                             <TableHead></TableHead>
//                             {/* Constituent Campus Sub-headers */}
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             {/* Affiliated Campus Sub-headers */}
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead></TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {graduates.map((graduate, index) => (
//                             <TableRow key={index}>
//                               <TableCell>
//                                 <Input
//                                   value={(index + 1).toString()}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   value={graduate.program}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].program = e.target.value;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                   placeholder="Program"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   value={graduate.semester}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].semester = e.target.value;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                   placeholder="Semester"
//                                 />
//                               </TableCell>
//                               {/* Constituent Campus - Exam Appeared */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamAppearedM}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].constituentExamAppearedM = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamAppearedF}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].constituentExamAppearedF = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamAppearedT}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].constituentExamAppearedT = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               {/* Constituent Campus - Exam Passed */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamPassedM}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].constituentExamPassedM = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamPassedF}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].constituentExamPassedF = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamPassedT}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].constituentExamPassedT = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               {/* Affiliated Campus - Exam Appeared */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamAppearedM}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].affiliatedExamAppearedM = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamAppearedF}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].affiliatedExamAppearedF = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamAppearedT}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].affiliatedExamAppearedT = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               {/* Affiliated Campus - Exam Passed */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamPassedM}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].affiliatedExamPassedM = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamPassedF}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].affiliatedExamPassedF = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamPassedT}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].affiliatedExamPassedT = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 {graduates.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => removeArrayField(setGraduates, index, 'graduates')}
//                                   >
//                                     <Minus className="w-4 h-4" />
//                                   </Button>
//                                 )}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="mt-2"
//                         onClick={() => addArrayField(
//                           setGraduates,
//                           {
//                             program: '', semester: '',
//                             constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
//                             constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
//                             affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
//                             affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
//                           },
//                           'graduates'
//                         )}
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Graduate Record
//                       </Button>
//                     </div>

//                     {/* Additional Academic Fields */}
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="curriculumUpdates">Curriculum Updates or Revisions Undertaken</Label>
//                         <Textarea
//                           id="curriculumUpdates"
//                           {...register('curriculumUpdates')}
//                           placeholder="Describe curriculum updates..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="teachingInnovations">Innovations in Teaching-Learning Methods</Label>
//                         <Textarea
//                           id="teachingInnovations"
//                           {...register('teachingInnovations')}
//                           placeholder="Describe teaching innovations..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="digitalTools">Use of Online/Digital Tools in Education</Label>
//                         <Textarea
//                           id="digitalTools"
//                           {...register('digitalTools')}
//                           placeholder="Describe digital tools usage..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="studentFeedback">Student Feedback Mechanisms and Key Outcomes</Label>
//                         <Textarea
//                           id="studentFeedback"
//                           {...register('studentFeedback')}
//                           placeholder="Describe feedback mechanisms..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="academicChallenges">Challenges Faced in Academic Delivery</Label>
//                         <Textarea
//                           id="academicChallenges"
//                           {...register('academicChallenges')}
//                           placeholder="Describe academic challenges..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* The rest of the tabs remain unchanged */}
//               {/* Section 3: Research and Innovation */}
//               <TabsContent value="research" className="faculty-tab-content">
//                 {/* ... (existing research section code remains the same) ... */}
//               </TabsContent>

//               {/* Continue with remaining sections... */}
//               {/* Section 4: Human Resources */}
//               <TabsContent value="hr" className="faculty-tab-content">
//                 {/* ... (existing HR section code remains the same) ... */}
//               </TabsContent>

//               {/* Section 5: Infrastructure and Facilities */}
//               <TabsContent value="infrastructure" className="faculty-tab-content">
//                 {/* ... (existing infrastructure section code remains the same) ... */}
//               </TabsContent>

//               {/* Section 6: Financial Status */}
//               <TabsContent value="financial" className="faculty-tab-content">
//                 {/* ... (existing financial section code remains the same) ... */}
//               </TabsContent>

//               {/* Section 7: Governance and Management */}
//               <TabsContent value="governance" className="faculty-tab-content">
//                 {/* ... (existing governance section code remains the same) ... */}
//               </TabsContent>

//               {/* Section 8: Student Affairs and Support Services */}
//               <TabsContent value="student" className="faculty-tab-content">
//                 {/* ... (existing student affairs section code remains the same) ... */}
//               </TabsContent>

//               {/* Section 9: Community Engagement and Extension Activities */}
//               <TabsContent value="community" className="faculty-tab-content">
//                 {/* ... (existing community section code remains the same) ... */}
//               </TabsContent>

//               {/* Section 10: Achievements and Recognition */}
//               <TabsContent value="achievements" className="faculty-tab-content">
//                 {/* ... (existing achievements section code remains the same) ... */}
//               </TabsContent>

//               {/* Section 11: Challenges and Lessons Learned */}
//               <TabsContent value="challenges" className="faculty-tab-content">
//                 {/* ... (existing challenges section code remains the same) ... */}
//               </TabsContent>

//               {/* Section 12: Future Plans and Recommendations */}
//               <TabsContent value="future" className="faculty-tab-content">
//                 {/* ... (existing future plans section code remains the same) ... */}
//               </TabsContent>
//             </Tabs>

//             <div className="faculty-form-actions">
//               <Button type="submit" className="faculty-submit-btn">
//                 <Save className="w-4 h-4 mr-2" />
//                 Submit Faculty Report
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default FacultyForm;



// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Plus, Minus, Save, FileText } from 'lucide-react';
// import { toast } from 'sonner';
// import './facultyForm.component.css';

// // Define interfaces
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

// const facultyFormSchema = z.object({
//   // Section 1: General Information
//   instituteName: z.string().min(1, 'Institute name is required'),
//   reportingPeriod: z.string().min(1, 'Reporting period is required'),
//   headName: z.string().min(1, 'Head/Coordinator name is required'),
//   phone: z.string().min(1, 'Phone is required'),
//   email: z.string().email('Invalid email format'),
//   submissionDate: z.string().min(1, 'Submission date is required'),

//   // Section 2: Academic Programs
//   academicPrograms: z.array(z.object({
//     level: z.string(),
//     programName: z.string(),
//     programType: z.string(),
//     specializationAreas: z.array(z.string())
//   })).min(1, 'At least one program required'),
//   newPrograms: z.array(z.string()),
//   studentEnrollment: z.array(z.object({
//     program: z.string(),
//     level: z.string(),
//     constituentExamAppearedM: z.number(),
//     constituentExamAppearedF: z.number(),
//     constituentExamAppearedT: z.number(),
//     constituentExamPassedM: z.number(),
//     constituentExamPassedF: z.number(),
//     constituentExamPassedT: z.number(),
//     affiliatedExamAppearedM: z.number(),
//     affiliatedExamAppearedF: z.number(),
//     affiliatedExamAppearedT: z.number(),
//     affiliatedExamPassedM: z.number(),
//     affiliatedExamPassedF: z.number(),
//     affiliatedExamPassedT: z.number(),
//   })),
//   graduates: z.array(z.object({
//     program: z.string(),
//     semester: z.string(),
//     constituentExamAppearedM: z.number(),
//     constituentExamAppearedF: z.number(),
//     constituentExamAppearedT: z.number(),
//     constituentExamPassedM: z.number(),
//     constituentExamPassedF: z.number(),
//     constituentExamPassedT: z.number(),
//     affiliatedExamAppearedM: z.number(),
//     affiliatedExamAppearedF: z.number(),
//     affiliatedExamAppearedT: z.number(),
//     affiliatedExamPassedM: z.number(),
//     affiliatedExamPassedF: z.number(),
//     affiliatedExamPassedT: z.number(),
//   })),
//   curriculumUpdates: z.string(),
//   teachingInnovations: z.string(),
//   digitalTools: z.string(),
//   studentFeedback: z.string(),
//   academicChallenges: z.string(),

//   // Section 3: Research and Innovation
//   researchProjectsInitiated: z.number().min(0),
//   researchProjectsCompleted: z.number().min(0),
//   researchFunding: z.string(),
//   publications: z.string(),
//   patents: z.string(),
//   conferences: z.string(),
//   facultyParticipation: z.string(),
//   studentResearch: z.string(),
//   collaborations: z.array(z.object({
//     institutionName: z.string(),
//     objective: z.string(),
//   })),

//   // Section 4: Human Resources
//   academicStaff: z.string(),
//   adminStaff: z.string(),
//   newRecruitments: z.string(),
//   trainings: z.string(),
//   promotions: z.string(),
//   retirements: z.string(),
//   developmentNeeds: z.string(),

//   // Section 5: Infrastructure and Facilities
//   infrastructureAdditions: z.string(),
//   newFacilities: z.string(),
//   constructionStatus: z.string(),
//   equipmentProcured: z.string(),
//   infrastructureChallenges: z.string(),
//   accessibilityMeasures: z.string(),

//   // Section 6: Financial Status
//   budgetAllocated: z.string(),
//   actualExpenditure: z.string(),
//   revenueGenerated: z.string(),
//   financialChallenges: z.string(),
//   auditStatus: z.string(),

//   // Section 7: Governance and Management
//   meetingsHeld: z.string(),
//   keyDecisions: z.string(),
//   policyUpdates: z.string(),
//   grievanceHandling: z.string(),
//   transparencyInitiatives: z.string(),

//   // Section 8: Student Affairs and Support Services
//   scholarships: z.string(),
//   careerCounseling: z.string(),
//   extracurricular: z.string(),
//   alumniEngagement: z.string(),
//   studentAchievements: z.string(),

//   // Section 9: Community Engagement and Extension Activities
//   outreachPrograms: z.string(),
//   communityCollaborations: z.string(),
//   socialResponsibility: z.string(),
//   continuingEducation: z.string(),

//   // Section 10: Achievements and Recognition
//   awards: z.string(),
//   successStories: z.string(),
//   reputationContributions: z.string(),

//   // Section 11: Challenges and Lessons Learned
//   keyChallenges: z.string(),
//   strategies: z.string(),
//   lessonsLearved: z.string(),

//   // Section 12: Future Plans and Recommendations
//   majorGoals: z.string(),
//   proposedProjects: z.string(),
//   supportNeeded: z.string(),
//   policyReforms: z.string(),
// });

// type FacultyFormData = z.infer<typeof facultyFormSchema>;

// const FacultyForm: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('general');
//   const [academicPrograms, setAcademicPrograms] = useState<AcademicProgram[]>([
//     { level: '', programName: '', programType: '', specializationAreas: [''] }
//   ]);
//   const [newPrograms, setNewPrograms] = useState<string[]>(['']);
//   const [studentEnrollment, setStudentEnrollment] = useState<StudentEnrollment[]>([{
//     program: '', level: '',
//     constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
//     constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
//     affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
//     affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
//   }]);
//   const [graduates, setGraduates] = useState<Graduate[]>([{
//     program: '', semester: '',
//     constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
//     constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
//     affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
//     affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
//   }]);
//   const [collaborations, setCollaborations] = useState<Collaboration[]>([{ institutionName: '', objective: '' }]);

//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FacultyFormData>({
//     resolver: zodResolver(facultyFormSchema),
//     defaultValues: {
//       academicPrograms: academicPrograms,
//       newPrograms: [''],
//       studentEnrollment: studentEnrollment,
//       graduates: graduates,
//       collaborations: collaborations,
//       researchProjectsInitiated: 0,
//       researchProjectsCompleted: 0,
//     }
//   });

//   const addArrayField = <T,>(
//     setter: React.Dispatch<React.SetStateAction<T[]>>,
//     defaultValue: T,
//     fieldName: keyof FacultyFormData
//   ) => {
//     setter(prev => {
//       const newArray = [...prev, defaultValue];
//       setValue(fieldName, newArray as FacultyFormData[keyof FacultyFormData]);
//       return newArray;
//     });
//   };

//   const removeArrayField = <T,>(
//     setter: React.Dispatch<React.SetStateAction<T[]>>,
//     index: number,
//     fieldName: keyof FacultyFormData
//   ) => {
//     setter(prev => {
//       const newArray = prev.filter((_, i) => i !== index);
//       setValue(fieldName, newArray as FacultyFormData[keyof FacultyFormData]);
//       return newArray;
//     });
//   };

//   const addSpecializationArea = (programIndex: number) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].specializationAreas.push('');
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const removeSpecializationArea = (programIndex: number, areaIndex: number) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].specializationAreas = newPrograms[programIndex].specializationAreas.filter((_, i) => i !== areaIndex);
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const updateSpecializationArea = (programIndex: number, areaIndex: number, value: string) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex].specializationAreas[areaIndex] = value;
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const updateAcademicProgram = (programIndex: number, field: keyof AcademicProgram, value: string) => {
//     const newPrograms = [...academicPrograms];
//     newPrograms[programIndex] = { ...newPrograms[programIndex], [field]: value };
//     setAcademicPrograms(newPrograms);
//     setValue('academicPrograms', newPrograms);
//   };

//   const onSubmit = async (data: FacultyFormData) => {

  

//     console.log("on submit called")
//     try {
//       const response = await fetch('/api/faculty-forms', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         toast.success('Faculty form submitted successfully!');
//       } else {
//         throw new Error('Failed to submit form');
//       }
//     } catch (error) {
//       toast.error('Error submitting form. Please try again.');
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="faculty-form-container">
//       <Card className="faculty-form-card">
//         <CardHeader className="faculty-form-header">
//           <CardTitle className="faculty-form-title">
//             <FileText className="w-8 h-8" />
//             Faculty Annual Report Form
//           </CardTitle>
//           <CardDescription>
//             Complete all sections of the annual faculty report
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form 
//           onSubmit={handleSubmit(onSubmit)}
          
//           className="faculty-form">
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="faculty-form-tabs">
//               <TabsList className="faculty-tabs-list">
//                 <TabsTrigger value="general">General</TabsTrigger>
//                 <TabsTrigger value="academic">Academic</TabsTrigger>
//                 <TabsTrigger value="research">Research</TabsTrigger>
//                 <TabsTrigger value="hr">HR</TabsTrigger>
//                 <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
//                 <TabsTrigger value="financial">Financial</TabsTrigger>
//                 <TabsTrigger value="governance">Governance</TabsTrigger>
//                 <TabsTrigger value="student">Student Affairs</TabsTrigger>
//                 <TabsTrigger value="community">Community</TabsTrigger>
//                 <TabsTrigger value="achievements">Achievements</TabsTrigger>
//                 <TabsTrigger value="challenges">Challenges</TabsTrigger>
//                 <TabsTrigger value="future">Future Plans</TabsTrigger>
//               </TabsList>

//               {/* Section 1: General Information */}
//               <TabsContent value="general" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 1: General Information</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="instituteName">Name of Institute/Faculty/Department/Unit *</Label>
//                         <Input
//                           id="instituteName"
//                           {...register('instituteName')}
//                           placeholder="Enter institute name"
//                         />
//                         {errors.instituteName && (
//                           <p className="text-red-500 text-sm">{errors.instituteName.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="reportingPeriod">Year/Reporting Period *</Label>
//                         <Input
//                           id="reportingPeriod"
//                           {...register('reportingPeriod')}
//                           placeholder="e.g., 2023-2024"
//                         />
//                         {errors.reportingPeriod && (
//                           <p className="text-red-500 text-sm">{errors.reportingPeriod.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="headName">Head/Coordinator Name *</Label>
//                         <Input
//                           id="headName"
//                           {...register('headName')}
//                           placeholder="Enter head/coordinator name"
//                         />
//                         {errors.headName && (
//                           <p className="text-red-500 text-sm">{errors.headName.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="phone">Phone *</Label>
//                         <Input
//                           id="phone"
//                           {...register('phone')}
//                           placeholder="Enter phone number"
//                         />
//                         {errors.phone && (
//                           <p className="text-red-500 text-sm">{errors.phone.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="email">Email *</Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           {...register('email')}
//                           placeholder="Enter email address"
//                         />
//                         {errors.email && (
//                           <p className="text-red-500 text-sm">{errors.email.message}</p>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="submissionDate">Date of Submission *</Label>
//                         <Input
//                           id="submissionDate"
//                           type="date"
//                           {...register('submissionDate')}
//                         />
//                         {errors.submissionDate && (
//                           <p className="text-red-500 text-sm">{errors.submissionDate.message}</p>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 2: Academic Programs */}
//               <TabsContent value="academic" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 2: Academic Programs</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {/* Academic Programs */}
//                     <div>
//                       <Label>List of Academic Programs Offered with Specializations *</Label>
//                       {academicPrograms.map((program, programIndex) => (
//                         <div key={programIndex} className="border rounded-lg p-4 mt-4">
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                             <div>
//                               <Label>Level *</Label>
//                               <Select
//                                 value={program.level}
//                                 onValueChange={(value) => updateAcademicProgram(programIndex, 'level', value)}
//                               >
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select level" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectItem value="Bachelor">Bachelor</SelectItem>
//                                   <SelectItem value="Master">Master</SelectItem>
//                                   <SelectItem value="MPhil">MPhil</SelectItem>
//                                   <SelectItem value="PhD">PhD</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                             <div>
//                               <Label>Program Name *</Label>
//                               <Input
//                                 value={program.programName}
//                                 onChange={(e) => updateAcademicProgram(programIndex, 'programName', e.target.value)}
//                                 placeholder="Enter program name"
//                               />
//                             </div>
//                             <div>
//                               <Label>Program Type *</Label>
//                               <Select
//                                 value={program.programType}
//                                 onValueChange={(value) => updateAcademicProgram(programIndex, 'programType', value)}
//                               >
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select type" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectItem value="Year-wise">Year-wise</SelectItem>
//                                   <SelectItem value="Semester-wise">Semester-wise</SelectItem>
//                                   <SelectItem value="Trimester-wise">Trimester-wise</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                           </div>

//                           <div>
//                             <Label>Areas of Specialization *</Label>
//                             {program.specializationAreas.map((area, areaIndex) => (
//                               <div key={areaIndex} className="flex gap-2 mt-2">
//                                 <Input
//                                   value={area}
//                                   onChange={(e) => updateSpecializationArea(programIndex, areaIndex, e.target.value)}
//                                   placeholder="Enter specialization area"
//                                 />
//                                 {program.specializationAreas.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => removeSpecializationArea(programIndex, areaIndex)}
//                                   >
//                                     <Minus className="w-4 h-4" />
//                                   </Button>
//                                 )}
//                               </div>
//                             ))}
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               className="mt-2"
//                               onClick={() => addSpecializationArea(programIndex)}
//                             >
//                               <Plus className="w-4 h-4 mr-2" />
//                               Add Specialization
//                             </Button>
//                           </div>

//                           {academicPrograms.length > 1 && (
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               className="mt-4"
//                               onClick={() => removeArrayField(setAcademicPrograms, programIndex, 'academicPrograms')}
//                             >
//                               <Minus className="w-4 h-4 mr-2" />
//                               Remove Program
//                             </Button>
//                           )}
//                         </div>
//                       ))}
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="mt-4"
//                         onClick={() => addArrayField(
//                           setAcademicPrograms,
//                           { level: '', programName: '', programType: '', specializationAreas: [''] },
//                           'academicPrograms'
//                         )}
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Program
//                       </Button>
//                     </div>

//                     {/* Student Enrollment Table */}
//                     <div>
//                       <Label>3. Number of Students enrolled (program-wise, year-wise)</Label>
//                       <Table className="mt-2">
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead rowSpan={2}>Program</TableHead>
//                             <TableHead rowSpan={2}>Level</TableHead>
//                             <TableHead colSpan={6} className="text-center">Constituent Campus</TableHead>
//                             <TableHead colSpan={6} className="text-center">Affiliated Campus</TableHead>
//                             <TableHead rowSpan={2}>Actions</TableHead>
//                           </TableRow>
//                           <TableRow>
//                             {/* Constituent Campus Headers */}
//                             <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
//                             <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
//                             {/* Affiliated Campus Headers */}
//                             <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
//                             <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
//                           </TableRow>
//                           <TableRow>
//                             <TableHead></TableHead>
//                             <TableHead></TableHead>
//                             {/* Constituent Campus Sub-headers */}
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             {/* Affiliated Campus Sub-headers */}
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead></TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {studentEnrollment.map((enrollment, index) => (
//                             <TableRow key={index}>
//                               <TableCell>
//                                 <Input
//                                   value={enrollment.program}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].program = e.target.value;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                   placeholder="Program"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Select
//                                   value={enrollment.level}
//                                   onValueChange={(value) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].level = value;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 >
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="Select level" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="Bachelor">Bachelor</SelectItem>
//                                     <SelectItem value="Master">Master</SelectItem>
//                                     <SelectItem value="MPhil">MPhil</SelectItem>
//                                     <SelectItem value="PhD">PhD</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </TableCell>
//                               {/* Constituent Campus - Exam Appeared */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamAppearedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamAppearedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamAppearedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamAppearedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamAppearedT}
//                                   readOnly
//                                   className="bg-gray-100"
//                                   value={enrollment.constituentExamAppearedM + enrollment.constituentExamAppearedF}
//                                 />
//                               </TableCell>
//                               {/* Constituent Campus - Exam Passed */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamPassedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamPassedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamPassedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].constituentExamPassedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.constituentExamPassedT}
//                                   readOnly
//                                   className="bg-gray-100"
//                                   value={enrollment.constituentExamPassedM + enrollment.constituentExamPassedF}
//                                 />
//                               </TableCell>
//                               {/* Affiliated Campus - Exam Appeared */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamAppearedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamAppearedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamAppearedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamAppearedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamAppearedT}
//                                   readOnly
//                                   className="bg-gray-100"
//                                   value={enrollment.affiliatedExamAppearedM + enrollment.affiliatedExamAppearedF}
//                                 />
//                               </TableCell>
//                               {/* Affiliated Campus - Exam Passed */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamPassedM}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamPassedM = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamPassedF}
//                                   onChange={(e) => {
//                                     const newEnrollment = [...studentEnrollment];
//                                     newEnrollment[index].affiliatedExamPassedF = parseInt(e.target.value) || 0;
//                                     setStudentEnrollment(newEnrollment);
//                                     setValue('studentEnrollment', newEnrollment);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={enrollment.affiliatedExamPassedT}
//                                   readOnly
//                                   className="bg-gray-100"
//                                   value={enrollment.affiliatedExamPassedM + enrollment.affiliatedExamPassedF}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 {studentEnrollment.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => removeArrayField(setStudentEnrollment, index, 'studentEnrollment')}
//                                   >
//                                     <Minus className="w-4 h-4" />
//                                   </Button>
//                                 )}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="mt-2"
//                         onClick={() => addArrayField(
//                           setStudentEnrollment,
//                           {
//                             program: '', level: '',
//                             constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
//                             constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
//                             affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
//                             affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
//                           },
//                           'studentEnrollment'
//                         )}
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Enrollment Record
//                       </Button>
//                     </div>

//                     {/* Number of Graduates Table */}
//                     <div>
//                       <Label>4. Number of Graduates (Program-wise)</Label>
//                       <Table className="mt-2">
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead rowSpan={2}>S.N.</TableHead>
//                             <TableHead rowSpan={2}>Program</TableHead>
//                             <TableHead rowSpan={2}>Semester</TableHead>
//                             <TableHead colSpan={6} className="text-center">Constituent Campus</TableHead>
//                             <TableHead colSpan={6} className="text-center">Affiliated Campus</TableHead>
//                             <TableHead rowSpan={2}>Actions</TableHead>
//                           </TableRow>
//                           <TableRow>
//                             {/* Constituent Campus Headers */}
//                             <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
//                             <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
//                             {/* Affiliated Campus Headers */}
//                             <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
//                             <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
//                           </TableRow>
//                           <TableRow>
//                             <TableHead></TableHead>
//                             <TableHead></TableHead>
//                             <TableHead></TableHead>
//                             {/* Constituent Campus Sub-headers */}
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             {/* Affiliated Campus Sub-headers */}
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead>Male</TableHead>
//                             <TableHead>Female</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead></TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {graduates.map((graduate, index) => (
//                             <TableRow key={index}>
//                               <TableCell>
//                                 <Input
//                                   value={(index + 1).toString()}
//                                   readOnly
//                                   className="bg-gray-100"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   value={graduate.program}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].program = e.target.value;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                   placeholder="Program"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   value={graduate.semester}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].semester = e.target.value;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                   placeholder="Semester"
//                                 />
//                               </TableCell>
//                               {/* Constituent Campus - Exam Appeared */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamAppearedM}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].constituentExamAppearedM = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamAppearedF}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].constituentExamAppearedF = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamAppearedT}
//                                   readOnly
//                                   className="bg-gray-100"
//                                   value={graduate.constituentExamAppearedM + graduate.constituentExamAppearedF}
//                                 />
//                               </TableCell>
//                               {/* Constituent Campus - Exam Passed */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamPassedM}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].constituentExamPassedM = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamPassedF}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].constituentExamPassedF = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.constituentExamPassedT}
//                                   readOnly
//                                   className="bg-gray-100"
//                                   value={graduate.constituentExamPassedM + graduate.constituentExamPassedF}
//                                 />
//                               </TableCell>
//                               {/* Affiliated Campus - Exam Appeared */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamAppearedM}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].affiliatedExamAppearedM = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamAppearedF}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].affiliatedExamAppearedF = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamAppearedT}
//                                   readOnly
//                                   className="bg-gray-100"
//                                   value={graduate.affiliatedExamAppearedM + graduate.affiliatedExamAppearedF}
//                                 />
//                               </TableCell>
//                               {/* Affiliated Campus - Exam Passed */}
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamPassedM}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].affiliatedExamPassedM = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamPassedF}
//                                   onChange={(e) => {
//                                     const newGraduates = [...graduates];
//                                     newGraduates[index].affiliatedExamPassedF = parseInt(e.target.value) || 0;
//                                     setGraduates(newGraduates);
//                                     setValue('graduates', newGraduates);
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   type="number"
//                                   value={graduate.affiliatedExamPassedT}
//                                   readOnly
//                                   className="bg-gray-100"
//                                   value={graduate.affiliatedExamPassedM + graduate.affiliatedExamPassedF}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 {graduates.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => removeArrayField(setGraduates, index, 'graduates')}
//                                   >
//                                     <Minus className="w-4 h-4" />
//                                   </Button>
//                                 )}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="mt-2"
//                         onClick={() => addArrayField(
//                           setGraduates,
//                           {
//                             program: '', semester: '',
//                             constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
//                             constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
//                             affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
//                             affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
//                           },
//                           'graduates'
//                         )}
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Graduate Record
//                       </Button>
//                     </div>

//                     {/* Additional Academic Fields */}
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="curriculumUpdates">Curriculum Updates or Revisions Undertaken</Label>
//                         <Textarea
//                           id="curriculumUpdates"
//                           {...register('curriculumUpdates')}
//                           placeholder="Describe curriculum updates..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="teachingInnovations">Innovations in Teaching-Learning Methods</Label>
//                         <Textarea
//                           id="teachingInnovations"
//                           {...register('teachingInnovations')}
//                           placeholder="Describe teaching innovations..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="digitalTools">Use of Online/Digital Tools in Education</Label>
//                         <Textarea
//                           id="digitalTools"
//                           {...register('digitalTools')}
//                           placeholder="Describe digital tools usage..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="studentFeedback">Student Feedback Mechanisms and Key Outcomes</Label>
//                         <Textarea
//                           id="studentFeedback"
//                           {...register('studentFeedback')}
//                           placeholder="Describe feedback mechanisms..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="academicChallenges">Challenges Faced in Academic Delivery</Label>
//                         <Textarea
//                           id="academicChallenges"
//                           {...register('academicChallenges')}
//                           placeholder="Describe academic challenges..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 3: Research and Innovation */}
//               <TabsContent value="research" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 3: Research and Innovation</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="researchProjectsInitiated">Number of Research Projects Initiated</Label>
//                         <Input
//                           id="researchProjectsInitiated"
//                           type="number"
//                           {...register('researchProjectsInitiated', { valueAsNumber: true })}
//                           placeholder="0"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="researchProjectsCompleted">Number of Research Projects Completed</Label>
//                         <Input
//                           id="researchProjectsCompleted"
//                           type="number"
//                           {...register('researchProjectsCompleted', { valueAsNumber: true })}
//                           placeholder="0"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="researchFunding">Research Funding Received (Internal/External)</Label>
//                         <Textarea
//                           id="researchFunding"
//                           {...register('researchFunding')}
//                           placeholder="Describe research funding received..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="publications">Publications (Books, Journals, Conferences)</Label>
//                         <Textarea
//                           id="publications"
//                           {...register('publications')}
//                           placeholder="List publications..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="patents">Patents Filed/Granted (if any)</Label>
//                         <Textarea
//                           id="patents"
//                           {...register('patents')}
//                           placeholder="List patents..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="conferences">Conferences/Seminars/Workshops Organized</Label>
//                         <Textarea
//                           id="conferences"
//                           {...register('conferences')}
//                           placeholder="List conferences organized..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="facultyParticipation">Faculty Participation in External Research Events</Label>
//                         <Textarea
//                           id="facultyParticipation"
//                           {...register('facultyParticipation')}
//                           placeholder="Describe faculty participation..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="studentResearch">Student Involvement in Research Activities</Label>
//                         <Textarea
//                           id="studentResearch"
//                           {...register('studentResearch')}
//                           placeholder="Describe student research involvement..."
//                         />
//                       </div>
//                     </div>

//                     {/* Collaborations Table */}
//                     <div>
//                       <Label>Collaborations/MoUs with National or International Institutions</Label>
//                       <Table className="mt-2">
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead>Institution's Name</TableHead>
//                             <TableHead>Objective</TableHead>
//                             <TableHead>Actions</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {collaborations.map((collaboration, index) => (
//                             <TableRow key={index}>
//                               <TableCell>
//                                 <Input
//                                   value={collaboration.institutionName}
//                                   onChange={(e) => {
//                                     const newCollaborations = [...collaborations];
//                                     newCollaborations[index].institutionName = e.target.value;
//                                     setCollaborations(newCollaborations);
//                                     setValue('collaborations', newCollaborations);
//                                   }}
//                                   placeholder="Institution name"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Input
//                                   value={collaboration.objective}
//                                   onChange={(e) => {
//                                     const newCollaborations = [...collaborations];
//                                     newCollaborations[index].objective = e.target.value;
//                                     setCollaborations(newCollaborations);
//                                     setValue('collaborations', newCollaborations);
//                                   }}
//                                   placeholder="Objective"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 {collaborations.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => removeArrayField(setCollaborations, index, 'collaborations')}
//                                   >
//                                     <Minus className="w-4 h-4" />
//                                   </Button>
//                                 )}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="mt-2"
//                         onClick={() => addArrayField(
//                           setCollaborations,
//                           { institutionName: '', objective: '' },
//                           'collaborations'
//                         )}
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Collaboration
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 4: Human Resources */}
//               <TabsContent value="hr" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 4: Human Resources</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="academicStaff">Current Number of Academic Staff (by Rank)</Label>
//                         <Textarea
//                           id="academicStaff"
//                           {...register('academicStaff')}
//                           placeholder="List academic staff by rank..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="adminStaff">Current Number of Administrative/Technical Staff</Label>
//                         <Textarea
//                           id="adminStaff"
//                           {...register('adminStaff')}
//                           placeholder="List administrative/technical staff..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="newRecruitments">New Recruitments During Reporting Period</Label>
//                         <Textarea
//                           id="newRecruitments"
//                           {...register('newRecruitments')}
//                           placeholder="Describe new recruitments..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="trainings">Trainings/Workshops Attended by Staff</Label>
//                         <Textarea
//                           id="trainings"
//                           {...register('trainings')}
//                           placeholder="List trainings and workshops..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="promotions">Promotions or Achievements</Label>
//                         <Textarea
//                           id="promotions"
//                           {...register('promotions')}
//                           placeholder="Describe promotions and achievements..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="retirements">Major Retirements/Resignations</Label>
//                         <Textarea
//                           id="retirements"
//                           {...register('retirements')}
//                           placeholder="List retirements and resignations..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="developmentNeeds">Staff Development Needs Identified</Label>
//                         <Textarea
//                           id="developmentNeeds"
//                           {...register('developmentNeeds')}
//                           placeholder="Describe development needs..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 5: Infrastructure and Facilities */}
//               <TabsContent value="infrastructure" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 5: Infrastructure and Facilities</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="infrastructureAdditions">Additions to Existing Infrastructure</Label>
//                         <Textarea
//                           id="infrastructureAdditions"
//                           {...register('infrastructureAdditions')}
//                           placeholder="Describe infrastructure additions..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="newFacilities">New Facilities Added or Upgraded</Label>
//                         <Textarea
//                           id="newFacilities"
//                           {...register('newFacilities')}
//                           placeholder="Describe new facilities..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="constructionStatus">Status of Major Construction/Renovation Projects</Label>
//                         <Textarea
//                           id="constructionStatus"
//                           {...register('constructionStatus')}
//                           placeholder="Describe construction status..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="equipmentProcured">Equipment Procured</Label>
//                         <Textarea
//                           id="equipmentProcured"
//                           {...register('equipmentProcured')}
//                           placeholder="List equipment procured..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="infrastructureChallenges">Challenges Related to Infrastructure</Label>
//                         <Textarea
//                           id="infrastructureChallenges"
//                           {...register('infrastructureChallenges')}
//                           placeholder="Describe infrastructure challenges..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="accessibilityMeasures">Accessibility and Inclusivity Measures</Label>
//                         <Textarea
//                           id="accessibilityMeasures"
//                           {...register('accessibilityMeasures')}
//                           placeholder="Describe accessibility measures..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 6: Financial Status */}
//               <TabsContent value="financial" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 6: Financial Status</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="budgetAllocated">Total Annual Budget Allocated</Label>
//                         <Textarea
//                           id="budgetAllocated"
//                           {...register('budgetAllocated')}
//                           placeholder="Describe budget allocation..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="actualExpenditure">Actual Expenditure (by Major Heads)</Label>
//                         <Textarea
//                           id="actualExpenditure"
//                           {...register('actualExpenditure')}
//                           placeholder="Describe actual expenditure..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="revenueGenerated">Revenue Generated (Tuition Fees, Grants, Consultancies)</Label>
//                         <Textarea
//                           id="revenueGenerated"
//                           {...register('revenueGenerated')}
//                           placeholder="Describe revenue generated..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="financialChallenges">Financial Challenges Faced</Label>
//                         <Textarea
//                           id="financialChallenges"
//                           {...register('financialChallenges')}
//                           placeholder="Describe financial challenges..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="auditStatus">Audit and Compliance Status</Label>
//                         <Textarea
//                           id="auditStatus"
//                           {...register('auditStatus')}
//                           placeholder="Describe audit status..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 7: Governance and Management */}
//               <TabsContent value="governance" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 7: Governance and Management</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="meetingsHeld">Meetings Held (Faculty Board, Committees, etc.)</Label>
//                         <Textarea
//                           id="meetingsHeld"
//                           {...register('meetingsHeld')}
//                           placeholder="Describe meetings held..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="keyDecisions">Key Decisions Taken</Label>
//                         <Textarea
//                           id="keyDecisions"
//                           {...register('keyDecisions')}
//                           placeholder="Describe key decisions..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="policyUpdates">Policy Updates or Changes</Label>
//                         <Textarea
//                           id="policyUpdates"
//                           {...register('policyUpdates')}
//                           placeholder="Describe policy updates..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="grievanceHandling">Grievance Handling Mechanisms</Label>
//                         <Textarea
//                           id="grievanceHandling"
//                           {...register('grievanceHandling')}
//                           placeholder="Describe grievance handling..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="transparencyInitiatives">Initiatives for Transparency and Accountability</Label>
//                         <Textarea
//                           id="transparencyInitiatives"
//                           {...register('transparencyInitiatives')}
//                           placeholder="Describe transparency initiatives..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 8: Student Affairs and Support Services */}
//               <TabsContent value="student" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 8: Student Affairs and Support Services</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="scholarships">Scholarships and Financial Aid Programs</Label>
//                         <Textarea
//                           id="scholarships"
//                           {...register('scholarships')}
//                           placeholder="Describe scholarship programs..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="careerCounseling">Career Counseling and Placement Services</Label>
//                         <Textarea
//                           id="careerCounseling"
//                           {...register('careerCounseling')}
//                           placeholder="Describe career services..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="extracurricular">Extracurricular Activities (Sports, Cultural, Clubs)</Label>
//                         <Textarea
//                           id="extracurricular"
//                           {...register('extracurricular')}
//                           placeholder="Describe extracurricular activities..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="alumniEngagement">Alumni Engagement Activities</Label>
//                         <Textarea
//                           id="alumniEngagement"
//                           {...register('alumniEngagement')}
//                           placeholder="Describe alumni engagement..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="studentAchievements">Major Achievements of Students</Label>
//                         <Textarea
//                           id="studentAchievements"
//                           {...register('studentAchievements')}
//                           placeholder="Describe student achievements..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 9: Community Engagement and Extension Activities */}
//               <TabsContent value="community" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 9: Community Engagement and Extension Activities</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="outreachPrograms">Community Outreach Programs Conducted</Label>
//                         <Textarea
//                           id="outreachPrograms"
//                           {...register('outreachPrograms')}
//                           placeholder="Describe outreach programs..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="communityCollaborations">Collaborations with Local Communities/Organizations</Label>
//                         <Textarea
//                           id="communityCollaborations"
//                           {...register('communityCollaborations')}
//                           placeholder="Describe community collaborations..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="socialResponsibility">Social Responsibility Initiatives</Label>
//                         <Textarea
//                           id="socialResponsibility"
//                           {...register('socialResponsibility')}
//                           placeholder="Describe social responsibility initiatives..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="continuingEducation">Continuing Education or Non-Degree Programs</Label>
//                         <Textarea
//                           id="continuingEducation"
//                           {...register('continuingEducation')}
//                           placeholder="Describe continuing education programs..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 10: Achievements and Recognition */}
//               <TabsContent value="achievements" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 10: Achievements and Recognition</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="awards">Major Awards, Honors, or Recognitions Received</Label>
//                         <Textarea
//                           id="awards"
//                           {...register('awards')}
//                           placeholder="Describe awards and recognitions..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="successStories">Success Stories and Best Practices</Label>
//                         <Textarea
//                           id="successStories"
//                           {...register('successStories')}
//                           placeholder="Describe success stories..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="reputationContributions">Significant Contributions to the University's Reputation</Label>
//                         <Textarea
//                           id="reputationContributions"
//                           {...register('reputationContributions')}
//                           placeholder="Describe contributions to reputation..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 11: Challenges and Lessons Learned */}
//               <TabsContent value="challenges" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 11: Challenges and Lessons Learned</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="keyChallenges">Key Challenges Faced During the Year</Label>
//                         <Textarea
//                           id="keyChallenges"
//                           {...register('keyChallenges')}
//                           placeholder="Describe key challenges..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="strategies">Strategies Adopted to Address Them</Label>
//                         <Textarea
//                           id="strategies"
//                           {...register('strategies')}
//                           placeholder="Describe strategies adopted..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="lessonsLearned">Lessons Learned for Future Activities</Label>
//                         <Textarea
//                           id="lessonsLearned"
//                           {...register('lessonsLearned')}
//                           placeholder="Describe lessons learned..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Section 12: Future Plans and Recommendations */}
//               <TabsContent value="future" className="faculty-tab-content">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Section 12: Future Plans and Recommendations</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div>
//                         <Label htmlFor="majorGoals">Major Goals and Priorities for Next Academic Year</Label>
//                         <Textarea
//                           id="majorGoals"
//                           {...register('majorGoals')}
//                           placeholder="Describe major goals..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="proposedProjects">Proposed Projects/Initiatives</Label>
//                         <Textarea
//                           id="proposedProjects"
//                           {...register('proposedProjects')}
//                           placeholder="Describe proposed projects..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="supportNeeded">Support Needed from Central Administration</Label>
//                         <Textarea
//                           id="supportNeeded"
//                           {...register('supportNeeded')}
//                           placeholder="Describe support needed..."
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="policyReforms">Policy or Structural Reforms Suggested</Label>
//                         <Textarea
//                           id="policyReforms"
//                           {...register('policyReforms')}
//                           placeholder="Describe policy reforms..."
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>

//             <div className="faculty-form-actions">
//               <Button type="submit" className="faculty-submit-btn">
//                 <Save className="w-4 h-4 mr-2" />
//                 Submit Faculty Report
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default FacultyForm;



import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Minus, Save, FileText } from 'lucide-react';
import { toast } from 'sonner';
import './facultyForm.component.css';
import axios from 'axios';

// Define interfaces
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

interface FacultyFormData {
  // Section 1: General Information
  instituteName: string;
  reportingPeriod: string;
  headName: string;
  phone: string;
  email: string;
  submissionDate: string;

  // Section 2: Academic Programs
  academicPrograms: AcademicProgram[];
  newPrograms: string[];
  studentEnrollment: StudentEnrollment[];
  graduates: Graduate[];
  curriculumUpdates: string;
  teachingInnovations: string;
  digitalTools: string;
  studentFeedback: string;
  academicChallenges: string;

  // Section 3: Research and Innovation
  researchProjectsInitiated: number;
  researchProjectsCompleted: number;
  researchFunding: string;
  publications: string;
  patents: string;
  conferences: string;
  facultyParticipation: string;
  studentResearch: string;
  collaborations: Collaboration[];

  // Section 4: Human Resources
  academicStaff: string;
  adminStaff: string;
  newRecruitments: string;
  trainings: string;
  promotions: string;
  retirements: string;
  developmentNeeds: string;

  // Section 5: Infrastructure and Facilities
  infrastructureAdditions: string;
  newFacilities: string;
  constructionStatus: string;
  equipmentProcured: string;
  infrastructureChallenges: string;
  accessibilityMeasures: string;

  // Section 6: Financial Status
  budgetAllocated: string;
  actualExpenditure: string;
  revenueGenerated: string;
  financialChallenges: string;
  auditStatus: string;

  // Section 7: Governance and Management
  meetingsHeld: string;
  keyDecisions: string;
  policyUpdates: string;
  grievanceHandling: string;
  transparencyInitiatives: string;

  // Section 8: Student Affairs and Support Services
  scholarships: string;
  careerCounseling: string;
  extracurricular: string;
  alumniEngagement: string;
  studentAchievements: string;

  // Section 9: Community Engagement and Extension Activities
  outreachPrograms: string;
  communityCollaborations: string;
  socialResponsibility: string;
  continuingEducation: string;

  // Section 10: Achievements and Recognition
  awards: string;
  successStories: string;
  reputationContributions: string;

  // Section 11: Challenges and Lessons Learned
  keyChallenges: string;
  strategies: string;
  lessonsLearned: string;

  // Section 12: Future Plans and Recommendations
  majorGoals: string;
  proposedProjects: string;
  supportNeeded: string;
  policyReforms: string;
}

const FacultyForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [academicPrograms, setAcademicPrograms] = useState<AcademicProgram[]>([
    { level: '', programName: '', programType: '', specializationAreas: [''] }
  ]);
  const [newPrograms, setNewPrograms] = useState<string[]>(['']);
  const [studentEnrollment, setStudentEnrollment] = useState<StudentEnrollment[]>([{
    program: '', level: '',
    constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
    constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
    affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
    affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
  }]);
  const [graduates, setGraduates] = useState<Graduate[]>([{
    program: '', semester: '',
    constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
    constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
    affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
    affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
  }]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([{ institutionName: '', objective: '' }]);

  const { register, handleSubmit, setValue } = useForm<FacultyFormData>({
    defaultValues: {
      academicPrograms: academicPrograms,
      newPrograms: [''],
      studentEnrollment: studentEnrollment,
      graduates: graduates,
      collaborations: collaborations,
      researchProjectsInitiated: 0,
      researchProjectsCompleted: 0,
    }
  });

  const addArrayField = <T,>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    defaultValue: T,
    fieldName: keyof FacultyFormData
  ) => {
    setter(prev => {
      const newArray = [...prev, defaultValue];
      setValue(fieldName, newArray as FacultyFormData[keyof FacultyFormData]);
      return newArray;
    });
  };

  const removeArrayField = <T,>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    index: number,
    fieldName: keyof FacultyFormData
  ) => {
    setter(prev => {
      const newArray = prev.filter((_, i) => i !== index);
      setValue(fieldName, newArray as FacultyFormData[keyof FacultyFormData]);
      return newArray;
    });
  };

  const addSpecializationArea = (programIndex: number) => {
    const newPrograms = [...academicPrograms];
    newPrograms[programIndex].specializationAreas.push('');
    setAcademicPrograms(newPrograms);
    setValue('academicPrograms', newPrograms);
  };

  const removeSpecializationArea = (programIndex: number, areaIndex: number) => {
    const newPrograms = [...academicPrograms];
    newPrograms[programIndex].specializationAreas = newPrograms[programIndex].specializationAreas.filter((_, i) => i !== areaIndex);
    setAcademicPrograms(newPrograms);
    setValue('academicPrograms', newPrograms);
  };

  const updateSpecializationArea = (programIndex: number, areaIndex: number, value: string) => {
    const newPrograms = [...academicPrograms];
    newPrograms[programIndex].specializationAreas[areaIndex] = value;
    setAcademicPrograms(newPrograms);
    setValue('academicPrograms', newPrograms);
  };

  const updateAcademicProgram = (programIndex: number, field: keyof AcademicProgram, value: string) => {
    const newPrograms = [...academicPrograms];
    newPrograms[programIndex] = { ...newPrograms[programIndex], [field]: value };
    setAcademicPrograms(newPrograms);
    setValue('academicPrograms', newPrograms);
  };

  const handleNumberInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    array: any[],
    index: number,
    field: string,
    formField: keyof FacultyFormData
  ) => {
    const numericValue = value === '' ? 0 : parseInt(value) || 0;
    const newArray = [...array];
    newArray[index] = { ...newArray[index], [field]: numericValue };
    
    // Auto-calculate totals
    if (field.includes('M') || field.includes('F')) {
      const baseField = field.replace(/M|F|T$/, '');
      const maleField = `${baseField}M`;
      const femaleField = `${baseField}F`;
      const totalField = `${baseField}T`;
      
      if (newArray[index][maleField] !== undefined && newArray[index][femaleField] !== undefined) {
        newArray[index][totalField] = newArray[index][maleField] + newArray[index][femaleField];
      }
    }
    
    setter(newArray);
    setValue(formField, newArray);
  };

  // const onSubmit = async (data: FacultyFormData) => {
  //   console.log("on submit called", data);
  //   try {
  //     const response = await fetch('http:localhost:3000/api/faculty-forms', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       toast.success('Faculty form submitted successfully!');
  //     } else {
  //       throw new Error('Failed to submit form');
  //     }
  //   } catch (error) {
  //     toast.error('Error submitting form. Please try again.');
  //     console.error('Error:', error);
  //   }
  // };

  const onSubmit = async (data: FacultyFormData) => {
  console.log("on submit called", data);
  try {
    const response = await axios.post('http://202.70.90.11:81/api/faculty-forms', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      toast.success('Faculty form submitted successfully!');
    } else {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    toast.error('Error submitting form. Please try again.');
    console.error('Error:', error);
  }
};

  return (
    <div className="faculty-form-container">
      <Card className="faculty-form-card">
       
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="faculty-form">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="faculty-form-tabs">
              <TabsList className="faculty-tabs-list"
              style={{display:'flex',flexWrap:'wrap'}}
              >
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="hr">HR</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="governance">Governance</TabsTrigger>
                <TabsTrigger value="student">Student Affairs</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="future">Future Plans</TabsTrigger>
              </TabsList>

              {/* Section 1: General Information */}
              <TabsContent value="general" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 1: General Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="instituteName">Name of Institute/Faculty/Department/Unit</Label>
                        <Input
                          id="instituteName"
                          {...register('instituteName')}
                          placeholder="Enter institute name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reportingPeriod">Year/Reporting Period</Label>
                        <Input
                          id="reportingPeriod"
                          {...register('reportingPeriod')}
                          placeholder="e.g., 2023-2024"
                        />
                      </div>
                      <div>
                        <Label htmlFor="headName">Head/Coordinator Name</Label>
                        <Input
                          id="headName"
                          {...register('headName')}
                          placeholder="Enter head/coordinator name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="submissionDate">Date of Submission</Label>
                        <Input
                          id="submissionDate"
                          type="date"
                          {...register('submissionDate')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 2: Academic Programs */}
              <TabsContent value="academic" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 2: Academic Programs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Academic Programs */}
                    <div>
                      <Label>List of Academic Programs Offered with Specializations</Label>
                      {academicPrograms.map((program, programIndex) => (
                        <div key={programIndex} className="border rounded-lg p-4 mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <Label>Level</Label>
                              <Select
                                value={program.level}
                                onValueChange={(value) => updateAcademicProgram(programIndex, 'level', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                                  <SelectItem value="Master">Master</SelectItem>
                                  <SelectItem value="MPhil">MPhil</SelectItem>
                                  <SelectItem value="PhD">PhD</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Program Name</Label>
                              <Input
                                value={program.programName}
                                onChange={(e) => updateAcademicProgram(programIndex, 'programName', e.target.value)}
                                placeholder="Enter program name"
                              />
                            </div>
                            <div>
                              <Label>Program Type</Label>
                              <Select
                                value={program.programType}
                                onValueChange={(value) => updateAcademicProgram(programIndex, 'programType', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Year-wise">Year-wise</SelectItem>
                                  <SelectItem value="Semester-wise">Semester-wise</SelectItem>
                                  <SelectItem value="Trimester-wise">Trimester-wise</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label>Areas of Specialization</Label>
                            {program.specializationAreas.map((area, areaIndex) => (
                              <div key={areaIndex} className="flex gap-2 mt-2">
                                <Input
                                  value={area}
                                  onChange={(e) => updateSpecializationArea(programIndex, areaIndex, e.target.value)}
                                  placeholder="Enter specialization area"
                                />
                                {program.specializationAreas.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeSpecializationArea(programIndex, areaIndex)}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => addSpecializationArea(programIndex)}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Specialization
                            </Button>
                          </div>

                          {academicPrograms.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-4"
                              onClick={() => removeArrayField(setAcademicPrograms, programIndex, 'academicPrograms')}
                            >
                              <Minus className="w-4 h-4 mr-2" />
                              Remove Program
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => addArrayField(
                          setAcademicPrograms,
                          { level: '', programName: '', programType: '', specializationAreas: [''] },
                          'academicPrograms'
                        )}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Program
                      </Button>
                    </div>

                    {/* Student Enrollment Table */}
                    <div>
                      <Label>3. Number of Students enrolled (program-wise, year-wise)</Label>
                      <Table className="mt-2">
                        <TableHeader>
                          <TableRow>
                            <TableHead rowSpan={2}>Program</TableHead>
                            <TableHead rowSpan={2}>Level</TableHead>
                            <TableHead colSpan={6} className="text-center">Constituent Campus</TableHead>
                            <TableHead colSpan={6} className="text-center">Affiliated Campus</TableHead>
                            <TableHead rowSpan={2}>Actions</TableHead>
                          </TableRow>
                          <TableRow>
                            {/* Constituent Campus Headers */}
                            <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
                            <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
                            {/* Affiliated Campus Headers */}
                            <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
                            <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
                          </TableRow>
                          <TableRow>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                            {/* Constituent Campus Sub-headers */}
                            <TableHead>Male</TableHead>
                            <TableHead>Female</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Male</TableHead>
                            <TableHead>Female</TableHead>
                            <TableHead>Total</TableHead>
                            {/* Affiliated Campus Sub-headers */}
                            <TableHead>Male</TableHead>
                            <TableHead>Female</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Male</TableHead>
                            <TableHead>Female</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentEnrollment.map((enrollment, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Input
                                  value={enrollment.program}
                                  onChange={(e) => {
                                    const newEnrollment = [...studentEnrollment];
                                    newEnrollment[index].program = e.target.value;
                                    setStudentEnrollment(newEnrollment);
                                    setValue('studentEnrollment', newEnrollment);
                                  }}
                                  placeholder="Program"
                                />
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={enrollment.level}
                                  onValueChange={(value) => {
                                    const newEnrollment = [...studentEnrollment];
                                    newEnrollment[index].level = value;
                                    setStudentEnrollment(newEnrollment);
                                    setValue('studentEnrollment', newEnrollment);
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Bachelor">Bachelor</SelectItem>
                                    <SelectItem value="Master">Master</SelectItem>
                                    <SelectItem value="MPhil">MPhil</SelectItem>
                                    <SelectItem value="PhD">PhD</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              {/* Constituent Campus - Exam Appeared */}
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.constituentExamAppearedM}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setStudentEnrollment,
                                    studentEnrollment,
                                    index,
                                    'constituentExamAppearedM',
                                    'studentEnrollment'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.constituentExamAppearedF}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setStudentEnrollment,
                                    studentEnrollment,
                                    index,
                                    'constituentExamAppearedF',
                                    'studentEnrollment'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.constituentExamAppearedT}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </TableCell>
                              {/* Constituent Campus - Exam Passed */}
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.constituentExamPassedM}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setStudentEnrollment,
                                    studentEnrollment,
                                    index,
                                    'constituentExamPassedM',
                                    'studentEnrollment'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.constituentExamPassedF}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setStudentEnrollment,
                                    studentEnrollment,
                                    index,
                                    'constituentExamPassedF',
                                    'studentEnrollment'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.constituentExamPassedT}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </TableCell>
                              {/* Affiliated Campus - Exam Appeared */}
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.affiliatedExamAppearedM}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setStudentEnrollment,
                                    studentEnrollment,
                                    index,
                                    'affiliatedExamAppearedM',
                                    'studentEnrollment'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.affiliatedExamAppearedF}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setStudentEnrollment,
                                    studentEnrollment,
                                    index,
                                    'affiliatedExamAppearedF',
                                    'studentEnrollment'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.affiliatedExamAppearedT}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </TableCell>
                              {/* Affiliated Campus - Exam Passed */}
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.affiliatedExamPassedM}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setStudentEnrollment,
                                    studentEnrollment,
                                    index,
                                    'affiliatedExamPassedM',
                                    'studentEnrollment'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.affiliatedExamPassedF}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setStudentEnrollment,
                                    studentEnrollment,
                                    index,
                                    'affiliatedExamPassedF',
                                    'studentEnrollment'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={enrollment.affiliatedExamPassedT}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </TableCell>
                              <TableCell>
                                {studentEnrollment.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeArrayField(setStudentEnrollment, index, 'studentEnrollment')}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => addArrayField(
                          setStudentEnrollment,
                          {
                            program: '', level: '',
                            constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
                            constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
                            affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
                            affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
                          },
                          'studentEnrollment'
                        )}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Enrollment Record
                      </Button>
                    </div>

                    {/* Number of Graduates Table */}
                    <div>
                      <Label>4. Number of Graduates (Program-wise)</Label>
                      <Table className="mt-2">
                        <TableHeader>
                          <TableRow>
                            <TableHead rowSpan={2}>S.N.</TableHead>
                            <TableHead rowSpan={2}>Program</TableHead>
                            <TableHead rowSpan={2}>Semester</TableHead>
                            <TableHead colSpan={6} className="text-center">Constituent Campus</TableHead>
                            <TableHead colSpan={6} className="text-center">Affiliated Campus</TableHead>
                            <TableHead rowSpan={2}>Actions</TableHead>
                          </TableRow>
                          <TableRow>
                            {/* Constituent Campus Headers */}
                            <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
                            <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
                            {/* Affiliated Campus Headers */}
                            <TableHead colSpan={3} className="text-center">Exam Appeared Student</TableHead>
                            <TableHead colSpan={3} className="text-center">Exam Passed Student</TableHead>
                          </TableRow>
                          <TableRow>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                            {/* Constituent Campus Sub-headers */}
                            <TableHead>Male</TableHead>
                            <TableHead>Female</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Male</TableHead>
                            <TableHead>Female</TableHead>
                            <TableHead>Total</TableHead>
                            {/* Affiliated Campus Sub-headers */}
                            <TableHead>Male</TableHead>
                            <TableHead>Female</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Male</TableHead>
                            <TableHead>Female</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {graduates.map((graduate, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Input
                                  value={(index + 1).toString()}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={graduate.program}
                                  onChange={(e) => {
                                    const newGraduates = [...graduates];
                                    newGraduates[index].program = e.target.value;
                                    setGraduates(newGraduates);
                                    setValue('graduates', newGraduates);
                                  }}
                                  placeholder="Program"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={graduate.semester}
                                  onChange={(e) => {
                                    const newGraduates = [...graduates];
                                    newGraduates[index].semester = e.target.value;
                                    setGraduates(newGraduates);
                                    setValue('graduates', newGraduates);
                                  }}
                                  placeholder="Semester"
                                />
                              </TableCell>
                              {/* Constituent Campus - Exam Appeared */}
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.constituentExamAppearedM}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setGraduates,
                                    graduates,
                                    index,
                                    'constituentExamAppearedM',
                                    'graduates'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.constituentExamAppearedF}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setGraduates,
                                    graduates,
                                    index,
                                    'constituentExamAppearedF',
                                    'graduates'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.constituentExamAppearedT}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </TableCell>
                              {/* Constituent Campus - Exam Passed */}
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.constituentExamPassedM}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setGraduates,
                                    graduates,
                                    index,
                                    'constituentExamPassedM',
                                    'graduates'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.constituentExamPassedF}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setGraduates,
                                    graduates,
                                    index,
                                    'constituentExamPassedF',
                                    'graduates'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.constituentExamPassedT}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </TableCell>
                              {/* Affiliated Campus - Exam Appeared */}
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.affiliatedExamAppearedM}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setGraduates,
                                    graduates,
                                    index,
                                    'affiliatedExamAppearedM',
                                    'graduates'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.affiliatedExamAppearedF}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setGraduates,
                                    graduates,
                                    index,
                                    'affiliatedExamAppearedF',
                                    'graduates'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.affiliatedExamAppearedT}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </TableCell>
                              {/* Affiliated Campus - Exam Passed */}
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.affiliatedExamPassedM}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setGraduates,
                                    graduates,
                                    index,
                                    'affiliatedExamPassedM',
                                    'graduates'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.affiliatedExamPassedF}
                                  onChange={(e) => handleNumberInputChange(
                                    e.target.value,
                                    setGraduates,
                                    graduates,
                                    index,
                                    'affiliatedExamPassedF',
                                    'graduates'
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={graduate.affiliatedExamPassedT}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </TableCell>
                              <TableCell>
                                {graduates.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeArrayField(setGraduates, index, 'graduates')}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => addArrayField(
                          setGraduates,
                          {
                            program: '', semester: '',
                            constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedT: 0,
                            constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedT: 0,
                            affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedT: 0,
                            affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedT: 0
                          },
                          'graduates'
                        )}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Graduate Record
                      </Button>
                    </div>

                    {/* Additional Academic Fields */}
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="curriculumUpdates">Curriculum Updates or Revisions Undertaken</Label>
                        <Textarea
                          id="curriculumUpdates"
                          {...register('curriculumUpdates')}
                          placeholder="Describe curriculum updates..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="teachingInnovations">Innovations in Teaching-Learning Methods</Label>
                        <Textarea
                          id="teachingInnovations"
                          {...register('teachingInnovations')}
                          placeholder="Describe teaching innovations..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="digitalTools">Use of Online/Digital Tools in Education</Label>
                        <Textarea
                          id="digitalTools"
                          {...register('digitalTools')}
                          placeholder="Describe digital tools usage..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentFeedback">Student Feedback Mechanisms and Key Outcomes</Label>
                        <Textarea
                          id="studentFeedback"
                          {...register('studentFeedback')}
                          placeholder="Describe feedback mechanisms..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="academicChallenges">Challenges Faced in Academic Delivery</Label>
                        <Textarea
                          id="academicChallenges"
                          {...register('academicChallenges')}
                          placeholder="Describe academic challenges..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 3: Research and Innovation */}
              <TabsContent value="research" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 3: Research and Innovation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="researchProjectsInitiated">Number of Research Projects Initiated</Label>
                        <Input
                          id="researchProjectsInitiated"
                          type="number"
                          {...register('researchProjectsInitiated', { valueAsNumber: true })}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="researchProjectsCompleted">Number of Research Projects Completed</Label>
                        <Input
                          id="researchProjectsCompleted"
                          type="number"
                          {...register('researchProjectsCompleted', { valueAsNumber: true })}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="researchFunding">Research Funding Received (Internal/External)</Label>
                        <Textarea
                          id="researchFunding"
                          {...register('researchFunding')}
                          placeholder="Describe research funding received..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="publications">Publications (Books, Journals, Conferences)</Label>
                        <Textarea
                          id="publications"
                          {...register('publications')}
                          placeholder="List publications..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="patents">Patents Filed/Granted (if any)</Label>
                        <Textarea
                          id="patents"
                          {...register('patents')}
                          placeholder="List patents..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="conferences">Conferences/Seminars/Workshops Organized</Label>
                        <Textarea
                          id="conferences"
                          {...register('conferences')}
                          placeholder="List conferences organized..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="facultyParticipation">Faculty Participation in External Research Events</Label>
                        <Textarea
                          id="facultyParticipation"
                          {...register('facultyParticipation')}
                          placeholder="Describe faculty participation..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentResearch">Student Involvement in Research Activities</Label>
                        <Textarea
                          id="studentResearch"
                          {...register('studentResearch')}
                          placeholder="Describe student research involvement..."
                        />
                      </div>
                    </div>

                    {/* Collaborations Table */}
                    <div>
                      <Label>Collaborations/MoUs with National or International Institutions</Label>
                      <Table className="mt-2">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Institution's Name</TableHead>
                            <TableHead>Objective</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {collaborations.map((collaboration, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Input
                                  value={collaboration.institutionName}
                                  onChange={(e) => {
                                    const newCollaborations = [...collaborations];
                                    newCollaborations[index].institutionName = e.target.value;
                                    setCollaborations(newCollaborations);
                                    setValue('collaborations', newCollaborations);
                                  }}
                                  placeholder="Institution name"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={collaboration.objective}
                                  onChange={(e) => {
                                    const newCollaborations = [...collaborations];
                                    newCollaborations[index].objective = e.target.value;
                                    setCollaborations(newCollaborations);
                                    setValue('collaborations', newCollaborations);
                                  }}
                                  placeholder="Objective"
                                />
                              </TableCell>
                              <TableCell>
                                {collaborations.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeArrayField(setCollaborations, index, 'collaborations')}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => addArrayField(
                          setCollaborations,
                          { institutionName: '', objective: '' },
                          'collaborations'
                        )}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Collaboration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Remaining sections - they remain the same as before */}
              <TabsContent value="hr" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 4: Human Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="academicStaff">Current Number of Academic Staff (by Rank)</Label>
                        <Textarea
                          id="academicStaff"
                          {...register('academicStaff')}
                          placeholder="List academic staff by rank..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="adminStaff">Current Number of Administrative/Technical Staff</Label>
                        <Textarea
                          id="adminStaff"
                          {...register('adminStaff')}
                          placeholder="List administrative/technical staff..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="newRecruitments">New Recruitments During Reporting Period</Label>
                        <Textarea
                          id="newRecruitments"
                          {...register('newRecruitments')}
                          placeholder="Describe new recruitments..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="trainings">Trainings/Workshops Attended by Staff</Label>
                        <Textarea
                          id="trainings"
                          {...register('trainings')}
                          placeholder="List trainings and workshops..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="promotions">Promotions or Achievements</Label>
                        <Textarea
                          id="promotions"
                          {...register('promotions')}
                          placeholder="Describe promotions and achievements..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="retirements">Major Retirements/Resignations</Label>
                        <Textarea
                          id="retirements"
                          {...register('retirements')}
                          placeholder="List retirements and resignations..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="developmentNeeds">Staff Development Needs Identified</Label>
                        <Textarea
                          id="developmentNeeds"
                          {...register('developmentNeeds')}
                          placeholder="Describe development needs..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 5: Infrastructure and Facilities */}
              <TabsContent value="infrastructure" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 5: Infrastructure and Facilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="infrastructureAdditions">Additions to Existing Infrastructure</Label>
                        <Textarea
                          id="infrastructureAdditions"
                          {...register('infrastructureAdditions')}
                          placeholder="Describe infrastructure additions..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="newFacilities">New Facilities Added or Upgraded</Label>
                        <Textarea
                          id="newFacilities"
                          {...register('newFacilities')}
                          placeholder="Describe new facilities..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="constructionStatus">Status of Major Construction/Renovation Projects</Label>
                        <Textarea
                          id="constructionStatus"
                          {...register('constructionStatus')}
                          placeholder="Describe construction status..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="equipmentProcured">Equipment Procured</Label>
                        <Textarea
                          id="equipmentProcured"
                          {...register('equipmentProcured')}
                          placeholder="List equipment procured..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="infrastructureChallenges">Challenges Related to Infrastructure</Label>
                        <Textarea
                          id="infrastructureChallenges"
                          {...register('infrastructureChallenges')}
                          placeholder="Describe infrastructure challenges..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="accessibilityMeasures">Accessibility and Inclusivity Measures</Label>
                        <Textarea
                          id="accessibilityMeasures"
                          {...register('accessibilityMeasures')}
                          placeholder="Describe accessibility measures..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 6: Financial Status */}
              <TabsContent value="financial" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 6: Financial Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="budgetAllocated">Total Annual Budget Allocated</Label>
                        <Textarea
                          id="budgetAllocated"
                          {...register('budgetAllocated')}
                          placeholder="Describe budget allocation..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="actualExpenditure">Actual Expenditure (by Major Heads)</Label>
                        <Textarea
                          id="actualExpenditure"
                          {...register('actualExpenditure')}
                          placeholder="Describe actual expenditure..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="revenueGenerated">Revenue Generated (Tuition Fees, Grants, Consultancies)</Label>
                        <Textarea
                          id="revenueGenerated"
                          {...register('revenueGenerated')}
                          placeholder="Describe revenue generated..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="financialChallenges">Financial Challenges Faced</Label>
                        <Textarea
                          id="financialChallenges"
                          {...register('financialChallenges')}
                          placeholder="Describe financial challenges..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="auditStatus">Audit and Compliance Status</Label>
                        <Textarea
                          id="auditStatus"
                          {...register('auditStatus')}
                          placeholder="Describe audit status..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 7: Governance and Management */}
              <TabsContent value="governance" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 7: Governance and Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="meetingsHeld">Meetings Held (Faculty Board, Committees, etc.)</Label>
                        <Textarea
                          id="meetingsHeld"
                          {...register('meetingsHeld')}
                          placeholder="Describe meetings held..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="keyDecisions">Key Decisions Taken</Label>
                        <Textarea
                          id="keyDecisions"
                          {...register('keyDecisions')}
                          placeholder="Describe key decisions..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="policyUpdates">Policy Updates or Changes</Label>
                        <Textarea
                          id="policyUpdates"
                          {...register('policyUpdates')}
                          placeholder="Describe policy updates..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="grievanceHandling">Grievance Handling Mechanisms</Label>
                        <Textarea
                          id="grievanceHandling"
                          {...register('grievanceHandling')}
                          placeholder="Describe grievance handling..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="transparencyInitiatives">Initiatives for Transparency and Accountability</Label>
                        <Textarea
                          id="transparencyInitiatives"
                          {...register('transparencyInitiatives')}
                          placeholder="Describe transparency initiatives..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 8: Student Affairs and Support Services */}
              <TabsContent value="student" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 8: Student Affairs and Support Services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="scholarships">Scholarships and Financial Aid Programs</Label>
                        <Textarea
                          id="scholarships"
                          {...register('scholarships')}
                          placeholder="Describe scholarship programs..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="careerCounseling">Career Counseling and Placement Services</Label>
                        <Textarea
                          id="careerCounseling"
                          {...register('careerCounseling')}
                          placeholder="Describe career services..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="extracurricular">Extracurricular Activities (Sports, Cultural, Clubs)</Label>
                        <Textarea
                          id="extracurricular"
                          {...register('extracurricular')}
                          placeholder="Describe extracurricular activities..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="alumniEngagement">Alumni Engagement Activities</Label>
                        <Textarea
                          id="alumniEngagement"
                          {...register('alumniEngagement')}
                          placeholder="Describe alumni engagement..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentAchievements">Major Achievements of Students</Label>
                        <Textarea
                          id="studentAchievements"
                          {...register('studentAchievements')}
                          placeholder="Describe student achievements..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 9: Community Engagement and Extension Activities */}
              <TabsContent value="community" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 9: Community Engagement and Extension Activities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="outreachPrograms">Community Outreach Programs Conducted</Label>
                        <Textarea
                          id="outreachPrograms"
                          {...register('outreachPrograms')}
                          placeholder="Describe outreach programs..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="communityCollaborations">Collaborations with Local Communities/Organizations</Label>
                        <Textarea
                          id="communityCollaborations"
                          {...register('communityCollaborations')}
                          placeholder="Describe community collaborations..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="socialResponsibility">Social Responsibility Initiatives</Label>
                        <Textarea
                          id="socialResponsibility"
                          {...register('socialResponsibility')}
                          placeholder="Describe social responsibility initiatives..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="continuingEducation">Continuing Education or Non-Degree Programs</Label>
                        <Textarea
                          id="continuingEducation"
                          {...register('continuingEducation')}
                          placeholder="Describe continuing education programs..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 10: Achievements and Recognition */}
              <TabsContent value="achievements" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 10: Achievements and Recognition</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="awards">Major Awards, Honors, or Recognitions Received</Label>
                        <Textarea
                          id="awards"
                          {...register('awards')}
                          placeholder="Describe awards and recognitions..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="successStories">Success Stories and Best Practices</Label>
                        <Textarea
                          id="successStories"
                          {...register('successStories')}
                          placeholder="Describe success stories..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="reputationContributions">Significant Contributions to the University's Reputation</Label>
                        <Textarea
                          id="reputationContributions"
                          {...register('reputationContributions')}
                          placeholder="Describe contributions to reputation..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 11: Challenges and Lessons Learned */}
              <TabsContent value="challenges" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 11: Challenges and Lessons Learned</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="keyChallenges">Key Challenges Faced During the Year</Label>
                        <Textarea
                          id="keyChallenges"
                          {...register('keyChallenges')}
                          placeholder="Describe key challenges..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="strategies">Strategies Adopted to Address Them</Label>
                        <Textarea
                          id="strategies"
                          {...register('strategies')}
                          placeholder="Describe strategies adopted..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="lessonsLearned">Lessons Learned for Future Activities</Label>
                        <Textarea
                          id="lessonsLearned"
                          {...register('lessonsLearned')}
                          placeholder="Describe lessons learned..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 12: Future Plans and Recommendations */}
              <TabsContent value="future" className="faculty-tab-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 12: Future Plans and Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="majorGoals">Major Goals and Priorities for Next Academic Year</Label>
                        <Textarea
                          id="majorGoals"
                          {...register('majorGoals')}
                          placeholder="Describe major goals..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="proposedProjects">Proposed Projects/Initiatives</Label>
                        <Textarea
                          id="proposedProjects"
                          {...register('proposedProjects')}
                          placeholder="Describe proposed projects..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="supportNeeded">Support Needed from Central Administration</Label>
                        <Textarea
                          id="supportNeeded"
                          {...register('supportNeeded')}
                          placeholder="Describe support needed..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="policyReforms">Policy or Structural Reforms Suggested</Label>
                        <Textarea
                          id="policyReforms"
                          {...register('policyReforms')}
                          placeholder="Describe policy reforms..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="faculty-form-actions">
              <Button type="submit" className="faculty-submit-btn">
                <Save className="w-4 h-4 mr-2" />
                Submit Faculty Report
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyForm;