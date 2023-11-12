interface ImageFit {
    id: string;
    icon: Icon;
}

export interface ImageFitObject {
    [key: string]: ImageFit;
}

export interface WikipediaData {
    label?: Label;
    wikipedia?: Wikipedia;
}

export interface ImageData {
    image: string;
    files: File[];
    metadata: Metadata;
}

export interface File {
    name: string;
    width: number;
    height: number;
    url?: string;
}

export interface Metadata {
    title: Label[];
    artist?: Artist;
    date?: string;
    wikipedia: Wikipedia[];
    museum?: Museum;
}

export interface Label {
    lang: string;
    value: string;
}

export interface Museum {
    names: Label[];
    wikipedia: Wikipedia[];
}

export interface Artist {
    names: Label[];
    wikipedia: Wikipedia[];
}

export interface Wikipedia {
    lang: string;
    title: string;
    url: string;
}

interface WikimediaFileDataResponse {
    continue: {
        iistart: string;
        continue: string;
    };
    query: {
        pages: {
            [key: string]: {
                pageid: number;
                ns: number;
                title: string;
                imagerepository: string;
                imageinfo: {
                    timestamp: string;
                    user: string;
                }[];
            };
        };
    };
}