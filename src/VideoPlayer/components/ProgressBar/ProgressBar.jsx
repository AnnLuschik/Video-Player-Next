import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProgressBar = React.memo(({ completed }) => (
  <Container>
    <Filler completed={completed} />
  </Container>
));

ProgressBar.propTypes = {
  completed: PropTypes.number,
}

const Container = styled.div`
  width: 100%;
  height: 5px;
  background: #9a9a9a;
`;

const Filler = styled.div`
  width: ${(props) => props.completed}%;
  height: 100%;
  background: red;
`;

export default ProgressBar;
