import Link from "next/link";
import type { DeckSummary } from "@/types/deck";
import { ExportButton } from "./ExportButton";

interface DeckGridProps {
  decks: DeckSummary[];
}

export function DeckGrid({ decks }: DeckGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => (
        <div
          key={deck.name}
          className="group relative rounded-xl bg-white border-2 border-transparent transition-colors hover:border-[#02001A]"
        >
          <Link href={`/${deck.name}`} className="block p-6">
            <div className="mb-4 aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-300">
                {deck.title.charAt(0)}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#02001A]">
              {deck.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {deck.slideCount} slides
            </p>
          </Link>

          <div className="absolute top-4 right-4 z-10">
            <ExportButton deckName={deck.name} />
          </div>
        </div>
      ))}
    </div>
  );
}
