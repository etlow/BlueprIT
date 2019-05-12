function calculate(height, width, count) {
    var done = false;
    var lines = 0;
    var arrangement;
    while (!done) {
        lines++;
        arrangement = arrange(height, width, count, lines);
        done = arrangement.possible;
    }
    var arr = arrangement.arr;
    var coords = [];
    var radius = lines * height * 2 / Math.PI;
    for (var i = 0; i < lines; i++) {
        var angleDiff = Math.PI / lines;
        var latitude = (i + 0.5) * angleDiff;
        var currRadius = radius * Math.sin(latitude);
        var y = radius * Math.cos(latitude);
        var longDiff = Math.PI * 2 / arr[i];
        for (var j = 0; j < arr[i]; j++) {
            var longitude = (j + 0.5) * longDiff;
            var x = currRadius * Math.cos(longitude);
            var z = currRadius * Math.sin(longitude);
            var rotY = Math.PI / 2 - longitude;
            var rotX = - Math.PI / 2 + latitude;
            coords[coords.length] = { x: x, y: y, z: z,
                rotX: rotX, rotY: rotY };
        }
    }
    return coords;
}

function arrange(height, width, count, lines) {
    // pi * r = lines * height * 2
    var radius = lines * height * 2 / Math.PI;
    var angleDiff = Math.PI / lines;
    var arr = [];
    var total = 0;
    for (var i = 0; i < lines; i++) {
        var latitude = (i + 0.5) * angleDiff;
        var currRadius = radius * Math.sin(latitude);
        var circumference = 2 * Math.PI * currRadius;
        var fit = Math.floor(circumference / width / 2);
        if (count == total) {
            actualFit = 0;
        } else if (fit > count - total) {
            actualFit = count - total;
        } else {
            actualFit = fit;
        }
        total += actualFit;
        arr[i] = actualFit;
    }
    return { possible: total == count, arr: arr };
}
