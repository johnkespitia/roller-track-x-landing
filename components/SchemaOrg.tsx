import Script from "next/script";
import { BRAND } from "@/lib/constants";

export default function SchemaOrg() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com";

  return (
    <>
      <Script
        id="schema-org-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: BRAND.name,
            alternateName: "RTX",
            url: baseUrl,
            logo: `${baseUrl}/images/logo/logo-horizontal.png`,
            description:
              "El ecosistema digital del patinaje de velocidad. Comunidad, tecnología y eventos que conectan deportistas, escuelas, entrenadores y patrocinadores.",
            sameAs: [],
          }),
        }}
      />
      <Script
        id="schema-org-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: BRAND.name,
            url: baseUrl,
            description:
              "El ecosistema digital del patinaje de velocidad. Comunidad, tecnología y eventos que conectan deportistas, escuelas, entrenadores y patrocinadores.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/search?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </>
  );
}
