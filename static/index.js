!function(n) {
    function e(o) {
        if (t[o]) return t[o].exports;
        var a = t[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return n[o].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports;
    }
    var t = {};
    return e.m = n, e.c = t, e.p = "", e(0);
}([ function(n, e, t) {
    t(1), n.exports = t(27);
}, function(n, e, t) {
    "use strict";
    !function() {
        var n = t(2), e = t(5), o = t(13), a = t(25), s = n.instance(), r = n.loader(s), i = o.new_manager(s);
        e.setup();
        var l = {
            brand_sel: "#index-brand",
            logout_sel: "#go-logout",
            oops_sel: "#navbar-oops",
            language_sel: "#display-language",
            about_sel: "#about-version",
            account_sel: "#go-account",
            user_sel: "#content-user-name",
            credential_sel: "#credential-authorize",
            default_title: "Cockpit"
        };
        a.machines_index(l, s, r, i);
    }();
}, function(n, e, t) {
    "use strict";
    !function() {
        function e(n) {
            return u + "/" + n;
        }
        function o() {
            function n(n) {
                n.key === d && n.storageArea === window.sessionStorage && o(JSON.parse(n.newValue));
            }
            function t(n, e, t) {
                var o, a = s.extend({}, e || {}, t || {});
                for (o in a) n[o] !== a[o] && (n[o] = a[o]);
                for (o in n) n[o] !== a[o] && delete n[o];
                return n;
            }
            function o(n, e) {
                if (n) {
                    var o = !h.ready;
                    h.ready = !0, g = n, m = null, e && !b && (b = window.setTimeout(function() {
                        b = null, window.sessionStorage.setItem(d, JSON.stringify(g));
                    }, 10));
                    var a, i = {}, l = n.content || {}, c = n.overlay || {};
                    for (a in l) i[a] = !0;
                    for (a in c) i[a] = !0;
                    var u, f, p = [];
                    for (a in i) {
                        var w = v[a] || {}, y = w.connection_string;
                        l[a] && l[a].color && c[a] && delete c[a].color, u = t(w, l[a], c[a]), u.key = a, 
                        u.address || (u.address = a), u.connection_string = h.generate_connection_string(u.user, u.port, u.address), 
                        u.label || ("localhost" == a || "localhost.localdomain" == a ? (f = r.transport.application(), 
                        0 === f.indexOf("cockpit+=") ? u.label = f.replace("cockpit+=", "") : u.label = window.location.hostname) : u.label = a), 
                        u.avatar || (u.avatar = "../shell/images/server-small.png"), p.push([ a in v ? "updated" : "added", [ u, a, y ] ]), 
                        v[a] = u;
                    }
                    for (a in v) a in i || (u = v[a], delete v[a], delete c[a], p.push([ "removed", [ u, a ] ]));
                    var _, k = s(h), x = p.length;
                    for (_ = 0; _ < x; _++) k.triggerHandler(p[_][0], p[_][1]);
                    o && s(h).triggerHandler("ready");
                }
            }
            function a(n, t, o) {
                var a = e(t), i = s.extend({}, n, o);
                return window.sessionStorage.setItem(a, JSON.stringify(i)), h.overlay(t, o), r.when([]);
            }
            function u(n, e) {
                function t(t) {
                    t || (t = {});
                    var o = t[n];
                    return o || (o = t[n] = {}), p(o, e), t;
                }
                var o = r.file(l, {
                    syntax: JSON,
                    superuser: "try"
                }), a = o.modify(t, g.content, g.tag).done(function(t, o) {
                    var a, s = {};
                    for (a in e) s[a] = null;
                    h.data(t, o), h.overlay(n, s);
                }).always(function() {
                    o.close();
                });
                return a;
            }
            function f(n) {
                var e, t, o = i.colors.parse(n);
                for (e in v) if (t = v[e], t.color && i.colors.parse(t.color) == o) return !0;
                return !1;
            }
            function p(n, e) {
                for (var t in e) null === e[t] ? delete n[t] : n[t] = e[t];
            }
            var h = this, m = null;
            h.ready = !1;
            var v = {}, g = {
                content: null,
                tag: null,
                overlay: {
                    localhost: {
                        visible: !0,
                        manifests: r.manifests
                    }
                }
            };
            window.addEventListener("storage", n), window.setTimeout(function() {
                var n = window.sessionStorage.getItem(d);
                !h.ready && n && o(JSON.parse(n));
            });
            var b = null;
            h.add_key = function(n) {
                var e = r.file(c, {
                    superuser: "try"
                });
                return e.modify(function(e) {
                    return e || (e = ""), e + "\n" + n;
                }).always(function() {
                    e.close();
                });
            }, h.add = function(n, e) {
                var t = h.split_connection_string(n), o = t.address;
                t = s.extend({
                    visible: !0,
                    color: e || h.unused_color()
                }, t);
                var a = h.lookup(o);
                return a && (a.on_disk = !0), h.change(t.address, t);
            }, h.unused_color = function() {
                var n, e = i.colors.length;
                for (n = 0; n < e; n++) if (!f(i.colors[n])) return i.colors[n];
                return "gray";
            }, h.change = function(n, e) {
                var t, o, s, i = h.lookup(n);
                if (e.label) {
                    var l = n;
                    i && (l = i.connection_string), i && i.label === e.label || (o = r.dbus("org.freedesktop.hostname1", {
                        host: l
                    }), s = o.call("/org/freedesktop/hostname1", "org.freedesktop.hostname1", "SetPrettyHostname", [ e.label, !0 ]).always(function() {
                        o.close();
                    }).fail(function(n) {
                        console.warn("couldn't set pretty host name: " + n);
                    }));
                }
                return t = i && !i.on_disk ? a(i, n, e) : u(n, e), s ? r.all(s, t) : t;
            }, h.data = function(n, e) {
                var t, a = {};
                for (t in n) a[t] = s.extend({}, g.overlay[t] || {}), p(a[t], {
                    on_disk: !0
                });
                for (t in v) n && !n[t] && (a[t] = s.extend({}, g.overlay[t] || {}), p(a[t], {
                    on_disk: null
                }));
                o({
                    content: n,
                    tag: e,
                    overlay: s.extend({}, g.overlay, a)
                }, !0);
            }, h.overlay = function(n, e) {
                var t = {};
                t[n] = s.extend({}, g.overlay[n] || {}), p(t[n], e), o({
                    content: g.content,
                    tag: g.tag,
                    overlay: s.extend({}, g.overlay, t)
                }, !0);
            }, Object.defineProperty(h, "list", {
                enumerable: !0,
                get: function() {
                    var n;
                    if (!m) {
                        m = [];
                        for (n in v) v[n].visible && m.push(v[n]);
                        m.sort(function(n, e) {
                            return n.label.localeCompare(e.label);
                        });
                    }
                    return m;
                }
            }), Object.defineProperty(h, "addresses", {
                enumerable: !0,
                get: function() {
                    return Object.keys(v);
                }
            }), h.lookup = function(n) {
                var e = h.split_connection_string(n);
                return v[e.address || "localhost"] || null;
            }, h.generate_connection_string = function(n, e, t) {
                var o = t;
                return n && (o = n + "@" + o), e && (o = o + ":" + e), o;
            }, h.split_connection_string = function(n) {
                var e = {}, t = -1, o = -1;
                if (n && (t = n.lastIndexOf("@"), o = n.lastIndexOf(":")), t > 0 && (e.user = n.substring(0, t), 
                n = n.substring(t + 1), o = n.lastIndexOf(":")), o > -1) {
                    var a = parseInt(n.substring(o + 1), 10);
                    isNaN(a) || (e.port = a, n = n.substring(0, o));
                }
                return e.address = n, e;
            }, h.close = function() {
                window.removeEventListener("storage", n);
            };
        }
        function a(n, e) {
            function t(e, t) {
                var o, a, s, r = e.split("/");
                r[0] == u && 2 === r.length && (o = r[1], t && (a = JSON.parse(t), s = n.lookup(o), 
                s && s.on_disk ? s.visible || n.change(o, {
                    visible: !0
                }) : n.overlay(o, a), p.connect(o)));
            }
            function o() {
                var n;
                for (h = !0, n = 0; n < window.sessionStorage.length; n++) {
                    var e = window.sessionStorage.key(n);
                    t(e, window.sessionStorage.getItem(e));
                }
            }
            function a(n) {
                n.storageArea === window.sessionStorage && t(n.key || "", n.newValue);
            }
            function i(e, t, o) {
                var a = {
                    state: t,
                    problem: o
                };
                "connected" == t ? a.restarting = !1 : o && (a.manifests = null, a.checksum = null), 
                n.overlay(e, a);
            }
            function c(e, t, o, a) {
                if (t || (t = n.lookup(o))) {
                    var i = v[o];
                    i && i.valid || (i = {});
                    var l = {};
                    t.color || (l.color = n.unused_color());
                    var c = i.PrettyHostname || i.StaticHostname;
                    c && c !== t.label && (l.label = c);
                    var d = i.OperatingSystemPrettyName;
                    d && d != t.os && (l.os = i.OperatingSystemPrettyName), s.isEmptyObject(l) || n.overlay(o, l), 
                    t.visible ? a && t.connection_string != a ? (r.kill(a), p.disconnect(o), p.connect(o)) : t.problem || p.connect(o) : p.disconnect(o);
                }
            }
            function d(n, e, t) {
                p.disconnect(t);
            }
            var f, p = this, h = !1, m = {}, v = {};
            window.addEventListener("storage", a), s(n).on("added", c), s(n).on("updated", c), 
            s(n).on("removed", d), p.connect = function(e) {
                function t() {
                    !g && b ? i(e, "connected", null) : w || i(e, "connecting", null);
                }
                function o() {
                    g = s.ajax({
                        url: f,
                        dataType: "json",
                        cache: !0
                    }).done(function(t) {
                        var o = {
                            manifests: t
                        }, a = g.getResponseHeader("ETag");
                        a && (o.checksum = a.replace(/^"(.+)"$/, "$1")), n.overlay(e, o);
                    }).fail(function(n) {
                        console.warn("failed to load manifests from " + l.connection_string + ": " + n);
                    }).always(function() {
                        g = null, t();
                    });
                }
                function a() {
                    if (!l.static_hostname) {
                        var n = r.dbus("org.freedesktop.hostname1", {
                            host: l.connection_string
                        }).proxy();
                        v[e] = n, n.wait(function() {
                            s(n).on("changed", function() {
                                c(null, null, e);
                            }), c(null, null, e);
                        });
                    }
                }
                var l = n.lookup(e);
                if (l) {
                    var d = m[e];
                    if (!d) {
                        var u = {
                            host: l.connection_string,
                            payload: "echo"
                        };
                        !l.on_disk && l.host_key && (u["temp-session"] = !1, u.session = "shared", u["host-key"] = l.host_key), 
                        d = r.channel(u), m[e] = d;
                        var f, h = "localhost" === e, g = null, b = h, w = null;
                        l.manifests || (f = l.checksum ? "../../" + l.checksum + "/manifests.json" : "../../@" + encodeURI(l.connection_string) + "/manifests.json"), 
                        h ? f && (o(), a()) : (d.send("x"), s(d).on("message", function() {
                            b = !0, f && o(), a(), t();
                        }).on("close", function(t, o) {
                            w = o.problem || "disconnected", b = !1, i(e, "failed", w);
                            var a = n.lookup(e);
                            a && a.restarting && window.setTimeout(function() {
                                p.connect(e);
                            }, 1e4), p.disconnect(e);
                        })), t();
                    }
                }
            }, p.disconnect = function(n) {
                if ("localhost" !== n) {
                    var e = m[n];
                    delete m[n], e && (e.close(), s(e).off());
                    var t = v[n];
                    delete v[n], t && (t.client.close(), s(t).off());
                }
            }, p.expect_restart = function(e) {
                var t = n.split_connection_string(e);
                n.overlay(t.address, {
                    restarting: !0,
                    problem: null
                });
            }, p.close = function() {
                s(n).off("added", c), s(n).off("changed", c), s(n).off("removed", d), n = null, 
                f && f.close(), f = null, window.removeEventListener("storage", a);
                var e = Object.keys(m);
                e.forEach(p.disconnect);
            }, e ? (o(), n.data({})) : (f = r.file(l, {
                syntax: JSON
            }), f.watch(function(e, t, a) {
                a && console.warn("couldn't load machines data: " + a), n.data(e, t), h || o();
            }));
        }
        var s = t(3), r = t(4), i = {}, l = "/var/lib/cockpit/machines.json", c = "/var/lib/cockpit/known_hosts", d = r.sessionStorage.prefixedKey("v2-machines.json"), u = r.sessionStorage.prefixedKey("v1-session-machine");
        i.instance = function(n) {
            return new o();
        }, i.loader = function(n, e) {
            return new a(n, e);
        }, i.colors = [ "#0099d3", "#67d300", "#d39e00", "#d3007c", "#00d39f", "#00d1d3", "#00618a", "#4c8a00", "#8a6600", "#9b005b", "#008a55", "#008a8a", "#00b9ff", "#7dff00", "#ffbe00", "#ff0096", "#00ffc0", "#00fdff", "#023448", "#264802", "#483602", "#590034", "#024830", "#024848" ], 
        i.colors.parse = function(n) {
            var e = document.createElement("div");
            e.style.color = n;
            var t = window.getComputedStyle(e, null);
            return t.getPropertyValue("color") || e.style.color;
        }, i.known_hosts_path = c, r.transport.wait(function() {
            var n = r.transport.options.capabilities || [];
            i.allow_connection_string = s.inArray("connection-string", n) != -1, i.has_auth_results = s.inArray("auth-method-results", n) != -1;
        }), n.exports = i;
    }();
}, function(n, e) {
    n.exports = jQuery;
}, function(n, e) {
    n.exports = cockpit;
}, function(n, e, t) {
    (function(e) {
        "use strict";
        !function() {
            function e() {
                function n() {
                    null === c && (c = s.channel({
                        payload: "fslist1",
                        path: l.path
                    }), a(c).on("close", function(n, e) {
                        a(c).off(), e.problem && "not-found" != e.problem ? (console.warn("couldn't watch " + l.path + ": " + (e.message || e.problem)), 
                        c = !1) : c = null;
                    }).on("message", function(e, t) {
                        var o = JSON.parse(t), a = o.path;
                        a && a.indexOf("/") === -1 && ".pub" === a.slice(-4) && ("present" !== o.event && "created" !== o.event && "changed" !== o.event && "deleted" !== o.event || (window.clearInterval(u), 
                        u = window.setTimeout(n, 100)));
                    })), d || (window.clearTimeout(u), u = null, d = s.script(r, [ l.path ], {
                        err: "message"
                    }).always(function() {
                        d = null, u || (u = window.setTimeout(n, 5e3));
                    }).done(function(n) {
                        e(n);
                    }).fail(function(n) {
                        console.warn("failed to list keys in home directory: " + n.message);
                    }));
                }
                function e(n) {
                    var e, s = n.split("\v"), r = {};
                    s[0].trim().split("\n").forEach(function(n) {
                        e = t(n, r), e && (e.loaded = !0);
                    }), s.slice(1).forEach(function(n, a) {
                        switch (a % 3) {
                          case 0:
                            e = t(n, r);
                            break;

                          case 1:
                            e && (n = n.trim(), ".pub" === n.slice(-4) ? e.name = n.slice(0, -4) : e.name = n);
                            break;

                          case 2:
                            e && o(n, e);
                        }
                    }), l.items = r, a(l).triggerHandler("changed");
                }
                function t(n, e) {
                    var t, o, a, s = n.trim().split(" ");
                    if (isNaN(parseInt(s[0], 10))) if (0 === s[0].indexOf("ssh-")) t = s[1], o = s[0].substring(4).toUpperCase(), 
                    a = s.slice(2).join(" "); else {
                        if (0 !== s[0].indexOf("ecdsa-")) return;
                        t = s[1], o = "ECDSA", a = s.slice(2).join(" ");
                    } else t = s[2], o = "RSA1", a = s.slice(3).join(" ");
                    var r = e[t];
                    return r || (r = e[t] = {}), r.type = o, r.comment = a, r.data = n, r;
                }
                function o(n, e) {
                    var t = n.trim().split(" ");
                    e.size = parseInt(t[0], 10), isNaN(e.size) && (e.size = null), e.fingerprint = t[1];
                }
                var l = this;
                l.path = null, l.items = {};
                var c = null, d = null, u = null;
                s.user().done(function(e) {
                    l.path = e.home + "/.ssh", n();
                }), l.change = function(n, e, t, o) {
                    var r, c = [ /.*Enter old passphrase: $/ ], d = [ /.*Enter new passphrase.*/, /.*Enter same passphrase again: $/ ], u = [ /.*failed: passphrase is too short.*/ ], f = a.Deferred(), p = "", h = !1, m = i("No such file or directory");
                    if (t !== o) return f.reject(new Error(i("The passwords do not match."))), f.promise();
                    var v, g = window.setTimeout(function() {
                        m = i("Prompting via ssh-keygen timed out"), v.close("terminated");
                    }, 1e4);
                    return v = s.spawn([ "ssh-keygen", "-p", "-f", n ], {
                        pty: !0,
                        environ: [ "LC_ALL=C" ],
                        err: "out",
                        directory: l.path
                    }).always(function() {
                        window.clearInterval(g);
                    }).done(function() {
                        f.resolve();
                    }).fail(function(n) {
                        "ProcessError" == n.constructor.name && (n = new Error(m)), f.reject(n);
                    }).stream(function(n) {
                        for (p += n, r = 0; r < c.length; r++) if (c[r].test(p)) return p = "", m = i("Old password not accepted"), 
                        void this.input(e + "\n", !0);
                        for (r = 0; r < d.length; r++) if (d[r].test(p)) return p = "", this.input(t + "\n", !0), 
                        m = i("Failed to change password"), void (h = !0);
                        for (r = 0; h && r < u.length; r++) if (u[r].test(p)) return void (m = i("New password was not accepted"));
                    }), f.promise();
                }, l.load = function(e, t) {
                    var o, r = /.*Enter passphrase for .*/, c = /.*UNPROTECTED PRIVATE KEY FILE.*/, d = /.*Bad passphrase.*/, u = a.Deferred(), f = "", p = "", h = i("Not a valid private key"), m = window.setTimeout(function() {
                        h = i("Prompting via ssh-add timed out"), o.close("terminated");
                    }, 1e4);
                    return o = s.spawn([ "ssh-add", e ], {
                        pty: !0,
                        environ: [ "LC_ALL=C" ],
                        err: "out",
                        directory: l.path
                    }).always(function() {
                        window.clearInterval(m);
                    }).done(function() {
                        n(), u.resolve();
                    }).fail(function(n) {
                        console.log(p), "ProcessError" == n.constructor.name && (n = new Error(h)), u.reject(n);
                    }).stream(function(n) {
                        f += n, p += n, c.test(f) ? (h = i("Invalid file permissions"), f = "") : r.test(f) ? (f = "", 
                        h = i("Password not accepted"), this.input(t + "\n", !0)) : d.test(f) && (f = "", 
                        this.input("\n", !0));
                    }), u.promise();
                }, l.unload = function(e) {
                    return s.spawn([ "ssh-add", "-d", e ], {
                        pty: !0,
                        err: "message",
                        directory: l.path
                    }).done(n);
                }, l.close = function() {
                    c && c.close(), d && d.close(), window.clearTimeout(u), u = null;
                };
            }
            function o() {
                var n;
                a("#credential-authorize button").on("click", function(n) {
                    s.drop_privileges(!1), n.preventDefault();
                }), a("#credentials-dialog").on("click", "tr.listing-ct-item", function(n) {
                    var e;
                    0 === a(n.target).parents(".listing-ct-actions, ul").length && (e = a(n.target).parents("tbody"), 
                    e.toggleClass("open").removeClass("unlock"), e.find(".alert").hide());
                }).on("mouseenter", ".listing-ct-item", function(n) {
                    a(n.target).parents("tbody").find(".listing-ct-item").addClass("highlight-ct");
                }).on("mouseleave", ".listing-ct-item", function(n) {
                    a(n.target).parents("tbody").find(".listing-ct-item").removeClass("highlight-ct");
                }).on("change", ".btn-group", function(e) {
                    var t = a(this).parents("tbody"), o = t.attr("data-id"), s = n.items[o];
                    if (s && s.name) {
                        var r = a(this).onoff("value");
                        r && !s.loaded ? t.addClass("open").addClass("unlock") : !r && s.loaded && n.unload(s.name).done(function(n) {
                            t.removeClass("open");
                        }).fail(function(n) {
                            t.addClass("open").removeClass("unlock"), t.find(".alert").show().find(".credential-alert").text(n.message);
                        });
                    }
                }).on("click", ".credential-unlock button", function(e) {
                    var t = a(this).parents("tbody"), o = t.attr("data-id"), s = n.items[o];
                    if (s && s.name) {
                        t.find("input button").prop("disabled", !0);
                        var r = t.find(".credential-password").val();
                        n.load(s.name, r).always(function(n) {
                            t.find("input button").prop("disabled", !1);
                        }).done(function(n) {
                            t.find(".credential-password").val(""), t.removeClass("unlock"), t.find(".alert").hide();
                        }).fail(function(n) {
                            t.find(".alert").show().find("span").text(n.message), console.warn("loading key failed: ", n.message);
                        });
                    }
                }).on("click", ".credential-change", function(e) {
                    var t = a(this).parents("tbody"), o = t.attr("data-id"), s = n.items[o];
                    if (s && s.name) {
                        t.find("input button").prop("disabled", !0);
                        var r = t.find(".credential-old").val(), i = t.find(".credential-new").val(), l = t.find(".credential-two").val();
                        if (void 0 === r || void 0 === i || void 0 === l) throw "invalid password fields";
                        n.change(s.name, r, i, l).always(function(n) {
                            t.find("input button").prop("disabled", !1);
                        }).done(function() {
                            t.find(".credential-old").val(""), t.find(".credential-new").val(""), t.find(".credential-two").val(""), 
                            t.find("li a").first().click();
                        }).fail(function(n) {
                            t.find(".alert").show().find("span").text(n.message);
                        });
                    }
                }).on("change keypress", "input", function(n) {
                    var e = a(this).parents("tbody");
                    "keypress" == n.type && 13 == n.keyCode && a(this).parents("dl").find(".btn-primary").click(), 
                    e.find(".alert").hide();
                }).on("click", "tr.credential-panel ul > li > a", function() {
                    var n = a(this).parent(), e = n.index();
                    n.parent().children().removeClass("active"), n.addClass("active");
                    var t = a(this).parents("tbody");
                    t.find(".credential-tab").hide().eq(e).show(), t.find(".alert").hide();
                }).on("click", "[data-toggle='popover']", function() {
                    a(this).popover("toggle");
                }).on("hide.bs.modal", function() {
                    n && (a(n).off(), n.close(), n = null);
                }).on("show.bs.modal", function() {
                    n = new e(), a("#credential-keys").toggleClass("hidden", a.isEmptyObject(n.items)), 
                    a(n).on("changed", function() {
                        function e(n, e, t) {
                            var o = n.find(e);
                            t = t || "", o.text() !== t && o.text(t);
                        }
                        var t, o, s, r = {}, i = a("#credentials-dialog table.credential-listing");
                        i.find("tbody[data-id]").each(function(n, e) {
                            s = a(e), r[s.attr("data-id")] = s;
                        });
                        var l = i.find("tbody").first();
                        for (o in n.items) o in r || (s = r[o] = l.clone(), s.attr("data-id", o).show().onoff(), 
                        i.append(s));
                        for (o in r) s = r[o], t = n.items[o], t ? (e(s, ".credential-label", t.name || t.comment), 
                        e(s, ".credential-type", t.type), e(s, ".credential-fingerprint", t.fingerprint), 
                        e(s, ".credential-comment", t.comment), e(s, ".credential-data", t.data), s.attr("data-name", t.name).attr("data-loaded", t.loaded ? "1" : "0").find(".btn-onoff-ct").onoff("value", t.loaded || s.hasClass("unlock")).onoff("disabled", !t.name)) : s.remove(), 
                        a("#credential-keys").toggleClass("hidden", a.isEmptyObject(n.items));
                    });
                });
            }
            var a = t(3), s = t(4);
            t(7), t(11);
            var r = t(12), i = s.gettext;
            n.exports = {
                keys_instance: function() {
                    return new e();
                },
                setup: o
            };
        }();
    }).call(e, t(6));
}, function(n, e) {
    "use strict";
    function t() {
        throw new Error("setTimeout has not been defined");
    }
    function o() {
        throw new Error("clearTimeout has not been defined");
    }
    function a(n) {
        if (d === setTimeout) return setTimeout(n, 0);
        if ((d === t || !d) && setTimeout) return d = setTimeout, setTimeout(n, 0);
        try {
            return d(n, 0);
        } catch (e) {
            try {
                return d.call(null, n, 0);
            } catch (e) {
                return d.call(this, n, 0);
            }
        }
    }
    function s(n) {
        if (u === clearTimeout) return clearTimeout(n);
        if ((u === o || !u) && clearTimeout) return u = clearTimeout, clearTimeout(n);
        try {
            return u(n);
        } catch (e) {
            try {
                return u.call(null, n);
            } catch (e) {
                return u.call(this, n);
            }
        }
    }
    function r() {
        m && p && (m = !1, p.length ? h = p.concat(h) : v = -1, h.length && i());
    }
    function i() {
        if (!m) {
            var n = a(r);
            m = !0;
            for (var e = h.length; e; ) {
                for (p = h, h = []; ++v < e; ) p && p[v].run();
                v = -1, e = h.length;
            }
            p = null, m = !1, s(n);
        }
    }
    function l(n, e) {
        this.fun = n, this.array = e;
    }
    function c() {}
    var d, u, f = n.exports = {};
    !function() {
        try {
            d = "function" == typeof setTimeout ? setTimeout : t;
        } catch (n) {
            d = t;
        }
        try {
            u = "function" == typeof clearTimeout ? clearTimeout : o;
        } catch (n) {
            u = o;
        }
    }();
    var p, h = [], m = !1, v = -1;
    f.nextTick = function(n) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
        h.push(new l(n, e)), 1 !== h.length || m || a(i);
    }, l.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", 
    f.versions = {}, f.on = c, f.addListener = c, f.once = c, f.off = c, f.removeListener = c, 
    f.removeAllListeners = c, f.emit = c, f.binding = function(n) {
        throw new Error("process.binding is not supported");
    }, f.cwd = function() {
        return "/";
    }, f.chdir = function(n) {
        throw new Error("process.chdir is not supported");
    }, f.umask = function() {
        return 0;
    };
}, function(n, e) {}, , , , function(n, e, t) {
    "use strict";
    !function() {
        function n() {
            return w += 1, "unique" + -new Date() + -w;
        }
        function e(n) {
            n.find(".dialog-error").remove(), n.find(".has-error").removeClass("has-error"), 
            n.find(".dialog-wrapper").off(".dialog-error"), n.off(".dialog-error");
        }
        function o(n, e) {
            var t, o, a = n.parent();
            a.is(".dialog-wrapper") || (a = g("<div class='dialog-wrapper'>").insertBefore(n), 
            t = n.next(), t.is(".bootstrap-select") && t.selectpicker && (t.remove(), o = t.selectpicker), 
            n.remove().appendTo(a), o && o.call(n));
            var s;
            e.message && (s = g("<div class='dialog-error help-block'>").text(e.message)), a.addClass("has-error").append(s), 
            a.hasClass("error-keep") || a.on("keypress.dialog-error change.dialog-error", function() {
                a.removeClass("has-error").find(".dialog-error.help-block").css("visibility", "hidden");
            });
        }
        function a(n, e) {
            var t = g("<div class='alert alert-danger dialog-error'>"), o = e.message || e.toString();
            t.text(o), g("<span class='fa fa-exclamation-triangle'>").prependTo(t), console.warn(o);
            var a = n.find(".modal-footer");
            a.length ? t.prependTo(a) : t.appendTo(n);
        }
        function s(n, t) {
            e(n), 1 == t.length && g.isArray(t[0]) && (t = t[0]);
            var s = !1;
            t.forEach(function(e) {
                var t;
                e && (t = n.find(e.target), t && t.length ? o(t, e) : a(n, e), s = !0);
            }), s && n.on("show.bs.modal.dialog-error", function() {
                e(n);
            });
        }
        function r(n, e) {
            this.promise = n, this.disabled = [], this.handle = e;
        }
        function i(n) {
            var e = n.data("dialog-wait");
            n.data("dialog-wait", null), n.find(".dialog-wait-ct").remove(), n.find(".btn").off(".dialog-wait"), 
            n.off(".dialog-wait"), e && e.disabled.forEach(function(n) {
                n.removeAttr("disabled");
            });
        }
        function l(n, e, t) {
            function o() {
                var t, o = n.data("dialog-wait");
                o && o.promise === e && (i(n), t = e.state(), f || "resolved" == t && o.handle ? n.modal("hide") : "rejected" == t && o.handle && s(n, [ arguments[0] ]));
            }
            function a(t) {
                var o = n.data("dialog-wait");
                o && o.promise === e && ("string" != typeof t && (t = ""), c.text(t));
            }
            if (i(n), !e) return t && n.modal("hide"), n;
            t && s(n, []);
            var l = g("<div class='dialog-wait-ct pull-left'>");
            g("<div class='spinner spinner-sm'>").appendTo(l);
            var c = g("<span>").appendTo(l);
            n.find(".modal-footer button").first().before(l);
            var d = new r(e, t);
            n.data("dialog-wait", d);
            var u = e.cancel || e.close, f = !1, p = n.find(".form-control").add(".btn", n);
            return u && (p = p.not("[data-dismiss]").not(".btn-cancel")), p.each(function() {
                var n = g(this);
                n.attr("disabled") || (d.disabled.push(n), n.attr("disabled", "disabled"));
            }), n.find(".btn[data-dismiss], .btn-cancel").on("click.dialog-wait", function() {
                return f = !0, u && u.apply(e), !1;
            }), n.on("hide.bs.modal.dialog-wait", function() {
                i(n);
            }), e.always(o).progress(a), n;
        }
        function c(e) {
            var t = b.gettext || function(n) {
                return n;
            };
            return e = e.find(".btn-onoff-ct").andSelf().filter(".btn-onoff-ct"), e.each(function(e, o) {
                var a, s, r, i = g(o).attr("data-toggle", "buttons").addClass("btn-group"), l = i.onoff("value"), c = i.find(".btn"), d = i.find("input").first().attr("name") || n();
                for (a = c.length; a < 2; a++) s = g('<input type="radio" autocomplete="off">'), 
                r = document.createTextNode(t(0 === a ? "On" : "Off")), i.append(g('<label class="btn">').append(s, r)), 
                c = null;
                c = c || i.find(".btn"), c.find("input").attr("name", d), u(i, !!l);
            }), e;
        }
        function d(n) {
            return n.find(".btn").first().hasClass("active");
        }
        function u(n, e) {
            return n.each(function(n, t) {
                var o = g(t).find(".btn");
                o.first().toggleClass("active", !!e).find("input").prop("checked", !!e), o.last().toggleClass("active", !e).find("input").prop("checked", !e);
            });
        }
        function f(n, e, t, o) {
            var a = 0;
            o > t ? a = 1 : o < 0 || isNaN(o) ? a = 0 : !isNaN(t) && t > 0 && o >= 0 && (a = o / t), 
            g(e).css("width", 100 * a + "%").next("div").css("margin-left", g(e).css("width")), 
            n.value = a;
        }
        function p(n) {
            f(n, g(n).children("div.slider-bar").first()[0], 1, n.value);
        }
        function h(n) {
            g(n).toggleClass("slider-warning", n.offsetWidth < n.scrollWidth);
        }
        function m(n) {
            g(n).attr("unselectable", "on"), Object.defineProperty(n, "value", {
                get: function() {
                    return parseFloat(this.getAttribute("value"));
                },
                set: function(n) {
                    var e = String(n);
                    e != this.getAttribute("value") && this.setAttribute("value", n);
                }
            }), Object.defineProperty(n, "disabled", {
                get: function() {
                    return !!this.hasAttribute("disabled") && "false" != this.getAttribute("disabled").toLowerCase();
                },
                set: function(n) {
                    this.setAttribute("disabled", n ? "true" : "false");
                }
            }), p(n), h(n), g(n).on("change", function() {
                p(n), g(n).toggleClass("slider-disabled", n.disabled);
            }), n.disabled && g(n).addClass("slider-disabled"), g(n).on("mousedown", function(e) {
                if (n.disabled) return !0;
                var t, o = g(n).offset().left;
                if (g(e.target).hasClass("slider-thumb")) {
                    var a = e.offsetX || e.clientX - g(e.target).offset().left;
                    o += a - g(e.target).outerWidth() / 2, t = g(e.target).parent()[0];
                } else t = g(n).children("div.slider-bar").first()[0], f(n, t, g(n).width(), e.pageX - o), 
                g(n).trigger("change", [ n.value ]), h(n);
                return g(document).on("mousemove.slider", function(e) {
                    return f(n, t, g(n).width(), e.pageX - o), g(n).trigger("change", [ n.value ]), 
                    h(n), !1;
                }).on("mouseup.slider", function(n) {
                    return g(document).off("mousemove.slider").off("mouseup.slider"), !1;
                }), !1;
            });
        }
        function v() {
            g("div.slider").each(function() {
                m(this);
            });
        }
        var g = t(3), b = t(4), w = 0;
        g.fn.dialog = function(n) {
            return "failure" === n ? s(this, Array.prototype.slice.call(arguments, 1)) : "wait" === n ? l(this, arguments[1]) : "promise" === n ? l(this, arguments[1], !0) : void console.warn("unknown dialog action: " + n);
        }, window.addEventListener("hashchange", function() {
            g(".modal").modal("hide");
        }), g.fn.onoff = function(n) {
            return 0 === arguments.length || "refresh" == n ? c(this) : "value" === n ? 1 === arguments.length ? d(this) : u(this, arguments[1]) : "disabled" == n ? this.find(".btn").toggleClass("disabled", arguments[1]) : void console.warn("unknown switch action: " + n);
        }, g.fn.slider = function(n) {
            var e = this;
            return 0 === arguments.length || "refresh" == n ? (e.each(function() {
                m(this);
            }), e) : void console.warn("unknown slider action: " + n);
        }, g(document).ready(v), g.fn.update_privileged = function(n, e, t) {
            var o = n.allowed !== !1, a = this;
            return a.each(function() {
                var n = "allowed-title";
                "undefined" != typeof g(this).data(n) && g(this).data(n) !== !1 || g(this).data(n, g(this).attr("title") || "");
                var a = {
                    html: !0
                };
                t && (a.placement = t), g(this).tooltip(a), g(this).hasClass("disabled") === o && (g(this).toggleClass("disabled", !o).attr("data-original-title", null), 
                o ? g(this).attr("title", g(this).data(n)) : g(this).attr("title", e), g(this).tooltip("fixTitle"));
            }), a;
        };
    }();
}, function(n, e) {
    n.exports = '#!/bin/sh\n\nset -eu\n\n# The first thing we do is list loaded keys\nssh-add -L || true\n\n# Try to list keys in this directory\ncd "$1" || exit 0\n\n# After that each .pub file gets its on set of blocks\nfor file in *.pub; do\n    printf "\\v"\n    cat "$file"\n    printf "\\v%s\\v" "$file"\n    ssh-keygen -l -f "$file" || true\ndone\n';
}, function(n, e, t) {
    "use strict";
    !function() {
        function e(n) {
            var e = m("<div>").append(n);
            return e.find('[translatable="yes"]').each(function(e, t) {
                var o = t.outerHTML, a = v.gettext(t.getAttribute("context"), m(t).text());
                m(t).removeAttr("translatable").text(a), n = n.replace(o, t.outerHTML);
            }), g.parse(n), n;
        }
        function o(n, e) {
            var t = n.lookup(e);
            return t && "localhost" != t.address ? t.connection_string : e;
        }
        function a(n, e, t, a) {
            function s() {
                var n = i.machines_ins.lookup(i.address), e = i.machines_ins.split_connection_string(i.address).address;
                return n && n.label && (e = n.label), e;
            }
            function r(n, e) {
                var t = y;
                w !== n && (y = "add-machine" == n ? new c(i) : "sync-users" == n ? new p(i) : "unknown-hostkey" == n ? new u(i, n) : "invalid-hostkey" == n ? new u(i, n) : "change-auth" == n ? new f(i) : "change-port" == n ? new d(i) : new l(i), 
                w = n, y.load(e), t && t.close && t.close(), t = null);
            }
            var i = this;
            i.machines_ins = t, i.codes = a, i.address = o(i.machines_ins, e);
            var h = null, b = null, w = null, y = null;
            i.try_to_connect = function(n, e) {
                var t = m.Deferred(), o = m.extend({
                    payload: "echo",
                    host: n
                }, e), a = i.machines_ins.lookup(n);
                a && a.host_key && !a.on_disk && (o["temp-session"] = !1, o.session = "shared", 
                o["host-key"] = a.host_key);
                var s = v.channel(o);
                return s.send("x"), m(s).on("message", function() {
                    m(s).off(), s.close(), t.resolve();
                }).on("close", function(n, e) {
                    t.reject(e);
                }), t.promise();
            }, i.get_sel = function(e) {
                var t = n;
                return e && (t = t + " " + e), m(t);
            }, i.set_on_success = function(n) {
                b = n;
            }, i.set_goal = function(n) {
                h = n;
            }, i.complete = function(e) {
                b ? b(e) : m(n).modal("hide");
            }, i.render = function(n, e) {
                e || (e = w);
                var t = i.machines_ins.split_connection_string(i.address), o = m.extend({
                    host: s(),
                    full_address: i.address,
                    context_title: i.context_title,
                    strong: function() {
                        return function(n, e) {
                            return "<strong>" + e(n) + "</strong>";
                        };
                    }
                }, n, t), a = m(g.render(L[e], o));
                v.translate(a), i.get_sel(".modal-content").html(a);
            }, i.render_error = function(e) {
                var t;
                e.problem && "close" == e.command && (t = i.codes[e.problem]), t && w !== t ? r(t, e) : m(n).dialog("failure", v.message(e));
            }, i.render_template = function(n) {
                r(n);
            }, i.show = function() {
                var n = i.get_sel();
                n.on("hide.bs.modal", function() {
                    i.get_sel(".model-content").empty();
                }), n.modal("show");
            }, i.run = function(n, e) {
                function t(n) {
                    a[n]().done(function(e) {
                        n += 1, n < a.length ? t(n) : (o.resolve(), i.complete(e));
                    }).fail(function(n) {
                        e ? e(n) : i.render_error(n), o.reject(n);
                    });
                }
                var o = m.Deferred(), a = [];
                a.push(function() {
                    return n;
                }), i.get_sel().dialog("wait", o.promise()), h && a.push(h), t(0);
            };
        }
        function s(n, e) {
            var t = n[e];
            return !!t && "no-server-support" != t;
        }
        function r(n, e) {
            return !!s(n, e) && ("password" == e || "not-provided" != n[e]);
        }
        function i(n) {
            var e = this;
            e.render = function(e, t, o) {
                var a;
                t && !o && (a = n.lookup(t), a && (o = a.color)), o || (o = n.unused_color());
                for (var s, r = [], i = 0; i < b.colors.length; i += 6) s = b.colors.slice(i, i + 6), 
                r.push({
                    list: s
                });
                var l = g.render(L["color-picker"], {
                    colors: r
                });
                m(e).html(l), m("#host-edit-color", e).css("background-color", o), m(".color-cell", e).each(function(n) {
                    m(this).css("background-color", b.colors[n]);
                }), m("#host-edit-color-popover .popover-content .color-cell", e).click(function() {
                    var n = m(this).css("background-color");
                    m("#host-edit-color", e).css("background-color", n);
                }), m("#host-edit-color", e).parent().on("show.bs.dropdown", function() {
                    var n = m("#host-edit-color", e), t = m("#host-edit-color-popover", e), o = n.position(), a = n.width(), s = n.height(), r = t.width(), i = t.height(), l = o.top - i + 10;
                    l < 0 ? (l = o.top + s + 10, t.addClass("bottom"), t.removeClass("top")) : (t.addClass("top"), 
                    t.removeClass("bottom")), t.css("left", o.left + (a - r) / 2), t.css("top", l), 
                    t.show();
                }).on("hide.bs.dropdown", function() {
                    m("#host-edit-color-popover", e).hide();
                });
            };
        }
        function l(n) {
            var e = this;
            e.load = function() {
                n.render();
            };
        }
        function c(n) {
            function e(e) {
                var t = null, o = n.machines_ins.lookup(e);
                return o && o.visible && o.on_disk && (t = new Error(S("This machine has already been added.")), 
                t.target = "#add-machine-address"), t;
            }
            function t(t) {
                var o = !0, a = null, s = m("#add-machine-address").val(), i = n.get_sel(".btn-primary");
                "" === s ? o = !0 : !b.allow_connection_string && (s.indexOf("@") > -1 || s.indexOf(":") > -1) ? a = new Error(S("This version of cockpit-ws does not support connecting to a host with an alternate user or port")) : s.search(/\s+/) === -1 ? (a = e(s), 
                a || (o = !1)) : a = new Error(S("The IP address or host name cannot contain whitespace.")), 
                a && (a.target = "#add-machine-address"), l ? r.dialog("failure", l, a) : r.dialog("failure", a), 
                i.prop("disabled", o);
            }
            function o() {
                l = null, n.address = m("#add-machine-address").val(), s = b.colors.parse(m("#add-machine-color-picker #host-edit-color").css("background-color")), 
                e(n.address) || (n.set_goal(function() {
                    var e = m.Deferred();
                    return n.machines_ins.add(n.address, s).done(e.resolve).fail(function(n) {
                        var t = v.format(S("Failed to add machine: $0"), v.message(n));
                        e.reject(t);
                    }), e.promise();
                }), n.run(n.try_to_connect(n.address), function(e) {
                    if ("no-host" == e.problem) {
                        var t = n.address, o = t.lastIndexOf(":"), a = "22";
                        o === -1 ? t = n.address + ":22" : a = t.substr(o + 1), e.message = v.format(S("Cockpit could not contact the given host $0. Make sure it has ssh running on port $1, or specify another port in the address."), t, a), 
                        e = v.message(e), l = e;
                    }
                    n.render_error(e);
                }));
            }
            var a = this, s = null, r = n.get_sel(), l = null, c = n.machines_ins.addresses.filter(function(e) {
                var t = n.machines_ins.lookup(e);
                return !t || !t.visible;
            });
            a.load = function() {
                var e = v.manifests.shell || {}, a = parseInt(e["machine-limit"], 10), r = new i(n.machines_ins);
                a && !isNaN(a) || (a = 20), n.render({
                    nearlimit: .75 * a <= n.machines_ins.list.length,
                    limit: a,
                    placeholder: S("Enter IP address or host name"),
                    options: c
                });
                var l = n.get_sel(".btn-primary");
                l.on("click", o), m("#add-machine-address").on("keyup", function(n) {
                    if (13 === n.which) {
                        var e = l.prop("disabled");
                        e || o();
                    }
                }), m("#add-machine-address").on("input focus", t), r.render("#add-machine-color-picker", n.address, s), 
                m("#add-machine-address").focus();
            };
        }
        function d(n) {
            function e() {
                function e(e) {
                    n.address = a, n.machines_ins.change(o.address, {
                        port: o.port
                    }).done(function() {
                        e ? n.try_to_connect(a).done(n.complete).fail(function(n) {
                            t.reject(n);
                        }) : t.resolve();
                    }).fail(function(n) {
                        var e = v.format(S("Failed to edit machine: $0"), v.message(n));
                        t.reject(e);
                    });
                }
                var t = m.Deferred(), o = n.machines_ins.split_connection_string(n.address);
                o.port = m("#edit-machine-port").val();
                var a = n.machines_ins.generate_connection_string(o.user, o.port, o.address);
                n.try_to_connect(a).done(function() {
                    e();
                }).fail(function(n) {
                    "no-host" != n.problem ? e(n) : t.reject(n);
                }), n.run(t.promise());
            }
            var t = this;
            t.load = function() {
                var t = n.machines_ins.lookup(n.address);
                return t ? (n.render({
                    port: t.port,
                    allow_connection_string: b.allow_connection_string
                }), void (b.allow_connection_string && n.get_sel(".btn-primary").on("click", e))) : void n.get_sel().modal("hide");
            };
        }
        function u(n, e) {
            function t() {
                var e, t = n.machines_ins.lookup(n.address);
                e = !t || t.on_disk ? n.machines_ins.add_key(r) : n.machines_ins.change(n.address, {
                    host_key: r
                });
                var o = e.then(function() {
                    var e = n.try_to_connect(n.address);
                    return e.fail(function(e) {
                        "invalid-hostkey" != e.problem && "unknown-hostkey" != e.problem || !t || t.on_disk || n.machines_ins.change(n.address, {
                            host_key: null
                        });
                    }), e;
                });
                n.run(o);
            }
            function o() {
                var a, l = null;
                s && (r = s["host-key"], a = s["host-fingerprint"]), n.render({
                    context_title: n.context_title,
                    path: b.known_hosts_path,
                    key: a,
                    key_host: r ? r.split(" ")[0] : null
                }), r ? i && n.get_sel(".btn-primary").on("click", t) : (l = n.try_to_connect(n.address).fail(function(t) {
                    t.problem != e ? n.render_error(t) : (s = t, o());
                }).done(function(e) {
                    n.complete(e);
                }), n.get_sel().dialog("wait", l));
            }
            var a = this, s = null, r = null, i = "unknown-hostkey" == e;
            a.load = function(n) {
                s = n, o();
            };
        }
        function f(n) {
            function e() {
                var e = n.get_sel(".keys");
                if (e) {
                    e.empty();
                    for (var t in d.items) {
                        var o = d.items[t];
                        o.loaded && e.append(m("<div>").text(o.name));
                    }
                }
            }
            function t() {
                var e, t = {}, o = m.Deferred(), a = m("#login-custom-user").val(), s = n.machines_ins.split_connection_string(n.address);
                s.user = a, e = n.machines_ins.generate_connection_string(s.user, s.port, s.address), 
                "stored" != m("#login-type").val() && (t.password = m("#login-custom-password").val(), 
                t.session = "shared", a || (i.user && i.user.name && (t.user = i.user.name), t["temp-session"] = !1)), 
                n.try_to_connect(e, t).done(function() {
                    n.address = e, u ? n.machines_ins.change(u.address, {
                        user: a
                    }).done(o.resolve).fail(o.reject) : o.resolve();
                }).fail(o.reject), n.run(o.promise());
            }
            function o(n) {
                var e = "password" != n, t = m("#login-type li[value=" + n + "]").text();
                m("#login-type button span").text(t), m("#login-available").toggle(e), m("#login-diff-password").toggle(!e);
            }
            function a() {
                var d = null, f = "change-auth";
                b.allow_connection_string && b.has_auth_results || (f = "auth-failed");
                var p = null, h = null, v = null, g = n.machines_ins.split_connection_string(n.address).user;
                if (!g && u && (g = u.user), l && b.has_auth_results) {
                    if (v = {}, h = {}, p = l["auth-method-results"]) {
                        c = s(p, "password");
                        for (var w in p) r(p, w) && (h[w] = !0);
                    }
                    m.isEmptyObject(h) && (f = "auth-failed");
                }
                n.render({
                    supported: p,
                    available: h,
                    machine_user: g,
                    user: i.user ? i.user.name : "",
                    allows_password: c,
                    can_sync: !!n.codes["sync-users"],
                    "machines.allow_connection_string": b.allow_connection_string,
                    sync_link: function() {
                        return function(n, e) {
                            return '<a id="do-sync-users">' + e(n) + "</a>";
                        };
                    }
                }, f), null === p && b.has_auth_results ? (d = n.try_to_connect(n.address).fail(function(n) {
                    l = n, a();
                }).done(function(e) {
                    n.complete(e);
                }), n.get_sel().dialog("wait", d)) : m.isEmptyObject(h) || (m("#login-type li").on("click", function() {
                    o(m(this).attr("value"));
                }), o(m("#login-type li:first-child").attr("value")), n.get_sel(".btn-primary").on("click", t), 
                n.get_sel("a[data-content]").popover(), e()), n.get_sel("#do-sync-users").on("click", function() {
                    n.render_template("sync-users");
                });
            }
            var i = this, l = null, c = !1, d = null, u = n.machines_ins.lookup(n.address);
            i.user = {}, i.load = function(n) {
                l = n, w && (d = w.keys_instance(), m(d).on("changed", e)), v.user().done(function(n) {
                    i.user = n;
                }).always(function(n) {
                    a();
                });
            }, i.close = function(n) {
                d && (m(d).off(), d.close()), d = null;
            };
        }
        function p(n) {
            function e() {
                var n = v.dbus(null, {
                    bus: "internal",
                    host: "localhost",
                    superuser: !0
                });
                m(n).on("close", function(n, e) {
                    f = e, a();
                });
                var e = n.proxy("cockpit.Setup", "/setup");
                e.wait(function() {
                    if (e.valid) {
                        var t = {
                            t: "(asas)",
                            v: [ [], [] ]
                        };
                        e.Transfer("passwd1", t).done(function(n) {
                            var e, t, o, a = n.v[1];
                            for (e = 0; e < n.v[0].length; e++) {
                                var s = n.v[0][e];
                                t = s.split(":"), o = t[0], i[o] = {
                                    username: o,
                                    name: t[4] || o,
                                    raw: s,
                                    groups: []
                                };
                            }
                            for (e = 0; e < a.length; e++) {
                                t = a[e].split(":"), o = t[0];
                                for (var r = t[t.length - 1].split(","), l = 0; l < r.length; l++) {
                                    var c = r[l];
                                    i[c] && i[c].groups.push(o);
                                }
                            }
                        }).fail(function(n) {
                            n.message = v.gettext(n.message), f = n;
                        }).always(function(e) {
                            m(n).off(), n.close(), a();
                        });
                    }
                });
            }
            function t() {
                var e = null, t = m.Deferred(), o = t.promise();
                n.run(o), n.set_on_success(null), o.always(function() {
                    e && (m(e).off(), e.close());
                });
                var a = {
                    bus: "internal"
                };
                l && (a.user = m("#sync-username").val(), a.password = m("#sync-password").val()), 
                m.extend(a, u, {
                    host: n.address
                }), e = v.dbus(null, a), m(e).on("close", function(n, e) {
                    t.reject(v.message(e));
                });
                var s = {
                    t: "(asas)",
                    v: [ [] ]
                }, r = {};
                n.get_sel("input:checked").each(function() {
                    var n = i[m(this).attr("name")];
                    if (n) {
                        s.v[0].push(n.raw);
                        for (var e = 0; e < n.groups.length; e++) {
                            var t = n.groups[e];
                            r[t] || (r[t] = []), r[t].push(n.username);
                        }
                    }
                }), s.v.push(Object.keys(r).map(function(n) {
                    return n + ":::" + r[n].join();
                }));
                var c = e.proxy("cockpit.Setup", "/setup");
                c.wait(function() {
                    c.valid && c.Commit("passwd1", s).fail(function(n) {
                        n.message = v.gettext(n.message), t.reject(n);
                    }).done(t.resolve);
                });
            }
            function o() {
                var e = n.get_sel("input:checked").length > 0;
                n.get_sel(".btn-primary").toggleClass("disabled", !e);
            }
            function a() {
                function e() {
                    if (this.groups) return this.groups.join(", ");
                }
                var a = !0, r = Object.keys(i).sort().map(function(n) {
                    return i[n];
                });
                b.has_auth_results && d && (a = s(d, "password"));
                var u = n.render({
                    needs_auth: l,
                    needs_root: c,
                    users: r,
                    perm_failed: f ? v.message(f) : null,
                    allows_password: a,
                    formated_groups: e
                });
                n.get_sel(".modal-content").html(u), n.get_sel(".btn-primary").on("click", t), n.get_sel("input:checkbox").on("change", function() {
                    var n = m(this).attr("name");
                    i[n].checked = m(this).is(":checked"), o();
                }), o();
            }
            var r = this, i = {}, l = !1, c = !1, d = null, u = {
                superuser: !0
            }, f = null;
            r.load = function(t) {
                t && (d = t["auth-method-results"]), a(), n.try_to_connect(n.address, u).fail(function(e) {
                    l = !0, "access-denied" == e.problem ? (c = !0, !d && b.has_auth_results && n.try_to_connect(n.address, {
                        user: "1"
                    }).fail(function(n) {
                        d = n["auth-method-results"];
                    }).always(a)) : (d = e["auth-method-results"], a());
                }), e();
            };
        }
        function h(n, e) {
            var t = this;
            e || (e = A);
            var o = new i(n);
            t.troubleshoot = function(t, o) {
                var s = "#" + t;
                if (o && o.problem) {
                    var r = e[o.problem];
                    "no-host" == o.problem && (r = "change-port");
                    var i = new a(s, o.address, n, e);
                    i.render_template(r), i.show();
                }
            }, t.needs_troubleshoot = function(n) {
                return !(!n || !n.problem) && ("no-host" == n.problem || !!e[n.problem]);
            }, t.render_dialog = function(t, o, s) {
                var r = "#" + o, i = new a(r, s, n, e);
                i.render_template(t), i.show();
            }, t.render_color_picker = function(n, e) {
                o.render(n, e);
            };
        }
        var m = t(3), v = t(4), g = t(14), b = t(2), w = t(5), y = t(16), _ = t(17), k = t(18), x = t(19), C = t(20), E = t(21), T = t(22), j = t(23), O = t(24), S = v.gettext, A = {
            "no-cockpit": "not-supported",
            "not-supported": "not-supported",
            "protocol-error": "not-supported",
            "authentication-not-supported": "change-auth",
            "authentication-failed": "change-auth",
            "no-forwarding": "change-auth",
            "unknown-hostkey": "unknown-hostkey",
            "invalid-hostkey": "invalid-hostkey",
            "not-found": "add-machine",
            "sync-users": "sync-users"
        }, L = {
            "add-machine": e(y),
            "auth-failed": e(_),
            "change-auth": e(k),
            "change-port": e(x),
            "color-picker": e(C),
            "invalid-hostkey": e(E),
            "not-supported": e(T),
            "sync-users": e(j),
            "unknown-hostkey": e(O)
        };
        n.exports = {
            new_manager: function(n, e) {
                return new h(n, e);
            }
        };
    }();
}, function(n, e, t) {
    "use strict";
    function o(n) {
        if (n in r) return r[n];
        var e = document.createElement("div");
        e.innerHTML = n, a.translate(e);
        var t = e.innerHTML;
        return r[n] = t, t;
    }
    var a = t(4), s = t(15), r = {};
    n.exports = a.extend({}, s, {
        render: function(n, e, t) {
            return o(s.render(n, e, t));
        },
        to_html: function(n, e, t, a) {
            return o(s.to_html(n, e, t, a));
        },
        clearCache: function() {
            return r = {}, s.clearCache();
        }
    });
}, function(n, e, t) {
    var o, a;
    /*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */
    !function(s, r) {
        if ("object" == typeof e && e) r(e); else {
            var i = {};
            r(i), o = i, a = "function" == typeof o ? o.call(e, t, e, n) : o, !(void 0 !== a && (n.exports = a));
        }
    }(this, function(n) {
        function e(n, e) {
            return w.call(n, e);
        }
        function t(n) {
            return !e(m, n);
        }
        function o(n) {
            return "function" == typeof n;
        }
        function a(n) {
            return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        }
        function s(n) {
            return String(n).replace(/[&<>"'\/]/g, function(n) {
                return k[n];
            });
        }
        function r(n) {
            if (!_(n) || 2 !== n.length) throw new Error("Invalid tags: " + n);
            return [ new RegExp(a(n[0]) + "\\s*"), new RegExp("\\s*" + a(n[1])) ];
        }
        function i(e, o) {
            function s() {
                if (T && !j) for (;E.length; ) delete C[E.pop()]; else E = [];
                T = !1, j = !1;
            }
            o = o || n.tags, e = e || "", "string" == typeof o && (o = o.split(h));
            for (var i, u, f, m, w, y, _ = r(o), k = new d(e), x = [], C = [], E = [], T = !1, j = !1; !k.eos(); ) {
                if (i = k.pos, f = k.scanUntil(_[0])) for (var O = 0, S = f.length; O < S; ++O) m = f.charAt(O), 
                t(m) ? E.push(C.length) : j = !0, C.push([ "text", m, i, i + 1 ]), i += 1, "\n" === m && s();
                if (!k.scan(_[0])) break;
                if (T = !0, u = k.scan(b) || "name", k.scan(p), "=" === u ? (f = k.scanUntil(v), 
                k.scan(v), k.scanUntil(_[1])) : "{" === u ? (f = k.scanUntil(new RegExp("\\s*" + a("}" + o[1]))), 
                k.scan(g), k.scanUntil(_[1]), u = "&") : f = k.scanUntil(_[1]), !k.scan(_[1])) throw new Error("Unclosed tag at " + k.pos);
                if (w = [ u, f, i, k.pos ], C.push(w), "#" === u || "^" === u) x.push(w); else if ("/" === u) {
                    if (y = x.pop(), !y) throw new Error('Unopened section "' + f + '" at ' + i);
                    if (y[1] !== f) throw new Error('Unclosed section "' + y[1] + '" at ' + i);
                } else "name" === u || "{" === u || "&" === u ? j = !0 : "=" === u && (_ = r(o = f.split(h)));
            }
            if (y = x.pop()) throw new Error('Unclosed section "' + y[1] + '" at ' + k.pos);
            return c(l(C));
        }
        function l(n) {
            for (var e, t, o = [], a = 0, s = n.length; a < s; ++a) e = n[a], e && ("text" === e[0] && t && "text" === t[0] ? (t[1] += e[1], 
            t[3] = e[3]) : (o.push(e), t = e));
            return o;
        }
        function c(n) {
            for (var e, t, o = [], a = o, s = [], r = 0, i = n.length; r < i; ++r) switch (e = n[r], 
            e[0]) {
              case "#":
              case "^":
                a.push(e), s.push(e), a = e[4] = [];
                break;

              case "/":
                t = s.pop(), t[5] = e[2], a = s.length > 0 ? s[s.length - 1][4] : o;
                break;

              default:
                a.push(e);
            }
            return o;
        }
        function d(n) {
            this.string = n, this.tail = n, this.pos = 0;
        }
        function u(n, e) {
            this.view = null == n ? {} : n, this.cache = {
                ".": this.view
            }, this.parent = e;
        }
        function f() {
            this.cache = {};
        }
        var p = /\s*/, h = /\s+/, m = /\S/, v = /\s*=/, g = /\s*\}/, b = /#|\^|\/|>|\{|&|=|!/, w = RegExp.prototype.test, y = Object.prototype.toString, _ = Array.isArray || function(n) {
            return "[object Array]" === y.call(n);
        }, k = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        };
        d.prototype.eos = function() {
            return "" === this.tail;
        }, d.prototype.scan = function(n) {
            var e = this.tail.match(n);
            if (e && 0 === e.index) {
                var t = e[0];
                return this.tail = this.tail.substring(t.length), this.pos += t.length, t;
            }
            return "";
        }, d.prototype.scanUntil = function(n) {
            var e, t = this.tail.search(n);
            switch (t) {
              case -1:
                e = this.tail, this.tail = "";
                break;

              case 0:
                e = "";
                break;

              default:
                e = this.tail.substring(0, t), this.tail = this.tail.substring(t);
            }
            return this.pos += e.length, e;
        }, u.prototype.push = function(n) {
            return new u(n, this);
        }, u.prototype.lookup = function(n) {
            var e;
            if (n in this.cache) e = this.cache[n]; else {
                for (var t = this; t; ) {
                    if (n.indexOf(".") > 0) {
                        e = t.view;
                        for (var a = n.split("."), s = 0; null != e && s < a.length; ) e = e[a[s++]];
                    } else e = t.view[n];
                    if (null != e) break;
                    t = t.parent;
                }
                this.cache[n] = e;
            }
            return o(e) && (e = e.call(this.view)), e;
        }, f.prototype.clearCache = function() {
            this.cache = {};
        }, f.prototype.parse = function(n, e) {
            var t = this.cache, o = t[n];
            return null == o && (o = t[n] = i(n, e)), o;
        }, f.prototype.render = function(n, e, t) {
            var o = this.parse(n), a = e instanceof u ? e : new u(e);
            return this.renderTokens(o, a, t, n);
        }, f.prototype.renderTokens = function(e, t, a, s) {
            function r(n) {
                return d.render(n, t, a);
            }
            for (var i, l, c = "", d = this, u = 0, f = e.length; u < f; ++u) switch (i = e[u], 
            i[0]) {
              case "#":
                if (l = t.lookup(i[1]), !l) continue;
                if (_(l)) for (var p = 0, h = l.length; p < h; ++p) c += this.renderTokens(i[4], t.push(l[p]), a, s); else if ("object" == typeof l || "string" == typeof l) c += this.renderTokens(i[4], t.push(l), a, s); else if (o(l)) {
                    if ("string" != typeof s) throw new Error("Cannot use higher-order sections without the original template");
                    l = l.call(t.view, s.slice(i[3], i[5]), r), null != l && (c += l);
                } else c += this.renderTokens(i[4], t, a, s);
                break;

              case "^":
                l = t.lookup(i[1]), (!l || _(l) && 0 === l.length) && (c += this.renderTokens(i[4], t, a, s));
                break;

              case ">":
                if (!a) continue;
                l = o(a) ? a(i[1]) : a[i[1]], null != l && (c += this.renderTokens(this.parse(l), t, a, l));
                break;

              case "&":
                l = t.lookup(i[1]), null != l && (c += l);
                break;

              case "name":
                l = t.lookup(i[1]), null != l && (c += n.escape(l));
                break;

              case "text":
                c += i[1];
            }
            return c;
        }, n.name = "mustache.js", n.version = "0.8.1", n.tags = [ "{{", "}}" ];
        var x = new f();
        n.clearCache = function() {
            return x.clearCache();
        }, n.parse = function(n, e) {
            return x.parse(n, e);
        }, n.render = function(n, e, t) {
            return x.render(n, e, t);
        }, n.to_html = function(e, t, a, s) {
            var r = n.render(e, t, a);
            return o(s) ? void s(r) : r;
        }, n.escape = s, n.Scanner = d, n.Context = u, n.Writer = f;
    });
}, function(n, e) {
    n.exports = '<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal"\n        aria-hidden="true">&times;</button>\n    <h4 class="modal-title" translatable="yes">Add Machine to Dashboard</h4>\n</div>\n\n<div class="modal-body">\n    <div>\n        <table class="form-table-ct">\n            <tr>\n                <td class="top" translatable="yes">Address</td>\n                <td>\n                <div class="dialog-wrapper error-keep">\n                    <input class="form-control" id="add-machine-address"\n                       type="test" value="{{ full_address }}"\n                       list="options"\n                       placeholder="{{ placeholder }}"/>\n                    <datalist id="options">\n                        {{#options}}\n                        <option value="{{.}}">\n                        {{/options}}\n                    </datalist>\n                </div>\n                </td>\n            </tr>\n            <tr>\n                <td translatable="yes">Color</td>\n                <td id="add-machine-color-picker">\n                </td>\n            </tr>\n        </table>\n    </div>\n</div>\n\n<div class="modal-footer">\n    {{#nearlimit}}\n    <div class="alert alert-warning dialog-error dashboard-machine-warning">\n        <span class="pficon pficon-warning-triangle-o"></span>\n        <span translatable="yes">Connecting simultaneously to more than {{ limit }} machines is unsupported.</span>\n    </div>\n    {{/nearlimit}}\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Cancel</button>\n    <button class="btn btn-primary" translatable="yes">Add</button>\n</div>\n';
}, function(n, e) {
    n.exports = '<div class="modal-header">\n    <h4 class="modal-title" translatable="yes">Authentication Failed</h4>\n</div>\n<div class="modal-body">\n    {{#supported}}\n    <p translatable="yes">Cockpit was unable to log into {{#strong}}{{host}}{{/strong}}. To use this machine with cockpit you will need to enable one of the following authentication methods in the sshd config on {{#strong}}{{host}}{{/strong}}:</p>\n    <ul>\n        {{#password}}<li translatable="yes">Password</li>{{/password}}\n        {{#public-key}}<li translatable="yes">Public Key</li>{{/public-key}}\n        {{#gssapi-mic}}<li translatable="yes">Kerberos Based SSO</li>{{/gssapi-mic}}\n    </ul>\n    {{/supported}}\n\n    {{^supported}}\n    <p translatable="yes">Cockpit was unable to log in to {{#strong}}{{host}}{{/strong}}. {{#can_sync}}You may want to try to {{#sync_link}}synchronize users{{/sync_link}}.{{/can_sync}} For more authentication options and troubleshooting support please upgrade cockpit-ws to a newer version.</p>\n    {{/supported}}\n\n</div>\n<div class="modal-footer">\n    <button class="btn btn-primary" data-dismiss="modal" translatable="yes">Close</button>\n</div>\n';
}, function(n, e) {
    n.exports = '<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal"\n        aria-hidden="true">&times;</button>\n    <h4 class="modal-title" translatable="yes">Log in to {{host}}</h4>\n</div>\n\n<div class="modal-body">\n    {{^available}}\n    <p translatable="yes">Cockpit was unable to log into {{#strong}}{{host}}{{/strong}}.</p>\n    {{/available}}\n\n    {{#available}}\n    <p translatable="yes">Cockpit was unable to log into {{#strong}}{{host}}{{/strong}}. You can change your authentication credentials below. {{#can_sync}}You may prefer to {{#sync_link}}synchronize accounts and passwords{{/sync_link}}.{{/can_sync}}</p>\n\n    <div>\n        <table class="form-table-ct">\n            <tr>\n                <td translatable="yes" class="top">User name</td>\n                <td>\n                    <input class="form-control" id="login-custom-user" type="text" value="{{machine_user}}" placeholder="{{ user }}"/>\n                </td>\n                <td>\n                    <a tabindex="0" role="button" data-toggle="popover"\n                        data-trigger="focus" data-placement="bottom" translate="data-content"\n                        data-content="Leave blank to connect to this machine as the currently logged in user{{#user}} ({{user}}){{/user}}. If you enter a different username, that user will always be used connecting to this machine.">\n                        <span class="fa fa-lg fa-info-circle"></span>\n                    </a>\n                </td>\n            </tr>\n\n            <tr>\n                <td translatable="yes">Authentication</td>\n                <td>\n                    <div class="btn-group bootstrap-select dropdown form-control" id="login-type">\n                        <button class="btn btn-default dropdown-toggle" type="button"\n                            data-toggle="dropdown">\n                            <span class="pull-left" translatable="yes"></span>\n                            <div class="caret"></div>\n                        </button>\n                        <ul class="dropdown-menu">\n                            {{#allows_password}}\n                            <li value="password"><a translate>Type a password</a></li>\n                            {{/allows_password}}\n                            <li value="stored"><a translate>Using available credentials</a></li>\n                        </ul>\n                    </div>\n                </td>\n            </tr>\n\n            {{#allows_password}}\n            <tr id="login-diff-password">\n                <td translatable="yes" class="top">Password</td>\n                <td>\n                    <input class="form-control" id="login-custom-password" type="password" />\n                </td>\n                <td>\n                    <a tabindex="0" role="button" data-toggle="popover"\n                        data-trigger="focus" data-placement="bottom" translate="data-content"\n                        data-content="Entering a different password here means you will need to retype it every time you reconnect to this machine">\n                        <span class="fa fa-lg fa-info-circle"></span>\n                    </a>\n                </td>\n            </tr>\n            {{/allows_password}}\n            <tr id="login-available">\n                <td translatable="yes" class="top">Available</td>\n                <td class="top">\n                        {{#password}}<div translatable="yes">Login Password</div>{{/password}}\n                        {{#gssapi-mic}}<div translatable="yes">Kerberos Ticket</div>{{/gssapi-mic}}\n                        {{#public-key}}<div class="keys"><div class=\'dialog-wait-ct pull-left\'><div class=\'spinner spinner-sm\'></div><span translatable="yes">Checking for public keys</span></div></div>{{/public-key}}\n                </td>\n            </tr>\n        </table>\n    </div>\n    {{/available}}\n</div>\n\n<div class="modal-footer">\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Cancel</button>\n    <button class="btn btn-primary" translatable="yes">Log In</button>\n</div>\n';
}, function(n, e) {
    n.exports = '<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal"\n        aria-hidden="true">&times;</button>\n    <h4 class="modal-title" translatable="yes">Could not contact {{host}}</h4>\n</div>\n\n<div class="modal-body">\n    <p>\n        <span translatable="yes">Cockpit was unable to contact {{#strong}}{{host}}{{/strong}}.</span>\n        {{^allow_connection_string}}\n        <span translatable="yes">To try a different port you will need to upgrade cockpit-ws to a newer version.</span>\n        {{/allow_connection_string}}\n\n        {{#allow_connection_string}}\n        <span translatable="yes">Is sshd running on a different port?</span>\n        {{/allow_connection_string}}\n    </p>\n\n    {{#allow_connection_string}}\n    <div>\n        <table class="form-table-ct">\n            <tr>\n                <td class="top" translatable="yes">Port</td>\n                <td>\n                <div class="dialog-wrapper error-keep">\n                    <input id="edit-machine-port" class="form-control"\n                       type="test" value="{{ port }}"\n                       list="options"\n                       placeholder="22"/>\n                </div>\n                </td>\n            </tr>\n        </table>\n    </div>\n    {{/allow_connection_string}}\n</div>\n\n<div class="modal-footer">\n    {{#allow_connection_string}}\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Cancel</button>\n    <button class="btn btn-primary" translatable="yes">Update</button>\n    {{/allow_connection_string}}\n\n    {{^allow_connection_string}}\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Close</button>\n    {{/allow_connection_string}}\n</div>\n';
}, function(n, e) {
    n.exports = '<div>\n    <div id="host-edit-color" data-toggle="dropdown"></div>\n    <div id="host-edit-color-popover" class="popover in" tabindex="-1">\n        <div class="arrow"></div>\n        <div class="popover-content">\n            {{#colors}}\n            <div>\n                {{#list}}\n                <div class="color-cell"></div>\n                {{/list}}\n            </div>\n            {{/colors}}\n        </div>\n        <div class="arrow"></div>\n    </div>\n</div>\n';
}, function(n, e) {
    n.exports = '<div class="modal-header">\n    <h4 class="modal-title" translatable="yes">Incorrect Host Key</h4>\n</div>\n<div class="modal-body">\n    <div class="banned">\n        <i class="fa fa-ban"></i>\n    </div>\n    <p translatable="yes">The key of {{#strong}}{{host}}{{/strong}} does not match the key previously in use. Unless this machine was recently replaced, it is likely that someone is trying to attack your connection to this machine.</p>\n\n    {{#key_host}}\n    <p translatable="yes">You can remove the previously stored key by running the following command</p>\n\n    <pre class="center">ssh-keygen -R {{ key_host }} -f {{ path }}</pre>\n    {{/key_host}}\n\n</div>\n\n<div class="modal-footer">\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Close</button>\n</div>\n';
}, function(n, e) {
    n.exports = '<div class="modal-header">\n    <h4 class="modal-title" translatable="yes">Cockpit is not installed</h4>\n</div>\n<div class="modal-body">\n    <p translatable="yes">A compatible version of Cockpit is not installed on {{#strong}}{{host}}{{/strong}}.</p>\n</div>\n<div class="modal-footer">\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Close</button>\n</div>\n';
}, function(n, e) {
    n.exports = '<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal"\n        aria-hidden="true">&times;</button>\n    <h4 class="modal-title" translatable="yes">Synchronize users</h4>\n</div>\n\n<div class="modal-body">\n    <p translatable="yes">Select the users that you would like to be synchronized with {{#strong}}{{host}}{{/strong}}</p>\n\n{{#perm_failed}}\n    <div class="alert alert-danger dialog-error">\n        <span class="fa fa-exclamation-triangle"></span>\n        <span translatable="yes">Error loading users: {{perm_failed}}</span>\n    </div>\n{{/perm_failed}}\n\n{{^perm_failed}}\n    <div id="sync-users">\n        <table class="table">\n        <tbody>\n        {{^users}}\n            <tr>\n                  <td>\n                    <div class="center-spinner">\n                        <div class="spinner spinner-lg"></div>\n                    </div>\n                  </td>\n            </tr>\n        {{/users}}\n\n        {{#users}}\n              <tr>\n                  <td><input type="checkbox" name="{{username}}" {{#checked}}checked=checked{{/checked}} /></td>\n                  <td>{{username}}</td>\n                  <td>{{name}}</td>\n                  <td>&#8226;&#8226;&#8226;&#8226;&#8226;</td>\n                  <td>{{formated_groups}}</td>\n              </tr>\n        {{/users}}\n        </tbody>\n        </table>\n    </div>\n\n    {{#needs_auth}}\n    <div>\n        {{#needs_root}}\n        <p translatable="yes">You are connected to {{#strong}}{{host}}{{/strong}}, however in order to synchronize users, a user with superuser privileges is required.</p>\n        {{/needs_root}}\n        {{^needs_root}}\n        <p translatable="yes">In order to synchronize users, you need to log in to {{#strong}}{{host}}{{/strong}}.</p>\n        {{/needs_root}}\n        <table class="form-table-ct">\n            <tr>\n                <td translatable="yes">User name</td>\n                <td>\n                    <input class="form-control" id="sync-username" type="text" />\n                </td>\n            </tr>\n            {{#allows_password}}\n            <tr>\n                <td translatable="yes">Password</td>\n                <td>\n                    <input class="form-control" id="sync-password" type="password" />\n                </td>\n            </tr>\n            {{/allows_password}}\n        </table>\n    </div>\n    {{/needs_auth}}\n{{/perm_failed}}\n</div>\n\n<div class="modal-footer">\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Cancel</button>\n    <button class="btn btn-primary disabled" translatable="yes">Synchronize</button>\n</div>\n';
}, function(n, e) {
    n.exports = '<div class="modal-header">\n    <h4 class="modal-title" translatable="yes">Unknown Host Key</h4>\n</div>\n<div id="add-unknown-host" class="modal-body">\n    {{#key}}\n        <p translatable="yes">The authenticity of host {{#strong}}{{host}}{{/strong}} can\'t be established. Are you sure you want to continue connecting?</p>\n        <div>\n        <table class="form-table-ct">\n            <tr>\n                <td translatable="yes">Fingerprint</td>\n                <td><pre class="machine-key">{{key}} </pre></td>\n            </tr>\n        </table>\n        </div>\n    {{/key}}\n</div>\n\n<div class="modal-footer">\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Close</button>\n\n    {{#key}}\n        <button class="btn btn-primary" translatable="yes">Connect</button>\n    {{/key}}\n</div>\n';
}, function(n, e, t) {
    "use strict";
    var o = o || function() {};
    !function() {
        function e(n, e, t, a) {
            function s() {
                C = !0, _.ready();
            }
            function u() {
                var n = _.current_frame();
                n && r(n).hide(), r(".curtains-ct .spinner").toggle(!1), r("#machine-reconnect").toggle(!0), 
                r("#machine-troubleshoot").toggle(!1), r(".curtains-ct i").toggle(!0), r(".curtains-ct h1").text(c("Disconnected")), 
                r(".curtains-ct p").text(i.message(k)), r(".curtains-ct").show(), r("#navbar-dropdown").addClass("disabled"), 
                o();
            }
            function f(n, o) {
                var a;
                if (!k && !x) {
                    n || (n = _.retrieve_state()), a = e.lookup(n.host), a ? a.visible ? o && "connected" !== a.state && t.connect(n.host) : (a.state = "failed", 
                    a.problem = "not-found") : a = {
                        key: n.host,
                        address: n.host,
                        label: n.host,
                        state: "failed",
                        problem: "not-found"
                    };
                    var s = y(a);
                    a.manifests && !n.component && (n.component = p(n, s)), h(a, n, s), m(a, n, s), 
                    g(a, n, s), _.recalculate_layout(), _.jump(n, !0);
                }
            }
            function p(n, t) {
                var o, a, s = e.list.length <= 1, i = t.ordered("dashboard");
                if (d && (n.sidebar = !0), !n.sidebar && i.length > 0) {
                    if (o = i[0], o && (!s || "multiple-machines" !== o.wants)) return o.path;
                    o = null;
                }
                var l = r("#sidebar li.active a").text();
                return l && (o = t.search("label", l)) ? o.path : (a = t.ordered("menu"), a.length > 0 && a[0] ? a[0].path : i.length > 0 && (o = i[0]) ? (n.sidebar = !1, 
                o.path) : "system");
            }
            function h(n, t, o) {
                r(".dashboard-link").each(function() {
                    var n = r(this);
                    n.toggleClass("active", n.attr("data-component") === t.component);
                });
                var a;
                n && n.static_hostname ? (a = r(".dashboard-link").length < 2 && e.list.length < 2, 
                r("#content-navbar").toggleClass("hidden", a)) : r("#content-navbar").toggleClass("hidden", !1);
                var s = o.items[t.component];
                s && "dashboard" == s.section && (delete t.sidebar, n = null), r("#machine-avatar").attr("src", n && n.avatar ? encodeURI(n.avatar) : "../shell/images/server-small.png");
                var i;
                i = n ? n.label : 1 == e.list.length ? e.list[0].label : c("Machines"), r("#machine-link span").text(i);
                var l;
                l = 1 != e.list.length && n ? n.color || "" : "transparent", r("#machine-color").css("border-left-color", l), 
                r("#machine-dropdown").toggleClass("active", !!n);
                var d = r("#sidebar");
                n && "connected" == n.state ? d.show() : d.hide();
            }
            function m(n, e, t) {
                function o(t) {
                    return r("<li>").toggleClass("active", e.component === t.path).append(r("<a>").attr("href", _.href({
                        host: n.address,
                        component: t.path
                    })).text(t.label));
                }
                var a = t.ordered("menu").map(o);
                r("#sidebar-menu").empty().append(a);
                var s = t.ordered("tools").map(o);
                r("#sidebar-tools").empty().append(s), r("#tools-panel li.active").parents("#tools-panel").collapse("show");
            }
            function v(n, e) {
                n ? n += " - " : n = "";
                var t = _.default_title;
                e && e.label && (t = e.label), document.title = n + t;
            }
            function g(n, e, t) {
                var s, l, d, u, f = _.current_frame();
                if ("connected" != n.state) {
                    if (r(f).hide(), f = null, _.current_frame(f), d = "connecting" == n.state, n.restarting) s = c("The machine is restarting"), 
                    l = ""; else if (d) s = c("Connecting to the machine"), l = ""; else if (s = c("Couldn't connect to the machine"), 
                    "not-found" == n.problem) l = c("Cannot connect to an unknown machine"); else {
                        var p = n.problem || n.state;
                        l = p ? i.message(p) : "";
                    }
                    if (!n.restarting && a.needs_troubleshoot(n) ? (r("#machine-troubleshoot").off().on("click", function() {
                        a.troubleshoot("troubleshoot-dialog", n);
                    }), r("#machine-troubleshoot").show()) : r("#machine-troubleshoot").hide(), u = !!n.restarting, 
                    r(".curtains-ct").show(), r(".curtains-ct .spinner").toggle(d || u), r("#machine-reconnect").toggle(!d && "not-found" != n.problem), 
                    r(".curtains-ct i").toggle(!d && !u), r(".curtains-ct h1").text(s), r(".curtains-ct p").text(l), 
                    r("#machine-spinner").hide(), v(null, n), !d) return;
                }
                var h, m = e.hash, g = e.component;
                n && t.compat && (h = t.compat[g], h && (g = "shell/shell", m = h));
                var b;
                g && (b = _.frames.lookup(n, g, m)), b != f && (r(f).css("display", "none"), _.current_frame(b));
                var w, y;
                "connected" == n.state && (r(".curtains-ct").hide(), r("#machine-spinner").toggle(b && !r(b).attr("data-ready")), 
                r(b).css("display", "block"), y = t.items[e.component], w = y ? y.label : "", v(w, n)), 
                o();
            }
            function b() {
                r("#machine-dropdown .caret").toggle(e.list.length > 1);
                var n = r("machine-link");
                e.list.length > 1 ? n.attr("data-toggle", "dropdown") : n.removeAttr("data-toggle");
                var t = r("#machine-dropdown ul"), o = e.list.map(function(n) {
                    var e = r("<img>").addClass("machine-avatar").attr("src", encodeURI(n.avatar)), t = r("<span>").text(n.label);
                    return r("<li role='presentation'>").css("border-left-color", n.color || "").append(r("<a>").attr("role", "menuitem").attr("tabindex", "-1").attr("data-address", n.address).attr("href", _.href({
                        host: n.address
                    }, !0)).append(e, t));
                });
                t.empty().append(o);
            }
            function w(n) {
                if (!n.manifests || "localhost" === n.address) return null;
                var e = n.manifests.shell || {}, t = e.menu || {}, o = e.tools || {}, a = {};
                return "_host_" in t && (a["system/host"] = "/server"), "_init_" in t && (a["system/init"] = "/services"), 
                "_network_" in t && (a["network/interfaces"] = "/networking"), "_storage_" in t && (a["storage/devices"] = "/storage"), 
                "_users_" in o && (a["users/local"] = "/accounts"), ("_storage_" in t || "_init_" in t) && (a["docker/containers"] = "/containers"), 
                a;
            }
            function y(n) {
                var e = l.new_compiled();
                return e.load(n.manifests, "tools"), e.load(n.manifests, "dashboard"), e.load(n.manifests, "menu"), 
                e.compat = w(n), e;
            }
            n || (n = {}), n.navigate = function(n, e) {
                return f(n, e);
            };
            var _ = l.new_index_from_proto(n);
            r(_).on("expect_restart", function(n, e) {
                t.expect_restart(e);
            });
            var k = null;
            r(_).on("disconnect", function(n, e) {
                k = e, u();
            });
            var x = !1;
            r("#machine-reconnect").on("click", function(n) {
                k ? (i.sessionStorage.clear(), window.location.reload(!0)) : f(null, !0);
            }), r("#troubleshoot-dialog").on("show.bs.modal", function(n) {
                x = !0;
            }), r("#troubleshoot-dialog").on("hide.bs.modal", function(n) {
                x = !1, f(null, !0);
            });
            var C = !1;
            r(e).on("ready", s).on("added updated", function(n, e) {
                e.visible ? e.problem && _.frames.remove(e) : _.frames.remove(e), b(), C && f();
            }).on("removed", function(n, e) {
                _.frames.remove(e), b();
            }), e.ready && s(), r("#machine-link").on("click", function(n) {
                if (1 == e.list.length) return _.jump({
                    host: e.list[0].address,
                    sidebar: !0,
                    component: ""
                }), !1;
            }), i.transport.wait(function() {
                _.start();
            });
        }
        function a(n) {
            function e() {
                var n = f.current_frame();
                n && r(n).hide(), r(".curtains-ct .spinner").toggle(!1), r("#machine-reconnect").toggle(!0), 
                r(".curtains-ct i").toggle(!0), r(".curtains-ct h1").text(c("Disconnected")), r(".curtains-ct p").text(i.message(h)), 
                r(".curtains-ct").show(), r("#navbar-dropdown").addClass("disabled"), o();
            }
            function t(n, e) {
                var t = p.ordered("dashboard");
                h || (n || (n = f.retrieve_state()), !n.component && t.length > 0 && (n.component = t[0].path), 
                a(n), d(n), f.recalculate_layout(), f.jump(n, !0));
            }
            function a(n) {
                r(".dashboard-link").each(function() {
                    var e = r(this);
                    e.toggleClass("active", e.attr("data-component") === n.component);
                });
                var e = p.items[n.component];
                e && "dashboard" == e.section && delete n.sidebar, r("#machine-link span").text(u), 
                r(".dashboard-link").length < 2 && r("#content-navbar").toggleClass("hidden", !0);
            }
            function s(n) {
                n ? n += " - " : n = "", document.title = n + u;
            }
            function d(n) {
                var e, t = f.current_frame(), a = n.hash, i = n.component;
                i && (e = f.frames.lookup(null, i, a)), e != t && (r(t).css("display", "none"), 
                f.current_frame(e));
                var l, c;
                r(e).css("display", "block"), c = p.items[n.component], l = c ? c.label : "", s(l), 
                o();
            }
            n || (n = {}), n.navigate = function(n, e) {
                return t(n, e);
            };
            var u = n.default_title || "Cockpit", f = l.new_index_from_proto(n), p = l.new_compiled();
            p.load(i.manifests, "dashboard");
            var h = null;
            r(f).on("disconnect", function(n, t) {
                h = t, e();
            }), r("#machine-reconnect").on("click", function(n) {
                i.sessionStorage.clear(), window.location.reload(!0);
            }), f.ready(), i.transport.wait(function() {
                f.start();
            });
        }
        function s(n) {
            window.messages.push(n);
        }
        var r = t(3), i = t(4), l = t(26), c = i.gettext, d = window.location.pathname.indexOf(".html") !== -1;
        n.exports = {
            simple_index: function(n) {
                return new a(n);
            },
            machines_index: function(n, t, o, a) {
                return new e(n, t, o, a);
            }
        }, "index-page" === document.documentElement.getAttribute("class") && (window.name = "cockpit1", 
        window.options = {
            sink: !0,
            protocol: "cockpit1"
        }, window.messages = [], window.messages.cancel = function() {
            window.removeEventListener("message", s, !1), window.messages = null;
        }, window.addEventListener("message", s, !1));
    }();
}, function(n, e, t) {
    "use strict";
    var o = o || function() {};
    !function() {
        function e(n) {
            function e(n) {
                c(n.contentWindow).off(), c(n).remove();
            }
            function t(e, o) {
                var a = !1;
                window.clearTimeout(e.timer), e.timer = null;
                try {
                    a = c("body", e.contentWindow.document).is(":visible");
                } catch (n) {
                    a = !0;
                }
                o || (o = 0), o += 1, o > 50 && (a = !0), a ? "1" != e.getAttribute("data-ready") && (e.setAttribute("data-ready", "1"), 
                o > 0 && n.navigate()) : e.timer = window.setTimeout(function() {
                    t(e, o + 1);
                }, 100);
            }
            var o = this, a = {};
            o.remove = function(n) {
                var t = n.address;
                t || (t = "localhost");
                var o = a[t];
                o && (delete a[t], c.each(o, function(n, t) {
                    e(t);
                }));
            }, o.lookup_component_hash = function(n, e) {
                var t, o, s, r;
                if (n && (t = n.address), t || (t = "localhost"), o = a[t], o && (s = o[e]), s && (r = s.getAttribute("src"))) return r.split("#")[1];
            }, o.lookup = function(n, o, s) {
                var r, i, l = !1;
                n && (r = n.connection_string, i = n.address), r || (r = "localhost"), i || (i = r);
                var d = a[i];
                d || (a[i] = d = {});
                var u = "cockpit1:" + r + "/" + o, f = d[o];
                f && f.getAttribute("name") != u && (e(f), f = null);
                var p, h;
                if (f || (p = window.frames[u], p && (f = p.frameElement), f && (h = f.getAttribute("src"), 
                f.url = h.split("#")[0], d[o] = f)), !f) {
                    l = !0, f = document.createElement("iframe"), f.setAttribute("class", "container-frame"), 
                    f.setAttribute("name", u), f.style.display = "none";
                    var m, v;
                    n && (v = n.checksum), m = "localhost" === r ? ".." : v ? "../../" + v : "../../@" + r, 
                    f.url = m + "/" + o, o.indexOf("/") === -1 && (f.url += "/index"), f.url += ".html";
                }
                return s || (s = "/"), h = f.url + "#" + s, f.getAttribute("src") != h && f.setAttribute("src", h), 
                l && (d[o] = f, c("#content").append(f)), t(f), f;
            };
        }
        function a(n) {
            function e(e, t) {
                var o = n.current_frame();
                if (e === window || o && o.contentWindow == e) {
                    var a = t.location || "";
                    "/" != a[0] && (a = "/" + a), t.host && (a = "/@" + encodeURIComponent(t.host) + a), 
                    n.jump(a);
                }
            }
            function t(e) {
                var t, o = n.current_frame();
                o && o.contentWindow === e && e.name && e.name.indexOf("/shell/shell") === -1 && (t = e.location.hash, 
                0 === t.indexOf("#") && (t = t.substring(1)), "/" === t && (t = ""), n.jump({
                    hash: t
                }));
            }
            function a(n) {
                var e = v[n.target.defaultView.name];
                e && i(e);
            }
            function s(n) {
                var e = v[n.target.name];
                e && t(e.window);
            }
            function r(n) {
                var e = v[n.target.contentWindow.name];
                e && t(e.window);
            }
            function i(n) {
                var e = n.window;
                d.kill(null, e.name);
                var t = e.frameElement;
                t && t.removeEventListener("load", r), e.removeEventListener("unload", a), e.removeEventListener("hashchange", s), 
                delete m[n.channel_seed], delete v[n.name];
            }
            function l(e) {
                var i, l = e.name || "";
                if (0 === l.indexOf("cockpit1:") && (i = l.substring(9).split("/")[0]), !l || !i) return void console.warn("invalid child window name", e, l);
                p += 1;
                var c = (d.transport.options["channel-seed"] || "undefined:") + p + "!", u = {
                    name: l,
                    window: e,
                    channel_seed: c,
                    default_host: i,
                    inited: !1
                };
                m[c] = u, v[l] = u;
                var f = e.frameElement;
                return f.addEventListener("load", r), e.addEventListener("unload", a), e.addEventListener("hashchange", s), 
                f.setAttribute("data-loaded", "1"), t(e), o(), n.navigate(), u;
            }
            function u(t) {
                if (t.origin === h) {
                    var o = t.data, a = t.source;
                    if (a && "string" == typeof o) {
                        var s, r = v[a.name];
                        if (0 === o.length) return void (r && i(r));
                        if ("\n" == o[0]) if (s = JSON.parse(o.substring(1)), "init" === s.command) {
                            if (r && i(r), r = l(a)) {
                                var u = c.extend({}, d.transport.options, {
                                    command: "init",
                                    host: r.default_host,
                                    "channel-seed": r.channel_seed
                                });
                                a.postMessage("\n" + JSON.stringify(u), h), r.inited = !0, a.frameElement != n.current_frame() && f.hint(a.frameElement.contentWindow, {
                                    hidden: !0
                                });
                            }
                        } else {
                            if ("jump" === s.command) return void e(a, s);
                            if ("hint" === s.command) return void ("restart" == s.hint ? s.host != d.transport.host && n.expect_restart(s.host) : d.hint(s.hint, s));
                            if ("oops" == s.command) return void n.show_oops();
                            if (void 0 === s.channel) return;
                            "open" == s.command && (s.group = a.name, o = "\n" + JSON.stringify(s));
                        }
                        return r ? void d.transport.inject(o, !0) : void console.warn("child frame " + a.name + " sending data without init");
                    }
                }
            }
            var f = this, p = 0, h = d.transport.origin, m = {}, v = {};
            d.transport.filter(function(e, t, o) {
                var a, s, r;
                if (o) if (void 0 !== o.channel) for (a in m) m[a].window.postMessage(e, h); else "hint" == o.command && o.credential && n.authorize_changed(o.credential); else if (t && (r = t.indexOf("!"), 
                r !== -1 && (a = t.substring(0, r + 1), s = m[a]))) return s.window.postMessage(e, h), 
                !1;
                return !0;
            }, !1), f.start = function(n) {
                window.addEventListener("message", u, !1);
                for (var e = 0, t = n.length; e < t; e++) u(n[e]);
            }, f.hint = function(n, e) {
                var t, o = v[n.name];
                o && o.inited && (e.command = "hint", t = "\n" + JSON.stringify(e), o.window.postMessage(t, h));
            };
        }
        function s() {
            function n(n, e, t) {
                var o = [];
                n.host && (e || "localhost" !== n.host) && o.push("@" + n.host), n.component && o.push.apply(o, n.component.split("/"));
                var a = d.location.encode(o, null, t);
                return n.hash && "/" !== n.hash && (a += "#" + n.hash), a;
            }
            function t(n) {
                var e = {
                    version: "v1",
                    hash: ""
                }, t = n.indexOf("#");
                t !== -1 && (e.hash = n.substring(t + 1), n = n.substring(0, t)), "/" != n[0] && (n = "/" + n);
                var o = d.location.decode(n);
                return o[0] && "@" == o[0][0] ? (e.host = o.shift().substring(1), e.sidebar = !0) : e.host = "localhost", 
                o.length && "index" == o[o.length - 1] && o.pop(), e.component = o.join("/"), e;
            }
            function s() {
                function n(n) {
                    var e = c("<a>").attr("href", w.href({
                        host: "localhost",
                        component: n.path
                    })).text(n.label);
                    return c("<li class='dashboard-link'>").attr("data-component", n.path).append(e);
                }
                var e = c("#content-navbar");
                if (u) e.hide(); else {
                    var t = new r();
                    t.load(d.manifests, "dashboard"), e.append(t.ordered("dashboard").map(n));
                }
            }
            function i(n) {
                var e = c(n);
                e && e.children("a").on("click", function() {
                    c("#error-popup-title").text(f("Unexpected error"));
                    var n = f("Cockpit had an unexpected internal error. <br/><br/>You can try restarting Cockpit by pressing refresh in your browser. The javascript console contains details about this error (<b>Ctrl-Shift-J</b> in most browsers).");
                    c("#error-popup-message").html(n), c("#error-popup").modal("show");
                });
            }
            function l(n, e) {
                var t, o = JSON.parse(window.localStorage["os-release"] || "{}"), a = c(n)[0];
                if (a && (t = window.getComputedStyle(a)), t) {
                    var s, r = t.content;
                    return r && "none" != r && "normal" != r ? (s = r.length, ('"' === r[0] || "'" === r[0]) && s > 2 && r[s - 1] === r[0] && (r = r.substr(1, s - 2)), 
                    a.innerHTML = d.format(r, o) || e, c(a).text()) : void 0;
                }
            }
            function p(n) {
                c(n).on("click", function() {
                    d.logout();
                });
            }
            function h(n) {
                var e = d.manifests.shell || {};
                c(".display-language-menu").toggle(!!e.locales);
                var t = document.cookie.replace(/(?:(?:^|.*;\s*)CockpitLang\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                t || (t = "en-us"), c.each(e.locales || {}, function(n, e) {
                    var o = c("<option>").text(e).val(n);
                    n == t && o.attr("selected", "true"), c("#display-language-list").append(o);
                }), c("#display-language-select-button").on("click", function(n) {
                    var e = c("#display-language-list").val(), t = "CockpitLang=" + encodeURIComponent(e) + "; path=/; expires=Sun, 16 Jul 3567 06:23:41 GMT";
                    return document.cookie = t, window.localStorage.setItem("cockpit.lang", e), window.location.reload(!0), 
                    !1;
                }), c(n).on("shown.bs.modal", function() {
                    c("display-language-list").focus(), o();
                });
            }
            function m(n) {
                c(d.info).on("changed", function() {
                    c(n).text(d.info.version), o();
                });
            }
            function v(n, e) {
                c(n).on("click", function() {
                    w.jump({
                        host: "localhost",
                        component: "users",
                        hash: "/" + e.name
                    });
                }).show();
            }
            function g(n, e) {
                c(n).text(e.full_name || e.name || "???");
                var t = "root" == e.name, o = e.name && !t;
                c("#deauthorize-item").toggle(o);
            }
            var b, w = this;
            if ("function" != typeof w.navigate) throw "Index requires a prototype with a navigate function";
            w.frames = new e(w), w.router = new a(w);
            var y = d.channel({
                payload: "null"
            });
            if (c(y).on("close", function(n, e) {
                var t = e.problem || "disconnected";
                console.warn("transport closed: " + t), c(w).triggerHandler("disconnect", t);
            }), c(document).on("click", "a[href]", function(n) {
                var e = this;
                window.location.host === e.host && (w.jump(e.getAttribute("href")), n.preventDefault(), 
                o());
            }), window.navigator.userAgent.indexOf("PhantomJS") == -1) {
                var _ = window.onerror;
                window.onerror = function(n, e, t) {
                    return w.show_oops(), o(), !!_ && _(n, e, t);
                };
            }
            w.recalculate_layout = function() {
                var n = c("#topnav"), e = c("#sidebar"), t = c("#content"), o = c(window).height(), a = n.height(), s = o - a;
                c(b).height(Math.floor(s)), e.height(s);
                var r = e.is(":visible") ? e.outerWidth() : 0;
                t.css("margin-left", r + "px");
            }, w.retrieve_state = function() {
                var n = window.history.state;
                return n && "v1" === n.version || (n = t(u ? "/" + window.location.hash : window.location.pathname + window.location.hash)), 
                n;
            }, w.jump = function(e, o) {
                "string" == typeof e && (e = t(e));
                var a = w.retrieve_state();
                e.host || (e.host = a.host || "localhost"), "component" in e || (e.component = a.component || "");
                var s, r = window.history, i = e.host !== a.host || e.component !== a.component;
                return i && !e.hash && (e.hash = w.frames.lookup_component_hash(e.host, e.component)), 
                s = u ? window.location : n(e, null, !0), o ? (r.replaceState(e, "", s), !1) : !(!i && e.hash === a.hash) && (r.pushState(e, "", s), 
                w.navigate(e, !0), !0);
            }, w.href = function(e, t) {
                return n(e, t);
            }, w.show_oops = function() {
                w.oops_sel && c(w.oops_sel).show();
            }, w.current_frame = function(n) {
                return void 0 !== n && (b !== n && (b && b.contentWindow && w.router.hint(b.contentWindow, {
                    hidden: !0
                }), n && n.contentWindow && w.router.hint(n.contentWindow, {
                    hidden: !1
                })), b = n), b;
            }, w.start = function() {
                var n = window.messages;
                n && n.cancel(), w.router.start(n || []);
            }, w.ready = function() {
                c(window).on("popstate", function(n) {
                    w.navigate(n.state, !0);
                }), c(window).on("resize", function() {
                    w.recalculate_layout();
                }), s(), w.navigate(), d.translate(), c("body").show();
            }, w.expect_restart = function(n) {
                c(w).triggerHandler("expect_restart", n);
            }, w.authorize_changed = function(n) {
                c(w.credential_sel).toggle("clear" != n);
            }, w.oops_sel && i(w.oops_sel), w.logout_sel && p(w.logout_sel), w.language_sel && h(w.language_sel);
            var k;
            w.brand_sel && (k = l(w.brand_sel, w.default_title), k && (w.default_title = k)), 
            w.about_sel && m(w.about_sel), (w.user_sel || w.account_sel) && d.user().done(function(n) {
                w.user_sel && g(w.user_sel, n), w.account_sel && v(w.account_sel, n);
            });
        }
        function r() {
            var n = this;
            n.items = {}, n.load = function(e, t) {
                c.each(e || {}, function(e, o) {
                    c.each(o[t] || {}, function(o, a) {
                        var s = {
                            section: t,
                            label: d.gettext(a.label) || o,
                            order: void 0 === a.order ? 1e3 : a.order,
                            wants: a.wants
                        };
                        a.path ? s.path = a.path.replace(/\.html$/, "") : s.path = e + "/" + o, s.path.indexOf("/") === -1 && (s.path = e + "/" + s.path), 
                        "/index" == s.path.slice(-6) && (s.path = s.path.slice(0, -6)), n.items[s.path] = s;
                    });
                });
            }, n.ordered = function(e) {
                var t, o = [];
                for (t in n.items) e && n.items[t].section !== e || o.push(n.items[t]);
                return o.sort(function(n, e) {
                    return n.order - e.order;
                }), o;
            }, n.search = function(e, t) {
                var o;
                for (o in n.items) if (n.items[o][e] === t) return n.items[o];
            };
        }
        function i(n) {
            1 == arguments.length && "function" == typeof n.then && (n.then(function() {
                console.log.apply(console, arguments);
            }, function() {
                console.error.apply(console, arguments);
            }), "function" == typeof n.stream && n.stream(function() {
                console.log.apply(console, arguments);
            }));
        }
        var l, c = t(3), d = t(4), u = window.location.pathname.indexOf(".html") !== -1, f = d.gettext;
        Object.defineProperties(window, {
            cockpit: {
                value: d
            },
            zz: {
                get: function() {
                    return l;
                },
                set: function(n) {
                    l = n, i(n);
                }
            }
        }), n.exports = {
            new_index_from_proto: function(n) {
                var e = new Object(n);
                return s.call(e), e;
            },
            new_compiled: function() {
                return new r();
            }
        };
    }();
}, function(n, e) {} ]);
//# sourceMappingURL=index.min.js.map