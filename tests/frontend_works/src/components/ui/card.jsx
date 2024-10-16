import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`border rounded-md shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="font-bold mb-2">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};
