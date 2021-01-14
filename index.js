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
    return getStringLocation(parsedrotation.eyes, eyeType).row + 2;
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

function generateInstructions(file) {
    const parsedFile = new ufsd(new KaitaiStream(fs.readFileSync(file)));
    var output;
    if (parsedFile.gender === 0) {
        defaultFile = new ufsd(new KaitaiStream(fs.readFileSync("defaultM.ufsd")));
        output = "<div class='instructions'>\n<p class='startfromscratch'>Start a new character from scratch and make these changes.</p>\n<table class='instructions'>\n<tbody><tr><th valign='top' align='right' style='font-size:20'>Gender</th><td class='icon'><img src='https://i.ibb.co/KKyM2gf/male.png' alt='male' width='45' height='45' class='icon'></td><td>Male</td></tr>\n";  
    } else {
        defaultFile = new ufsd(new KaitaiStream(fs.readFileSync("defaultF.ufsd")));
        output = "<div class='instructions'>\n<p class='startfromscratch'>Start a new character from scratch and make these changes.</p>\n<table class='instructions'>\n<tbody><tr><th valign='top' align='right' style='font-size:20'>Gender</th><td class='icon'><img src='https://i.ibb.co/tmz1Qw3/female.png' alt='female' width='45' height='45' class='icon'></td><td>Female</td></tr>\n";  
    }

    output += "<tbody><tr><th valign='top' align='right' style='font-size:20'>Face</th>";
    output += addInstruction("faceType", parsedFile, defaultFile);
    output += addInstruction("faceColor", parsedFile, defaultFile);
    output += addInstruction("faceWrinkles", parsedFile, defaultFile);
    output += addInstruction("faceMakeup", parsedFile, defaultFile);
    output += "</tr>\n";


    output += "<tr><th valign='top' align='right' rowspan='2' style='font-size:20'>Hair</th>";
    output += addInstructionPage("hairType", parsedFile, defaultFile);
    output += addInstruction("hairColor", parsedFile, defaultFile);
    output += addInstruction("hairFlip", parsedFile, defaultFile);
    output += "</tr>\n";

    output += "<tr><th valign='top' align='right' rowspan='5' style='font-size:20'>Eyebrows</th>";
    output += addInstructionNumber("eyebrowVertical", parsedFile, defaultFile, "move up", "move down");
    output += addInstructionNumber("eyebrowHorizontal", parsedFile, defaultFile, "closer", "father");
    output += addInstructionRotation("eyebrowRotation", parsedFile, defaultFile, "rotate down", "rotate up", getEyebrowRotation(toHex(parsedFile.eyebrowRotation)));
    output += addInstructionNumber("eyebrowSize", parsedFile, defaultFile, "larger", "smaller");
    output += addInstructionNumber("eyebrowStretch", parsedFile, defaultFile, "wider", "flatter");
    output += "</tr>\n";

    output += "<tr><th valign='top' align='right' rowspan='6' style='font-size:20'>Eyes</th>";
    output += addInstructionPage("eyeType", parsedFile, defaultFile);
    output += addInstruction("eyeColor", parsedFile, defaultFile);
    output += addInstructionNumber("eyeHorizontal", parsedFile, defaultFile, "closer", "father");
    output += addInstructionRotation("eyeRotation", parsedFile, defaultFile, "rotate down", "rotate up", getEyeRotation(toHex(parsedFile.eyeRotation)));
    output += addInstructionNumber("eyeSize", parsedFile, defaultFile, "smaller", "larger");
    output += addInstructionNumber("eyeStretch", parsedFile, defaultFile, "flatter", "wider");
    output += "</tr>\n";

    output += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Nose</th>";
    output += addInstruction("noseType", parsedFile, defaultFile);
    output += "</tr>\n";

    output += "<tr><th valign='top' align='right' rowspan='3' style='font-size:20'>Mouth</th>";
    output += addInstruction("mouthType", parsedFile, defaultFile);
    // output += addInstruction("mouthColor", parsedFile, defaultFile);
    output += addInstructionNumber("mouthSize", parsedFile, defaultFile, "smaller", "larger");
    output += addInstructionNumber("mouthStretch", parsedFile, defaultFile, "flatter", "wider");
    output += "</tr>\n";

    output += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Height</th>";
    output += addInstructionNumber("bodyHeight", parsedFile, defaultFile, "height", "height");   
    output += "</tr>\n";

    output += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Build</th>";
    output += addInstructionNumber("bodyWeight", parsedFile, defaultFile, "weight", "weight");
    output += "</tr>\n";

    output += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Favorite Color</th>";
    output += addInstruction("favoriteColor", parsedFile, defaultFile);

    output += "</tbody></table>\n</div>";
    return output;
}

function addInstruction (attrbute, parsedFile, defaultFile) {
    var output = "";
    if(parsedFile[attrbute] != defaultFile[attrbute]) {
        var location = getStringLocation(map[attrbute][0], toHex(parsedFile[attrbute]));
        output += "<td class='icon'>";
        output += icons[attrbute][location.row - 1][location.column - 1];
        output += "</td><td>";
        output += attrbute + ": ";
        output += converter.toOrdinal(location.row) + " row, ";
        output += converter.toOrdinal(location.column) + " column";
        output += "</td></tr>\n";
    }
    return output;
}

function addInstructionPage (attrbute, parsedFile, defaultFile) {
    var output = "";
    if(parsedFile[attrbute] != defaultFile[attrbute]) {
        var location = getStringLocation(map[attrbute], toHex(parsedFile[attrbute]));
        output += "<td class='icon'>";
        output += icons[attrbute][location.page - 1][location.row - 1][location.column - 1];
        output += "</td><td>";
        output += attrbute + ": ";
        output += converter.toOrdinal(location.page) + " page, ";
        output += converter.toOrdinal(location.row) + " row, ";
        output += converter.toOrdinal(location.column) + " column";
        output += "</td></tr>\n";
    }
    return output;
}

function addInstructionNumber (attrbute, parsedFile, defaultFile, moreText, lessText) {
    var output = "";
    if(parsedFile[attrbute] != defaultFile[attrbute]) {
        var difference = defaultFile[attrbute] - parsedFile[attrbute];
        if(difference < 0) {
            output += "<td class='icon'>";
            output += icons["menu parts"][lessText];
            output += "</td><td>";
            output += attrbute + ": " + difference + " " + lessText;
        } else {
            output += "<td class='icon'>";
            output += icons["menu parts"][moreText];
            output += "</td><td>";
            output += attrbute + ": " + difference + " " + moreText;
        }
        output += "</td></tr>\n";
    }
    return output;
}

function addInstructionRotation (attrbute, parsedFile, defaultFile, moreText, lessText, defaultRotate) {
    var output = "";
    if(parsedFile[attrbute] != defaultRotate) {
        var difference = defaultRotate - parsedFile[attrbute];
        if(difference < 0) {
            output += "<td class='icon'>";
            output += icons["menu parts"][lessText];
            output += "</td><td>";
            output += attrbute + ": " + difference + " " + lessText;
        } else {
            output += "<td class='icon'>";
            output += icons["menu parts"][moreText];
            output += "</td><td>";
            output += attrbute + ": " + difference + " " + moreText;
        }
        output += "</td></tr>\n";
    }
    return output;
}

console.log(generateInstructions("Nina.ufsd"));
// console.log(parsedNina.eyebrowVertical);
// console.log(parsedDefaultF.eyebrowVertical);

// const parsedFile = new ufsd(new KaitaiStream(fs.readFileSync("Nina.ufsd")));
// const defaultFile = new ufsd(new KaitaiStream(fs.readFileSync("defaultF.ufsd")));

// var output = "";
// var attrbute = "favoriteColor";
// console.log(map[attrbute]);
// console.log(toHex(parsedFile[attrbute]));
// console.log(parsedFile[attrbute]);

// console.log(Array.isArray(map[attrbute][0][0]));
// console.log(getStringLocation(map[attrbute], toHex(parsedFile[attrbute])));
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