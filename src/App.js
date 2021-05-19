import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { VideoPlayer, getDataRequest } from './VideoPlayer';

function App() {
  const dispatch = useDispatch();
  const { responseData } = useSelector((state) => state.videoPlayer);

  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    dispatch(getDataRequest())
  }, [dispatch]);

  useEffect(() => {
    if (responseData) {
      setVideoUrl(responseData.data.find((item) => item.format === 'mp4').url);
    }
  }, [responseData]);

  return (
    <Container>
      {responseData ? <VideoPlayer url={videoUrl} /> : null}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
