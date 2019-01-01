# =apLouder=
[![npm (scoped)](https://img.shields.io/npm/v/@maslick/aplouder.svg)](https://www.npmjs.com/package/@maslick/aplouder)
[![npm bundle size (minified)](https://img.shields.io/badge/minified-6Kb-green.svg)](https://www.npmjs.com/package/@maslick/aplouder)
[![npm no dependencies](https://img.shields.io/badge/dependencies-none-green.svg)](https://www.npmjs.com/package/@maslick/radiaslider)
[![npm download count](https://img.shields.io/npm/dt/@maslick/aplouder.svg)](https://www.npmjs.com/package/@maslick/aplouder)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

enhanced multi-file uploader

## Features
 * enhances the standard HTML **input type="file"** element
 * adds an image gallery with thumbnails
 * shows size/filename on mouse hover
 * on-click image preview (use left/right/esc keys to navigate through the gallery)
 * 100% JavaScript
 * works perfectly on desktop, mobile and tablet
 * support for non-image files
 * no extra dependencies (jquery, etc.)
 * small size (minified ~6 Kb)

![alt tag](screenshot1.png?raw=true "apLouder")


## Demo
Live demo can be found [here](https://maslick.github.io/aplouder/demo/index.html).

## Installation
```html
<link rel="stylesheet" href="aplouder.css">
<script src="aplouder.js"></script>
```
 
## Usage
1. Define your input file element:
```html
<input type="file" id="my-element" multiple>
```
2. Initialize **ApLouder**
```js
<script>
    var aplouder = new Aplouder({
        id: "my-element",
        callback: function (f) {
            console.log(f.src.name);
        }
    });
    aplouder.init();
</script>
```

![alt tag](screenshot2.png?raw=true "apLouder")

is identical to:

![alt tag](screenshot3.png?raw=true "standard input element")


## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).


