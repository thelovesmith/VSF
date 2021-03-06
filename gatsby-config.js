require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config = require('./content/meta/config');
module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    author: config.authorName,
    siteUrl: config.siteUrl,
    lamguage: config.siteLanguage,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-firebase`,
      options: {
        credential: require('./firebase-key.json'),
        databaseURL: 'https://vision-solar-finance.firebaseio.com/',
        types: [
          {
            type: 'Clients',
            path: 'clients',
          },
          {
            type: 'Users',
            path: 'users',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Nunito Sans`,
            variants: [`400`, `600`, `800`],
          },
          {
            family: `Montserrat`,
            variants: [`300`, `400`, `400i`, `500`, `600`],
          },
          {
            family: `Spectral`,
            variants: [`400`, `600`, `800`],
          },
          {
            family: `Karla`,
            variants: [`400`, `700`],
          },
          {
            family: `Poppins`,
            variants: [`400`, `700`],
          },
          {
            family: `Muli`,
            variants: [`400`, `700`],
          },

        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
