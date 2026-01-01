// src/components/InfoSidebar/InfoComponents.tsx
import React from 'react';
import type { InfoBlockProps, InfoListBlockProps } from '@umamusumeenjoyer/shared-logic';

export const InfoBlock: React.FC<InfoBlockProps> = ({ label, value, isAiring = false }) => {
  if (value === null || value === undefined || value === '') return null;
  
  return (
    <div className="info-block">
      <h4 className={`info-label ${isAiring ? 'airing-label' : ''}`}>{label}</h4>
      <p className={`info-value ${isAiring ? 'airing-value' : ''}`}>{value}</p>
    </div>
  );
};

export const InfoListBlock: React.FC<InfoListBlockProps> = ({ label, items }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="info-block">
      <h4 className="info-label">{label}</h4>
      {items.map((item, index) => (
        <p key={index} className="info-value list-item">{item}</p>
      ))}
    </div>
  );
};