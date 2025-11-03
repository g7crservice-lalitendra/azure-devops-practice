/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Model, Types } from 'mongoose';

import { AppResponse, createResponse } from 'src/shared/appresponse.shared';
import { messages } from 'src/shared/messages.shared';
import { MongoConstants } from '../connection/constants.mongo';
import { AbstractLinksDao } from '../abstract/links.abstract';

export class LinksDao implements AbstractLinksDao {
  constructor(
    @Inject(MongoConstants.LINK_MODEL) private readonly _linkMdl: Model<any>,
  ) {}

  /**
   * Create a new link
   */
  async createLink(linkInput: any): Promise<AppResponse> {
    try {
      const link = await this._linkMdl.create({
        ...linkInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return createResponse(HttpStatus.CREATED, messages.S3, link);
    } catch (error) {
      throw new HttpException(messages.E4, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get all links with optional filters
   */
  async getAllLinks(filter: any = {}): Promise<AppResponse> {
    try {
      const links = await this._linkMdl.find(filter).sort({ createdAt: -1 });
      return createResponse(HttpStatus.OK, messages.S3, links);
    } catch (error) {
      throw new HttpException(messages.E10, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get a single link by ID
   */
  async getLinkById(id: string): Promise<AppResponse> {
    try {
      const link = await this._linkMdl.findById(new Types.ObjectId(id));
      if (!link) {
        return createResponse(HttpStatus.NOT_FOUND, messages.W111);
      }
      return createResponse(HttpStatus.OK, messages.S3, link);
    } catch (error) {
      throw new HttpException(messages.E10, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
