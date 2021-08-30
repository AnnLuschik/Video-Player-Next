import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useCollection } from 'react-firebase-hooks/firestore';
import Image from 'next/image';
import styled from 'styled-components';
import { firebaseStorage, firebaseFirestore } from '../firebase/clientApp';
import defaultAvatar from '../public/default-avatar.png';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2e2e2;;
`;

const Container = styled.div`
  display: flex;
  min-width: 50vw;
  min-height: 50vh;
  padding: 10px;
  background-color: #ffffff;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarContainer = styled.figure<{size: number}>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
 
  border-radius: 50%;
`;

const Avatar = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`;

const ChangeAvatar = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: none;
`;

const Title = styled.h1`
  font-size: 26px;
`;

const Message = styled.p`
  font-size: 18px;
  color: #010101;
`;

const Profile = () => {
  const { user, error, isLoading } = useUser();
  const [image, setImage] = useState(null);
  const [objectURL, setObjectURL] = useState(null);

  const storageRef = firebaseStorage.ref();

  const [users, usersLoading] = useCollection(firebaseFirestore.collection('users'), {});

  const imageSize = 150;

  const uploadToClient = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToFirebase = async () => {
    if (image) {
      const imageRef = storageRef.child(image.name);
      await imageRef.put(image);
      const downloadURL = await imageRef.getDownloadURL();
      try {
        await firebaseFirestore.collection('users').doc(`${user.email}`).set({ picturePath: downloadURL });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    if (users && !usersLoading && user) {
      firebaseFirestore.collection('users').doc(`${user.email}`).get()
        .then((data) => setObjectURL(data.data().picturePath));
    }
  }, [users, usersLoading, user]);

  if (isLoading) return <Message>Loading...</Message>
  if (error) return <Message>{error.message}</Message>

  return (
    <Wrapper>
      <Container>
        <AvatarWrapper>
          <AvatarContainer size={imageSize}>
            <Avatar src={objectURL || defaultAvatar} layout="fill" />
          </AvatarContainer>
          <ChangeAvatar>
            <UploadInput type="file" accept="image/*" onChange={uploadToClient} />
            Change photo
          </ChangeAvatar>
          <button onClick={uploadToFirebase}>Upload</button>
        </AvatarWrapper>
        <Title>{user.email || 'No data'}</Title>
      </Container>
    </Wrapper>
  );
};

export default Profile;
