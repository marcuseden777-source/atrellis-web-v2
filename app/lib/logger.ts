type LogLevel = 'info' | 'warn' | 'error';

interface LogPayload {
  level: LogLevel;
  message: string;
  duration?: number;
  [key: string]: any;
}

export const logger = {
  log: (payload: LogPayload) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...payload,
    };
    
    // In production, this output is ingested by logging services (e.g. Datadog, Axiom)
    const formattedLog = JSON.stringify(logEntry);
    
    if (payload.level === 'error') {
      console.error(formattedLog);
    } else if (payload.level === 'warn') {
      console.warn(formattedLog);
    } else {
      console.log(formattedLog);
    }
  },
  
  info: (message: string, data?: Record<string, any>) => 
    logger.log({ level: 'info', message, ...data }),
    
  warn: (message: string, data?: Record<string, any>) => 
    logger.log({ level: 'warn', message, ...data }),
    
  error: (message: string, error?: any, data?: Record<string, any>) => 
    logger.log({ 
      level: 'error', 
      message, 
      error: error instanceof Error ? error.message : error, 
      stack: error instanceof Error ? error.stack : undefined,
      ...data 
    })
};
