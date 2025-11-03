import { Injectable } from '@nestjs/common';
import { AbstractLinksDao } from './txn/mongo/abstract/links.abstract';


@Injectable()
export class DatabaseService {
	constructor(
		public linksTxn: AbstractLinksDao,		
	) {}
}
