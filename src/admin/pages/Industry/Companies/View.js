import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import VerticalTable from '../../../../common/VerticalTable';
import Table from '../../../../common/Table';
import ButtonLink from '../../../../common/ButtonLink';
import { companySelector } from '../../../../redux/industry/companySlice';
import { usersOfCompanySelector } from '../../../../redux/industry/userSlice';
import { requestsByCompanySelector } from '../../../../redux/industry/requestSlice';
import { postsByCompanySelector } from '../../../../redux/industry/postSlice';
import Page from '../../Page';

export default function View() {
  const history = useHistory();
  const { id: companyId } = useParams();
  const data = useSelector(companySelector(companyId));
  const {
    companyName,
    companyTier,
    companyDescription,
  } = data || {};
  const users = useSelector(usersOfCompanySelector(companyId));
  const posts = useSelector(postsByCompanySelector(companyId));
  const requests = useSelector(requestsByCompanySelector(companyId))

  const usersDataToRow = ({ companyUserID, name, userEmail, lastLoggedIn }) => (
    <tr
      key={companyUserID}
      onClick={() => history.push(`/admin/industry/users/view/${companyUserID}`)}
      className="clickable"
    >
      <td>{name}</td>
      <td>{userEmail}</td>
      <td>{new Date(lastLoggedIn).toLocaleDateString()}</td>
    </tr>
  );
  const postsDataToRow = urlPath => ({ companyPostId, lastUpdated, postTitle }) => {
    // TODO: date given is in DD-MM-YYYY format but new Date() expects MM-DD-YYYY
    return (
      <tr
        key={companyPostId}
        onClick={() => history.push(`/admin/industry/posts/${urlPath}/${companyPostId}`)}
        className="clickable"
      >
        <td>{postTitle}</td>
        <td>{new Date(lastUpdated).toLocaleDateString()}</td>
      </tr>
    )
  };
  return (
    <Page
      title="View Company"
      isError={!Boolean(data)}
      errorMessage={<p>Company not found. Please select another company.</p>}
    >
      <h3>{companyName}</h3>
      <section>
        <VerticalTable data={[
          { header: "Tier", data: companyTier },
          { header: "Description", data: companyDescription },
          { header: "Users", data: users.length },
          { header: "Pending Requests", data: requests.length },
          { header: "Posts", data: posts.length },
        ]} />
        <ButtonLink to={`/admin/industry/companies/edit/${companyId}`} label="Edit" className="secondary" />
      </section>
      <section>
        <h4>Users</h4>
        <Table
          headers={["Name", "Email", "Last login"]}
          data={users}
          dataToRow={usersDataToRow}
        />
      </section>
      <section>
        <h4>Pending Requests</h4>
        <Table
          headers={["Post Title", "Date"]}
          data={requests}
          dataToRow={postsDataToRow("preview")}
          className="pending"
        />
      </section>
      <section>
        <h4>Posts</h4>
        <Table
          headers={["Post Title", "Date"]}
          data={posts}
          dataToRow={postsDataToRow("view")}
        />
      </section>
    </Page>
  );
}
