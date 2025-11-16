import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useStoryContent from '../features/story-viewer/hooks/useStoryContent.js';
import ScenePresenter from '../features/story-viewer/components/ScenePresenter.jsx';
import StoryEndScreen from '../features/story-viewer/components/StoryEndScreen.jsx';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: #070707;
  position: relative;
  overflow: hidden;
`;

const LoadingText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
`;

const ErrorText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: rgba(255, 100, 100, 0.9);
  text-align: center;
`;

export default function StoryViewerPage() {
  const { storyId, characterId } = useParams();
  
  // 모든 hooks는 early return 전에 호출되어야 합니다
  const dataUrl = storyId && characterId 
    ? `/data/story-content/${storyId}_${characterId}.json`
    : null;
  const { data: storyContent, loading, error } = useStoryContent(dataUrl);
  const [currentSceneId, setCurrentSceneId] = useState(null);

  // storyContent가 로드되면 시작 씬 ID로 초기화
  // 외부 데이터(storyContent)가 로드될 때 내부 state를 초기화하는 것은 정당한 useEffect 사용입니다
  useEffect(() => {
    if (storyContent?.startSceneId && !currentSceneId) {
      setCurrentSceneId(storyContent.startSceneId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyContent]);

  if (!storyId || !characterId) {
    return (
      <PageContainer>
        <ErrorText>스토리 ID 또는 캐릭터 ID가 없습니다.</ErrorText>
      </PageContainer>
    );
  }

  const handleChoiceSelect = (nextSceneId) => {
    setCurrentSceneId(nextSceneId);
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingText>스토리를 불러오는 중…</LoadingText>
      </PageContainer>
    );
  }

  if (error || !storyContent) {
    return (
      <PageContainer>
        <ErrorText>스토리를 불러오지 못했습니다.</ErrorText>
      </PageContainer>
    );
  }

  if (!currentSceneId) {
    return (
      <PageContainer>
        <LoadingText>씬을 준비하는 중…</LoadingText>
      </PageContainer>
    );
  }

  const currentSceneData = storyContent.scenes[currentSceneId];

  if (!currentSceneData) {
    return (
      <PageContainer>
        <ErrorText>씬 데이터를 찾을 수 없습니다.</ErrorText>
      </PageContainer>
    );
  }

  if (currentSceneData.type === 'end-screen') {
    return (
      <PageContainer>
        <StoryEndScreen endData={currentSceneData} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ScenePresenter
        storyTitle={storyContent.storyTitle}
        characterName={storyContent.characterName}
        characterAvatar={storyContent.characterAvatar}
        sceneData={currentSceneData}
        onChoiceSelect={handleChoiceSelect}
      />
    </PageContainer>
  );
}

