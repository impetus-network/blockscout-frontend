import React from 'react';

import * as statsMock from 'mocks/stats/index';
import { test, expect } from 'playwright/lib';

import TopBar from './TopBar';

test.beforeEach(async({ mockEnvs }) => {
  await mockEnvs([
    [ 'NEXT_PUBLIC_SWAP_BUTTON_URL', 'uniswap' ],
    [ 'NEXT_PUBLIC_NETWORK_SECONDARY_COIN_SYMBOL', 'DUCK' ],
  ]);
});

test('default view +@dark-mode +@mobile', async({ render, mockApiResponse, page }) => {
  await mockApiResponse('stats', statsMock.base);
  const component = await render(<TopBar/>);

  await component.getByText(/\$1\.39/).click();
  await expect(page.getByText(/last update/i)).toBeVisible();
  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1500, height: 220 } });

  await component.getByLabel('User settings').click();
  await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 1500, height: 400 } });
});

test('with secondary coin price +@mobile', async({ render, mockApiResponse }) => {
  await mockApiResponse('stats', statsMock.withSecondaryCoin);
  const component = await render(<TopBar/>);
  await expect(component).toHaveScreenshot();
});
