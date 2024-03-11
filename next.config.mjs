/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'res.cloudinary.com',
    //             port: '',
    //             pathname: 'arifscloud/image/upload/**'
    //         },
    //     ]
    // }
    images: {
        domains: ['res.cloudinary.com']
    }
};

export default nextConfig;

