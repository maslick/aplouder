# =apLouder=
custom multifile uploader

## Features
 * inhances the standard HTML **input type="file"** element
 * creates an image gallery with thumbnails from the files you want to put into a form
 * shows size/filname on mouse hover
 * image preview on click (use left/right/esc keys to navigate through the gallery)
 * support for non-image files
 
 
## Installation
```
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
## Example
http://aplouder.herokuapp.com
![alt tag](screenshot2.png?raw=true "apLouder")
