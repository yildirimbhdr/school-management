import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStudentRequestDTO } from './dto/request/CreateStudent.request.dto';

@Controller('students')
export class StudentsController {
    @Post('')
    create(@Body() body: CreateStudentRequestDTO) { }
}
