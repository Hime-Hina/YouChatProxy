import { config as youConfig } from './config.mjs';
import HappyApiProvider from './happyapi_providers/happyApi.mjs';
import PerplexityProvider from './perplexity_providers/perplexityProvider.mjs';
import { config as perplexityConfig } from './perplexityConfig.mjs';
import YouProvider from './you_providers/youProvider.mjs';

class ProviderManager {
  constructor() {
    // 根据环境变量初始化提供者
    const activeProvider = process.env.ACTIVE_PROVIDER || 'you';

    switch (activeProvider) {
      case 'you':
        this.provider = new YouProvider(youConfig);
        break;
      case 'perplexity':
        this.provider = new PerplexityProvider(perplexityConfig);
        break;
      case 'happyapi':
        this.provider = new HappyApiProvider();
        break;
      default:
        throw new Error(
          'ACTIVE_PROVIDER 无效。可用的值包括 "you" "perplexity" "happyapi"',
        );
    }

    console.log(`使用 Provider "${activeProvider}" 初始化`);
  }

  async init() {
    await this.provider.init(this.provider.config);
    console.log('Provider 初始化完成');
  }

  async getCompletion(params) {
    return this.provider.getCompletion(params);
  }

  getCurrentProvider() {
    return this.provider.constructor.name;
  }
}

export default ProviderManager;
