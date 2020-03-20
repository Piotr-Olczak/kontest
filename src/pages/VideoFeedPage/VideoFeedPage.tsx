import React from 'react';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import LivePlayer from 'components/LivePlayer/LivePlayer';

const VideoFeedPage: React.FC = () => {
  return (
    <BasicLayout>
      <h1>Oglądaj na żywo</h1>
      <LivePlayer />
    </BasicLayout>
  );
};

export default VideoFeedPage;
