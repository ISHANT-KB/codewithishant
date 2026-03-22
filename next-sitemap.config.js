/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://codewithishant.vercel.app',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 7000,
    exclude: ['/admin/*', '/dashboard/*', '/login/*', '/register/*'],
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: 'Googlebot', allow: '/' },
            { userAgent: 'Bingbot', allow: '/' },
        ],
    },
};