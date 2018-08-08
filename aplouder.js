function Aplouder(options) {
    var self = this;
    this.callback = options.callback || null;

    this.processFiles = function (files, callback) {
        for (i = 0; i < files.length; i++) {
            src = files[i];
            this.file2base64(src, function (original, file64) {
                if (file64 == null) {
                    self.drawImage(self.unknown, {name: original.name, size: original.size, type: original.type});
                    obj = {srcFile: original, base64: null, thumb: self.unknown};
                    self.Filez.push(obj);
                    if (callback != null) callback(obj);
                    self.initBrowseFilesButton();
                }
                else
                    self.scaleImage(file64, 120, 120, function (scaledImg) {
                        self.drawImage(scaledImg, {name: original.name, size: original.size, type: original.type});
                        obj = {srcFile: original, base64: file64, thumb: scaledImg};
                        self.Filez.push(obj);
                        if (callback != null) callback(obj);
                        self.initBrowseFilesButton();
                    });
            });
        }
    };

    this.file2base64 = function (file, callback) {
        var reader = new FileReader();
        if (["image/gif", "image/jpeg", "image/png"].includes(file.type)) {
            reader.onload = function (e) {
                callback(file, e.target.result);
            };
            reader.readAsDataURL(file);
        }
        else
            callback(file, null);
    };

    this.scaleImage = function (url, width, height, callback) {
        var img = new Image();
        img.crossOrigin = "anonymous";

        // When the image is loaded, resize it in canvas
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
        if (bytes < 1000) return "< 1kB";
        if (bytes >= 1000 && bytes <= 1000 * 1000) return Math.round(bytes / 1000) + "kB";
        return Math.round(bytes / 1000000 * 10) / 10 + "Mb";
    };

    this.preventDefaults = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };

    // HTML elements' getters
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
            document.getElementById(options.inputId || "ap-file-input").click();
        };
    };
}


Aplouder.prototype.init = function () {
    var self = this;
    this.Filez = [];
    this.initBrowseFilesButton();
    this.unknown = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAABTVBMVEUAAAAAqv8AnOMAlOQAl+gAm+kAleoAmesAmOkAmukAmOkAmecAmucAmOcAmOgAmugAmegAmegAmOgAmegAmugAmekAmOkAmecAmucAmegAmegAmOgAmekAmukAmecAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegBmegCmugDmugEm+gFm+gHnOkInOkJnekOn+kao+ocpOsjp+skp+slqOsmqOsnqewoqewpqewtqusvq+syrOwzrew0rew1ruw2ruw3ruxDs+1EtO1Mt+5Rue5Xu++GzfKO0fOP0fOQ0fOR0vOS0vOT0/OU0/SV0/Sd1/Sk2fWl2vWm2vWn2/Wo2/Wp2/Wq3Pav3vay3/a44fe/5PfE5vjg8fnh8fri8vrj8vrk8vrn9Prr9frs9vvt9vvy+Pvz+Pv3+vz5+/z8/PzbC5gtAAAAK3RSTlMAAxITFhcYGVxdXl9gYWNljo+QkZKUlZaXmJmpqqvOz9DR6Onq6/Lz9Pr+b1G0hwAAAm1JREFUeAHt21dzUkEYh/GXE0VFgxpLoqACFiR7YjEWgxp7770XURNL3O9/6Y5ynIOvnuGZkd1c7HP7n53fLLeclayxtfVmy4y0VrNWSWSwVds6xkudqXLeXb/feKtdlazSZuO1iVIf9uw6uf87G+9VxbVin3+4XXbwdhOgSZGxTgi4k8g6E6SK7AgD16UZBt4le8PAu2U6DDwtJlDLHI5whCMc4QhHOMIRvjJfOM9dGxF89dvi+SK39/0GgIlr7ecL/5y7PWuBLMgtkLsfrCWyMNfJF/86n3IukgW4SlYukAW6ri+X1Hz6o7VQFuAqWblAFu46+fLAfOaTtVgW5mZyNzcfX/hzXrpOYODaRzMm1021uztjGLhABjBwqaxg4AIZwMAFMoCBy2X5Ty6WhbtchjB0oSzc5TKCuctk4S6XAcxdKgt3uTwEzF0uF8Cv1Nmls2bY5r6q02/TIeHDr9XZxXPDuj119t1RUwAzmbsaxjJ3AQxl7joYytwFMJa562AmY5fCXD4JXAUDWbnvketgLAMXwEAGLoCBDFwFc5m7Gubywjx3OWxm32j5RG4/BlwFwzu/PJSb04fAVTCSX+RdJz/groOhrF0n38eug7H8/KCa03vUdTCVnyk3k4nrYCRrN5PvMtfBTH6q3Ey+g1wHI/mJdn/Lt4GLYCc/PlAwp7eAi2BzZKZwTmeD/icR4QhHOMIRjnCEIxzhCIf76HdPGLgljTDwTqmHgetSCQOvliTUcwWZDAFvCfkkRar+4XH52Sbf7gb5VWnCr7uxJFnVtj+2PS65ylO+HtNtXSmDJZVaY9TPBxu1NUnm/QAjXOs62QO4CAAAAABJRU5ErkJggg==";

    // using file manager after button click
    this.getInputFileEl().addEventListener('change', function (e) {
        self.removeGallery();
        self.processFiles(this.files, self.callback);
    }, false);
};