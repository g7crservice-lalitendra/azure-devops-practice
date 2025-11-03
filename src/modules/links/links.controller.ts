import { Controller, Get } from '@nestjs/common';
import { LinksService } from './links.service';
import { AbstractLinksSvc } from './links.abstract';

@Controller('links')
export class LinksController {
  constructor(private readonly _linksService: AbstractLinksSvc) {}

  @Get()
  async getAllLinks() {
    return this._linksService.getAllLinks(); 
  }
}
 