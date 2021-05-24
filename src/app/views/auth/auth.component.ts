import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {EmotesService}                                from "@store/emotes/emotes.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  constructor(private emotesService: EmotesService) { }

  ngOnInit(): void {
    if (document.location.hash && document.location.hash != '') {
      var parsedHash = new URLSearchParams(window.location.hash.substr(1));
      const access_token = parsedHash.get('access_token');
      if (access_token) this.emotesService.SetupTwitchAuth(access_token);
    }
  }
}
