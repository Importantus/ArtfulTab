import { defineStore } from "pinia";
import loadImageData from "./imageLoader";
import { ImageData } from "./imageLoader";

type imageList = string[]

export const useDataStore = defineStore("dataStore", {
    state: () => {
        return {
            imageData: JSON.parse(localStorage.getItem("imageData") || '"{}"') as ImageData,
            lastChanged: new Date(JSON.parse(localStorage.getItem("lastChanged") || '"1980-01-01"')) as Date,
            hoursUntilNextImage: JSON.parse(localStorage.getItem("hoursUntilNextImage") || '"24"') as number,
            loading: false
        }
    },
    actions: {
        setImageData(imageData: ImageData) {
            console.log("Setting image data");

            this.imageData = imageData;
            localStorage.setItem("imageData", JSON.stringify(imageData));

            this.lastChanged = new Date();
            localStorage.setItem("lastChanged", JSON.stringify(this.lastChanged));
        },
        async loadImage() {
            const imageList = await fetch("/images.json").then((response) => response.json()) as imageList;

            const randomImage = imageList[Math.floor(Math.random() * imageList.length)];

            if (randomImage && randomImage.startsWith("File:")) {
                this.loading = true;
                loadImageData(randomImage).then((imageData) => {
                    if (imageData) {
                        this.setImageData(imageData);
                        this.loading = false;
                    } else {
                        this.loadImage();
                    }
                });
            }
        },
        init() {
            if (this.lastChanged.getTime() < new Date().getTime() /*- 1000 * 60 * 60 * this.hoursUntilNextImage*/) {
                this.loadImage();
            }
        }
    },
    getters: {
        getThumbnailUrl(): string | undefined {
            return this.imageData.files[2]?.url;
        }
    }
});