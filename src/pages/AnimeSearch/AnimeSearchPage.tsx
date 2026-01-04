import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './AnimeSearchPage.css';

// Import Components
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import SectionGrid from './components/SectionGrid';
import AnimeCard from '../../components/AnimeCard/AnimeCard';

// Import Hook Logic
import { useAnimeSearchPage } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../context/ThemeContext';

// Import Static Data
import {
  heroList,
  trendingAnime,
  popularSeason,
  upcomingNext,
  allTimePopular
} from '@umamusumeenjoyer/shared-logic';

const AnimeSearchPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation('AnimeSearch');
  
  const {
    searchResults,
    isSearching,
    loading,
    viewTitle,
    canLoadMore,
    currentFilters,
    handleSearch,
    handleBackToHome,
    handleViewAllClick,
    handleLoadMore
  } = useAnimeSearchPage();

  return (
    <div className={`anime-search-page anime-search-page--${theme}`}>
      <HeroSection slides={heroList} />
      
      <FilterBar onSearch={handleSearch} activeFilters={currentFilters} />

      <div className="page-content">
        {isSearching ? (
          // --- VIEW: SEARCH MODE ---
          <div className="container anime-section">
            
            <div className="search-results-header">
              <h2 className="section-title">{viewTitle}</h2>
              <button className="back-btn" onClick={handleBackToHome}>
                <FaArrowLeft /> {t('searchResults.back')}
              </button>
            </div>
            
            <div className="anime-grid">
              {searchResults.length > 0 ? (
                searchResults.map((anime, index) => (
                  <div key={`${anime.id}-${index}`} className="grid-item">
                    <AnimeCard anime={anime} />
                  </div>
                ))
              ) : (
                !loading && (
                  <div className="no-results-message">
                    {t('searchResults.noResults')}
                  </div>
                )
              )}
            </div>

            {loading && <div className="loading-message">{t('searchResults.loading')}</div>}

            {!loading && canLoadMore && searchResults.length > 0 && (
              <div className="load-more-container">
                <button className="btn-see-more" onClick={handleLoadMore}>
                  {t('searchResults.seeMore')}
                </button>
              </div>
            )}
          </div>
        ) : (
          // --- VIEW: DEFAULT HOME MODE ---
          <>
            <SectionGrid 
                title={t('sections.trendingNow')}
                data={trendingAnime} 
                onViewAll={() => handleViewAllClick('TRENDING_NOW')}
            />
            
            <SectionGrid 
              title={t('sections.popularThisSeason')}
              data={popularSeason} 
              onViewAll={() => handleViewAllClick('POPULAR_THIS_SEASON')}
            />
            
            <SectionGrid 
              title={t('sections.upcomingNextSeason')}
              data={upcomingNext} 
              onViewAll={() => handleViewAllClick('UPCOMING_NEXT_SEASON')}
            />
            
            <SectionGrid 
              title={t('sections.allTimePopular')}
              data={allTimePopular} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AnimeSearchPage;