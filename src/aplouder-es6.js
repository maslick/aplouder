(function() {
    class Aplouder {

        constructor(options) {
            this.callback = options.callback || null;
            this.id = options.id || "ap-file-input";
            this.inputFileEl = document.getElementById(this.id);
            this.unknown = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAABTVBMVEUAAAAAqv8AnOMAlOQAl+gAm+kAleoAmesAmOkAmukAmOkAmecAmucAmOcAmOgAmugAmegAmegAmOgAmegAmugAmekAmOkAmecAmucAmegAmegAmOgAmekAmukAmecAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegAmegBmegCmugDmugEm+gFm+gHnOkInOkJnekOn+kao+ocpOsjp+skp+slqOsmqOsnqewoqewpqewtqusvq+syrOwzrew0rew1ruw2ruw3ruxDs+1EtO1Mt+5Rue5Xu++GzfKO0fOP0fOQ0fOR0vOS0vOT0/OU0/SV0/Sd1/Sk2fWl2vWm2vWn2/Wo2/Wp2/Wq3Pav3vay3/a44fe/5PfE5vjg8fnh8fri8vrj8vrk8vrn9Prr9frs9vvt9vvy+Pvz+Pv3+vz5+/z8/PzbC5gtAAAAK3RSTlMAAxITFhcYGVxdXl9gYWNljo+QkZKUlZaXmJmpqqvOz9DR6Onq6/Lz9Pr+b1G0hwAAAm1JREFUeAHt21dzUkEYh/GXE0VFgxpLoqACFiR7YjEWgxp7770XURNL3O9/6Y5ynIOvnuGZkd1c7HP7n53fLLeclayxtfVmy4y0VrNWSWSwVds6xkudqXLeXb/feKtdlazSZuO1iVIf9uw6uf87G+9VxbVin3+4XXbwdhOgSZGxTgi4k8g6E6SK7AgD16UZBt4le8PAu2U6DDwtJlDLHI5whCMc4QhHOMIRvjJfOM9dGxF89dvi+SK39/0GgIlr7ecL/5y7PWuBLMgtkLsfrCWyMNfJF/86n3IukgW4SlYukAW6ri+X1Hz6o7VQFuAqWblAFu46+fLAfOaTtVgW5mZyNzcfX/hzXrpOYODaRzMm1021uztjGLhABjBwqaxg4AIZwMAFMoCBy2X5Ty6WhbtchjB0oSzc5TKCuctk4S6XAcxdKgt3uTwEzF0uF8Cv1Nmls2bY5r6q02/TIeHDr9XZxXPDuj119t1RUwAzmbsaxjJ3AQxl7joYytwFMJa562AmY5fCXD4JXAUDWbnvketgLAMXwEAGLoCBDFwFc5m7Gubywjx3OWxm32j5RG4/BlwFwzu/PJSb04fAVTCSX+RdJz/groOhrF0n38eug7H8/KCa03vUdTCVnyk3k4nrYCRrN5PvMtfBTH6q3Ey+g1wHI/mJdn/Lt4GLYCc/PlAwp7eAi2BzZKZwTmeD/icR4QhHOMIRjnCEIxzhCIf76HdPGLgljTDwTqmHgetSCQOvliTUcwWZDAFvCfkkRar+4XH52Sbf7gb5VWnCr7uxJFnVtj+2PS65ylO+HtNtXSmDJZVaY9TPBxu1NUnm/QAjXOs62QO4CAAAAABJRU5ErkJggg==";
            this.Filez = [];
            this.numberOfFiles = 0;
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

            // hide the browse files button
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
                Aplouder.file2base64(src, function (original, file64) {
                    Aplouder.scaleImage(file64 || self.unknown, 120, 120, function (scaledImg) {
                        const obj = { src: original, base64: file64 || self.unknown, thumb64: scaledImg, i: self.numberOfFiles++ };
                        Aplouder.drawImage(self.id, obj);
                        Aplouder.addSlide(self.id, obj);
                        self.Filez.push(obj);
                        if (callback != null) callback(obj);
                        self.initBrowseFilesButton();
                    });
                });
            }
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
        }

        static scaleImage(url, width, height, callback) {
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

        static file2base64(file, callback) {
            let reader = new FileReader();
            if (["image/gif", "image/jpeg", "image/png"].includes(file.type)) {
                reader.onload = function (e) {
                    callback(file, e.target.result);
                };
                reader.readAsDataURL(file);
            }
            else callback(file, null);
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

        static formatFileSize(bytes) {
            if (bytes < 1000) return "< 1kB";
            if (bytes >= 1000 && bytes <= 1000 * 1000) return Math.round(bytes / 1000) + "kB";
            return Math.round(bytes / 1000000 * 10) / 10 + "Mb";
        }

        static addSlide(id, f) {
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
        }

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
        }
    }

    Aplouder.aplouders = [];

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = Aplouder;
    else window.Aplouder = Aplouder;
})();