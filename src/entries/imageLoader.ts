import { WikimediaFileDataResponse, ImageData, Wikipedia, Label, File, Property, Image } from "~/types";

const CORSPROXY = "https://corsproxy.io/?url=";



export default async function loadImageData(image: Image): Promise<ImageData | null> {
    try {
        console.log("\n\n\nLoading image data for " + image.name);

        const fileData: any = await makeRequest("https://api.wikimedia.org/core/v1/commons/file/" + encodeURIComponent(image.name));
        const wikimediaPageId = image.wikidata

        if (!wikimediaPageId || wikimediaPageId.length < 2) {
            return null;
        }

        const wikimediaPage: any = await makeRequest(`https://commons.m.wikimedia.org/wiki/Special:EntityData/M${wikimediaPageId}.json`)

        // Return null if no wikidata page exists
        if (!wikimediaPage.entities["M" + wikimediaPageId].statements.P6243) {
            console.log("No wikidata page found for " + image.name);
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
        let museum: Property | undefined;
        if (wikidata.claims.P195 && wikidata.claims.P195[0].mainsnak.datavalue) {
            const museumData = await fetchWikidata(wikidata.claims.P195[0].mainsnak.datavalue.value.id);
            museum = {
                names: getLabels(museumData),
                wikipedia: getWikipedia(museumData)
            };
        }

        // Get artist
        let artist: Property | undefined;
        if (wikidata.claims.P170 && wikidata.claims.P170[0].mainsnak.datavalue) {
            const artistData = await fetchWikidata(wikidata.claims.P170[0].mainsnak.datavalue.value.id);
            artist = {
                names: getLabels(artistData),
                wikipedia: getWikipedia(artistData)
            };
        }

        // Get movement
        let movement: Property | undefined;
        if (wikidata.claims.P135 && wikidata.claims.P135[0].mainsnak.datavalue) {
            const movementData = await fetchWikidata(wikidata.claims.P135[0].mainsnak.datavalue.value.id);
            movement = {
                names: getLabels(movementData),
                wikipedia: getWikipedia(movementData)
            };
        }

        return {
            image: image,
            files,
            metadata: {
                title: getLabels(wikidata),
                artist,
                date: new Date(date!).getFullYear().toString(),
                wikipedia: getWikipedia(wikidata),
                museum,
                movement
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

    const response = await fetch(corsproxy ? CORSPROXY + encodeURIComponent(url) : url);
    const data = await response.json() as T;
    retries = 0;
    return data;
}
