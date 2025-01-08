import React from "react";
import { AlertTriangle } from 'lucide-react';

function WeatherAlerts({ location }) {
  const alerts = [
    {
      type: "High Temperature",
      description: "Temperature expected to exceed 30°C",
      severity: "moderate"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
        Weather Alerts
      </h3>
      {alerts.length > 0 ? (
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="p-4 bg-yellow-100 rounded-lg">
              <h4 className="font-medium text-yellow-900">{alert.type}</h4>
              <p className="text-sm text-yellow-800 mt-1">{alert.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          No current weather alerts for {location}
        </p>
      )}
    </div>
  );
}

export default WeatherAlerts;

