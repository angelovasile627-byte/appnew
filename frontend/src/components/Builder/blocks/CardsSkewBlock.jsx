import React from 'react';

export const CardsSkewBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    maxWidth: `${config.width || 400}px`,
    width: '100%',
    margin: '0 auto',
    paddingBottom: '70px',
    position: 'relative'
  };

  const introStyle = {
    position: 'relative',
    minHeight: `${config.imageHeight || 300}px`,
    height: '100%',
    width: '100%',
    background: config.backgroundImage ? `transparent url(${config.backgroundImage}) top center no-repeat` : '#e0e0e0',
    backgroundSize: '100%',
    overflow: 'hidden',
    transition: 'all .72s ease-in-out'
  };

  const metaStyle = {
    maxWidth: `${config.cardWidth || 300}px`,
    width: '100%',
    margin: '0% auto 0',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    paddingTop: '110px',
    overflow: 'hidden',
    transition: 'all .52s ease-in-out'
  };

  const metaInnerStyle = {
    padding: '.25rem 1rem',
    lineHeight: '1.5rem',
    position: 'relative',
    background: '#fff',
    zIndex: 15,
    border: '1px solid #ccc',
    borderTop: 'none'
  };

  const titleStyle = {
    position: 'relative',
    fontFamily: 'sans-serif',
    fontWeight: 300,
    borderLeft: `4px solid ${config.accentColor || '#e91e63'}`,
    paddingLeft: '.72rem',
    fontSize: `${config.titleSize || 24}px`,
    color: config.titleColor || '#333333',
    marginBottom: '0.5rem'
  };

  const paragraphStyle = {
    fontFamily: 'serif',
    fontSize: `${config.textSize || 14}px`,
    fontWeight: 'inherit',
    color: config.textColor || '#555',
    textAlign: 'justify',
    marginBottom: '0.5rem'
  };

  const linkStyle = {
    color: config.accentColor || '#e91e63',
    textDecoration: 'none',
    opacity: 0.72,
    transition: 'all .27s ease-in-out'
  };

  return (
    <div style={{ padding: '40px 20px', background: config.sectionBackground || 'transparent' }}>
      <div style={containerStyle} className="card-skew-container">
        <section style={introStyle} className="intro">
          <style>
            {`
              .intro:after {
                content: '';
                display: block;
                position: absolute;
                height: 500px;
                right: -100%;
                left: 0;
                transform: skew(100deg);
                background: #fff;
                bottom: -70%;
                box-shadow: inset 1px 0px 5px 0px rgba(204, 204, 204, 0.72);
              }
              
              .card-skew-container:after {
                content: '';
                max-width: ${config.cardWidth || 300}px;
                width: 100%;
                margin: 0% auto 0;
                position: absolute;
                left: 0;
                bottom: 0;
                top: 0;
                right: 0;
                box-shadow: 0px 5px 5px 0px rgba(204, 204, 204, 0.72);
                z-index: -1;
                transition: all .52s ease-in-out;
              }
              
              .meta:after {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                right: 0;
                top: 80px;
                max-width: ${config.cardWidth || 300}px;
                height: 300px;
                background: #fff;
                border: 1px solid #ccc;
                transform: rotate(90deg) skew(10deg);
                z-index: 4;
              }
              
              .card-skew-container:hover .meta {
                transform: translateY(5px);
              }
              
              .card-skew-container:hover .intro {
                transform: translateY(-5px);
              }
              
              .card-skew-container:hover:after {
                transform: translateY(5px);
              }
              
              .card-skew-link:hover {
                opacity: 1;
                text-decoration: underline;
              }
            `}
          </style>
        </section>

        <div style={metaStyle} className="meta">
          <div style={metaInnerStyle}>
            <h3 style={titleStyle}>
              {config.title || 'Some Title'}
            </h3>
            <p style={paragraphStyle}>
              {config.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo fugiat ad quae amet dignissimos laborum, repellat maxime ipsa ipsam nisi'}{' '}
              {config.showLink && (
                <a 
                  href={config.linkUrl || '#'} 
                  style={linkStyle}
                  className="card-skew-link"
                >
                  {config.linkText || 'read more ...'}
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
