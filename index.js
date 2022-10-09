const express = require('express');
const app = express();
const port = 5000;

const { v4: uuidv4 } = require('uuid');
const circle = require('./functions/circle');

//app.use(express.json())

let hexRegex = /^#[0-9A-F]{6}$/i;

app.get('/circle', (req, res) => {
    try {
        let params = req.query
        console.log(params)

        // Param validation
        if (!params.percentage) { throw "Missing 'percentage' property." }
        if (!params.color) { throw "Missing 'color' property." }

        if (params.percentage < 0 || params.percentage > 100) {
            throw "Value for 'percentage' not within acceptable range."
        }

        let hwMin = 100
        if (params.width < hwMin || params.height < hwMin) {
            throw "Height and\/or width too low (<" + hwMin + ")"
        }

        // Valid: '#AABBCC'
        if (!hexRegex.test(params.color)) {
            throw "Value for 'color' is not a valid HEX color string. Accepted format: #AABBCC"
        }

        let strokeWidth = 5
        let radius = 50
        if (params.radius)      radius = parseInt(params.radius)
        if (params.strokeWidth) strokeWidth = parseInt(params.strokeWidth)

        // Verify height/width matching radius
        
        // Generate circle
        circle.draw(params.color, params.percentage, radius, strokeWidth)
            .then(data => { 
                res.type('png')
                res.send(data) 
            })
            .catch(error => { 
                console.log(error)
                res.status(500).send({"error": error})
            })
    } catch (error) {
        res.status(400).send({"error": error})
    }
});

app.listen(port, () => {
    console.log("Server spawned on port " + port)
});