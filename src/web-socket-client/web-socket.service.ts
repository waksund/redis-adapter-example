import {Injectable} from "@nestjs/common";
import {DataDto} from "@cmn/dto/data.dto";

@Injectable()
export class WebSocketService{
    private data: DataDto;

    updateData(data: DataDto): void{
        this.data = data
    };

    getData(): DataDto{
        return this.data;
    }
}