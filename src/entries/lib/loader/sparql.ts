import { ImageLoader } from "../imageLoader";

export default class SPARQLImageLoader extends ImageLoader {
    constructor(languageCode: string) {
        super("sparql", languageCode);
    }

    async loadImage(random: boolean): Promise<ImageData | undefined> {
        if (this.imageList.length === 0) {
            await this.loadList();
        }

        const imageName = this.selectImage(random);

        if (imageName && imageName.startsWith("File:")) {
            const imageData = await loadImageData(imageName)
            if (imageData) {
                return imageData;
            } else {
                return this.loadImage(random);
            }
        }
    }

    selectImage(random: boolean): string {
        let imageName = "";

        if (random) {
            imageName = this.imageList[Math.floor(Math.random() * this.imageList.length)];
        } else {
            imageName = this.imageList[this.index];
            this.incrementIndex();
        }

        return imageName;
    }

    async loadList() {
        const data = await fetch("/images.json").then((response) => response.json());
        this.imageList = data;
        this.saveList();
        return this.imageList;
    }
}