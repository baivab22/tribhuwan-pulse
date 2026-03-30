import { useScrollToTop } from '@/hooks/useScrollToTop';
import React from 'react';
import CollegeDataForm from './collegeForm';

export const CampusFormFillupPage: React.FC = () => {
  useScrollToTop();
  return <CollegeDataForm />;
};

export default CampusFormFillupPage;
