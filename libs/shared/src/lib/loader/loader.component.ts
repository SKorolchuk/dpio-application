import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "dpio-application-loader",
    templateUrl: "./loader.component.html",
    styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
    @Input() isLoading = false;
    @Input() isDeterminate = false;
    @Input() size = 1;
    @Input() message: string = null;

    constructor() {}

    ngOnInit() {}
}
