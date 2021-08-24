import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  completed: number,
  onClick: (x: number) => void,
}

const Container = styled.div`
  width: 100%;
  height: 5px;
  background: #9a9a9a;
  cursor: pointer;
`;

const Filler = styled.div<{ completed: number }>`
  width: ${(props) => props.completed}%;
  height: 100%;
  background: red;
`;

const ProgressBar = React.memo(({ completed, onClick }: ProgressBarProps) => (
  <Container onClick={(e) => onClick(e.nativeEvent.offsetX)}>
    <Filler completed={completed} />
  </Container>
));

export default ProgressBar;
