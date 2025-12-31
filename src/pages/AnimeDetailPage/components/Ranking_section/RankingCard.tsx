// src/components/RankingCard.tsx
import React from 'react';
import type { Ranking } from '@umamusumeenjoyer/shared-logic';
import { useTranslation } from 'react-i18next'; // Hoặc hook từ shared-logic của bạn
import './RankingCard.css';

interface RankingCardProps {
  ranking: Ranking;
}

const RankingCard: React.FC<RankingCardProps> = ({ ranking }) => {
  const { t } = useTranslation('RankingSection');

  // Chọn icon dựa trên loại xếp hạng (Icon có thể giữ nguyên hoặc map config nếu cần thay đổi theo vùng)
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
    // 1. Dịch season nếu có. Nếu không, trả về chuỗi rỗng.
    // Giả sử ranking.season là 'winter', 'spring'... -> key là 'ranking.season.winter'
    const translatedSeason = ranking.season 
      ? t(`ranking.season.${ranking.season.toLowerCase()}`) 
      : '';

    // 2. Sử dụng format string để ghép chuỗi thay vì cộng chuỗi thủ công
    // Key: ranking.format
    // Data: { rank: 5, context: "...", season: "Mùa Đông", year: 2024 }
    return t('ranking.format', {
      rank: ranking.rank,
      context: ranking.context,
      season: translatedSeason,
      year: ranking.year
    });
  };

  return (
    <div className="ranking-card">
      <span className="ranking-icon">{getIcon()}</span>
      <span className="ranking-text">{getContextText()}</span>
    </div>
  );
};

export default RankingCard;