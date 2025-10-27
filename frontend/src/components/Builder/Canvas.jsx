import React from 'react';
import { BlockRenderer } from './BlockRenderer';

export const Canvas = ({ blocks, selectedBlockId, onSelectBlock, onUpdateBlock, onDeleteBlock, onMoveBlock, selectedBlockRef, selectedElementId, onSelectElement }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 h-full">
      <div className="min-h-full">
        {blocks.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Start Building Your Website</h2>
              <p className="text-gray-600">Click blocks from the sidebar to get started</p>
            </div>
          </div>
        ) : (
          <div className="pb-20">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                ref={selectedBlockId === block.id ? selectedBlockRef : null}
              >
                <BlockRenderer
                  block={block}
                  isSelected={selectedBlockId === block.id}
                  onSelect={() => onSelectBlock(block.id)}
                  onUpdate={(config) => onUpdateBlock(block.id, config)}
                  onDelete={() => onDeleteBlock(block.id)}
                  onMoveUp={index > 0 ? () => onMoveBlock(index, index - 1) : null}
                  onMoveDown={index < blocks.length - 1 ? () => onMoveBlock(index, index + 1) : null}
                  selectedElementId={selectedElementId}
                  onSelectElement={onSelectElement}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};