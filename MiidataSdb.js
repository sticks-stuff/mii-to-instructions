// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.MiidataSdb = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var MiidataSdb = (function() {
  function MiidataSdb(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  MiidataSdb.prototype._read = function() {
    this.hairType = this._io.readU1();
    this.moleEnable = this._io.readBitsIntBe(1) != 0;
    this.bodyHeight = this._io.readBitsIntBe(7);
    this.hairFlip = this._io.readBitsIntBe(1) != 0;
    this.bodyWeight = this._io.readBitsIntBe(7);
    this.specialType = this._io.readBitsIntBe(1) != 0;
    this.hairColor = this._io.readBitsIntBe(7);
    this.gender = this._io.readBitsIntBe(1) != 0;
    this.eyeColor = this._io.readBitsIntBe(7);
    this._io.alignToByte();
    this.eyebrowColor = this._io.readU1();
    this.mouthColor = this._io.readU1();
    this.facialHairColor = this._io.readU1();
    this.glassesColor = this._io.readU1();
    this.regionMove = this._io.readBitsIntBe(2);
    this.eyeType = this._io.readBitsIntBe(6);
    this.fontRegion = this._io.readBitsIntBe(2);
    this.mouthType = this._io.readBitsIntBe(6);
    this.glassesSize = this._io.readBitsIntBe(3);
    this.eyeVertical = this._io.readBitsIntBe(5);
    this.facialHairMustache = this._io.readBitsIntBe(3);
    this.eyebrowType = this._io.readBitsIntBe(5);
    this.facialHairBeard = this._io.readBitsIntBe(3);
    this.noseType = this._io.readBitsIntBe(5);
    this.mouthStretch = this._io.readBitsIntBe(3);
    this.noseVertical = this._io.readBitsIntBe(5);
    this.eyebrowStretch = this._io.readBitsIntBe(3);
    this.mouthVertical = this._io.readBitsIntBe(5);
    this.eyeRotation = this._io.readBitsIntBe(3);
    this.facialHairVertical = this._io.readBitsIntBe(5);
    this.eyeStretch = this._io.readBitsIntBe(3);
    this.glassesVertical = this._io.readBitsIntBe(5);
    this.eyeSize = this._io.readBitsIntBe(3);
    this.moleHorizontal = this._io.readBitsIntBe(5);
    this._io.alignToByte();
    this.moleVertical = this._io.readU1();
    this.glassesType = this._io.readU1();
    this.faceType = this._io.readBitsIntBe(4);
    this.favoriteColor = this._io.readBitsIntBe(4);
    this.faceWrinkles = this._io.readBitsIntBe(4);
    this.faceColor = this._io.readBitsIntBe(4);
    this.eyeHorizontal = this._io.readBitsIntBe(4);
    this.faceMakeup = this._io.readBitsIntBe(4);
    this.eyebrowRotation = this._io.readBitsIntBe(4);
    this.eyebrowSize = this._io.readBitsIntBe(4);
    this.eyebrowVertical = this._io.readBitsIntBe(4);
    this.eyebrowHorizontal = this._io.readBitsIntBe(4);
    this.mouthSize = this._io.readBitsIntBe(4);
    this.noseSize = this._io.readBitsIntBe(4);
    this.moleSize = this._io.readBitsIntBe(4);
    this.facialHairSize = this._io.readBitsIntBe(4);
    this._io.alignToByte();
    this.miiName = KaitaiStream.bytesToStr(this._io.readBytes(20), "utf-16le");
    this.miiId = new Array(16);
    for (var i = 0; i < 16; i++) {
      this.miiId[i] = this._io.readU1();
    }
    this.checksumMii = new Array(2);
    for (var i = 0; i < 2; i++) {
      this.checksumMii[i] = this._io.readU1();
    }
    this.checksumConsole = new Array(2);
    for (var i = 0; i < 2; i++) {
      this.checksumConsole[i] = this._io.readU1();
    }
  }

  return MiidataSdb;
})();
return MiidataSdb;
}));
