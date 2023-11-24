/** @type {import('next').NextConfig} */
const nextConfig = {
    generateBuildId: async () => {
        return 'my-build-id'
    },
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
