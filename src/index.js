"use strict";

const Zip = require('objects/Zip');
const Location = require('objects/Location');
let client = null;

function current(location, options) {
	return weatherForZip(location, options).then( Weather => {
		return makeCurrentResponse(Weather);
	})
	.catch( error => {
		console.error(error);
	});
}

function makeCurrentResponse(Weather) {
	return {
		...makeBaseResponse(Weather),
		current: {
			condition: Weather.results.channel.item.condition.text,
			temp: Weather.results.channel.item.condition.temp,
			date: moment( Weather.results.channel.item.condition.date ),
		}
	}
}

function forecast(location, options) {
	return weatherForZip(location, options).then( Weather => {
		return makeForecastResponse(Weather);
	})
	.catch( error => {
		console.error(error);
	});
}

function makeForecastResponse(Weather) {
	return {
		...makeBaseResponse(Weather),
		forecast: {

		}
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

function weatherForZip(Zip, options) {
	return getClient().getForZip(Zip.getZip(), options);
}

function weatherForLocation(Location, options) {
	return getClient().getForLocation(Location.getLocation(), options);
}

module.exports = {
	current: current,
	forecast: forecast,
	Zip: Zip,
	Location: Location,

	setClient: setClient
}