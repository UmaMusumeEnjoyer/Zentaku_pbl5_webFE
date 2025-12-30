// src/components/AnimeCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AnimeCard.css'; // Giữ nguyên CSS cũ

// Import logic và type từ thư viện vừa tạo
import type { AnimeData } from '@umamusumeenjoyer/shared-logic';
import { 
  getAnimeTitle, 
  getAnimeLinkId, 
  getAnimeDisplayInfo 
} from '@umamusumeenjoyer/shared-logic';

// Định nghĩa Props cho Component
interface AnimeCardProps {
  anime: AnimeData;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  // Gọi các hàm logic để lấy dữ liệu
  const title = getAnimeTitle(anime);
  const linkId = getAnimeLinkId(anime);
  const displayInfo = getAnimeDisplayInfo(anime);

  // Logic class giao diện (View Logic đơn giản thì để ở UI cũng được)
  const detailsClass = displayInfo ? 'anime-details' : 'anime-details no-info';

  return (
    <Link to={`/anime/${linkId}`} className="anime-card-link">
      <div className="anime-card" title={title}>
        <img 
          src={anime.cover_image} 
          alt={title} 
          className="anime-poster" 
          loading="lazy" // Mẹo: Thêm lazy load để tối ưu performance cho Vite
        />
        
        <div className={detailsClass}>
          <h3 className="anime-title-text">{title}</h3>

          {displayInfo && (
            <div className="airing-info">
              <p className="episode-time">{displayInfo}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;