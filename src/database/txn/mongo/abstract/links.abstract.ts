/* eslint-disable prettier/prettier */
import { AppResponse } from 'src/shared/appresponse.shared';

export abstract class AbstractLinksDao {

  abstract createLink(linkInput: any): Promise<AppResponse>;

  
  abstract getAllLinks(filter?: any): Promise<AppResponse>;

  
  abstract getLinkById(id: string): Promise<AppResponse>;
}
