import { listDecks } from "@/lib/deck-loader";
import { DeckGrid } from "@/components/deck-list/DeckGrid";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const decks = await listDecks();

  return (
    <div className="min-h-screen p-8">
      <header className="mb-12 flex items-center gap-4">
        <Image
          src="/nipry-logo.svg"
          alt="nipry"
          width={171}
          height={49}
          priority
        />
      </header>
      <main>
        {decks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-xl text-gray-500 mb-4">
              No decks found
            </p>
            <p className="text-sm text-gray-400">
              Add MDX files to the{" "}
              <code className="bg-gray-200 px-2 py-1 rounded">decks/</code>{" "}
              directory
            </p>
          </div>
        ) : (
          <DeckGrid decks={decks} />
        )}
      </main>
    </div>
  );
}
