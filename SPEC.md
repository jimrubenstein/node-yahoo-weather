## Yahoo Weather API Wrapper

**Purpose**

To provide a simple interface to the Yahoo Weather API that doesn't require the user to know the whole API inside an out, and allows simple integration into existing applications.

**Usage**

    const yw = require('yahoo-weather');

    yw.current(new yw.Zip(29229)).then( Weather => {
        console.log("current weather object", Weather);
    })
    .catch( error => {
        console.error("couldn't fetch weather", error);
    });

    yw.current(new yw.Location("Blythewood, SC")).then( Weather => {
        console.log("current weather object", Weather);
    })
    .catch( error => {
        console.error("couldn't fetch weather", error);
    });

    yw.forecast(new yw.Zip(29229)).then(Weather => {
        console.log("the weather forecast!", Weather);
    })
    .catch( error => {
        console.error("couldn't fetch weather", error);
    });

    yw.current(new yw.Zip(29229), { units: 'Metric' }).then( Weather => {
        console.log("The current weather, in metric units", Weather);
    });

