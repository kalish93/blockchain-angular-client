export class CreateElection {
  static readonly type = `[ProgressStatus] ${CreateElection.name}`;
  constructor(public election: any){}
}
