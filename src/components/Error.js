import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

const Error = () => {
  return (
    <div className="Error">
      <h1>not found</h1>
      <div>
        <Link to="/">list</Link>
      </div>
    </div>
  );
};

export default Error;
