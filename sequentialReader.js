function sequentialReader(buf) {
  this.buffer = new DataView(buf.buffer ? buf.buffer : buf);
  this.offset = 0;
}

sequentialReader.prototype = {
  readUint8: function () {
    var val = this.buffer.getUint8(this.offset);
    this.offset++;
    return val;
  },
  readInt8: function () {
    var val = this.buffer.getInt8(this.offset);
    this.offset++;
    return val;
  },
  readUint16LE: function () {
    var val = this.buffer.getUint16(this.offset, true);
    this.offset += 2;
    return val;
  },
  readUint16BE: function () {
    var val = this.buffer.getUint16(this.offset);
    this.offset += 2;
    return val;
  },
  readInt16LE: function () {
    var val = this.buffer.getInt16(this.offset, true);
    this.offset += 2;
    return val;
  },
  readInt16BE: function () {
    var val = this.buffer.getInt16(this.offset);
    this.offset += 2;
    return val;
  },
  readUint32LE: function () {
    var val = this.buffer.getUint32(this.offset, true);
    this.offset += 4;
    return val;
  },
  readUint32BE: function () {
    var val = this.buffer.getUint32(this.offset);
    this.offset += 4;
    return val;
  },
  readInt32LE: function () {
    var val = this.buffer.getInt32LE(this.offset, true);
    this.offset += 4;
    return val;
  },
  readInt32BE: function () {
    var val = this.buffer.getInt32(this.offset);
    this.offset += 4;
    return val;
  },
  readFloatLE: function () {
    var val = this.buffer.getFloat32(this.offset, true);
    this.offset += 4;
    return val;
  },
  readFloatBE: function () {
    var val = this.buffer.getFloat(this.offset);
    this.offset += 4;
    return val;
  },
  readDoubleLE: function () {
    var val = this.buffer.getFloat64(this.offset, true);
    this.offset += 8;
    return val;
  },
  readDoubleBE: function () {
    var val = this.buffer.getFloat(this.offset);
    this.offset += 8;
    return val;
  },
  readBytes: function (size) {
    var val = new Uint8Array(this.buffer.buffer, this.offset, size);

    //val = new Uint8Array(val.subarray(this.offset, this.offset + size));
    this.offset += size;
    return val;
  },
  readString: function (encoding, size) {
    if (typeof encoding === 'number') {
      size = encoding;
      encoding = 'utf8';
    } else {
      encoding = encoding || 'utf8';
    }
    var decoder = new TextDecoder(encoding);
    var buf = (new Uint8Array(this.buffer.buffer)).subarray(this.offset, this.offset + size);
    var val = decoder.decode(buf);
    val = val.replace(/\0/g, '');
    this.offset += size;
    return val;
  },
  slice: function (size) {
    var subBuffer = this.buffer.slice(this.offset, this.offset + size);
    this.offset += size;
    return subBuffer;
  },
  bufferSize: function () {
    return this.buffer.byteLength;
  }
};
