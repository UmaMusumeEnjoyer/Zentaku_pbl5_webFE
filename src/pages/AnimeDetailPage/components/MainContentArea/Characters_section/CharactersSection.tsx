// src/components/CharactersSection.tsx
import React from 'react';
import CharacterCard from './CharacterCard';
import { useAnimeCharacters } from '@umamusumeenjoyer/shared-logic';
import { useTranslation } from 'react-i18next'; // Import hook dịch
import './CharactersSection.css';

interface CharactersSectionProps {
  animeId: number | string;
}

const CharactersSection: React.FC<CharactersSectionProps> = ({ animeId }) => {
  const { t } = useTranslation('CharactersSection'); // Hook lấy hàm dịch
  const { characters, loading } = useAnimeCharacters(animeId);

  if (loading) {
    // Tách text cứng "Loading characters..."
    return <div>{t('characters.loading')}</div>;
  }

  if (!characters || characters.length === 0) {
    // Tách text cứng "No character information available."
    return <p>{t('characters.no_info')}</p>;
  }

  return (
    <div className="characters-grid">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  );
};

export default CharactersSection;