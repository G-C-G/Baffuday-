// Guest answers as a PDF. The PDF is readable by people AND carries the answers as a code in its
// "Subject" field, so the host panel can import many PDFs at once. Needs assets/jspdf.umd.min.js (v2.5.1, MIT).
(function () {
  var TAG = "GCGDATA:";
  function enc(rec) { return btoa(unescape(encodeURIComponent(JSON.stringify(rec)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function dec(s) { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return JSON.parse(decodeURIComponent(escape(atob(s)))); }
  function ascii(s) { return String(s == null ? "" : s).replace(/[\u2013\u2014]/g, "-").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[^\x20-\x7E -ÿ]/g, "?"); }

  // rec: the guest record plus _id. Returns a jsPDF document.
  window.makeAnswersPdf = function (rec) {
    var J = window.jspdf.jsPDF, doc = new J({ unit: "mm", format: "a4" }), W = 210, M = 18, y = 22;
    var title = (window.GCG_CONFIG && window.GCG_CONFIG.TITLE) || "Game night";
    function need(h) { if (y + h > 285) { doc.addPage(); y = 22; } }
    function line(txt, size, bold, gap) {
      doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(size);
      doc.splitTextToSize(ascii(txt), W - 2 * M).forEach(function (l) { need(size * .5); doc.text(l, M, y); y += size * .45; });
      y += gap || 0;
    }
    doc.setFillColor(245, 215, 110); doc.rect(0, 0, W, 14, "F");
    doc.setTextColor(8, 24, 62); line(title + ": my answers", 18, true, 5);
    line("Name: " + rec.name, 12, true, 1);
    line("Karaoke song: " + rec.song, 12, false, 1);
    var sg = SING.filter(function (o) { return o.n === +rec.sing; })[0]; line("About performing it: " + (sg ? sg.label : "-"), 12, false, 5);
    line("What I'd rather do tonight", 13, true, 1);
    var lab = { want: "I'd rather do this", ok: "Either way", not: "I'd rather not" };
    INVOLVE.forEach(function (o) { line(o.label + ": " + lab[pref(rec, o.id)], 11, false, 0); }); y += 4;
    line("Hot takes", 13, true, 1);
    var any = false;
    TAKES.forEach(function (t) {
      var p = pick((rec.picks || {})[t.id]); if (!p) return; any = true;
      var sc = SCALE.filter(function (o) { return o.n === p.n; })[0];
      line(t.q + " " + (p.s === "agree" ? t.a : t.b) + "  (" + p.n + "/5, " + (sc ? sc.label : "") + ")", 11, false, 0);
    });
    if (!any) line("No picks.", 11, false, 0);
    y += 4; line("Food", 13, true, 1);
    line("Allergies: " + (rec.allergies || "none"), 11, false, 0);
    var d = Object.keys(rec.diet || {}); line("Diet: " + (d.length ? d.join(", ") : "none"), 11, false, 0);
    if (rec.other) line("Other: " + rec.other, 11, false, 0);
    doc.setFontSize(8); doc.setTextColor(90, 95, 110); doc.text("Send this PDF to the host. It contains your answers in a form the host's system can read.", M, 290);
    doc.setProperties({ title: title + " answers: " + ascii(rec.name), subject: TAG + enc(rec), creator: "Game night" });
    return doc;
  };
  window.answersFileName = function (rec) { return "answers-" + String(rec.name || "guest").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".pdf"; };

  // Read the answer record back out of a PDF file (File/Blob). Resolves to a record or null.
  window.readAnswersPdf = function (file) {
    return file.arrayBuffer().then(function (buf) {
      var bytes = new Uint8Array(buf), s = "", CH = 0x8000;
      for (var i = 0; i < bytes.length; i += CH) s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
      var m = new RegExp(TAG + "([A-Za-z0-9_-]+)").exec(s);
      if (!m) return null;
      try { return dec(m[1]); } catch (e) { return null; }
    });
  };
})();
