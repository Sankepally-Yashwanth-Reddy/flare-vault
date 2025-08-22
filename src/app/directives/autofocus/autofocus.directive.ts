import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {
  private element: HTMLElement;
  private isFocused: boolean = false;

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    this.element = this.el.nativeElement;
    this.setFocus();
  }
  
  private setFocus(): void {
    if (!this.isFocused) {
      this.element.focus();
      this.isFocused = true;
    }
  }

  ngAfterViewInit(): void {
    // Delay focus to ensure the element is fully rendered and visible
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 0);
  }

}
