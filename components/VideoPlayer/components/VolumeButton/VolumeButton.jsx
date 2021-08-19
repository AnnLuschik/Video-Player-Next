import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../../../../icons/js';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px 0 10px;
  padding: 0;
  cursor: pointer;
  outline: none;
  border: none;
  background-image: transparent;
`;

const StyledInput = styled.input`
  width: 75px;
  height: 5px;
`;

const VolumeButton = ({ onClick }) => {
  const [volume, setVolume] = useState(1);

  const changeVolumeByInput = useCallback(() => {
    onClick(volume);
  }, [onClick, volume]);

  const changeVolumeByClick = useCallback(() => {
    if (volume < 0.1) {
      setVolume(1);
      onClick(1);
    } else {
      setVolume(0);
      onClick(0);
    }
  }, [onClick, volume]);

  return (
    <Container>
      <StyledInput type="range" min={0} max={1} step={0.1} onChange={(e) => setVolume(e.target.value)} onMouseMove={changeVolumeByInput} value={volume} />
      <StyledButton onClick={changeVolumeByClick}>
        <Icon name={volume < 0.1 ? 'volumeMuted' : volume < 0.6 ? 'volumeDown' : 'volumeUp'} />
      </StyledButton>
    </Container>
  );
};

VolumeButton.propTypes = {
  onClick: PropTypes.func,
};

export default VolumeButton;
