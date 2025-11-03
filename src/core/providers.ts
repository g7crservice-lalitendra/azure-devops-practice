import { ConfigService } from "src/config/config.service";


export const getProviders = (): any[] => {
	return [ConfigService];
};

export const exportProvider = (): any[] => {
	return [ConfigService];
};
