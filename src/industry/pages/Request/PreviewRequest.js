import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import PostPreview from '../../../common/post/PostPreview';
import { requestThunks } from '../../../redux/industry/requestSlice';
import { userInfoSelector } from '../../../redux/user/userSelectors';
import Page from '../Page';

export default function PreviewRequest() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location?.state.data;
  const userInfo = useSelector(userInfoSelector);

  const submit = () => {
    const filledData = {
      ...data,
      companyId: userInfo.companyId,
      companyUserId: userInfo.companyUserId,
    }
    dispatch(requestThunks.createRequest(filledData));
    history.push("/industry/requests/submitted");
    toast.success("Created request");
  }
  return (
    <Page
      title="Preview Post Request"
      isError={!Boolean(data)}
      errorMessage={<p>Post not found. Please select another post.</p>}
    >
      <PostPreview data={data} urlPath="/industry/requests" />
      <input type="button" onClick={submit} value="Submit for vetting" className="primary"/>
    </Page>
  )
}
