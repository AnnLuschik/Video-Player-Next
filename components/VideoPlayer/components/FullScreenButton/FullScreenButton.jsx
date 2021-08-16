import PropTypes from 'prop-types';
import Image from 'next/image';
import styled from 'styled-components';
import { fullScreenIcon, normalScreenIcon } from '../../../../public/assets';

const StyledButton = styled.div`
  width: 22px;
  height: 22px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
`;

const FullScreenButton = ({ onClick, isFullscreen }) => (
  <StyledButton onClick={onClick}>
    <Image
      src={isFullscreen ? normalScreenIcon : fullScreenIcon}
      width={100}
      height={100}
    />
  </StyledButton>
)

FullScreenButton.propTypes = {
  onClick: PropTypes.func,
  isFullscreen: PropTypes.bool.isRequired,
};

export default FullScreenButton;
