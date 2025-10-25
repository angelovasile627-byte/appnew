import React from 'react';
import { MoveUp, MoveDown, Trash2 } from 'lucide-react';
import { MenuBlock } from './blocks/MenuBlock';
import { HeroBlock } from './blocks/HeroBlock';
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

export const BlockRenderer = ({ block, isSelected, onSelect, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const BlockComponent = blockComponents[block.config.type];

  if (!BlockComponent) {
    return <div>Unknown block type</div>;
  }

  return (
    <div
      className={`relative group ${
        isSelected ? 'ring-4 ring-indigo-500 ring-offset-2' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {isSelected && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 z-10 shadow-lg">
          {onMoveUp && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              className="p-1.5 hover:bg-gray-700 rounded transition-colors"
              title="Move Up"
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
              title="Move Down"
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
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
      <BlockComponent config={block.config} onUpdate={onUpdate} />
    </div>
  );
};