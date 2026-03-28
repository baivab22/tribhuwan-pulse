import React, { useState } from 'react';
import { SurveyReportForm } from '@/components/surveyReportForm';
import SurveyReportList from '@/components/surveyReportList';

export const AddSurveyReportPage: React.FC = () => {


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <SurveyReportForm />
      </div>
    </div>
  );
};

export default AddSurveyReportPage;
