import styled from "@emotion/styled";
import { colors } from "../tokens";
import { Link } from "gatsby";

export const AllPosts = styled.div``;

export const Post = styled(Link)`
  display: block;
  margin-bottom: 45px;
  p {
    color: ${colors.gray800};
  }
  :hover p {
    color: ${colors.gray500};
  }
`;

export const PostTitle = styled.h3`
  color: ${colors.purple900};
  ${Post}:hover & {
    color: ${colors.purple500};
  }
`;

export const PostDate = styled.div`
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