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
import { ProgressReport, Program } from '@/types';

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
      submittedBy: ''
    }
  );

  const [programs, setPrograms] = useState<Program[]>(initialData?.programs || []);
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: number]: boolean }>({});

  const handleInputChange = (field: keyof ProgressReport, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploadingFiles(prev => ({ ...prev, [index]: true }));

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('approvalLetter', file);
      formData.append('programName', programs[index].programName || `Program ${index + 1}`);

      // Upload file to server
      const response = await fetch('/api/upload/approval-letter', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const result = await response.json();

      if (result.success) {
        // Update program with file information
        const updatedPrograms = [...programs];
        updatedPrograms[index] = {
          ...updatedPrograms[index],
          approvalLetterPath: result.data.filePath,
          approvalLetterFilename: result.data.filename
        };
        setPrograms(updatedPrograms);
        toast.success(`Approval letter "${file.name}" uploaded successfully`);
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('File upload error:', error);
      toast.error('Failed to upload approval letter. Please try again.');
    } finally {
      setUploadingFiles(prev => ({ ...prev, [index]: false }));
      // Clear the file input
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

  const downloadApprovalLetter = async (index: number) => {
    const program = programs[index];
    if (!program.approvalLetterPath) return;

    try {
      const response = await fetch(`/api/download/approval-letter?filePath=${encodeURIComponent(program.approvalLetterPath)}`);
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
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
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
                              Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 5MB)
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

          {/* Other tabs remain the same */}
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Status</CardTitle>
                <CardDescription>Budget allocation, expenditure, and revenue details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="approvedBudget">Annual Budget (NPR)</Label>
                    <Input
                      id="approvedBudget"
                      type="number"
                      min="0"
                      value={formData.approvedBudget}
                      onChange={(e) => handleInputChange('approvedBudget', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="actualExpenditure">Actual Expenditure (NPR)</Label>
                    <Input
                      id="actualExpenditure"
                      type="number"
                      min="0"
                      value={formData.actualExpenditure}
                      onChange={(e) => handleInputChange('actualExpenditure', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="revenueGenerated">Revenue Generated (NPR)</Label>
                    <Input
                      id="revenueGenerated"
                      type="number"
                      min="0"
                      value={formData.revenueGenerated}
                      onChange={(e) => handleInputChange('revenueGenerated', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label>Budget Utilization</Label>
                    <div className="p-2 bg-gray-100 rounded text-sm">
                      {formData.approvedBudget > 0
                        ? `${((formData.actualExpenditure / formData.approvedBudget) * 100).toFixed(2)}%`
                        : '0%'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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