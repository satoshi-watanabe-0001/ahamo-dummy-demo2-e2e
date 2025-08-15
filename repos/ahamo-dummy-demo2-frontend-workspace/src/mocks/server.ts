import { logInfo } from '@/lib/logger'

export const server = {
  listen: () => {
    logInfo('Mock server listening for testing environment')
  },
  resetHandlers: () => {
    logInfo('Mock server handlers reset')
  },
  close: () => {
    logInfo('Mock server closed')
  },
  use: (...handlers: unknown[]) => {
    logInfo('Using additional handlers', { handlerCount: handlers.length })
  },
}
