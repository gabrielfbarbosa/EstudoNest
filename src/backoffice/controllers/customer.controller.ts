import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contracts";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";

//localhost:3000/v1/customers
//localhost:3000/v1/customers/12345678999 MEUCPF para get By Id
@Controller('v1/customers')
export class CustomerController {
    @Get()
    get(){
        return new Result (null, true, [], null);

    }

    @Get(':document')
    getById(@Param('document') document){
        return new Result (null, true, {}, null);

    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor (new CreateCustomerContract() ) )
    post(@Body() body: Customer){
        return new Result ('Cliente CRIADO com sucesso!', true, body, null);
    }

    @Put(':document')
    put(@Param('document') document, @Body() body){
        return new Result ('Cliente ALTERADO com sucesso!', true, body, null);
    }

    @Delete(':document')
    delete(@Param('document') document){
        return new Result ('Cliente REMOVIDO com sucesso!', true, null, null);

    }
}