import Link from 'next/link';
import styled from 'styled-components';
// import { useAuth0 } from '@auth0/nextjs-auth0';
import { logoutIcon } from '../../../public/assets';

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

export const LogoutButton = () => (
  <StyledButton>
    <a href="/api/auth/logout" />
  </StyledButton>
)
