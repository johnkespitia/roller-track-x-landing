import Script from "next/script";
import { BRAND } from "@/lib/constants";

export default function SchemaOrg() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com";

  return (
    <>
      {/* Schema.org - Organization */}
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
              "Eventos, comunidad y seguimiento deportivo para impulsar el talento del patinaje de velocidad.",
            sameAs: [
              // Agregar redes sociales cuando estén disponibles
            ],
          }),
        }}
      />
      {/* Schema.org - WebSite */}
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
              "Eventos, comunidad y seguimiento deportivo para impulsar el talento del patinaje de velocidad.",
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
