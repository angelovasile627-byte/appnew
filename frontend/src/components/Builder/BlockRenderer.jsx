import React from 'react';
import { MoveUp, MoveDown, Trash2 } from 'lucide-react';
import { MenuBlock } from './blocks/MenuBlock';
import { HeroBlock } from './blocks/HeroBlock';
import { HeroParallaxBlock } from './blocks/HeroParallaxBlock';
import { FeaturesBlock } from './blocks/FeaturesBlock';
import { ArticleBlock } from './blocks/ArticleBlock';
import { IntroBlock } from './blocks/IntroBlock';
import { CTABlock } from './blocks/CTABlock';
import { GalleryBlock } from './blocks/GalleryBlock';
import { TestimonialBlock } from './blocks/TestimonialBlock';
import { ContactBlock } from './blocks/ContactBlock';
import { PricingBlock } from './blocks/PricingBlock';
import { FooterBlock } from './blocks/FooterBlock';
import { TeamBlock } from './blocks/TeamBlock';
import { StatsBlock } from './blocks/StatsBlock';
import { FAQBlock } from './blocks/FAQBlock';

const blockComponents = {
  menu: MenuBlock,
  hero: HeroBlock,
  'hero-parallax': HeroParallaxBlock,
  features: FeaturesBlock,
  article: ArticleBlock,
  intro: IntroBlock,
  cta: CTABlock,
  gallery: GalleryBlock,
  testimonial: TestimonialBlock,
  contact: ContactBlock,
  pricing: PricingBlock,
  footer: FooterBlock,
  team: TeamBlock,
  stats: StatsBlock,
  faq: FAQBlock
};

export const BlockRenderer = ({ block, isSelected, onSelect, onUpdate, onDelete, onMoveUp, onMoveDown, selectedElementId, onSelectElement }) => {
  const BlockComponent = blockComponents[block.config.type];

  if (!BlockComponent) {
    return <div>Unknown block type</div>;
  }

  const isMenuBlock = block.config.type === 'menu';
  const isArticleBlock = block.config.type === 'article';
  
  return (
    <div
      className={`relative group ${
        isSelected ? 'ring-4 ring-indigo-500 ring-offset-2' : ''
      }`}
      onClick={(e) => {
        // Prevent selection if clicking on menu items, article elements, or interactive elements
        const target = e.target;
        const isMenuItemClick = target.closest('a') || target.closest('button');
        const isArticleElementClick = isArticleBlock && target.closest('[data-element-id]');
        
        if (!isMenuItemClick && !isArticleElementClick) {
          e.stopPropagation();
          onSelect();
        }
      }}
    >
      {isSelected && (
        <div className={`absolute ${isMenuBlock ? 'left-4 top-20' : 'left-4 top-1/2 -translate-y-1/2'} bg-gray-900 text-white p-2 rounded-lg flex flex-col items-center gap-2 z-[9999] shadow-xl border-2 border-indigo-500`}>
          {onMoveUp && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              className="p-1.5 hover:bg-gray-700 rounded transition-colors"
              title="Mută Sus"
            >
              <MoveUp className="w-4 h-4" />
            </button>
          )}
          {onMoveDown && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              className="p-1.5 hover:bg-gray-700 rounded transition-colors"
              title="Mută Jos"
            >
              <MoveDown className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 hover:bg-red-600 rounded transition-colors"
            title="Șterge"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
      <BlockComponent 
        config={block.config} 
        onUpdate={onUpdate}
        selectedElementId={selectedElementId}
        onSelectElement={onSelectElement}
      />
    </div>
  );
};