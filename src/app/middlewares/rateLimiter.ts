// src/middleware/rateLimiter.ts
import { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";

// Example logger (replace with Winston/Pino in production)
const logger = {
  warn: (msg: string) => console.warn(msg),
  info: (msg: string) => console.info(msg),
};

// Centralized rate limit configs
const RATE_LIMITS = {
  GLOBAL: { windowMs: 15 * 60 * 1000, max: 100 }, // 15 min, 100 requests
  PASSWORD: { windowMs: 5 * 60 * 1000, max: 5 }, // 5 min, 5 attempts
  AUTH: { windowMs: 15 * 60 * 1000, max: 10 }, // 15 min, 10 attempts
  FORGOT_PASSWORD: { windowMs: 60 * 60 * 1000, max: 3 }, // 1 hour, 3 attempts
  API: { windowMs: 15 * 60 * 1000, max: 200 }, // 15 min, 200 requests
  UPLOAD: { windowMs: 60 * 60 * 1000, max: 50 }, // 1 hour, 50 uploads
  PAYMENT: { windowMs: 15 * 60 * 1000, max: 20 }, // 15 min, 20 payments
};

const getWaitTime = (ms: number): string => {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds} seconds`;
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minutes`;
};

// 🔧 Helper to build a limiter with clean responses
const createLimiter = (
  name: string,
  { windowMs, max }: { windowMs: number; max: number },
  keyGenerator?: (req: Request) => string
) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: false,
    skipSuccessfulRequests: false,
    keyGenerator,
    handler: (req: Request, res: Response) => {
      const waitTime = getWaitTime(windowMs);

      logger.warn(
        `🚫 [${name.toUpperCase()}] Rate limit exceeded - IP: ${req.ip}, URL: ${
          req.originalUrl
        }`
      );

      res.setHeader("Retry-After", waitTime.toString());

      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.TOO_MANY_REQUESTS,
        message: `Too many ${name} requests. Please try again in ${waitTime}.`,
        data: {
          retryAfter: waitTime,
          maxAttempts: max,
          windowMs,
          type: `${name}_limit`,
        },
      });
    },
  });
};

// 🌍 Global limiter (applies to all routes)
export const globalLimiter = createLimiter("global", RATE_LIMITS.GLOBAL);

// 🔒 Password change limiter
export const changePasswordLimiter = createLimiter(
  "password change",
  RATE_LIMITS.PASSWORD,
  (req) => `${req.ip}-${req.body?.userId || "unknown"}`
);

// 🔐 Auth limiter (login/signup)
export const authLimiter = createLimiter("auth", RATE_LIMITS.AUTH, (req) => {
  const email = req.body?.email || "unknown";
  return `${req.ip}-${email}`;
});

// 🔓 Forgot password limiter
export const forgotPasswordLimiter = createLimiter(
  "forgot password",
  RATE_LIMITS.FORGOT_PASSWORD,
  (req) => {
    const email = req.body?.email || "unknown";
    return `forgot-${req.ip}-${email}`;
  }
);

// 🔌 API limiter
export const apiLimiter = createLimiter("api", RATE_LIMITS.API);

// 📁 File upload limiter
export const uploadLimiter = createLimiter("upload", RATE_LIMITS.UPLOAD);

// 💳 Payment limiter
export const paymentLimiter = createLimiter("payment", RATE_LIMITS.PAYMENT);

// 📊 Export rate limit info for admin dashboard
export const getRateLimitInfo = () => {
  return {
    global: {
      ...RATE_LIMITS.GLOBAL,
      description: "100 requests per 15 minutes",
    },
    passwordChange: {
      ...RATE_LIMITS.PASSWORD,
      description: "5 password changes per 5 minutes",
    },
    auth: {
      ...RATE_LIMITS.AUTH,
      description: "10 auth attempts per 15 minutes",
    },
    forgotPassword: {
      ...RATE_LIMITS.FORGOT_PASSWORD,
      description: "3 forgot password requests per hour",
    },
    api: { ...RATE_LIMITS.API, description: "200 API requests per 15 minutes" },
    upload: { ...RATE_LIMITS.UPLOAD, description: "50 file uploads per hour" },
    payment: {
      ...RATE_LIMITS.PAYMENT,
      description: "20 payment attempts per 15 minutes",
    },
  };
};
