import { Election } from "../models/election.model";

export class CreateElection {
  static readonly type = `[Election] ${CreateElection.name}`;
  constructor(public election: any){}
}

export class GetAllElections{
  static readonly type = `[Election] ${GetAllElections.name}`;
  constructor(){}
}

export class VoteForCandidate{
  static readonly type = `[Election] ${VoteForCandidate.name}`;
  constructor( public votorId: string, public electionId: string, public candidateId: string){}
}

export class GetElectionDetial{
  static readonly type = `[Election] ${GetElectionDetial.name}`;
  constructor(public electionId: string){}
}
