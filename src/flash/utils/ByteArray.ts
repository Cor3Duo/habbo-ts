

export default class ByteArray {

  private _data: Uint8Array;
  private _position = 0;

  get length(): number {
    return this._data.length;
  }

  set position(value: number) {
    this._position = value;
  }

  constructor(data: Uint8Array = new Uint8Array()) {
    this._data = data;
  }

  set(index: number, value: number) {
    if (index >= this._data.length) {
      const newData = new Uint8Array(index + 1);
      newData.set(this._data);
      this._data = newData;
    }
    this._data[index] = value;
  }

  get(index: number): number {
    return this._data[index];
  }

  readUTFBytes(length: number): string {
    const data = this._data.subarray(this._position, this._position + length);
    this._position += length;
    return new TextDecoder().decode(data);
  }

}