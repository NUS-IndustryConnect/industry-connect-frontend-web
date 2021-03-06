import { api } from "../utils";

const getPosts = async () => {
	// gets all company posts including archived
	return api.get("/companyPost")
		.then(response => response.data)
		.catch(error => { throw error });
}

const getValidPosts = () => {
	// gets all company posts that are not archived
	return api.get('/companyPost/valid');
}

const getPostsByCompany = companyId => {
  // gets all company posts for a given company (with archived)
	return api.get(`/companyPost/company/${companyId}`);
}

const getValidPostsByCompany = companyId => {
  // gets all valid company posts for a given company
	return api.get(`/companyPost/company/${companyId}/valid`);
}

const getPostsByUser = companyUserId => {
  // gets all companyPosts for a specific user
	return api.get(`/companyPost/user/${companyUserId}`);
}

const createPost = async data => {
	return api.post('/companyPost/create', data)
	.then(response => response.data);
}

const updatePost = async data => {
	return api.put('/companyPost/update', data)
		.then(response => response.data);
}

const archivePost = async companyPostId => {
	return api.put(`/companyPost/archive/${companyPostId}`)
		.then(response => response.data);
}

const unarchivePost = async companyPostId => {
	return api.put(`/companyPost/unarchive/${companyPostId}`)
		.then(response => response.data);
}

const deletePost = async companyPostId => {
	return api.delete(`/companyPost/delete/${companyPostId}`)
		.then(response => response.data);
}

const companyPosts = {
	getPosts,
	getValidPosts,
	getPostsByCompany,
	getValidPostsByCompany,
	getPostsByUser,
	createPost,
	updatePost,
	archivePost,
	unarchivePost,
	deletePost
}

export default companyPosts;
