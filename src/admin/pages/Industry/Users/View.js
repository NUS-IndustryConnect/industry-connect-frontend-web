import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import VerticalTable from '../../../../common/VerticalTable';
import ButtonLink from '../../../../common/ButtonLink';
import { userSelector, userThunks } from '../../../../redux/industry/userSlice';
import Page from '../../Page';
import Table from '../../../../common/Table';

export default function View() {
  const { id } = useParams();
  const data = useSelector(userSelector(id));
  const {
    name,
    userEmail,
    company,
    lastLoggedIn,
    userPosts,
    isLocked,
    lockedUntil,
  } = data || {};
  const history = useHistory();
  const dispatch = useDispatch();

  const dataToRow = ({ companyPostID, lastUpdated, postTitle }) => (
    <tr
      key={companyPostID}
      onClick={() => history.push(`/admin/industry/posts/view/${companyPostID}`)}
      className="clickable"
    >
      <td>{postTitle}</td>
      <td>{lastUpdated.toLocaleDateString()}</td>
    </tr>
  )

  const unlockUser = () => {
    return dispatch(userThunks.unlockUser(id));
  }

  const userData = [
    { header: "Name", data: name },
    { header: "Email", data: userEmail },
    { header: "Company", data: company?.companyName },
    { header: "Last login", data: lastLoggedIn?.toLocaleDateString() },
  ];
  if (isLocked) userData.push({
    header: "Locked until",
    data: <React.Fragment>
      {lockedUntil.toLocaleString()}
      <button className="success right" onClick={unlockUser}>Unlock</button>
    </React.Fragment>
  });
  return (
    <Page
      title="View Company User"
      isError={!Boolean(data)}
      errorMessage={<p>User not found. Please select another user.</p>}
    >
      <VerticalTable data={userData}/>
      <ButtonLink to={`/admin/industry/users/edit/${id}`} label="Edit" className="secondary" />
      <section>
        <h4>Posts</h4>
        <Table
          headers={["Post Title", "Date"]}
          data={userPosts}
          dataToRow={dataToRow}
        />
      </section>
    </Page>
  )
}
