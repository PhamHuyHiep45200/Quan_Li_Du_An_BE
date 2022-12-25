import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocsService } from './docs.service';
import { CreateDocs } from './dto/create-docs.dto';
import { UpdateDocs } from './dto/update-docs.dto';

@ApiTags('docs')
@Controller('docs')
export class DocsController {
  constructor(private docsService: DocsService) {}

  @Get()
  getAllDocs() {
    return this.docsService.getAllDocs();
  }
  @Post()
  createDocs(@Body() createDocs: CreateDocs) {
    return this.docsService.createDocs(createDocs);
  }
  @Put('update/:id')
  updateDocs(
    @Body() updateDocs: UpdateDocs,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.docsService.updateDocs(id, updateDocs);
  }
  @Put('delete/:id')
  deleteDocs(@Param('id', ParseIntPipe) id: number) {
    return this.docsService.deleteDocs(id);
  }
}
