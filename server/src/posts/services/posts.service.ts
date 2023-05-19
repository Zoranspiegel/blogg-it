import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsInterface } from 'src/interfaces/post.interface';
import { CreatePostsDTO } from '../dto/posts.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { BlogInterface } from 'src/interfaces/blog.interface';
import { CreatePostsLikesDTO } from '../dto/postLikes.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('posts') private readonly postsModel: Model<PostsInterface>,
    @InjectModel('blogs') private readonly blogsModel: Model<BlogInterface>,
  ) {}
  //This function creates a new post in a database using the provided data and returns the created post.
  public async createPost(body: CreatePostsDTO): Promise<PostsInterface> {
    const { blogId } = body;
    try {
      const blog = await this.blogsModel.findById(blogId);

      //If the user is not found, throw an error.
      if (!blog) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Blog with ID: ${blogId} not found`,
        });
      }
      //If the user is found, create a new blog and save it to the database.
      const newPost = new this.postsModel(body);
      return await newPost.save();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  //This function returns all the posts in a database ordered by the date of creation.
  public async getAllPosts(page: number): Promise<PostsInterface[]> {
    //const page: number = 1;
    const limit: number = 10;
    const skip: number = (page - 1) * limit;
    const sortBy: object = { createdAt: -1 };
    try {
      return await this.postsModel.find({}, null, { skip, limit, sort: sortBy });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  //This function returns a post with the provided ID.
  public async getPostById(postId: string): Promise<PostsInterface> {
    try {
      const post = await this.postsModel.findById(postId);
      //If the post is not found, throw an error.
      if (!post) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Post with ID: ${postId} not found`,
        });
      }
      return post;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  //like/disLike a post
  public async addLike(body: CreatePostsLikesDTO, postId: string): Promise<PostsInterface> {
    const { userId } = body;
    try {
      const post = await this.postsModel.findById({ _id: postId });
      //If the post is not found, throw an error.
      if (!post) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Post with ID: ${postId} not found`,
        });
      }

      if (!post.postLikes.includes(userId)) {
        post.postLikes.push(userId);
        await post.save();
        return;
      } else {
        await this.postsModel.findByIdAndUpdate({ _id: postId }, { $pull: { postLikes: userId } });
        return;
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
