// src/features/anime/components/ScoreDistribution.tsx
import React from 'react';
import type { ScoreDistributionProps } from '@umamusumeenjoyer/shared-logic';
import { useScoreDistribution } from '@umamusumeenjoyer/shared-logic';
import { useTranslation } from 'react-i18next'; // Import hook
import { useTheme } from '../../../../../context/ThemeContext';
import './ScoreDistribution.css';

const ScoreDistribution: React.FC<ScoreDistributionProps> = ({ distribution }) => {
  const { maxAmount, getScoreColor } = useScoreDistribution(distribution);
  const { theme } = useTheme();
  
  // Khởi tạo translation hook
  const { t } = useTranslation(['StatisticsSection', 'common']);

  if (!distribution || distribution.length === 0) {
    // Thay thế text cứng bằng key
    return <p>{t('StatisticsSection:score_distribution.no_data')}</p>;
  }

  return (
    <div className={`score-dist-container ${theme}`}>
      <div className="score-chart">
        {distribution.map(({ score, amount }) => (
          <div key={score} className="chart-bar-item">
            <span className="bar-amount">{amount.toLocaleString()}</span>
            <div className="bar-element-container">
              <div
                className="bar-element"
                style={{
                  height: maxAmount > 0 ? `${(amount / maxAmount) * 100}%` : '0%',
                  backgroundColor: getScoreColor(score),
                }}
                // Thêm tooltip đơn giản để hỗ trợ trải nghiệm người dùng
                title={`${score}: ${t('common:users_count', { count: amount })}`}
              ></div>
            </div>
            <span className="bar-score">{score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreDistribution;