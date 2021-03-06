import { api, CLIENT_ID, REDIRECT_URI } from "./utils";

const fetchAuth = async (code) => {
  const data = {
    code: code,
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code"
  }
  return api.post("/account/login/soc", data)
  .then(res => res.data)
  .catch(err => { throw err; })
}

const sendOTP = (email) => {
  const data = {
    email: email
  }
  return api.post("/account/login/company", data)
		.then(response => response.data)
		.catch(error => { throw error });
}

const verifyOTP = (data) => {
  return api.post("/account/login/company/otp", data)
		.then(response => response.data)
		.catch(error => { throw error });
}

const authenticationApi = {
  fetchAuth,
  sendOTP,
  verifyOTP
}

export default authenticationApi;
