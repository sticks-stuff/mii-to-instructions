const fs = require("fs");
const ufsd = require("./MiidataSwi");
const KaitaiStream = require('kaitai-struct/KaitaiStream');
const reader = new FileReader();

const fileSelector = document.getElementById('fileInput');
  fileSelector.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log(file);
    reader.readAsArrayBuffer(file);
    reader.onload = function(){
      console.log(reader.result);
      const parsedFile = new ufsd(new KaitaiStream(reader.result));
      console.log(parsedFile);
  };
});

fetch("./defaultM.ufsd").then(resp => resp.arrayBuffer().then(buf => console.log(new ufsd(new KaitaiStream(buf)))));

//   document.getElementById("input-container-container").style.transform = "translate(0%, 15vh)";
//   document.getElementById("results").style.display = "flex";
//   setTimeout(function(){ 
//       document.getElementById("results").style.opacity = "1";
//   }, 1000);

// userAction("asdasdsd");

