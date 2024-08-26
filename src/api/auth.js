import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

const axiosInstance = axios.create({ baseURL })

//  Handle the axios response
axiosInstance.interceptors.response.use(
	(res) => {
		return res
	},
	(error) => {
		return Promise.reject(error)
	}
)

// signin
export const postSignin = async (data) => {
	return await axiosInstance.post('/v2/admin/signin', data)
}

// check
export const postCheck = async (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = token;
	return await axiosInstance.post('/v2/api/user/check')
}