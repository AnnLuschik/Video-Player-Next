import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 5px;
  background: #ffffff;
  cursor: pointer;
`;

interface PlayFromStartButtonProps {
  onClick(): void,
}

const PlayFromStartButton = ({ onClick }: PlayFromStartButtonProps) => (
  <StyledDiv onClick={onClick} />
);

export default PlayFromStartButton;
