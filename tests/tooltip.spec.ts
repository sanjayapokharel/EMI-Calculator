import { test, expect, Page } from '@playwright/test';

test('Extract tooltip text from Highcharts bars', async ({ page }) => {

  await page.goto('https://emicalculator.net/');

  const bars = page.locator('.highcharts-markers path');


  const tooltip = page.locator('.highcharts-tooltip');
  const count = await bars.count();

  console.log('Bars count:', count);

  const bars2 = page.locator('(//*[name()="g" and contains(@class,"highcharts-markers")]//*[name()="path"])[' + (10) + ']');
  await bars2.hover();

  const text: string[] = [];

  for (let i = 1; i <= count + 1; i++) {
    const bars1 = page.locator('(//*[name()="g" and contains(@class,"highcharts-markers")]//*[name()="path"])[' + (i) + ']');
    await bars1.scrollIntoViewIfNeeded();
    await bars1.hover();
    text.push(...(await tooltip.allTextContents()));
  }

  // Wait for the schedule table to render
  const tableLocator = page.locator('#emipaymentdetails'); // EMI schedule table
  await expect(tableLocator).toBeVisible({ timeout: 10000 });


  for (let i = 1; i < count + 1; i++) {
    // Extract Balance column
    const balanceColumn = await tableLocator.locator('//tr[@class="row no-margin yearlypaymentdetails"][' + (i) + ']//td[5]').allTextContents();
    const balance1 = text[i].match(/Balance\s*:\s*₹\s*([\d,]+)/)?.[1];
    console.log('Chart Balance is :     ', balance1);
    const balance2 = balanceColumn[0].match(/₹\s*([\d,]+)/)?.[1];
    console.log('Table Balance is :     ', balance2);
    if (balance1 === balance2) {
      console.log("Chart and Table Balance match with each other");
    } else {
      console.log("Chart and Table Balance do not match with each other");
    }

  }









});
