import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useCollection } from 'react-firebase-hooks/firestore';
import Image from 'next/image';
import styled from 'styled-components';
import { firebaseStorage, firebaseFirestore } from '../firebase/clientApp';
import defaultAvatar from '../public/default-avatar.png';
import Icon from '../icons/ts';

const Profile = () => {
  const { user: authUser, error, isLoading } = useUser();
  const [storedUsers, storedUsersLoading] = useCollection(firebaseFirestore.collection('users'), {});

  const [image, setImage] = useState(null);
  const [objectURL, setObjectURL] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  const storageRef = firebaseStorage.ref();

  const imageSize = 150;

  const uploadToClient = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setObjectURL(URL.createObjectURL(i));
    }
  };

  const saveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = firebaseFirestore.collection('users').doc(`${authUser.email}`);

    if (image) {
      const imageRef = storageRef.child(image?.name);
      await imageRef.put(image);
      const downloadURL = await imageRef.getDownloadURL();
      await target.update({ picturePath: downloadURL });
    }

    try {
      await target.update({ name });
    } catch (err) {
      console.log(err.message);
    }
    setIsEditing(false);
  }

  useEffect(() => {
    if (storedUsers && !storedUsersLoading && authUser) {
      firebaseFirestore.collection('users').doc(`${authUser.email}`).get()
        .then((data) => {
          setObjectURL(data.data().picturePath);
          setName(data.data().name)
        });
    }
  }, [storedUsers, storedUsersLoading, authUser]);

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
        </AvatarWrapper>
        {isEditing
          ? (
            <StyledForm onSubmit={saveChanges}>
              <ChangeAvatar>
                <ChangeAvatarInput type="file" accept="image/*" onChange={uploadToClient} />
                Change photo
              </ChangeAvatar>
              <StyledInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
              <UploadButton type="submit">Save</UploadButton>
            </StyledForm>
          ) : (
            <>
              <Title>{name}</Title>
              <Title>{authUser.email || 'No data'}</Title>
            </>
          )}
      </Container>
    </Wrapper>
  );
};

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
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
`;

const ChangeAvatar = styled.label`
  display: flex;
  margin: 0 0 30px;
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
  margin-top: auto;
  padding: 10px 15px;
  font-weight: 600;
  font-size: 1.2em;
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

const StyledInput = styled.input`
  width: 100%;
  padding: 20px;
  margin-bottom: 15px;
  font-size: 18px;
  color: #555555;
  font-style: italic;
  background: none;
  outline: none;
  border: none;
  border-radius: 25px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
`;

export default Profile;
