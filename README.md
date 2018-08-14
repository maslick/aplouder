# =apLouder=
enhanced multi-file uploader

## Features
 * enhances the standard HTML **input type="file"** element
 * creates an image gallery with thumbnails
 * shows size/filename on mouse hover
 * on-click image preview (use left/right/esc keys to navigate through the gallery)
 * support for non-image files
 * multiple **aploader-s** on the same page
 * only ~7kB minified
 * no extra dependencies (jquery, etc.)
 * vanilla JS and/or ECMAScript 2015 (ES6)

![alt tag](screenshot1.png?raw=true "apLouder")

## Installation
```
<link rel="stylesheet" href="aplouder.css">
<script src="aplouder.js"></script>
```
 
## Usage
1. Define your input file element:
```
<input type="file" id="my-element" multiple>
```
2. Initialize **ApLouder**
```
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

## Live demo
http://aplouder.herokuapp.com
