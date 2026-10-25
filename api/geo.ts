export const config = {
  runtime: 'edge',
};

export default function handler(request: Request) {
  const city = request.headers.get('x-vercel-ip-city');
  const region = request.headers.get('x-vercel-ip-country-region');
  const country = request.headers.get('x-vercel-ip-country');
  const latStr = request.headers.get('x-vercel-ip-latitude');
  const lonStr = request.headers.get('x-vercel-ip-longitude');

  const latitude = latStr ? parseFloat(latStr) : 19.3149;
  const longitude = lonStr ? parseFloat(lonStr) : 84.7941;

  return new Response(
    JSON.stringify({
      city: city ? decodeURIComponent(city) : 'Berhampur',
      region: region || 'Odisha',
      country: country || 'IN',
      latitude: !isNaN(latitude) ? latitude : 19.3149,
      longitude: !isNaN(longitude) ? longitude : 84.7941,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    }
  );
}
