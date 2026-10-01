/*
  Form handler for the ride-request and contact forms (Formspree).

  Each handled form needs: data-ajax-form, an action pointing at its Formspree
  endpoint (public URL, safe to commit), and data-success="...".
  Recipient email addresses live ONLY in the Formspree dashboard, never here.

  Without JavaScript the form still posts to the action URL (native validation
  applies because we only add novalidate below).
*/
(function () {
  var PHONE_TEXT = '(803) 549-8920';
  var PHONE_HREF = 'tel:+18035498920';
  var TIMEOUT_MS = 15000;

  function fieldLabel(form, el) {
    var text = '';
    if (el.type === 'radio') {
      var legend = el.closest('fieldset') && el.closest('fieldset').querySelector('legend');
      text = legend ? legend.textContent : el.name;
    } else {
      var label = el.id && form.querySelector('label[for="' + el.id + '"]');
      text = label ? label.textContent : el.name;
    }
    return text.replace(/\*/g, '').replace(/\(optional\)/i, '').replace(/\s+/g, ' ').trim();
  }

  function showStatus(box, kind, build) {
    box.innerHTML = '';
    box.className = 'rounded-lg p-4 text-base ' + (kind === 'error'
      ? 'bg-red-50 border border-red-300 text-red-900'
      : 'bg-green-50 border border-green-300 text-green-900');
    build(box);
  }

  function callLink() {
    var a = document.createElement('a');
    a.href = PHONE_HREF;
    a.className = 'font-semibold underline';
    a.textContent = PHONE_TEXT;
    return a;
  }

  function setup(form) {
    form.noValidate = true;

    // Spam trap: real people never see or fill this field.
    var trap = document.createElement('input');
    trap.type = 'text';
    trap.name = '_gotcha';
    trap.tabIndex = -1;
    trap.autocomplete = 'off';
    trap.setAttribute('aria-hidden', 'true');
    trap.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;';
    form.appendChild(trap);

    var status = document.createElement('div');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.className = 'hidden';
    form.appendChild(status);

    var button = form.querySelector('button[type="submit"]');
    var buttonText = button ? button.textContent : '';
    var sending = false;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;

      // Validate required fields
      var missing = [];
      var firstBad = null;
      var seen = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || el.name === '_gotcha' || el.type === 'hidden') return;
        el.removeAttribute('aria-invalid');
        if (!el.required) return;
        var ok = el.type === 'radio'
          ? !!form.querySelector('input[name="' + el.name + '"]:checked')
          : el.value.trim() !== '';
        if (el.type === 'radio') {
          if (seen[el.name]) return;
          seen[el.name] = true;
        }
        if (!ok) {
          el.setAttribute('aria-invalid', 'true');
          missing.push(fieldLabel(form, el));
          firstBad = firstBad || el;
        }
      });
      var email = form.querySelector('input[type="email"]');
      if (email && email.value.trim() && !email.checkValidity()) {
        email.setAttribute('aria-invalid', 'true');
        missing.push('a valid email address (or leave it blank)');
        firstBad = firstBad || email;
      }
      if (missing.length) {
        showStatus(status, 'error', function (box) {
          box.textContent = 'Please check: ' + missing.join(', ') + '.';
        });
        firstBad.focus();
        return;
      }

      // Send
      sending = true;
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      status.className = 'hidden';

      var controller = window.AbortController ? new AbortController() : null;
      var timer = controller ? setTimeout(function () { controller.abort(); }, TIMEOUT_MS) : null;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
        signal: controller ? controller.signal : undefined
      }).then(function (res) {
        if (timer) clearTimeout(timer);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        // Replace the form fields with the confirmation so it can't be double-submitted.
        Array.prototype.slice.call(form.children).forEach(function (child) {
          if (child !== status) child.style.display = 'none';
        });
        showStatus(status, 'success', function (box) {
          box.textContent = form.getAttribute('data-success') || 'Thank you. Your request was sent.';
        });
        status.setAttribute('tabindex', '-1');
        status.focus();
      }).catch(function () {
        if (timer) clearTimeout(timer);
        sending = false;
        if (button) { button.disabled = false; button.textContent = buttonText; }
        showStatus(status, 'error', function (box) {
          box.appendChild(document.createTextNode('We could not send this just now, and nothing was received. Please call us at '));
          box.appendChild(callLink());
          box.appendChild(document.createTextNode(' or try again in a moment.'));
        });
      });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('form[data-ajax-form]'), setup);
})();
