import React, {
  useState, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  PlayButton, PauseButton, PlayFromStartButton,
  FullScreenButton, VolumeButton, ProgressBar,
} from './components';
import { formatTime } from '../timeService';

export const VideoPlayer = React.memo(({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const playerRef = useRef(null);

  const togglePlay = useCallback((e) => {
    if (isPlaying) {
      e.target.pause();
    } else {
      e.target.play();
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    playerRef.current.pause();
  }, []);

  const play = useCallback(() => {
    playerRef.current.play();
  }, []);

  const playFromStart = useCallback(() => {
    playerRef.current.currentTime = 0;
    playerRef.current.play();
    setIsPlaying(true);
  }, []);

  const toFullScreen = useCallback(() => {
    playerRef.current.requestFullscreen();
  }, []);

  const changeVolume = useCallback((value) => {
    playerRef.current.volume = value;
  }, []);

  return (
    <VideoContainer>
      <StyledVideo
        src={url}
        ref={playerRef}
        onClick={togglePlay}
        onTimeUpdate={() => setCurrentTime(playerRef.current?.currentTime.toFixed(2))}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <ProgressBar completed={(currentTime / playerRef.current?.duration) * 100} />
      <Controls>
        <ViewControls>
          {isPlaying ? <PauseButton onClick={pause} /> : <PlayButton onClick={play} />}
          <PlayFromStartButton onClick={playFromStart} />
          <DurationText isVisible={playerRef.current?.duration}>{`${formatTime(currentTime)} / ${formatTime(playerRef.current?.duration)}`}</DurationText>
        </ViewControls>
        <CommonControls>
          <VolumeButton onClick={changeVolume} />
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
  min-width: 320px;
`;

const StyledVideo = styled.video`
  cursor: pointer;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5% 3%;
  background: #323232;
`;

const ViewControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommonControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DurationText = styled.p`
  margin-left: 5px;
  color: #ffffff;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')}
`;
