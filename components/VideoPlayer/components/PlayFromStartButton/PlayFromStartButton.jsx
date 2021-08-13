import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 5px;
  background: #ffffff;
  cursor: pointer;
`;

const PlayFromStartButton = ({ onClick }) => (
  <StyledDiv onClick={onClick} />
)

PlayFromStartButton.propTypes = {
  onClick: PropTypes.func,
};

export default PlayFromStartButton;
