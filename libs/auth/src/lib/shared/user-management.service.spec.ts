import { TestBed, inject } from "@angular/core/testing";
import { UserManagementService } from "./user-management.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("UserManagementService", () => {
    let service: UserManagementService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserManagementService],
        });
    });

    beforeEach(inject([UserManagementService], (_service: UserManagementService) => {
        service = _service;
    }));

    afterEach(() => {});

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
