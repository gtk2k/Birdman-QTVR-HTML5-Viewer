///<reference path="sequentialReader.js"/>

function movParser(arg) {
  this.reader = new sequentialReader(arg);
  var len = this.reader.bufferSize();
  var i = 0, sIdx = 0, eIdx = 0;
  this.jpeg = false;
  this.jpegs = [];
};

movParser.prototype.parse = function () {
  var atom = this.readAtom();
  this.readContainerAtom(atom.size);
  return this.jpeg ? this.jpegs : null;
};

movParser.prototype.readContainerAtom = function (atomSize) {
  var size = atomSize;
  while (size > 0 && !this.jpeg) {
    var atom = this.readAtom();
    size -= atom.size;
    switch (atom.type) {
      case 'udta':
      case 'trak':
      case 'tapt':
      case 'clip':
      case 'matt':
      case 'edts':
      case 'tref':
      case 'imap':
      case 'mdia':
      case 'minf':
      case 'gmhd':
      case 'dinf':
      case 'stbl':
      case 'rmra':
      case 'rmda':
        this.readContainerAtom(atom.size);
        break;
      default:
        if (atom.type === 'stco') {
          this.reader.offset += 4; // version(1byte)とflags(3byte)を飛ばす
          var chunkCount = this.reader.readInt32BE();
          if (chunkCount === 6) {
            var offsets = [];
            for (var i = 0; i < 6; i++) {
              offsets.push(this.reader.readUint32BE());
            }
            this.jpeg = true;
            var that = this;
            for (var i = 0; i < 6; i++) {
              var offset = offsets[i];
              that.reader.offset = offset;
              var marker = that.reader.readUint16BE();
              if (marker !== 0xFFD8) { // 0xFFD8: SOIセグメント
                this.jpeg = false;
                break;
              } else {
                while (true) {
                  marker = that.reader.readUint16BE();
                  that.reader.offset += that.reader.readUint16BE();
                  if (marker === 0xFFDA) { // 0xFFDA: SOSセグメント
                    for (var j = that.reader.offset, len = that.reader.bufferSize() ; j < len; j++) {
                      that.reader.offset = j;
                      marker = that.reader.readUint16BE();
                      if (marker === 0xFFD9) {
                        that.reader.offset = offset;
                        var bytes = that.reader.readBytes(j + 2 - offset);
                        that.jpegs.push(new Blob([bytes]));
                        break;
                      }
                    }
                    break;
                  }
                }
              }
            }
          }
        }
        this.reader.offset += atom.size - 8;
        break;
    }
  }
};


movParser.prototype.readAtom = function () {
  var size = this.reader.readInt32BE();
  var type = this.reader.readString(4);
  return { size: size, type: type };
};

movParser.prototype.parseAtom = function (isTable) {
  var size = this.reader.readInt32BE();
  var type = this.reader.readString(4);
  var version = this.reader.readUint8();
  var flags = this.reader.readBytes(3);
  var entryCount = null;
  if (isTable) entryCount = this.reader.readUint32BE();
  return {
    atomSize: size,
    payloadSize: size - 4 - (isTable ? 4 : 0),
    type: type,
    version: version,
    flags: flags,
    entryCount: entryCount
  }
};

