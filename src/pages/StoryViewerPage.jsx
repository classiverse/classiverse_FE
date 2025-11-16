import React from 'react';
import { useParams } from 'react-router-dom';

export default function StoryViewerPage() {
  const { storyId, characterId } = useParams();
  return (
    <div style={{ padding: 20 }}>
      <h1>Story Viewer</h1>
      <p>storyId: {storyId}</p>
      <p>characterId: {characterId}</p>
    </div>
  );
}

