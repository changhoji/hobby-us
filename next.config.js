/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "firebasestorage.googleapis.com",
            "s3-alpha-sig.figma.com",
        ],
    },
    // reactStrictMode: true,
};

module.exports = nextConfig;
