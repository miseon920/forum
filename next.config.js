/** @type {import('next').NextConfig} */
const nextConfig = {
    generateBuildId: async () => {
        return 'my-build-id'
    },
}

module.exports = nextConfig
