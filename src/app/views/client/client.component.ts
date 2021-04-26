import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {SpeechQuery}                                  from "@store/speech/speech.query";
import {ActivatedRoute}                               from "@angular/router";
import {NetworkService}                               from "@store/network/network.service";
import {NetworkQuery}                                 from "@store/network/network.query";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent implements OnInit {
  constructor(
    private networkService: NetworkService,
    public networkQuery: NetworkQuery,
    public speechQuery: SpeechQuery,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.id);
    this.networkService.InitClient(this.activatedRoute.snapshot.params.id)
  }

}
