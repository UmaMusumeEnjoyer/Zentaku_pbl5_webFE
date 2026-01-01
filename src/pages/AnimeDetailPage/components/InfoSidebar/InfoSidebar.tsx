// src/components/InfoSidebar/InfoSidebar.tsx
import React from 'react';
import './InfoSidebar.css';
import type { InfoSidebarProps } from '@umamusumeenjoyer/shared-logic';
import { useInfoSidebar } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Import hook
import { InfoBlock, InfoListBlock } from './InfoComponents';

const InfoSidebar: React.FC<InfoSidebarProps> = ({ anime }) => {
  // Lấy các hàm helper và dữ liệu đã tính toán từ Hook
  const { formatDate, airingString } = useInfoSidebar(anime);
  const { theme } = useTheme();
  
  // Khởi tạo translation hook
  const { t } = useTranslation(['AnimeDetail', 'common']);

  return (
    <aside className={`info-sidebar ${theme}`}>
      {/* Các thông tin đặc biệt cần xử lý logic */}
      <InfoBlock 
        label={t('AnimeDetail:sidebar.airing')} 
        value={airingString} 
        isAiring={true} 
      />
      
      {/* Các thông tin cơ bản */}
      <InfoBlock 
        label={t('AnimeDetail:sidebar.format')} 
        value={anime.airing_format} 
      />
      <InfoBlock 
        label={t('AnimeDetail:sidebar.episodes')} 
        value={anime.airing_episodes} 
      />
      <InfoBlock 
        label={t('AnimeDetail:sidebar.episode_duration')} 
        // Thay thế "mins" cứng bằng translation
        value={anime.duration ? `${anime.duration} ${t('common:time.mins')}` : null} 
      />
      <InfoBlock 
        label={t('AnimeDetail:sidebar.status')} 
        // Lưu ý: Giá trị status (RELEASING, FINISHED...) vẫn đang hiển thị tiếng Anh/Code
        // Bạn có thể map lại nếu cần (ví dụ: t(`AnimeDetail:status.${anime.airing_status}`))
        value={anime.airing_status?.replace(/_/g, ' ')} 
      />
      
      {/* Ngày tháng */}
      <InfoBlock 
        label={t('AnimeDetail:sidebar.start_date')} 
        value={formatDate(anime.starting_time)} 
      />
      <InfoBlock 
        label={t('AnimeDetail:sidebar.end_date')} 
        value={formatDate(anime.ending_time)} 
      />
      
      {/* Thông tin mùa và điểm số */}
      <InfoBlock 
        label={t('AnimeDetail:sidebar.season')} 
        value={anime.season && anime.season_year ? `${anime.season} ${anime.season_year}` : null} 
      />
      <InfoBlock 
        label={t('AnimeDetail:sidebar.average_score')} 
        value={anime.average_score ? `${anime.average_score}%` : null} 
      />
      <InfoBlock 
        label={t('AnimeDetail:sidebar.mean_score')} 
        value={anime.mean_score ? `${anime.mean_score}%` : null} 
      />
      
      {/* Số liệu thống kê */}
      <InfoBlock 
        label={t('AnimeDetail:sidebar.popularity')} 
        value={anime.popularity?.toLocaleString()} 
      />
      <InfoBlock 
        label={t('AnimeDetail:sidebar.favorites')} 
        value={anime.favourites?.toLocaleString()} 
      />
      
      {/* Danh sách */}
      <InfoListBlock 
        label={t('AnimeDetail:sidebar.studios')} 
        items={anime.studios} 
      />
      <InfoListBlock 
        label={t('AnimeDetail:sidebar.producers')} 
        items={anime.producers} 
      />
      
      {/* Tên gọi */}
      <InfoBlock 
        label={t('AnimeDetail:sidebar.source')} 
        value={anime.source} 
      />
      <InfoBlock 
        label={t('AnimeDetail:sidebar.native_title')} 
        value={anime.name_native} 
      />
      <InfoBlock 
        label={t('AnimeDetail:sidebar.english_title')} 
        value={anime.name_english} 
      />
    </aside>
  );
};

export default InfoSidebar;