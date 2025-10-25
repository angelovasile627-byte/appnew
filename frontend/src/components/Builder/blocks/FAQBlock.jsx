import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQBlock = ({ config, onUpdate }) => {
  const [openIndex, setOpenIndex] = useState(0);

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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {config.items.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                marginBottom: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                style={{
                  width: '100%',
                  padding: '24px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left'
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1a1a2e'
                  }}
                >
                  {item.question}
                </span>
                <ChevronDown
                  style={{
                    width: '24px',
                    height: '24px',
                    color: '#5B4FC9',
                    transition: 'transform 0.3s',
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>
              <div
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-in-out'
                }}
              >
                <p
                  style={{
                    padding: '0 24px 24px',
                    fontSize: '16px',
                    color: '#5a5a6e',
                    lineHeight: '1.7'
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};