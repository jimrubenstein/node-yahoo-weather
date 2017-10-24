"use strict";

let httpClient = null;
const baseUrl = "https://query.yahooapis.com/v1/public/yql";

const PLACE_TYPES = {
	CONTINENT: 29,
	COUNTRY: 12,
	ADMIN: 8,
	ADMIN2: 9,
	ADMIN3: 10,
	TOWN: 7,
	SUBURB: 22,
	POSTAL_CODE: 11,
	SUPERNAME: 19,
	COLLOQUIAL: 24,
	TIME_ZONE: 31,
};

function baseQuery() {
	return 'SELECT * FROM weather.forecast WHERE woeid IN ( %s )';
}

function buildHttpClient() {
	httpClient = require('../lib/HttpClient.js');
}

function getHttpClient() {
	if ( ! httpClient) {
		setHttpClient(buildHttpClient());
	}

	return httpClient;
}

function getForLocation(location) {
	let query = baseQuery();
	let locationQuery = 'SELECT woeid FROM geo.places(1) WHERE text = \'' + location + '\'' AND placetype IN (' + [PLACE_TYPES.SUBURB, PLACE_TYPES.TOWN].join(',') + ')';

	query = sprintf(query, locationQuery);

	return getWeather(query);
}

function getForZip(zip) {
	let query = baseQuery();
	let locationQuery = 'SELECT woeid FROM geo.places(1) WHERE text = ' + zip + ' AND placetype = ' + PLACE_TYPES.POSTAL_CODE;

	query = sprintf(query, locationQuery);

	return getWeather(query);
}

function getWeather(query, opts) {
	return getHttpClient().get(baseUrl, {
		q: query,
		format: json,
	});
}

function setHttpClient(client) {
	httpClient = client;
}

module.exports = {
	getForLocation: getForLocation,
	getForZip: getForZip,

	setHttpClient: setHttpClient,
};