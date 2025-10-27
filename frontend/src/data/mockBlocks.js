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
    name: 'Features - Grid Layout',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    config: {
      type: 'features',
      background: { type: 'color', value: '#f9fafb' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      columns: 3,
      title: { text: 'Amazing Features', show: true, color: '#1a1a2e', align: 'center', size: 48 },
      description: { text: 'Everything you need to succeed', show: true, color: '#6B6B6B', align: 'center', size: 18 },
      items: [
        { title: 'Fast Performance', description: 'Lightning fast load times', icon: 'Zap', color: '#6366F1' },
        { title: 'Secure', description: 'Enterprise-grade security', icon: 'Lock', color: '#10B981' },
        { title: 'Scalable', description: 'Grows with your business', icon: 'TrendingUp', color: '#F59E0B' }
      ]
    }
  },
  {
    id: 'article-1',
    category: 'article',
    name: 'Article - Standard Layout',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
    config: {
      type: 'article',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 800,
      padding: { top: 60, bottom: 60 },
      title: { text: 'Article Title', show: true, color: '#1a1a2e', align: 'left', size: 36 },
      content: { text: 'Your article content goes here. Add your text, images, and formatting.', show: true, color: '#4a5568', align: 'left', size: 16 }
    }
  },
  {
    id: 'intro-1',
    category: 'intro',
    name: 'Intro - Simple',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    config: {
      type: 'intro',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 60, bottom: 60 },
      title: { text: 'Welcome', show: true, color: '#1a1a2e', align: 'center', size: 42 },
      description: { text: 'Introduce your business or service', show: true, color: '#6B6B6B', align: 'center', size: 18 }
    }
  },
  {
    id: 'cta-1',
    category: 'cta',
    name: 'Call to Action - Centered',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    config: {
      type: 'cta',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      fullWidth: true,
      contentWidth: 1000,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Ready to get started?', show: true, color: '#ffffff', align: 'center', size: 42 },
      description: { text: 'Join thousands of satisfied customers', show: true, color: '#ffffff', align: 'center', size: 18 },
      button: { text: 'Get Started Now', show: true, color: '#ffffff', textColor: '#667eea', link: '#' }
    }
  },
  {
    id: 'gallery-1',
    category: 'gallery',
    name: 'Gallery - Grid',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
    config: {
      type: 'gallery',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 60, bottom: 60 },
      title: { text: 'Gallery', show: true, color: '#1a1a2e', align: 'center', size: 42 },
      images: [
        { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop', alt: 'Image 1' },
        { src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop', alt: 'Image 2' },
        { src: 'https://images.unsplash.com/photo-1618004912476-29818d81ae2e?w=400&h=300&fit=crop', alt: 'Image 3' }
      ]
    }
  },
  {
    id: 'testimonial-1',
    category: 'testimonial',
    name: 'Testimonials - Cards',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
    config: {
      type: 'testimonial',
      background: { type: 'color', value: '#f9fafb' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'What Our Clients Say', show: true, color: '#1a1a2e', align: 'center', size: 42 },
      items: [
        { text: 'Amazing service! Highly recommended.', author: 'John Doe', role: 'CEO, Company', avatar: 'https://i.pravatar.cc/150?img=1', rating: 5 },
        { text: 'The best decision we ever made.', author: 'Jane Smith', role: 'Founder, Startup', avatar: 'https://i.pravatar.cc/150?img=2', rating: 5 }
      ]
    }
  },
  {
    id: 'contact-1',
    category: 'contact',
    name: 'Contact Form',
    thumbnail: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=300&fit=crop',
    config: {
      type: 'contact',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 800,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Get in Touch', show: true, color: '#1a1a2e', align: 'center', size: 42 },
      description: { text: 'We\'d love to hear from you', show: true, color: '#6B6B6B', align: 'center', size: 18 },
      fields: [
        { type: 'text', label: 'Name', placeholder: 'Your name', required: true },
        { type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
        { type: 'textarea', label: 'Message', placeholder: 'Your message', required: true }
      ],
      button: { text: 'Send Message', color: '#6366F1', textColor: '#ffffff' }
    }
  },
  {
    id: 'pricing-1',
    category: 'pricing',
    name: 'Pricing - Three Tiers',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    config: {
      type: 'pricing',
      background: { type: 'color', value: '#f9fafb' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Simple Pricing', show: true, color: '#1a1a2e', align: 'center', size: 42 },
      plans: [
        { name: 'Basic', price: '$9', period: '/month', features: ['Feature 1', 'Feature 2'], buttonText: 'Get Started', highlighted: false },
        { name: 'Pro', price: '$29', period: '/month', features: ['Everything in Basic', 'Feature 3', 'Feature 4'], buttonText: 'Get Started', highlighted: true },
        { name: 'Enterprise', price: '$99', period: '/month', features: ['Everything in Pro', 'Feature 5', 'Priority Support'], buttonText: 'Contact Us', highlighted: false }
      ]
    }
  },
  {
    id: 'footer-1',
    category: 'footer',
    name: 'Footer - Multi Column',
    thumbnail: 'https://images.unsplash.com/photo-1586339277861-b0b1562ce4ec?w=400&h=300&fit=crop',
    config: {
      type: 'footer',
      background: { type: 'color', value: '#1a1a2e' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 60, bottom: 40 },
      columns: [
        { title: 'Company', links: [{ text: 'About', url: '#' }, { text: 'Careers', url: '#' }] },
        { title: 'Resources', links: [{ text: 'Blog', url: '#' }, { text: 'Help Center', url: '#' }] },
        { title: 'Legal', links: [{ text: 'Privacy', url: '#' }, { text: 'Terms', url: '#' }] }
      ],
      copyright: { text: '© 2024 Your Company. All rights reserved.', color: '#9ca3af' }
    }
  },
  {
    id: 'team-1',
    category: 'team',
    name: 'Team - Grid',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    config: {
      type: 'team',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Meet Our Team', show: true, color: '#1a1a2e', align: 'center', size: 42 },
      members: [
        { name: 'John Doe', role: 'CEO', image: 'https://i.pravatar.cc/300?img=11', bio: 'Leading the company vision' },
        { name: 'Jane Smith', role: 'CTO', image: 'https://i.pravatar.cc/300?img=12', bio: 'Tech innovation expert' },
        { name: 'Mike Johnson', role: 'Designer', image: 'https://i.pravatar.cc/300?img=13', bio: 'Creating beautiful experiences' }
      ]
    }
  },
  {
    id: 'stats-1',
    category: 'stats',
    name: 'Stats - Counters',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    config: {
      type: 'stats',
      background: { type: 'color', value: '#6366F1' },
      fullWidth: true,
      contentWidth: 1200,
      padding: { top: 60, bottom: 60 },
      stats: [
        { number: '10K+', label: 'Happy Customers', color: '#ffffff' },
        { number: '50+', label: 'Team Members', color: '#ffffff' },
        { number: '99%', label: 'Satisfaction Rate', color: '#ffffff' }
      ]
    }
  },
  {
    id: 'faq-1',
    category: 'faq',
    name: 'FAQ - Accordion',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    config: {
      type: 'faq',
      background: { type: 'color', value: '#ffffff' },
      fullWidth: true,
      contentWidth: 800,
      padding: { top: 80, bottom: 80 },
      title: { text: 'Frequently Asked Questions', show: true, color: '#1a1a2e', align: 'center', size: 42 },
      questions: [
        { question: 'How does it work?', answer: 'Simply sign up and get started in minutes.' },
        { question: 'What is included?', answer: 'All features are included in every plan.' },
        { question: 'Can I cancel anytime?', answer: 'Yes, you can cancel your subscription at any time.' }
      ]
    }
  }
];
