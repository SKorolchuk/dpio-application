import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";

import { LogOutPromptComponent } from "./log-out-prompt.component";

describe("LogOutPromptComponent", () => {
    let component: LogOutPromptComponent;
    let fixture: ComponentFixture<LogOutPromptComponent>;
    let mockDialogRef: jest.Mocked<Partial<MatDialogRef<LogOutPromptComponent>>>;

    beforeEach(async () => {
        mockDialogRef = {
            close: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [LogOutPromptComponent],
            providers: [{ provide: MatDialogRef, useValue: mockDialogRef }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LogOutPromptComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the log out prompt component instance successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should successfully invoke dialog closure returning false when cancel button is clicked", () => {
        const cancelButton = fixture.debugElement.queryAll(By.css("button"))[0].nativeElement;

        cancelButton.click();
        fixture.detectChanges();

        expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    });

    it("should successfully invoke dialog closure returning true when confirm button is clicked", () => {
        const confirmButton = fixture.debugElement.queryAll(By.css("button"))[1].nativeElement;

        confirmButton.click();
        fixture.detectChanges();

        expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });
});
