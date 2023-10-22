const WHITELIST = {
  folhadespaulo: {
    xhrBlocking: [
      'http://paywall.folha.uol.com.br/status.php',
      'https://paywall.folha.uol.com.br/status.php'
    ]
  }
};

const BLOCKLIST = {
  brpolitico: {
    xhrBlocking: [
      '*://*.estadao.com.br/paywall/*',
    ]
  },
  correio24horas: {
    scriptBlocking: [
      '*://correio-static.cworks.cloud/vendor/bower_components/paywall.js/paywall.js*',
    ]
  },
  correiopopular: {
    scriptBlocking: [
      '*://correio.rac.com.br/includes/js/novo_cp/fivewall.js*',
    ]
  },
  diarinho: {
    xhrBlocking: [
      '*://*.diarinho.com.br/wp-admin/admin-ajax.php',
    ]
  },
  diariodecanoas: {
    xhrBlocking: [
      '*://*.fivewall.com.br/*',
    ]
  },
  diariopopular: {
    cookieBlocking: {
      urlFilter: '*://www.diariopopular.com.br/*',
      blockAll: true
    }
  },
  elpais: {
    scriptBlocking: [
      '*://prisa-el-pais-brasil-prod.cdn.arcpublishing.com/arc/subs/p.js',
      '*://prisa-el-pais-prod.cdn.arcpublishing.com/arc/subs/p.js',
      '*://brasil.elpais.com/pf/resources/dist/js/article.js*'
    ]
  },
  exame: {
    scriptBlocking: [
      '*://exame.com/wp-content/themes/exame-new/js/pywll.js',
      '*://exame.com/wp-content/themes/exame-new/js/extd-acc.js?v=*'
    ]
  },
  folhadespaulo: {
    scriptBlocking: [
      '*://paywall.folha.uol.com.br/*',
      '*://static.folha.uol.com.br/paywall/*',
    ],
    xhrBlocking: [
      '*://paywall.folha.uol.com.br/*',
      '*://static.folha.uol.com.br/paywall/*',
    ],
  },
  folhadelondrina: {
    scriptBlocking: [
      '*://www.folhadelondrina.com.br/login.php*',
    ],
    xhrBlocking: [
      '*://www.folhadelondrina.com.br/login.php*',
    ],
  },
  gazetadopovo: {
    scriptBlocking: [
      '*://www.netdeal.com.br/*',
    ]
  },
  gazetaonline: {
    cookieBlocking: {
      urlFilter: '*://www.gazetaonline.com.br/*',
      blockAll: true
    }
  },
  gauchazh: {
    scriptBlocking: [
      '*://gauchazh.clicrbs.com.br/static/signwall.*.min.js'
    ]
  },
  jornalnh: {
    scriptBlocking: [
      '*://*.fivewall.com.br/*',
    ]
  },
  jornalvs: {
    scriptBlocking: [
      '*://*.fivewall.com.br/*',
    ]
  },
  jota: {
    headerInjection: {
      name: 'User-Agent',
      value: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      urlFilter: '*://www.jota.info/*'
    }
  },
  nexo: {
    xhrBlocking: [
      'https://acesso.nexojornal.com.br/paywall/*'
    ]
  },
  nsctotal: {
    xhrBlocking: [
      'https://paywall.nsctotal.com.br/behaviors',
    ],
    scriptBlocking: [
      '*://*.tinypass.com/*'
    ]
  },
  oestadodespaulo: {
    xhrBlocking: [
      '*://*.estadao.com.br/paywall/*',
    ],
    scriptBlocking: [
      '*://*.estadao.com.br/paywall/*',
      '*://*.zephr.com/zephr-browser/*/zephr-browser.umd.js',
    ]
  },
  pioneiro: {
    scriptBlocking: [
      '*://www.rbsonline.com.br/cdn/scripts/SLoader.js',
    ]
  },
  quatrorodas: {
    scriptBlocking: [
      'https://*.abril.com.br/wp-content/plugins/abril-plugins/abril-paywall/js/paywall.js*',
    ]
  },
  revistaoeste: {
    scriptBlocking: [
      '*://revistaoeste.com/wp-content/uploads/custom-css-js/248859.js?v=*',
      '*://revistaoeste.com/wp-content/themes/revistaoeste/assets/js/main.js?ver=*'
    ]
  },
  seudinheiro: {
    scriptBlocking: [
      'https://*.seudinheiro.com/app/themes/seudinheiro/src/js/lib/premium-home.js*',
      'https://*.seudinheiro.com/app/themes/seudinheiro/js/premium-production.js*',
    ]
  },
  superinteressante: {
    scriptBlocking: [
      'https://*.abril.com.br/wp-content/plugins/abril-plugins/abril-paywall/js/paywall.js*',
    ]
  },
  uol: {
    scriptBlocking: [
      '*://tm.jsuol.com.br/modules/content-gate.js',
    ],
    headerInjection: {
      name: 'User-Agent',
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
      urlFilter: '*://noticias.uol.com.br/midiaglobal/nytimes/*'
    }
  },
  valoreconomico: {
    scriptBlocking: [
      '*://static.infoglobo.com.br/paywall/js/*',
    ]
  },
  veja: {
    scriptBlocking: [
      'https://*.abril.com.br/wp-content/plugins/abril-plugins/abril-paywall/js/paywall.js*',
    ]
  },
  observador: {
    scriptBlocking: [
      '*://*.tinypass.com/*',
    ]
  },
  theatlantic: {
    scriptBlocking: [
      'https://cdn.theatlantic.com/_next/static/chunks/3235-ce2ff3f397931170.js'
    ]
  }
};

function onBeforeRequestScript(details) {
  for (let item in BLOCKLIST) {
    let urls = BLOCKLIST[item].urls;
    let scripts = BLOCKLIST[item].allowScript;
    if (scripts == undefined)
      continue;
    if (urls != undefined) {
      for (let item in urls) {
        if (urls[item].test(details.initiator) ||
            urls[item].test(details.originUrl)) {
          for (let item in scripts) {
            if (details.url.match(matchPatternToRegExp(scripts[item])))
              return {cancel: false};
          }
        }
      }
    }
  }
  return {cancel: true};
}

function setScriptBlocking(enabledSites) {
  let urlFilters = [];

  for (let item in BLOCKLIST) {
    let script = BLOCKLIST[item].scriptBlocking;
    if (enabledSites && enabledSites[item] == false)
      continue;
    if (script == undefined)
      continue;
    urlFilters = urlFilters.concat(script);
  }

  chrome.webRequest.onBeforeRequest.addListener(
    onBeforeRequestScript,
    {
      urls: urlFilters,
      types: ['script']
    },
    ['blocking']
  );
}

let whitelist = [];
function onBeforeRequestXml(details) {
  if (whitelist.indexOf(details.url) !== -1)
    return {cancel: false};
  else
    return {cancel: true};
}
function setXhrBlocking(enabledSites) {
  let blocklist = [];

  for (let item in BLOCKLIST) {
    let xhr = BLOCKLIST[item].xhrBlocking;
    if (xhr == undefined)
      continue;
    if (enabledSites && enabledSites[item] == false)
      continue;
    blocklist = blocklist.concat(xhr);
  }

  for (let item in WHITELIST) {
    if (enabledSites && enabledSites[item] == false)
      continue;
    let xhr = WHITELIST[item].xhrBlocking;
    if (xhr == undefined)
      continue;
    whitelist = whitelist.concat(xhr);
  }

  chrome.webRequest.onBeforeRequest.addListener(
    onBeforeRequestXml,
    {
      urls: blocklist,
      types: ['xmlhttprequest']
    },
    ['blocking']
  );
}

function onHeadersReceivedCookie(details) {
  details.responseHeaders.forEach(function(responseHeader) {
    if (responseHeader.name.toLowerCase() == 'set-cookie') {
      responseHeader.value = '';
    }
  });
  return {
    responseHeaders: details.responseHeaders
  };
}
function onBeforeSendHeadersCookie(details) {
  injectHeader('Cookie', '', details.requestHeaders);
  return {requestHeaders: details.requestHeaders};
}

function makeCookieRemove(cookie) {
  return function() {
    chrome.cookies.remove(cookie);
  };
}
let callbacksOnBeforeRequestCookie = [];


function setCookieBlocking(enabledSites) {
  let urlFilters = [];

  for (let item in BLOCKLIST) {
    let cookie = BLOCKLIST[item].cookieBlocking;
    if (cookie == undefined)
      continue;
    if (enabledSites && enabledSites[item] == false)
      continue;

    if (cookie.blockAll) {
      urlFilters.push(cookie.urlFilter);
    }
    else {
      let callback = makeCookieRemove(cookie.cookie);
      callbacksOnBeforeRequestCookie.push(callback);
      chrome.webRequest.onBeforeRequest.addListener(
        callback,
        {
          urls: [cookie.urlFilter],
          types: ['xmlhttprequest', 'script', 'main_frame']
        }
      );
    }
  }


  chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceivedCookie,
    {
      urls: urlFilters,
      types: ['xmlhttprequest', 'script', 'main_frame']
    },
    ['blocking', 'responseHeaders']
  );

  chrome.webRequest.onBeforeSendHeaders.addListener(
    onBeforeSendHeadersCookie,
    {
      urls: urlFilters,
      types: ['xmlhttprequest', 'script', 'main_frame']
    },
    ['blocking', 'requestHeaders']
  );
}
function makeInjectHeader(name, value) {
  return function(details) {
    injectHeader(
      name,
      value,
      details.requestHeaders
    );
    return {requestHeaders: details.requestHeaders};
  };
}
let callbacksOnBeforeSendHeadersInjection = [];

function setHeaderInjection(enabledSites) {
  for (let item in BLOCKLIST) {
    let header = BLOCKLIST[item].headerInjection;
    if (header == undefined)
      continue;
    if (enabledSites && enabledSites[item] == false)
      continue;

    let callback = makeInjectHeader(header.name, header.value);
    callbacksOnBeforeSendHeadersInjection.push(callback);
    chrome.webRequest.onBeforeSendHeaders.addListener(
      callback,
      {
        urls: [
          header.urlFilter
        ],
        types: ['xmlhttprequest', 'main_frame']
      },
      ['blocking', 'requestHeaders']
    );
  }
}

function injectHeader(name, value, requestHeaders) {
  /**
   * @param {string} name - Name of the header to be inserted
   * @param {string} value - Value of the header to be inserted
   * @param {Object[]} requestHeaders - Provided by webRequest
   *   listeners in callback arg `details.requestHeader`
   * @param {string} requestHeaders[].name
   * @param {string} requestHeaders[].value
   */
  var headerIndex = requestHeaders.findIndex(
    x => x.name.toLowerCase() == name.toLowerCase());

  var newHeader = {name: name, value: value};
  if (headerIndex == -1)
    requestHeaders.push(newHeader);
  else
    requestHeaders[headerIndex] = newHeader;
}

function apply() {
  chrome.storage.local.get('sites', function(result) {
    let enabledSites = result.sites;

    setScriptBlocking(enabledSites);
    setXhrBlocking(enabledSites);
    setCookieBlocking(enabledSites);
    setHeaderInjection(enabledSites);
  });
}

function removeListeners() {
  chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestScript);
  chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestXml);
  chrome.webRequest.onHeadersReceived.removeListener(onHeadersReceivedCookie);
  chrome.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeadersCookie);
  for (let item of callbacksOnBeforeRequestCookie) {
    if (Object.prototype.hasOwnProperty.call(callbacksOnBeforeRequestCookie, item)) {
      chrome.webRequest.onBeforeRequest.removeListener(item);
    }
  }
  for (let item of callbacksOnBeforeSendHeadersInjection) {
    if (Object.prototype.hasOwnProperty.call(callbacksOnBeforeSendHeadersInjection, item)) {
      chrome.webRequest.onBeforeSendHeaders.removeListener(item);
    }
  }
}

apply();
chrome.runtime.onMessage.addListener(function(message) {
  if (message == 'update') {
    removeListeners();
    apply();
  }
});


function matchPatternToRegExp(pattern) {
  /**
  * Transforms a valid match pattern into a regular expression
  * which matches all URLs included by that pattern.
  *
  * @param  {string}  pattern  The pattern to transform.
  * @return {RegExp}           The pattern's equivalent as a RegExp.
  * @throws {TypeError}        If the pattern is not a valid MatchPattern
  */
  if (pattern === '') {
    return (/^(?:http|https|file|ftp|app):\/\//);
  }

  const schemeSegment = '(\\*|http|https|ws|wss|file|ftp)';
  const hostSegment = '(\\*|(?:\\*\\.)?(?:[^/*]+))?';
  const pathSegment = '(.*)';
  const matchPatternRegExp = new RegExp(
    `^${schemeSegment}://${hostSegment}/${pathSegment}$`
  );

  let match = matchPatternRegExp.exec(pattern);
  if (!match) {
    throw new TypeError(`"${pattern}" is not a valid MatchPattern`);
  }

  let [, scheme, host, path] = match;
  if (!host) {
    throw new TypeError(`"${pattern}" does not have a valid host`);
  }

  let regex = '^';

  if (scheme === '*') {
    regex += '(http|https)';
  } else {
    regex += scheme;
  }

  regex += '://';

  if (host && host === '*') {
    regex += '[^/]+?';
  } else if (host) {
    if (host.match(/^\*\./)) {
      regex += '[^/]*?';
      host = host.substring(2);
    }
    regex += host.replace(/\./g, '\\.');
  }

  if (path) {
    if (path === '*') {
      regex += '(/.*)?';
    } else if (path.charAt(0) !== '/') {
      regex += '/';
      regex += path.replace(/\./g, '\\.').replace(/\*/g, '.*?');
      regex += '/?';
    }
  }

  regex += '$';
  return new RegExp(regex);
}
