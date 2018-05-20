import mockedArticlesearchJSON from './articlesearch';

export default
{
  "_bodyBlob":  {
    "_data":  {
      "blobId": "8F7AA3DB-2894-45FA-8405-6450989B9FC8",
      "name": "articlesearch.json",
      "offset": 0,
      "size": 81131,
      "type": "application/json",
    },
  },
  "_bodyInit":  {
    "_data":  {
      "blobId": "8F7AA3DB-2894-45FA-8405-6450989B9FC8",
      "name": "articlesearch.json",
      "offset": 0,
      "size": 81131,
      "type": "application/json",
    },
  },
  "headers":  {
    "map":  {
      "connection":  [
        "keep-alive",
      ],
      "content-type":  [
        "application/json;charset=UTF-8",
      ],
      "date":  [
        "Sun, 20 May 2018 19:41:54 GMT",
      ],
      "server":  [
        "nginx/1.12.2",
      ],
      "transfer-encoding":  [
        "Identity",
      ],
      "via":  [
        "kong/0.9.5",
      ],
      "x-kong-proxy-latency":  [
        "8",
      ],
      "x-kong-upstream-latency":  [
        "464",
      ],
      "x-ratelimit-limit-day":  [
        "1000",
      ],
      "x-ratelimit-limit-second":  [
        "1",
      ],
      "x-ratelimit-remaining-day":  [
        "793",
      ],
      "x-ratelimit-remaining-second":  [
        "0",
      ],
    },
  },
  "ok": true,
  "status": 200,
  "statusText": undefined,
  "type": "default",
  "url": "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=&sort=newest&api-key=7bb6006970f94dc79a5f04ba7b16e2f2",
  json: () => mockedArticlesearchJSON
}