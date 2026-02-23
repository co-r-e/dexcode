import { loadDeck } from "@/lib/deck-loader";
import { PresenterView } from "@/components/presenter/PresenterView";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PresenterPageProps {
  params: Promise<{ deck: string }>;
}

export default async function PresenterPage({ params }: PresenterPageProps) {
  const { deck: deckName } = await params;

  let deck;
  try {
    deck = await loadDeck(deckName);
  } catch (e) {
    console.error(`[nipry] Failed to load deck "${deckName}":`, e instanceof Error ? e.message : e);
    notFound();
  }

  return <PresenterView deck={deck} />;
}
