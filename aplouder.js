function Aplouder(options) {
    var self = this;

    this.processFiles = function (files, callback) {
        for (i = 0; i < files.length; i++) {
            src = files[i];
            this.file2base64(src, function (original, file64) {
                if (file64 == null)
                    self.drawImage(null, {name: original.name, size: original.size, type: original.type});
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
        if (content === null)
            this.getDropAreaEl().querySelector("div.ap-preview:last-child div.ap-image img").setAttribute('src', self.unknown);
        else
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
    this.audio = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAABgFBMVEUAAACqqqqqqqqurq6urq6mpqaqqqqtra2pqamqqqqrq6upqamqqqqrq6uqqqqpqamrq6upqamqqqqrq6upqamrq6upqamqqqqrq6upqamqqqqrq6uqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///9cRIPAAAAAK3RSTlMAAxITFhcYGVxdXl9gYWNljo+QkZKUlZaXmJmpqqvOz9DR6Onq6/Lz9Pr+b1G0hwAAAztJREFUeNrt2+tXEkEYwOERy4rSyi5aWqldDF8WTFQUVFJRsCDTMrULpqGpKIqKeGX+9U6cGWQLhX1n2el05vd5dx/YndndDzuEV329ubUNKlpba5PdRvRdeeAAS3I01hS6N1+CZbXX5dmqu2Bp9VUMxrp4mZ1nsLzc2b70wnq4/fcIewgSaiCk2iEDdtjIDZCSnTySAzeTVjnwE/JcDvyUdMiBOwhISsEK/rdg9+j0QmLv4JgeplPL8xGfNXDfTCJL9WWWJlwVhl2RBC3aUWyggrAW3afntzpYKTicoRcX764E3PuTluxo0mk6PHZEy2nNYy7snP9TyKaT66ubqb9+TnrQTFiL08IOfkT9fP54RmY3dNPrJGge7F4t/KvxMSfo6/6wS886DZsFa+sF7Hdv0UsxkSrYJmwSvEjzJQfOHQXRY8o7HTYFnj874NRFs6Vng/IO+0yAg5S3HyhxSb5Q3pYmDHdlKGvPC6WazI/vz8LwCmWlPFC6COW9FoSD+fPcA+U0nf+dmhCs8Ql64ofyinF5Ugh+T1lRKDPXNh/ZbgFYS/MHHpRd/ynbZ0oAfsNPdA+U3xwfFRoe3mTHmAEDuflrShgNe0tcrhIDYxkNf2JHmAVDuQ7YHbYLC++wp40HjMXv7hEk7OGvj2AwP9txCQmH2f5vwWgpNq6R8DcGdxuG+WPKi4MTNNcuGG6cweM4mA3OReMwHx3TKLiT7f0RjMfeehdQsI/BIQS8yeYDCh5icAABL9NcGyh4hMF+BLxEc22jYD40+xAwex1Io+BQfjIa7yu7gyhYwQrWwbE5XS4o1qh+o6QYXLRXUKxZqk/BClawghWsYAUrWBacRsHD4vAWCu4Xh1dQsHYsDM+hYIgLwwEcHBKFd504GJKC8AQg4aFTIXjNiYXhnQic7gI0DNEsGk71ggAMIzs4OBvrBCEYtMha1jCcifkA8DCv0x8MnaVBsXwFWwS8TvWtj4IVrGAF/w+wvI9+n8mB20iLHPgxaZb1KbtdDnyV2GQtVyANMuB7MpekkDrr4VqS647V7i2+0KreWvd2FeHVtVt4fWtJQTWNVi2mu3+Z6LPZm1oqvXywpemajXu/AGltHuXjQwuYAAAAAElFTkSuQmCC";

    // using file manager after button click
    this.getInputFileEl().addEventListener('change', function (e) {
        self.removeGallery();
        self.processFiles(this.files);
    }, false);
};



