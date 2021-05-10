const ufsd = require("./MiidataSwi");
const KaitaiStream = require('kaitai-struct/KaitaiStream');
const mnms = require("./MiidataMs");
const nfsd = require("./MiidataSdb");
var converter = require('number-to-words');

const map = require('./maps_Switch.json');
const flip = require('./flip.json');
const mouthColor = require('./mouthColor.json');
const parsedrotation = require('./rotation.json');
const icons = require('./icons.json');

console.log(map);
console.log(flip);
console.log(mouthColor);
console.log(parsedrotation);
console.log(icons);

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

function generateInstructions(parsedFile, parsedDefaultM, parsedDefaultF) {
    global.hairCount = 0;
    global.eyebrowCount = 0;
    global.eyeCount = 0;
    global.noseCount = 0;
    global.facialHairCount = 0;
    global.mouthCount = 0;
    global.glassesCount = 0;
    global.moleCount = 0;
    global.faceCount = 0;
    var head;
    if (parsedFile.gender == 0) {
        defaultFile = parsedDefaultM;
        head = "<div class='instructions'>\n<p class='startfromscratch'>Start a new character from scratch on your Switch and make these changes.</p>\n<table class='instructions'>\n<tbody><tr><th valign='top' align='right' style='font-size:20'>Gender</th><td class='icon'><img src='https://i.ibb.co/KKyM2gf/male.png' alt='male' width='45' height='45' class='icon'></td><td>Male</td></tr>\n";  
    } else {
        defaultFile = parsedDefaultF;
        head = "<div class='instructions'>\n<p class='startfromscratch'>Start a new character from scratch on your Switch and make these changes.</p>\n<table class='instructions'>\n<tbody><tr><th valign='top' align='right' style='font-size:20'>Gender</th><td class='icon'><img src='https://i.ibb.co/tmz1Qw3/female.png' alt='female' width='45' height='45' class='icon'></td><td>Female</td></tr>\n";  
    }

    var face = "";
    face += addInstruction("faceType", parsedFile, defaultFile, "faceCount");
    face += addInstruction("faceColor", parsedFile, defaultFile, "faceCount");
    face += addInstruction("faceWrinkles", parsedFile, defaultFile, "faceCount");
    face += addInstruction("faceMakeup", parsedFile, defaultFile, "faceCount");
    if(global.faceCount > 0){face = "<tbody><tr><th valign='top' align='right' rowspan='" + global.faceCount + "' style='font-size:20'>Face</th>" + face + "</tr>";}
    face += "</tbody>";

    var hair = "";
    hair += addInstructionPage("hairType", parsedFile, defaultFile, "hairCount");
    if(toHex(parsedFile.hairType) != "0x1e"){
        if (flip.flip.includes(toHex(parsedFile.hairType))) {
            if(parsedFile.hairFlip === 1) {
                hair += "<tr>";
                hair += "<td class='icon'>";
                hair += icons["menu parts"]['flip hair'];
                hair += "</td><td>Flip hair</td></tr>";
                global.hairCount++;
            }
        }
        hair += addInstructionColor("hairColor", parsedFile, defaultFile, "hairCount");
    }
    if(global.hairCount > 0){hair = "<tr><th valign='top' align='right' rowspan='" + global.hairCount + "' style='font-size:20'>Hair</th>" + hair + "</tr>";}

    var eyebrows = "";
    eyebrows += addInstruction("eyebrowType", parsedFile, defaultFile, "eyebrowCount");
    if(toHex(parsedFile.hairType) != "0x17"){
        eyebrows += addInstructionColor("eyebrowColor", parsedFile, defaultFile, "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowVertical", parsedFile, defaultFile, "move up", "move down", "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowHorizontal", parsedFile, defaultFile, "closer", "farther", "eyebrowCount");
        eyebrows += addInstructionRotation("eyebrowRotation", parsedFile, defaultFile, "rotate down", "rotate up", getEyebrowRotation(toHex(parsedFile.eyebrowType)), "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowSize", defaultFile, parsedFile, "larger", "smaller", "eyebrowCount");
        eyebrows += addInstructionNumber("eyebrowStretch", parsedFile, defaultFile, "flatter", "wider", "eyebrowCount");
    }
    if(global.eyebrowCount > 0){eyebrows = "<tr><th valign='top' align='right' rowspan='" + global.eyebrowCount + "' style='font-size:20'>Eyebrows</th>" + eyebrows + "</tr>";}

    var eyes = "";
    eyes += addInstructionPage("eyeType", parsedFile, defaultFile, "eyeCount");
    eyes += addInstructionColor("eyeColor", parsedFile, defaultFile, "eyeCount");
    eyes += addInstructionNumber("eyeVertical", parsedFile, defaultFile, "move up", "move down", "eyeCount");
    eyes += addInstructionNumber("eyeHorizontal", parsedFile, defaultFile, "closer", "farther", "eyeCount");
    eyes += addInstructionRotation("eyeRotation", parsedFile, defaultFile, "rotate down", "rotate up", getEyeRotation(toHex(parsedFile.eyeType)), "eyeCount");
    eyes += addInstructionNumber("eyeSize", parsedFile, defaultFile, "smaller", "larger", "eyeCount");
    eyes += addInstructionNumber("eyeStretch", parsedFile, defaultFile, "flatter", "wider", "eyeCount");
    if(global.eyeCount > 0){eyes = "<tr><th valign='top' align='right' rowspan='" + global.eyeCount + "' style='font-size:20'>Eyes</th>" + eyes + "</tr>";}

    var nose = "";
    nose += addInstruction("noseType", parsedFile, defaultFile, "noseCount");
    nose += addInstructionNumber("noseVertical", parsedFile, defaultFile, "move up", "move down", "noseCount");
    nose += addInstructionNumber("noseSize", parsedFile, defaultFile, "smaller", "larger", "noseCount");
    if(global.noseCount > 0){nose = "<tr><th valign='top' align='right' rowspan='" + global.noseCount + "' style='font-size:20'>Nose</th>" + nose + "</tr>";}

    var facialHair = "";
    facialHair += addInstruction("facialHairMustache", parsedFile, defaultFile, "facialHairCount");
    facialHair += addInstruction("facialHairBeard", parsedFile, defaultFile, "facialHairCount");
    if(parsedFile.facialHairMustache != 0 || parsedFile.facialHairBeard != 0) {
        facialHair += addInstructionColor("facialHairColor", parsedFile, defaultFile, "facialHairCount");
    }
    if(parsedFile.facialHairMustache != 0) {
        facialHair += addInstructionNumber("facialHairVertical", parsedFile, defaultFile, "move up", "move down", "facialHairCount");
        facialHair += addInstructionNumber("facialHairSize", parsedFile, defaultFile, "smaller", "larger", "facialHairCount");
    }
    if(global.facialHairCount > 0){facialHair = "<tr><th valign='top' align='right' rowspan='" + global.facialHairCount + "' style='font-size:20'>Facial Hair</th>" + facialHair + "</tr>";}

    var glasses = "";
    if(parsedFile.glassesType != 0) {
        glasses += addInstruction("glassesType", parsedFile, defaultFile, "glassesCount");
        glasses += addInstructionColor("glassesColor", parsedFile, defaultFile, "glassesCount");
        glasses += addInstructionNumber("glassesVertical", parsedFile, defaultFile, "move up", "move down", "glassesCount");
        glasses += addInstructionNumber("glassesSize", parsedFile, defaultFile, "smaller", "larger", "glassesCount");
        if(global.glassesCount > 0){glasses = "<tr><th valign='top' align='right' rowspan='" + global.glassesCount + "' style='font-size:20'>Glasses</th>" + glasses + "</tr>";}
    }

    var mole = "";
    if(parsedFile.moleEnable === 1) {
        mole += "<tr>";
        mole += "<td class='icon'>";
        mole += icons.moleEnable[0][1];
        mole += "</td><td>Mole: Enable</td></tr>";
        global.moleCount = 2;
        mole += addInstructionNumber("moleVertical", parsedFile, defaultFile, "move up", "move down", "moleCount");
        mole += addInstructionNumber("moleHorizontal", parsedFile, defaultFile, "move left", "move right", "moleCount");
        mole += addInstructionNumber("moleSize", parsedFile, defaultFile, "smaller", "larger", "moleCount");
        if(global.moleCount > 0){mole = "<tr><th valign='top' align='right' rowspan='" + global.moleCount + "' style='font-size:20'>Mole</th>" + mole + "</tr>";}
    }

    var mouth = "";
    mouth += addInstruction("mouthType", parsedFile, defaultFile, "mouthCount");
    if (mouthColor.possible.includes(toHex(parsedFile.mouthType))) {
        mouth += addInstructionColor("mouthColor", parsedFile, defaultFile, "mouthCount");
    }
    mouth += addInstructionNumber("mouthVertical", parsedFile, defaultFile, "move up", "move down", "mouthCount");
    mouth += addInstructionNumber("mouthSize", parsedFile, defaultFile, "smaller", "larger", "mouthCount");
    mouth += addInstructionNumber("mouthStretch", parsedFile, defaultFile, "flatter", "wider", "mouthCount");
    if(global.mouthCount > 0){mouth = "<tr><th valign='top' align='right' rowspan='" + global.mouthCount + "' style='font-size:20'>Mouth</th>" + mouth + "</tr>";}

    var end = "";
    if(parsedFile.bodyHeight != defaultFile.bodyHeight) {
        end += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Height</th>";
        var differencebodyHeight = defaultFile.bodyHeight - parsedFile.bodyHeight;
        if(differencebodyHeight < 0) {
            end += "<td class='icon'>";
            end += icons["menu parts"].height;
            end += "</td><td>";
            end += parsedFile.bodyHeight + "/127 (" + Math.abs(differencebodyHeight) + " clicks right)";
        } else {
            end += "<td class='icon'>";
            end += icons["menu parts"].height;
            end += "</td><td>";
            end += parsedFile.bodyHeight + "/127 (" + Math.abs(differencebodyHeight) + " clicks left)";
        }
        end += "</td></tr>\n";
    }

    if(parsedFile.bodyWeight != defaultFile.bodyWeight) {
        end += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Build</th>";
        var differencebodyWeight = defaultFile.bodyWeight - parsedFile.bodyWeight;
        if(differencebodyWeight < 0) {
            end += "<td class='icon'>";
            end += icons["menu parts"].weight;
            end += "</td><td>";
            end += parsedFile.bodyWeight + "/127 (" + Math.abs(differencebodyWeight) + " clicks right)";
        } else {
            end += "<td class='icon'>";
            end += icons["menu parts"].weight;
            end += "</td><td>";
            end += parsedFile.bodyWeight + "/127 (" + Math.abs(differencebodyWeight) + " clicks left)";
        }
        end += "</td></tr>\n";
    }

    if(parsedFile.favoriteColor != defaultFile.favoriteColor) {
        end += "<tr><th valign='top' align='right' rowspan='1' style='font-size:20'>Favorite Color</th>";
        end += addInstruction("favoriteColor", parsedFile, defaultFile);
    }

    end += "</tbody></table>\n</div>";
    return head + face + hair + eyebrows + eyes +  nose + mouth + mole + facialHair + glasses + end;
}

function addInstruction (attrbute, parsedFile, defaultFile, counter) {
    try {
        var output = "";
        if(parsedFile[attrbute] != defaultFile[attrbute]) {
            var location = getStringLocation(map[attrbute][0], toHex(parsedFile[attrbute]));
            output += "<td class='icon'>";
            output += icons[attrbute][location.row - 1][location.column - 1];
            output += "</td><td>";
            output += attrbute.replace(/.*(?=[A-Z])/,'') + ": ";
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
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": ";
                output += " Default colors, ";
                output += converter.toOrdinal(location.row) + " row, ";
                output += converter.toOrdinal(location.column) + " column";
                output += "</td></tr>\n";
                global[counter] = global[counter] + 1;
            } else {
                var locationCustom = getStringLocation(map.customColors[0], toHex(parsedFile[attrbute]));
                output += "<td class='icon'>";
                output += icons.customColors[locationCustom.row - 1][locationCustom.column - 1];
                output += "</td><td>";
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": ";
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
            output += attrbute.replace(/.*(?=[A-Z])/,'') + ": ";
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
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": " + Math.abs(difference) + " " + lessText.replace('move ','');
            } else {
                output += "<td class='icon'>";
                output += icons["menu parts"][moreText];
                output += "</td><td>";
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": " + Math.abs(difference) + " " + moreText.replace('move ','');
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
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": " + Math.abs(difference) + " " + lessText.replace('rotate ','');
            } else {
                output += "<td class='icon'>";
                output += icons["menu parts"][moreText];
                output += "</td><td>";
                output += attrbute.replace(/.*(?=[A-Z])/,'') + ": " + Math.abs(difference) + " " + moreText.replace('rotate ','');
            }
            global[counter] = global[counter] + 1;
            output += "</td></tr>\n";
        }
        return output;
    } catch (err) {
        console.error("Panic at " + attrbute);
    }
}

const reader = new FileReader();

const fileSelector = document.getElementById('fileInput');
  fileSelector.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log(file);
    reader.readAsArrayBuffer(file);
    reader.onload = function(){
        var fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);

        switch (fileExtension) {
            case "charinfo":
                fetch("defaultM.ufsd").then(
                    resp => resp.arrayBuffer().then(function(buf) {
                            parsedDefaultM = new ufsd(new KaitaiStream(buf))
                            fetch("defaultF.ufsd").then(
                                resp => resp.arrayBuffer().then(function(buf) {
                                        parsedDefaultF = new ufsd(new KaitaiStream(buf))
                                        var parsedFile = new ufsd(new KaitaiStream(reader.result));
                                        displayToScreen(parsedFile, parsedDefaultM, parsedDefaultF);
                                    }
                                )
                            );
                        }
                    )
                );
                break;        
            case "mnms":
                fetch("defaultM.mnms").then(
                    resp => resp.arrayBuffer().then(function(buf) {
                            parsedDefaultM = new mnms(new KaitaiStream(buf))
                            fetch("defaultF.mnms").then(
                                resp => resp.arrayBuffer().then(function(buf) {
                                        parsedDefaultF = new mnms(new KaitaiStream(buf))
                                        var parsedFile = new mnms(new KaitaiStream(reader.result));
                                        displayToScreen(parsedFile, parsedDefaultM, parsedDefaultF);
                                    }
                                )
                            );
                        }
                    )
                );
                break;        
            case "nfsd":
                fetch("defaultM.nfsd").then(
                    resp => resp.arrayBuffer().then(function(buf) {
                            parsedDefaultM = new nfsd(new KaitaiStream(buf))
                            fetch("defaultF.nfsd").then(
                                resp => resp.arrayBuffer().then(function(buf) {
                                        parsedDefaultF = new nfsd(new KaitaiStream(buf))
                                        var parsedFile = new nfsd(new KaitaiStream(reader.result));
                                        displayToScreen(parsedFile, parsedDefaultM, parsedDefaultF);
                                    }
                                )
                            );
                        }
                    )
                );
                break;
            default:
                throw new Error("Invalid mii format");
        }
  };
});

function displayToScreen(parsedFile, parsedDefaultM, parsedDefaultF) {
    var instructions = generateInstructions(parsedFile, parsedDefaultM, parsedDefaultF)

    document.getElementById("input-container-container").style.transform = "translate(0%, 1vh)";
    document.getElementById("infoText").style.bottom = "0";
    document.getElementById("infoText").style.position = "relative";

    var iframe = document.getElementById("iframe");

    if(iframe != null) {
        iframe.style.opacity = "0";
        iframe.remove();
    }
    iframe = document.createElement('iframe');
    document.getElementById("input-container-container").appendChild(iframe);
    iframe.id = "iframe";
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(instructions);
    iframe.contentWindow.document.close();

    // Adjusting the iframe height onload event 
    iframe.onload = function() { 
        iframe.style.height =  iframe.contentWindow.document.body.scrollHeight + 'px'; 
        iframe.style.width  =  iframe.contentWindow.document.body.scrollWidth+'px';    
    };

    var copyText = document.getElementById("copyText");

    if(copyText != null) {
        copyText.style.opacity = "0";
        copyText.remove();
    }

    copyText = document.createElement('input');
    copyText.type = "text";
    copyText.value = instructions;
    copyText.id = "copyText";
    document.getElementById("input-container-container").appendChild(copyText);

    setTimeout(function(){ 
        iframe.style.opacity = "1";
        copyText.style.opacity = "1";
    }, 1000);
}
