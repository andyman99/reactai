import React, { useState, useEffect } from 'react';

const RandomProgressBar = () => {
  const [progress, setProgress] = useState(10); // Initial progress at 10%

  // Function to generate a random value between 10 and 90
  const getRandomValue = () => {
    return Math.floor(Math.random() * (90 - 10 + 1)) + 10;
  };

  useEffect(() => {
    // Set interval to update the progress value every 0.5 seconds
    const interval = setInterval(() => {
      setProgress(getRandomValue());
    }, 1000); // 500 ms = 0.5 second

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <br></br>
      <hr></hr>
      <p>Progress towards completed website {progress}%</p>
      <progress value={progress} max="100"></progress>
    </div>
  );
};

export default RandomProgressBar;
