import React, {
  useState, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  PlayButton, PauseButton, PlayFromStartButton, FullScreenButton,
} from './components';

export const VideoPlayer = React.memo(({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(0);

  const playerRef = useRef(null);

  const togglePlay = useCallback((e) => {
    if (isPlaying) {
      e.target.pause();
      setIsPlaying(false);
    } else {
      e.target.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    playerRef.current.pause();
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    playerRef.current.play();
    setIsPlaying(true);
  }, []);

  const playFromStart = useCallback(() => {
    playerRef.current.currentTime = 0;
    playerRef.current.play();
    setIsPlaying(true);
  }, []);

  const toFullScreen = useCallback(() => {
    playerRef.current.requestFullscreen();
  }, []);

  return (
    <VideoContainer>
      <StyledVideo src={url} ref={playerRef} onClick={togglePlay} />
      <Controls>
        <ViewControls>
          {isPlaying ? <PauseButton onClick={pause} /> : <PlayButton onClick={play} />}
          <PlayFromStartButton onClick={playFromStart} />
          <DurationText>{`${currentTime} / ${playerRef.current?.duration.toFixed(2)}`}</DurationText>
        </ViewControls>
        <CommonControls>
          <FullScreenButton onClick={toFullScreen} />
        </CommonControls>
      </Controls>
    </VideoContainer>
  );
});

VideoPlayer.propTypes = {
  url: PropTypes.string,
};

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledVideo = styled.video`
  cursor: pointer;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  background: #323232;
`;

const ViewControls = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
`;

const CommonControls = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
`;

const DurationText = styled.p`
  color: #ffffff;
`;
