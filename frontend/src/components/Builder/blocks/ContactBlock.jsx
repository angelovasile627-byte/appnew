import React from 'react';
import * as Icons from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

export const ContactBlock = ({ config, onUpdate }) => {
  const [formStatus, setFormStatus] = React.useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    // Get form data
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      notification_email: config.form?.notificationEmail
    };

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        setFormStatus({
          type: 'success',
          message: config.form?.successMessage || 'Thanks for filling out the form!'
        });
        e.target.reset();
      } else {
        setFormStatus({
          type: 'error',
          message: 'Failed to submit form. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            gridTemplateColumns: '2fr 1fr',
            gap: '60px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
            }}
          >
            <form>
              {config.form?.fields?.map((field, index) => (
                <div key={index} style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '8px'
                    }}
                  >
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      placeholder={field.placeholder}
                      required={field.required}
                      style={{ minHeight: '120px' }}
                    />
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              <Button
                type="submit"
                style={{
                  backgroundColor: config.form?.button?.color || '#6366F1',
                  color: config.form?.button?.textColor || '#ffffff',
                  width: '100%',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {config.form?.button?.text || 'Send Message'}
              </Button>
            </form>
          </div>
          <div>
            {config.contactInfo?.show && config.info?.map((item, index) => {
              const IconComponent = Icons[item.icon] || Icons.Info;
              return (
                <div
                  key={index}
                  style={{
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: '#5B4FC9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <IconComponent style={{ width: '24px', height: '24px', color: '#ffffff' }} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1a1a2e',
                        marginBottom: '4px'
                      }}
                    >
                      {item.label}
                    </h4>
                    <p style={{ fontSize: '16px', color: '#5a5a6e' }}>{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};