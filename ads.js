// Monetization rails: keep hidden unless explicitly activated
(function () {
  var cfg = (window.CALC_HQ_CONFIG || {});

  // Sponsor banner (optional)
  var sponsor = document.querySelector(".sponsor-banner");
  if (sponsor) {
    if (cfg.SPONSOR_ACTIVE && cfg.SPONSOR_TEXT) {
      sponsor.style.display = "flex";
      sponsor.setAttribute("aria-hidden", "false");
      var content = sponsor.querySelector(".sponsor-content");
      if (content) content.textContent = cfg.SPONSOR_TEXT;
      if (cfg.SPONSOR_HREF) sponsor.onclick = function () { window.location.href = cfg.SPONSOR_HREF; };
    } else {
      sponsor.style.display = "none";
      sponsor.setAttribute("aria-hidden", "true");
    }
  }

  function mountAd(containerId, slotId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    if (!cfg.ADS_ACTIVE || !slotId) {
      el.classList.add("is-off");
      return;
    }
    el.classList.remove("is-off");

    // Create the AdSense <ins> only when active (prevents blank space)
    var ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", cfg.ADSENSE_CLIENT);
    ins.setAttribute("data-ad-slot", slotId);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    el.appendChild(ins);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) { }

    // If no fill, collapse to avoid empty space
    setTimeout(function () {
      if (!el.querySelector("iframe")) el.classList.add("is-off");
    }, 1500);
  }

  mountAd("adTop", cfg.AD_SLOT_TOP);
  mountAd("adBottom", cfg.AD_SLOT_BOTTOM);
})();
