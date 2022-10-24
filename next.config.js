/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_HOST: "https://3ukkwmknvr.us-east-1.awsapprunner.com/",
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyAmlE3S_xARvOa64i8lgnhq-m5TljHppoo",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "shamamsaapp.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "shamamsaapp",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "shamamsaapp.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "27287570334",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:27287570334:web:29089a1a30ec7374b7f88f",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-LWKJ3GC7JZ",
  },
};

module.exports = nextConfig;
