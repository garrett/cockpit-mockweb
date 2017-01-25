!function(t) {
    function e(n) {
        if (i[n]) return i[n].exports;
        var s = i[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return t[n].call(s.exports, s, s.exports, e), s.loaded = !0, s.exports;
    }
    var i = {};
    return e.m = t, e.c = i, e.p = "", e(0);
}({
    0: function(t, e, i) {
        i(101), t.exports = i(110);
    },
    2: function(t, e) {
        t.exports = jQuery;
    },
    3: function(t, e) {
        t.exports = cockpit;
    },
    5: function(t, e, i) {
        "use strict";
        function n(t) {
            if (t in a) return a[t];
            var e = document.createElement("div");
            e.innerHTML = t, s.translate(e);
            var i = e.innerHTML;
            return a[t] = i, i;
        }
        var s = i(3), o = i(6), a = {};
        t.exports = s.extend({}, o, {
            render: function(t, e, i) {
                return n(o.render(t, e, i));
            },
            to_html: function(t, e, i, s) {
                return n(o.to_html(t, e, i, s));
            },
            clearCache: function() {
                return a = {}, o.clearCache();
            }
        });
    },
    6: function(t, e, i) {
        var n, s;
        /*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */
        !function(o, a) {
            if ("object" == typeof e && e) a(e); else {
                var r = {};
                a(r), n = r, s = "function" == typeof n ? n.call(e, i, e, t) : n, !(void 0 !== s && (t.exports = s));
            }
        }(this, function(t) {
            function e(t, e) {
                return _.call(t, e);
            }
            function i(t) {
                return !e(m, t);
            }
            function n(t) {
                return "function" == typeof t;
            }
            function s(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            }
            function o(t) {
                return String(t).replace(/[&<>"'\/]/g, function(t) {
                    return w[t];
                });
            }
            function a(t) {
                if (!x(t) || 2 !== t.length) throw new Error("Invalid tags: " + t);
                return [ new RegExp(s(t[0]) + "\\s*"), new RegExp("\\s*" + s(t[1])) ];
            }
            function r(e, n) {
                function o() {
                    if (T && !M) for (;C.length; ) delete D[C.pop()]; else C = [];
                    T = !1, M = !1;
                }
                n = n || t.tags, e = e || "", "string" == typeof n && (n = n.split(p));
                for (var r, u, d, m, _, b, x = a(n), w = new h(e), k = [], D = [], C = [], T = !1, M = !1; !w.eos(); ) {
                    if (r = w.pos, d = w.scanUntil(x[0])) for (var S = 0, z = d.length; S < z; ++S) m = d.charAt(S), 
                    i(m) ? C.push(D.length) : M = !0, D.push([ "text", m, r, r + 1 ]), r += 1, "\n" === m && o();
                    if (!w.scan(x[0])) break;
                    if (T = !0, u = w.scan(y) || "name", w.scan(f), "=" === u ? (d = w.scanUntil(g), 
                    w.scan(g), w.scanUntil(x[1])) : "{" === u ? (d = w.scanUntil(new RegExp("\\s*" + s("}" + n[1]))), 
                    w.scan(v), w.scanUntil(x[1]), u = "&") : d = w.scanUntil(x[1]), !w.scan(x[1])) throw new Error("Unclosed tag at " + w.pos);
                    if (_ = [ u, d, r, w.pos ], D.push(_), "#" === u || "^" === u) k.push(_); else if ("/" === u) {
                        if (b = k.pop(), !b) throw new Error('Unopened section "' + d + '" at ' + r);
                        if (b[1] !== d) throw new Error('Unclosed section "' + b[1] + '" at ' + r);
                    } else "name" === u || "{" === u || "&" === u ? M = !0 : "=" === u && (x = a(n = d.split(p)));
                }
                if (b = k.pop()) throw new Error('Unclosed section "' + b[1] + '" at ' + w.pos);
                return c(l(D));
            }
            function l(t) {
                for (var e, i, n = [], s = 0, o = t.length; s < o; ++s) e = t[s], e && ("text" === e[0] && i && "text" === i[0] ? (i[1] += e[1], 
                i[3] = e[3]) : (n.push(e), i = e));
                return n;
            }
            function c(t) {
                for (var e, i, n = [], s = n, o = [], a = 0, r = t.length; a < r; ++a) switch (e = t[a], 
                e[0]) {
                  case "#":
                  case "^":
                    s.push(e), o.push(e), s = e[4] = [];
                    break;

                  case "/":
                    i = o.pop(), i[5] = e[2], s = o.length > 0 ? o[o.length - 1][4] : n;
                    break;

                  default:
                    s.push(e);
                }
                return n;
            }
            function h(t) {
                this.string = t, this.tail = t, this.pos = 0;
            }
            function u(t, e) {
                this.view = null == t ? {} : t, this.cache = {
                    ".": this.view
                }, this.parent = e;
            }
            function d() {
                this.cache = {};
            }
            var f = /\s*/, p = /\s+/, m = /\S/, g = /\s*=/, v = /\s*\}/, y = /#|\^|\/|>|\{|&|=|!/, _ = RegExp.prototype.test, b = Object.prototype.toString, x = Array.isArray || function(t) {
                return "[object Array]" === b.call(t);
            }, w = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;"
            };
            h.prototype.eos = function() {
                return "" === this.tail;
            }, h.prototype.scan = function(t) {
                var e = this.tail.match(t);
                if (e && 0 === e.index) {
                    var i = e[0];
                    return this.tail = this.tail.substring(i.length), this.pos += i.length, i;
                }
                return "";
            }, h.prototype.scanUntil = function(t) {
                var e, i = this.tail.search(t);
                switch (i) {
                  case -1:
                    e = this.tail, this.tail = "";
                    break;

                  case 0:
                    e = "";
                    break;

                  default:
                    e = this.tail.substring(0, i), this.tail = this.tail.substring(i);
                }
                return this.pos += e.length, e;
            }, u.prototype.push = function(t) {
                return new u(t, this);
            }, u.prototype.lookup = function(t) {
                var e;
                if (t in this.cache) e = this.cache[t]; else {
                    for (var i = this; i; ) {
                        if (t.indexOf(".") > 0) {
                            e = i.view;
                            for (var s = t.split("."), o = 0; null != e && o < s.length; ) e = e[s[o++]];
                        } else e = i.view[t];
                        if (null != e) break;
                        i = i.parent;
                    }
                    this.cache[t] = e;
                }
                return n(e) && (e = e.call(this.view)), e;
            }, d.prototype.clearCache = function() {
                this.cache = {};
            }, d.prototype.parse = function(t, e) {
                var i = this.cache, n = i[t];
                return null == n && (n = i[t] = r(t, e)), n;
            }, d.prototype.render = function(t, e, i) {
                var n = this.parse(t), s = e instanceof u ? e : new u(e);
                return this.renderTokens(n, s, i, t);
            }, d.prototype.renderTokens = function(e, i, s, o) {
                function a(t) {
                    return h.render(t, i, s);
                }
                for (var r, l, c = "", h = this, u = 0, d = e.length; u < d; ++u) switch (r = e[u], 
                r[0]) {
                  case "#":
                    if (l = i.lookup(r[1]), !l) continue;
                    if (x(l)) for (var f = 0, p = l.length; f < p; ++f) c += this.renderTokens(r[4], i.push(l[f]), s, o); else if ("object" == typeof l || "string" == typeof l) c += this.renderTokens(r[4], i.push(l), s, o); else if (n(l)) {
                        if ("string" != typeof o) throw new Error("Cannot use higher-order sections without the original template");
                        l = l.call(i.view, o.slice(r[3], r[5]), a), null != l && (c += l);
                    } else c += this.renderTokens(r[4], i, s, o);
                    break;

                  case "^":
                    l = i.lookup(r[1]), (!l || x(l) && 0 === l.length) && (c += this.renderTokens(r[4], i, s, o));
                    break;

                  case ">":
                    if (!s) continue;
                    l = n(s) ? s(r[1]) : s[r[1]], null != l && (c += this.renderTokens(this.parse(l), i, s, l));
                    break;

                  case "&":
                    l = i.lookup(r[1]), null != l && (c += l);
                    break;

                  case "name":
                    l = i.lookup(r[1]), null != l && (c += t.escape(l));
                    break;

                  case "text":
                    c += r[1];
                }
                return c;
            }, t.name = "mustache.js", t.version = "0.8.1", t.tags = [ "{{", "}}" ];
            var k = new d();
            t.clearCache = function() {
                return k.clearCache();
            }, t.parse = function(t, e) {
                return k.parse(t, e);
            }, t.render = function(t, e, i) {
                return k.render(t, e, i);
            }, t.to_html = function(e, i, s, o) {
                var a = t.render(e, i, s);
                return n(o) ? void o(a) : a;
            }, t.escape = o, t.Scanner = h, t.Context = u, t.Writer = d;
        });
    },
    99: function(t, e, i) {
        "use strict";
        !function() {
            function t() {
                return _ += 1, "unique" + -new Date() + -_;
            }
            function e(t) {
                t.find(".dialog-error").remove(), t.find(".has-error").removeClass("has-error"), 
                t.find(".dialog-wrapper").off(".dialog-error"), t.off(".dialog-error");
            }
            function n(t, e) {
                var i, n, s = t.parent();
                s.is(".dialog-wrapper") || (s = v("<div class='dialog-wrapper'>").insertBefore(t), 
                i = t.next(), i.is(".bootstrap-select") && i.selectpicker && (i.remove(), n = i.selectpicker), 
                t.remove().appendTo(s), n && n.call(t));
                var o;
                e.message && (o = v("<div class='dialog-error help-block'>").text(e.message)), s.addClass("has-error").append(o), 
                s.hasClass("error-keep") || s.on("keypress.dialog-error change.dialog-error", function() {
                    s.removeClass("has-error").find(".dialog-error.help-block").css("visibility", "hidden");
                });
            }
            function s(t, e) {
                var i = v("<div class='alert alert-danger dialog-error'>"), n = e.message || e.toString();
                i.text(n), v("<span class='fa fa-exclamation-triangle'>").prependTo(i), console.warn(n);
                var s = t.find(".modal-footer");
                s.length ? i.prependTo(s) : i.appendTo(t);
            }
            function o(t, i) {
                e(t), 1 == i.length && v.isArray(i[0]) && (i = i[0]);
                var o = !1;
                i.forEach(function(e) {
                    var i;
                    e && (i = t.find(e.target), i && i.length ? n(i, e) : s(t, e), o = !0);
                }), o && t.on("show.bs.modal.dialog-error", function() {
                    e(t);
                });
            }
            function a(t, e) {
                this.promise = t, this.disabled = [], this.handle = e;
            }
            function r(t) {
                var e = t.data("dialog-wait");
                t.data("dialog-wait", null), t.find(".dialog-wait-ct").remove(), t.find(".btn").off(".dialog-wait"), 
                t.off(".dialog-wait"), e && e.disabled.forEach(function(t) {
                    t.removeAttr("disabled");
                });
            }
            function l(t, e, i) {
                function n() {
                    var i, n = t.data("dialog-wait");
                    n && n.promise === e && (r(t), i = e.state(), d || "resolved" == i && n.handle ? t.modal("hide") : "rejected" == i && n.handle && o(t, [ arguments[0] ]));
                }
                function s(i) {
                    var n = t.data("dialog-wait");
                    n && n.promise === e && ("string" != typeof i && (i = ""), c.text(i));
                }
                if (r(t), !e) return i && t.modal("hide"), t;
                i && o(t, []);
                var l = v("<div class='dialog-wait-ct pull-left'>");
                v("<div class='spinner spinner-sm'>").appendTo(l);
                var c = v("<span>").appendTo(l);
                t.find(".modal-footer button").first().before(l);
                var h = new a(e, i);
                t.data("dialog-wait", h);
                var u = e.cancel || e.close, d = !1, f = t.find(".form-control").add(".btn", t);
                return u && (f = f.not("[data-dismiss]").not(".btn-cancel")), f.each(function() {
                    var t = v(this);
                    t.attr("disabled") || (h.disabled.push(t), t.attr("disabled", "disabled"));
                }), t.find(".btn[data-dismiss], .btn-cancel").on("click.dialog-wait", function() {
                    return d = !0, u && u.apply(e), !1;
                }), t.on("hide.bs.modal.dialog-wait", function() {
                    r(t);
                }), e.always(n).progress(s), t;
            }
            function c(e) {
                var i = y.gettext || function(t) {
                    return t;
                };
                return e = e.find(".btn-onoff-ct").andSelf().filter(".btn-onoff-ct"), e.each(function(e, n) {
                    var s, o, a, r = v(n).attr("data-toggle", "buttons").addClass("btn-group"), l = r.onoff("value"), c = r.find(".btn"), h = r.find("input").first().attr("name") || t();
                    for (s = c.length; s < 2; s++) o = v('<input type="radio" autocomplete="off">'), 
                    a = document.createTextNode(i(0 === s ? "On" : "Off")), r.append(v('<label class="btn">').append(o, a)), 
                    c = null;
                    c = c || r.find(".btn"), c.find("input").attr("name", h), u(r, !!l);
                }), e;
            }
            function h(t) {
                return t.find(".btn").first().hasClass("active");
            }
            function u(t, e) {
                return t.each(function(t, i) {
                    var n = v(i).find(".btn");
                    n.first().toggleClass("active", !!e).find("input").prop("checked", !!e), n.last().toggleClass("active", !e).find("input").prop("checked", !e);
                });
            }
            function d(t, e, i, n) {
                var s = 0;
                n > i ? s = 1 : n < 0 || isNaN(n) ? s = 0 : !isNaN(i) && i > 0 && n >= 0 && (s = n / i), 
                v(e).css("width", 100 * s + "%").next("div").css("margin-left", v(e).css("width")), 
                t.value = s;
            }
            function f(t) {
                d(t, v(t).children("div.slider-bar").first()[0], 1, t.value);
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
                }), f(t), p(t), v(t).on("change", function() {
                    f(t), v(t).toggleClass("slider-disabled", t.disabled);
                }), t.disabled && v(t).addClass("slider-disabled"), v(t).on("mousedown", function(e) {
                    if (t.disabled) return !0;
                    var i, n = v(t).offset().left;
                    if (v(e.target).hasClass("slider-thumb")) {
                        var s = e.offsetX || e.clientX - v(e.target).offset().left;
                        n += s - v(e.target).outerWidth() / 2, i = v(e.target).parent()[0];
                    } else i = v(t).children("div.slider-bar").first()[0], d(t, i, v(t).width(), e.pageX - n), 
                    v(t).trigger("change", [ t.value ]), p(t);
                    return v(document).on("mousemove.slider", function(e) {
                        return d(t, i, v(t).width(), e.pageX - n), v(t).trigger("change", [ t.value ]), 
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
            var v = i(2), y = i(3), _ = 0;
            v.fn.dialog = function(t) {
                return "failure" === t ? o(this, Array.prototype.slice.call(arguments, 1)) : "wait" === t ? l(this, arguments[1]) : "promise" === t ? l(this, arguments[1], !0) : void console.warn("unknown dialog action: " + t);
            }, window.addEventListener("hashchange", function() {
                v(".modal").modal("hide");
            }), v.fn.onoff = function(t) {
                return 0 === arguments.length || "refresh" == t ? c(this) : "value" === t ? 1 === arguments.length ? h(this) : u(this, arguments[1]) : "disabled" == t ? this.find(".btn").toggleClass("disabled", arguments[1]) : void console.warn("unknown switch action: " + t);
            }, v.fn.slider = function(t) {
                var e = this;
                return 0 === arguments.length || "refresh" == t ? (e.each(function() {
                    m(this);
                }), e) : void console.warn("unknown slider action: " + t);
            }, v(document).ready(g), v.fn.update_privileged = function(t, e, i) {
                var n = t.allowed !== !1, s = this;
                return s.each(function() {
                    var t = "allowed-title";
                    "undefined" != typeof v(this).data(t) && v(this).data(t) !== !1 || v(this).data(t, v(this).attr("title") || "");
                    var s = {
                        html: !0
                    };
                    i && (s.placement = i), v(this).tooltip(s), v(this).hasClass("disabled") === n && (v(this).toggleClass("disabled", !n).attr("data-original-title", null), 
                    n ? v(this).attr("title", v(this).data(t)) : v(this).attr("title", e), v(this).tooltip("fixTitle"));
                }), s;
            };
        }();
    },
    100: function(t, e) {
        /*!
	 * Datepicker for Bootstrap v1.4.0 (https://github.com/eternicode/bootstrap-datepicker)
	 *
	 * Copyright 2012 Stefan Petre
	 * Improvements by Andrew Rowls
	 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
	 */
        !function(t, e) {
            function i() {
                return new Date(Date.UTC.apply(Date, arguments));
            }
            function n() {
                var t = new Date();
                return i(t.getFullYear(), t.getMonth(), t.getDate());
            }
            function s(t, e) {
                return t.getUTCFullYear() === e.getUTCFullYear() && t.getUTCMonth() === e.getUTCMonth() && t.getUTCDate() === e.getUTCDate();
            }
            function o(t) {
                return function() {
                    return this[t].apply(this, arguments);
                };
            }
            function a(e, i) {
                function n(t, e) {
                    return e.toLowerCase();
                }
                var s, o = t(e).data(), a = {}, r = new RegExp("^" + i.toLowerCase() + "([A-Z])");
                i = new RegExp("^" + i.toLowerCase());
                for (var l in o) i.test(l) && (s = l.replace(r, n), a[s] = o[l]);
                return a;
            }
            function r(e) {
                var i = {};
                if (m[e] || (e = e.split("-")[0], m[e])) {
                    var n = m[e];
                    return t.each(p, function(t, e) {
                        e in n && (i[e] = n[e]);
                    }), i;
                }
            }
            var l = function() {
                var e = {
                    get: function(t) {
                        return this.slice(t)[0];
                    },
                    contains: function(t) {
                        for (var e = t && t.valueOf(), i = 0, n = this.length; i < n; i++) if (this[i].valueOf() === e) return i;
                        return -1;
                    },
                    remove: function(t) {
                        this.splice(t, 1);
                    },
                    replace: function(e) {
                        e && (t.isArray(e) || (e = [ e ]), this.clear(), this.push.apply(this, e));
                    },
                    clear: function() {
                        this.length = 0;
                    },
                    copy: function() {
                        var t = new l();
                        return t.replace(this), t;
                    }
                };
                return function() {
                    var i = [];
                    return i.push.apply(i, arguments), t.extend(i, e), i;
                };
            }(), c = function(e, i) {
                this._process_options(i), this.dates = new l(), this.viewDate = this.o.defaultViewDate, 
                this.focusDate = null, this.element = t(e), this.isInline = !1, this.isInput = this.element.is("input"), 
                this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .btn"), 
                this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), 
                this.picker = t(g.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), 
                this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, 
                this.o.calendarWeeks && this.picker.find("tfoot .today, tfoot .clear").attr("colspan", function(t, e) {
                    return parseInt(e) + 1;
                }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), 
                this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDatesDisabled(this.o.datesDisabled), 
                this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), 
                this.isInline && this.show();
            };
            c.prototype = {
                constructor: c,
                _process_options: function(s) {
                    this._o = t.extend({}, this._o, s);
                    var o = this.o = t.extend({}, this._o), a = o.language;
                    switch (m[a] || (a = a.split("-")[0], m[a] || (a = f.language)), o.language = a, 
                    o.startView) {
                      case 2:
                      case "decade":
                        o.startView = 2;
                        break;

                      case 1:
                      case "year":
                        o.startView = 1;
                        break;

                      default:
                        o.startView = 0;
                    }
                    switch (o.minViewMode) {
                      case 1:
                      case "months":
                        o.minViewMode = 1;
                        break;

                      case 2:
                      case "years":
                        o.minViewMode = 2;
                        break;

                      default:
                        o.minViewMode = 0;
                    }
                    o.startView = Math.max(o.startView, o.minViewMode), o.multidate !== !0 && (o.multidate = Number(o.multidate) || !1, 
                    o.multidate !== !1 && (o.multidate = Math.max(0, o.multidate))), o.multidateSeparator = String(o.multidateSeparator), 
                    o.weekStart %= 7, o.weekEnd = (o.weekStart + 6) % 7;
                    var r = g.parseFormat(o.format);
                    if (o.startDate !== -(1 / 0) && (o.startDate ? o.startDate instanceof Date ? o.startDate = this._local_to_utc(this._zero_time(o.startDate)) : o.startDate = g.parseDate(o.startDate, r, o.language) : o.startDate = -(1 / 0)), 
                    o.endDate !== 1 / 0 && (o.endDate ? o.endDate instanceof Date ? o.endDate = this._local_to_utc(this._zero_time(o.endDate)) : o.endDate = g.parseDate(o.endDate, r, o.language) : o.endDate = 1 / 0), 
                    o.daysOfWeekDisabled = o.daysOfWeekDisabled || [], t.isArray(o.daysOfWeekDisabled) || (o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/)), 
                    o.daysOfWeekDisabled = t.map(o.daysOfWeekDisabled, function(t) {
                        return parseInt(t, 10);
                    }), o.datesDisabled = o.datesDisabled || [], !t.isArray(o.datesDisabled)) {
                        var l = [];
                        l.push(g.parseDate(o.datesDisabled, r, o.language)), o.datesDisabled = l;
                    }
                    o.datesDisabled = t.map(o.datesDisabled, function(t) {
                        return g.parseDate(t, r, o.language);
                    });
                    var c = String(o.orientation).toLowerCase().split(/\s+/g), h = o.orientation.toLowerCase();
                    if (c = t.grep(c, function(t) {
                        return /^auto|left|right|top|bottom$/.test(t);
                    }), o.orientation = {
                        x: "auto",
                        y: "auto"
                    }, h && "auto" !== h) if (1 === c.length) switch (c[0]) {
                      case "top":
                      case "bottom":
                        o.orientation.y = c[0];
                        break;

                      case "left":
                      case "right":
                        o.orientation.x = c[0];
                    } else h = t.grep(c, function(t) {
                        return /^left|right$/.test(t);
                    }), o.orientation.x = h[0] || "auto", h = t.grep(c, function(t) {
                        return /^top|bottom$/.test(t);
                    }), o.orientation.y = h[0] || "auto"; else ;
                    if (o.defaultViewDate) {
                        var u = o.defaultViewDate.year || new Date().getFullYear(), d = o.defaultViewDate.month || 0, p = o.defaultViewDate.day || 1;
                        o.defaultViewDate = i(u, d, p);
                    } else o.defaultViewDate = n();
                    o.showOnFocus = o.showOnFocus === e || o.showOnFocus;
                },
                _events: [],
                _secondaryEvents: [],
                _applyEvents: function(t) {
                    for (var i, n, s, o = 0; o < t.length; o++) i = t[o][0], 2 === t[o].length ? (n = e, 
                    s = t[o][1]) : 3 === t[o].length && (n = t[o][1], s = t[o][2]), i.on(s, n);
                },
                _unapplyEvents: function(t) {
                    for (var i, n, s, o = 0; o < t.length; o++) i = t[o][0], 2 === t[o].length ? (s = e, 
                    n = t[o][1]) : 3 === t[o].length && (s = t[o][1], n = t[o][2]), i.off(n, s);
                },
                _buildEvents: function() {
                    var e = {
                        keyup: t.proxy(function(e) {
                            t.inArray(e.keyCode, [ 27, 37, 39, 38, 40, 32, 13, 9 ]) === -1 && this.update();
                        }, this),
                        keydown: t.proxy(this.keydown, this)
                    };
                    this.o.showOnFocus === !0 && (e.focus = t.proxy(this.show, this)), this.isInput ? this._events = [ [ this.element, e ] ] : this.component && this.hasInput ? this._events = [ [ this.element.find("input"), e ], [ this.component, {
                        click: t.proxy(this.show, this)
                    } ] ] : this.element.is("div") ? this.isInline = !0 : this._events = [ [ this.element, {
                        click: t.proxy(this.show, this)
                    } ] ], this._events.push([ this.element, "*", {
                        blur: t.proxy(function(t) {
                            this._focused_from = t.target;
                        }, this)
                    } ], [ this.element, {
                        blur: t.proxy(function(t) {
                            this._focused_from = t.target;
                        }, this)
                    } ]), this._secondaryEvents = [ [ this.picker, {
                        click: t.proxy(this.click, this)
                    } ], [ t(window), {
                        resize: t.proxy(this.place, this)
                    } ], [ t(document), {
                        "mousedown touchstart": t.proxy(function(t) {
                            this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.hide();
                        }, this)
                    } ] ];
                },
                _attachEvents: function() {
                    this._detachEvents(), this._applyEvents(this._events);
                },
                _detachEvents: function() {
                    this._unapplyEvents(this._events);
                },
                _attachSecondaryEvents: function() {
                    this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
                },
                _detachSecondaryEvents: function() {
                    this._unapplyEvents(this._secondaryEvents);
                },
                _trigger: function(e, i) {
                    var n = i || this.dates.get(-1), s = this._utc_to_local(n);
                    this.element.trigger({
                        type: e,
                        date: s,
                        dates: t.map(this.dates, this._utc_to_local),
                        format: t.proxy(function(t, e) {
                            0 === arguments.length ? (t = this.dates.length - 1, e = this.o.format) : "string" == typeof t && (e = t, 
                            t = this.dates.length - 1), e = e || this.o.format;
                            var i = this.dates.get(t);
                            return g.formatDate(i, e, this.o.language);
                        }, this)
                    });
                },
                show: function() {
                    if (!this.element.attr("readonly") || this.o.enableOnReadonly !== !1) return this.isInline || this.picker.appendTo(this.o.container), 
                    this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), 
                    (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && t(this.element).blur(), 
                    this;
                },
                hide: function() {
                    return this.isInline ? this : this.picker.is(":visible") ? (this.focusDate = null, 
                    this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, 
                    this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), 
                    this._trigger("hide"), this) : this;
                },
                remove: function() {
                    return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), 
                    delete this.element.data().datepicker, this.isInput || delete this.element.data().date, 
                    this;
                },
                _utc_to_local: function(t) {
                    return t && new Date(t.getTime() + 6e4 * t.getTimezoneOffset());
                },
                _local_to_utc: function(t) {
                    return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset());
                },
                _zero_time: function(t) {
                    return t && new Date(t.getFullYear(), t.getMonth(), t.getDate());
                },
                _zero_utc_time: function(t) {
                    return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()));
                },
                getDates: function() {
                    return t.map(this.dates, this._utc_to_local);
                },
                getUTCDates: function() {
                    return t.map(this.dates, function(t) {
                        return new Date(t);
                    });
                },
                getDate: function() {
                    return this._utc_to_local(this.getUTCDate());
                },
                getUTCDate: function() {
                    var t = this.dates.get(-1);
                    return "undefined" != typeof t ? new Date(t) : null;
                },
                clearDates: function() {
                    var t;
                    this.isInput ? t = this.element : this.component && (t = this.element.find("input")), 
                    t && t.val("").change(), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide();
                },
                setDates: function() {
                    var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
                    return this.update.apply(this, e), this._trigger("changeDate"), this.setValue(), 
                    this;
                },
                setUTCDates: function() {
                    var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
                    return this.update.apply(this, t.map(e, this._utc_to_local)), this._trigger("changeDate"), 
                    this.setValue(), this;
                },
                setDate: o("setDates"),
                setUTCDate: o("setUTCDates"),
                setValue: function() {
                    var t = this.getFormattedDate();
                    return this.isInput ? this.element.val(t).change() : this.component && this.element.find("input").val(t).change(), 
                    this;
                },
                getFormattedDate: function(i) {
                    i === e && (i = this.o.format);
                    var n = this.o.language;
                    return t.map(this.dates, function(t) {
                        return g.formatDate(t, i, n);
                    }).join(this.o.multidateSeparator);
                },
                setStartDate: function(t) {
                    return this._process_options({
                        startDate: t
                    }), this.update(), this.updateNavArrows(), this;
                },
                setEndDate: function(t) {
                    return this._process_options({
                        endDate: t
                    }), this.update(), this.updateNavArrows(), this;
                },
                setDaysOfWeekDisabled: function(t) {
                    return this._process_options({
                        daysOfWeekDisabled: t
                    }), this.update(), this.updateNavArrows(), this;
                },
                setDatesDisabled: function(t) {
                    this._process_options({
                        datesDisabled: t
                    }), this.update(), this.updateNavArrows();
                },
                place: function() {
                    if (this.isInline) return this;
                    var e = this.picker.outerWidth(), i = this.picker.outerHeight(), n = 10, s = t(this.o.container).width(), o = t(this.o.container).height(), a = t(this.o.container).scrollTop(), r = t(this.o.container).offset(), l = [];
                    this.element.parents().each(function() {
                        var e = t(this).css("z-index");
                        "auto" !== e && 0 !== e && l.push(parseInt(e));
                    });
                    var c = Math.max.apply(Math, l) + 10, h = this.component ? this.component.parent().offset() : this.element.offset(), u = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1), d = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1), f = h.left - r.left, p = h.top - r.top;
                    this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), 
                    "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), 
                    "right" === this.o.orientation.x && (f -= e - d)) : h.left < 0 ? (this.picker.addClass("datepicker-orient-left"), 
                    f -= h.left - n) : f + e > s ? (this.picker.addClass("datepicker-orient-right"), 
                    f = h.left + d - e) : this.picker.addClass("datepicker-orient-left");
                    var m, g, v = this.o.orientation.y;
                    if ("auto" === v && (m = -a + p - i, g = a + o - (p + u + i), v = Math.max(m, g) === g ? "top" : "bottom"), 
                    this.picker.addClass("datepicker-orient-" + v), "top" === v ? p += u : p -= i + parseInt(this.picker.css("padding-top")), 
                    this.o.rtl) {
                        var y = s - (f + d);
                        this.picker.css({
                            top: p,
                            right: y,
                            zIndex: c
                        });
                    } else this.picker.css({
                        top: p,
                        left: f,
                        zIndex: c
                    });
                    return this;
                },
                _allow_update: !0,
                update: function() {
                    if (!this._allow_update) return this;
                    var e = this.dates.copy(), i = [], n = !1;
                    return arguments.length ? (t.each(arguments, t.proxy(function(t, e) {
                        e instanceof Date && (e = this._local_to_utc(e)), i.push(e);
                    }, this)), n = !0) : (i = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), 
                    i = i && this.o.multidate ? i.split(this.o.multidateSeparator) : [ i ], delete this.element.data().date), 
                    i = t.map(i, t.proxy(function(t) {
                        return g.parseDate(t, this.o.format, this.o.language);
                    }, this)), i = t.grep(i, t.proxy(function(t) {
                        return t < this.o.startDate || t > this.o.endDate || !t;
                    }, this), !0), this.dates.replace(i), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), 
                    n ? this.setValue() : i.length && String(e) !== String(this.dates) && this._trigger("changeDate"), 
                    !this.dates.length && e.length && this._trigger("clearDate"), this.fill(), this;
                },
                fillDow: function() {
                    var t = this.o.weekStart, e = "<tr>";
                    if (this.o.calendarWeeks) {
                        this.picker.find(".datepicker-days thead tr:first-child .datepicker-switch").attr("colspan", function(t, e) {
                            return parseInt(e) + 1;
                        });
                        var i = '<th class="cw">&#160;</th>';
                        e += i;
                    }
                    for (;t < this.o.weekStart + 7; ) e += '<th class="dow">' + m[this.o.language].daysMin[t++ % 7] + "</th>";
                    e += "</tr>", this.picker.find(".datepicker-days thead").append(e);
                },
                fillMonths: function() {
                    for (var t = "", e = 0; e < 12; ) t += '<span class="month">' + m[this.o.language].monthsShort[e++] + "</span>";
                    this.picker.find(".datepicker-months td").html(t);
                },
                setRange: function(e) {
                    e && e.length ? this.range = t.map(e, function(t) {
                        return t.valueOf();
                    }) : delete this.range, this.fill();
                },
                getClassNames: function(e) {
                    var i = [], n = this.viewDate.getUTCFullYear(), o = this.viewDate.getUTCMonth(), a = new Date();
                    return e.getUTCFullYear() < n || e.getUTCFullYear() === n && e.getUTCMonth() < o ? i.push("old") : (e.getUTCFullYear() > n || e.getUTCFullYear() === n && e.getUTCMonth() > o) && i.push("new"), 
                    this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"), 
                    this.o.todayHighlight && e.getUTCFullYear() === a.getFullYear() && e.getUTCMonth() === a.getMonth() && e.getUTCDate() === a.getDate() && i.push("today"), 
                    this.dates.contains(e) !== -1 && i.push("active"), (e.valueOf() < this.o.startDate || e.valueOf() > this.o.endDate || t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled) !== -1) && i.push("disabled"), 
                    this.o.datesDisabled.length > 0 && t.grep(this.o.datesDisabled, function(t) {
                        return s(e, t);
                    }).length > 0 && i.push("disabled", "disabled-date"), this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"), 
                    t.inArray(e.valueOf(), this.range) !== -1 && i.push("selected")), i;
                },
                fill: function() {
                    var n, s = new Date(this.viewDate), o = s.getUTCFullYear(), a = s.getUTCMonth(), r = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0), l = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0), c = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, h = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, u = m[this.o.language].today || m.en.today || "", d = m[this.o.language].clear || m.en.clear || "";
                    if (!isNaN(o) && !isNaN(a)) {
                        this.picker.find(".datepicker-days thead .datepicker-switch").text(m[this.o.language].months[a] + " " + o), 
                        this.picker.find("tfoot .today").text(u).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot .clear").text(d).toggle(this.o.clearBtn !== !1), 
                        this.updateNavArrows(), this.fillMonths();
                        var f = i(o, a - 1, 28), p = g.getDaysInMonth(f.getUTCFullYear(), f.getUTCMonth());
                        f.setUTCDate(p), f.setUTCDate(p - (f.getUTCDay() - this.o.weekStart + 7) % 7);
                        var v = new Date(f);
                        v.setUTCDate(v.getUTCDate() + 42), v = v.valueOf();
                        for (var y, _ = []; f.valueOf() < v; ) {
                            if (f.getUTCDay() === this.o.weekStart && (_.push("<tr>"), this.o.calendarWeeks)) {
                                var b = new Date(+f + (this.o.weekStart - f.getUTCDay() - 7) % 7 * 864e5), x = new Date(Number(b) + (11 - b.getUTCDay()) % 7 * 864e5), w = new Date(Number(w = i(x.getUTCFullYear(), 0, 1)) + (11 - w.getUTCDay()) % 7 * 864e5), k = (x - w) / 864e5 / 7 + 1;
                                _.push('<td class="cw">' + k + "</td>");
                            }
                            if (y = this.getClassNames(f), y.push("day"), this.o.beforeShowDay !== t.noop) {
                                var D = this.o.beforeShowDay(this._utc_to_local(f));
                                D === e ? D = {} : "boolean" == typeof D ? D = {
                                    enabled: D
                                } : "string" == typeof D && (D = {
                                    classes: D
                                }), D.enabled === !1 && y.push("disabled"), D.classes && (y = y.concat(D.classes.split(/\s+/))), 
                                D.tooltip && (n = D.tooltip);
                            }
                            y = t.unique(y), _.push('<td class="' + y.join(" ") + '"' + (n ? ' title="' + n + '"' : "") + ">" + f.getUTCDate() + "</td>"), 
                            n = null, f.getUTCDay() === this.o.weekEnd && _.push("</tr>"), f.setUTCDate(f.getUTCDate() + 1);
                        }
                        this.picker.find(".datepicker-days tbody").empty().append(_.join(""));
                        var C = this.picker.find(".datepicker-months").find("th:eq(1)").text(o).end().find("span").removeClass("active");
                        if (t.each(this.dates, function(t, e) {
                            e.getUTCFullYear() === o && C.eq(e.getUTCMonth()).addClass("active");
                        }), (o < r || o > c) && C.addClass("disabled"), o === r && C.slice(0, l).addClass("disabled"), 
                        o === c && C.slice(h + 1).addClass("disabled"), this.o.beforeShowMonth !== t.noop) {
                            var T = this;
                            t.each(C, function(e, i) {
                                if (!t(i).hasClass("disabled")) {
                                    var n = new Date(o, e, 1), s = T.o.beforeShowMonth(n);
                                    s === !1 && t(i).addClass("disabled");
                                }
                            });
                        }
                        _ = "", o = 10 * parseInt(o / 10, 10);
                        var M = this.picker.find(".datepicker-years").find("th:eq(1)").text(o + "-" + (o + 9)).end().find("td");
                        o -= 1;
                        for (var S, z = t.map(this.dates, function(t) {
                            return t.getUTCFullYear();
                        }), U = -1; U < 11; U++) S = [ "year" ], U === -1 ? S.push("old") : 10 === U && S.push("new"), 
                        t.inArray(o, z) !== -1 && S.push("active"), (o < r || o > c) && S.push("disabled"), 
                        _ += '<span class="' + S.join(" ") + '">' + o + "</span>", o += 1;
                        M.html(_);
                    }
                },
                updateNavArrows: function() {
                    if (this._allow_update) {
                        var t = new Date(this.viewDate), e = t.getUTCFullYear(), i = t.getUTCMonth();
                        switch (this.viewMode) {
                          case 0:
                            this.o.startDate !== -(1 / 0) && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                                visibility: "hidden"
                            }) : this.picker.find(".prev").css({
                                visibility: "visible"
                            }), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
                                visibility: "hidden"
                            }) : this.picker.find(".next").css({
                                visibility: "visible"
                            });
                            break;

                          case 1:
                          case 2:
                            this.o.startDate !== -(1 / 0) && e <= this.o.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
                                visibility: "hidden"
                            }) : this.picker.find(".prev").css({
                                visibility: "visible"
                            }), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() ? this.picker.find(".next").css({
                                visibility: "hidden"
                            }) : this.picker.find(".next").css({
                                visibility: "visible"
                            });
                        }
                    }
                },
                click: function(e) {
                    e.preventDefault();
                    var n, s, o, a = t(e.target).closest("span, td, th");
                    if (1 === a.length) switch (a[0].nodeName.toLowerCase()) {
                      case "th":
                        switch (a[0].className) {
                          case "datepicker-switch":
                            this.showMode(1);
                            break;

                          case "prev":
                          case "next":
                            var r = g.modes[this.viewMode].navStep * ("prev" === a[0].className ? -1 : 1);
                            switch (this.viewMode) {
                              case 0:
                                this.viewDate = this.moveMonth(this.viewDate, r), this._trigger("changeMonth", this.viewDate);
                                break;

                              case 1:
                              case 2:
                                this.viewDate = this.moveYear(this.viewDate, r), 1 === this.viewMode && this._trigger("changeYear", this.viewDate);
                            }
                            this.fill();
                            break;

                          case "today":
                            var l = new Date();
                            l = i(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0), this.showMode(-2);
                            var c = "linked" === this.o.todayBtn ? null : "view";
                            this._setDate(l, c);
                            break;

                          case "clear":
                            this.clearDates();
                        }
                        break;

                      case "span":
                        a.hasClass("disabled") || (this.viewDate.setUTCDate(1), a.hasClass("month") ? (o = 1, 
                        s = a.parent().find("span").index(a), n = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(s), 
                        this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(i(n, s, o))) : (o = 1, 
                        s = 0, n = parseInt(a.text(), 10) || 0, this.viewDate.setUTCFullYear(n), this._trigger("changeYear", this.viewDate), 
                        2 === this.o.minViewMode && this._setDate(i(n, s, o))), this.showMode(-1), this.fill());
                        break;

                      case "td":
                        a.hasClass("day") && !a.hasClass("disabled") && (o = parseInt(a.text(), 10) || 1, 
                        n = this.viewDate.getUTCFullYear(), s = this.viewDate.getUTCMonth(), a.hasClass("old") ? 0 === s ? (s = 11, 
                        n -= 1) : s -= 1 : a.hasClass("new") && (11 === s ? (s = 0, n += 1) : s += 1), this._setDate(i(n, s, o)));
                    }
                    this.picker.is(":visible") && this._focused_from && t(this._focused_from).focus(), 
                    delete this._focused_from;
                },
                _toggle_multidate: function(t) {
                    var e = this.dates.contains(t);
                    if (t || this.dates.clear(), e !== -1 ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(e) : this.o.multidate === !1 ? (this.dates.clear(), 
                    this.dates.push(t)) : this.dates.push(t), "number" == typeof this.o.multidate) for (;this.dates.length > this.o.multidate; ) this.dates.remove(0);
                },
                _setDate: function(t, e) {
                    e && "date" !== e || this._toggle_multidate(t && new Date(t)), e && "view" !== e || (this.viewDate = t && new Date(t)), 
                    this.fill(), this.setValue(), e && "view" === e || this._trigger("changeDate");
                    var i;
                    this.isInput ? i = this.element : this.component && (i = this.element.find("input")), 
                    i && i.change(), !this.o.autoclose || e && "date" !== e || this.hide();
                },
                moveMonth: function(t, i) {
                    if (!t) return e;
                    if (!i) return t;
                    var n, s, o = new Date(t.valueOf()), a = o.getUTCDate(), r = o.getUTCMonth(), l = Math.abs(i);
                    if (i = i > 0 ? 1 : -1, 1 === l) s = i === -1 ? function() {
                        return o.getUTCMonth() === r;
                    } : function() {
                        return o.getUTCMonth() !== n;
                    }, n = r + i, o.setUTCMonth(n), (n < 0 || n > 11) && (n = (n + 12) % 12); else {
                        for (var c = 0; c < l; c++) o = this.moveMonth(o, i);
                        n = o.getUTCMonth(), o.setUTCDate(a), s = function() {
                            return n !== o.getUTCMonth();
                        };
                    }
                    for (;s(); ) o.setUTCDate(--a), o.setUTCMonth(n);
                    return o;
                },
                moveYear: function(t, e) {
                    return this.moveMonth(t, 12 * e);
                },
                dateWithinRange: function(t) {
                    return t >= this.o.startDate && t <= this.o.endDate;
                },
                keydown: function(t) {
                    if (!this.picker.is(":visible")) return void (27 === t.keyCode && this.show());
                    var e, i, s, o = !1, a = this.focusDate || this.viewDate;
                    switch (t.keyCode) {
                      case 27:
                        this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                        this.fill()) : this.hide(), t.preventDefault();
                        break;

                      case 37:
                      case 39:
                        if (!this.o.keyboardNavigation) break;
                        e = 37 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || n(), e), 
                        s = this.moveYear(a, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || n(), e), 
                        s = this.moveMonth(a, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || n()), 
                        i.setUTCDate(i.getUTCDate() + e), s = new Date(a), s.setUTCDate(a.getUTCDate() + e)), 
                        this.dateWithinRange(s) && (this.focusDate = this.viewDate = s, this.setValue(), 
                        this.fill(), t.preventDefault());
                        break;

                      case 38:
                      case 40:
                        if (!this.o.keyboardNavigation) break;
                        e = 38 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || n(), e), 
                        s = this.moveYear(a, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || n(), e), 
                        s = this.moveMonth(a, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || n()), 
                        i.setUTCDate(i.getUTCDate() + 7 * e), s = new Date(a), s.setUTCDate(a.getUTCDate() + 7 * e)), 
                        this.dateWithinRange(s) && (this.focusDate = this.viewDate = s, this.setValue(), 
                        this.fill(), t.preventDefault());
                        break;

                      case 32:
                        break;

                      case 13:
                        a = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(a), 
                        o = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                        this.setValue(), this.fill(), this.picker.is(":visible") && (t.preventDefault(), 
                        "function" == typeof t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, 
                        this.o.autoclose && this.hide());
                        break;

                      case 9:
                        this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), 
                        this.hide();
                    }
                    if (o) {
                        this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate");
                        var r;
                        this.isInput ? r = this.element : this.component && (r = this.element.find("input")), 
                        r && r.change();
                    }
                },
                showMode: function(t) {
                    t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + t))), 
                    this.picker.children("div").hide().filter(".datepicker-" + g.modes[this.viewMode].clsName).css("display", "block"), 
                    this.updateNavArrows();
                }
            };
            var h = function(e, i) {
                this.element = t(e), this.inputs = t.map(i.inputs, function(t) {
                    return t.jquery ? t[0] : t;
                }), delete i.inputs, d.call(t(this.inputs), i).bind("changeDate", t.proxy(this.dateUpdated, this)), 
                this.pickers = t.map(this.inputs, function(e) {
                    return t(e).data("datepicker");
                }), this.updateDates();
            };
            h.prototype = {
                updateDates: function() {
                    this.dates = t.map(this.pickers, function(t) {
                        return t.getUTCDate();
                    }), this.updateRanges();
                },
                updateRanges: function() {
                    var e = t.map(this.dates, function(t) {
                        return t.valueOf();
                    });
                    t.each(this.pickers, function(t, i) {
                        i.setRange(e);
                    });
                },
                dateUpdated: function(e) {
                    if (!this.updating) {
                        this.updating = !0;
                        var i = t(e.target).data("datepicker"), n = i.getUTCDate(), s = t.inArray(e.target, this.inputs), o = s - 1, a = s + 1, r = this.inputs.length;
                        if (s !== -1) {
                            if (t.each(this.pickers, function(t, e) {
                                e.getUTCDate() || e.setUTCDate(n);
                            }), n < this.dates[o]) for (;o >= 0 && n < this.dates[o]; ) this.pickers[o--].setUTCDate(n); else if (n > this.dates[a]) for (;a < r && n > this.dates[a]; ) this.pickers[a++].setUTCDate(n);
                            this.updateDates(), delete this.updating;
                        }
                    }
                },
                remove: function() {
                    t.map(this.pickers, function(t) {
                        t.remove();
                    }), delete this.element.data().datepicker;
                }
            };
            var u = t.fn.datepicker, d = function(i) {
                var n = Array.apply(null, arguments);
                n.shift();
                var s;
                return this.each(function() {
                    var o = t(this), l = o.data("datepicker"), u = "object" == typeof i && i;
                    if (!l) {
                        var d = a(this, "date"), p = t.extend({}, f, d, u), m = r(p.language), g = t.extend({}, f, m, d, u);
                        if (o.hasClass("input-daterange") || g.inputs) {
                            var v = {
                                inputs: g.inputs || o.find("input").toArray()
                            };
                            o.data("datepicker", l = new h(this, t.extend(g, v)));
                        } else o.data("datepicker", l = new c(this, g));
                    }
                    if ("string" == typeof i && "function" == typeof l[i] && (s = l[i].apply(l, n), 
                    s !== e)) return !1;
                }), s !== e ? s : this;
            };
            t.fn.datepicker = d;
            var f = t.fn.datepicker.defaults = {
                autoclose: !1,
                beforeShowDay: t.noop,
                beforeShowMonth: t.noop,
                calendarWeeks: !1,
                clearBtn: !1,
                toggleActive: !1,
                daysOfWeekDisabled: [],
                datesDisabled: [],
                endDate: 1 / 0,
                forceParse: !0,
                format: "mm/dd/yyyy",
                keyboardNavigation: !0,
                language: "en",
                minViewMode: 0,
                multidate: !1,
                multidateSeparator: ",",
                orientation: "auto",
                rtl: !1,
                startDate: -(1 / 0),
                startView: 0,
                todayBtn: !1,
                todayHighlight: !1,
                weekStart: 0,
                disableTouchKeyboard: !1,
                enableOnReadonly: !0,
                container: "body"
            }, p = t.fn.datepicker.locale_opts = [ "format", "rtl", "weekStart" ];
            t.fn.datepicker.Constructor = c;
            var m = t.fn.datepicker.dates = {
                en: {
                    days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                    daysShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
                    daysMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su" ],
                    months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                    monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                    today: "Today",
                    clear: "Clear"
                }
            }, g = {
                modes: [ {
                    clsName: "days",
                    navFnc: "Month",
                    navStep: 1
                }, {
                    clsName: "months",
                    navFnc: "FullYear",
                    navStep: 1
                }, {
                    clsName: "years",
                    navFnc: "FullYear",
                    navStep: 10
                } ],
                isLeapYear: function(t) {
                    return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
                },
                getDaysInMonth: function(t, e) {
                    return [ 31, g.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][e];
                },
                validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
                nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
                parseFormat: function(t) {
                    var e = t.replace(this.validParts, "\0").split("\0"), i = t.match(this.validParts);
                    if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
                    return {
                        separators: e,
                        parts: i
                    };
                },
                parseDate: function(n, s, o) {
                    function a() {
                        var t = this.slice(0, d[h].length), e = d[h].slice(0, t.length);
                        return t.toLowerCase() === e.toLowerCase();
                    }
                    if (!n) return e;
                    if (n instanceof Date) return n;
                    "string" == typeof s && (s = g.parseFormat(s));
                    var r, l, h, u = /([\-+]\d+)([dmwy])/, d = n.match(/([\-+]\d+)([dmwy])/g);
                    if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(n)) {
                        for (n = new Date(), h = 0; h < d.length; h++) switch (r = u.exec(d[h]), l = parseInt(r[1]), 
                        r[2]) {
                          case "d":
                            n.setUTCDate(n.getUTCDate() + l);
                            break;

                          case "m":
                            n = c.prototype.moveMonth.call(c.prototype, n, l);
                            break;

                          case "w":
                            n.setUTCDate(n.getUTCDate() + 7 * l);
                            break;

                          case "y":
                            n = c.prototype.moveYear.call(c.prototype, n, l);
                        }
                        return i(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), 0, 0, 0);
                    }
                    d = n && n.match(this.nonpunctuation) || [], n = new Date();
                    var f, p, v = {}, y = [ "yyyy", "yy", "M", "MM", "m", "mm", "d", "dd" ], _ = {
                        yyyy: function(t, e) {
                            return t.setUTCFullYear(e);
                        },
                        yy: function(t, e) {
                            return t.setUTCFullYear(2e3 + e);
                        },
                        m: function(t, e) {
                            if (isNaN(t)) return t;
                            for (e -= 1; e < 0; ) e += 12;
                            for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e; ) t.setUTCDate(t.getUTCDate() - 1);
                            return t;
                        },
                        d: function(t, e) {
                            return t.setUTCDate(e);
                        }
                    };
                    _.M = _.MM = _.mm = _.m, _.dd = _.d, n = i(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0);
                    var b = s.parts.slice();
                    if (d.length !== b.length && (b = t(b).filter(function(e, i) {
                        return t.inArray(i, y) !== -1;
                    }).toArray()), d.length === b.length) {
                        var x;
                        for (h = 0, x = b.length; h < x; h++) {
                            if (f = parseInt(d[h], 10), r = b[h], isNaN(f)) switch (r) {
                              case "MM":
                                p = t(m[o].months).filter(a), f = t.inArray(p[0], m[o].months) + 1;
                                break;

                              case "M":
                                p = t(m[o].monthsShort).filter(a), f = t.inArray(p[0], m[o].monthsShort) + 1;
                            }
                            v[r] = f;
                        }
                        var w, k;
                        for (h = 0; h < y.length; h++) k = y[h], k in v && !isNaN(v[k]) && (w = new Date(n), 
                        _[k](w, v[k]), isNaN(w) || (n = w));
                    }
                    return n;
                },
                formatDate: function(e, i, n) {
                    if (!e) return "";
                    "string" == typeof i && (i = g.parseFormat(i));
                    var s = {
                        d: e.getUTCDate(),
                        D: m[n].daysShort[e.getUTCDay()],
                        DD: m[n].days[e.getUTCDay()],
                        m: e.getUTCMonth() + 1,
                        M: m[n].monthsShort[e.getUTCMonth()],
                        MM: m[n].months[e.getUTCMonth()],
                        yy: e.getUTCFullYear().toString().substring(2),
                        yyyy: e.getUTCFullYear()
                    };
                    s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m, e = [];
                    for (var o = t.extend([], i.separators), a = 0, r = i.parts.length; a <= r; a++) o.length && e.push(o.shift()), 
                    e.push(s[i.parts[a]]);
                    return e.join("");
                },
                headTemplate: '<thead><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',
                contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
                footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
            };
            g.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + g.headTemplate + "<tbody></tbody>" + g.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + g.headTemplate + g.contTemplate + g.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + g.headTemplate + g.contTemplate + g.footTemplate + "</table></div></div>", 
            t.fn.datepicker.DPGlobal = g, t.fn.datepicker.noConflict = function() {
                return t.fn.datepicker = u, this;
            }, t.fn.datepicker.version = "1.4.0", t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
                var i = t(this);
                i.data("datepicker") || (e.preventDefault(), d.call(i, "show"));
            }), t(function() {
                d.call(t('[data-provide="datepicker-inline"]'));
            });
        }(window.jQuery);
    },
    101: function(t, e, i) {
        "use strict";
        function n() {
            g(".hostname-privileged").update_privileged(C, v.format(k("The user <b>$0</b> is not permitted to modify hostnames"), C.user ? C.user.name : ""));
        }
        function s() {
            "all" != window.debugging && "system" != window.debugging || console.debug.apply(console, arguments);
        }
        function o(t) {
            var e, i = M[t];
            return i || (e = g.Deferred(), M[t] = i = e.promise(), v.spawn([ "cat", "/proc/meminfo", "/proc/cpuinfo" ]).done(function(t) {
                var i = {}, n = t.match(/MemTotal:[^0-9]*([0-9]+) [kK]B/), s = n && parseInt(n[1], 10);
                s && (i.memory = 1024 * s), i.cpus = 0;
                for (var o = new RegExp("^processor", "gm"); o.test(t); ) i.cpus += 1;
                e.resolve(i);
            }).fail(function() {
                e.reject();
            })), i;
        }
        function a() {
            var t = this, e = v.dbus("org.freedesktop.timedate1"), i = e.proxy(), n = null, s = null;
            t.timedate = i, t.timedate1_service = b.proxy("dbus-org.freedesktop.timedate1.service"), 
            t.timesyncd_service = b.proxy("systemd-timesyncd.service"), Object.defineProperty(t, "utc_fake_now", {
                enumerable: !0,
                get: function() {
                    var t = n + s;
                    return new Date(t + new Date().valueOf());
                }
            }), Object.defineProperty(t, "now", {
                enumerable: !0,
                get: function() {
                    return new Date(n + new Date().valueOf());
                }
            }), t.format = function(e) {
                var i = t.utc_fake_now.toISOString();
                if (!e) return i.split("T")[0];
                var n = i.lastIndexOf(":");
                return n !== -1 && (i = i.substring(0, n)), i.replace("T", " ");
            }, t.updateInterval = window.setInterval(function() {
                g(t).triggerHandler("changed");
            }, 3e4), t.wait = function() {
                return null === s ? t.update() : v.resolve();
            }, t.update = function() {
                return v.spawn([ "date", "+%s:%:z" ], {
                    err: "message"
                }).done(function(e) {
                    var i = e.trim().split(":").map(function(t) {
                        return parseInt(t, 10);
                    });
                    i[1] < 0 && (i[2] = -i[2]);
                    var o = 1e3 * i[0], a = 36e5 * i[1] + 6e4 * i[2], r = new Date();
                    n = o - r.valueOf(), s = a, g(t).triggerHandler("changed");
                }).fail(function(t) {
                    console.log("Couldn't calculate server time offset: " + v.message(t));
                });
            }, t.change_time = function(e, n, s) {
                var o = g.Deferred();
                return v.spawn([ "date", "--date=" + e + " " + n + ":" + s, "+%s" ]).fail(function(t) {
                    o.reject(t);
                }).done(function(e) {
                    var n = parseInt(e.trim(), 10);
                    i.call("SetTime", [ 1e3 * n * 1e3, !1, !0 ]).fail(function(t) {
                        o.reject(t);
                    }).done(function() {
                        t.update(), o.resolve();
                    });
                }), o;
            }, t.poll_ntp_synchronized = function() {
                e.call(i.path, "org.freedesktop.DBus.Properties", "Get", [ "org.freedesktop.timedate1", "NTPSynchronized" ]).fail(function(t) {
                    "org.freedesktop.DBus.Error.UnknownProperty" != t.name && "not-found" != t.problem && console.log("can't get NTPSynchronized property", t);
                }).done(function(t) {
                    var n = {
                        "org.freedesktop.timedate1": {
                            NTPSynchronized: t[0].v
                        }
                    }, s = {};
                    s[i.path] = n, e.notify(s);
                });
            }, t.close = function() {
                e.close();
            }, t.update();
        }
        function r() {
            this._init();
        }
        function l() {
            this._init();
        }
        function c() {
            this._init();
        }
        function h() {
            this._init();
        }
        function u() {
            this._init();
        }
        function d(t) {
            t.setup(), g("#" + t.id).on("show.bs.modal", function(e) {
                e.target.id === t.id && t.enter();
            }).on("shown.bs.modal", function(e) {
                e.target.id === t.id && t.show();
            }).on("hidden.bs.modal", function(e) {
                e.target.id === t.id && t.leave();
            });
        }
        function f(t, e) {
            t._entered_ || t.enter(e), t._entered_ = !0, g("#" + t.id).show().removeAttr("hidden"), 
            t.show();
        }
        function p(t) {
            g("#" + t.id).hide();
        }
        function m() {
            function t() {
                var t = v.location.path;
                0 === t.length ? (p(n), p(i), f(e)) : 1 === t.length && "cpu" == t[0] ? (p(e), p(i), 
                f(n)) : 1 === t.length && "memory" == t[0] ? (p(e), p(n), f(i)) : (console.warn("not a system location: " + t), 
                v.location = ""), g("body").removeAttr("hidden");
            }
            var e, i, n;
            v.translate(), e = new r(), e.setup(), n = new h(), i = new u(), d(new l()), d(T = new c()), 
            g(v).on("locationchanged", t), t();
        }
        var g = i(2), v = i(3), y = i(5), _ = i(102), b = i(106);
        i(99), i(100), i(107);
        var x = i(108), w = i(109), k = v.gettext, D = v.gettext, C = v.permission({
            admin: !0
        });
        g(C).on("changed", n);
        var T, M = {};
        r.prototype = {
            _init: function() {
                this.id = "server", this.server_time = null, this.client = null, this.hostname_proxy = null;
            },
            getTitle: function() {
                return null;
            },
            setup: function() {
                function t() {
                    var t = g("#system_information_systime_ntp_status");
                    if (!i.server_time.timedate.NTP) return t.hide(), void t.popover("hide");
                    t.show();
                    var e = {
                        Synched: i.server_time.timedate.NTPSynchronized,
                        service: null
                    }, n = /.*time server (.*)\./i, s = "running" == i.server_time.timesyncd_service.state && i.server_time.timesyncd_service.service && i.server_time.timesyncd_service.service.StatusText;
                    if ("running" == i.server_time.timesyncd_service.state && (e.service = "systemd-timesyncd.service"), 
                    s) {
                        var o = s.match(n);
                        o ? e.Server = o[1] : "Idle." != s && "" !== s && (e.SubStatus = s);
                    }
                    var a = y.render(i.ntp_status_tmpl, e);
                    a != t.attr("data-content") && (t.attr("data-content", a), t.data("bs.popover").tip().hasClass("in") && t.popover("show"));
                    var r = y.render(i.ntp_status_icon_tmpl, e);
                    t.html(r);
                }
                function e() {
                    r.exists ? s || (g("#server-pmlogger-switch").onoff("value", r.enabled), g("#server-pmlogger-onoff-row").show()) : g("#server-pmlogger-onoff-row").hide();
                }
                var i = this;
                n(), g("#shutdown-group [data-action]").on("click", function() {
                    i.shutdown(g(this).attr("data-action"));
                }), g("#system-ostree-version-link").on("click", function() {
                    v.jump("/updates", v.transport.host);
                }), g("#system_information_hostname_button").on("click", function() {
                    l.client = i.client, g("#system_information_change_hostname").modal("show");
                }), g("#system_information_systime_button").on("click", function() {
                    T.display(i.server_time);
                }), i.server_time = new a(), g(i.server_time).on("changed", function() {
                    g("#system_information_systime_button").text(i.server_time.format(!0));
                }), i.ntp_status_tmpl = g("#ntp-status-tmpl").html(), y.parse(this.ntp_status_tmpl), 
                i.ntp_status_icon_tmpl = g("#ntp-status-icon-tmpl").html(), y.parse(this.ntp_status_icon_tmpl), 
                i.ssh_host_keys_tmpl = g("#ssh-host-keys-tmpl").html(), y.parse(this.ssh_host_keys_tmpl), 
                g("#system_information_ssh_keys").on("show.bs.modal", function() {
                    i.host_keys_show();
                }), g("#system_information_systime_ntp_status").popover(), g(i.server_time.timesyncd_service).on("changed", t), 
                g(i.server_time.timedate).on("changed", t), t(), window.setInterval(function() {
                    i.server_time.poll_ntp_synchronized();
                }, 5e3), g("#server").on("click", "[data-goto-service]", function() {
                    var t = g(this).attr("data-goto-service");
                    v.jump("/system/services/#/" + window.encodeURIComponent(t));
                }), i.plot_controls = _.setup_plot_controls(g("#server"), g("#server-graph-toolbar"));
                var s, o = b.proxy("pmcd"), r = b.proxy("pmlogger");
                g("#server-pmlogger-switch").on("change", function(t) {
                    var i = g(this).onoff("value");
                    r.exists && (s = i ? v.all(o.enable(), o.start(), r.enable(), r.start()).fail(function(t) {
                        console.warn("Enabling pmlogger failed", t);
                    }) : v.all(r.disable(), r.stop()).fail(function(t) {
                        console.warn("Disabling pmlogger failed", t);
                    }), s.always(function() {
                        s = null, e();
                    }));
                }), g(r).on("changed", e), e();
            },
            enter: function() {
                function t(t) {
                    var e = {};
                    return g.each(t.split("\n"), function(t, i) {
                        var n = i.indexOf(":");
                        n !== -1 && (e[i.substring(0, n)] = i.substring(n + 1));
                    }), e;
                }
                function e() {
                    if (i.hostname_proxy) {
                        var t = i.hostname_proxy.PrettyHostname, e = i.hostname_proxy.StaticHostname, n = i.kernel_hostname;
                        t && e && e != t ? n = t + " (" + e + ")" : e && (n = e), n || (n = k("Set Host name")), 
                        g("#system_information_hostname_button").text(n), g("#system_information_os_text").text(i.hostname_proxy.OperatingSystemPrettyName || "");
                    }
                }
                var i = this, n = v.file("/etc/machine-id");
                n.read().done(function(t) {
                    g("#system_machine_id").text(t), g("#system_machine_id").attr("title", t);
                }).fail(function(t) {
                    console.error("Error reading machine id", t);
                }).always(function() {
                    n.close();
                }), i.ostree_client = v.dbus("org.projectatomic.rpmostree1", {
                    superuser: !0
                }), g(i.ostree_client).on("close", function() {
                    i.ostree_client = null;
                }), i.sysroot = i.ostree_client.proxy("org.projectatomic.rpmostree1.Sysroot", "/org/projectatomic/rpmostree1/Sysroot"), 
                g(i.sysroot).on("changed", g.proxy(this, "sysroot_changed")), i.client = v.dbus("org.freedesktop.hostname1"), 
                i.hostname_proxy = i.client.proxy("org.freedesktop.hostname1", "/org/freedesktop/hostname1"), 
                i.kernel_hostname = null;
                var a, r = {
                    direct: [ "kernel.all.cpu.nice", "kernel.all.cpu.user", "kernel.all.cpu.sys" ],
                    internal: [ "cpu.basic.nice", "cpu.basic.user", "cpu.basic.system" ],
                    units: "millisec",
                    derive: "rate",
                    factor: .1
                }, l = _.plot_simple_template();
                g.extend(l.yaxis, {
                    tickFormatter: function(t) {
                        return t.toFixed(0);
                    },
                    max: 100
                }), i.cpu_plot = _.plot(g("#server_cpu_graph"), 300), i.cpu_plot.set_options(l), 
                a = i.cpu_plot.add_metrics_sum_series(r, {});
                var c = {
                    direct: [ "mem.util.used" ],
                    internal: [ "memory.used" ],
                    units: "bytes"
                }, h = _.plot_simple_template();
                g.extend(h.yaxis, {
                    ticks: _.memory_ticks,
                    tickFormatter: _.format_bytes_tick_no_unit
                }), h.setup_hook = function(t) {
                    var e = t.getAxes();
                    g("#server_memory_unit").text(_.bytes_tick_unit(e.yaxis));
                }, i.memory_plot = _.plot(g("#server_memory_graph"), 300), i.memory_plot.set_options(h), 
                a = i.memory_plot.add_metrics_sum_series(c, {});
                var u = {
                    direct: [ "network.interface.total.bytes" ],
                    internal: [ "network.all.tx", "network.all.rx" ],
                    units: "bytes",
                    derive: "rate"
                }, d = _.plot_simple_template();
                g.extend(d.yaxis, {
                    tickFormatter: _.format_bits_per_sec_tick_no_unit
                }), d.setup_hook = function(t) {
                    var e = t.getAxes();
                    e.yaxis.datamax < 1e5 ? e.yaxis.options.max = 1e5 : e.yaxis.options.max = null, 
                    e.yaxis.options.min = 0, g("#server_network_traffic_unit").text(_.bits_per_sec_tick_unit(e.yaxis));
                }, i.network_plot = _.plot(g("#server_network_traffic_graph"), 300), i.network_plot.set_options(d), 
                a = i.network_plot.add_metrics_sum_series(u, {});
                var f = {
                    direct: [ "disk.all.total_bytes" ],
                    internal: [ "disk.all.read", "disk.all.written" ],
                    units: "bytes",
                    derive: "rate"
                }, p = _.plot_simple_template();
                g.extend(p.yaxis, {
                    ticks: _.memory_ticks,
                    tickFormatter: _.format_bytes_per_sec_tick_no_unit
                }), p.setup_hook = function(t) {
                    var e = t.getAxes();
                    e.yaxis.datamax < 1e5 ? e.yaxis.options.max = 1e5 : e.yaxis.options.max = null, 
                    e.yaxis.options.min = 0, g("#server_disk_io_unit").text(_.bytes_per_sec_tick_unit(e.yaxis));
                }, i.disk_plot = _.plot(g("#server_disk_io_graph"), 300), i.disk_plot.set_options(p), 
                a = i.disk_plot.add_metrics_sum_series(f, {}), o().done(function(t) {
                    l.yaxis.max = 100 * t.cpus, i.cpu_plot.set_options(l), h.yaxis.max = t.memory, i.memory_plot.set_options(h);
                }), i.plot_controls.reset([ i.cpu_plot, i.memory_plot, i.network_plot, i.disk_plot ]), 
                g(window).on("resize.server", function() {
                    i.cpu_plot.resize(), i.memory_plot.resize(), i.network_plot.resize(), i.disk_plot.resize();
                }), v.spawn([ "grep", "\\w", "sys_vendor", "product_name" ], {
                    directory: "/sys/devices/virtual/dmi/id",
                    err: "ignore"
                }).done(function(e) {
                    var i = t(e);
                    g("#system_information_hardware_text").text(i.sys_vendor + " " + i.product_name);
                }).fail(function(t) {
                    s("couldn't read dmi info: " + t);
                }), v.spawn([ "grep", "\\w", "product_serial", "chassis_serial" ], {
                    directory: "/sys/devices/virtual/dmi/id",
                    superuser: "try",
                    err: "ignore"
                }).done(function(e) {
                    var i = t(e), n = !(!i.product_serial && !i.chassis_serial);
                    g("#system_information_asset_tag_text").text(i.product_serial || i.chassis_serial), 
                    g("#system-info-asset-row").toggle(n);
                }).fail(function(t) {
                    g("#system-info-asset-row").toggle(!1), s("couldn't read serial dmi info: " + t);
                }), v.spawn([ "hostname" ], {
                    err: "ignore"
                }).done(function(t) {
                    i.kernel_hostname = g.trim(t), e();
                }).fail(function(t) {
                    e(), s("couldn't read kernel hostname: " + t);
                }), g(i.hostname_proxy).on("changed", e);
            },
            show: function() {
                this.cpu_plot.start_walking(), this.memory_plot.start_walking(), this.disk_plot.start_walking(), 
                this.network_plot.start_walking();
            },
            leave: function() {
                var t = this;
                t.cpu_plot.destroy(), t.memory_plot.destroy(), t.disk_plot.destroy(), t.network_plot.destroy(), 
                g(t.hostname_proxy).off(), t.hostname_proxy = null, t.client.close(), t.client = null, 
                g(v).off(".server"), g(t.sysroot).off(), t.sysroot = null, t.ostree_client && (t.ostree_client.close(), 
                t.ostree_client = null);
            },
            host_keys_show: function() {
                var t = this, e = /^\((.*)\)$/, i = g("#system_information_ssh_keys .spinner"), n = g("#system_information_ssh_keys .content"), s = g("#system_information_ssh_keys .alert");
                n.toggle(!1), s.toggle(!1), i.toggle(!0), v.script(w, [], {
                    superuser: "try",
                    err: "message"
                }).done(function(o) {
                    var a, r, l, c = {}, h = [], u = {}, d = o.trim().split("\n");
                    for (a = 0; a < d.length; a++) {
                        var f = d[a];
                        if (f) {
                            var p, m = f.trim().split(" "), g = m[1];
                            c[g] || (c[g] = g, p = m[m.length - 1], p && (l = p.match(e), l && l[1] && (p = l[1])), 
                            u[p] || (u[p] = []), u[p].push(g));
                        }
                    }
                    h = Object.keys(u), h.sort(), h = h.map(function(t) {
                        return {
                            title: t,
                            fps: u[t]
                        };
                    }), r = y.render(t.ssh_host_keys_tmpl, {
                        keys: h
                    }), n.html(r), i.toggle(!1), s.toggle(!1), n.toggle(!0);
                }).fail(function(t) {
                    var e = v.format(k("failed to list ssh host keys: $0"), t.message);
                    n.toggle(!1), i.toggle(!1), g("#system_information_ssh_keys .alert strong").text(e), 
                    s.toggle(!0);
                });
            },
            sysroot_changed: function() {
                var t = this;
                if (t.sysroot.Booted && t.ostree_client) {
                    var e = "";
                    t.ostree_client.call(t.sysroot.Booted, "org.freedesktop.DBus.Properties", "Get", [ "org.projectatomic.rpmostree1.OS", "BootedDeployment" ]).done(function(t) {
                        if (t && t[0]) {
                            var i = t[0].v;
                            i && i.version && (e = i.version.v);
                        }
                    }).fail(function(t) {
                        console.log(t);
                    }).always(function() {
                        g("#system-ostree-version").toggleClass("hidden", !e), g("#system-ostree-version-link").text(e);
                    });
                } else g("#system-ostree-version").toggleClass("hidden", !0), g("#system-ostree-version-link").text("");
            },
            shutdown: function(t) {
                x(t, this.server_time);
            }
        }, l.prototype = {
            _init: function() {
                this.id = "system_information_change_hostname";
            },
            setup: function() {
                g("#sich-pretty-hostname").on("input change", g.proxy(this._on_full_name_changed, this)), 
                g("#sich-hostname").on("input change", g.proxy(this._on_name_changed, this)), g("#sich-apply-button").on("click", g.proxy(this._on_apply_button, this));
            },
            enter: function() {
                var t = this;
                t.hostname_proxy = l.client.proxy(), t._initial_hostname = t.hostname_proxy.StaticHostname || "", 
                t._initial_pretty_hostname = t.hostname_proxy.PrettyHostname || "", g("#sich-pretty-hostname").val(t._initial_pretty_hostname), 
                g("#sich-hostname").val(t._initial_hostname), this._always_update_from_pretty = !1, 
                this._update();
            },
            show: function() {
                g("#sich-pretty-hostname").focus();
            },
            leave: function() {
                this.hostname_proxy = null;
            },
            _on_apply_button: function(t) {
                var e = this, i = g("#sich-pretty-hostname").val(), n = g("#sich-hostname").val(), s = e.hostname_proxy.call("SetStaticHostname", [ n, !0 ]), o = e.hostname_proxy.call("SetPrettyHostname", [ i, !0 ]);
                g("#system_information_change_hostname").dialog("promise", v.all(s, o));
            },
            _on_full_name_changed: function(t) {
                var e = g("#sich-pretty-hostname").val();
                if (this._always_update_from_pretty || this._initial_pretty_hostname != e) {
                    var i = g("#sich-hostname").val(), n = i.indexOf("."), s = e.toLowerCase().replace(/['".]+/g, "").replace(/[^a-zA-Z0-9]+/g, "-");
                    s = s.substr(0, 64), n >= 0 && (s += i.substr(n)), g("#sich-hostname").val(s), this._always_update_from_pretty = !0;
                }
                this._update();
            },
            _on_name_changed: function(t) {
                this._update();
            },
            _update: function() {
                for (var t = g("#sich-apply-button"), e = g("#sich-note-1"), i = g("#sich-note-2"), n = !1, s = !1, o = !1, a = k("Real host name can only contain lower-case characters, digits, dashes, and periods (with populated subdomains)"), r = k("Real host name must be 64 characters or less"), l = g("#sich-hostname").val().length <= 64, c = g("#sich-hostname").val(), h = g("#sich-pretty-hostname").val(), u = !0, d = 0, f = 0; f < g("#sich-hostname").val().length; f++) if ("." == g("#sich-hostname").val()[f] ? d++ : d = 0, 
                d > 1) {
                    u = !1;
                    break;
                }
                var p = c.match(/[.a-z0-9-]*/) == c && u;
                c == this._initial_hostname && h == this._initial_pretty_hostname || "" === c && "" === h || (n = !0), 
                l && p && (s = !0), n && s && (o = !0), s ? (g(e).css("visibility", "hidden"), g(i).css("visibility", "hidden"), 
                g("#sich-hostname-error").removeClass("has-error")) : !l && p ? (g("#sich-hostname-error").addClass("has-error"), 
                g(e).text(r), g(e).css("visibility", "visible"), g(i).css("visibility", "hidden")) : l && !p ? (g("#sich-hostname-error").addClass("has-error"), 
                g(e).text(a), g(e).css("visibility", "visible"), g(i).css("visibility", "hidden")) : (g("#sich-hostname-error").addClass("has-error"), 
                g(e).text() === r ? g(i).text(a) : g(e).text() === a ? g(i).text(r) : (g(e).text(r), 
                g(i).text(a)), g(e).css("visibility", "visible"), g(i).css("visibility", "visible")), 
                t.prop("disabled", !o);
            }
        }, c.prototype = {
            _init: function() {
                this.id = "system_information_change_systime", this.date = "", this.ntp_type = null;
            },
            setup: function() {
                function t() {
                    g("#systime-apply-button").prop("disabled", !1);
                }
                var e = this;
                g("#systime-apply-button").on("click", g.proxy(this._on_apply_button, this)), e.ntp_type = "manual_time", 
                g("#change_systime li").on("click", function() {
                    e.ntp_type = g(this).attr("value"), e.update();
                }), g("#systime-time-minutes").on("focusout", g.proxy(this, "update_minutes")), 
                g("#systime-date-input").datepicker({
                    autoclose: !0,
                    todayHighlight: !0,
                    format: "yyyy-mm-dd"
                }), g("#systime-timezones").css("max-height", "10em"), g("#systime-timezones").combobox(), 
                g("#systime-time-minutes").on("input", t), g("#systime-time-hours").on("input", t), 
                g("#systime-date-input").on("input", t), g("#systime-timezones").on("change", t), 
                g("#change_systime").on("click", t), g("#systime-date-input").on("focusin", g.proxy(this, "store_date")), 
                g("#systime-date-input").on("focusout", g.proxy(this, "restore_date")), e.ntp_servers_tmpl = g("#ntp-servers-tmpl").html(), 
                y.parse(this.ntp_servers_tmpl), g("#systime-ntp-servers").on("click", '[data-action="add"]', function() {
                    var t = g(this).attr("data-index");
                    return e.sync_ntp_servers(), e.custom_ntp_servers.splice(t + 1, 0, ""), e.update_ntp_servers(), 
                    !1;
                }), g("#systime-ntp-servers").on("click", '[data-action="del"]', function() {
                    var t = g(this).attr("data-index");
                    return e.sync_ntp_servers(), e.custom_ntp_servers.splice(t, 1), e.update_ntp_servers(), 
                    !1;
                });
            },
            enter: function() {
                var t = this;
                g("#systime-date-input").val(t.server_time.format()), g("#systime-time-minutes").val(t.server_time.utc_fake_now.getUTCMinutes()), 
                g("#systime-time-hours").val(t.server_time.utc_fake_now.getUTCHours()), t.ntp_type = t.server_time.timedate.NTP ? t.custom_ntp_enabled ? "ntp_time_custom" : "ntp_time" : "manual_time", 
                g('#change_systime [value="ntp_time"]').toggleClass("disabled", !t.server_time.timedate.CanNTP), 
                g('#change_systime [value="ntp_time_custom"]').toggleClass("disabled", !(t.server_time.timedate.CanNTP && t.custom_ntp_supported)), 
                g("#systime-parse-error").parents("tr").hide(), g("#systime-timezone-error").parents("tr").hide(), 
                g("#systime-apply-button").prop("disabled", !1), g("#systime-timezones").prop("disabled", "disabled"), 
                t.update(), t.update_minutes(), t.update_ntp_servers(), t.get_timezones();
            },
            display: function(t) {
                var e = this;
                return e.server_time ? void console.warn("change-systime dialog reentered") : (e.server_time = t, 
                void e.get_ntp_servers(function() {
                    g("#system_information_change_systime").modal("show");
                }));
            },
            get_timezones: function() {
                function t(t) {
                    var i = t.split("\n"), n = e.server_time.timedate.Timezone;
                    g("#systime-timezones").empty();
                    for (var s = 0; s < i.length; s++) g("#systime-timezones").append(g("<option>", {
                        value: i[s],
                        text: i[s].replace(/_/g, " "),
                        selected: i[s] == n
                    }));
                    g("#systime-timezones").prop("disabled", !1), g("#systime-timezones").combobox("refresh");
                }
                var e = this;
                v.spawn([ "/usr/bin/timedatectl", "list-timezones" ]).done(t);
            },
            get_ntp_servers: function(t) {
                function e() {
                    if ((n.exists === !1 || n.unit) && null !== s.exists) {
                        if (g([ n, s ]).off(".get_ntp_servers"), !n.exists || "systemd-timedated.service" !== n.unit.Id) return console.log("systemd-timedated not in use, ntp server configuration not supported"), 
                        void t();
                        if (!s.exists) return console.log("systemd-timesyncd not available, ntp server configuration not supported"), 
                        void t();
                        i.custom_ntp_supported = !0, i.ntp_config_file || (i.ntp_config_file = v.file("/etc/systemd/timesyncd.conf.d/50-cockpit.conf", {
                            superuser: "try"
                        })), i.ntp_config_file.read().done(function(e) {
                            var n = "";
                            i.ntp_servers = null, e && (i.custom_ntp_enabled = !0, e.split("\n").forEach(function(t) {
                                0 === t.indexOf("NTP=") ? (n = t.slice(4), i.custom_ntp_enabled = !0) : 0 === t.indexOf("#NTP=") && (n = t.slice(5), 
                                i.custom_ntp_enabled = !1);
                            }), i.custom_ntp_servers = n.split(" ").filter(function(t) {
                                return "" !== t;
                            }), 0 === i.custom_ntp_servers.length && (i.custom_ntp_enabled = !1)), t();
                        }).fail(function(e) {
                            console.warn("failed to load time servers", e), t();
                        });
                    }
                }
                var i = this, n = i.server_time.timedate1_service, s = i.server_time.timesyncd_service;
                i.custom_ntp_supported = !1, i.custom_ntp_enabled = !1, i.custom_ntp_servers = [], 
                g([ n, s ]).on("changed.get_ntp_servers", e), e();
            },
            set_ntp_servers: function(t, e) {
                var i = this, n = v.format("# This file is automatically generated by Cockpit\n\n[Time]\n${0}NTP=${1}\n", e ? "" : "#", t.join(" "));
                return v.spawn([ "mkdir", "-p", "/etc/systemd/timesyncd.conf.d" ], {
                    superuser: "try"
                }).then(function() {
                    return i.ntp_config_file.replace(n);
                });
            },
            show: function() {},
            leave: function() {
                var t = this;
                g(t.server_time.timedate1_service).off(".change_systime"), g(t.server_time.timesyncd_service).off(".change_systime"), 
                t.server_time = null;
            },
            _on_apply_button: function(t) {
                function e(t, e) {
                    var i = new Error(t);
                    return i.target = e, i;
                }
                function i(t) {
                    return n.server_time.timedate.call("SetNTP", [ t, !0 ]);
                }
                var n = this;
                if (n.check_input()) {
                    var s = "manual_time" == n.ntp_type, o = "ntp_time_custom" == n.ntp_type;
                    n.sync_ntp_servers();
                    var a = n.custom_ntp_servers.filter(function(t) {
                        return "" !== t;
                    });
                    if (o && 0 === a.length) {
                        var r = e(k("Need at least one NTP server"), "#systime-ntp-servers .systime-inline");
                        return void g("#system_information_change_systime").dialog("failure", r);
                    }
                    var l = [];
                    g("#systime-timezones").prop("disabled") || l.push(n.server_time.timedate.call("SetTimezone", [ g("#systime-timezones").val(), !0 ])), 
                    s ? l.push(i(!1).then(function() {
                        return n.server_time.change_time(g("#systime-date-input").val(), g("#systime-time-hours").val(), g("#systime-time-minutes").val());
                    })) : n.custom_ntp_supported ? l.push(i(!1).then(function() {
                        return n.server_time.timedate.call("SetTime", [ 1, !0, !0 ]);
                    }).then(function() {
                        return n.set_ntp_servers(a, o);
                    }).then(function() {
                        return n.server_time.poll_ntp_synchronized(), i(!0);
                    })) : l.push(i(!0)), g("#system_information_change_systime").dialog("promise", v.all(l));
                }
            },
            check_input: function() {
                var t, e = !1, i = !1, n = g("#systime-time-hours").val(), s = g("#systime-time-minutes").val(), o = !/^[0-9]+$/.test(n.trim()) || !/^[0-9]+$/.test(s.trim());
                return o || (n = Number(n), s = Number(s), o = n < 0 || n > 23 || s < 0 || s > 59), 
                t = new Date(g("#systime-date-input").val()), (isNaN(t.getTime()) || t.getTime() < 0) && (e = !0), 
                o && e ? g("#systime-parse-error").text(k("Invalid date format and invalid time format")) : o ? g("#systime-parse-error").text(k("Invalid time format")) : e && g("#systime-parse-error").text(k("Invalid date format")), 
                "" === g("#systime-timezones").val() ? (i = !0, g("#systime-timezone-error").css("visibility", "visible")) : g("#systime-timezone-error").css("visibility", "hidden"), 
                g("#systime-timezones").toggleClass("has-error", !i), g("#systime-time-hours").toggleClass("has-error", !o), 
                g("#systime-time-minutes").toggleClass("has-error", !o), g("#systime-date-input").toggleClass("has-error", !e), 
                g("#systime-parse-error").parents("tr").toggleClass("has-error", o || e), g("#systime-parse-error").toggle(o || e), 
                g("#systime-timezone-error").parents("tr").toggle(i), o || e || i ? (g("#systime-apply-button").prop("disabled", !0), 
                !1) : (g("#systime-apply-button").prop("disabled", !1), !0);
            },
            update: function() {
                var t = this, e = "manual_time" === t.ntp_type, i = "ntp_time_custom" === t.ntp_type, n = g("#change_systime li[value=" + t.ntp_type + "]").text();
                g("#change_systime button span").text(n), g("#systime-manual-row, #systime-manual-error-row").toggle(e), 
                g("#systime-ntp-servers-row").toggle(i), g("#systime-parse-error").hide();
            },
            sync_ntp_servers: function() {
                var t = this;
                t.custom_ntp_servers = g("#systime-ntp-servers input").map(function(t, e) {
                    return g(e).val();
                }).get();
            },
            update_ntp_servers: function() {
                var t = this;
                null !== t.custom_ntp_servers && 0 !== t.custom_ntp_servers.length || (t.custom_ntp_servers = [ "" ]);
                var e = {
                    NTPServers: t.custom_ntp_servers.map(function(t, e) {
                        return {
                            index: e,
                            Value: t,
                            Placeholder: k("NTP Server")
                        };
                    })
                };
                g("#systime-ntp-servers").html(y.render(t.ntp_servers_tmpl, e));
            },
            update_minutes: function() {
                var t = parseInt(g("#systime-time-minutes").val(), 10);
                t < 10 && g("#systime-time-minutes").val("0" + t);
            },
            store_date: function() {
                this.date = g("#systime-date-input").val();
            },
            restore_date: function() {
                0 === g("#systime-date-input").val().length && g("#systime-date-input").val(this.date);
            }
        }, h.prototype = {
            _init: function() {
                this.id = "cpu_status";
            },
            getTitle: function() {
                return D("page-title", "CPU Status");
            },
            enter: function() {
                var t = this, e = {
                    series: {
                        shadowSize: 0,
                        lines: {
                            lineWidth: 0,
                            fill: !0
                        }
                    },
                    yaxis: {
                        min: 0,
                        max: 100,
                        show: !0,
                        ticks: 5,
                        tickFormatter: function(t) {
                            return t / 10 + "%";
                        }
                    },
                    xaxis: {
                        show: !0,
                        ticks: [ [ 0, "5 min" ], [ 60, "4 min" ], [ 120, "3 min" ], [ 180, "2 min" ], [ 240, "1 min" ] ]
                    },
                    x_rh_stack_graphs: !0
                }, i = [ {
                    name: "cpu.basic.iowait",
                    derive: "rate"
                }, {
                    name: "cpu.basic.system",
                    derive: "rate"
                }, {
                    name: "cpu.basic.user",
                    derive: "rate"
                }, {
                    name: "cpu.basic.nice",
                    derive: "rate"
                } ], n = [ {
                    color: "#e41a1c",
                    label: k("I/O Wait")
                }, {
                    color: "#ff7f00",
                    label: k("Kernel")
                }, {
                    color: "#377eb8",
                    label: k("User")
                }, {
                    color: "#4daf4a",
                    label: k("Nice")
                } ];
                t.channel = v.metrics(1e3, {
                    source: "internal",
                    metrics: i,
                    cache: "cpu-status-rate"
                }), t.grid = v.grid(1e3, -300, -0);
                var s;
                for (s = 0; s < n.length; s++) n[s].row = t.grid.add(t.channel, [ i[s].name ]);
                t.channel.follow(), t.grid.walk(), this.plot = _.setup_complicated_plot("#cpu_status_graph", t.grid, n, e), 
                o().done(function(e) {
                    t.plot.set_yaxis_max(1e3 * e.cpus);
                });
            },
            show: function() {
                this.plot.start();
            },
            leave: function() {
                this.plot.destroy(), this.channel.close(), this.channel = null;
            }
        }, u.prototype = {
            _init: function() {
                this.id = "memory_status";
            },
            getTitle: function() {
                return D("page-title", "Memory");
            },
            enter: function() {
                var t = this, e = {
                    series: {
                        shadowSize: 0,
                        lines: {
                            lineWidth: 0,
                            fill: !0
                        }
                    },
                    yaxis: {
                        min: 0,
                        ticks: 5,
                        tickFormatter: function(t) {
                            return v.format_bytes(t);
                        }
                    },
                    xaxis: {
                        show: !0,
                        ticks: [ [ 0, k("5 min") ], [ 60, k("4 min") ], [ 120, k("3 min") ], [ 180, k("2 min") ], [ 240, k("1 min") ] ]
                    },
                    x_rh_stack_graphs: !0
                }, i = [ {
                    name: "memory.swap-used"
                }, {
                    name: "memory.cached"
                }, {
                    name: "memory.used"
                }, {
                    name: "memory.free"
                } ], n = [ {
                    color: "#e41a1c",
                    label: k("Swap Used")
                }, {
                    color: "#ff7f00",
                    label: k("Cached")
                }, {
                    color: "#377eb8",
                    label: k("Used")
                }, {
                    color: "#4daf4a",
                    label: k("Free")
                } ];
                t.channel = v.metrics(1e3, {
                    source: "internal",
                    metrics: i,
                    cache: "memory-status"
                }), t.grid = v.grid(1e3, -300, -0);
                var s;
                for (s = 0; s < n.length; s++) n[s].row = t.grid.add(t.channel, [ i[s].name ]);
                t.channel.follow(), t.grid.walk(), this.plot = _.setup_complicated_plot("#memory_status_graph", t.grid, n, e);
            },
            show: function() {
                this.plot.start();
            },
            leave: function() {
                this.plot.destroy(), this.channel.close(), this.channel = null;
            }
        }, g("#link-cpu").on("click", function() {
            return v.location.go([ "cpu" ]), !1;
        }), g("#link-memory").on("click", function() {
            return v.location.go([ "memory" ]), !1;
        }), g("#link-network").on("click", function() {
            return v.jump("/network"), !1;
        }), g("#link-disk").on("click", function() {
            return v.jump("/storage"), !1;
        }), g(m);
    },
    102: function(t, e, i) {
        "use strict";
        function n(t, e, i, n) {
            function o() {
                y.width(v.width()), y.height(v.height());
            }
            function a(t) {
                f ? (f.getAxes().yaxis.options.max = t, h()) : m.yaxis.max = t;
            }
            function r() {
                g = !0, l();
            }
            function l() {
                g && 0 !== v.width() && 0 !== v.height() && (f ? u() : (o(), f = s.plot(y, i, m)));
            }
            function c() {
                g = !1;
            }
            function h() {
                f && g && (f.setData(i), n.setup_hook && n.setup_hook(f), f.setupGrid(), f.draw());
            }
            function u() {
                f && g && (o(), y.width() > 0 && y.height() > 0 && f.resize(), h());
            }
            function d() {
                s(p).trigger("destroyed"), s(window).off("resize", u), s(v).empty(), f = null;
            }
            var f, p, m = {
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
                    borderColor: s.color.parse("black").scale("a", .22).toString(),
                    labelMargin: 0
                }
            }, g = !1;
            s.extend(!0, m, n);
            var v = s(t), y = s("<div/>");
            return v.empty(), v.append(y), s(e).on("notify", h), s(window).on("resize", u), 
            l(), p = {
                start: r,
                stop: c,
                resize: u,
                element: y[0],
                set_yaxis_max: a,
                destroy: d
            };
        }
        var s = i(2), o = i(3);
        i(103), i(104), i(105);
        var a = {}, r = o.gettext;
        a.plot = function(t, e, i) {
            function n() {
                if (0 !== t.height() && 0 !== t.width()) {
                    null === S && (S = s.plot(t, M, D)), S.setData(M);
                    var e = S.getAxes();
                    e.xaxis.options.min = k.beg * w, e.xaxis.options.max = (k.end - 2) * w, D.setup_hook && D.setup_hook(S), 
                    e.xaxis.show = !0, e.xaxis.used = !0, e.yaxis.show = !0, e.yaxis.used = !0, S.setupGrid(), 
                    S.draw();
                }
            }
            function a() {
                z || (z = !0, window.setTimeout(function() {
                    z = !1, n();
                }, 0));
            }
            function r() {
                k.walk();
            }
            function l() {
                k.move(k.beg, k.end);
            }
            function c(t, e) {
                S && S.clearSelection(!0), w = 1e3 * Math.ceil(t / 1e3);
                var i;
                i = void 0 !== e ? new Date().getTime() - 1e3 * e : 0;
                var n = -Math.ceil((1e3 * t + i) / w), r = -Math.floor(i / w);
                if (k && k.interval == w) k.move(n, r); else {
                    k && k.close(), k = o.grid(w, n, r), U++;
                    for (var l = 0; l < T.length; l++) T[l].reset();
                    U--, h(), s(k).on("notify", function(t, e, i) {
                        a();
                    });
                }
            }
            function h() {
                0 === U && k.sync();
            }
            function u() {
                k.close();
                for (var e = 0; e < T.length; e++) T[e].stop();
                D = {}, T = [], M = [], S = null, s(t).empty(), s(t).data("flot_data", null);
            }
            function d() {
                0 !== t.height() && 0 !== t.width() && (S && S.resize(), a());
            }
            function f(t) {
                D = t, S = null;
            }
            function p() {
                return D;
            }
            function m(t, e) {
                function i() {
                    g && g.close();
                }
                function n() {
                    M.push(e);
                }
                function r() {
                    var t = M.indexOf(e);
                    t >= 0 && M.splice(t, 1);
                }
                function l() {
                    var t = M.indexOf(e);
                    t >= 0 && (M.splice(t, 1), M.push(e));
                }
                function c() {
                    i(), r(), a();
                }
                function u(e) {
                    return {
                        name: e,
                        units: t.units,
                        derive: t.derive
                    };
                }
                function d(t) {
                    var e, i;
                    if (!t) return 0;
                    if (void 0 !== t.length) {
                        for (i = 0, e = 0; e < t.length; e++) i += d(t[e]);
                        return i;
                    }
                    return t;
                }
                function f() {
                    function i() {
                        g.archives && !C.archives && (C.archives = !0, s(C).triggerHandler("changed"));
                    }
                    g && g.close(), g = o.metrics(w, y);
                    var n = k.add(g, []), a = t.factor || 1;
                    e.data = k.add(function(t, e, i) {
                        for (var s = 0; s < i; s++) t[e + s] = [ (k.beg + e + s) * w, d(n[e + s]) * a ];
                    }), s(g).on("changed", i), i(), h();
                }
                function p(t, i) {
                    return !(!i || i.series.data != e.data);
                }
                function m(t) {
                    s(v).triggerHandler("hover", [ t ]);
                }
                var g = null, v = {
                    options: e,
                    move_to_front: l,
                    remove: c
                };
                T.push({
                    stop: i,
                    reset: f,
                    hover_hit: p,
                    hover: m
                });
                var y = [];
                return t.direct && y.push({
                    source: "direct",
                    archive_source: "pcp-archive",
                    metrics: t.direct.map(u),
                    instances: t.instances,
                    "omit-instances": t["omit-instances"],
                    host: t.host
                }), t.internal && y.push({
                    source: "internal",
                    metrics: t.internal.map(u),
                    instances: t.instances,
                    "omit-instances": t["omit-instances"],
                    host: t.host
                }), f(), n(), v;
            }
            function g(t, e) {
                function i() {
                    d && d.close();
                }
                function n(e) {
                    return {
                        name: e,
                        units: t.units,
                        derive: t.derive
                    };
                }
                function a() {
                    function t() {
                        d.archives && !C.archives && (C.archives = !0, s(C).triggerHandler("changed"));
                    }
                    d && d.close(), d = o.metrics(w, p), s(d).on("changed", t), t(), U++;
                    for (var e in m) m[e].reset();
                    U--, h();
                }
                function r(i, n) {
                    function o() {
                        r = k.add(d, [ "a", i ]), l.data = k.add(function(t, e, i) {
                            for (var n = 0; n < i; n++) {
                                var s = (r[e + n] || 0) * c, o = (k.beg + e + n) * w, a = 0;
                                f && (a = f.data[e + n][1] ? f.data[e + n][1] : f.data[e + n][2]), Math.abs(s) > u ? (t[e + n] = [ o, a + s, a ], 
                                t[e + n - 1] && null === t[e + n - 1][1] && (t[e + n - 1][1] = t[e + n - 1][2])) : (t[e + n] = [ o, null, a ], 
                                t[e + n - 1] && null !== t[e + n - 1][1] && (t[e + n - 1][1] = t[e + n - 1][2]));
                            }
                        }), h();
                    }
                    function a() {
                        k.remove(r), k.remove(l.data);
                        var t = M.indexOf(l);
                        t >= 0 && M.splice(t, 1);
                    }
                    if (!m[i]) {
                        var r, l = s.extend({
                            selector: n
                        }, e), c = t.factor || 1, u = t.threshold || 0, f = g;
                        g = l, m[i] = l, l.reset = o, l.remove = a, o(), M.push(l);
                    }
                }
                function l() {
                    for (var t in m) m[t].remove();
                    m = {}, g = null;
                }
                function c(t, e) {
                    var i, n;
                    if (!k) return !1;
                    n = Math.round(t.x / w) - k.beg, n < 0 && (n = 0);
                    for (i in m) {
                        var s = m[i].data;
                        if (s[n] && s[n][1] && s[n][2] <= t.y && t.y <= s[n][1]) return m[i].selector || i;
                    }
                    return !1;
                }
                function u(t) {
                    s(f).triggerHandler("hover", [ t ]);
                }
                var d = null, f = {
                    add_instance: r,
                    clear_instances: l
                };
                T.push({
                    stop: i,
                    reset: a,
                    hover_hit: c,
                    hover: u
                });
                var p = [];
                t.direct && p.push({
                    source: "direct",
                    archive_source: "pcp-archive",
                    metrics: [ n(t.direct) ],
                    metrics_path_names: [ "a" ],
                    instances: t.instances,
                    "omit-instances": t["omit-instances"],
                    host: t.host
                }), t.internal && p.push({
                    source: "internal",
                    metrics: [ n(t.internal) ],
                    metrics_path_names: [ "a" ],
                    instances: t.instances,
                    "omit-instances": t["omit-instances"],
                    host: t.host
                });
                var m = {}, g = null;
                return a(), f;
            }
            function v(t, e) {
                $ != t ? ($ && $.hover(!1), $ = t, F = e, $ && $.hover(F)) : F != e && (F = e, $ && $.hover(F));
            }
            function y(t, e, i) {
                for (var n = null, s = !1, o = 0; o < T.length; o++) if (s = T[o].hover_hit(e, i)) {
                    n = T[o];
                    break;
                }
                v(n, s);
            }
            function _(t) {
                v(null, !1);
            }
            function b(t, e) {
                e && s(C).triggerHandler("zoomstart", []);
            }
            function x(t, e) {
                S.clearSelection(!0), s(C).triggerHandler("zoom", [ (e.xaxis.to - e.xaxis.from) / 1e3, e.xaxis.to / 1e3 ]);
            }
            var w, k, D = {}, C = {}, T = [], M = [], S = null, z = !1, U = 0, $ = null, F = !1;
            return s(t).on("plothover", y), s(t).on("mouseleave", _), s(t).on("plotselecting", b), 
            s(t).on("plotselected", x), s(t).data("flot_data", M), c(e, i), s.extend(C, {
                archives: !1,
                start_walking: r,
                stop_walking: l,
                refresh: a,
                reset: c,
                destroy: u,
                resize: d,
                set_options: f,
                get_options: p,
                add_metrics_sum_series: m,
                add_metrics_stacked_instances_series: g
            }), C;
        };
        var l = [ "#006bb4", "#008ff0", "#2daaff", "#69c2ff", "#a5daff", "#e1f3ff", "#00243c", "#004778" ];
        a.plot_simple_template = function() {
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
                    tickFormatter: a.format_date_tick,
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
                    borderColor: s.color.parse("black").scale("a", .22).toString(),
                    labelMargin: 0
                }
            };
        }, a.memory_ticks = function(t) {
            for (var e = Math.pow(2, Math.ceil(Math.log(t.max / 5) / Math.LN2)), i = [], n = 0; n < t.max; n += e) i.push(n);
            return i;
        };
        var c = [ r("month-name", "Jan"), r("month-name", "Feb"), r("month-name", "Mar"), r("month-name", "Apr"), r("month-name", "May"), r("month-name", "Jun"), r("month-name", "Jul"), r("month-name", "Aug"), r("month-name", "Sep"), r("month-name", "Oct"), r("month-name", "Nov"), r("month-name", "Dec") ];
        a.format_date_tick = function(t, e) {
            function i(t) {
                var e = t.toFixed();
                return 1 == e.length && (e = "0" + e), e;
            }
            var n, s, o = 0, a = 1, r = 2, l = 3, h = e.tickSize[1];
            s = "minute" == h || "hour" == h ? l : "day" == h ? r : "month" == h ? a : o;
            var u = new Date(), d = new Date(e.min);
            n = o, d.getFullYear() == u.getFullYear() && (n = a, d.getMonth() == u.getMonth() && (n = r, 
            d.getDate() == u.getDate() && (n = l))), n > s && (n = s), n == r && (n = a);
            var f = new Date(t), p = " ";
            return o >= n && o <= s && (p += f.getFullYear().toFixed() + " "), a >= n && a <= s && (p += c[f.getMonth()] + " "), 
            r >= n && r <= s && (p += f.getDate().toFixed() + " "), l >= n && l <= s && (p += i(f.getHours()) + ":" + i(f.getMinutes()) + " "), 
            p.substr(0, p.length - 1);
        }, a.bytes_tick_unit = function(t) {
            return o.format_bytes(t.max, 1024, !0)[1];
        }, a.format_bytes_tick_no_unit = function(t, e) {
            return o.format_bytes(t, a.bytes_tick_unit(e), !0)[0];
        }, a.format_bytes_tick = function(t, e) {
            return o.format_bytes(t, 1024);
        }, a.bytes_per_sec_tick_unit = function(t) {
            return o.format_bytes_per_sec(t.max, 1024, !0)[1];
        }, a.format_bytes_per_sec_tick_no_unit = function(t, e) {
            return o.format_bytes_per_sec(t, a.bytes_per_sec_tick_unit(e), !0)[0];
        }, a.format_bytes_per_sec_tick = function(t, e) {
            return o.format_bytes_per_sec(t, 1024);
        }, a.bits_per_sec_tick_unit = function(t) {
            return o.format_bits_per_sec(8 * t.max, 1e3, !0)[1];
        }, a.format_bits_per_sec_tick_no_unit = function(t, e) {
            return o.format_bits_per_sec(8 * t, a.bits_per_sec_tick_unit(e), !0)[0];
        }, a.format_bits_per_sec_tick = function(t, e) {
            return o.format_bits_per_sec(8 * t, 1e3);
        }, a.setup_plot_controls = function(t, e, i) {
            function n() {
                void 0 === f && (i.forEach(function(t) {
                    t.stop_walking();
                }), f = new Date().getTime() / 1e3, c());
            }
            function a(t, e) {
                v.push(g), g = t, f = e, u();
            }
            function r() {
                var t = v.pop();
                if (void 0 === t) {
                    var e;
                    for (e = 0; e < m.length - 1 && !(m[e] > g); e++) ;
                    t = m[e];
                }
                void 0 !== f && (f += (t - g) / 2), g = t, u();
            }
            function l(t) {
                var e;
                return t >= 31536e3 ? (e = Math.ceil(t / 31536e3), o.format(o.ngettext("$0 year", "$0 years", e), e)) : t >= 2592e3 ? (e = Math.ceil(t / 2592e3), 
                o.format(o.ngettext("$0 month", "$0 months", e), e)) : t >= 604800 ? (e = Math.ceil(t / 604800), 
                o.format(o.ngettext("$0 week", "$0 weeks", e), e)) : t >= 86400 ? (e = Math.ceil(t / 86400), 
                o.format(o.ngettext("$0 day", "$0 days", e), e)) : t >= 3600 ? (e = Math.ceil(t / 3600), 
                o.format(o.ngettext("$0 hour", "$0 hours", e), e)) : (e = Math.ceil(t / 60), o.format(o.ngettext("$0 minute", "$0 minutes", e), e));
            }
            function c() {
                e.find('[data-action="scroll-right"]').attr("disabled", void 0 === f), e.find('[data-action="zoom-out"]').attr("disabled", g >= m[m.length - 1]);
            }
            function h() {
                var e;
                t.hasClass("show-zoom-controls") && g > p ? (t.addClass("show-zoom-cursor"), e = "x") : (t.removeClass("show-zoom-cursor"), 
                e = null), i.forEach(function(t) {
                    var i = t.get_options();
                    i.selection && i.selection.mode == e || (i.selection = {
                        mode: e,
                        color: "#d4edfa"
                    }, t.set_options(i), t.refresh());
                });
            }
            function u() {
                g < p && (f += (p - g) / 2, g = p), f >= new Date().getTime() / 1e3 - 10 && (f = void 0), 
                e.find(".dropdown-toggle span:first-child").text(l(g)), i.forEach(function(e) {
                    function i() {
                        e.archives && (t.addClass("show-zoom-controls"), h());
                    }
                    e.stop_walking(), e.reset(g, f), e.refresh(), void 0 === f && e.start_walking(), 
                    s(e).on("changed", i), i();
                }), c(), h();
            }
            function d(t) {
                void 0 === t && (t = []), i = t, i.forEach(function(t) {
                    s(t).on("zoomstart", function(t) {
                        n();
                    }), s(t).on("zoom", function(t, e, i) {
                        a(e, i);
                    });
                }), u();
            }
            var f, p = 300, m = [ 300, 3600, 21600, 86400, 604800, 2592e3, 31536e3 ], g = 300, v = [];
            return e.find("[data-range]").click(function() {
                v = [], g = parseInt(s(this).attr("data-range"), 10), u();
            }), e.find('[data-action="goto-now"]').click(function() {
                f = void 0, u();
            }), e.find('[data-action="scroll-left"]').click(function() {
                var t = g / 10;
                void 0 === f && (f = new Date().getTime() / 1e3), f -= t, u();
            }), e.find('[data-action="scroll-right"]').click(function() {
                var t = g / 10;
                void 0 !== f && (f += t, u());
            }), e.find('[data-action="zoom-out"]').click(function() {
                r();
            }), d(i), {
                reset: d
            };
        }, a.setup_complicated_plot = function(t, e, i, s) {
            function o(t, e) {
                return t.add(function(t, i, n) {
                    for (var s = 0; s < n; s++) t[i + s] = [ s, e[i + s] || 0 ];
                });
            }
            function a(t, e, i) {
                return t.add(function(t, n, s) {
                    var o, a, r, l;
                    for (o = 0; o < s; o++) r = 0, i && (a = i[n + o], r = a ? a[1] : 0), l = e[n + o] || 0, 
                    t[n + o] = [ o, l + r, r ];
                });
            }
            var r = null;
            return i.forEach(function(t, i) {
                s.x_rh_stack_graphs ? t.data = a(e, t.row, r) : t.data = o(e, t.row), r = t.data;
            }), n(t, e, i, s);
        }, t.exports = a;
    },
    103: function(t, e) {
        !function(t) {
            t.color = {}, t.color.make = function(e, i, n, s) {
                var o = {};
                return o.r = e || 0, o.g = i || 0, o.b = n || 0, o.a = null != s ? s : 1, o.add = function(t, e) {
                    for (var i = 0; i < t.length; ++i) o[t.charAt(i)] += e;
                    return o.normalize();
                }, o.scale = function(t, e) {
                    for (var i = 0; i < t.length; ++i) o[t.charAt(i)] *= e;
                    return o.normalize();
                }, o.toString = function() {
                    return o.a >= 1 ? "rgb(" + [ o.r, o.g, o.b ].join(",") + ")" : "rgba(" + [ o.r, o.g, o.b, o.a ].join(",") + ")";
                }, o.normalize = function() {
                    function t(t, e, i) {
                        return e < t ? t : e > i ? i : e;
                    }
                    return o.r = t(0, parseInt(o.r), 255), o.g = t(0, parseInt(o.g), 255), o.b = t(0, parseInt(o.b), 255), 
                    o.a = t(0, o.a, 1), o;
                }, o.clone = function() {
                    return t.color.make(o.r, o.b, o.g, o.a);
                }, o.normalize();
            }, t.color.extract = function(e, i) {
                var n;
                do {
                    if (n = e.css(i).toLowerCase(), "" != n && "transparent" != n) break;
                    e = e.parent();
                } while (e.length && !t.nodeName(e.get(0), "body"));
                return "rgba(0, 0, 0, 0)" == n && (n = "transparent"), t.color.parse(n);
            }, t.color.parse = function(i) {
                var n, s = t.color.make;
                if (n = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(i)) return s(parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10));
                if (n = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(i)) return s(parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10), parseFloat(n[4]));
                if (n = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(i)) return s(2.55 * parseFloat(n[1]), 2.55 * parseFloat(n[2]), 2.55 * parseFloat(n[3]));
                if (n = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(i)) return s(2.55 * parseFloat(n[1]), 2.55 * parseFloat(n[2]), 2.55 * parseFloat(n[3]), parseFloat(n[4]));
                if (n = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(i)) return s(parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16));
                if (n = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(i)) return s(parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16));
                var o = t.trim(i).toLowerCase();
                return "transparent" == o ? s(255, 255, 255, 0) : (n = e[o] || [ 0, 0, 0 ], s(n[0], n[1], n[2]));
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
            function e(e, i) {
                var n = i.children("." + e)[0];
                if (null == n && (n = document.createElement("canvas"), n.className = e, t(n).css({
                    direction: "ltr",
                    position: "absolute",
                    left: 0,
                    top: 0
                }).appendTo(i), !n.getContext)) {
                    if (!window.G_vmlCanvasManager) throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
                    n = window.G_vmlCanvasManager.initElement(n);
                }
                this.element = n;
                var s = this.context = n.getContext("2d"), o = window.devicePixelRatio || 1, a = s.webkitBackingStorePixelRatio || s.mozBackingStorePixelRatio || s.msBackingStorePixelRatio || s.oBackingStorePixelRatio || s.backingStorePixelRatio || 1;
                this.pixelRatio = o / a, this.resize(i.width(), i.height()), this.textContainer = null, 
                this.text = {}, this._textCache = {};
            }
            function i(i, s, o, a) {
                function r(t, e) {
                    e = [ gt ].concat(e);
                    for (var i = 0; i < t.length; ++i) t[i].apply(this, e);
                }
                function l() {
                    for (var i = {
                        Canvas: e
                    }, n = 0; n < a.length; ++n) {
                        var s = a[n];
                        s.init(gt, i), s.options && t.extend(!0, st, s.options);
                    }
                }
                function c(e) {
                    t.extend(!0, st, e), e && e.colors && (st.colors = e.colors), null == st.xaxis.color && (st.xaxis.color = t.color.parse(st.grid.color).scale("a", .22).toString()), 
                    null == st.yaxis.color && (st.yaxis.color = t.color.parse(st.grid.color).scale("a", .22).toString()), 
                    null == st.xaxis.tickColor && (st.xaxis.tickColor = st.grid.tickColor || st.xaxis.color), 
                    null == st.yaxis.tickColor && (st.yaxis.tickColor = st.grid.tickColor || st.yaxis.color), 
                    null == st.grid.borderColor && (st.grid.borderColor = st.grid.color), null == st.grid.tickColor && (st.grid.tickColor = t.color.parse(st.grid.color).scale("a", .22).toString());
                    var n, s, o, a = i.css("font-size"), l = a ? +a.replace("px", "") : 13, c = {
                        style: i.css("font-style"),
                        size: Math.round(.8 * l),
                        variant: i.css("font-variant"),
                        weight: i.css("font-weight"),
                        family: i.css("font-family")
                    };
                    for (o = st.xaxes.length || 1, n = 0; n < o; ++n) s = st.xaxes[n], s && !s.tickColor && (s.tickColor = s.color), 
                    s = t.extend(!0, {}, st.xaxis, s), st.xaxes[n] = s, s.font && (s.font = t.extend({}, c, s.font), 
                    s.font.color || (s.font.color = s.color), s.font.lineHeight || (s.font.lineHeight = Math.round(1.15 * s.font.size)));
                    for (o = st.yaxes.length || 1, n = 0; n < o; ++n) s = st.yaxes[n], s && !s.tickColor && (s.tickColor = s.color), 
                    s = t.extend(!0, {}, st.yaxis, s), st.yaxes[n] = s, s.font && (s.font = t.extend({}, c, s.font), 
                    s.font.color || (s.font.color = s.color), s.font.lineHeight || (s.font.lineHeight = Math.round(1.15 * s.font.size)));
                    for (st.xaxis.noTicks && null == st.xaxis.ticks && (st.xaxis.ticks = st.xaxis.noTicks), 
                    st.yaxis.noTicks && null == st.yaxis.ticks && (st.yaxis.ticks = st.yaxis.noTicks), 
                    st.x2axis && (st.xaxes[1] = t.extend(!0, {}, st.xaxis, st.x2axis), st.xaxes[1].position = "top", 
                    null == st.x2axis.min && (st.xaxes[1].min = null), null == st.x2axis.max && (st.xaxes[1].max = null)), 
                    st.y2axis && (st.yaxes[1] = t.extend(!0, {}, st.yaxis, st.y2axis), st.yaxes[1].position = "right", 
                    null == st.y2axis.min && (st.yaxes[1].min = null), null == st.y2axis.max && (st.yaxes[1].max = null)), 
                    st.grid.coloredAreas && (st.grid.markings = st.grid.coloredAreas), st.grid.coloredAreasColor && (st.grid.markingsColor = st.grid.coloredAreasColor), 
                    st.lines && t.extend(!0, st.series.lines, st.lines), st.points && t.extend(!0, st.series.points, st.points), 
                    st.bars && t.extend(!0, st.series.bars, st.bars), null != st.shadowSize && (st.series.shadowSize = st.shadowSize), 
                    null != st.highlightColor && (st.series.highlightColor = st.highlightColor), n = 0; n < st.xaxes.length; ++n) g(ht, n + 1).options = st.xaxes[n];
                    for (n = 0; n < st.yaxes.length; ++n) g(ut, n + 1).options = st.yaxes[n];
                    for (var h in mt) st.hooks[h] && st.hooks[h].length && (mt[h] = mt[h].concat(st.hooks[h]));
                    r(mt.processOptions, [ st ]);
                }
                function h(t) {
                    nt = u(t), v(), y();
                }
                function u(e) {
                    for (var i = [], n = 0; n < e.length; ++n) {
                        var s = t.extend(!0, {}, st.series);
                        null != e[n].data ? (s.data = e[n].data, delete e[n].data, t.extend(!0, s, e[n]), 
                        e[n].data = s.data) : s.data = e[n], i.push(s);
                    }
                    return i;
                }
                function d(t, e) {
                    var i = t[e + "axis"];
                    return "object" == typeof i && (i = i.n), "number" != typeof i && (i = 1), i;
                }
                function f() {
                    return t.grep(ht.concat(ut), function(t) {
                        return t;
                    });
                }
                function p(t) {
                    var e, i, n = {};
                    for (e = 0; e < ht.length; ++e) i = ht[e], i && i.used && (n["x" + i.n] = i.c2p(t.left));
                    for (e = 0; e < ut.length; ++e) i = ut[e], i && i.used && (n["y" + i.n] = i.c2p(t.top));
                    return void 0 !== n.x1 && (n.x = n.x1), void 0 !== n.y1 && (n.y = n.y1), n;
                }
                function m(t) {
                    var e, i, n, s = {};
                    for (e = 0; e < ht.length; ++e) if (i = ht[e], i && i.used && (n = "x" + i.n, null == t[n] && 1 == i.n && (n = "x"), 
                    null != t[n])) {
                        s.left = i.p2c(t[n]);
                        break;
                    }
                    for (e = 0; e < ut.length; ++e) if (i = ut[e], i && i.used && (n = "y" + i.n, null == t[n] && 1 == i.n && (n = "y"), 
                    null != t[n])) {
                        s.top = i.p2c(t[n]);
                        break;
                    }
                    return s;
                }
                function g(e, i) {
                    return e[i - 1] || (e[i - 1] = {
                        n: i,
                        direction: e == ht ? "x" : "y",
                        options: t.extend(!0, {}, e == ht ? st.xaxis : st.yaxis)
                    }), e[i - 1];
                }
                function v() {
                    var e, i = nt.length, n = -1;
                    for (e = 0; e < nt.length; ++e) {
                        var s = nt[e].color;
                        null != s && (i--, "number" == typeof s && s > n && (n = s));
                    }
                    i <= n && (i = n + 1);
                    var o, a = [], r = st.colors, l = r.length, c = 0;
                    for (e = 0; e < i; e++) o = t.color.parse(r[e % l] || "#666"), e % l == 0 && e && (c = c >= 0 ? c < .5 ? -c - .2 : 0 : -c), 
                    a[e] = o.scale("rgb", 1 + c);
                    var h, u = 0;
                    for (e = 0; e < nt.length; ++e) {
                        if (h = nt[e], null == h.color ? (h.color = a[u].toString(), ++u) : "number" == typeof h.color && (h.color = a[h.color].toString()), 
                        null == h.lines.show) {
                            var f, p = !0;
                            for (f in h) if (h[f] && h[f].show) {
                                p = !1;
                                break;
                            }
                            p && (h.lines.show = !0);
                        }
                        null == h.lines.zero && (h.lines.zero = !!h.lines.fill), h.xaxis = g(ht, d(h, "x")), 
                        h.yaxis = g(ut, d(h, "y"));
                    }
                }
                function y() {
                    function e(t, e, i) {
                        e < t.datamin && e != -y && (t.datamin = e), i > t.datamax && i != y && (t.datamax = i);
                    }
                    var i, n, s, o, a, l, c, h, u, d, p, m, g = Number.POSITIVE_INFINITY, v = Number.NEGATIVE_INFINITY, y = Number.MAX_VALUE;
                    for (t.each(f(), function(t, e) {
                        e.datamin = g, e.datamax = v, e.used = !1;
                    }), i = 0; i < nt.length; ++i) a = nt[i], a.datapoints = {
                        points: []
                    }, r(mt.processRawData, [ a, a.data, a.datapoints ]);
                    for (i = 0; i < nt.length; ++i) {
                        if (a = nt[i], p = a.data, m = a.datapoints.format, !m) {
                            if (m = [], m.push({
                                x: !0,
                                number: !0,
                                required: !0
                            }), m.push({
                                y: !0,
                                number: !0,
                                required: !0
                            }), a.bars.show || a.lines.show && a.lines.fill) {
                                var _ = !!(a.bars.show && a.bars.zero || a.lines.show && a.lines.zero);
                                m.push({
                                    y: !0,
                                    number: !0,
                                    required: !1,
                                    defaultValue: 0,
                                    autoscale: _
                                }), a.bars.horizontal && (delete m[m.length - 1].y, m[m.length - 1].x = !0);
                            }
                            a.datapoints.format = m;
                        }
                        if (null == a.datapoints.pointsize) {
                            a.datapoints.pointsize = m.length, c = a.datapoints.pointsize, l = a.datapoints.points;
                            var b = a.lines.show && a.lines.steps;
                            for (a.xaxis.used = a.yaxis.used = !0, n = s = 0; n < p.length; ++n, s += c) {
                                d = p[n];
                                var x = null == d;
                                if (!x) for (o = 0; o < c; ++o) h = d[o], u = m[o], u && (u.number && null != h && (h = +h, 
                                isNaN(h) ? h = null : h == 1 / 0 ? h = y : h == -(1 / 0) && (h = -y)), null == h && (u.required && (x = !0), 
                                null != u.defaultValue && (h = u.defaultValue))), l[s + o] = h;
                                if (x) for (o = 0; o < c; ++o) h = l[s + o], null != h && (u = m[o], u.autoscale !== !1 && (u.x && e(a.xaxis, h, h), 
                                u.y && e(a.yaxis, h, h))), l[s + o] = null; else if (b && s > 0 && null != l[s - c] && l[s - c] != l[s] && l[s - c + 1] != l[s + 1]) {
                                    for (o = 0; o < c; ++o) l[s + c + o] = l[s + o];
                                    l[s + 1] = l[s - c + 1], s += c;
                                }
                            }
                        }
                    }
                    for (i = 0; i < nt.length; ++i) a = nt[i], r(mt.processDatapoints, [ a, a.datapoints ]);
                    for (i = 0; i < nt.length; ++i) {
                        a = nt[i], l = a.datapoints.points, c = a.datapoints.pointsize, m = a.datapoints.format;
                        var w = g, k = g, D = v, C = v;
                        for (n = 0; n < l.length; n += c) if (null != l[n]) for (o = 0; o < c; ++o) h = l[n + o], 
                        u = m[o], u && u.autoscale !== !1 && h != y && h != -y && (u.x && (h < w && (w = h), 
                        h > D && (D = h)), u.y && (h < k && (k = h), h > C && (C = h)));
                        if (a.bars.show) {
                            var T;
                            switch (a.bars.align) {
                              case "left":
                                T = 0;
                                break;

                              case "right":
                                T = -a.bars.barWidth;
                                break;

                              default:
                                T = -a.bars.barWidth / 2;
                            }
                            a.bars.horizontal ? (k += T, C += T + a.bars.barWidth) : (w += T, D += T + a.bars.barWidth);
                        }
                        e(a.xaxis, w, D), e(a.yaxis, k, C);
                    }
                    t.each(f(), function(t, e) {
                        e.datamin == g && (e.datamin = null), e.datamax == v && (e.datamax = null);
                    });
                }
                function _() {
                    i.css("padding", 0).children().filter(function() {
                        return !t(this).hasClass("flot-overlay") && !t(this).hasClass("flot-base");
                    }).remove(), "static" == i.css("position") && i.css("position", "relative"), ot = new e("flot-base", i), 
                    at = new e("flot-overlay", i), lt = ot.context, ct = at.context, rt = t(at.element).unbind();
                    var n = i.data("plot");
                    n && (n.shutdown(), at.clear()), i.data("plot", gt);
                }
                function b() {
                    st.grid.hoverable && (rt.mousemove(V), rt.bind("mouseleave", q)), st.grid.clickable && rt.click(B), 
                    r(mt.bindEvents, [ rt ]);
                }
                function x() {
                    yt && clearTimeout(yt), rt.unbind("mousemove", V), rt.unbind("mouseleave", q), rt.unbind("click", B), 
                    r(mt.shutdown, [ rt ]);
                }
                function w(t) {
                    function e(t) {
                        return t;
                    }
                    var i, n, s = t.options.transform || e, o = t.options.inverseTransform;
                    "x" == t.direction ? (i = t.scale = ft / Math.abs(s(t.max) - s(t.min)), n = Math.min(s(t.max), s(t.min))) : (i = t.scale = pt / Math.abs(s(t.max) - s(t.min)), 
                    i = -i, n = Math.max(s(t.max), s(t.min))), s == e ? t.p2c = function(t) {
                        return (t - n) * i;
                    } : t.p2c = function(t) {
                        return (s(t) - n) * i;
                    }, o ? t.c2p = function(t) {
                        return o(n + t / i);
                    } : t.c2p = function(t) {
                        return n + t / i;
                    };
                }
                function k(t) {
                    for (var e = t.options, i = t.ticks || [], n = e.labelWidth || 0, s = e.labelHeight || 0, o = n || ("x" == t.direction ? Math.floor(ot.width / (i.length || 1)) : null), a = t.direction + "Axis " + t.direction + t.n + "Axis", r = "flot-" + t.direction + "-axis flot-" + t.direction + t.n + "-axis " + a, l = e.font || "flot-tick-label tickLabel", c = 0; c < i.length; ++c) {
                        var h = i[c];
                        if (h.label) {
                            var u = ot.getTextInfo(r, h.label, l, null, o);
                            n = Math.max(n, u.width), s = Math.max(s, u.height);
                        }
                    }
                    t.labelWidth = e.labelWidth || n, t.labelHeight = e.labelHeight || s;
                }
                function D(e) {
                    var i = e.labelWidth, n = e.labelHeight, s = e.options.position, o = "x" === e.direction, a = e.options.tickLength, r = st.grid.axisMargin, l = st.grid.labelMargin, c = !0, h = !0, u = !0, d = !1;
                    t.each(o ? ht : ut, function(t, i) {
                        i && (i.show || i.reserveSpace) && (i === e ? d = !0 : i.options.position === s && (d ? h = !1 : c = !1), 
                        d || (u = !1));
                    }), h && (r = 0), null == a && (a = u ? "full" : 5), isNaN(+a) || (l += +a), o ? (n += l, 
                    "bottom" == s ? (dt.bottom += n + r, e.box = {
                        top: ot.height - dt.bottom,
                        height: n
                    }) : (e.box = {
                        top: dt.top + r,
                        height: n
                    }, dt.top += n + r)) : (i += l, "left" == s ? (e.box = {
                        left: dt.left + r,
                        width: i
                    }, dt.left += i + r) : (dt.right += i + r, e.box = {
                        left: ot.width - dt.right,
                        width: i
                    })), e.position = s, e.tickLength = a, e.box.padding = l, e.innermost = c;
                }
                function C(t) {
                    "x" == t.direction ? (t.box.left = dt.left - t.labelWidth / 2, t.box.width = ot.width - dt.left - dt.right + t.labelWidth) : (t.box.top = dt.top - t.labelHeight / 2, 
                    t.box.height = ot.height - dt.bottom - dt.top + t.labelHeight);
                }
                function T() {
                    var e, i = st.grid.minBorderMargin;
                    if (null == i) for (i = 0, e = 0; e < nt.length; ++e) i = Math.max(i, 2 * (nt[e].points.radius + nt[e].points.lineWidth / 2));
                    var n = {
                        left: i,
                        right: i,
                        top: i,
                        bottom: i
                    };
                    t.each(f(), function(t, e) {
                        e.reserveSpace && e.ticks && e.ticks.length && ("x" === e.direction ? (n.left = Math.max(n.left, e.labelWidth / 2), 
                        n.right = Math.max(n.right, e.labelWidth / 2)) : (n.bottom = Math.max(n.bottom, e.labelHeight / 2), 
                        n.top = Math.max(n.top, e.labelHeight / 2)));
                    }), dt.left = Math.ceil(Math.max(n.left, dt.left)), dt.right = Math.ceil(Math.max(n.right, dt.right)), 
                    dt.top = Math.ceil(Math.max(n.top, dt.top)), dt.bottom = Math.ceil(Math.max(n.bottom, dt.bottom));
                }
                function M() {
                    var e, i = f(), n = st.grid.show;
                    for (var s in dt) {
                        var o = st.grid.margin || 0;
                        dt[s] = "number" == typeof o ? o : o[s] || 0;
                    }
                    r(mt.processOffset, [ dt ]);
                    for (var s in dt) "object" == typeof st.grid.borderWidth ? dt[s] += n ? st.grid.borderWidth[s] : 0 : dt[s] += n ? st.grid.borderWidth : 0;
                    if (t.each(i, function(t, e) {
                        var i = e.options;
                        e.show = null == i.show ? e.used : i.show, e.reserveSpace = null == i.reserveSpace ? e.show : i.reserveSpace, 
                        S(e);
                    }), n) {
                        var a = t.grep(i, function(t) {
                            return t.show || t.reserveSpace;
                        });
                        for (t.each(a, function(t, e) {
                            z(e), U(e), $(e, e.ticks), k(e);
                        }), e = a.length - 1; e >= 0; --e) D(a[e]);
                        T(), t.each(a, function(t, e) {
                            C(e);
                        });
                    }
                    ft = ot.width - dt.left - dt.right, pt = ot.height - dt.bottom - dt.top, t.each(i, function(t, e) {
                        w(e);
                    }), n && W(), L();
                }
                function S(t) {
                    var e = t.options, i = +(null != e.min ? e.min : t.datamin), n = +(null != e.max ? e.max : t.datamax), s = n - i;
                    if (0 == s) {
                        var o = 0 == n ? 1 : .01;
                        null == e.min && (i -= o), null != e.max && null == e.min || (n += o);
                    } else {
                        var a = e.autoscaleMargin;
                        null != a && (null == e.min && (i -= s * a, i < 0 && null != t.datamin && t.datamin >= 0 && (i = 0)), 
                        null == e.max && (n += s * a, n > 0 && null != t.datamax && t.datamax <= 0 && (n = 0)));
                    }
                    t.min = i, t.max = n;
                }
                function z(e) {
                    var i, s = e.options;
                    i = "number" == typeof s.ticks && s.ticks > 0 ? s.ticks : .3 * Math.sqrt("x" == e.direction ? ot.width : ot.height);
                    var o = (e.max - e.min) / i, a = -Math.floor(Math.log(o) / Math.LN10), r = s.tickDecimals;
                    null != r && a > r && (a = r);
                    var l, c = Math.pow(10, -a), h = o / c;
                    if (h < 1.5 ? l = 1 : h < 3 ? (l = 2, h > 2.25 && (null == r || a + 1 <= r) && (l = 2.5, 
                    ++a)) : l = h < 7.5 ? 5 : 10, l *= c, null != s.minTickSize && l < s.minTickSize && (l = s.minTickSize), 
                    e.delta = o, e.tickDecimals = Math.max(0, null != r ? r : a), e.tickSize = s.tickSize || l, 
                    "time" == s.mode && !e.tickGenerator) throw new Error("Time mode requires the flot.time plugin.");
                    if (e.tickGenerator || (e.tickGenerator = function(t) {
                        var e, i = [], s = n(t.min, t.tickSize), o = 0, a = Number.NaN;
                        do e = a, a = s + o * t.tickSize, i.push(a), ++o; while (a < t.max && a != e);
                        return i;
                    }, e.tickFormatter = function(t, e) {
                        var i = e.tickDecimals ? Math.pow(10, e.tickDecimals) : 1, n = "" + Math.round(t * i) / i;
                        if (null != e.tickDecimals) {
                            var s = n.indexOf("."), o = s == -1 ? 0 : n.length - s - 1;
                            if (o < e.tickDecimals) return (o ? n : n + ".") + ("" + i).substr(1, e.tickDecimals - o);
                        }
                        return n;
                    }), t.isFunction(s.tickFormatter) && (e.tickFormatter = function(t, e) {
                        return "" + s.tickFormatter(t, e);
                    }), null != s.alignTicksWithAxis) {
                        var u = ("x" == e.direction ? ht : ut)[s.alignTicksWithAxis - 1];
                        if (u && u.used && u != e) {
                            var d = e.tickGenerator(e);
                            if (d.length > 0 && (null == s.min && (e.min = Math.min(e.min, d[0])), null == s.max && d.length > 1 && (e.max = Math.max(e.max, d[d.length - 1]))), 
                            e.tickGenerator = function(t) {
                                var e, i, n = [];
                                for (i = 0; i < u.ticks.length; ++i) e = (u.ticks[i].v - u.min) / (u.max - u.min), 
                                e = t.min + e * (t.max - t.min), n.push(e);
                                return n;
                            }, !e.mode && null == s.tickDecimals) {
                                var f = Math.max(0, -Math.floor(Math.log(e.delta) / Math.LN10) + 1), p = e.tickGenerator(e);
                                p.length > 1 && /\..*0$/.test((p[1] - p[0]).toFixed(f)) || (e.tickDecimals = f);
                            }
                        }
                    }
                }
                function U(e) {
                    var i = e.options.ticks, n = [];
                    null == i || "number" == typeof i && i > 0 ? n = e.tickGenerator(e) : i && (n = t.isFunction(i) ? i(e) : i);
                    var s, o;
                    for (e.ticks = [], s = 0; s < n.length; ++s) {
                        var a = null, r = n[s];
                        "object" == typeof r ? (o = +r[0], r.length > 1 && (a = r[1])) : o = +r, null == a && (a = e.tickFormatter(o, e)), 
                        isNaN(o) || e.ticks.push({
                            v: o,
                            label: a
                        });
                    }
                }
                function $(t, e) {
                    t.options.autoscaleMargin && e.length > 0 && (null == t.options.min && (t.min = Math.min(t.min, e[0].v)), 
                    null == t.options.max && e.length > 1 && (t.max = Math.max(t.max, e[e.length - 1].v)));
                }
                function F() {
                    ot.clear(), r(mt.drawBackground, [ lt ]);
                    var t = st.grid;
                    t.show && t.backgroundColor && N(), t.show && !t.aboveData && I();
                    for (var e = 0; e < nt.length; ++e) r(mt.drawSeries, [ lt, nt[e] ]), O(nt[e]);
                    r(mt.draw, [ lt ]), t.show && t.aboveData && I(), ot.render(), J();
                }
                function A(t, e) {
                    for (var i, n, s, o, a = f(), r = 0; r < a.length; ++r) if (i = a[r], i.direction == e && (o = e + i.n + "axis", 
                    t[o] || 1 != i.n || (o = e + "axis"), t[o])) {
                        n = t[o].from, s = t[o].to;
                        break;
                    }
                    if (t[o] || (i = "x" == e ? ht[0] : ut[0], n = t[e + "1"], s = t[e + "2"]), null != n && null != s && n > s) {
                        var l = n;
                        n = s, s = l;
                    }
                    return {
                        from: n,
                        to: s,
                        axis: i
                    };
                }
                function N() {
                    lt.save(), lt.translate(dt.left, dt.top), lt.fillStyle = it(st.grid.backgroundColor, pt, 0, "rgba(255, 255, 255, 0)"), 
                    lt.fillRect(0, 0, ft, pt), lt.restore();
                }
                function I() {
                    var e, i, n, s;
                    lt.save(), lt.translate(dt.left, dt.top);
                    var o = st.grid.markings;
                    if (o) for (t.isFunction(o) && (i = gt.getAxes(), i.xmin = i.xaxis.min, i.xmax = i.xaxis.max, 
                    i.ymin = i.yaxis.min, i.ymax = i.yaxis.max, o = o(i)), e = 0; e < o.length; ++e) {
                        var a = o[e], r = A(a, "x"), l = A(a, "y");
                        if (null == r.from && (r.from = r.axis.min), null == r.to && (r.to = r.axis.max), 
                        null == l.from && (l.from = l.axis.min), null == l.to && (l.to = l.axis.max), !(r.to < r.axis.min || r.from > r.axis.max || l.to < l.axis.min || l.from > l.axis.max)) {
                            r.from = Math.max(r.from, r.axis.min), r.to = Math.min(r.to, r.axis.max), l.from = Math.max(l.from, l.axis.min), 
                            l.to = Math.min(l.to, l.axis.max);
                            var c = r.from === r.to, h = l.from === l.to;
                            if (!c || !h) if (r.from = Math.floor(r.axis.p2c(r.from)), r.to = Math.floor(r.axis.p2c(r.to)), 
                            l.from = Math.floor(l.axis.p2c(l.from)), l.to = Math.floor(l.axis.p2c(l.to)), c || h) {
                                var u = a.lineWidth || st.grid.markingsLineWidth, d = u % 2 ? .5 : 0;
                                lt.beginPath(), lt.strokeStyle = a.color || st.grid.markingsColor, lt.lineWidth = u, 
                                c ? (lt.moveTo(r.to + d, l.from), lt.lineTo(r.to + d, l.to)) : (lt.moveTo(r.from, l.to + d), 
                                lt.lineTo(r.to, l.to + d)), lt.stroke();
                            } else lt.fillStyle = a.color || st.grid.markingsColor, lt.fillRect(r.from, l.to, r.to - r.from, l.from - l.to);
                        }
                    }
                    i = f(), n = st.grid.borderWidth;
                    for (var p = 0; p < i.length; ++p) {
                        var m, g, v, y, _ = i[p], b = _.box, x = _.tickLength;
                        if (_.show && 0 != _.ticks.length) {
                            for (lt.lineWidth = 1, "x" == _.direction ? (m = 0, g = "full" == x ? "top" == _.position ? 0 : pt : b.top - dt.top + ("top" == _.position ? b.height : 0)) : (g = 0, 
                            m = "full" == x ? "left" == _.position ? 0 : ft : b.left - dt.left + ("left" == _.position ? b.width : 0)), 
                            _.innermost || (lt.strokeStyle = _.options.color, lt.beginPath(), v = y = 0, "x" == _.direction ? v = ft + 1 : y = pt + 1, 
                            1 == lt.lineWidth && ("x" == _.direction ? g = Math.floor(g) + .5 : m = Math.floor(m) + .5), 
                            lt.moveTo(m, g), lt.lineTo(m + v, g + y), lt.stroke()), lt.strokeStyle = _.options.tickColor, 
                            lt.beginPath(), e = 0; e < _.ticks.length; ++e) {
                                var w = _.ticks[e].v;
                                v = y = 0, isNaN(w) || w < _.min || w > _.max || "full" == x && ("object" == typeof n && n[_.position] > 0 || n > 0) && (w == _.min || w == _.max) || ("x" == _.direction ? (m = _.p2c(w), 
                                y = "full" == x ? -pt : x, "top" == _.position && (y = -y)) : (g = _.p2c(w), v = "full" == x ? -ft : x, 
                                "left" == _.position && (v = -v)), 1 == lt.lineWidth && ("x" == _.direction ? m = Math.floor(m) + .5 : g = Math.floor(g) + .5), 
                                lt.moveTo(m, g), lt.lineTo(m + v, g + y));
                            }
                            lt.stroke();
                        }
                    }
                    n && (s = st.grid.borderColor, "object" == typeof n || "object" == typeof s ? ("object" != typeof n && (n = {
                        top: n,
                        right: n,
                        bottom: n,
                        left: n
                    }), "object" != typeof s && (s = {
                        top: s,
                        right: s,
                        bottom: s,
                        left: s
                    }), n.top > 0 && (lt.strokeStyle = s.top, lt.lineWidth = n.top, lt.beginPath(), 
                    lt.moveTo(0 - n.left, 0 - n.top / 2), lt.lineTo(ft, 0 - n.top / 2), lt.stroke()), 
                    n.right > 0 && (lt.strokeStyle = s.right, lt.lineWidth = n.right, lt.beginPath(), 
                    lt.moveTo(ft + n.right / 2, 0 - n.top), lt.lineTo(ft + n.right / 2, pt), lt.stroke()), 
                    n.bottom > 0 && (lt.strokeStyle = s.bottom, lt.lineWidth = n.bottom, lt.beginPath(), 
                    lt.moveTo(ft + n.right, pt + n.bottom / 2), lt.lineTo(0, pt + n.bottom / 2), lt.stroke()), 
                    n.left > 0 && (lt.strokeStyle = s.left, lt.lineWidth = n.left, lt.beginPath(), lt.moveTo(0 - n.left / 2, pt + n.bottom), 
                    lt.lineTo(0 - n.left / 2, 0), lt.stroke())) : (lt.lineWidth = n, lt.strokeStyle = st.grid.borderColor, 
                    lt.strokeRect(-n / 2, -n / 2, ft + n, pt + n))), lt.restore();
                }
                function W() {
                    t.each(f(), function(t, e) {
                        var i, n, s, o, a, r = e.box, l = e.direction + "Axis " + e.direction + e.n + "Axis", c = "flot-" + e.direction + "-axis flot-" + e.direction + e.n + "-axis " + l, h = e.options.font || "flot-tick-label tickLabel";
                        if (ot.removeText(c), e.show && 0 != e.ticks.length) for (var u = 0; u < e.ticks.length; ++u) i = e.ticks[u], 
                        !i.label || i.v < e.min || i.v > e.max || ("x" == e.direction ? (o = "center", n = dt.left + e.p2c(i.v), 
                        "bottom" == e.position ? s = r.top + r.padding : (s = r.top + r.height - r.padding, 
                        a = "bottom")) : (a = "middle", s = dt.top + e.p2c(i.v), "left" == e.position ? (n = r.left + r.width - r.padding, 
                        o = "right") : n = r.left + r.padding), ot.addText(c, n, s, i.label, h, null, null, o, a));
                    });
                }
                function O(t) {
                    t.lines.show && E(t), t.bars.show && j(t), t.points.show && P(t);
                }
                function E(t) {
                    function e(t, e, i, n, s) {
                        var o = t.points, a = t.pointsize, r = null, l = null;
                        lt.beginPath();
                        for (var c = a; c < o.length; c += a) {
                            var h = o[c - a], u = o[c - a + 1], d = o[c], f = o[c + 1];
                            if (null != h && null != d) {
                                if (u <= f && u < s.min) {
                                    if (f < s.min) continue;
                                    h = (s.min - u) / (f - u) * (d - h) + h, u = s.min;
                                } else if (f <= u && f < s.min) {
                                    if (u < s.min) continue;
                                    d = (s.min - u) / (f - u) * (d - h) + h, f = s.min;
                                }
                                if (u >= f && u > s.max) {
                                    if (f > s.max) continue;
                                    h = (s.max - u) / (f - u) * (d - h) + h, u = s.max;
                                } else if (f >= u && f > s.max) {
                                    if (u > s.max) continue;
                                    d = (s.max - u) / (f - u) * (d - h) + h, f = s.max;
                                }
                                if (h <= d && h < n.min) {
                                    if (d < n.min) continue;
                                    u = (n.min - h) / (d - h) * (f - u) + u, h = n.min;
                                } else if (d <= h && d < n.min) {
                                    if (h < n.min) continue;
                                    f = (n.min - h) / (d - h) * (f - u) + u, d = n.min;
                                }
                                if (h >= d && h > n.max) {
                                    if (d > n.max) continue;
                                    u = (n.max - h) / (d - h) * (f - u) + u, h = n.max;
                                } else if (d >= h && d > n.max) {
                                    if (h > n.max) continue;
                                    f = (n.max - h) / (d - h) * (f - u) + u, d = n.max;
                                }
                                h == r && u == l || lt.moveTo(n.p2c(h) + e, s.p2c(u) + i), r = d, l = f, lt.lineTo(n.p2c(d) + e, s.p2c(f) + i);
                            }
                        }
                        lt.stroke();
                    }
                    function i(t, e, i) {
                        for (var n = t.points, s = t.pointsize, o = Math.min(Math.max(0, i.min), i.max), a = 0, r = !1, l = 1, c = 0, h = 0; ;) {
                            if (s > 0 && a > n.length + s) break;
                            a += s;
                            var u = n[a - s], d = n[a - s + l], f = n[a], p = n[a + l];
                            if (r) {
                                if (s > 0 && null != u && null == f) {
                                    h = a, s = -s, l = 2;
                                    continue;
                                }
                                if (s < 0 && a == c + s) {
                                    lt.fill(), r = !1, s = -s, l = 1, a = c = h + s;
                                    continue;
                                }
                            }
                            if (null != u && null != f) {
                                if (u <= f && u < e.min) {
                                    if (f < e.min) continue;
                                    d = (e.min - u) / (f - u) * (p - d) + d, u = e.min;
                                } else if (f <= u && f < e.min) {
                                    if (u < e.min) continue;
                                    p = (e.min - u) / (f - u) * (p - d) + d, f = e.min;
                                }
                                if (u >= f && u > e.max) {
                                    if (f > e.max) continue;
                                    d = (e.max - u) / (f - u) * (p - d) + d, u = e.max;
                                } else if (f >= u && f > e.max) {
                                    if (u > e.max) continue;
                                    p = (e.max - u) / (f - u) * (p - d) + d, f = e.max;
                                }
                                if (r || (lt.beginPath(), lt.moveTo(e.p2c(u), i.p2c(o)), r = !0), d >= i.max && p >= i.max) lt.lineTo(e.p2c(u), i.p2c(i.max)), 
                                lt.lineTo(e.p2c(f), i.p2c(i.max)); else if (d <= i.min && p <= i.min) lt.lineTo(e.p2c(u), i.p2c(i.min)), 
                                lt.lineTo(e.p2c(f), i.p2c(i.min)); else {
                                    var m = u, g = f;
                                    d <= p && d < i.min && p >= i.min ? (u = (i.min - d) / (p - d) * (f - u) + u, d = i.min) : p <= d && p < i.min && d >= i.min && (f = (i.min - d) / (p - d) * (f - u) + u, 
                                    p = i.min), d >= p && d > i.max && p <= i.max ? (u = (i.max - d) / (p - d) * (f - u) + u, 
                                    d = i.max) : p >= d && p > i.max && d <= i.max && (f = (i.max - d) / (p - d) * (f - u) + u, 
                                    p = i.max), u != m && lt.lineTo(e.p2c(m), i.p2c(d)), lt.lineTo(e.p2c(u), i.p2c(d)), 
                                    lt.lineTo(e.p2c(f), i.p2c(p)), f != g && (lt.lineTo(e.p2c(f), i.p2c(p)), lt.lineTo(e.p2c(g), i.p2c(p)));
                                }
                            }
                        }
                    }
                    lt.save(), lt.translate(dt.left, dt.top), lt.lineJoin = "round";
                    var n = t.lines.lineWidth, s = t.shadowSize;
                    if (n > 0 && s > 0) {
                        lt.lineWidth = s, lt.strokeStyle = "rgba(0,0,0,0.1)";
                        var o = Math.PI / 18;
                        e(t.datapoints, Math.sin(o) * (n / 2 + s / 2), Math.cos(o) * (n / 2 + s / 2), t.xaxis, t.yaxis), 
                        lt.lineWidth = s / 2, e(t.datapoints, Math.sin(o) * (n / 2 + s / 4), Math.cos(o) * (n / 2 + s / 4), t.xaxis, t.yaxis);
                    }
                    lt.lineWidth = n, lt.strokeStyle = t.color;
                    var a = H(t.lines, t.color, 0, pt);
                    a && (lt.fillStyle = a, i(t.datapoints, t.xaxis, t.yaxis)), n > 0 && e(t.datapoints, 0, 0, t.xaxis, t.yaxis), 
                    lt.restore();
                }
                function P(t) {
                    function e(t, e, i, n, s, o, a, r) {
                        for (var l = t.points, c = t.pointsize, h = 0; h < l.length; h += c) {
                            var u = l[h], d = l[h + 1];
                            null == u || u < o.min || u > o.max || d < a.min || d > a.max || (lt.beginPath(), 
                            u = o.p2c(u), d = a.p2c(d) + n, "circle" == r ? lt.arc(u, d, e, 0, s ? Math.PI : 2 * Math.PI, !1) : r(lt, u, d, e, s), 
                            lt.closePath(), i && (lt.fillStyle = i, lt.fill()), lt.stroke());
                        }
                    }
                    lt.save(), lt.translate(dt.left, dt.top);
                    var i = t.points.lineWidth, n = t.shadowSize, s = t.points.radius, o = t.points.symbol;
                    if (0 == i && (i = 1e-4), i > 0 && n > 0) {
                        var a = n / 2;
                        lt.lineWidth = a, lt.strokeStyle = "rgba(0,0,0,0.1)", e(t.datapoints, s, null, a + a / 2, !0, t.xaxis, t.yaxis, o), 
                        lt.strokeStyle = "rgba(0,0,0,0.2)", e(t.datapoints, s, null, a / 2, !0, t.xaxis, t.yaxis, o);
                    }
                    lt.lineWidth = i, lt.strokeStyle = t.color, e(t.datapoints, s, H(t.points, t.color), 0, !1, t.xaxis, t.yaxis, o), 
                    lt.restore();
                }
                function Y(t, e, i, n, s, o, a, r, l, c, h) {
                    var u, d, f, p, m, g, v, y, _;
                    c ? (y = g = v = !0, m = !1, u = i, d = t, p = e + n, f = e + s, d < u && (_ = d, 
                    d = u, u = _, m = !0, g = !1)) : (m = g = v = !0, y = !1, u = t + n, d = t + s, 
                    f = i, p = e, p < f && (_ = p, p = f, f = _, y = !0, v = !1)), d < a.min || u > a.max || p < r.min || f > r.max || (u < a.min && (u = a.min, 
                    m = !1), d > a.max && (d = a.max, g = !1), f < r.min && (f = r.min, y = !1), p > r.max && (p = r.max, 
                    v = !1), u = a.p2c(u), f = r.p2c(f), d = a.p2c(d), p = r.p2c(p), o && (l.fillStyle = o(f, p), 
                    l.fillRect(u, p, d - u, f - p)), h > 0 && (m || g || v || y) && (l.beginPath(), 
                    l.moveTo(u, f), m ? l.lineTo(u, p) : l.moveTo(u, p), v ? l.lineTo(d, p) : l.moveTo(d, p), 
                    g ? l.lineTo(d, f) : l.moveTo(d, f), y ? l.lineTo(u, f) : l.moveTo(u, f), l.stroke()));
                }
                function j(t) {
                    function e(e, i, n, s, o, a) {
                        for (var r = e.points, l = e.pointsize, c = 0; c < r.length; c += l) null != r[c] && Y(r[c], r[c + 1], r[c + 2], i, n, s, o, a, lt, t.bars.horizontal, t.bars.lineWidth);
                    }
                    lt.save(), lt.translate(dt.left, dt.top), lt.lineWidth = t.bars.lineWidth, lt.strokeStyle = t.color;
                    var i;
                    switch (t.bars.align) {
                      case "left":
                        i = 0;
                        break;

                      case "right":
                        i = -t.bars.barWidth;
                        break;

                      default:
                        i = -t.bars.barWidth / 2;
                    }
                    var n = t.bars.fill ? function(e, i) {
                        return H(t.bars, t.color, e, i);
                    } : null;
                    e(t.datapoints, i, i + t.bars.barWidth, n, t.xaxis, t.yaxis), lt.restore();
                }
                function H(e, i, n, s) {
                    var o = e.fill;
                    if (!o) return null;
                    if (e.fillColor) return it(e.fillColor, n, s, i);
                    var a = t.color.parse(i);
                    return a.a = "number" == typeof o ? o : .4, a.normalize(), a.toString();
                }
                function L() {
                    if (null != st.legend.container ? t(st.legend.container).html("") : i.find(".legend").remove(), 
                    st.legend.show) {
                        for (var e, n, s = [], o = [], a = !1, r = st.legend.labelFormatter, l = 0; l < nt.length; ++l) e = nt[l], 
                        e.label && (n = r ? r(e.label, e) : e.label, n && o.push({
                            label: n,
                            color: e.color
                        }));
                        if (st.legend.sorted) if (t.isFunction(st.legend.sorted)) o.sort(st.legend.sorted); else if ("reverse" == st.legend.sorted) o.reverse(); else {
                            var c = "descending" != st.legend.sorted;
                            o.sort(function(t, e) {
                                return t.label == e.label ? 0 : t.label < e.label != c ? 1 : -1;
                            });
                        }
                        for (var l = 0; l < o.length; ++l) {
                            var h = o[l];
                            l % st.legend.noColumns == 0 && (a && s.push("</tr>"), s.push("<tr>"), a = !0), 
                            s.push('<td class="legendColorBox"><div style="border:1px solid ' + st.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + h.color + ';overflow:hidden"></div></div></td><td class="legendLabel">' + h.label + "</td>");
                        }
                        if (a && s.push("</tr>"), 0 != s.length) {
                            var u = '<table style="font-size:smaller;color:' + st.grid.color + '">' + s.join("") + "</table>";
                            if (null != st.legend.container) t(st.legend.container).html(u); else {
                                var d = "", f = st.legend.position, p = st.legend.margin;
                                null == p[0] && (p = [ p, p ]), "n" == f.charAt(0) ? d += "top:" + (p[1] + dt.top) + "px;" : "s" == f.charAt(0) && (d += "bottom:" + (p[1] + dt.bottom) + "px;"), 
                                "e" == f.charAt(1) ? d += "right:" + (p[0] + dt.right) + "px;" : "w" == f.charAt(1) && (d += "left:" + (p[0] + dt.left) + "px;");
                                var m = t('<div class="legend">' + u.replace('style="', 'style="position:absolute;' + d + ";") + "</div>").appendTo(i);
                                if (0 != st.legend.backgroundOpacity) {
                                    var g = st.legend.backgroundColor;
                                    null == g && (g = st.grid.backgroundColor, g = g && "string" == typeof g ? t.color.parse(g) : t.color.extract(m, "background-color"), 
                                    g.a = 1, g = g.toString());
                                    var v = m.children();
                                    t('<div style="position:absolute;width:' + v.width() + "px;height:" + v.height() + "px;" + d + "background-color:" + g + ';"> </div>').prependTo(m).css("opacity", st.legend.backgroundOpacity);
                                }
                            }
                        }
                    }
                }
                function R(t, e, i) {
                    var n, s, o, a = st.grid.mouseActiveRadius, r = a * a + 1, l = null;
                    for (n = nt.length - 1; n >= 0; --n) if (i(nt[n])) {
                        var c = nt[n], h = c.xaxis, u = c.yaxis, d = c.datapoints.points, f = h.c2p(t), p = u.c2p(e), m = a / h.scale, g = a / u.scale;
                        if (o = c.datapoints.pointsize, h.options.inverseTransform && (m = Number.MAX_VALUE), 
                        u.options.inverseTransform && (g = Number.MAX_VALUE), c.lines.show || c.points.show) for (s = 0; s < d.length; s += o) {
                            var v = d[s], y = d[s + 1];
                            if (null != v && !(v - f > m || v - f < -m || y - p > g || y - p < -g)) {
                                var _ = Math.abs(h.p2c(v) - t), b = Math.abs(u.p2c(y) - e), x = _ * _ + b * b;
                                x < r && (r = x, l = [ n, s / o ]);
                            }
                        }
                        if (c.bars.show && !l) {
                            var w, k;
                            switch (c.bars.align) {
                              case "left":
                                w = 0;
                                break;

                              case "right":
                                w = -c.bars.barWidth;
                                break;

                              default:
                                w = -c.bars.barWidth / 2;
                            }
                            for (k = w + c.bars.barWidth, s = 0; s < d.length; s += o) {
                                var v = d[s], y = d[s + 1], D = d[s + 2];
                                null != v && (nt[n].bars.horizontal ? f <= Math.max(D, v) && f >= Math.min(D, v) && p >= y + w && p <= y + k : f >= v + w && f <= v + k && p >= Math.min(D, y) && p <= Math.max(D, y)) && (l = [ n, s / o ]);
                            }
                        }
                    }
                    return l ? (n = l[0], s = l[1], o = nt[n].datapoints.pointsize, {
                        datapoint: nt[n].datapoints.points.slice(s * o, (s + 1) * o),
                        dataIndex: s,
                        series: nt[n],
                        seriesIndex: n
                    }) : null;
                }
                function V(t) {
                    st.grid.hoverable && G("plothover", t, function(t) {
                        return 0 != t.hoverable;
                    });
                }
                function q(t) {
                    st.grid.hoverable && G("plothover", t, function(t) {
                        return !1;
                    });
                }
                function B(t) {
                    G("plotclick", t, function(t) {
                        return 0 != t.clickable;
                    });
                }
                function G(t, e, n) {
                    var s = rt.offset(), o = e.pageX - s.left - dt.left, a = e.pageY - s.top - dt.top, r = p({
                        left: o,
                        top: a
                    });
                    r.pageX = e.pageX, r.pageY = e.pageY;
                    var l = R(o, a, n);
                    if (l && (l.pageX = parseInt(l.series.xaxis.p2c(l.datapoint[0]) + s.left + dt.left, 10), 
                    l.pageY = parseInt(l.series.yaxis.p2c(l.datapoint[1]) + s.top + dt.top, 10)), st.grid.autoHighlight) {
                        for (var c = 0; c < vt.length; ++c) {
                            var h = vt[c];
                            h.auto != t || l && h.series == l.series && h.point[0] == l.datapoint[0] && h.point[1] == l.datapoint[1] || Q(h.series, h.point);
                        }
                        l && K(l.series, l.datapoint, t);
                    }
                    i.trigger(t, [ r, l ]);
                }
                function J() {
                    var t = st.interaction.redrawOverlayInterval;
                    return t == -1 ? void X() : void (yt || (yt = setTimeout(X, t)));
                }
                function X() {
                    yt = null, ct.save(), at.clear(), ct.translate(dt.left, dt.top);
                    var t, e;
                    for (t = 0; t < vt.length; ++t) e = vt[t], e.series.bars.show ? et(e.series, e.point) : tt(e.series, e.point);
                    ct.restore(), r(mt.drawOverlay, [ ct ]);
                }
                function K(t, e, i) {
                    if ("number" == typeof t && (t = nt[t]), "number" == typeof e) {
                        var n = t.datapoints.pointsize;
                        e = t.datapoints.points.slice(n * e, n * (e + 1));
                    }
                    var s = Z(t, e);
                    s == -1 ? (vt.push({
                        series: t,
                        point: e,
                        auto: i
                    }), J()) : i || (vt[s].auto = !1);
                }
                function Q(t, e) {
                    if (null == t && null == e) return vt = [], void J();
                    if ("number" == typeof t && (t = nt[t]), "number" == typeof e) {
                        var i = t.datapoints.pointsize;
                        e = t.datapoints.points.slice(i * e, i * (e + 1));
                    }
                    var n = Z(t, e);
                    n != -1 && (vt.splice(n, 1), J());
                }
                function Z(t, e) {
                    for (var i = 0; i < vt.length; ++i) {
                        var n = vt[i];
                        if (n.series == t && n.point[0] == e[0] && n.point[1] == e[1]) return i;
                    }
                    return -1;
                }
                function tt(e, i) {
                    var n = i[0], s = i[1], o = e.xaxis, a = e.yaxis, r = "string" == typeof e.highlightColor ? e.highlightColor : t.color.parse(e.color).scale("a", .5).toString();
                    if (!(n < o.min || n > o.max || s < a.min || s > a.max)) {
                        var l = e.points.radius + e.points.lineWidth / 2;
                        ct.lineWidth = l, ct.strokeStyle = r;
                        var c = 1.5 * l;
                        n = o.p2c(n), s = a.p2c(s), ct.beginPath(), "circle" == e.points.symbol ? ct.arc(n, s, c, 0, 2 * Math.PI, !1) : e.points.symbol(ct, n, s, c, !1), 
                        ct.closePath(), ct.stroke();
                    }
                }
                function et(e, i) {
                    var n, s = "string" == typeof e.highlightColor ? e.highlightColor : t.color.parse(e.color).scale("a", .5).toString(), o = s;
                    switch (e.bars.align) {
                      case "left":
                        n = 0;
                        break;

                      case "right":
                        n = -e.bars.barWidth;
                        break;

                      default:
                        n = -e.bars.barWidth / 2;
                    }
                    ct.lineWidth = e.bars.lineWidth, ct.strokeStyle = s, Y(i[0], i[1], i[2] || 0, n, n + e.bars.barWidth, function() {
                        return o;
                    }, e.xaxis, e.yaxis, ct, e.bars.horizontal, e.bars.lineWidth);
                }
                function it(e, i, n, s) {
                    if ("string" == typeof e) return e;
                    for (var o = lt.createLinearGradient(0, n, 0, i), a = 0, r = e.colors.length; a < r; ++a) {
                        var l = e.colors[a];
                        if ("string" != typeof l) {
                            var c = t.color.parse(s);
                            null != l.brightness && (c = c.scale("rgb", l.brightness)), null != l.opacity && (c.a *= l.opacity), 
                            l = c.toString();
                        }
                        o.addColorStop(a / (r - 1), l);
                    }
                    return o;
                }
                var nt = [], st = {
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
                }, ot = null, at = null, rt = null, lt = null, ct = null, ht = [], ut = [], dt = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }, ft = 0, pt = 0, mt = {
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
                gt.setData = h, gt.setupGrid = M, gt.draw = F, gt.getPlaceholder = function() {
                    return i;
                }, gt.getCanvas = function() {
                    return ot.element;
                }, gt.getPlotOffset = function() {
                    return dt;
                }, gt.width = function() {
                    return ft;
                }, gt.height = function() {
                    return pt;
                }, gt.offset = function() {
                    var t = rt.offset();
                    return t.left += dt.left, t.top += dt.top, t;
                }, gt.getData = function() {
                    return nt;
                }, gt.getAxes = function() {
                    var e = {};
                    return t.each(ht.concat(ut), function(t, i) {
                        i && (e[i.direction + (1 != i.n ? i.n : "") + "axis"] = i);
                    }), e;
                }, gt.getXAxes = function() {
                    return ht;
                }, gt.getYAxes = function() {
                    return ut;
                }, gt.c2p = p, gt.p2c = m, gt.getOptions = function() {
                    return st;
                }, gt.highlight = K, gt.unhighlight = Q, gt.triggerRedrawOverlay = J, gt.pointOffset = function(t) {
                    return {
                        left: parseInt(ht[d(t, "x") - 1].p2c(+t.x) + dt.left, 10),
                        top: parseInt(ut[d(t, "y") - 1].p2c(+t.y) + dt.top, 10)
                    };
                }, gt.shutdown = x, gt.destroy = function() {
                    x(), i.removeData("plot").empty(), nt = [], st = null, ot = null, at = null, rt = null, 
                    lt = null, ct = null, ht = [], ut = [], mt = null, vt = [], gt = null;
                }, gt.resize = function() {
                    var t = i.width(), e = i.height();
                    ot.resize(t, e), at.resize(t, e);
                }, gt.hooks = mt, l(gt), c(o), _(), h(s), M(), F(), b();
                var vt = [], yt = null;
            }
            function n(t, e) {
                return e * Math.floor(t / e);
            }
            var s = Object.prototype.hasOwnProperty;
            t.fn.detach || (t.fn.detach = function() {
                return this.each(function() {
                    this.parentNode && this.parentNode.removeChild(this);
                });
            }), e.prototype.resize = function(t, e) {
                if (t <= 0 || e <= 0) throw new Error("Invalid dimensions for plot, width = " + t + ", height = " + e);
                var i = this.element, n = this.context, s = this.pixelRatio;
                this.width != t && (i.width = t * s, i.style.width = t + "px", this.width = t), 
                this.height != e && (i.height = e * s, i.style.height = e + "px", this.height = e), 
                n.restore(), n.save(), n.scale(s, s);
            }, e.prototype.clear = function() {
                this.context.clearRect(0, 0, this.width, this.height);
            }, e.prototype.render = function() {
                var t = this._textCache;
                for (var e in t) if (s.call(t, e)) {
                    var i = this.getTextLayer(e), n = t[e];
                    i.hide();
                    for (var o in n) if (s.call(n, o)) {
                        var a = n[o];
                        for (var r in a) if (s.call(a, r)) {
                            for (var l, c = a[r].positions, h = 0; l = c[h]; h++) l.active ? l.rendered || (i.append(l.element), 
                            l.rendered = !0) : (c.splice(h--, 1), l.rendered && l.element.detach());
                            0 == c.length && delete a[r];
                        }
                    }
                    i.show();
                }
            }, e.prototype.getTextLayer = function(e) {
                var i = this.text[e];
                return null == i && (null == this.textContainer && (this.textContainer = t("<div class='flot-text'></div>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    "font-size": "smaller",
                    color: "#545454"
                }).insertAfter(this.element)), i = this.text[e] = t("<div></div>").addClass(e).css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }).appendTo(this.textContainer)), i;
            }, e.prototype.getTextInfo = function(e, i, n, s, o) {
                var a, r, l, c;
                if (i = "" + i, a = "object" == typeof n ? n.style + " " + n.variant + " " + n.weight + " " + n.size + "px/" + n.lineHeight + "px " + n.family : n, 
                r = this._textCache[e], null == r && (r = this._textCache[e] = {}), l = r[a], null == l && (l = r[a] = {}), 
                c = l[i], null == c) {
                    var h = t("<div></div>").html(i).css({
                        position: "absolute",
                        "max-width": o,
                        top: -9999
                    }).appendTo(this.getTextLayer(e));
                    "object" == typeof n ? h.css({
                        font: a,
                        color: n.color
                    }) : "string" == typeof n && h.addClass(n), c = l[i] = {
                        width: h.outerWidth(!0),
                        height: h.outerHeight(!0),
                        element: h,
                        positions: []
                    }, h.detach();
                }
                return c;
            }, e.prototype.addText = function(t, e, i, n, s, o, a, r, l) {
                var c = this.getTextInfo(t, n, s, o, a), h = c.positions;
                "center" == r ? e -= c.width / 2 : "right" == r && (e -= c.width), "middle" == l ? i -= c.height / 2 : "bottom" == l && (i -= c.height);
                for (var u, d = 0; u = h[d]; d++) if (u.x == e && u.y == i) return void (u.active = !0);
                u = {
                    active: !0,
                    rendered: !1,
                    element: h.length ? c.element.clone() : c.element,
                    x: e,
                    y: i
                }, h.push(u), u.element.css({
                    top: Math.round(i),
                    left: Math.round(e),
                    "text-align": r
                });
            }, e.prototype.removeText = function(t, e, i, n, o, a) {
                if (null == n) {
                    var r = this._textCache[t];
                    if (null != r) for (var l in r) if (s.call(r, l)) {
                        var c = r[l];
                        for (var h in c) if (s.call(c, h)) for (var u, d = c[h].positions, f = 0; u = d[f]; f++) u.active = !1;
                    }
                } else for (var u, d = this.getTextInfo(t, n, o, a).positions, f = 0; u = d[f]; f++) u.x == e && u.y == i && (u.active = !1);
            }, t.plot = function(e, n, s) {
                var o = new i(t(e), n, s, t.plot.plugins);
                return o;
            }, t.plot.version = "0.8.3", t.plot.plugins = [], t.fn.plot = function(e, i) {
                return this.each(function() {
                    t.plot(this, e, i);
                });
            };
        }(jQuery);
    },
    104: function(t, e) {
        !function(t) {
            function e(e) {
                function i(t) {
                    p.active && (c(t), e.getPlaceholder().trigger("plotselecting", [ o() ]));
                }
                function n(e) {
                    1 == e.which && (document.body.focus(), void 0 !== document.onselectstart && null == m.onselectstart && (m.onselectstart = document.onselectstart, 
                    document.onselectstart = function() {
                        return !1;
                    }), void 0 !== document.ondrag && null == m.ondrag && (m.ondrag = document.ondrag, 
                    document.ondrag = function() {
                        return !1;
                    }), l(p.first, e), p.active = !0, g = function(t) {
                        s(t);
                    }, t(document).one("mouseup", g));
                }
                function s(t) {
                    return g = null, void 0 !== document.onselectstart && (document.onselectstart = m.onselectstart), 
                    void 0 !== document.ondrag && (document.ondrag = m.ondrag), p.active = !1, c(t), 
                    f() ? a() : (e.getPlaceholder().trigger("plotunselected", []), e.getPlaceholder().trigger("plotselecting", [ null ])), 
                    !1;
                }
                function o() {
                    if (!f()) return null;
                    if (!p.show) return null;
                    var i = {}, n = p.first, s = p.second;
                    return t.each(e.getAxes(), function(t, e) {
                        if (e.used) {
                            var o = e.c2p(n[e.direction]), a = e.c2p(s[e.direction]);
                            i[t] = {
                                from: Math.min(o, a),
                                to: Math.max(o, a)
                            };
                        }
                    }), i;
                }
                function a() {
                    var t = o();
                    e.getPlaceholder().trigger("plotselected", [ t ]), t.xaxis && t.yaxis && e.getPlaceholder().trigger("selected", [ {
                        x1: t.xaxis.from,
                        y1: t.yaxis.from,
                        x2: t.xaxis.to,
                        y2: t.yaxis.to
                    } ]);
                }
                function r(t, e, i) {
                    return e < t ? t : e > i ? i : e;
                }
                function l(t, i) {
                    var n = e.getOptions(), s = e.getPlaceholder().offset(), o = e.getPlotOffset();
                    t.x = r(0, i.pageX - s.left - o.left, e.width()), t.y = r(0, i.pageY - s.top - o.top, e.height()), 
                    "y" == n.selection.mode && (t.x = t == p.first ? 0 : e.width()), "x" == n.selection.mode && (t.y = t == p.first ? 0 : e.height());
                }
                function c(t) {
                    null != t.pageX && (l(p.second, t), f() ? (p.show = !0, e.triggerRedrawOverlay()) : h(!0));
                }
                function h(t) {
                    p.show && (p.show = !1, e.triggerRedrawOverlay(), t || e.getPlaceholder().trigger("plotunselected", []));
                }
                function u(t, i) {
                    var n, s, o, a, r = e.getAxes();
                    for (var l in r) if (n = r[l], n.direction == i && (a = i + n.n + "axis", t[a] || 1 != n.n || (a = i + "axis"), 
                    t[a])) {
                        s = t[a].from, o = t[a].to;
                        break;
                    }
                    if (t[a] || (n = "x" == i ? e.getXAxes()[0] : e.getYAxes()[0], s = t[i + "1"], o = t[i + "2"]), 
                    null != s && null != o && s > o) {
                        var c = s;
                        s = o, o = c;
                    }
                    return {
                        from: s,
                        to: o,
                        axis: n
                    };
                }
                function d(t, i) {
                    var n, s = e.getOptions();
                    "y" == s.selection.mode ? (p.first.x = 0, p.second.x = e.width()) : (n = u(t, "x"), 
                    p.first.x = n.axis.p2c(n.from), p.second.x = n.axis.p2c(n.to)), "x" == s.selection.mode ? (p.first.y = 0, 
                    p.second.y = e.height()) : (n = u(t, "y"), p.first.y = n.axis.p2c(n.from), p.second.y = n.axis.p2c(n.to)), 
                    p.show = !0, e.triggerRedrawOverlay(), !i && f() && a();
                }
                function f() {
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
                e.clearSelection = h, e.setSelection = d, e.getSelection = o, e.hooks.bindEvents.push(function(t, e) {
                    var s = t.getOptions();
                    null != s.selection.mode && (e.mousemove(i), e.mousedown(n));
                }), e.hooks.drawOverlay.push(function(e, i) {
                    if (p.show && f()) {
                        var n = e.getPlotOffset(), s = e.getOptions();
                        i.save(), i.translate(n.left, n.top);
                        var o = t.color.parse(s.selection.color);
                        i.strokeStyle = o.scale("a", .8).toString(), i.lineWidth = 1, i.lineJoin = s.selection.shape, 
                        i.fillStyle = o.scale("a", .4).toString();
                        var a = Math.min(p.first.x, p.second.x) + .5, r = Math.min(p.first.y, p.second.y) + .5, l = Math.abs(p.second.x - p.first.x) - 1, c = Math.abs(p.second.y - p.first.y) - 1;
                        i.fillRect(a, r, l, c), i.strokeRect(a, r, l, c), i.restore();
                    }
                }), e.hooks.shutdown.push(function(e, s) {
                    s.unbind("mousemove", i), s.unbind("mousedown", n), g && t(document).unbind("mouseup", g);
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
    },
    105: function(t, e) {
        !function(t) {
            function e(t, e) {
                return e * Math.floor(t / e);
            }
            function i(t, e, i, n) {
                if ("function" == typeof t.strftime) return t.strftime(e);
                var s = function(t, e) {
                    return t = "" + t, e = "" + (null == e ? "0" : e), 1 == t.length ? e + t : t;
                }, o = [], a = !1, r = t.getHours(), l = r < 12;
                null == i && (i = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]), 
                null == n && (n = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]);
                var c;
                c = r > 12 ? r - 12 : 0 == r ? 12 : r;
                for (var h = 0; h < e.length; ++h) {
                    var u = e.charAt(h);
                    if (a) {
                        switch (u) {
                          case "a":
                            u = "" + n[t.getDay()];
                            break;

                          case "b":
                            u = "" + i[t.getMonth()];
                            break;

                          case "d":
                            u = s(t.getDate());
                            break;

                          case "e":
                            u = s(t.getDate(), " ");
                            break;

                          case "h":
                          case "H":
                            u = s(r);
                            break;

                          case "I":
                            u = s(c);
                            break;

                          case "l":
                            u = s(c, " ");
                            break;

                          case "m":
                            u = s(t.getMonth() + 1);
                            break;

                          case "M":
                            u = s(t.getMinutes());
                            break;

                          case "q":
                            u = "" + (Math.floor(t.getMonth() / 3) + 1);
                            break;

                          case "S":
                            u = s(t.getSeconds());
                            break;

                          case "y":
                            u = s(t.getFullYear() % 100);
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
                        o.push(u), a = !1;
                    } else "%" == u ? a = !0 : o.push(u);
                }
                return o.join("");
            }
            function n(t) {
                function e(t, e, i, n) {
                    t[e] = function() {
                        return i[n].apply(i, arguments);
                    };
                }
                var i = {
                    date: t
                };
                void 0 != t.strftime && e(i, "strftime", t, "strftime"), e(i, "getTime", t, "getTime"), 
                e(i, "setTime", t, "setTime");
                for (var n = [ "Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds" ], s = 0; s < n.length; s++) e(i, "get" + n[s], t, "getUTC" + n[s]), 
                e(i, "set" + n[s], t, "setUTC" + n[s]);
                return i;
            }
            function s(t, e) {
                if ("browser" == e.timezone) return new Date(t);
                if (e.timezone && "utc" != e.timezone) {
                    if ("undefined" != typeof timezoneJS && "undefined" != typeof timezoneJS.Date) {
                        var i = new timezoneJS.Date();
                        return i.setTimezone(e.timezone), i.setTime(t), i;
                    }
                    return n(new Date(t));
                }
                return n(new Date(t));
            }
            function o(n) {
                n.hooks.processOptions.push(function(n, o) {
                    t.each(n.getAxes(), function(t, n) {
                        var o = n.options;
                        "time" == o.mode && (n.tickGenerator = function(t) {
                            var i = [], n = s(t.min, o), a = 0, l = o.tickSize && "quarter" === o.tickSize[1] || o.minTickSize && "quarter" === o.minTickSize[1] ? h : c;
                            null != o.minTickSize && (a = "number" == typeof o.tickSize ? o.tickSize : o.minTickSize[0] * r[o.minTickSize[1]]);
                            for (var u = 0; u < l.length - 1 && !(t.delta < (l[u][0] * r[l[u][1]] + l[u + 1][0] * r[l[u + 1][1]]) / 2 && l[u][0] * r[l[u][1]] >= a); ++u) ;
                            var d = l[u][0], f = l[u][1];
                            if ("year" == f) {
                                if (null != o.minTickSize && "year" == o.minTickSize[1]) d = Math.floor(o.minTickSize[0]); else {
                                    var p = Math.pow(10, Math.floor(Math.log(t.delta / r.year) / Math.LN10)), m = t.delta / r.year / p;
                                    d = m < 1.5 ? 1 : m < 3 ? 2 : m < 7.5 ? 5 : 10, d *= p;
                                }
                                d < 1 && (d = 1);
                            }
                            t.tickSize = o.tickSize || [ d, f ];
                            var g = t.tickSize[0];
                            f = t.tickSize[1];
                            var v = g * r[f];
                            "second" == f ? n.setSeconds(e(n.getSeconds(), g)) : "minute" == f ? n.setMinutes(e(n.getMinutes(), g)) : "hour" == f ? n.setHours(e(n.getHours(), g)) : "month" == f ? n.setMonth(e(n.getMonth(), g)) : "quarter" == f ? n.setMonth(3 * e(n.getMonth() / 3, g)) : "year" == f && n.setFullYear(e(n.getFullYear(), g)), 
                            n.setMilliseconds(0), v >= r.minute && n.setSeconds(0), v >= r.hour && n.setMinutes(0), 
                            v >= r.day && n.setHours(0), v >= 4 * r.day && n.setDate(1), v >= 2 * r.month && n.setMonth(e(n.getMonth(), 3)), 
                            v >= 2 * r.quarter && n.setMonth(e(n.getMonth(), 6)), v >= r.year && n.setMonth(0);
                            var y, _ = 0, b = Number.NaN;
                            do if (y = b, b = n.getTime(), i.push(b), "month" == f || "quarter" == f) if (g < 1) {
                                n.setDate(1);
                                var x = n.getTime();
                                n.setMonth(n.getMonth() + ("quarter" == f ? 3 : 1));
                                var w = n.getTime();
                                n.setTime(b + _ * r.hour + (w - x) * g), _ = n.getHours(), n.setHours(0);
                            } else n.setMonth(n.getMonth() + g * ("quarter" == f ? 3 : 1)); else "year" == f ? n.setFullYear(n.getFullYear() + g) : n.setTime(b + v); while (b < t.max && b != y);
                            return i;
                        }, n.tickFormatter = function(t, e) {
                            var n = s(t, e.options);
                            if (null != o.timeformat) return i(n, o.timeformat, o.monthNames, o.dayNames);
                            var a, l = e.options.tickSize && "quarter" == e.options.tickSize[1] || e.options.minTickSize && "quarter" == e.options.minTickSize[1], c = e.tickSize[0] * r[e.tickSize[1]], h = e.max - e.min, u = o.twelveHourClock ? " %p" : "", d = o.twelveHourClock ? "%I" : "%H";
                            a = c < r.minute ? d + ":%M:%S" + u : c < r.day ? h < 2 * r.day ? d + ":%M" + u : "%b %d " + d + ":%M" + u : c < r.month ? "%b %d" : l && c < r.quarter || !l && c < r.year ? h < r.year ? "%b" : "%b %Y" : l && c < r.year ? h < r.year ? "Q%q" : "Q%q %Y" : "%Y";
                            var f = i(n, a, o.monthNames, o.dayNames);
                            return f;
                        });
                    });
                });
            }
            var a = {
                xaxis: {
                    timezone: null,
                    timeformat: null,
                    twelveHourClock: !1,
                    monthNames: null
                }
            }, r = {
                second: 1e3,
                minute: 6e4,
                hour: 36e5,
                day: 864e5,
                month: 2592e6,
                quarter: 7776e6,
                year: 525949.2 * 60 * 1e3
            }, l = [ [ 1, "second" ], [ 2, "second" ], [ 5, "second" ], [ 10, "second" ], [ 30, "second" ], [ 1, "minute" ], [ 2, "minute" ], [ 5, "minute" ], [ 10, "minute" ], [ 30, "minute" ], [ 1, "hour" ], [ 2, "hour" ], [ 4, "hour" ], [ 8, "hour" ], [ 12, "hour" ], [ 1, "day" ], [ 2, "day" ], [ 3, "day" ], [ .25, "month" ], [ .5, "month" ], [ 1, "month" ], [ 2, "month" ] ], c = l.concat([ [ 3, "month" ], [ 6, "month" ], [ 1, "year" ] ]), h = l.concat([ [ 1, "quarter" ], [ 2, "quarter" ], [ 1, "year" ] ]);
            t.plot.plugins.push({
                init: o,
                options: a,
                name: "time",
                version: "1.0"
            }), t.plot.formatDate = i, t.plot.dateGenerator = s;
        }(jQuery);
    },
    106: function(t, e, i) {
        "use strict";
        !function() {
            function e(t, e) {
                t.wait(function() {
                    t.valid && e();
                });
            }
            function n(t) {
                a || (o = r.dbus("org.freedesktop.systemd1", {
                    superuser: "try"
                }), a = o.proxy("org.freedesktop.systemd1.Manager", "/org/freedesktop/systemd1"), 
                e(a, function() {
                    a.Subscribe().fail(function(t) {
                        "org.freedesktop.systemd1.AlreadySubscribed" != t.name && "org.freedesktop.DBus.Error.FileExists" != t.name && console.warn("Subscribing to systemd signals failed", t);
                    });
                })), e(a, t);
            }
            function s(t) {
                function i() {
                    _.exists = "not-found" != b.LoadState || "inactive" != b.ActiveState, "activating" == b.ActiveState ? _.state = "starting" : "deactivating" == b.ActiveState ? _.state = "stopping" : "active" == b.ActiveState || "reloading" == b.ActiveState ? _.state = "running" : "failed" == b.ActiveState ? _.state = "failed" : "inactive" == b.ActiveState && _.exists ? _.state = "stopped" : _.state = void 0, 
                    "enabled" == b.UnitFileState || "linked" == b.UnitFileState ? _.enabled = !0 : "disabled" == b.UnitFileState || "masked" == b.UnitFileState ? _.enabled = !1 : _.enabled = void 0, 
                    _.unit = b, _.dispatchEvent("changed"), w.resolve();
                }
                function s() {
                    _.service = x, _.dispatchEvent("changed");
                }
                function l() {
                    function t(t, e) {
                        o.call(t, "org.freedesktop.DBus.Properties", "GetAll", [ e ]).fail(function(t) {
                            console.log(t);
                        }).done(function(t) {
                            var i = {};
                            for (var n in t[0]) i[n] = t[0][n].v;
                            var s = {};
                            s[e] = i;
                            var a = {};
                            a[b.path] = s, o.notify(a);
                        });
                    }
                    b && x && (t(b.path, "org.freedesktop.systemd1.Unit"), t(x.path, "org.freedesktop.systemd1.Service"));
                }
                function c(e, i, n, s, o) {
                    s == t && l();
                }
                function h(t) {
                    w.promise.then(t);
                }
                function u(t, e) {
                    return o.call("/org/freedesktop/systemd1", "org.freedesktop.systemd1.Manager", t, e);
                }
                function d(t, e) {
                    var i = r.defer();
                    return u(t, e).done(function(t) {
                        var e = t[0];
                        k[e] = i;
                    }).fail(function(t) {
                        i.reject(t);
                    }), i.promise();
                }
                function f(t, e) {
                    return u(t, e).then(function() {
                        return u("Reload", []);
                    });
                }
                function p() {
                    return d("StartUnit", [ t, "replace" ]);
                }
                function m() {
                    return d("StopUnit", [ t, "replace" ]);
                }
                function g() {
                    return d("RestartUnit", [ t, "replace" ]);
                }
                function v() {
                    return f("EnableUnitFiles", [ [ t ], !1, !1 ]);
                }
                function y() {
                    return f("DisableUnitFiles", [ [ t ], !1 ]);
                }
                var _ = {
                    exists: null,
                    state: null,
                    enabled: null,
                    wait: h,
                    start: p,
                    stop: m,
                    restart: g,
                    enable: v,
                    disable: y
                };
                r.event_target(_);
                var b, x, w = r.defer();
                t.indexOf(".") == -1 && (t += ".service"), n(function() {
                    a.LoadUnit(t).done(function(t) {
                        b = o.proxy("org.freedesktop.systemd1.Unit", t), b.addEventListener("changed", i), 
                        e(b, i), x = o.proxy("org.freedesktop.systemd1.Service", t), x.addEventListener("changed", s), 
                        e(x, s);
                    }).fail(function(t) {
                        _.exists = !1, _.dispatchEvent("changed");
                    });
                }), a.addEventListener("Reloading", function(t, e) {
                    e || l();
                }), a.addEventListener("JobNew", c), a.addEventListener("JobRemoved", c);
                var k = {};
                return a.addEventListener("JobRemoved", function(t, e, i, n, s) {
                    k[i] && ("done" == s ? k[i].resolve() : k[i].reject(s), delete k[i]);
                }), _;
            }
            var o, a, r = i(3);
            t.exports = {
                proxy: s
            };
        }();
    },
    107: function(t, e) {
        !function(t) {
            "use strict";
            var e = function(e, i) {
                this.options = t.extend({}, t.fn.combobox.defaults, i), this.$source = t(e), this.$container = this.setup(), 
                this.$element = this.$container.find("input[type=text]"), this.$target = this.$container.find("input[type=hidden]"), 
                this.$button = this.$container.find(".dropdown-toggle"), this.$menu = t(this.options.menu).appendTo("body"), 
                this.template = this.options.template || this.template, this.matcher = this.options.matcher || this.matcher, 
                this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, 
                this.shown = !1, this.selected = !1, this.refresh(), this.transferAttributes(), 
                this.listen();
            };
            e.prototype = {
                constructor: e,
                setup: function() {
                    var e = t(this.template());
                    return this.$source.before(e), this.$source.hide(), e;
                },
                disable: function() {
                    this.$element.prop("disabled", !0), this.$button.attr("disabled", !0), this.disabled = !0, 
                    this.$container.addClass("combobox-disabled");
                },
                enable: function() {
                    this.$element.prop("disabled", !1), this.$button.attr("disabled", !1), this.disabled = !1, 
                    this.$container.removeClass("combobox-disabled");
                },
                parse: function() {
                    var e = this, i = {}, n = [], s = !1, o = "";
                    return this.$source.find("option").each(function() {
                        var a = t(this);
                        return "" === a.val() ? void (e.options.placeholder = a.text()) : (i[a.text()] = a.val(), 
                        n.push(a.text()), void (a.prop("selected") && (s = a.text(), o = a.val())));
                    }), this.map = i, s && (this.$element.val(s), this.$target.val(o), this.$container.addClass("combobox-selected"), 
                    this.selected = !0), n;
                },
                transferAttributes: function() {
                    this.options.placeholder = this.$source.attr("data-placeholder") || this.options.placeholder, 
                    this.$element.attr("placeholder", this.options.placeholder), this.$target.prop("name", this.$source.prop("name")), 
                    this.$target.val(this.$source.val()), this.$source.removeAttr("name"), this.$element.attr("required", this.$source.attr("required")), 
                    this.$element.attr("rel", this.$source.attr("rel")), this.$element.attr("title", this.$source.attr("title")), 
                    this.$element.attr("class", this.$source.attr("class")), this.$element.attr("tabindex", this.$source.attr("tabindex")), 
                    this.$source.removeAttr("tabindex"), void 0 !== this.$source.attr("disabled") && this.disable();
                },
                select: function() {
                    var t = this.$menu.find(".active").attr("data-value");
                    return this.$element.val(this.updater(t)).trigger("change"), this.$target.val(this.map[t]).trigger("change"), 
                    this.$source.val(this.map[t]).trigger("change"), this.$container.addClass("combobox-selected"), 
                    this.selected = !0, this.hide();
                },
                updater: function(t) {
                    return t;
                },
                show: function() {
                    var e = t.extend({}, this.$element.position(), {
                        height: this.$element[0].offsetHeight
                    });
                    return this.$menu.insertAfter(this.$element).css({
                        top: e.top + e.height,
                        left: e.left
                    }).show(), t(".dropdown-menu").on("mousedown", t.proxy(this.scrollSafety, this)), 
                    this.shown = !0, this;
                },
                hide: function() {
                    return this.$menu.hide(), t(".dropdown-menu").off("mousedown", t.proxy(this.scrollSafety, this)), 
                    this.$element.on("blur", t.proxy(this.blur, this)), this.shown = !1, this;
                },
                lookup: function(t) {
                    return this.query = this.$element.val(), this.process(this.source);
                },
                process: function(e) {
                    var i = this;
                    return e = t.grep(e, function(t) {
                        return i.matcher(t);
                    }), e = this.sorter(e), e.length ? this.render(e.slice(0, this.options.items)).show() : this.shown ? this.hide() : this;
                },
                template: function() {
                    return "2" == this.options.bsVersion ? '<div class="combobox-container"><input type="hidden" /> <div class="input-append"> <input type="text" autocomplete="off" /> <span class="add-on dropdown-toggle" data-dropdown="dropdown"> <span class="caret"/> <i class="icon-remove"/> </span> </div> </div>' : '<div class="combobox-container"> <input type="hidden" /> <div class="input-group"> <input type="text" autocomplete="off" /> <span class="input-group-addon dropdown-toggle" data-dropdown="dropdown"> <span class="caret" /> <span class="glyphicon glyphicon-remove" /> </span> </div> </div>';
                },
                matcher: function(t) {
                    return ~t.toLowerCase().indexOf(this.query.toLowerCase());
                },
                sorter: function(t) {
                    for (var e, i = [], n = [], s = []; e = t.shift(); ) e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? n.push(e) : s.push(e) : i.push(e);
                    return i.concat(n, s);
                },
                highlighter: function(t) {
                    var e = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                    return t.replace(new RegExp("(" + e + ")", "ig"), function(t, e) {
                        return "<strong>" + e + "</strong>";
                    });
                },
                render: function(e) {
                    var i = this;
                    return e = t(e).map(function(e, n) {
                        return e = t(i.options.item).attr("data-value", n), e.find("a").html(i.highlighter(n)), 
                        e[0];
                    }), e.first().addClass("active"), this.$menu.html(e), this;
                },
                next: function(e) {
                    var i = this.$menu.find(".active").removeClass("active"), n = i.next();
                    n.length || (n = t(this.$menu.find("li")[0])), n.addClass("active");
                },
                prev: function(t) {
                    var e = this.$menu.find(".active").removeClass("active"), i = e.prev();
                    i.length || (i = this.$menu.find("li").last()), i.addClass("active");
                },
                toggle: function() {
                    this.disabled || (this.$container.hasClass("combobox-selected") ? (this.clearTarget(), 
                    this.triggerChange(), this.clearElement()) : this.shown ? this.hide() : (this.clearElement(), 
                    this.lookup()));
                },
                scrollSafety: function(t) {
                    "UL" == t.target.tagName && this.$element.off("blur");
                },
                clearElement: function() {
                    this.$element.val("").focus();
                },
                clearTarget: function() {
                    this.$source.val(""), this.$target.val(""), this.$container.removeClass("combobox-selected"), 
                    this.selected = !1;
                },
                triggerChange: function() {
                    this.$source.trigger("change");
                },
                refresh: function() {
                    this.source = this.parse(), this.options.items = this.source.length;
                },
                listen: function() {
                    this.$element.on("focus", t.proxy(this.focus, this)).on("blur", t.proxy(this.blur, this)).on("keypress", t.proxy(this.keypress, this)).on("keyup", t.proxy(this.keyup, this)), 
                    this.eventSupported("keydown") && this.$element.on("keydown", t.proxy(this.keydown, this)), 
                    this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", "li", t.proxy(this.mouseenter, this)).on("mouseleave", "li", t.proxy(this.mouseleave, this)), 
                    this.$button.on("click", t.proxy(this.toggle, this));
                },
                eventSupported: function(t) {
                    var e = t in this.$element;
                    return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), 
                    e;
                },
                move: function(t) {
                    if (this.shown) {
                        switch (t.keyCode) {
                          case 9:
                          case 13:
                          case 27:
                            t.preventDefault();
                            break;

                          case 38:
                            t.preventDefault(), this.prev();
                            break;

                          case 40:
                            t.preventDefault(), this.next();
                        }
                        t.stopPropagation();
                    }
                },
                keydown: function(e) {
                    this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [ 40, 38, 9, 13, 27 ]), this.move(e);
                },
                keypress: function(t) {
                    this.suppressKeyPressRepeat || this.move(t);
                },
                keyup: function(t) {
                    switch (t.keyCode) {
                      case 40:
                      case 39:
                      case 38:
                      case 37:
                      case 36:
                      case 35:
                      case 16:
                      case 17:
                      case 18:
                        break;

                      case 9:
                      case 13:
                        if (!this.shown) return;
                        this.select();
                        break;

                      case 27:
                        if (!this.shown) return;
                        this.hide();
                        break;

                      default:
                        this.clearTarget(), this.lookup();
                    }
                    t.stopPropagation(), t.preventDefault();
                },
                focus: function(t) {
                    this.focused = !0;
                },
                blur: function(t) {
                    var e = this;
                    this.focused = !1;
                    var i = this.$element.val();
                    this.selected || "" === i || (this.$element.val(""), this.$source.val("").trigger("change"), 
                    this.$target.val("").trigger("change")), !this.mousedover && this.shown && setTimeout(function() {
                        e.hide();
                    }, 200);
                },
                click: function(t) {
                    t.stopPropagation(), t.preventDefault(), this.select(), this.$element.focus();
                },
                mouseenter: function(e) {
                    this.mousedover = !0, this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active");
                },
                mouseleave: function(t) {
                    this.mousedover = !1;
                }
            }, t.fn.combobox = function(i) {
                return this.each(function() {
                    var n = t(this), s = n.data("combobox"), o = "object" == typeof i && i;
                    s || n.data("combobox", s = new e(this, o)), "string" == typeof i && s[i]();
                });
            }, t.fn.combobox.defaults = {
                bsVersion: "3",
                menu: '<ul class="typeahead typeahead-long dropdown-menu"></ul>',
                item: '<li><a href="#"></a></li>'
            }, t.fn.combobox.Constructor = e;
        }(window.jQuery);
    },
    108: function(t, e, i) {
        "use strict";
        function n() {
            a("#shutdown-dialog input").parent().toggle("x" == u), a("#shutdown-dialog .dropdown button span").text(a("#shutdown-dialog li[value='" + u + "']").text());
            var t = parseInt(a("#shutdown-dialog .shutdown-minutes").val(), 10);
            t < 10 && a("#shutdown-dialog .shutdown-minutes").val("0" + t);
        }
        function s() {
            if ("x" != u) return r.resolve("+" + u);
            var t = a("#shutdown-dialog .shutdown-date").val(), e = a("#shutdown-dialog .shutdown-hours").val(), i = a("#shutdown-dialog .shutdown-minutes").val(), n = parseInt(e, 10), s = parseInt(i, 10), o = !1;
            (isNaN(n) || n < 0 || n > 23 || isNaN(s) || s < 0 || s > 59) && (o = !0);
            var h = new Date(t), d = !1;
            (isNaN(h.getTime()) || h.getTime() < 0) && (d = !0);
            var f = null;
            if (o && d ? f = new Error(l("Invalid date format and invalid time format")) : o ? f = new Error(l("Invalid time format")) : d && (f = new Error(l("Invalid date format"))), 
            f) return f.target = "table td:last-child div", r.reject(f);
            var p = [ "date", "--date=" + t + " " + e + ":" + i, "+%s" ];
            return r.spawn(p, {
                err: "message"
            }).then(function(t) {
                var e = parseInt(t, 10), i = parseInt(c.now.getTime() / 1e3, 10), n = Math.ceil((e - i) / 60);
                if (n === -1) n = 0; else if (n < 0) return console.log("Shutdown offset in minutes is in the past:", n), 
                f = new Error(l("Cannot schedule event in the past")), f.target = "table td:last-child div", 
                r.reject(f);
                return "+" + n;
            });
        }
        function o(t) {
            return s().then(function(t) {
                var e = "shutdown" == h ? "--poweroff" : "--reboot", i = a("#shutdown-dialog textarea").val();
                return "restart" == h && r.hint("restart"), r.spawn([ "shutdown", e, t, i ], {
                    superuser: !0,
                    err: "message"
                });
            });
        }
        var a = i(2), r = i(3);
        i(99), i(100);
        var l = r.gettext, c = null, h = null;
        t.exports = function(t, e) {
            h = t, c = e, a("#shutdown-dialog").modal("show");
        }, a("#shutdown-dialog .shutdown-date").datepicker({
            autoclose: !0,
            todayHighlight: !0,
            format: "yyyy-mm-dd",
            startDate: "today"
        }), a("#shutdown-dialog input").on("focusout", n).on("change", n);
        var u = 0;
        a("#shutdown-dialog .dropdown li").on("click", function(t) {
            u = a(this).attr("value"), n();
        });
        var d = null;
        a("#shutdown-dialog .shutdown-date").on("focusin", function() {
            d = a(this).val();
        }).on("focusout", function() {
            0 === a(this).val().length && a(this).val(d);
        }), a("#shutdown-dialog").on("show.bs.modal", function(t) {
            "shutdown-dialog" === t.target.id && (a("#shutdown-dialog textarea").val("").attr("placeholder", l("Message to logged in users")).attr("rows", 5), 
            u = a("#shutdown-dialog li:first-child").attr("value"), c.wait().then(function() {
                a("#shutdown-dialog .shutdown-date").val(c.format()), a("#shutdown-dialog .shutdown-hours").val(c.utc_fake_now.getUTCHours()), 
                a("#shutdown-dialog .shutdown-minutes").val(c.utc_fake_now.getUTCMinutes());
            }), "shutdown" == h ? (a("#shutdown-dialog .modal-title").text(l("Shut Down")), 
            a("#shutdown-dialog .btn-danger").text(l("Shut Down"))) : (a("#shutdown-dialog .modal-title").text(l("Restart")), 
            a("#shutdown-dialog .btn-danger").text(l("Restart"))), n());
        }), a("#shutdown-dialog .btn-danger").click(function() {
            a("#shutdown-dialog").dialog("promise", o());
        });
    },
    109: function(t, e) {
        t.exports = '#!/bin/sh\n\nset -eu\nport="22"\nhost="localhost"\n\nparse_addr() {\n    if [ -n "$1" ]; then\n        case "$1" in\n            *:*)\n                t="$1"\n                p=${t##*:}\n                h=${t%:*}\n                ;;\n            *)\n                p="$1"\n                h="localhost"\n                ;;\n        esac\n\n        # checks that port is an integer\n        if [ "$p" -eq "$p" ] 2>/dev/null; then\n            port="$p"\n            host="$h"\n            if [ "$host" = "[::]" ]; then\n                host="::"\n            fi\n        fi\n    fi\n}\n\n# Try to find where sshd might be listening\n\n# Check sshd_config, only works for root\nconfig=$(sshd -T | grep "listenaddress " | cut -d\' \' -f2-)\necho "$config" | while IFS=\'\\n\' read line; do\n    parse_addr "$line"\ndone\n\n# Check with systemd\nsystemd=$(systemctl show --property=Listen sshd.socket || true)\necho "$systemd" | while IFS=\'=\' read -r name value; do\n    if [ "$name" = "ListenStream" ]; then\n        parse_addr "$value"\n    fi\ndone\n\nkeys=$(ssh-keyscan -t dsa,ecdsa,ed25519,rsa -p "$port" "$host" || true)\nif [ -n "$keys" ]; then\n    # Some versions of ssh-keygen don\'t support -f reading from stdin\n    # so write a tmpfile\n    tmp=$(mktemp)\n    echo "$keys" > "$tmp"\n\n    # Not all ssh-keygen version support -E in those cases just output the default\n    (ssh-keygen -l -f "$tmp" -E md5 && ssh-keygen -l -f "$tmp" -E sha256) || ssh-keygen -l -f "$tmp"\n    rm "$tmp"\nfi\n';
    },
    110: function(t, e) {}
});
//# sourceMappingURL=system.min.js.map