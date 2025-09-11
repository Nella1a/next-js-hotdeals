/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.APP_ENV === 'test';
const isDockerEnv = process.env.DOCKER_ENV != undefined;

console.log('----------------------------------');
console.log('isProduction: ', isProd);
console.log('isTest: ', isTest);
console.log('IsDocker: ', isDockerEnv);
console.log('----------------------------------');

const nextConfig = {};

export default nextConfig;
