import {Directive, ElementRef, Renderer2, Input, OnInit, AfterViewInit,OnDestroy,} from '@angular/core';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Directive({
    selector: '[appHideElement]',
})
export class HideElementDirective implements OnInit, AfterViewInit, OnDestroy {
    windowSize: any;
    scrollWidth: any;
    @Input() appHideElement: any;
    resizeObservable$: Observable<Event> | undefined;
    resizeSubscription$!: Subscription;

    ngAfterViewInit() {
        this.resizeSubscription$ = fromEvent(window, 'resize')
            .pipe(
                tap((evt) => {
                    this.windowSize = window.innerWidth;
                    this.scrollWidth =
                        this.elem.nativeElement.innerWidth <
                        this.elem.nativeElement.scrollWidth;
                    this.checkSize();
                })
            )
            .subscribe();
    }

    constructor(private elem: ElementRef, public renderer: Renderer2) {
        this.windowSize = window.innerWidth;
        this.checkSize();
    }

    ngOnInit() {
        this.windowSize = window.innerWidth;
        this.checkSize();
    }

    checkSize() {
        if (this.windowSize <= 767) {
            if (this.appHideElement) {
                this.showElement();
            } else {
                this.hideElement();
            }
        } else {
            if (!this.appHideElement) {
                this.showElement();
            } else {
                this.hideElement();
            }
        }
    }

    hideElement() {
        this.renderer.setStyle(this.elem.nativeElement, 'display', 'none');
    }

    showElement() {
        this.renderer.removeStyle(this.elem.nativeElement, 'display');
    }
    ngOnDestroy() {
        this.resizeSubscription$.unsubscribe();
    }
}
