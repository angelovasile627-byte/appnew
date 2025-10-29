import React from 'react';

export const GalleryBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    backgroundColor: config.background.value,
    paddingTop: `${config.padding.top}px`,
    paddingBottom: `${config.padding.bottom}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: '0 24px'
  };

  return (
    <>
      <style>{`
        .gallery-block-grid {
          display: grid;
          grid-template-columns: repeat(${config.columns}, 1fr);
          gap: 24px;
        }
        @media (max-width: 768px) {
          .gallery-block-grid {
            grid-template-columns: repeat(${config.columns >= 3 ? 2 : 1}, 1fr) !important;
            gap: 16px;
          }
        }
        @media (max-width: 480px) {
          .gallery-block-grid {
            grid-template-columns: 1fr !important;
            gap: 16px;
          }
        }
      `}</style>
      <div style={containerStyle}>
        <div style={contentStyle}>
          {config.title.show && (
            <h2
              style={{
                fontSize: '42px',
                fontWeight: '700',
                color: config.title.color,
                textAlign: config.title.align,
                marginBottom: '16px'
              }}
            >
              {config.title.text}
            </h2>
          )}
          {config.description.show && (
            <p
              style={{
                fontSize: '18px',
                color: config.description.color,
                textAlign: config.description.align,
                marginBottom: '60px',
                maxWidth: '700px',
                margin: config.description.align === 'center' ? '0 auto 60px' : '0 0 60px'
              }}
            >
              {config.description.text}
            </p>
          )}
          <div className="gallery-block-grid">
          {config.images.map((image, index) => (
            <div
              key={index}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: '280px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};