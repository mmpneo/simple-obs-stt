import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {SpeechQuery}                                                   from "@store/speech/speech.query";
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
    private activatedRoute: ActivatedRoute,
    private detector: ChangeDetectorRef) { }


  textValue = "";

  ngOnInit(): void {
    this.speechQuery.value$.subscribe(value => {
      this.textValue = value;
      this.detector.detectChanges();
    })
    this.networkService.InitClient(this.activatedRoute.snapshot.params.id)
  }

}
