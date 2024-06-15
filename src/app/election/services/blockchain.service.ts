import { Injectable } from '@angular/core';
import  Web3 from 'web3';
import { environment } from '../../../environment';
import { GANACHE_URL } from '../../core/constants/api-endpoints';
declare global {
  interface Window {
      ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private web3: Web3;
  private contractAddress: any = environment.contractAddress;
  private abi: any = environment.contractAbi;
  private contract: any;
  private accounts : string[] = [];



  constructor() {
    this.web3 = new Web3(GANACHE_URL);
    this.contract =  new this.web3.eth.Contract(this.abi,this.contractAddress);

  }
    async getAccounts() {
    this.accounts = await this.web3.eth.getAccounts();
  }
  public checkWalletConnection(){
      return  Boolean(window?.ethereum && this.accounts.length > 0);
  }
  public async createElection (electionName: string, organizationId: string, description:string, candidates: any[], endTime: any, category: any){
    await this.getAccounts();
    try{
      //if(this.checkWalletConnection()){

        const gasEstimate = await this.contract.methods.createElection(electionName,organizationId,description, candidates, endTime, category)
                                                      .estimateGas({ from: this.accounts[0]})
      let transaction = await this.contract.methods.createElection(electionName,organizationId,description, candidates,endTime, category).send({
        from: this.accounts[0],
        gas: gasEstimate
      });

      transaction = await this.contract.methods.createElection(electionName,organizationId,description, candidates,endTime, category).call({
        from: this.accounts[0],
        gas: gasEstimate
      });
      return transaction;
    // }else{
    //   throw "Please connect your wallet";
    // }
    } catch (e){
    }
  }

  public async voteForCandidate(votorId: string, electionId: string, candidateId: string): Promise<boolean> {
    await this.getAccounts();

    try {
      // if (this.checkWalletConnection()) {
        const gasEstimate = await this.contract.methods.voteForACandidate(votorId, electionId, candidateId)
          .estimateGas({ from: this.accounts[0] });
        const transaction = await this.contract.methods.voteForACandidate(votorId, electionId, candidateId)
          .send({
            from: this.accounts[0],
            gas: gasEstimate
          });


        return true;
      // } else {
      //   throw 'Please connect your wallet';
      // }
    } catch (error) {
      return false;
    }
  }


  public async getAllElections(){
    const account = this.accounts[0];
    let elections =  await this.contract.methods.showExistingElections().call();
    return elections;

  }

  public async getPersonalizedElections(organizationIds: string[]){
    const account = this.accounts[0];
    let elections =  await this.contract.methods.personalizeElections(organizationIds).call();
    return elections;

  }

  public async getSingleElection(electionId: string, userId: string) {
        let election = await this.contract.methods.showSingleElection(userId, electionId).call();
        return election;
  }

  public async getOrganizationElections(organizationId: string) {
    let elections = await this.contract.methods.fetchByOrganizationId(organizationId).call();
    return elections;
  }
}
