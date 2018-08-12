# =apLouder=
enhanced multi-file uploader

## Features
 * enhances the standard HTML **input type="file"** element
 * creates an image gallery with thumbnails from the files you want to include in your form
 * shows size/filename on mouse hover
 * on-click image preview (use left/right/esc keys to navigate through the gallery)
 * support for non-image files

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
    var aplouder = new Aplouder({ id: "my-element" });
    aplouder.init();
</script>
```

![alt tag](screenshot2.png?raw=true "apLouder")

is identical to:

![alt tag](screenshot3.png?raw=true "standard input element")

## Live demo
http://aplouder.herokuapp.com
