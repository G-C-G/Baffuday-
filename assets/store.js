// Tiny data layer. Demo mode (no DB_URL): localStorage + BroadcastChannel, same browser only.
// Live mode: Firebase Realtime Database over plain REST, polled every 2s.
(function () {
  var cfg = window.GCG_CONFIG || {};
  var base = (cfg.DB_URL || "").replace(/\/$/, "");
  var root = cfg.ROOT || "baffuday";
  var demo = !base;
  var KEY = "gcg-demo-" + root;
  var bc = null;
  try { bc = new BroadcastChannel(KEY); } catch (e) {}

  function readAll() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function writeAll(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} if (bc) bc.postMessage("x"); }
  function walk(o, path, create) {
    var parts = path.split("/").filter(Boolean), cur = o;
    for (var i = 0; i < parts.length; i++) {
      if (cur[parts[i]] == null || typeof cur[parts[i]] !== "object") { if (!create) return undefined; cur[parts[i]] = {}; }
      cur = cur[parts[i]];
    }
    return cur;
  }
  function split(path) { var p = path.split("/").filter(Boolean); return { parent: p.slice(0, -1).join("/"), leaf: p[p.length - 1] }; }
  function url(path) { return base + "/" + root + "/" + path.replace(/^\/|\/$/g, "") + ".json"; }
  function rest(method, path, body) {
    return fetch(url(path), { method: method, headers: { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) })
      .then(function (r) { if (!r.ok) throw new Error("DB " + r.status); return r.json(); });
  }
  function newId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  var store = {
    demo: demo,
    get: function (path) {
      if (!demo) return rest("GET", path);
      var all = readAll(); if (!path) return Promise.resolve(all);
      var s = split(path), p = walk(all, s.parent, false);
      return Promise.resolve(p && p[s.leaf] !== undefined ? p[s.leaf] : null);
    },
    set: function (path, val) {
      if (!demo) return rest("PUT", path, val);
      var all = readAll(), s = split(path), p = walk(all, s.parent, true);
      if (val === null) delete p[s.leaf]; else p[s.leaf] = val;
      writeAll(all); return Promise.resolve(val);
    },
    update: function (path, val) {
      if (!demo) return rest("PATCH", path, val);
      var all = readAll(), p = walk(all, path, true);
      Object.keys(val).forEach(function (k) { p[k] = val[k]; });
      writeAll(all); return Promise.resolve(val);
    },
    push: function (path, val) {
      var id = newId();
      return store.set(path + "/" + id, val).then(function () { return id; });
    },
    subscribe: function (path, cb) {
      var last = "\u0000";
      function run() {
        store.get(path).then(function (v) {
          var s = JSON.stringify(v);
          if (s !== last) { last = s; cb(v); }
        }).catch(function () {});
      }
      run();
      var t = setInterval(run, 2000);
      if (demo && bc) bc.onmessage = run;
      window.addEventListener("storage", run);
      return function () { clearInterval(t); };
    }
  };
  window.store = store;
})();
