// Mock data for block templates library
// Simplified - only 2 templates for debugging
export const blockTemplates = [
  {
    id: 'hero-1',
    category: 'hero',
    name: 'Hero - Experience Future',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      background: { type: 'color', value: '#5B4FC9' },
      fullScreen: true,
      fullWidth: false,
      contentWidth: 800,
      padding: { top: 120, bottom: 120 },
      title: { text: 'Experience the future', show: true, color: '#ffffff', align: 'center' },
      description: { text: 'Stay ahead with our cutting-edge software. Give it a try today and step into a future filled with innovation, making your tasks easier and more enjoyable.', show: true, color: '#e8e8f0', align: 'center' },
      button: { text: 'Download Software', show: true, color: '#A8F5D7', textColor: '#1a1a2e', link: '#' },
      subtitle: { text: 'Compatible with Windows and macOS.', show: true, color: '#d0d0e8', align: 'center' }
    }
  },
  {
    id: 'menu-5',
    category: 'menu',
    name: 'Menu - Split Navigation',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    config: {
      type: 'menu',
      background: { type: 'color', value: '#0F172A' },
      fullWidth: true,
      contentWidth: 1400,
      padding: { top: 22, bottom: 22 },
      logo: { text: 'STUDIO', show: true, color: '#F59E0B', size: 28 },
      menuItems: [
        { text: 'Work', link: '#work', color: '#F3F4F6', show: true },
        { text: 'Studio', link: '#studio', color: '#F3F4F6', show: true },
        { text: 'News', link: '#news', color: '#F3F4F6', show: true },
        { text: 'Careers', link: '#careers', color: '#F3F4F6', show: true }
      ],
      button: { text: 'Let\'s Talk', show: true, color: '#F59E0B', textColor: '#0F172A', link: '#contact' },
      sticky: true,
      align: 'split'
    }
  }
];
