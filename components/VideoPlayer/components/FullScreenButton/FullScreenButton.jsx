import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../../../../icons/js';

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent; 
`;

const FullScreenButton = ({ onClick, isFullscreen }) => (
  <StyledButton onClick={onClick}>
    <Icon name={isFullscreen ? 'fullscreenExit' : 'fullscreen'} size="large" />
  </StyledButton>
)

FullScreenButton.propTypes = {
  onClick: PropTypes.func,
  isFullscreen: PropTypes.bool.isRequired,
};

export default FullScreenButton;
