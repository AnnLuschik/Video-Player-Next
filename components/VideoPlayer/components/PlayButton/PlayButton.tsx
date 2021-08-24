import styled from 'styled-components';

const StyledButton = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0 5px;
  background: transparent;
  cursor: pointer;
  outline: none;
  border: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-top: 10px solid transparent;
    border-left: 20px solid #ffffff;
    border-bottom: 10px solid transparent;
  }
`;

interface PlayButtonProps {
  onClick(): void,
}

const PlayButton = ({ onClick }: PlayButtonProps) => (
  <StyledButton onClick={onClick} />
);

export default PlayButton;
