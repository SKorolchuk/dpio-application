import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "dpio-application-lang-selector",
    templateUrl: "./lang-selector.component.html",
    styleUrls: ["./lang-selector.component.scss"],
})
export class LangSelectorComponent implements OnInit {
    @Input() public languages: string[] = null;

    @Input() public current: string = null;

    @Output() public selected: EventEmitter<string> = new EventEmitter<
        string
    >();

    ngOnInit(): void {}

    onLanguageSelected($event: string): void {
        this.selected.emit($event);
    }

    isSelected(language: string): boolean {
        return this.current === language;
    }
}
