import React from 'react'
import './styles/Card.css';

export const Card = ({ start, end }) => (
  <div className="card-wrapper">
    <div className='card-content'>From: {start}</div>
    <div className='card-content'>To: {end}</div>
  </div>
);

