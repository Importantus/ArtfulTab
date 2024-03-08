import { ImageData, ImageSource } from "~/types";
import { imageSource } from "../store";
import CuratedImageLoader from "./loader/curated";

export abstract class ImageLoader {
    protected id: string;
    protected index: number;
    protected imageList: [];
    protected languageCode: string;

    constructor(id: string, languageCode: string) {
        this.id = id;
        this.index = JSON.parse(localStorage.getItem(id + "Index") || "0");
        this.imageList = JSON.parse(localStorage.getItem(id + "List") || "[]");
        this.languageCode = languageCode;
    }

    incrementIndex() {
        this.index = (this.index + 1) % this.imageList.length;
        localStorage.setItem(this.id + "Index", JSON.stringify(this.index));
    }

    saveList() {
        localStorage.setItem(this.id + "List", JSON.stringify(this.imageList));
    }

    abstract loadImage(random: boolean): Promise<ImageData | undefined>;

    abstract loadList(): Promise<[]>;
}

export async function loadImage(source: ImageSource, random: boolean, languageCode: string): Promise<ImageData | undefined> {
    let loader: ImageLoader;
    switch (source.id) {
        case imageSource.curated.id:
            loader = new CuratedImageLoader(languageCode);
            break;
        case imageSource.sparql.id:
            loader = new SPARQLImageLoader();
            break;
        default:
            loader = new CuratedImageLoader();
    }
    return loader.loadImage(random);
}