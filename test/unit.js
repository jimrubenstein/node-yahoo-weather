"use strict";

const sinon = require('sinon');
const expect = require('chai').expect;

describe('Yahoo Weather API', function() {
	it("Supports a zip code object", function() {
		const Zip = require('../src/objects/Zip');
		let Z = new Zip(29229);

		expect(Z).to.be.an.instanceOf(Zip);
		expect(Z.getZip()).to.equal(29229);
	});

	it("Supports a location object", function() {
		const Location = require('../src/objects/Location');
		let L = new Location("Columbia, SC");

		expect(L).to.be.an.instanceOf(Location);
		expect(L.getLocation()).to.equal("Columbia, SC");
	});

	describe("Gets weather for zip codes", function() {
		let YahooClient = require('../src/ApiDrivers/Yahoo');
		let yw = require('../src');

		before(function() {
			sinon.stub(YahooClient, 'getForZip').returns(new Promise(function(resolve) {
				resolve(require('./mock-response-data/zip-weather'));
			}));

			yw.setClient(YahooClient);
		});

		after(function() {
			YahooClient.getForZip.restore();
		});

		it('gets the current weather for a zipcode', async function() {
			let weather = null;
			weather = await yw.current(new yw.Zip(29229));

			expect(weather).to.have.property('current');
			expect(weather.current).to.have.property('temp');
			expect(Number(weather.current.temp)).to.equal(115);
		});

		it('gets the forecast for a zipcode', async function() {
			let forecast = null;
			forecast = await yw.forecast(new yw.Zip(29229));

			expect(forecast).to.have.property('forecast');
			expect(forecast.forecast).to.be.a('array');
			expect(forecast.forecast).to.be.lengthOf(5);
		});
	});

	describe("Gets weather for text-based locations", function() {
		let YahooClient = require('../src/ApiDrivers/Yahoo');
		let yw = require('../src');

		before(function() {
			sinon.stub(YahooClient, 'getForLocation').returns(new Promise(function(resolve) {
				resolve(require('./mock-response-data/location-weather'));
			}));

			yw.setClient(YahooClient);
		});

		after(function() {
			YahooClient.getForLocation.restore();
		});

		it('gets current weather for a text-defined city', async function() {
			let weather = null;
			weather = await yw.current(new yw.Location("Columbia, SC"));

			expect(weather).to.have.property('current');
			expect(weather.current).to.have.property('temp');
			expect(Number(weather.current.temp)).to.equal(-25);
		});

		it('gets the forecast for a text-defined city', async function() {
			let forecast = null;
			forecast = await yw.forecast(new yw.Location("Columbia, SC"));

			expect(forecast).to.have.property('forecast');
			expect(forecast.forecast).to.be.a('array');
			expect(forecast.forecast).to.be.lengthOf(5);
		});
	});
});