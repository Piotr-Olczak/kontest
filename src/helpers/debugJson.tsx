import React from 'react';

export const DebugJson: React.FC<any> = (props: any) => {
  const shouldShow = process.env.NODE_ENV === 'development';
  if (!shouldShow) return null;
  return (
    <div style={{ height: '200px', overflow: 'auto' }}>
      <h4>Debug</h4>
      <div style={{ margin: '1rem 0' }}>
        <pre
          style={{
            background: '#f6f8fa',
            fontSize: '.65rem',
            padding: '.5rem'
          }}
        >
          <strong>props</strong> = {JSON.stringify(props, null, 2)}
        </pre>
      </div>
    </div>
  );
};
