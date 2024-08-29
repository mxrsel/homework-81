export interface Link {
    id: string;
    originalUrl: string;
    shortenUrl: string
}

export type LinkMutation = {
    originalUrl: string,
    shortenUrl: string,
}