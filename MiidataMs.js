// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.MiidataMs = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var MiidataMs = (function() {
  function MiidataMs(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  MiidataMs.prototype._read = function() {
    this.facialHairColor = this._io.readU1();
    this.beardGoatee = this._io.readU1();
    this.bodyWeight = this._io.readU1();
    this.eyeStretch = this._io.readU1();
    this.eyeColor = this._io.readU1();
    this.eyeRotation = this._io.readU1();
    this.eyeSize = this._io.readU1();
    this.eyeType = this._io.readU1();
    this.eyeHorizontal = this._io.readU1();
    this.eyeVertical = this._io.readU1();
    this.eyebrowStretch = this._io.readU1();
    this.eyebrowColor = this._io.readU1();
    this.eyebrowRotation = this._io.readU1();
    this.eyebrowSize = this._io.readU1();
    this.eyebrowType = this._io.readU1();
    this.eyebrowHorizontal = this._io.readU1();
    this.eyebrowVertical = this._io.readU1();
    this.faceColor = this._io.readU1();
    this.faceMakeup = this._io.readU1();
    this.faceType = this._io.readU1();
    this.faceWrinkles = this._io.readU1();
    this.favoriteColor = this._io.readU1();
    this.gender = this._io.readU1();
    this.glassesColor = this._io.readU1();
    this.glassesSize = this._io.readU1();
    this.glassesType = this._io.readU1();
    this.glassesVertical = this._io.readU1();
    this.hairColor = this._io.readU1();
    this.hairFlip = this._io.readU1();
    this.hairType = this._io.readU1();
    this.bodyHeight = this._io.readU1();
    this.moleSize = this._io.readU1();
    this.moleEnable = this._io.readU1();
    this.moleHorizontal = this._io.readU1();
    this.moleVertical = this._io.readU1();
    this.mouthStretch = this._io.readU1();
    this.mouthColor = this._io.readU1();
    this.mouthSize = this._io.readU1();
    this.mouthType = this._io.readU1();
    this.mouthVertical = this._io.readU1();
    this.beardSize = this._io.readU1();
    this.beardMustache = this._io.readU1();
    this.beardVertical = this._io.readU1();
    this.noseSize = this._io.readU1();
    this.noseType = this._io.readU1();
    this.noseVertical = this._io.readU1();
  }

  return MiidataMs;
})();
return MiidataMs;
}));
