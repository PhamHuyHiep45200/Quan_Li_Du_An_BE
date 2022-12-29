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
import { UpdateIfnoUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateDeleteUserDto } from './dto/update-delete.dto';
import { ForgotDto } from './dto/forgot-pass.dto';
import { ForgotpassWord } from './dto/forgot-password.dto';

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
  @Put('/update-user/:id')
  updateUser(
    @Body() updateIfnoUserDto: UpdateIfnoUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateInfoUser(id, updateIfnoUserDto);
  }
  @Put('/delete-user/:id')
  deleteUser(
    @Body() updateDeleteUserDto: UpdateDeleteUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateDelete(updateDeleteUserDto, id);
  }
  @Put('/forgot-password')
  async forgotPass(@Query() data: ForgotDto) {
    return await this.userService.forgotPassEmail(data);
  }
  @Put('/forgot-password/:id')
  async forgotPassWord(
    @Param('id') id: number,
    @Body() forgotpassWord: ForgotpassWord,
  ) {
    return await this.userService.forgotPassWord(id, forgotpassWord);
  }
}
