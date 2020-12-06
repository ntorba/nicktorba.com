import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import {AllPosts, Post, PostTitle, PostDate} from "./post_pages_components";

const ArticlesPage = ({ data }) => {
  let nodes = data.posts.nodes;
  nodes.sort((a, b) => {
    return (
      Date.parse(b.childMdx.frontmatter.sortDate) -
      Date.parse(a.childMdx.frontmatter.sortDate)
    );
  });
  const Posts = nodes.map((node) => (
    <Post to={node.childMdx.frontmatter.slug}>
      <PostTitle>{node.childMdx.frontmatter.title}</PostTitle>
      <PostDate>{node.childMdx.frontmatter.displayDate}</PostDate>
      <p>{node.childMdx.excerpt}</p>
    </Post>
  ));
  return (
    <Layout>
      <AllPosts>{Posts}</AllPosts>
    </Layout>
  );
};

export const query = graphql`
  query {
    posts: allFile(
      filter: {
        sourceInstanceName: { eq: "posts" }
        relativePath: { glob: "**/*.{md,mdx}" }
        childMdx: { frontmatter: { published: { eq: true } } }
      }
    ) {
      nodes {
        name
        childMdx {
          excerpt(pruneLength: 250)
          frontmatter {
            sortDate: date
            displayDate: date(formatString: "MMMM D, Y")
            title
            slug
          }
        }
      }
    }
  }
`;

export default ArticlesPage;
