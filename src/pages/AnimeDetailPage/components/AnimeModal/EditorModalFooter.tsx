// src/components/EditorModal/EditorModalFooter.tsx
import React from 'react';
import type { EditorModalFooterProps } from '@umamusumeenjoyer/shared-logic';

const EditorModalFooter: React.FC<EditorModalFooterProps> = ({ onDelete }) => {
  return (
    <div className="editor-modal-footer">
      <button className="editor-modal-btn-delete" onClick={onDelete}>Delete</button>
    </div>
  );
};

export default EditorModalFooter;