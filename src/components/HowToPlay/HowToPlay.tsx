import React, { useEffect, useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import { mockCmsDataHowToPlay } from 'mocks/cms-data';
import CommonError from 'components/CommonError/CommonError';
import { cmsDataHelper } from 'helpers/cmsData.helper';
import { htmlHelper } from 'helpers/html.helper';

const HowToPlay: React.FC = () => {
  const [howToPlayContent, setHowToPlayContent] = useState();
  const [errorLoadingData, setErrorLoadingData] = useState();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      mockCmsDataHowToPlay()
        .then(data => setHowToPlayContent(data))
        .catch(() => setErrorLoadingData(true));
    } else {
      cmsDataHelper
        .getContentHowToPlay()
        .then(data => {
          setHowToPlayContent(data && data.data);
        })
        .catch(() => setErrorLoadingData(true));
    }
  }, []);

  return howToPlayContent || errorLoadingData ? (
    errorLoadingData ? (
      <CommonError />
    ) : (
      <div
        className="cms-content"
        dangerouslySetInnerHTML={htmlHelper.sanitize(howToPlayContent)}
      />
    )
  ) : (
    <Spinner />
  );
};

export default HowToPlay;
