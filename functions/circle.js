const sharp = require('sharp');
const fs = require('fs');

exports.draw = async function(Color, Percentage, Radius, StrokeWidth) {
    // Map percentage (0 - 100) to degress of a circle (0 - 360)
    let percentagemap = (Percentage - 0) * (360 - 0) / (100 - 0) + 0;

    // Calculate attribs
    let circumference = 2 * Math.PI * Radius;
    let size = (Radius * 2 ) + StrokeWidth

    let strokeOffset = 0.25 * circumference;
    let strokeDash = (percentagemap / 360) * circumference;

    let dasharray = strokeDash + ", " + (circumference - strokeDash)

    // Read SVG
    let targetPath = "./SVGs/circle.svg"
    try {
        if (!fs.existsSync(targetPath)) {
            throw "Server did not find circle SVG: " + targetPath
        }

        const dat = fs.readFileSync(targetPath)
    
        let out = dat.toString()
    
        out = out.replace(/!WIDTH!/g, size)
        out = out.replace(/!HEIGHT!/g, size)
        out = out.replace(/!RADIUS!/g, Radius)
        out = out.replace(/!COLOR!/g, Color)
        out = out.replace(/!DASHARRAY!/g, dasharray)
        out = out.replace(/!OFFSET!/g, strokeOffset)
        out = out.replace(/!STROKEWIDTH!/g, StrokeWidth)

        console.log(out)
    
        const t = await sharp(Buffer.from(out))
            .resize(size, size)
            .toBuffer()
            .then(data => {
                return data
            })

        return t
    } catch (error) {
        throw error
    }
}
