import type { WindowType } from '@/@types/module';
import type { XYCoord } from 'dnd-core';
import { BowArrow, Presentation } from 'lucide-react';
import type React from 'react';
import { useDragLayer } from 'react-dnd';

interface DragItem {
  index: number;
  id: string;
  type: WindowType;
}

function WindowPreview({
  type,
  position,
}: {
  type: WindowType;
  position: number;
}) {
  return (
    <div className="border-primary h-18 w-30 flex-shrink-0 rounded-md border-2 p-2 lg:h-24 lg:w-50">
      {type === 'PRESENTATION' && <Presentation className="text-primary" />}
      {type === 'EXERCISE' && <BowArrow className="text-primary" />}
      <span className="absolute bottom-0 left-2 lg:text-lg">{position}</span>
    </div>
  );
}

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(currentOffset: XYCoord | null) {
  if (!currentOffset) {
    return { display: 'none' };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x - 50}px, ${y - 48}px) rotate(-4deg) scale(1.05)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export const CustomDragLayer = () => {
  const { isDragging, item, currentOffset, itemType } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem<DragItem>(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  );

  if (!isDragging || itemType !== 'WINDOW') {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset)}>
        <WindowPreview type={item.type} position={item.index + 1} />
      </div>
    </div>
  );
};
