import { useScrollToTop } from '@/hooks/useScrollToTop';
import React from 'react';
import SurveyReportList from '@/components/surveyReportList';

export const SurveyReportPage: React.FC = () => {
  useScrollToTop();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
      <div className="max-w-7xl mx-auto">
        <SurveyReportList adminMode={false} />
      </div>
    </div>
  );
};

export default SurveyReportPage;
