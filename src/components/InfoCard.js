import React from 'react';

function InfoCard({ icon, title, value }) {
  return (
    <div className="stat-card">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-2xl">{icon}</div>
        <h3 className="text-sm font-medium text-blue-100">{title}</h3>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

export default InfoCard;

