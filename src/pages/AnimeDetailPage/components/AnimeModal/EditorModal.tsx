// src/components/EditorModal/EditorModal.tsx
import React from 'react';
import './EditorModal.css';
import EditorModalHeader from './EditorModalHeader';
import EditorModalForm from './EditorModalForm';
import EditorModalFooter from './EditorModalFooter';
import { useEditorModal } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../../../context/ThemeContext';
import type { EditorModalProps } from '@umamusumeenjoyer/shared-logic';

const EditorModal: React.FC<EditorModalProps> = ({ 
  anime, 
  isOpen, 
  onClose, 
  onSave, 
  onDelete, 
  initialData 
}) => {
  
  // 1. Lấy logic từ Hook
  const {
    formData,
    isEditMode,
    handleChange,
    toggleFavorite,
    handleSaveClick,
    handleDeleteClick
  } = useEditorModal(anime, initialData, onSave, onDelete, onClose);

  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="editor-modal-overlay" onClick={onClose}>
      <div className={`editor-modal-content ${theme}`} onClick={e => e.stopPropagation()}>
        
        {/* Header: Chứa nút Save và Favorite */}
        <EditorModalHeader 
          anime={anime}
          onClose={onClose}
          onSave={handleSaveClick}
          isFavorite={formData.isFavorite}
          toggleFavorite={toggleFavorite}
        />

        <div className="editor-modal-body">
          {/* Form: Chứa các input fields */}
          <EditorModalForm 
            formData={formData}
            handleChange={handleChange}
            isEditMode={isEditMode}
          />
          
          {/* Footer: Chỉ hiện nút xóa khi đang ở chế độ Edit */}
          {isEditMode && <EditorModalFooter onDelete={handleDeleteClick} />}
        </div>
      
      </div>
    </div>
  );
};

export default EditorModal;