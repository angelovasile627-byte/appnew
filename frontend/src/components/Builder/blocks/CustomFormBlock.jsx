import React from 'react';

export const CustomFormBlock = ({ config, onUpdate }) => {
  // Calculate padding
  const paddingTop = (config.padding?.top || 5) * 15;
  const paddingBottom = (config.padding?.bottom || 5) * 15;

  // Container style with background
  const containerStyle = {
    width: '100%',
    position: 'relative',
    paddingTop: `${paddingTop}px`,
    paddingBottom: `${paddingBottom}px`,
    backgroundColor: config.background?.type === 'color' ? config.background.value : 'transparent',
    backgroundImage: config.background?.type === 'image' && config.background.imageUrl ? `url(${config.background.imageUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  // Overlay style
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: config.overlay?.color || '#ffffff',
    opacity: config.overlay?.opacity || 0.4,
    display: config.overlay?.enabled && config.background?.type === 'image' ? 'block' : 'none',
    pointerEvents: 'none'
  };

  // Field styles based on customStyle
  const fieldStyle = config.customStyle ? {
    padding: '0.5rem',
    backgroundColor: config.colors?.fieldColor || '#ffffff',
    borderColor: config.colors?.borderColor || '#cccccc',
    borderWidth: '1px',
    borderStyle: 'solid',
    color: config.colors?.formText || '#000000',
    transition: '0.4s',
    boxShadow: 'none',
    outline: 'none',
    width: '100%',
    marginBottom: '1rem',
    borderRadius: '4px'
  } : {
    padding: '0.5rem',
    width: '100%',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #cccccc'
  };

  // SVG Icon
  const FormIcon = () => (
    <svg 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      width={config.icon?.size || 200} 
      height={config.icon?.size || 200} 
      viewBox="0 0 32 32" 
      fill={config.icon?.color || '#777777'}
      style={{ display: config.icon?.show ? 'block' : 'none', margin: '0 auto' }}
    >
      <path d="M15 20h12c1.324 0 1.336 2 0 2h-12c-1.316 0-1.344-2 0-2zM15 16h12c1.324 0 1.336 2 0 2h-12c-1.316 0-1.344-2 0-2zM15 12h12c1.324 0 1.336 2 0 2h-12c-1.316 0-1.344-2 0-2zM26 3v4c0 1.294-2 1.36-2 0v-4c0-1.34 2-1.308 2 0zM6 12c-1.090 0-2 0.91-2 2v6c0 1.090 0.91 2 2 2h4c1.090 0 2-0.91 2-2v-6c0-1.090-0.91-2-2-2zM6 14h4v6h-4zM8 3v4c0 1.294-2 1.36-2 0v-4c0-1.34 2-1.308 2 0zM3 4c-1.644 0-3 1.356-3 3v18c0 1.644 1.356 3 3 3h26c1.644 0 3-1.356 3-3v-18c0-1.644-1.356-3-3-3-1.34 0-1.3 2 0 2 0.572 0 1 0.428 1 1v18c0 0.572-0.428 1-1 1h-26c-0.572 0-1-0.428-1-1v-18c0-0.572 0.428-1 1-1 1.324 0 1.326-2 0-2zM11 6h10c1.324 0 1.34-2 0-2h-10c-1.332 0-1.32 2 0 2z"></path>
    </svg>
  );

  return (
    <div style={containerStyle}>
      {/* Overlay */}
      <div style={overlayStyle}></div>

      {/* Content */}
      <div style={{ maxWidth: '66.666%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Title */}
        {config.title?.show && (
          <h4 
            style={{
              textAlign: config.title?.align || 'center',
              fontSize: `${config.title?.size || 48}px`,
              color: config.title?.color || '#777777',
              marginBottom: '2rem',
              fontWeight: 'bold'
            }}
          >
            {config.title?.text || 'Custom Form'}
          </h4>
        )}

        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <FormIcon />
        </div>

        {/* Subtitle */}
        {config.subtitle?.show && (
          <p 
            style={{
              textAlign: config.subtitle?.align || 'center',
              fontSize: `${config.subtitle?.size || 24}px`,
              color: config.subtitle?.color || '#777777',
              marginBottom: '2rem'
            }}
          >
            {config.subtitle?.text || 'Click to open Form Builder'}
          </p>
        )}

        {/* Form */}
        <form 
          action={config.formAction || ''} 
          method={config.formMethod || 'post'}
          style={{ marginTop: '2rem' }}
        >
          <input 
            type="text" 
            placeholder="Name" 
            style={{
              ...fieldStyle,
              ...(config.disableElements ? {
                WebkitAppearance: 'none',
                MozAppearance: 'textfield'
              } : {})
            }}
          />
          
          <input 
            type="email" 
            placeholder="Email" 
            style={{
              ...fieldStyle,
              ...(config.disableElements ? {
                WebkitAppearance: 'none',
                MozAppearance: 'textfield'
              } : {})
            }}
          />
          
          <textarea 
            placeholder="Message" 
            rows="5"
            style={{
              ...fieldStyle,
              ...(config.disableElements ? {
                WebkitAppearance: 'none',
                MozAppearance: 'textfield'
              } : {})
            }}
          />

          <input type="hidden" name="hidden" />
        </form>
      </div>
    </div>
  );
};
