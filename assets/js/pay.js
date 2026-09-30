/* Renders the payment options on pay.html from assets/js/payment-config.js.
   Only well-formed values are shown; anything else is ignored (never a broken or unsafe link). */
(function () {
  'use strict';
  var cfg = window.OCT_PAYMENT || {};
  var list = document.getElementById('pay-methods');
  var fallback = document.getElementById('pay-fallback');
  var status = document.getElementById('pay-status');
  if (!list) return;

  function clean(v) { return typeof v === 'string' ? v.trim() : ''; }

  function validZelle(v) {
    return /^[^\s@<>"']+@[^\s@<>"']+\.[A-Za-z]{2,}$/.test(v) ||
           /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v);
  }
  function validCashtag(v) { return /^\$?(?=[A-Za-z0-9]*[A-Za-z])[A-Za-z0-9]{1,20}$/.test(v); }
  function validSquare(v) {
    try {
      var u = new URL(v), h = u.hostname.toLowerCase();
      return u.protocol === 'https:' &&
        (h === 'square.link' || /\.squareup\.com$/.test(h) || /\.square\.site$/.test(h));
    } catch (e) { return false; }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  var BTN = 'inline-flex items-center justify-center min-h-[48px] px-5 rounded font-semibold transition-colors ';
  var BTN_PRIMARY = BTN + 'bg-accent-600 hover:bg-accent-500 text-white';
  var BTN_OUTLINE = BTN + 'border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white';

  function copyText(text) {
    function announce(msg) { if (status) status.textContent = msg; }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { announce('Copied to clipboard'); },
                                               function () { announce('Copy failed — please select and copy the text'); });
      return;
    }
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { announce(document.execCommand('copy') ? 'Copied to clipboard' : 'Copy failed — please select and copy the text'); }
    catch (e) { announce('Copy failed — please select and copy the text'); }
    document.body.removeChild(ta);
  }

  function copyButton(text, label) {
    var b = el('button', BTN_OUTLINE, 'Copy');
    b.type = 'button';
    b.setAttribute('aria-label', label);
    b.addEventListener('click', function () {
      copyText(text);
      b.textContent = 'Copied';
      setTimeout(function () { b.textContent = 'Copy'; }, 2000);
    });
    return b;
  }

  function card(title, blurb) {
    var c = el('article', 'bg-white rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col gap-4');
    c.appendChild(el('h3', 'text-xl font-bold text-primary-900', title));
    c.appendChild(el('p', 'text-neutral-600', blurb));
    return c;
  }

  function valueRow(text) {
    return el('p', 'font-mono text-lg font-semibold text-neutral-900 bg-neutral-100 rounded px-4 py-3 break-all', text);
  }

  var shown = 0;

  var zelle = clean(cfg.zelle);
  if (zelle && validZelle(zelle)) {
    var z = card('Zelle', 'In your bank\u2019s app, send the full amount to the address below. Put your name and ride date in the memo.');
    z.appendChild(valueRow(zelle));
    var zr = el('div', 'flex flex-wrap gap-3'); zr.appendChild(copyButton(zelle, 'Copy Zelle address'));
    z.appendChild(zr); list.appendChild(z); shown++;
  }

  var tag = clean(cfg.cashApp);
  if (tag && validCashtag(tag)) {
    if (tag.charAt(0) !== '$') tag = '$' + tag;
    var c = card('Cash App', 'Send the full amount to our $Cashtag. Put your name and ride date in the note.');
    c.appendChild(valueRow(tag));
    var cr = el('div', 'flex flex-wrap gap-3');
    var open = el('a', BTN_PRIMARY, 'Open Cash App');
    open.href = 'https://cash.app/' + encodeURIComponent(tag).replace('%24', '$');
    open.target = '_blank'; open.rel = 'noopener noreferrer';
    cr.appendChild(open); cr.appendChild(copyButton(tag, 'Copy Cash App cashtag'));
    c.appendChild(cr); list.appendChild(c); shown++;
  }

  var sq = clean(cfg.squareLink);
  if (sq && validSquare(sq)) {
    var s = card('Debit or credit card', 'Pay securely by card through Square \u2014 no app or account needed. Add your name and ride date when prompted.');
    var sr = el('div', 'flex flex-wrap gap-3');
    var pay = el('a', BTN_PRIMARY, 'Pay by card');
    pay.href = sq; pay.target = '_blank'; pay.rel = 'noopener noreferrer';
    sr.appendChild(pay); s.appendChild(sr); list.appendChild(s); shown++;
  }

  if (shown > 0) {
    list.classList.remove('hidden');
    if (fallback) fallback.classList.add('hidden');
  }
})();
