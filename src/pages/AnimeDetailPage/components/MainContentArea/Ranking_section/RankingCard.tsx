// src/components/RankingCard.tsx
import React from 'react';
import type { Ranking } from '@umamusumeenjoyer/shared-logic';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../../context/ThemeContext';
import './RankingCard.css';

interface RankingCardProps {
  ranking: Ranking;
}

const RankingCard: React.FC<RankingCardProps> = ({ ranking }) => {
  const { t } = useTranslation('RankingSection');
  const { theme } = useTheme(); // Sử dụng theme từ context

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

  // Tạo chuỗi mô tả xếp hạng dùng Interpolation
  const getContextText = () => {
    const translatedSeason = ranking.season 
      ? t(`ranking.season.${ranking.season.toLowerCase()}`) 
      : '';

    return t('ranking.format', {
      rank: ranking.rank,
      context: ranking.context,
      season: translatedSeason,
      year: ranking.year
    });
  };

  return (
    <div className={`ranking-card ranking-card--${theme}`}>
      <span className="ranking-icon">{getIcon()}</span>
      <span className="ranking-text">{getContextText()}</span>
    </div>
  );
};

export default RankingCard;