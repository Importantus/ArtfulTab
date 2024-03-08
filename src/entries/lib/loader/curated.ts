import { ImageLoader } from "../imageLoader";
import { Artist, Museum, WikimediaFileDataResponse, ImageData, Wikipedia, Label, File } from "~/types";

const CORSPROXY = "https://corsproxy.io/?";

export default class CuratedImageLoader extends ImageLoader {
    constructor(languageCode: string) {
        super("curated", languageCode);
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

async function loadImageData(imageName: string): Promise<ImageData | null> {
    try {
        console.log("\n\n\nLoading image data for " + imageName);

        const imageData = await makeRequest<WikimediaFileDataResponse>(`https://commons.wikimedia.org/w/api.php?action=query&titles=${imageName}&prop=imageinfo&format=json`, true);
        const fileData: any = await makeRequest("https://api.wikimedia.org/core/v1/commons/file/" + imageName);
        const wikimediaPageId = Object.keys(imageData.query.pages)[0];

        if (!wikimediaPageId || wikimediaPageId.length < 2) {
            return null;
        }

        const wikimediaPage: any = await makeRequest(`https://commons.m.wikimedia.org/wiki/Special:EntityData/M${wikimediaPageId}.json`)

        // Return null if no wikidata page exists
        if (!wikimediaPage.entities["M" + wikimediaPageId].statements.P6243) {
            return null
        }

        const wikidataId = wikimediaPage.entities["M" + wikimediaPageId].statements.P6243[0].mainsnak.datavalue.value.id;
        const wikidata: any = await fetchWikidata(wikidataId);



        // Get date
        let date: string | undefined;
        if (wikidata.claims.P571[0] && wikidata.claims.P571[0].mainsnak.datavalue) {
            date =
                wikidata.claims.P571[0].mainsnak.datavalue
                    .value.time.replace("+", "").replace("T00:00:00Z", "").replace("-00-00", "");
        }

        // Get files
        const files: File[] = [];
        const keys = Object.keys(fileData!).filter((key) => key !== "title" && key !== "file_description_url" && key !== "latest");
        for (const key of keys) {
            const file = fileData![key];
            files.push({
                name: key,
                width: file.width,
                height: file.height,
                url: file.url
            });
        }

        // Get Museum
        let museum: Museum | undefined;
        if (wikidata.claims.P195 && wikidata.claims.P195[0].mainsnak.datavalue) {
            const museumData = await fetchWikidata(wikidata.claims.P195[0].mainsnak.datavalue.value.id);
            museum = {
                names: getLabels(museumData),
                wikipedia: getWikipedia(museumData)
            };
        }

        // Get artist
        let artist: Artist | undefined;
        if (wikidata.claims.P170 && wikidata.claims.P170[0].mainsnak.datavalue) {
            const artistData = await fetchWikidata(wikidata.claims.P170[0].mainsnak.datavalue.value.id);
            artist = {
                names: getLabels(artistData),
                wikipedia: getWikipedia(artistData)
            };
        }

        return {
            image: imageName,
            files,
            metadata: {
                title: getLabels(wikidata),
                artist,
                date: new Date(date!).getFullYear().toString(),
                wikipedia: getWikipedia(wikidata),
                museum
            }
        };
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function fetchWikidata(wikidataId: string) {
    const wikidataResponse: any = await makeRequest(`https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`);
    return wikidataResponse.entities[wikidataId];
}

function getLabels(wikidata: any): Label[] {
    // Save title in multiple languages
    const labels: Label[] = [];
    for (const lang of Object.keys(wikidata.labels)) {
        labels.push({
            lang,
            value: wikidata.labels[lang].value
        });
    }

    return labels;
}

function getWikipedia(wikidata: any): Wikipedia[] {
    // Get sitelinks 
    const wikipedia: Wikipedia[] = [];
    for (const lang of Object.keys(wikidata.sitelinks)) {
        if (/\b[^\s]+wiki\b/gm.test(lang)) {
            wikipedia.push({
                lang: lang.replace("wiki", ""),
                title: wikidata.sitelinks[lang].title,
                url: wikidata.sitelinks[lang].url
            });
        }
    }

    return wikipedia;
}


let retries = 0;
/**
 * Attempts to make a request to the given url. If it fails, it will retry up to 3 times.
 * @param url The url to make a request to
 * @param corsproxy Whether or not to use a cors proxy
 * @returns The data from the request
 */
async function makeRequest<T>(url: string, corsproxy: boolean = false): Promise<T> {
    // Repeat request until it succeeds
    console.log("Fetching " + url);

    try {
        const response = await fetch(corsproxy ? CORSPROXY + url : url);
        const data = await response.json() as T;
        retries = 0;
        return data;
    } catch (e) {
        console.log(e);
        console.log("Retrying...");
        retries++;
        console.log("Retry " + retries);
        if (retries > 4) {
            throw new Error("Failed to fetch data from " + url);
        } else {
            return await makeRequest(url);
        }
    }
}
