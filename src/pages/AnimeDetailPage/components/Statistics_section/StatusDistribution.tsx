// src/features/anime/components/StatusDistribution.tsx
import React from 'react';
import type { StatusDistributionProps } from '@umamusumeenjoyer/shared-logic';
import { useStatusDistribution } from '@umamusumeenjoyer/shared-logic';
import { useTranslation } from 'react-i18next'; // Import hook
import { useTheme } from '../../../../context/ThemeContext';
import './StatusDistribution.css';

const StatusDistribution: React.FC<StatusDistributionProps> = ({ distribution }) => {
  const { sortedDistribution, totalUsers, getStatusColor } = useStatusDistribution(distribution);
  const { theme } = useTheme();
  
  // Khởi tạo translation hook
  const { t } = useTranslation(['StatisticsSection', 'common']);

  if (!distribution || distribution.length === 0) {
    // Thay thế text cứng bằng key
    return <p>{t('AnimeDetail:status_distribution.no_data')}</p>;
  }

  return (
    <div className={`status-dist-container ${theme}`}>
      {/* Phần Legend (Chú thích) */}
      <div className="status-legend">
        {sortedDistribution.map(({ status, amount }) => (
          <div key={status} className="legend-item">
            <button 
              className="legend-button" 
              style={{ backgroundColor: getStatusColor(status) }}
            >
              {/* Lưu ý: 'status' thường là dữ liệu động từ API (Watching, Completed...), 
                  nếu muốn dịch cả status này, bạn cần một mapping key riêng hoặc BE trả về key. 
                  Hiện tại tôi giữ nguyên hiển thị status gốc. */}
              {status}
            </button>
            {/* Sử dụng interpolation để hiển thị số lượng user + từ 'Users' đã dịch */}
            <p className="legend-users">
              {t('common:users_count', { count: amount })}
            </p>
          </div>
        ))}
      </div>

      {/* Phần Progress Bar */}
      <div className="status-progress-bar">
        {sortedDistribution.map(({ status, amount }) => (
          <div
            key={status}
            className="progress-segment"
            style={{
              width: totalUsers > 0 ? `${(amount / totalUsers) * 100}%` : '0%',
              backgroundColor: getStatusColor(status),
            }}
            // Thêm title để hover xem chi tiết (Accessibility)
            title={`${status}: ${t('common:users_count', { count: amount })}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StatusDistribution;