import {UpdateLinkDto} from './dto/links.dto';

export abstract class AbstractLinksSvc {
	// abstract updateLink(updateLinkDto: UpdateLinkDto, claims: any): Promise<any>;
    abstract getAllLinks(): Promise<any>;
}
