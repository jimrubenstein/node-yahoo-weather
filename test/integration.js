"use strict";

const sinon = require('sinon');
const expect = require('chai').expect;

describe('Yahoo Weather API -- Integration', function() {
	describe("Gets weather for zip", function() {
		let yw = require('../src');

		it('gets the current weather for a zipcode', async function() {
			let weather = null;
			weather = await yw.current(new yw.Zip(29229));

			expect(weather).to.have.property('current');
			expect(weather.current).to.have.property('temp');
			expect(Number(weather.current.temp)).to.be.a('number');
		});

		it('gets the forecast for a zipcode', async function() {
			let forecast = null;
			forecast = await yw.forecast(new yw.Zip(29229));

			expect(forecast).to.have.property('forecast');
			expect(forecast.forecast).to.be.a('array');
			expect(forecast.forecast).to.be.lengthOf(5);
		});
	});

	describe("Gets weather for location", function() {
		let yw = require('../src');

		it('gets the current weather for a zipcode', async function() {
			let weather = null;
			weather = await yw.current(new yw.Location('Columbia, SC'));

			expect(weather).to.have.property('current');
			expect(weather.current).to.have.property('temp');
			expect(Number(weather.current.temp)).to.be.a('number');
		});

		it('gets the forecast for a zipcode', async function() {
			let forecast = null;
			forecast = await yw.forecast(new yw.Location('Columbia, SC'));

			expect(forecast).to.have.property('forecast');
			expect(forecast.forecast).to.be.a('array');
			expect(forecast.forecast).to.be.lengthOf(5);
		});
	});
});
