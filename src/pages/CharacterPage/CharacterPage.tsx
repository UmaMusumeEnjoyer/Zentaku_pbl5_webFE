// src/features/character/CharacterPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import i18n hook
import styles from './CharacterPage.module.css';

// Hooks & Types & Components
import { useCharacter } from '@umamusumeenjoyer/shared-logic';
import { Spoiler } from './Spoiler'; // Đảm bảo đường dẫn import đúng
import { useTheme } from '../../context/ThemeContext';

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  
  // Khởi tạo hook translation với namespace 'CharacterPage' và 'common'
  const { t } = useTranslation(['CharacterPage', 'common']);

  // Gọi logic từ Custom Hook
  const { 
    character, 
    loading,
    error,
    cleanDescription, 
  } = useCharacter(id);

  const renderDescriptionWithSpoilers = (text: string) => {
    const parts = text.split(/(~!|!~)/g);
    let isSpoilerContent = false;

    return parts.map((part, index) => {
      if (part === '~!' || part === '!~') {
        if (part === '~!') isSpoilerContent = true;
        if (part === '!~') isSpoilerContent = false;
        return null;
      }
      
      return isSpoilerContent ? (
        <Spoiler key={index}>{part}</Spoiler>
      ) : (
        <span key={index}>{part}</span>
      );
    });
  };

  // Sử dụng common namespace cho các trạng thái chung
  if (loading) return <div className={styles.loading}>{t('common:loading')}</div>;
  
  if (error) return (
    <div className={styles.loading}>
      {t('common:error', { message: error })}
    </div>
  );
  
  if (!character) return (
    <div className={styles.loading}>
      {t('error.not_found')}
    </div>
  );

  return (
    <div className={styles.pageWrapper} data-theme={theme}>
      
      <div className={styles.mainContent}>
        {/* Cột trái: Ảnh */}
        <div className={styles.leftColumn}>
          <img 
            src={character.image} 
            alt={character.name_full} 
            className={styles.characterImage} 
          />
        </div>

        {/* Cột phải: Thông tin */}
        <div className={styles.rightColumn}>
          <h1 className={styles.characterName}>{character.name_full}</h1>
          <p className={styles.nativeName}>{character.name_native}</p>
          
          <div className={styles.description}>
            {renderDescriptionWithSpoilers(cleanDescription)}
          </div>
        </div>
      </div>

      {/* Media Section */}
      <div className={styles.mediaSection}>
        {/* Thay thế tiêu đề bằng key translation */}
        <h2>{t('sections.media_appearances')}</h2>
        
        <div className={styles.mediaGrid}>
          {character.media.map((item) => (
            <a href={`/anime/${item.id}`} key={item.id} className={styles.mediaCard}>
              <img src={item.cover_image} alt={item.title_romaji} />
              <p>{item.title_romaji}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;