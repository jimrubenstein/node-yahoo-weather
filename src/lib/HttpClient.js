const request = require('request-promise-native');

function makeRequest(options) {
	return request(options);
}

module.exports = {
	get: function(url, data, opts) {
		return makeRequest({
			uri: url,
			method: 'GET',
			qs: data,
			...opts
		}).then( response => {
			return JSON.parse(response);
		});
	}
}