import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Smile } from 'lucide-react';
import { useState } from 'react';

interface CustomEmoji {
  id: string;
  native: string;
  name: string;
}

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  value?: string;
  className?: string;
  triggerClassName?: string;
}

export function EmojiPicker({
  onEmojiSelect,
  value,
  className,
  triggerClassName,
}: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (emoji: CustomEmoji) => {
    onEmojiSelect(emoji.native);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className={triggerClassName} type="button">
            {value ? <span className="text-xl">{value}</span> : <Smile className="h-5 w-5" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" side="right" align="start">
          <Picker
            data={data}
            onEmojiSelect={handleSelect}
            theme="light"
            set="native"
            showPreview={false}
            showSkinTones={false}
            emojiSize={22}
            emojiButtonSize={36}
            maxFrequentRows={0}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
