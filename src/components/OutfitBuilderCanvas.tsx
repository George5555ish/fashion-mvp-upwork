import { useState, type DragEvent } from 'react';
import { X } from 'lucide-react';
import type { ClosetItem } from '../services/api';
import { getClosetItemImageSrc } from '../utils/imageUrls';

const DRAG_TYPE = 'outfind/closet-item';

interface OutfitBuilderCanvasProps {
  items: ClosetItem[];
  paletteItems?: ClosetItem[];
  canvasItemIds: string[];
  onCanvasChange: (itemIds: string[]) => void;
  onEditItem?: (item: ClosetItem) => void;
}

export default function OutfitBuilderCanvas({
  items,
  paletteItems,
  canvasItemIds,
  onCanvasChange,
  onEditItem,
}: OutfitBuilderCanvasProps) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const closetItems = paletteItems ?? items;

  const canvasItems = canvasItemIds
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is ClosetItem => Boolean(item));

  const addItemToCanvas = (itemId: string) => {
    if (canvasItemIds.includes(itemId)) {
      return;
    }
    onCanvasChange([...canvasItemIds, itemId]);
  };

  const removeFromCanvas = (itemId: string) => {
    onCanvasChange(canvasItemIds.filter((id) => id !== itemId));
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex > canvasItemIds.length) {
      return;
    }

    const next = [...canvasItemIds];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    onCanvasChange(next);
  };

  const handleCanvasDrop = (event: DragEvent, dropIndex?: number) => {
    event.preventDefault();
    setDragOverIndex(null);

    const itemId = event.dataTransfer.getData(DRAG_TYPE);
    if (!itemId) {
      return;
    }

    const fromIndex = canvasItemIds.indexOf(itemId);
    if (fromIndex >= 0) {
      const targetIndex = dropIndex ?? canvasItemIds.length;
      moveItem(fromIndex, targetIndex > fromIndex ? targetIndex - 1 : targetIndex);
      return;
    }

    if (dropIndex === undefined) {
      addItemToCanvas(itemId);
      return;
    }

    const next = [...canvasItemIds];
    next.splice(dropIndex, 0, itemId);
    onCanvasChange(next);
  };

  return (
    <div className="space-y-6">
      <div
        className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 min-h-[280px]"
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
        }}
        onDrop={(event) => handleCanvasDrop(event)}
      >
        <h2 className="text-sm font-medium text-gray-700 mb-4">Drag pieces here to build your outfit</h2>

        {canvasItems.length === 0 ? (
          <div className="flex items-center justify-center h-44 text-gray-400 text-sm text-center px-4">
            Drag items from your closet below into this area
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {canvasItems.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData(DRAG_TYPE, item.id);
                  event.dataTransfer.effectAllowed = 'move';
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOverIndex(index);
                }}
                onDragLeave={() => setDragOverIndex(null)}
                onDrop={(event) => {
                  event.stopPropagation();
                  handleCanvasDrop(event, index);
                }}
                className={`relative rounded-lg overflow-hidden border bg-gray-50 cursor-grab active:cursor-grabbing ${
                  dragOverIndex === index ? 'border-gray-900 ring-2 ring-gray-900' : 'border-gray-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => removeFromCanvas(item.id)}
                  className="absolute top-2 right-2 z-10 rounded-full bg-white/90 p-1 text-gray-600 hover:text-red-600 shadow"
                  aria-label={`Remove ${item.name}`}
                >
                  <X size={14} />
                </button>
                <img
                  src={getClosetItemImageSrc(item)}
                  alt={item.name}
                  className="w-full aspect-square object-cover pointer-events-none"
                />
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-900 line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-gray-500 capitalize">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm font-medium text-gray-700 mb-3">Your closet</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {closetItems.map((item) => {
            const onCanvas = canvasItemIds.includes(item.id);
            return (
              <div
                key={item.id}
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData(DRAG_TYPE, item.id);
                  event.dataTransfer.effectAllowed = 'move';
                }}
                className={`rounded-xl overflow-hidden border text-left transition-all cursor-grab active:cursor-grabbing ${
                  onCanvas ? 'border-gray-900 opacity-70' : 'border-gray-200 bg-white hover:border-gray-400'
                }`}
              >
                <img
                  src={getClosetItemImageSrc(item)}
                  alt={item.name}
                  className="w-full aspect-square object-cover pointer-events-none"
                />
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                  {onEditItem && (
                    <button
                      type="button"
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.stopPropagation();
                        onEditItem(item);
                      }}
                      className="mt-2 text-xs text-gray-700 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
