import { Page, Locator } from '@playwright/test';

export class EMICalculatorPage {
  readonly page: Page;
  readonly homeLoanSlider: Locator;
  readonly interestRateSlider: Locator;
  readonly loanTenureSlider: Locator;
  readonly tenureInMonthsToggle: Locator;
  readonly emiAmount: Locator;
  readonly emiChartBars: Locator;
  readonly emiTableRows: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sliders
    this.homeLoanSlider = page.locator('.ui-state-default').first();
    this.interestRateSlider = page.locator('.ui-state-default').nth(1);
    this.loanTenureSlider = page.locator('.ui-state-default').nth(2);

    this.tenureInMonthsToggle = page.locator('div[class="btn-group btn-group-toggle"] label[class="btn btn-secondary"]');
    this.emiAmount = page.locator('#emiamount');
    // Chart bars
    this.emiChartBars = page.locator('svg#chart g.recharts-bar-rectangle');
    // Table rows
    this.emiTableRows = page.locator('table#emiTable tbody tr');
  }

  async navigate() {
    await this.page.goto('https://emicalculator.net/');
  }

  async setHomeLoanAmount(targetValue: string) {
    const target = this.page.getByText(targetValue);
    await this.homeLoanSlider.dragTo(target);
  }

  async setInterestRate(targetValue: string) {
    const target = this.page.getByText(targetValue);
    await this.interestRateSlider.dragTo(target);
  }

  async switchToMonths() {
    await this.tenureInMonthsToggle.click();
  }

  async setLoanTenure(targetValue: string) {
    const target = this.page.getByText(targetValue);
    await this.loanTenureSlider.dragTo(target);
  }
  async getEMIFromApp(): Promise<number> {
    const emiValue = (await this.emiAmount.textContent())?.trim();
    const emiFromApplication = Number(emiValue?.replace(/[^0-9]/g, ''));
    return emiFromApplication;
  }

  calculateEMI(principal: number, annualRatePercent: number, tenureMonths: number): number {
    const monthlyRate = annualRatePercent / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return emi;
  }
  async verifyEMI(principal: number, rate: number, tenure: number) {
    const emiFromApp = await this.getEMIFromApp();
    const calculatedEMI = this.calculateEMI(principal, rate, tenure);
    console.log('EMI from App:', emiFromApp);
    console.log('Calculated EMI:', Math.round(calculatedEMI));

    if (emiFromApp === Math.round(calculatedEMI)) {
      console.log('EMI values match!');
    } else {
      console.log('EMI values do not match!');
    }
  }

}