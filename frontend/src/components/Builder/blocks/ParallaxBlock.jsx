import React, { useRef } from 'react';

export const ParallaxBlock = ({ config, onUpdate }) => {
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/upload/image`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate({
          ...config,
          background: {
            ...config.background,
            type: 'image',
            value: data.url
          }
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/upload/video`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate({
          ...config,
          background: {
            ...config.background,
            type: 'video',
            value: data.url
          }
        });
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    minHeight: config.fullScreen ? '100vh' : 'auto',
    paddingTop: config.fullScreen ? 0 : `${config.paddingTop || 60}px`,
    paddingBottom: config.fullScreen ? 0 : `${config.paddingBottom || 60}px`,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0
  };

  const overlayStyle = config.overlay ? {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: config.overlayColor || '#232323',
    opacity: config.overlayOpacity || 0.4,
    zIndex: 1
  } : null;

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : '1200px',
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 2,
    minHeight: config.fullScreen ? '100vh' : '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const renderBackground = () => {
    if (config.background.type === 'image') {
      return (
        <div
          style={{
            ...backgroundStyle,
            backgroundImage: `url(${config.background.value})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: config.background.parallax ? 'fixed' : 'scroll'
          }}
        />
      );
    } else if (config.background.type === 'video') {
      return (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            ...backgroundStyle,
            objectFit: 'cover'
          }}
        >
          <source src={config.background.value} type="video/mp4" />
        </video>
      );
    } else if (config.background.type === 'color') {
      return (
        <div
          style={{
            ...backgroundStyle,
            background: config.background.value
          }}
        />
      );
    } else if (config.background.type === 'gradient') {
      return (
        <div
          style={{
            ...backgroundStyle,
            background: config.background.value
          }}
        />
      );
    }
    return null;
  };

  return (
    <div style={containerStyle}>
      {renderBackground()}
      {overlayStyle && <div style={overlayStyle} />}
      
      <div style={contentStyle}>
        {config.content?.text && (
          <div style={{
            textAlign: 'center',
            color: config.content?.color || '#ffffff'
          }}>
            <h2 style={{
              fontSize: `${config.content?.fontSize || 48}px`,
              fontWeight: config.content?.fontWeight || 700,
              marginBottom: '16px'
            }}>
              {config.content.text}
            </h2>
            {config.content?.description && (
              <p style={{
                fontSize: `${config.content?.descSize || 18}px`,
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {config.content.description}
              </p>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={handleVideoUpload}
      />
    </div>
  );
};
