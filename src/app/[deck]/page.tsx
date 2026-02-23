import { loadDeck } from "@/lib/deck-loader";
import { SlideViewer } from "@/components/viewer/SlideViewer";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface DeckPageProps {
  params: Promise<{ deck: string }>;
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { deck: deckName } = await params;

  let deck;
  try {
    deck = await loadDeck(deckName);
  } catch (e) {
    console.error(`[nipry] Failed to load deck "${deckName}":`, e instanceof Error ? e.message : e);
    notFound();
  }

  return <SlideViewer deck={deck} />;
}
