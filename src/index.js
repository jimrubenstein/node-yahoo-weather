"use strict";

const moment = require('moment');
const Location = require('./objects/Location');
const Zip = require('./objects/Zip');

let client = null;

function current(location, options) {
	let response = null;

	if (location instanceof Location) {
		response = weatherForLocation(location, options);
	}
	else if (location instanceof Zip) {
		response = weatherForZip(location, options);
	}
	else {
		throw new Error("Method expects a Zip or Location type, " + (typeof location) + " given");
	}

	return response.then( Weather => {
		return makeCurrentResponse(Weather);
	})
	.catch( error => {
		console.error(error);
	});
}

function makeBaseResponse(Weather) {
	return {
		location: {
			...Weather.query.results.channel.location
		},
	};
}

function makeCurrentResponse(Weather) {
	return {
		...makeBaseResponse(Weather),
		current: {
			condition: Weather.query.results.channel.item.condition.text,
			temp: Weather.query.results.channel.item.condition.temp,
			date: moment( Weather.query.results.channel.item.condition.date, 'ddd, DD MMM YYYY hh:mm A z' ),

			wind: {
				...Weather.query.results.channel.wind,
			},
		}
	}
}

function forecast(location, options) {
	let response = null;

	if (location instanceof Location) {
		response = weatherForLocation(location, options);
	}
	else if (location instanceof Zip) {
		response = weatherForZip(location, options);
	}
	else {
		throw new Error("Method expects a Zip or Location type, " + (typeof location) + " given");
	}
	return response.then( Weather => {
		return makeForecastResponse(Weather);
	})
	.catch( error => {
		console.error(error);
	});
}

function makeForecastResponse(Weather) {

	let forecast = Weather.query.results.channel.item.forecast.map( item => {
		return {
			date: moment(item.date, "DD MMM YYYY"),
			high: item.high,
			low: item.low,
			condition: item.text,
		};
	}).slice(0, 5);

	return {
		...makeBaseResponse(Weather),
		forecast: forecast,
	}
}

function makeClient() {
	return require('./ApiDrivers/Yahoo');
}

function getClient() {
	if ( ! client) {
		setClient(makeClient());
	}

	return client;
}

function setClient(newClient) {
	client = newClient;
}

function weatherForZip(Z, options) {
	return getClient().getForZip(Z.getZip(), options);
}

function weatherForLocation(L, options) {
	return getClient().getForLocation(L.getLocation(), options);
}

module.exports = {
	current: current,
	forecast: forecast,
	Zip: Zip,
	Location: Location,

	setClient: setClient
}