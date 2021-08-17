import PropTypes from 'prop-types';
// import Image from 'next/image';
import styled from 'styled-components';
import { fullScreenIcon, normalScreenIcon } from '../../../../public/assets';

const StyledButton = styled.div`
  width: 22px;
  height: 22px;
  cursor: pointer;
  outline: none;
  border: none;
  background-image: url(${(props) => props.icon}) center no-repeat;
  /* background-color: transparent; */
`;

const FullScreenButton = ({ onClick, isFullscreen }) => (
  <StyledButton onClick={onClick} icon={isFullscreen ? normalScreenIcon : fullScreenIcon} />
)

FullScreenButton.propTypes = {
  onClick: PropTypes.func,
  isFullscreen: PropTypes.bool.isRequired,
};

export default FullScreenButton;
