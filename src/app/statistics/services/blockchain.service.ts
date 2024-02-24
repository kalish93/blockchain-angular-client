import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { GANACHE_URL } from '../../core/constants/api-endpoints';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({ providedIn: 'root' })
export class BlockchainService {
  private web3: any;
  private contractAddress: any = environment.contractAddress;
  private abi: any = environment.contractAbi;
  private contract: any;
  private accounts: string[] = [];

  constructor() {
    this.web3 = new Web3(GANACHE_URL);
    this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress);
  }

  async getAccounts() {
    this.accounts = await this.web3.eth.getAccounts();
  }

  async getGeneralStatistics() {
    await this.getAccounts();
    const generalStatistics = await this.contract.methods
      .generateGeneralStatistics()
      .call();
    return generalStatistics;
  }
}
