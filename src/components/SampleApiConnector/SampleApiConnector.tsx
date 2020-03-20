import React, { useState, useEffect } from 'react';
import { apiRequest, apiGetData, apiPostData } from 'helpers/apiConnector';

const samplePostData = {
  title: 'new post from app',
  body: 'bar',
  userId: 1
};

const SampleApiConnector: React.FC = () => {
  const [title, setTitle] = useState();

  // sample calback after recieving data
  const setTodos = (data: any) => {
    setTitle(data.title);
  };

  // sample callback after posting data
  const samplePostCallback = (data: Object) => {
    console.log('Data sent');
    console.log(data);
  };

  useEffect(() => {
    // Regular GET api call with callback
    apiGetData('/todos/1', setTodos);

    // Custom call
    apiRequest({
      url: '/todos/2',
      method: 'get'
    });
  }, []);

  return (
    <div>
      <h2>Axios helpers testaa</h2>
      <p>Title: {title}</p>
      <button
        onClick={() =>
          apiPostData('/posts', samplePostData, samplePostCallback)
        }
      >
        Add new post
      </button>
    </div>
  );
};

export default SampleApiConnector;
