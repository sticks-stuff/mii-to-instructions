const fs = require("fs");
const ufsd = require("./MiidataSwi");
const KaitaiStream = require('kaitai-struct/KaitaiStream');

function getStringLocation(array, string) {
    for( var i = 0; i < array.length; i++ ) {
        for( var j = 0; j < array[i].length; j++ ) {
            if(array[i][j].isArray)
            {
                for( var k = 0; k < array[i][j].length; k++ ) {
                    if(array[i][j][k] === string) {
                        return {
                            page: i + 1,
                            row: j + 1,
                            column: k + 1,
                        };
                    }
                }
            }
            else {
                if(array[i][j] === string) {
                    return {
                        row: i + 1,
                        column: j + 1,
                    };
                }
            }
        }
    }
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const rotation = fs.readFileSync("rotation.json");
const parsedrotation = JSON.parse(rotation);

function getEyebrowRotation(eyebrowType) {
    if (eyebrowType === '0x17') {
        return null;
    } else {
        return getStringLocation(parsedrotation.eyebrows, eyebrowType).row + 3;
    }
}

function getEyeRotation(eyeType) {
    return getStringLocation(parsedrotation.eyes, eyeType).row + 2;
}

const defaultM = fs.readFileSync("defaultM.ufsd");
const parsedDefaultM = new ufsd(new KaitaiStream(defaultM));
// console.log(parsedDefaultM);

const defaultF = fs.readFileSync("defaultF.ufsd");
const parsedDefaultF = new ufsd(new KaitaiStream(defaultF));
// console.log(parsedDefaultF);

const nina = fs.readFileSync("Nina.ufsd");
const parsedNina = new ufsd(new KaitaiStream(nina));
// console.log(parsedNina);
// console.log(parsedNina.eyebrowType.toString(16));

const map = fs.readFileSync("maps_Switch.json");
const parsedmap = JSON.parse(map);
// console.log(parsedmap.hair[0][0][0]);
// console.log(getStringLocation(parsedmap.eyebrows, '0x' + pad(parsedNina.eyebrowType.toString(16), 2)));
// console.log(getEyebrowRotation('0x' + pad(parsedNina.eyebrowType.toString(16), 2)));
console.log(getEyeRotation('0x' + pad(parsedNina.eyeType.toString(16), 2)));
// console.log('0x' + pad(parsedNina.eyebrowType.toString(16), 2));
// console.log(getStringLocation(parsedrotation.eyebrows, "0x01"));
// console.log(parsedrotation.eyebrows[0].length);