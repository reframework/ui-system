import React from 'react';
import Typography from '../Typography/Typography';

export const StoryLayout: React.FC = ({ children, title }) => {
  return (
    <div>
      <Typography component="h1" size="xxl" weight="bold" align="center" >
        {title}
      </Typography>

      <div
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid var(--color-scale-gray-2)',
          borderRadius: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 20,
          maxWidth: 500,
          padding: '20px 50px',
          width: '100vw',
        }}
      >
        {children}
      </div>
    </div>
  );
};
