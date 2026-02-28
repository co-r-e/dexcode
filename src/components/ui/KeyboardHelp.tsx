"use client";

import { Modal } from "./Modal";

interface KeyboardHelpProps {
  open: boolean;
  onClose: () => void;
}

const SHORTCUTS: { key: string; description: string }[] = [
  { key: "\u2192 / \u2193", description: "Next slide" },
  { key: "\u2190 / \u2191", description: "Previous slide" },
  { key: "Space / Enter", description: "Next slide" },
  { key: "Home", description: "First slide" },
  { key: "End", description: "Last slide" },
  { key: "f", description: "Toggle fullscreen" },
  { key: "Esc", description: "Exit fullscreen" },
  { key: "?", description: "Show this help" },
];

export function KeyboardHelp({ open, onClose }: KeyboardHelpProps) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Keyboard Shortcuts">
      <div className="w-80">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">
          Keyboard Shortcuts
        </h2>
        <div className="space-y-2">
          {SHORTCUTS.map(({ key, description }) => (
            <div key={key} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{description}</span>
              <kbd className="rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-700">
                {key}
              </kbd>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
