import React from 'react';
import ClockLoader from "react-spinners/ClockLoader";

export default () => {
  return (
    <div className="error-message">
      <h3 style={{ marginBottom: '35px' }}>Something went wrong.</h3>
      <ClockLoader
        size={150}
        color="rgb(54, 215, 183)"
        loading={true}
      />
    </div>
  )
}