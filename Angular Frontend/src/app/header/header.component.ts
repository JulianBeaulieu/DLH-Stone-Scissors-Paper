import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string;

  constructor(
    private activatedRoute:ActivatedRoute,
    public loginService:AuthenticationService
    ){ }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  ngOnChanges() {
    this.username = sessionStorage.getItem('username');
  }
}
