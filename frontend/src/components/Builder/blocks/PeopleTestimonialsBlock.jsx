import React from 'react';

export const PeopleTestimonialsBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    width: '100%',
    backgroundColor: config.background || '#F8F8F8',
    paddingTop: `${config.padding?.top || 60}px`,
    paddingBottom: `${config.padding?.bottom || 60}px`,
    paddingLeft: '24px',
    paddingRight: '24px'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: `${config.title?.size || 36}px`,
    fontWeight: config.title?.weight || 700,
    color: config.title?.color || '#1a1a1a',
    marginBottom: '48px',
    textAlign: 'center'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${config.columns || 3}, 1fr)`,
    gap: '24px'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating || 5);
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {config.title?.show && (
          <h2 style={titleStyle}>{config.title.text}</h2>
        )}
        
        <div style={gridStyle}>
          {config.testimonials?.map((testimonial) => (
            <div
              key={testimonial.id}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{
                fontSize: '18px',
                marginBottom: '16px'
              }}>
                {renderStars(testimonial.rating)}
              </div>
              
              <p style={{
                fontSize: '14px',
                color: '#333333',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                {testimonial.quote}
              </p>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    margin: 0
                  }}>
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
