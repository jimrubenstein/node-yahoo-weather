class Zip {
	constructor(zipcode) {
		this.setZip(zipcode);
	}

	getZip() {
		return this.zip;
	}

	setZip(zip) {
		this.zip = zip;
	}
}

module.exports = Zip;