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
import { ProgressReport } from '@/types';
// import { ProgressReport } from '@/types';

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
      newAdmissions: 0,
      graduatedStudents: 0,
      passPercentage: 0,
      facultyTraining: 0,
      facultyResearch: 0,
      approvedBudget: 0,
      actualExpenditure: 0,
      revenueGenerated: 0,
      salariesAllowances: 0,
      capitalExpenditure: 0,
      operationalCosts: 0,
      researchDevelopment: 0,
      fundingSource: '',
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

  const handleInputChange = (field: keyof ProgressReport, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.collegeId || !formData.collegeName || !formData.academicYear) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    onSubmit(formData as ProgressReport);
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
            <TabsTrigger value="academic">Academic</TabsTrigger>
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

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>Student enrollment, graduation, and faculty development data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="totalStudents">Total Students</Label>
                    <Input
                      id="totalStudents"
                      type="number"
                      value={formData.totalStudents}
                      onChange={(e) => handleInputChange('totalStudents', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newAdmissions">New Admissions</Label>
                    <Input
                      id="newAdmissions"
                      type="number"
                      value={formData.newAdmissions}
                      onChange={(e) => handleInputChange('newAdmissions', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="graduatedStudents">Graduated Students</Label>
                    <Input
                      id="graduatedStudents"
                      type="number"
                      value={formData.graduatedStudents}
                      onChange={(e) => handleInputChange('graduatedStudents', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="passPercentage">Pass Percentage (%)</Label>
                    <Input
                      id="passPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.passPercentage}
                      onChange={(e) => handleInputChange('passPercentage', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="facultyTraining">Faculty Attended Training</Label>
                    <Input
                      id="facultyTraining"
                      type="number"
                      value={formData.facultyTraining}
                      onChange={(e) => handleInputChange('facultyTraining', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="facultyResearch">Faculty in Research</Label>
                    <Input
                      id="facultyResearch"
                      type="number"
                      value={formData.facultyResearch}
                      onChange={(e) => handleInputChange('facultyResearch', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                      value={formData.approvedBudget}
                      onChange={(e) => handleInputChange('approvedBudget', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="actualExpenditure">Actual Expenditure (NPR)</Label>
                    <Input
                      id="actualExpenditure"
                      type="number"
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
                      value={formData.revenueGenerated}
                      onChange={(e) => handleInputChange('revenueGenerated', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fundingSource">Funding Source</Label>
                    <Select
                      value={formData.fundingSource}
                      onValueChange={(value) => handleInputChange('fundingSource', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TU Grant">TU Grant</SelectItem>
                        <SelectItem value="Student Fees">Student Fees</SelectItem>
                        <SelectItem value="Government Grant">Government Grant</SelectItem>
                        <SelectItem value="Mixed Sources">Mixed Sources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <h4 className="font-semibold">Budget Breakdown</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salariesAllowances">Salaries & Allowances (NPR)</Label>
                    <Input
                      id="salariesAllowances"
                      type="number"
                      value={formData.salariesAllowances}
                      onChange={(e) => handleInputChange('salariesAllowances', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="capitalExpenditure">Capital Expenditure (NPR)</Label>
                    <Input
                      id="capitalExpenditure"
                      type="number"
                      value={formData.capitalExpenditure}
                      onChange={(e) => handleInputChange('capitalExpenditure', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="operationalCosts">Operational & Contingency (NPR)</Label>
                    <Input
                      id="operationalCosts"
                      type="number"
                      value={formData.operationalCosts}
                      onChange={(e) => handleInputChange('operationalCosts', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="researchDevelopment">Research & Development (NPR)</Label>
                    <Input
                      id="researchDevelopment"
                      type="number"
                      value={formData.researchDevelopment}
                      onChange={(e) => handleInputChange('researchDevelopment', parseFloat(e.target.value) || 0)}
                    />
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
                      value={formData.classroomCount}
                      onChange={(e) => handleInputChange('classroomCount', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="labCount">Number of Labs/Workshops</Label>
                    <Input
                      id="labCount"
                      type="number"
                      value={formData.labCount}
                      onChange={(e) => handleInputChange('labCount', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="libraryBooks">Total Library Books</Label>
                    <Input
                      id="libraryBooks"
                      type="number"
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