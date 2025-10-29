import React, { useEffect, useRef } from 'react';

export const GalleryBlock = ({ config, onUpdate }) => {
  const galleryRef = useRef(null);
  const animation = config.animation || 'hover-zoom';

  useEffect(() => {
    if (animation === 'fade-scroll' && galleryRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in-visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      const items = galleryRef.current.querySelectorAll('.gallery-item');
      items.forEach((item) => observer.observe(item));

      return () => observer.disconnect();
    }
  }, [animation]);

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

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-scroll':
        return 'gallery-fade-scroll';
      case 'slide':
        return 'gallery-slide';
      case 'hover-zoom':
      default:
        return 'gallery-hover-zoom';
    }
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

        /* Hover Zoom Animation */
        .gallery-hover-zoom .gallery-item {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gallery-hover-zoom .gallery-item:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }

        /* Fade Scroll Animation */
        .gallery-fade-scroll .gallery-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .gallery-fade-scroll .gallery-item.fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Slide Animation */
        .gallery-slide .gallery-item {
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .gallery-slide .gallery-item:nth-child(odd) {
          transform: translateX(-50px);
        }
        .gallery-slide .gallery-item:nth-child(even) {
          transform: translateX(50px);
        }
        .gallery-slide .gallery-item.fade-in-visible {
          opacity: 1;
          transform: translateX(0);
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