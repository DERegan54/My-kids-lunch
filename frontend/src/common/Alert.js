import React from "react";
import './Alert.css';

function Alert({messages = [] }) {

  return (
      <div>
        {messages.map(error => (
            <p key={error}>
              <div className="Alert">
                {error}
                </div>
            </p>
        ))}
      </div>
  );
}

export default Alert;
