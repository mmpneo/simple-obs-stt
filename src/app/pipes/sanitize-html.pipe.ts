import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CommonModule}                  from "@angular/common";
import {DomSanitizer}                  from "@angular/platform-browser";

@Pipe({name: 'sanitizeHtml'})
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    return value ? this.sanitized.bypassSecurityTrustHtml(value) : '';
  }

}
@NgModule({
  declarations: [SanitizeHtmlPipe],
  exports: [SanitizeHtmlPipe],
  imports: [CommonModule]
})
export class SanitizeHtmlPipeModule {}
