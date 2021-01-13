const fs = require("fs");
const ufsd = require("./MiidataSwi");
const KaitaiStream = require('kaitai-struct/KaitaiStream');

function getStringLocation(array, string) {
    for( var i = 0; i < array.length; i++ ) {
        for( var j = 0; j < array[i].length; j++ ) {
            if(array[i].length > 1) {
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
        }
    }
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const defaultM = fs.readFileSync("defaultM.ufsd");
const parsedDefaultM = new ufsd(new KaitaiStream(defaultM));
// console.log(parsedDefaultM);

const defaultF = fs.readFileSync("defaultF.ufsd");
const parsedDefaultF = new ufsd(new KaitaiStream(defaultF));
// console.log(parsedDefaultF);

const nina = fs.readFileSync("Nina.ufsd");
const parsedNina = new ufsd(new KaitaiStream(nina));
// console.log(parsedNina.eyebrowType);
// console.log(parsedNina.eyebrowType.toString(16));

const map = fs.readFileSync("maps_Switch.json");
const parsedmap = JSON.parse(map);
// console.log(parsedmap.hair[0][0][0]);
console.log(getStringLocation(parsedmap.hair, '0x' + pad(parsedNina.hairType.toString(16), 2)));

