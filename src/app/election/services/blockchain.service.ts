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
      return  Boolean(window?.ethereum);
  }
  public async createElection (electionName: string, candidates: any[]){
    await this.getAccounts();
    try{
      if(this.checkWalletConnection()){

      
      let transaction = this.contract.methods.createElection(electionName, candidates).send({
        from: this.accounts[0],
        gas: 15000
      }
      
      );
      return transaction;
    }else{
      throw "Please connect your wallet";
    }
    } catch (e){
      console.log('Error in creating election', e)
    }
  }
  public async voteForCandidate(electionId:string, candidateId:string){
      const account = this.accounts[0];
      try{
        let transaction = this.contract.methods.voteForACandidate(electionId,candidateId).send({
          from : account,
          gas: 20000
        })
        return transaction;
    } catch (e){
      console.log("Error in voting for candidate",e);
    }
  }
  public async getAllElections(){
    const account = this.accounts[0];
    
    try{
      if(this.checkWalletConnection()){
      let elections = this.contract.method.showExistingElections().call();
      return elections;
      }else{
        throw 'Connect to metamask';
      }
    } catch(e){
      console.log("Error in fetching Existing Elections", e);
    }
  }

}
