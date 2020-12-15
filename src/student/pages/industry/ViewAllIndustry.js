import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux'

import './index.css';
import Page from '../Page';

const ViewAllIndustry = () => {
  const { displayedPosts } = useSelector(state => state.industry)
  const history = useHistory();

  const dataToRow = (data) => {
    const {
      postID,
      companyPostTitle,
      lastUpdated,
      company
    } = data;
    const state = {
        ...data
    }
    const handleClick = () => history.push({pathname: `/student/industry/${postID}`, state});
    return (
      <li key={postID}>
        <Card
          className="industry-list-card"
          onClick={handleClick}
        >
          <Card.Body>
            <Card.Title style={{fontWeight: 'bold'}}>{companyPostTitle}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{company.companyName}</Card.Subtitle>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated on {lastUpdated.toLocaleDateString()}</small>
          </Card.Footer>
        </Card>
      </li>
    )
  };

  const listItems = displayedPosts.map(item => dataToRow(item))

  return (
  <Page title="Industry">
    <section>
      <h3>Industry</h3>
      <ul class="list-unstyled">
        {listItems}
      </ul>
    </section>
  </Page>
  )
}

export default ViewAllIndustry;