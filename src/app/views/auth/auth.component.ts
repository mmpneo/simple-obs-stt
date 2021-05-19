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

  ngOnInit(): void {}
}
