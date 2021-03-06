import React from 'react';

import './Announcement.css'

export default function Announcement({ data = {}, history }) {
  const {
    title,
    subtitle,
    description = "",
  } = data;
  return (
    <div className="announcement">
      <div className="announcement-header">
        <h3>{title}</h3>
      </div>
      <h5>{subtitle}</h5>
      <div className="description">
        { description.split("\n").map((para, i) => <p key={i}>{para}</p>) }
      </div>
    </div>
  )
}
