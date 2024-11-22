'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Bold, Code, Heading, Italic, Link, List, SaveAll } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface MarkdownEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  onSave?: () => void;
  placeholder?: string;
  minHeight?: string;
  isSaving?: boolean;
}

const shortcuts = [
  { icon: Bold, label: 'Bold', action: '**text**', shortcut: 'Ctrl+B' },
  { icon: Italic, label: 'Italic', action: '*text*', shortcut: 'Ctrl+I' },
  { icon: List, label: 'List', action: '- ', shortcut: 'Ctrl+L' },
  { icon: Heading, label: 'Heading', action: '# ', shortcut: 'Ctrl+H' },
  { icon: Link, label: 'Link', action: '[text](url)', shortcut: 'Ctrl+K' },
  { icon: Code, label: 'Code', action: '```\ncode\n```', shortcut: 'Ctrl+`' },
];

export function MarkdownEditor({
  initialValue,
  onChange,
  onSave,
  placeholder,
  minHeight = '500px',
  isSaving = false,
}: MarkdownEditorProps) {
  const [content, setContent] = useState(initialValue);
  const [debouncedContent] = useDebounce(content, 1000);

  useEffect(() => {
    onChange(debouncedContent);
  }, [debouncedContent, onChange]);

  const insertShortcut = useCallback((action: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    let newText = '';
    let newCursorPos = 0;

    if (action === '# ' || action === '- ') {
      newText = before + action + selected + after;
      newCursorPos = start + action.length + selected.length;
    } else if (action.includes('text')) {
      const replaceText = selected || 'text';
      newText = before + action.replace('text', replaceText) + after;
      newCursorPos = start + action.length;
    } else {
      newText = before + action + after;
      newCursorPos = start + action.length;
    }

    setContent(newText);
    textarea.focus();
    setTimeout(() => {
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, []);

  return (
    <Card className="w-full">
      <div className="border-b p-2 flex items-center gap-1">
        <TooltipProvider>
          {shortcuts.map(({ icon: Icon, label, action, shortcut }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertShortcut(action)}
                  className="h-8 w-8 p-0"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {label} ({shortcut})
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
          <div className="ml-auto">
            {onSave && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSave}
                disabled={isSaving}
                className="gap-2"
              >
                <SaveAll className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            )}
          </div>
        </TooltipProvider>
      </div>
      <textarea
        className="w-full p-4 focus:outline-none resize-none font-mono"
        style={{ minHeight }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
      />
    </Card>
  );
}
