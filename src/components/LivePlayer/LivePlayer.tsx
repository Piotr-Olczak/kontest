import React, { useEffect, useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';

const LivePlayer: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');

    script.src =
      '//r.dcs.redcdn.pl/file/o2/web/player/redcdn/1.2.4/js/redcdnplayer.min.js';

    script.onload = function() {
      // @ts-ignore
      new window.redGalaxy.Player('video-feed-player').setup({
        file: {
          dash: '//r.dcs.redcdn.pl/dash/o2/Traf/live/kolektury/live-lo.livx'
        },
        autoplayBlockedRule: 'mute'
      });

      setIsLoading(false);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <section>
      {isLoading && (
        <>
          <Spinner />
          <p>Ładowanie...</p>
        </>
      )}
      <div id="video-feed-player" />
    </section>
  );
};

export default LivePlayer;
