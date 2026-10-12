import { Component, input, computed } from "@angular/core";
import { MatProgressSpinnerModule, ProgressSpinnerMode } from "@angular/material/progress-spinner";

@Component({
    selector: "app-loader",
    standalone: true,
    imports: [MatProgressSpinnerModule],
    templateUrl: "./loader.component.html",
    styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent {
    readonly isLoading = input<boolean>(false);
    readonly isDeterminate = input<boolean>(false);
    readonly size = input<number>(1);
    readonly message = input<string | null>(null);

    readonly spinnerMode = computed<ProgressSpinnerMode>(() =>
        this.isDeterminate() ? "determinate" : "indeterminate",
    );

    readonly diameter = computed<number>(() => 32 * this.size());
}
