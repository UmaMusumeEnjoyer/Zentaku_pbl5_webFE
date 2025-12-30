// src/components/RankingCard.tsx
import React from 'react';
import type { Ranking } from '@umamusumeenjoyer/shared-logic';
import './RankingCard.css';

interface RankingCardProps {
  ranking: Ranking;
}

const RankingCard: React.FC<RankingCardProps> = ({ ranking }) => {
  // Chọn icon dựa trên loại xếp hạng
  const getIcon = () => {
    switch (ranking.type) {
      case 'RATED':
        return '⭐';
      case 'POPULAR':
        return '❤️';
      default:
        return '●';
    }
  };

  // Tạo chuỗi mô tả xếp hạng
  const getContextText = () => {
    const season = ranking.season 
      ? `${ranking.season.charAt(0).toUpperCase() + ranking.season.slice(1).toLowerCase()} ` 
      : '';
    return `#${ranking.rank} ${ranking.context} ${season}${ranking.year}`;
  };

  return (
    <div className="ranking-card">
      <span className="ranking-icon">{getIcon()}</span>
      <span className="ranking-text">{getContextText()}</span>
    </div>
  );
};

export default RankingCard;
