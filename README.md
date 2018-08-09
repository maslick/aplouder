# =apLouder=
custom multifile uploader

## Features
 * inhances the standard HTML **input type="file"** element
 * creates an image gallery with thumbnails from the files you want to include in your form
 * shows size/filname on mouse hover
 * an on-click image preview (use left/right/esc keys to navigate through the gallery)
 * support for non-image files

![alt tag](screenshot1.png?raw=true "apLouder")

## Installation
```
<link rel="stylesheet" href="aplouder.css">
<script src="aplouder.js"></script>
```
 
## Usage
1. Define your input file tag:
```
<input type="file" id="file-input-element" multiple>
```
2. Initialize **ApLouder**
```
<script>
    var aplouder = new Aplouder({ inputId: "file-input-element" });
    aplouder.init();
</script>
```
## Live demo
http://aplouder.herokuapp.com

![alt tag](screenshot2.png?raw=true "apLouder")

is identical to:

![alt tag](screenshot3.png?raw=true "standard input element")
