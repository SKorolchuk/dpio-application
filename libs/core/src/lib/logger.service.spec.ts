/* eslint-disable @typescript-eslint/no-empty-function */
import { TestBed } from "@angular/core/testing";
import { signal, WritableSignal } from "@angular/core";
import { Logger, ContextualLogger } from "./logger.service";
import { ConfigurationService } from "@lib/shared";

describe("Logger & ContextualLogger", () => {
    let loggerService: Logger;
    let mockIsProductionSignal: WritableSignal<boolean>;
    let mockConfigService: Partial<ConfigurationService>;

    beforeEach(() => {
        mockIsProductionSignal = signal(false);

        mockConfigService = {
            isProduction: mockIsProductionSignal,
        };

        TestBed.configureTestingModule({
            providers: [Logger, { provide: ConfigurationService, useValue: mockConfigService }],
        });

        loggerService = TestBed.inject(Logger);

        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(console, "warn").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should successfully initialize the root Logger factory service via DI context", () => {
        expect(loggerService).toBeTruthy();
    });

    it("should correctly spawn an isolated independent ContextualLogger instance using forContext factory", () => {
        const contextualLog = loggerService.forContext("TestContext");

        expect(contextualLog).toBeInstanceOf(ContextualLogger);
    });

    describe("Development Environment Logging Rules", () => {
        it("should pipe all logs streams including debug metrics straight to standard console window APIs", () => {
            const contextualLog = loggerService.forContext("DevContext");

            contextualLog.debug("debug message parameters string");
            contextualLog.warn("warning caution alert criteria");
            contextualLog.error("critical error exceptions runtime failure");

            expect(console.log).toHaveBeenCalledWith("[DEBUG] [DevContext]: debug message parameters string");
            expect(console.warn).toHaveBeenCalledWith("[WARN] [DevContext]: warning caution alert criteria");
            expect(console.error).toHaveBeenCalledWith(
                "[ERROR] [DevContext]: critical error exceptions runtime failure",
            );
        });
    });

    describe("Production Environment Logging Rules", () => {
        beforeEach(() => {
            mockIsProductionSignal.set(true);
        });

        it("should strictly suppress debug level telemetry streams while keeping warning and errors active", () => {
            const contextualLog = loggerService.forContext("ProdContext");

            contextualLog.debug("hidden system log data metric");
            contextualLog.warn("visible database degradation alert");
            contextualLog.error("visible fatal app termination failure");
            expect(console.log).not.toHaveBeenCalled();

            expect(console.warn).toHaveBeenCalledWith("[WARN] [ProdContext]: visible database degradation alert");
            expect(console.error).toHaveBeenCalledWith("[ERROR] [ProdContext]: visible fatal app termination failure");
        });
    });
});
