import * as jwt from 'jsonwebtoken';

export interface Context {
  request: any;
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export function getUserId(ctx: Context): string {
  const Authorization = ctx.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string;
    };
    return userId;
  }

  throw new AuthError();
}
