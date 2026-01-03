// src/pages/AnimeSearch/components/FilterBar.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import './FilterBar.css';
import { FaSearch, FaSyncAlt } from 'react-icons/fa';
import { 
  filterData, 
  GENRE_I18N_MAP,
  type FilterBarProps 
} from '@umamusumeenjoyer/shared-logic';
import { useFilterBar } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../../context/ThemeContext';

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, activeFilters }) => {
  const { theme } = useTheme();
  const { t } = useTranslation('AnimeSearch');
  
  const {
    filters,
    handleSearchAction,
    handleInputChange,
    handleFilterChange,
    handleClear,
    handleKeyDown,
  } = useFilterBar({ onSearch, activeFilters });

  return (
    <div className={`filter-bar container filter-bar--${theme}`}>
      {/* 1. SEARCH */}
      <div className="filter-group filter-search">
        <label>{t('filterBar.labels.search')}</label>
        <div className="search-box">
          <input
            type="text"
            placeholder={t('filterBar.placeholder.search')}
            value={filters.keyword}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="search-btn" onClick={handleSearchAction}>
            <FaSearch />
          </div>
        </div>
      </div>

      {/* 2. GENRES */}
      <div className="filter-group filter-genres">
        <label>{t('filterBar.labels.genres')}</label>
        <select 
          value={filters.genre} 
          onChange={(e) => handleFilterChange('genre', e.target.value)}
        >
          <option value="Any">{t('filterBar.options.any')}</option>
          {filterData.genres.map((g) => {
            const i18nKey = GENRE_I18N_MAP[g];
            return (
              <option key={g} value={g}>
                {t(`filterBar.options.genres.${i18nKey}`)}
              </option>
            );
          })}
        </select>
      </div>

      {/* 3. YEAR */}
      <div className="filter-group filter-year">
        <label>{t('filterBar.labels.year')}</label>
        <select 
          value={filters.year} 
          onChange={(e) => handleFilterChange('year', e.target.value)}
        >
          <option value="Any">{t('filterBar.options.any')}</option>
          {filterData.years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* 4. SEASON */}
      <div className="filter-group filter-season">
        <label>{t('filterBar.labels.season')}</label>
        <select 
          value={filters.season} 
          onChange={(e) => handleFilterChange('season', e.target.value)}
        >
          <option value="Any">{t('filterBar.options.any')}</option>
          {filterData.seasons.map((item) => (
            <option key={item.value} value={item.value}>
              {t(`filterBar.options.seasons.${item.label}`)}
            </option>
          ))}
        </select>
      </div>

      {/* 5. FORMAT */}
      <div className="filter-group filter-format">
        <label>{t('filterBar.labels.format')}</label>
        <select 
          value={filters.format} 
          onChange={(e) => handleFilterChange('format', e.target.value)}
        >
          <option value="Any">{t('filterBar.options.any')}</option>
          {filterData.formats.map((item) => (
            <option key={item.value} value={item.value}>
              {t(`filterBar.options.formats.${item.label}`)}
            </option>
          ))}
        </select>
      </div>

      {/* 6. STATUS */}
      <div className="filter-group filter-status">
        <label>{t('filterBar.labels.status')}</label>
        <select 
          value={filters.status} 
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="Any">{t('filterBar.options.any')}</option>
          {filterData.statuses.map((item) => (
            <option key={item.value} value={item.value}>
              {t(`filterBar.options.statuses.${item.label}`)}
            </option>
          ))}
        </select>
      </div>

      {/* 7. SORT */}
      <div className="filter-group filter-sort">
        <label>{t('filterBar.labels.sort')}</label>
        <select 
          value={filters.sort} 
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          {filterData.sorts.map((item) => (
            <option key={item.value} value={item.value}>
              {t(`filterBar.options.sorts.${item.label}`)}
            </option>
          ))}
        </select>
      </div>

      {/* 8. CLEAR BUTTON */}
      <div className="filter-group filter-clear" style={{ display: 'flex', alignItems: 'flex-end' }}>
        <button 
          onClick={handleClear}
          className="btn-clear-filter"
          title={t('filterBar.buttons.clearTitle')}
        >
          <FaSyncAlt style={{ marginRight: '5px' }} /> 
          {t('filterBar.buttons.clear')}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;