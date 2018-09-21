import axios from 'axios'
import { getCookie } from './utils/helpers'

export const fetch = (url, method = 'get', payload = {}) => {
    const { data = {}, ...rest } = payload
    try {
        var requestObject = {
            method: method,
            baseURL: 'http://52.15.122.122/api',
            headers: {
                'Content-Type': 'application/json',
                ...rest
            },
            withCredentials: false,
            validateStatus: (status) => {
                return status >= 200 && status < 500; // default
            },
            responseType: 'json',
            url: url
        }

        if (getCookie('authToken') !== '') {
            const token = getCookie('authToken')

            requestObject = {
                ...requestObject,
                headers: {
                    ...requestObject.headers,
                    Authorization: `Token ${token}`
                }
            }
        }

        if (Object.keys(data).length) {
            requestObject.data = data
        }

    } catch(e) {
        console.log('fetch error: ', e)
    }

    return axios(requestObject)
}
