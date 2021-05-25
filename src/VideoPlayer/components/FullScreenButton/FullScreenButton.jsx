import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fullScreenIcon, normalScreenIcon } from '../../../assets';

const FullScreenButton = ({ onClick, isFullscreen }) => (
  <StyledButton onClick={onClick} bcg={isFullscreen ? normalScreenIcon : fullScreenIcon} />
)

FullScreenButton.propTypes = {
  onClick: PropTypes.func,
  isFullscreen: PropTypes.bool.isRequired,
};

const StyledButton = styled.button`
  width: 22px;
  height: 22px;
  background: url(${(props) => props.bcg}) center no-repeat;
  cursor: pointer;
  outline: none;
  border: none;
`;

export default FullScreenButton;
