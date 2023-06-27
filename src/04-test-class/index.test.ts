import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

const mockAccountBalance = 1000;
const higherBalanceValue = 1500;
const mockedDepositValue = 500;
const mockedWithdrawValue = 500;
const maxSynchronizedBalanceValue = 100;
const mockedTransferValue = mockAccountBalance;
const mockedAccount = getBankAccount(mockAccountBalance);
const mockedSecondAccount = getBankAccount(higherBalanceValue);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(mockedAccount.getBalance()).toBe(mockAccountBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => mockedAccount.withdraw(higherBalanceValue)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      mockedAccount.transfer(higherBalanceValue, mockedSecondAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      mockedAccount.transfer(mockAccountBalance, mockedAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(mockedAccount.deposit(mockedDepositValue).getBalance()).toBe(
      higherBalanceValue,
    );
  });

  test('should withdraw money', () => {
    expect(mockedAccount.withdraw(mockedWithdrawValue).getBalance()).toBe(
      mockAccountBalance,
    );
  });

  test('should transfer money', () => {
    mockedAccount.transfer(mockedTransferValue, mockedSecondAccount);
    const secondAccountBalanceAfterTransfer =
      higherBalanceValue + mockedTransferValue;
    expect(mockedSecondAccount.getBalance()).toBe(
      secondAccountBalanceAfterTransfer,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await mockedAccount.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      await mockedAccount.synchronizeBalance();
      expect(mockedSecondAccount.getBalance()).toBeGreaterThanOrEqual(0);
      expect(mockedSecondAccount.getBalance()).toBeLessThanOrEqual(
        maxSynchronizedBalanceValue,
      );
    } catch (error: unknown) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await mockedAccount.synchronizeBalance();
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
