// drag and drop files
var dropArea = document.getElementById("ap-droparea");

dropArea.addEventListener('drop', function (e) {
    preventDefaults(e);
    var files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        processFile(files[i], function (file, info) {
            scaleImage(file, 120, 120, function (canvas) {
                drawImage(canvas.toDataURL("image/jpeg"), info);
                makeButtonClickable();
            });
        });
    }
}, false);

dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
}, true);

// Highlight on drag
dropArea.addEventListener('dragenter', function (e) {
    highlight(e);
}, false);

dropArea.addEventListener('dragover', function (e) {
    highlight(e);
}, false);

dropArea.addEventListener('dragleave', function (e) {
    unhighlight(e);
}, false);

dropArea.addEventListener('drop', function (e) {
    unhighlight(e);
}, false);

// using a file manager after button click
document.querySelector('.inputfile').addEventListener('change', function (e) {
    var files = this.files;
    for (let i = 0; i < files.length; i++) {
        processFile(files[i], function (fi, fiInfo) {
            scaleImage(fi, 120, 120, function (canvas) {
                drawImage(canvas.toDataURL("image/jpeg"), fiInfo);
                makeButtonClickable();
            });
        });
    }
}, false);

function makeButtonClickable() {
    document.getElementsByClassName("ap-message")[0].onclick = function () {
        document.getElementById("images").click();
    };
}

makeButtonClickable();

function processFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result, { name: file.name, size: file.size });
    };
    reader.readAsDataURL(file);
}

function scaleImage(url, width, height, callback){
    var img = new Image();
    img.crossOrigin = "anonymous";

    // When the images is loaded, resize it in canvas.
    img.onload = function() {
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height= height;

        // draw the img into canvas
        if (img.width === img.height)
            ctx.drawImage(this, 0, 0, width, height);
        else {
            minVal = Math.min(img.width, img.height);
            if (img.width > img.height)
                ctx.drawImage(this, (img.width - minVal) / 2, 0, minVal, minVal, 0, 0, width, height);
            else
                ctx.drawImage(this, 0, (img.height - minVal) / 2, minVal, minVal, 0, 0, width, height);
        }

        callback(canvas);
    };

    img.src = url;
}

function drawImage(content, details) {
    dropArea.innerHTML +=
        '<div class="ap-preview">' +
        '  <div class="ap-image">' +
        '     <img>' +
        '  </div>' +
        '  <div class="ap-overlay">' +
        '    <div class="ap-details">' +
        '       <div class="ap-size">' +
                    formatFileSize(details.size) +
        '       </div>' +
        '       <div class="ap-name">' +
                    details.name +
        '       </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
    dropArea.querySelector("div.ap-preview:last-child div.ap-image img").setAttribute('src', content);
}

function formatFileSize(bytes) {
    if (bytes < 1000) return bytes + " bytes";
    if (bytes >= 1000 && bytes <= 1000*1000) return Math.round(bytes / 1000) + " kB";
    return Math.round(bytes / 1000000 * 10) / 10 + " MB";
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}