import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FirewallGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // console.log("🚀 ~ FirewallGuard ~ req:", req)
    
    // if(req.body.name == "Admin")
    //   return true;
    // else
    return true;
  }
}
