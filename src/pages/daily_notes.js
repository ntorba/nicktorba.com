import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import { colors } from "../tokens";

// import BrainNote from "@ntorba/gatsby-theme-brain";

const AllPosts = styled.div``;

const Post = styled(Link)`
  display: block;
  margin-bottom: 45px;

  p {
    color: ${colors.gray800};
  }

  :hover p {
    color: ${colors.gray500};
  }
`;

const PostTitle = styled.h3`
  color: ${colors.purple900};

  ${Post}:hover & {
    color: ${colors.purple500};
  }
`;

const PostDate = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: -10px;
  margin-bottom: 15px;
  font-size: 11pt;
  color: ${colors.gray500};

  ${Post}:hover & {
    color: ${colors.gray400};
  }
`;

const DailyNotesPage = ({ data }) => {
  let nodes = data.posts.nodes;
  console.log("NODES");
  console.log(nodes);
  nodes.sort((a, b) => {
    return (
      Date.parse(b.childMdx.frontmatter.sortDate) -
      Date.parse(a.childMdx.frontmatter.sortDate)
    );
  });
  console.log("FIRST NODE: ");
  console.log(nodes[0]);
  // const Posts = nodes.map((node) => (
  //   <Post to={"brain/" + node.childMdx.frontmatter.slug}>
  //     <PostTitle>{node.childMdx.frontmatter.title}</PostTitle>
  //     <PostDate>{node.childMdx.frontmatter.displayDate}</PostDate>
  //     <p>{node.childMdx.excerpt}</p>
  //   </Post>
  const Posts = nodes.map((node) => (
    <Post to={"brain/" + node.childMdx.frontmatter.slug}>
      <PostTitle>{node.childMdx.frontmatter.title}</PostTitle>
      <PostDate>{node.childMdx.frontmatter.displayDate}</PostDate>
      <MDXRenderer>{node.childMdx.body}</MDXRenderer>
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
        sourceInstanceName: { eq: "daily_notes" }
        relativePath: { glob: "*.{md,mdx}" }
        childMdx: { frontmatter: { published: { eq: true } } }
      }
    ) {
      nodes {
        name
        childMdx {
          body
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

export default DailyNotesPage;
