import { defineStore } from "pinia";
import loadImageData from "./imageLoader";
import { Scaling, Fullscreen, Shuffle, ListChecks } from "lucide-vue-next";
import { ImageFit, ImageFitObject, WikipediaData, ImageData, ImageSelectionModeObject, ImageSelectionMode } from "~/types";

type imageList = string[]

export const imageFit: ImageFitObject = {
    fill: {
        id: "fill",
        name: "Fill",
        icon: Scaling
    },
    fit: {
        id: "fit",
        name: "Fit",
        icon: Fullscreen
    },
}

export const imageSelectionMode: ImageSelectionModeObject = {
    random: {
        id: "random",
        name: "Random",
        icon: Shuffle
    },
    sequential: {
        id: "sequential",
        name: "Sequential",
        icon: ListChecks
    },
}

interface Settings {
    hoursUntilNextImage: number;
    imageFit: ImageFit;
    language: string,
    animation: boolean;
    brightness: number;
    imageSelection: string;
}

const defaultSettings: Settings = {
    hoursUntilNextImage: 24,
    imageFit: imageFit.fit,
    language: navigator.language.split("-")[0],
    animation: true,
    brightness: 100,
    imageSelection: imageSelectionMode.random.id
}

function loadSettings() {
    const savedSettings = JSON.parse(localStorage.getItem("settings") || JSON.stringify(defaultSettings)) as Settings;

    const loadedSettings: Settings = {
        ...defaultSettings,
        ...savedSettings
    }

    return loadedSettings;
}

export const useDataStore = defineStore("dataStore", {
    state: () => {
        return {
            imageData: JSON.parse(localStorage.getItem("imageData") || '"{}"') as ImageData,
            lastChanged: new Date(JSON.parse(localStorage.getItem("lastChanged") || '"1980-01-01"')) as Date,
            loading: false,
            settings: loadSettings(),
            index: JSON.parse(localStorage.getItem("index") || "0") as number
        }
    },
    actions: {
        setAnimation(animation: boolean) {
            this.settings.animation = animation;
            localStorage.setItem("settings", JSON.stringify(this.settings));
        },
        setLanguage(language: string) {
            this.settings.language = language.toLowerCase();
            localStorage.setItem("settings", JSON.stringify(this.settings));
        },
        setImageFit(imageFit: ImageFit) {
            this.settings.imageFit = imageFit;
            localStorage.setItem("settings", JSON.stringify(this.settings));
        },
        setBrightness(brightness: number) {
            this.settings.brightness = brightness;
            localStorage.setItem("settings", JSON.stringify(this.settings));
        },
        setImageSelection(imageSelection: ImageSelectionMode) {
            this.settings.imageSelection = imageSelection.id;
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
            const imageName = await this.selectImage();

            if (imageName && imageName.startsWith("File:")) {
                this.loading = true;
                loadImageData(imageName).then((imageData) => {
                    if (imageData) {
                        this.setImageData(imageData);
                        this.loading = false;
                    } else {
                        this.loadImage();
                    }
                });
            }
        },
        async selectImage(): Promise<string> {
            const imageList = await fetch("/images.json").then((response) => response.json()) as imageList;
            let imageName = "";

            if (this.settings.imageSelection === "random") {
                imageName = imageList[Math.floor(Math.random() * imageList.length)];
            } else {
                const index = this.index;
                this.index = (index + 1) % imageList.length;
                console.log("Index: " + index);
                localStorage.setItem("index", JSON.stringify(this.index));
                imageName = imageList[index];
            }

            if (imageName === this.imageData.image && imageList.length > 1) {
                return await this.selectImage();
            } else {
                return imageName;
            }
        },
        init() {
            if (this.lastChanged.getTime() < new Date().getTime() - 1000 * 60 * 60 * this.settings.hoursUntilNextImage) {
                this.loadImage();
            }
        },
        saveSettings() {
            if (this.settings.hoursUntilNextImage.toString() !== "" && this.settings.hoursUntilNextImage < 1) this.settings.hoursUntilNextImage = 1;
            localStorage.setItem("settings", JSON.stringify(this.settings));
        }
    },
    getters: {
        thumbnailUrl(): string | undefined {
            return this.imageData.files[2]?.url;
        },
        imageTitle(): WikipediaData {
            const userLang = this.settings.language.toLowerCase();
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
            const userLang = this.settings.language.toLowerCase();
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
            const userLang = this.settings.language.toLowerCase();
            const fallbackLang = "en";

            const museumData = this.imageData.metadata.museum

            const label = museumData?.names.find((label) => label.lang === userLang) || museumData?.names.find((label) => label.lang === fallbackLang) || museumData?.names[0];
            const wikipedia = museumData?.wikipedia.find((wikipedia) => wikipedia.lang === userLang) || museumData?.wikipedia.find((wikipedia) => wikipedia.lang === fallbackLang) || museumData?.wikipedia[0];

            return {
                label: label,
                wikipedia: wikipedia,
            };
        },
        movement(): WikipediaData {
            const userLang = this.settings.language.toLowerCase();
            const fallbackLang = "en";

            const movementData = this.imageData.metadata.movement

            const label = movementData?.names.find((label) => label.lang === userLang) || movementData?.names.find((label) => label.lang === fallbackLang) || movementData?.names[0];
            const wikipedia = movementData?.wikipedia.find((wikipedia) => wikipedia.lang === userLang) || movementData?.wikipedia.find((wikipedia) => wikipedia.lang === fallbackLang) || movementData?.wikipedia[0];

            return {
                label: label,
                wikipedia: wikipedia,
            };
        }
    }
});