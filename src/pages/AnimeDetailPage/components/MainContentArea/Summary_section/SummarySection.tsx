import React from 'react';
import EditorModal from '../../AnimeModal/EditorModal'; 
import type { SummarySectionProps } from '@umamusumeenjoyer/shared-logic';
import { useSummarySection } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../../../../context/ThemeContext';
import './SummarySection.css';

const SummarySection: React.FC<SummarySectionProps> = ({ anime, hasBanner }) => {
  // Gọi hook để lấy logic
  const {
    isModalOpen,
    currentStatusData,
    buttonLabel,
    handleBtnClick,
    handleCloseModal,
    handleSave,
    handleDelete
  } = useSummarySection(anime);

  const { theme } = useTheme();
  const buttonClass = 'btn-watching';

  return (
    <>
      <div className={`summary-section ${!hasBanner ? 'no-banner' : ''} ${theme}`}>
        <div className="summary-left">
          <img src={anime.cover_image} alt="Cover" className="summary-cover" />
          
          <button className={`btn ${buttonClass}`} onClick={handleBtnClick}>
            {buttonLabel} 
          </button>
        </div>

        <div className="summary-right">
          <h1 className="anime-title-main">{anime.name_romaji}</h1>
          <div 
            className="anime-description" 
            dangerouslySetInnerHTML={{ __html: anime.desc }}
          ></div>
        </div>
      </div>

      {/* EditorModal tách biệt hoàn toàn với logic của SummarySection */}
      <EditorModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        anime={anime}
        initialData={currentStatusData}
        onSave={handleSave} 
        onDelete={handleDelete}
      />
    </>
  );
};

export default SummarySection;