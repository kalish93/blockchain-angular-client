export interface Election {
  electionId?: string;
  electionName: string;
  description: string;
  hasVoted: boolean;
  candidates: Candidate[];
  endTime?: any;
  timeCreated?: any;
}

export interface Candidate{
    name: string;
    imgUrl: string;
    description: string;
}

export enum ElectionCategory{
  GOVERNMENT_ELECTION = 'GOVERNMENT_ELECTION',
  ENTERTAINMENT_AWARD = 'ENTERTAINMENT_AWARD',
  SPORT_AWARD = 'SPORT_AWARD',
  OTHERS = 'OTHERS'
}
