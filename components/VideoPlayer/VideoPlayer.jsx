import React, {
  useState, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  PlayButton, PauseButton, PlayFromStartButton,
  FullScreenButton, VolumeButton, ProgressBar,
} from './components';
import { formatTime } from '../../lib/timeService';

const VideoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 320px;

  &::full-screen {
  width: 100%;
  height: 100%;
}

  &::-webkit-full-screen {
  width: 100%;
  height: 100%;
  }

  &::-moz-full-screen {
  width: 100%;
  height: 100%;
}
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  cursor: pointer;
  
  &::-webkit-media-controls {
    display: none;
  }
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #323232;
  transform: translateY(100%) translateY(-40px);
  z-index: 2147483648;
`;

const ViewControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: ${(props) => (props.mode ? '12%' : 'auto')};
  padding: 5px ${(props) => (props.mode ? '20px' : '10px')};
`;

const CommonControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: ${(props) => (props.mode ? '10%' : 'auto')};
  padding: 5px ${(props) => (props.mode ? '20px' : '10px')};
`;

const Time = styled.p`
  margin-left: 5px;
  font-size: 1em;
  color: #ffffff;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

export const VideoPlayer = React.memo(({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playerRef = useRef(null);
  const containerRef = useRef(null);

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

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen(); /* Firefox */
      } else if (containerRef.current.webkitRequestFullScreen) {
        containerRef.current.webkitRequestFullScreen(); /* Chrome, Safari and Opera */
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen(); /* IE/Edge */
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullScreen) {
        document.webkitExitFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  const changeVolume = useCallback((value) => {
    playerRef.current.volume = value;
  }, []);

  const changeCurrentPlaybackPosition = useCallback((value) => {
    const newTime = (value / playerRef.current.offsetWidth) * playerRef.current.duration;
    setCurrentTime(newTime);
    playerRef.current.currentTime = newTime;
  }, []);

  return (
    <VideoContainer ref={containerRef}>
      <StyledVideo
        ref={playerRef}
        onClick={togglePlay}
        onTimeUpdate={() => setCurrentTime(playerRef.current?.currentTime.toFixed(2))}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={url} type="video/mp4" />

      </StyledVideo>
      <Controls>
        <ProgressBar
          completed={(currentTime / playerRef.current?.duration) * 100 || 0}
          onClick={changeCurrentPlaybackPosition}
        />
        <ViewControls mode={isFullscreen}>
          {isPlaying ? <PauseButton onClick={pause} /> : <PlayButton onClick={play} />}
          <PlayFromStartButton onClick={playFromStart} />
          <Time isVisible={playerRef.current?.duration}>{`${formatTime(currentTime)} / ${formatTime(playerRef.current?.duration)}`}</Time>
        </ViewControls>
        <CommonControls mode={isFullscreen}>
          <VolumeButton onClick={changeVolume} />
          <FullScreenButton onClick={toggleFullscreen} isFullscreen={isFullscreen} />
        </CommonControls>
      </Controls>
    </VideoContainer>
  );
});

VideoPlayer.propTypes = {
  url: PropTypes.string,
};
