/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.CLIENT_URL || "http://localhost:3000",
  generateRobotsTxt: false,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
};
