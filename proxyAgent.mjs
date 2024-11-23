import http from 'http';
import https from 'https';
import { URL } from 'url';

import HttpsProxyAgent from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';

let globalProxyAgent = null;

function getProxyUrl() {
  const proxyUrl =
    process.env.https_proxy ||
    process.env.HTTPS_PROXY ||
    process.env.http_proxy ||
    process.env.HTTP_PROXY;
  return proxyUrl ? proxyUrl.trim() : null;
}

function parseProxyUrl(proxyUrl) {
  if (!proxyUrl) return null;

  try {
    let protocol, host, port, username, password;
    if (proxyUrl.startsWith('socks5://')) {
      const parts = proxyUrl.slice(9).split(':');
      if (parts.length === 4) {
        [host, port, username, password] = parts;
        protocol = 'socks5:';
      } else {
        throw new Error('Invalid SOCKS5 proxy URL format');
      }
    } else {
      const url = new URL(proxyUrl);
      protocol = url.protocol;
      host = url.hostname;
      port = url.port;
      username = url.username;
      password = url.password;
    }

    return {
      protocol: protocol.replace(':', ''),
      host,
      port,
      username,
      password,
    };
  } catch (error) {
    console.error(`无效的代理 URL：${proxyUrl}`);
    return null;
  }
}

function createProxyAgent() {
  const proxyUrl = getProxyUrl();
  if (!proxyUrl) {
    console.log('未设置代理环境变量，将不使用代理');
    return null;
  }

  const parsedProxy = parseProxyUrl(proxyUrl);
  if (!parsedProxy) return null;

  console.log(`使用代理：${proxyUrl}`);

  if (parsedProxy.protocol === 'socks5') {
    console.log('使用 SOCKS5 代理');
    return new SocksProxyAgent({
      hostname: parsedProxy.host,
      port: parsedProxy.port,
      userId: parsedProxy.username,
      password: parsedProxy.password,
      protocol: 'socks5:',
    });
  } else {
    console.log('使用 HTTP/HTTPS 代理');
    return new HttpsProxyAgent.HttpsProxyAgent(proxyUrl);
  }
}

export function setGlobalProxy() {
  const proxyUrl = getProxyUrl();
  if (proxyUrl) {
    globalProxyAgent = createProxyAgent();

    // 重写 http 和 https 模块的 request 方法
    const originalHttpRequest = http.request;
    const originalHttpsRequest = https.request;

    http.request = function (options, callback) {
      if (typeof options === 'string') {
        options = new URL(options);
      }
      options.agent = globalProxyAgent;
      return originalHttpRequest.call(this, options, callback);
    };

    https.request = function (options, callback) {
      if (typeof options === 'string') {
        options = new URL(options);
      }
      options.agent = globalProxyAgent;
      return originalHttpsRequest.call(this, options, callback);
    };

    console.log(`全局代理设置为：${proxyUrl}`);
  } else {
    console.log('未设置代理环境变量，未配置全局代理');
  }
}

export function setProxyEnvironmentVariables() {
  const proxyUrl = getProxyUrl();
  if (proxyUrl) {
    process.env.HTTP_PROXY = proxyUrl;
    process.env.HTTPS_PROXY = proxyUrl;
    console.log(`设置代理环境变量为：${proxyUrl}`);
  }
}

// 全局代理
setGlobalProxy();
