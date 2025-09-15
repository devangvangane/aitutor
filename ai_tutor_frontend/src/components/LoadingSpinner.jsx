// src/components/LoadingSpinner.js
import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner">
      <Loader className="spinner" size={32} />
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;