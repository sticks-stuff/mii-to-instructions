const fs = require("fs");
const ufsd = require("./MiidataSwi");
const KaitaiStream = require('kaitai-struct/KaitaiStream');

function getStringLocation(array, string) {
    for( var i = 0; i < array.length; i++ ) {
        for( var j = 0; i < array[i].length; j++ ) {
            for( var k = 0; i < array[i][j].length; k++ ) {
                if(array[i][j][k] === string) {
                    return {
                        first: i,
                        second: j,
                        third: k,
                    };
                }
            }
        }
    }
}

const defaultM = fs.readFileSync("defaultM.ufsd");
const parsedDefaultM = new ufsd(new KaitaiStream(defaultM));
// console.log(parsedDefaultM);

const defaultF = fs.readFileSync("defaultF.ufsd");
const parsedDefaultF = new ufsd(new KaitaiStream(defaultF));
// console.log(parsedDefaultF);

const nina = fs.readFileSync("Nina.ufsd");
const parsedNina = new ufsd(new KaitaiStream(nina));
console.log(parsedNina);

const map = fs.readFileSync("maps_Switch.json");
const parsedmap = JSON.parse(map);
// console.log(parsedmap.hair[0][0]);
console.log(getStringLocation(parsedmap.hair, '0x56'));

