const fs = require("fs");
const ufsd = require("./MiidataSwi");
const KaitaiStream = require('kaitai-struct/KaitaiStream');

const fileContent = fs.readFileSync("defaultM.ufsd");
const parsedUfsd = new ufsd(new KaitaiStream(fileContent));
console.log(parsedUfsd);