// Mock data for block templates library
// Simplified - only 2 templates for debugging
export const blockTemplates = [
  {
    id: 'hero-1',
    category: 'hero',
    name: 'Hero - Image Above Text',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'image-above-text',
      background: { type: 'color', value: '#F5F5F0' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 80, bottom: 80 },
      heroImage: { 
        src: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1200&h=800&fit=crop', 
        show: true,
        alt: 'Hero image',
        height: 600,
        objectFit: 'cover',
        borderRadius: 12
      },
      title: { text: 'From ordinary to extraordinary', show: true, color: '#2B2B2B', align: 'center', size: 56, weight: 700 },
      description: { text: 'Intro with an image above text. Click on the image to replace it.', show: true, color: '#6B6B6B', align: 'center', size: 18 },
      button: { text: 'Download now', show: true, color: '#A8F5B8', textColor: '#2B2B2B', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#888888', align: 'center' }
    }
  },
  {
    id: 'hero-parallax',
    category: 'hero',
    name: 'Hero - Parallax Effect',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    config: {
      type: 'hero-parallax',
      background: { 
        type: 'image', 
        value: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
      },
      overlay: {
        show: true,
        color: '#000000',
        opacity: 0.4
      },
      parallax: {
        enabled: true,
        speed: 0.5
      },
      whiteSpace: {
        top: 200,
        bottom: 200
      },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { 
        text: 'Experience Depth with Parallax', 
        show: true, 
        color: '#FFFFFF', 
        align: 'center', 
        size: 64, 
        weight: 700 
      },
      description: { 
        text: 'Watch the background move at a different speed as you scroll, creating a stunning 3D effect.', 
        show: true, 
        color: '#FFFFFF', 
        align: 'center', 
        size: 20 
      },
      button: { 
        text: 'Explore More', 
        show: true, 
        color: '#6366F1', 
        textColor: '#FFFFFF', 
        link: '#', 
        size: 18 
      },
      wrap: {
        show: true,
        width: 800,
        backgroundColor: 'transparent'
      }
    }
  },
  {
    id: 'hero-3',
    category: 'hero',
    name: 'Hero - Gradient Background',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Experience the future', show: true, color: '#FFFFFF', align: 'center', size: 56, weight: 700 },
      description: { text: 'The best all-in-one solution that allows you to run your ideas. Start building today and drag-n-drop your way into a successful website.', show: true, color: '#FFFFFF', align: 'center', size: 18 },
      button: { text: 'Contact Now', show: true, color: '#4A90E2', textColor: '#FFFFFF', link: '#', size: 18 },
      subtitle: { text: 'Consulta din afara-nu-te-am', show: false, color: '#FFFFFF', align: 'center' }
    }
  },
  {
    id: 'hero-4',
    category: 'hero',
    name: 'Hero - Video Background',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'color', value: '#000000' },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Video background', show: true, color: '#FFFFFF', align: 'center', size: 56, weight: 700 },
      description: { text: 'Intro with a video in the background. Both, the video and the call to action are optional.', show: true, color: '#FFFFFF', align: 'center', size: 18 },
      button: { text: 'Learn More', show: true, color: '#00C9A7', textColor: '#FFFFFF', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#FFFFFF', align: 'center' }
    }
  },
  {
    id: 'hero-5',
    category: 'hero',
    name: 'Hero - Parallax Background',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { 
        type: 'image', 
        value: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1920&h=1080&fit=crop',
        overlay: true,
        overlayColor: 'rgba(0,0,0,0.5)'
      },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Parallax background', show: true, color: '#FFFFFF', align: 'center', size: 56, weight: 700 },
      description: { text: 'Title and tagline, with an optional call to action.', show: true, color: '#FFFFFF', align: 'center', size: 18 },
      button: { text: 'Contact', show: true, color: 'transparent', textColor: '#FFFFFF', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#FFFFFF', align: 'center' }
    }
  },
  {
    id: 'hero-6',
    category: 'hero',
    name: 'Hero - Create Connect Shine',
    thumbnail: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #FE8C00 0%, #F83600 50%, #E91E63 100%)' },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Create, connect, shine', show: true, color: '#FFFFFF', align: 'center', size: 56, weight: 700 },
      description: { text: 'Intro with gradient background and call to action. Our designs will make you stand out from the competition.', show: true, color: '#FFFFFF', align: 'center', size: 18 },
      button: { text: 'Purchase', show: true, color: '#FFD93D', textColor: '#000000', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#FFFFFF', align: 'center' }
    }
  },
  {
    id: 'hero-7',
    category: 'hero',
    name: 'Hero - Intro with Image',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'color', value: '#F5F5F0' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Intro with image', show: true, color: '#2B2B2B', align: 'center', size: 48, weight: 700 },
      description: { text: 'Intro with image on the side. There is room here for you to add a few sentences. Describe your product, service or event. Use this text area to introduce what you have to offer.', show: true, color: '#6B6B6B', align: 'center', size: 16 },
      button: { text: 'Start For Free!', show: true, color: '#A8F5B8', textColor: '#2B2B2B', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#6B6B6B', align: 'center' }
    }
  },
  {
    id: 'hero-8',
    category: 'hero',
    name: 'Hero - Intro with Video',
    thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'color', value: '#FFFFFF' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Intro with video', show: true, color: '#2B2B2B', align: 'left', size: 48, weight: 700 },
      description: { text: 'Try including a video in the Intro. There is room here for you to add a few sentences. Describe your product, service or event. Use this text area to introduce what you have to offer.', show: true, color: '#6B6B6B', align: 'left', size: 16 },
      button: { text: 'Join', show: true, color: '#A8F5B8', textColor: '#2B2B2B', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#6B6B6B', align: 'left' }
    }
  },
  {
    id: 'hero-9',
    category: 'hero',
    name: 'Hero - PatternM5 Theme',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'color', value: '#F5F5F5' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'PatternM5 Theme Computer Repair Businesses', show: true, color: '#000000', align: 'left', size: 48, weight: 700 },
      description: { text: 'In today\'s digital world, computers are an essential part of daily life – used for everything from business operations and education to personal communication.', show: true, color: '#666666', align: 'left', size: 16 },
      button: { text: 'Contact now', show: true, color: '#FFEB3B', textColor: '#000000', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#666666', align: 'left' }
    }
  },
  {
    id: 'hero-10',
    category: 'hero',
    name: 'Hero - Mobile Shop',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { 
        type: 'image', 
        value: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=1080&fit=crop',
        overlay: true,
        overlayColor: 'rgba(0,0,0,0.6)'
      },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Mobile Shop', show: true, color: '#FFFFFF', align: 'right', size: 56, weight: 700 },
      description: { text: 'Mobile Shop brings the latest smartphones, tablets, and accessories right to your fingertips.', show: true, color: '#FFFFFF', align: 'right', size: 18 },
      button: { text: 'Contact now', show: true, color: '#FFFFFF', textColor: '#000000', link: '#', size: 18 },
      subtitle: { text: 'Connect Anywhere', show: true, color: '#00E5FF', align: 'right' }
    }
  },
  {
    id: 'hero-11',
    category: 'hero',
    name: 'Hero - Advertising Agency',
    thumbnail: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { 
        type: 'image', 
        value: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=1920&h=1080&fit=crop',
        overlay: true,
        overlayColor: 'rgba(0,0,0,0.7)'
      },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Advertising Agency GuideM5 Theme', show: true, color: '#FFFFFF', align: 'center', size: 56, weight: 700 },
      description: { text: 'A great idea looking to advance and big ideas and know the way to help you amplify.', show: true, color: '#FFFFFF', align: 'center', size: 18 },
      button: { text: 'Read More', show: true, color: '#FFD700', textColor: '#000000', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#FFFFFF', align: 'center' }
    }
  },
  {
    id: 'hero-12',
    category: 'hero',
    name: 'Hero - Online Product Advertising',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { 
        type: 'image', 
        value: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop',
        overlay: true,
        overlayColor: 'rgba(0,0,0,0.5)'
      },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Online Product Advertising', show: true, color: '#FFFFFF', align: 'center', size: 56, weight: 700 },
      description: { text: '', show: false, color: '#FFFFFF', align: 'center', size: 18 },
      button: { text: 'Get More', show: true, color: '#FF6B35', textColor: '#FFFFFF', link: '#', size: 18 },
      subtitle: { text: 'Get list', show: true, color: '#FFD700', align: 'center' }
    }
  },
  {
    id: 'hero-13',
    category: 'hero',
    name: 'Hero - SolveM5 Database',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)' },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { text: 'SolveM5 Theme Database Hardware', show: true, color: '#FFFFFF', align: 'center', size: 56, weight: 700 },
      description: { text: 'Robust and high-performance hardware designed to support internally online networks.', show: true, color: '#FFFFFF', align: 'center', size: 18 },
      button: { text: 'See series', show: true, color: '#6366F1', textColor: '#FFFFFF', link: '#', size: 18 },
      subtitle: { text: 'Data Infrastructure', show: true, color: '#4FC3F7', align: 'center' }
    }
  },
  {
    id: 'hero-14',
    category: 'hero',
    name: 'Hero - Up-to-date Database',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Up-to-date Database', show: true, color: '#FFFFFF', align: 'center', size: 56, weight: 700 },
      description: { text: 'An up-to-date database ensures the information remains accurate, refreshed, and easily visible at all times.', show: true, color: '#FFFFFF', align: 'center', size: 18 },
      button: { text: 'See details', show: true, color: '#7C4DFF', textColor: '#FFFFFF', link: '#', size: 18 },
      subtitle: { text: 'Live Data Systems', show: true, color: '#B39DDB', align: 'center' }
    }
  },
  {
    id: 'hero-15',
    category: 'hero',
    name: 'Hero - From Creation to Market',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'color', value: '#F8F9FA' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'From creation to market', show: true, color: '#000000', align: 'left', size: 48, weight: 700 },
      description: { text: 'Great websites deserve to be shown. Click on the image to change the design of demo.', show: true, color: '#666666', align: 'left', size: 16 },
      button: { text: 'Be part of', show: true, color: '#FFD93D', textColor: '#000000', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#666666', align: 'left' }
    }
  },
  {
    id: 'hero-16',
    category: 'hero',
    name: 'Hero - Unleash Your Genius',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'color', value: '#FFFFFF' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Unleash your genius', show: true, color: '#000000', align: 'center', size: 48, weight: 700 },
      description: { text: 'A call out with a few more hints and calls to action. Idea and a team how to turn the idea into product.', show: true, color: '#666666', align: 'center', size: 16 },
      button: { text: 'Brainstorm', show: true, color: '#00BCD4', textColor: '#FFFFFF', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#666666', align: 'center' }
    }
  },
  {
    id: 'hero-17',
    category: 'hero',
    name: 'Hero - Create Your First Website',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'color', value: '#F5F5F5' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Create your first website', show: true, color: '#000000', align: 'center', size: 48, weight: 700 },
      description: { text: 'Anyone can build a fast, beautiful, and secure website. Just choose from the wide selection of sites, colors, and icons – everything just like you want it.', show: true, color: '#666666', align: 'center', size: 16 },
      button: { text: 'Learn More', show: true, color: '#A8F5B8', textColor: '#000000', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#666666', align: 'center' }
    }
  },
  {
    id: 'hero-18',
    category: 'hero',
    name: 'Hero - Dream Big Achieve Bigger',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'color', value: '#E0F7FA' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Dream big, achieve bigger', show: true, color: '#000000', align: 'left', size: 48, weight: 700 },
      description: { text: 'Combine your web ideas with your own custom images and beautiful text. The only limit is your imagination.', show: true, color: '#666666', align: 'left', size: 16 },
      button: { text: 'Register', show: true, color: '#00BCD4', textColor: '#FFFFFF', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#666666', align: 'left' }
    }
  },
  {
    id: 'hero-19',
    category: 'hero',
    name: 'Hero - Sign Up Discounted',
    thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #3D0B7E 0%, #6A0DAD 100%)' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Sign up and enjoy discounted offers', show: true, color: '#FFFFFF', align: 'right', size: 48, weight: 700 },
      description: { text: '', show: false, color: '#FFFFFF', align: 'right', size: 16 },
      button: { text: 'Apply', show: true, color: '#FF69B4', textColor: '#FFFFFF', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#FFFFFF', align: 'right' }
    }
  },
  {
    id: 'hero-20',
    category: 'hero',
    name: 'Hero - Create Site Now',
    thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #00CDAC 0%, #02AAB0 100%)' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Create site now', show: true, color: '#FFFFFF', align: 'center', size: 48, weight: 700 },
      description: { text: 'Start building web pages in a simple way. Do not need any more a custom or template. Now you can be creator. Turn visions into live websites.', show: true, color: '#FFFFFF', align: 'center', size: 16 },
      button: { text: 'Start Now', show: true, color: '#FFFFFF', textColor: '#00CDAC', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#FFFFFF', align: 'center' }
    }
  },
  {
    id: 'hero-21',
    category: 'hero',
    name: 'Hero - Join Our Community',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #F46B45 0%, #EEA849 100%)' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Join our community', show: true, color: '#FFFFFF', align: 'center', size: 48, weight: 700 },
      description: { text: 'We\'ve had over 1,000 clients join our online classes over the last 10 years. Share the difference an advanced-focus education can make and enrich and invigorate.', show: true, color: '#FFFFFF', align: 'center', size: 16 },
      button: { text: 'Sign Up', show: true, color: '#FFFFFF', textColor: '#F46B45', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#FFFFFF', align: 'center' }
    }
  },
  {
    id: 'hero-22',
    category: 'hero',
    name: 'Hero - Unleash Inner Maverick',
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #2C003E 0%, #512DA8 100%)' },
      fullScreen: true,
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 100, bottom: 100 },
      title: { text: 'Unleash your inner maverick', show: true, color: '#FFFFFF', align: 'center', size: 56, weight: 700 },
      description: { text: 'Join all of you self-assured trailblazers to fully embrace risk boldness imagination. The difference will be transformational and empowered.', show: true, color: '#FFFFFF', align: 'center', size: 18 },
      button: { text: 'Buy', show: true, color: '#FFFFFF', textColor: '#512DA8', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#FFFFFF', align: 'center' }
    }
  },
  {
    id: 'hero-23',
    category: 'hero',
    name: 'Hero - Intro with Image Right',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    config: {
      type: 'hero',
      layout: 'default',
      background: { type: 'color', value: '#E8F5E9' },
      fullScreen: false,
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Intro with image', show: true, color: '#000000', align: 'left', size: 48, weight: 700 },
      description: { text: 'We are a startup with a vision. There is room here for you to add a few sentences. Describe your product, service or event and include your differentiators.', show: true, color: '#666666', align: 'left', size: 16 },
      button: { text: 'Call To Action', show: true, color: '#A8F5B8', textColor: '#000000', link: '#', size: 18 },
      subtitle: { text: '', show: false, color: '#666666', align: 'left' }
    }
  },
  {
    id: 'menu-1',
    category: 'menu',
    name: 'Menu - Classic',
    thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=300&fit=crop',
    config: {
      type: 'menu',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 16, bottom: 16 },
      logo: { 
        text: 'AXXO', 
        show: true, 
        color: '#1a1a2e', 
        size: 24,
        imageSize: 40
      },
      menuItems: [
        { text: 'About us', link: '#about', color: '#1a1a2e', show: true },
        { text: 'Services', link: '#services', color: '#1a1a2e', show: true },
        { text: 'Contacts', link: '#contacts', color: '#1a1a2e', show: true }
      ],
      activeColor: '#1a1a2e',
      button: { 
        text: 'Get Started', 
        show: true, 
        color: '#6366F1', 
        textColor: '#ffffff', 
        link: '#start' 
      },
      icons: { 
        show: true 
      },
      sticky: true,
      collapsed: true,
      transparent: true,
      opacity: 0.95,
      hamburger: {
        show: true,
        color: '#1a1a2e',
        breakpoint: 768
      },
      align: 'space-between',
      splitCount: 2
    }
  },
  {
    id: 'menu-3',
    category: 'menu',
    name: 'Menu - Transparent',
    thumbnail: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&h=300&fit=crop',
    config: {
      type: 'menu',
      background: { type: 'color', value: '#000000' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 16, bottom: 16 },
      logo: { 
        text: 'Logo', 
        show: true, 
        color: '#ffffff', 
        size: 24,
        imageSize: 40
      },
      menuItems: [
        { text: 'Portfolio', link: '#portfolio', color: '#ffffff', show: true },
        { text: 'About', link: '#about', color: '#ffffff', show: true },
        { text: 'Blog', link: '#blog', color: '#ffffff', show: true }
      ],
      activeColor: '#ffffff',
      button: { 
        text: 'Contact', 
        show: true, 
        color: 'transparent', 
        textColor: '#ffffff', 
        link: '#contact' 
      },
      icons: { 
        show: true 
      },
      sticky: true,
      collapsed: true,
      transparent: true,
      opacity: 0.7,
      hamburger: {
        show: true,
        color: '#ffffff',
        breakpoint: 768
      },
      align: 'space-between',
      splitCount: 2
    }
  },
  {
    id: 'menu-4',
    category: 'menu',
    name: 'Menu - Social Icons',
    thumbnail: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=300&fit=crop',
    config: {
      type: 'menu',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 16, bottom: 16 },
      logo: { 
        text: 'Brand', 
        show: true, 
        color: '#1a1a2e', 
        size: 24,
        imageSize: 40
      },
      menuItems: [
        { text: 'Home', link: '#home', color: '#1a1a2e', show: true },
        { text: 'About', link: '#about', color: '#1a1a2e', show: true },
        { text: 'Services', link: '#services', color: '#1a1a2e', show: true }
      ],
      activeColor: '#6366F1',
      button: { 
        text: 'Contact', 
        show: true, 
        color: '#6366F1', 
        textColor: '#ffffff', 
        link: '#contact' 
      },
      icons: { 
        show: false 
      },
      socialIcons: {
        show: true,
        items: [
          { icon: 'FaFacebookF', name: 'Facebook', color: '#1877f2', link: 'https://facebook.com', show: true },
          { icon: 'FaXTwitter', name: 'Twitter/X', color: '#000000', link: 'https://twitter.com', show: true },
          { icon: 'FaInstagram', name: 'Instagram', color: '#e4405f', link: 'https://instagram.com', show: true }
        ],
        size: 18,
        spacing: 12,
        position: 'right'
      },
      sticky: true,
      collapsed: false,
      transparent: false,
      opacity: 1,
      hamburger: {
        show: true,
        color: '#1a1a2e',
        breakpoint: 768
      },
      align: 'space-between',
      splitCount: 2
    }
  },
  {
    id: 'features-1',
    category: 'features',
    name: 'Features - Data Infrastructure Solutions',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    config: {
      type: 'features',
      layout: 'cards-gradient',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 100%)' },
      fullWidth: true,
      contentWidth: 1400,
      padding: { top: 100, bottom: 100 },
      columns: 4,
      title: { 
        text: 'Data Infrastructure Solutions', 
        show: true, 
        color: '#ffffff', 
        align: 'center',
        size: 48
      },
      description: { 
        text: 'Powerful and reliable infrastructure for all your data needs', 
        show: true, 
        color: 'rgba(255,255,255,0.7)', 
        align: 'center',
        size: 18
      },
      items: [
        {
          title: 'Performance Optimization',
          description: 'Streamline database performance for faster results.',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          icon: 'Zap',
          features: ['Optimized queries', 'Enhanced speed', 'Fast indexing'],
          button: { text: 'Learn More', color: 'rgba(255,255,255,0.2)' }
        },
        {
          title: 'Scalability',
          description: 'Scale effortlessly to meet growing data demands.',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          icon: 'TrendingUp',
          features: ['Unlimited growth', 'Flexible scaling', 'Resource allocation'],
          button: { text: 'Learn More', color: 'rgba(255,255,255,0.2)' }
        },
        {
          title: 'Reliability & Availability',
          description: 'Ensure your data is always accessible and secure.',
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          icon: 'Shield',
          features: ['High uptime', '24/7 availability', 'Backup systems'],
          button: { text: 'Learn More', color: 'rgba(255,255,255,0.2)' }
        },
        {
          title: 'Data Security',
          description: 'Protect your information with top-tier security.',
          gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          icon: 'Lock',
          features: ['Data encryption', 'Secure access', 'Compliance ready'],
          button: { text: 'Learn More', color: 'rgba(255,255,255,0.2)' }
        }
      ]
    }
  },
  {
    id: 'features-2',
    category: 'features',
    name: 'Features - Powering Data',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    config: {
      type: 'features',
      layout: 'cards-simple',
      background: { type: 'color', value: '#f8f9fa' },
      fullWidth: true,
      contentWidth: 1400,
      padding: { top: 100, bottom: 100 },
      columns: 4,
      title: { 
        text: 'Powering Data, Maximize Database Speed', 
        show: true, 
        color: '#1a1a2e', 
        align: 'center',
        size: 48
      },
      description: { 
        text: 'Comprehensive solutions for modern database management', 
        show: true, 
        color: '#5a5a6e', 
        align: 'center',
        size: 18
      },
      items: [
        {
          title: 'Performance',
          description: 'Optimize your database queries and boost overall performance.',
          icon: 'Gauge',
          color: '#667eea'
        },
        {
          title: 'Scalability',
          description: 'Easily scale your infrastructure as your business grows.',
          icon: 'Layers',
          color: '#f093fb'
        },
        {
          title: 'Availability',
          description: 'High availability with 99.9% uptime guarantee.',
          icon: 'Activity',
          color: '#4facfe'
        },
        {
          title: 'Security',
          description: 'Enterprise-grade security with encryption at rest and in transit.',
          icon: 'ShieldCheck',
          color: '#43e97b'
        }
      ]
    }
  },
  {
    id: 'features-3',
    category: 'features',
    name: 'Features - Keeping Information Fresh',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    config: {
      type: 'features',
      layout: 'cards-with-images',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)' },
      fullWidth: true,
      contentWidth: 1400,
      padding: { top: 100, bottom: 100 },
      columns: 3,
      title: { 
        text: 'Keeping Information Fresh, Seamless Updates', 
        show: true, 
        color: '#ffffff', 
        align: 'center',
        size: 48
      },
      description: { 
        text: 'Real-time data synchronization and updates for your applications', 
        show: true, 
        color: 'rgba(255,255,255,0.7)', 
        align: 'center',
        size: 18
      },
      items: [
        {
          title: 'Launch of Real-Time Synchronization',
          description: 'Keep your data synchronized across all platforms in real-time.',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
          imageOverlay: 'linear-gradient(180deg, transparent 0%, rgba(26,26,46,0.8) 100%)',
          cardBackground: '#1e1e2e',
          titleColor: '#ffffff',
          descColor: 'rgba(255,255,255,0.8)',
          button: { text: 'View Details', gradient: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }
        },
        {
          title: 'Enhanced Security Integration',
          description: 'Advanced security features to protect your sensitive data.',
          image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
          imageOverlay: 'linear-gradient(180deg, transparent 0%, rgba(26,26,46,0.8) 100%)',
          cardBackground: '#1e1e2e',
          titleColor: '#ffffff',
          descColor: 'rgba(255,255,255,0.8)',
          button: { text: 'View Details', gradient: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)' }
        },
        {
          title: 'AI-Powered Update Management',
          description: 'Intelligent algorithms that optimize your update cycles.',
          image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=600&fit=crop',
          imageOverlay: 'linear-gradient(180deg, transparent 0%, rgba(26,26,46,0.8) 100%)',
          cardBackground: '#1e1e2e',
          titleColor: '#ffffff',
          descColor: 'rgba(255,255,255,0.8)',
          button: { text: 'View Details', gradient: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)' }
        }
      ]
    }
  },
  {
    id: 'features-4',
    category: 'features',
    name: 'Features - Strategies for Thriving',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    config: {
      type: 'features',
      layout: 'cards-image-side',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 100, bottom: 100 },
      columns: 1,
      title: { 
        text: 'Strategies for Thriving', 
        show: true, 
        color: '#1a1a2e', 
        align: 'center',
        size: 48
      },
      description: { 
        text: 'Proven methodologies to help your business succeed', 
        show: true, 
        color: '#5a5a6e', 
        align: 'center',
        size: 18
      },
      items: [
        {
          label: 'Strategy 1',
          title: 'Harnessing Digital',
          description: 'Leverage digital transformation to streamline operations, enhance customer experiences, and drive sustainable growth through innovative technology solutions.',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
          cardBackground: '#f8f9fa',
          titleColor: '#1a1a2e',
          descColor: '#5a5a6e',
          labelColor: '#667eea',
          button: { text: 'Read More', color: '#667eea' }
        },
        {
          label: 'Strategy 2',
          title: 'Building Strong Leadership',
          description: 'Develop exceptional leadership capabilities that inspire teams, foster innovation, and navigate complex business challenges with confidence and vision.',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
          cardBackground: '#f8f9fa',
          titleColor: '#1a1a2e',
          descColor: '#5a5a6e',
          labelColor: '#667eea',
          button: { text: 'Read More', color: '#667eea' }
        },
        {
          label: 'Strategy 3',
          title: 'Deliver Tailored Solutions',
          description: 'Create customized solutions that are specifically designed to meet your unique client needs, challenges, and opportunities for maximum impact.',
          image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
          cardBackground: '#f8f9fa',
          titleColor: '#1a1a2e',
          descColor: '#5a5a6e',
          labelColor: '#667eea',
          button: { text: 'Read More', color: '#667eea' }
        }
      ]
    }
  },
  {
    id: 'features-5',
    category: 'features',
    name: 'Features - AI Goals in Business',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    config: {
      type: 'features',
      layout: 'cards-dark',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)' },
      fullWidth: true,
      contentWidth: 1400,
      padding: { top: 100, bottom: 100 },
      columns: 3,
      title: { 
        text: 'AI Goals in Business', 
        show: true, 
        color: '#ffffff', 
        align: 'center',
        size: 48
      },
      description: { 
        text: 'Transform your business with artificial intelligence', 
        show: true, 
        color: 'rgba(255,255,255,0.7)', 
        align: 'center',
        size: 18
      },
      items: [
        {
          title: 'Enhancing Efficiency',
          description: 'Automate repetitive tasks and optimize workflows with AI-powered solutions.',
          icon: 'Sparkles',
          cardBackground: 'rgba(30, 30, 46, 0.8)',
          titleColor: '#ffffff',
          descColor: 'rgba(255,255,255,0.7)',
          iconBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          glowEffect: true,
          glowColor: 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)',
          button: { text: 'Learn More' }
        },
        {
          title: 'Improving Decision Making',
          description: 'Make data-driven decisions with advanced analytics and predictive insights.',
          icon: 'Brain',
          cardBackground: 'rgba(30, 30, 46, 0.8)',
          titleColor: '#ffffff',
          descColor: 'rgba(255,255,255,0.7)',
          iconBackground: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          glowEffect: true,
          glowColor: 'radial-gradient(circle, rgba(240,147,251,0.3) 0%, transparent 70%)',
          button: { text: 'Learn More' }
        },
        {
          title: 'Boosting Customer Experience',
          description: 'Personalize customer interactions and deliver exceptional service at scale.',
          icon: 'Users',
          cardBackground: 'rgba(30, 30, 46, 0.8)',
          titleColor: '#ffffff',
          descColor: 'rgba(255,255,255,0.7)',
          iconBackground: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          glowEffect: true,
          glowColor: 'radial-gradient(circle, rgba(79,172,254,0.3) 0%, transparent 70%)',
          button: { text: 'Learn More' }
        }
      ]
    }
  },
  {
    id: 'features-6',
    category: 'features',
    name: 'Features - Measurable Results',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    config: {
      type: 'features',
      layout: 'cards-dark',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' },
      fullWidth: true,
      contentWidth: 1400,
      padding: { top: 100, bottom: 100 },
      columns: 3,
      title: { 
        text: 'Stay Ahead with Accurate Measurable Results', 
        show: true, 
        color: '#ffffff', 
        align: 'center',
        size: 48
      },
      description: { 
        text: 'Track your progress with precision analytics', 
        show: true, 
        color: 'rgba(255,255,255,0.7)', 
        align: 'center',
        size: 18
      },
      items: [
        {
          title: 'Data Cleaning & Enrichment',
          description: 'Analyze your databases to discover inaccurate or incomplete records.',
          icon: 'Database',
          cardBackground: 'rgba(30, 30, 46, 0.9)',
          titleColor: '#ffffff',
          descColor: 'rgba(255,255,255,0.7)',
          iconBackground: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
          glowEffect: true,
          button: { text: 'Explore' }
        },
        {
          title: 'Real-Time Updates & Integration',
          description: 'Keep data synchronized with real-time updates and external sources.',
          icon: 'RefreshCw',
          cardBackground: 'rgba(30, 30, 46, 0.9)',
          titleColor: '#ffffff',
          descColor: 'rgba(255,255,255,0.7)',
          iconBackground: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          glowEffect: true,
          button: { text: 'Explore' }
        },
        {
          title: 'Custom Data Analytics',
          description: 'Create insightful data-driven reports tailored to your needs.',
          icon: 'BarChart3',
          cardBackground: 'rgba(30, 30, 46, 0.9)',
          titleColor: '#ffffff',
          descColor: 'rgba(255,255,255,0.7)',
          iconBackground: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
          glowEffect: true,
          button: { text: 'Explore' }
        }
      ]
    }
  }
];
