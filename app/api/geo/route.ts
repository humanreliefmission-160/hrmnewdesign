import { NextRequest, NextResponse } from 'next/server';

export type GeoRegion = 'UK' | 'EU' | 'AMERICAS' | 'ASIA' | 'AUSTRALIA' | 'DEFAULT';

// EU member states + EEA
const EU_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // EEA non-EU
  'IS', 'LI', 'NO',
  // Other GDPR-equivalent
  'CH',
]);

const AMERICAS_COUNTRIES = new Set([
  'US', 'CA', 'MX', 'BR', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC',
  'BO', 'PY', 'UY', 'GY', 'SR', 'GF', 'CR', 'PA', 'GT', 'HN',
  'SV', 'NI', 'CU', 'DO', 'HT', 'JM', 'TT', 'BB', 'LC', 'VC',
  'GD', 'AG', 'DM', 'KN', 'BS', 'BZ',
]);

const ASIA_COUNTRIES = new Set([
  'CN', 'JP', 'KR', 'IN', 'TH', 'SG', 'TW', 'MY', 'ID', 'PH',
  'VN', 'BD', 'PK', 'LK', 'NP', 'MM', 'KH', 'LA', 'BN', 'MN',
  'KZ', 'UZ', 'AZ', 'GE', 'AM', 'HK', 'MO', 'QA', 'AE', 'SA',
  'KW', 'BH', 'OM', 'JO', 'IL', 'LB', 'TR', 'IQ', 'IR',
]);

const AUSTRALIA_COUNTRIES = new Set(['AU', 'NZ']);

function getRegion(countryCode: string | null): GeoRegion {
  if (!countryCode) return 'DEFAULT';
  const c = countryCode.toUpperCase();
  if (c === 'GB') return 'UK';
  if (EU_COUNTRIES.has(c)) return 'EU';
  if (AMERICAS_COUNTRIES.has(c)) return 'AMERICAS';
  if (ASIA_COUNTRIES.has(c)) return 'ASIA';
  if (AUSTRALIA_COUNTRIES.has(c)) return 'AUSTRALIA';
  return 'DEFAULT';
}

export async function GET(request: NextRequest) {
  // Check if we already have a cached region
  const cachedRegion = request.cookies.get('hrm_geo_region')?.value as GeoRegion | undefined;
  if (cachedRegion) {
    return NextResponse.json({ region: cachedRegion });
  }

  // Get the client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip');

  let region: GeoRegion = 'DEFAULT';

  try {
    // Only call external API in production; in dev, default to UK for testing strictest rules
    if (process.env.NODE_ENV === 'production' && ip) {
      const res = await fetch(`https://ipapi.co/${ip}/country/`, {
        headers: { 'User-Agent': 'hrm-website/1.0' },
        next: { revalidate: 0 },
      });
      if (res.ok) {
        const countryCode = (await res.text()).trim();
        region = getRegion(countryCode);
      }
    } else {
      // Development fallback — use UK (strictest) to ensure banner is always visible during dev
      region = 'UK';
    }
  } catch {
    region = 'DEFAULT';
  }

  const response = NextResponse.json({ region });

  // Cache region for 24h in a simple cookie (not sensitive data)
  response.cookies.set('hrm_geo_region', region, {
    maxAge: 60 * 60 * 24,
    httpOnly: false, // readable client-side for React
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
