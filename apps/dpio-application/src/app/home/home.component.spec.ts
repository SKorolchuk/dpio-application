import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of, throwError } from "rxjs";

import { HomeComponent } from "./home.component";
import { QuoteService } from "./quote.service";

describe("HomeComponent", () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let mockGetRandomQuoteSpy: jest.MockedFunction<QuoteService["getRandomQuote"]>;

    beforeEach(async () => {
        mockGetRandomQuoteSpy = jest.fn().mockReturnValue(of("Developer life is a constant refactoring loop."));

        await TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [
                {
                    provide: QuoteService,
                    useValue: { getRandomQuote: mockGetRandomQuoteSpy } as unknown as QuoteService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should create the standalone home page component instance successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should automatically invoke QuoteService endpoint parameter and set reactive signal value", () => {
        expect(mockGetRandomQuoteSpy).toHaveBeenCalledWith({ category: "dev" });
        expect(component.quote()).toBe("Developer life is a constant refactoring loop.");
        expect(component.isLoading()).toBe(false);
    });

    it("should accurately render the fetched joke string inside a clean native HTML 'q' container tag", () => {
        const quoteElement = fixture.debugElement.query(By.css("q"));
        expect(quoteElement.nativeElement.textContent).toContain("Developer life is a constant refactoring loop.");
    });

    it("should securely bypass template text rendering and toggle visibility variables off if HTTP fails", () => {
        mockGetRandomQuoteSpy.mockReturnValue(throwError(() => new Error("Network Timeout Connection Failure")));

        const errorFixture = TestBed.createComponent(HomeComponent);
        errorFixture.detectChanges();

        expect(errorFixture.componentInstance.isLoading()).toBe(false);
        const missedQuoteElement = errorFixture.debugElement.query(By.css("q"));
        expect(missedQuoteElement).toBeNull();
    });
});
