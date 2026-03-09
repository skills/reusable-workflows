import { test, expect } from '@playwright/test'

test.describe('OctoGames: OctoMatch Memory Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads with title and 16 face-down cards', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('OctoMatch')
    await expect(page.locator('.subtitle')).toContainText('OctoGames')
    const cards = page.locator('[data-testid="game-board"] button')
    await expect(cards).toHaveCount(16)
  })

  test('clicking a card flips it', async ({ page }) => {
    const firstCard = page.locator('[data-testid="game-board"] button').first()
    await firstCard.click()
    await expect(firstCard).toHaveClass(/flipped/)
  })

  test('move counter starts at 0', async ({ page }) => {
    await expect(page.getByTestId('move-counter')).toHaveText('Moves: 0')
  })

  test('move counter increments after flipping two cards', async ({ page }) => {
    const cards = page.locator('[data-testid="game-board"] button')
    await cards.nth(0).click()
    await cards.nth(1).click()
    await expect(page.getByTestId('move-counter')).toHaveText('Moves: 1')
  })

  test('New Game button resets the board', async ({ page }) => {
    const cards = page.locator('[data-testid="game-board"] button')
    await cards.nth(0).click()
    await cards.nth(1).click()
    await expect(page.getByTestId('move-counter')).toHaveText('Moves: 1')

    await page.getByRole('button', { name: /new game/i }).click()
    await expect(page.getByTestId('move-counter')).toHaveText('Moves: 0')
  })

  test('full game: discover and match all pairs', async ({ page }) => {
    const cards = page.locator('[data-testid="game-board"] button')

    // Phase 1: Discover all card positions by flipping sequential pairs
    const imgAtPosition = []
    for (let i = 0; i < 16; i += 2) {
      await cards.nth(i).click()
      const img1 = await cards.nth(i).locator('.card-front img').getAttribute('src')
      await cards.nth(i + 1).click()
      const img2 = await cards.nth(i + 1).locator('.card-front img').getAttribute('src')

      imgAtPosition[i] = img1
      imgAtPosition[i + 1] = img2

      // Wait for mismatch flip-back or match animation
      await page.waitForTimeout(900)
    }

    // Phase 2: Build pair map from discovered positions
    const imgToPair = new Map()
    for (let i = 0; i < 16; i++) {
      const img = imgAtPosition[i]
      if (!imgToPair.has(img)) imgToPair.set(img, [])
      imgToPair.get(img).push(i)
    }

    // Phase 3: Match remaining unmatched pairs
    for (const [, positions] of imgToPair) {
      const first = cards.nth(positions[0])
      // Skip if already matched during discovery
      const isMatched = await first.evaluate((el) => el.classList.contains('matched'))
      if (isMatched) continue

      await first.click()
      await cards.nth(positions[1]).click()
      await page.waitForTimeout(200)
    }

    await expect(page.getByTestId('win-message')).toBeVisible()
  })
})
