class Aplouder {

    constructor(options) {
        this.callback = options.callback || null;
        this.id = options.id || "ap-file-input";
        this.inputFileEl = document.getElementById(this.id);
        this.numberOfFiles = 0;
        this.unknown = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAABTVBMVEUAAAAAqv8AnOMAlOQAl+gAm+kAleoAmesAmOkAmukAmOkAmecAmucAmOcAmOgAmugAmegAmegAmOgAmegAmugAmekAmOkAmecAmucAmegAmegAmOgAmekAmukAmecAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegBmegCmugDmugEm+gFm+gHnOkInOkJnekOn+kao+ocpOsjp+skp+slqOsmqOsnqewoqewpqewtqusvq+syrOwzrew0rew1ruw2ruw3ruxDs+1EtO1Mt+5Rue5Xu++GzfKO0fOP0fOQ0fOR0vOS0vOT0/OU0/SV0/Sd1/Sk2fWl2vWm2vWn2/Wo2/Wp2/Wq3Pav3vay3/a44fe/5PfE5vjg8fnh8fri8vrj8vrk8vrn9Prr9frs9vvt9vvy+Pvz+Pv3+vz5+/z8/PzbC5gtAAAAK3RSTlMAAxITFhcYGVxdXl9gYWNljo+QkZKUlZaXmJmpqqvOz9DR6Onq6/Lz9Pr+b1G0hwAAAm1JREFUeAHt21dzUkEYh/GXE0VFgxpLoqACFiR7YjEWgxp7770XURNL3O9/6Y5ynIOvnuGZkd1c7HP7n53fLLeclayxtfVmy4y0VrNWSWSwVds6xkudqXLeXb/feKtdlazSZuO1iVIf9uw6uf87G+9VxbVin3+4XXbwdhOgSZGxTgi4k8g6E6SK7AgD16UZBt4le8PAu2U6DDwtJlDLHI5whCMc4QhHOMIRvjJfOM9dGxF89dvi+SK39/0GgIlr7ecL/5y7PWuBLMgtkLsfrCWyMNfJF/86n3IukgW4SlYukAW6ri+X1Hz6o7VQFuAqWblAFu46+fLAfOaTtVgW5mZyNzcfX/hzXrpOYODaRzMm1021uztjGLhABjBwqaxg4AIZwMAFMoCBy2X5Ty6WhbtchjB0oSzc5TKCuctk4S6XAcxdKgt3uTwEzF0uF8Cv1Nmls2bY5r6q02/TIeHDr9XZxXPDuj119t1RUwAzmbsaxjJ3AQxl7joYytwFMJa562AmY5fCXD4JXAUDWbnvketgLAMXwEAGLoCBDFwFc5m7Gubywjx3OWxm32j5RG4/BlwFwzu/PJSb04fAVTCSX+RdJz/groOhrF0n38eug7H8/KCa03vUdTCVnyk3k4nrYCRrN5PvMtfBTH6q3Ey+g1wHI/mJdn/Lt4GLYCc/PlAwp7eAi2BzZKZwTmeD/icR4QhHOMIRjnCEIxzhCIf76HdPGLgljTDwTqmHgetSCQOvliTUcwWZDAFvCfkkRar+4XH52Sbf7gb5VWnCr7uxJFnVtj+2PS65ylO+HtNtXSmDJZVaY9TPBxu1NUnm/QAjXOs62QO4CAAAAABJRU5ErkJggg==";
        this.unknownLarge = "data:image/png;base64,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";
        this.Filez = [];
        this.slideNumber = null;
    }

    init() {
        let self = this;
        Aplouder.aplouders.push(this);

        // prepare template
        const template_html =
            `<div class="ap-droparea ${this.id}">\n` +
            '   <div class="ap-message">\n' +
            '      <svg class="ap-box-icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>\n' +
            '      <div><a href="#" class="ap-href"><strong>click</strong></a> to open the file Browser</div>\n' +
            '   </div>\n' +
            '   <div class="ap-gallery"></div>\n' +
            '</div>\n' +
            `<div class="ap-modal ${this.id}" onclick="Aplouder.hideModal('${this.id}')">\n` +
            '   <div class="ap-modal-content"></div>\n' +
            '</div>';
        this.inputFileEl.insertAdjacentHTML('afterend', template_html);
        this.inputFileEl.style.width = "0.1px";
        this.inputFileEl.style.height = "0.1px";
        this.inputFileEl.style.opacity = "0";
        this.inputFileEl.style.overflow = "hidden";
        this.inputFileEl.style.position = "absolute";
        this.inputFileEl.style.zIndex = "-1";

        this.initBrowseFilesButton();

        // using file manager after button click
        this.inputFileEl.addEventListener('change', function (e) {
            self.removeGallery();
            self.processFiles(this.files, self.callback);
        }, false);

        // key binding (esc, left, right)
        function handlePrev() {
            if (self.slideNumber !== null) {
                const prevSlide = self.slideNumber - 1;
                if (prevSlide !== -1) Aplouder.currentSlide(self.id, prevSlide);
                else Aplouder.currentSlide(self.id, Object.keys(self.Filez).length - 1);
            }
        }

        function handleNext() {
            if (self.slideNumber !== null) {
                const nextSlide = self.slideNumber + 1;
                if (nextSlide !== Object.keys(self.Filez).length) Aplouder.currentSlide(self.id, nextSlide);
                else Aplouder.currentSlide(self.id, 0);
            }
        }

        window.addEventListener("keydown", function (e) {
            if (e.keyCode === 27) Aplouder.hideModal(self.id);
            if (e.keyCode === 37) handlePrev();
            if (e.keyCode === 39) handleNext();
        }, false);
    }

    processFiles(files, callback) {
        let self = this;
        for (let i = 0; i < files.length; i++) {
            let src = files[i];
            this.file2base64(src, function (original, file64) {
                if (file64 == null) file64 = self.unknownLarge;
                self.scaleImage(file64, 120, 120, function (scaledImg) {
                    const obj = { src: original, base64: file64, thumb64: scaledImg, i: self.numberOfFiles++ };
                    Aplouder.drawImage(self.id, obj);
                    Aplouder.addSlide(self.id, obj);
                    self.Filez.push(obj);
                    if (callback != null) callback(obj);
                    self.initBrowseFilesButton();
                });
            });
        }
    }

    file2base64(file, callback) {
        let reader = new FileReader();
        if (["image/gif", "image/jpeg", "image/png"].includes(file.type)) {
            reader.onload = function (e) {
                callback(file, e.target.result);
            };
            reader.readAsDataURL(file);
        }
        else callback(file, null);
    }

    scaleImage(url, width, height, callback) {
        let img = new Image();
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
                let minVal = Math.min(img.width, img.height);
                if (img.width > img.height)
                    ctx.drawImage(this, (img.width - minVal) / 2, 0, minVal, minVal, 0, 0, width, height);
                else
                    ctx.drawImage(this, 0, (img.height - minVal) / 2, minVal, minVal, 0, 0, width, height);
            }

            callback(canvas.toDataURL("image/png"));
        };

        img.src = url;
    }

    static drawImage(id, json) {
        let onclick = `Aplouder.openModal('${id}'); Aplouder.currentSlide('${id}', ${json.i});`;
        document.querySelector(`.${id}.ap-droparea > .ap-gallery`).innerHTML +=
            '<div class="ap-preview">' +
            '   <div class="ap-image">' +
            '       <img src="' + json.thumb64 + '">' +
            '   </div>' +
            '   <div class="ap-overlay" onclick="' + onclick + '">' +
            '       <div class="ap-details">' +
            '           <div class="ap-size">' +
                            Aplouder.formatFileSize(json.src.size) +
            '           </div>' +
            '           <div class="ap-name">' +
                            json.src.name +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>';
    }

    removeGallery() {
        document.querySelector(`.${this.id}.ap-droparea > .ap-gallery`).innerHTML = "";
        document.querySelector(`.${this.id}.ap-modal > .ap-modal-content`).innerHTML = "";
        this.Filez = [];
        this.numberOfFiles = 0;
    }

    initBrowseFilesButton() {
        let self = this;
        document.querySelector(`.${this.id}.ap-droparea > .ap-message`).onclick = function () {
            self.inputFileEl.click();
        };
    };

    static formatFileSize(bytes) {
        if (bytes < 1000) return "< 1kB";
        if (bytes >= 1000 && bytes <= 1000 * 1000) return Math.round(bytes / 1000) + "kB";
        return Math.round(bytes / 1000000 * 10) / 10 + "Mb";
    }

    static preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    static addSlide(id, f) {
        if (f.base64 == null) f.base64 = self.unknown;
        document.querySelector(`.${id}.ap-modal .ap-modal-content`).innerHTML +=
            '<div class="ap-slides">' +
            '   <img src="' + f.base64 + '">' +
            '   <div class="ap-slide-name">' +
                    f.src.name +
            '   </div>' +
            '   <div class="ap-slide-size">' +
                    Aplouder.formatFileSize(f.src.size) +
            '   </div>' +
            '</div>';
    };

    static hideModal(id) {
        document.querySelector(`.${id}.ap-modal`).style.display = "none";
        let slides = document.querySelectorAll(`.${id}.ap-modal > .ap-modal-content > .ap-slides`);
        for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        Aplouder.aplouders.filter(it => it.id === id)[0].slideNumber = null;
    }

    static openModal(id) {
        document.querySelector(`.${id}.ap-modal`).style.display = "block";
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }

    static currentSlide(id, n) {
        let slides = document.querySelectorAll(`.${id}.ap-modal > .ap-modal-content > .ap-slides`);
        for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
        slides[n].style.display = "block";
        Aplouder.aplouders.filter(it => it.id === id)[0].slideNumber = n;
    };
}

Aplouder.aplouders = [];