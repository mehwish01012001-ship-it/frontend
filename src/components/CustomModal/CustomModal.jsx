import React from 'react';
import { FiX } from 'react-icons/fi';
import './CustomModal.css';

const CustomModal = ({
  isOpen = false,
  title = '',
  children = null,
  onClose = () => {},
  footer = null,
  size = 'md',
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal modal-${size}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-btn">
            <FiX />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default CustomModal;
