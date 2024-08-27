import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL
const apiPath = process.env.REACT_APP_API_PATH

const axiosInstance = axios.create({
	baseURL: `${baseURL}/v2/api/${apiPath}/admin/`,
})

axiosInstance.interceptors.request.use(
	(config) => {
		const token = document.cookie
			?.split('; ')
			?.find((row) => row.startsWith('hexToken='))
			?.split('=')[1]
		if (token) {
			config.headers.Authorization = token
		}
		return config
	},
	(error) => {
		// do something to record the error
		return Promise.reject(error)
	}
)


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
export const getAllProducts = async (page) => {
  return await axiosInstance.get(`products?page=${page}`)
}

export const deleteProductItem = async (id) => {
  return await axiosInstance.delete(`product/${id}`)
}

export const editProductItem = async (id, data) => {
  return await axiosInstance.put(`product/${id}`, data)
}

export const postProduct = async (data) => {
  return await axiosInstance.post(`product`, data)
}

export const updateProduct = async (formData) => {
  return await axiosInstance.post(`upload`, formData)
}

// order
export const getAllOrders = async (page) => {
  return await axiosInstance.get(`orders?page=${page}`)
}

export const deleteOrderItem = async (id) => {
  return await axiosInstance.delete(`order/${id}`)
}

export const editOrderItem = async (id, data) => {
  return await axiosInstance.put(`order/${id}`, data)
}

// coupon
export const getAllCoupons = async (page) => {
  return await axiosInstance.get(`coupons?page=${page}`)
}

export const deleteCouponItem = async (id) => {
  return await axiosInstance.delete(`coupon/${id}`)
}

export const editCouponItem = async (id, data) => {
  return await axiosInstance.put(`coupon/${id}`, data)
}

export const postCoupon = async () => {
  return await axiosInstance.post(`coupon`)
}

// article
export const getAllArticle = async (page) => {
  return await axiosInstance.get(`articles?page=${page}`)
}

export const getAllArticleItem = async (id) => {
  return await axiosInstance.get(`article/${id}`)
}

export const deleteArticleItem = async (id) => {
  return await axiosInstance.delete(`article/${id}`)
}

export const editArticleItem = async (id, data) => {
  return await axiosInstance.put(`coupon/${id}`, data)
}

export const postArticle = async () => {
  return await axiosInstance.post(`articles`)
}

export const updateArticle = async (formData) => {
  return await axiosInstance.post(`upload`, formData)
}