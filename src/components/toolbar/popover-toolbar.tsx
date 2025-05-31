import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import React from 'react';
import { Button } from '../ui/button';

export default function PopoverToolbar({
  trigger,
  children,
  ...props
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  props?: any;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild {...props}>
        <Button variant="ghost" type="button">
          {trigger}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">{children}</PopoverContent>
    </Popover>
  );
}
