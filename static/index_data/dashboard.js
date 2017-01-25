!function(t) {
    function e(o) {
        if (n[o]) return n[o].exports;
        var i = n[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return t[o].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0);
}([ function(t, e, n) {
    t.exports = n(1);
}, function(t, e, n) {
    "use strict";
    function o(t, e, n) {
        var o = t.lookup(n);
        if (o) {
            var i = "localhost" != o.address, a = l("#host-edit-dialog");
            l("#host-edit-fail").text("").hide(), l("#host-edit-name").val(o.label), l("#host-edit-name").prop("disabled", "failed" == o.state), 
            l("#host-edit-user-row").toggle(f.allow_connection_string), f.allow_connection_string && (c.user().done(function(t) {
                l("#host-edit-user").attr("placeholder", t.name);
            }), l("#host-edit-user").prop("disabled", !i), l("#host-edit-user").val(o.user), 
            l("#host-edit-dialog a[data-content]").popover()), e.render_color_picker("#host-edit-colorpicker", o.address), 
            l("#host-edit-sync-users").off("click"), l("#host-edit-sync-users").on("click", function() {
                l("#host-edit-dialog").modal("hide"), e.render_dialog("sync-users", "dashboard_setup_server_dialog", o.address);
            }), l("#host-edit-apply").off("click"), l("#host-edit-apply").on("click", function() {
                a.dialog("failure", null);
                var e = {
                    avatar: g.changed ? g.get_data(128, 128, "image/png") : null,
                    color: f.colors.parse(l("#host-edit-colorpicker #host-edit-color").css("background-color")),
                    label: l("#host-edit-name").val()
                };
                i && f.allow_connection_string && (e.user = l("#host-edit-user").val());
                var n = t.change(o.key, e);
                a.dialog("promise", n);
            }), l("#host-edit-avatar").off("click"), l("#host-edit-avatar").on("click", function() {
                l("#host-edit-fail").text("").hide(), g.select_file().done(function() {
                    l("#host-edit-avatar").off("click"), g.changed = !0, g.start_cropping();
                });
            }), a.modal("show"), g.stop_cropping(), g.load_data(o.avatar || "images/server-large.png").fail(function() {
                l("#host-edit-fail").text("Can't load image").show();
            });
        }
    }
    function i() {
        l(".servers-privileged").update_privileged(y, c.format(m("The user <b>$0</b> is not permitted to manage servers"), y.user ? y.user.name : ""));
    }
    function a() {
        this._init();
    }
    function r(t, e) {
        t._entered_ && t.leave(), t.enter(e), t._entered_ = !0, l("#" + t.id).show(), t.show();
    }
    function s() {
        function t() {
            var t = c.location.path;
            0 === t.length ? r(e) : (console.warn("not a dashboard location: " + t), c.location = ""), 
            l("body").removeAttr("hidden");
        }
        var e;
        c.translate(), e = new a(), e.setup(), l(c).on("locationchanged", t), t();
    }
    var l = n(2), c = n(3), d = n(4), u = n(6), f = n(10), h = n(11);
    n(18);
    var p = n(29), m = c.gettext;
    l(document).on("click", "a[data-address]", function(t) {
        c.jump("/", l(this).attr("data-address")), t.preventDefault();
    });
    var g, v = {
        legend: {
            show: !1
        },
        series: {
            shadowSize: 0
        },
        xaxis: {
            tickColor: "#d1d1d1",
            mode: "time",
            tickFormatter: u.format_date_tick,
            minTickSize: [ 1, "minute" ]
        },
        points: {
            radius: 0
        },
        grid: {
            borderWidth: 1,
            borderColor: "#e1e6ed",
            hoverable: !0,
            autoHighlight: !1
        }
    }, b = [ {
        selector: "#dashboard-plot-0",
        plot: {
            direct: [ "kernel.all.cpu.nice", "kernel.all.cpu.user", "kernel.all.cpu.sys" ],
            internal: [ "cpu.basic.nice", "cpu.basic.user", "cpu.basic.system" ],
            units: "millisec",
            derive: "rate",
            factor: .1
        },
        options: {
            yaxis: {
                tickColor: "#e1e6ed",
                tickFormatter: function(t) {
                    return t + "%";
                }
            }
        },
        ymax_unit: 100
    }, {
        selector: "#dashboard-plot-1",
        plot: {
            direct: [ "mem.util.used" ],
            internal: [ "memory.used" ],
            units: "bytes"
        },
        options: {
            yaxis: {
                ticks: u.memory_ticks,
                tickColor: "#e1e6ed",
                tickFormatter: u.format_bytes_tick
            }
        },
        ymax_unit: 1e8
    }, {
        selector: "#dashboard-plot-2",
        plot: {
            direct: [ "network.interface.total.bytes" ],
            internal: [ "network.all.rx", "network.all.tx" ],
            units: "bytes",
            "omit-instances": [ "lo" ],
            derive: "rate"
        },
        options: {
            yaxis: {
                tickColor: "#e1e6ed",
                tickFormatter: u.format_bits_per_sec_tick
            }
        },
        ymax_min: 1e5
    }, {
        selector: "#dashboard-plot-3",
        plot: {
            direct: [ "disk.dev.total_bytes" ],
            internal: [ "block.device.read", "block.device.written" ],
            units: "bytes",
            derive: "rate"
        },
        options: {
            yaxis: {
                ticks: u.memory_ticks,
                tickColor: "#e1e6ed",
                tickFormatter: u.format_bytes_per_sec_tick
            }
        },
        ymax_min: 1e5
    } ];
    l(function() {
        g = p(l("#host-edit-avatar"), 256, 256);
    });
    var y = c.permission({
        admin: !0
    });
    l(y).on("changed", i), a.prototype = {
        _init: function() {
            this.id = "dashboard", this.edit_enabled = !1;
        },
        getTitle: function() {
            return null;
        },
        toggle_edit: function(t) {
            var e = this;
            e.edit_enabled = t, l("#dashboard-enable-edit").toggleClass("active", e.edit_enabled), 
            l(".os").toggleClass("hidden", e.edit_enabled), l("#dashboard-hosts").toggleClass("editable", e.edit_enabled);
        },
        setup: function() {
            function t(t) {
                l("#dashboard .nav-tabs li").removeClass("active"), l("#dashboard .nav-tabs li[data-monitor-id=" + t + "]").addClass("active"), 
                g = t, l(".dashboard-plot").hide(), l(b[t].selector).show(), r();
            }
            function e() {
                var t = !1, e = {};
                l.each(x, function(t) {
                    e[t] = !0;
                }), l("#dashboard-hosts .list-group-item").each(function() {
                    var o = l(this), i = o.attr("data-address"), a = p.machines.lookup(i);
                    a && "connected" == a.state && (delete e[i], x[i] || (x[i] = s(i)), x[i].forEach(function(e) {
                        l(e).off("hover").on("hover", function(t, e) {
                            n(o, e);
                        });
                        var i = a.color;
                        e.options.color != i && (t = !0, e.options.color = i);
                    }));
                }), l.each(e, function(t) {
                    x[t].forEach(function(t) {
                        t.remove();
                    }), delete x[t];
                }), t && r();
            }
            function n(t, e) {
                t.toggleClass("highlight-ct", e);
                var n = x[t.attr("data-address")];
                n && (n.forEach(function(t) {
                    t.options.lines.lineWidth = e ? 3 : 2, e && t.move_to_front();
                }), r());
            }
            function a(t) {
                function n() {
                    return "failed" == this.state ? "../shell/images/server-error.png" : this.avatar ? this.avatar : "../shell/images/server-small.png";
                }
                function o() {
                    return this.restarting ? "hidden" : "";
                }
                function a() {
                    return this.restarting ? "" : "hidden";
                }
                function r() {
                    var r = d.render(c, {
                        machines: p.machines.list,
                        render_avatar: n,
                        avatar_display: o,
                        connecting_display: a
                    });
                    t.html(r), l("[data-color]", t).each(function() {
                        l(this).css("border-left-color", l(this).attr("data-color"));
                    }), l(".delete-localhost").tooltip({
                        title: m("You are currently connected directly to this server. You cannot delete it.")
                    }), l(".delete-localhost").toggleClass("disabled", !0), l(".delete-localhost").toggleClass("servers-privileged", !1), 
                    i(), e();
                }
                function s() {
                    var t = null;
                    return function() {
                        null === t && (t = window.setTimeout(function() {
                            t = null, r();
                        }, 500));
                    };
                }
                var c = l("#dashboard-hosts-tmpl").html();
                return d.parse(c), s();
            }
            function r() {
                p.plots.forEach(function(t) {
                    t.refresh();
                });
            }
            function s(t) {
                var e = p.machines.lookup(t);
                if (!e || "connected" != e.state) return null;
                var n = [], o = 0;
                return b.forEach(function(t) {
                    p.plots[o] && n.push(p.plots[o].add_metrics_sum_series(l.extend({
                        host: e.connection_string
                    }, t.plot), {
                        color: e.color,
                        lines: {
                            lineWidth: 2
                        }
                    })), o += 1;
                }), n;
            }
            function c() {
                p.plots = [], b.forEach(function(t) {
                    function e(e) {
                        var n = e.getAxes(), o = t;
                        t.ymax_unit && (n.yaxis.datamax ? n.yaxis.options.max = Math.ceil(n.yaxis.datamax / o.ymax_unit) * t.ymax_unit : n.yaxis.options.max = t.ymax_unit), 
                        t.ymax_min && (n.yaxis.datamax < t.ymax_min ? n.yaxis.options.max = t.ymax_min : n.yaxis.options.max = null), 
                        n.yaxis.options.min = 0;
                    }
                    if (t.selector) {
                        var n = l.extend({
                            setup_hook: e
                        }, v, t.options), o = u.plot(l(t.selector));
                        o.set_options(n), p.plots.push(o);
                    }
                }), x = {}, e();
            }
            var p = this;
            p.machines = f.instance(), p.mdialogs = h.new_manager(p.machines);
            var g = 0;
            l("#dashboard-add").click(function() {
                p.mdialogs.render_dialog("add-machine", "dashboard_setup_server_dialog");
            }), l("#dashboard-enable-edit").click(function() {
                p.toggle_edit(!p.edit_enabled);
            });
            var y = a(l("#dashboard-hosts .list-group"));
            l(p.machines).on("added.dashboard", y), l(p.machines).on("removed.dashboard", y), 
            l(p.machines).on("updated.dashboard", y), l("#dashboard .nav-tabs li").click(function() {
                t(parseInt(l(this).data("monitor-id"), 10));
            }), c(), t(g), u.setup_plot_controls(l("#dashboard"), l("#dashboard-toolbar"), p.plots), 
            l("#dashboard-hosts").on("click", "a.list-group-item", function() {
                if (p.edit_enabled) return !1;
            }).on("click", "button.pficon-delete", function() {
                var t = l(this).parent(".list-group-item");
                p.toggle_edit(!1);
                var e = p.machines.lookup(t.attr("data-address"));
                return e && p.machines.change(e.key, {
                    visible: !1
                }), !1;
            }).on("click", "button.pficon-edit", function() {
                var t = l(this).parent(".list-group-item"), e = t.attr("data-address");
                return p.toggle_edit(!1), o(p.machines, p.mdialogs, e), !1;
            }).on("mouseenter", "a.list-group-item", function() {
                n(l(this), !0);
            }).on("mouseleave", "a.list-group-item", function() {
                n(l(this), !1);
            });
            var x = {};
            l(window).on("resize.dashboard", function() {
                p.plots.forEach(function(t) {
                    t.resize();
                });
            }), y();
        },
        show: function() {
            i(), this.plots[0].resize(), this.toggle_edit(!1);
        },
        enter: function() {},
        leave: function() {}
    }, l(s);
}, function(t, e) {
    t.exports = jQuery;
}, function(t, e) {
    t.exports = cockpit;
}, function(t, e, n) {
    "use strict";
    function o(t) {
        if (t in r) return r[t];
        var e = document.createElement("div");
        e.innerHTML = t, i.translate(e);
        var n = e.innerHTML;
        return r[t] = n, n;
    }
    var i = n(3), a = n(5), r = {};
    t.exports = i.extend({}, a, {
        render: function(t, e, n) {
            return o(a.render(t, e, n));
        },
        to_html: function(t, e, n, i) {
            return o(a.to_html(t, e, n, i));
        },
        clearCache: function() {
            return r = {}, a.clearCache();
        }
    });
}, function(t, e, n) {
    var o, i;
    /*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */
    !function(a, r) {
        if ("object" == typeof e && e) r(e); else {
            var s = {};
            r(s), o = s, i = "function" == typeof o ? o.call(e, n, e, t) : o, !(void 0 !== i && (t.exports = i));
        }
    }(this, function(t) {
        function e(t, e) {
            return y.call(t, e);
        }
        function n(t) {
            return !e(m, t);
        }
        function o(t) {
            return "function" == typeof t;
        }
        function i(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        }
        function a(t) {
            return String(t).replace(/[&<>"'\/]/g, function(t) {
                return k[t];
            });
        }
        function r(t) {
            if (!w(t) || 2 !== t.length) throw new Error("Invalid tags: " + t);
            return [ new RegExp(i(t[0]) + "\\s*"), new RegExp("\\s*" + i(t[1])) ];
        }
        function s(e, o) {
            function a() {
                if (M && !S) for (;T.length; ) delete C[T.pop()]; else T = [];
                M = !1, S = !1;
            }
            o = o || t.tags, e = e || "", "string" == typeof o && (o = o.split(p));
            for (var s, u, f, m, y, x, w = r(o), k = new d(e), _ = [], C = [], T = [], M = !1, S = !1; !k.eos(); ) {
                if (s = k.pos, f = k.scanUntil(w[0])) for (var z = 0, A = f.length; z < A; ++z) m = f.charAt(z), 
                n(m) ? T.push(C.length) : S = !0, C.push([ "text", m, s, s + 1 ]), s += 1, "\n" === m && a();
                if (!k.scan(w[0])) break;
                if (M = !0, u = k.scan(b) || "name", k.scan(h), "=" === u ? (f = k.scanUntil(g), 
                k.scan(g), k.scanUntil(w[1])) : "{" === u ? (f = k.scanUntil(new RegExp("\\s*" + i("}" + o[1]))), 
                k.scan(v), k.scanUntil(w[1]), u = "&") : f = k.scanUntil(w[1]), !k.scan(w[1])) throw new Error("Unclosed tag at " + k.pos);
                if (y = [ u, f, s, k.pos ], C.push(y), "#" === u || "^" === u) _.push(y); else if ("/" === u) {
                    if (x = _.pop(), !x) throw new Error('Unopened section "' + f + '" at ' + s);
                    if (x[1] !== f) throw new Error('Unclosed section "' + x[1] + '" at ' + s);
                } else "name" === u || "{" === u || "&" === u ? S = !0 : "=" === u && (w = r(o = f.split(p)));
            }
            if (x = _.pop()) throw new Error('Unclosed section "' + x[1] + '" at ' + k.pos);
            return c(l(C));
        }
        function l(t) {
            for (var e, n, o = [], i = 0, a = t.length; i < a; ++i) e = t[i], e && ("text" === e[0] && n && "text" === n[0] ? (n[1] += e[1], 
            n[3] = e[3]) : (o.push(e), n = e));
            return o;
        }
        function c(t) {
            for (var e, n, o = [], i = o, a = [], r = 0, s = t.length; r < s; ++r) switch (e = t[r], 
            e[0]) {
              case "#":
              case "^":
                i.push(e), a.push(e), i = e[4] = [];
                break;

              case "/":
                n = a.pop(), n[5] = e[2], i = a.length > 0 ? a[a.length - 1][4] : o;
                break;

              default:
                i.push(e);
            }
            return o;
        }
        function d(t) {
            this.string = t, this.tail = t, this.pos = 0;
        }
        function u(t, e) {
            this.view = null == t ? {} : t, this.cache = {
                ".": this.view
            }, this.parent = e;
        }
        function f() {
            this.cache = {};
        }
        var h = /\s*/, p = /\s+/, m = /\S/, g = /\s*=/, v = /\s*\}/, b = /#|\^|\/|>|\{|&|=|!/, y = RegExp.prototype.test, x = Object.prototype.toString, w = Array.isArray || function(t) {
            return "[object Array]" === x.call(t);
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
        }, d.prototype.scan = function(t) {
            var e = this.tail.match(t);
            if (e && 0 === e.index) {
                var n = e[0];
                return this.tail = this.tail.substring(n.length), this.pos += n.length, n;
            }
            return "";
        }, d.prototype.scanUntil = function(t) {
            var e, n = this.tail.search(t);
            switch (n) {
              case -1:
                e = this.tail, this.tail = "";
                break;

              case 0:
                e = "";
                break;

              default:
                e = this.tail.substring(0, n), this.tail = this.tail.substring(n);
            }
            return this.pos += e.length, e;
        }, u.prototype.push = function(t) {
            return new u(t, this);
        }, u.prototype.lookup = function(t) {
            var e;
            if (t in this.cache) e = this.cache[t]; else {
                for (var n = this; n; ) {
                    if (t.indexOf(".") > 0) {
                        e = n.view;
                        for (var i = t.split("."), a = 0; null != e && a < i.length; ) e = e[i[a++]];
                    } else e = n.view[t];
                    if (null != e) break;
                    n = n.parent;
                }
                this.cache[t] = e;
            }
            return o(e) && (e = e.call(this.view)), e;
        }, f.prototype.clearCache = function() {
            this.cache = {};
        }, f.prototype.parse = function(t, e) {
            var n = this.cache, o = n[t];
            return null == o && (o = n[t] = s(t, e)), o;
        }, f.prototype.render = function(t, e, n) {
            var o = this.parse(t), i = e instanceof u ? e : new u(e);
            return this.renderTokens(o, i, n, t);
        }, f.prototype.renderTokens = function(e, n, i, a) {
            function r(t) {
                return d.render(t, n, i);
            }
            for (var s, l, c = "", d = this, u = 0, f = e.length; u < f; ++u) switch (s = e[u], 
            s[0]) {
              case "#":
                if (l = n.lookup(s[1]), !l) continue;
                if (w(l)) for (var h = 0, p = l.length; h < p; ++h) c += this.renderTokens(s[4], n.push(l[h]), i, a); else if ("object" == typeof l || "string" == typeof l) c += this.renderTokens(s[4], n.push(l), i, a); else if (o(l)) {
                    if ("string" != typeof a) throw new Error("Cannot use higher-order sections without the original template");
                    l = l.call(n.view, a.slice(s[3], s[5]), r), null != l && (c += l);
                } else c += this.renderTokens(s[4], n, i, a);
                break;

              case "^":
                l = n.lookup(s[1]), (!l || w(l) && 0 === l.length) && (c += this.renderTokens(s[4], n, i, a));
                break;

              case ">":
                if (!i) continue;
                l = o(i) ? i(s[1]) : i[s[1]], null != l && (c += this.renderTokens(this.parse(l), n, i, l));
                break;

              case "&":
                l = n.lookup(s[1]), null != l && (c += l);
                break;

              case "name":
                l = n.lookup(s[1]), null != l && (c += t.escape(l));
                break;

              case "text":
                c += s[1];
            }
            return c;
        }, t.name = "mustache.js", t.version = "0.8.1", t.tags = [ "{{", "}}" ];
        var _ = new f();
        t.clearCache = function() {
            return _.clearCache();
        }, t.parse = function(t, e) {
            return _.parse(t, e);
        }, t.render = function(t, e, n) {
            return _.render(t, e, n);
        }, t.to_html = function(e, n, i, a) {
            var r = t.render(e, n, i);
            return o(a) ? void a(r) : r;
        }, t.escape = a, t.Scanner = d, t.Context = u, t.Writer = f;
    });
}, function(t, e, n) {
    "use strict";
    function o(t, e, n, o) {
        function a() {
            b.width(v.width()), b.height(v.height());
        }
        function r(t) {
            h ? (h.getAxes().yaxis.options.max = t, d()) : m.yaxis.max = t;
        }
        function s() {
            g = !0, l();
        }
        function l() {
            g && 0 !== v.width() && 0 !== v.height() && (h ? u() : (a(), h = i.plot(b, n, m)));
        }
        function c() {
            g = !1;
        }
        function d() {
            h && g && (h.setData(n), o.setup_hook && o.setup_hook(h), h.setupGrid(), h.draw());
        }
        function u() {
            h && g && (a(), b.width() > 0 && b.height() > 0 && h.resize(), d());
        }
        function f() {
            i(p).trigger("destroyed"), i(window).off("resize", u), i(v).empty(), h = null;
        }
        var h, p, m = {
            colors: [ "#0099d3" ],
            legend: {
                show: !1
            },
            series: {
                shadowSize: 0,
                lines: {
                    lineWidth: 0,
                    fill: 1
                }
            },
            xaxis: {
                tickFormatter: function() {
                    return "";
                }
            },
            yaxis: {
                tickFormatter: function() {
                    return "";
                }
            },
            points: {
                radius: 0
            },
            grid: {
                borderWidth: 1,
                aboveData: !0,
                color: "black",
                borderColor: i.color.parse("black").scale("a", .22).toString(),
                labelMargin: 0
            }
        }, g = !1;
        i.extend(!0, m, o);
        var v = i(t), b = i("<div/>");
        return v.empty(), v.append(b), i(e).on("notify", d), i(window).on("resize", u), 
        l(), p = {
            start: s,
            stop: c,
            resize: u,
            element: b[0],
            set_yaxis_max: r,
            destroy: f
        };
    }
    var i = n(2), a = n(3);
    n(7), n(8), n(9);
    var r = {}, s = a.gettext;
    r.plot = function(t, e, n) {
        function o() {
            if (0 !== t.height() && 0 !== t.width()) {
                null === z && (z = i.plot(t, S, C)), z.setData(S);
                var e = z.getAxes();
                e.xaxis.options.min = _.beg * k, e.xaxis.options.max = (_.end - 2) * k, C.setup_hook && C.setup_hook(z), 
                e.xaxis.show = !0, e.xaxis.used = !0, e.yaxis.show = !0, e.yaxis.used = !0, z.setupGrid(), 
                z.draw();
            }
        }
        function r() {
            A || (A = !0, window.setTimeout(function() {
                A = !1, o();
            }, 0));
        }
        function s() {
            _.walk();
        }
        function l() {
            _.move(_.beg, _.end);
        }
        function c(t, e) {
            z && z.clearSelection(!0), k = 1e3 * Math.ceil(t / 1e3);
            var n;
            n = void 0 !== e ? new Date().getTime() - 1e3 * e : 0;
            var o = -Math.ceil((1e3 * t + n) / k), s = -Math.floor(n / k);
            if (_ && _.interval == k) _.move(o, s); else {
                _ && _.close(), _ = a.grid(k, o, s), E++;
                for (var l = 0; l < M.length; l++) M[l].reset();
                E--, d(), i(_).on("notify", function(t, e, n) {
                    r();
                });
            }
        }
        function d() {
            0 === E && _.sync();
        }
        function u() {
            _.close();
            for (var e = 0; e < M.length; e++) M[e].stop();
            C = {}, M = [], S = [], z = null, i(t).empty(), i(t).data("flot_data", null);
        }
        function f() {
            0 !== t.height() && 0 !== t.width() && (z && z.resize(), r());
        }
        function h(t) {
            C = t, z = null;
        }
        function p() {
            return C;
        }
        function m(t, e) {
            function n() {
                g && g.close();
            }
            function o() {
                S.push(e);
            }
            function s() {
                var t = S.indexOf(e);
                t >= 0 && S.splice(t, 1);
            }
            function l() {
                var t = S.indexOf(e);
                t >= 0 && (S.splice(t, 1), S.push(e));
            }
            function c() {
                n(), s(), r();
            }
            function u(e) {
                return {
                    name: e,
                    units: t.units,
                    derive: t.derive
                };
            }
            function f(t) {
                var e, n;
                if (!t) return 0;
                if (void 0 !== t.length) {
                    for (n = 0, e = 0; e < t.length; e++) n += f(t[e]);
                    return n;
                }
                return t;
            }
            function h() {
                function n() {
                    g.archives && !T.archives && (T.archives = !0, i(T).triggerHandler("changed"));
                }
                g && g.close(), g = a.metrics(k, b);
                var o = _.add(g, []), r = t.factor || 1;
                e.data = _.add(function(t, e, n) {
                    for (var i = 0; i < n; i++) t[e + i] = [ (_.beg + e + i) * k, f(o[e + i]) * r ];
                }), i(g).on("changed", n), n(), d();
            }
            function p(t, n) {
                return !(!n || n.series.data != e.data);
            }
            function m(t) {
                i(v).triggerHandler("hover", [ t ]);
            }
            var g = null, v = {
                options: e,
                move_to_front: l,
                remove: c
            };
            M.push({
                stop: n,
                reset: h,
                hover_hit: p,
                hover: m
            });
            var b = [];
            return t.direct && b.push({
                source: "direct",
                archive_source: "pcp-archive",
                metrics: t.direct.map(u),
                instances: t.instances,
                "omit-instances": t["omit-instances"],
                host: t.host
            }), t.internal && b.push({
                source: "internal",
                metrics: t.internal.map(u),
                instances: t.instances,
                "omit-instances": t["omit-instances"],
                host: t.host
            }), h(), o(), v;
        }
        function g(t, e) {
            function n() {
                f && f.close();
            }
            function o(e) {
                return {
                    name: e,
                    units: t.units,
                    derive: t.derive
                };
            }
            function r() {
                function t() {
                    f.archives && !T.archives && (T.archives = !0, i(T).triggerHandler("changed"));
                }
                f && f.close(), f = a.metrics(k, p), i(f).on("changed", t), t(), E++;
                for (var e in m) m[e].reset();
                E--, d();
            }
            function s(n, o) {
                function a() {
                    s = _.add(f, [ "a", n ]), l.data = _.add(function(t, e, n) {
                        for (var o = 0; o < n; o++) {
                            var i = (s[e + o] || 0) * c, a = (_.beg + e + o) * k, r = 0;
                            h && (r = h.data[e + o][1] ? h.data[e + o][1] : h.data[e + o][2]), Math.abs(i) > u ? (t[e + o] = [ a, r + i, r ], 
                            t[e + o - 1] && null === t[e + o - 1][1] && (t[e + o - 1][1] = t[e + o - 1][2])) : (t[e + o] = [ a, null, r ], 
                            t[e + o - 1] && null !== t[e + o - 1][1] && (t[e + o - 1][1] = t[e + o - 1][2]));
                        }
                    }), d();
                }
                function r() {
                    _.remove(s), _.remove(l.data);
                    var t = S.indexOf(l);
                    t >= 0 && S.splice(t, 1);
                }
                if (!m[n]) {
                    var s, l = i.extend({
                        selector: o
                    }, e), c = t.factor || 1, u = t.threshold || 0, h = g;
                    g = l, m[n] = l, l.reset = a, l.remove = r, a(), S.push(l);
                }
            }
            function l() {
                for (var t in m) m[t].remove();
                m = {}, g = null;
            }
            function c(t, e) {
                var n, o;
                if (!_) return !1;
                o = Math.round(t.x / k) - _.beg, o < 0 && (o = 0);
                for (n in m) {
                    var i = m[n].data;
                    if (i[o] && i[o][1] && i[o][2] <= t.y && t.y <= i[o][1]) return m[n].selector || n;
                }
                return !1;
            }
            function u(t) {
                i(h).triggerHandler("hover", [ t ]);
            }
            var f = null, h = {
                add_instance: s,
                clear_instances: l
            };
            M.push({
                stop: n,
                reset: r,
                hover_hit: c,
                hover: u
            });
            var p = [];
            t.direct && p.push({
                source: "direct",
                archive_source: "pcp-archive",
                metrics: [ o(t.direct) ],
                metrics_path_names: [ "a" ],
                instances: t.instances,
                "omit-instances": t["omit-instances"],
                host: t.host
            }), t.internal && p.push({
                source: "internal",
                metrics: [ o(t.internal) ],
                metrics_path_names: [ "a" ],
                instances: t.instances,
                "omit-instances": t["omit-instances"],
                host: t.host
            });
            var m = {}, g = null;
            return r(), h;
        }
        function v(t, e) {
            I != t ? (I && I.hover(!1), I = t, O = e, I && I.hover(O)) : O != e && (O = e, I && I.hover(O));
        }
        function b(t, e, n) {
            for (var o = null, i = !1, a = 0; a < M.length; a++) if (i = M[a].hover_hit(e, n)) {
                o = M[a];
                break;
            }
            v(o, i);
        }
        function y(t) {
            v(null, !1);
        }
        function x(t, e) {
            e && i(T).triggerHandler("zoomstart", []);
        }
        function w(t, e) {
            z.clearSelection(!0), i(T).triggerHandler("zoom", [ (e.xaxis.to - e.xaxis.from) / 1e3, e.xaxis.to / 1e3 ]);
        }
        var k, _, C = {}, T = {}, M = [], S = [], z = null, A = !1, E = 0, I = null, O = !1;
        return i(t).on("plothover", b), i(t).on("mouseleave", y), i(t).on("plotselecting", x), 
        i(t).on("plotselected", w), i(t).data("flot_data", S), c(e, n), i.extend(T, {
            archives: !1,
            start_walking: s,
            stop_walking: l,
            refresh: r,
            reset: c,
            destroy: u,
            resize: f,
            set_options: h,
            get_options: p,
            add_metrics_sum_series: m,
            add_metrics_stacked_instances_series: g
        }), T;
    };
    var l = [ "#006bb4", "#008ff0", "#2daaff", "#69c2ff", "#a5daff", "#e1f3ff", "#00243c", "#004778" ];
    r.plot_simple_template = function() {
        return {
            colors: l,
            legend: {
                show: !1
            },
            series: {
                shadowSize: 0,
                lines: {
                    lineWidth: 2,
                    fill: .4
                }
            },
            xaxis: {
                tickLength: 0,
                mode: "time",
                tickFormatter: r.format_date_tick,
                minTickSize: [ 1, "minute" ],
                reserveSpace: !1
            },
            yaxis: {
                tickColor: "#d1d1d1",
                min: 0
            },
            points: {
                radius: 0
            },
            grid: {
                borderWidth: 1,
                aboveData: !1,
                color: "black",
                borderColor: i.color.parse("black").scale("a", .22).toString(),
                labelMargin: 0
            }
        };
    }, r.memory_ticks = function(t) {
        for (var e = Math.pow(2, Math.ceil(Math.log(t.max / 5) / Math.LN2)), n = [], o = 0; o < t.max; o += e) n.push(o);
        return n;
    };
    var c = [ s("month-name", "Jan"), s("month-name", "Feb"), s("month-name", "Mar"), s("month-name", "Apr"), s("month-name", "May"), s("month-name", "Jun"), s("month-name", "Jul"), s("month-name", "Aug"), s("month-name", "Sep"), s("month-name", "Oct"), s("month-name", "Nov"), s("month-name", "Dec") ];
    r.format_date_tick = function(t, e) {
        function n(t) {
            var e = t.toFixed();
            return 1 == e.length && (e = "0" + e), e;
        }
        var o, i, a = 0, r = 1, s = 2, l = 3, d = e.tickSize[1];
        i = "minute" == d || "hour" == d ? l : "day" == d ? s : "month" == d ? r : a;
        var u = new Date(), f = new Date(e.min);
        o = a, f.getFullYear() == u.getFullYear() && (o = r, f.getMonth() == u.getMonth() && (o = s, 
        f.getDate() == u.getDate() && (o = l))), o > i && (o = i), o == s && (o = r);
        var h = new Date(t), p = " ";
        return a >= o && a <= i && (p += h.getFullYear().toFixed() + " "), r >= o && r <= i && (p += c[h.getMonth()] + " "), 
        s >= o && s <= i && (p += h.getDate().toFixed() + " "), l >= o && l <= i && (p += n(h.getHours()) + ":" + n(h.getMinutes()) + " "), 
        p.substr(0, p.length - 1);
    }, r.bytes_tick_unit = function(t) {
        return a.format_bytes(t.max, 1024, !0)[1];
    }, r.format_bytes_tick_no_unit = function(t, e) {
        return a.format_bytes(t, r.bytes_tick_unit(e), !0)[0];
    }, r.format_bytes_tick = function(t, e) {
        return a.format_bytes(t, 1024);
    }, r.bytes_per_sec_tick_unit = function(t) {
        return a.format_bytes_per_sec(t.max, 1024, !0)[1];
    }, r.format_bytes_per_sec_tick_no_unit = function(t, e) {
        return a.format_bytes_per_sec(t, r.bytes_per_sec_tick_unit(e), !0)[0];
    }, r.format_bytes_per_sec_tick = function(t, e) {
        return a.format_bytes_per_sec(t, 1024);
    }, r.bits_per_sec_tick_unit = function(t) {
        return a.format_bits_per_sec(8 * t.max, 1e3, !0)[1];
    }, r.format_bits_per_sec_tick_no_unit = function(t, e) {
        return a.format_bits_per_sec(8 * t, r.bits_per_sec_tick_unit(e), !0)[0];
    }, r.format_bits_per_sec_tick = function(t, e) {
        return a.format_bits_per_sec(8 * t, 1e3);
    }, r.setup_plot_controls = function(t, e, n) {
        function o() {
            void 0 === h && (n.forEach(function(t) {
                t.stop_walking();
            }), h = new Date().getTime() / 1e3, c());
        }
        function r(t, e) {
            v.push(g), g = t, h = e, u();
        }
        function s() {
            var t = v.pop();
            if (void 0 === t) {
                var e;
                for (e = 0; e < m.length - 1 && !(m[e] > g); e++) ;
                t = m[e];
            }
            void 0 !== h && (h += (t - g) / 2), g = t, u();
        }
        function l(t) {
            var e;
            return t >= 31536e3 ? (e = Math.ceil(t / 31536e3), a.format(a.ngettext("$0 year", "$0 years", e), e)) : t >= 2592e3 ? (e = Math.ceil(t / 2592e3), 
            a.format(a.ngettext("$0 month", "$0 months", e), e)) : t >= 604800 ? (e = Math.ceil(t / 604800), 
            a.format(a.ngettext("$0 week", "$0 weeks", e), e)) : t >= 86400 ? (e = Math.ceil(t / 86400), 
            a.format(a.ngettext("$0 day", "$0 days", e), e)) : t >= 3600 ? (e = Math.ceil(t / 3600), 
            a.format(a.ngettext("$0 hour", "$0 hours", e), e)) : (e = Math.ceil(t / 60), a.format(a.ngettext("$0 minute", "$0 minutes", e), e));
        }
        function c() {
            e.find('[data-action="scroll-right"]').attr("disabled", void 0 === h), e.find('[data-action="zoom-out"]').attr("disabled", g >= m[m.length - 1]);
        }
        function d() {
            var e;
            t.hasClass("show-zoom-controls") && g > p ? (t.addClass("show-zoom-cursor"), e = "x") : (t.removeClass("show-zoom-cursor"), 
            e = null), n.forEach(function(t) {
                var n = t.get_options();
                n.selection && n.selection.mode == e || (n.selection = {
                    mode: e,
                    color: "#d4edfa"
                }, t.set_options(n), t.refresh());
            });
        }
        function u() {
            g < p && (h += (p - g) / 2, g = p), h >= new Date().getTime() / 1e3 - 10 && (h = void 0), 
            e.find(".dropdown-toggle span:first-child").text(l(g)), n.forEach(function(e) {
                function n() {
                    e.archives && (t.addClass("show-zoom-controls"), d());
                }
                e.stop_walking(), e.reset(g, h), e.refresh(), void 0 === h && e.start_walking(), 
                i(e).on("changed", n), n();
            }), c(), d();
        }
        function f(t) {
            void 0 === t && (t = []), n = t, n.forEach(function(t) {
                i(t).on("zoomstart", function(t) {
                    o();
                }), i(t).on("zoom", function(t, e, n) {
                    r(e, n);
                });
            }), u();
        }
        var h, p = 300, m = [ 300, 3600, 21600, 86400, 604800, 2592e3, 31536e3 ], g = 300, v = [];
        return e.find("[data-range]").click(function() {
            v = [], g = parseInt(i(this).attr("data-range"), 10), u();
        }), e.find('[data-action="goto-now"]').click(function() {
            h = void 0, u();
        }), e.find('[data-action="scroll-left"]').click(function() {
            var t = g / 10;
            void 0 === h && (h = new Date().getTime() / 1e3), h -= t, u();
        }), e.find('[data-action="scroll-right"]').click(function() {
            var t = g / 10;
            void 0 !== h && (h += t, u());
        }), e.find('[data-action="zoom-out"]').click(function() {
            s();
        }), f(n), {
            reset: f
        };
    }, r.setup_complicated_plot = function(t, e, n, i) {
        function a(t, e) {
            return t.add(function(t, n, o) {
                for (var i = 0; i < o; i++) t[n + i] = [ i, e[n + i] || 0 ];
            });
        }
        function r(t, e, n) {
            return t.add(function(t, o, i) {
                var a, r, s, l;
                for (a = 0; a < i; a++) s = 0, n && (r = n[o + a], s = r ? r[1] : 0), l = e[o + a] || 0, 
                t[o + a] = [ a, l + s, s ];
            });
        }
        var s = null;
        return n.forEach(function(t, n) {
            i.x_rh_stack_graphs ? t.data = r(e, t.row, s) : t.data = a(e, t.row), s = t.data;
        }), o(t, e, n, i);
    }, t.exports = r;
}, function(t, e) {
    !function(t) {
        t.color = {}, t.color.make = function(e, n, o, i) {
            var a = {};
            return a.r = e || 0, a.g = n || 0, a.b = o || 0, a.a = null != i ? i : 1, a.add = function(t, e) {
                for (var n = 0; n < t.length; ++n) a[t.charAt(n)] += e;
                return a.normalize();
            }, a.scale = function(t, e) {
                for (var n = 0; n < t.length; ++n) a[t.charAt(n)] *= e;
                return a.normalize();
            }, a.toString = function() {
                return a.a >= 1 ? "rgb(" + [ a.r, a.g, a.b ].join(",") + ")" : "rgba(" + [ a.r, a.g, a.b, a.a ].join(",") + ")";
            }, a.normalize = function() {
                function t(t, e, n) {
                    return e < t ? t : e > n ? n : e;
                }
                return a.r = t(0, parseInt(a.r), 255), a.g = t(0, parseInt(a.g), 255), a.b = t(0, parseInt(a.b), 255), 
                a.a = t(0, a.a, 1), a;
            }, a.clone = function() {
                return t.color.make(a.r, a.b, a.g, a.a);
            }, a.normalize();
        }, t.color.extract = function(e, n) {
            var o;
            do {
                if (o = e.css(n).toLowerCase(), "" != o && "transparent" != o) break;
                e = e.parent();
            } while (e.length && !t.nodeName(e.get(0), "body"));
            return "rgba(0, 0, 0, 0)" == o && (o = "transparent"), t.color.parse(o);
        }, t.color.parse = function(n) {
            var o, i = t.color.make;
            if (o = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(n)) return i(parseInt(o[1], 10), parseInt(o[2], 10), parseInt(o[3], 10));
            if (o = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(n)) return i(parseInt(o[1], 10), parseInt(o[2], 10), parseInt(o[3], 10), parseFloat(o[4]));
            if (o = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(n)) return i(2.55 * parseFloat(o[1]), 2.55 * parseFloat(o[2]), 2.55 * parseFloat(o[3]));
            if (o = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(n)) return i(2.55 * parseFloat(o[1]), 2.55 * parseFloat(o[2]), 2.55 * parseFloat(o[3]), parseFloat(o[4]));
            if (o = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(n)) return i(parseInt(o[1], 16), parseInt(o[2], 16), parseInt(o[3], 16));
            if (o = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(n)) return i(parseInt(o[1] + o[1], 16), parseInt(o[2] + o[2], 16), parseInt(o[3] + o[3], 16));
            var a = t.trim(n).toLowerCase();
            return "transparent" == a ? i(255, 255, 255, 0) : (o = e[a] || [ 0, 0, 0 ], i(o[0], o[1], o[2]));
        };
        var e = {
            aqua: [ 0, 255, 255 ],
            azure: [ 240, 255, 255 ],
            beige: [ 245, 245, 220 ],
            black: [ 0, 0, 0 ],
            blue: [ 0, 0, 255 ],
            brown: [ 165, 42, 42 ],
            cyan: [ 0, 255, 255 ],
            darkblue: [ 0, 0, 139 ],
            darkcyan: [ 0, 139, 139 ],
            darkgrey: [ 169, 169, 169 ],
            darkgreen: [ 0, 100, 0 ],
            darkkhaki: [ 189, 183, 107 ],
            darkmagenta: [ 139, 0, 139 ],
            darkolivegreen: [ 85, 107, 47 ],
            darkorange: [ 255, 140, 0 ],
            darkorchid: [ 153, 50, 204 ],
            darkred: [ 139, 0, 0 ],
            darksalmon: [ 233, 150, 122 ],
            darkviolet: [ 148, 0, 211 ],
            fuchsia: [ 255, 0, 255 ],
            gold: [ 255, 215, 0 ],
            green: [ 0, 128, 0 ],
            indigo: [ 75, 0, 130 ],
            khaki: [ 240, 230, 140 ],
            lightblue: [ 173, 216, 230 ],
            lightcyan: [ 224, 255, 255 ],
            lightgreen: [ 144, 238, 144 ],
            lightgrey: [ 211, 211, 211 ],
            lightpink: [ 255, 182, 193 ],
            lightyellow: [ 255, 255, 224 ],
            lime: [ 0, 255, 0 ],
            magenta: [ 255, 0, 255 ],
            maroon: [ 128, 0, 0 ],
            navy: [ 0, 0, 128 ],
            olive: [ 128, 128, 0 ],
            orange: [ 255, 165, 0 ],
            pink: [ 255, 192, 203 ],
            purple: [ 128, 0, 128 ],
            violet: [ 128, 0, 128 ],
            red: [ 255, 0, 0 ],
            silver: [ 192, 192, 192 ],
            white: [ 255, 255, 255 ],
            yellow: [ 255, 255, 0 ]
        };
    }(jQuery), function(t) {
        function e(e, n) {
            var o = n.children("." + e)[0];
            if (null == o && (o = document.createElement("canvas"), o.className = e, t(o).css({
                direction: "ltr",
                position: "absolute",
                left: 0,
                top: 0
            }).appendTo(n), !o.getContext)) {
                if (!window.G_vmlCanvasManager) throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
                o = window.G_vmlCanvasManager.initElement(o);
            }
            this.element = o;
            var i = this.context = o.getContext("2d"), a = window.devicePixelRatio || 1, r = i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1;
            this.pixelRatio = a / r, this.resize(n.width(), n.height()), this.textContainer = null, 
            this.text = {}, this._textCache = {};
        }
        function n(n, i, a, r) {
            function s(t, e) {
                e = [ gt ].concat(e);
                for (var n = 0; n < t.length; ++n) t[n].apply(this, e);
            }
            function l() {
                for (var n = {
                    Canvas: e
                }, o = 0; o < r.length; ++o) {
                    var i = r[o];
                    i.init(gt, n), i.options && t.extend(!0, it, i.options);
                }
            }
            function c(e) {
                t.extend(!0, it, e), e && e.colors && (it.colors = e.colors), null == it.xaxis.color && (it.xaxis.color = t.color.parse(it.grid.color).scale("a", .22).toString()), 
                null == it.yaxis.color && (it.yaxis.color = t.color.parse(it.grid.color).scale("a", .22).toString()), 
                null == it.xaxis.tickColor && (it.xaxis.tickColor = it.grid.tickColor || it.xaxis.color), 
                null == it.yaxis.tickColor && (it.yaxis.tickColor = it.grid.tickColor || it.yaxis.color), 
                null == it.grid.borderColor && (it.grid.borderColor = it.grid.color), null == it.grid.tickColor && (it.grid.tickColor = t.color.parse(it.grid.color).scale("a", .22).toString());
                var o, i, a, r = n.css("font-size"), l = r ? +r.replace("px", "") : 13, c = {
                    style: n.css("font-style"),
                    size: Math.round(.8 * l),
                    variant: n.css("font-variant"),
                    weight: n.css("font-weight"),
                    family: n.css("font-family")
                };
                for (a = it.xaxes.length || 1, o = 0; o < a; ++o) i = it.xaxes[o], i && !i.tickColor && (i.tickColor = i.color), 
                i = t.extend(!0, {}, it.xaxis, i), it.xaxes[o] = i, i.font && (i.font = t.extend({}, c, i.font), 
                i.font.color || (i.font.color = i.color), i.font.lineHeight || (i.font.lineHeight = Math.round(1.15 * i.font.size)));
                for (a = it.yaxes.length || 1, o = 0; o < a; ++o) i = it.yaxes[o], i && !i.tickColor && (i.tickColor = i.color), 
                i = t.extend(!0, {}, it.yaxis, i), it.yaxes[o] = i, i.font && (i.font = t.extend({}, c, i.font), 
                i.font.color || (i.font.color = i.color), i.font.lineHeight || (i.font.lineHeight = Math.round(1.15 * i.font.size)));
                for (it.xaxis.noTicks && null == it.xaxis.ticks && (it.xaxis.ticks = it.xaxis.noTicks), 
                it.yaxis.noTicks && null == it.yaxis.ticks && (it.yaxis.ticks = it.yaxis.noTicks), 
                it.x2axis && (it.xaxes[1] = t.extend(!0, {}, it.xaxis, it.x2axis), it.xaxes[1].position = "top", 
                null == it.x2axis.min && (it.xaxes[1].min = null), null == it.x2axis.max && (it.xaxes[1].max = null)), 
                it.y2axis && (it.yaxes[1] = t.extend(!0, {}, it.yaxis, it.y2axis), it.yaxes[1].position = "right", 
                null == it.y2axis.min && (it.yaxes[1].min = null), null == it.y2axis.max && (it.yaxes[1].max = null)), 
                it.grid.coloredAreas && (it.grid.markings = it.grid.coloredAreas), it.grid.coloredAreasColor && (it.grid.markingsColor = it.grid.coloredAreasColor), 
                it.lines && t.extend(!0, it.series.lines, it.lines), it.points && t.extend(!0, it.series.points, it.points), 
                it.bars && t.extend(!0, it.series.bars, it.bars), null != it.shadowSize && (it.series.shadowSize = it.shadowSize), 
                null != it.highlightColor && (it.series.highlightColor = it.highlightColor), o = 0; o < it.xaxes.length; ++o) g(dt, o + 1).options = it.xaxes[o];
                for (o = 0; o < it.yaxes.length; ++o) g(ut, o + 1).options = it.yaxes[o];
                for (var d in mt) it.hooks[d] && it.hooks[d].length && (mt[d] = mt[d].concat(it.hooks[d]));
                s(mt.processOptions, [ it ]);
            }
            function d(t) {
                ot = u(t), v(), b();
            }
            function u(e) {
                for (var n = [], o = 0; o < e.length; ++o) {
                    var i = t.extend(!0, {}, it.series);
                    null != e[o].data ? (i.data = e[o].data, delete e[o].data, t.extend(!0, i, e[o]), 
                    e[o].data = i.data) : i.data = e[o], n.push(i);
                }
                return n;
            }
            function f(t, e) {
                var n = t[e + "axis"];
                return "object" == typeof n && (n = n.n), "number" != typeof n && (n = 1), n;
            }
            function h() {
                return t.grep(dt.concat(ut), function(t) {
                    return t;
                });
            }
            function p(t) {
                var e, n, o = {};
                for (e = 0; e < dt.length; ++e) n = dt[e], n && n.used && (o["x" + n.n] = n.c2p(t.left));
                for (e = 0; e < ut.length; ++e) n = ut[e], n && n.used && (o["y" + n.n] = n.c2p(t.top));
                return void 0 !== o.x1 && (o.x = o.x1), void 0 !== o.y1 && (o.y = o.y1), o;
            }
            function m(t) {
                var e, n, o, i = {};
                for (e = 0; e < dt.length; ++e) if (n = dt[e], n && n.used && (o = "x" + n.n, null == t[o] && 1 == n.n && (o = "x"), 
                null != t[o])) {
                    i.left = n.p2c(t[o]);
                    break;
                }
                for (e = 0; e < ut.length; ++e) if (n = ut[e], n && n.used && (o = "y" + n.n, null == t[o] && 1 == n.n && (o = "y"), 
                null != t[o])) {
                    i.top = n.p2c(t[o]);
                    break;
                }
                return i;
            }
            function g(e, n) {
                return e[n - 1] || (e[n - 1] = {
                    n: n,
                    direction: e == dt ? "x" : "y",
                    options: t.extend(!0, {}, e == dt ? it.xaxis : it.yaxis)
                }), e[n - 1];
            }
            function v() {
                var e, n = ot.length, o = -1;
                for (e = 0; e < ot.length; ++e) {
                    var i = ot[e].color;
                    null != i && (n--, "number" == typeof i && i > o && (o = i));
                }
                n <= o && (n = o + 1);
                var a, r = [], s = it.colors, l = s.length, c = 0;
                for (e = 0; e < n; e++) a = t.color.parse(s[e % l] || "#666"), e % l == 0 && e && (c = c >= 0 ? c < .5 ? -c - .2 : 0 : -c), 
                r[e] = a.scale("rgb", 1 + c);
                var d, u = 0;
                for (e = 0; e < ot.length; ++e) {
                    if (d = ot[e], null == d.color ? (d.color = r[u].toString(), ++u) : "number" == typeof d.color && (d.color = r[d.color].toString()), 
                    null == d.lines.show) {
                        var h, p = !0;
                        for (h in d) if (d[h] && d[h].show) {
                            p = !1;
                            break;
                        }
                        p && (d.lines.show = !0);
                    }
                    null == d.lines.zero && (d.lines.zero = !!d.lines.fill), d.xaxis = g(dt, f(d, "x")), 
                    d.yaxis = g(ut, f(d, "y"));
                }
            }
            function b() {
                function e(t, e, n) {
                    e < t.datamin && e != -b && (t.datamin = e), n > t.datamax && n != b && (t.datamax = n);
                }
                var n, o, i, a, r, l, c, d, u, f, p, m, g = Number.POSITIVE_INFINITY, v = Number.NEGATIVE_INFINITY, b = Number.MAX_VALUE;
                for (t.each(h(), function(t, e) {
                    e.datamin = g, e.datamax = v, e.used = !1;
                }), n = 0; n < ot.length; ++n) r = ot[n], r.datapoints = {
                    points: []
                }, s(mt.processRawData, [ r, r.data, r.datapoints ]);
                for (n = 0; n < ot.length; ++n) {
                    if (r = ot[n], p = r.data, m = r.datapoints.format, !m) {
                        if (m = [], m.push({
                            x: !0,
                            number: !0,
                            required: !0
                        }), m.push({
                            y: !0,
                            number: !0,
                            required: !0
                        }), r.bars.show || r.lines.show && r.lines.fill) {
                            var y = !!(r.bars.show && r.bars.zero || r.lines.show && r.lines.zero);
                            m.push({
                                y: !0,
                                number: !0,
                                required: !1,
                                defaultValue: 0,
                                autoscale: y
                            }), r.bars.horizontal && (delete m[m.length - 1].y, m[m.length - 1].x = !0);
                        }
                        r.datapoints.format = m;
                    }
                    if (null == r.datapoints.pointsize) {
                        r.datapoints.pointsize = m.length, c = r.datapoints.pointsize, l = r.datapoints.points;
                        var x = r.lines.show && r.lines.steps;
                        for (r.xaxis.used = r.yaxis.used = !0, o = i = 0; o < p.length; ++o, i += c) {
                            f = p[o];
                            var w = null == f;
                            if (!w) for (a = 0; a < c; ++a) d = f[a], u = m[a], u && (u.number && null != d && (d = +d, 
                            isNaN(d) ? d = null : d == 1 / 0 ? d = b : d == -(1 / 0) && (d = -b)), null == d && (u.required && (w = !0), 
                            null != u.defaultValue && (d = u.defaultValue))), l[i + a] = d;
                            if (w) for (a = 0; a < c; ++a) d = l[i + a], null != d && (u = m[a], u.autoscale !== !1 && (u.x && e(r.xaxis, d, d), 
                            u.y && e(r.yaxis, d, d))), l[i + a] = null; else if (x && i > 0 && null != l[i - c] && l[i - c] != l[i] && l[i - c + 1] != l[i + 1]) {
                                for (a = 0; a < c; ++a) l[i + c + a] = l[i + a];
                                l[i + 1] = l[i - c + 1], i += c;
                            }
                        }
                    }
                }
                for (n = 0; n < ot.length; ++n) r = ot[n], s(mt.processDatapoints, [ r, r.datapoints ]);
                for (n = 0; n < ot.length; ++n) {
                    r = ot[n], l = r.datapoints.points, c = r.datapoints.pointsize, m = r.datapoints.format;
                    var k = g, _ = g, C = v, T = v;
                    for (o = 0; o < l.length; o += c) if (null != l[o]) for (a = 0; a < c; ++a) d = l[o + a], 
                    u = m[a], u && u.autoscale !== !1 && d != b && d != -b && (u.x && (d < k && (k = d), 
                    d > C && (C = d)), u.y && (d < _ && (_ = d), d > T && (T = d)));
                    if (r.bars.show) {
                        var M;
                        switch (r.bars.align) {
                          case "left":
                            M = 0;
                            break;

                          case "right":
                            M = -r.bars.barWidth;
                            break;

                          default:
                            M = -r.bars.barWidth / 2;
                        }
                        r.bars.horizontal ? (_ += M, T += M + r.bars.barWidth) : (k += M, C += M + r.bars.barWidth);
                    }
                    e(r.xaxis, k, C), e(r.yaxis, _, T);
                }
                t.each(h(), function(t, e) {
                    e.datamin == g && (e.datamin = null), e.datamax == v && (e.datamax = null);
                });
            }
            function y() {
                n.css("padding", 0).children().filter(function() {
                    return !t(this).hasClass("flot-overlay") && !t(this).hasClass("flot-base");
                }).remove(), "static" == n.css("position") && n.css("position", "relative"), at = new e("flot-base", n), 
                rt = new e("flot-overlay", n), lt = at.context, ct = rt.context, st = t(rt.element).unbind();
                var o = n.data("plot");
                o && (o.shutdown(), rt.clear()), n.data("plot", gt);
            }
            function x() {
                it.grid.hoverable && (st.mousemove(U), st.bind("mouseleave", J)), it.grid.clickable && st.click(X), 
                s(mt.bindEvents, [ st ]);
            }
            function w() {
                bt && clearTimeout(bt), st.unbind("mousemove", U), st.unbind("mouseleave", J), st.unbind("click", X), 
                s(mt.shutdown, [ st ]);
            }
            function k(t) {
                function e(t) {
                    return t;
                }
                var n, o, i = t.options.transform || e, a = t.options.inverseTransform;
                "x" == t.direction ? (n = t.scale = ht / Math.abs(i(t.max) - i(t.min)), o = Math.min(i(t.max), i(t.min))) : (n = t.scale = pt / Math.abs(i(t.max) - i(t.min)), 
                n = -n, o = Math.max(i(t.max), i(t.min))), i == e ? t.p2c = function(t) {
                    return (t - o) * n;
                } : t.p2c = function(t) {
                    return (i(t) - o) * n;
                }, a ? t.c2p = function(t) {
                    return a(o + t / n);
                } : t.c2p = function(t) {
                    return o + t / n;
                };
            }
            function _(t) {
                for (var e = t.options, n = t.ticks || [], o = e.labelWidth || 0, i = e.labelHeight || 0, a = o || ("x" == t.direction ? Math.floor(at.width / (n.length || 1)) : null), r = t.direction + "Axis " + t.direction + t.n + "Axis", s = "flot-" + t.direction + "-axis flot-" + t.direction + t.n + "-axis " + r, l = e.font || "flot-tick-label tickLabel", c = 0; c < n.length; ++c) {
                    var d = n[c];
                    if (d.label) {
                        var u = at.getTextInfo(s, d.label, l, null, a);
                        o = Math.max(o, u.width), i = Math.max(i, u.height);
                    }
                }
                t.labelWidth = e.labelWidth || o, t.labelHeight = e.labelHeight || i;
            }
            function C(e) {
                var n = e.labelWidth, o = e.labelHeight, i = e.options.position, a = "x" === e.direction, r = e.options.tickLength, s = it.grid.axisMargin, l = it.grid.labelMargin, c = !0, d = !0, u = !0, f = !1;
                t.each(a ? dt : ut, function(t, n) {
                    n && (n.show || n.reserveSpace) && (n === e ? f = !0 : n.options.position === i && (f ? d = !1 : c = !1), 
                    f || (u = !1));
                }), d && (s = 0), null == r && (r = u ? "full" : 5), isNaN(+r) || (l += +r), a ? (o += l, 
                "bottom" == i ? (ft.bottom += o + s, e.box = {
                    top: at.height - ft.bottom,
                    height: o
                }) : (e.box = {
                    top: ft.top + s,
                    height: o
                }, ft.top += o + s)) : (n += l, "left" == i ? (e.box = {
                    left: ft.left + s,
                    width: n
                }, ft.left += n + s) : (ft.right += n + s, e.box = {
                    left: at.width - ft.right,
                    width: n
                })), e.position = i, e.tickLength = r, e.box.padding = l, e.innermost = c;
            }
            function T(t) {
                "x" == t.direction ? (t.box.left = ft.left - t.labelWidth / 2, t.box.width = at.width - ft.left - ft.right + t.labelWidth) : (t.box.top = ft.top - t.labelHeight / 2, 
                t.box.height = at.height - ft.bottom - ft.top + t.labelHeight);
            }
            function M() {
                var e, n = it.grid.minBorderMargin;
                if (null == n) for (n = 0, e = 0; e < ot.length; ++e) n = Math.max(n, 2 * (ot[e].points.radius + ot[e].points.lineWidth / 2));
                var o = {
                    left: n,
                    right: n,
                    top: n,
                    bottom: n
                };
                t.each(h(), function(t, e) {
                    e.reserveSpace && e.ticks && e.ticks.length && ("x" === e.direction ? (o.left = Math.max(o.left, e.labelWidth / 2), 
                    o.right = Math.max(o.right, e.labelWidth / 2)) : (o.bottom = Math.max(o.bottom, e.labelHeight / 2), 
                    o.top = Math.max(o.top, e.labelHeight / 2)));
                }), ft.left = Math.ceil(Math.max(o.left, ft.left)), ft.right = Math.ceil(Math.max(o.right, ft.right)), 
                ft.top = Math.ceil(Math.max(o.top, ft.top)), ft.bottom = Math.ceil(Math.max(o.bottom, ft.bottom));
            }
            function S() {
                var e, n = h(), o = it.grid.show;
                for (var i in ft) {
                    var a = it.grid.margin || 0;
                    ft[i] = "number" == typeof a ? a : a[i] || 0;
                }
                s(mt.processOffset, [ ft ]);
                for (var i in ft) "object" == typeof it.grid.borderWidth ? ft[i] += o ? it.grid.borderWidth[i] : 0 : ft[i] += o ? it.grid.borderWidth : 0;
                if (t.each(n, function(t, e) {
                    var n = e.options;
                    e.show = null == n.show ? e.used : n.show, e.reserveSpace = null == n.reserveSpace ? e.show : n.reserveSpace, 
                    z(e);
                }), o) {
                    var r = t.grep(n, function(t) {
                        return t.show || t.reserveSpace;
                    });
                    for (t.each(r, function(t, e) {
                        A(e), E(e), I(e, e.ticks), _(e);
                    }), e = r.length - 1; e >= 0; --e) C(r[e]);
                    M(), t.each(r, function(t, e) {
                        T(e);
                    });
                }
                ht = at.width - ft.left - ft.right, pt = at.height - ft.bottom - ft.top, t.each(n, function(t, e) {
                    k(e);
                }), o && F(), $();
            }
            function z(t) {
                var e = t.options, n = +(null != e.min ? e.min : t.datamin), o = +(null != e.max ? e.max : t.datamax), i = o - n;
                if (0 == i) {
                    var a = 0 == o ? 1 : .01;
                    null == e.min && (n -= a), null != e.max && null == e.min || (o += a);
                } else {
                    var r = e.autoscaleMargin;
                    null != r && (null == e.min && (n -= i * r, n < 0 && null != t.datamin && t.datamin >= 0 && (n = 0)), 
                    null == e.max && (o += i * r, o > 0 && null != t.datamax && t.datamax <= 0 && (o = 0)));
                }
                t.min = n, t.max = o;
            }
            function A(e) {
                var n, i = e.options;
                n = "number" == typeof i.ticks && i.ticks > 0 ? i.ticks : .3 * Math.sqrt("x" == e.direction ? at.width : at.height);
                var a = (e.max - e.min) / n, r = -Math.floor(Math.log(a) / Math.LN10), s = i.tickDecimals;
                null != s && r > s && (r = s);
                var l, c = Math.pow(10, -r), d = a / c;
                if (d < 1.5 ? l = 1 : d < 3 ? (l = 2, d > 2.25 && (null == s || r + 1 <= s) && (l = 2.5, 
                ++r)) : l = d < 7.5 ? 5 : 10, l *= c, null != i.minTickSize && l < i.minTickSize && (l = i.minTickSize), 
                e.delta = a, e.tickDecimals = Math.max(0, null != s ? s : r), e.tickSize = i.tickSize || l, 
                "time" == i.mode && !e.tickGenerator) throw new Error("Time mode requires the flot.time plugin.");
                if (e.tickGenerator || (e.tickGenerator = function(t) {
                    var e, n = [], i = o(t.min, t.tickSize), a = 0, r = Number.NaN;
                    do e = r, r = i + a * t.tickSize, n.push(r), ++a; while (r < t.max && r != e);
                    return n;
                }, e.tickFormatter = function(t, e) {
                    var n = e.tickDecimals ? Math.pow(10, e.tickDecimals) : 1, o = "" + Math.round(t * n) / n;
                    if (null != e.tickDecimals) {
                        var i = o.indexOf("."), a = i == -1 ? 0 : o.length - i - 1;
                        if (a < e.tickDecimals) return (a ? o : o + ".") + ("" + n).substr(1, e.tickDecimals - a);
                    }
                    return o;
                }), t.isFunction(i.tickFormatter) && (e.tickFormatter = function(t, e) {
                    return "" + i.tickFormatter(t, e);
                }), null != i.alignTicksWithAxis) {
                    var u = ("x" == e.direction ? dt : ut)[i.alignTicksWithAxis - 1];
                    if (u && u.used && u != e) {
                        var f = e.tickGenerator(e);
                        if (f.length > 0 && (null == i.min && (e.min = Math.min(e.min, f[0])), null == i.max && f.length > 1 && (e.max = Math.max(e.max, f[f.length - 1]))), 
                        e.tickGenerator = function(t) {
                            var e, n, o = [];
                            for (n = 0; n < u.ticks.length; ++n) e = (u.ticks[n].v - u.min) / (u.max - u.min), 
                            e = t.min + e * (t.max - t.min), o.push(e);
                            return o;
                        }, !e.mode && null == i.tickDecimals) {
                            var h = Math.max(0, -Math.floor(Math.log(e.delta) / Math.LN10) + 1), p = e.tickGenerator(e);
                            p.length > 1 && /\..*0$/.test((p[1] - p[0]).toFixed(h)) || (e.tickDecimals = h);
                        }
                    }
                }
            }
            function E(e) {
                var n = e.options.ticks, o = [];
                null == n || "number" == typeof n && n > 0 ? o = e.tickGenerator(e) : n && (o = t.isFunction(n) ? n(e) : n);
                var i, a;
                for (e.ticks = [], i = 0; i < o.length; ++i) {
                    var r = null, s = o[i];
                    "object" == typeof s ? (a = +s[0], s.length > 1 && (r = s[1])) : a = +s, null == r && (r = e.tickFormatter(a, e)), 
                    isNaN(a) || e.ticks.push({
                        v: a,
                        label: r
                    });
                }
            }
            function I(t, e) {
                t.options.autoscaleMargin && e.length > 0 && (null == t.options.min && (t.min = Math.min(t.min, e[0].v)), 
                null == t.options.max && e.length > 1 && (t.max = Math.max(t.max, e[e.length - 1].v)));
            }
            function O() {
                at.clear(), s(mt.drawBackground, [ lt ]);
                var t = it.grid;
                t.show && t.backgroundColor && j(), t.show && !t.aboveData && D();
                for (var e = 0; e < ot.length; ++e) s(mt.drawSeries, [ lt, ot[e] ]), N(ot[e]);
                s(mt.draw, [ lt ]), t.show && t.aboveData && D(), at.render(), G();
            }
            function W(t, e) {
                for (var n, o, i, a, r = h(), s = 0; s < r.length; ++s) if (n = r[s], n.direction == e && (a = e + n.n + "axis", 
                t[a] || 1 != n.n || (a = e + "axis"), t[a])) {
                    o = t[a].from, i = t[a].to;
                    break;
                }
                if (t[a] || (n = "x" == e ? dt[0] : ut[0], o = t[e + "1"], i = t[e + "2"]), null != o && null != i && o > i) {
                    var l = o;
                    o = i, i = l;
                }
                return {
                    from: o,
                    to: i,
                    axis: n
                };
            }
            function j() {
                lt.save(), lt.translate(ft.left, ft.top), lt.fillStyle = nt(it.grid.backgroundColor, pt, 0, "rgba(255, 255, 255, 0)"), 
                lt.fillRect(0, 0, ht, pt), lt.restore();
            }
            function D() {
                var e, n, o, i;
                lt.save(), lt.translate(ft.left, ft.top);
                var a = it.grid.markings;
                if (a) for (t.isFunction(a) && (n = gt.getAxes(), n.xmin = n.xaxis.min, n.xmax = n.xaxis.max, 
                n.ymin = n.yaxis.min, n.ymax = n.yaxis.max, a = a(n)), e = 0; e < a.length; ++e) {
                    var r = a[e], s = W(r, "x"), l = W(r, "y");
                    if (null == s.from && (s.from = s.axis.min), null == s.to && (s.to = s.axis.max), 
                    null == l.from && (l.from = l.axis.min), null == l.to && (l.to = l.axis.max), !(s.to < s.axis.min || s.from > s.axis.max || l.to < l.axis.min || l.from > l.axis.max)) {
                        s.from = Math.max(s.from, s.axis.min), s.to = Math.min(s.to, s.axis.max), l.from = Math.max(l.from, l.axis.min), 
                        l.to = Math.min(l.to, l.axis.max);
                        var c = s.from === s.to, d = l.from === l.to;
                        if (!c || !d) if (s.from = Math.floor(s.axis.p2c(s.from)), s.to = Math.floor(s.axis.p2c(s.to)), 
                        l.from = Math.floor(l.axis.p2c(l.from)), l.to = Math.floor(l.axis.p2c(l.to)), c || d) {
                            var u = r.lineWidth || it.grid.markingsLineWidth, f = u % 2 ? .5 : 0;
                            lt.beginPath(), lt.strokeStyle = r.color || it.grid.markingsColor, lt.lineWidth = u, 
                            c ? (lt.moveTo(s.to + f, l.from), lt.lineTo(s.to + f, l.to)) : (lt.moveTo(s.from, l.to + f), 
                            lt.lineTo(s.to, l.to + f)), lt.stroke();
                        } else lt.fillStyle = r.color || it.grid.markingsColor, lt.fillRect(s.from, l.to, s.to - s.from, l.from - l.to);
                    }
                }
                n = h(), o = it.grid.borderWidth;
                for (var p = 0; p < n.length; ++p) {
                    var m, g, v, b, y = n[p], x = y.box, w = y.tickLength;
                    if (y.show && 0 != y.ticks.length) {
                        for (lt.lineWidth = 1, "x" == y.direction ? (m = 0, g = "full" == w ? "top" == y.position ? 0 : pt : x.top - ft.top + ("top" == y.position ? x.height : 0)) : (g = 0, 
                        m = "full" == w ? "left" == y.position ? 0 : ht : x.left - ft.left + ("left" == y.position ? x.width : 0)), 
                        y.innermost || (lt.strokeStyle = y.options.color, lt.beginPath(), v = b = 0, "x" == y.direction ? v = ht + 1 : b = pt + 1, 
                        1 == lt.lineWidth && ("x" == y.direction ? g = Math.floor(g) + .5 : m = Math.floor(m) + .5), 
                        lt.moveTo(m, g), lt.lineTo(m + v, g + b), lt.stroke()), lt.strokeStyle = y.options.tickColor, 
                        lt.beginPath(), e = 0; e < y.ticks.length; ++e) {
                            var k = y.ticks[e].v;
                            v = b = 0, isNaN(k) || k < y.min || k > y.max || "full" == w && ("object" == typeof o && o[y.position] > 0 || o > 0) && (k == y.min || k == y.max) || ("x" == y.direction ? (m = y.p2c(k), 
                            b = "full" == w ? -pt : w, "top" == y.position && (b = -b)) : (g = y.p2c(k), v = "full" == w ? -ht : w, 
                            "left" == y.position && (v = -v)), 1 == lt.lineWidth && ("x" == y.direction ? m = Math.floor(m) + .5 : g = Math.floor(g) + .5), 
                            lt.moveTo(m, g), lt.lineTo(m + v, g + b));
                        }
                        lt.stroke();
                    }
                }
                o && (i = it.grid.borderColor, "object" == typeof o || "object" == typeof i ? ("object" != typeof o && (o = {
                    top: o,
                    right: o,
                    bottom: o,
                    left: o
                }), "object" != typeof i && (i = {
                    top: i,
                    right: i,
                    bottom: i,
                    left: i
                }), o.top > 0 && (lt.strokeStyle = i.top, lt.lineWidth = o.top, lt.beginPath(), 
                lt.moveTo(0 - o.left, 0 - o.top / 2), lt.lineTo(ht, 0 - o.top / 2), lt.stroke()), 
                o.right > 0 && (lt.strokeStyle = i.right, lt.lineWidth = o.right, lt.beginPath(), 
                lt.moveTo(ht + o.right / 2, 0 - o.top), lt.lineTo(ht + o.right / 2, pt), lt.stroke()), 
                o.bottom > 0 && (lt.strokeStyle = i.bottom, lt.lineWidth = o.bottom, lt.beginPath(), 
                lt.moveTo(ht + o.right, pt + o.bottom / 2), lt.lineTo(0, pt + o.bottom / 2), lt.stroke()), 
                o.left > 0 && (lt.strokeStyle = i.left, lt.lineWidth = o.left, lt.beginPath(), lt.moveTo(0 - o.left / 2, pt + o.bottom), 
                lt.lineTo(0 - o.left / 2, 0), lt.stroke())) : (lt.lineWidth = o, lt.strokeStyle = it.grid.borderColor, 
                lt.strokeRect(-o / 2, -o / 2, ht + o, pt + o))), lt.restore();
            }
            function F() {
                t.each(h(), function(t, e) {
                    var n, o, i, a, r, s = e.box, l = e.direction + "Axis " + e.direction + e.n + "Axis", c = "flot-" + e.direction + "-axis flot-" + e.direction + e.n + "-axis " + l, d = e.options.font || "flot-tick-label tickLabel";
                    if (at.removeText(c), e.show && 0 != e.ticks.length) for (var u = 0; u < e.ticks.length; ++u) n = e.ticks[u], 
                    !n.label || n.v < e.min || n.v > e.max || ("x" == e.direction ? (a = "center", o = ft.left + e.p2c(n.v), 
                    "bottom" == e.position ? i = s.top + s.padding : (i = s.top + s.height - s.padding, 
                    r = "bottom")) : (r = "middle", i = ft.top + e.p2c(n.v), "left" == e.position ? (o = s.left + s.width - s.padding, 
                    a = "right") : o = s.left + s.padding), at.addText(c, o, i, n.label, d, null, null, a, r));
                });
            }
            function N(t) {
                t.lines.show && P(t), t.bars.show && R(t), t.points.show && H(t);
            }
            function P(t) {
                function e(t, e, n, o, i) {
                    var a = t.points, r = t.pointsize, s = null, l = null;
                    lt.beginPath();
                    for (var c = r; c < a.length; c += r) {
                        var d = a[c - r], u = a[c - r + 1], f = a[c], h = a[c + 1];
                        if (null != d && null != f) {
                            if (u <= h && u < i.min) {
                                if (h < i.min) continue;
                                d = (i.min - u) / (h - u) * (f - d) + d, u = i.min;
                            } else if (h <= u && h < i.min) {
                                if (u < i.min) continue;
                                f = (i.min - u) / (h - u) * (f - d) + d, h = i.min;
                            }
                            if (u >= h && u > i.max) {
                                if (h > i.max) continue;
                                d = (i.max - u) / (h - u) * (f - d) + d, u = i.max;
                            } else if (h >= u && h > i.max) {
                                if (u > i.max) continue;
                                f = (i.max - u) / (h - u) * (f - d) + d, h = i.max;
                            }
                            if (d <= f && d < o.min) {
                                if (f < o.min) continue;
                                u = (o.min - d) / (f - d) * (h - u) + u, d = o.min;
                            } else if (f <= d && f < o.min) {
                                if (d < o.min) continue;
                                h = (o.min - d) / (f - d) * (h - u) + u, f = o.min;
                            }
                            if (d >= f && d > o.max) {
                                if (f > o.max) continue;
                                u = (o.max - d) / (f - d) * (h - u) + u, d = o.max;
                            } else if (f >= d && f > o.max) {
                                if (d > o.max) continue;
                                h = (o.max - d) / (f - d) * (h - u) + u, f = o.max;
                            }
                            d == s && u == l || lt.moveTo(o.p2c(d) + e, i.p2c(u) + n), s = f, l = h, lt.lineTo(o.p2c(f) + e, i.p2c(h) + n);
                        }
                    }
                    lt.stroke();
                }
                function n(t, e, n) {
                    for (var o = t.points, i = t.pointsize, a = Math.min(Math.max(0, n.min), n.max), r = 0, s = !1, l = 1, c = 0, d = 0; ;) {
                        if (i > 0 && r > o.length + i) break;
                        r += i;
                        var u = o[r - i], f = o[r - i + l], h = o[r], p = o[r + l];
                        if (s) {
                            if (i > 0 && null != u && null == h) {
                                d = r, i = -i, l = 2;
                                continue;
                            }
                            if (i < 0 && r == c + i) {
                                lt.fill(), s = !1, i = -i, l = 1, r = c = d + i;
                                continue;
                            }
                        }
                        if (null != u && null != h) {
                            if (u <= h && u < e.min) {
                                if (h < e.min) continue;
                                f = (e.min - u) / (h - u) * (p - f) + f, u = e.min;
                            } else if (h <= u && h < e.min) {
                                if (u < e.min) continue;
                                p = (e.min - u) / (h - u) * (p - f) + f, h = e.min;
                            }
                            if (u >= h && u > e.max) {
                                if (h > e.max) continue;
                                f = (e.max - u) / (h - u) * (p - f) + f, u = e.max;
                            } else if (h >= u && h > e.max) {
                                if (u > e.max) continue;
                                p = (e.max - u) / (h - u) * (p - f) + f, h = e.max;
                            }
                            if (s || (lt.beginPath(), lt.moveTo(e.p2c(u), n.p2c(a)), s = !0), f >= n.max && p >= n.max) lt.lineTo(e.p2c(u), n.p2c(n.max)), 
                            lt.lineTo(e.p2c(h), n.p2c(n.max)); else if (f <= n.min && p <= n.min) lt.lineTo(e.p2c(u), n.p2c(n.min)), 
                            lt.lineTo(e.p2c(h), n.p2c(n.min)); else {
                                var m = u, g = h;
                                f <= p && f < n.min && p >= n.min ? (u = (n.min - f) / (p - f) * (h - u) + u, f = n.min) : p <= f && p < n.min && f >= n.min && (h = (n.min - f) / (p - f) * (h - u) + u, 
                                p = n.min), f >= p && f > n.max && p <= n.max ? (u = (n.max - f) / (p - f) * (h - u) + u, 
                                f = n.max) : p >= f && p > n.max && f <= n.max && (h = (n.max - f) / (p - f) * (h - u) + u, 
                                p = n.max), u != m && lt.lineTo(e.p2c(m), n.p2c(f)), lt.lineTo(e.p2c(u), n.p2c(f)), 
                                lt.lineTo(e.p2c(h), n.p2c(p)), h != g && (lt.lineTo(e.p2c(h), n.p2c(p)), lt.lineTo(e.p2c(g), n.p2c(p)));
                            }
                        }
                    }
                }
                lt.save(), lt.translate(ft.left, ft.top), lt.lineJoin = "round";
                var o = t.lines.lineWidth, i = t.shadowSize;
                if (o > 0 && i > 0) {
                    lt.lineWidth = i, lt.strokeStyle = "rgba(0,0,0,0.1)";
                    var a = Math.PI / 18;
                    e(t.datapoints, Math.sin(a) * (o / 2 + i / 2), Math.cos(a) * (o / 2 + i / 2), t.xaxis, t.yaxis), 
                    lt.lineWidth = i / 2, e(t.datapoints, Math.sin(a) * (o / 2 + i / 4), Math.cos(a) * (o / 2 + i / 4), t.xaxis, t.yaxis);
                }
                lt.lineWidth = o, lt.strokeStyle = t.color;
                var r = Y(t.lines, t.color, 0, pt);
                r && (lt.fillStyle = r, n(t.datapoints, t.xaxis, t.yaxis)), o > 0 && e(t.datapoints, 0, 0, t.xaxis, t.yaxis), 
                lt.restore();
            }
            function H(t) {
                function e(t, e, n, o, i, a, r, s) {
                    for (var l = t.points, c = t.pointsize, d = 0; d < l.length; d += c) {
                        var u = l[d], f = l[d + 1];
                        null == u || u < a.min || u > a.max || f < r.min || f > r.max || (lt.beginPath(), 
                        u = a.p2c(u), f = r.p2c(f) + o, "circle" == s ? lt.arc(u, f, e, 0, i ? Math.PI : 2 * Math.PI, !1) : s(lt, u, f, e, i), 
                        lt.closePath(), n && (lt.fillStyle = n, lt.fill()), lt.stroke());
                    }
                }
                lt.save(), lt.translate(ft.left, ft.top);
                var n = t.points.lineWidth, o = t.shadowSize, i = t.points.radius, a = t.points.symbol;
                if (0 == n && (n = 1e-4), n > 0 && o > 0) {
                    var r = o / 2;
                    lt.lineWidth = r, lt.strokeStyle = "rgba(0,0,0,0.1)", e(t.datapoints, i, null, r + r / 2, !0, t.xaxis, t.yaxis, a), 
                    lt.strokeStyle = "rgba(0,0,0,0.2)", e(t.datapoints, i, null, r / 2, !0, t.xaxis, t.yaxis, a);
                }
                lt.lineWidth = n, lt.strokeStyle = t.color, e(t.datapoints, i, Y(t.points, t.color), 0, !1, t.xaxis, t.yaxis, a), 
                lt.restore();
            }
            function L(t, e, n, o, i, a, r, s, l, c, d) {
                var u, f, h, p, m, g, v, b, y;
                c ? (b = g = v = !0, m = !1, u = n, f = t, p = e + o, h = e + i, f < u && (y = f, 
                f = u, u = y, m = !0, g = !1)) : (m = g = v = !0, b = !1, u = t + o, f = t + i, 
                h = n, p = e, p < h && (y = p, p = h, h = y, b = !0, v = !1)), f < r.min || u > r.max || p < s.min || h > s.max || (u < r.min && (u = r.min, 
                m = !1), f > r.max && (f = r.max, g = !1), h < s.min && (h = s.min, b = !1), p > s.max && (p = s.max, 
                v = !1), u = r.p2c(u), h = s.p2c(h), f = r.p2c(f), p = s.p2c(p), a && (l.fillStyle = a(h, p), 
                l.fillRect(u, p, f - u, h - p)), d > 0 && (m || g || v || b) && (l.beginPath(), 
                l.moveTo(u, h), m ? l.lineTo(u, p) : l.moveTo(u, p), v ? l.lineTo(f, p) : l.moveTo(f, p), 
                g ? l.lineTo(f, h) : l.moveTo(f, h), b ? l.lineTo(u, h) : l.moveTo(u, h), l.stroke()));
            }
            function R(t) {
                function e(e, n, o, i, a, r) {
                    for (var s = e.points, l = e.pointsize, c = 0; c < s.length; c += l) null != s[c] && L(s[c], s[c + 1], s[c + 2], n, o, i, a, r, lt, t.bars.horizontal, t.bars.lineWidth);
                }
                lt.save(), lt.translate(ft.left, ft.top), lt.lineWidth = t.bars.lineWidth, lt.strokeStyle = t.color;
                var n;
                switch (t.bars.align) {
                  case "left":
                    n = 0;
                    break;

                  case "right":
                    n = -t.bars.barWidth;
                    break;

                  default:
                    n = -t.bars.barWidth / 2;
                }
                var o = t.bars.fill ? function(e, n) {
                    return Y(t.bars, t.color, e, n);
                } : null;
                e(t.datapoints, n, n + t.bars.barWidth, o, t.xaxis, t.yaxis), lt.restore();
            }
            function Y(e, n, o, i) {
                var a = e.fill;
                if (!a) return null;
                if (e.fillColor) return nt(e.fillColor, o, i, n);
                var r = t.color.parse(n);
                return r.a = "number" == typeof a ? a : .4, r.normalize(), r.toString();
            }
            function $() {
                if (null != it.legend.container ? t(it.legend.container).html("") : n.find(".legend").remove(), 
                it.legend.show) {
                    for (var e, o, i = [], a = [], r = !1, s = it.legend.labelFormatter, l = 0; l < ot.length; ++l) e = ot[l], 
                    e.label && (o = s ? s(e.label, e) : e.label, o && a.push({
                        label: o,
                        color: e.color
                    }));
                    if (it.legend.sorted) if (t.isFunction(it.legend.sorted)) a.sort(it.legend.sorted); else if ("reverse" == it.legend.sorted) a.reverse(); else {
                        var c = "descending" != it.legend.sorted;
                        a.sort(function(t, e) {
                            return t.label == e.label ? 0 : t.label < e.label != c ? 1 : -1;
                        });
                    }
                    for (var l = 0; l < a.length; ++l) {
                        var d = a[l];
                        l % it.legend.noColumns == 0 && (r && i.push("</tr>"), i.push("<tr>"), r = !0), 
                        i.push('<td class="legendColorBox"><div style="border:1px solid ' + it.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + d.color + ';overflow:hidden"></div></div></td><td class="legendLabel">' + d.label + "</td>");
                    }
                    if (r && i.push("</tr>"), 0 != i.length) {
                        var u = '<table style="font-size:smaller;color:' + it.grid.color + '">' + i.join("") + "</table>";
                        if (null != it.legend.container) t(it.legend.container).html(u); else {
                            var f = "", h = it.legend.position, p = it.legend.margin;
                            null == p[0] && (p = [ p, p ]), "n" == h.charAt(0) ? f += "top:" + (p[1] + ft.top) + "px;" : "s" == h.charAt(0) && (f += "bottom:" + (p[1] + ft.bottom) + "px;"), 
                            "e" == h.charAt(1) ? f += "right:" + (p[0] + ft.right) + "px;" : "w" == h.charAt(1) && (f += "left:" + (p[0] + ft.left) + "px;");
                            var m = t('<div class="legend">' + u.replace('style="', 'style="position:absolute;' + f + ";") + "</div>").appendTo(n);
                            if (0 != it.legend.backgroundOpacity) {
                                var g = it.legend.backgroundColor;
                                null == g && (g = it.grid.backgroundColor, g = g && "string" == typeof g ? t.color.parse(g) : t.color.extract(m, "background-color"), 
                                g.a = 1, g = g.toString());
                                var v = m.children();
                                t('<div style="position:absolute;width:' + v.width() + "px;height:" + v.height() + "px;" + f + "background-color:" + g + ';"> </div>').prependTo(m).css("opacity", it.legend.backgroundOpacity);
                            }
                        }
                    }
                }
            }
            function q(t, e, n) {
                var o, i, a, r = it.grid.mouseActiveRadius, s = r * r + 1, l = null;
                for (o = ot.length - 1; o >= 0; --o) if (n(ot[o])) {
                    var c = ot[o], d = c.xaxis, u = c.yaxis, f = c.datapoints.points, h = d.c2p(t), p = u.c2p(e), m = r / d.scale, g = r / u.scale;
                    if (a = c.datapoints.pointsize, d.options.inverseTransform && (m = Number.MAX_VALUE), 
                    u.options.inverseTransform && (g = Number.MAX_VALUE), c.lines.show || c.points.show) for (i = 0; i < f.length; i += a) {
                        var v = f[i], b = f[i + 1];
                        if (null != v && !(v - h > m || v - h < -m || b - p > g || b - p < -g)) {
                            var y = Math.abs(d.p2c(v) - t), x = Math.abs(u.p2c(b) - e), w = y * y + x * x;
                            w < s && (s = w, l = [ o, i / a ]);
                        }
                    }
                    if (c.bars.show && !l) {
                        var k, _;
                        switch (c.bars.align) {
                          case "left":
                            k = 0;
                            break;

                          case "right":
                            k = -c.bars.barWidth;
                            break;

                          default:
                            k = -c.bars.barWidth / 2;
                        }
                        for (_ = k + c.bars.barWidth, i = 0; i < f.length; i += a) {
                            var v = f[i], b = f[i + 1], C = f[i + 2];
                            null != v && (ot[o].bars.horizontal ? h <= Math.max(C, v) && h >= Math.min(C, v) && p >= b + k && p <= b + _ : h >= v + k && h <= v + _ && p >= Math.min(C, b) && p <= Math.max(C, b)) && (l = [ o, i / a ]);
                        }
                    }
                }
                return l ? (o = l[0], i = l[1], a = ot[o].datapoints.pointsize, {
                    datapoint: ot[o].datapoints.points.slice(i * a, (i + 1) * a),
                    dataIndex: i,
                    series: ot[o],
                    seriesIndex: o
                }) : null;
            }
            function U(t) {
                it.grid.hoverable && B("plothover", t, function(t) {
                    return 0 != t.hoverable;
                });
            }
            function J(t) {
                it.grid.hoverable && B("plothover", t, function(t) {
                    return !1;
                });
            }
            function X(t) {
                B("plotclick", t, function(t) {
                    return 0 != t.clickable;
                });
            }
            function B(t, e, o) {
                var i = st.offset(), a = e.pageX - i.left - ft.left, r = e.pageY - i.top - ft.top, s = p({
                    left: a,
                    top: r
                });
                s.pageX = e.pageX, s.pageY = e.pageY;
                var l = q(a, r, o);
                if (l && (l.pageX = parseInt(l.series.xaxis.p2c(l.datapoint[0]) + i.left + ft.left, 10), 
                l.pageY = parseInt(l.series.yaxis.p2c(l.datapoint[1]) + i.top + ft.top, 10)), it.grid.autoHighlight) {
                    for (var c = 0; c < vt.length; ++c) {
                        var d = vt[c];
                        d.auto != t || l && d.series == l.series && d.point[0] == l.datapoint[0] && d.point[1] == l.datapoint[1] || Q(d.series, d.point);
                    }
                    l && K(l.series, l.datapoint, t);
                }
                n.trigger(t, [ s, l ]);
            }
            function G() {
                var t = it.interaction.redrawOverlayInterval;
                return t == -1 ? void V() : void (bt || (bt = setTimeout(V, t)));
            }
            function V() {
                bt = null, ct.save(), rt.clear(), ct.translate(ft.left, ft.top);
                var t, e;
                for (t = 0; t < vt.length; ++t) e = vt[t], e.series.bars.show ? et(e.series, e.point) : tt(e.series, e.point);
                ct.restore(), s(mt.drawOverlay, [ ct ]);
            }
            function K(t, e, n) {
                if ("number" == typeof t && (t = ot[t]), "number" == typeof e) {
                    var o = t.datapoints.pointsize;
                    e = t.datapoints.points.slice(o * e, o * (e + 1));
                }
                var i = Z(t, e);
                i == -1 ? (vt.push({
                    series: t,
                    point: e,
                    auto: n
                }), G()) : n || (vt[i].auto = !1);
            }
            function Q(t, e) {
                if (null == t && null == e) return vt = [], void G();
                if ("number" == typeof t && (t = ot[t]), "number" == typeof e) {
                    var n = t.datapoints.pointsize;
                    e = t.datapoints.points.slice(n * e, n * (e + 1));
                }
                var o = Z(t, e);
                o != -1 && (vt.splice(o, 1), G());
            }
            function Z(t, e) {
                for (var n = 0; n < vt.length; ++n) {
                    var o = vt[n];
                    if (o.series == t && o.point[0] == e[0] && o.point[1] == e[1]) return n;
                }
                return -1;
            }
            function tt(e, n) {
                var o = n[0], i = n[1], a = e.xaxis, r = e.yaxis, s = "string" == typeof e.highlightColor ? e.highlightColor : t.color.parse(e.color).scale("a", .5).toString();
                if (!(o < a.min || o > a.max || i < r.min || i > r.max)) {
                    var l = e.points.radius + e.points.lineWidth / 2;
                    ct.lineWidth = l, ct.strokeStyle = s;
                    var c = 1.5 * l;
                    o = a.p2c(o), i = r.p2c(i), ct.beginPath(), "circle" == e.points.symbol ? ct.arc(o, i, c, 0, 2 * Math.PI, !1) : e.points.symbol(ct, o, i, c, !1), 
                    ct.closePath(), ct.stroke();
                }
            }
            function et(e, n) {
                var o, i = "string" == typeof e.highlightColor ? e.highlightColor : t.color.parse(e.color).scale("a", .5).toString(), a = i;
                switch (e.bars.align) {
                  case "left":
                    o = 0;
                    break;

                  case "right":
                    o = -e.bars.barWidth;
                    break;

                  default:
                    o = -e.bars.barWidth / 2;
                }
                ct.lineWidth = e.bars.lineWidth, ct.strokeStyle = i, L(n[0], n[1], n[2] || 0, o, o + e.bars.barWidth, function() {
                    return a;
                }, e.xaxis, e.yaxis, ct, e.bars.horizontal, e.bars.lineWidth);
            }
            function nt(e, n, o, i) {
                if ("string" == typeof e) return e;
                for (var a = lt.createLinearGradient(0, o, 0, n), r = 0, s = e.colors.length; r < s; ++r) {
                    var l = e.colors[r];
                    if ("string" != typeof l) {
                        var c = t.color.parse(i);
                        null != l.brightness && (c = c.scale("rgb", l.brightness)), null != l.opacity && (c.a *= l.opacity), 
                        l = c.toString();
                    }
                    a.addColorStop(r / (s - 1), l);
                }
                return a;
            }
            var ot = [], it = {
                colors: [ "#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed" ],
                legend: {
                    show: !0,
                    noColumns: 1,
                    labelFormatter: null,
                    labelBoxBorderColor: "#ccc",
                    container: null,
                    position: "ne",
                    margin: 5,
                    backgroundColor: null,
                    backgroundOpacity: .85,
                    sorted: null
                },
                xaxis: {
                    show: null,
                    position: "bottom",
                    mode: null,
                    font: null,
                    color: null,
                    tickColor: null,
                    transform: null,
                    inverseTransform: null,
                    min: null,
                    max: null,
                    autoscaleMargin: null,
                    ticks: null,
                    tickFormatter: null,
                    labelWidth: null,
                    labelHeight: null,
                    reserveSpace: null,
                    tickLength: null,
                    alignTicksWithAxis: null,
                    tickDecimals: null,
                    tickSize: null,
                    minTickSize: null
                },
                yaxis: {
                    autoscaleMargin: .02,
                    position: "left"
                },
                xaxes: [],
                yaxes: [],
                series: {
                    points: {
                        show: !1,
                        radius: 3,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: "#ffffff",
                        symbol: "circle"
                    },
                    lines: {
                        lineWidth: 2,
                        fill: !1,
                        fillColor: null,
                        steps: !1
                    },
                    bars: {
                        show: !1,
                        lineWidth: 2,
                        barWidth: 1,
                        fill: !0,
                        fillColor: null,
                        align: "left",
                        horizontal: !1,
                        zero: !0
                    },
                    shadowSize: 3,
                    highlightColor: null
                },
                grid: {
                    show: !0,
                    aboveData: !1,
                    color: "#545454",
                    backgroundColor: null,
                    borderColor: null,
                    tickColor: null,
                    margin: 0,
                    labelMargin: 5,
                    axisMargin: 8,
                    borderWidth: 2,
                    minBorderMargin: null,
                    markings: null,
                    markingsColor: "#f4f4f4",
                    markingsLineWidth: 2,
                    clickable: !1,
                    hoverable: !1,
                    autoHighlight: !0,
                    mouseActiveRadius: 10
                },
                interaction: {
                    redrawOverlayInterval: 1e3 / 60
                },
                hooks: {}
            }, at = null, rt = null, st = null, lt = null, ct = null, dt = [], ut = [], ft = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, ht = 0, pt = 0, mt = {
                processOptions: [],
                processRawData: [],
                processDatapoints: [],
                processOffset: [],
                drawBackground: [],
                drawSeries: [],
                draw: [],
                bindEvents: [],
                drawOverlay: [],
                shutdown: []
            }, gt = this;
            gt.setData = d, gt.setupGrid = S, gt.draw = O, gt.getPlaceholder = function() {
                return n;
            }, gt.getCanvas = function() {
                return at.element;
            }, gt.getPlotOffset = function() {
                return ft;
            }, gt.width = function() {
                return ht;
            }, gt.height = function() {
                return pt;
            }, gt.offset = function() {
                var t = st.offset();
                return t.left += ft.left, t.top += ft.top, t;
            }, gt.getData = function() {
                return ot;
            }, gt.getAxes = function() {
                var e = {};
                return t.each(dt.concat(ut), function(t, n) {
                    n && (e[n.direction + (1 != n.n ? n.n : "") + "axis"] = n);
                }), e;
            }, gt.getXAxes = function() {
                return dt;
            }, gt.getYAxes = function() {
                return ut;
            }, gt.c2p = p, gt.p2c = m, gt.getOptions = function() {
                return it;
            }, gt.highlight = K, gt.unhighlight = Q, gt.triggerRedrawOverlay = G, gt.pointOffset = function(t) {
                return {
                    left: parseInt(dt[f(t, "x") - 1].p2c(+t.x) + ft.left, 10),
                    top: parseInt(ut[f(t, "y") - 1].p2c(+t.y) + ft.top, 10)
                };
            }, gt.shutdown = w, gt.destroy = function() {
                w(), n.removeData("plot").empty(), ot = [], it = null, at = null, rt = null, st = null, 
                lt = null, ct = null, dt = [], ut = [], mt = null, vt = [], gt = null;
            }, gt.resize = function() {
                var t = n.width(), e = n.height();
                at.resize(t, e), rt.resize(t, e);
            }, gt.hooks = mt, l(gt), c(a), y(), d(i), S(), O(), x();
            var vt = [], bt = null;
        }
        function o(t, e) {
            return e * Math.floor(t / e);
        }
        var i = Object.prototype.hasOwnProperty;
        t.fn.detach || (t.fn.detach = function() {
            return this.each(function() {
                this.parentNode && this.parentNode.removeChild(this);
            });
        }), e.prototype.resize = function(t, e) {
            if (t <= 0 || e <= 0) throw new Error("Invalid dimensions for plot, width = " + t + ", height = " + e);
            var n = this.element, o = this.context, i = this.pixelRatio;
            this.width != t && (n.width = t * i, n.style.width = t + "px", this.width = t), 
            this.height != e && (n.height = e * i, n.style.height = e + "px", this.height = e), 
            o.restore(), o.save(), o.scale(i, i);
        }, e.prototype.clear = function() {
            this.context.clearRect(0, 0, this.width, this.height);
        }, e.prototype.render = function() {
            var t = this._textCache;
            for (var e in t) if (i.call(t, e)) {
                var n = this.getTextLayer(e), o = t[e];
                n.hide();
                for (var a in o) if (i.call(o, a)) {
                    var r = o[a];
                    for (var s in r) if (i.call(r, s)) {
                        for (var l, c = r[s].positions, d = 0; l = c[d]; d++) l.active ? l.rendered || (n.append(l.element), 
                        l.rendered = !0) : (c.splice(d--, 1), l.rendered && l.element.detach());
                        0 == c.length && delete r[s];
                    }
                }
                n.show();
            }
        }, e.prototype.getTextLayer = function(e) {
            var n = this.text[e];
            return null == n && (null == this.textContainer && (this.textContainer = t("<div class='flot-text'></div>").css({
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                "font-size": "smaller",
                color: "#545454"
            }).insertAfter(this.element)), n = this.text[e] = t("<div></div>").addClass(e).css({
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }).appendTo(this.textContainer)), n;
        }, e.prototype.getTextInfo = function(e, n, o, i, a) {
            var r, s, l, c;
            if (n = "" + n, r = "object" == typeof o ? o.style + " " + o.variant + " " + o.weight + " " + o.size + "px/" + o.lineHeight + "px " + o.family : o, 
            s = this._textCache[e], null == s && (s = this._textCache[e] = {}), l = s[r], null == l && (l = s[r] = {}), 
            c = l[n], null == c) {
                var d = t("<div></div>").html(n).css({
                    position: "absolute",
                    "max-width": a,
                    top: -9999
                }).appendTo(this.getTextLayer(e));
                "object" == typeof o ? d.css({
                    font: r,
                    color: o.color
                }) : "string" == typeof o && d.addClass(o), c = l[n] = {
                    width: d.outerWidth(!0),
                    height: d.outerHeight(!0),
                    element: d,
                    positions: []
                }, d.detach();
            }
            return c;
        }, e.prototype.addText = function(t, e, n, o, i, a, r, s, l) {
            var c = this.getTextInfo(t, o, i, a, r), d = c.positions;
            "center" == s ? e -= c.width / 2 : "right" == s && (e -= c.width), "middle" == l ? n -= c.height / 2 : "bottom" == l && (n -= c.height);
            for (var u, f = 0; u = d[f]; f++) if (u.x == e && u.y == n) return void (u.active = !0);
            u = {
                active: !0,
                rendered: !1,
                element: d.length ? c.element.clone() : c.element,
                x: e,
                y: n
            }, d.push(u), u.element.css({
                top: Math.round(n),
                left: Math.round(e),
                "text-align": s
            });
        }, e.prototype.removeText = function(t, e, n, o, a, r) {
            if (null == o) {
                var s = this._textCache[t];
                if (null != s) for (var l in s) if (i.call(s, l)) {
                    var c = s[l];
                    for (var d in c) if (i.call(c, d)) for (var u, f = c[d].positions, h = 0; u = f[h]; h++) u.active = !1;
                }
            } else for (var u, f = this.getTextInfo(t, o, a, r).positions, h = 0; u = f[h]; h++) u.x == e && u.y == n && (u.active = !1);
        }, t.plot = function(e, o, i) {
            var a = new n(t(e), o, i, t.plot.plugins);
            return a;
        }, t.plot.version = "0.8.3", t.plot.plugins = [], t.fn.plot = function(e, n) {
            return this.each(function() {
                t.plot(this, e, n);
            });
        };
    }(jQuery);
}, function(t, e) {
    !function(t) {
        function e(e) {
            function n(t) {
                p.active && (c(t), e.getPlaceholder().trigger("plotselecting", [ a() ]));
            }
            function o(e) {
                1 == e.which && (document.body.focus(), void 0 !== document.onselectstart && null == m.onselectstart && (m.onselectstart = document.onselectstart, 
                document.onselectstart = function() {
                    return !1;
                }), void 0 !== document.ondrag && null == m.ondrag && (m.ondrag = document.ondrag, 
                document.ondrag = function() {
                    return !1;
                }), l(p.first, e), p.active = !0, g = function(t) {
                    i(t);
                }, t(document).one("mouseup", g));
            }
            function i(t) {
                return g = null, void 0 !== document.onselectstart && (document.onselectstart = m.onselectstart), 
                void 0 !== document.ondrag && (document.ondrag = m.ondrag), p.active = !1, c(t), 
                h() ? r() : (e.getPlaceholder().trigger("plotunselected", []), e.getPlaceholder().trigger("plotselecting", [ null ])), 
                !1;
            }
            function a() {
                if (!h()) return null;
                if (!p.show) return null;
                var n = {}, o = p.first, i = p.second;
                return t.each(e.getAxes(), function(t, e) {
                    if (e.used) {
                        var a = e.c2p(o[e.direction]), r = e.c2p(i[e.direction]);
                        n[t] = {
                            from: Math.min(a, r),
                            to: Math.max(a, r)
                        };
                    }
                }), n;
            }
            function r() {
                var t = a();
                e.getPlaceholder().trigger("plotselected", [ t ]), t.xaxis && t.yaxis && e.getPlaceholder().trigger("selected", [ {
                    x1: t.xaxis.from,
                    y1: t.yaxis.from,
                    x2: t.xaxis.to,
                    y2: t.yaxis.to
                } ]);
            }
            function s(t, e, n) {
                return e < t ? t : e > n ? n : e;
            }
            function l(t, n) {
                var o = e.getOptions(), i = e.getPlaceholder().offset(), a = e.getPlotOffset();
                t.x = s(0, n.pageX - i.left - a.left, e.width()), t.y = s(0, n.pageY - i.top - a.top, e.height()), 
                "y" == o.selection.mode && (t.x = t == p.first ? 0 : e.width()), "x" == o.selection.mode && (t.y = t == p.first ? 0 : e.height());
            }
            function c(t) {
                null != t.pageX && (l(p.second, t), h() ? (p.show = !0, e.triggerRedrawOverlay()) : d(!0));
            }
            function d(t) {
                p.show && (p.show = !1, e.triggerRedrawOverlay(), t || e.getPlaceholder().trigger("plotunselected", []));
            }
            function u(t, n) {
                var o, i, a, r, s = e.getAxes();
                for (var l in s) if (o = s[l], o.direction == n && (r = n + o.n + "axis", t[r] || 1 != o.n || (r = n + "axis"), 
                t[r])) {
                    i = t[r].from, a = t[r].to;
                    break;
                }
                if (t[r] || (o = "x" == n ? e.getXAxes()[0] : e.getYAxes()[0], i = t[n + "1"], a = t[n + "2"]), 
                null != i && null != a && i > a) {
                    var c = i;
                    i = a, a = c;
                }
                return {
                    from: i,
                    to: a,
                    axis: o
                };
            }
            function f(t, n) {
                var o, i = e.getOptions();
                "y" == i.selection.mode ? (p.first.x = 0, p.second.x = e.width()) : (o = u(t, "x"), 
                p.first.x = o.axis.p2c(o.from), p.second.x = o.axis.p2c(o.to)), "x" == i.selection.mode ? (p.first.y = 0, 
                p.second.y = e.height()) : (o = u(t, "y"), p.first.y = o.axis.p2c(o.from), p.second.y = o.axis.p2c(o.to)), 
                p.show = !0, e.triggerRedrawOverlay(), !n && h() && r();
            }
            function h() {
                var t = e.getOptions().selection.minSize;
                return Math.abs(p.second.x - p.first.x) >= t && Math.abs(p.second.y - p.first.y) >= t;
            }
            var p = {
                first: {
                    x: -1,
                    y: -1
                },
                second: {
                    x: -1,
                    y: -1
                },
                show: !1,
                active: !1
            }, m = {}, g = null;
            e.clearSelection = d, e.setSelection = f, e.getSelection = a, e.hooks.bindEvents.push(function(t, e) {
                var i = t.getOptions();
                null != i.selection.mode && (e.mousemove(n), e.mousedown(o));
            }), e.hooks.drawOverlay.push(function(e, n) {
                if (p.show && h()) {
                    var o = e.getPlotOffset(), i = e.getOptions();
                    n.save(), n.translate(o.left, o.top);
                    var a = t.color.parse(i.selection.color);
                    n.strokeStyle = a.scale("a", .8).toString(), n.lineWidth = 1, n.lineJoin = i.selection.shape, 
                    n.fillStyle = a.scale("a", .4).toString();
                    var r = Math.min(p.first.x, p.second.x) + .5, s = Math.min(p.first.y, p.second.y) + .5, l = Math.abs(p.second.x - p.first.x) - 1, c = Math.abs(p.second.y - p.first.y) - 1;
                    n.fillRect(r, s, l, c), n.strokeRect(r, s, l, c), n.restore();
                }
            }), e.hooks.shutdown.push(function(e, i) {
                i.unbind("mousemove", n), i.unbind("mousedown", o), g && t(document).unbind("mouseup", g);
            });
        }
        t.plot.plugins.push({
            init: e,
            options: {
                selection: {
                    mode: null,
                    color: "#e8cfac",
                    shape: "round",
                    minSize: 5
                }
            },
            name: "selection",
            version: "1.1"
        });
    }(jQuery);
}, function(t, e) {
    !function(t) {
        function e(t, e) {
            return e * Math.floor(t / e);
        }
        function n(t, e, n, o) {
            if ("function" == typeof t.strftime) return t.strftime(e);
            var i = function(t, e) {
                return t = "" + t, e = "" + (null == e ? "0" : e), 1 == t.length ? e + t : t;
            }, a = [], r = !1, s = t.getHours(), l = s < 12;
            null == n && (n = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]), 
            null == o && (o = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]);
            var c;
            c = s > 12 ? s - 12 : 0 == s ? 12 : s;
            for (var d = 0; d < e.length; ++d) {
                var u = e.charAt(d);
                if (r) {
                    switch (u) {
                      case "a":
                        u = "" + o[t.getDay()];
                        break;

                      case "b":
                        u = "" + n[t.getMonth()];
                        break;

                      case "d":
                        u = i(t.getDate());
                        break;

                      case "e":
                        u = i(t.getDate(), " ");
                        break;

                      case "h":
                      case "H":
                        u = i(s);
                        break;

                      case "I":
                        u = i(c);
                        break;

                      case "l":
                        u = i(c, " ");
                        break;

                      case "m":
                        u = i(t.getMonth() + 1);
                        break;

                      case "M":
                        u = i(t.getMinutes());
                        break;

                      case "q":
                        u = "" + (Math.floor(t.getMonth() / 3) + 1);
                        break;

                      case "S":
                        u = i(t.getSeconds());
                        break;

                      case "y":
                        u = i(t.getFullYear() % 100);
                        break;

                      case "Y":
                        u = "" + t.getFullYear();
                        break;

                      case "p":
                        u = l ? "am" : "pm";
                        break;

                      case "P":
                        u = l ? "AM" : "PM";
                        break;

                      case "w":
                        u = "" + t.getDay();
                    }
                    a.push(u), r = !1;
                } else "%" == u ? r = !0 : a.push(u);
            }
            return a.join("");
        }
        function o(t) {
            function e(t, e, n, o) {
                t[e] = function() {
                    return n[o].apply(n, arguments);
                };
            }
            var n = {
                date: t
            };
            void 0 != t.strftime && e(n, "strftime", t, "strftime"), e(n, "getTime", t, "getTime"), 
            e(n, "setTime", t, "setTime");
            for (var o = [ "Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds" ], i = 0; i < o.length; i++) e(n, "get" + o[i], t, "getUTC" + o[i]), 
            e(n, "set" + o[i], t, "setUTC" + o[i]);
            return n;
        }
        function i(t, e) {
            if ("browser" == e.timezone) return new Date(t);
            if (e.timezone && "utc" != e.timezone) {
                if ("undefined" != typeof timezoneJS && "undefined" != typeof timezoneJS.Date) {
                    var n = new timezoneJS.Date();
                    return n.setTimezone(e.timezone), n.setTime(t), n;
                }
                return o(new Date(t));
            }
            return o(new Date(t));
        }
        function a(o) {
            o.hooks.processOptions.push(function(o, a) {
                t.each(o.getAxes(), function(t, o) {
                    var a = o.options;
                    "time" == a.mode && (o.tickGenerator = function(t) {
                        var n = [], o = i(t.min, a), r = 0, l = a.tickSize && "quarter" === a.tickSize[1] || a.minTickSize && "quarter" === a.minTickSize[1] ? d : c;
                        null != a.minTickSize && (r = "number" == typeof a.tickSize ? a.tickSize : a.minTickSize[0] * s[a.minTickSize[1]]);
                        for (var u = 0; u < l.length - 1 && !(t.delta < (l[u][0] * s[l[u][1]] + l[u + 1][0] * s[l[u + 1][1]]) / 2 && l[u][0] * s[l[u][1]] >= r); ++u) ;
                        var f = l[u][0], h = l[u][1];
                        if ("year" == h) {
                            if (null != a.minTickSize && "year" == a.minTickSize[1]) f = Math.floor(a.minTickSize[0]); else {
                                var p = Math.pow(10, Math.floor(Math.log(t.delta / s.year) / Math.LN10)), m = t.delta / s.year / p;
                                f = m < 1.5 ? 1 : m < 3 ? 2 : m < 7.5 ? 5 : 10, f *= p;
                            }
                            f < 1 && (f = 1);
                        }
                        t.tickSize = a.tickSize || [ f, h ];
                        var g = t.tickSize[0];
                        h = t.tickSize[1];
                        var v = g * s[h];
                        "second" == h ? o.setSeconds(e(o.getSeconds(), g)) : "minute" == h ? o.setMinutes(e(o.getMinutes(), g)) : "hour" == h ? o.setHours(e(o.getHours(), g)) : "month" == h ? o.setMonth(e(o.getMonth(), g)) : "quarter" == h ? o.setMonth(3 * e(o.getMonth() / 3, g)) : "year" == h && o.setFullYear(e(o.getFullYear(), g)), 
                        o.setMilliseconds(0), v >= s.minute && o.setSeconds(0), v >= s.hour && o.setMinutes(0), 
                        v >= s.day && o.setHours(0), v >= 4 * s.day && o.setDate(1), v >= 2 * s.month && o.setMonth(e(o.getMonth(), 3)), 
                        v >= 2 * s.quarter && o.setMonth(e(o.getMonth(), 6)), v >= s.year && o.setMonth(0);
                        var b, y = 0, x = Number.NaN;
                        do if (b = x, x = o.getTime(), n.push(x), "month" == h || "quarter" == h) if (g < 1) {
                            o.setDate(1);
                            var w = o.getTime();
                            o.setMonth(o.getMonth() + ("quarter" == h ? 3 : 1));
                            var k = o.getTime();
                            o.setTime(x + y * s.hour + (k - w) * g), y = o.getHours(), o.setHours(0);
                        } else o.setMonth(o.getMonth() + g * ("quarter" == h ? 3 : 1)); else "year" == h ? o.setFullYear(o.getFullYear() + g) : o.setTime(x + v); while (x < t.max && x != b);
                        return n;
                    }, o.tickFormatter = function(t, e) {
                        var o = i(t, e.options);
                        if (null != a.timeformat) return n(o, a.timeformat, a.monthNames, a.dayNames);
                        var r, l = e.options.tickSize && "quarter" == e.options.tickSize[1] || e.options.minTickSize && "quarter" == e.options.minTickSize[1], c = e.tickSize[0] * s[e.tickSize[1]], d = e.max - e.min, u = a.twelveHourClock ? " %p" : "", f = a.twelveHourClock ? "%I" : "%H";
                        r = c < s.minute ? f + ":%M:%S" + u : c < s.day ? d < 2 * s.day ? f + ":%M" + u : "%b %d " + f + ":%M" + u : c < s.month ? "%b %d" : l && c < s.quarter || !l && c < s.year ? d < s.year ? "%b" : "%b %Y" : l && c < s.year ? d < s.year ? "Q%q" : "Q%q %Y" : "%Y";
                        var h = n(o, r, a.monthNames, a.dayNames);
                        return h;
                    });
                });
            });
        }
        var r = {
            xaxis: {
                timezone: null,
                timeformat: null,
                twelveHourClock: !1,
                monthNames: null
            }
        }, s = {
            second: 1e3,
            minute: 6e4,
            hour: 36e5,
            day: 864e5,
            month: 2592e6,
            quarter: 7776e6,
            year: 525949.2 * 60 * 1e3
        }, l = [ [ 1, "second" ], [ 2, "second" ], [ 5, "second" ], [ 10, "second" ], [ 30, "second" ], [ 1, "minute" ], [ 2, "minute" ], [ 5, "minute" ], [ 10, "minute" ], [ 30, "minute" ], [ 1, "hour" ], [ 2, "hour" ], [ 4, "hour" ], [ 8, "hour" ], [ 12, "hour" ], [ 1, "day" ], [ 2, "day" ], [ 3, "day" ], [ .25, "month" ], [ .5, "month" ], [ 1, "month" ], [ 2, "month" ] ], c = l.concat([ [ 3, "month" ], [ 6, "month" ], [ 1, "year" ] ]), d = l.concat([ [ 1, "quarter" ], [ 2, "quarter" ], [ 1, "year" ] ]);
        t.plot.plugins.push({
            init: a,
            options: r,
            name: "time",
            version: "1.0"
        }), t.plot.formatDate = n, t.plot.dateGenerator = i;
    }(jQuery);
}, function(t, e, n) {
    "use strict";
    !function() {
        function e(t) {
            return u + "/" + t;
        }
        function o() {
            function t(t) {
                t.key === d && t.storageArea === window.sessionStorage && o(JSON.parse(t.newValue));
            }
            function n(t, e, n) {
                var o, i = a.extend({}, e || {}, n || {});
                for (o in i) t[o] !== i[o] && (t[o] = i[o]);
                for (o in t) t[o] !== i[o] && delete t[o];
                return t;
            }
            function o(t, e) {
                if (t) {
                    var o = !p.ready;
                    p.ready = !0, v = t, m = null, e && !b && (b = window.setTimeout(function() {
                        b = null, window.sessionStorage.setItem(d, JSON.stringify(v));
                    }, 10));
                    var i, s = {}, l = t.content || {}, c = t.overlay || {};
                    for (i in l) s[i] = !0;
                    for (i in c) s[i] = !0;
                    var u, f, h = [];
                    for (i in s) {
                        var y = g[i] || {}, x = y.connection_string;
                        l[i] && l[i].color && c[i] && delete c[i].color, u = n(y, l[i], c[i]), u.key = i, 
                        u.address || (u.address = i), u.connection_string = p.generate_connection_string(u.user, u.port, u.address), 
                        u.label || ("localhost" == i || "localhost.localdomain" == i ? (f = r.transport.application(), 
                        0 === f.indexOf("cockpit+=") ? u.label = f.replace("cockpit+=", "") : u.label = window.location.hostname) : u.label = i), 
                        u.avatar || (u.avatar = "../shell/images/server-small.png"), h.push([ i in g ? "updated" : "added", [ u, i, x ] ]), 
                        g[i] = u;
                    }
                    for (i in g) i in s || (u = g[i], delete g[i], delete c[i], h.push([ "removed", [ u, i ] ]));
                    var w, k = a(p), _ = h.length;
                    for (w = 0; w < _; w++) k.triggerHandler(h[w][0], h[w][1]);
                    o && a(p).triggerHandler("ready");
                }
            }
            function i(t, n, o) {
                var i = e(n), s = a.extend({}, t, o);
                return window.sessionStorage.setItem(i, JSON.stringify(s)), p.overlay(n, o), r.when([]);
            }
            function u(t, e) {
                function n(n) {
                    n || (n = {});
                    var o = n[t];
                    return o || (o = n[t] = {}), h(o, e), n;
                }
                var o = r.file(l, {
                    syntax: JSON,
                    superuser: "try"
                }), i = o.modify(n, v.content, v.tag).done(function(n, o) {
                    var i, a = {};
                    for (i in e) a[i] = null;
                    p.data(n, o), p.overlay(t, a);
                }).always(function() {
                    o.close();
                });
                return i;
            }
            function f(t) {
                var e, n, o = s.colors.parse(t);
                for (e in g) if (n = g[e], n.color && s.colors.parse(n.color) == o) return !0;
                return !1;
            }
            function h(t, e) {
                for (var n in e) null === e[n] ? delete t[n] : t[n] = e[n];
            }
            var p = this, m = null;
            p.ready = !1;
            var g = {}, v = {
                content: null,
                tag: null,
                overlay: {
                    localhost: {
                        visible: !0,
                        manifests: r.manifests
                    }
                }
            };
            window.addEventListener("storage", t), window.setTimeout(function() {
                var t = window.sessionStorage.getItem(d);
                !p.ready && t && o(JSON.parse(t));
            });
            var b = null;
            p.add_key = function(t) {
                var e = r.file(c, {
                    superuser: "try"
                });
                return e.modify(function(e) {
                    return e || (e = ""), e + "\n" + t;
                }).always(function() {
                    e.close();
                });
            }, p.add = function(t, e) {
                var n = p.split_connection_string(t), o = n.address;
                n = a.extend({
                    visible: !0,
                    color: e || p.unused_color()
                }, n);
                var i = p.lookup(o);
                return i && (i.on_disk = !0), p.change(n.address, n);
            }, p.unused_color = function() {
                var t, e = s.colors.length;
                for (t = 0; t < e; t++) if (!f(s.colors[t])) return s.colors[t];
                return "gray";
            }, p.change = function(t, e) {
                var n, o, a, s = p.lookup(t);
                if (e.label) {
                    var l = t;
                    s && (l = s.connection_string), s && s.label === e.label || (o = r.dbus("org.freedesktop.hostname1", {
                        host: l
                    }), a = o.call("/org/freedesktop/hostname1", "org.freedesktop.hostname1", "SetPrettyHostname", [ e.label, !0 ]).always(function() {
                        o.close();
                    }).fail(function(t) {
                        console.warn("couldn't set pretty host name: " + t);
                    }));
                }
                return n = s && !s.on_disk ? i(s, t, e) : u(t, e), a ? r.all(a, n) : n;
            }, p.data = function(t, e) {
                var n, i = {};
                for (n in t) i[n] = a.extend({}, v.overlay[n] || {}), h(i[n], {
                    on_disk: !0
                });
                for (n in g) t && !t[n] && (i[n] = a.extend({}, v.overlay[n] || {}), h(i[n], {
                    on_disk: null
                }));
                o({
                    content: t,
                    tag: e,
                    overlay: a.extend({}, v.overlay, i)
                }, !0);
            }, p.overlay = function(t, e) {
                var n = {};
                n[t] = a.extend({}, v.overlay[t] || {}), h(n[t], e), o({
                    content: v.content,
                    tag: v.tag,
                    overlay: a.extend({}, v.overlay, n)
                }, !0);
            }, Object.defineProperty(p, "list", {
                enumerable: !0,
                get: function() {
                    var t;
                    if (!m) {
                        m = [];
                        for (t in g) g[t].visible && m.push(g[t]);
                        m.sort(function(t, e) {
                            return t.label.localeCompare(e.label);
                        });
                    }
                    return m;
                }
            }), Object.defineProperty(p, "addresses", {
                enumerable: !0,
                get: function() {
                    return Object.keys(g);
                }
            }), p.lookup = function(t) {
                var e = p.split_connection_string(t);
                return g[e.address || "localhost"] || null;
            }, p.generate_connection_string = function(t, e, n) {
                var o = n;
                return t && (o = t + "@" + o), e && (o = o + ":" + e), o;
            }, p.split_connection_string = function(t) {
                var e = {}, n = -1, o = -1;
                if (t && (n = t.lastIndexOf("@"), o = t.lastIndexOf(":")), n > 0 && (e.user = t.substring(0, n), 
                t = t.substring(n + 1), o = t.lastIndexOf(":")), o > -1) {
                    var i = parseInt(t.substring(o + 1), 10);
                    isNaN(i) || (e.port = i, t = t.substring(0, o));
                }
                return e.address = t, e;
            }, p.close = function() {
                window.removeEventListener("storage", t);
            };
        }
        function i(t, e) {
            function n(e, n) {
                var o, i, a, r = e.split("/");
                r[0] == u && 2 === r.length && (o = r[1], n && (i = JSON.parse(n), a = t.lookup(o), 
                a && a.on_disk ? a.visible || t.change(o, {
                    visible: !0
                }) : t.overlay(o, i), h.connect(o)));
            }
            function o() {
                var t;
                for (p = !0, t = 0; t < window.sessionStorage.length; t++) {
                    var e = window.sessionStorage.key(t);
                    n(e, window.sessionStorage.getItem(e));
                }
            }
            function i(t) {
                t.storageArea === window.sessionStorage && n(t.key || "", t.newValue);
            }
            function s(e, n, o) {
                var i = {
                    state: n,
                    problem: o
                };
                "connected" == n ? i.restarting = !1 : o && (i.manifests = null, i.checksum = null), 
                t.overlay(e, i);
            }
            function c(e, n, o, i) {
                if (n || (n = t.lookup(o))) {
                    var s = g[o];
                    s && s.valid || (s = {});
                    var l = {};
                    n.color || (l.color = t.unused_color());
                    var c = s.PrettyHostname || s.StaticHostname;
                    c && c !== n.label && (l.label = c);
                    var d = s.OperatingSystemPrettyName;
                    d && d != n.os && (l.os = s.OperatingSystemPrettyName), a.isEmptyObject(l) || t.overlay(o, l), 
                    n.visible ? i && n.connection_string != i ? (r.kill(i), h.disconnect(o), h.connect(o)) : n.problem || h.connect(o) : h.disconnect(o);
                }
            }
            function d(t, e, n) {
                h.disconnect(n);
            }
            var f, h = this, p = !1, m = {}, g = {};
            window.addEventListener("storage", i), a(t).on("added", c), a(t).on("updated", c), 
            a(t).on("removed", d), h.connect = function(e) {
                function n() {
                    !v && b ? s(e, "connected", null) : y || s(e, "connecting", null);
                }
                function o() {
                    v = a.ajax({
                        url: f,
                        dataType: "json",
                        cache: !0
                    }).done(function(n) {
                        var o = {
                            manifests: n
                        }, i = v.getResponseHeader("ETag");
                        i && (o.checksum = i.replace(/^"(.+)"$/, "$1")), t.overlay(e, o);
                    }).fail(function(t) {
                        console.warn("failed to load manifests from " + l.connection_string + ": " + t);
                    }).always(function() {
                        v = null, n();
                    });
                }
                function i() {
                    if (!l.static_hostname) {
                        var t = r.dbus("org.freedesktop.hostname1", {
                            host: l.connection_string
                        }).proxy();
                        g[e] = t, t.wait(function() {
                            a(t).on("changed", function() {
                                c(null, null, e);
                            }), c(null, null, e);
                        });
                    }
                }
                var l = t.lookup(e);
                if (l) {
                    var d = m[e];
                    if (!d) {
                        var u = {
                            host: l.connection_string,
                            payload: "echo"
                        };
                        !l.on_disk && l.host_key && (u["temp-session"] = !1, u.session = "shared", u["host-key"] = l.host_key), 
                        d = r.channel(u), m[e] = d;
                        var f, p = "localhost" === e, v = null, b = p, y = null;
                        l.manifests || (f = l.checksum ? "../../" + l.checksum + "/manifests.json" : "../../@" + encodeURI(l.connection_string) + "/manifests.json"), 
                        p ? f && (o(), i()) : (d.send("x"), a(d).on("message", function() {
                            b = !0, f && o(), i(), n();
                        }).on("close", function(n, o) {
                            y = o.problem || "disconnected", b = !1, s(e, "failed", y);
                            var i = t.lookup(e);
                            i && i.restarting && window.setTimeout(function() {
                                h.connect(e);
                            }, 1e4), h.disconnect(e);
                        })), n();
                    }
                }
            }, h.disconnect = function(t) {
                if ("localhost" !== t) {
                    var e = m[t];
                    delete m[t], e && (e.close(), a(e).off());
                    var n = g[t];
                    delete g[t], n && (n.client.close(), a(n).off());
                }
            }, h.expect_restart = function(e) {
                var n = t.split_connection_string(e);
                t.overlay(n.address, {
                    restarting: !0,
                    problem: null
                });
            }, h.close = function() {
                a(t).off("added", c), a(t).off("changed", c), a(t).off("removed", d), t = null, 
                f && f.close(), f = null, window.removeEventListener("storage", i);
                var e = Object.keys(m);
                e.forEach(h.disconnect);
            }, e ? (o(), t.data({})) : (f = r.file(l, {
                syntax: JSON
            }), f.watch(function(e, n, i) {
                i && console.warn("couldn't load machines data: " + i), t.data(e, n), p || o();
            }));
        }
        var a = n(2), r = n(3), s = {}, l = "/var/lib/cockpit/machines.json", c = "/var/lib/cockpit/known_hosts", d = r.sessionStorage.prefixedKey("v2-machines.json"), u = r.sessionStorage.prefixedKey("v1-session-machine");
        s.instance = function(t) {
            return new o();
        }, s.loader = function(t, e) {
            return new i(t, e);
        }, s.colors = [ "#0099d3", "#67d300", "#d39e00", "#d3007c", "#00d39f", "#00d1d3", "#00618a", "#4c8a00", "#8a6600", "#9b005b", "#008a55", "#008a8a", "#00b9ff", "#7dff00", "#ffbe00", "#ff0096", "#00ffc0", "#00fdff", "#023448", "#264802", "#483602", "#590034", "#024830", "#024848" ], 
        s.colors.parse = function(t) {
            var e = document.createElement("div");
            e.style.color = t;
            var n = window.getComputedStyle(e, null);
            return n.getPropertyValue("color") || e.style.color;
        }, s.known_hosts_path = c, r.transport.wait(function() {
            var t = r.transport.options.capabilities || [];
            s.allow_connection_string = a.inArray("connection-string", t) != -1, s.has_auth_results = a.inArray("auth-method-results", t) != -1;
        }), t.exports = s;
    }();
}, function(t, e, n) {
    "use strict";
    !function() {
        function e(t) {
            var e = m("<div>").append(t);
            return e.find('[translatable="yes"]').each(function(e, n) {
                var o = n.outerHTML, i = g.gettext(n.getAttribute("context"), m(n).text());
                m(n).removeAttr("translatable").text(i), t = t.replace(o, n.outerHTML);
            }), v.parse(t), t;
        }
        function o(t, e) {
            var n = t.lookup(e);
            return n && "localhost" != n.address ? n.connection_string : e;
        }
        function i(t, e, n, i) {
            function a() {
                var t = s.machines_ins.lookup(s.address), e = s.machines_ins.split_connection_string(s.address).address;
                return t && t.label && (e = t.label), e;
            }
            function r(t, e) {
                var n = x;
                y !== t && (x = "add-machine" == t ? new c(s) : "sync-users" == t ? new h(s) : "unknown-hostkey" == t ? new u(s, t) : "invalid-hostkey" == t ? new u(s, t) : "change-auth" == t ? new f(s) : "change-port" == t ? new d(s) : new l(s), 
                y = t, x.load(e), n && n.close && n.close(), n = null);
            }
            var s = this;
            s.machines_ins = n, s.codes = i, s.address = o(s.machines_ins, e);
            var p = null, b = null, y = null, x = null;
            s.try_to_connect = function(t, e) {
                var n = m.Deferred(), o = m.extend({
                    payload: "echo",
                    host: t
                }, e), i = s.machines_ins.lookup(t);
                i && i.host_key && !i.on_disk && (o["temp-session"] = !1, o.session = "shared", 
                o["host-key"] = i.host_key);
                var a = g.channel(o);
                return a.send("x"), m(a).on("message", function() {
                    m(a).off(), a.close(), n.resolve();
                }).on("close", function(t, e) {
                    n.reject(e);
                }), n.promise();
            }, s.get_sel = function(e) {
                var n = t;
                return e && (n = n + " " + e), m(n);
            }, s.set_on_success = function(t) {
                b = t;
            }, s.set_goal = function(t) {
                p = t;
            }, s.complete = function(e) {
                b ? b(e) : m(t).modal("hide");
            }, s.render = function(t, e) {
                e || (e = y);
                var n = s.machines_ins.split_connection_string(s.address), o = m.extend({
                    host: a(),
                    full_address: s.address,
                    context_title: s.context_title,
                    strong: function() {
                        return function(t, e) {
                            return "<strong>" + e(t) + "</strong>";
                        };
                    }
                }, t, n), i = m(v.render(I[e], o));
                g.translate(i), s.get_sel(".modal-content").html(i);
            }, s.render_error = function(e) {
                var n;
                e.problem && "close" == e.command && (n = s.codes[e.problem]), n && y !== n ? r(n, e) : m(t).dialog("failure", g.message(e));
            }, s.render_template = function(t) {
                r(t);
            }, s.show = function() {
                var t = s.get_sel();
                t.on("hide.bs.modal", function() {
                    s.get_sel(".model-content").empty();
                }), t.modal("show");
            }, s.run = function(t, e) {
                function n(t) {
                    i[t]().done(function(e) {
                        t += 1, t < i.length ? n(t) : (o.resolve(), s.complete(e));
                    }).fail(function(t) {
                        e ? e(t) : s.render_error(t), o.reject(t);
                    });
                }
                var o = m.Deferred(), i = [];
                i.push(function() {
                    return t;
                }), s.get_sel().dialog("wait", o.promise()), p && i.push(p), n(0);
            };
        }
        function a(t, e) {
            var n = t[e];
            return !!n && "no-server-support" != n;
        }
        function r(t, e) {
            return !!a(t, e) && ("password" == e || "not-provided" != t[e]);
        }
        function s(t) {
            var e = this;
            e.render = function(e, n, o) {
                var i;
                n && !o && (i = t.lookup(n), i && (o = i.color)), o || (o = t.unused_color());
                for (var a, r = [], s = 0; s < b.colors.length; s += 6) a = b.colors.slice(s, s + 6), 
                r.push({
                    list: a
                });
                var l = v.render(I["color-picker"], {
                    colors: r
                });
                m(e).html(l), m("#host-edit-color", e).css("background-color", o), m(".color-cell", e).each(function(t) {
                    m(this).css("background-color", b.colors[t]);
                }), m("#host-edit-color-popover .popover-content .color-cell", e).click(function() {
                    var t = m(this).css("background-color");
                    m("#host-edit-color", e).css("background-color", t);
                }), m("#host-edit-color", e).parent().on("show.bs.dropdown", function() {
                    var t = m("#host-edit-color", e), n = m("#host-edit-color-popover", e), o = t.position(), i = t.width(), a = t.height(), r = n.width(), s = n.height(), l = o.top - s + 10;
                    l < 0 ? (l = o.top + a + 10, n.addClass("bottom"), n.removeClass("top")) : (n.addClass("top"), 
                    n.removeClass("bottom")), n.css("left", o.left + (i - r) / 2), n.css("top", l), 
                    n.show();
                }).on("hide.bs.dropdown", function() {
                    m("#host-edit-color-popover", e).hide();
                });
            };
        }
        function l(t) {
            var e = this;
            e.load = function() {
                t.render();
            };
        }
        function c(t) {
            function e(e) {
                var n = null, o = t.machines_ins.lookup(e);
                return o && o.visible && o.on_disk && (n = new Error(A("This machine has already been added.")), 
                n.target = "#add-machine-address"), n;
            }
            function n(n) {
                var o = !0, i = null, a = m("#add-machine-address").val(), s = t.get_sel(".btn-primary");
                "" === a ? o = !0 : !b.allow_connection_string && (a.indexOf("@") > -1 || a.indexOf(":") > -1) ? i = new Error(A("This version of cockpit-ws does not support connecting to a host with an alternate user or port")) : a.search(/\s+/) === -1 ? (i = e(a), 
                i || (o = !1)) : i = new Error(A("The IP address or host name cannot contain whitespace.")), 
                i && (i.target = "#add-machine-address"), l ? r.dialog("failure", l, i) : r.dialog("failure", i), 
                s.prop("disabled", o);
            }
            function o() {
                l = null, t.address = m("#add-machine-address").val(), a = b.colors.parse(m("#add-machine-color-picker #host-edit-color").css("background-color")), 
                e(t.address) || (t.set_goal(function() {
                    var e = m.Deferred();
                    return t.machines_ins.add(t.address, a).done(e.resolve).fail(function(t) {
                        var n = g.format(A("Failed to add machine: $0"), g.message(t));
                        e.reject(n);
                    }), e.promise();
                }), t.run(t.try_to_connect(t.address), function(e) {
                    if ("no-host" == e.problem) {
                        var n = t.address, o = n.lastIndexOf(":"), i = "22";
                        o === -1 ? n = t.address + ":22" : i = n.substr(o + 1), e.message = g.format(A("Cockpit could not contact the given host $0. Make sure it has ssh running on port $1, or specify another port in the address."), n, i), 
                        e = g.message(e), l = e;
                    }
                    t.render_error(e);
                }));
            }
            var i = this, a = null, r = t.get_sel(), l = null, c = t.machines_ins.addresses.filter(function(e) {
                var n = t.machines_ins.lookup(e);
                return !n || !n.visible;
            });
            i.load = function() {
                var e = g.manifests.shell || {}, i = parseInt(e["machine-limit"], 10), r = new s(t.machines_ins);
                i && !isNaN(i) || (i = 20), t.render({
                    nearlimit: .75 * i <= t.machines_ins.list.length,
                    limit: i,
                    placeholder: A("Enter IP address or host name"),
                    options: c
                });
                var l = t.get_sel(".btn-primary");
                l.on("click", o), m("#add-machine-address").on("keyup", function(t) {
                    if (13 === t.which) {
                        var e = l.prop("disabled");
                        e || o();
                    }
                }), m("#add-machine-address").on("input focus", n), r.render("#add-machine-color-picker", t.address, a), 
                m("#add-machine-address").focus();
            };
        }
        function d(t) {
            function e() {
                function e(e) {
                    t.address = i, t.machines_ins.change(o.address, {
                        port: o.port
                    }).done(function() {
                        e ? t.try_to_connect(i).done(t.complete).fail(function(t) {
                            n.reject(t);
                        }) : n.resolve();
                    }).fail(function(t) {
                        var e = g.format(A("Failed to edit machine: $0"), g.message(t));
                        n.reject(e);
                    });
                }
                var n = m.Deferred(), o = t.machines_ins.split_connection_string(t.address);
                o.port = m("#edit-machine-port").val();
                var i = t.machines_ins.generate_connection_string(o.user, o.port, o.address);
                t.try_to_connect(i).done(function() {
                    e();
                }).fail(function(t) {
                    "no-host" != t.problem ? e(t) : n.reject(t);
                }), t.run(n.promise());
            }
            var n = this;
            n.load = function() {
                var n = t.machines_ins.lookup(t.address);
                return n ? (t.render({
                    port: n.port,
                    allow_connection_string: b.allow_connection_string
                }), void (b.allow_connection_string && t.get_sel(".btn-primary").on("click", e))) : void t.get_sel().modal("hide");
            };
        }
        function u(t, e) {
            function n() {
                var e, n = t.machines_ins.lookup(t.address);
                e = !n || n.on_disk ? t.machines_ins.add_key(r) : t.machines_ins.change(t.address, {
                    host_key: r
                });
                var o = e.then(function() {
                    var e = t.try_to_connect(t.address);
                    return e.fail(function(e) {
                        "invalid-hostkey" != e.problem && "unknown-hostkey" != e.problem || !n || n.on_disk || t.machines_ins.change(t.address, {
                            host_key: null
                        });
                    }), e;
                });
                t.run(o);
            }
            function o() {
                var i, l = null;
                a && (r = a["host-key"], i = a["host-fingerprint"]), t.render({
                    context_title: t.context_title,
                    path: b.known_hosts_path,
                    key: i,
                    key_host: r ? r.split(" ")[0] : null
                }), r ? s && t.get_sel(".btn-primary").on("click", n) : (l = t.try_to_connect(t.address).fail(function(n) {
                    n.problem != e ? t.render_error(n) : (a = n, o());
                }).done(function(e) {
                    t.complete(e);
                }), t.get_sel().dialog("wait", l));
            }
            var i = this, a = null, r = null, s = "unknown-hostkey" == e;
            i.load = function(t) {
                a = t, o();
            };
        }
        function f(t) {
            function e() {
                var e = t.get_sel(".keys");
                if (e) {
                    e.empty();
                    for (var n in d.items) {
                        var o = d.items[n];
                        o.loaded && e.append(m("<div>").text(o.name));
                    }
                }
            }
            function n() {
                var e, n = {}, o = m.Deferred(), i = m("#login-custom-user").val(), a = t.machines_ins.split_connection_string(t.address);
                a.user = i, e = t.machines_ins.generate_connection_string(a.user, a.port, a.address), 
                "stored" != m("#login-type").val() && (n.password = m("#login-custom-password").val(), 
                n.session = "shared", i || (s.user && s.user.name && (n.user = s.user.name), n["temp-session"] = !1)), 
                t.try_to_connect(e, n).done(function() {
                    t.address = e, u ? t.machines_ins.change(u.address, {
                        user: i
                    }).done(o.resolve).fail(o.reject) : o.resolve();
                }).fail(o.reject), t.run(o.promise());
            }
            function o(t) {
                var e = "password" != t, n = m("#login-type li[value=" + t + "]").text();
                m("#login-type button span").text(n), m("#login-available").toggle(e), m("#login-diff-password").toggle(!e);
            }
            function i() {
                var d = null, f = "change-auth";
                b.allow_connection_string && b.has_auth_results || (f = "auth-failed");
                var h = null, p = null, g = null, v = t.machines_ins.split_connection_string(t.address).user;
                if (!v && u && (v = u.user), l && b.has_auth_results) {
                    if (g = {}, p = {}, h = l["auth-method-results"]) {
                        c = a(h, "password");
                        for (var y in h) r(h, y) && (p[y] = !0);
                    }
                    m.isEmptyObject(p) && (f = "auth-failed");
                }
                t.render({
                    supported: h,
                    available: p,
                    machine_user: v,
                    user: s.user ? s.user.name : "",
                    allows_password: c,
                    can_sync: !!t.codes["sync-users"],
                    "machines.allow_connection_string": b.allow_connection_string,
                    sync_link: function() {
                        return function(t, e) {
                            return '<a id="do-sync-users">' + e(t) + "</a>";
                        };
                    }
                }, f), null === h && b.has_auth_results ? (d = t.try_to_connect(t.address).fail(function(t) {
                    l = t, i();
                }).done(function(e) {
                    t.complete(e);
                }), t.get_sel().dialog("wait", d)) : m.isEmptyObject(p) || (m("#login-type li").on("click", function() {
                    o(m(this).attr("value"));
                }), o(m("#login-type li:first-child").attr("value")), t.get_sel(".btn-primary").on("click", n), 
                t.get_sel("a[data-content]").popover(), e()), t.get_sel("#do-sync-users").on("click", function() {
                    t.render_template("sync-users");
                });
            }
            var s = this, l = null, c = !1, d = null, u = t.machines_ins.lookup(t.address);
            s.user = {}, s.load = function(t) {
                l = t, y && (d = y.keys_instance(), m(d).on("changed", e)), g.user().done(function(t) {
                    s.user = t;
                }).always(function(t) {
                    i();
                });
            }, s.close = function(t) {
                d && (m(d).off(), d.close()), d = null;
            };
        }
        function h(t) {
            function e() {
                var t = g.dbus(null, {
                    bus: "internal",
                    host: "localhost",
                    superuser: !0
                });
                m(t).on("close", function(t, e) {
                    f = e, i();
                });
                var e = t.proxy("cockpit.Setup", "/setup");
                e.wait(function() {
                    if (e.valid) {
                        var n = {
                            t: "(asas)",
                            v: [ [], [] ]
                        };
                        e.Transfer("passwd1", n).done(function(t) {
                            var e, n, o, i = t.v[1];
                            for (e = 0; e < t.v[0].length; e++) {
                                var a = t.v[0][e];
                                n = a.split(":"), o = n[0], s[o] = {
                                    username: o,
                                    name: n[4] || o,
                                    raw: a,
                                    groups: []
                                };
                            }
                            for (e = 0; e < i.length; e++) {
                                n = i[e].split(":"), o = n[0];
                                for (var r = n[n.length - 1].split(","), l = 0; l < r.length; l++) {
                                    var c = r[l];
                                    s[c] && s[c].groups.push(o);
                                }
                            }
                        }).fail(function(t) {
                            t.message = g.gettext(t.message), f = t;
                        }).always(function(e) {
                            m(t).off(), t.close(), i();
                        });
                    }
                });
            }
            function n() {
                var e = null, n = m.Deferred(), o = n.promise();
                t.run(o), t.set_on_success(null), o.always(function() {
                    e && (m(e).off(), e.close());
                });
                var i = {
                    bus: "internal"
                };
                l && (i.user = m("#sync-username").val(), i.password = m("#sync-password").val()), 
                m.extend(i, u, {
                    host: t.address
                }), e = g.dbus(null, i), m(e).on("close", function(t, e) {
                    n.reject(g.message(e));
                });
                var a = {
                    t: "(asas)",
                    v: [ [] ]
                }, r = {};
                t.get_sel("input:checked").each(function() {
                    var t = s[m(this).attr("name")];
                    if (t) {
                        a.v[0].push(t.raw);
                        for (var e = 0; e < t.groups.length; e++) {
                            var n = t.groups[e];
                            r[n] || (r[n] = []), r[n].push(t.username);
                        }
                    }
                }), a.v.push(Object.keys(r).map(function(t) {
                    return t + ":::" + r[t].join();
                }));
                var c = e.proxy("cockpit.Setup", "/setup");
                c.wait(function() {
                    c.valid && c.Commit("passwd1", a).fail(function(t) {
                        t.message = g.gettext(t.message), n.reject(t);
                    }).done(n.resolve);
                });
            }
            function o() {
                var e = t.get_sel("input:checked").length > 0;
                t.get_sel(".btn-primary").toggleClass("disabled", !e);
            }
            function i() {
                function e() {
                    if (this.groups) return this.groups.join(", ");
                }
                var i = !0, r = Object.keys(s).sort().map(function(t) {
                    return s[t];
                });
                b.has_auth_results && d && (i = a(d, "password"));
                var u = t.render({
                    needs_auth: l,
                    needs_root: c,
                    users: r,
                    perm_failed: f ? g.message(f) : null,
                    allows_password: i,
                    formated_groups: e
                });
                t.get_sel(".modal-content").html(u), t.get_sel(".btn-primary").on("click", n), t.get_sel("input:checkbox").on("change", function() {
                    var t = m(this).attr("name");
                    s[t].checked = m(this).is(":checked"), o();
                }), o();
            }
            var r = this, s = {}, l = !1, c = !1, d = null, u = {
                superuser: !0
            }, f = null;
            r.load = function(n) {
                n && (d = n["auth-method-results"]), i(), t.try_to_connect(t.address, u).fail(function(e) {
                    l = !0, "access-denied" == e.problem ? (c = !0, !d && b.has_auth_results && t.try_to_connect(t.address, {
                        user: "1"
                    }).fail(function(t) {
                        d = t["auth-method-results"];
                    }).always(i)) : (d = e["auth-method-results"], i());
                }), e();
            };
        }
        function p(t, e) {
            var n = this;
            e || (e = E);
            var o = new s(t);
            n.troubleshoot = function(n, o) {
                var a = "#" + n;
                if (o && o.problem) {
                    var r = e[o.problem];
                    "no-host" == o.problem && (r = "change-port");
                    var s = new i(a, o.address, t, e);
                    s.render_template(r), s.show();
                }
            }, n.needs_troubleshoot = function(t) {
                return !(!t || !t.problem) && ("no-host" == t.problem || !!e[t.problem]);
            }, n.render_dialog = function(n, o, a) {
                var r = "#" + o, s = new i(r, a, t, e);
                s.render_template(n), s.show();
            }, n.render_color_picker = function(t, e) {
                o.render(t, e);
            };
        }
        var m = n(2), g = n(3), v = n(4), b = n(10), y = n(12), x = n(20), w = n(21), k = n(22), _ = n(23), C = n(24), T = n(25), M = n(26), S = n(27), z = n(28), A = g.gettext, E = {
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
        }, I = {
            "add-machine": e(x),
            "auth-failed": e(w),
            "change-auth": e(k),
            "change-port": e(_),
            "color-picker": e(C),
            "invalid-hostkey": e(T),
            "not-supported": e(M),
            "sync-users": e(S),
            "unknown-hostkey": e(z)
        };
        t.exports = {
            new_manager: function(t, e) {
                return new p(t, e);
            }
        };
    }();
}, function(t, e, n) {
    (function(e) {
        "use strict";
        !function() {
            function e() {
                function t() {
                    null === c && (c = a.channel({
                        payload: "fslist1",
                        path: l.path
                    }), i(c).on("close", function(t, e) {
                        i(c).off(), e.problem && "not-found" != e.problem ? (console.warn("couldn't watch " + l.path + ": " + (e.message || e.problem)), 
                        c = !1) : c = null;
                    }).on("message", function(e, n) {
                        var o = JSON.parse(n), i = o.path;
                        i && i.indexOf("/") === -1 && ".pub" === i.slice(-4) && ("present" !== o.event && "created" !== o.event && "changed" !== o.event && "deleted" !== o.event || (window.clearInterval(u), 
                        u = window.setTimeout(t, 100)));
                    })), d || (window.clearTimeout(u), u = null, d = a.script(r, [ l.path ], {
                        err: "message"
                    }).always(function() {
                        d = null, u || (u = window.setTimeout(t, 5e3));
                    }).done(function(t) {
                        e(t);
                    }).fail(function(t) {
                        console.warn("failed to list keys in home directory: " + t.message);
                    }));
                }
                function e(t) {
                    var e, a = t.split("\v"), r = {};
                    a[0].trim().split("\n").forEach(function(t) {
                        e = n(t, r), e && (e.loaded = !0);
                    }), a.slice(1).forEach(function(t, i) {
                        switch (i % 3) {
                          case 0:
                            e = n(t, r);
                            break;

                          case 1:
                            e && (t = t.trim(), ".pub" === t.slice(-4) ? e.name = t.slice(0, -4) : e.name = t);
                            break;

                          case 2:
                            e && o(t, e);
                        }
                    }), l.items = r, i(l).triggerHandler("changed");
                }
                function n(t, e) {
                    var n, o, i, a = t.trim().split(" ");
                    if (isNaN(parseInt(a[0], 10))) if (0 === a[0].indexOf("ssh-")) n = a[1], o = a[0].substring(4).toUpperCase(), 
                    i = a.slice(2).join(" "); else {
                        if (0 !== a[0].indexOf("ecdsa-")) return;
                        n = a[1], o = "ECDSA", i = a.slice(2).join(" ");
                    } else n = a[2], o = "RSA1", i = a.slice(3).join(" ");
                    var r = e[n];
                    return r || (r = e[n] = {}), r.type = o, r.comment = i, r.data = t, r;
                }
                function o(t, e) {
                    var n = t.trim().split(" ");
                    e.size = parseInt(n[0], 10), isNaN(e.size) && (e.size = null), e.fingerprint = n[1];
                }
                var l = this;
                l.path = null, l.items = {};
                var c = null, d = null, u = null;
                a.user().done(function(e) {
                    l.path = e.home + "/.ssh", t();
                }), l.change = function(t, e, n, o) {
                    var r, c = [ /.*Enter old passphrase: $/ ], d = [ /.*Enter new passphrase.*/, /.*Enter same passphrase again: $/ ], u = [ /.*failed: passphrase is too short.*/ ], f = i.Deferred(), h = "", p = !1, m = s("No such file or directory");
                    if (n !== o) return f.reject(new Error(s("The passwords do not match."))), f.promise();
                    var g, v = window.setTimeout(function() {
                        m = s("Prompting via ssh-keygen timed out"), g.close("terminated");
                    }, 1e4);
                    return g = a.spawn([ "ssh-keygen", "-p", "-f", t ], {
                        pty: !0,
                        environ: [ "LC_ALL=C" ],
                        err: "out",
                        directory: l.path
                    }).always(function() {
                        window.clearInterval(v);
                    }).done(function() {
                        f.resolve();
                    }).fail(function(t) {
                        "ProcessError" == t.constructor.name && (t = new Error(m)), f.reject(t);
                    }).stream(function(t) {
                        for (h += t, r = 0; r < c.length; r++) if (c[r].test(h)) return h = "", m = s("Old password not accepted"), 
                        void this.input(e + "\n", !0);
                        for (r = 0; r < d.length; r++) if (d[r].test(h)) return h = "", this.input(n + "\n", !0), 
                        m = s("Failed to change password"), void (p = !0);
                        for (r = 0; p && r < u.length; r++) if (u[r].test(h)) return void (m = s("New password was not accepted"));
                    }), f.promise();
                }, l.load = function(e, n) {
                    var o, r = /.*Enter passphrase for .*/, c = /.*UNPROTECTED PRIVATE KEY FILE.*/, d = /.*Bad passphrase.*/, u = i.Deferred(), f = "", h = "", p = s("Not a valid private key"), m = window.setTimeout(function() {
                        p = s("Prompting via ssh-add timed out"), o.close("terminated");
                    }, 1e4);
                    return o = a.spawn([ "ssh-add", e ], {
                        pty: !0,
                        environ: [ "LC_ALL=C" ],
                        err: "out",
                        directory: l.path
                    }).always(function() {
                        window.clearInterval(m);
                    }).done(function() {
                        t(), u.resolve();
                    }).fail(function(t) {
                        console.log(h), "ProcessError" == t.constructor.name && (t = new Error(p)), u.reject(t);
                    }).stream(function(t) {
                        f += t, h += t, c.test(f) ? (p = s("Invalid file permissions"), f = "") : r.test(f) ? (f = "", 
                        p = s("Password not accepted"), this.input(n + "\n", !0)) : d.test(f) && (f = "", 
                        this.input("\n", !0));
                    }), u.promise();
                }, l.unload = function(e) {
                    return a.spawn([ "ssh-add", "-d", e ], {
                        pty: !0,
                        err: "message",
                        directory: l.path
                    }).done(t);
                }, l.close = function() {
                    c && c.close(), d && d.close(), window.clearTimeout(u), u = null;
                };
            }
            function o() {
                var t;
                i("#credential-authorize button").on("click", function(t) {
                    a.drop_privileges(!1), t.preventDefault();
                }), i("#credentials-dialog").on("click", "tr.listing-ct-item", function(t) {
                    var e;
                    0 === i(t.target).parents(".listing-ct-actions, ul").length && (e = i(t.target).parents("tbody"), 
                    e.toggleClass("open").removeClass("unlock"), e.find(".alert").hide());
                }).on("mouseenter", ".listing-ct-item", function(t) {
                    i(t.target).parents("tbody").find(".listing-ct-item").addClass("highlight-ct");
                }).on("mouseleave", ".listing-ct-item", function(t) {
                    i(t.target).parents("tbody").find(".listing-ct-item").removeClass("highlight-ct");
                }).on("change", ".btn-group", function(e) {
                    var n = i(this).parents("tbody"), o = n.attr("data-id"), a = t.items[o];
                    if (a && a.name) {
                        var r = i(this).onoff("value");
                        r && !a.loaded ? n.addClass("open").addClass("unlock") : !r && a.loaded && t.unload(a.name).done(function(t) {
                            n.removeClass("open");
                        }).fail(function(t) {
                            n.addClass("open").removeClass("unlock"), n.find(".alert").show().find(".credential-alert").text(t.message);
                        });
                    }
                }).on("click", ".credential-unlock button", function(e) {
                    var n = i(this).parents("tbody"), o = n.attr("data-id"), a = t.items[o];
                    if (a && a.name) {
                        n.find("input button").prop("disabled", !0);
                        var r = n.find(".credential-password").val();
                        t.load(a.name, r).always(function(t) {
                            n.find("input button").prop("disabled", !1);
                        }).done(function(t) {
                            n.find(".credential-password").val(""), n.removeClass("unlock"), n.find(".alert").hide();
                        }).fail(function(t) {
                            n.find(".alert").show().find("span").text(t.message), console.warn("loading key failed: ", t.message);
                        });
                    }
                }).on("click", ".credential-change", function(e) {
                    var n = i(this).parents("tbody"), o = n.attr("data-id"), a = t.items[o];
                    if (a && a.name) {
                        n.find("input button").prop("disabled", !0);
                        var r = n.find(".credential-old").val(), s = n.find(".credential-new").val(), l = n.find(".credential-two").val();
                        if (void 0 === r || void 0 === s || void 0 === l) throw "invalid password fields";
                        t.change(a.name, r, s, l).always(function(t) {
                            n.find("input button").prop("disabled", !1);
                        }).done(function() {
                            n.find(".credential-old").val(""), n.find(".credential-new").val(""), n.find(".credential-two").val(""), 
                            n.find("li a").first().click();
                        }).fail(function(t) {
                            n.find(".alert").show().find("span").text(t.message);
                        });
                    }
                }).on("change keypress", "input", function(t) {
                    var e = i(this).parents("tbody");
                    "keypress" == t.type && 13 == t.keyCode && i(this).parents("dl").find(".btn-primary").click(), 
                    e.find(".alert").hide();
                }).on("click", "tr.credential-panel ul > li > a", function() {
                    var t = i(this).parent(), e = t.index();
                    t.parent().children().removeClass("active"), t.addClass("active");
                    var n = i(this).parents("tbody");
                    n.find(".credential-tab").hide().eq(e).show(), n.find(".alert").hide();
                }).on("click", "[data-toggle='popover']", function() {
                    i(this).popover("toggle");
                }).on("hide.bs.modal", function() {
                    t && (i(t).off(), t.close(), t = null);
                }).on("show.bs.modal", function() {
                    t = new e(), i("#credential-keys").toggleClass("hidden", i.isEmptyObject(t.items)), 
                    i(t).on("changed", function() {
                        function e(t, e, n) {
                            var o = t.find(e);
                            n = n || "", o.text() !== n && o.text(n);
                        }
                        var n, o, a, r = {}, s = i("#credentials-dialog table.credential-listing");
                        s.find("tbody[data-id]").each(function(t, e) {
                            a = i(e), r[a.attr("data-id")] = a;
                        });
                        var l = s.find("tbody").first();
                        for (o in t.items) o in r || (a = r[o] = l.clone(), a.attr("data-id", o).show().onoff(), 
                        s.append(a));
                        for (o in r) a = r[o], n = t.items[o], n ? (e(a, ".credential-label", n.name || n.comment), 
                        e(a, ".credential-type", n.type), e(a, ".credential-fingerprint", n.fingerprint), 
                        e(a, ".credential-comment", n.comment), e(a, ".credential-data", n.data), a.attr("data-name", n.name).attr("data-loaded", n.loaded ? "1" : "0").find(".btn-onoff-ct").onoff("value", n.loaded || a.hasClass("unlock")).onoff("disabled", !n.name)) : a.remove(), 
                        i("#credential-keys").toggleClass("hidden", i.isEmptyObject(t.items));
                    });
                });
            }
            var i = n(2), a = n(3);
            n(14), n(18);
            var r = n(19), s = a.gettext;
            t.exports = {
                keys_instance: function() {
                    return new e();
                },
                setup: o
            };
        }();
    }).call(e, n(13));
}, function(t, e) {
    "use strict";
    function n() {
        throw new Error("setTimeout has not been defined");
    }
    function o() {
        throw new Error("clearTimeout has not been defined");
    }
    function i(t) {
        if (d === setTimeout) return setTimeout(t, 0);
        if ((d === n || !d) && setTimeout) return d = setTimeout, setTimeout(t, 0);
        try {
            return d(t, 0);
        } catch (e) {
            try {
                return d.call(null, t, 0);
            } catch (e) {
                return d.call(this, t, 0);
            }
        }
    }
    function a(t) {
        if (u === clearTimeout) return clearTimeout(t);
        if ((u === o || !u) && clearTimeout) return u = clearTimeout, clearTimeout(t);
        try {
            return u(t);
        } catch (e) {
            try {
                return u.call(null, t);
            } catch (e) {
                return u.call(this, t);
            }
        }
    }
    function r() {
        m && h && (m = !1, h.length ? p = h.concat(p) : g = -1, p.length && s());
    }
    function s() {
        if (!m) {
            var t = i(r);
            m = !0;
            for (var e = p.length; e; ) {
                for (h = p, p = []; ++g < e; ) h && h[g].run();
                g = -1, e = p.length;
            }
            h = null, m = !1, a(t);
        }
    }
    function l(t, e) {
        this.fun = t, this.array = e;
    }
    function c() {}
    var d, u, f = t.exports = {};
    !function() {
        try {
            d = "function" == typeof setTimeout ? setTimeout : n;
        } catch (t) {
            d = n;
        }
        try {
            u = "function" == typeof clearTimeout ? clearTimeout : o;
        } catch (t) {
            u = o;
        }
    }();
    var h, p = [], m = !1, g = -1;
    f.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        p.push(new l(t, e)), 1 !== p.length || m || i(s);
    }, l.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", 
    f.versions = {}, f.on = c, f.addListener = c, f.once = c, f.off = c, f.removeListener = c, 
    f.removeAllListeners = c, f.emit = c, f.binding = function(t) {
        throw new Error("process.binding is not supported");
    }, f.cwd = function() {
        return "/";
    }, f.chdir = function(t) {
        throw new Error("process.chdir is not supported");
    }, f.umask = function() {
        return 0;
    };
}, function(t, e) {}, , , , function(t, e, n) {
    "use strict";
    !function() {
        function t() {
            return y += 1, "unique" + -new Date() + -y;
        }
        function e(t) {
            t.find(".dialog-error").remove(), t.find(".has-error").removeClass("has-error"), 
            t.find(".dialog-wrapper").off(".dialog-error"), t.off(".dialog-error");
        }
        function o(t, e) {
            var n, o, i = t.parent();
            i.is(".dialog-wrapper") || (i = v("<div class='dialog-wrapper'>").insertBefore(t), 
            n = t.next(), n.is(".bootstrap-select") && n.selectpicker && (n.remove(), o = n.selectpicker), 
            t.remove().appendTo(i), o && o.call(t));
            var a;
            e.message && (a = v("<div class='dialog-error help-block'>").text(e.message)), i.addClass("has-error").append(a), 
            i.hasClass("error-keep") || i.on("keypress.dialog-error change.dialog-error", function() {
                i.removeClass("has-error").find(".dialog-error.help-block").css("visibility", "hidden");
            });
        }
        function i(t, e) {
            var n = v("<div class='alert alert-danger dialog-error'>"), o = e.message || e.toString();
            n.text(o), v("<span class='fa fa-exclamation-triangle'>").prependTo(n), console.warn(o);
            var i = t.find(".modal-footer");
            i.length ? n.prependTo(i) : n.appendTo(t);
        }
        function a(t, n) {
            e(t), 1 == n.length && v.isArray(n[0]) && (n = n[0]);
            var a = !1;
            n.forEach(function(e) {
                var n;
                e && (n = t.find(e.target), n && n.length ? o(n, e) : i(t, e), a = !0);
            }), a && t.on("show.bs.modal.dialog-error", function() {
                e(t);
            });
        }
        function r(t, e) {
            this.promise = t, this.disabled = [], this.handle = e;
        }
        function s(t) {
            var e = t.data("dialog-wait");
            t.data("dialog-wait", null), t.find(".dialog-wait-ct").remove(), t.find(".btn").off(".dialog-wait"), 
            t.off(".dialog-wait"), e && e.disabled.forEach(function(t) {
                t.removeAttr("disabled");
            });
        }
        function l(t, e, n) {
            function o() {
                var n, o = t.data("dialog-wait");
                o && o.promise === e && (s(t), n = e.state(), f || "resolved" == n && o.handle ? t.modal("hide") : "rejected" == n && o.handle && a(t, [ arguments[0] ]));
            }
            function i(n) {
                var o = t.data("dialog-wait");
                o && o.promise === e && ("string" != typeof n && (n = ""), c.text(n));
            }
            if (s(t), !e) return n && t.modal("hide"), t;
            n && a(t, []);
            var l = v("<div class='dialog-wait-ct pull-left'>");
            v("<div class='spinner spinner-sm'>").appendTo(l);
            var c = v("<span>").appendTo(l);
            t.find(".modal-footer button").first().before(l);
            var d = new r(e, n);
            t.data("dialog-wait", d);
            var u = e.cancel || e.close, f = !1, h = t.find(".form-control").add(".btn", t);
            return u && (h = h.not("[data-dismiss]").not(".btn-cancel")), h.each(function() {
                var t = v(this);
                t.attr("disabled") || (d.disabled.push(t), t.attr("disabled", "disabled"));
            }), t.find(".btn[data-dismiss], .btn-cancel").on("click.dialog-wait", function() {
                return f = !0, u && u.apply(e), !1;
            }), t.on("hide.bs.modal.dialog-wait", function() {
                s(t);
            }), e.always(o).progress(i), t;
        }
        function c(e) {
            var n = b.gettext || function(t) {
                return t;
            };
            return e = e.find(".btn-onoff-ct").andSelf().filter(".btn-onoff-ct"), e.each(function(e, o) {
                var i, a, r, s = v(o).attr("data-toggle", "buttons").addClass("btn-group"), l = s.onoff("value"), c = s.find(".btn"), d = s.find("input").first().attr("name") || t();
                for (i = c.length; i < 2; i++) a = v('<input type="radio" autocomplete="off">'), 
                r = document.createTextNode(n(0 === i ? "On" : "Off")), s.append(v('<label class="btn">').append(a, r)), 
                c = null;
                c = c || s.find(".btn"), c.find("input").attr("name", d), u(s, !!l);
            }), e;
        }
        function d(t) {
            return t.find(".btn").first().hasClass("active");
        }
        function u(t, e) {
            return t.each(function(t, n) {
                var o = v(n).find(".btn");
                o.first().toggleClass("active", !!e).find("input").prop("checked", !!e), o.last().toggleClass("active", !e).find("input").prop("checked", !e);
            });
        }
        function f(t, e, n, o) {
            var i = 0;
            o > n ? i = 1 : o < 0 || isNaN(o) ? i = 0 : !isNaN(n) && n > 0 && o >= 0 && (i = o / n), 
            v(e).css("width", 100 * i + "%").next("div").css("margin-left", v(e).css("width")), 
            t.value = i;
        }
        function h(t) {
            f(t, v(t).children("div.slider-bar").first()[0], 1, t.value);
        }
        function p(t) {
            v(t).toggleClass("slider-warning", t.offsetWidth < t.scrollWidth);
        }
        function m(t) {
            v(t).attr("unselectable", "on"), Object.defineProperty(t, "value", {
                get: function() {
                    return parseFloat(this.getAttribute("value"));
                },
                set: function(t) {
                    var e = String(t);
                    e != this.getAttribute("value") && this.setAttribute("value", t);
                }
            }), Object.defineProperty(t, "disabled", {
                get: function() {
                    return !!this.hasAttribute("disabled") && "false" != this.getAttribute("disabled").toLowerCase();
                },
                set: function(t) {
                    this.setAttribute("disabled", t ? "true" : "false");
                }
            }), h(t), p(t), v(t).on("change", function() {
                h(t), v(t).toggleClass("slider-disabled", t.disabled);
            }), t.disabled && v(t).addClass("slider-disabled"), v(t).on("mousedown", function(e) {
                if (t.disabled) return !0;
                var n, o = v(t).offset().left;
                if (v(e.target).hasClass("slider-thumb")) {
                    var i = e.offsetX || e.clientX - v(e.target).offset().left;
                    o += i - v(e.target).outerWidth() / 2, n = v(e.target).parent()[0];
                } else n = v(t).children("div.slider-bar").first()[0], f(t, n, v(t).width(), e.pageX - o), 
                v(t).trigger("change", [ t.value ]), p(t);
                return v(document).on("mousemove.slider", function(e) {
                    return f(t, n, v(t).width(), e.pageX - o), v(t).trigger("change", [ t.value ]), 
                    p(t), !1;
                }).on("mouseup.slider", function(t) {
                    return v(document).off("mousemove.slider").off("mouseup.slider"), !1;
                }), !1;
            });
        }
        function g() {
            v("div.slider").each(function() {
                m(this);
            });
        }
        var v = n(2), b = n(3), y = 0;
        v.fn.dialog = function(t) {
            return "failure" === t ? a(this, Array.prototype.slice.call(arguments, 1)) : "wait" === t ? l(this, arguments[1]) : "promise" === t ? l(this, arguments[1], !0) : void console.warn("unknown dialog action: " + t);
        }, window.addEventListener("hashchange", function() {
            v(".modal").modal("hide");
        }), v.fn.onoff = function(t) {
            return 0 === arguments.length || "refresh" == t ? c(this) : "value" === t ? 1 === arguments.length ? d(this) : u(this, arguments[1]) : "disabled" == t ? this.find(".btn").toggleClass("disabled", arguments[1]) : void console.warn("unknown switch action: " + t);
        }, v.fn.slider = function(t) {
            var e = this;
            return 0 === arguments.length || "refresh" == t ? (e.each(function() {
                m(this);
            }), e) : void console.warn("unknown slider action: " + t);
        }, v(document).ready(g), v.fn.update_privileged = function(t, e, n) {
            var o = t.allowed !== !1, i = this;
            return i.each(function() {
                var t = "allowed-title";
                "undefined" != typeof v(this).data(t) && v(this).data(t) !== !1 || v(this).data(t, v(this).attr("title") || "");
                var i = {
                    html: !0
                };
                n && (i.placement = n), v(this).tooltip(i), v(this).hasClass("disabled") === o && (v(this).toggleClass("disabled", !o).attr("data-original-title", null), 
                o ? v(this).attr("title", v(this).data(t)) : v(this).attr("title", e), v(this).tooltip("fixTitle"));
            }), i;
        };
    }();
}, function(t, e) {
    t.exports = '#!/bin/sh\n\nset -eu\n\n# The first thing we do is list loaded keys\nssh-add -L || true\n\n# Try to list keys in this directory\ncd "$1" || exit 0\n\n# After that each .pub file gets its on set of blocks\nfor file in *.pub; do\n    printf "\\v"\n    cat "$file"\n    printf "\\v%s\\v" "$file"\n    ssh-keygen -l -f "$file" || true\ndone\n';
}, function(t, e) {
    t.exports = '<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal"\n        aria-hidden="true">&times;</button>\n    <h4 class="modal-title" translatable="yes">Add Machine to Dashboard</h4>\n</div>\n\n<div class="modal-body">\n    <div>\n        <table class="form-table-ct">\n            <tr>\n                <td class="top" translatable="yes">Address</td>\n                <td>\n                <div class="dialog-wrapper error-keep">\n                    <input class="form-control" id="add-machine-address"\n                       type="test" value="{{ full_address }}"\n                       list="options"\n                       placeholder="{{ placeholder }}"/>\n                    <datalist id="options">\n                        {{#options}}\n                        <option value="{{.}}">\n                        {{/options}}\n                    </datalist>\n                </div>\n                </td>\n            </tr>\n            <tr>\n                <td translatable="yes">Color</td>\n                <td id="add-machine-color-picker">\n                </td>\n            </tr>\n        </table>\n    </div>\n</div>\n\n<div class="modal-footer">\n    {{#nearlimit}}\n    <div class="alert alert-warning dialog-error dashboard-machine-warning">\n        <span class="pficon pficon-warning-triangle-o"></span>\n        <span translatable="yes">Connecting simultaneously to more than {{ limit }} machines is unsupported.</span>\n    </div>\n    {{/nearlimit}}\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Cancel</button>\n    <button class="btn btn-primary" translatable="yes">Add</button>\n</div>\n';
}, function(t, e) {
    t.exports = '<div class="modal-header">\n    <h4 class="modal-title" translatable="yes">Authentication Failed</h4>\n</div>\n<div class="modal-body">\n    {{#supported}}\n    <p translatable="yes">Cockpit was unable to log into {{#strong}}{{host}}{{/strong}}. To use this machine with cockpit you will need to enable one of the following authentication methods in the sshd config on {{#strong}}{{host}}{{/strong}}:</p>\n    <ul>\n        {{#password}}<li translatable="yes">Password</li>{{/password}}\n        {{#public-key}}<li translatable="yes">Public Key</li>{{/public-key}}\n        {{#gssapi-mic}}<li translatable="yes">Kerberos Based SSO</li>{{/gssapi-mic}}\n    </ul>\n    {{/supported}}\n\n    {{^supported}}\n    <p translatable="yes">Cockpit was unable to log in to {{#strong}}{{host}}{{/strong}}. {{#can_sync}}You may want to try to {{#sync_link}}synchronize users{{/sync_link}}.{{/can_sync}} For more authentication options and troubleshooting support please upgrade cockpit-ws to a newer version.</p>\n    {{/supported}}\n\n</div>\n<div class="modal-footer">\n    <button class="btn btn-primary" data-dismiss="modal" translatable="yes">Close</button>\n</div>\n';
}, function(t, e) {
    t.exports = '<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal"\n        aria-hidden="true">&times;</button>\n    <h4 class="modal-title" translatable="yes">Log in to {{host}}</h4>\n</div>\n\n<div class="modal-body">\n    {{^available}}\n    <p translatable="yes">Cockpit was unable to log into {{#strong}}{{host}}{{/strong}}.</p>\n    {{/available}}\n\n    {{#available}}\n    <p translatable="yes">Cockpit was unable to log into {{#strong}}{{host}}{{/strong}}. You can change your authentication credentials below. {{#can_sync}}You may prefer to {{#sync_link}}synchronize accounts and passwords{{/sync_link}}.{{/can_sync}}</p>\n\n    <div>\n        <table class="form-table-ct">\n            <tr>\n                <td translatable="yes" class="top">User name</td>\n                <td>\n                    <input class="form-control" id="login-custom-user" type="text" value="{{machine_user}}" placeholder="{{ user }}"/>\n                </td>\n                <td>\n                    <a tabindex="0" role="button" data-toggle="popover"\n                        data-trigger="focus" data-placement="bottom" translate="data-content"\n                        data-content="Leave blank to connect to this machine as the currently logged in user{{#user}} ({{user}}){{/user}}. If you enter a different username, that user will always be used connecting to this machine.">\n                        <span class="fa fa-lg fa-info-circle"></span>\n                    </a>\n                </td>\n            </tr>\n\n            <tr>\n                <td translatable="yes">Authentication</td>\n                <td>\n                    <div class="btn-group bootstrap-select dropdown form-control" id="login-type">\n                        <button class="btn btn-default dropdown-toggle" type="button"\n                            data-toggle="dropdown">\n                            <span class="pull-left" translatable="yes"></span>\n                            <div class="caret"></div>\n                        </button>\n                        <ul class="dropdown-menu">\n                            {{#allows_password}}\n                            <li value="password"><a translate>Type a password</a></li>\n                            {{/allows_password}}\n                            <li value="stored"><a translate>Using available credentials</a></li>\n                        </ul>\n                    </div>\n                </td>\n            </tr>\n\n            {{#allows_password}}\n            <tr id="login-diff-password">\n                <td translatable="yes" class="top">Password</td>\n                <td>\n                    <input class="form-control" id="login-custom-password" type="password" />\n                </td>\n                <td>\n                    <a tabindex="0" role="button" data-toggle="popover"\n                        data-trigger="focus" data-placement="bottom" translate="data-content"\n                        data-content="Entering a different password here means you will need to retype it every time you reconnect to this machine">\n                        <span class="fa fa-lg fa-info-circle"></span>\n                    </a>\n                </td>\n            </tr>\n            {{/allows_password}}\n            <tr id="login-available">\n                <td translatable="yes" class="top">Available</td>\n                <td class="top">\n                        {{#password}}<div translatable="yes">Login Password</div>{{/password}}\n                        {{#gssapi-mic}}<div translatable="yes">Kerberos Ticket</div>{{/gssapi-mic}}\n                        {{#public-key}}<div class="keys"><div class=\'dialog-wait-ct pull-left\'><div class=\'spinner spinner-sm\'></div><span translatable="yes">Checking for public keys</span></div></div>{{/public-key}}\n                </td>\n            </tr>\n        </table>\n    </div>\n    {{/available}}\n</div>\n\n<div class="modal-footer">\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Cancel</button>\n    <button class="btn btn-primary" translatable="yes">Log In</button>\n</div>\n';
}, function(t, e) {
    t.exports = '<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal"\n        aria-hidden="true">&times;</button>\n    <h4 class="modal-title" translatable="yes">Could not contact {{host}}</h4>\n</div>\n\n<div class="modal-body">\n    <p>\n        <span translatable="yes">Cockpit was unable to contact {{#strong}}{{host}}{{/strong}}.</span>\n        {{^allow_connection_string}}\n        <span translatable="yes">To try a different port you will need to upgrade cockpit-ws to a newer version.</span>\n        {{/allow_connection_string}}\n\n        {{#allow_connection_string}}\n        <span translatable="yes">Is sshd running on a different port?</span>\n        {{/allow_connection_string}}\n    </p>\n\n    {{#allow_connection_string}}\n    <div>\n        <table class="form-table-ct">\n            <tr>\n                <td class="top" translatable="yes">Port</td>\n                <td>\n                <div class="dialog-wrapper error-keep">\n                    <input id="edit-machine-port" class="form-control"\n                       type="test" value="{{ port }}"\n                       list="options"\n                       placeholder="22"/>\n                </div>\n                </td>\n            </tr>\n        </table>\n    </div>\n    {{/allow_connection_string}}\n</div>\n\n<div class="modal-footer">\n    {{#allow_connection_string}}\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Cancel</button>\n    <button class="btn btn-primary" translatable="yes">Update</button>\n    {{/allow_connection_string}}\n\n    {{^allow_connection_string}}\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Close</button>\n    {{/allow_connection_string}}\n</div>\n';
}, function(t, e) {
    t.exports = '<div>\n    <div id="host-edit-color" data-toggle="dropdown"></div>\n    <div id="host-edit-color-popover" class="popover in" tabindex="-1">\n        <div class="arrow"></div>\n        <div class="popover-content">\n            {{#colors}}\n            <div>\n                {{#list}}\n                <div class="color-cell"></div>\n                {{/list}}\n            </div>\n            {{/colors}}\n        </div>\n        <div class="arrow"></div>\n    </div>\n</div>\n';
}, function(t, e) {
    t.exports = '<div class="modal-header">\n    <h4 class="modal-title" translatable="yes">Incorrect Host Key</h4>\n</div>\n<div class="modal-body">\n    <div class="banned">\n        <i class="fa fa-ban"></i>\n    </div>\n    <p translatable="yes">The key of {{#strong}}{{host}}{{/strong}} does not match the key previously in use. Unless this machine was recently replaced, it is likely that someone is trying to attack your connection to this machine.</p>\n\n    {{#key_host}}\n    <p translatable="yes">You can remove the previously stored key by running the following command</p>\n\n    <pre class="center">ssh-keygen -R {{ key_host }} -f {{ path }}</pre>\n    {{/key_host}}\n\n</div>\n\n<div class="modal-footer">\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Close</button>\n</div>\n';
}, function(t, e) {
    t.exports = '<div class="modal-header">\n    <h4 class="modal-title" translatable="yes">Cockpit is not installed</h4>\n</div>\n<div class="modal-body">\n    <p translatable="yes">A compatible version of Cockpit is not installed on {{#strong}}{{host}}{{/strong}}.</p>\n</div>\n<div class="modal-footer">\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Close</button>\n</div>\n';
}, function(t, e) {
    t.exports = '<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal"\n        aria-hidden="true">&times;</button>\n    <h4 class="modal-title" translatable="yes">Synchronize users</h4>\n</div>\n\n<div class="modal-body">\n    <p translatable="yes">Select the users that you would like to be synchronized with {{#strong}}{{host}}{{/strong}}</p>\n\n{{#perm_failed}}\n    <div class="alert alert-danger dialog-error">\n        <span class="fa fa-exclamation-triangle"></span>\n        <span translatable="yes">Error loading users: {{perm_failed}}</span>\n    </div>\n{{/perm_failed}}\n\n{{^perm_failed}}\n    <div id="sync-users">\n        <table class="table">\n        <tbody>\n        {{^users}}\n            <tr>\n                  <td>\n                    <div class="center-spinner">\n                        <div class="spinner spinner-lg"></div>\n                    </div>\n                  </td>\n            </tr>\n        {{/users}}\n\n        {{#users}}\n              <tr>\n                  <td><input type="checkbox" name="{{username}}" {{#checked}}checked=checked{{/checked}} /></td>\n                  <td>{{username}}</td>\n                  <td>{{name}}</td>\n                  <td>&#8226;&#8226;&#8226;&#8226;&#8226;</td>\n                  <td>{{formated_groups}}</td>\n              </tr>\n        {{/users}}\n        </tbody>\n        </table>\n    </div>\n\n    {{#needs_auth}}\n    <div>\n        {{#needs_root}}\n        <p translatable="yes">You are connected to {{#strong}}{{host}}{{/strong}}, however in order to synchronize users, a user with superuser privileges is required.</p>\n        {{/needs_root}}\n        {{^needs_root}}\n        <p translatable="yes">In order to synchronize users, you need to log in to {{#strong}}{{host}}{{/strong}}.</p>\n        {{/needs_root}}\n        <table class="form-table-ct">\n            <tr>\n                <td translatable="yes">User name</td>\n                <td>\n                    <input class="form-control" id="sync-username" type="text" />\n                </td>\n            </tr>\n            {{#allows_password}}\n            <tr>\n                <td translatable="yes">Password</td>\n                <td>\n                    <input class="form-control" id="sync-password" type="password" />\n                </td>\n            </tr>\n            {{/allows_password}}\n        </table>\n    </div>\n    {{/needs_auth}}\n{{/perm_failed}}\n</div>\n\n<div class="modal-footer">\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Cancel</button>\n    <button class="btn btn-primary disabled" translatable="yes">Synchronize</button>\n</div>\n';
}, function(t, e) {
    t.exports = '<div class="modal-header">\n    <h4 class="modal-title" translatable="yes">Unknown Host Key</h4>\n</div>\n<div id="add-unknown-host" class="modal-body">\n    {{#key}}\n        <p translatable="yes">The authenticity of host {{#strong}}{{host}}{{/strong}} can\'t be established. Are you sure you want to continue connecting?</p>\n        <div>\n        <table class="form-table-ct">\n            <tr>\n                <td translatable="yes">Fingerprint</td>\n                <td><pre class="machine-key">{{key}} </pre></td>\n            </tr>\n        </table>\n        </div>\n    {{/key}}\n</div>\n\n<div class="modal-footer">\n    <button class="btn btn-default" data-dismiss="modal" translatable="yes">Close</button>\n\n    {{#key}}\n        <button class="btn btn-primary" translatable="yes">Connect</button>\n    {{/key}}\n</div>\n';
}, function(t, e, n) {
    "use strict";
    function o(t, e, n) {
        function o() {
            t.empty().css("width", e).css("height", n).css("position", "relative").append(p = i("<canvas>"), m = i("<canvas>").css("position", "absolute").css("top", 0).css("left", 0).css("z-index", 10)), 
            i("body").append(g = i('<input data-role="none" type="file">').hide()), v = p[0], 
            y = v.getContext("2d"), b = m[0], x = b.getContext("2d"), v.width = b.width = e, 
            v.height = b.height = n, g.on("change", f);
        }
        function a() {
            A = !0, s((e - S) / 2, (n - S) / 2, S, !0), m.on("mousedown", c);
        }
        function r() {
            A = !1, x.clearRect(0, 0, e, n), m.off("mousedown", c);
        }
        function s(t, o, i, a) {
            function r(t, e, n) {
                return e < t ? t : e > n ? n : e;
            }
            t = Math.floor(t), o = Math.floor(o), i = Math.floor(i);
            var s = 2 * z;
            if (a) i = r(s, i, M), t = r(0, t, e - i), o = r(0, o, n - i); else if (t < 0 || o < 0 || t + i > e || o + i > n || i < s) return;
            w = t, k = o, _ = i, l(t, o, t + i, o + i);
        }
        function l(t, o, i, a) {
            function r(t, e, n, o) {
                s.strokeStyle = "black", s.strokeRect(t + .5, e + .5, n - t - 1, o - e - 1), s.strokeStyle = "white", 
                s.strokeRect(t + 1.5, e + 1.5, n - t - 3, o - e - 3);
            }
            var s = x;
            s.clearRect(0, 0, e, n), s.fillStyle = "rgba(0,0,0,0.8)", s.fillRect(0, 0, e, n), 
            s.clearRect(t, o, i - t, a - o);
            var l = z;
            r(t, o, t + l, o + l), r(i - l, o, i, o + l), r(t, a - l, t + l, a), r(i - l, a - l, i, a), 
            r(t, o, i, a);
        }
        function c(t) {
            function e(t) {
                var e = t.pageX - c.left - d, n = t.pageY - c.top - u;
                if (0 === o) s(e, n, p, !0); else {
                    var i = Math.floor((e - f + o * (n - h)) / 2);
                    s(f + a * i, h + r * i, p + l * i, !1);
                }
                T.changed = !0;
            }
            function n(t) {
                i("body").off("mousemove", e), i("body").off("mouseup", n);
            }
            var o, a, r, l, c = m.offset(), d = t.pageX - c.left - w, u = t.pageY - c.top - k, f = w, h = k, p = _, g = z;
            d > 0 && u > 0 && d < _ && u < _ && (d < g && u < g ? (o = 1, a = 1, r = 1, l = -1) : d > _ - g && u < g ? (o = -1, 
            a = 0, r = -1, l = 1) : d < g && u > _ - g ? (o = -1, a = 1, r = 0, l = -1) : d > _ - g && u > _ - g ? (o = 1, 
            a = 0, r = 0, l = 1) : o = 0, i("body").on("mousemove", e), i("body").on("mouseup", n));
        }
        function d(t) {
            var o = i.Deferred(), a = new window.Image();
            return a.onerror = function() {
                o.reject();
            }, a.onload = function() {
                var t, i;
                a.width > a.height ? (t = e, i = t * (a.height / a.width)) : (i = n, t = i * (a.width / a.height)), 
                y.fillStyle = "rgb(255,255,255)", y.fillRect(0, 0, e, n), y.drawImage(a, (e - t) / 2, (n - i) / 2, t, i), 
                S = Math.min(i, t), o.resolve();
            }, a.src = t, o.promise();
        }
        function u(t, e, n) {
            var o = i("<canvas/>")[0];
            o.width = t, o.height = e;
            var a = o.getContext("2d");
            return A ? a.drawImage(v, w, k, _, _, 0, 0, t, e) : a.drawImage(v, 0, 0, M, M, 0, 0, t, e), 
            o.toDataURL(n);
        }
        function f() {
            var t, e, n;
            return t = g[0].files, 1 != t.length ? void C.reject() : (e = t[0], e.type.match("image.*") ? (n = new window.FileReader(), 
            n.onerror = function() {
                C.reject();
            }, n.onload = function() {
                d(n.result).done(function() {
                    C.resolve();
                }).fail(function() {
                    C.reject();
                });
            }, void n.readAsDataURL(e)) : void C.reject());
        }
        function h() {
            return C = i.Deferred(), window.File && window.FileReader ? g.trigger("click") : C.reject(), 
            C.promise();
        }
        var p, m, g, v, b, y, x, w, k, _, C, T = {
            load_data: d,
            get_data: u,
            start_cropping: a,
            stop_cropping: r,
            select_file: h,
            changed: !1
        }, M = Math.min(e, n), S = M, z = 20, A = !1;
        return o(), T;
    }
    var i = n(2);
    t.exports = o;
} ]);
//# sourceMappingURL=dashboard.min.js.map