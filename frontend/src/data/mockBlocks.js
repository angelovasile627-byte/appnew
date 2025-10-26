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
    id: 'menu-3',
    category: 'menu',
    name: 'Menu - Transparent',
    thumbnail: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&h=300&fit=crop',
    config: {
      type: 'menu',
      background: { type: 'color', value: 'rgba(0,0,0,0.1)' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 20, bottom: 20 },
      logo: { text: 'Logo', show: true, color: '#ffffff', size: 26 },
      menuItems: [
        { text: 'Portfolio', link: '#portfolio', color: '#ffffff', show: true },
        { text: 'About Us', link: '#about', color: '#ffffff', show: true },
        { text: 'Blog', link: '#blog', color: '#ffffff', show: true }
      ],
      button: { text: 'Get Started', show: true, color: 'transparent', textColor: '#ffffff', link: '#start' },
      sticky: false,
      align: 'space-between'
    }
  }
];
