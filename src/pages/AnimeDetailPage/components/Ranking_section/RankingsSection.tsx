// src/components/RankingsSection.tsx
import React from 'react';
import RankingCard from './RankingCard';
import { useRankingFilter } from '@umamusumeenjoyer/shared-logic';
import type { Ranking } from '@umamusumeenjoyer/shared-logic';
import './RankingsSection.css';

interface RankingsSectionProps {
  rankings: Ranking[] | undefined;
}

// Component sử dụng useRankingFilter từ shared-logic
const RankingsSection: React.FC<RankingsSectionProps> = ({ rankings }) => {
  // Sử dụng hook từ shared-logic để lọc rankings
  const filteredRankings = useRankingFilter(rankings);

  if (!filteredRankings || filteredRankings.length === 0) {
    return <p>No rankings available.</p>;
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
