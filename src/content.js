// run_at: document_idle
const ABRIL_CODE = `
  window.setTimeout(function() {
    document.querySelector('body').classList.remove('disabledByPaywall')
    document.querySelector('.piano-offer-overlay').remove()
    document.querySelector('#piano_offer').remove()
  }, 10000)
`;

const INJECTION = {
  correio24horas: {
    url: /correio24horas\.com\.br/,
    code: `
      jQuery('[class^=paywall]').remove();
      jQuery('[class$=blocked]').removeClass();
      jQuery('[id^=paywall]').removeClass('hide').removeClass('is-active');
      jQuery('.noticias-single__content__text').attr('style', 'height:auto;');
      jQuery('[id^=paywall]').remove();
    `
  },
  diariodaregiao: {
    url: /diariodaregiao\.com\.br/,
    code: `
      document.getElementsByClassName('noticia-texto')[0].style.display = 'block';
      document.querySelector('.conteudo > .row').style.display = 'none';
    `
  },
  exame: {
    url: /exame\.com\.br/,
    code: ABRIL_CODE
  },
  folhadespaulo: {
    url: /folha.uol.com.br/,
    code: `
      omtrClickUOL = function(){};function showText() {
        $("#bt-read-more-content").next().show();
        $("#bt-read-more-content").next().show().prev().remove();
      }
      setTimeout(showText, 100);
    `
  },
  galileu: {
    url: /revistagalileu\.globo\.com/,
    code: `
      const cleanGalileu = () => {
        const div = document.querySelector('#detecta-adblock');
        document.querySelector('body').style.overflow = 'initial';
        div?.parentNode.removeChild(div);
      };
      cleanGalileu();
      setTimeout(cleanGalileu, 4000);
    `
  },
  gauchazh: {
    url : /gauchazh.clicrbs.com.br/,
    code: `
      (async () => {
        try {
            const data = JSON.parse(decodeURI(window.__ISOMORPHIC_DATA__)).state.apollo.ROOT_QUERY;
            const key = Object.keys(data).find(k => k.includes('article'));

            if (key && data[key] && data[key].article_body_components) {
                const parts = data[key].article_body_components
                    .map(item => \`<div class="article-paragraph">\${item.html || item.data.embed}</div>\`)
                    .join('');

                const insertContent = () => {
                    const article = document.querySelector('.article-paragraph');
                    if (article) {
                        article.insertAdjacentHTML('afterend', parts);
                        document.querySelectorAll('.article-paragraph').forEach(item => {
                            item.style.opacity = '1';
                        });
                        document.querySelectorAll('a').forEach(link => {
                            link.addEventListener('click', e => {
                                e.preventDefault();
                                e.stopImmediatePropagation();
                            });
                        });
                    }
                };

                const checkReady = setInterval(() => {
                    if (document.querySelector('.article-paragraph')) {
                        clearInterval(checkReady);
                        insertContent();
                    }
                }, 1000);
            }
        } catch (err) {
            console.error("Erro ao processar o artigo:", err);
        }
            })();
    `
  },
  nexo: {
    url: /nexojornal\.com\.br/,
    code: `
      const selectors = [
        "div[class*='PaywallBumper__wrap-container'",
        "div[class*='Datawall__wrap-container'"
      ]

      selectors.forEach(selector => {
        const element = document.querySelector(selector)
        if (element) element.remove()
      })
    `
  },
  seudinheiro: {
    url: /seudinheiro.com/,
    code: `
      document.querySelector('#premium-paywall').remove()
      document.body.style.overflow = ''
    `
  },
  superinteressante: {
    url: /super.abril.com.br/,
    code: ABRIL_CODE
  },
  valoreconomico: {
    url: /valor.globo.com/,
    code: `
      const element = document.querySelector('[class*="paywall"]');
      if (element)
        element.remove();
    `
  },
  veja: {
    url: /veja.abril.com.br/,
    code: ABRIL_CODE
  },
  jota: {
    url: /jota.info/,
    code: `
      document.getElementsByClassName('jota-paywall')[0].remove();
    `
  },
  observador: {
    url: /observador\.pt/,
    code: `
      document.querySelector('.piano-article-blocker').remove();
      document.querySelector('.article-body-wrapper').style.maxHeight = 'inherit';
      document.querySelector('.premium-article').classList.add('article-shown');
    `
  }
};

chrome.storage.local.get('sites', function(result) {
  for (let site in INJECTION) {
    let enabledSites = result.sites;
    if (enabledSites && enabledSites[site] == false)
      continue;
    if (INJECTION[site] == undefined)
      continue;

    if (INJECTION[site].url.test(document.location.host)) {
      var script = document.createElement('script');
      script.textContent = INJECTION[site].code;
      (document.head||document.documentElement).appendChild(script);
      script.parentNode.removeChild(script);
      break;
    }
  }
});
