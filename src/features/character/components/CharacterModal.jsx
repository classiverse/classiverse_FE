import React from 'react';

export default function CharacterModal({ dataUrl, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 16,
          width: 'min(92vw, 420px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>Character</h3>
        <div style={{ fontSize: 14, color: '#374151' }}>
          data: {dataUrl || '(no url)'}
        </div>
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

