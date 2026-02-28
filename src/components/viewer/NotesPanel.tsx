"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { PanelRightClose } from "lucide-react";

function processInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={match.index} className="font-semibold text-gray-800">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={match.index}>{match[3]}</em>);
    } else if (match[4]) {
      parts.push(<code key={match.index} className="rounded bg-gray-100 px-1 py-0.5 text-xs">{match[4]}</code>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

function renderSimpleMarkdown(text: string): React.ReactNode[] {
  return text.split("\n").map((line, i) => {
    // Heading
    if (line.startsWith("# ")) {
      return <h3 key={i} className="mt-3 mb-1 text-sm font-semibold text-gray-800">{processInline(line.slice(2))}</h3>;
    }
    // List item
    if (line.startsWith("- ")) {
      return <div key={i} className="ml-3 before:content-['•'] before:mr-2 before:text-gray-400">{processInline(line.slice(2))}</div>;
    }
    // Empty line
    if (line.trim() === "") {
      return <div key={i} className="h-2" />;
    }
    // Regular text
    return <div key={i} className="whitespace-pre-wrap">{processInline(line)}</div>;
  });
}

interface NotesPanelProps {
  notes: string | undefined;
  isOpen: boolean;
  width: number;
  onToggle: () => void;
  resizeHandleProps: {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
}

export function NotesPanel({
  notes,
  isOpen,
  width,
  onToggle,
  resizeHandleProps,
}: NotesPanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when notes change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [notes]);

  if (!isOpen) return null;

  return (
    <aside className="relative flex h-full shrink-0" style={{ width }}>
      {/* Resize handle */}
      <div
        {...resizeHandleProps}
        className="absolute left-0 top-0 z-10 h-full w-3 -translate-x-1/2 cursor-col-resize transition-colors hover:bg-black/20"
      />

      {/* Panel body */}
      <div className="flex h-full w-full flex-col border-l border-gray-200 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <span className="text-sm font-semibold text-gray-700">Notes</span>
          <button
            onClick={onToggle}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close notes panel"
          >
            <PanelRightClose size={18} />
          </button>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto p-4">
          {notes ? (
            <div className="prose-notes text-sm leading-relaxed text-gray-600">
              {renderSimpleMarkdown(notes)}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No notes</p>
          )}
        </div>
      </div>
    </aside>
  );
}
