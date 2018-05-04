import axios from 'axios'

let requestAxios = axios.create({
  baseURL: 'http://qa.trends-api.myntra.com/api/v1',
});

export function fetchFeedData(currentPage, fetchSize) {
  return (
    requestAxios({
      method:`get`,
      url:`/tagging?start=${currentPage - 1}&fetchSize=${fetchSize}`
    })
  )
}

export function updateFeedData(payload) {
	return (
    requestAxios({
      method:`post`,
      headers: {
        'Content-Type': 'application/json'
      },
      url:`/tagging/tag`,
      data: payload
    })
  )
}
