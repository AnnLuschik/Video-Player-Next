import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import styled from 'styled-components'
import { VideoPlayer } from '../components/VideoPlayer';
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

function Home({ responseData }) {
  const { user, error, isLoading } = useUser();
  const [videoUrl, setVideoUrl] = useState('');

  const isProd = process.env.NODE_ENV === 'production';
  console.log(isProd);

  useEffect(() => {
    setVideoUrl(responseData.data.find((item) => item.format === 'mp4').url);
  }, [responseData.data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      {!user
        ? <LoginButton />
        : (
          <>
            <LogoutButton />
            <VideoPlayer url={videoUrl} />
          </>
        )}
    </Container>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://dl.dropboxusercontent.com/s/jse5lx9xnmcav51/media.json');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      responseData: data,
    },
  }
}

export default Home;
