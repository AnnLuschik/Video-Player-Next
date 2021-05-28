import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { logoutIcon } from '../../assets'

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return <StyledButton onClick={() => logout()} />
}

const StyledButton = styled.button`
  position: absolute;
  top: 1%;
  right: 1%;
  width: 25px;
  height: 30px;
  font-size: 16px;
  background: url(${logoutIcon}) center no-repeat;
  border: none;
  cursor: pointer;

  @media screen and (orientation: landscape) and (max-width: 667px) {
    display: none;
  }
`;
