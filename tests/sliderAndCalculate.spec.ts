import { test } from '@playwright/test';
import { EMICalculatorPage } from '../pages/EMICalculator';

test('Drag sliders using POM model', async ({ page }) => {

  const emiPage = new EMICalculatorPage(page);


  await emiPage.navigate();

  await emiPage.setHomeLoanAmount('125L');
  await emiPage.setInterestRate('17.5');
  await emiPage.switchToMonths();
  await emiPage.setLoanTenure('360');

  await page.waitForTimeout(5000);

  await emiPage.verifyEMI(12500000, 17.5, 360);

});