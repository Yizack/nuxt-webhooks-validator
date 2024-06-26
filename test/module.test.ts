import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils'
import * as events from './events'

await setup({ rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)) })

describe('ssr', () => {
  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>Nuxt Webhook Validators</div>')
  })
})

describe('webhooks', () => {
  it('valid GitHub webhook', async () => {
    const response = await events.simulateGithubEvent()
    expect(response).toStrictEqual({ isValidWebhook: true })
  })

  it('valid Paddle webhook', async () => {
    const response = await events.simulatePaddleEvent()
    expect(response).toStrictEqual({ isValidWebhook: true })
  })

  it('valid Stripe webhook', async () => {
    const response = await events.simulateStripeEvent()
    expect(response).toStrictEqual({ isValidWebhook: true })
  })

  it('valid Twitch webhook', async () => {
    const response = await events.simulateTwitchEvent()
    expect(response).toStrictEqual({ isValidWebhook: true })
  })
})
