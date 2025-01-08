import React from 'react';

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center transition-all hover:bg-white/40 hover:transform hover:scale-105">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="text-sm font-medium text-gray-700 mb-1">{title}</h3>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}
export default InfoCard;