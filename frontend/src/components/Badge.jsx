import React from 'react';

const Badge = ({ status }) => {
  const label = status.replace('_', ' ');
  return (
    <div className={`badge badge-${status}`}>
      {label}
    </div>
  );
};

export default Badge;
