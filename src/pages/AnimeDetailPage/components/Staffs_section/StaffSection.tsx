// src/components/Staff/StaffSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import StaffCard from './StaffCard';
import { useStaffData } from '@umamusumeenjoyer/shared-logic'; // Import Hook
import type { StaffSectionProps } from '@umamusumeenjoyer/shared-logic';   // Import Types
import './StaffSection.css';

const StaffSection: React.FC<StaffSectionProps> = ({ animeId }) => {
  const { t } = useTranslation(['StaffSection', 'common']);
  
  // Sử dụng Custom Hook để lấy dữ liệu
  const { staff, loading } = useStaffData(animeId);

  if (loading) {
    return <div>{t('common:staff.loading')}</div>;
  }

  if (staff.length === 0) {
    return <p>{t('common:staff.no_info')}</p>;
  }

  return (
    <div className="staff-grid">
      {staff.map((member) => (
        <StaffCard key={member.id} staffMember={member} />
      ))}
    </div>
  );
};

export default StaffSection;