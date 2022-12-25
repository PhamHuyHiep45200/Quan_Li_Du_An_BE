import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateDeleteUserDto } from './dto/update-delete.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/search-user')
  getSearchUser(@Query() search: SearchUserDto) {
    return this.userService.searchUser(search);
  }
  @Get('/user-project-all/:id_project')
  getUserProjectAll(@Param('id_project', ParseIntPipe) id_project: number) {
    return this.userService.getUserProjectAll(id_project);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put('/delete-all-user/:id')
  deleteUser(
    @Body() updateDeleteUserDto: UpdateDeleteUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateDelete(updateDeleteUserDto, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
