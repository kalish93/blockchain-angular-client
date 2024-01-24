import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-election-home',
  templateUrl: './election-home.component.html',
  styleUrl: './election-home.component.scss'
})
export class ElectionHomeComponent {
  constructor(private blockService: BlockchainService) {}

}
