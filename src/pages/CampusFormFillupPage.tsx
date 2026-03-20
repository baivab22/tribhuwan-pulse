import React from 'react';
import CampusFormFillup from '@/components/campusFormFillup';

export const CampusFormFillupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
      <div className="max-w-7xl mx-auto">
        <CampusFormFillup />
      </div>
    </div>
  );
};

export default CampusFormFillupPage;
