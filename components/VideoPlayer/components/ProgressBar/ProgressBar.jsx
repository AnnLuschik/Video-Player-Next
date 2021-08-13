import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 5px;
  background: #9a9a9a;
  cursor: pointer;
`;

const Filler = styled.div`
  width: ${(props) => props.completed}%;
  height: 100%;
  background: red;
`;

const ProgressBar = React.memo(({ completed, onClick }) => (
  <Container onClick={(e) => onClick(e.nativeEvent.offsetX)}>
    <Filler completed={completed} />
  </Container>
));

ProgressBar.propTypes = {
  completed: PropTypes.number,
  onClick: PropTypes.func,
}

export default ProgressBar;
