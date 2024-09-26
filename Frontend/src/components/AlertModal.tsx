import React from 'react';

interface ErrorMessageProps_I {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps_I> = (props) => {
  return (
    <div style={{ color: 'red', fontSize: '14px' }}>
      {props.message}
    </div>
  );
};

export default ErrorMessage;
