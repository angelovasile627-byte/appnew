import React from 'react';

export const GalleryScrollBlock = ({ config, onUpdate }) => {
  const scrollHeight = config.scrollHeight || 500;
  const gapBase = config.gapBase || 10;
  const sizeBase = config.sizeBase || 100;

  const containerStyle = {
    position: 'relative',
    minHeight: `${scrollHeight}vh`,
    backgroundColor: config.background?.color || '#111',
    width: '100%',
    overflow: 'hidden'
  };

  const wrapperStyle = {
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: `1fr 2fr ${sizeBase}px 2fr 1fr`,
    gridTemplateRows: `1fr ${sizeBase}px 1fr`,
    gridTemplateAreas: `
      "one two two three four"
      "one six center three eight"
      "five six seven seven eight"
    `,
    gap: '1rem'
  };

  const getImageStyle = (index) => {
    const positions = [
      { x: '-500%', y: '-200%' },
      { x: '-75%', y: '-200%' },
      { x: '200%', y: '0' },
      { x: '500%', y: '-200%' },
      { x: '-500%', y: '100%' },
      { x: '-200%', y: '0' },
      { x: '75%', y: '200%' },
      { x: '500%', y: '200%' }
    ];

    const areas = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

    return {
      gridArea: areas[index],
      backgroundImage: `url(${config.images[index]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      animation: 'slideIn 1s ease-out forwards',
      animationTimeline: 'scroll()',
      transform: `translate(${positions[index].x}, ${positions[index].y})`
    };
  };

  const centerStyle = {
    gridArea: 'center',
    backgroundColor: config.centerBg || '#333',
    color: config.centerColor || 'white',
    display: 'grid',
    placeContent: 'center',
    width: '600px',
    aspectRatio: '1',
    translate: '-250px -250px',
    backgroundImage: `url(${config.images[8]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    position: 'relative',
    transition: 'all 0.3s ease'
  };

  const textStyle = {
    fontFamily: '"Jura", sans-serif',
    fontWeight: 300,
    opacity: 1,
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '8px'
  };

  return (
    <div style={containerStyle} data-block-type="gallery-scroll">
      <style>{`
        @keyframes slideIn {
          0%, 15% {
            transform: translate(var(--x), var(--y));
          }
          100% {
            transform: translate(0, 0);
          }
        }
        
        @supports (animation-timeline: scroll()) {
          .gallery-scroll-item {
            animation: slideIn linear forwards;
            animation-timeline: scroll();
          }
        }
      `}</style>
      
      <div style={wrapperStyle}>
        {config.images.slice(0, 8).map((img, index) => (
          <div
            key={index}
            className="gallery-scroll-item"
            style={getImageStyle(index)}
          />
        ))}
        
        <div style={centerStyle}>
          <div style={textStyle}>
            <h1 style={{ 
              fontSize: config.title?.size || '48px',
              fontWeight: config.title?.weight || 500,
              margin: '0 0 10px 0'
            }}>
              {config.title?.text || 'Sliding images'}
            </h1>
            <p style={{ 
              fontSize: config.description?.size || '18px',
              margin: 0 
            }}>
              {config.description?.text || 'Scroll to reveal the images'}
            </p>
          </div>
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              position: 'absolute',
              bottom: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50px',
              height: '50px'
            }}
          >
            <path strokeWidth="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 3m0 4a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z" />
            <path d="M12 7l0 4" />
            <path d="M8 26l4 4l4 -4">
              <animateTransform 
                attributeType="XML" 
                attributeName="transform" 
                type="translate" 
                values="0 0; 0 4; 0 0" 
                dur="1s" 
                repeatCount="indefinite" 
              />
            </path>
          </svg>
        </div>
      </div>
    </div>
  );
};
