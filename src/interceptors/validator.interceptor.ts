import { ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Contract } from "src/backoffice/contracts/contracts";
import { Result } from "src/backoffice/models/result.model";

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: Contract) {

    }

    intercept(context: ExecutionContext, call$: Observable<any> ): Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if(!valid){
            throw new HttpException(new Result(
                'Ops, algo deu errado.',
                false,
                null,
                this.contract.errors),
                HttpStatus.BAD_REQUEST
            );
        }

        return call$;
    }
}