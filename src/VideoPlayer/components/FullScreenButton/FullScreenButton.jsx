import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fullScreenIcon } from '../../../assets';

export const FullScreenButton = ({ onClick }) => (
  <StyledButton onClick={onClick} bcg={fullScreenIcon} />
)

FullScreenButton.propTypes = {
  onClick: PropTypes.func,
};

const StyledButton = styled.button`
  width: 22px;
  height: 22px;
  background: url(${(props) => props.bcg});
  cursor: pointer;
  outline: none;
  border: none;
`;
