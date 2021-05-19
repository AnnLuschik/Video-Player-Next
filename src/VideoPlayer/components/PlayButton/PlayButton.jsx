import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlayButton = ({ onClick }) => (
  <StyledButton onClick={onClick} />
)

PlayButton.propTypes = {
  onClick: PropTypes.func,
};

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

export default PlayButton;
