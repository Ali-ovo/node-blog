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
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // @Get('errorTest')
  // test() {
  //   throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);
  // }

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
    const blog = await this.blogService.findOne(+id);
    return blog;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return { id };
  }

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    createBlogDto.author = 'admin';
    const res = await this.blogService.create(createBlogDto);
    return res;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: CreateBlogDto) {
    console.log('id', id);
    console.log('updateBlogDto', updateBlogDto);
    return 'ok';
  }
}
