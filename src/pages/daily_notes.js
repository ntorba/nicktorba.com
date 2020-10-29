import React from "react";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import { colors } from "../tokens";

const AllPosts = styled.div``;

const PostHeader = styled(Link)`
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

  ${PostHeader}:hover & {
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

  ${PostHeader}:hover & {
    color: ${colors.gray400};
  }
`;

const DailyNotesPage = ({ data }) => {
  let nodes = data.posts.nodes;
  nodes.sort((a, b) => {
    return (
      Date.parse(b.childMdx.frontmatter.sortDate) -
      Date.parse(a.childMdx.frontmatter.sortDate)
    );
  });
  // const Posts = nodes.map((node) => (
  //   <div>
  //     <PostHeader to={"brain/" + node.childMdx.frontmatter.slug}>
  //       <PostTitle>{node.childMdx.frontmatter.title}</PostTitle>
  //       <PostDate>{node.childMdx.frontmatter.displayDate}</PostDate>
  //     </PostHeader>
  //     <MDXRenderer title="My Stuff!">{node.childMdx.body}</MDXRenderer>
  //     </div>
  // ));
  const Posts = nodes.map((node) => (
    <PostHeader to={"brain/" + node.childMdx.frontmatter.slug}>
      <PostTitle>{node.childMdx.frontmatter.title}</PostTitle>
      <PostDate>{node.childMdx.frontmatter.displayDate}</PostDate>
      {/* <p><b>Topics</b>: {(node.childMdx.frontmatter.topics) ? node.childMdx.frontmatter.topics.join(", ") : "None Listed"}</p> */}
      <p>{node.childMdx.excerpt}</p>
    </PostHeader>
    {/* <BrainNote note={node.childMdx}></BrainNote> */}
    {/* <MDXRenderer title="My Stuff!">{node.childMdx.body}</MDXRenderer> */}
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
          excerpt(pruneLength: 280)
          frontmatter {
            sortDate: date
            displayDate: date(formatString: "MMMM D, Y")
            title
            slug
            topics
          }
        }
      }
    }
  }
`;

export default DailyNotesPage;
