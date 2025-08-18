// next-sitemap.config.js
const { gitLastModifiedISO, resolveRouteToFile } = require('./lib/lastmod');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sonerunac.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,   // /sitemap.xml -> INDEX
  sitemapSize: 45000,
  autoLastmod: false,           // lastmod'u biz hesaplıyoruz

  exclude: ['/404', '/500', '/api/*', '/admin/*'],

  transform: async (_config, path) => {
    const isHomepage = path === '/';
    const absFile = resolveRouteToFile(path);
    const lastmod = absFile ? gitLastModifiedISO(absFile) : new Date().toISOString();

    return {
      loc: path,
      changefreq: isHomepage ? 'daily' : 'weekly',
      priority: isHomepage ? 1.0 : 0.7,
      lastmod
    };
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] }
    ]
  }
};
