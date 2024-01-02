import type { CurrentUser } from '../middleware/verifyToken';

declare global {
    namespace Express {
        interface Request {
            user?: CurrentUser
        }
    }
  }