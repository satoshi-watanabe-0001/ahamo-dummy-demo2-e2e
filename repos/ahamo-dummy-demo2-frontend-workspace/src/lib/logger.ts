interface LogMetadata {
  [key: string]: unknown
}

interface Logger {
  error: (message: string, meta?: LogMetadata) => void
  warn: (message: string, meta?: LogMetadata) => void
  info: (message: string, meta?: LogMetadata) => void
  debug: (message: string, meta?: LogMetadata) => void
}

const formatLogMessage = (level: string, message: string, meta?: LogMetadata): string => {
  const timestamp = new Date().toISOString()
  const metaStr = meta && Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : ''
  return `[${level}] ${timestamp} ${message}${metaStr}`
}

const createLogger = (): Logger => {
  const isDev = process.env.NODE_ENV === 'development'
  const isTest = process.env.NODE_ENV === 'test'

  return {
    error: (message: string, meta?: LogMetadata) => {
      if (!isTest) {
        console.error(formatLogMessage('ERROR', message, meta))
      }
    },
    warn: (message: string, meta?: LogMetadata) => {
      if (!isTest) {
        console.warn(formatLogMessage('WARN', message, meta))
      }
    },
    info: (message: string, meta?: LogMetadata) => {
      if (!isTest) {
        console.info(formatLogMessage('INFO', message, meta))
      }
    },
    debug: (message: string, meta?: LogMetadata) => {
      if (!isTest && isDev) {
        console.debug(formatLogMessage('DEBUG', message, meta))
      }
    },
  }
}

export const logger = createLogger()

export const logError = (
  message: string,
  error?: Error | unknown,
  metadata?: Record<string, unknown>
) => {
  const errorData = {
    error:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
    ...metadata,
  }
  logger.error(message, errorData)
}

export const logWarn = (message: string, metadata?: Record<string, unknown>) => {
  logger.warn(message, metadata)
}

export const logInfo = (message: string, metadata?: Record<string, unknown>) => {
  logger.info(message, metadata)
}

export const logDebug = (message: string, metadata?: Record<string, unknown>) => {
  logger.debug(message, metadata)
}

export const logApiRequest = (method: string, url: string, metadata?: Record<string, unknown>) => {
  logInfo(`API Request: ${method} ${url}`, {
    type: 'api_request',
    method,
    url,
    ...metadata,
  })
}

export const logApiResponse = (
  method: string,
  url: string,
  status: number,
  duration?: number,
  metadata?: Record<string, unknown>
) => {
  logInfo(`API Response: ${method} ${url} - ${status}`, {
    type: 'api_response',
    method,
    url,
    status,
    duration,
    ...metadata,
  })
}
