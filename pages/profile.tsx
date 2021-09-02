import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useCollection } from 'react-firebase-hooks/firestore';
import Image from 'next/image';
import styled from 'styled-components';
import { firebaseStorage, firebaseFirestore } from '../firebase/clientApp';
import defaultAvatar from '../public/default-avatar.png';
import Icon from '../icons/ts';

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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
  min-height: 750px;
  padding: 60px 30px;
  background-color: #ecf0f3;
  border-radius: 40px;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
`;

const EditBtnContainer = styled.button<{isActive: boolean}>`
  position: absolute;
  top: 5%;
  right: 10%;
  background: none;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: ${(props) => (props.isActive
    ? 'inset 3px 3px 8px #cbced1, inset -3px -3px 8px #ffffff'
    : '3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff')};
  cursor: pointer;
  &:hover {
    background: #fefefe;
  }
  &:active {
    background: #cbced1;
  } 
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AvatarContainer = styled.figure<{size: number}>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin-bottom: 30px;
  border-radius: 50%;
  box-shadow: 
    8px 8px 15px #a7aaaf,
    -8px -8px 15px #ffffff;
`;

const Avatar = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin-bottom: 25px;
`;

const ChangeAvatar = styled.label`
  display: flex;
  margin: 0;
  padding: 10px 15px;
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff;  
`;

const ChangeAvatarInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  margin: 0;
  padding: 10px 15px;
  font-weight: 600;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff;
  cursor: pointer;
  &:hover {
    background: #fefefe;
  }
  &:active {
    background: #cbced1;
  } 
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
  const [isEditing, setIsEditing] = useState(false);

  const storageRef = firebaseStorage.ref();

  const [users, usersLoading] = useCollection(firebaseFirestore.collection('users'), {});

  const imageSize = 150;

  const uploadToClient = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToFirebase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      const imageRef = storageRef.child(image.name);
      await imageRef.put(image);
      const downloadURL = await imageRef.getDownloadURL();
      try {
        await firebaseFirestore.collection('users').doc(`${user.email}`).set({ picturePath: downloadURL });
        alert('Photo uploaded sucessfully');
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
        <EditBtnContainer onClick={() => setIsEditing((prev) => !prev)} isActive={isEditing}>
          <Icon name="Edit" color="black" size="large" />
        </EditBtnContainer>
        <AvatarWrapper>
          <AvatarContainer size={imageSize}>
            <Avatar src={objectURL || defaultAvatar} layout="fill" />
          </AvatarContainer>
          {isEditing
            ? (
              <StyledForm onSubmit={uploadToFirebase}>
                <ChangeAvatar>
                  <ChangeAvatarInput type="file" accept="image/*" onChange={uploadToClient} />
                  Change photo
                </ChangeAvatar>
                <UploadButton type="submit">Save</UploadButton>
              </StyledForm>
            ) : null}
        </AvatarWrapper>
        <Title>{user.email || 'No data'}</Title>
      </Container>
    </Wrapper>
  );
};

export default Profile;
