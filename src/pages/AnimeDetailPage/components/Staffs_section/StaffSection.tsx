// src/components/StaffSection.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import hook
import { animeService } from '@umamusumeenjoyer/shared-logic'; // Giữ nguyên import của bạn
import StaffCard from './StaffCard';
import './StaffSection.css';

interface StaffSectionProps {
  animeId: number | string;
}

const StaffSection: React.FC<StaffSectionProps> = ({ animeId }) => {
  const { t } = useTranslation(['StaffSection']); // 2. Khởi tạo hook
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      if (!animeId) return;
      try {
        setLoading(true);
        const response = await animeService.getAnimeStaff(animeId);
        // Lấy tối đa 3 staff đầu tiên
        setStaff(response.data.staff.slice(0, 3));
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [animeId]);

  if (loading) {
    // 3. Thay text loading
    return <div>{t('common:staff.loading')}</div>;
  }

  if (staff.length === 0) {
    // 4. Thay text no data
    return <p>{t('common:staff.no_info')}</p>;
  }

  return (
    <div className="staff-grid">
      {staff.map((member: any) => (
        <StaffCard key={member.id} staffMember={member} />
      ))}
    </div>
  );
};

export default StaffSection;