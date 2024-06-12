import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { User } from 'app/types/user';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoadingSpinnerComponent, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  userProfile: User | null;
  loading: boolean = true;

  constructor(private authService: AuthService) {
    this.userProfile = null;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.userProfile = JSON.parse(
        localStorage.getItem('user_profile') as string
      );
      this.loading = false;
    }, 1000);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
  }
}
