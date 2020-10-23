import React from "react";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import SEO from "../components/SEO";
import Newsletter from "../components/Newsletter";

const BlogLayout = styled(Layout)`
  margin: 5em auto 6rem;

  @media (min-width: 300px) {
    max-width: 100%;
    width: 20ch;
  }
`;

const Blog = styled.article`
  margin-bottom: 5rem;
  align-items: center;
  display: flex;
  flex-direction: column;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    width: 100%;
    max-width: 600px;
    vertical-align: middle;
  }

  p {
    width: 100%;
    max-width: 600px;
    vertical-align: middle;
  }

  ul {
    width: 100%;
    max-width: 600px;
  }
`;

const PostDate = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: -10px;
  margin-bottom: 15px;
  font-size: 11pt;
`;

export default function DailyNoteTemplate({ data: { mdx }, pageContext }) {
  return (
    <BlogLayout>
      <Blog>
        <SEO
          post={{ title: mdx.frontmatter.title, path: pageContext.postPath }}
        />
        <h1>{mdx.frontmatter.title}</h1>
        <PostDate>{mdx.frontmatter.date}</PostDate>
        <MDXRenderer>{mdx.body}</MDXRenderer>
        <h4>Before you go</h4>
        <p>
          Any feedback or comments are greatly appreciated via {" "}
          <a href="https://twitter.com/nicktorba">Twitter</a> or{" "}
          <a href="mailto:nicholastorba@gmail.com">Email</a>.
        </p>
      </Blog>
    </BlogLayout>
  );
}

export const dailyNoteQuery = graphql`
  query DailyNotesBySlug($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`;
