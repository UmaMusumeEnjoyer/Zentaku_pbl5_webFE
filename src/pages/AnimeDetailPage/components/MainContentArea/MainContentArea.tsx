// src/components/MainContent/MainContentArea.tsx
import React from 'react';
import './MainContentArea.css';
import { useAnimeStats } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Import translation hook
import type { 
  Ranking,
  StatusItem,
  ScoreItem
} from '@umamusumeenjoyer/shared-logic';

// Import sub-components
import CharactersSection from './Characters_section/CharactersSection';
import StaffSection from './Staffs_section/StaffSection';
import RankingsSection from './Ranking_section/RankingsSection';
import StatusDistribution from './Statistics_section/StatusDistribution'; 
import ScoreDistribution from './Statistics_section/ScoreDistribution'; 

// Local type definitions
interface TrailerInfo {
  id: string;
  site: string;
  thumbnail?: string;
}

interface Anime_mainContentArea {
  id: number | string;
  trailer?: TrailerInfo;
}

interface MainContentAreaProps {
  anime: Anime_mainContentArea;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

interface TrailerProps {
  trailerInfo?: TrailerInfo;
}

// UI Helper Components
const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="content-section">
    <h3 className="section-title">{title}</h3>
    {children}
  </section>
);

// Refactored Trailer component to support i18n
const Trailer: React.FC<TrailerProps> = ({ trailerInfo }) => {
  const { t } = useTranslation(['MainContentArea']);

  if (!trailerInfo || !trailerInfo.id || trailerInfo.site !== 'youtube') {
    return <p>{t('MainContentArea:trailer.no_data')}</p>;
  }
  
  const youtubeBaseUrl = import.meta.env.VITE_YOUTUBE_EMBED_URL;
  const embedUrl = `${youtubeBaseUrl}/${trailerInfo.id}`;
  
  return (
    <div className="trailer-container">
      <iframe
        src={embedUrl}
        title={t('MainContentArea:trailer.iframe_title')}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// Main Component
const MainContentArea: React.FC<MainContentAreaProps> = ({ anime }) => {
  // Call hooks
  const { stats, loading, error } = useAnimeStats(anime.id);
  const { theme } = useTheme();
  
  // Initialize translation hook
  const { t } = useTranslation(['MainContentArea', 'common']);

  if (loading) {
    return (
      <main className={`main-content-area ${theme}`}>
        <div className="loading-container">
          <p>{t('common:loading_stats')}</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={`main-content-area ${theme}`}>
        <div className="error-container">
          {/* Assuming error message from backend is English, 
              or you map it to a key. Here we wrap it in a generic structure. */}
          <p>{t('common:error', { message: error })}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={`main-content-area ${theme}`}>
      {/* Section titles are now translated using t()
      */}
      <Section title={t('MainContentArea:sections.characters')}>
        <CharactersSection animeId={anime.id} />
      </Section>
      
      <Section title={t('MainContentArea:sections.staff')}>
        <StaffSection animeId={anime.id} />
      </Section>
      
      <Section title={t('MainContentArea:sections.rankings')}>
        <RankingsSection rankings={(stats?.rankings as Ranking[]) || []} />
      </Section>
      
      <div className="distribution-container">
        <Section title={t('MainContentArea:sections.status_distribution')}>
          <StatusDistribution distribution={(stats?.status_distribution as StatusItem[]) || []} />
        </Section>
        <Section title={t('MainContentArea:sections.score_distribution')}>
          <ScoreDistribution distribution={(stats?.score_distribution as ScoreItem[]) || []} />
        </Section>
      </div>
      
      <Section title={t('MainContentArea:sections.trailer')}>
        <Trailer trailerInfo={anime.trailer} />
      </Section>
    </main>
  );
};

export default MainContentArea;