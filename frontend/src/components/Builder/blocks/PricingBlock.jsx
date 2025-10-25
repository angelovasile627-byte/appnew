import React from 'react';
import { Button } from '../../ui/button';
import { Check } from 'lucide-react';

export const PricingBlock = ({ config, onUpdate }) => {
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${config.plans.length}, 1fr)`,
            gap: '32px'
          }}
        >
          {config.plans.map((plan, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: plan.highlighted ? '0 12px 32px rgba(91,79,201,0.25)' : '0 4px 16px rgba(0,0,0,0.08)',
                border: plan.highlighted ? '3px solid #5B4FC9' : 'none',
                transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!plan.highlighted) {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.highlighted) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                }
              }}
            >
              {plan.highlighted && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#5B4FC9',
                    color: '#ffffff',
                    padding: '6px 20px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '700'
                  }}
                >
                  POPULAR
                </div>
              )}
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1a1a2e',
                  marginBottom: '12px'
                }}
              >
                {plan.name}
              </h3>
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    color: '#1a1a2e'
                  }}
                >
                  {plan.price}
                </span>
                <span style={{ fontSize: '18px', color: '#718096' }}>{plan.period}</span>
              </div>
              <div style={{ marginBottom: '32px' }}>
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px'
                    }}
                  >
                    <Check style={{ width: '20px', height: '20px', color: '#10B981', flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: '#4a5568' }}>{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                style={{
                  width: '100%',
                  backgroundColor: plan.highlighted ? '#5B4FC9' : '#F7FAFC',
                  color: plan.highlighted ? '#ffffff' : '#1a1a2e',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  if (!plan.highlighted) {
                    e.currentTarget.style.backgroundColor = '#E2E8F0';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (!plan.highlighted) {
                    e.currentTarget.style.backgroundColor = '#F7FAFC';
                  }
                }}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};