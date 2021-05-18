import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const PauseButton = ({ onClick }) => (
  <StyledButton onClick={onClick} />
)

PauseButton.propTypes = {
  onClick: PropTypes.func,
};

const StyledButton = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  background: transparent;
  cursor: pointer;
  outline: none;
  border: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-right: 20px double #ffffff;
    border-bottom: 0;
  }
`;
