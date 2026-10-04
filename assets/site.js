// DIGRENO site: mobile nav, footer year, and the hero invoice's place-of-supply toggle.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---- Hero invoice: same state → CGST + SGST, other state → IGST (as the app decides it) ----
  var inv = document.getElementById("demo-invoice");
  if (!inv) return;
  var TAXABLE = 23500, RATE = 18;
  var BUYERS = {
    intra: { gstin: "27AAKCM7314P1ZU", addr: "Baner Road, Pune, Maharashtra", pos: "27 – Maharashtra" },
    inter: { gstin: "29AAKCM7314P1ZQ", addr: "Indiranagar, Bengaluru, Karnataka", pos: "29 – Karnataka" }
  };
  var inr = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var $ = function (id) { return document.getElementById(id); };

  function render(mode) {
    var b = BUYERS[mode], tax = TAXABLE * RATE / 100;
    $("buyer-gstin").textContent = b.gstin;
    $("buyer-addr").textContent = b.addr;
    $("inv-pos").textContent = b.pos;
    var rows = $("tax-rows");
    rows.innerHTML = "";
    var lines = mode === "intra"
      ? [["CGST @ 9%", tax / 2], ["SGST @ 9%", tax / 2]]
      : [["IGST @ 18%", tax]];
    lines.forEach(function (l) {
      var dt = document.createElement("dt"); dt.className = "tax-row"; dt.textContent = l[0];
      var dd = document.createElement("dd"); dd.className = "tax-row"; dd.textContent = inr.format(l[1]);
      rows.appendChild(dt); rows.appendChild(dd);
    });
    $("demo-explain").innerHTML = mode === "intra"
      ? "Seller and buyer are both in <b>Maharashtra</b>, so the tax splits into <b>CGST + SGST</b>."
      : "The buyer is in <b>Karnataka</b>, an inter-state supply, so the app charges <b>IGST</b>.";
    document.querySelectorAll("[data-pos]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-pos") === mode));
    });
  }
  document.querySelectorAll("[data-pos]").forEach(function (btn) {
    btn.addEventListener("click", function () { render(btn.getAttribute("data-pos")); });
  });
  render("intra");

  // Decorative UPI QR (not scannable) — fixed pattern with the three finder squares.
  var c = document.getElementById("upi-qr");
  if (c && c.getContext) {
    var n = 25, ctx = c.getContext("2d"), seed = 7;
    c.width = c.height = n;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, n, n); ctx.fillStyle = "#111827";
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    function finder(x, y) {
      ctx.fillRect(x, y, 7, 7); ctx.clearRect(x + 1, y + 1, 5, 5);
      ctx.fillStyle = "#fff"; ctx.fillRect(x + 1, y + 1, 5, 5); ctx.fillStyle = "#111827"; ctx.fillRect(x + 2, y + 2, 3, 3);
    }
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
      var inFinder = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
      if (!inFinder && rnd() > 0.52) ctx.fillRect(x, y, 1, 1);
    }
    finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
  }
})();
