// src/components/StaffCard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import hook
import './StaffCard.css';

// Nếu bạn đang dùng TypeScript, nên define interface (tùy chọn)
interface StaffMember {
  image?: string;
  name_full: string;
  role: string;
  id?: number | string;
}

interface StaffCardProps {
  staffMember: StaffMember;
}

const StaffCard: React.FC<StaffCardProps> = ({ staffMember }) => {
  const { t } = useTranslation(['StaffSection']); // 2. Sử dụng hook (có thể dùng namespace 'common' hoặc 'staff')

  // Kiểm tra xem ảnh có phải là ảnh mặc định hay không
  const hasDefaultImage = staffMember.image?.includes('default.jpg');
  
  return (
    <div className="staff-card">
      {hasDefaultImage ? (
        <div className="no-image-placeholder">
          {/* 3. Thay text cứng bằng key dịch */}
          <span>{t('common:staff.no_image')}</span>
        </div>
      ) : (
        <img src={staffMember.image} alt={staffMember.name_full} className="staff-avatar" />
      )}
      <div className="staff-details">
        <p className="staff-name">{staffMember.name_full}</p>
        {/* Lưu ý: role thường là dữ liệu từ API, nếu muốn dịch role cần mapping riêng */}
        <p className="staff-role">{staffMember.role}</p>
      </div>
    </div>
  );
};

export default StaffCard;