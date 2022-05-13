import { Test, TestingModule } from '@nestjs/testing';
import { AccountableController } from './accountable.controller';
import { AccountableService } from './accountable.service';

describe('AccountableController', () => {
  let controller: AccountableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountableController],
      providers: [AccountableService],
    }).compile();

    controller = module.get<AccountableController>(AccountableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
