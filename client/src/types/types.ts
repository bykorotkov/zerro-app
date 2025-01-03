export interface IChar {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    image: string
    url: string
    created: string
}

export interface CharactersData {
    info: InfoCharactersData
    results: IChar[]
}

interface InfoCharactersData {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}