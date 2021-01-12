<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getPosts } from '../../../api/posts';

import Page from '../../Page';
import Table from '../../Table';

export default function Manage() {
  const [data, setData] = useState({ approved: [], pending: [] });
  const history = useHistory();
  useEffect(() => {
    getPosts().then(setData);
  }, []);

  const dataToRow = ({ postID, companyPostTitle, company, lastUpdated }) => (
    <tr 
      key={postID}
      onClick={() => history.push(`/admin/industry/posts/preview/${postID}`)}
      className="clickable"
    >
      <td>{companyPostTitle}</td>
      <td>{company.companyName}</td>
      <td>{lastUpdated.toLocaleDateString()}</td>
    </tr>
  );

  return (
    <Page title="Manage Industry Posts">
      <Link to="/admin/industry/posts/new">
        <button className="primary">New Industry Post</button>
      </Link>
=======
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ButtonLink from '../../../../common/ButtonLink';
import { displayedPostsSelector, archivedPostsSelector, postThunks } from '../../../../redux/industry/postSlice';
import { requestsSelector } from '../../../../redux/industry/requestSlice';

import Page from '../../Page';
import Table from '../../Table';
import SelectTable from '../../SelectTable';

export default function Manage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const displayedPosts = useSelector(displayedPostsSelector);
  const archivedPosts = useSelector(archivedPostsSelector);
  const requests = useSelector(requestsSelector);

  const dataToRow = type => (data, checkbox=null) => {
    const urlPath = `/admin/industry/posts/${type === "requests" ? "preview": "view"}`;
    const { companyPostID, postTitle, companyName, lastUpdated } = data;
    const handleClick = () => history.push(`${urlPath}/${companyPostID}`);
    return (
      <tr key={companyPostID}>
        { type === "posts" ? <td>{ checkbox }</td> : null }
        <td onClick={handleClick} className="clickable">{postTitle}</td>
        <td onClick={handleClick} className="clickable">{companyName}</td>
        <td onClick={handleClick} className="clickable">{lastUpdated.toLocaleDateString()}</td>
      </tr>
    )
  };

  const archivePosts = {
    label: "Archive",
    className: "secondary",
    onClick: selections => {
      dispatch(postThunks.archivePosts(selections));
    }
  }

  const deletePosts = {
    label: "Delete",
    className: "warning",
    onClick: selections => {
      dispatch(postThunks.deletePosts(selections));
    }
  }

  return (
    <Page title="Manage Industry Posts">
      <ButtonLink to="/admin/industry/posts/new" label="New Industry Post" className="primary" />
>>>>>>> 0abed8ac06c26622be97d96678b2b86a2eb41ada
      
      <section>
        <h3>Pending</h3>
        <Table
          headers={["Title", "Company", "Last Updated"]}
<<<<<<< HEAD
          data={data.pending}
          dataToRow={dataToRow}
=======
          data={requests}
          dataToRow={dataToRow("requests")}
          className="pending"
>>>>>>> 0abed8ac06c26622be97d96678b2b86a2eb41ada
        />
      </section>
  
      <section>
<<<<<<< HEAD
        <h3>Approved</h3>
        <Table
          headers={['Title', "Company", "Last Updated"]}
          data={data.approved}
          dataToRow={dataToRow}
=======
        <h3>Displayed</h3>
        <SelectTable
          headers={['Title', "Company", "Last Updated"]}
          data={displayedPosts}
          idKey="companyPostID"
          dataToRow={dataToRow("posts")}
          actions={[ archivePosts, deletePosts ]}
        />
      </section>

      <section>
        <h3>Archived</h3>
        <SelectTable
          headers={['Title', "Company", "Last Updated"]}
          data={archivedPosts}
          idKey="companyPostID"
          dataToRow={dataToRow("posts")}
          className="archived"
          actions={[ deletePosts ]}
>>>>>>> 0abed8ac06c26622be97d96678b2b86a2eb41ada
        />
      </section>
    </Page>
  )
}