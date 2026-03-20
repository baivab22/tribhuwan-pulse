import React, { useState } from 'react';
import { SurveyReportForm } from '@/components/surveyReportForm';
import SurveyReportList from '@/components/surveyReportList';

export const AddSurveyReportPage: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <SurveyReportForm onSuccess={() => setRefreshKey((prev) => prev + 1)} />
        <div key={refreshKey}>
          <SurveyReportList adminMode={false} />
        </div>
      </div>
    </div>
  );
};

export default AddSurveyReportPage;
