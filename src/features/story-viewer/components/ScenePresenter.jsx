import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: #070707;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  position: absolute;
  top: 43px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  text-align: center;
  z-index: 10;
`;

const StoryTitle = styled.p`
  margin: 0;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 15px;
  line-height: 19.8px;
  color: #ffffff;
`;

const CharacterName = styled.p`
  margin: 0;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 19.8px;
  color: rgba(255, 255, 255, 0.5);
`;

const ContentArea = styled.div`
  position: absolute;
  top: 119px;
  left: 29px;
  width: 318px;
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: flex-start;
  z-index: 10;
`;

const SceneTitle = styled.p`
  margin: 0;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
`;

const Dialogue = styled.div`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 24px;
  color: #ffffff;

  p {
    margin: 0;
  }
`;

const CharacterVideo = styled.div`
  position: absolute;
  left: 50%;
  top: 357px;
  transform: translateX(-50%);
  width: 160px;
  height: 240px;
  z-index: 5;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: none;
`;

const ChoicesContainer = styled.div`
  position: absolute;
  bottom: 56px;
  left: 50%;
  transform: translateX(-50%);
  width: 330px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  align-items: center;
  z-index: 10;
`;

const ChoiceButton = styled.button`
  background: #212121;
  border: none;
  border-radius: 10px;
  padding: 6px 139px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  transition: background 0.2s;

  &:hover {
    background: #2a2a2a;
  }

  &:active {
    background: #1a1a1a;
  }
`;

const ChoiceText = styled.p`
  margin: 0;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  color: #f6d4ff;
  opacity: 0.9;
  white-space: pre;
`;

export default function ScenePresenter({
  storyTitle,
  characterName,
  characterAvatar,
  sceneData,
  onChoiceSelect,
}) {
  const formatDialogue = (dialogue) => {
    if (!dialogue) return [];
    return dialogue.split('\n').filter((line) => line.trim());
  };

  const dialogueLines = formatDialogue(sceneData.dialogue);
  const videoPath = characterAvatar
    ? characterAvatar.replace('.png', '-video.mp4')
    : null;

  return (
    <Container>
      <Header>
        <StoryTitle>{storyTitle}</StoryTitle>
        <CharacterName>{characterName}</CharacterName>
      </Header>

      <ContentArea>
        <SceneTitle>{sceneData.title}</SceneTitle>
        <Dialogue>
          {dialogueLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </Dialogue>
      </ContentArea>

      {videoPath && (
        <CharacterVideo>
          <Video autoPlay loop playsInline controlsList="nodownload">
            <source src={videoPath} type="video/mp4" />
          </Video>
        </CharacterVideo>
      )}

      {sceneData.choices && sceneData.choices.length > 0 && (
        <ChoicesContainer>
          {sceneData.choices.map((choice, index) => (
            <ChoiceButton
              key={index}
              onClick={() => onChoiceSelect(choice.nextSceneId)}
            >
              <ChoiceText>{choice.text}</ChoiceText>
            </ChoiceButton>
          ))}
        </ChoicesContainer>
      )}
    </Container>
  );
}

