"use client";

import { useState } from "react";
import Link from "next/link";

interface ActionItem {
  owner: string;
  task: string;
  due: string;
}

const PLACEHOLDER_TRANSCRIPT = `Sarah will draft the API deprecation email by Thursday.
@marcus needs to share the RFC deck with the team before Friday.
Let's have John review the security audit next Monday.
The design team will update the mockups — @priya is the lead.
We should schedule a follow-up meeting next week.`;

const MOCK_DUE_DATES = ["Thursday", "Friday", "Next Monday", "EOD Friday", "Next sprint"];

function extractOwner(line: string): string | null {
  // Match "@name" pattern
  const atMatch = line.match(/@([A-Za-z][A-Za-z0-9_-]*)/);
  if (atMatch) return atMatch[1];

  // Match "X will" pattern — grab the first word(s) before "will"
  const willMatch = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+will\b/);
  if (willMatch) return willMatch[1];

  // Match "have NAME" pattern
  const haveMatch = line.match(/\bhave\s+([A-Z][a-z]+)\s+/);
  if (haveMatch) return haveMatch[1];

  return null;
}

function extractTask(line: string): string {
  // Strip leading owner mentions and "will/needs to/should" to get the core task
  return line
    .replace(/^@[A-Za-z][A-Za-z0-9_-]*\s+(needs to|will|should)?\s*/i, "")
    .replace(/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\s+(will|needs to|should)\s*/i, "")
    .replace(/\b(by|before|next|on)\s+(Thursday|Friday|Monday|Tuesday|Wednesday|Saturday|Sunday|next\s+\w+|EOD\s+\w+)/gi, "")
    .replace(/\.\s*$/, "")
    .trim();
}

function parseTranscript(transcript: string): ActionItem[] {
  const lines = transcript
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const items: ActionItem[] = [];

  for (const line of lines) {
    const owner = extractOwner(line);
    if (!owner) continue;

    const task = extractTask(line);
    if (!task || task.length < 5) continue;

    // Try to detect due date in line
    const dueMatch = line.match(
      /\b(by|before|next|on)\s+(Thursday|Friday|Monday|Tuesday|Wednesday|Saturday|Sunday|next\s+\w+|EOD\s+\w+)/i
    );
    const due = dueMatch
      ? dueMatch[0].replace(/^(by|before|on)\s+/i, "").trim()
      : MOCK_DUE_DATES[items.length % MOCK_DUE_DATES.length];

    items.push({ owner, task, due });

    if (items.length === 3) break; // Always return exactly 3 mocked items
  }

  // Pad to 3 if fewer were detected
  const fallbacks: ActionItem[] = [
    { owner: "Team", task: "Review action items from this meeting", due: "End of week" },
    { owner: "Owner", task: "Send meeting summary to stakeholders", due: "Tomorrow" },
    { owner: "Lead", task: "Schedule follow-up session", due: "Next week" },
  ];

  while (items.length < 3) {
    items.push(fallbacks[items.length]);
  }

  return items.slice(0, 3);
}

export default function TryPage() {
  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState<ActionItem[] | null>(null);
  const [email, setEmail] = useState("");
  const [waitlistDone, setWaitlistDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = transcript.trim() || PLACEHOLDER_TRANSCRIPT;
    setResults(parseTranscript(text));
  }

  function handleReset() {
    setResults(null);
    setTranscript("");
  }

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setWaitlistDone(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
          Followy
        </Link>
        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900">
          ← Back
        </Link>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="text-center mb-10">
          <p className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700">
            Demo
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Extract action items from a meeting transcript
          </h1>
          <p className="mt-3 text-neutral-500">
            Paste a transcript and Followy will detect owners and tasks automatically.
          </p>
        </div>

        {!results ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="transcript"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Meeting transcript
              </label>
              <textarea
                id="transcript"
                rows={10}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder={PLACEHOLDER_TRANSCRIPT}
                className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm leading-relaxed placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 resize-none"
              />
              <p className="mt-1 text-xs text-neutral-400">
                Detects owners via <code className="font-mono">X will</code> and{" "}
                <code className="font-mono">@name</code> patterns. Leave blank to use the example.
              </p>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-neutral-900 py-3.5 font-medium text-white transition hover:bg-neutral-700"
            >
              Extract action items
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-4">
                Action items detected · {results.length} found
              </div>
              <div className="grid gap-3">
                {results.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-neutral-200 p-4 flex items-start gap-3"
                  >
                    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-orange-500 text-center text-xs leading-5 text-white">
                      ✓
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{item.task}</div>
                      <div className="mt-1 text-xs text-neutral-500">
                        Owner: <span className="text-orange-600 font-medium">@{item.owner}</span>
                        {" · "}Due: {item.due}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
              <p className="text-sm font-semibold text-neutral-900">
                Want Followy to do this automatically — in every meeting?
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Join the waitlist and be first to know when we launch.
              </p>
              {!waitlistDone ? (
                <form
                  onSubmit={handleWaitlist}
                  className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center"
                >
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-64"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
                  >
                    Join waitlist
                  </button>
                </form>
              ) : (
                <p className="mt-4 text-sm font-medium text-orange-700">
                  You're on the list. We'll be in touch.
                </p>
              )}
            </div>

            <button
              onClick={handleReset}
              className="w-full rounded-full border border-neutral-300 py-3 text-sm font-medium text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              Try another transcript
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
