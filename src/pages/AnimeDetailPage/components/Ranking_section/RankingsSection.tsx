// src/components/RankingsSection.tsx
import React from 'react';
import RankingCard from './RankingCard';
import { useRankingFilter } from '@umamusumeenjoyer/shared-logic';
import type { Ranking } from '@umamusumeenjoyer/shared-logic';
import { useTranslation } from 'react-i18next'; // Import hook dịch
import './RankingsSection.css';

interface RankingsSectionProps {
  rankings: Ranking[] | undefined;
}

const RankingsSection: React.FC<RankingsSectionProps> = ({ rankings }) => {
  const { t } = useTranslation('RankingSection');
  // Sử dụng hook từ shared-logic để lọc rankings
  const filteredRankings = useRankingFilter(rankings);

  if (!filteredRankings || filteredRankings.length === 0) {
    // Thay thế text cứng bằng key dịch
    return <p>{t('ranking.no_available')}</p>;
  }

  return (
    <div className="rankings-grid">
      {filteredRankings.map(rank => (
        <RankingCard key={rank.id} ranking={rank} />
      ))}
    </div>
  );
};

export default RankingsSection;