# EMI Calculator — Playwright Tests
Playwright automated tests for the EMI Calculator site (https://emicalculator.net/).

**Prerequisites**
- Node.js v16+ installed.

**Execution steps**
1. Install dependencies and browsers:
```bash
npm install
npx playwright install
```

2. Run the full test suite:
```bash
npx playwright test
```

3. Run a single spec (headed for debugging):
```bash
npx playwright test tests/tooltip.spec.ts --project=chromium --headed
```

4. Enable tracing around a failing test (example):

```bash
npx playwright test --trace on --headed
```

5. Open the HTML report after a run:

```bash
npx playwright show-report
```

6. Recommended CI settings:
- Run full regression nightly.
- Persist `playwright-report/` and `test-results/` as job artifacts for debugging.
**Project structure**
- `pages/` — Page Object Model classes (EMICalculator, chart helpers).
- `tests/` — Playwright test specs.
- `playwright.config.ts` — Playwright configuration.


**Notes & tips**
- Use `--headed` and `--debug` when stepping through flaky interactions.


**Architecture Used**
- **Framework:** `@playwright/test` for test runner, assertions, fixtures and reporting.
- **Pattern:** Page Object Model (POM) — reusable page classes live in `pages/`, tests in `tests/` consume POM methods.
- **Test types:** end-to-end UI interactions, chart vs table comparisons, tooltip extraction, and EMI calculation verification.
- **Selectors & tools:** CSS/XPath locators for DOM and SVG/Highcharts;  Playwright tracing and screenshots for debugging.
- **CI readiness:** tests are written to run headlessly; artifacts (traces, screenshots, videos) are captured to assist triage.


**Regression strategy**
- **Test tiers:**
	- *Smoke*: critical flows (navigation, EMI calculation, major UI controls) run on every push.
	- *Regression*: full suite run nightly or on release branches.
- **Stability practices:**add `retries` and artifact capture for flaky tests.
- **Reporting & triage:** use Playwright HTML reports and saved traces; fail-fast on critical mismatches (chart vs table)

**CI Setup**
I have used local Jenkins to build the pipeline and trigger the email for pass/fail case. For Reference, I have attached the full pass report generated from Jenkins.
 