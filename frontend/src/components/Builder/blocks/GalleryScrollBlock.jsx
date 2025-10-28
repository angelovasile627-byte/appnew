import React, { useState } from 'react';

export const GalleryScrollBlock = ({ config, onUpdate }) => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const scrollHeight = config.scrollHeight || 500;
  const sizeBase = config.sizeBase || 100;

  const containerStyle = {
    position: 'relative',
    minHeight: `${scrollHeight}vh`,
    backgroundColor: config.background?.color || '#111',
    width: '100%',
    overflow: 'hidden'
  };

  return (
    <>
      <style>{`
        @property --gap {
          syntax: "<length>";
          inherits: true;
          initial-value: 0px;
        }
        @property --x {
          syntax: "<percent>";
          inherits: true;
          initial-value: 0%;
        }
        @property --y {
          syntax: "<percent>";
          inherits: true;
          initial-value: 0%;
        }
        @property --text-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 1;
        }
        @property --mouse-rotate {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0deg;
        }
        @property --mouse-w {
          syntax: "<length>";
          inherits: true;
          initial-value: 600px;
        }
        @property --center-x {
          syntax: "<length>";
          inherits: true;
          initial-value: -250px;
        }
        @property --center-y {
          syntax: "<length>";
          inherits: true;
          initial-value: -250px;
        }

        .gallery-scroll-wrapper {
          --gap: 1rem;
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          display: grid;
          grid-template-columns: 1fr 2fr ${sizeBase}px 2fr 1fr;
          grid-template-rows: 1fr ${sizeBase}px 1fr;
          grid-template-areas:
            "one two two three four"
            "one six center three eight"
            "five six seven seven eight";
          gap: var(--gap);
        }

        .gallery-scroll-item {
          background-size: cover;
          background-position: center;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: animate-boxes linear both;
          animation-timeline: scroll();
        }

        .gallery-scroll-item:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 10px 40px rgba(255, 255, 255, 0.3);
          z-index: 10;
        }

        .gallery-scroll-center {
          grid-area: center;
          background-color: ${config.centerBg || '#333'};
          color: ${config.centerColor || 'white'};
          display: grid;
          place-content: center;
          width: var(--mouse-w, 600px);
          aspect-ratio: 1;
          translate: var(--center-x, -250px) var(--center-y, -250px);
          background-size: cover;
          background-position: center;
          text-align: center;
          position: relative;
          cursor: pointer;
          animation: animate-center linear both;
          animation-timeline: scroll();
        }

        .gallery-scroll-text {
          font-family: 'Jura', sans-serif;
          font-weight: 300;
          opacity: var(--text-opacity, 1);
          padding: 20px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        .gallery-scroll-mouse {
          position: absolute;
          bottom: 50px;
          left: 50%;
          translate: -50% 50%;
          width: 50px;
          height: 50px;
          rotate: var(--mouse-rotate, 0deg);
        }

        @keyframes animate-center {
          25%, 65% {
            --mouse-w: 300px;
            --center-x: -100px;
            --center-y: -100px;
            --text-opacity: 0;
          }
          95% {
            --mouse-rotate: 0deg;
          }
          100% {
            --mouse-w: ${sizeBase}px;
            --center-x: 0px;
            --center-y: 0px;
            --mouse-rotate: 180deg;
          }
        }

        @keyframes animate-boxes {
          0%, 15% {
            translate: var(--x) var(--y);
          }
          100% {
            translate: 0 0;
          }
        }

        .gallery-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 40px;
          cursor: pointer;
        }

        .gallery-lightbox img {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }

        .gallery-lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          font-size: 40px;
          font-weight: 300;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.5);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .gallery-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }
      `}</style>

      <div style={containerStyle} data-block-type="gallery-scroll">
        <div className="gallery-scroll-wrapper">
          {/* Image 1 - Top Left */}
          <div
            className="gallery-scroll-item"
            style={{
              gridArea: 'one',
              backgroundImage: `url(${config.images[0]})`,
              '--x': '-500%',
              '--y': '-200%'
            }}
            onClick={() => setLightboxImage(config.images[0])}
          />

          {/* Image 2 - Top Center */}
          <div
            className="gallery-scroll-item"
            style={{
              gridArea: 'two',
              backgroundImage: `url(${config.images[1]})`,
              '--x': '-75%',
              '--y': '-200%'
            }}
            onClick={() => setLightboxImage(config.images[1])}
          />

          {/* Image 3 - Top Right */}
          <div
            className="gallery-scroll-item"
            style={{
              gridArea: 'three',
              backgroundImage: `url(${config.images[2]})`,
              '--x': '200%',
              '--y': '0%'
            }}
            onClick={() => setLightboxImage(config.images[2])}
          />

          {/* Image 4 - Top Far Right */}
          <div
            className="gallery-scroll-item"
            style={{
              gridArea: 'four',
              backgroundImage: `url(${config.images[3]})`,
              '--x': '500%',
              '--y': '-200%'
            }}
            onClick={() => setLightboxImage(config.images[3])}
          />

          {/* Image 5 - Bottom Left */}
          <div
            className="gallery-scroll-item"
            style={{
              gridArea: 'five',
              backgroundImage: `url(${config.images[4]})`,
              '--x': '-500%',
              '--y': '100%'
            }}
            onClick={() => setLightboxImage(config.images[4])}
          />

          {/* Image 6 - Middle Left */}
          <div
            className="gallery-scroll-item"
            style={{
              gridArea: 'six',
              backgroundImage: `url(${config.images[5]})`,
              '--x': '-200%',
              '--y': '0%'
            }}
            onClick={() => setLightboxImage(config.images[5])}
          />

          {/* Image 7 - Bottom Center */}
          <div
            className="gallery-scroll-item"
            style={{
              gridArea: 'seven',
              backgroundImage: `url(${config.images[6]})`,
              '--x': '75%',
              '--y': '200%'
            }}
            onClick={() => setLightboxImage(config.images[6])}
          />

          {/* Image 8 - Bottom Right */}
          <div
            className="gallery-scroll-item"
            style={{
              gridArea: 'eight',
              backgroundImage: `url(${config.images[7]})`,
              '--x': '500%',
              '--y': '200%'
            }}
            onClick={() => setLightboxImage(config.images[7])}
          />

          {/* Center Image with Text */}
          <div
            className="gallery-scroll-center"
            style={{
              backgroundImage: `url(${config.images[8]})`
            }}
            onClick={() => setLightboxImage(config.images[8])}
          >
            <div className="gallery-scroll-text">
              <h1 style={{
                fontSize: `${config.title?.size || 48}px`,
                fontWeight: config.title?.weight || 500,
                margin: '0 0 10px 0'
              }}>
                {config.title?.text || 'Sliding images'}
              </h1>
              <p style={{
                fontSize: `${config.description?.size || 18}px`,
                margin: 0
              }}>
                {config.description?.text || 'Scroll to reveal the images'}
              </p>
            </div>

            <svg
              className="gallery-scroll-mouse"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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

      {/* Lightbox */}
      {lightboxImage && (
        <div className="gallery-lightbox" onClick={() => setLightboxImage(null)}>
          <span className="gallery-lightbox-close">&times;</span>
          <img src={lightboxImage} alt="Gallery" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
};
