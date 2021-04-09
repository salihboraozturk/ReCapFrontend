import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage/localstorage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  currentUserId: number;
  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.getUserDetail();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUserDetail() {
    if (this.localStorageService.get('token')) {
      this.userService.getUserById(this.currentUserId).subscribe((response) => {
        this.user = response.data;
      });
    }
  }

  logOut() {
    this.user.firstName=" ";
    this.user.lastName=" ";
    this.localStorageService.clear();
    this.router.navigate(['/cars']);
  }
}
