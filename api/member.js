import request from '@/utils/requestUtil'

export function memberLogin(data) {
	return request({
		method: 'POST',
		url: '/sso/login',
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
		},
		data: data
	})
}
export function memberRegist(params) {
	return request({
		method: 'POST',
		url: '/sso/register',
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
		},
		params:params
	})
}

export function memberInfo() {
	return request({
		method: 'GET',
		url: '/sso/info'
	})
}
// export function fetchMemberDetail(id) {
// 	return request({
// 		method: 'GET',
// 		url: `/sso/${id}`
// 	})
// }

export function updateMember(data) {
	return request({
		method: 'POST',
		url: `/sso/update/${data.id}`,
		data:data
	})
}
