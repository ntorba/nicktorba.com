const path = require("path");

module.exports = {
  siteMetadata: {
    title: `Nick Torba`,
    author: `Nick Torba`,
    social: {
      email: `nicktorba@gmail.com`,
      twitter: `@nicktorba`,
    },
    description: ``,
    titleTemplate: ``,
    image: ``,
    url: ``,
    baseUrl: `https://nicktorba.com`,
    siteUrl: `https://nicktorba.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-preload-fonts`,
      options: {
        fonts: [
          {
            family: `Rubik`,
          },
          {
            family: `Karla`,
          },
          {
            family: `Roboto`,
          },
          {
            family: `Domine`,
          },
          {
            family: `Turret Road`,
          },
          {
            family: `Teko`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.ANALYTICS_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nick Torba`,
        short_name: `Nick`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#c95900`,
        icon: `static/icon.png`,
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, notes } }) => {
              return notes.nodes.map((note) => {
                return Object.assign({}, note.childMdx.frontmatter, {
                  description: note.childMdx.excerpt,
                  date: note.childMdx.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl + note.childMdx.frontmatter.slug,
                  guid:
                    site.siteMetadata.siteUrl + note.childMdx.frontmatter.slug,
                  custom_elements: [{ "content:encoded": note.childMdx.html }],
                });
              });
            },
            query: `
             {
              notes: allFile(
                filter: {
                  sourceInstanceName:{ in: ["posts"] }
                  relativePath: { glob: "**/*.{md,mdx}" }
                }
                sort: { fields: childMdx___frontmatter___date, order: DESC }
              ) {
                nodes {
                  childMdx {
                    frontmatter {
                      title
                      slug
                      date
                    }
                    html
                    excerpt
                  }
                }
              }
            }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
          },
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    "gatsby-plugin-sharp",
    "gatsby-plugin-offline",
    "gatsby-plugin-twitter",
    {
      "resolve": `gatsby-transformer-remark`,
      "options": {
        "excerpt_separator": `<!-- end -->`
      }
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: path.join(__dirname, "src", "pages"),
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/templates/default.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents"
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: "560",
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "content/posts/",
        name: "posts",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "content/brain/daily_notes/",
        name: "daily_notes",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "content/brain/",
        name: "brain",
      },
    },
    {
      resolve: "@ntorba/gatsby-theme-brain",
      options: {
        mdxOtherwiseConfigured: true,
        linkifyHashtags: true,
      },
    },
  ],
};
