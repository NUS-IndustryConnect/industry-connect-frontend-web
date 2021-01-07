import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux'

import './index.css';
import Page from '../Page';
import {
  displayedAnnouncementsSelector,
  pinnedAnnouncementsSelector
} from '../../../redux/announcementSlice';

const ViewAllAnnouncements = () => {
  const displayedAnnouncements = useSelector(displayedAnnouncementsSelector);
  const pinnedAnnouncements = useSelector(pinnedAnnouncementsSelector);
  const history = useHistory();

  const dataToRow = (item) => {
    const {
      announceID,
      title,
      subtitle,
      description,
      lastUpdated
    } = item;
    const state = {
      title: title, 
      subtitle: subtitle, 
      body: description,
    }
    // TODO: this only works if I was at ViewAllAnnouncements and click on one of the announcements
    // does not work if I go to the link directly e.g. http://localhost:3000/student/announcements/1
    // FIXME: inside ViewAnnouncement, make use of id
    // (which is the 1 in the URL, function supplied by react-router-dom)
    // and find the data from redux store
    const handleClick = () => history.push({pathname: `/student/announcements/${announceID}`, state});
    return (
      <li key={announceID}>
        <Card
          bg='primary'
          border='primary'
          className="announcement-list-card"
          onClick={handleClick}
        >
          <Card.Body>
            <Card.Title style={{fontWeight: 'bold'}}>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated on {lastUpdated.toLocaleDateString()}</small>
          </Card.Footer>
        </Card>
      </li>
    )
  }

  const pinnedListItems = pinnedAnnouncements.map((item) => dataToRow(item))
  const listItems = displayedAnnouncements.map((item) => dataToRow(item))

  return (
  <Page title="Announcements">
    <section className="pinned-list">
      <h3>Pinned Announcements</h3>
      <ul class="list-unstyled">
        {pinnedListItems}
      </ul>
    </section>
  
    <section className="announcement-list">
      <h3 >Announcements</h3>
      <ul class="list-unstyled">
        {listItems}
      </ul>
    </section>
  </Page>
  )
}

export default ViewAllAnnouncements;
