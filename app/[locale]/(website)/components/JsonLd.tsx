/**
 * JsonLd — Server Component
 *
 * Renders one or more JSON-LD <script> blocks.
 * Pass a single schema object or an array of them.
 *
 * Usage:
 *   import JsonLd from "@/app/[locale]/(website)/components/JsonLd";
 *   <JsonLd data={buildOrganization()} />
 *   <JsonLd data={[buildWebPage(...), buildBreadcrumb(...)]} />
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const schemas = Array.isArray(data) ? data : [data];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Safe: all values come from our own builder functions (no user input)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
