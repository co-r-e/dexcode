"use client";

import Link from "next/link";
import { ArrowLeft, Monitor } from "lucide-react";
import type { Deck } from "@/types/deck";
import { SlideThumbnail } from "./SlideThumbnail";

interface SidebarProps {
  deck: Deck;
  currentSlide: number;
  onSlideSelect: (index: number) => void;
  onPresenterMode: () => void;
}

export function Sidebar({
  deck,
  currentSlide,
  onSlideSelect,
  onPresenterMode,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-gray-200 p-4">
        <h1 className="text-sm font-semibold text-gray-900 truncate">
          {deck.config.title}
        </h1>
        <div className="flex gap-2">
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg border border-gray-200 px-2 py-2 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft size={14} className="text-gray-600" />
          </Link>
          <button
            onClick={onPresenterMode}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#02001A] px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-80"
          >
            <Monitor size={14} />
            Presenter Mode
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-2">
          {deck.slides.map((slide) => (
            <SlideThumbnail
              key={slide.index}
              slide={slide}
              config={deck.config}
              deckName={deck.name}
              active={slide.index === currentSlide}
              onClick={() => onSlideSelect(slide.index)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 p-3 text-center text-xs text-gray-400">
        {currentSlide + 1} / {deck.slides.length}
      </div>
    </aside>
  );
}
