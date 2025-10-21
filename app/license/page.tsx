import fs from "fs";
import path from "path";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

// Read LICENSE at build/server time so the content is embedded in production builds.
const licensePath = path.join(process.cwd(), "LICENSE");
let licenseText = "";
try {
  licenseText = fs.readFileSync(licensePath, "utf8");
} catch {
  licenseText = "LICENSE file not found in repository root.";
}

export default function LicensePage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto max-w-3xl px-6 md:px-8">
        <h1 className="text-3xl font-bold mb-6">License & Notice</h1>

        <p className="text-sm text-zinc-300 mb-4">
          Copyright (c) {currentYear} {siteConfig.name}. Created by Sebastian
          Lui. All Rights Reserved.
        </p>

        <p className="text-sm text-zinc-300 leading-relaxed mb-6">
          Die folgenden Lizenzinformationen stammen direkt aus der Datei{" "}
          <code>LICENSE</code> im Projekt-Root and werden automatisch in
          production gebündelt. Diese Seite dient als rechtlicher Nachweis und
          sollte in Produktion verfügbar bleiben.
        </p>

        <div className="bg-zinc-900 rounded-md p-6 mb-6">
          <pre className="whitespace-pre-wrap text-sm text-zinc-200">
            {licenseText}
          </pre>
        </div>

        <div className="mt-4">
          <Link href="/" className="text-sm text-zinc-200 hover:text-white">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
