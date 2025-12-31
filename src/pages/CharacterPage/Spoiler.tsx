// src/features/character/components/Spoiler.tsx
import React, { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next'; //
import styles from './CharacterPage.module.css';

interface SpoilerProps {
  children: ReactNode;
}

export const Spoiler: React.FC<SpoilerProps> = ({ children }) => {
  const [revealed, setRevealed] = useState(false);
  const { t } = useTranslation('CharacterPage'); // Sử dụng namespace CharacterPage

  if (!revealed) {
    return (
      <span 
        className={styles.spoiler} 
        onClick={() => setRevealed(true)}
        style={{ cursor: 'pointer', backgroundColor: '#000', color: '#000' }}
      >
        {/* Thay thế text cứng bằng key translation */}
        {t('CharacterPage:spoiler.click_to_view')}
      </span>
    );
  }
  return <span className={styles.spoilerRevealed}>{children}</span>;
};