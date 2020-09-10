import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appFocusInvalidInput]'
})
export class FormDirective {

  constructor(private el: ElementRef) { }

  @HostListener('submit')
  onForSubmit() {
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');
    if (invalidControl) {
      invalidControl.focus();
    }
  }
}
