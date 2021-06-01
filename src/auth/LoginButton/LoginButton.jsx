import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <StyledButton onClick={() => loginWithRedirect({
      redirectUri: 'https://annluschik.github.io/Video-Player/',
    })}
    >
      Log in
    </StyledButton>
  )
}

const StyledButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
`;
