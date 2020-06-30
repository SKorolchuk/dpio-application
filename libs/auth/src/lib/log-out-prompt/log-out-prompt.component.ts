import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "dpio-application-log-out-prompt",
    templateUrl: "./log-out-prompt.component.html",
    styleUrls: ["./log-out-prompt.component.scss"],
})
export class LogOutPromptComponent implements OnInit {
    constructor(private ref: MatDialogRef<LogOutPromptComponent>) {}

    ngOnInit(): void {}

    cancel() {
        this.ref.close(false);
    }

    confirm() {
        this.ref.close(true);
    }
}
