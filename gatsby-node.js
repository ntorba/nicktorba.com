const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      posts: allFile(
        filter: {
          sourceInstanceName: { eq: "posts" }
          relativePath: { glob: "**/*.{md,mdx}" }
          childMdx: { frontmatter: { published: { eq: true } } }
        }
        sort: { fields: relativePath, order: DESC }
      ) {
        nodes {
          id
          childMdx {
            frontmatter {
              title
              slug
              published
            }
          }
        }
      }
      daily_notes: allFile(
        filter: {
          sourceInstanceName: { eq: "daily_notes" }
          relativePath: { glob: "*.{md,mdx}" }
          childMdx: { frontmatter: { published: { eq: true } } }
        }
        sort: { fields: relativePath, order: DESC }
      ) {
        nodes {
          id
          childMdx {
            frontmatter {
              title
              slug
              published
            }
          }
        }
      }
    }
  `);

  const posts = result.data.posts.nodes;
  posts.forEach((node) => {
    createPage({
      path: node.childMdx.frontmatter.slug,
      component: require.resolve(`./src/templates/post.js`),
      context: {
        slug: node.childMdx.frontmatter.slug,
        postPath: node.childMdx.frontmatter.slug,
      },
    });
  });
  const daily_notes = result.data.daily_notes.nodes;
  daily_notes.forEach((node) => {
    createPage({
      path: node.childMdx.frontmatter.slug,
      component: require.resolve(`./src/templates/daily_note.js`),
      context: {
        slug: node.childMdx.frontmatter.slug,
        postPath: node.childMdx.frontmatter.slug,
      },
    });
  });
};

exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();
  const contentPath = options.contentPath || "content";
  const dir = path.join(program.directory, contentPath);

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};
