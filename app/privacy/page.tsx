import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-6 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <span className="text-base font-bold tracking-tight text-on-surface">
            DevLaunch
          </span>
        </Link>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-32 pt-8 md:px-8 md:pt-16">
        <div className="mb-12">
          <p className="mb-3 text-xs font-mono tracking-wider text-primary">
            LEGAL
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-on-surface-variant">
            Last updated: June 27, 2026
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-on-surface/80">
          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              DevLaunch accesses publicly available repository metadata from
              GitHub when you paste a repository URL. We clone the repository
              contents temporarily to perform analysis — this data is stored
              only for the duration of your session and automatically pruned
              within one hour.
            </p>
            <p>
              We do not collect personal information, login credentials, or
              private repository data. We do not use cookies, trackers, or
              analytics services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              2. How We Use Information
            </h2>
            <p className="mb-3">
              Repository data is used exclusively to generate the analysis
              results you request — structural maps, technology detection,
              code metrics, and AI-powered summaries and answers.
            </p>
            <p>
              AI-generated features (summaries, chat, README generation) send
              relevant file contents and metadata to a third-party LLM provider
              (Google Gemini). This data is transmitted only when you
              explicitly trigger one of these features.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              3. Data Retention
            </h2>
            <p className="mb-3">
              Cloned repositories and analysis results are stored in a
              temporary directory on the server. They are deleted when:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-on-surface/70">
              <li>You start a new analysis;</li>
              <li>You navigate back to the landing page;</li>
              <li>One hour has passed since the last modification; or</li>
              <li>The server is restarted.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              4. Third-Party Services
            </h2>
            <p className="mb-3">
              DevLaunch uses the following third-party services:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-on-surface/70">
              <li>
                <strong className="text-on-surface">GitHub API</strong> — to
                validate repository URLs and fetch metadata (public data only).
              </li>
              <li>
                <strong className="text-on-surface">Google Gemini API</strong>{" "}
                — to generate summaries, answer questions, and produce README
                content on demand.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              5. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              6. Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy, please open an
              issue at{" "}
              <a
                href="https://github.com/dan-seng/DevLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline transition-colors hover:text-primary/80"
              >
                github.com/dan-seng/DevLaunch
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-outline-variant/30 bg-surface-container-low">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 text-xs text-on-surface-variant/70 md:px-8">
          <span>&copy; {new Date().getFullYear()} DevLaunch</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-on-surface">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-on-surface">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
