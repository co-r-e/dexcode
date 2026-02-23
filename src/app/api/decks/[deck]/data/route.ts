import { NextRequest, NextResponse } from "next/server";
import { loadDeck } from "@/lib/deck-loader";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ deck: string }> },
) {
  const { deck: deckName } = await params;

  try {
    const deck = await loadDeck(deckName);
    return NextResponse.json(deck);
  } catch {
    return NextResponse.json({ error: "Deck not found" }, { status: 404 });
  }
}
