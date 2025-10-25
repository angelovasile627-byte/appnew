import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const TestimonialBlock = ({ config, onUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const currentTestimonial = config.items[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % config.items.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + config.items.length) % config.items.length);
  };

  return (
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
        <div style={{ position: 'relative' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '48px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  margin: '0 auto',
                  objectFit: 'cover',
                  border: '4px solid #f0f0f0'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  style={{ width: '20px', height: '20px', fill: '#FFD700', color: '#FFD700', marginRight: '4px' }}
                />
              ))}
            </div>
            <p
              style={{
                fontSize: '20px',
                color: '#2d3748',
                marginBottom: '24px',
                fontStyle: 'italic',
                lineHeight: '1.7'
              }}
            >
              "{currentTestimonial.text}"
            </p>
            <h4
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1a1a2e',
                marginBottom: '4px'
              }}
            >
              {currentTestimonial.name}
            </h4>
            <p style={{ fontSize: '16px', color: '#718096' }}>{currentTestimonial.role}</p>
          </div>
          <button
            onClick={prevTestimonial}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          >
            <ChevronLeft style={{ width: '24px', height: '24px', color: '#1a1a2e' }} />
          </button>
          <button
            onClick={nextTestimonial}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          >
            <ChevronRight style={{ width: '24px', height: '24px', color: '#1a1a2e' }} />
          </button>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px', gap: '8px' }}>
            {config.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: index === currentIndex ? '#5B4FC9' : '#d0d0e0',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};