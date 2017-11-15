// run_at: document_start
var code = null;

if (/([^\/].)?oglobo\.globo\.com/.test(document.location.host))
  code = 'paywallAtivo = false;';

else if (/www\.economist\.com/.test(document.location.host))
  code = 'document.cookie = "ec_limit=allow";';

else if (/foreignpolicy\.com/.test(document.location.host)) {
  code = `
    if (window.self === window.top) {
      var i = 0;
      var interval = window.setInterval(function() {
        i++;
        if (i == 10000) window.clearInterval(interval);

        var paywallBg = document.getElementById("paywall_bg");
        if (paywallBg !== null) {
          paywallBg.remove();
          document.body.classList.remove("overlay-no-scroll");
          document.body.style.overflow = "visible";
          document.documentElement.classList.remove("overlay-no-scroll");
          window.clearInterval(interval);
        }
      }, 500);
    }
  `;
}

else if (/folha.uol.com.br/.test(document.location.host)) {
  code = `
    omtrClickUOL = function(){};function showText() {\
      $("#bt-read-more-content").next().show();\
      $("#bt-read-more-content").next().show().prev().remove();\
    } \
    setTimeout(showText, 100);
  `;
}

else if (/ft.com/.test(document.location.host)) {
  code = `
    document.cookie = "";
    localStorage.clear();
    sessionStorage.clear();
    indexedDB.deleteDatabase("next-flags");
    indexedDB.deleteDatabase("next:ads");
  `;
}

else if (/gauchazh.clicrbs.com.br/.test(document.location.host)) {
  code = `
    function patchJs(jsurl) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var injectme = this.responseText;
          injectme = injectme.replace('e.showLoginPaywall,','false,');
          injectme = injectme.replace('e.showPaywall,','false,');
          injectme = injectme.replace('e.requestCPF||!1,','false,');
          injectme = injectme.replace('!e.showLoginPaywall&&!e.showPaywall||!1','true');
          var script = document.createElement("script");
          script.type = "text/javascript";
          var textNode = document.createTextNode(injectme);
          script.appendChild(textNode);
          document.head.appendChild(script);
        }
      };
      xhttp.open("GET", jsurl, true);
      xhttp.send();
    }
    document.addEventListener("DOMContentLoaded", function(event) {
      patchJs(document.getElementsByTagName('script')[1].src);
    });
  `;
}

if (code !== null) {
  var script = document.createElement('script');
  script.textContent = code;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}
