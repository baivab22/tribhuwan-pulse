import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ProgressReport, Program, FinancialStatus } from '@/types';

interface ProgressFormProps {
  onSubmit: (data: ProgressReport) => void;
  initialData?: ProgressReport;
  isLoading?: boolean;
}

export default function ProgressForm({ onSubmit, initialData, isLoading = false }: ProgressFormProps) {
  const [formData, setFormData] = useState<Partial<ProgressReport>>(
    initialData || {
      collegeId: '',
      collegeName: '',
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

  const [programs, setPrograms] = useState<Program[]>(initialData?.programs || []);
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: number]: boolean }>({});
  const [uploadingFinancialFiles, setUploadingFinancialFiles] = useState<{ [key: string]: boolean }>({});

  const handleInputChange = (field: keyof ProgressReport, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFinancialChange = (category: keyof FinancialStatus, field: string, value: number) => {
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

  const handleSourceChange = (category: keyof FinancialStatus, index: number, value: string) => {
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

  const addSource = (category: keyof FinancialStatus) => {
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

  const removeSource = (category: keyof FinancialStatus, index: number) => {
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

  const addProgram = () => {
    setPrograms(prev => [
      ...prev,
      {
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
      }
    ]);
  };

  const removeProgram = (index: number) => {
    setPrograms(prev => prev.filter((_, i) => i !== index));
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
      const CLOUDINARY_CLOUD_NAME = 'dpipulbgm'; // Your cloud name
      const CLOUDINARY_UPLOAD_PRESET = 'tu_reports'; // UPDATED: Use your actual preset name
      
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
        cloudinaryPublicId: cloudinaryPublicId // Store for potential deletion later
      };
      setPrograms(updatedPrograms);
      
      toast.success(`Approval letter "${file.name}" uploaded successfully`);
    } catch (error) {
      console.error('File upload error:', error);
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

    // Validate file type
    // const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    // if (!allowedTypes.includes(file.type)) {
    //   toast.error('Please upload a valid file (PDF, DOC, DOCX)');
    //   return;
    // }

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
    } catch (error) {
      console.error('Financial file upload error:', error);
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
    } catch (error) {
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
    } catch (error) {
      toast.error(`Failed to download ${documentType.replace(/([A-Z])/g, ' $1')}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.collegeId || !formData.collegeName || !formData.academicYear) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate programs
    if (programs.length === 0) {
      toast.error('Please add at least one program');
      return;
    }

    for (let i = 0; i < programs.length; i++) {
      const program = programs[i];
      if (!program.programName || program.programName.trim() === '') {
        toast.error(`Program ${i + 1}: Program name is required`);
        return;
      }

      if (program.maleStudents + program.femaleStudents !== program.totalStudents) {
        toast.error(`Program ${i + 1}: Male + Female students must equal Total Students`);
        return;
      }

      if (program.scholarshipStudents > program.totalStudents) {
        toast.error(`Program ${i + 1}: Scholarship students cannot exceed total students`);
        return;
      }

      if (program.passPercentage < 0 || program.passPercentage > 100) {
        toast.error(`Program ${i + 1}: Pass percentage must be between 0 and 100`);
        return;
      }
    }
    
    const submitData = {
      ...formData,
      programs,
      totalStudents: programs.reduce((sum, program) => sum + program.totalStudents, 0)
    } as ProgressReport;
    
    onSubmit(submitData);
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">
            Tribhuvan University
          </CardTitle>
          <CardDescription className="text-lg">
            Annual Progress Report Form
          </CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="declaration">Declaration</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>College identification and academic year details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="collegeId">College ID *</Label>
                    <Input
                      id="collegeId"
                      value={formData.collegeId}
                      onChange={(e) => handleInputChange('collegeId', e.target.value)}
                      placeholder="e.g., TU-ENG-001"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="collegeName">College Name *</Label>
                    <Input
                      id="collegeName"
                      value={formData.collegeName}
                      onChange={(e) => handleInputChange('collegeName', e.target.value)}
                      placeholder="e.g., Institute of Engineering"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="academicYear">Academic Year *</Label>
                    <Select
                      value={formData.academicYear}
                      onValueChange={(value) => handleInputChange('academicYear', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select academic year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025-2026">2025-2026</SelectItem>
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

          {/* Programs Tab */}
          <TabsContent value="programs">
            <Card>
              <CardHeader>
                <CardTitle>Program-wise Academic Data</CardTitle>
                <CardDescription>Student enrollment, gender distribution, and program details</CardDescription>
                <Button type="button" onClick={addProgram} className="mt-2">
                  Add Program
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {programs.map((program, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`programName-${index}`}>Program Name *</Label>
                        <Input
                          id={`programName-${index}`}
                          value={program.programName}
                          onChange={(e) => handleProgramChange(index, 'programName', e.target.value)}
                          placeholder="e.g., BSC Computer Science"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`totalStudents-${index}`}>Total Students</Label>
                        <Input
                          id={`totalStudents-${index}`}
                          type="number"
                          value={program.totalStudents}
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`maleStudents-${index}`}>Male Students</Label>
                        <Input
                          id={`maleStudents-${index}`}
                          type="number"
                          min="0"
                          value={program.maleStudents}
                          onChange={(e) => handleProgramChange(index, 'maleStudents', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`femaleStudents-${index}`}>Female Students</Label>
                        <Input
                          id={`femaleStudents-${index}`}
                          type="number"
                          min="0"
                          value={program.femaleStudents}
                          onChange={(e) => handleProgramChange(index, 'femaleStudents', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`scholarshipStudents-${index}`}>Scholarship Students</Label>
                        <Input
                          id={`scholarshipStudents-${index}`}
                          type="number"
                          min="0"
                          max={program.totalStudents}
                          value={program.scholarshipStudents}
                          onChange={(e) => handleProgramChange(index, 'scholarshipStudents', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`newAdmissions-${index}`}>New Admissions</Label>
                        <Input
                          id={`newAdmissions-${index}`}
                          type="number"
                          min="0"
                          value={program.newAdmissions}
                          onChange={(e) => handleProgramChange(index, 'newAdmissions', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`graduatedStudents-${index}`}>Graduated Students</Label>
                        <Input
                          id={`graduatedStudents-${index}`}
                          type="number"
                          min="0"
                          value={program.graduatedStudents}
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
                          value={program.passPercentage}
                          onChange={(e) => handleProgramChange(index, 'passPercentage', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`isScholarshipRuleApplied-${index}`}
                          checked={program.isScholarshipRuleApplied}
                          onChange={(e) => handleProgramChange(index, 'isScholarshipRuleApplied', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`isScholarshipRuleApplied-${index}`}>
                          Scholarship Rule Applied
                        </Label>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <Label htmlFor={`approvalLetter-${index}`}>Approval Letter</Label>
                      <div className="space-y-2">
                        {program.approvalLetterFilename ? (
                          <div className="flex items-center justify-between p-2 bg-green-50 rounded border">
                            <span className="text-sm text-green-700">{program.approvalLetterFilename}</span>
                            <div className="flex space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => downloadApprovalLetter(index)}
                              >
                                Download
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeApprovalLetter(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Input
                              id={`approvalLetter-${index}`}
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileUpload(index, e)}
                              disabled={uploadingFiles[index]}
                            />
                            <p className="text-xs text-gray-500">
                              Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
                            </p>
                          </div>
                        )}
                        {uploadingFiles[index] && (
                          <div className="text-sm text-blue-600">Uploading...</div>
                        )}
                      </div>
                    </div>

                    <Separator />
                  </div>
                ))}

                {programs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No programs added. Click "Add Program" to get started.
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Program Summary</h4>
                  <div className="grid grid-cols-4 gap-4 text-sm">
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Status (Summary)</CardTitle>
                <CardDescription>Annual budget, expenditure, and revenue details by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Salaries & Allowances */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-4">4.1 Salaries & Allowances</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="salaries-budget">Annual Budget (NPR)</Label>
                      <Input
                        id="salaries-budget"
                        type="number"
                        min="0"
                        value={financialData.salaries.annualBudget}
                        onChange={(e) => handleFinancialChange('salaries', 'annualBudget', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salaries-expenditure">Actual Expenditure (NPR)</Label>
                      <Input
                        id="salaries-expenditure"
                        type="number"
                        min="0"
                        value={financialData.salaries.actualExpenditure}
                        onChange={(e) => handleFinancialChange('salaries', 'actualExpenditure', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salaries-revenue">Revenue Generated (NPR)</Label>
                      <Input
                        id="salaries-revenue"
                        type="number"
                        min="0"
                        value={financialData.salaries.revenueGenerated}
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
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-4">4.2 Capital Expenditure (Infrastructure, Equipment)</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="capital-budget">Annual Budget (NPR)</Label>
                      <Input
                        id="capital-budget"
                        type="number"
                        min="0"
                        value={financialData.capital.annualBudget}
                        onChange={(e) => handleFinancialChange('capital', 'annualBudget', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="capital-expenditure">Actual Expenditure (NPR)</Label>
                      <Input
                        id="capital-expenditure"
                        type="number"
                        min="0"
                        value={financialData.capital.actualExpenditure}
                        onChange={(e) => handleFinancialChange('capital', 'actualExpenditure', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="capital-revenue">Revenue Generated (NPR)</Label>
                      <Input
                        id="capital-revenue"
                        type="number"
                        min="0"
                        value={financialData.capital.revenueGenerated}
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
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-4">4.3 Operational & Contingency</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="operational-budget">Annual Budget (NPR)</Label>
                      <Input
                        id="operational-budget"
                        type="number"
                        min="0"
                        value={financialData.operational.annualBudget}
                        onChange={(e) => handleFinancialChange('operational', 'annualBudget', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="operational-expenditure">Actual Expenditure (NPR)</Label>
                      <Input
                        id="operational-expenditure"
                        type="number"
                        min="0"
                        value={financialData.operational.actualExpenditure}
                        onChange={(e) => handleFinancialChange('operational', 'actualExpenditure', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="operational-revenue">Revenue Generated (NPR)</Label>
                      <Input
                        id="operational-revenue"
                        type="number"
                        min="0"
                        value={financialData.operational.revenueGenerated}
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
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-4">4.4 Research & Development</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="research-budget">Annual Budget (NPR)</Label>
                      <Input
                        id="research-budget"
                        type="number"
                        min="0"
                        value={financialData.research.annualBudget}
                        onChange={(e) => handleFinancialChange('research', 'annualBudget', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="research-expenditure">Actual Expenditure (NPR)</Label>
                      <Input
                        id="research-expenditure"
                        type="number"
                        min="0"
                        value={financialData.research.actualExpenditure}
                        onChange={(e) => handleFinancialChange('research', 'actualExpenditure', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="research-revenue">Revenue Generated (NPR)</Label>
                      <Input
                        id="research-revenue"
                        type="number"
                        min="0"
                        value={financialData.research.revenueGenerated}
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
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-4">Financial Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
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
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-4">Financial Documents</h4>
                  <div className="space-y-4">
                    {/* Audited Financial Statements */}
                    <div>
                      <Label>Audited Financial Statements</Label>
                      <div className="space-y-2">
                        {financialData.attachments.auditedFinancialStatementsFilename ? (
                          <div className="flex items-center justify-between p-2 bg-green-50 rounded border">
                            <span className="text-sm text-green-700">
                              {financialData.attachments.auditedFinancialStatementsFilename}
                            </span>
                            <div className="flex space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => downloadFinancialDocument('auditedFinancialStatements')}
                              >
                                Download
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeFinancialDocument('auditedFinancialStatements')}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.png"
                              onChange={(e) => handleFinancialFileUpload('auditedFinancialStatements', e)}
                              disabled={uploadingFinancialFiles.auditedFinancialStatements}
                            />
                            <p className="text-xs text-gray-500">
                              Accepted formats: PDF, DOC, DOCX (Max 10MB)
                            </p>
                          </div>
                        )}
                        {uploadingFinancialFiles.auditedFinancialStatements && (
                          <div className="text-sm text-blue-600">Uploading...</div>
                        )}
                      </div>
                    </div>

                    {/* Budget Copy */}
                    <div>
                      <Label>Budget Copy</Label>
                      <div className="space-y-2">
                        {financialData.attachments.budgetCopyFilename ? (
                          <div className="flex items-center justify-between p-2 bg-green-50 rounded border">
                            <span className="text-sm text-green-700">
                              {financialData.attachments.budgetCopyFilename}
                            </span>
                            <div className="flex space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => downloadFinancialDocument('budgetCopy')}
                              >
                                Download
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeFinancialDocument('budgetCopy')}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => handleFinancialFileUpload('budgetCopy', e)}
                              disabled={uploadingFinancialFiles.budgetCopy}
                            />
                            <p className="text-xs text-gray-500">
                              Accepted formats: PDF, DOC, DOCX (Max 10MB)
                            </p>
                          </div>
                        )}
                        {uploadingFinancialFiles.budgetCopy && (
                          <div className="text-sm text-blue-600">Uploading...</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Tab */}
          <TabsContent value="infrastructure">
            <Card>
              <CardHeader>
                <CardTitle>Infrastructure & Physical Progress</CardTitle>
                <CardDescription>Building, facilities, and equipment status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="classroomCount">Number of Classrooms</Label>
                    <Input
                      id="classroomCount"
                      type="number"
                      min="0"
                      value={formData.classroomCount}
                      onChange={(e) => handleInputChange('classroomCount', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="labCount">Number of Labs/Workshops</Label>
                    <Input
                      id="labCount"
                      type="number"
                      min="0"
                      value={formData.labCount}
                      onChange={(e) => handleInputChange('labCount', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="libraryBooks">Total Library Books</Label>
                    <Input
                      id="libraryBooks"
                      type="number"
                      min="0"
                      value={formData.libraryBooks}
                      onChange={(e) => handleInputChange('libraryBooks', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <Card>
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
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="researchProgress">Research & Innovation Progress</Label>
                  <Textarea
                    id="researchProgress"
                    value={formData.researchProgress}
                    onChange={(e) => handleInputChange('researchProgress', e.target.value)}
                    placeholder="Research projects completed, conferences held, patents..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="adminProgress">Administration & Governance Progress</Label>
                  <Textarea
                    id="adminProgress"
                    value={formData.adminProgress}
                    onChange={(e) => handleInputChange('adminProgress', e.target.value)}
                    placeholder="Policy updates, efficiency improvements, committee formation..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="qualityProgress">Quality Enhancement Progress</Label>
                  <Textarea
                    id="qualityProgress"
                    value={formData.qualityProgress}
                    onChange={(e) => handleInputChange('qualityProgress', e.target.value)}
                    placeholder="QAAC activities, student feedback system implementation..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="majorChallenges">Major Challenges/Issues Faced</Label>
                  <Textarea
                    id="majorChallenges"
                    value={formData.majorChallenges}
                    onChange={(e) => handleInputChange('majorChallenges', e.target.value)}
                    placeholder="Key challenges and obstacles encountered this year..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="nextYearPlan">Action Plan for Next Year</Label>
                  <Textarea
                    id="nextYearPlan"
                    value={formData.nextYearPlan}
                    onChange={(e) => handleInputChange('nextYearPlan', e.target.value)}
                    placeholder="Strategic plans aligned with TU goals..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Declaration Tab */}
          <TabsContent value="declaration">
            <Card>
              <CardHeader>
                <CardTitle>Declaration and Signatures</CardTitle>
                <CardDescription>Official declaration and responsible person details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Declaration:</strong> I hereby certify that the information provided in this Annual Progress Report 
                    is accurate and complete to the best of my knowledge and is based on the official records of the college.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
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

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            {isLoading ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </form>
    </div>
  );
}