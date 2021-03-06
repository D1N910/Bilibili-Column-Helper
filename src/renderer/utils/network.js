const request = require('request-promise').defaults({
  jar: true
})

export async function get (options) {
  return await request(options)
}

export async function post (options) {
  return await request(options)
}

export async function getBilibili (uri, cookies) {
  const options = getConfig(uri, 'GET', cookies)
  return JSON.parse(await get(options))
}

export async function postBilibili (uri, cookies, form) {
  const options = getConfig(uri, 'POST', cookies)
  options['form'] = form
  return JSON.parse(await post(options))
}

function getConfig (uri, method, cookies) {
  return {
    uri: uri,
    method: method,
    gzip: true,
    headers: {
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cookie': cookies
    }
  }
}
