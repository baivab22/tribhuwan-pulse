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
import { Plus, Minus, Save, FileText, Users, GraduationCap, BookOpen, Microscope, UserCog, Building, DollarSign, Shield, HeartHandshake, Trophy, AlertCircle, Target, Trash2, Edit, Calendar, Phone, Mail, User, School, Library, Briefcase, Wrench, BarChart, UsersRound, Globe, Lightbulb, TrendingUp, Award, HandHeart } from 'lucide-react';
import { toast } from 'sonner';
import './facultyForm.component.css';
import axios from 'axios';
// import BackgroundRemover from '@/components/removeBg';

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

  const { register, handleSubmit, setValue, watch } = useForm<FacultyFormData>({
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

  // Enhanced array field handlers
  const addArrayField = <T,>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    defaultValue: T,
    fieldName: keyof FacultyFormData
  ) => {
    setter(prev => {
      const newArray = [...prev, defaultValue];
      setValue(fieldName, newArray as any);
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
      setValue(fieldName, newArray as any);
      return newArray;
    });
  };

  // Academic Programs handlers
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

  // Enhanced student enrollment handlers
  const updateStudentEnrollment = (index: number, field: keyof StudentEnrollment, value: string | number) => {
    const newEnrollment = [...studentEnrollment];
    
    if (typeof value === 'string' && field !== 'program' && field !== 'level') {
      value = value === '' ? 0 : parseInt(value) || 0;
    }
    
    newEnrollment[index] = { 
      ...newEnrollment[index], 
      [field]: value 
    };

    // Auto-calculate totals
    if (field.includes('M') || field.includes('F')) {
      const baseField = field.replace(/M|F|T$/, '');
      const maleField = `${baseField}M` as keyof StudentEnrollment;
      const femaleField = `${baseField}F` as keyof StudentEnrollment;
      const totalField = `${baseField}T` as keyof StudentEnrollment;

      if (newEnrollment[index][maleField] !== undefined && newEnrollment[index][femaleField] !== undefined) {
        const maleValue = Number(newEnrollment[index][maleField]) || 0;
        const femaleValue = Number(newEnrollment[index][femaleField]) || 0;
        newEnrollment[index][totalField] = maleValue + femaleValue as any;
      }
    }

    setStudentEnrollment(newEnrollment);
    setValue('studentEnrollment', newEnrollment);
  };

  // Enhanced graduates handlers
  const updateGraduate = (index: number, field: keyof Graduate, value: string | number) => {
    const newGraduates = [...graduates];
    
    if (typeof value === 'string' && field !== 'program' && field !== 'semester') {
      value = value === '' ? 0 : parseInt(value) || 0;
    }
    
    newGraduates[index] = { 
      ...newGraduates[index], 
      [field]: value 
    };

    // Auto-calculate totals
    if (field.includes('M') || field.includes('F')) {
      const baseField = field.replace(/M|F|T$/, '');
      const maleField = `${baseField}M` as keyof Graduate;
      const femaleField = `${baseField}F` as keyof Graduate;
      const totalField = `${baseField}T` as keyof Graduate;

      if (newGraduates[index][maleField] !== undefined && newGraduates[index][femaleField] !== undefined) {
        const maleValue = Number(newGraduates[index][maleField]) || 0;
        const femaleValue = Number(newGraduates[index][femaleField]) || 0;
        newGraduates[index][totalField] = maleValue + femaleValue as any;
      }
    }

    setGraduates(newGraduates);
    setValue('graduates', newGraduates);
  };

  // Collaboration handlers
  const updateCollaboration = (index: number, field: keyof Collaboration, value: string) => {
    const newCollaborations = [...collaborations];
    newCollaborations[index] = { ...newCollaborations[index], [field]: value };
    setCollaborations(newCollaborations);
    setValue('collaborations', newCollaborations);
  };

  const onSubmit = async (data: FacultyFormData) => {
    console.log("Form submitted", data);
    try {
      const response = await axios.post('http://localhost:4000/api/faculty-forms', data, {
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
      // toast.error('Error submitting form. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="faculty-form-container">
      <Card className="faculty-form-card">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
        style={{padding:'20px'}}
        >
          <CardTitle className="flex items-center gap-3 text-2xl">
            <FileText className="w-8 h-8" />
            Faculty Annual Report Form
          </CardTitle>
          <CardDescription className="text-blue-100">
            Complete all sections to submit the annual faculty report
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="faculty-form">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="faculty-form-tabs">
              <TabsList className="faculty-tabs-list">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  General
                </TabsTrigger>
                <TabsTrigger value="academic" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Academic
                </TabsTrigger>
                <TabsTrigger value="research" className="flex items-center gap-2">
                  <Microscope className="w-4 h-4" />
                  Research
                </TabsTrigger>
                <TabsTrigger value="hr" className="flex items-center gap-2">
                  <UserCog className="w-4 h-4" />
                  HR
                </TabsTrigger>
                <TabsTrigger value="infrastructure" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Infrastructure
                </TabsTrigger>
                <TabsTrigger value="financial" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Financial
                </TabsTrigger>
                <TabsTrigger value="governance" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Governance
                </TabsTrigger>
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <UsersRound className="w-4 h-4" />
                  Student Affairs
                </TabsTrigger>
                <TabsTrigger value="community" className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4" />
                  Community
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="challenges" className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Challenges
                </TabsTrigger>
                <TabsTrigger value="future" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Future Plans
                </TabsTrigger>
              </TabsList>

              {/* Section 1: General Information */}
              <TabsContent value="general" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50"
                      style={{padding:'16px'}}
                  >
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <User className="w-5 h-5" />
                      Section 1: General Information
                    </CardTitle>
                    <CardDescription>
                      Basic information about the institute and reporting period
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="instituteName" className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Name of Institute/Faculty/Department/Unit
                        </Label>
                        <Input
                          id="instituteName"
                          {...register('instituteName')}
                          placeholder="Enter institute name"
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reportingPeriod" className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Year/Reporting Period
                        </Label>
                        <Input
                          id="reportingPeriod"
                          {...register('reportingPeriod')}
                          placeholder="e.g., 2023-2024"
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="headName" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Head/Coordinator Name
                        </Label>
                        <Input
                          id="headName"
                          {...register('headName')}
                          placeholder="Enter head/coordinator name"
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          placeholder="Enter phone number"
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="Enter email address"
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="submissionDate" className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date of Submission
                        </Label>
                        <Input
                          id="submissionDate"
                          type="date"
                          {...register('submissionDate')}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 2: Academic Programs */}
              <TabsContent value="academic" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50"
                  style={{padding:'16px'}}
                  >
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <BookOpen className="w-5 h-5" />
                      Section 2: Academic Programs
                    </CardTitle>
                    <CardDescription>
                      Academic programs, student enrollment, and graduate information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    {/* Academic Programs */}
                    <div className="bg-white rounded-lg border shadow-sm">
                      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          <School className="w-5 h-5" />
                          List of Academic Programs Offered with Specializations
                        </Label>
                      </div>
                      <div className="p-6 space-y-4">
                        {academicPrograms.map((program, programIndex) => (
                          <div key={programIndex} className="border rounded-lg p-4 bg-gray-50/50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="space-y-2">
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
                              <div className="space-y-2">
                                <Label>Program Name</Label>
                                <Input
                                  value={program.programName}
                                  onChange={(e) => updateAcademicProgram(programIndex, 'programName', e.target.value)}
                                  placeholder="Enter program name"
                                />
                              </div>
                              <div className="space-y-2">
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
                                    {/* <SelectItem value="Trimester-wise">Trimester-wise</SelectItem> */}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Areas of Specialization</Label>
                              {program.specializationAreas.map((area, areaIndex) => (
                                <div key={areaIndex} className="flex gap-2">
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
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
                                onClick={() => addSpecializationArea(programIndex)}
                                className="flex items-center gap-2"
                              >
                                <Plus className="w-4 h-4" />
                                Add Specialization
                              </Button>
                            </div>

                            {academicPrograms.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => removeArrayField(setAcademicPrograms, programIndex, 'academicPrograms')}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove Program
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayField(
                            setAcademicPrograms,
                            { level: '', programName: '', programType: '', specializationAreas: [''] },
                            'academicPrograms'
                          )}
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Program
                        </Button>
                      </div>
                    </div>

                    {/* Student Enrollment Table */}
                    <div className="bg-white rounded-lg border shadow-sm">
                      <div className="p-4 border-b bg-gradient-to-r from-green-50 to-emerald-50">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          3. Number of Students Enrolled (Program-wise, Year-wise)
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Enter student enrollment data for constituent and affiliated campuses
                        </p>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <Table className="min-w-[1400px]">
                          <TableHeader className="bg-muted/50">
                            <TableRow>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[200px]">
                                Program
                              </TableHead>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[120px]">
                                Level
                              </TableHead>
                              <TableHead colSpan={6} className="text-center border-r font-bold bg-green-100">
                                Constituent Campus
                              </TableHead>
                              <TableHead colSpan={6} className="text-center font-bold bg-orange-100">
                                Affiliated Campus
                              </TableHead>
                              <TableHead rowSpan={3} className="text-center font-bold bg-red-100 min-w-[100px]">
                                Actions
                              </TableHead>
                            </TableRow>
                            <TableRow>
                              <TableHead colSpan={3} className="text-center border-r font-medium bg-green-50">
                                Exam Appeared
                              </TableHead>
                              <TableHead colSpan={3} className="text-center border-r font-medium bg-green-50">
                                Exam Passed
                              </TableHead>
                              <TableHead colSpan={3} className="text-center border-r font-medium bg-orange-50">
                                Exam Appeared
                              </TableHead>
                              <TableHead colSpan={3} className="text-center font-medium bg-orange-50">
                                Exam Passed
                              </TableHead>
                            </TableRow>
                            <TableRow>
                              {/* Constituent Campus - Exam Appeared */}
                              <TableHead className="text-center font-medium bg-green-25 min-w-[80px]">Male</TableHead>
                              <TableHead className="text-center font-medium bg-green-25 min-w-[80px]">Female</TableHead>
                              <TableHead className="text-center font-medium bg-green-25 border-r min-w-[80px]">Total</TableHead>
                              {/* Constituent Campus - Exam Passed */}
                              <TableHead className="text-center font-medium bg-green-25 min-w-[80px]">Male</TableHead>
                              <TableHead className="text-center font-medium bg-green-25 min-w-[80px]">Female</TableHead>
                              <TableHead className="text-center font-medium bg-green-25 border-r min-w-[80px]">Total</TableHead>
                              {/* Affiliated Campus - Exam Appeared */}
                              <TableHead className="text-center font-medium bg-orange-25 min-w-[80px]">Male</TableHead>
                              <TableHead className="text-center font-medium bg-orange-25 min-w-[80px]">Female</TableHead>
                              <TableHead className="text-center font-medium bg-orange-25 border-r min-w-[80px]">Total</TableHead>
                              {/* Affiliated Campus - Exam Passed */}
                              <TableHead className="text-center font-medium bg-orange-25 min-w-[80px]">Male</TableHead>
                              <TableHead className="text-center font-medium bg-orange-25 min-w-[80px]">Female</TableHead>
                              <TableHead className="text-center font-medium bg-orange-25 min-w-[80px]">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {studentEnrollment.map((enrollment, index) => (
                              <TableRow key={index} className="hover:bg-muted/30">
                                <TableCell className="border-r">
                                  <Input
                                    value={enrollment.program}
                                    onChange={(e) => updateStudentEnrollment(index, 'program', e.target.value)}
                                    placeholder="Enter program"
                                    className="min-w-[180px]"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Select
                                    value={enrollment.level}
                                    onValueChange={(value) => updateStudentEnrollment(index, 'level', value)}
                                  >
                                    <SelectTrigger className="min-w-[120px]">
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
                                    min="0"
                                    value={enrollment.constituentExamAppearedM}
                                    onChange={(e) => updateStudentEnrollment(index, 'constituentExamAppearedM', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.constituentExamAppearedF}
                                    onChange={(e) => updateStudentEnrollment(index, 'constituentExamAppearedF', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={enrollment.constituentExamAppearedT}
                                    readOnly
                                    className="text-center bg-muted font-semibold"
                                  />
                                </TableCell>
                                
                                {/* Constituent Campus - Exam Passed */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.constituentExamPassedM}
                                    onChange={(e) => updateStudentEnrollment(index, 'constituentExamPassedM', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.constituentExamPassedF}
                                    onChange={(e) => updateStudentEnrollment(index, 'constituentExamPassedF', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={enrollment.constituentExamPassedT}
                                    readOnly
                                    className="text-center bg-muted font-semibold"
                                  />
                                </TableCell>
                                
                                {/* Affiliated Campus - Exam Appeared */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.affiliatedExamAppearedM}
                                    onChange={(e) => updateStudentEnrollment(index, 'affiliatedExamAppearedM', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.affiliatedExamAppearedF}
                                    onChange={(e) => updateStudentEnrollment(index, 'affiliatedExamAppearedF', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={enrollment.affiliatedExamAppearedT}
                                    readOnly
                                    className="text-center bg-muted font-semibold"
                                  />
                                </TableCell>
                                
                                {/* Affiliated Campus - Exam Passed */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.affiliatedExamPassedM}
                                    onChange={(e) => updateStudentEnrollment(index, 'affiliatedExamPassedM', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.affiliatedExamPassedF}
                                    onChange={(e) => updateStudentEnrollment(index, 'affiliatedExamPassedF', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={enrollment.affiliatedExamPassedT}
                                    readOnly
                                    className="text-center bg-muted font-semibold"
                                  />
                                </TableCell>
                                
                                <TableCell>
                                  <div className="flex justify-center gap-1">
                                    {studentEnrollment.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeArrayField(setStudentEnrollment, index, 'studentEnrollment')}
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
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
                                      className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="p-4 border-t bg-muted/20">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
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
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Enrollment Record
                        </Button>
                      </div>
                    </div>

                    {/* Number of Graduates Table */}
                    <div className="bg-white rounded-lg border shadow-sm">
                      <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          <GraduationCap className="w-5 h-5" />
                          4. Number of Graduates (Program-wise)
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Enter graduate data for constituent and affiliated campuses
                        </p>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <Table className="min-w-[1400px]">
                          <TableHeader className="bg-muted/50">
                            <TableRow>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[60px]">
                                S.N.
                              </TableHead>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[200px]">
                                Program
                              </TableHead>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[120px]">
                                Semester
                              </TableHead>
                              <TableHead colSpan={6} className="text-center border-r font-bold bg-green-100">
                                Constituent Campus
                              </TableHead>
                              <TableHead colSpan={6} className="text-center font-bold bg-orange-100">
                                Affiliated Campus
                              </TableHead>
                              <TableHead rowSpan={3} className="text-center font-bold bg-red-100 min-w-[100px]">
                                Actions
                              </TableHead>
                            </TableRow>
                            <TableRow>
                              <TableHead colSpan={3} className="text-center border-r font-medium bg-green-50">
                                Exam Appeared
                              </TableHead>
                              <TableHead colSpan={3} className="text-center border-r font-medium bg-green-50">
                                Exam Passed
                              </TableHead>
                              <TableHead colSpan={3} className="text-center border-r font-medium bg-orange-50">
                                Exam Appeared
                              </TableHead>
                              <TableHead colSpan={3} className="text-center font-medium bg-orange-50">
                                Exam Passed
                              </TableHead>
                            </TableRow>
                            <TableRow>
                              {/* Constituent Campus - Exam Appeared */}
                              <TableHead className="text-center font-medium bg-green-25 min-w-[80px]">Male</TableHead>
                              <TableHead className="text-center font-medium bg-green-25 min-w-[80px]">Female</TableHead>
                              <TableHead className="text-center font-medium bg-green-25 border-r min-w-[80px]">Total</TableHead>
                              {/* Constituent Campus - Exam Passed */}
                              <TableHead className="text-center font-medium bg-green-25 min-w-[80px]">Male</TableHead>
                              <TableHead className="text-center font-medium bg-green-25 min-w-[80px]">Female</TableHead>
                              <TableHead className="text-center font-medium bg-green-25 border-r min-w-[80px]">Total</TableHead>
                              {/* Affiliated Campus - Exam Appeared */}
                              <TableHead className="text-center font-medium bg-orange-25 min-w-[80px]">Male</TableHead>
                              <TableHead className="text-center font-medium bg-orange-25 min-w-[80px]">Female</TableHead>
                              <TableHead className="text-center font-medium bg-orange-25 border-r min-w-[80px]">Total</TableHead>
                              {/* Affiliated Campus - Exam Passed */}
                              <TableHead className="text-center font-medium bg-orange-25 min-w-[80px]">Male</TableHead>
                              <TableHead className="text-center font-medium bg-orange-25 min-w-[80px]">Female</TableHead>
                              <TableHead className="text-center font-medium bg-orange-25 min-w-[80px]">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {graduates.map((graduate, index) => (
                              <TableRow key={index} className="hover:bg-muted/30">
                                <TableCell className="border-r text-center font-semibold bg-muted/50">
                                  {index + 1}
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    value={graduate.program}
                                    onChange={(e) => updateGraduate(index, 'program', e.target.value)}
                                    placeholder="Enter program"
                                    className="min-w-[180px]"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    value={graduate.semester}
                                    onChange={(e) => updateGraduate(index, 'semester', e.target.value)}
                                    placeholder="e.g., Fall 2024"
                                    className="min-w-[120px]"
                                  />
                                </TableCell>
                                
                                {/* Constituent Campus - Exam Appeared */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.constituentExamAppearedM}
                                    onChange={(e) => updateGraduate(index, 'constituentExamAppearedM', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.constituentExamAppearedF}
                                    onChange={(e) => updateGraduate(index, 'constituentExamAppearedF', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={graduate.constituentExamAppearedT}
                                    readOnly
                                    className="text-center bg-muted font-semibold"
                                  />
                                </TableCell>
                                
                                {/* Constituent Campus - Exam Passed */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.constituentExamPassedM}
                                    onChange={(e) => updateGraduate(index, 'constituentExamPassedM', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.constituentExamPassedF}
                                    onChange={(e) => updateGraduate(index, 'constituentExamPassedF', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={graduate.constituentExamPassedT}
                                    readOnly
                                    className="text-center bg-muted font-semibold"
                                  />
                                </TableCell>
                                
                                {/* Affiliated Campus - Exam Appeared */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.affiliatedExamAppearedM}
                                    onChange={(e) => updateGraduate(index, 'affiliatedExamAppearedM', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.affiliatedExamAppearedF}
                                    onChange={(e) => updateGraduate(index, 'affiliatedExamAppearedF', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={graduate.affiliatedExamAppearedT}
                                    readOnly
                                    className="text-center bg-muted font-semibold"
                                  />
                                </TableCell>
                                
                                {/* Affiliated Campus - Exam Passed */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.affiliatedExamPassedM}
                                    onChange={(e) => updateGraduate(index, 'affiliatedExamPassedM', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.affiliatedExamPassedF}
                                    onChange={(e) => updateGraduate(index, 'affiliatedExamPassedF', e.target.value)}
                                    className="text-center"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={graduate.affiliatedExamPassedT}
                                    readOnly
                                    className="text-center bg-muted font-semibold"
                                  />
                                </TableCell>
                                
                                <TableCell>
                                  <div className="flex justify-center gap-1">
                                    {graduates.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeArrayField(setGraduates, index, 'graduates')}
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
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
                                      className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="p-4 border-t bg-muted/20">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
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
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Graduate Record
                        </Button>
                      </div>
                    </div>

                    {/* Additional Academic Fields */}
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="curriculumUpdates" className="flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          Curriculum Updates or Revisions Undertaken
                        </Label>
                        <Textarea
                          id="curriculumUpdates"
                          {...register('curriculumUpdates')}
                          placeholder="Describe curriculum updates..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teachingInnovations" className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Innovations in Teaching-Learning Methods
                        </Label>
                        <Textarea
                          id="teachingInnovations"
                          {...register('teachingInnovations')}
                          placeholder="Describe teaching innovations..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="digitalTools" className="flex items-center gap-2">
                          <Wrench className="w-4 h-4" />
                          Use of Online/Digital Tools in Education
                        </Label>
                        <Textarea
                          id="digitalTools"
                          {...register('digitalTools')}
                          placeholder="Describe digital tools usage..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentFeedback" className="flex items-center gap-2">
                          <UsersRound className="w-4 h-4" />
                          Student Feedback Mechanisms and Key Outcomes
                        </Label>
                        <Textarea
                          id="studentFeedback"
                          {...register('studentFeedback')}
                          placeholder="Describe feedback mechanisms..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="academicChallenges" className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Challenges Faced in Academic Delivery
                        </Label>
                        <Textarea
                          id="academicChallenges"
                          {...register('academicChallenges')}
                          placeholder="Describe academic challenges..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 3: Research and Innovation */}
              <TabsContent value="research" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50"
                      style={{padding:'16px'}}
                  >
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Microscope className="w-5 h-5" />
                      Section 3: Research and Innovation
                    </CardTitle>
                    <CardDescription>
                      Research projects, publications, and collaborations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="researchProjectsInitiated" className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Number of Research Projects Initiated
                        </Label>
                        <Input
                          id="researchProjectsInitiated"
                          type="number"
                          {...register('researchProjectsInitiated', { valueAsNumber: true })}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="researchProjectsCompleted" className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          Number of Research Projects Completed
                        </Label>
                        <Input
                          id="researchProjectsCompleted"
                          type="number"
                          {...register('researchProjectsCompleted', { valueAsNumber: true })}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="researchFunding" className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Research Funding Received (Internal/External)
                        </Label>
                        <Textarea
                          id="researchFunding"
                          {...register('researchFunding')}
                          placeholder="Describe research funding received..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="publications" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Publications (Books, Journals, Conferences)
                        </Label>
                        <Textarea
                          id="publications"
                          {...register('publications')}
                          placeholder="List publications..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patents" className="flex items-center gap-2">
                          <Library className="w-4 h-4" />
                          Patents Filed/Granted (if any)
                        </Label>
                        <Textarea
                          id="patents"
                          {...register('patents')}
                          placeholder="List patents..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="conferences" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Conferences/Seminars/Workshops Organized
                        </Label>
                        <Textarea
                          id="conferences"
                          {...register('conferences')}
                          placeholder="List conferences organized..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="facultyParticipation" className="flex items-center gap-2">
                          <UserCog className="w-4 h-4" />
                          Faculty Participation in External Research Events
                        </Label>
                        <Textarea
                          id="facultyParticipation"
                          {...register('facultyParticipation')}
                          placeholder="Describe faculty participation..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentResearch" className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          Student Involvement in Research Activities
                        </Label>
                        <Textarea
                          id="studentResearch"
                          {...register('studentResearch')}
                          placeholder="Describe student research involvement..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Collaborations Table */}
                    <div className="bg-white rounded-lg border shadow-sm">
                      <div className="p-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          <Globe className="w-5 h-5" />
                          Collaborations/MoUs with National or International Institutions
                        </Label>
                      </div>
                      <div className="p-6">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="font-semibold">Institution's Name</TableHead>
                              <TableHead className="font-semibold">Objective</TableHead>
                              <TableHead className="font-semibold text-center">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {collaborations.map((collaboration, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <Input
                                    value={collaboration.institutionName}
                                    onChange={(e) => updateCollaboration(index, 'institutionName', e.target.value)}
                                    placeholder="Institution name"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={collaboration.objective}
                                    onChange={(e) => updateCollaboration(index, 'objective', e.target.value)}
                                    placeholder="Objective"
                                  />
                                </TableCell>
                                <TableCell>
                                  <div className="flex justify-center gap-1">
                                    {collaborations.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeArrayField(setCollaborations, index, 'collaborations')}
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => addArrayField(
                                        setCollaborations,
                                        { institutionName: '', objective: '' },
                                        'collaborations'
                                      )}
                                      className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-4 flex items-center gap-2"
                          onClick={() => addArrayField(
                            setCollaborations,
                            { institutionName: '', objective: '' },
                            'collaborations'
                          )}
                        >
                          <Plus className="w-4 h-4" />
                          Add Collaboration
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 4: Human Resources */}
              <TabsContent value="hr" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50"
                      style={{padding:'16px'}}
                  >
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <UserCog className="w-5 h-5" />
                      Section 4: Human Resources
                    </CardTitle>
                    <CardDescription>
                      Staff information, recruitments, and development
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="academicStaff" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Current Number of Academic Staff (by Rank)
                        </Label>
                        <Textarea
                          id="academicStaff"
                          {...register('academicStaff')}
                          placeholder="List academic staff by rank..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminStaff" className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Current Number of Administrative/Technical Staff
                        </Label>
                        <Textarea
                          id="adminStaff"
                          {...register('adminStaff')}
                          placeholder="List administrative/technical staff..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newRecruitments" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          New Recruitments During Reporting Period
                        </Label>
                        <Textarea
                          id="newRecruitments"
                          {...register('newRecruitments')}
                          placeholder="Describe new recruitments..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="trainings" className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Trainings/Workshops Attended by Staff
                        </Label>
                        <Textarea
                          id="trainings"
                          {...register('trainings')}
                          placeholder="List trainings and workshops..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="promotions" className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          Promotions or Achievements
                        </Label>
                        <Textarea
                          id="promotions"
                          {...register('promotions')}
                          placeholder="Describe promotions and achievements..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="retirements" className="flex items-center gap-2">
                          <UsersRound className="w-4 h-4" />
                          Major Retirements/Resignations
                        </Label>
                        <Textarea
                          id="retirements"
                          {...register('retirements')}
                          placeholder="List retirements and resignations..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="developmentNeeds" className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Staff Development Needs Identified
                        </Label>
                        <Textarea
                          id="developmentNeeds"
                          {...register('developmentNeeds')}
                          placeholder="Describe development needs..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 5: Infrastructure and Facilities */}
              <TabsContent value="infrastructure" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50"
                  
                      style={{padding:'16px'}}
                  >
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Building className="w-5 h-5" />
                      Section 5: Infrastructure and Facilities
                    </CardTitle>
                    <CardDescription>
                      Infrastructure developments and facility upgrades
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="infrastructureAdditions" className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Additions to Existing Infrastructure
                        </Label>
                        <Textarea
                          id="infrastructureAdditions"
                          {...register('infrastructureAdditions')}
                          placeholder="Describe infrastructure additions..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newFacilities" className="flex items-center gap-2">
                          <Wrench className="w-4 h-4" />
                          New Facilities Added or Upgraded
                        </Label>
                        <Textarea
                          id="newFacilities"
                          {...register('newFacilities')}
                          placeholder="Describe new facilities..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="constructionStatus" className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Status of Major Construction/Renovation Projects
                        </Label>
                        <Textarea
                          id="constructionStatus"
                          {...register('constructionStatus')}
                          placeholder="Describe construction status..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="equipmentProcured" className="flex items-center gap-2">
                          <Microscope className="w-4 h-4" />
                          Equipment Procured
                        </Label>
                        <Textarea
                          id="equipmentProcured"
                          {...register('equipmentProcured')}
                          placeholder="List equipment procured..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="infrastructureChallenges" className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Challenges Related to Infrastructure
                        </Label>
                        <Textarea
                          id="infrastructureChallenges"
                          {...register('infrastructureChallenges')}
                          placeholder="Describe infrastructure challenges..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accessibilityMeasures" className="flex items-center gap-2">
                          <HeartHandshake className="w-4 h-4" />
                          Accessibility and Inclusivity Measures
                        </Label>
                        <Textarea
                          id="accessibilityMeasures"
                          {...register('accessibilityMeasures')}
                          placeholder="Describe accessibility measures..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 6: Financial Status */}
              <TabsContent value="financial" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <DollarSign className="w-5 h-5" />
                      Section 6: Financial Status
                    </CardTitle>
                    <CardDescription>
                      Budget allocation, expenditure, and revenue information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budgetAllocated" className="flex items-center gap-2">
                          <BarChart className="w-4 h-4" />
                          Total Annual Budget Allocated
                        </Label>
                        <Textarea
                          id="budgetAllocated"
                          {...register('budgetAllocated')}
                          placeholder="Describe budget allocation..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="actualExpenditure" className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Actual Expenditure (by Major Heads)
                        </Label>
                        <Textarea
                          id="actualExpenditure"
                          {...register('actualExpenditure')}
                          placeholder="Describe actual expenditure..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="revenueGenerated" className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Revenue Generated (Tuition Fees, Grants, Consultancies)
                        </Label>
                        <Textarea
                          id="revenueGenerated"
                          {...register('revenueGenerated')}
                          placeholder="Describe revenue generated..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="financialChallenges" className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Financial Challenges Faced
                        </Label>
                        <Textarea
                          id="financialChallenges"
                          {...register('financialChallenges')}
                          placeholder="Describe financial challenges..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="auditStatus" className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Audit and Compliance Status
                        </Label>
                        <Textarea
                          id="auditStatus"
                          {...register('auditStatus')}
                          placeholder="Describe audit status..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 7: Governance and Management */}
              <TabsContent value="governance" className="faculty-tab-content"
              
                  style={{padding:'16px'}}
              >
                <Card>
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Shield className="w-5 h-5" />
                      Section 7: Governance and Management
                    </CardTitle>
                    <CardDescription>
                      Committee meetings, policies, and governance initiatives
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="meetingsHeld" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Meetings Held (Faculty Board, Committees, etc.)
                        </Label>
                        <Textarea
                          id="meetingsHeld"
                          {...register('meetingsHeld')}
                          placeholder="Describe meetings held..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="keyDecisions" className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Key Decisions Taken
                        </Label>
                        <Textarea
                          id="keyDecisions"
                          {...register('keyDecisions')}
                          placeholder="Describe key decisions..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="policyUpdates" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Policy Updates or Changes
                        </Label>
                        <Textarea
                          id="policyUpdates"
                          {...register('policyUpdates')}
                          placeholder="Describe policy updates..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="grievanceHandling" className="flex items-center gap-2">
                          <HeartHandshake className="w-4 h-4" />
                          Grievance Handling Mechanisms
                        </Label>
                        <Textarea
                          id="grievanceHandling"
                          {...register('grievanceHandling')}
                          placeholder="Describe grievance handling..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transparencyInitiatives" className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Initiatives for Transparency and Accountability
                        </Label>
                        <Textarea
                          id="transparencyInitiatives"
                          {...register('transparencyInitiatives')}
                          placeholder="Describe transparency initiatives..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 8: Student Affairs and Support Services */}
              <TabsContent value="student" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50"
                      style={{padding:'16px'}}
                  >
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <UsersRound className="w-5 h-5" />
                      Section 8: Student Affairs and Support Services
                    </CardTitle>
                    <CardDescription>
                      Student support services and extracurricular activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="scholarships" className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Scholarships and Financial Aid Programs
                        </Label>
                        <Textarea
                          id="scholarships"
                          {...register('scholarships')}
                          placeholder="Describe scholarship programs..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="careerCounseling" className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Career Counseling and Placement Services
                        </Label>
                        <Textarea
                          id="careerCounseling"
                          {...register('careerCounseling')}
                          placeholder="Describe career services..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="extracurricular" className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          Extracurricular Activities (Sports, Cultural, Clubs)
                        </Label>
                        <Textarea
                          id="extracurricular"
                          {...register('extracurricular')}
                          placeholder="Describe extracurricular activities..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alumniEngagement" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Alumni Engagement Activities
                        </Label>
                        <Textarea
                          id="alumniEngagement"
                          {...register('alumniEngagement')}
                          placeholder="Describe alumni engagement..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentAchievements" className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Major Achievements of Students
                        </Label>
                        <Textarea
                          id="studentAchievements"
                          {...register('studentAchievements')}
                          placeholder="Describe student achievements..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 9: Community Engagement and Extension Activities */}
              <TabsContent value="community" className="faculty-tab-content"
              
              >
                <Card>
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50"
                      style={{padding:'16px'}}
                  >
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <HeartHandshake className="w-5 h-5" />
                      Section 9: Community Engagement and Extension Activities
                    </CardTitle>
                    <CardDescription>
                      Community outreach and social responsibility initiatives
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="outreachPrograms" className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Community Outreach Programs Conducted
                        </Label>
                        <Textarea
                          id="outreachPrograms"
                          {...register('outreachPrograms')}
                          placeholder="Describe outreach programs..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="communityCollaborations" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Collaborations with Local Communities/Organizations
                        </Label>
                        <Textarea
                          id="communityCollaborations"
                          {...register('communityCollaborations')}
                          placeholder="Describe community collaborations..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="socialResponsibility" className="flex items-center gap-2">
                          <HeartHandshake className="w-4 h-4" />
                          Social Responsibility Initiatives
                        </Label>
                        <Textarea
                          id="socialResponsibility"
                          {...register('socialResponsibility')}
                          placeholder="Describe social responsibility initiatives..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="continuingEducation" className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Continuing Education or Non-Degree Programs
                        </Label>
                        <Textarea
                          id="continuingEducation"
                          {...register('continuingEducation')}
                          placeholder="Describe continuing education programs..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 10: Achievements and Recognition */}
              <TabsContent value="achievements" className="faculty-tab-content"
                  style={{padding:'16px'}}
              >
                <Card>
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Trophy className="w-5 h-5" />
                      Section 10: Achievements and Recognition
                    </CardTitle>
                    <CardDescription>
                      Awards, honors, and significant achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="awards" className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Major Awards, Honors, or Recognitions Received
                        </Label>
                        <Textarea
                          id="awards"
                          {...register('awards')}
                          placeholder="Describe awards and recognitions..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="successStories" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Success Stories and Best Practices
                        </Label>
                        <Textarea
                          id="successStories"
                          {...register('successStories')}
                          placeholder="Describe success stories..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reputationContributions" className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Significant Contributions to the University's Reputation
                        </Label>
                        <Textarea
                          id="reputationContributions"
                          {...register('reputationContributions')}
                          placeholder="Describe contributions to reputation..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 11: Challenges and Lessons Learned */}
              <TabsContent value="challenges" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50"
                      style={{padding:'16px'}}
                  >
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <AlertCircle className="w-5 h-5" />
                      Section 11: Challenges and Lessons Learned
                    </CardTitle>
                    <CardDescription>
                      Key challenges faced and strategies adopted
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="keyChallenges" className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Key Challenges Faced During the Year
                        </Label>
                        <Textarea
                          id="keyChallenges"
                          {...register('keyChallenges')}
                          placeholder="Describe key challenges..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="strategies" className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Strategies Adopted to Address Them
                        </Label>
                        <Textarea
                          id="strategies"
                          {...register('strategies')}
                          placeholder="Describe strategies adopted..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lessonsLearned" className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Lessons Learned for Future Activities
                        </Label>
                        <Textarea
                          id="lessonsLearned"
                          {...register('lessonsLearned')}
                          placeholder="Describe lessons learned..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 12: Future Plans and Recommendations */}
              <TabsContent value="future" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50"
                      style={{padding:'16px'}}
                  >
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Target className="w-5 h-5" />
                      Section 12: Future Plans and Recommendations
                    </CardTitle>
                    <CardDescription>
                      Goals, priorities, and recommendations for the future
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="majorGoals" className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Major Goals and Priorities for Next Academic Year
                        </Label>
                        <Textarea
                          id="majorGoals"
                          {...register('majorGoals')}
                          placeholder="Describe major goals..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="proposedProjects" className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Proposed Projects/Initiatives
                        </Label>
                        <Textarea
                          id="proposedProjects"
                          {...register('proposedProjects')}
                          placeholder="Describe proposed projects..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supportNeeded" className="flex items-center gap-2">
                          <HandHeart className="w-4 h-4" />
                          Support Needed from Central Administration
                        </Label>
                        <Textarea
                          id="supportNeeded"
                          {...register('supportNeeded')}
                          placeholder="Describe support needed..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="policyReforms" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Policy or Structural Reforms Suggested
                        </Label>
                        <Textarea
                          id="policyReforms"
                          {...register('policyReforms')}
                          placeholder="Describe policy reforms..."
                          rows={4}
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



{/* <BackgroundRemover/> */}

              
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyForm;