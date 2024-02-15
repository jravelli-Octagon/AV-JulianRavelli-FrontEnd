import { Component, OnInit, HostListener } from '@angular/core';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;

    @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
		// Do more processing...
		event.returnValue = false;
	}

    constructor() {}

    ngOnInit() {
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }

    ngAfterViewInit() {
        this.runOnRouteChange();
    }

    runOnRouteChange(): void {
        
      }
}
