// src/components/InfoSidebar/InfoSidebar.tsx
import React from 'react';
import './InfoSidebar.css';
import type { InfoSidebarProps } from '@umamusumeenjoyer/shared-logic';
import { useInfoSidebar } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../../../context/ThemeContext';
import { InfoBlock, InfoListBlock } from './InfoComponents';

const InfoSidebar: React.FC<InfoSidebarProps> = ({ anime }) => {
  // Lấy các hàm helper và dữ liệu đã tính toán từ Hook
  const { formatDate, airingString } = useInfoSidebar(anime);
  const { theme } = useTheme();

  return (
    <aside className={`info-sidebar ${theme}`}>
      {/* Các thông tin đặc biệt cần xử lý logic */}
      <InfoBlock label="Airing" value={airingString} isAiring={true} />
      
      {/* Các thông tin cơ bản */}
      <InfoBlock label="Format" value={anime.airing_format} />
      <InfoBlock label="Episodes" value={anime.airing_episodes} />
      <InfoBlock label="Episode Duration" value={anime.duration ? `${anime.duration} mins` : null} />
      <InfoBlock label="Status" value={anime.airing_status?.replace(/_/g, ' ')} />
      
      {/* Ngày tháng */}
      <InfoBlock label="Start Date" value={formatDate(anime.starting_time)} />
      <InfoBlock label="End Date" value={formatDate(anime.ending_time)} />
      
      {/* Thông tin mùa và điểm số */}
      <InfoBlock label="Season" value={anime.season && anime.season_year ? `${anime.season} ${anime.season_year}` : null} />
      <InfoBlock label="Average Score" value={anime.average_score ? `${anime.average_score}%` : null} />
      <InfoBlock label="Mean Score" value={anime.mean_score ? `${anime.mean_score}%` : null} />
      
      {/* Số liệu thống kê */}
      <InfoBlock label="Popularity" value={anime.popularity?.toLocaleString()} />
      <InfoBlock label="Favorites" value={anime.favourites?.toLocaleString()} />
      
      {/* Danh sách */}
      <InfoListBlock label="Studios" items={anime.studios} />
      <InfoListBlock label="Producers" items={anime.producers} />
      
      {/* Tên gọi */}
      <InfoBlock label="Source" value={anime.source} />
      <InfoBlock label="Native" value={anime.name_native} />
      <InfoBlock label="English" value={anime.name_english} />
    </aside>
  );
};

export default InfoSidebar;