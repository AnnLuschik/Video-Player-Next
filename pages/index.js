import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0';
import styled from 'styled-components'
import { VideoPlayer, getDataRequest } from '../components/VideoPlayer';
import { LoginButton, LogoutButton } from '../components/auth';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.p`
  font-weight: 800;
  font-size: 2em;
`;

const ErrorMessage = styled.div`
  font-size: 1.5em;
  color: red;
`;

function Home() {
  const dispatch = useDispatch();
  const { responseData, loading, errorMessage } = useSelector((state) => state.videoPlayer);

  // const { isAuthenticated } = useAuth0();
  const { user } = useUser();

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
      {!user
        ? <LoginButton />
        : (
          <>
            <LogoutButton />
            {loading ? <Loading>Loading...</Loading> : null}
            {responseData ? <VideoPlayer url={videoUrl} /> : null}
            {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
          </>
        )}
    </Container>
  );
}

export default Home;
