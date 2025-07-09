import React, { useState } from 'react'
import styled from "styled-components";
import GenerateImageForm from '../components/GenerateImageForm';
import GeneratedImageCard from '../components/GeneratedImageCard';

const Container = styled.div`
    height: 100%;
    overflow-y: scroll;
    background: #1a1a1a;
    padding: 30px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    @media (max-width: 768px) {
        padding: 6px 10px;
    }
`;

const Wrapper = styled.div`
    height: fit-content;
    width: 100%;
    gap: 8%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 32px;
    }
`;

const ModernFormContainer = styled.div`
    flex: 1;
    background: ${({ theme }) => theme.bgLight};
    border-radius: 16px;
    box-shadow: 0 2px 16px 0 ${({ theme }) => theme.black + '10'};
    padding: 32px 24px;
    margin-right: 24px;
    @media (max-width: 900px) {
        margin-right: 0;
        margin-bottom: 24px;
    }
`;

const ModernPreviewContainer = styled.div`
    flex: 1;
    background: ${({ theme }) => theme.bgLight};
    border-radius: 16px;
    box-shadow: 0 2px 16px 0 ${({ theme }) => theme.black + '10'};
    padding: 32px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    height: 100%;
`;

const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  })
  return (
    <Container>
      <Wrapper>
        <ModernFormContainer>
          <GenerateImageForm post={post}
            setPost={setPost}
            createPostLoading={createPostLoading}
            setGenerateImageLoading={setGenerateImageLoading}
            generateImageLoading={generateImageLoading}
            setCreatePostLoading={setCreatePostLoading}
          />
        </ModernFormContainer>
        <ModernPreviewContainer>
          <GeneratedImageCard src={post?.photo} loading={generateImageLoading} />
        </ModernPreviewContainer>
      </Wrapper>
    </Container>
  )
}

export default CreatePost


