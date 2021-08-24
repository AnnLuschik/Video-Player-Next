import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

export const LoginButton = () => (
  <Link href="api/auth/login" passHref>
    <Wrapper>
      <StyledLink>Log in</StyledLink>
    </Wrapper>
  </Link>
);
