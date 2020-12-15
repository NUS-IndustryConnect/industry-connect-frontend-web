import React from 'react';
import Page from '../../Page';
import ContactButton from './ContactButton';

export default function Preview(props) {
  const {
    companyPostTitle,
    description = "",
    videoURL,
  } = props;
  return (
    <Page title="Preview Post">
      <section className="post-header">
        <h3>{companyPostTitle}</h3>
        <button className="secondary">Edit</button>
      </section>
      { description.split("\n").map((para, i) => <p className={i}>{para}</p>) }
      { videoURL ? <iframe
        title={companyPostTitle}
        width="560"
        height="315"
        src={videoURL}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      /> : null}
      <section className="bottom-buttons">
        <ContactButton email="blah@example.com" />
        <div className="action-buttons">
          <button className="error">Reject</button>
          <button className="success">Approve</button>
        </div>
      </section>
    </Page>
  )
}