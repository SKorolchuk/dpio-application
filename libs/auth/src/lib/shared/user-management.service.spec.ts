import { TestBed, inject } from "@angular/core/testing";
import { UserManagementService } from "./user-management.service";

describe("UserManagementService", () => {
    let service: UserManagementService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserManagementService],
        });
    });

    beforeEach(inject([UserManagementService], (_service: UserManagementService) => {
        service = _service;
    }));

    afterEach(() => {});
});
