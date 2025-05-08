import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const initialBalance = 100;
const extraWithdrawAmount = 150;
const withdrawAmount = 75;
const transferAmount = 80;
const extraTransferAmount = 200;
const depositAmount = 50;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(initialBalance);

    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.withdraw(extraWithdrawAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    const recipientAccount = getBankAccount(initialBalance);

    expect(() =>
      bankAccount.transfer(extraTransferAmount, recipientAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.transfer(initialBalance, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.deposit(depositAmount);

    expect(bankAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(withdrawAmount);

    expect(bankAccount.getBalance()).toBe(25);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(initialBalance);
    const recipientAccount = getBankAccount(initialBalance);

    bankAccount.transfer(transferAmount, recipientAccount);

    expect(bankAccount.getBalance()).toBe(20);
    expect(recipientAccount.getBalance()).toBe(180);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(initialBalance);

    const mockFetchBalance = jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockReturnValue(Promise.resolve(1));
    const result = await bankAccount.fetchBalance();

    expect(typeof result).toBe('number');
    mockFetchBalance.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(initialBalance);

    const mockFetchBalance = jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockReturnValue(Promise.resolve(100));
    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(100);
    mockFetchBalance.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(initialBalance);

    const mockFetchBalance = jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockReturnValue(Promise.resolve(null));

    await expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    mockFetchBalance.mockRestore();
  });
});
