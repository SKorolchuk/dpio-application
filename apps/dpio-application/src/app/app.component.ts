import { Component, OnInit, inject } from "@angular/core";
import { Logger, ShellComponent } from "@lib/core";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [ShellComponent],
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    private readonly log = inject(Logger).forContext("AppComponent");

    ngOnInit(): void {
        this.log.debug("Root application view layout initialized successfully.");
    }
}
