import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-on-surface-variant">
            Last updated: June 27, 2026
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-on-surface/80">
          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              1. Acceptance of Terms
            </h2>
            <p>
              By using DevLaunch, you agree to these Terms of Service. If you
              do not agree, do not use the service. These terms may be updated
              at any time; continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              2. Service Description
            </h2>
            <p className="mb-3">
              DevLaunch is a web-based tool that analyzes public GitHub
              repositories and provides structural, technological, and
              AI-generated insights. The service is provided &quot;as is&quot;
              without warranty of any kind.
            </p>
            <p>
              Analysis results are generated automatically and may contain
              errors. AI-generated content (summaries, chat answers, READMEs)
              should be reviewed before being relied upon.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              3. Acceptable Use
            </h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc space-y-1 pl-5 text-on-surface/70">
              <li>
                Use DevLaunch to analyze private repositories without proper
                authorization;
              </li>
              <li>
                Submit URLs to malware, illegal content, or otherwise malicious
                repositories;
              </li>
              <li>
                Attempt to circumvent rate limits, access controls, or any
                security mechanisms;
              </li>
              <li>
                Use the service in any way that violates applicable law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              4. Intellectual Property
            </h2>
            <p>
              DevLaunch does not claim ownership over any repository content
              you analyze. All repository code and data remain the property of
              their respective owners. The DevLaunch platform, its code, and
              its branding are the property of the DevLaunch project.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              5. Limitation of Liability
            </h2>
            <p>
              DevLaunch is provided free of charge and without warranty. In no
              event shall the project contributors be liable for any damages
              arising from the use or inability to use the service, including
              but not limited to data loss or business interruption.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              6. Third-Party Services
            </h2>
            <p>
              DevLaunch relies on the GitHub API and Google Gemini API. Your
              use of these services is subject to their respective terms of
              service. We are not responsible for the availability, accuracy,
              or functionality of these third-party services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              7. Governing Law
            </h2>
            <p>
              These terms are governed by applicable law. Any disputes shall
              be resolved in the courts of the jurisdiction in which the
              project maintainer resides.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold tracking-tight text-on-surface">
              8. Contact
            </h2>
            <p>
              For questions about these terms, open an issue at{" "}
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
