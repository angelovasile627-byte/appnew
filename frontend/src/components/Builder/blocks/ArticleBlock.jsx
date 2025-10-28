import React, { useState } from 'react';
import { Button } from '../../ui/button';
import * as Icons from 'lucide-react';

export const ArticleBlock = ({ config, onUpdate, onSelectElement, selectedElementId }) => {
  const [resizing, setResizing] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startWidths, setStartWidths] = useState([]);

  const containerStyle = {
    backgroundColor: config.background?.value || '#f7fafc',
    paddingTop: `${config.padding?.top || 60}px`,
    paddingBottom: `${config.padding?.bottom || 60}px`,
    width: '100%',
    minHeight: config.minHeight ? `${config.minHeight}px` : 'auto'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth || 1200}px`,
    margin: '0 auto',
    padding: '0 24px'
  };

  // Handle resize start
  const handleResizeStart = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(index);
    setStartX(e.clientX);
    
    if (config.layout === 'grid') {
      setStartWidths(config.elements.map(el => el.width || 100));
    } else if (config.layout === 'vertical') {
      const element = config.elements[index];
      setStartWidths([element.leftWidth || 50, element.rightWidth || 50]);
    } else if (config.layout === 'split') {
      setStartWidths([config.leftWidth || 50, config.rightWidth || 50]);
    }
  };

  // Handle resize move
  const handleResizeMove = (e) => {
    if (resizing === null) return;
    
    const deltaX = e.clientX - startX;
    const containerWidth = e.currentTarget.offsetWidth || 1200;
    const deltaPercent = (deltaX / containerWidth) * 100;

    if (config.layout === 'split') {
      const newLeftWidth = Math.max(20, Math.min(80, startWidths[0] + deltaPercent));
      const newRightWidth = 100 - newLeftWidth;
      
      onUpdate({
        ...config,
        leftWidth: newLeftWidth,
        rightWidth: newRightWidth
      });
    } else if (config.layout === 'vertical') {
      const element = config.elements[resizing];
      const newLeftWidth = Math.max(20, Math.min(80, startWidths[0] + deltaPercent));
      const newRightWidth = 100 - newLeftWidth;
      
      const updatedElements = [...config.elements];
      updatedElements[resizing] = {
        ...element,
        leftWidth: newLeftWidth,
        rightWidth: newRightWidth
      };
      
      onUpdate({
        ...config,
        elements: updatedElements
      });
    }
  };

  // Handle resize end
  const handleResizeEnd = () => {
    setResizing(null);
  };

  // Grid Layout Rendering
  const renderGridLayout = () => {
    const columns = config.columns || 3;
    const gap = config.gap || 24;

    return (
      <div>
        {config.title?.show && (
          <h2 style={{
            fontSize: `${config.title.size}px`,
            fontWeight: 700,
            color: config.title.color,
            textAlign: config.title.align,
            marginBottom: '40px'
          }}>
            {config.title.text}
          </h2>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`
        }}>
          {config.elements?.map((element, index) => (
            <div
              key={element.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement && onSelectElement(element.id);
              }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: selectedElementId === element.id ? '3px solid #667eea' : '3px solid transparent',
                boxShadow: selectedElementId === element.id 
                  ? '0 8px 24px rgba(102, 126, 234, 0.3)' 
                  : '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (selectedElementId !== element.id) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedElementId !== element.id) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }
              }}
            >
              {element.image?.show && (
                <div style={{ position: 'relative', width: '100%', height: `${element.image.height || 250}px`, overflow: 'hidden' }}>
                  <img
                    src={element.image.src}
                    alt={element.image.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: element.image.objectFit || 'cover'
                    }}
                  />
                </div>
              )}
              <div style={{ padding: '24px' }}>
                {element.tag?.show && (
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: element.tag.bgColor,
                    color: element.tag.color,
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginBottom: '12px',
                    textTransform: 'uppercase'
                  }}>
                    {element.tag.text}
                  </span>
                )}
                {element.icon?.show && (
                  <div style={{ marginBottom: '12px' }}>
                    {React.createElement(Icons[element.icon.name] || Icons.Circle, {
                      size: 24,
                      color: element.icon.color,
                      strokeWidth: 2
                    })}
                  </div>
                )}
                {element.title?.show && (
                  <h3 style={{
                    fontSize: `${element.title.size}px`,
                    fontWeight: element.title.weight || 700,
                    color: element.title.color,
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}>
                    {element.title.text}
                  </h3>
                )}
                {element.description?.show && (
                  <p style={{
                    fontSize: `${element.description.size}px`,
                    color: element.description.color,
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    whiteSpace: 'pre-line'
                  }}>
                    {element.description.text}
                  </p>
                )}
                {element.date?.show && (
                  <p style={{
                    fontSize: '14px',
                    color: element.date.color,
                    marginBottom: '16px'
                  }}>
                    {element.date.text}
                  </p>
                )}
                {element.button?.show && (
                  <Button style={{
                    backgroundColor: element.button.color,
                    color: element.button.textColor,
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    {element.button.text}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Vertical Layout Rendering
  const renderVerticalLayout = () => {
    return (
      <div>
        {config.title?.show && (
          <h2 style={{
            fontSize: `${config.title.size}px`,
            fontWeight: 700,
            color: config.title.color,
            textAlign: config.title.align,
            marginBottom: '40px'
          }}>
            {config.title.text}
          </h2>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${config.gap || 48}px` }}>
          {config.elements?.map((element, index) => (
            <div
              key={element.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement && onSelectElement(element.id);
              }}
              style={{
                backgroundColor: element.background?.value || '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: selectedElementId === element.id ? '3px solid #667eea' : '3px solid transparent',
                boxShadow: selectedElementId === element.id 
                  ? '0 8px 24px rgba(102, 126, 234, 0.3)' 
                  : '0 4px 12px rgba(0,0,0,0.08)',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'stretch',
                minHeight: '400px',
                position: 'relative'
              }}
              onMouseMove={resizing === index ? handleResizeMove : null}
              onMouseUp={handleResizeEnd}
              onMouseLeave={handleResizeEnd}
              >
                {/* Left Content */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement && onSelectElement(`${element.id}-left`);
                  }}
                  style={{
                    width: `${element.leftWidth || 50}%`,
                    padding: '60px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: selectedElementId === `${element.id}-left` ? '2px solid #667eea' : 'none',
                    position: 'relative'
                  }}>
                  {element.leftContent?.type === 'text' && (
                    <>
                      {element.leftContent.title?.show && (
                        <h3 style={{
                          fontSize: `${element.leftContent.title.size}px`,
                          fontWeight: element.leftContent.title.weight || 700,
                          fontStyle: element.leftContent.title.style || 'normal',
                          color: element.leftContent.title.color,
                          marginBottom: '24px',
                          lineHeight: '1.3'
                        }}>
                          {element.leftContent.title.text}
                        </h3>
                      )}
                      {element.leftContent.description?.show && (
                        <p style={{
                          fontSize: `${element.leftContent.description.size}px`,
                          color: element.leftContent.description.color,
                          lineHeight: '1.6',
                          marginBottom: '24px'
                        }}>
                          {element.leftContent.description.text}
                        </p>
                      )}
                      {element.leftContent.icon?.show && (
                        <div style={{ marginTop: '16px' }}>
                          {React.createElement(Icons[element.leftContent.icon.name] || Icons.Circle, {
                            size: 32,
                            color: element.leftContent.icon.color,
                            strokeWidth: 2
                          })}
                        </div>
                      )}
                      {element.leftContent.button?.show && (
                        <Button style={{
                          backgroundColor: element.leftContent.button.color,
                          color: element.leftContent.button.textColor,
                          border: element.leftContent.button.borderColor ? `2px solid ${element.leftContent.button.borderColor}` : 'none',
                          padding: '12px 28px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 600,
                          marginTop: '16px',
                          marginRight: '12px',
                          cursor: 'pointer'
                        }}>
                          {element.leftContent.button.text}
                        </Button>
                      )}
                      {element.leftContent.button2?.show && (
                        <Button style={{
                          backgroundColor: element.leftContent.button2.color,
                          color: element.leftContent.button2.textColor,
                          border: element.leftContent.button2.borderColor ? `2px solid ${element.leftContent.button2.borderColor}` : 'none',
                          padding: '12px 28px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 600,
                          marginTop: '16px',
                          cursor: 'pointer'
                        }}>
                          {element.leftContent.button2.text}
                        </Button>
                      )}
                    </>
                  )}
                </div>

                {/* Resize Handle */}
                <div
                  onMouseDown={(e) => handleResizeStart(e, index)}
                  style={{
                    width: '8px',
                    cursor: 'col-resize',
                    backgroundColor: resizing === index ? '#667eea' : 'transparent',
                    transition: 'background-color 0.2s',
                    position: 'relative',
                    zIndex: 10,
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    if (resizing === null) {
                      e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (resizing === null) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '20px',
                    height: '40px',
                    backgroundColor: resizing === index ? '#667eea' : 'rgba(102, 126, 234, 0.5)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: '#fff'
                  }}>
                    ⋮
                  </div>
                </div>

                {/* Right Content */}
                <div style={{
                  width: `${element.rightWidth || 50}%`,
                  padding: element.rightContent?.type === 'image' ? '0' : '60px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {element.rightContent?.type === 'text' && (
                    <>
                      {element.rightContent.title?.show && (
                        <h3 style={{
                          fontSize: `${element.rightContent.title.size}px`,
                          fontWeight: element.rightContent.title.weight || 700,
                          color: element.rightContent.title.color,
                          marginBottom: '16px',
                          lineHeight: '1.3'
                        }}>
                          {element.rightContent.title.text}
                        </h3>
                      )}
                      {element.rightContent.subtitle?.show && (
                        <h4 style={{
                          fontSize: `${element.rightContent.subtitle.size}px`,
                          color: element.rightContent.subtitle.color,
                          marginBottom: '16px',
                          lineHeight: '1.4'
                        }}>
                          {element.rightContent.subtitle.text}
                        </h4>
                      )}
                      {element.rightContent.description?.show && (
                        <p style={{
                          fontSize: `${element.rightContent.description.size}px`,
                          color: element.rightContent.description.color,
                          lineHeight: '1.7',
                          marginBottom: '24px',
                          whiteSpace: 'pre-line'
                        }}>
                          {element.rightContent.description.text}
                        </p>
                      )}
                      {element.rightContent.button?.show && (
                        <Button style={{
                          backgroundColor: element.rightContent.button.color,
                          color: element.rightContent.button.textColor,
                          border: element.rightContent.button.borderColor ? `2px solid ${element.rightContent.button.borderColor}` : 'none',
                          padding: '12px 28px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 600,
                          marginRight: '12px',
                          cursor: 'pointer'
                        }}>
                          {element.rightContent.button.text}
                        </Button>
                      )}
                    </>
                  )}
                  {element.rightContent?.type === 'image' && element.rightContent.image?.show && (
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={element.rightContent.image.src}
                        alt={element.rightContent.image.alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: element.rightContent.image.objectFit || 'cover'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '40px',
                        right: '40px'
                      }}>
                        {element.rightContent.title?.show && (
                          <h3 style={{
                            fontSize: `${element.rightContent.title.size}px`,
                            fontWeight: element.rightContent.title.weight || 700,
                            color: element.rightContent.title.color,
                            marginBottom: '16px'
                          }}>
                            {element.rightContent.title.text}
                          </h3>
                        )}
                        {element.rightContent.description?.show && (
                          <p style={{
                            fontSize: `${element.rightContent.description.size}px`,
                            color: element.rightContent.description.color,
                            lineHeight: '1.6',
                            marginBottom: '16px',
                            whiteSpace: 'pre-line'
                          }}>
                            {element.rightContent.description.text}
                          </p>
                        )}
                        {element.rightContent.button?.show && (
                          <Button style={{
                            backgroundColor: element.rightContent.button.color,
                            color: element.rightContent.button.textColor,
                            border: element.rightContent.button.borderColor ? `2px solid ${element.rightContent.button.borderColor}` : 'none',
                            padding: '12px 28px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            marginRight: '12px',
                            cursor: 'pointer'
                          }}>
                            {element.rightContent.button.text}
                          </Button>
                        )}
                        {element.rightContent.button2?.show && (
                          <Button style={{
                            backgroundColor: element.rightContent.button2.color,
                            color: element.rightContent.button2.textColor,
                            border: element.rightContent.button2.borderColor ? `2px solid ${element.rightContent.button2.borderColor}` : 'none',
                            padding: '12px 28px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}>
                            {element.rightContent.button2.text}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Split Layout Rendering
  const renderSplitLayout = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          minHeight: config.minHeight ? `${config.minHeight}px` : '600px',
          position: 'relative'
        }}
        onMouseMove={resizing !== null ? handleResizeMove : null}
        onMouseUp={handleResizeEnd}
        onMouseLeave={handleResizeEnd}
      >
        {/* Left Content */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectElement && onSelectElement('left-content');
          }}
          style={{
            width: `${config.leftWidth || 50}%`,
            backgroundColor: config.leftContent?.background?.value || '#ffffff',
            padding: `${config.leftContent?.padding?.top || 80}px ${config.leftContent?.padding?.right || 60}px ${config.leftContent?.padding?.bottom || 80}px ${config.leftContent?.padding?.left || 60}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
            border: selectedElementId === 'left-content' ? '3px solid #667eea' : 'none',
            boxShadow: selectedElementId === 'left-content' ? '0 8px 24px rgba(102, 126, 234, 0.3)' : 'none'
          }}
        >
          {config.leftContent?.tag?.show && (
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: config.leftContent.tag.bgColor,
              color: config.leftContent.tag.color,
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 700,
              marginBottom: '24px',
              textTransform: 'uppercase',
              alignSelf: 'flex-start'
            }}>
              {config.leftContent.tag.text}
            </span>
          )}
          {config.leftContent?.title?.show && (
            <h2 style={{
              fontSize: `${config.leftContent.title.size}px`,
              fontWeight: config.leftContent.title.weight || 700,
              color: config.leftContent.title.color,
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              {config.leftContent.title.text}
            </h2>
          )}
          {config.leftContent?.description?.show && (
            <p style={{
              fontSize: `${config.leftContent.description.size}px`,
              color: config.leftContent.description.color,
              lineHeight: config.leftContent.description.lineHeight || 1.6,
              marginBottom: '24px'
            }}>
              {config.leftContent.description.text}
            </p>
          )}
          {config.leftContent?.metadata?.show && (
            <div style={{
              display: 'flex',
              gap: '16px',
              fontSize: '14px',
              color: config.leftContent.metadata.color,
              marginBottom: '32px'
            }}>
              <span>{config.leftContent.metadata.author}</span>
              <span>•</span>
              <span>{config.leftContent.metadata.date}</span>
              <span>•</span>
              <span>{config.leftContent.metadata.readTime}</span>
            </div>
          )}
          {config.leftContent?.button?.show && (
            <Button style={{
              backgroundColor: config.leftContent.button.color,
              color: config.leftContent.button.textColor,
              padding: '14px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              alignSelf: 'flex-start'
            }}>
              {config.leftContent.button.text}
            </Button>
          )}
        </div>

        {/* Resize Handle */}
        <div
          onMouseDown={(e) => handleResizeStart(e, 0)}
          style={{
            width: '8px',
            cursor: 'col-resize',
            backgroundColor: resizing !== null ? '#667eea' : 'transparent',
            transition: 'background-color 0.2s',
            position: 'relative',
            zIndex: 10,
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            if (resizing === null) {
              e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (resizing === null) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '24px',
            height: '48px',
            backgroundColor: resizing !== null ? '#667eea' : 'rgba(102, 126, 234, 0.6)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            ⋮
          </div>
        </div>

        {/* Right Content */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectElement && onSelectElement('right-content');
          }}
          style={{
            width: `${config.rightWidth || 50}%`,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            border: selectedElementId === 'right-content' ? '3px solid #667eea' : 'none'
          }}
        >
          {config.rightContent?.image?.show && (
            <>
              <img
                src={config.rightContent.image.src}
                alt={config.rightContent.image.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: config.rightContent.image.objectFit || 'cover'
                }}
              />
              {config.rightContent.overlay?.show && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: config.rightContent.overlay.color,
                  opacity: config.rightContent.overlay.opacity || 0.1
                }} />
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {config.layout === 'grid' && renderGridLayout()}
        {config.layout === 'vertical' && renderVerticalLayout()}
        {config.layout === 'split' && renderSplitLayout()}
      </div>
    </div>
  );
};
