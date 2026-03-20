import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE } from '@/lib/api';

interface SurveyReportFormProps {
  onSuccess?: () => void;
}

export const SurveyReportForm: React.FC<SurveyReportFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    collegeName: '',
    reportYear: new Date().getFullYear().toString(),
    description: ''
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string>('');
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    return () => {
      if (pdfObjectUrl) {
        URL.revokeObjectURL(pdfObjectUrl);
      }
    };
  }, [pdfObjectUrl]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.collegeName.trim()) {
      newErrors.collegeName = 'College name is required';
    }
    if (!formData.reportYear.trim()) {
      newErrors.reportYear = 'Report year is required';
    } else if (!/^\d{4}$/.test(formData.reportYear)) {
      newErrors.reportYear = 'Report year must be a valid 4-digit year';
    }
    if (!pdfFile) {
      newErrors.pdfFile = 'PDF file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed');
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        toast.error('File size must be less than 50 MB');
        return;
      }
      setPdfFile(file);
      setPdfPreview(file.name);
      if (pdfObjectUrl) {
        URL.revokeObjectURL(pdfObjectUrl);
      }
      setPdfObjectUrl(URL.createObjectURL(file));
      setErrors({ ...errors, pdfFile: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const data = new FormData();
      data.append('collegeName', formData.collegeName);
      data.append('reportYear', formData.reportYear);
      data.append('description', formData.description);
      if (pdfFile) {
        data.append('pdfFile', pdfFile);
      }

      const response = await axios.post(`${API_BASE}/api/survey-reports`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        }
      });

      if (response.data.success) {
        toast.success('Survey report submitted successfully!');
        setFormData({
          collegeName: '',
          reportYear: new Date().getFullYear().toString(),
          description: ''
        });
        setPdfFile(null);
        setPdfPreview('');
        if (pdfObjectUrl) {
          URL.revokeObjectURL(pdfObjectUrl);
        }
        setPdfObjectUrl('');
        onSuccess?.();
      }
    } catch (error: unknown) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to submit survey report'
        : 'Failed to submit survey report';
      toast.error(errorMessage);
      console.error('Error submitting survey report:', error);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Add Survey Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Alert */}
            {uploadProgress === 100 && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  File uploaded successfully!
                </AlertDescription>
              </Alert>
            )}

            {/* College Name */}
            <div className="space-y-2">
              <Label htmlFor="collegeName" className="text-sm font-semibold">
                College Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="collegeName"
                placeholder="Enter college name"
                value={formData.collegeName}
                onChange={(e) => {
                  setFormData({ ...formData, collegeName: e.target.value });
                  setErrors({ ...errors, collegeName: '' });
                }}
                className={errors.collegeName ? 'border-red-500' : ''}
              />
              {errors.collegeName && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.collegeName}
                </p>
              )}
            </div>

            {/* Report Year */}
            <div className="space-y-2">
              <Label htmlFor="reportYear" className="text-sm font-semibold">
                Report Year <span className="text-red-500">*</span>
              </Label>
              <select
                id="reportYear"
                value={formData.reportYear}
                onChange={(e) => {
                  setFormData({ ...formData, reportYear: e.target.value });
                  setErrors({ ...errors, reportYear: '' });
                }}
                className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                  errors.reportYear ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.reportYear && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.reportYear}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Add any additional information about this report..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            {/* PDF File Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Upload PDF Report <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isLoading}
                />
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    pdfFile
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 bg-gray-50 hover:border-indigo-400'
                  } ${errors.pdfFile ? 'border-red-500 bg-red-50' : ''}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    {pdfFile ? (
                      <>
                        <FileText className="w-12 h-12 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{pdfPreview}</p>
                          <p className="text-xs text-gray-500">
                            {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setPdfFile(null);
                              setPdfPreview('');
                              if (pdfObjectUrl) {
                                URL.revokeObjectURL(pdfObjectUrl);
                              }
                              setPdfObjectUrl('');
                            }}
                            className="mt-2 text-xs text-red-600 hover:text-red-800 flex items-center gap-1 justify-center"
                          >
                            <X className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Drag and drop your PDF here</p>
                          <p className="text-xs text-gray-500">or click to browse</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {pdfObjectUrl && (
                <div className="space-y-2 mt-3">
                  <Label className="text-sm font-semibold">PDF Preview</Label>
                  <div className="w-full h-[360px] border rounded-lg overflow-hidden bg-gray-100">
                    <iframe
                      title="Survey PDF Preview"
                      src={pdfObjectUrl}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
              {errors.pdfFile && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.pdfFile}
                </p>
              )}
            </div>

            {/* Upload Progress */}
            {isLoading && uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Uploading...</span>
                  <span className="text-indigo-600 font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              >
                {isLoading ? 'Uploading...' : 'Submit Report'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    collegeName: '',
                    reportYear: new Date().getFullYear().toString(),
                    description: ''
                  });
                  setPdfFile(null);
                  setPdfPreview('');
                  if (pdfObjectUrl) {
                    URL.revokeObjectURL(pdfObjectUrl);
                  }
                  setPdfObjectUrl('');
                  setErrors({});
                }}
                disabled={isLoading}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyReportForm;
