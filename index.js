const fs = require("fs");
const ufsd = require("./MiidataSwi");
const KaitaiStream = require('kaitai-struct/KaitaiStream');
var converter = require('number-to-words');

function getStringLocation(array, string) {
    for( var i = 0; i < array.length; i++ ) {
        for( var j = 0; j < array[i].length; j++ ) {
            if(Array.isArray(array[i][j])) {
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

const icons = JSON.parse(fs.readFileSync("icons.json"));
// console.log(icons.faceType);

function getEyebrowRotation(eyebrowType) {
    if (eyebrowType === '0x17') {
        return 0;
    } else {
        return getStringLocation(parsedrotation.eyebrows, eyebrowType).row + 3;
    }
}

function getEyeRotation(eyeType) {
    return getStringLocation(parsedrotation.eyes, eyeType).row + 1;
}

function toHex(int) {
    return '0x' + pad(int.toString(16), 2);
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

const map = JSON.parse(fs.readFileSync("maps_Switch.json"));

// console.log(parsedmap.hair[0][0][0]);
// console.log(getStringLocation(parsedmap.eyebrows, '0x' + pad(parsedNina.eyebrowType.toString(16), 2)));
// console.log(getEyebrowRotation('0x' + pad(parsedNina.eyebrowType.toString(16), 2)));
// console.log(getEyeRotation(toHex(parsedNina.eyeType)));
// console.log('0x' + pad(parsedNina.eyebrowType.toString(16), 2));
// console.log(getStringLocation(parsedrotation.eyebrows, "0x01"));
// console.log(parsedrotation.eyebrows[0].length);

let global = {};
global.hairCount = 0;
global.eyebrowCount = 0;
global.eyeCount = 0;
global.noseCount = 0;
global.facialHairCount = 0;
global.mouthCount = 0;
global.glassesCount = 0;
global.moleCount = 0;
global.faceCount = 0;

function generateInstructions(file) {
    const parsedFile = new ufsd(new KaitaiStream(fs.readFileSync(file)));
    var head;
    if (parsedFile.gender === 0) {
        defaultFile = new ufsd(new KaitaiStream(fs.readFileSync("defaultM.ufsd")));
        head = "<div class='instructions'>\n<p class='startfromscratch'>Start a new character from scratch and make these changes.</p>\n<table class='instructions'>\n<tbody><tr><th valign='top' align='right' style='font-size:20'>Gender</th><td class='icon'><img src='https://i.ibb.co/KKyM2gf/male.png' alt='male' width='45' height='45' class='icon'></td><td>Male</td></tr>\n";  
    } else {
        defaultFile = new ufsd(new KaitaiStream(fs.readFileSync("defaultF.ufsd")));
        head = "<div class='instructions'>\n<p class='startfromscratch'>Start a new character from scratch and make these changes.</p>\n<table class='instructions'>\n<tbody><tr><th valign='top' align='right' style='font-size:20'>Gender</th><td class='icon'><img src='https://i.ibb.co/tmz1Qw3/female.png' alt='female' width='45' height='45' class='icon'></td><td>Female</td></tr>\n";  
    }

    var face = "";
    face += addInstruction("faceType", parsedFile, defaultFile, "faceCount");
    face += addInstruction("faceColor", parsedFile, defaultFile, "faceCount");
    face += addInstruction("faceWrinkles", parsedFile, defaultFile, "faceCount");
    face += addInstruction("faceMakeup", parsedFile, defaultFile, "faceCount");
    if(global.faceCount > 0){face = "<tbody><tr><th valign='top' align='right' rowspan='" + global.faceCount + "' style='font-size:20'>Face</th>" + face;}
    face += "</tbody>";

    var hair = "";
    if(toHex(parsedFile.hairType) != "0x1e"){
        hair += addInstructionPage("hairType", parsedFile, defaultFile, "hairCount");
        hair += addInstructionColor("hairColor", parsedFile, defaultFile, "hairCount");
        // hair += addInstruction("hairFlip", parsedFile, defaultFile, "hairCount");
        if(global.hairCount > 0){hair = "<tr><th valign='top' align='right' rowspan='" + global.hairCount + "' style='font-size:20'>Hair</th>" + hair;}
    }

    var eyebrows = "";
    if(toHex(parsedFile.hairType) != "0x17"){
        eyebrows += addInstruction("eyebrowType", parsedFile, defaultFile, "eyebrowCount");
        eyebrows += addInstructionColor("eyebrowColor", parsedFile, defaultFile, "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowVertical", parsedFile, defaultFile, "move up", "move down", "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowHorizontal", parsedFile, defaultFile, "closer", "father", "eyebrowCount");
        eyebrows += addInstructionRotation("eyebrowRotation", parsedFile, defaultFile, "rotate down", "rotate up", getEyebrowRotation(toHex(parsedFile.eyebrowRotation)), "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowSize", parsedFile, defaultFile, "larger", "smaller", "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowStretch", parsedFile, defaultFile, "wider", "flatter", "eyebrowCount");
        if(global.eyebrowCount > 0){eyebrows = "<tr><th valign='top' align='right' rowspan='" + global.eyebrowCount + "' style='font-size:20'>Eyebrows</th>" + eyebrows;}
    }

    var eyes = "";
    eyes += addInstructionPage("eyeType", parsedFile, defaultFile, "eyeCount");
    eyes += addInstructionColor("eyeColor", parsedFile, defaultFile, "eyeCount");
    eyes += addInstructionNumber("eyeVertical", parsedFile, defaultFile, "move up", "move down", "eyeCount");
    eyes += addInstructionNumber("eyeHorizontal", parsedFile, defaultFile, "closer", "father", "eyeCount");
    eyes += addInstructionRotation("eyeRotation", parsedFile, defaultFile, "rotate down", "rotate up", getEyeRotation(toHex(parsedFile.eyeRotation)), "eyeCount");
    eyes += addInstructionNumber("eyeSize", parsedFile, defaultFile, "smaller", "larger", "eyeCount");
    eyes += addInstructionNumber("eyeStretch", parsedFile, defaultFile, "flatter", "wider", "eyeCount");
    if(global.eyeCount > 0){eyes = "<tr><th valign='top' align='right' rowspan='" + global.eyeCount + "' style='font-size:20'>Eyes</th>" + eyes;}

    var nose = "";
    nose += addInstruction("noseType", parsedFile, defaultFile, "noseCount");
    nose += addInstructionNumber("noseVertical", parsedFile, defaultFile, "move up", "move down", "noseCount");
    nose += addInstructionNumber("noseSize", parsedFile, defaultFile, "smaller", "larger", "noseCount");
    if(global.noseCount > 0){nose = "<tr><th valign='top' align='right' rowspan='" + global.noseCount + "' style='font-size:20'>Nose</th>" + nose;}

    var facialHair = "";
    facialHair += addInstruction("facialHairBeard", parsedFile, defaultFile, "facialHairCount");
    facialHair += addInstruction("facialHairMustache", parsedFile, defaultFile, "facialHairCount");
    if(parsedFile.facialHairMustache != 0 || parsedFile.facialHairBeard != 0) {
        facialHair += addInstructionColor("facialHairColor", parsedFile, defaultFile, "facialHairCount");
    }
    if(parsedFile.facialHairMustache != 0) {
        facialHair += addInstructionNumber("facialHairVertical", parsedFile, defaultFile, "move up", "move down", "facialHairCount");
        facialHair += addInstructionNumber("facialHairSize", parsedFile, defaultFile, "smaller", "larger", "facialHairCount");
    }
    if(global.facialHairCount > 0){facialHair = "<tr><th valign='top' align='right' rowspan='" + global.facialHairCount + "' style='font-size:20'>Facial Hair</th>" + facialHair;}

    if(parsedFile.glassesType != 0) {
        var glasses = "";
        glasses += addInstruction("glassesType", parsedFile, defaultFile, "glassesCount");
        glasses += addInstructionColor("glassesColor", parsedFile, defaultFile, "glassesCount");
        glasses += addInstructionNumber("glassesVertical", parsedFile, defaultFile, "move up", "move down", "glassesCount");
        glasses += addInstructionNumber("glassesSize", parsedFile, defaultFile, "smaller", "larger", "glassesCount");
        if(global.glassesCount > 0){glasses = "<tr><th valign='top' align='right' rowspan='" + global.glassesCount + "' style='font-size:20'>Glasses</th>" + glasses;}
    }

    if(parsedFile.moleEnable === 1) {
        var mole = "";
        mole += addInstruction("moleEnable", parsedFile, defaultFile, "moleCount");
        mole += addInstructionNumber("moleHorizontal", parsedFile, defaultFile, "closer", "father", "moleCount");
        mole += addInstructionNumber("moleVertical", parsedFile, defaultFile, "move up", "move down", "moleCount");
        mole += addInstructionNumber("moleSize", parsedFile, defaultFile, "smaller", "larger", "moleCount");
        if(global.moleCount > 0){mole = "<tr><th valign='top' align='right' rowspan='" + global.moleCount + "' style='font-size:20'>Mole</th>" + mole;}
    }

    mouth = "";
    mouth += addInstruction("mouthType", parsedFile, defaultFile, "mouthCount");
    mouth += addInstructionColor("mouthColor", parsedFile, defaultFile, "mouthCount");
    mouth += addInstructionNumber("mouthVertical", parsedFile, defaultFile, "move up", "move down", "mouthCount");
    mouth += addInstructionNumber("mouthSize", parsedFile, defaultFile, "smaller", "larger", "mouthCount");
    mouth += addInstructionNumber("mouthStretch", parsedFile, defaultFile, "flatter", "wider", "mouthCount");
    if(global.mouthCount > 0){mouth = "<tr><th valign='top' align='right' rowspan='" + global.mouthCount + "' style='font-size:20'>Mouth</th>" + mouth;}

    var end = "";
    if(parsedFile.bodyHeight != defaultFile.bodyHeight) {
        end += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Height</th>";
        end += addInstructionNumber("bodyHeight", parsedFile, defaultFile, "height", "height");   
    }

    if(parsedFile.bodyWeight != defaultFile.bodyWeight) {
        end += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Build</th>";
        end += addInstructionNumber("bodyWeight", parsedFile, defaultFile, "weight", "weight");
    }

    if(parsedFile.favoriteColor != defaultFile.favoriteColor) {
        end += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Favorite Color</th>";
        end += addInstruction("favoriteColor", parsedFile, defaultFile);
    }

    end += "</tbody></table>\n</div>";
    return head + face + hair + eyebrows + eyes + nose + mouth + end;
}

function addInstruction (attrbute, parsedFile, defaultFile, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultFile[attrbute]) {
            var location = getStringLocation(map[attrbute][0], toHex(parsedFile[attrbute]));
            output += "<td class='icon'>";
            output += icons[attrbute][location.row - 1][location.column - 1];
            output += "</td><td>";
            output += attrbute.replace(/^[^A-Z]+/,'') + ": ";
            output += converter.toOrdinal(location.row) + " row, ";
            output += converter.toOrdinal(location.column) + " column";
            output += "</td></tr>\n";
            global[counter] = global[counter] + 1;
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }
}

function addInstructionColor (attrbute, parsedFile, defaultFile, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultFile[attrbute]) {
            var location = getStringLocation(map[attrbute][0], toHex(parsedFile[attrbute]));
            if(location != undefined) {
                output += "<td class='icon'>";
                output += icons[attrbute][location.row - 1][location.column - 1];
                output += "</td><td>";
                output += attrbute.replace(/^[^A-Z]+/,'') + ": ";
                output += converter.toOrdinal(location.row) + " row, ";
                output += converter.toOrdinal(location.column) + " column";
                output += "</td></tr>\n";
                global[counter] = global[counter] + 1;
            } else {
                var locationCustom = getStringLocation(map.customColors[0], toHex(parsedFile[attrbute]));
                output += "<td class='icon'>";
                output += icons.customColors[locationCustom.row - 1][locationCustom.column - 1];
                output += "</td><td>";
                output += attrbute.replace(/^[^A-Z]+/,'') + ": ";
                output += " Custom colors, ";
                output += converter.toOrdinal(locationCustom.row) + " row, ";
                output += converter.toOrdinal(locationCustom.column) + " column";
                output += "</td></tr>\n";
                global[counter] = global[counter] + 1;
            }
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }
}

function addInstructionPage (attrbute, parsedFile, defaultFile, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultFile[attrbute]) {
            var location = getStringLocation(map[attrbute], toHex(parsedFile[attrbute]));
            output += "<td class='icon'>";
            output += icons[attrbute][location.page - 1][location.row - 1][location.column - 1];
            output += "</td><td>";
            output += attrbute.replace(/^[^A-Z]+/,'') + ": ";
            output += converter.toOrdinal(location.page) + " page, ";
            output += converter.toOrdinal(location.row) + " row, ";
            output += converter.toOrdinal(location.column) + " column";
            output += "</td></tr>\n";
            global[counter] = global[counter] + 1;
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }
}

function addInstructionNumber (attrbute, parsedFile, defaultFile, moreText, lessText, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultFile[attrbute]) {
            var difference = defaultFile[attrbute] - parsedFile[attrbute];
            if(difference < 0) {
                output += "<td class='icon'>";
                output += icons["menu parts"][lessText];
                output += "</td><td>";
                output += attrbute.replace(/^[^A-Z]+/,'') + ": " + Math.abs(difference) + " " + lessText.replace('move ','');
            } else {
                output += "<td class='icon'>";
                output += icons["menu parts"][moreText];
                output += "</td><td>";
                output += attrbute.replace(/^[^A-Z]+/,'') + ": " + Math.abs(difference) + " " + moreText.replace('move ','');
            }
            global[counter] = global[counter] + 1;
            output += "</td></tr>\n";
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }
}

function addInstructionRotation (attrbute, parsedFile, defaultFile, moreText, lessText, defaultRotate, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultRotate) {
            var difference = defaultRotate - parsedFile[attrbute];
            if(difference < 0) {
                output += "<td class='icon'>";
                output += icons["menu parts"][lessText];
                output += "</td><td>";
                output += attrbute.replace(/^[^A-Z]+/,'') + ": " + Math.abs(difference) + " " + lessText.replace('rotate ','');
            } else {
                output += "<td class='icon'>";
                output += icons["menu parts"][moreText];
                output += "</td><td>";
                output += attrbute.replace(/^[^A-Z]+/,'') + ": " + Math.abs(difference) + " " + moreText.replace('rotate ','');
            }
            global[counter] = global[counter] + 1;
            output += "</td></tr>\n";
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }

}

var myArgs = process.argv.slice(2);
console.log(generateInstructions(myArgs[0]));
// console.log(parsedNina.eyebrowVertical);
// console.log(parsedDefaultF.eyebrowVertical);

// const parsedFile = new ufsd(new KaitaiStream(fs.readFileSync(myArgs[0])));
// const defaultFile = new ufsd(new KaitaiStream(fs.readFileSync("defaultF.ufsd")));

// var output = "";
// var attrbute = "facialHairColor";
// console.log(map[attrbute]);
// console.log(toHex(parsedFile[attrbute]));
// console.log(parsedFile.bodyHeight);
// console.log(icons[attrbute][0][3]);

// console.log(Array.isArray(map[attrbute][0][0]));
// console.log(addInstructionColor(map[attrbute], parsedFile));
// console.log(addInstructionColor("facialHairColor", parsedFile, defaultFile, "facialHairCount"));
// console.log(getStringLocation(map[attrbute][0], toHex(parsedFile[attrbute])));
// var location = getStringLocation(map[attrbute][0], toHex(parsedFile[attrbute]));
// output += "<td class='icon'>";
// output += icons[attrbute][location.row - 1][location.column - 1];
// output += "</td><td>";
// output += attrbute.replace(/^[^A-Z]+/,'') + ": ";
// output += converter.toOrdinal(location.row) + " row, ";
// output += converter.toOrdinal(location.column) + " column";
// output += "</td></tr>\n";
// console.log(output);
// global[counter] = global[counter] + 1;
// if(parsedFile[attrbute] != defaultFile[attrbute]) {
//     var location = getStringLocation(map[attrbute][0], toHex(parsedFile[attrbute]));
//     output += "<td class='icon'>";
//     output += icons[attrbute][location.row][location.column];
//     output += "</td><td>";
//     output += attrbute + ": ";
//     output += converter.toOrdinal(location.row) + " row, ";
//     output += converter.toOrdinal(location.column) + " column";
//     output += "</td></tr>\n";
// }
// console.log(output);