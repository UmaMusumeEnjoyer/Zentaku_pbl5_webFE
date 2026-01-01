// src/pages/AnimeDetail/AnimeDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAnimeDetail } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../context/ThemeContext';
import './AnimeDetailPage.css';

// Import các component con (Đường dẫn tùy thuộc vào cấu trúc thư mục của bạn)
import SummarySection from './components/MainContentArea/Summary_section/SummarySection';
import InfoSidebar from './components/InfoSidebar/InfoSidebar';
import MainContentArea from './components/MainContentArea/MainContentArea';

const AnimeDetailPage: React.FC = () => {
  // 1. Lấy animeId từ URL params
  const { id } = useParams<{ id: string }>();
  
  // 2. Gọi hook để lấy dữ liệu và trạng thái
  const { anime, loading, error, hasBanner } = useAnimeDetail(id);
  const { theme } = useTheme();

  // 2. Xử lý các trạng thái Loading / Error
  if (loading) {
    return (
      <div className={`anime-detail-page-loading ${theme}`}>
        {/* Bạn có thể thay bằng component LoadingSpinner đẹp hơn */}
        Loading...
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className={`anime-detail-page-error ${theme}`}>
        {error || "Anime not found"}
      </div>
    );
  }

  // 3. Render UI chính
  return (
    <div className={`anime-detail-page ${theme}`}>
      {/* CHỈ RENDER BANNER KHI CÓ DỮ LIỆU (Logic đã được tính trong hook) */}
      {hasBanner && (
        <div 
          className="banner-image" 
          style={{ backgroundImage: `url(${anime.banner_image})` }}
        ></div>
      )}

      <div className="main-content-container">
        <div className="content-wrapper">
          
          {/* Summary Section: Phần header thông tin chính */}
          <SummarySection anime={anime as any} hasBanner={hasBanner} />
          
          <div className="detail-body-grid">
            {/* Cột trái: Thông tin chi tiết (Info Sidebar) */}
            <InfoSidebar anime={anime as any} />
            
            {/* Cột phải: Nội dung chính (Characters, Staff, Stats...) */}
            <MainContentArea anime={anime as any} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailPage;