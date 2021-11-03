import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit() {
    this.dataStorageService.fetchBills().subscribe();
    this.dataStorageService.fetchIncomes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}


