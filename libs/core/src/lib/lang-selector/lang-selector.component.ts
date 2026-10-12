import { Component, input, output } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-lang-selector",
    standalone: true,
    imports: [MatMenuModule, MatButtonModule, MatIconModule],
    templateUrl: "./lang-selector.component.html",
    styleUrls: ["./lang-selector.component.scss"],
})
export class LangSelectorComponent {
    readonly languages = input<readonly string[]>([]);
    readonly current = input<string | null>(null);
    readonly selected = output<string>();

    onLanguageSelected(language: string): void {
        this.selected.emit(language);
    }
}
