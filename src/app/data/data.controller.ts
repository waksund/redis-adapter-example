import {Body, Controller, Post} from "@nestjs/common";
import {DataService} from "./data.service";
import {DataDto} from "@cmn/dto/data.dto";

@Controller('data')
export class DataController {
    constructor(
        private readonly dataService: DataService
    ) {
    }
    @Post()
    async createData(@Body() data: DataDto): Promise<void> {
        await this.dataService.createData(data);
    }
}