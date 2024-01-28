import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elections-list',
  templateUrl: './elections-list.component.html',
  styleUrl: './elections-list.component.scss'
})
export class ElectionsListComponent {
  public elections: any[] = [];

  constructor(private blockchainService: BlockchainService, private router: Router) {}

  ngOnInit(): void {
    this.loadElections();
  }

  async loadElections(): Promise<void> {
    try {
      this.elections = await this.blockchainService.getAllElections();
    } catch (error) {
      console.error('Error fetching elections:', error);
    }
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/election-list', id]);
  }
}
