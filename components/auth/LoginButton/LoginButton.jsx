import styled from 'styled-components';
import Link from 'next/link';

const StyledButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
`;

export const LoginButton = () => (
  <StyledButton>
    <Link href="/api/auth/login">Log in</Link>
  </StyledButton>
);
