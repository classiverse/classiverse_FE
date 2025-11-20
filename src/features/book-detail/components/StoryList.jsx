import styled from 'styled-components';

const Section = styled.section`
  padding: 0;
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 18px; /* Dev 모드: 섹션 타이틀 18 */
  color: #ffffff;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const Rail = styled.div`
  position: absolute;
  right: -7px;
  top: 1px;
  width: 5px;
  height: 242px;
  background: #1b1b1b;
  border-radius: 5px;
`;

const RailHighlight = styled.div`
  position: absolute;
  right: -7px;
  top: 1px;
  width: 5px;
  height: 43px;
  background: #f6d4ff;
  border-radius: 5px;
`;

const Item = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 98%;
  padding: 14px 10px; /* Dev 모드: px10 py14 */
  background: #1b1b1b;
  border: 1px solid #1b1b1b;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.06s ease;

  &:active {
    transform: translateY(1px);
  }
`;

const StoryTitle = styled.span`
  font-size: 13px;
  color: #ffffff;
  text-align: left;
  font-weight: 400;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex: 1;
`;

const LockIcon = styled.img`
  width: 9px;
  height: 10.8px;
  flex-shrink: 0;
`;

const LockedItem = styled(Item)`
  opacity: 0.5;
  cursor: not-allowed;
  justify-content: flex-start;
  
  &:active {
    transform: none;
  }
`;

export default function StoryList({ stories, onStoryClick, book, activeStoryId }) {
  const list = stories ?? book?.stories ?? [];
  if (!Array.isArray(list) || list.length === 0) return null;

  return (
    <Section>
      <SectionTitle>5가지 이야기</SectionTitle>
      <List>
        <Rail />
        <RailHighlight />
        {list.map((story) => {
          const isActive = activeStoryId && activeStoryId === story.storyId;
          const isLocked = story.locked === true;
          const ItemComponent = isLocked ? LockedItem : Item;
          
          return (
            <ItemComponent
              key={story.storyId}
              onClick={() => !isLocked && onStoryClick?.(story.viewpointsDataUrl)}
              disabled={isLocked}
              data-story-id={story.storyId}
              style={isActive ? { color: '#f6d4ff', borderColor: '#f6d4ff' } : undefined}
            >
              {isLocked ? (
                <TitleWrapper>
                  <StoryTitle style={isActive ? { color: '#f6d4ff' } : undefined}>{story.title}</StoryTitle>
                  <LockIcon src="/images/story-lock.svg" alt="locked" />
                </TitleWrapper>
              ) : (
                <StoryTitle style={isActive ? { color: '#f6d4ff' } : undefined}>{story.title}</StoryTitle>
              )}
            </ItemComponent>
          );
        })}
      </List>
    </Section>
  );
}

