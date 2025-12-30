// src/components/CharactersSection.tsx
import React from 'react';
import CharacterCard from './CharacterCard';
import { useAnimeCharacters } from '@umamusumeenjoyer/shared-logic';
import './CharactersSection.css';

interface CharactersSectionProps {
  animeId: number | string; // Hỗ trợ cả string id từ URL hoặc number
}

const CharactersSection: React.FC<CharactersSectionProps> = ({ animeId }) => {
  // Sử dụng custom hook để lấy data
  const { characters, loading } = useAnimeCharacters(animeId);

  if (loading) {
    return <div>Loading characters...</div>;
  }

  if (!characters || characters.length === 0) {
    return <p>No character information available.</p>;
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