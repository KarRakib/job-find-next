/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // This allows images from any hostname. Use with caution.
          },
        ],
        // OR
        domains: ['example.com', 'another-example.com'], // Replace with specific domains
      },
};

export default nextConfig;
