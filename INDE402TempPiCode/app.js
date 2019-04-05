const five = require('johnny-five');
const board = new five.Board();
const axios = require("axios");
let photoResistor;
var date = new Date();

board.on('ready', function () {
    photoResistor = new five.Sensor({
        pin: "A2",
        freq: 5000
    });

    board.repl.inject({
        pot: photoResistor
    });

    photoResistor.on("data", function () {
        var state = "open";
        var sensorValue = this.value;
        if (sensorValue > 600) {
            axios.post('https://thawing-beyond-54587.herokuapp.com/addData', {
                state: 'off',
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            })
                .then((res) => {
                    console.log('Light is off at ' + new Date().toLocaleTimeString())
                })

        } else {
            axios.post('https://thawing-beyond-54587.herokuapp.com/addData', {
                state: 'on',
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            })
                .then((res) => {
                    console.log('Light is on at ' + new Date().toLocaleTimeString())
                })
        }
    });

});