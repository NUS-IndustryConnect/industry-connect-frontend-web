import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import adminApi from '../../server/adminApi';
import companyApi from '../../server/companyApi';
import studentApi from '../../server/studentApi';
import { putPayloadToState, pluraliseThunk } from '../utils';
import { companiesSelector, mergeCompanyInfo } from './companySlice';
import { approveRequest, requestSelector } from './requestSlice';

// thunks
const getAdminPosts = createAsyncThunk('admin/posts/get', adminApi.companyPosts.getPosts)
const getStudentPosts = createAsyncThunk('student/posts/get', studentApi.getCompanyPosts)
const getIndustryPosts = createAsyncThunk('industry/posts/get', companyApi.companyPosts.getPostsByCompany)
const createPost = createAsyncThunk('admin/posts/create', adminApi.companyPosts.createPost)
const updatePost = createAsyncThunk('admin/posts/update', adminApi.companyPosts.updatePost)
const archivePost = createAsyncThunk('admin/posts/archive', adminApi.companyPosts.archivePost)
const unarchivePost = createAsyncThunk('admin/posts/unarchive', adminApi.companyPosts.unarchivePost)
const deletePost = createAsyncThunk('admin/posts/delete', adminApi.companyPosts.deletePost)

const archivePosts = pluraliseThunk(archivePost);
const unarchivePosts = pluraliseThunk(unarchivePost);

export const postThunks = {
  getAdminPosts,
  getStudentPosts,
  getIndustryPosts,
  createPost,
  updatePost,
  archivePosts,
  unarchivePosts,
  deletePost
}

const replacePost = (state, action) => {
  return state.map(elem =>
    elem.companyPostId === action.payload.companyPostId
      ? action.payload
      : elem);
}

export const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    clearPostData: () => [],
  },
  extraReducers: {
    [getAdminPosts.fulfilled]: putPayloadToState,
    [getStudentPosts.fulfilled]: putPayloadToState,
    [getIndustryPosts.fulfilled]: putPayloadToState,
    [createPost.fulfilled]: putPayloadToState,
    [updatePost.fulfilled]: putPayloadToState,
    [archivePost.fulfilled]: replacePost,
    [unarchivePost.fulfilled]: replacePost,
    [deletePost.fulfilled]: putPayloadToState,
    [approveRequest.fulfilled]: putPayloadToState,
  }
});

// actions
export const { clearPostData } = postSlice.actions;

// selectors
const rawPostsSelector = state => state.industry.posts;
export const postsSelector = state => {
  const posts = rawPostsSelector(state);
  const companies = companiesSelector(state);
  return mergeCompanyInfo(posts, companies);
};
export const activePostsSelector = state => {
  return postsSelector(state).filter(elem => elem.isActive)
}
export const archivedPostsSelector = state => {
  return postsSelector(state).filter(elem => !elem.isActive);
}
export const postSelector = companyPostId => state => {
  return postsSelector(state)
    .find(elem => elem.companyPostId === companyPostId)
}
export const postOrRequestSelector = companyPostId => state => {
  return postSelector(companyPostId)(state)
      || requestSelector(companyPostId)(state);
}

export const postsByCompanySelector = companyId => state => {
  return postsSelector(state)
    .filter(elem => elem.companyId === companyId)
}

export default postSlice.reducer;
