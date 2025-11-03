import { Injectable } from '@nestjs/common';
import { AbstractLinksDao } from 'src/database/txn/mongo/abstract/links.abstract';
import { LinksDao } from 'src/database/txn/mongo/dao/links.dao';
import { AbstractLinksSvc } from './links.abstract';
import { DatabaseService } from 'src/database/databse.service';


@Injectable()
export class LinksService implements AbstractLinksSvc {
  private readonly _linksTxn: AbstractLinksDao;
  constructor(
    readonly _dbSvc: DatabaseService,
  ) {
    this._linksTxn = _dbSvc.linksTxn;
  }

  async getAllLinks() {
    return this._linksTxn.getAllLinks();
  }

  

}
