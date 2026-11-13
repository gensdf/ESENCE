```javascript
/*
    VOLTGUARD
    Version 1 - Sensor Simulation

    These values are currently simulated.

    Later, they can be replaced with
    actual readings from the ESP32.
*/


let current = 80;
let voltage = 230;
let temperature = 35;

let powerConnected = true;


/* THRESHOLDS */

const MIN_CURRENT = 60;
const MAX_CURRENT = 100;
const MIN_VOLTAGE = 207;
const MAX_VOLTAGE = 253;
const MIN_TEMPERATURE = 30;
const MAX_TEMPERATURE = 40;


/* UPDATE DISPLAY */

function updateDisplay() {

    document.getElementById("currentValue").textContent =
        current.toFixed(1);

    document.getElementById("voltageValue").textContent =
        voltage.toFixed(0);

    document.getElementById("temperatureValue").textContent =
        temperature.toFixed(0);

    checkElectricalStatus();
}


/* CHECK ELECTRICAL CONDITIONS */

function checkElectricalStatus() {

    let problem = null;


    if (current < MIN_CURRENT || current > MAX_CURRENT) {

        problem = {
            type: "danger",
            title: "Overcurrent detected",
            message: "Current is outside the usual household range of 60-100 A."
        };

    }


    else if (
        voltage < MIN_VOLTAGE ||
        voltage > MAX_VOLTAGE
    ) {

        problem = {
            type: "warning",
            title: "Abnormal voltage detected",
            message: "Voltage is outside the configured operating range."
        };

    }


    else if (
        temperature < MIN_TEMPERATURE ||
        temperature > MAX_TEMPERATURE
    ) {

        problem = {
            type: "danger",
            title: "High temperature detected",
            message: "Temperature is outside the usual range of 30-40 °C."
        };

    }


    if (problem) {

        showAlert(
            problem.type,
            problem.title,
            problem.message
        );

    }

    else {

        showNormal();

    }

}


/* NORMAL STATUS */

function showNormal() {

    const card =
        document.getElementById("statusCard");

    card.className =
        "status-card normal";


    document.getElementById("statusIcon").textContent =
        "✓";


    document.getElementById("systemStatus").textContent =
        "NORMAL";


    document.getElementById("statusMessage").textContent =
        "No electrical abnormalities detected.";

}


/* ALERT STATUS */

function showAlert(type, title, message) {

    const card =
        document.getElementById("statusCard");


    card.className =
        "status-card " + type;


    if (type === "danger") {

        document.getElementById("statusIcon").textContent =
            "!";

    }

    else {

        document.getElementById("statusIcon").textContent =
            "!";

    }


    document.getElementById("systemStatus").textContent =
        title.toUpperCase();


    document.getElementById("statusMessage").textContent =
        message;


    /*
        In the actual ESP32 version,
        this is where the application could
        receive an alert from the device.
    */

}


/* CLEAR EVENTS */

function clearEvents() {

    document.getElementById("eventList").innerHTML =
        `
        <div class="event">

            <span class="event-icon success">
                ✓
            </span>

            <div>

                <strong>
                    No recent events
                </strong>

                <p>
                    Event history has been cleared.
                </p>

            </div>

            <span class="event-time">
                Now
            </span>

        </div>
        `;

}


/*
    SIMULATED SENSOR UPDATE

    This changes the readings slightly
    every 3 seconds.

    REMOVE THIS FUNCTION WHEN CONNECTING
    TO THE REAL ESP32.
*/

function simulateSensors() {

    current =
        60 + Math.random() * 40;

    voltage =
        230;

    temperature =
        30 + Math.random() * 10;


    updateDisplay();

}


/* INITIALIZE */

updateDisplay();


/*
    Update simulated sensor values
    every 3 seconds.
*/

setInterval(
    simulateSensors,
    3000
);
```
