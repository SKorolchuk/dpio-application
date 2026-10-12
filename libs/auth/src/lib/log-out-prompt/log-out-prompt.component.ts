import { Component, inject } from "@angular/core";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-log-out-prompt",
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: "./log-out-prompt.component.html",
    styleUrls: ["./log-out-prompt.component.scss"],
})
export class LogOutPromptComponent {
    private readonly dialogRef = inject(MatDialogRef<LogOutPromptComponent>);

    /**
     * Closes the interactive dialog modal returning a negative user confirmation result.
     */
    cancel(): void {
        this.dialogRef.close(false);
    }

    /**
     * Closes the interactive dialog modal returning a positive user confirmation result.
     */
    confirm(): void {
        this.dialogRef.close(true);
    }
}
