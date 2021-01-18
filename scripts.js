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

// fetch("maps_Switch.json").then(resp => resp.arrayBuffer().then(buf => console.log(JSON.parse(buf))));

var maps = require('./maps_Switch.json');

console.log(maps);
// var request = new XMLHttpRequest();

// function getJSON(file) {
//   request.open("GET", file, false);
//   request.send(null);
//   request.onreadystatechange = function() {
//       if ( request.readyState === 4 && request.status === 200 ) {
//           var my_JSON_object = JSON.parse(request.responseText);
//           return(my_JSON_object);
//       }
//   };
// }

// console.log(getJSON("maps_Switch.json"));

  document.getElementById("input-container-container").style.transform = "translate(0%, 15vh)";
  document.getElementById("results").style.display = "flex";
  setTimeout(function(){ 
      document.getElementById("results").style.opacity = "1";
  }, 1000);

// userAction("asdasdsd");

