// drag and drop files
document.getElementById("aplouder").addEventListener('drop', function (e) {
    e.preventDefault();
    var files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        processFile(files[i], function (fi, fiInfo) {
            scaleImage(fi, 120, 120, function (canvas) {
                drawImage(canvas.toDataURL("image/jpeg"), fiInfo)
            });
        });
    }
}, true);

document.getElementById("aplouder").addEventListener('dragover', function (e) {
    e.preventDefault();
}, true);

// using a file manager after button click
document.querySelector('.inputfile').addEventListener('change', function (e) {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
        processFile(files[i], function (fi, fiInfo) {
            scaleImage(fi, 120, 120, function (canvas) {
                drawImage(canvas.toDataURL("image/jpeg"), fiInfo)
            });
        });
    }
}, true);

document.getElementById("aplouder").addEventListener('click', function () {
    document.getElementById("images").click();
}, true);

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
    document.getElementById('ap-filepreview').innerHTML +=
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
    document.getElementById("ap-filepreview").querySelector("div.ap-preview:last-child div.ap-image img").setAttribute('src', content);
}

function formatFileSize(bytes) {
    if (bytes < 1000) return bytes + " bytes";
    if (bytes >= 1000 && bytes <= 1000*1000) return Math.round(bytes / 1000) + " kB";
    return Math.round(bytes / 1000000 * 10) / 10 + " MB";
}