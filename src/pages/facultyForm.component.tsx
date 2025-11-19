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
  batch: string;
  constituentExamAppearedM: number;
  constituentExamAppearedF: number;
  constituentExamAppearedForeign: number;
  constituentExamAppearedT: number;
  constituentExamPassedM: number;
  constituentExamPassedF: number;
  constituentExamPassedForeign: number;
  constituentExamPassedT: number;
  affiliatedExamAppearedM: number;
  affiliatedExamAppearedF: number;
  affiliatedExamAppearedForeign: number;
  affiliatedExamAppearedT: number;
  affiliatedExamPassedM: number;
  affiliatedExamPassedF: number;
  affiliatedExamPassedForeign: number;
  affiliatedExamPassedT: number;
}

interface Graduate {
  program: string;
  semester: string;
  batch: string;
  constituentExamAppearedM: number;
  constituentExamAppearedF: number;
  constituentExamAppearedForeign: number;
  constituentExamAppearedT: number;
  constituentExamPassedM: number;
  constituentExamPassedF: number;
  constituentExamPassedForeign: number;
  constituentExamPassedT: number;
  affiliatedExamAppearedM: number;
  affiliatedExamAppearedF: number;
  affiliatedExamAppearedForeign: number;
  affiliatedExamAppearedT: number;
  affiliatedExamPassedM: number;
  affiliatedExamPassedF: number;
  affiliatedExamPassedForeign: number;
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
    program: '', level: '', batch: '',
    constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedForeign: 0, constituentExamAppearedT: 0,
    constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedForeign: 0, constituentExamPassedT: 0,
    affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedForeign: 0, affiliatedExamAppearedT: 0,
    affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedForeign: 0, affiliatedExamPassedT: 0
  }]);
  const [graduates, setGraduates] = useState<Graduate[]>([{
    program: '', semester: '', batch: '',
    constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedForeign: 0, constituentExamAppearedT: 0,
    constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedForeign: 0, constituentExamPassedT: 0,
    affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedForeign: 0, affiliatedExamAppearedT: 0,
    affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedForeign: 0, affiliatedExamPassedT: 0
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

  // Enhanced student enrollment handlers with batch and foreign students
  const updateStudentEnrollment = (index: number, field: keyof StudentEnrollment, value: string | number) => {
    const newEnrollment = [...studentEnrollment];
    
    if (typeof value === 'string' && !['program', 'level', 'batch'].includes(field)) {
      value = value === '' ? 0 : parseInt(value) || 0;
    }
    
    newEnrollment[index] = { 
      ...newEnrollment[index], 
      [field]: value 
    };

    // Auto-calculate totals including foreign students
    if (field.includes('M') || field.includes('F') || field.includes('Foreign')) {
      const baseField = field.replace(/M|F|Foreign|T$/, '');
      const maleField = `${baseField}M` as keyof StudentEnrollment;
      const femaleField = `${baseField}F` as keyof StudentEnrollment;
      const foreignField = `${baseField}Foreign` as keyof StudentEnrollment;
      const totalField = `${baseField}T` as keyof StudentEnrollment;

      if (newEnrollment[index][maleField] !== undefined && 
          newEnrollment[index][femaleField] !== undefined && 
          newEnrollment[index][foreignField] !== undefined) {
        const maleValue = Number(newEnrollment[index][maleField]) || 0;
        const femaleValue = Number(newEnrollment[index][femaleField]) || 0;
        const foreignValue = Number(newEnrollment[index][foreignField]) || 0;
        newEnrollment[index][totalField] = maleValue + femaleValue + foreignValue as any;
      }
    }

    setStudentEnrollment(newEnrollment);
    setValue('studentEnrollment', newEnrollment);
  };

  // Enhanced graduates handlers with batch and foreign students
  const updateGraduate = (index: number, field: keyof Graduate, value: string | number) => {
    const newGraduates = [...graduates];
    
    if (typeof value === 'string' && !['program', 'semester', 'batch'].includes(field)) {
      value = value === '' ? 0 : parseInt(value) || 0;
    }
    
    newGraduates[index] = { 
      ...newGraduates[index], 
      [field]: value 
    };

    // Auto-calculate totals including foreign students
    if (field.includes('M') || field.includes('F') || field.includes('Foreign')) {
      const baseField = field.replace(/M|F|Foreign|T$/, '');
      const maleField = `${baseField}M` as keyof Graduate;
      const femaleField = `${baseField}F` as keyof Graduate;
      const foreignField = `${baseField}Foreign` as keyof Graduate;
      const totalField = `${baseField}T` as keyof Graduate;

      if (newGraduates[index][maleField] !== undefined && 
          newGraduates[index][femaleField] !== undefined && 
          newGraduates[index][foreignField] !== undefined) {
        const maleValue = Number(newGraduates[index][maleField]) || 0;
        const femaleValue = Number(newGraduates[index][femaleField]) || 0;
        const foreignValue = Number(newGraduates[index][foreignField]) || 0;
        newGraduates[index][totalField] = maleValue + femaleValue + foreignValue as any;
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

      if (response.status === 201) {
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
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white" style={{padding:'20px'}}>
          <CardTitle className="flex items-center gap-3 text-3xl font-bold">
            <FileText className="w-10 h-10" />
            FACULTY ANNUAL REPORT FORM
          </CardTitle>
          <CardDescription className="text-blue-100 text-lg">
            Complete all sections to submit the annual faculty report
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="faculty-form">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="faculty-form-tabs">
              <TabsList className="faculty-tabs-list text-base">
                <TabsTrigger value="general" className="flex items-center gap-2 text-lg font-semibold">
                  <User className="w-5 h-5" />
                  General
                </TabsTrigger>
                <TabsTrigger value="academic" className="flex items-center gap-2 text-lg font-semibold">
                  <BookOpen className="w-5 h-5" />
                  Academic
                </TabsTrigger>
                <TabsTrigger value="research" className="flex items-center gap-2 text-lg font-semibold">
                  <Microscope className="w-5 h-5" />
                  Research
                </TabsTrigger>
                <TabsTrigger value="hr" className="flex items-center gap-2 text-lg font-semibold">
                  <UserCog className="w-5 h-5" />
                  HR
                </TabsTrigger>
                <TabsTrigger value="infrastructure" className="flex items-center gap-2 text-lg font-semibold">
                  <Building className="w-5 h-5" />
                  Infrastructure
                </TabsTrigger>
                <TabsTrigger value="financial" className="flex items-center gap-2 text-lg font-semibold">
                  <DollarSign className="w-5 h-5" />
                  Financial
                </TabsTrigger>
                <TabsTrigger value="governance" className="flex items-center gap-2 text-lg font-semibold">
                  <Shield className="w-5 h-5" />
                  Governance
                </TabsTrigger>
                <TabsTrigger value="student" className="flex items-center gap-2 text-lg font-semibold">
                  <UsersRound className="w-5 h-5" />
                  Student Affairs
                </TabsTrigger>
                <TabsTrigger value="community" className="flex items-center gap-2 text-lg font-semibold">
                  <HeartHandshake className="w-5 h-5" />
                  Community
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2 text-lg font-semibold">
                  <Trophy className="w-5 h-5" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="challenges" className="flex items-center gap-2 text-lg font-semibold">
                  <AlertCircle className="w-5 h-5" />
                  Challenges
                </TabsTrigger>
                <TabsTrigger value="future" className="flex items-center gap-2 text-lg font-semibold">
                  <Target className="w-5 h-5" />
                  Future Plans
                </TabsTrigger>
              </TabsList>

              {/* Section 1: General Information */}
              <TabsContent value="general" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <User className="w-6 h-6" />
                      SECTION 1: GENERAL INFORMATION
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Basic information about the institute and reporting period
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="instituteName" className="flex items-center gap-2 text-lg font-semibold">
                          <Building className="w-5 h-5" />
                          Name of Institute/Faculty
                        </Label>
                        <Select
                          onValueChange={(value) => setValue('instituteName', value)}
                        >
                          <SelectTrigger className="w-full text-lg p-3 h-12">
                            <SelectValue placeholder="Select Faculty/Institute" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Institute of Medicine" className="text-lg">Institute of Medicine</SelectItem>
                            <SelectItem value="Institute of Forestry" className="text-lg">Institute of Forestry</SelectItem>
                            <SelectItem value="Institute of Agriculture and Animal Science" className="text-lg">Institute of Agriculture and Animal Science</SelectItem>
                            <SelectItem value="Institute of Science and Technology" className="text-lg">Institute of Science and Technology</SelectItem>
                            <SelectItem value="Institute of Engineering" className="text-lg">Institute of Engineering</SelectItem>
                            <SelectItem value="Faculty of Humanities and Social Sciences" className="text-lg">Faculty of Humanities and Social Sciences</SelectItem>
                            <SelectItem value="Faculty of Education" className="text-lg">Faculty of Education</SelectItem>
                            <SelectItem value="Faculty of Law" className="text-lg">Faculty of Law</SelectItem>
                            <SelectItem value="Faculty of Management" className="text-lg">Faculty of Management</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="reportingPeriod" className="flex items-center gap-2 text-lg font-semibold">
                          <Calendar className="w-5 h-5" />
                          Year/Reporting Period
                        </Label>
                        <Input
                          id="reportingPeriod"
                          {...register('reportingPeriod')}
                          placeholder="e.g., 2023-2024"
                          className="w-full text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="headName" className="flex items-center gap-2 text-lg font-semibold">
                          <User className="w-5 h-5" />
                          Dean Name
                        </Label>
                        <Input
                          id="headName"
                          {...register('headName')}
                          placeholder="Enter Dean Name"
                          className="w-full text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="flex items-center gap-2 text-lg font-semibold">
                          <Phone className="w-5 h-5" />
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          placeholder="Enter phone number"
                          className="w-full text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="flex items-center gap-2 text-lg font-semibold">
                          <Mail className="w-5 h-5" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="Enter email address"
                          className="w-full text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="submissionDate" className="flex items-center gap-2 text-lg font-semibold">
                          <Calendar className="w-5 h-5" />
                          Date of Submission
                        </Label>
                        <Input
                          id="submissionDate"
                          type="date"
                          {...register('submissionDate')}
                          className="w-full text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 2: Academic Programs */}
              <TabsContent value="academic" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <BookOpen className="w-6 h-6" />
                      SECTION 2: ACADEMIC PROGRAMS
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Academic programs, student enrollment, and graduate information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    {/* Academic Programs */}
                    <div className="bg-white rounded-lg border shadow-sm">
                      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                        <Label className="text-xl font-bold flex items-center gap-2">
                          <School className="w-6 h-6" />
                          LIST OF ACADEMIC PROGRAMS OFFERED WITH SPECIALIZATIONS
                        </Label>
                      </div>
                      <div className="p-6 space-y-4">
                        {academicPrograms.map((program, programIndex) => (
                          <div key={programIndex} className="border rounded-lg p-4 bg-gray-50/50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="space-y-3">
                                <Label className="text-lg font-semibold">Level</Label>
                                <Select
                                  value={program.level}
                                  onValueChange={(value) => updateAcademicProgram(programIndex, 'level', value)}
                                >
                                  <SelectTrigger className="text-lg p-3">
                                    <SelectValue placeholder="Select level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Bachelor" className="text-lg">Bachelor</SelectItem>
                                    <SelectItem value="Master" className="text-lg">Master</SelectItem>
                                    <SelectItem value="MPhil" className="text-lg">MPhil</SelectItem>
                                    <SelectItem value="PhD" className="text-lg">PhD</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-3">
                                <Label className="text-lg font-semibold">Program Name</Label>
                                <Input
                                  value={program.programName}
                                  onChange={(e) => updateAcademicProgram(programIndex, 'programName', e.target.value)}
                                  placeholder="Enter program name"
                                  className="text-lg p-3"
                                />
                              </div>
                              <div className="space-y-3">
                                <Label className="text-lg font-semibold">Program Type</Label>
                                <Select
                                  value={program.programType}
                                  onValueChange={(value) => updateAcademicProgram(programIndex, 'programType', value)}
                                >
                                  <SelectTrigger className="text-lg p-3">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Year-wise" className="text-lg">Year-wise</SelectItem>
                                    <SelectItem value="Semester-wise" className="text-lg">Semester-wise</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-lg font-semibold">Areas of Specialization</Label>
                              {program.specializationAreas.map((area, areaIndex) => (
                                <div key={areaIndex} className="flex gap-2">
                                  <Input
                                    value={area}
                                    onChange={(e) => updateSpecializationArea(programIndex, areaIndex, e.target.value)}
                                    placeholder="Enter specialization area"
                                    className="text-lg p-3"
                                  />
                                  {program.specializationAreas.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="lg"
                                      onClick={() => removeSpecializationArea(programIndex, areaIndex)}
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-lg"
                                    >
                                      <Minus className="w-5 h-5" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => addSpecializationArea(programIndex)}
                                className="flex items-center gap-2 text-lg"
                              >
                                <Plus className="w-5 h-5" />
                                Add Specialization
                              </Button>
                            </div>

                            {academicPrograms.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                className="mt-4 text-red-600 hover:text-red-700 hover:bg-red-50 text-lg"
                                onClick={() => removeArrayField(setAcademicPrograms, programIndex, 'academicPrograms')}
                              >
                                <Trash2 className="w-5 h-5 mr-2" />
                                Remove Program
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          onClick={() => addArrayField(
                            setAcademicPrograms,
                            { level: '', programName: '', programType: '', specializationAreas: [''] },
                            'academicPrograms'
                          )}
                          className="flex items-center gap-2 text-lg"
                        >
                          <Plus className="w-5 h-5" />
                          Add Program
                        </Button>
                      </div>
                    </div>

                    {/* Student Enrollment Table with Batch and Foreign Students */}
                    <div className="bg-white rounded-lg border shadow-sm">
                      <div className="p-4 border-b bg-gradient-to-r from-green-50 to-emerald-50">
                        <Label className="text-xl font-bold flex items-center gap-2">
                          <Users className="w-6 h-6" />
                          3. NUMBER OF STUDENTS ENROLLED (PROGRAM-WISE, YEAR-WISE)
                        </Label>
                        <p className="text-lg text-muted-foreground mt-2">
                          Enter student enrollment data for constituent and affiliated campuses including foreign students
                        </p>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <Table className="min-w-[1600px] text-base">
                          <TableHeader className="bg-muted/50">
                            <TableRow>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[200px] text-lg">
                                Program
                              </TableHead>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[120px] text-lg">
                                Level
                              </TableHead>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[120px] text-lg">
                                Batch
                              </TableHead>
                              <TableHead colSpan={8} className="text-center border-r font-bold bg-green-100 text-lg">
                                Constituent Campus
                              </TableHead>
                              <TableHead colSpan={8} className="text-center font-bold bg-orange-100 text-lg">
                                Affiliated Campus
                              </TableHead>
                              <TableHead rowSpan={3} className="text-center font-bold bg-red-100 min-w-[120px] text-lg">
                                Actions
                              </TableHead>
                            </TableRow>
                            <TableRow>
                              <TableHead colSpan={4} className="text-center border-r font-bold bg-green-50 text-lg">
                                Exam Appeared
                              </TableHead>
                              <TableHead colSpan={4} className="text-center border-r font-bold bg-green-50 text-lg">
                                Exam Passed
                              </TableHead>
                              <TableHead colSpan={4} className="text-center border-r font-bold bg-orange-50 text-lg">
                                Exam Appeared
                              </TableHead>
                              <TableHead colSpan={4} className="text-center font-bold bg-orange-50 text-lg">
                                Exam Passed
                              </TableHead>
                            </TableRow>
                            <TableRow>
                              {/* Constituent Campus - Exam Appeared */}
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Male</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Female</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Foreign</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 border-r min-w-[80px] text-lg">Total</TableHead>
                              {/* Constituent Campus - Exam Passed */}
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Male</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Female</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Foreign</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 border-r min-w-[80px] text-lg">Total</TableHead>
                              {/* Affiliated Campus - Exam Appeared */}
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Male</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Female</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Foreign</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 border-r min-w-[80px] text-lg">Total</TableHead>
                              {/* Affiliated Campus - Exam Passed */}
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Male</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Female</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Foreign</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Total</TableHead>
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
                                    className="min-w-[180px] text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Select
                                    value={enrollment.level}
                                    onValueChange={(value) => updateStudentEnrollment(index, 'level', value)}
                                  >
                                    <SelectTrigger className="min-w-[120px] text-lg p-2">
                                      <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Bachelor" className="text-lg">Bachelor</SelectItem>
                                      <SelectItem value="Master" className="text-lg">Master</SelectItem>
                                      <SelectItem value="MPhil" className="text-lg">MPhil</SelectItem>
                                      <SelectItem value="PhD" className="text-lg">PhD</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    value={enrollment.batch}
                                    onChange={(e) => updateStudentEnrollment(index, 'batch', e.target.value)}
                                    placeholder="e.g., 2024"
                                    className="min-w-[100px] text-lg p-2"
                                  />
                                </TableCell>
                                
                                {/* Constituent Campus - Exam Appeared */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.constituentExamAppearedM}
                                    onChange={(e) => updateStudentEnrollment(index, 'constituentExamAppearedM', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.constituentExamAppearedF}
                                    onChange={(e) => updateStudentEnrollment(index, 'constituentExamAppearedF', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.constituentExamAppearedForeign}
                                    onChange={(e) => updateStudentEnrollment(index, 'constituentExamAppearedForeign', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={enrollment.constituentExamAppearedT}
                                    readOnly
                                    className="text-center bg-muted font-bold text-lg p-2"
                                  />
                                </TableCell>
                                
                                {/* Constituent Campus - Exam Passed */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.constituentExamPassedM}
                                    onChange={(e) => updateStudentEnrollment(index, 'constituentExamPassedM', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.constituentExamPassedF}
                                    onChange={(e) => updateStudentEnrollment(index, 'constituentExamPassedF', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.constituentExamPassedForeign}
                                    onChange={(e) => updateStudentEnrollment(index, 'constituentExamPassedForeign', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={enrollment.constituentExamPassedT}
                                    readOnly
                                    className="text-center bg-muted font-bold text-lg p-2"
                                  />
                                </TableCell>
                                
                                {/* Affiliated Campus - Exam Appeared */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.affiliatedExamAppearedM}
                                    onChange={(e) => updateStudentEnrollment(index, 'affiliatedExamAppearedM', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.affiliatedExamAppearedF}
                                    onChange={(e) => updateStudentEnrollment(index, 'affiliatedExamAppearedF', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.affiliatedExamAppearedForeign}
                                    onChange={(e) => updateStudentEnrollment(index, 'affiliatedExamAppearedForeign', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={enrollment.affiliatedExamAppearedT}
                                    readOnly
                                    className="text-center bg-muted font-bold text-lg p-2"
                                  />
                                </TableCell>
                                
                                {/* Affiliated Campus - Exam Passed */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.affiliatedExamPassedM}
                                    onChange={(e) => updateStudentEnrollment(index, 'affiliatedExamPassedM', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.affiliatedExamPassedF}
                                    onChange={(e) => updateStudentEnrollment(index, 'affiliatedExamPassedF', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={enrollment.affiliatedExamPassedForeign}
                                    onChange={(e) => updateStudentEnrollment(index, 'affiliatedExamPassedForeign', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={enrollment.affiliatedExamPassedT}
                                    readOnly
                                    className="text-center bg-muted font-bold text-lg p-2"
                                  />
                                </TableCell>
                                
                                <TableCell>
                                  <div className="flex justify-center gap-2">
                                    {studentEnrollment.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        onClick={() => removeArrayField(setStudentEnrollment, index, 'studentEnrollment')}
                                        className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </Button>
                                    )}
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="lg"
                                      onClick={() => addArrayField(
                                        setStudentEnrollment,
                                        {
                                          program: '', level: '', batch: '',
                                          constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedForeign: 0, constituentExamAppearedT: 0,
                                          constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedForeign: 0, constituentExamPassedT: 0,
                                          affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedForeign: 0, affiliatedExamAppearedT: 0,
                                          affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedForeign: 0, affiliatedExamPassedT: 0
                                        },
                                        'studentEnrollment'
                                      )}
                                      className="h-10 w-10 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      <Plus className="w-5 h-5" />
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
                          size="lg"
                          onClick={() => addArrayField(
                            setStudentEnrollment,
                            {
                              program: '', level: '', batch: '',
                              constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedForeign: 0, constituentExamAppearedT: 0,
                              constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedForeign: 0, constituentExamPassedT: 0,
                              affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedForeign: 0, affiliatedExamAppearedT: 0,
                              affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedForeign: 0, affiliatedExamPassedT: 0
                            },
                            'studentEnrollment'
                          )}
                          className="flex items-center gap-2 text-lg"
                        >
                          <Plus className="w-5 h-5" />
                          Add Enrollment Record
                        </Button>
                      </div>
                    </div>

                    {/* Number of Graduates Table with Batch and Foreign Students */}
                    <div className="bg-white rounded-lg border shadow-sm">
                      <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50">
                        <Label className="text-xl font-bold flex items-center gap-2">
                          <GraduationCap className="w-6 h-6" />
                          4. NUMBER OF GRADUATES (PROGRAM-WISE)
                        </Label>
                        <p className="text-lg text-muted-foreground mt-2">
                          Enter graduate data for constituent and affiliated campuses including foreign students
                        </p>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <Table className="min-w-[1600px] text-base">
                          <TableHeader className="bg-muted/50">
                            <TableRow>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[60px] text-lg">
                                S.N.
                              </TableHead>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[200px] text-lg">
                                Program
                              </TableHead>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[120px] text-lg">
                                Semester
                              </TableHead>
                              <TableHead rowSpan={3} className="border-r text-center font-bold bg-blue-100 min-w-[120px] text-lg">
                                Batch
                              </TableHead>
                              <TableHead colSpan={8} className="text-center border-r font-bold bg-green-100 text-lg">
                                Constituent Campus
                              </TableHead>
                              <TableHead colSpan={8} className="text-center font-bold bg-orange-100 text-lg">
                                Affiliated Campus
                              </TableHead>
                              <TableHead rowSpan={3} className="text-center font-bold bg-red-100 min-w-[120px] text-lg">
                                Actions
                              </TableHead>
                            </TableRow>
                            <TableRow>
                              <TableHead colSpan={4} className="text-center border-r font-bold bg-green-50 text-lg">
                                Exam Appeared
                              </TableHead>
                              <TableHead colSpan={4} className="text-center border-r font-bold bg-green-50 text-lg">
                                Exam Passed
                              </TableHead>
                              <TableHead colSpan={4} className="text-center border-r font-bold bg-orange-50 text-lg">
                                Exam Appeared
                              </TableHead>
                              <TableHead colSpan={4} className="text-center font-bold bg-orange-50 text-lg">
                                Exam Passed
                              </TableHead>
                            </TableRow>
                            <TableRow>
                              {/* Constituent Campus - Exam Appeared */}
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Male</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Female</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Foreign</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 border-r min-w-[80px] text-lg">Total</TableHead>
                              {/* Constituent Campus - Exam Passed */}
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Male</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Female</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 min-w-[80px] text-lg">Foreign</TableHead>
                              <TableHead className="text-center font-bold bg-green-25 border-r min-w-[80px] text-lg">Total</TableHead>
                              {/* Affiliated Campus - Exam Appeared */}
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Male</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Female</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Foreign</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 border-r min-w-[80px] text-lg">Total</TableHead>
                              {/* Affiliated Campus - Exam Passed */}
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Male</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Female</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Foreign</TableHead>
                              <TableHead className="text-center font-bold bg-orange-25 min-w-[80px] text-lg">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {graduates.map((graduate, index) => (
                              <TableRow key={index} className="hover:bg-muted/30">
                                <TableCell className="border-r text-center font-bold bg-muted/50 text-lg">
                                  {index + 1}
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    value={graduate.program}
                                    onChange={(e) => updateGraduate(index, 'program', e.target.value)}
                                    placeholder="Enter program"
                                    className="min-w-[180px] text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    value={graduate.semester}
                                    onChange={(e) => updateGraduate(index, 'semester', e.target.value)}
                                    placeholder="e.g., Fall 2024"
                                    className="min-w-[120px] text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    value={graduate.batch}
                                    onChange={(e) => updateGraduate(index, 'batch', e.target.value)}
                                    placeholder="e.g., 2024"
                                    className="min-w-[100px] text-lg p-2"
                                  />
                                </TableCell>
                                
                                {/* Constituent Campus - Exam Appeared */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.constituentExamAppearedM}
                                    onChange={(e) => updateGraduate(index, 'constituentExamAppearedM', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.constituentExamAppearedF}
                                    onChange={(e) => updateGraduate(index, 'constituentExamAppearedF', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.constituentExamAppearedForeign}
                                    onChange={(e) => updateGraduate(index, 'constituentExamAppearedForeign', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={graduate.constituentExamAppearedT}
                                    readOnly
                                    className="text-center bg-muted font-bold text-lg p-2"
                                  />
                                </TableCell>
                                
                                {/* Constituent Campus - Exam Passed */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.constituentExamPassedM}
                                    onChange={(e) => updateGraduate(index, 'constituentExamPassedM', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.constituentExamPassedF}
                                    onChange={(e) => updateGraduate(index, 'constituentExamPassedF', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.constituentExamPassedForeign}
                                    onChange={(e) => updateGraduate(index, 'constituentExamPassedForeign', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={graduate.constituentExamPassedT}
                                    readOnly
                                    className="text-center bg-muted font-bold text-lg p-2"
                                  />
                                </TableCell>
                                
                                {/* Affiliated Campus - Exam Appeared */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.affiliatedExamAppearedM}
                                    onChange={(e) => updateGraduate(index, 'affiliatedExamAppearedM', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.affiliatedExamAppearedF}
                                    onChange={(e) => updateGraduate(index, 'affiliatedExamAppearedF', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.affiliatedExamAppearedForeign}
                                    onChange={(e) => updateGraduate(index, 'affiliatedExamAppearedForeign', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell className="border-r">
                                  <Input
                                    type="number"
                                    value={graduate.affiliatedExamAppearedT}
                                    readOnly
                                    className="text-center bg-muted font-bold text-lg p-2"
                                  />
                                </TableCell>
                                
                                {/* Affiliated Campus - Exam Passed */}
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.affiliatedExamPassedM}
                                    onChange={(e) => updateGraduate(index, 'affiliatedExamPassedM', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.affiliatedExamPassedF}
                                    onChange={(e) => updateGraduate(index, 'affiliatedExamPassedF', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={graduate.affiliatedExamPassedForeign}
                                    onChange={(e) => updateGraduate(index, 'affiliatedExamPassedForeign', e.target.value)}
                                    className="text-center text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={graduate.affiliatedExamPassedT}
                                    readOnly
                                    className="text-center bg-muted font-bold text-lg p-2"
                                  />
                                </TableCell>
                                
                                <TableCell>
                                  <div className="flex justify-center gap-2">
                                    {graduates.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        onClick={() => removeArrayField(setGraduates, index, 'graduates')}
                                        className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </Button>
                                    )}
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="lg"
                                      onClick={() => addArrayField(
                                        setGraduates,
                                        {
                                          program: '', semester: '', batch: '',
                                          constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedForeign: 0, constituentExamAppearedT: 0,
                                          constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedForeign: 0, constituentExamPassedT: 0,
                                          affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedForeign: 0, affiliatedExamAppearedT: 0,
                                          affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedForeign: 0, affiliatedExamPassedT: 0
                                        },
                                        'graduates'
                                      )}
                                      className="h-10 w-10 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      <Plus className="w-5 h-5" />
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
                          size="lg"
                          onClick={() => addArrayField(
                            setGraduates,
                            {
                              program: '', semester: '', batch: '',
                              constituentExamAppearedM: 0, constituentExamAppearedF: 0, constituentExamAppearedForeign: 0, constituentExamAppearedT: 0,
                              constituentExamPassedM: 0, constituentExamPassedF: 0, constituentExamPassedForeign: 0, constituentExamPassedT: 0,
                              affiliatedExamAppearedM: 0, affiliatedExamAppearedF: 0, affiliatedExamAppearedForeign: 0, affiliatedExamAppearedT: 0,
                              affiliatedExamPassedM: 0, affiliatedExamPassedF: 0, affiliatedExamPassedForeign: 0, affiliatedExamPassedT: 0
                            },
                            'graduates'
                          )}
                          className="flex items-center gap-2 text-lg"
                        >
                          <Plus className="w-5 h-5" />
                          Add Graduate Record
                        </Button>
                      </div>
                    </div>

                    {/* Additional Academic Fields */}
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="curriculumUpdates" className="flex items-center gap-2 text-lg font-semibold">
                          <Edit className="w-5 h-5" />
                          Curriculum Updates or Revisions Undertaken
                        </Label>
                        <Textarea
                          id="curriculumUpdates"
                          {...register('curriculumUpdates')}
                          placeholder="Describe curriculum updates..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="teachingInnovations" className="flex items-center gap-2 text-lg font-semibold">
                          <Lightbulb className="w-5 h-5" />
                          Innovations in Teaching-Learning Methods
                        </Label>
                        <Textarea
                          id="teachingInnovations"
                          {...register('teachingInnovations')}
                          placeholder="Describe teaching innovations..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="digitalTools" className="flex items-center gap-2 text-lg font-semibold">
                          <Wrench className="w-5 h-5" />
                          Use of Online/Digital Tools in Education
                        </Label>
                        <Textarea
                          id="digitalTools"
                          {...register('digitalTools')}
                          placeholder="Describe digital tools usage..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="studentFeedback" className="flex items-center gap-2 text-lg font-semibold">
                          <UsersRound className="w-5 h-5" />
                          Student Feedback Mechanisms and Key Outcomes
                        </Label>
                        <Textarea
                          id="studentFeedback"
                          {...register('studentFeedback')}
                          placeholder="Describe feedback mechanisms..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="academicChallenges" className="flex items-center gap-2 text-lg font-semibold">
                          <AlertCircle className="w-5 h-5" />
                          Challenges Faced in Academic Delivery
                        </Label>
                        <Textarea
                          id="academicChallenges"
                          {...register('academicChallenges')}
                          placeholder="Describe academic challenges..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 3: Research and Innovation */}
              <TabsContent value="research" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <Microscope className="w-6 h-6" />
                      SECTION 3: RESEARCH AND INNOVATION
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Research projects, publications, and collaborations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="researchProjectsInitiated" className="flex items-center gap-2 text-lg font-semibold">
                          <Target className="w-5 h-5" />
                          Number of Research Projects Initiated
                        </Label>
                        <Input
                          id="researchProjectsInitiated"
                          type="number"
                          {...register('researchProjectsInitiated', { valueAsNumber: true })}
                          placeholder="0"
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="researchProjectsCompleted" className="flex items-center gap-2 text-lg font-semibold">
                          <Trophy className="w-5 h-5" />
                          Number of Research Projects Completed
                        </Label>
                        <Input
                          id="researchProjectsCompleted"
                          type="number"
                          {...register('researchProjectsCompleted', { valueAsNumber: true })}
                          placeholder="0"
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="researchFunding" className="flex items-center gap-2 text-lg font-semibold">
                          <DollarSign className="w-5 h-5" />
                          Research Funding Received (Internal/External)
                        </Label>
                        <Textarea
                          id="researchFunding"
                          {...register('researchFunding')}
                          placeholder="Describe research funding received..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="publications" className="flex items-center gap-2 text-lg font-semibold">
                          <FileText className="w-5 h-5" />
                          Publications (Books, Journals, Conferences)
                        </Label>
                        <Textarea
                          id="publications"
                          {...register('publications')}
                          placeholder="List publications..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="patents" className="flex items-center gap-2 text-lg font-semibold">
                          <Library className="w-5 h-5" />
                          Patents Filed/Granted (if any)
                        </Label>
                        <Textarea
                          id="patents"
                          {...register('patents')}
                          placeholder="List patents..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="conferences" className="flex items-center gap-2 text-lg font-semibold">
                          <Users className="w-5 h-5" />
                          Conferences/Seminars/Workshops Organized
                        </Label>
                        <Textarea
                          id="conferences"
                          {...register('conferences')}
                          placeholder="List conferences organized..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="facultyParticipation" className="flex items-center gap-2 text-lg font-semibold">
                          <UserCog className="w-5 h-5" />
                          Faculty Participation in External Research Events
                        </Label>
                        <Textarea
                          id="facultyParticipation"
                          {...register('facultyParticipation')}
                          placeholder="Describe faculty participation..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="studentResearch" className="flex items-center gap-2 text-lg font-semibold">
                          <GraduationCap className="w-5 h-5" />
                          Student Involvement in Research Activities
                        </Label>
                        <Textarea
                          id="studentResearch"
                          {...register('studentResearch')}
                          placeholder="Describe student research involvement..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>

                    {/* Collaborations Table */}
                    <div className="bg-white rounded-lg border shadow-sm">
                      <div className="p-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                        <Label className="text-xl font-bold flex items-center gap-2">
                          <Globe className="w-6 h-6" />
                          COLLABORATIONS/MOUS WITH NATIONAL OR INTERNATIONAL INSTITUTIONS
                        </Label>
                      </div>
                      <div className="p-6">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="font-bold text-lg">Institution's Name</TableHead>
                              <TableHead className="font-bold text-lg">Objective</TableHead>
                              <TableHead className="font-bold text-lg text-center">Actions</TableHead>
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
                                    className="text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={collaboration.objective}
                                    onChange={(e) => updateCollaboration(index, 'objective', e.target.value)}
                                    placeholder="Objective"
                                    className="text-lg p-2"
                                  />
                                </TableCell>
                                <TableCell>
                                  <div className="flex justify-center gap-2">
                                    {collaborations.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        onClick={() => removeArrayField(setCollaborations, index, 'collaborations')}
                                        className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </Button>
                                    )}
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="lg"
                                      onClick={() => addArrayField(
                                        setCollaborations,
                                        { institutionName: '', objective: '' },
                                        'collaborations'
                                      )}
                                      className="h-10 w-10 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      <Plus className="w-5 h-5" />
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
                          size="lg"
                          className="mt-4 flex items-center gap-2 text-lg"
                          onClick={() => addArrayField(
                            setCollaborations,
                            { institutionName: '', objective: '' },
                            'collaborations'
                          )}
                        >
                          <Plus className="w-5 h-5" />
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
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <UserCog className="w-6 h-6" />
                      SECTION 4: HUMAN RESOURCES
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Staff information, recruitments, and development
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="academicStaff" className="flex items-center gap-2 text-lg font-semibold">
                          <Users className="w-5 h-5" />
                          Current Number of Academic Staff (by Rank)
                        </Label>
                        <Textarea
                          id="academicStaff"
                          {...register('academicStaff')}
                          placeholder="List academic staff by rank..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="adminStaff" className="flex items-center gap-2 text-lg font-semibold">
                          <Briefcase className="w-5 h-5" />
                          Current Number of Administrative/Technical Staff
                        </Label>
                        <Textarea
                          id="adminStaff"
                          {...register('adminStaff')}
                          placeholder="List administrative/technical staff..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="newRecruitments" className="flex items-center gap-2 text-lg font-semibold">
                          <User className="w-5 h-5" />
                          New Recruitments During Reporting Period
                        </Label>
                        <Textarea
                          id="newRecruitments"
                          {...register('newRecruitments')}
                          placeholder="Describe new recruitments..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="trainings" className="flex items-center gap-2 text-lg font-semibold">
                          <BookOpen className="w-5 h-5" />
                          Trainings/Workshops Attended by Staff
                        </Label>
                        <Textarea
                          id="trainings"
                          {...register('trainings')}
                          placeholder="List trainings and workshops..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="promotions" className="flex items-center gap-2 text-lg font-semibold">
                          <Trophy className="w-5 h-5" />
                          Promotions or Achievements
                        </Label>
                        <Textarea
                          id="promotions"
                          {...register('promotions')}
                          placeholder="Describe promotions and achievements..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="retirements" className="flex items-center gap-2 text-lg font-semibold">
                          <UsersRound className="w-5 h-5" />
                          Major Retirements/Resignations
                        </Label>
                        <Textarea
                          id="retirements"
                          {...register('retirements')}
                          placeholder="List retirements and resignations..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="developmentNeeds" className="flex items-center gap-2 text-lg font-semibold">
                          <Target className="w-5 h-5" />
                          Staff Development Needs Identified
                        </Label>
                        <Textarea
                          id="developmentNeeds"
                          {...register('developmentNeeds')}
                          placeholder="Describe development needs..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 5: Infrastructure and Facilities */}
              <TabsContent value="infrastructure" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <Building className="w-6 h-6" />
                      SECTION 5: INFRASTRUCTURE AND FACILITIES
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Infrastructure developments and facility upgrades
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="infrastructureAdditions" className="flex items-center gap-2 text-lg font-semibold">
                          <Plus className="w-5 h-5" />
                          Additions to Existing Infrastructure
                        </Label>
                        <Textarea
                          id="infrastructureAdditions"
                          {...register('infrastructureAdditions')}
                          placeholder="Describe infrastructure additions..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="newFacilities" className="flex items-center gap-2 text-lg font-semibold">
                          <Wrench className="w-5 h-5" />
                          New Facilities Added or Upgraded
                        </Label>
                        <Textarea
                          id="newFacilities"
                          {...register('newFacilities')}
                          placeholder="Describe new facilities..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="constructionStatus" className="flex items-center gap-2 text-lg font-semibold">
                          <Building className="w-5 h-5" />
                          Status of Major Construction/Renovation Projects
                        </Label>
                        <Textarea
                          id="constructionStatus"
                          {...register('constructionStatus')}
                          placeholder="Describe construction status..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="equipmentProcured" className="flex items-center gap-2 text-lg font-semibold">
                          <Microscope className="w-5 h-5" />
                          Equipment Procured
                        </Label>
                        <Textarea
                          id="equipmentProcured"
                          {...register('equipmentProcured')}
                          placeholder="List equipment procured..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="infrastructureChallenges" className="flex items-center gap-2 text-lg font-semibold">
                          <AlertCircle className="w-5 h-5" />
                          Challenges Related to Infrastructure
                        </Label>
                        <Textarea
                          id="infrastructureChallenges"
                          {...register('infrastructureChallenges')}
                          placeholder="Describe infrastructure challenges..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="accessibilityMeasures" className="flex items-center gap-2 text-lg font-semibold">
                          <HeartHandshake className="w-5 h-5" />
                          Accessibility and Inclusivity Measures
                        </Label>
                        <Textarea
                          id="accessibilityMeasures"
                          {...register('accessibilityMeasures')}
                          placeholder="Describe accessibility measures..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 6: Financial Status */}
              <TabsContent value="financial" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <DollarSign className="w-6 h-6" />
                      SECTION 6: FINANCIAL STATUS
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Budget allocation, expenditure, and revenue information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="budgetAllocated" className="flex items-center gap-2 text-lg font-semibold">
                          <BarChart className="w-5 h-5" />
                          Total Annual Budget Allocated
                        </Label>
                        <Textarea
                          id="budgetAllocated"
                          {...register('budgetAllocated')}
                          placeholder="Describe budget allocation..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="actualExpenditure" className="flex items-center gap-2 text-lg font-semibold">
                          <DollarSign className="w-5 h-5" />
                          Actual Expenditure (by Major Heads)
                        </Label>
                        <Textarea
                          id="actualExpenditure"
                          {...register('actualExpenditure')}
                          placeholder="Describe actual expenditure..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="revenueGenerated" className="flex items-center gap-2 text-lg font-semibold">
                          <TrendingUp className="w-5 h-5" />
                          Revenue Generated (Tuition Fees, Grants, Consultancies)
                        </Label>
                        <Textarea
                          id="revenueGenerated"
                          {...register('revenueGenerated')}
                          placeholder="Describe revenue generated..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="financialChallenges" className="flex items-center gap-2 text-lg font-semibold">
                          <AlertCircle className="w-5 h-5" />
                          Financial Challenges Faced
                        </Label>
                        <Textarea
                          id="financialChallenges"
                          {...register('financialChallenges')}
                          placeholder="Describe financial challenges..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="auditStatus" className="flex items-center gap-2 text-lg font-semibold">
                          <Shield className="w-5 h-5" />
                          Audit and Compliance Status
                        </Label>
                        <Textarea
                          id="auditStatus"
                          {...register('auditStatus')}
                          placeholder="Describe audit status..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 7: Governance and Management */}
              <TabsContent value="governance" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <Shield className="w-6 h-6" />
                      SECTION 7: GOVERNANCE AND MANAGEMENT
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Committee meetings, policies, and governance initiatives
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="meetingsHeld" className="flex items-center gap-2 text-lg font-semibold">
                          <Users className="w-5 h-5" />
                          Meetings Held (Faculty Board, Committees, etc.)
                        </Label>
                        <Textarea
                          id="meetingsHeld"
                          {...register('meetingsHeld')}
                          placeholder="Describe meetings held..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="keyDecisions" className="flex items-center gap-2 text-lg font-semibold">
                          <Target className="w-5 h-5" />
                          Key Decisions Taken
                        </Label>
                        <Textarea
                          id="keyDecisions"
                          {...register('keyDecisions')}
                          placeholder="Describe key decisions..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="policyUpdates" className="flex items-center gap-2 text-lg font-semibold">
                          <FileText className="w-5 h-5" />
                          Policy Updates or Changes
                        </Label>
                        <Textarea
                          id="policyUpdates"
                          {...register('policyUpdates')}
                          placeholder="Describe policy updates..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="grievanceHandling" className="flex items-center gap-2 text-lg font-semibold">
                          <HeartHandshake className="w-5 h-5" />
                          Grievance Handling Mechanisms
                        </Label>
                        <Textarea
                          id="grievanceHandling"
                          {...register('grievanceHandling')}
                          placeholder="Describe grievance handling..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="transparencyInitiatives" className="flex items-center gap-2 text-lg font-semibold">
                          <Globe className="w-5 h-5" />
                          Initiatives for Transparency and Accountability
                        </Label>
                        <Textarea
                          id="transparencyInitiatives"
                          {...register('transparencyInitiatives')}
                          placeholder="Describe transparency initiatives..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 8: Student Affairs and Support Services */}
              <TabsContent value="student" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <UsersRound className="w-6 h-6" />
                      SECTION 8: STUDENT AFFAIRS AND SUPPORT SERVICES
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Student support services and extracurricular activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="scholarships" className="flex items-center gap-2 text-lg font-semibold">
                          <DollarSign className="w-5 h-5" />
                          Scholarships and Financial Aid Programs
                        </Label>
                        <Textarea
                          id="scholarships"
                          {...register('scholarships')}
                          placeholder="Describe scholarship programs..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="careerCounseling" className="flex items-center gap-2 text-lg font-semibold">
                          <Briefcase className="w-5 h-5" />
                          Career Counseling and Placement Services
                        </Label>
                        <Textarea
                          id="careerCounseling"
                          {...register('careerCounseling')}
                          placeholder="Describe career services..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="extracurricular" className="flex items-center gap-2 text-lg font-semibold">
                          <Trophy className="w-5 h-5" />
                          Extracurricular Activities (Sports, Cultural, Clubs)
                        </Label>
                        <Textarea
                          id="extracurricular"
                          {...register('extracurricular')}
                          placeholder="Describe extracurricular activities..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="alumniEngagement" className="flex items-center gap-2 text-lg font-semibold">
                          <Users className="w-5 h-5" />
                          Alumni Engagement Activities
                        </Label>
                        <Textarea
                          id="alumniEngagement"
                          {...register('alumniEngagement')}
                          placeholder="Describe alumni engagement..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="studentAchievements" className="flex items-center gap-2 text-lg font-semibold">
                          <Award className="w-5 h-5" />
                          Major Achievements of Students
                        </Label>
                        <Textarea
                          id="studentAchievements"
                          {...register('studentAchievements')}
                          placeholder="Describe student achievements..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 9: Community Engagement and Extension Activities */}
              <TabsContent value="community" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <HeartHandshake className="w-6 h-6" />
                      SECTION 9: COMMUNITY ENGAGEMENT AND EXTENSION ACTIVITIES
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Community outreach and social responsibility initiatives
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="outreachPrograms" className="flex items-center gap-2 text-lg font-semibold">
                          <Globe className="w-5 h-5" />
                          Community Outreach Programs Conducted
                        </Label>
                        <Textarea
                          id="outreachPrograms"
                          {...register('outreachPrograms')}
                          placeholder="Describe outreach programs..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="communityCollaborations" className="flex items-center gap-2 text-lg font-semibold">
                          <Users className="w-5 h-5" />
                          Collaborations with Local Communities/Organizations
                        </Label>
                        <Textarea
                          id="communityCollaborations"
                          {...register('communityCollaborations')}
                          placeholder="Describe community collaborations..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="socialResponsibility" className="flex items-center gap-2 text-lg font-semibold">
                          <HeartHandshake className="w-5 h-5" />
                          Social Responsibility Initiatives
                        </Label>
                        <Textarea
                          id="socialResponsibility"
                          {...register('socialResponsibility')}
                          placeholder="Describe social responsibility initiatives..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="continuingEducation" className="flex items-center gap-2 text-lg font-semibold">
                          <BookOpen className="w-5 h-5" />
                          Continuing Education or Non-Degree Programs
                        </Label>
                        <Textarea
                          id="continuingEducation"
                          {...register('continuingEducation')}
                          placeholder="Describe continuing education programs..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 10: Achievements and Recognition */}
              <TabsContent value="achievements" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <Trophy className="w-6 h-6" />
                      SECTION 10: ACHIEVEMENTS AND RECOGNITION
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Awards, honors, and significant achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="awards" className="flex items-center gap-2 text-lg font-semibold">
                          <Award className="w-5 h-5" />
                          Major Awards, Honors, or Recognitions Received
                        </Label>
                        <Textarea
                          id="awards"
                          {...register('awards')}
                          placeholder="Describe awards and recognitions..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="successStories" className="flex items-center gap-2 text-lg font-semibold">
                          <FileText className="w-5 h-5" />
                          Success Stories and Best Practices
                        </Label>
                        <Textarea
                          id="successStories"
                          {...register('successStories')}
                          placeholder="Describe success stories..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="reputationContributions" className="flex items-center gap-2 text-lg font-semibold">
                          <TrendingUp className="w-5 h-5" />
                          Significant Contributions to the University's Reputation
                        </Label>
                        <Textarea
                          id="reputationContributions"
                          {...register('reputationContributions')}
                          placeholder="Describe contributions to reputation..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 11: Challenges and Lessons Learned */}
              <TabsContent value="challenges" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <AlertCircle className="w-6 h-6" />
                      SECTION 11: CHALLENGES AND LESSONS LEARNED
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Key challenges faced and strategies adopted
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="keyChallenges" className="flex items-center gap-2 text-lg font-semibold">
                          <AlertCircle className="w-5 h-5" />
                          Key Challenges Faced During the Year
                        </Label>
                        <Textarea
                          id="keyChallenges"
                          {...register('keyChallenges')}
                          placeholder="Describe key challenges..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="strategies" className="flex items-center gap-2 text-lg font-semibold">
                          <Target className="w-5 h-5" />
                          Strategies Adopted to Address Them
                        </Label>
                        <Textarea
                          id="strategies"
                          {...register('strategies')}
                          placeholder="Describe strategies adopted..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="lessonsLearned" className="flex items-center gap-2 text-lg font-semibold">
                          <Lightbulb className="w-5 h-5" />
                          Lessons Learned for Future Activities
                        </Label>
                        <Textarea
                          id="lessonsLearned"
                          {...register('lessonsLearned')}
                          placeholder="Describe lessons learned..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Section 12: Future Plans and Recommendations */}
              <TabsContent value="future" className="faculty-tab-content">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50" style={{padding:'20px'}}>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                      <Target className="w-6 h-6" />
                      SECTION 12: FUTURE PLANS AND RECOMMENDATIONS
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Goals, priorities, and recommendations for the future
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="majorGoals" className="flex items-center gap-2 text-lg font-semibold">
                          <Target className="w-5 h-5" />
                          Major Goals and Priorities for Next Academic Year
                        </Label>
                        <Textarea
                          id="majorGoals"
                          {...register('majorGoals')}
                          placeholder="Describe major goals..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="proposedProjects" className="flex items-center gap-2 text-lg font-semibold">
                          <Lightbulb className="w-5 h-5" />
                          Proposed Projects/Initiatives
                        </Label>
                        <Textarea
                          id="proposedProjects"
                          {...register('proposedProjects')}
                          placeholder="Describe proposed projects..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="supportNeeded" className="flex items-center gap-2 text-lg font-semibold">
                          <HandHeart className="w-5 h-5" />
                          Support Needed from Central Administration
                        </Label>
                        <Textarea
                          id="supportNeeded"
                          {...register('supportNeeded')}
                          placeholder="Describe support needed..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="policyReforms" className="flex items-center gap-2 text-lg font-semibold">
                          <FileText className="w-5 h-5" />
                          Policy or Structural Reforms Suggested
                        </Label>
                        <Textarea
                          id="policyReforms"
                          {...register('policyReforms')}
                          placeholder="Describe policy reforms..."
                          rows={4}
                          className="text-lg p-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="faculty-form-actions mt-8">
              <Button type="submit" className="faculty-submit-btn text-lg font-bold py-3 px-6">
                <Save className="w-5 h-5 mr-2" />
                SUBMIT FACULTY REPORT
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyForm;