!function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports;
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0);
}([ function(e, t, n) {
    e.exports = n(1);
}, function(e, t, n) {
    "use strict";
    !function() {
        function e() {
            function e(e) {
                var t = r.defer();
                return r.all(e.call("/Tuned", "com.redhat.tuned.control", "is_running", []), e.call("/Tuned", "com.redhat.tuned.control", "active_profile", []), e.call("/Tuned", "com.redhat.tuned.control", "recommend_profile", [])).done(function(e, n, r) {
                    var o = e[0], i = o ? n[0] : "none", a = r[0];
                    t.resolve("running", i, a);
                }).fail(function(e) {
                    p.wait(function() {
                        p.exists ? "running" != p.state ? t.resolve("not-running") : t.reject(e) : t.resolve("not-installed");
                    });
                }), t.promise();
            }
            function c() {
                function t(e) {
                    e != h.attr("data-content") && (h.attr("data-content", e), h.data("bs.popover").tip().hasClass("in") && h.popover("show"));
                }
                var n = r.dbus("com.redhat.tuned", {
                    superuser: !0
                });
                e(n).done(function(e, n, r) {
                    var o;
                    o = l("not-installed" == e ? "Tuned is not available" : "not-running" == e ? "Tuned is not running" : "none" == n ? "Tuned is off" : n == r ? "This system is using the recommended profile" : "This system is using a custom profile"), 
                    f.text("running" == e ? n : l("none")), f.prop("disabled", "not-installed" == e), 
                    f.toggleClass("disabled", "not-installed" == e), t(o);
                }).fail(function(e) {
                    console.warn("failed to poll tuned", e), f.text("error"), f.prop("disabled", !0), 
                    f.toggleClass("disabled", !0), t(l("Communication with tuned has failed"));
                });
            }
            function d() {
                function t() {
                    var e, t = g;
                    return e = "none" == t ? v.call("/Tuned", "com.redhat.tuned.control", "disable", []).then(function(e) {
                        return e[0] ? void c() : (console.warn("Failed to disable tuned profile:", e), r.reject(l("Failed to disable tuned profile")));
                    }) : v.call("/Tuned", "com.redhat.tuned.control", "switch_profile", [ t ]).then(function(e) {
                        return e[0][0] ? void c() : (console.warn("Failed to switch profile:", e), r.reject(e[0][1] || l("Failed to switch profile")));
                    }), e.then(n);
                }
                function n() {
                    var e = "none" != g, t = e ? "start" : "stop";
                    return v.call("/Tuned", "com.redhat.tuned.control", t, []).then(function(n) {
                        return n[0] ? e && !p.enabled ? p.enable() : !e && p.enabled ? p.disable() : null : (console.warn("Failed to " + t + " tuned:", n), 
                        n[1] ? r.reject(n[1]) : e ? r.reject(r.format(l("Failed to enable tuned"))) : r.reject(r.format(l("Failed to disable tuned"))));
                    });
                }
                function i(e) {
                    g = e;
                }
                function d(e, n, r, c) {
                    g = n;
                    var d = {
                        title: l("Change Performance Profile"),
                        body: a.createElement(s.dialog, {
                            active_profile: n,
                            change_selected: i,
                            profiles: e
                        })
                    }, p = {
                        actions: [ {
                            clicked: t,
                            caption: l("Change Profile"),
                            style: "primary"
                        } ],
                        static_error: c
                    };
                    o.show_modal_dialog(d, p);
                }
                function u(e, t, n) {
                    var r = [];
                    n.forEach(function(n) {
                        var o, i;
                        "string" == typeof n ? (o = n, i = "") : (o = n[0], i = n[1]), "none" != o && r.push({
                            name: o,
                            title: o,
                            description: i,
                            active: o == e,
                            recommended: o == t
                        });
                    }), r.unshift({
                        name: "none",
                        title: l("None"),
                        description: l("Disable tuned"),
                        active: "none" == e,
                        recommended: "none" == t
                    }), d(r, e);
                }
                function f(e) {
                    d([], "none", !0, e);
                }
                function h() {
                    return v.call("/Tuned", "com.redhat.tuned.control", "profiles2", []).then(function(e) {
                        return e[0];
                    }, function() {
                        return v.call("/Tuned", "com.redhat.tuned.control", "profiles", []).then(function(e) {
                            return e[0];
                        });
                    });
                }
                function m() {
                    e(v).done(function(e, t, n) {
                        return "running" != e ? void f(l("Tuned has failed to start")) : void h().then(function(e) {
                            u(t, n, e);
                        }, f);
                    }).fail(f);
                }
                var v, g;
                p.start().done(function() {
                    c(), v = r.dbus("com.redhat.tuned", {
                        superuser: !0
                    }), m();
                }).fail(f);
            }
            var p = i.proxy("tuned.service"), u = t(n(12)), f = u.find(".action-trigger"), h = u.find("[data-toggle=popover]");
            return f.on("click", d), h.popover().on("click", c), c(), u[0];
        }
        var t = n(2), r = n(3), o = n(4), i = n(10), a = n(5), s = n(11), l = r.gettext;
        t(function() {
            var n = t("#system-info-performance");
            n.length && (n.find(".button-location").append(e()), n.removeAttr("hidden"));
        });
    }();
}, function(e, t) {
    e.exports = jQuery;
}, function(e, t) {
    e.exports = cockpit;
}, function(e, t, n) {
    "use strict";
    var r = n(3), o = n(5), i = r.gettext;
    n(6);
    var a = o.createClass({
        displayName: "DialogFooter",
        propTypes: {
            cancel_clicked: o.PropTypes.func,
            cancel_caption: o.PropTypes.string,
            actions: o.PropTypes.array,
            static_error: o.PropTypes.string,
            dialog_done: o.PropTypes.func
        },
        getInitialState: function() {
            return {
                action_in_progress: !1,
                action_in_progress_promise: null,
                action_progress_message: "",
                action_canceled: !1,
                error_message: null
            };
        },
        keyUpHandler: function(e) {
            27 == e.keyCode && (this.cancel_click(), e.stopPropagation());
        },
        componentDidMount: function() {
            document.body.classList.add("modal-in"), document.addEventListener("keyup", this.keyUpHandler.bind(this));
        },
        componentWillUnmount: function() {
            document.body.classList.remove("modal-in"), document.removeEventListener("keyup", this.keyUpHandler.bind(this));
        },
        update_progress: function(e) {
            this.setState({
                action_progress_message: e
            });
        },
        action_click: function(e, t) {
            if (!t || 0 === t.button) {
                var n = this;
                this.setState({
                    error_message: null,
                    action_progress_message: "",
                    action_in_progress: !0,
                    action_canceled: !1
                }), this.state.action_in_progress_promise = e(this.update_progress.bind(this)).done(function() {
                    n.setState({
                        action_in_progress: !1,
                        error_message: null
                    }), n.props.dialog_done && n.props.dialog_done(!0);
                }).fail(function(e) {
                    n.state.action_canceled && n.props.dialog_done && n.props.dialog_done(!1), console.warn(e), 
                    n.setState({
                        action_in_progress: !1,
                        error_message: e
                    });
                }).progress(this.update_progress.bind(this)), t && t.stopPropagation();
            }
        },
        cancel_click: function(e) {
            if (!e || 0 === e.button) {
                if (this.setState({
                    action_canceled: !0
                }), this.props.cancel_clicked && this.props.cancel_clicked(), this.state.action_in_progress && "cancel" in this.state.action_in_progress_promise) return void this.state.action_in_progress_promise.cancel();
                this.props.dialog_done && this.props.dialog_done(!1), e && e.stopPropagation();
            }
        },
        render: function() {
            var e;
            e = "cancel_caption" in this.props ? this.props.cancel_caption : i("Cancel");
            var t, n;
            this.state.action_in_progress && (n = "disabled", t = o.createElement("div", {
                className: "dialog-wait-ct pull-left"
            }, o.createElement("div", {
                className: "spinner spinner-sm"
            }), o.createElement("span", null, this.state.action_progress_message)));
            var r, a, s = this, l = this.props.actions.map(function(e) {
                var t;
                t = "caption" in e ? e.caption : i("Ok");
                var r = "btn-default", a = {
                    primary: "btn-primary",
                    danger: "btn-danger"
                };
                "style" in e && e.style in a && (r = a[e.style]), r = "btn " + r + " apply";
                var l = n || "disabled" in e && e.disabled;
                return o.createElement("button", {
                    key: t,
                    className: r,
                    onClick: s.action_click.bind(s, e.clicked),
                    disabled: l
                }, t);
            });
            return a = void 0 !== this.props.static_error && null !== this.props.static_error ? this.props.static_error : this.state.error_message, 
            a && (r = o.createElement("div", {
                className: "alert alert-danger dialog-error"
            }, o.createElement("span", {
                className: "fa fa-exclamation-triangle"
            }), o.createElement("span", null, a))), o.createElement("div", {
                className: "modal-footer"
            }, r, t, o.createElement("button", {
                className: "btn btn-default cancel",
                onClick: this.cancel_click.bind(this)
            }, e), l);
        }
    }), s = o.createClass({
        displayName: "Dialog",
        propTypes: {
            title: o.PropTypes.string.isRequired,
            no_backdrop: o.PropTypes.bool,
            body: o.PropTypes.element.isRequired,
            footer: o.PropTypes.element.isRequired
        },
        componentDidMount: function() {
            document.activeElement && document.activeElement.blur();
        },
        render: function() {
            var e;
            return this.props.no_backdrop || (e = o.createElement("div", {
                className: "modal-backdrop fade in"
            })), o.createElement("div", null, e, o.createElement("div", {
                className: "modal fade in dialog-ct-visible",
                tabindex: "-1"
            }, o.createElement("div", {
                className: "modal-dialog"
            }, o.createElement("div", {
                className: "modal-content"
            }, o.createElement("div", {
                className: "modal-header"
            }, o.createElement("h4", {
                className: "modal-title"
            }, this.props.title)), this.props.body, this.props.footer))));
        }
    }), l = function(e, t) {
        function n() {
            null !== d.props && void 0 !== d.props || (d.props = {}), d.props.footer = o.createElement(a, d.footerProps), 
            d.render();
        }
        var r = "cockpit_modal_dialog";
        if (document.getElementById(r)) return void console.warn("Unable to create nested dialog");
        var i = document.createElement("div");
        i.id = r, document.body.appendChild(i);
        var l, c = function(e) {
            l && l.apply(this, arguments), o.unmountComponentAtNode(i), i.remove();
        }, d = {};
        return d.props = null, d.footerProps = null, d.render = function() {
            d.props.footer = o.createElement(a, d.footerProps), o.render(o.createElement(s, d.props), i);
        }, d.setFooterProps = function(e) {
            e.static_error && console.warn(e.static_error), d.footerProps = e, null !== d.footerProps && void 0 !== d.footerProps || (d.footerProps = {}), 
            d.footerProps.dialog_done != c && (l = d.footerProps.dialog_done, d.footerProps.dialog_done = c), 
            n();
        }, d.setProps = function(e) {
            d.props = e, n();
        }, d.setFooterProps(t), d.setProps(e), d.render(), d;
    };
    e.exports = {
        Dialog: s,
        DialogFooter: a,
        show_modal_dialog: l
    };
}, function(e, t, n) {
    /*!
	 * react-lite.js v0.15.6
	 * (c) 2016 Jade Gu
	 * Released under the MIT License.
	 */
    !function(t, n) {
        e.exports = n();
    }(this, function() {
        "use strict";
        function e(e, t) {
            return {
                vtype: Pe,
                type: e,
                props: t,
                refs: Se
            };
        }
        function t(e, t) {
            return {
                vtype: _e,
                id: Y(),
                type: e,
                props: t
            };
        }
        function n(e, t) {
            return {
                vtype: we,
                id: Y(),
                type: e,
                props: t,
                refs: Se
            };
        }
        function r(e) {
            return {
                vtype: Ce,
                comment: e
            };
        }
        function o(e, t, n) {
            var r = e.vtype, o = null;
            return r ? r === Pe ? o = a(e, t, n) : r === we ? o = h(e, t, n) : r === _e ? o = d(e, t, n) : r === Ce && (o = document.createComment(e.comment)) : o = document.createTextNode(e), 
            o;
        }
        function i(e, t) {
            var n = e.vtype;
            n === Pe ? c(e, t) : n === we ? v(e, t) : n === _e && u(e, t);
        }
        function a(e, t, n) {
            var r = e.type, i = e.props, a = null;
            "svg" === r || n === ke ? (a = document.createElementNS(ke, r), n = ke) : a = document.createElement(r);
            var l = i.children, c = a.vchildren = [];
            Ge(l) ? V(l, s, c) : s(l, c);
            for (var d = 0, p = c.length; d < p; d++) a.appendChild(o(c[d], t, n));
            var u = r.indexOf("-") >= 0 || null != i.is;
            return G(a, i, u), P(e.refs, e.ref, a), a;
        }
        function s(e, t) {
            null != e && "boolean" != typeof e && (t[t.length] = e.vtype ? e : "" + e);
        }
        function l(e, t, n, r) {
            var a = e.props, c = e.type, d = t.props, u = a.dangerouslySetInnerHTML && a.dangerouslySetInnerHTML.__html, f = d.children, h = n.vchildren, v = n.childNodes, g = n.namespaceURI, y = c.indexOf("-") >= 0 || null != a.is, b = h.length, k = n.vchildren = [];
            Ge(f) ? V(f, s, k) : s(f, k);
            var x = k.length;
            if (null == u && b) {
                for (var w = null, C = Array(x), S = 0; S < b; S++) for (var T = h[S], E = 0; E < x; E++) if (!C[E]) {
                    var N = k[E];
                    if (T === N) {
                        C[E] = {
                            vnode: T,
                            node: v[S]
                        }, h[S] = null;
                        break;
                    }
                }
                e: for (var S = 0; S < b; S++) {
                    var T = h[S];
                    if (null !== T) {
                        for (var O = T.type, U = T.key, A = T.refs, R = v[S], E = 0; E < x; E++) if (!C[E]) {
                            var N = k[E];
                            if (N.type === O && N.key === U && N.refs === A) {
                                C[E] = {
                                    vnode: T,
                                    node: R
                                };
                                continue e;
                            }
                        }
                        w || (w = []), w[w.length] = R, i(T, R);
                    }
                }
                if (w) for (var S = 0, F = w.length; S < F; S++) n.removeChild(w[S]);
                for (var S = 0; S < x; S++) {
                    var N = k[S], M = C[S];
                    if (M) {
                        var T = M.vnode, D = M.node;
                        if (N !== T) {
                            var L = N.vtype;
                            L ? L === Pe ? D = l(T, N, D, r) : L === we ? D = m(T, N, D, r) : L === _e && (D = p(T, N, D, r)) : D.nodeValue = N;
                        }
                        var I = v[S];
                        I !== D && n.insertBefore(D, I || null);
                    } else {
                        var D = o(N, r, g);
                        n.insertBefore(D, v[S] || null);
                    }
                }
                Z(n, a, d, y);
            } else {
                Z(n, a, d, y);
                for (var S = 0; S < x; S++) n.appendChild(o(k[S], r, g));
            }
            return e.ref !== t.ref && (_(e.refs, e.ref), P(t.refs, t.ref, n)), n;
        }
        function c(e, t) {
            for (var n = e.props, r = t.vchildren, o = t.childNodes, a = 0, s = r.length; a < s; a++) i(r[a], o[a]);
            _(e.refs, e.ref), t.eventStore = t.vchildren = null;
            for (var l in n) n.hasOwnProperty(l) && Ze.test(l) && (l = T(l), Ne[l] === !0 && (t[l] = null));
        }
        function d(e, t, n) {
            var r = f(e, t), i = o(r, t, n);
            return i.cache = i.cache || {}, i.cache[e.id] = r, i;
        }
        function p(e, t, n, r) {
            var o = e.id, i = n.cache[o];
            delete n.cache[o];
            var a = f(t, r), s = k(i, a, n, r);
            return s.cache = s.cache || {}, s.cache[t.id] = a, s !== n && X(s.cache, n.cache), 
            s;
        }
        function u(e, t) {
            var n = e.id, r = t.cache[n];
            delete t.cache[n], i(r, t);
        }
        function f(e, t) {
            var n = e.type, o = e.props, i = g(t, n.contextTypes), a = n(o, i);
            if (a && a.render && (a = a.render()), null === a || a === !1) a = r("react-empty: " + Y()); else if (!a || !a.vtype) throw new Error("@" + n.name + "#render:You may have returned undefined, an array or some other invalid object");
            return a;
        }
        function h(e, t, n) {
            var r = e.type, i = e.props, a = e.id, s = g(t, r.contextTypes), l = new r(i, s), c = l.$updater, d = l.$cache;
            d.parentContext = t, c.isPending = !0, l.props = l.props || i, l.context = l.context || s, 
            l.componentWillMount && (l.componentWillMount(), l.state = c.getState());
            var p = y(l, t), u = o(p, p.context, n);
            return u.cache = u.cache || {}, u.cache[a] = l, d.vnode = p, d.node = u, d.isMounted = !0, 
            Te.push(l), P(e.refs, e.ref, l), u;
        }
        function m(e, t, n, r) {
            var o = e.id, i = n.cache[o], a = i.$updater, s = i.$cache, l = t.type, c = t.props, d = g(r, l.contextTypes);
            return delete n.cache[o], n.cache[t.id] = i, s.parentContext = r, i.componentWillReceiveProps && (a.isPending = !0, 
            i.componentWillReceiveProps(c, d), a.isPending = !1), a.emitUpdate(c, d), e.ref !== t.ref && (_(e.refs, e.ref), 
            P(t.refs, t.ref, i)), s.node;
        }
        function v(e, t) {
            var n = e.id, r = t.cache[n], o = r.$cache;
            delete t.cache[n], _(e.refs, e.ref), r.setState = r.forceUpdate = B, r.componentWillUnmount && r.componentWillUnmount(), 
            i(o.vnode, t), delete r.setState, o.isMounted = !1, o.node = o.parentContext = o.vnode = r.refs = r.context = null;
        }
        function g(e, t) {
            var n = {};
            if (!t || !e) return n;
            for (var r in t) t.hasOwnProperty(r) && (n[r] = e[r]);
            return n;
        }
        function y(e, t) {
            Se = e.refs;
            var n = e.render();
            if (null === n || n === !1) n = r("react-empty: " + Y()); else if (!n || !n.vtype) throw new Error("@" + e.constructor.name + "#render:You may have returned undefined, an array or some other invalid object");
            var o = Se = null;
            return e.getChildContext && (o = e.getChildContext()), o = o ? X(X({}, t), o) : t, 
            n.context = o, n;
        }
        function b() {
            var e = Te, t = e.length;
            if (t) {
                Te = [];
                for (var n = -1; t--; ) {
                    var r = e[++n], o = r.$updater;
                    r.componentDidMount && r.componentDidMount(), o.isPending = !1, o.emitUpdate();
                }
            }
        }
        function k(e, t, n, r) {
            var a = n;
            if (null == t) i(e, n), n.parentNode.removeChild(n); else if (e.type !== t.type || t.key !== e.key) i(e, n), 
            a = o(t, r, n.namespaceURI), n.parentNode.replaceChild(a, n); else if (e !== t) {
                var s = e.vtype;
                s === Pe ? a = l(e, t, n, r) : s === we ? a = m(e, t, n, r) : s === _e && (a = p(e, t, n, r));
            }
            return a;
        }
        function x() {
            return this;
        }
        function P(e, t, n) {
            e && null != t && n && (n.nodeName && !n.getDOMNode && (n.getDOMNode = x), z(t) ? t(n) : e[t] = n);
        }
        function _(e, t) {
            e && null != t && (z(t) ? t(null) : delete e[t]);
        }
        function w(e) {
            this.instance = e, this.pendingStates = [], this.pendingCallbacks = [], this.isPending = !1, 
            this.nextProps = this.nextContext = null, this.clearCallbacks = this.clearCallbacks.bind(this);
        }
        function C(e, t) {
            this.$updater = new w(this), this.$cache = {
                isMounted: !1
            }, this.props = e, this.state = {}, this.refs = {}, this.context = t;
        }
        function S(e, t, n, r, o) {
            var i = !0;
            if (e.shouldComponentUpdate && (i = e.shouldComponentUpdate(t, n, r)), i === !1) return e.props = t, 
            e.state = n, void (e.context = r || {});
            var a = e.$cache;
            a.props = t, a.state = n, a.context = r || {}, e.forceUpdate(o);
        }
        function T(e) {
            return e = "onDoubleClick" === e ? "ondblclick" : e, e.toLowerCase();
        }
        function E(e, t, n) {
            if (t = T(t), 1 === Ne[t]) return void (e[t] = n);
            var r = e.eventStore || (e.eventStore = {});
            r[t] = n, Oe[t] || (document.addEventListener(t.substr(2), O), Oe[t] = !0);
            var o = e.nodeName;
            "onchange" !== t || "INPUT" !== o && "TEXTAREA" !== o || E(e, "oninput", n);
        }
        function N(e, t) {
            if (t = T(t), 1 === Ne[t]) return void (e[t] = null);
            var n = e.eventStore || (e.eventStore = {});
            delete n[t];
            var r = e.nodeName;
            "onchange" !== t || "INPUT" !== r && "TEXTAREA" !== r || delete n.oninput;
        }
        function O(e) {
            var t = e.target, n = e.type, r = "on" + n, o = void 0;
            for (Ee.isPending = !0; t; ) {
                var i = t, a = i.eventStore, s = a && a[r];
                if (s) {
                    if (o || (o = U(e)), o.currentTarget = t, s.call(t, o), o.$cancalBubble) break;
                    t = t.parentNode;
                } else t = t.parentNode;
            }
            Ee.isPending = !1, Ee.batchUpdate();
        }
        function U(e) {
            var t = {}, n = function() {
                return t.$cancalBubble = !0;
            };
            t.nativeEvent = e;
            for (var r in e) "function" != typeof e[r] ? t[r] = e[r] : "stopPropagation" === r || "stopImmediatePropagation" === r ? t[r] = n : t[r] = e[r].bind(e);
            return t;
        }
        function A(e, t) {
            for (var n in t) t.hasOwnProperty(n) && D(e, n, t[n]);
        }
        function R(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = "");
        }
        function F(e, t, n) {
            if (t !== n) {
                if (!n && t) return void R(e, t);
                if (n && !t) return void A(e, n);
                var r = {};
                for (var o in t) t.hasOwnProperty(o) && (r[o] = !0, t[o] !== n[o] && D(e, o, n[o]));
                for (var o in n) n.hasOwnProperty(o) && r[o] !== !0 && t[o] !== n[o] && D(e, o, n[o]);
            }
        }
        function M(e, t) {
            return e + t.charAt(0).toUpperCase() + t.substring(1);
        }
        function D(e, t, n) {
            return !Ue[t] && Re.test(n) ? void (e[t] = n + "px") : ("float" === t && (t = "cssFloat"), 
            null != n && "boolean" != typeof n || (n = ""), void (e[t] = n));
        }
        function L(e) {
            var t = e.props, n = e.attrNS, r = e.domAttrs, o = e.domProps;
            for (var i in t) if (t.hasOwnProperty(i)) {
                var a = t[i];
                Ie[i] = {
                    attributeName: r.hasOwnProperty(i) ? r[i] : i.toLowerCase(),
                    propertyName: o.hasOwnProperty(i) ? o[i] : i,
                    attributeNamespace: n.hasOwnProperty(i) ? n[i] : null,
                    mustUseProperty: I(a, je),
                    hasBooleanValue: I(a, qe),
                    hasNumericValue: I(a, ze),
                    hasPositiveNumericValue: I(a, Be),
                    hasOverloadedBooleanValue: I(a, $e)
                };
            }
        }
        function I(e, t) {
            return (e & t) === t;
        }
        function j(e, t, n) {
            var r = Ie.hasOwnProperty(t) && Ie[t];
            if (r) if (null == n || r.hasBooleanValue && !n || r.hasNumericValue && isNaN(n) || r.hasPositiveNumericValue && n < 1 || r.hasOverloadedBooleanValue && n === !1) q(e, t); else if (r.mustUseProperty) e[r.propertyName] = n; else {
                var o = r.attributeName, i = r.attributeNamespace;
                i ? e.setAttributeNS(i, o, "" + n) : r.hasBooleanValue || r.hasOverloadedBooleanValue && n === !0 ? e.setAttribute(o, "") : e.setAttribute(o, "" + n);
            } else Le(t) && De.test(t) && (null == n ? e.removeAttribute(t) : e.setAttribute(t, "" + n));
        }
        function q(e, t) {
            var n = Ie.hasOwnProperty(t) && Ie[t];
            n ? n.mustUseProperty ? e[n.propertyName] = !n.hasBooleanValue && "" : e.removeAttribute(n.attributeName) : Le(t) && e.removeAttribute(t);
        }
        function z(e) {
            return "function" == typeof e;
        }
        function B() {}
        function $(e) {
            return e;
        }
        function H(e, t) {
            return function() {
                return e.apply(this, arguments), t.apply(this, arguments);
            };
        }
        function V(e, t, n) {
            for (var r = e.length, o = -1; r--; ) {
                var i = e[++o];
                Ge(i) ? V(i, t, n) : t(i, n);
            }
        }
        function W(e, t) {
            for (var n = 0, r = e.length; n < r; n++) t(e[n], n);
        }
        function X(e) {
            var t, n;
            for (n = 1; n < arguments.length; n++) {
                t = arguments[n];
            }
            var r = Object(t);
            if (!r) return e;
            for (var o = Object.keys(r), i = o.length; i--; ) void 0 !== r[o[i]] && (e[o[i]] = r[o[i]]);
            return e;
        }
        function Y() {
            return ++Je;
        }
        function G(e, t, n) {
            for (var r in t) if (t.hasOwnProperty(r) && "children" !== r) {
                var o = t[r];
                Ze.test(r) ? E(e, r, o) : "style" === r ? A(e.style, o) : "dangerouslySetInnerHTML" === r ? o && null != o.__html && (e.innerHTML = o.__html) : n ? null == o ? e.removeAttribute(r) : e.setAttribute(r, "" + o) : j(e, r, o);
            }
        }
        function J(e, t, n, r, o) {
            if ("value" !== e && "checked" !== e || (t = r[e]), n !== t) {
                if (void 0 === n) return void (Ze.test(e) ? N(r, e) : "style" === e ? R(r.style, t) : "dangerouslySetInnerHTML" === e ? r.innerHTML = "" : o ? r.removeAttribute(e) : q(r, e));
                if (Ze.test(e)) E(r, e, n); else if ("style" === e) F(r.style, t, n); else if ("dangerouslySetInnerHTML" === e) {
                    var i = t && t.__html, a = n && n.__html;
                    null != a && a !== i && (r.innerHTML = a);
                } else o ? null == n ? r.removeAttribute(e) : r.setAttribute(e, "" + n) : j(r, e, n);
            }
        }
        function Z(e, t, n, r) {
            var o = {
                children: !0
            };
            for (var i in t) t.hasOwnProperty(i) && "children" !== i && (o[i] = !0, J(i, t[i], n[i], e, r));
            for (var i in n) n.hasOwnProperty(i) && o[i] !== !0 && J(i, t[i], n[i], e, r);
        }
        function K(e, t, n, r) {
            if (!e.vtype) throw new Error("cannot render " + e + " to container");
            var i = t[xe] || (t[xe] = Y()), a = Ke[i];
            if (a) return void (a === !0 ? Ke[i] = a = [ e, n, r ] : (a[0] = e, a[2] = r, n && (a[1] = a[1] ? H(a[1], n) : n)));
            Ke[i] = !0;
            var s = null, l = null;
            if (s = Qe[i]) l = k(s, e, t.firstChild, r); else {
                l = o(e, r, t.namespaceURI);
                for (var c = null; c = t.lastChild; ) t.removeChild(c);
                t.appendChild(l);
            }
            Qe[i] = e;
            var d = Ee.isPending;
            Ee.isPending = !0, b(), a = Ke[i], delete Ke[i];
            var p = null;
            return Ge(a) ? p = K(a[0], t, a[1], a[2]) : e.vtype === Pe ? p = l : e.vtype === we && (p = l.cache[e.id]), 
            d || (Ee.isPending = !1, Ee.batchUpdate()), n && n.call(p), p;
        }
        function Q(e, t, n) {
            return K(e, t, n);
        }
        function ee(e, t, n, r) {
            var o = e.vnode ? e.vnode.context : e.$cache.parentContext;
            return K(t, n, r, o);
        }
        function te(e) {
            if (!e.nodeName) throw new Error("expect node");
            var t = e[xe], n = null;
            return !!(n = Qe[t]) && (i(n, e.firstChild), e.removeChild(e.firstChild), delete Qe[t], 
            !0);
        }
        function ne(e) {
            if (null == e) return null;
            if (e.nodeName) return e;
            var t = e;
            if (t.getDOMNode && t.$cache.isMounted) return t.getDOMNode();
            throw new Error("findDOMNode can not find Node");
        }
        function re(e) {
            return null != e && !!e.vtype;
        }
        function oe(e, t) {
            for (var n = e.type, r = e.key, o = e.ref, i = X(X({
                key: r,
                ref: o
            }, e.props), t), a = arguments.length, s = Array(a > 2 ? a - 2 : 0), l = 2; l < a; l++) s[l - 2] = arguments[l];
            var c = ae.apply(void 0, [ n, i ].concat(s));
            return c.ref === e.ref && (c.refs = e.refs), c;
        }
        function ie(e) {
            var t = function() {
                for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return ae.apply(void 0, [ e ].concat(n));
            };
            return t.type = e, t;
        }
        function ae(r, o, i) {
            var a = null, s = typeof r;
            if ("string" === s) a = e; else {
                if ("function" !== s) throw new Error("React.createElement: unexpect type [ " + r + " ]");
                a = r.prototype && "function" == typeof r.prototype.forceUpdate ? n : t;
            }
            var l = null, c = null, d = {}, p = null;
            if (null != o) for (var u in o) o.hasOwnProperty(u) && ("key" === u ? void 0 !== o.key && (l = "" + o.key) : "ref" === u ? void 0 !== o.ref && (c = o.ref) : void 0 !== (p = o[u]) && (d[u] = p));
            var f = r.defaultProps;
            if (f) for (var u in f) void 0 === d[u] && (d[u] = f[u]);
            var h = arguments.length, m = i;
            if (h > 3) {
                m = Array(h - 2);
                for (var v = 2; v < h; v++) m[v - 2] = arguments[v];
            }
            void 0 !== m && (d.children = m);
            var g = a(r, d);
            return g.key = l, g.ref = c, g;
        }
        function se(e) {
            if (re(e)) return e;
            throw new Error("expect only one child");
        }
        function le(e, t, n) {
            if (null == e) return e;
            var r = 0;
            Ge(e) ? V(e, function(e) {
                t.call(n, e, r++);
            }) : t.call(n, e, r);
        }
        function ce(e, t, n) {
            if (null == e) return e;
            var r = [], o = {};
            le(e, function(e, i) {
                var a = {};
                a.child = t.call(n, e, i) || e, a.isEqual = a.child === e;
                var s = a.key = ue(e, i);
                o.hasOwnProperty(s) ? o[s] += 1 : o[s] = 0, a.index = o[s], r.push(a);
            });
            var i = [];
            return W(r, function(e) {
                var t = e.child, n = e.key, r = e.index, a = e.isEqual;
                if (null != t && "boolean" != typeof t) {
                    if (!re(t) || null == n) return void i.push(t);
                    0 !== o[n] && (n += ":" + r), a || (n = fe(t.key || "") + "/" + n), t = oe(t, {
                        key: n
                    }), i.push(t);
                }
            }), i;
        }
        function de(e) {
            var t = 0;
            return le(e, function() {
                t++;
            }), t;
        }
        function pe(e) {
            return ce(e, $) || [];
        }
        function ue(e, t) {
            var n = void 0;
            return n = re(e) && "string" == typeof e.key ? ".$" + e.key : "." + t.toString(36);
        }
        function fe(e) {
            return ("" + e).replace(it, "//");
        }
        function he(e, t) {
            W(e, function(e) {
                e && (Ge(e.mixins) && he(e.mixins, t), t(e));
            });
        }
        function me(e, t) {
            for (var n in t) if (t.hasOwnProperty(n)) {
                var r = t[n];
                if ("getInitialState" !== n) {
                    var o = e[n];
                    z(o) && z(r) ? e[n] = H(o, r) : e[n] = r;
                } else e.$getInitialStates.push(r);
            }
        }
        function ve(e, t) {
            X(e.propTypes, t.propTypes), X(e.contextTypes, t.contextTypes), X(e, t.statics), 
            z(t.getDefaultProps) && X(e.defaultProps, t.getDefaultProps());
        }
        function ge(e, t) {
            for (var n in t) t.hasOwnProperty(n) && z(t[n]) && (e[n] = t[n].bind(e));
        }
        function ye() {
            var e = this, t = {}, n = this.setState;
            return this.setState = st, W(this.$getInitialStates, function(n) {
                z(n) && X(t, n.call(e));
            }), this.setState = n, t;
        }
        function be(e) {
            function t(n, r) {
                C.call(this, n, r), this.constructor = t, e.autobind !== !1 && ge(this, t.prototype), 
                this.state = this.getInitialState() || this.state;
            }
            if (!z(e.render)) throw new Error("createClass: spec.render is not function");
            var n = e.mixins || [], r = n.concat(e);
            e.mixins = null, t.displayName = e.displayName, t.contextTypes = {}, t.propTypes = {}, 
            t.defaultProps = {};
            var o = t.prototype = new st();
            return o.$getInitialStates = [], he(r, function(e) {
                me(o, e), ve(t, e);
            }), o.getInitialState = ye, e.mixins = n, t;
        }
        var ke = "http://www.w3.org/2000/svg", xe = "liteid", Pe = 2, _e = 3, we = 4, Ce = 5, Se = null, Te = [], Ee = {
            updaters: [],
            isPending: !1,
            add: function(e) {
                this.updaters.push(e);
            },
            batchUpdate: function() {
                if (!this.isPending) {
                    this.isPending = !0;
                    for (var e = this.updaters, t = void 0; t = e.pop(); ) t.updateComponent();
                    this.isPending = !1;
                }
            }
        };
        w.prototype = {
            emitUpdate: function(e, t) {
                this.nextProps = e, this.nextContext = t, e || !Ee.isPending ? this.updateComponent() : Ee.add(this);
            },
            updateComponent: function() {
                var e = this.instance, t = this.pendingStates, n = this.nextProps, r = this.nextContext;
                (n || t.length > 0) && (n = n || e.props, r = r || e.context, this.nextProps = this.nextContext = null, 
                S(e, n, this.getState(), r, this.clearCallbacks));
            },
            addState: function(e) {
                e && (this.pendingStates.push(e), this.isPending || this.emitUpdate());
            },
            replaceState: function(e) {
                var t = this.pendingStates;
                t.pop(), t.push([ e ]);
            },
            getState: function() {
                var e = this.instance, t = this.pendingStates, n = e.state, r = e.props;
                return t.length && (n = X({}, n), W(t, function(t) {
                    return Ge(t) ? void (n = X({}, t[0])) : (z(t) && (t = t.call(e, n, r)), void X(n, t));
                }), t.length = 0), n;
            },
            clearCallbacks: function() {
                var e = this.pendingCallbacks, t = this.instance;
                e.length > 0 && (this.pendingCallbacks = [], W(e, function(e) {
                    return e.call(t);
                }));
            },
            addCallback: function(e) {
                z(e) && this.pendingCallbacks.push(e);
            }
        }, C.prototype = {
            constructor: C,
            forceUpdate: function(e) {
                var t = this.$updater, n = this.$cache, r = this.props, o = this.state, i = this.context;
                if (!t.isPending && n.isMounted) {
                    var a = n.props || r, s = n.state || o, l = n.context || {}, c = n.parentContext, d = n.node, p = n.vnode;
                    n.props = n.state = n.context = null, t.isPending = !0, this.componentWillUpdate && this.componentWillUpdate(a, s, l), 
                    this.state = s, this.props = a, this.context = l;
                    var u = y(this, c), f = k(p, u, d, u.context);
                    f !== d && (f.cache = f.cache || {}, X(f.cache, d.cache)), n.vnode = u, n.node = f, 
                    b(), this.componentDidUpdate && this.componentDidUpdate(r, o, i), e && e.call(this), 
                    t.isPending = !1, t.emitUpdate();
                }
            },
            setState: function(e, t) {
                var n = this.$updater;
                n.addCallback(t), n.addState(e);
            },
            replaceState: function(e, t) {
                var n = this.$updater;
                n.addCallback(t), n.replaceState(e);
            },
            getDOMNode: function() {
                var e = this.$cache.node;
                return e && "#comment" === e.nodeName ? null : e;
            },
            isMounted: function() {
                return this.$cache.isMounted;
            }
        };
        var Ne = {
            onmouseleave: 1,
            onmouseenter: 1,
            onload: 1,
            onunload: 1,
            onscroll: 1,
            onfocus: 1,
            onblur: 1,
            onrowexit: 1,
            onbeforeunload: 1,
            onstop: 1,
            ondragdrop: 1,
            ondragenter: 1,
            ondragexit: 1,
            ondraggesture: 1,
            ondragover: 1,
            oncontextmenu: 1
        }, Oe = {}, Ue = {
            animationIterationCount: 1,
            borderImageOutset: 1,
            borderImageSlice: 1,
            borderImageWidth: 1,
            boxFlex: 1,
            boxFlexGroup: 1,
            boxOrdinalGroup: 1,
            columnCount: 1,
            flex: 1,
            flexGrow: 1,
            flexPositive: 1,
            flexShrink: 1,
            flexNegative: 1,
            flexOrder: 1,
            gridRow: 1,
            gridColumn: 1,
            fontWeight: 1,
            lineClamp: 1,
            lineHeight: 1,
            opacity: 1,
            order: 1,
            orphans: 1,
            tabSize: 1,
            widows: 1,
            zIndex: 1,
            zoom: 1,
            fillOpacity: 1,
            floodOpacity: 1,
            stopOpacity: 1,
            strokeDasharray: 1,
            strokeDashoffset: 1,
            strokeMiterlimit: 1,
            strokeOpacity: 1,
            strokeWidth: 1
        }, Ae = [ "Webkit", "ms", "Moz", "O" ];
        Object.keys(Ue).forEach(function(e) {
            Ae.forEach(function(t) {
                Ue[M(t, e)] = 1;
            });
        });
        var Re = /^-?\d+(\.\d+)?$/, Fe = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Me = Fe + "\\-.0-9\\uB7\\u0300-\\u036F\\u203F-\\u2040", De = new RegExp("^[" + Fe + "][" + Me + "]*$"), Le = RegExp.prototype.test.bind(new RegExp("^(data|aria)-[" + Me + "]*$")), Ie = {}, je = 1, qe = 4, ze = 8, Be = 24, $e = 32, He = {
            props: {
                accept: 0,
                acceptCharset: 0,
                accessKey: 0,
                action: 0,
                allowFullScreen: qe,
                allowTransparency: 0,
                alt: 0,
                async: qe,
                autoComplete: 0,
                autoFocus: qe,
                autoPlay: qe,
                capture: qe,
                cellPadding: 0,
                cellSpacing: 0,
                charSet: 0,
                challenge: 0,
                checked: je | qe,
                cite: 0,
                classID: 0,
                className: 0,
                cols: Be,
                colSpan: 0,
                content: 0,
                contentEditable: 0,
                contextMenu: 0,
                controls: qe,
                coords: 0,
                crossOrigin: 0,
                data: 0,
                dateTime: 0,
                default: qe,
                defaultValue: je,
                defaultChecked: je | qe,
                defer: qe,
                dir: 0,
                disabled: qe,
                download: $e,
                draggable: 0,
                encType: 0,
                form: 0,
                formAction: 0,
                formEncType: 0,
                formMethod: 0,
                formNoValidate: qe,
                formTarget: 0,
                frameBorder: 0,
                headers: 0,
                height: 0,
                hidden: qe,
                high: 0,
                href: 0,
                hrefLang: 0,
                htmlFor: 0,
                httpEquiv: 0,
                icon: 0,
                id: 0,
                inputMode: 0,
                integrity: 0,
                is: 0,
                keyParams: 0,
                keyType: 0,
                kind: 0,
                label: 0,
                lang: 0,
                list: 0,
                loop: qe,
                low: 0,
                manifest: 0,
                marginHeight: 0,
                marginWidth: 0,
                max: 0,
                maxLength: 0,
                media: 0,
                mediaGroup: 0,
                method: 0,
                min: 0,
                minLength: 0,
                multiple: je | qe,
                muted: je | qe,
                name: 0,
                nonce: 0,
                noValidate: qe,
                open: qe,
                optimum: 0,
                pattern: 0,
                placeholder: 0,
                poster: 0,
                preload: 0,
                profile: 0,
                radioGroup: 0,
                readOnly: qe,
                rel: 0,
                required: qe,
                reversed: qe,
                role: 0,
                rows: Be,
                rowSpan: ze,
                sandbox: 0,
                scope: 0,
                scoped: qe,
                scrolling: 0,
                seamless: qe,
                selected: je | qe,
                shape: 0,
                size: Be,
                sizes: 0,
                span: Be,
                spellCheck: 0,
                src: 0,
                srcDoc: 0,
                srcLang: 0,
                srcSet: 0,
                start: ze,
                step: 0,
                style: 0,
                summary: 0,
                tabIndex: 0,
                target: 0,
                title: 0,
                type: 0,
                useMap: 0,
                value: je,
                width: 0,
                wmode: 0,
                wrap: 0,
                about: 0,
                datatype: 0,
                inlist: 0,
                prefix: 0,
                property: 0,
                resource: 0,
                typeof: 0,
                vocab: 0,
                autoCapitalize: 0,
                autoCorrect: 0,
                autoSave: 0,
                color: 0,
                itemProp: 0,
                itemScope: qe,
                itemType: 0,
                itemID: 0,
                itemRef: 0,
                results: 0,
                security: 0,
                unselectable: 0
            },
            attrNS: {},
            domAttrs: {
                acceptCharset: "accept-charset",
                className: "class",
                htmlFor: "for",
                httpEquiv: "http-equiv"
            },
            domProps: {}
        }, Ve = "http://www.w3.org/1999/xlink", We = "http://www.w3.org/XML/1998/namespace", Xe = {
            accentHeight: "accent-height",
            accumulate: 0,
            additive: 0,
            alignmentBaseline: "alignment-baseline",
            allowReorder: "allowReorder",
            alphabetic: 0,
            amplitude: 0,
            arabicForm: "arabic-form",
            ascent: 0,
            attributeName: "attributeName",
            attributeType: "attributeType",
            autoReverse: "autoReverse",
            azimuth: 0,
            baseFrequency: "baseFrequency",
            baseProfile: "baseProfile",
            baselineShift: "baseline-shift",
            bbox: 0,
            begin: 0,
            bias: 0,
            by: 0,
            calcMode: "calcMode",
            capHeight: "cap-height",
            clip: 0,
            clipPath: "clip-path",
            clipRule: "clip-rule",
            clipPathUnits: "clipPathUnits",
            colorInterpolation: "color-interpolation",
            colorInterpolationFilters: "color-interpolation-filters",
            colorProfile: "color-profile",
            colorRendering: "color-rendering",
            contentScriptType: "contentScriptType",
            contentStyleType: "contentStyleType",
            cursor: 0,
            cx: 0,
            cy: 0,
            d: 0,
            decelerate: 0,
            descent: 0,
            diffuseConstant: "diffuseConstant",
            direction: 0,
            display: 0,
            divisor: 0,
            dominantBaseline: "dominant-baseline",
            dur: 0,
            dx: 0,
            dy: 0,
            edgeMode: "edgeMode",
            elevation: 0,
            enableBackground: "enable-background",
            end: 0,
            exponent: 0,
            externalResourcesRequired: "externalResourcesRequired",
            fill: 0,
            fillOpacity: "fill-opacity",
            fillRule: "fill-rule",
            filter: 0,
            filterRes: "filterRes",
            filterUnits: "filterUnits",
            floodColor: "flood-color",
            floodOpacity: "flood-opacity",
            focusable: 0,
            fontFamily: "font-family",
            fontSize: "font-size",
            fontSizeAdjust: "font-size-adjust",
            fontStretch: "font-stretch",
            fontStyle: "font-style",
            fontVariant: "font-variant",
            fontWeight: "font-weight",
            format: 0,
            from: 0,
            fx: 0,
            fy: 0,
            g1: 0,
            g2: 0,
            glyphName: "glyph-name",
            glyphOrientationHorizontal: "glyph-orientation-horizontal",
            glyphOrientationVertical: "glyph-orientation-vertical",
            glyphRef: "glyphRef",
            gradientTransform: "gradientTransform",
            gradientUnits: "gradientUnits",
            hanging: 0,
            horizAdvX: "horiz-adv-x",
            horizOriginX: "horiz-origin-x",
            ideographic: 0,
            imageRendering: "image-rendering",
            in: 0,
            in2: 0,
            intercept: 0,
            k: 0,
            k1: 0,
            k2: 0,
            k3: 0,
            k4: 0,
            kernelMatrix: "kernelMatrix",
            kernelUnitLength: "kernelUnitLength",
            kerning: 0,
            keyPoints: "keyPoints",
            keySplines: "keySplines",
            keyTimes: "keyTimes",
            lengthAdjust: "lengthAdjust",
            letterSpacing: "letter-spacing",
            lightingColor: "lighting-color",
            limitingConeAngle: "limitingConeAngle",
            local: 0,
            markerEnd: "marker-end",
            markerMid: "marker-mid",
            markerStart: "marker-start",
            markerHeight: "markerHeight",
            markerUnits: "markerUnits",
            markerWidth: "markerWidth",
            mask: 0,
            maskContentUnits: "maskContentUnits",
            maskUnits: "maskUnits",
            mathematical: 0,
            mode: 0,
            numOctaves: "numOctaves",
            offset: 0,
            opacity: 0,
            operator: 0,
            order: 0,
            orient: 0,
            orientation: 0,
            origin: 0,
            overflow: 0,
            overlinePosition: "overline-position",
            overlineThickness: "overline-thickness",
            paintOrder: "paint-order",
            panose1: "panose-1",
            pathLength: "pathLength",
            patternContentUnits: "patternContentUnits",
            patternTransform: "patternTransform",
            patternUnits: "patternUnits",
            pointerEvents: "pointer-events",
            points: 0,
            pointsAtX: "pointsAtX",
            pointsAtY: "pointsAtY",
            pointsAtZ: "pointsAtZ",
            preserveAlpha: "preserveAlpha",
            preserveAspectRatio: "preserveAspectRatio",
            primitiveUnits: "primitiveUnits",
            r: 0,
            radius: 0,
            refX: "refX",
            refY: "refY",
            renderingIntent: "rendering-intent",
            repeatCount: "repeatCount",
            repeatDur: "repeatDur",
            requiredExtensions: "requiredExtensions",
            requiredFeatures: "requiredFeatures",
            restart: 0,
            result: 0,
            rotate: 0,
            rx: 0,
            ry: 0,
            scale: 0,
            seed: 0,
            shapeRendering: "shape-rendering",
            slope: 0,
            spacing: 0,
            specularConstant: "specularConstant",
            specularExponent: "specularExponent",
            speed: 0,
            spreadMethod: "spreadMethod",
            startOffset: "startOffset",
            stdDeviation: "stdDeviation",
            stemh: 0,
            stemv: 0,
            stitchTiles: "stitchTiles",
            stopColor: "stop-color",
            stopOpacity: "stop-opacity",
            strikethroughPosition: "strikethrough-position",
            strikethroughThickness: "strikethrough-thickness",
            string: 0,
            stroke: 0,
            strokeDasharray: "stroke-dasharray",
            strokeDashoffset: "stroke-dashoffset",
            strokeLinecap: "stroke-linecap",
            strokeLinejoin: "stroke-linejoin",
            strokeMiterlimit: "stroke-miterlimit",
            strokeOpacity: "stroke-opacity",
            strokeWidth: "stroke-width",
            surfaceScale: "surfaceScale",
            systemLanguage: "systemLanguage",
            tableValues: "tableValues",
            targetX: "targetX",
            targetY: "targetY",
            textAnchor: "text-anchor",
            textDecoration: "text-decoration",
            textRendering: "text-rendering",
            textLength: "textLength",
            to: 0,
            transform: 0,
            u1: 0,
            u2: 0,
            underlinePosition: "underline-position",
            underlineThickness: "underline-thickness",
            unicode: 0,
            unicodeBidi: "unicode-bidi",
            unicodeRange: "unicode-range",
            unitsPerEm: "units-per-em",
            vAlphabetic: "v-alphabetic",
            vHanging: "v-hanging",
            vIdeographic: "v-ideographic",
            vMathematical: "v-mathematical",
            values: 0,
            vectorEffect: "vector-effect",
            version: 0,
            vertAdvY: "vert-adv-y",
            vertOriginX: "vert-origin-x",
            vertOriginY: "vert-origin-y",
            viewBox: "viewBox",
            viewTarget: "viewTarget",
            visibility: 0,
            widths: 0,
            wordSpacing: "word-spacing",
            writingMode: "writing-mode",
            x: 0,
            xHeight: "x-height",
            x1: 0,
            x2: 0,
            xChannelSelector: "xChannelSelector",
            xlinkActuate: "xlink:actuate",
            xlinkArcrole: "xlink:arcrole",
            xlinkHref: "xlink:href",
            xlinkRole: "xlink:role",
            xlinkShow: "xlink:show",
            xlinkTitle: "xlink:title",
            xlinkType: "xlink:type",
            xmlBase: "xml:base",
            xmlLang: "xml:lang",
            xmlSpace: "xml:space",
            y: 0,
            y1: 0,
            y2: 0,
            yChannelSelector: "yChannelSelector",
            z: 0,
            zoomAndPan: "zoomAndPan"
        }, Ye = {
            props: {},
            attrNS: {
                xlinkActuate: Ve,
                xlinkArcrole: Ve,
                xlinkHref: Ve,
                xlinkRole: Ve,
                xlinkShow: Ve,
                xlinkTitle: Ve,
                xlinkType: Ve,
                xmlBase: We,
                xmlLang: We,
                xmlSpace: We
            },
            domAttrs: {},
            domProps: {}
        };
        Object.keys(Xe).map(function(e) {
            Ye.props[e] = 0, Xe[e] && (Ye.domAttrs[e] = Xe[e]);
        }), L(He), L(Ye);
        var Ge = Array.isArray, Je = 0, Ze = /^on/i;
        Object.freeze || (Object.freeze = $);
        var Ke = {}, Qe = {}, et = Object.freeze({
            render: Q,
            unstable_renderSubtreeIntoContainer: ee,
            unmountComponentAtNode: te,
            findDOMNode: ne
        }), tt = "a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|text|tspan", nt = {};
        W(tt.split("|"), function(e) {
            nt[e] = ie(e);
        });
        var rt = function e() {
            return e;
        };
        rt.isRequired = rt;
        var ot = {
            array: rt,
            bool: rt,
            func: rt,
            number: rt,
            object: rt,
            string: rt,
            any: rt,
            arrayOf: rt,
            element: rt,
            instanceOf: rt,
            node: rt,
            objectOf: rt,
            oneOf: rt,
            oneOfType: rt,
            shape: rt
        }, it = /\/(?!\/)/g, at = Object.freeze({
            only: se,
            forEach: le,
            map: ce,
            count: de,
            toArray: pe
        }), st = function() {};
        st.prototype = C.prototype;
        var lt = X({
            version: "0.15.1",
            cloneElement: oe,
            isValidElement: re,
            createElement: ae,
            createFactory: ie,
            Component: C,
            createClass: be,
            Children: at,
            PropTypes: ot,
            DOM: nt,
            __spread: X
        }, et);
        return lt.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = et, lt;
    });
}, function(e, t) {}, , , , function(e, t, n) {
    "use strict";
    !function() {
        function t(e, t) {
            e.wait(function() {
                e.valid && t();
            });
        }
        function r(e) {
            a || (i = s.dbus("org.freedesktop.systemd1", {
                superuser: "try"
            }), a = i.proxy("org.freedesktop.systemd1.Manager", "/org/freedesktop/systemd1"), 
            t(a, function() {
                a.Subscribe().fail(function(e) {
                    "org.freedesktop.systemd1.AlreadySubscribed" != e.name && "org.freedesktop.DBus.Error.FileExists" != e.name && console.warn("Subscribing to systemd signals failed", e);
                });
            })), t(a, e);
        }
        function o(e) {
            function n() {
                b.exists = "not-found" != k.LoadState || "inactive" != k.ActiveState, "activating" == k.ActiveState ? b.state = "starting" : "deactivating" == k.ActiveState ? b.state = "stopping" : "active" == k.ActiveState || "reloading" == k.ActiveState ? b.state = "running" : "failed" == k.ActiveState ? b.state = "failed" : "inactive" == k.ActiveState && b.exists ? b.state = "stopped" : b.state = void 0, 
                "enabled" == k.UnitFileState || "linked" == k.UnitFileState ? b.enabled = !0 : "disabled" == k.UnitFileState || "masked" == k.UnitFileState ? b.enabled = !1 : b.enabled = void 0, 
                b.unit = k, b.dispatchEvent("changed"), P.resolve();
            }
            function o() {
                b.service = x, b.dispatchEvent("changed");
            }
            function l() {
                function e(e, t) {
                    i.call(e, "org.freedesktop.DBus.Properties", "GetAll", [ t ]).fail(function(e) {
                        console.log(e);
                    }).done(function(e) {
                        var n = {};
                        for (var r in e[0]) n[r] = e[0][r].v;
                        var o = {};
                        o[t] = n;
                        var a = {};
                        a[k.path] = o, i.notify(a);
                    });
                }
                k && x && (e(k.path, "org.freedesktop.systemd1.Unit"), e(x.path, "org.freedesktop.systemd1.Service"));
            }
            function c(t, n, r, o, i) {
                o == e && l();
            }
            function d(e) {
                P.promise.then(e);
            }
            function p(e, t) {
                return i.call("/org/freedesktop/systemd1", "org.freedesktop.systemd1.Manager", e, t);
            }
            function u(e, t) {
                var n = s.defer();
                return p(e, t).done(function(e) {
                    var t = e[0];
                    _[t] = n;
                }).fail(function(e) {
                    n.reject(e);
                }), n.promise();
            }
            function f(e, t) {
                return p(e, t).then(function() {
                    return p("Reload", []);
                });
            }
            function h() {
                return u("StartUnit", [ e, "replace" ]);
            }
            function m() {
                return u("StopUnit", [ e, "replace" ]);
            }
            function v() {
                return u("RestartUnit", [ e, "replace" ]);
            }
            function g() {
                return f("EnableUnitFiles", [ [ e ], !1, !1 ]);
            }
            function y() {
                return f("DisableUnitFiles", [ [ e ], !1 ]);
            }
            var b = {
                exists: null,
                state: null,
                enabled: null,
                wait: d,
                start: h,
                stop: m,
                restart: v,
                enable: g,
                disable: y
            };
            s.event_target(b);
            var k, x, P = s.defer();
            e.indexOf(".") == -1 && (e += ".service"), r(function() {
                a.LoadUnit(e).done(function(e) {
                    k = i.proxy("org.freedesktop.systemd1.Unit", e), k.addEventListener("changed", n), 
                    t(k, n), x = i.proxy("org.freedesktop.systemd1.Service", e), x.addEventListener("changed", o), 
                    t(x, o);
                }).fail(function(e) {
                    b.exists = !1, b.dispatchEvent("changed");
                });
            }), a.addEventListener("Reloading", function(e, t) {
                t || l();
            }), a.addEventListener("JobNew", c), a.addEventListener("JobRemoved", c);
            var _ = {};
            return a.addEventListener("JobRemoved", function(e, t, n, r, o) {
                _[n] && ("done" == o ? _[n].resolve() : _[n].reject(o), delete _[n]);
            }), b;
        }
        var i, a, s = n(3);
        e.exports = {
            proxy: o
        };
    }();
}, function(e, t, n) {
    "use strict";
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
    }, o = n(3), i = n(5), a = o.gettext, s = i.createClass({
        displayName: "TunedDialogProfile",
        propTypes: {
            name: i.PropTypes.string.isRequired,
            recommended: i.PropTypes.bool.isRequired,
            active: i.PropTypes.bool.isRequired,
            selected: i.PropTypes.bool.isRequired,
            title: i.PropTypes.string.isRequired,
            description: i.PropTypes.string.isRequired,
            click: i.PropTypes.func.isRequired
        },
        render: function() {
            var e = "list-group-item";
            this.props.selected && (e += " active");
            var t;
            return this.props.recommended && (t = i.createElement("span", {
                className: "badge pull-right"
            }, a("recommended"))), i.createElement("div", {
                className: e,
                key: this.props.name,
                onClick: this.props.click
            }, t, i.createElement("p", null, this.props.title), i.createElement("small", null, this.props.description));
        }
    }), l = i.createClass({
        displayName: "TunedDialogBody",
        propTypes: {
            active_profile: i.PropTypes.string.isRequired,
            change_selected: i.PropTypes.func.isRequired,
            profiles: i.PropTypes.array.isRequired
        },
        getInitialState: function() {
            return {
                selected_profile: this.props.active_profile
            };
        },
        handleProfileClick: function(e) {
            e != this.state.selected_profile && (this.setState({
                selected_profile: e
            }), this.props.change_selected(e));
        },
        render: function() {
            var e = this, t = this.props.profiles.map(function(t) {
                return t.active = e.props.active_profile == t.profile, t.selected = e.state.selected_profile == t.name, 
                t.click = e.handleProfileClick.bind(e, t.name), i.createElement(s, t);
            });
            return i.createElement("div", {
                className: "modal-body"
            }, i.createElement("div", {
                className: "list-group dialog-list-ct"
            }, t));
        }
    }), c = i.createClass({
        displayName: "TunedLink",
        render: function() {
            var e = this, t = e.props.active, n = !1;
            e.props.failed ? (t = a("tuned-failure", "error"), n = !0) : "running" != e.props.state && (t = a("tuned-not-running", "none")), 
            "not-installed" == e.props.state && (n = !0);
            var o = {}, s = "action-trigger";
            return n && (o.disabled = "disabled", s += " disabled"), i.createElement("div", null, i.createElement("a", r({
                className: s
            }, o), t), i.createElement("a", {
                tabindex: "0",
                "data-toggle": "popover",
                "data-trigger": "focus",
                "data-placement": "top",
                "data-html": "true",
                "data-content": ""
            }, i.createElement("span", {
                className: "fa fa-lg fa-info-circle"
            })));
        }
    });
    e.exports = {
        dialog: l,
        link: c
    };
}, function(e, t) {
    e.exports = '<div>\n  <a class="action-trigger"></a>\n  <a tabindex="0" role="button" data-toggle="popover"\n     data-trigger="focus" data-placement="top"\n     data-html="true" data-content="">\n    <span class="fa fa-lg fa-info-circle"></span>\n  </a>\n</div>\n';
} ]);
//# sourceMappingURL=performance.min.js.map