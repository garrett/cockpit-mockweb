!function(e) {
    function a(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, a), o.loaded = !0, o.exports;
    }
    var t = {};
    return a.m = e, a.c = t, a.p = "", a(0);
}([ function(e, a, t) {
    e.exports = t(1);
}, function(e, a, t) {
    (function(e) {
        "use strict";
        !function() {
            function a(e, a, r, u) {
                function m(e) {
                    P = e.attr("data-value"), j(".realms-op-auth span").text(e.text());
                    var a = (P || "").split("/"), t = a[0], r = a[1];
                    j(".realms-op-admin-row").hide(), j(".realms-op-admin-password-row").hide(), j(".realms-op-user-row").hide(), 
                    j(".realms-op-user-password-row").hide(), j(".realms-op-otp-row").hide(), "password" == t && "administrator" == r ? (j(".realms-op-admin-row").show(), 
                    j(".realms-op-admin-password-row").show()) : "password" == t && "user" == r ? (j(".realms-op-user-row").show(), 
                    j(".realms-op-user-password-row").show()) : "secret" == t && j(".realms-op-otp-row").show();
                }
                function f(a) {
                    var t = j.Deferred();
                    return void 0 === a && (a = j(".realms-op-address").val()), a && j(".realms-op-address-spinner").show(), 
                    t.always(function() {
                        a && j(".realms-op-address-spinner").hide();
                    }), e.call(l, d, "Discover", [ a, {} ]).always(function() {
                        if (j(".realms-op-address").val() != a) return t.reject(), void f();
                        var o, l, i = [];
                        "rejected" == this.state() && (o = arguments[0], j(".realms-op-error").empty().text(o.message), 
                        t.reject(o));
                        var d;
                        arguments[0][1] && (i = arguments[0][1]), l = i[0], l ? (D = e.proxy(c, l), j(D).on("changed", g), 
                        r = e.proxy(p, l), j(r).on("changed", g), r.wait(function() {
                            t.resolve(r);
                        })) : (a && (d = n.format(s("Domain $0 could not be contacted"), a), j(".realms-op-address-error").show().attr("title", d)), 
                        r = null, D = null, t.reject(new Error(d))), g();
                    }), A = t.promise(), T = a, A;
                }
                function v() {
                    if ("join" != a) {
                        var e = j.Deferred();
                        return e.resolve(r), e.promise();
                    }
                    return j(".realms-op-address").val() === T && A ? A : f();
                }
                function h(e, a) {
                    var t = null;
                    return e && e.Details && e.Details.forEach(function(e) {
                        e[0] === a && (t = e[1]);
                    }), t;
                }
                function g() {
                    function e(e, a, t) {
                        var r, o, n, s = d.length;
                        for (n = 0; n < s; n++) if ((!e || e == d[n][1]) && a == d[n][0]) {
                            o = a + "/" + d[n][1], r = j("<li>").attr("data-value", o).append(j("<a>").text(t)), 
                            i.append(r), c && (m(r), c = !1), p += 1;
                            break;
                        }
                    }
                    var t;
                    j(".realms-op-spinner").toggle(!!C), j(".realms-op-wait-message").toggle(!!C), j(".realms-op-field").prop("disabled", !!C), 
                    j(".realms-op-apply").prop("disabled", !!C), j(".realm-active-directory-only").hide();
                    var o = h(r, "server-software");
                    if (r && D && !D.valid ? (t = n.format(s("Domain $0 is not supported"), r.Name), 
                    j(".realms-op-address-spinner").hide(), j(".realms-op-address-error").show().attr("title", t)) : j(".realms-op-address-error").hide(), 
                    C ? u.attr("disabled", "disabled") : u.removeAttr("disabled"), "join" == a) {
                        j(".realm-active-directory-only").toggle(!o || "active-directory" == o), r && r.Name && !j(".realms-op-address")[0].placeholder && (j(".realms-op-address")[0].placeholder = n.format(s('e.g. "$0"'), r.Name));
                        var l = "";
                        D && D.SuggestedAdministrator && (l = n.format(s('e.g. "$0"'), D.SuggestedAdministrator)), 
                        j(".realms-op-admin")[0].placeholder = l;
                        var i = j(".realms-op-auth .dropdown-menu"), d = D && D.SupportedJoinCredentials || [];
                        d.push([ "password", "administrator" ]);
                        var c = !0, p = 0;
                        i.empty(), e("administrator", "password", s("Administrator Password")), e("user", "password", s("User Password")), 
                        e(null, "secret", s("One Time Password")), e(null, "automatic", s("Automatic")), 
                        j(".realms-authentification-row").toggle(p > 1), i.prop("disabled", !!C).val(!c);
                    }
                }
                function b() {
                    var e, a, t = (P || "").split("/"), r = t[0], o = t[1];
                    return "user" == o && "password" == r ? e = [ r, o, n.variant("(ss)", [ j(".realms-op-user").val(), j(".realms-op-user-password").val() ]) ] : "administrator" == o && "password" == r ? e = [ r, o, n.variant("(ss)", [ j(".realms-op-admin").val(), j(".realms-op-admin-password").val() ]) ] : "secret" == r ? (a = j(".realms-op-ot-password").val(), 
                    e = [ r, o, n.variant("ay", n.utf8_encoder().encode(a)) ]) : e = [ "automatic", o, n.variant("s", "") ], 
                    e;
                }
                function w() {
                    var t = "cockpit-" + E;
                    E += 1, y(t), v().fail(function() {
                        y(null);
                    }).done(function(r) {
                        var o = {
                            operation: n.variant("s", t)
                        };
                        j(".realms-op-error").empty().show(), j(".realms-op-diagnostics").empty().hide();
                        var l, i, d = "", c = e.subscribe({
                            member: "Diagnostics"
                        }, function(e, a, r, o) {
                            o[1] === t && (d += o[0]);
                        });
                        return "join" == a ? (i = j(".realms-join-computer-ou").val(), i && (o["computer-ou"] = n.variant("s", i)), 
                        D.valid ? l = D.call("Join", [ b(), o ]) : (y(null), j(".realms-op-error").empty().text(s("Joining this domain is not supported")).show())) : "leave" == a && (l = r.Deconfigure(o)), 
                        l ? void l.fail(function(e) {
                            y(null), "org.freedesktop.realmd.Error.Cancelled" == e.name ? j(k).modal("hide") : (console.log("Failed to join domain: " + r.Name + ": " + e), 
                            j(".realms-op-error").empty().text(e + " ").show(), d && (j(".realms-op-error").append('<a class="realms-op-more-diagnostics">' + s("More") + "</a>"), 
                            j(".realms-op-diagnostics").text(d)));
                        }).done(function() {
                            y(null), j(k).modal("hide");
                        }).always(function() {
                            c.remove();
                        }) : void c.remove();
                    });
                }
                function y(e) {
                    C = e, g();
                }
                function x() {
                    return !!C && (e.call(l, i, "Cancel", [ C ]), y(null), !0);
                }
                var k = o.parseHTML(t(6))[0], j = function(e, a) {
                    return new o.fn.init(e, a || k);
                };
                j.fn = j.prototype = o.fn, o.extend(j, o);
                var C = null, A = null, T = null, D = null;
                j(".realms-op-cancel").on("click", function() {
                    x() || j(k).modal("hide");
                }), j(k).on("hide.bs.modal", function() {
                    x();
                }), j(".realms-op-apply").on("click", w), j(".realms-op-field").on("keydown", function(e) {
                    13 == e.which && w();
                }), j(k).on("click", ".realms-op-more-diagnostics", function() {
                    j(".realms-op-error").hide(), j(".realms-op-diagnostics").show();
                });
                var N = null;
                j(".realms-op-address").on("keyup change", function() {
                    j(".realms-op-address").val() != T && (j(".realms-op-address-error").hide(), window.clearTimeout(N), 
                    N = window.setTimeout(f, 1e3));
                });
                var P = null;
                j(".realms-op-auth").on("click", "li", function() {
                    m(j(this));
                });
                var O, S;
                "join" == a ? (O = s("page-title", s("Join a Domain")), S = s("Join"), j(".realms-op-join-only-row").show(), 
                f("")) : (O = s("page-title", s("Leave Domain")), S = s("Leave"), j(".realms-op-join-only-row").hide()), 
                j(".realms-op-title").text(O), j(".realms-op-apply").text(S), j(".realms-op-field").val("");
                var E = 1;
                return g(), k;
            }
            function r() {
                function e() {
                    var e, a, t;
                    c = [];
                    for (a in d) t = d[a], t.Configured && c.push(t);
                    e = c && c.length ? c.map(function(e) {
                        return e.Name;
                    }).join(", ") : s("Join Domain"), r.text(e);
                }
                var t = o, r = t("<a>"), i = n.dbus("org.freedesktop.realmd");
                i.watch(l);
                var d = i.proxies("org.freedesktop.realmd.Realm"), c = null, p = null;
                t(i).on("close", function(e, a) {
                    var t;
                    t = "not-found" == a.problem ? s("Cannot join a domain because realmd is not available on this system") : n.message(a), 
                    r.addClass("disabled").attr("title", t).tooltip({
                        container: "body"
                    }).tooltip("fixTitle"), i = null;
                }), d.wait(function() {
                    function e() {
                        t(r).update_privileged(p, n.format(s("The user <b>$0</b> is not permitted to modify realms"), p.user ? p.user.name : ""));
                    }
                    i && (p = n.permission({
                        admin: !0
                    }), t(p).on("changed", e));
                }), t(d).on("changed", e), e();
                var u = null;
                return r.on("click", function() {
                    u && t(u).remove(), u = c && c.length ? a(i, "leave", c[0], r) : a(i, "join", null, r), 
                    t(u).attr("id", "realms-op").appendTo("body").modal("show"), n.translate();
                }), r.close = function() {
                    u && u.cancel(), r.remove(), i && i.close(), p && p.close();
                }, r;
            }
            var o = t(3), n = t(4);
            t(5);
            var s = n.gettext, l = "/org/freedesktop/realmd", i = "org.freedesktop.realmd.Service", d = "org.freedesktop.realmd.Provider", c = "org.freedesktop.realmd.KerberosMembership", p = "org.freedesktop.realmd.Realm";
            return o(function() {
                var e = o("#system-info-domain");
                e.length && (e.find(".button-location").append(r()), e.removeAttr("hidden"));
            }), e;
        }();
    }).call(a, t(2)(e));
}, function(e, a) {
    "use strict";
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], 
        e.webpackPolyfill = 1), e;
    };
}, function(e, a) {
    e.exports = jQuery;
}, function(e, a) {
    e.exports = cockpit;
}, function(e, a, t) {
    "use strict";
    !function() {
        function e() {
            return w += 1, "unique" + -new Date() + -w;
        }
        function a(e) {
            e.find(".dialog-error").remove(), e.find(".has-error").removeClass("has-error"), 
            e.find(".dialog-wrapper").off(".dialog-error"), e.off(".dialog-error");
        }
        function r(e, a) {
            var t, r, o = e.parent();
            o.is(".dialog-wrapper") || (o = g("<div class='dialog-wrapper'>").insertBefore(e), 
            t = e.next(), t.is(".bootstrap-select") && t.selectpicker && (t.remove(), r = t.selectpicker), 
            e.remove().appendTo(o), r && r.call(e));
            var n;
            a.message && (n = g("<div class='dialog-error help-block'>").text(a.message)), o.addClass("has-error").append(n), 
            o.hasClass("error-keep") || o.on("keypress.dialog-error change.dialog-error", function() {
                o.removeClass("has-error").find(".dialog-error.help-block").css("visibility", "hidden");
            });
        }
        function o(e, a) {
            var t = g("<div class='alert alert-danger dialog-error'>"), r = a.message || a.toString();
            t.text(r), g("<span class='fa fa-exclamation-triangle'>").prependTo(t), console.warn(r);
            var o = e.find(".modal-footer");
            o.length ? t.prependTo(o) : t.appendTo(e);
        }
        function n(e, t) {
            a(e), 1 == t.length && g.isArray(t[0]) && (t = t[0]);
            var n = !1;
            t.forEach(function(a) {
                var t;
                a && (t = e.find(a.target), t && t.length ? r(t, a) : o(e, a), n = !0);
            }), n && e.on("show.bs.modal.dialog-error", function() {
                a(e);
            });
        }
        function s(e, a) {
            this.promise = e, this.disabled = [], this.handle = a;
        }
        function l(e) {
            var a = e.data("dialog-wait");
            e.data("dialog-wait", null), e.find(".dialog-wait-ct").remove(), e.find(".btn").off(".dialog-wait"), 
            e.off(".dialog-wait"), a && a.disabled.forEach(function(e) {
                e.removeAttr("disabled");
            });
        }
        function i(e, a, t) {
            function r() {
                var t, r = e.data("dialog-wait");
                r && r.promise === a && (l(e), t = a.state(), u || "resolved" == t && r.handle ? e.modal("hide") : "rejected" == t && r.handle && n(e, [ arguments[0] ]));
            }
            function o(t) {
                var r = e.data("dialog-wait");
                r && r.promise === a && ("string" != typeof t && (t = ""), d.text(t));
            }
            if (l(e), !a) return t && e.modal("hide"), e;
            t && n(e, []);
            var i = g("<div class='dialog-wait-ct pull-left'>");
            g("<div class='spinner spinner-sm'>").appendTo(i);
            var d = g("<span>").appendTo(i);
            e.find(".modal-footer button").first().before(i);
            var c = new s(a, t);
            e.data("dialog-wait", c);
            var p = a.cancel || a.close, u = !1, m = e.find(".form-control").add(".btn", e);
            return p && (m = m.not("[data-dismiss]").not(".btn-cancel")), m.each(function() {
                var e = g(this);
                e.attr("disabled") || (c.disabled.push(e), e.attr("disabled", "disabled"));
            }), e.find(".btn[data-dismiss], .btn-cancel").on("click.dialog-wait", function() {
                return u = !0, p && p.apply(a), !1;
            }), e.on("hide.bs.modal.dialog-wait", function() {
                l(e);
            }), a.always(r).progress(o), e;
        }
        function d(a) {
            var t = b.gettext || function(e) {
                return e;
            };
            return a = a.find(".btn-onoff-ct").andSelf().filter(".btn-onoff-ct"), a.each(function(a, r) {
                var o, n, s, l = g(r).attr("data-toggle", "buttons").addClass("btn-group"), i = l.onoff("value"), d = l.find(".btn"), c = l.find("input").first().attr("name") || e();
                for (o = d.length; o < 2; o++) n = g('<input type="radio" autocomplete="off">'), 
                s = document.createTextNode(t(0 === o ? "On" : "Off")), l.append(g('<label class="btn">').append(n, s)), 
                d = null;
                d = d || l.find(".btn"), d.find("input").attr("name", c), p(l, !!i);
            }), a;
        }
        function c(e) {
            return e.find(".btn").first().hasClass("active");
        }
        function p(e, a) {
            return e.each(function(e, t) {
                var r = g(t).find(".btn");
                r.first().toggleClass("active", !!a).find("input").prop("checked", !!a), r.last().toggleClass("active", !a).find("input").prop("checked", !a);
            });
        }
        function u(e, a, t, r) {
            var o = 0;
            r > t ? o = 1 : r < 0 || isNaN(r) ? o = 0 : !isNaN(t) && t > 0 && r >= 0 && (o = r / t), 
            g(a).css("width", 100 * o + "%").next("div").css("margin-left", g(a).css("width")), 
            e.value = o;
        }
        function m(e) {
            u(e, g(e).children("div.slider-bar").first()[0], 1, e.value);
        }
        function f(e) {
            g(e).toggleClass("slider-warning", e.offsetWidth < e.scrollWidth);
        }
        function v(e) {
            g(e).attr("unselectable", "on"), Object.defineProperty(e, "value", {
                get: function() {
                    return parseFloat(this.getAttribute("value"));
                },
                set: function(e) {
                    var a = String(e);
                    a != this.getAttribute("value") && this.setAttribute("value", e);
                }
            }), Object.defineProperty(e, "disabled", {
                get: function() {
                    return !!this.hasAttribute("disabled") && "false" != this.getAttribute("disabled").toLowerCase();
                },
                set: function(e) {
                    this.setAttribute("disabled", e ? "true" : "false");
                }
            }), m(e), f(e), g(e).on("change", function() {
                m(e), g(e).toggleClass("slider-disabled", e.disabled);
            }), e.disabled && g(e).addClass("slider-disabled"), g(e).on("mousedown", function(a) {
                if (e.disabled) return !0;
                var t, r = g(e).offset().left;
                if (g(a.target).hasClass("slider-thumb")) {
                    var o = a.offsetX || a.clientX - g(a.target).offset().left;
                    r += o - g(a.target).outerWidth() / 2, t = g(a.target).parent()[0];
                } else t = g(e).children("div.slider-bar").first()[0], u(e, t, g(e).width(), a.pageX - r), 
                g(e).trigger("change", [ e.value ]), f(e);
                return g(document).on("mousemove.slider", function(a) {
                    return u(e, t, g(e).width(), a.pageX - r), g(e).trigger("change", [ e.value ]), 
                    f(e), !1;
                }).on("mouseup.slider", function(e) {
                    return g(document).off("mousemove.slider").off("mouseup.slider"), !1;
                }), !1;
            });
        }
        function h() {
            g("div.slider").each(function() {
                v(this);
            });
        }
        var g = t(3), b = t(4), w = 0;
        g.fn.dialog = function(e) {
            return "failure" === e ? n(this, Array.prototype.slice.call(arguments, 1)) : "wait" === e ? i(this, arguments[1]) : "promise" === e ? i(this, arguments[1], !0) : void console.warn("unknown dialog action: " + e);
        }, window.addEventListener("hashchange", function() {
            g(".modal").modal("hide");
        }), g.fn.onoff = function(e) {
            return 0 === arguments.length || "refresh" == e ? d(this) : "value" === e ? 1 === arguments.length ? c(this) : p(this, arguments[1]) : "disabled" == e ? this.find(".btn").toggleClass("disabled", arguments[1]) : void console.warn("unknown switch action: " + e);
        }, g.fn.slider = function(e) {
            var a = this;
            return 0 === arguments.length || "refresh" == e ? (a.each(function() {
                v(this);
            }), a) : void console.warn("unknown slider action: " + e);
        }, g(document).ready(h), g.fn.update_privileged = function(e, a, t) {
            var r = e.allowed !== !1, o = this;
            return o.each(function() {
                var e = "allowed-title";
                "undefined" != typeof g(this).data(e) && g(this).data(e) !== !1 || g(this).data(e, g(this).attr("title") || "");
                var o = {
                    html: !0
                };
                t && (o.placement = t), g(this).tooltip(o), g(this).hasClass("disabled") === r && (g(this).toggleClass("disabled", !r).attr("data-original-title", null), 
                r ? g(this).attr("title", g(this).data(e)) : g(this).attr("title", a), g(this).tooltip("fixTitle"));
            }), o;
        };
    }();
}, function(e, a) {
    e.exports = '<div class="modal" tabindex="-1" role="dialog" data-backdrop="static">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h4 class="modal-title realms-op-title"></h4>\n      </div>\n      <div class="modal-body">\n        <div class="realms-op-fields">\n          <table class="form-table-ct realms-op-form">\n            <tr class="realms-op-join-only-row">\n              <td><label class="control-label" translatable="yes">Domain Address</label></td>\n              <td>\n                <input class="realms-op-field form-control realms-op-address" type="text" value=""/>\n              </td>\n              <td class="realms-op-zero-width">\n                <div class="realms-op-address-spinner" hidden>\n                  <span class="spinner spinner-xs spinner-inline"></span>\n                </div>\n                <div class="realms-op-address-error" hidden>\n                  <span class="fa fa-lg fa-exclamation"></span>\n                </div>\n              </td>\n            </tr>\n            <tr class="realms-op-join-only-row">\n              <td class="header"></td>\n            </tr>\n            <tr class="realms-op-join-only-row realm-active-directory-only">\n              <td><label class="control-label" translatable="yes">Computer OU</label></td>\n              <td>\n                <input class="realms-op-field form-control realms-op-computer-ou" type="text" value=""/>\n              </td>\n            </tr>\n            <tr class="realms-op-join-only-row realms-authentification-row">\n              <td><label class="control-label" translatable="yes">Authentication</label></td>\n              <td>\n                  <div class="btn-group bootstrap-select dropdown form-control realms-op-auth">\n                      <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">\n                          <span class="pull-left"></span>\n                          <div class="caret"></div>\n                      </button>\n                      <ul class="dropdown-menu">\n                      </ul>\n                  </div>\n              </td>\n            </tr>\n            <tr class="realms-op-join-only-row realms-op-user-row">\n              <td><label class="control-label" translatable="yes">User Name</label></td>\n              <td>\n                <input class="realms-op-field form-control realms-op-user" type="text" value=""/>\n              </td>\n            </tr>\n            <tr class="realms-op-join-only-row realms-op-user-password-row">\n              <td><label class="control-label" translatable="yes">User Password</label></td>\n              <td>\n                <input class="realms-op-field form-control realms-op-user-password" type="password" value=""/>\n              </td>\n            </tr>\n            <tr class="realms-op-join-only-row realms-op-admin-row">\n              <td><label class="control-label" translatable="yes">Domain Administrator Name</label></td>\n              <td>\n                <input class="realms-op-field form-control realms-op-admin" type="text" value=""/>\n              </td>\n            </tr>\n            <tr class="realms-op-join-only-row realms-op-admin-password-row">\n              <td><label class="control-label" translatable="yes">Domain Administrator Password</label></td>\n              <td>\n                <input class="realms-op-field form-control realms-op-admin-password" type="password" value=""/>\n              </td>\n            </tr>\n            <tr class="realms-op-join-only-row realms-op-otp-row">\n              <td><label class="control-label" translatable="yes">One Time Password</label></td>\n              <td>\n                <input class="realms-op-field form-control realms-op-ot-password" type="password" value=""/>\n              </td>\n            </tr>\n            <tr>\n              <td colspan="3">\n                <div class="realms-op-error" hidden></div>\n                  <pre class="realms-op-diagnostics" hidden>\n                  </pre>\n                </div>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n      <div class="modal-footer">\n        <div class="realms-op-spinner spinner pull-left"></div>\n        <span class="realms-op-wait-message" translatable="yes" hidden>This may take a while</span>\n        <button class="btn btn-default realms-op-cancel" translatable="yes">Cancel</button>\n        <button class="btn btn-primary realms-op-apply" translatable="yes">Next</button>\n      </div>\n    </div>\n  </div>\n</div>\n';
} ]);
//# sourceMappingURL=domain.min.js.map