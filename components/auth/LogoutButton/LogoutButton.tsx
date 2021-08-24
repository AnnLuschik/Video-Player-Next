import Link from 'next/link';
import styled from 'styled-components';
import Icon from '../../../icons/ts';

const StyledButton = styled.button`
  position: absolute;
  top: 1%;
  right: 1%;
  color: #ffffff;
  border: none;
  cursor: pointer;
  background: transparent;

  @media screen and (orientation: landscape) and (max-width: 667px) {
    display: none;
  }
`;

export const LogoutButton = () => (
  <Link href="/api/auth/logout" passHref>
    <StyledButton>
      <Icon name="Logout" size="large" />
    </StyledButton>
  </Link>
);
