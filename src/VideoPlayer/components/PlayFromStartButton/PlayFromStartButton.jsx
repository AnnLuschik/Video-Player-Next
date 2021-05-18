import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const PlayFromStartButton = ({ onClick }) => (
  <StyledDiv onClick={onClick} />
)

PlayFromStartButton.propTypes = {
  onClick: PropTypes.func,
};

const StyledDiv = styled.div`
  width: 20px;
  height: 20px;
  background: #ffffff;
  cursor: pointer;
`;
