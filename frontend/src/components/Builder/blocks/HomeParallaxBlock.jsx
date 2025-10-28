import React, { useEffect, useRef, useState } from 'react';

const HomeParallaxBlock = ({ config, isEditing, onUpdate }) => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!isEditing) return;

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top;
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEditing]);

  const calculateTransform = (layer) => {
    if (!scrollY) return {};

    const speedX = layer.speedx || 0;
    const speedY = layer.speedy || 0;
    const speedZ = layer.speedz || 0;
    const rotation = layer.rotation || 0;

    const translateX = scrollY * speedX;
    const translateY = scrollY * speedY;
    const scale = 1 + (scrollY * speedZ * 0.0001);
    const rotate = scrollY * rotation;

    return {
      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
      transition: 'transform 0.1s ease-out'
    };
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000000'
      }}
    >
      {/* Render all layers */}
      {config.layers?.map((layer, index) => (
        <div
          key={layer.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${layer.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: layer.zIndex || index,
            ...calculateTransform(layer)
          }}
          data-speedx={layer.speedx}
          data-speedy={layer.speedy}
          data-speedz={layer.speedz}
          data-rotation={layer.rotation}
          data-distance={layer.distance}
        />
      ))}

      {/* Central text */}
      {config.text?.show && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          <h1
            style={{
              color: config.text.color || '#FFFFFF',
              fontSize: `${config.text.size || 64}px`,
              fontWeight: config.text.weight || 700,
              margin: 0,
              textShadow: `0 0 ${config.text.shadowBlur || 20}px ${config.text.shadowColor || 'rgba(0, 0, 0, 0.5)'}`
            }}
          >
            {config.text.content || 'Bine ai venit!'}
          </h1>
        </div>
      )}

      {/* Edit overlay for better UX */}
      {isEditing && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            zIndex: 101
          }}
        >
          Home Parallax Block - {config.layers?.length || 0} Layers
        </div>
      )}
    </div>
  );
};

export default HomeParallaxBlock;
