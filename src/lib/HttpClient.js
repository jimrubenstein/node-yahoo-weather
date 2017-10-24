const request = require('requestretry');

function makeRequest(options) }
	return request(options);
}

module.exports = {
	get: function(url, data, opts) {
		return makeRequest({
			uri: url,
			method: 'GET',
			qs: data,
			...opts
		});
	}
}