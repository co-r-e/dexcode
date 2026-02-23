"use client";

import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import {
  useState,
  useEffect,
  useRef,
  Component,
  type ReactNode,
  type ErrorInfo,
} from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { MDXComponents } from "mdx/types";

function MDXErrorDisplay({ title, message }: { title: string; message: string }) {
  return (
    <div className="p-4 text-red-600 bg-red-50 rounded text-xl font-mono">
      <p className="font-bold">{title}</p>
      <pre className="mt-2 whitespace-pre-wrap text-base">{message}</pre>
    </div>
  );
}

class MDXErrorBoundary extends Component<
  { children: ReactNode },
  { error: string | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[nipry] MDX render error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return <MDXErrorDisplay title="MDX Render Error" message={this.state.error} />;
    }
    return this.props.children;
  }
}

interface MDXRendererProps {
  source: string;
  components?: MDXComponents;
}

export function MDXRenderer({ source, components = {} }: MDXRendererProps) {
  const [content, setContent] = useState<ReactNode>(null);
  const [error, setError] = useState<string | null>(null);
  const componentsRef = useRef(components);
  componentsRef.current = components;

  useEffect(() => {
    let cancelled = false;

    // Reset to loading state so export capture waits for the new content
    setContent(null);
    setError(null);

    async function render() {
      try {
        const { default: MDXContent } = await evaluate(source, {
          ...(runtime as Parameters<typeof evaluate>[1]),
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeKatex],
        });

        if (!cancelled) {
          setContent(<MDXContent components={componentsRef.current} />);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "MDX compile error";
          console.error("[nipry] MDX compile error:", e);
          setError(msg);
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [source]);

  function resolveStatus(): "error" | "loading" | "ready" {
    if (error) return "error";
    if (content === null) return "loading";
    return "ready";
  }

  return (
    <div data-mdx-status={resolveStatus()}>
      {error ? (
        <MDXErrorDisplay title="MDX Error" message={error} />
      ) : (
        <MDXErrorBoundary>{content}</MDXErrorBoundary>
      )}
    </div>
  );
}
