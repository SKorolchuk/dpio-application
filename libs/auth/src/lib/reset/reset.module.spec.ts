import { ResetModule } from './reset.module';

describe('ResetModule', () => {
  let resetModule: ResetModule;

  beforeEach(() => {
    resetModule = new ResetModule();
  });

  it('should create an instance', () => {
    expect(resetModule).toBeTruthy();
  });
});
