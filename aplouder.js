function Aplouder(options) {
    var self = this;

    this.getDropAreaEl = function () {
        return document.getElementById("ap-droparea");
    };

    this.getGalleryEl = function () {
        return document.getElementById("ap-gallery");
    };

    this.getMessageEl = function () {
        return document.getElementById("ap-message");
    };

    this.getInputFileEl = function () {
        return document.querySelector('.inputfile');
    };

    this.initBrowseFilesButton = function () {
        this.getMessageEl().onclick = function () {
            document.getElementById("images").click();
        };
    };

    this.processFiles = function (files, callback = null) {
        for (let i = 0; i < files.length; i++) {
            let src = files[i];
            this.file2base64(src, function (file64) {
                self.scaleImage(file64, 120, 120, function (scaledImg) {
                    self.drawImage(scaledImg, {name: src.name, size: src.size});
                    obj = {srcFile: src, base64: file64, thumb: scaledImg};
                    self.Filez.push(obj);
                    if (callback) callback(obj);
                    self.initBrowseFilesButton();
                });
            });
        }
    };

    this.file2base64 = function (file, callback) {
        var reader = new FileReader();
        reader.onload = function (e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    this.scaleImage = function (url, width, height, callback) {
        var img = new Image();
        img.crossOrigin = "anonymous";

        // When the image is loaded, resize it in canvas.
        img.onload = function () {
            var canvas = document.createElement("canvas"),
                ctx = canvas.getContext("2d");

            canvas.width = width;
            canvas.height = height;

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

            callback(canvas.toDataURL("image/png"));
        };

        img.src = url;
    };

    this.drawImage = function (content, details) {
        self.getGalleryEl().innerHTML +=
            '<div class="ap-preview">' +
            '  <div class="ap-image">' +
            '     <img>' +
            '  </div>' +
            '  <div class="ap-overlay">' +
            '    <div class="ap-details">' +
            '       <div class="ap-size">' +
            self.formatFileSize(details.size) +
            '       </div>' +
            '       <div class="ap-name">' +
            details.name +
            '       </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';
        this.getDropAreaEl().querySelector("div.ap-preview:last-child div.ap-image img").setAttribute('src', content);
    };

    this.removeGallery = function () {
        document.getElementById("ap-gallery").innerHTML = "";
        Filez = [];
    };

    this.formatFileSize = function (bytes) {
        if (bytes < 1000) return bytes + " bytes";
        if (bytes >= 1000 && bytes <= 1000 * 1000) return Math.round(bytes / 1000) + " kB";
        return Math.round(bytes / 1000000 * 10) / 10 + " MB";
    };

    this.preventDefaults = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
}


Aplouder.prototype.init = function () {
    var self = this;
    this.Filez = [];
    this.initBrowseFilesButton();

    // using file manager after button click
    this.getInputFileEl().addEventListener('change', function (e) {
        self.removeGallery();
        self.processFiles(this.files);
    }, false);
};



