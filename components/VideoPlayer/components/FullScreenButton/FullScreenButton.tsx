import styled from 'styled-components';
import Icon from '../../../../icons/ts';

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent; 
`;

interface FullScreenButtonProps {
  onClick(): void,
  isFullscreen: boolean,
}

const FullScreenButton = ({ onClick, isFullscreen }: FullScreenButtonProps) => (
  <StyledButton onClick={onClick}>
    <Icon name={isFullscreen ? 'FullscreenExit' : 'Fullscreen'} size="large" />
  </StyledButton>
);

export default FullScreenButton;
