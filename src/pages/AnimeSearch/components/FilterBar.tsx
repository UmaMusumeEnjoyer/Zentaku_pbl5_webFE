// src/pages/AnimeSearch/components/FilterBar.tsx

import React from 'react';
import './FilterBar.css';
import { FaSearch, FaSyncAlt } from 'react-icons/fa';
import { filterData } from '@umamusumeenjoyer/shared-logic';
import {type FilterBarProps } from '@umamusumeenjoyer/shared-logic';
import { useFilterBar } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../../context/ThemeContext';

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, activeFilters }) => {
  const { theme } = useTheme();
  
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
        <label>Search</label>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search anime..."
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
        <label>Genres</label>
        <select 
          value={filters.genre} 
          onChange={(e) => handleFilterChange('genre', e.target.value)}
        >
          <option value="Any">Any</option>
          {filterData.genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* 3. YEAR */}
      <div className="filter-group filter-year">
        <label>Year</label>
        <select 
          value={filters.year} 
          onChange={(e) => handleFilterChange('year', e.target.value)}
        >
          <option value="Any">Any</option>
          {filterData.years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* 4. SEASON */}
      <div className="filter-group filter-season">
        <label>Season</label>
        <select 
          value={filters.season} 
          onChange={(e) => handleFilterChange('season', e.target.value)}
        >
          <option value="Any">Any</option>
          {filterData.seasons.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>

      {/* 5. FORMAT */}
      <div className="filter-group filter-format">
        <label>Format</label>
        <select 
          value={filters.format} 
          onChange={(e) => handleFilterChange('format', e.target.value)}
        >
          <option value="Any">Any</option>
          {filterData.formats.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>

      {/* 6. STATUS */}
      <div className="filter-group filter-status">
        <label>Status</label>
        <select 
          value={filters.status} 
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="Any">Any</option>
          {filterData.statuses.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>

      {/* 7. SORT */}
      <div className="filter-group filter-sort">
        <label>Sort</label>
        <select 
          value={filters.sort} 
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          {filterData.sorts.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>

      {/* 8. CLEAR BUTTON */}
      <div className="filter-group filter-clear" style={{ display: 'flex', alignItems: 'flex-end' }}>
        <button 
          onClick={handleClear}
          className="btn-clear-filter"
          title="Reset Filters"
        >
          <FaSyncAlt style={{ marginRight: '5px' }} /> Clear
        </button>
      </div>
    </div>
  );
};

export default FilterBar;