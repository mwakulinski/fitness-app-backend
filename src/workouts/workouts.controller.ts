import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  getAll() {
    return this.workoutsService.getAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.workoutsService.findById(id);
  }
}
