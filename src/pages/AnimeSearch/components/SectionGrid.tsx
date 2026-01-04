import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimeCard from '../../../components/AnimeCard/AnimeCard';
import { type SectionGridProps } from '@umamusumeenjoyer/shared-logic';
import { useSectionGrid } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../../context/ThemeContext';
import './SectionGrid.css';

const SectionGrid: React.FC<SectionGridProps> = ({ title, data, onViewAll }) => {
  // Kết nối ViewModel, Theme và i18n
  const { handleViewAllClick, hasData } = useSectionGrid(data, onViewAll);
  const { theme } = useTheme();
  const { t } = useTranslation('common');

  if (!hasData) {
    return null; 
  }

  return (
    <div className={`container anime-section ${theme}`}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        
        {/* Nút View All với i18n */}
        <a 
          href="#!" 
          className="view-all-btn" 
          onClick={handleViewAllClick}
        >
          {t('buttons.view_all')}
        </a>
      </div>

      <div className="anime-grid">
        {data.map((anime) => (
          <div key={anime.id} className="grid-item">
            {/* Truyền toàn bộ object anime vào component con */}
            <AnimeCard anime={anime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;