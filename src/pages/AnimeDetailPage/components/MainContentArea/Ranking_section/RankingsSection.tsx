// src/components/RankingsSection.tsx
import React from 'react';
import RankingCard from './RankingCard';
import { useRankingFilter } from '@umamusumeenjoyer/shared-logic';
import type { Ranking } from '@umamusumeenjoyer/shared-logic';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../../context/ThemeContext';
import './RankingsSection.css';

interface RankingsSectionProps {
  rankings: Ranking[] | undefined;
}

const RankingsSection: React.FC<RankingsSectionProps> = ({ rankings }) => {
  const { t } = useTranslation('RankingSection');
  const { theme } = useTheme(); // Sử dụng theme từ context
  const filteredRankings = useRankingFilter(rankings);

  if (!filteredRankings || filteredRankings.length === 0) {
    return <p className={`no-rankings-message no-rankings-message--${theme}`}>
      {t('ranking.no_available')}
    </p>;
  }

  return (
    <div className={`rankings-grid rankings-grid--${theme}`}>
      {filteredRankings.map(rank => (
        <RankingCard key={rank.id} ranking={rank} />
      ))}
    </div>
  );
};

export default RankingsSection;