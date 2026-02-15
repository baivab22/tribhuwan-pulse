import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API_BASE } from '@/lib/api';
import FacultyForm from './facultyForm.component';

interface EditFacultyFormPageProps {}

const EditFacultyFormPage: React.FC<EditFacultyFormPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Faculty form ID is missing');
      setLoading(false);
      return;
    }

    const fetchFacultyForm = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/api/faculty-forms/${id}`);
        
        if (response.data.success) {
          setFacultyData(response.data.data);
        } else {
          setError('Failed to load faculty form');
          toast.error('Failed to load faculty form');
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Error loading faculty form';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error loading faculty form:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyForm();
  }, [id]);

  const handleSuccess = () => {
    toast.success('Faculty form updated successfully!');
    // Redirect back to admin page after successful update
    setTimeout(() => {
      navigate('/admin/faculty');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Loading faculty form...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/admin/faculty')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back to Faculty List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!facultyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Faculty Form Not Found</CardTitle>
            <CardDescription>The faculty form you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/admin/faculty')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back to Faculty List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/faculty')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Faculty List
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Edit Faculty Form</CardTitle>
              <CardDescription>
                Updating information for: <strong>{facultyData.instituteName}</strong>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Edit Form */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <FacultyForm
              initialData={facultyData}
              isEditMode={true}
              onSuccess={handleSuccess}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditFacultyFormPage;
