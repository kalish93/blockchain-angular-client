export interface Election{
    electionId?: string;
    electionName: string;
    description: string;
    candidates: Candidate[];
}

export interface Candidate{
    name: string;
    imgUrl: string;
    description: string;
}