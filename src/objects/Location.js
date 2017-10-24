class Location {
	constructor(location) {
		this.setLocation(location);
	}

	getLocation() {
		return this.location;
	}

	setLocation(location) {
		this.location = location;
	}
}

module.exports = Location;