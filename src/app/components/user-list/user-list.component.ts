import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as Toastify from 'toastify-js';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  total: number = 0;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadDataIntoTable();
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(response => {
      this.showSuccessToast('Usuario eliminado');
      this.users = this.users.filter(user => user.id != id);
    });
  }

  private loadDataIntoTable(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  private showSuccessToast(message: string): void {
    Toastify({
      text: message,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#189586",
      }
    }).showToast();
  }
}
