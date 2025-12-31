// src/components/Staff/StaffCard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { StaffCardProps } from '@umamusumeenjoyer/shared-logic'; // Import types
import './StaffCard.css';

const StaffCard: React.FC<StaffCardProps> = ({ staffMember }) => {
  const { t } = useTranslation(['StaffSection', 'common']);

  // Logic hiển thị (View Logic)
  const hasDefaultImage = staffMember.image?.includes('default.jpg');
  
  return (
    <div className="staff-card">
      {hasDefaultImage ? (
        <div className="no-image-placeholder">
          <span>{t('common:staff.no_image')}</span>
        </div>
      ) : (
        <img 
          src={staffMember.image} 
          alt={staffMember.name_full} 
          className="staff-avatar" 
        />
      )}
      <div className="staff-details">
        <p className="staff-name">{staffMember.name_full}</p>
        <p className="staff-role">{staffMember.role}</p>
      </div>
    </div>
  );
};

export default StaffCard;