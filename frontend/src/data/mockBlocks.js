// Mock data for block templates library
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
    id: 'hero-2',
    category: 'hero',
    name: 'Hero - Gradient Bold',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF00FF 100%)' },
      fullScreen: true,
      fullWidth: false,
      contentWidth: 700,
      padding: { top: 140, bottom: 140 },
      title: { text: 'Create, connect, shine', show: true, color: '#ffffff', align: 'center' },
      description: { text: 'Transform your ideas into reality with our innovative platform', show: true, color: '#ffffff', align: 'center' },
      button: { text: 'Get Started', show: true, color: '#FFE66D', textColor: '#1a1a1a', link: '#' },
      subtitle: { text: 'Trusted by thousands', show: true, color: '#ffffff', align: 'center' }
    }
  },
  {
    id: 'hero-3',
    category: 'hero',
    name: 'Hero - Video Background',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      background: { type: 'image', value: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop', overlay: true, overlayColor: 'rgba(0,0,0,0.5)' },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 900,
      padding: { top: 120, bottom: 120 },
      title: { text: 'Video background', show: true, color: '#ffffff', align: 'center' },
      description: { text: 'High-impact hero sections with stunning visual backgrounds that capture attention instantly', show: true, color: '#f0f0f0', align: 'center' },
      button: { text: 'Learn More', show: true, color: '#60D9FA', textColor: '#000000', link: '#' },
      subtitle: { text: '', show: false, color: '#ffffff', align: 'center' }
    }
  },
  {
    id: 'hero-4',
    category: 'hero',
    name: 'Hero - Parallax Image',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      background: { type: 'image', value: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop', overlay: true, overlayColor: 'rgba(10,10,30,0.6)' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 800,
      padding: { top: 160, bottom: 160 },
      title: { text: 'Parallax background', show: true, color: '#ffffff', align: 'center' },
      description: { text: 'Create depth and motion with stunning parallax scrolling effects', show: true, color: '#e8e8e8', align: 'center' },
      button: { text: 'Discover', show: true, color: '#4ECDC4', textColor: '#ffffff', link: '#' },
      subtitle: { text: 'Scroll to experience', show: true, color: '#d0d0d0', align: 'center' }
    }
  },
  {
    id: 'hero-5',
    category: 'hero',
    name: 'Hero - Animated Gradient',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #F093FB 100%)' },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 850,
      padding: { top: 150, bottom: 150 },
      title: { text: 'Build something amazing', show: true, color: '#ffffff', align: 'center' },
      description: { text: 'Powerful tools and elegant design come together to help you create stunning websites with ease', show: true, color: '#f5f5f5', align: 'center' },
      button: { text: 'Start Building', show: true, color: '#FBBF24', textColor: '#1a1a1a', link: '#' },
      subtitle: { text: 'No credit card required', show: true, color: '#e0e0e0', align: 'center' }
    }
  },
  {
    id: 'hero-6',
    category: 'hero',
    name: 'Hero - Split Screen',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      background: { type: 'image', value: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop', overlay: true, overlayColor: 'rgba(0,0,0,0.4)' },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 950,
      padding: { top: 140, bottom: 140 },
      title: { text: 'Collaborate and grow together', show: true, color: '#ffffff', align: 'left' },
      description: { text: 'Join thousands of teams already using our platform to build, collaborate, and ship amazing products', show: true, color: '#f0f0f0', align: 'left' },
      button: { text: 'Join Free', show: true, color: '#10B981', textColor: '#ffffff', link: '#' },
      subtitle: { text: '14-day free trial, cancel anytime', show: true, color: '#d5d5d5', align: 'left' }
    }
  },
  {
    id: 'hero-7',
    category: 'hero',
    name: 'Hero - Minimal Centered',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      background: { type: 'color', value: '#FAFAFA' },
      fullScreen: true,
      fullWidth: false,
      contentWidth: 750,
      padding: { top: 180, bottom: 180 },
      title: { text: 'Simple. Powerful. Elegant.', show: true, color: '#1a1a1a', align: 'center' },
      description: { text: 'Everything you need to build professional websites. Nothing you don\'t.', show: true, color: '#4a4a4a', align: 'center' },
      button: { text: 'Get Started', show: true, color: '#1a1a1a', textColor: '#ffffff', link: '#' },
      subtitle: { text: 'Used by 10,000+ creators', show: true, color: '#6a6a6a', align: 'center' }
    }
  },
  {
    id: 'hero-8',
    category: 'hero',
    name: 'Hero - Dark Bold',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      background: { type: 'color', value: '#0F172A' },
      fullScreen: true,
      fullWidth: false,
      contentWidth: 900,
      padding: { top: 160, bottom: 160 },
      title: { text: 'The future is here', show: true, color: '#F59E0B', align: 'center' },
      description: { text: 'Revolutionary platform that transforms how teams build digital experiences. Start creating today.', show: true, color: '#E5E7EB', align: 'center' },
      button: { text: 'Start Free Trial', show: true, color: '#F59E0B', textColor: '#0F172A', link: '#' },
      subtitle: { text: 'Trusted by leading companies worldwide', show: true, color: '#9CA3AF', align: 'center' }
    }
  },
  {
    id: 'hero-9',
    category: 'hero',
    name: 'Hero - Image Overlay',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      background: { type: 'image', value: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop', overlay: true, overlayColor: 'rgba(0,0,0,0.65)' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 850,
      padding: { top: 180, bottom: 180 },
      title: { text: 'Design without limits', show: true, color: '#ffffff', align: 'center' },
      description: { text: 'Unleash your creativity with our intuitive design tools and beautiful templates', show: true, color: '#f5f5f5', align: 'center' },
      button: { text: 'Explore Templates', show: true, color: '#EC4899', textColor: '#ffffff', link: '#' },
      subtitle: { text: 'Free forever, upgrade as you grow', show: true, color: '#e0e0e0', align: 'center' }
    }
  },
  {
    id: 'hero-10',
    category: 'hero',
    name: 'Hero - Dual CTA',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)' },
      fullScreen: true,
      fullWidth: false,
      contentWidth: 950,
      padding: { top: 140, bottom: 140 },
      title: { text: 'Launch your project faster', show: true, color: '#ffffff', align: 'center' },
      description: { text: 'Everything you need to build stunning websites in minutes, not months. Choose your path below.', show: true, color: '#d0d0d0', align: 'center' },
      button: { text: 'Start Building', show: true, color: '#3B82F6', textColor: '#ffffff', link: '#' },
      subtitle: { text: 'Or watch a demo', show: true, color: '#a0a0a0', align: 'center' }
    }
  },
  {
    id: 'menu-1',
    category: 'menu',
    name: 'Menu - Horizontal Classic',
    thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=300&fit=crop',
    config: {
      type: 'menu',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 20, bottom: 20 },
      logo: { text: 'AXXO', show: true, color: '#FF006B', size: 24 },
      menuItems: [
        { text: 'About', link: '#about', color: '#1a1a2e', show: true },
        { text: 'Services', link: '#services', color: '#1a1a2e', show: true },
        { text: 'Contacts', link: '#contacts', color: '#1a1a2e', show: true }
      ],
      button: { text: 'Start Now!', show: true, color: '#A8F5D7', textColor: '#1a1a2e', link: '#start' },
      sticky: false,
      align: 'space-between'
    }
  },
  {
    id: 'menu-2',
    category: 'menu',
    name: 'Menu - Centered',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop',
    config: {
      type: 'menu',
      background: { type: 'color', value: '#1a1a2e' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 24, bottom: 24 },
      logo: { text: 'Brand', show: true, color: '#ffffff', size: 28 },
      menuItems: [
        { text: 'Home', link: '#home', color: '#ffffff', show: true },
        { text: 'Features', link: '#features', color: '#ffffff', show: true },
        { text: 'Pricing', link: '#pricing', color: '#ffffff', show: true },
        { text: 'Contact', link: '#contact', color: '#ffffff', show: true }
      ],
      button: { text: 'Sign Up', show: true, color: '#5B4FC9', textColor: '#ffffff', link: '#signup' },
      sticky: true,
      align: 'center'
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
  },
  {
    id: 'menu-4',
    category: 'menu',
    name: 'Menu - Sidebar Mobile',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    config: {
      type: 'menu',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 20, bottom: 20 },
      logo: { text: 'MyBrand', show: true, color: '#ffffff', size: 30 },
      menuItems: [
        { text: 'Home', link: '#home', color: '#ffffff', show: true },
        { text: 'Products', link: '#products', color: '#ffffff', show: true },
        { text: 'Services', link: '#services', color: '#ffffff', show: true },
        { text: 'About', link: '#about', color: '#ffffff', show: true }
      ],
      button: { text: 'Contact Us', show: true, color: '#FFD93D', textColor: '#1a1a1a', link: '#contact' },
      sticky: true,
      align: 'space-between'
    }
  },
  {
    id: 'menu-5',
    category: 'menu',
    name: 'Menu - Split Navigation',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    config: {
      type: 'menu',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 1400,
      padding: { top: 22, bottom: 22 },
      logo: { text: 'LOGO', show: true, color: '#1a1a2e', size: 32 },
      menuItems: [
        { text: 'Shop', link: '#shop', color: '#2d3748', show: true },
        { text: 'About', link: '#about', color: '#2d3748', show: true },
        { text: 'Blog', link: '#blog', color: '#2d3748', show: true },
        { text: 'Contact', link: '#contact', color: '#2d3748', show: true }
      ],
      button: { text: 'Sign In', show: true, color: '#2D3748', textColor: '#ffffff', link: '#signin' },
      sticky: false,
      align: 'split'
    }
  },
  {
    id: 'menu-6',
    category: 'menu',
    name: 'Menu - Minimal Modern',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    config: {
      type: 'menu',
      background: { type: 'color', value: '#0F172A' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 18, bottom: 18 },
      logo: { text: 'STUDIO', show: true, color: '#F59E0B', size: 28 },
      menuItems: [
        { text: 'Work', link: '#work', color: '#F3F4F6', show: true },
        { text: 'Studio', link: '#studio', color: '#F3F4F6', show: true },
        { text: 'News', link: '#news', color: '#F3F4F6', show: true },
        { text: 'Careers', link: '#careers', color: '#F3F4F6', show: true }
      ],
      button: { text: 'Let\'s Talk', show: true, color: '#F59E0B', textColor: '#0F172A', link: '#contact' },
      sticky: true,
      align: 'space-between'
    }
  },
  {
    id: 'features-1',
    category: 'features',
    name: 'Features - 3 Column',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    config: {
      type: 'features',
      background: { type: 'color', value: '#F8F9FA' },
      fullWidth: false,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Our Features', show: true, color: '#1a1a2e', align: 'center' },
      description: { text: 'Everything you need to build amazing websites', show: true, color: '#5a5a6e', align: 'center' },
      columns: 3,
      items: [
        { icon: 'Zap', title: 'Lightning Fast', description: 'Optimized performance for the best user experience', color: '#FF6B6B' },
        { icon: 'Shield', title: 'Secure & Safe', description: 'Enterprise-grade security built into every feature', color: '#4ECDC4' },
        { icon: 'Heart', title: 'User Friendly', description: 'Intuitive interface that anyone can master', color: '#FFE66D' }
      ]
    }
  },
  {
    id: 'features-2',
    category: 'features',
    name: 'Features - 4 Column Grid',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    config: {
      type: 'features',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: false,
      contentWidth: 1200,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Why Choose Us', show: true, color: '#2d3748', align: 'center' },
      description: { text: 'Comprehensive solutions for modern businesses', show: true, color: '#718096', align: 'center' },
      columns: 4,
      items: [
        { icon: 'Rocket', title: 'Fast Launch', description: 'Go live in minutes', color: '#805AD5' },
        { icon: 'Code', title: 'Clean Code', description: 'Beautiful and maintainable', color: '#3182CE' },
        { icon: 'Users', title: 'Team Collaboration', description: 'Work together seamlessly', color: '#38B2AC' },
        { icon: 'TrendingUp', title: 'Scalable', description: 'Grows with your business', color: '#DD6B20' }
      ]
    }
  },
  {
    id: 'article-1',
    category: 'article',
    name: 'Article - Image Left',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    config: {
      type: 'article',
      background: { type: 'color', value: '#FFFEF2' },
      fullWidth: false,
      contentWidth: 1100,
      padding: { top: 80, bottom: 80 },
      layout: 'image-left',
      image: { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', alt: 'Team collaboration' },
      title: { text: 'From creation to market', show: true, color: '#1a1a2e', align: 'left' },
      description: { text: 'Our comprehensive platform helps you transform ideas into successful products. With powerful tools and seamless workflows, bring your vision to life faster than ever before.', show: true, color: '#4a4a5e', align: 'left' },
      button: { text: 'Learn More', show: true, color: '#FFD93D', textColor: '#1a1a1a', link: '#' }
    }
  },
  {
    id: 'article-2',
    category: 'article',
    name: 'Article - Image Right',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop',
    config: {
      type: 'article',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: false,
      contentWidth: 1100,
      padding: { top: 80, bottom: 80 },
      layout: 'image-right',
      image: { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop', alt: 'Interior design' },
      title: { text: 'From ordinary to extraordinary', show: true, color: '#2d3748', align: 'left' },
      description: { text: 'We transform spaces and ideas into extraordinary experiences. Our attention to detail and creative approach ensures exceptional results every time.', show: true, color: '#718096', align: 'left' },
      button: { text: 'Explore More', show: true, color: '#48BB78', textColor: '#ffffff', link: '#' }
    }
  },
  {
    id: 'article-3',
    category: 'article',
    name: 'Article - Centered',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
    config: {
      type: 'article',
      background: { type: 'color', value: '#F7FAFC' },
      fullWidth: false,
      contentWidth: 900,
      padding: { top: 100, bottom: 100 },
      layout: 'centered',
      image: { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&h=600&fit=crop', alt: 'Business team' },
      title: { text: 'Dream big, achieve bigger', show: true, color: '#1a202c', align: 'center' },
      description: { text: 'Our mission is to empower ambitious teams to reach their full potential. With the right tools and support, anything is possible.', show: true, color: '#4a5568', align: 'center' },
      button: { text: 'Start Now', show: true, color: '#4FD1C5', textColor: '#1a202c', link: '#' }
    }
  },
  {
    id: 'intro-1',
    category: 'intro',
    name: 'Intro - Video Player',
    thumbnail: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=400&h=300&fit=crop',
    config: {
      type: 'intro',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: false,
      contentWidth: 1000,
      padding: { top: 80, bottom: 80 },
      layout: 'video',
      video: { src: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=1200&h=800&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=1200&h=800&fit=crop' },
      title: { text: 'Intro with video', show: true, color: '#1a1a2e', align: 'center' },
      description: { text: 'Showcase your product or service with engaging video content', show: true, color: '#5a5a6e', align: 'center' },
      button: { text: 'Watch Demo', show: true, color: '#667EEA', textColor: '#ffffff', link: '#' }
    }
  },
  {
    id: 'intro-2',
    category: 'intro',
    name: 'Intro - Image Focus',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    config: {
      type: 'intro',
      background: { type: 'color', value: '#F8F9FA' },
      fullWidth: false,
      contentWidth: 1000,
      padding: { top: 80, bottom: 80 },
      layout: 'image',
      image: { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=700&fit=crop', alt: 'Modern office' },
      title: { text: 'Intro with image', show: true, color: '#2d3748', align: 'center' },
      description: { text: 'High-quality images that tell your brand story and capture attention', show: true, color: '#718096', align: 'center' },
      button: { text: 'Learn More', show: true, color: '#48BB78', textColor: '#ffffff', link: '#' }
    }
  },
  {
    id: 'cta-1',
    category: 'cta',
    name: 'CTA - Simple Centered',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    config: {
      type: 'cta',
      background: { type: 'color', value: '#4C1D95' },
      fullWidth: false,
      contentWidth: 800,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Create your first website', show: true, color: '#ffffff', align: 'center' },
      description: { text: 'Unleash your genius and build something amazing today', show: true, color: '#e8e8f0', align: 'center' },
      buttons: [
        { text: 'Get Started', show: true, color: '#10B981', textColor: '#ffffff', link: '#', style: 'solid' },
        { text: 'Learn More', show: true, color: 'transparent', textColor: '#ffffff', link: '#', style: 'outline' }
      ]
    }
  },
  {
    id: 'cta-2',
    category: 'cta',
    name: 'CTA - Newsletter',
    thumbnail: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
    config: {
      type: 'cta',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' },
      fullWidth: false,
      contentWidth: 700,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Sign up and enjoy discounted offers', show: true, color: '#ffffff', align: 'center' },
      description: { text: 'Join thousands of happy subscribers and get exclusive deals', show: true, color: '#f0f0f0', align: 'center' },
      form: { show: true, placeholder: 'Enter your email', buttonText: 'Subscribe' },
      buttons: []
    }
  },
  {
    id: 'gallery-1',
    category: 'gallery',
    name: 'Gallery - 3 Column Grid',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
    config: {
      type: 'gallery',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: false,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Our Gallery', show: true, color: '#1a1a2e', align: 'center' },
      description: { text: 'Explore our collection of stunning visuals', show: true, color: '#5a5a6e', align: 'center' },
      columns: 3,
      images: [
        { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop', alt: 'Gallery 1' },
        { src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=400&fit=crop', alt: 'Gallery 2' },
        { src: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&h=400&fit=crop', alt: 'Gallery 3' },
        { src: 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=600&h=400&fit=crop', alt: 'Gallery 4' },
        { src: 'https://images.unsplash.com/photo-1618556450994-e307c7b94e57?w=600&h=400&fit=crop', alt: 'Gallery 5' },
        { src: 'https://images.unsplash.com/photo-1618556450962-3ac9a0cf2a38?w=600&h=400&fit=crop', alt: 'Gallery 6' }
      ]
    }
  },
  {
    id: 'testimonial-1',
    category: 'testimonial',
    name: 'Testimonial - Carousel',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    config: {
      type: 'testimonial',
      background: { type: 'color', value: '#F7FAFC' },
      fullWidth: false,
      contentWidth: 900,
      padding: { top: 100, bottom: 100 },
      title: { text: 'What Our Clients Say', show: true, color: '#1a202c', align: 'center' },
      description: { text: 'Trusted by thousands of satisfied customers', show: true, color: '#4a5568', align: 'center' },
      items: [
        { name: 'Sarah Johnson', role: 'CEO, TechCorp', avatar: 'https://i.pravatar.cc/150?img=1', text: 'This platform transformed how we work. Absolutely incredible!', rating: 5 },
        { name: 'Michael Chen', role: 'Designer, Creative Co', avatar: 'https://i.pravatar.cc/150?img=2', text: 'Best decision we made this year. Highly recommended!', rating: 5 },
        { name: 'Emma Davis', role: 'Marketing Director', avatar: 'https://i.pravatar.cc/150?img=3', text: 'Exceeded all our expectations. Simply amazing!', rating: 5 }
      ]
    }
  },
  {
    id: 'contact-1',
    category: 'contact',
    name: 'Contact - Form with Info',
    thumbnail: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=300&fit=crop',
    config: {
      type: 'contact',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: false,
      contentWidth: 1100,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Get In Touch', show: true, color: '#1a1a2e', align: 'center' },
      description: { text: 'We would love to hear from you', show: true, color: '#5a5a6e', align: 'center' },
      form: {
        fields: [
          { type: 'text', name: 'name', label: 'Name', placeholder: 'Your name', required: true },
          { type: 'email', name: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
          { type: 'textarea', name: 'message', label: 'Message', placeholder: 'Your message', required: true }
        ],
        buttonText: 'Send Message',
        buttonColor: '#5B4FC9'
      },
      info: [
        { icon: 'Mail', label: 'Email', value: 'hello@example.com' },
        { icon: 'Phone', label: 'Phone', value: '+1 (555) 123-4567' },
        { icon: 'MapPin', label: 'Address', value: '123 Business St, City, Country' }
      ]
    }
  },
  {
    id: 'pricing-1',
    category: 'pricing',
    name: 'Pricing - 3 Plans',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee4ece3c5d?w=400&h=300&fit=crop',
    config: {
      type: 'pricing',
      background: { type: 'color', value: '#F8F9FA' },
      fullWidth: false,
      contentWidth: 1200,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Choose Your Plan', show: true, color: '#1a1a2e', align: 'center' },
      description: { text: 'Simple, transparent pricing for everyone', show: true, color: '#5a5a6e', align: 'center' },
      plans: [
        { name: 'Starter', price: '$9', period: '/month', features: ['1 Website', '10 GB Storage', 'Basic Support', 'SSL Certificate'], buttonText: 'Get Started', highlighted: false },
        { name: 'Professional', price: '$29', period: '/month', features: ['5 Websites', '50 GB Storage', 'Priority Support', 'SSL Certificate', 'Advanced Analytics'], buttonText: 'Get Started', highlighted: true },
        { name: 'Enterprise', price: '$99', period: '/month', features: ['Unlimited Websites', '500 GB Storage', '24/7 Support', 'SSL Certificate', 'Advanced Analytics', 'Custom Domain'], buttonText: 'Contact Sales', highlighted: false }
      ]
    }
  },
  {
    id: 'footer-1',
    category: 'footer',
    name: 'Footer - Multi Column',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    config: {
      type: 'footer',
      background: { type: 'color', value: '#1a1a2e' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 60, bottom: 40 },
      logo: { text: 'Mobirise', show: true, color: '#ffffff' },
      columns: [
        { title: 'Product', links: [{ text: 'Features', url: '#' }, { text: 'Pricing', url: '#' }, { text: 'FAQ', url: '#' }] },
        { title: 'Company', links: [{ text: 'About', url: '#' }, { text: 'Careers', url: '#' }, { text: 'Contact', url: '#' }] },
        { title: 'Resources', links: [{ text: 'Blog', url: '#' }, { text: 'Documentation', url: '#' }, { text: 'Support', url: '#' }] },
        { title: 'Legal', links: [{ text: 'Privacy', url: '#' }, { text: 'Terms', url: '#' }, { text: 'Cookie Policy', url: '#' }] }
      ],
      social: [
        { icon: 'Facebook', url: '#' },
        { icon: 'Twitter', url: '#' },
        { icon: 'Instagram', url: '#' },
        { icon: 'Linkedin', url: '#' }
      ],
      copyright: { text: '© 2025 Mobirise. All rights reserved.', show: true, color: '#9a9aae' }
    }
  },
  {
    id: 'team-1',
    category: 'team',
    name: 'Team - 4 Members Grid',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    config: {
      type: 'team',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: false,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Meet Our Team', show: true, color: '#1a1a2e', align: 'center' },
      description: { text: 'Talented individuals working together', show: true, color: '#5a5a6e', align: 'center' },
      columns: 4,
      members: [
        { name: 'Alex Rivera', role: 'CEO & Founder', image: 'https://i.pravatar.cc/300?img=11', social: { twitter: '#', linkedin: '#' } },
        { name: 'Jordan Smith', role: 'Lead Designer', image: 'https://i.pravatar.cc/300?img=12', social: { twitter: '#', linkedin: '#' } },
        { name: 'Casey Brown', role: 'Developer', image: 'https://i.pravatar.cc/300?img=13', social: { twitter: '#', linkedin: '#' } },
        { name: 'Morgan Lee', role: 'Marketing', image: 'https://i.pravatar.cc/300?img=14', social: { twitter: '#', linkedin: '#' } }
      ]
    }
  },
  {
    id: 'stats-1',
    category: 'stats',
    name: 'Stats - 4 Column',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    config: {
      type: 'stats',
      background: { type: 'color', value: '#5B4FC9' },
      fullWidth: false,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Our Impact', show: false, color: '#ffffff', align: 'center' },
      columns: 4,
      stats: [
        { number: '10K+', label: 'Happy Customers', color: '#ffffff' },
        { number: '500+', label: 'Projects Completed', color: '#ffffff' },
        { number: '50+', label: 'Team Members', color: '#ffffff' },
        { number: '15+', label: 'Years Experience', color: '#ffffff' }
      ]
    }
  },
  {
    id: 'faq-1',
    category: 'faq',
    name: 'FAQ - Accordion',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    config: {
      type: 'faq',
      background: { type: 'color', value: '#F7FAFC' },
      fullWidth: false,
      contentWidth: 900,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Frequently Asked Questions', show: true, color: '#1a202c', align: 'center' },
      description: { text: 'Everything you need to know', show: true, color: '#4a5568', align: 'center' },
      items: [
        { question: 'How do I get started?', answer: 'Simply sign up for an account and choose your plan. You will be up and running in minutes!' },
        { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.' },
        { question: 'Can I cancel anytime?', answer: 'Yes, you can cancel your subscription at any time. No questions asked.' },
        { question: 'Do you offer refunds?', answer: 'We offer a 30-day money-back guarantee if you are not satisfied with our service.' },
        { question: 'Is there customer support?', answer: 'Yes! We provide 24/7 customer support via email, chat, and phone for all plans.' }
      ]
    }
  }
];

// Mock data for saved projects
export const mockProjects = [
  {
    id: 'project-1',
    name: 'My Awesome Website',
    updatedAt: new Date('2025-01-15'),
    blocks: [
      {
        id: 'block-1',
        templateId: 'hero-1',
        config: blockTemplates[0].config
      }
    ]
  }
];