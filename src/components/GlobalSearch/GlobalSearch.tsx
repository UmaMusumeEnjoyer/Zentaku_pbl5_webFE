// src/components/GlobalSearch/GlobalSearchModal.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GlobalSearch.css';
import { useGlobalSearch, type GlobalSearchModalProps } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // 1. Import hook

const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // 2. Khởi tạo hook với namespace 'GlobalSearch'
  const { t } = useTranslation(['GlobalSearch']);

  // Callback để xử lý navigation khi user được chọn
  const handleUserSelect = (username: string) => {
    navigate(`/profile/${username}`);
  };

  // Lấy logic từ Hook với callback
  const { 
    searchTerm, 
    results, 
    loading, 
    handleInputChange, 
    handleUserClick 
  } = useGlobalSearch(isOpen, onClose, handleUserSelect);

  if (!isOpen) return null;

  // URL ảnh mặc định (Hardcoded từ code cũ)
  const defaultAvatar = "https://i.pinimg.com/736x/c0/27/be/c027bec07c9df60921dfd539bd.jpg";

  return (
    <div className="gs-overlay" onClick={onClose}>
      <div className="gs-content" data-theme={theme} onClick={(e) => e.stopPropagation()}>
        {/* Header: Input Search */}
        <div className="gs-header">
          <div className="gs-search-wrapper">
            <span className="material-symbols-outlined" 
                  style={{position: 'absolute', left: '14px', top: '12px', color: theme === 'dark' ? '#64748b' : '#94a3b8'}}>
              search
            </span>
            <input 
              className="gs-input"
              // 3. Thay thế placeholder cứng
              placeholder={t('GlobalSearch:placeholder')}
              value={searchTerm}
              onChange={handleInputChange}
              autoFocus
            />
          </div>
          <button className="gs-close-btn" onClick={onClose}>
            <span className="material-symbols-outlined" style={{fontSize: '28px'}}>close</span>
          </button>
        </div>

        {/* Body: Kết quả tìm kiếm */}
        <div className="gs-body">
          {/* 4. Thay thế text Loading */}
          {loading && <div className="gs-loading">{t('GlobalSearch:loading')}</div>}

          {/* 5. Thay thế text No Results và truyền tham số động */}
          {!loading && results.length === 0 && searchTerm && (
            <div className="gs-empty">
              {t('GlobalSearch:no_results', { query: searchTerm })}
            </div>
          )}
          
          {/* 6. Thay thế text hướng dẫn ban đầu */}
          {!loading && results.length === 0 && !searchTerm && (
            <div className="gs-empty">{t('GlobalSearch:start_typing')}</div>
          )}

          <div className="gs-results-list">
            {results.map((user) => (
              <div 
                key={user.id || user.username} 
                className="gs-result-item"
                onClick={() => handleUserClick(user.username)}
              >
                <img 
                  src={user.avatar || defaultAvatar} 
                  alt={user.username} 
                  className="gs-avatar" 
                />
                <div className="gs-info">
                  <span className="gs-username">{user.username}</span>
                </div>
                <span className="material-symbols-outlined" style={{marginLeft: 'auto', color: theme === 'dark' ? '#64748b' : '#94a3b8'}}>
                  chevron_right
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;