import { test, expect } from '@playwright/test';
import path from 'path';
import XLSX from 'xlsx';

test('Verify Total Payment from downloaded Excel', async ({ page }) => {

    // Navigate to EMI Calculator
    await page.goto('https://emicalculator.net/');

    const totalPaymentFromUI = await page.locator('#emitotalamount p').innerText()
    const TotalPaymentFromApp = totalPaymentFromUI.replace(/\D/g, '');
    // Trigger download
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('a[title="Download Excel Spreadsheet"]')
    ]);

    // Save file
    const filePath = path.join(__dirname, 'emi_schedule.xlsx');
    await download.saveAs(filePath);

    // Read Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Get Total Payment value from B9
    const totalPaymentFromExcel = Number(sheet['B9']?.v);
    console.log('Total Payment from Excel:', totalPaymentFromExcel);

    // Assertion
    expect(totalPaymentFromExcel).toBe(Number(TotalPaymentFromApp));
    if (totalPaymentFromExcel === Number(TotalPaymentFromApp)) {
        console.log('Total Payment values match with excel and application!');
    } else {
        console.log('Total Payment values do not match with excel and application!');
    }
});