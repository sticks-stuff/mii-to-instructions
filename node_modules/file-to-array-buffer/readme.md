# File to ArrayBuffer

Turn a `File` (or any `Blob`) into an `ArrayBuffer`.

## Installation

```sh
npm install --save file-to-array-buffer
```

## Usage

```js
const fileToArrayBuffer = require('file-to-array-buffer')

// <input id="fileItem" type="file" />
const file = document.getElementById('fileItem').files[0]

fileToArrayBuffer(file).then((data) => {
  console.log(data)
  //=> ArrayBuffer {byteLength: ...}
})
```

## API

### `fileToArrayBuffer(file: Blob) => Promise<ArrayBuffer>`

Read the data of the `file` into an `ArrayBuffer`.
