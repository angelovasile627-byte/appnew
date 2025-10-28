import React, { useState } from 'react';

export const Gallery3DBlock = ({ config, onUpdate }) => {
  const [hoveredPicture, setHoveredPicture] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [clickedPicture, setClickedPicture] = useState(null);

  const pictures = config.images || [];
  const hoverZones = 9;

  const containerStyle = {
    backgroundColor: config.background?.value || '#020617',
    paddingTop: `${config.padding?.top || 80}px`,
    paddingBottom: `${config.padding?.bottom || 80}px`,
    width: '100%',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const navStyle = {
    height: 'min(20rem, 100%)',
    width: 'min(60rem, 90%)',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    perspective: '2000px',
    transformStyle: 'preserve-3d'
  };

  // Calculate region for hover effect
  const getRegion = (pictureIndex, zoneIndex) => {
    return hoverZones * pictureIndex + (zoneIndex + 1);
  };

  const getRegionNormalized = (region) => {
    return (region - 1) / (hoverZones * pictures.length - 1);
  };

  const getPictureNormalized = (pictureIndex) => {
    return pictureIndex / (pictures.length - 1);
  };

  const calculateFalloff = (pictureIndex) => {
    if (hoveredPicture === null || hoveredZone === null) return 0;
    
    const region = getRegion(hoveredPicture, hoveredZone);
    const regionNorm = getRegionNormalized(region);
    const pictureNorm = getPictureNormalized(pictureIndex);
    const diff = pictureNorm - regionNorm;
    const w = 0.4;
    const u = Math.abs(diff) / w;
    
    // Cosine falloff curve
    return Math.max(0, Math.min(1, 0.5 * (1 + Math.cos(Math.min(u, 1) * Math.PI))));
  };

  const getLinkStyle = (index) => {
    const falloff = calculateFalloff(index);
    const pictureNorm = getPictureNormalized(index);
    const regionNorm = hoveredPicture !== null && hoveredZone !== null 
      ? getRegionNormalized(getRegion(hoveredPicture, hoveredZone))
      : 0;
    const diff = pictureNorm - regionNorm;
    const tilt = Math.max(-1, Math.min(1, diff * 5)) * falloff * 70;
    
    const hoverIntensity = 10; // rem
    const translateZ = falloff * hoverIntensity;
    
    const hoverSmoothness = 70; // ms
    const fallSmoothness = 250; // ms
    const ts = hoverSmoothness * falloff + fallSmoothness * (1 - falloff);
    
    const isClicked = clickedPicture === index;
    const flex = isClicked ? 4 : 1;

    return {
      flex: flex,
      height: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transformStyle: 'preserve-3d',
      transform: `translateZ(${translateZ}rem) rotateY(${tilt}deg)`,
      filter: `brightness(${Math.max(0.5, falloff * 1.2)}) saturate(${falloff})`,
      transition: `
        scale ${clickedPicture === index ? 0.15 : 0.15}s,
        filter ${0.1 * falloff + 0.8 * (1 - falloff)}s,
        transform ${ts}ms,
        flex 0.3s
      `
    };
  };

  const imgStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    margin: '0 0.1em'
  };

  const hoverZoneStyle = {
    position: 'absolute',
    inset: '0',
    insetInline: '-3px',
    display: 'flex',
    zIndex: '999'
  };

  const zoneItemStyle = {
    flex: 1,
    transition: '0.3s'
  };

  return (
    <div style={containerStyle}>
      <nav 
        style={navStyle}
        onMouseLeave={() => {
          setHoveredPicture(null);
          setHoveredZone(null);
        }}
      >
        {pictures.map((image, pictureIndex) => (
          <a
            key={pictureIndex}
            href="#"
            style={getLinkStyle(pictureIndex)}
            onClick={(e) => {
              e.preventDefault();
              setClickedPicture(clickedPicture === pictureIndex ? null : pictureIndex);
            }}
            onMouseEnter={() => setHoveredPicture(pictureIndex)}
          >
            <div 
              style={{
                ...imgStyle,
                backgroundImage: `url('${image.src || image}')`
              }}
            />
            <aside style={hoverZoneStyle}>
              {Array.from({ length: hoverZones }).map((_, zoneIndex) => (
                <i
                  key={zoneIndex}
                  style={zoneItemStyle}
                  onMouseEnter={() => setHoveredZone(zoneIndex)}
                />
              ))}
            </aside>
          </a>
        ))}
      </nav>
    </div>
  );
};
