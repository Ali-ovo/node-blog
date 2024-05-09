import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  @Get()
  // blog?keyword=123&pwd=999
  async findAll(@Query('keyword') keyword: string, @Query('pwd') pwd: string) {
    console.log('keyword', keyword);
    console.log('pwd', pwd);
    return ['1', '2', '3'];
  }

  @Get(':id')
  // blog/1
  async findOne(@Param('id') id: string) {
    console.log('id', id);
    return '1';
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return { id };
  }

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    console.log('createBlogDto', createBlogDto);
    return 'ok';
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: CreateBlogDto) {
    console.log('id', id);
    console.log('updateBlogDto', updateBlogDto);
    return 'ok';
  }
}
