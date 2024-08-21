import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL
const apiPath = process.env.REACT_APP_API_PATH

const axiosInstance = axios.create({
	baseURL: `${baseURL}/v2/api/${apiPath}/`,
})

//  Handle the axios response
axiosInstance.interceptors.response.use(
	(res) => {
		return res
	},
	(error) => {
		return Promise.reject(error)
	}
)

// product
export const getAllProducts = async () => {
	return await axiosInstance.get(`products/all`)
}

export const getProduct = async (id) => {
	return await axiosInstance.get(`product/${id}`)
}

export const getProductsPage = async (page) => {
	return await axiosInstance.get(`products?page=${page}`)
}

// cart
export const getCartData = async () => {
	return await axiosInstance.get(`cart`)
}

export const postCart = async (data) => {
	return await axiosInstance.post(`cart`, data)
}

export const deleteCartItem = async (id) => {
	return await axiosInstance.delete(`cart/${id}`)
}

// coupon
export const postCoupon = async (couponCode) => {
	return await axiosInstance.post(`coupon/`, { data: { code: couponCode } })
}

// article
export const getAllArticles = async () => {
	return await axiosInstance.get(`articles`)
}

export const getArticlePage = async (page) => {
	return await axiosInstance.get(`articles?page=${page}`)
}

export const getArticleItem = async (id) => {
	return await axiosInstance.get(`article/${id}`)
}

// order
export const getOrderData = async (orderId) => {
	return await axiosInstance.get(`order/${orderId}`)
}

export const postOrder = async (form) => {
	return await axiosInstance.post(`order`, form)
}

// pay
export const postPay = async (orderId) => {
	return await axiosInstance.post(`pay/${orderId}`)
}