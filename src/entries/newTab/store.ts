import { defineStore } from "pinia";
import loadImageData, { Label, Wikipedia } from "./imageLoader";
import { ImageData } from "./imageLoader";
import { Scaling, Fullscreen } from "lucide-vue-next";
import { Icon } from "lucide-vue-next";

type imageList = string[]

export interface ImageFit {
    id: string;
    icon: Icon;
}

export interface ImageFitObject {
    [key: string]: ImageFit;
}

export const imageFit: ImageFitObject = {
    fill: {
        id: "fill",
        icon: Scaling
    },
    fit: {
        id: "fit",
        icon: Fullscreen
    },
}
interface Settings {
    hoursUntilNextImage: number;
    imageFit: ImageFit;
    language: string
}

export interface WikipediaData {
    label?: Label;
    wikipedia?: Wikipedia;
}

export const useDataStore = defineStore("dataStore", {
    state: () => {
        return {
            imageData: JSON.parse(localStorage.getItem("imageData") || '"{}"') as ImageData,
            lastChanged: new Date(JSON.parse(localStorage.getItem("lastChanged") || '"1980-01-01"')) as Date,
            loading: false,
            settings: JSON.parse(localStorage.getItem("settings") || JSON.stringify({
                hoursUntilNextImage: 24,
                imageFit: imageFit.fit,
                language: navigator.language.split("-")[0],
            })) as Settings,
        }
    },
    actions: {
        setImageFit(imageFit: ImageFit) {
            this.settings.imageFit = imageFit;
            localStorage.setItem("settings", JSON.stringify(this.settings));
        },
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
            if (this.lastChanged.getTime() < new Date().getTime() - 1000 * 60 * 60 * this.settings.hoursUntilNextImage) {
                this.loadImage();
            }
        }
    },
    getters: {
        thumbnailUrl(): string | undefined {
            return this.imageData.files[2]?.url;
        },
        imageTitle(): WikipediaData {
            const userLang = this.settings.language;
            const fallbackLang = "en";

            const data = this.imageData.metadata

            const label = data.title.find((label) => label.lang === userLang) || data.title.find((label) => label.lang === fallbackLang) || data.title[0];
            const wikipedia = data.wikipedia.find((wikipedia) => wikipedia.lang === userLang) || data.wikipedia.find((wikipedia) => wikipedia.lang === fallbackLang) || data.wikipedia[0];

            return {
                label: label,
                wikipedia: wikipedia,
            };
        },
        artist(): WikipediaData {
            const userLang = this.settings.language;
            const fallbackLang = "en";

            const artistData = this.imageData.metadata.artist

            const label = artistData?.names.find((label) => label.lang === userLang) || artistData?.names.find((label) => label.lang === fallbackLang) || artistData?.names[0];
            const wikipedia = artistData?.wikipedia.find((wikipedia) => wikipedia.lang === userLang) || artistData?.wikipedia.find((wikipedia) => wikipedia.lang === fallbackLang) || artistData?.wikipedia[0];

            return {
                label: label,
                wikipedia: wikipedia,
            };
        },
        museum(): WikipediaData {
            const userLang = this.settings.language;
            const fallbackLang = "en";

            const museumData = this.imageData.metadata.museum

            const label = museumData?.names.find((label) => label.lang === userLang) || museumData?.names.find((label) => label.lang === fallbackLang) || museumData?.names[0];
            const wikipedia = museumData?.wikipedia.find((wikipedia) => wikipedia.lang === userLang) || museumData?.wikipedia.find((wikipedia) => wikipedia.lang === fallbackLang) || museumData?.wikipedia[0];

            return {
                label: label,
                wikipedia: wikipedia,
            };
        }
    }
});