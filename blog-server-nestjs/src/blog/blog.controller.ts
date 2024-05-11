import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/user/user.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // @Get('errorTest')
  // test() {
  //   throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);
  // }

  @Get()
  // blog?keyword=123&pwd=999
  async findAll(
    @Query('keyword') keyword: string,
    @Query('author') author: string,
  ) {
    return this.blogService.findAll(author, keyword);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const blog = await this.blogService.findOne(id);
    return blog;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    createBlogDto.author = req.user.username;
    const res = await this.blogService.create(createBlogDto);
    return res;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: CreateBlogDto,
  ) {
    return this.blogService.update(id, updateBlogDto);
  }
}
