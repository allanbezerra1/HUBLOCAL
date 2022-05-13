import { Test, TestingModule } from '@nestjs/testing';
import { AccountableService } from './accountable.service';

describe('AccountableService', () => {
  let service: AccountableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountableService],
    }).compile();

    service = module.get<AccountableService>(AccountableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
