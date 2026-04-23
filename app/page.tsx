"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: UX stays happy even if network fails.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
          Followy
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:border-neutral-900 hidden sm:inline-block"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-orange-100 via-orange-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700">
            Productivity
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Meetings that actually ship.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            An AI teammate that joins every call, files Jira tickets, Slacks the follow-ups, and books the next meeting.
          </p>

          {!submitted ? (
            <form
              id="waitlist"
              onSubmit={handleWaitlist}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
              >
                Join the waitlist
              </button>
            </form>
          ) : (
            <p className="mt-12 text-sm font-medium text-orange-700">
              Thanks. We will ping you the day we launch.
            </p>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                Meeting: Q2 launch sync · 42 min
              </div>
              <div className="mt-4 grid gap-3">
                <div className="rounded-xl border border-neutral-200 p-4 flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-orange-500 text-center text-xs leading-5 text-white">
                    ✓
                  </span>
                  <div className="flex-1">
                    <div className="text-sm">
                      Created Jira ticket{" "}
                      <span className="font-mono text-xs text-orange-600">LAUNCH-402</span>: draft
                      API deprecation email
                    </div>
                    <div className="mt-1 text-xs text-neutral-500">
                      Assigned to @priya · due Thursday
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4 flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-orange-500 text-center text-xs leading-5 text-white">
                    ✓
                  </span>
                  <div className="flex-1">
                    <div className="text-sm">
                      Sent follow-up to @marcus with link to the RFC deck
                    </div>
                    <div className="mt-1 text-xs text-neutral-500">Slack DM · 2 min ago</div>
                  </div>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4 flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-orange-500 text-center text-xs leading-5 text-white">
                    ✓
                  </span>
                  <div className="flex-1">
                    <div className="text-sm">
                      Scheduled follow-up meeting Friday 2pm · sent invites
                    </div>
                    <div className="mt-1 text-xs text-neutral-500">Google Calendar</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-t border-neutral-100 pt-4">
                <Link
                  href="/try"
                  className="text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  Try it with your own transcript →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">🎙️</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Joins every call</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Zoom, Meet, Teams. No plugins, no prompts, no fuss.
              </p>
            </div>
            <div>
              <div className="text-3xl">✅</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Takes action, not notes</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Creates tickets, sends follow-ups, schedules next steps automatically.
              </p>
            </div>
            <div>
              <div className="text-3xl">🔗</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Connects to your stack</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Jira, Linear, Notion, Slack, Gmail. All wired up on day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Connect your tools</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Gmail, Zoom, Slack, Jira. Two-click OAuth and you're in.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight">We watch and learn</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Your style, your priorities, your team's rhythm. We adapt to you.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Get hours back</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Average user saves 6 hours a week in the first month. You'll see your number.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the
          doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-orange-600 px-7 py-3.5 font-medium text-white transition hover:bg-orange-700"
        >
          Reserve my spot
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
            Followy
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}
