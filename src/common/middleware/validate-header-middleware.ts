import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class ValidateHeadersMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    if (!req.headers.apikey || !req.headers.secret) {
      res.status(401);
      res.json({
        error: 'apikey e secret são campos obrigatórios!',
      });
    } else {
      const user = await User.findOne({
        apiKey: req.headers.apikey,
        secret: req.headers.secret,
      });

      if (!user) {
        res.status(401);
        res.json({
          error: 'apiKey or secret not found',
        });
      } else {
        global.user = user;
        res.locals = user;
        next();
      }
    }
  }
}
