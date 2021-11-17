! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define &&
		define.amd ? define([], t) : "object" == typeof exports ? exports.Router = t() : e.Router = t()
}(self, (function() {
	return e = {
			779: (e, t, r) => {
				var o = r(173);
				e.exports = function e(t, r, n) {
					return o(r) || (n = r || n, r = []), n = n || {}, t instanceof RegExp ? function(e,
						t) {
						var r = e.source.match(/\((?!\?)/g);
						if (r)
							for (var o = 0; o < r.length; o++) t.push({
								name: o,
								prefix: null,
								delimiter: null,
								optional: !1,
								repeat: !1,
								partial: !1,
								asterisk: !1,
								pattern: null
							});
						return c(e, t)
					}(t, r) : o(t) ? function(t, r, o) {
						for (var n = [], a = 0; a < t.length; a++) n.push(e(t[a], r, o).source);
						return c(new RegExp("(?:" + n.join("|") + ")", s(o)), r)
					}(t, r, n) : function(e, t, r) {
						return f(a(e, r), t, r)
					}(t, r, n)
				}, e.exports.parse = a, e.exports.compile = function(e, t) {
					return u(a(e, t), t)
				}, e.exports.tokensToFunction = u, e.exports.tokensToRegExp = f;
				var n = new RegExp(["(\\\\.)",
					"([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
				].join("|"), "g");

				function a(e, t) {
					for (var r, o = [], a = 0, i = 0, u = "", c = t && t.delimiter || "/"; null != (r = n
							.exec(e));) {
						var s = r[0],
							f = r[1],
							h = r.index;
						if (u += e.slice(i, h), i = h + s.length, f) u += f[1];
						else {
							var v = e[i],
								y = r[2],
								g = r[3],
								d = r[4],
								m = r[5],
								b = r[6],
								O = r[7];
							u && (o.push(u), u = "");
							var P = null != y && null != v && v !== y,
								k = "+" === b || "*" === b,
								j = "?" === b || "*" === b,
								w = r[2] || c,
								R = d || m;
							o.push({
								name: g || a++,
								prefix: y || "",
								delimiter: w,
								optional: j,
								repeat: k,
								partial: P,
								asterisk: !!O,
								pattern: R ? p(R) : O ? ".*" : "[^" + l(w) + "]+?"
							})
						}
					}
					return i < e.length && (u += e.substr(i)), u && o.push(u), o
				}

				function i(e) {
					return encodeURI(e).replace(/[\/?#]/g, (function(e) {
						return "%" + e.charCodeAt(0).toString(16).toUpperCase()
					}))
				}

				function u(e, t) {
					for (var r = new Array(e.length), n = 0; n < e.length; n++) "object" == typeof e[n] && (
						r[n] = new RegExp("^(?:" + e[n].pattern + ")$", s(t)));
					return function(t, n) {
						for (var a = "", u = t || {}, l = (n || {}).pretty ? i : encodeURIComponent, p =
								0; p < e.length; p++) {
							var c = e[p];
							if ("string" != typeof c) {
								var s, f = u[c.name];
								if (null == f) {
									if (c.optional) {
										c.partial && (a += c.prefix);
										continue
									}
									throw new TypeError('Expected "' + c.name + '" to be defined')
								}
								if (o(f)) {
									if (!c.repeat) throw new TypeError('Expected "' + c.name +
										'" to not repeat, but received `' + JSON.stringify(f) +
										"`");
									if (0 === f.length) {
										if (c.optional) continue;
										throw new TypeError('Expected "' + c.name + '" to not be empty')
									}
									for (var h = 0; h < f.length; h++) {
										if (s = l(f[h]), !r[p].test(s)) throw new TypeError(
											'Expected all "' + c.name + '" to match "' + c
											.pattern + '", but received `' + JSON.stringify(s) +
											"`");
										a += (0 === h ? c.prefix : c.delimiter) + s
									}
								} else {
									if (s = c.asterisk ? encodeURI(f).replace(/[?#]/g, (function(e) {
											return "%" + e.charCodeAt(0).toString(16)
												.toUpperCase()
										})) : l(f), !r[p].test(s)) throw new TypeError('Expected "' + c
										.name + '" to match "' + c.pattern +
										'", but received "' + s + '"');
									a += c.prefix + s
								}
							} else a += c
						}
						return a
					}
				}

				function l(e) {
					return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1")
				}

				function p(e) {
					return e.replace(/([=!:$\/()])/g, "\\$1")
				}

				function c(e, t) {
					return e.keys = t, e
				}

				function s(e) {
					return e && e.sensitive ? "" : "i"
				}

				function f(e, t, r) {
					o(t) || (r = t || r, t = []);
					for (var n = (r = r || {}).strict, a = !1 !== r.end, i = "", u = 0; u < e.length; u++) {
						var p = e[u];
						if ("string" == typeof p) i += l(p);
						else {
							var f = l(p.prefix),
								h = "(?:" + p.pattern + ")";
							t.push(p), p.repeat && (h += "(?:" + f + h + ")*"), i += h = p.optional ? p
								.partial ? f + "(" + h + ")?" : "(?:" + f + "(" + h + "))?" : f + "(" + h +
								")"
						}
					}
					var v = l(r.delimiter || "/"),
						y = i.slice(-v.length) === v;
					return n || (i = (y ? i.slice(0, -v.length) : i) + "(?:" + v + "(?=$))?"), i += a ?
						"$" : n && y ? "" : "(?=" + v + "|$)", c(new RegExp("^" + i, s(r)), t)
				}
			},
			173: e => {
				e.exports = Array.isArray || function(e) {
					return "[object Array]" == Object.prototype.toString.call(e)
				}
			},
			844: function(e, t, r) {
				"use strict";
				var o = this && this.__assign || function() {
					return (o = Object.assign || function(e) {
						for (var t, r = 1, o = arguments.length; r < o; r++)
							for (var n in t = arguments[r]) Object.prototype.hasOwnProperty
								.call(t, n) && (e[n] = t[n]);
						return e
					}).apply(this, arguments)
				};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.buildVueRouter = t.buildVueRoutes = void 0;
				var n = r(366),
					a = r(883),
					i = r(789),
					u = r(169);
				t.buildVueRoutes = function(e, t) {
					for (var r = e.routesMap, o = r.pathMap, l = r.finallyPathList, p = Object.keys(t),
							c = 0; c < p.length; c++) {
						var s = p[c],
							f = o[s],
							h = t[s];
						if (f) {
							var v = i.getRoutePath(f, e).finallyPath;
							if (v instanceof Array) throw new Error(
								"非 vueRouterDev 模式下，alias、aliasPath、path 无法提供数组类型！ " + JSON
								.stringify(f));
							null != f.name && (h.name = f.name);
							var y = h.path,
								g = h.alias;
							delete h.alias, h.path = v, "/" === y && null != g && (h.alias = g, h.path =
								y), f.beforeEnter && (h.beforeEnter = function(t, r, o) {
								u.onTriggerEachHook(t, r, e, n.hookToggle.enterHooks, o)
							})
						} else a.warn(s + " 路由地址在路由表中未找到，确定是否传递漏啦", e, !0)
					}
					return l.includes("*") && (t["*"] = o["*"]), t
				}, t.buildVueRouter = function(e, t, r) {
					var n;
					n = "[object Array]" === i.getDataType(r) ? r : Object.values(r);
					var a = e.options.h5,
						u = a.scrollBehavior,
						l = a.fallback,
						p = t.options.scrollBehavior;
					t.options.scrollBehavior = function(e, t, r) {
						return p && p(e, t, r), u(e, t, r)
					}, t.fallback = l;
					var c = new t.constructor(o(o({}, e.options.h5), {
						base: t.options.base,
						mode: t.options.mode,
						routes: n
					}));
					t.matcher = c.matcher
				}
			},
			147: function(e, t) {
				"use strict";
				var r, o = this && this.__extends || (r = function(e, t) {
					return (r = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function(e, t) {
							e.__proto__ = t
						} || function(e, t) {
							for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[
								r] = t[r])
						})(e, t)
				}, function(e, t) {
					function o() {
						this.constructor = e
					}
					r(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t
						.prototype, new o)
				});
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.proxyH5Mount = t.proxyEachHook = t.MyArray = void 0;
				var n = function(e) {
					function t(r, o, n, a) {
						var i = e.call(this) || this;
						return i.router = r, i.vueEachArray = o, i.myEachHook = n, i.hookName = a,
							Object.setPrototypeOf(i, t.prototype), i
					}
					return o(t, e), t.prototype.push = function(e) {
						var t = this;
						this.vueEachArray.push(e);
						var r = this.length;
						this[this.length] = function(e, o, n) {
							r > 0 ? t.vueEachArray[r](e, o, (function() {
								n && n()
							})) : t.myEachHook(e, o, (function(a) {
								!1 === a ? n(!1) : t.vueEachArray[r](e, o, (
									function(e) {
										n(a)
									}))
							}), t.router, !0)
						}
					}, t
				}(Array);
				t.MyArray = n, t.proxyEachHook = function(e, t) {
					for (var r = ["beforeHooks", "afterHooks"], o = 0; o < r.length; o++) {
						var a = r[o],
							i = e.lifeCycle[a][0];
						if (i) {
							var u = t[a];
							t[a] = new n(e, u, i, a)
						}
					}
				}, t.proxyH5Mount = function(e) {
					var t;
					if (0 === e.mount.length) {
						if (null === (t = e.options.h5) || void 0 === t ? void 0 : t.vueRouterDev)
							return;
						navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && setTimeout((
							function() {
								if (document.getElementsByTagName("uni-page").length > 0)
								return !1;
								window.location.reload()
							}), 0)
					} else e.mount[0].app.$mount(), e.mount = []
				}
			},
			814: function(e, t) {
				"use strict";
				var r = this && this.__assign || function() {
					return (r = Object.assign || function(e) {
						for (var t, r = 1, o = arguments.length; r < o; r++)
							for (var n in t = arguments[r]) Object.prototype.hasOwnProperty
								.call(t, n) && (e[n] = t[n]);
						return e
					}).apply(this, arguments)
				};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.tabIndexSelect = t.runtimeQuit = t.registerLoddingPage = void 0;
				var o = null,
					n = null;
				t.registerLoddingPage = function(e) {
					if (e.options.registerLoadingPage) {
						var t = e.options.APP,
							o = t.loadingPageHook,
							n = t.loadingPageStyle;
						o(new plus.nativeObj.View("router-loadding", r({
							top: "0px",
							left: "0px",
							height: "100%",
							width: "100%"
						}, n())))
					}
				}, t.runtimeQuit = function(e) {
					void 0 === e && (e = "再按一次退出应用");
					var t = +new Date;
					o ? t - o < 1e3 && plus.runtime.quit() : (o = t, uni.showToast({
						title: e,
						icon: "none",
						position: "bottom",
						duration: 1e3
					}), setTimeout((function() {
						o = null
					}), 1e3))
				}, t.tabIndexSelect = function(e, t) {
					if (!__uniConfig.tabBar || !Array.isArray(__uniConfig.tabBar.list)) return !1;
					for (var r = __uniConfig.tabBar.list, o = [], a = 0, i = 0; i < r.length; i++) {
						var u = r[i];
						if ("/" + u.pagePath !== e.path && "/" + u.pagePath !== t.path || (u
								.pagePath === t.path && (a = i), o.push(u)), 2 === o.length) break
					}
					return 2 === o.length && (null == n && (n = uni.requireNativePlugin("uni-tabview")),
						n.switchSelect({
							index: a
						}), !0)
				}
			},
			334: (e, t) => {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.getEnterPath = void 0, t.getEnterPath = function(e, t) {
					switch (t.options.platform) {
						case "mp-alipay":
						case "mp-weixin":
						case "mp-toutiao":
						case "mp-qq":
							return e.$options.mpInstance.route;
						case "mp-baidu":
							return e.$options.mpInstance.is || e.$options.mpInstance.pageinstance.route
					}
					return e.$options.mpInstance.route
				}
			},
			282: (e, t, r) => {
				"use strict";
				Object.defineProperty(t, "__esModule", {
						value: !0
					}), t.proxyHookName = t.proxyHookDeps = t.lifeCycle = t.baseConfig = t.mpPlatformReg =
					void 0;
				var o = r(883);
				t.mpPlatformReg =
					"(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)", t
					.baseConfig = {
						h5: {
							paramsToQuery: !1,
							vueRouterDev: !1,
							vueNext: !1,
							mode: "hash",
							base: "/",
							linkActiveClass: "router-link-active",
							linkExactActiveClass: "router-link-exact-active",
							scrollBehavior: function(e, t, r) {
								return {
									x: 0,
									y: 0
								}
							},
							fallback: !0
						},
						APP: {
							registerLoadingPage: !0,
							loadingPageStyle: function() {
								return JSON.parse('{"backgroundColor":"#FFF"}')
							},
							loadingPageHook: function(e) {
								e.show()
							},
							launchedHook: function() {
								plus.navigator.closeSplashscreen()
							},
							animation: {}
						},
						applet: {
							animationDuration: 300
						},
						platform: "h5",
						keepUniOriginNav: !1,
						debugger: !1,
						routerBeforeEach: function(e, t, r) {
							r()
						},
						routerAfterEach: function(e, t) {},
						routerErrorEach: function(e, t) {
							t.$lockStatus = !1, o.err(e, t, !0)
						},
						detectBeforeLock: function(e, t, r) {},
						routes: [{
							path: "/choose-location"
						}, {
							path: "/open-location"
						}, {
							path: "/preview-image"
						}]
					}, t.lifeCycle = {
						beforeHooks: [],
						afterHooks: [],
						routerBeforeHooks: [],
						routerAfterHooks: [],
						routerErrorHooks: []
					}, t.proxyHookDeps = {
						resetIndex: [],
						hooks: {},
						options: {}
					}, t.proxyHookName = ["onLaunch", "onShow", "onHide", "onError", "onInit", "onLoad",
						"onReady", "onUnload", "onResize", "created", "beforeMount", "mounted",
						"beforeDestroy", "destroyed"
					]
			},
			801: (e, t, r) => {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.createRouteMap = void 0;
				var o = r(883),
					n = r(789);
				t.createRouteMap = function(e, t) {
					var r = {
						finallyPathList: [],
						finallyPathMap: Object.create(null),
						aliasPathMap: Object.create(null),
						pathMap: Object.create(null),
						vueRouteMap: Object.create(null),
						nameMap: Object.create(null)
					};
					return t.forEach((function(t) {
						var a = n.getRoutePath(t, e),
							i = a.finallyPath,
							u = a.aliasPath,
							l = a.path;
						if (null == l) throw new Error(
							"请提供一个完整的路由对象，包括以绝对路径开始的 ‘path’ 字符串 " + JSON.stringify(
								t));
						if (i instanceof Array && !e.options.h5.vueRouterDev && "h5" === e
							.options.platform) throw new Error(
							"非 vueRouterDev 模式下，route.alias 目前无法提供数组类型！ " + JSON
							.stringify(t));
						var p = i,
							c = u;
						"h5" !== e.options.platform && 0 !== p.indexOf("/") && "*" !== l &&
							o.warn("当前路由对象下，route：" + JSON.stringify(t) + " 是否缺少了前缀 ‘/’", e,
								!0), r.finallyPathMap[p] || (r.finallyPathMap[p] = t, r
								.aliasPathMap[c] = t, r.pathMap[l] = t, r.finallyPathList
								.push(p), null != t.name && (r.nameMap[t.name] = t))
					})), r
				}
			},
			662: (e, t, r) => {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.registerEachHooks = t.registerRouterHooks = t.registerHook = void 0;
				var o = r(366),
					n = r(169);

				function a(e, t) {
					e[0] = t
				}
				t.registerHook = a, t.registerRouterHooks = function(e, t) {
					return a(e.routerBeforeHooks, (function(e, r, o) {
						t.routerBeforeEach(e, r, o)
					})), a(e.routerAfterHooks, (function(e, r) {
						t.routerAfterEach(e, r)
					})), a(e.routerErrorHooks, (function(e, r) {
						t.routerErrorEach(e, r)
					})), e
				}, t.registerEachHooks = function(e, t, r) {
					a(e.lifeCycle[t], (function(e, a, i, u, l) {
						l ? n.onTriggerEachHook(e, a, u, o.hookToggle[t], i) : r(e, a, i)
					}))
				}
			},
			460: function(e, t, r) {
				"use strict";
				var o = this && this.__assign || function() {
					return (o = Object.assign || function(e) {
						for (var t, r = 1, o = arguments.length; r < o; r++)
							for (var n in t = arguments[r]) Object.prototype.hasOwnProperty
								.call(t, n) && (e[n] = t[n]);
						return e
					}).apply(this, arguments)
				};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.initMixins = t.getMixins = void 0;
				var n = r(801),
					a = r(844),
					i = r(147),
					u = r(814),
					l = r(845),
					p = r(890),
					c = r(789),
					s = r(334),
					f = r(282),
					h = !1,
					v = !1,
					y = {
						app: !1,
						page: ""
					};

				function g(e, t) {
					var r = t.options.platform;
					return new RegExp(f.mpPlatformReg, "g").test(r) && (r = "app-lets"), {
						h5: {
							beforeCreate: function() {
								var e;
								if (this.$options.router) {
									t.$route = this.$options.router;
									var r = [];
									(null === (e = t.options.h5) || void 0 === e ? void 0 : e
										.vueRouterDev) ? r = t.options.routes: (r = n
										.createRouteMap(t, this.$options.router.options.routes)
										.finallyPathMap, t.routesMap.vueRouteMap = r, a
										.buildVueRoutes(t, r)), a.buildVueRouter(t, this
										.$options.router, r), i.proxyEachHook(t, this.$options
										.router)
								}
							}
						},
						"app-plus": {
							beforeCreate: function() {
								h || (h = !0, l.proxyPageHook(this, t, "app"), u
									.registerLoddingPage(t))
							}
						},
						"app-lets": {
							beforeCreate: function() {
								c.voidFun("UNI-SIMPLE-ROUTER");
								var e = !0,
									r = this.$options.mpType;
								v || ("component" === r ? e = c.assertParentChild(y.page, this) :
									"page" === r ? (y[r] = s.getEnterPath(this, t), t
										.enterPath = y[r]) : y[r] = !0, e && l.proxyPageHook(
										this, t, r))
							},
							onLoad: function() {
								c.voidFun("UNI-SIMPLE-ROUTER"), !v && c.assertParentChild(y.page,
									this) && (v = !0, p.forceGuardEach(t))
							}
						}
					} [r]
				}
				t.getMixins = g, t.initMixins = function(e, t) {
					var r = n.createRouteMap(t, t.options.routes);
					t.routesMap = r, e.mixin(o({}, g(0, t)))
				}
			},
			789: function(e, t, r) {
				"use strict";
				var o = this && this.__assign || function() {
						return (o = Object.assign || function(e) {
							for (var t, r = 1, o = arguments.length; r < o; r++)
								for (var n in t = arguments[r]) Object.prototype.hasOwnProperty
									.call(t, n) && (e[n] = t[n]);
							return e
						}).apply(this, arguments)
					},
					n = this && this.__rest || function(e, t) {
						var r = {};
						for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (
							r[o] = e[o]);
						if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
							var n = 0;
							for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) t.indexOf(o[n]) <
								0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[
									n]])
						}
						return r
					},
					a = this && this.__spreadArrays || function() {
						for (var e = 0, t = 0, r = arguments.length; t < r; t++) e += arguments[t].length;
						var o = Array(e),
							n = 0;
						for (t = 0; t < r; t++)
							for (var a = arguments[t], i = 0, u = a.length; i < u; i++, n++) o[n] = a[i];
						return o
					};
				Object.defineProperty(t, "__esModule", {
						value: !0
					}), t.deepDecodeQuery = t.resolveAbsolutePath = t.assertParentChild = t.lockDetectWarn =
					t.deepClone = t.baseClone = t.assertDeepObject = t.paramsToQuery = t.forMatNextToFrom =
					t.urlToJson = t.getUniCachePage = t.copyData = t.getDataType = t.routesForMapRoute = t
					.notRouteTo404 = t.getWildcardRule = t.assertNewOptions = t.getRoutePath = t
					.notDeepClearNull = t.mergeConfig = t.timeOut = t.def = t.voidFun = void 0;
				var i = r(282),
					u = r(169),
					l = r(883),
					p = r(890),
					c = r(779);

				function s(e, t) {
					for (var r = Object.create(null), n = Object.keys(e).concat(["resolveQuery",
							"parseQuery"
						]), i = 0; i < n.length; i += 1) {
						var u = n[i];
						null != t[u] ? t[u].constructor === Object ? r[u] = o(o({}, e[u]), t[u]) : r[u] =
							"routes" === u ? a(e[u], t[u]) : t[u] : r[u] = e[u]
					}
					return r
				}

				function f(e, t) {
					var r = e.aliasPath || e.alias || e.path;
					return "h5" !== t.options.platform && (r = e.path), {
						finallyPath: r,
						aliasPath: e.aliasPath || e.path,
						path: e.path,
						alias: e.alias
					}
				}

				function h(e, t) {
					var r = e.routesMap.finallyPathMap["*"];
					if (r) return r;
					throw t && u.ERRORHOOK[0](t, e), new Error(
						"当前路由表匹配规则已全部匹配完成，未找到满足的匹配规则。你可以使用 '*' 通配符捕捉最后的异常")
				}

				function v(e) {
					return Object.prototype.toString.call(e)
				}

				function y(e, t) {
					if (null == e) t = e;
					else
						for (var r = 0, o = Object.keys(e); r < o.length; r++) {
							var n = o[r],
								a = n;
							e[n] !== e && ("object" == typeof e[n] ? (t[a] = "[object Array]" === v(e[n]) ?
								[] : {}, t[a] = y(e[n], t[a])) : t[a] = e[n])
						}
					return t
				}

				function g(e) {
					var t = "[object Array]" === v(e) ? [] : {};
					return y(e, t), t
				}
				t.voidFun = function() {
					for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
				}, t.def = function(e, t, r) {
					Object.defineProperty(e, t, {
						get: function() {
							return r()
						}
					})
				}, t.timeOut = function(e) {
					return new Promise((function(t) {
						setTimeout((function() {
							t()
						}), e)
					}))
				}, t.mergeConfig = s, t.notDeepClearNull = function(e) {
					for (var t in e) null == e[t] && delete e[t];
					return e
				}, t.getRoutePath = f, t.assertNewOptions = function(e) {
					var t, r = e.platform,
						o = e.routes;
					if (null == r) throw new Error("你在实例化路由时必须传递 'platform'");
					if (null == o || 0 === o.length) throw new Error("你在实例化路由时必须传递 routes 为空，这是无意义的。");
					return "h5" === e.platform && (null === (t = e.h5) || void 0 === t ? void 0 : t
						.vueRouterDev) && (i.baseConfig.routes = []), s(i.baseConfig, e)
				}, t.getWildcardRule = h, t.notRouteTo404 = function(e, t, r, o) {
					if ("*" !== t.path) return t;
					var n = t.redirect;
					if (void 0 === n) throw new Error(
						" *  通配符必须配合 redirect 使用。redirect: string | Location | Function");
					var a = n;
					return "function" == typeof a && (a = a(r)), p.navjump(a, e, o, void 0, void 0,
						void 0, !1)
				}, t.routesForMapRoute = function e(t, r, o, n) {
					var a;
					if (void 0 === n && (n = !1), null === (a = t.options.h5) || void 0 === a ? void 0 :
						a.vueRouterDev) return {
						path: r
					};
					for (var i = r.split("?")[0], u = "", l = t.routesMap, p = 0; p < o.length; p++)
						for (var s = l[o[p]], f = 0, y = Object.entries(s); f < y.length; f++) {
							var g = y[f],
								d = g[0],
								m = g[1];
							if ("*" !== d) {
								var b = m,
									O = d;
								if ("[object Array]" === v(s) && (O = b), null != c(O).exec(i))
								return "[object String]" === v(b) ? l.finallyPathMap[b] : b
							} else "" === u && (u = "*")
						}
					if (n) return {};
					if (l.aliasPathMap) {
						var P = e(t, r, ["aliasPathMap"], !0);
						if (Object.keys(P).length > 0) return P
					}
					if ("" !== u) return h(t);
					throw new Error(r + " 路径无法在路由表中找到！检查跳转路径及路由表")
				}, t.getDataType = v, t.copyData = function(e) {
					return JSON.parse(JSON.stringify(e))
				}, t.getUniCachePage = function(e) {
					var t = getCurrentPages();
					if (null == e) return t;
					if (0 === t.length) return t;
					var r = t.reverse()[e];
					return null == r ? [] : r
				}, t.urlToJson = function(e) {
					var t = {},
						r = e.split("?"),
						o = r[0],
						n = r[1];
					if (null != n)
						for (var a = 0, i = n.split("&"); a < i.length; a++) {
							var u = i[a].split("=");
							t[u[0]] = u[1]
						}
					return {
						path: o,
						query: t
					}
				}, t.forMatNextToFrom = function(e, t, r) {
					var o = [t, r],
						n = o[0],
						a = o[1];
					if ("h5" === e.options.platform) {
						var i = e.options.h5,
							u = i.vueNext,
							l = i.vueRouterDev;
						u || l || (n = p.createRoute(e, void 0, n), a = p.createRoute(e, void 0, a))
					} else n = p.createRoute(e, void 0, g(n)), a = p.createRoute(e, void 0, g(a));
					return {
						matTo: n,
						matFrom: a
					}
				}, t.paramsToQuery = function(e, t) {
					var r;
					if ("h5" === e.options.platform && !(null === (r = e.options.h5) || void 0 === r ?
							void 0 : r.paramsToQuery)) return t;
					if ("[object Object]" === v(t)) {
						var a = t,
							i = a.name,
							l = a.params,
							p = n(a, ["name", "params"]),
							c = l;
						if ("h5" !== e.options.platform && null == c && (c = {}), null != i && null !=
							c) {
							var s = e.routesMap.nameMap[i];
							null == s && (s = h(e, {
								type: 2,
								msg: "命名路由为：" + i + " 的路由，无法在路由表中找到！",
								toRule: t
							}));
							var y = f(s, e).finallyPath;
							if (!y.includes(":")) return o(o({}, p), {
								path: y,
								query: c
							});
							u.ERRORHOOK[0]({
								type: 2,
								msg: "动态路由：" + y + " 无法使用 paramsToQuery！",
								toRule: t
							}, e)
						}
					}
					return t
				}, t.assertDeepObject = function(e) {
					var t = null;
					try {
						t = JSON.stringify(e).match(/\{|\[|\}|\]/g)
					} catch (e) {
						l.warnLock("传递的参数解析对象失败。" + e)
					}
					return null != t && t.length > 3
				}, t.baseClone = y, t.deepClone = g, t.lockDetectWarn = function(e, t, r, o, n, a) {
					if (void 0 === n && (n = {}), "afterHooks" === a) o();
					else {
						var i = e.options.detectBeforeLock;
						i && i(e, t, r), e.$lockStatus ? e.options.routerErrorEach({
							type: 2,
							msg: "当前页面正在处于跳转状态，请稍后再进行跳转....",
							NAVTYPE: r,
							uniActualData: n
						}, e) : o()
					}
				}, t.assertParentChild = function(e, t) {
					for (; null != t.$parent;) {
						var r = t.$parent.$mp;
						if (r.page && r.page.is === e) return !0;
						t = t.$parent
					}
					try {
						if (t.$mp.page.is === e || t.$mp.page.route === e) return !0
					} catch (e) {
						return !1
					}
					return !1
				}, t.resolveAbsolutePath = function(e, t) {
					var r = /^\/?([^\?\s]+)(\?.+)?$/,
						o = e.trim();
					if (!r.test(o)) throw new Error("【" + e + "】 路径错误，请提供完整的路径(10001)。");
					var n = o.match(r);
					if (null == n) throw new Error("【" + e + "】 路径错误，请提供完整的路径(10002)。");
					var a = n[2] || "";
					if (/^\.\/[^\.]+/.test(o)) return (t.currentRoute.path + e).replace(/[^\/]+\.\//,
						"");
					var i = n[1].replace(/\//g, "\\/").replace(/\.\./g, "[^\\/]+").replace(/\./g,
						"\\."),
						u = new RegExp("^\\/" + i + "$"),
						l = t.options.routes.filter((function(e) {
							return u.test(e.path)
						}));
					if (1 !== l.length) throw new Error("【" + e +
					"】 路径错误，尝试转成绝对路径失败，请手动转成绝对路径(10003)。");
					return l[0].path + a
				}, t.deepDecodeQuery = function e(t) {
					for (var r = "[object Array]" === v(t) ? [] : {}, o = Object.keys(t), n = 0; n < o
						.length; n++) {
						var a = o[n],
							i = t[a];
						if ("string" == typeof i) try {
							var u = JSON.parse(decodeURIComponent(i));
							"object" != typeof u && (u = i), r[a] = u
						} catch (e) {
							try {
								r[a] = decodeURIComponent(i)
							} catch (e) {
								r[a] = i
							}
						} else if ("object" == typeof i) {
							var l = e(i);
							r[a] = l
						} else r[a] = i
					}
					return r
				}
			},
			883: (e, t) => {
				"use strict";

				function r(e, t, r, o) {
					if (void 0 === o && (o = !1), !o) {
						var n = "[object Object]" === t.toString();
						if (!1 === t) return !1;
						if (n && !1 === t[e]) return !1
					}
					return console[e](r), !0
				}
				Object.defineProperty(t, "__esModule", {
						value: !0
					}), t.warnLock = t.log = t.warn = t.err = t.isLog = void 0, t.isLog = r, t.err =
					function(e, t, o) {
						r("error", t.options.debugger, e, o)
					}, t.warn = function(e, t, o) {
						r("warn", t.options.debugger, e, o)
					}, t.log = function(e, t, o) {
						r("log", t.options.debugger, e, o)
					}, t.warnLock = function(e) {
						console.warn(e)
					}
			},
			607: function(e, t, r) {
				"use strict";
				var o = this && this.__createBinding || (Object.create ? function(e, t, r, o) {
						void 0 === o && (o = r), Object.defineProperty(e, o, {
							enumerable: !0,
							get: function() {
								return t[r]
							}
						})
					} : function(e, t, r, o) {
						void 0 === o && (o = r), e[o] = t[r]
					}),
					n = this && this.__exportStar || function(e, t) {
						for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || o(
							t, e, r)
					};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.createRouter = t.RouterMount = t.runtimeQuit = void 0, n(r(366), t), n(r(309), t);
				var a = r(814);
				Object.defineProperty(t, "runtimeQuit", {
					enumerable: !0,
					get: function() {
						return a.runtimeQuit
					}
				});
				var i = r(963);
				Object.defineProperty(t, "RouterMount", {
					enumerable: !0,
					get: function() {
						return i.RouterMount
					}
				}), Object.defineProperty(t, "createRouter", {
					enumerable: !0,
					get: function() {
						return i.createRouter
					}
				})
			},
			366: (e, t) => {
				"use strict";
				var r, o, n;
				Object.defineProperty(t, "__esModule", {
						value: !0
					}), t.rewriteMethodToggle = t.navtypeToggle = t.hookToggle = void 0, (n = t
						.hookToggle || (t.hookToggle = {})).beforeHooks = "beforeEach", n.afterHooks =
					"afterEach", n.enterHooks = "beforeEnter", (o = t.navtypeToggle || (t
						.navtypeToggle = {})).push = "navigateTo", o.replace = "redirectTo", o.replaceAll =
					"reLaunch", o.pushTab = "switchTab", o.back = "navigateBack", (r = t
						.rewriteMethodToggle || (t.rewriteMethodToggle = {})).navigateTo = "push", r
					.navigate = "push", r.redirectTo = "replace", r.reLaunch = "replaceAll", r.switchTab =
					"pushTab", r.navigateBack = "back"
			},
			309: (e, t) => {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			169: function(e, t, r) {
				"use strict";
				var o = this && this.__rest || function(e, t) {
					var r = {};
					for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (
						r[o] = e[o]);
					if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
						var n = 0;
						for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) t.indexOf(o[n]) <
							0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[
								n]])
					}
					return r
				};
				Object.defineProperty(t, "__esModule", {
						value: !0
					}), t.loopCallHook = t.transitionTo = t.onTriggerEachHook = t.callHook = t
					.callBeforeRouteLeave = t.HOOKLIST = t.ERRORHOOK = void 0;
				var n = r(789),
					a = r(890),
					i = r(147),
					u = r(814);

				function l(e, t, r, o) {
					var a, i = n.getUniCachePage(0);
					if (Object.keys(i).length > 0) {
						var u = void 0;
						switch ("h5" === e.options.platform ? u = i.$options.beforeRouteLeave : null != i
							.$vm && (u = i.$vm.$options.beforeRouteLeave), n.getDataType(u)) {
							case "[object Array]":
								a = (a = u[0]).bind(i);
								break;
							case "[object Function]":
								a = u.bind(i.$vm)
						}
					}
					return p(a, t, r, e, o)
				}

				function p(e, t, r, o, n, a) {
					void 0 === a && (a = !0), null != e && e instanceof Function ? !0 === a ? e(t, r, n, o,
						!1) : (e(t, r, (function() {}), o, !1), n()) : n()
				}

				function c(e, t, r, o, a, i) {
					var u = n.forMatNextToFrom(e, t, r),
						l = u.matTo,
						p = u.matFrom;
					"h5" === e.options.platform ? s(a, 0, i, e, l, p, o) : s(a.slice(0, 4), 0, (function() {
						i((function() {
							s(a.slice(4), 0, n.voidFun, e, l, p, o)
						}))
					}), e, l, p, o)
				}

				function s(e, r, i, l, p, c, f) {
					var h = n.routesForMapRoute(l, p.path, ["finallyPathMap", "pathMap"]);
					if (e.length - 1 < r) return i();
					var v = e[r],
						y = t.ERRORHOOK[0];
					v(l, p, c, h, (function(t) {
						if ("app-plus" === l.options.platform && (!1 !== t && "string" !=
								typeof t && "object" != typeof t || u.tabIndexSelect(p, c)), !
							1 === t) "h5" === l.options.platform && i(!1), y({
							type: 0,
							msg: "管道函数传递 false 导航被终止!",
							matTo: p,
							matFrom: c,
							nextTo: t
						}, l);
						else if ("string" == typeof t || "object" == typeof t) {
							var n = f,
								h = t;
							if ("object" == typeof t) {
								var v = t.NAVTYPE;
								h = o(t, ["NAVTYPE"]), null != v && (n = v)
							}
							a.navjump(h, l, n, {
								from: c,
								next: i
							})
						} else null == t ? (r++, s(e, r, i, l, p, c, f)) : y({
							type: 1,
							msg: "管道函数传递未知类型，无法被识别。导航被终止！",
							matTo: p,
							matFrom: c,
							nextTo: t
						}, l)
					}))
				}
				t.ERRORHOOK = [function(e, t) {
					return t.lifeCycle.routerErrorHooks[0](e, t)
				}], t.HOOKLIST = [function(e, t, r, o, n) {
					return p(e.lifeCycle.routerBeforeHooks[0], t, r, e, n)
				}, function(e, t, r, o, n) {
					return l(e, t, r, n)
				}, function(e, t, r, o, n) {
					return p(e.lifeCycle.beforeHooks[0], t, r, e, n)
				}, function(e, t, r, o, n) {
					return p(o.beforeEnter, t, r, e, n)
				}, function(e, t, r, o, n) {
					return p(e.lifeCycle.afterHooks[0], t, r, e, n, !1)
				}, function(e, t, r, o, n) {
					return e.$lockStatus = !1, "h5" === e.options.platform && i.proxyH5Mount(e), p(e
						.lifeCycle.routerAfterHooks[0], t, r, e, n, !1)
				}], t.callBeforeRouteLeave = l, t.callHook = p, t.onTriggerEachHook = function(e, r, o,
					n, a) {
					var i = [];
					switch (n) {
						case "beforeEach":
							i = t.HOOKLIST.slice(0, 3);
							break;
						case "afterEach":
							i = t.HOOKLIST.slice(4);
							break;
						case "beforeEnter":
							i = t.HOOKLIST.slice(3, 4)
					}
					c(o, e, r, "push", i, a)
				}, t.transitionTo = c, t.loopCallHook = s
			},
			890: function(e, t, r) {
				"use strict";
				var o = this && this.__assign || function() {
						return (o = Object.assign || function(e) {
							for (var t, r = 1, o = arguments.length; r < o; r++)
								for (var n in t = arguments[r]) Object.prototype.hasOwnProperty
									.call(t, n) && (e[n] = t[n]);
							return e
						}).apply(this, arguments)
					},
					n = this && this.__rest || function(e, t) {
						var r = {};
						for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (
							r[o] = e[o]);
						if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
							var n = 0;
							for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) t.indexOf(o[n]) <
								0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[
									n]])
						}
						return r
					};
				Object.defineProperty(t, "__esModule", {
						value: !0
					}), t.createRoute = t.forceGuardEach = t.backOptionsBuild = t.navjump = t.lockNavjump =
					void 0;
				var a = r(366),
					i = r(99),
					u = r(789),
					l = r(169),
					p = r(845),
					c = r(169);

				function s(e, t, r, o, n) {
					u.lockDetectWarn(t, e, r, (function() {
						"h5" !== t.options.platform && (t.$lockStatus = !0), f(e, t, r, void 0,
							o, n)
					}), n)
				}

				function f(e, t, r, n, s, f, v) {
					if (void 0 === v && (v = !0), "back" === r) {
						var y;
						if (y = "string" == typeof e ? +e : e.delta || 1, "h5" === t.options.platform) {
							t.$route.go(-y);
							var g = (f || {
									success: u.voidFun
								}).success || u.voidFun,
								d = (f || {
									complete: u.voidFun
								}).complete || u.voidFun;
							return g({
								errMsg: "navigateBack:ok"
							}), void d({
								errMsg: "navigateBack:ok"
							})
						}
						e = h(t, y, f)
					}
					var m = i.queryPageToMap(e, t).rule;
					m.type = a.navtypeToggle[r];
					var b = u.paramsToQuery(t, m),
						O = i.resolveQuery(b, t);
					if ("h5" === t.options.platform)
						if ("push" !== r && (r = "replace"), null != n) n.next(o({
							replace: "push" !== r
						}, O));
						else if ("push" === r && Reflect.has(O, "events")) {
						if (Reflect.has(O, "name")) throw new Error(
							"在h5端上使用 'push'、'navigateTo' 跳转时，如果包含 events 不允许使用 name 跳转，因为 name 实现了动态路由。请更换为 path 或者 url 跳转！"
							);
						uni.navigateTo(O, !0, u.voidFun, s)
					} else t.$route[r](O, O.success || u.voidFun, O.fail || u.voidFun);
					else {
						var P = {
							path: ""
						};
						if (null == n) {
							var k = u.routesForMapRoute(t, O.path, ["finallyPathMap", "pathMap"]);
							k = u.notRouteTo404(t, k, O, r), O = o(o(o(o({}, k), {
								params: {}
							}), O), {
								path: k.path
							}), P = p.createToFrom(O, t)
						} else P = n.from;
						if (p.createFullPath(O, P), !1 === v) return O;
						l.transitionTo(t, O, P, r, c.HOOKLIST, (function(e) {
							uni[a.navtypeToggle[r]](O, !0, e, s)
						}))
					}
				}

				function h(e, t, r) {
					void 0 === r && (r = {});
					var n = v(e, t, void 0, o({
							NAVTYPE: "back"
						}, r)),
						a = o(o({}, r), {
							path: n.path,
							query: n.query,
							delta: t
						});
					if ("[object Object]" === u.getDataType(r)) {
						var i = r,
							l = i.animationDuration,
							p = i.animationType;
						null != l && (a.animationDuration = l), null != p && (a.animationType = p);
						var c = r.from;
						null != c && (a.BACKTYPE = c)
					}
					return a
				}

				function v(e, t, r, l) {
					void 0 === t && (t = 0), void 0 === l && (l = {});
					var p = {
						name: "",
						meta: {},
						path: "",
						fullPath: "",
						NAVTYPE: "",
						query: {},
						params: {},
						BACKTYPE: (r || {
							BACKTYPE: ""
						}).BACKTYPE || ""
					};
					if (19970806 === t) return p;
					if ("h5" === e.options.platform) {
						var c = {
							path: ""
						};
						c = null != r ? r : e.$route.currentRoute;
						var s = u.copyData(c.params);
						delete s.__id__;
						var f = i.parseQuery(o(o({}, s), u.copyData(c.query)), e);
						c = o(o({}, c), {
							query: f
						}), p.path = c.path, p.fullPath = c.fullPath || "", p.query = u.deepDecodeQuery(
							c.query || {}), p.NAVTYPE = a.rewriteMethodToggle[c.type || "reLaunch"]
					} else {
						var h = {};
						if (null != r) h = o(o({}, r), {
							openType: r.type
						});
						else {
							var v = u.getUniCachePage(t);
							if (0 === Object.keys(v).length) {
								var y = l.NAVTYPE,
									g = n(l, ["NAVTYPE"]),
									d = "不存在的页面栈，请确保有足够的页面可用，当前 level:" + t;
								throw e.options.routerErrorEach({
									type: 3,
									msg: d,
									NAVTYPE: y,
									level: t,
									uniActualData: g
								}, e), new Error(d)
							}
							var m = v.options || {};
							h = o(o({}, v.$page || {}), {
								query: u.deepDecodeQuery(m),
								fullPath: decodeURIComponent((v.$page || {}).fullPath || "/" + v
									.route)
							}), "app-plus" !== e.options.platform && (h.path = "/" + v.route)
						}
						var b = h.openType;
						p.query = h.query, p.path = h.path, p.fullPath = h.fullPath, p.NAVTYPE = a
							.rewriteMethodToggle[b || "reLaunch"]
					}
					var O = u.routesForMapRoute(e, p.path, ["finallyPathMap", "pathMap"]),
						P = o(o({}, p), O);
					return P.query = i.parseQuery(P.query, e), P
				}
				t.lockNavjump = s, t.navjump = f, t.backOptionsBuild = h, t.forceGuardEach = function(e, t,
					r) {
					if (void 0 === t && (t = "replaceAll"), void 0 === r && (r = !1), "h5" === e.options
						.platform) throw new Error(
						"在h5端上使用：forceGuardEach 是无意义的，目前 forceGuardEach 仅支持在非h5端上使用");
					var o = u.getUniCachePage(0);
					0 === Object.keys(o).length && e.options.routerErrorEach({
						type: 3,
						NAVTYPE: t,
						uniActualData: {},
						level: 0,
						msg: "不存在的页面栈，请确保有足够的页面可用，当前 level:0"
					}, e);
					var n = o,
						a = n.route,
						i = n.options;
					s({
						path: "/" + a,
						query: u.deepDecodeQuery(i || {})
					}, e, t, r)
				}, t.createRoute = v
			},
			845: (e, t, r) => {
				"use strict";
				Object.defineProperty(t, "__esModule", {
						value: !0
					}), t.resetPageHook = t.resetAndCallPageHook = t.proxyPageHook = t.createFullPath = t
					.createToFrom = void 0;
				var o = r(282),
					n = r(789),
					a = r(890),
					i = r(99);

				function u(e) {
					for (var t = e.proxyHookDeps, r = 0, o = Object.entries(t.hooks); r < o.length; r++)(0,
						o[r][1].resetHook)()
				}
				t.createToFrom = function(e, t) {
					var r = n.getUniCachePage(0);
					return "[object Array]" === n.getDataType(r) ? n.deepClone(e) : a.createRoute(t)
				}, t.createFullPath = function(e, t) {
					if (null == e.fullPath) {
						var r = i.stringifyQuery(e.query);
						e.fullPath = e.path + r
					}
					null == t.fullPath && (r = i.stringifyQuery(t.query), t.fullPath = t.path + r)
				}, t.proxyPageHook = function(e, t, r) {
					for (var n = t.proxyHookDeps, a = e.$options, i = function(i) {
							var u = o.proxyHookName[i],
								l = a[u];
							if (l)
								for (var p = function(o) {
										if (l[o].toString().includes("UNI-SIMPLE-ROUTER"))
											return "continue";
										var a = Object.keys(n.hooks).length + 1,
											i = function() {
												for (var e = [], t = 0; t < arguments
													.length; t++) e[t] = arguments[t];
												n.resetIndex.push(a), n.options[a] = e
											},
											u = l.splice(o, 1, i)[0];
										n.hooks[a] = {
											proxyHook: i,
											callHook: function(o) {
												if (t.enterPath.replace(/^\//, "") === o
													.replace(/^\//, "") || "app" === r
													) {
													var i = n.options[a];
													u.apply(e, i)
												}
											},
											resetHook: function() {
												l.splice(o, 1, u)
											}
										}
									}, c = 0; c < l.length; c++) p(c)
						}, u = 0; u < o.proxyHookName.length; u++) i(u)
				}, t.resetAndCallPageHook = function(e, t, r) {
					void 0 === r && (r = !0);
					var o = t.trim().match(/^(\/?[^\?\s]+)(\?[\s\S]*$)?$/);
					if (null == o) throw new Error("还原hook失败。请检查 【" + t + "】 路径是否正确。");
					t = o[1];
					for (var n = e.proxyHookDeps, a = n.resetIndex, i = 0; i < a.length; i++) {
						var l = a[i];
						(0, n.hooks[l].callHook)(t)
					}
					r && u(e)
				}, t.resetPageHook = u
			},
			99: function(e, t, r) {
				"use strict";
				var o = this && this.__assign || function() {
					return (o = Object.assign || function(e) {
						for (var t, r = 1, o = arguments.length; r < o; r++)
							for (var n in t = arguments[r]) Object.prototype.hasOwnProperty
								.call(t, n) && (e[n] = t[n]);
						return e
					}).apply(this, arguments)
				};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.stringifyQuery = t.parseQuery = t.resolveQuery = t.queryPageToMap = void 0;
				var n = r(789),
					a = r(169),
					i = r(883),
					u = /[!'()*]/g,
					l = function(e) {
						return "%" + e.charCodeAt(0).toString(16)
					},
					p = /%2C/g,
					c = function(e) {
						return encodeURIComponent(e).replace(u, l).replace(p, ",")
					};
				t.queryPageToMap = function(e, t) {
					var r = {},
						i = "",
						u = e.success,
						l = e.fail;
					if ("[object Object]" === n.getDataType(e)) {
						var p = e;
						if (null != p.path) {
							var c = n.urlToJson(p.path),
								s = c.path,
								f = c.query;
							i = n.routesForMapRoute(t, s, ["finallyPathList", "pathMap"]), r = o(o({},
								f), e.query || {}), p.path = s, p.query = r, delete e.params
						} else null != p.name ? null == (i = t.routesMap.nameMap[p.name]) ? i = n
							.getWildcardRule(t, {
								type: 2,
								msg: "命名路由为：" + p.name + " 的路由，无法在路由表中找到！",
								toRule: e
							}) : (r = e.params || {}, delete e.query) : i = n.getWildcardRule(t, {
								type: 2,
								msg: e + " 解析失败，请检测当前路由表下是否有包含。",
								toRule: e
							})
					} else e = n.urlToJson(e), i = n.routesForMapRoute(t, e.path, ["finallyPathList",
						"pathMap"
					]), r = e.query;
					if ("h5" === t.options.platform) {
						n.getRoutePath(i, t).finallyPath.includes(":") && null == e.name && a.ERRORHOOK[
							0]({
							type: 2,
							msg: "当有设置 alias或者aliasPath 为动态路由时，不允许使用 path 跳转。请使用 name 跳转！",
							route: i
						}, t);
						var h = e.complete,
							v = e.success,
							y = e.fail;
						if ("[object Function]" === n.getDataType(h)) {
							var g = function(e, t) {
								"[object Function]" === n.getDataType(t) && t.apply(this, e), h
									.apply(this, e)
							};
							u = function() {
								for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[
									t];
								g.call(this, e, v)
							}, l = function() {
								for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[
									t];
								g.call(this, e, y)
							}
						}
					}
					var d = e;
					return "[object Function]" === n.getDataType(d.success) && (d.success = u),
						"[object Function]" === n.getDataType(d.fail) && (d.fail = l), {
							rule: d,
							route: i,
							query: r
						}
				}, t.resolveQuery = function(e, t) {
					var r = "query";
					null != e.params && (r = "params"), null != e.query && (r = "query");
					var o = n.copyData(e[r] || {}),
						a = t.options.resolveQuery;
					if (a) {
						var u = a(o);
						"[object Object]" !== n.getDataType(u) ? i.warn(
							"请按格式返回参数： resolveQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}",
							t) : e[r] = u
					} else {
						if (!n.assertDeepObject(o)) return e;
						var l = JSON.stringify(o);
						e[r] = {
							query: l
						}
					}
					return e
				}, t.parseQuery = function(e, t) {
					var r = t.options.parseQuery;
					if (r) e = r(n.copyData(e)), "[object Object]" !== n.getDataType(e) && i.warn(
						"请按格式返回参数： parseQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}",
						t);
					else if (Reflect.get(e, "query")) {
						var o = Reflect.get(e, "query");
						if ("string" == typeof o) try {
							o = JSON.parse(o)
						} catch (e) {
							i.warn("尝试解析深度对象失败，按原样输出。" + e, t)
						}
						if ("object" == typeof o) return n.deepDecodeQuery(o)
					}
					return e
				}, t.stringifyQuery = function(e) {
					var t = e ? Object.keys(e).map((function(t) {
						var r = e[t];
						if (void 0 === r) return "";
						if (null === r) return c(t);
						if (Array.isArray(r)) {
							var o = [];
							return r.forEach((function(e) {
								void 0 !== e && (null === e ? o.push(c(t)) : o
									.push(c(t) + "=" + c(e)))
							})), o.join("&")
						}
						return c(t) + "=" + c(r)
					})).filter((function(e) {
						return e.length > 0
					})).join("&") : null;
					return t ? "?" + t : ""
				}
			},
			314: (e, t, r) => {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.rewriteMethod = void 0;
				var o = r(366),
					n = r(789),
					a = r(883),
					i = r(809),
					u = ["navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack"];
				t.rewriteMethod = function(e) {
					!1 === e.options.keepUniOriginNav && u.forEach((function(t) {
						var r = uni[t];
						uni[t] = function(u, l, p, c) {
							void 0 === l && (l = !1), l ? i.uniOriginJump(e, r, t, u, p,
								c) : ("app-plus" === e.options.platform && 0 ===
								Object.keys(e.appMain).length && (e.appMain = {
									NAVTYPE: t,
									path: u.url
								}),
								function(e, t, r) {
									if ("app-plus" === r.options.platform) {
										var i = null;
										e && (i = e.openType), null != i &&
											"appLaunch" === i && (t = "reLaunch")
									}
									if ("reLaunch" === t && '{"url":"/"}' === JSON
										.stringify(e) && (a.warn(
											"uni-app 原生方法：reLaunch({url:'/'}) 默认被重写啦！你可以使用 this.$Router.replaceAll() 或者 uni.reLaunch({url:'/?xxx=xxx'})",
											r, !0), t = "navigateBack", e = {
											from: "backbutton"
										}), "navigateBack" === t) {
										var u = 1;
										null == e && (e = {
											delta: 1
										}), "[object Number]" === n.getDataType(
											e.delta) && (u = e.delta), r.back(u,
											e)
									} else {
										var l = o.rewriteMethodToggle[t],
											p = e.url;
										if (!p.startsWith("/")) {
											var c = n.resolveAbsolutePath(p, r);
											p = c, e.url = c
										}
										if ("switchTab" === t) {
											var s = n.routesForMapRoute(r, p, [
													"pathMap", "finallyPathList"
												]),
												f = n.getRoutePath(s, r)
												.finallyPath;
											if ("[object Array]" === n.getDataType(
													f) && a.warn(
													"uni-app 原生方法跳转路径为：" + p +
													"。此路为是tab页面时，不允许设置 alias 为数组的情况，并且不能为动态路由！当然你可以通过通配符*解决！",
													r, !0), "*" === f && a.warn(
													"uni-app 原生方法跳转路径为：" + p +
													"。在路由表中找不到相关路由表！当然你可以通过通配符*解决！",
													r, !0), "h5" === r.options
												.platform) {
												var h = e.success;
												e.success = function() {
													for (var t = [], r = 0; r <
														arguments.length; r++)
														t[r] = arguments[r];
													null == h || h.apply(null,
															t), n.timeOut(150)
														.then((function() {
															var t = e
																.detail ||
																{};
															if (Object
																.keys(t)
																.length >
																0 &&
																Reflect
																.has(t,
																	"index"
																	)) {
																var r =
																	n
																	.getUniCachePage(
																		0
																		);
																if (0 ===
																	Object
																	.keys(
																		r
																		)
																	.length
																	)
																	return !
																		1;
																var o =
																	r,
																	a =
																	o
																	.$options
																	.onTabItemTap;
																if (a)
																	for (
																		var i =
																			0; i <
																		a
																		.length; i++
																		)
																		a[
																			i]
																		.call(
																			o,
																			t
																			)
															}
														}))
												}
											}
											p = f
										}
										var v = e,
											y = v.events,
											g = v.success,
											d = v.fail,
											m = v.complete,
											b = v.animationType,
											O = {
												path: p,
												events: y,
												success: g,
												fail: d,
												complete: m,
												animationDuration: v
													.animationDuration,
												animationType: b
											};
										r[l](n.notDeepClearNull(O))
									}
								}(u, t, e))
						}
					}))
				}
			},
			963: function(e, t, r) {
				"use strict";
				var o = this && this.__assign || function() {
					return (o = Object.assign || function(e) {
						for (var t, r = 1, o = arguments.length; r < o; r++)
							for (var n in t = arguments[r]) Object.prototype.hasOwnProperty
								.call(t, n) && (e[n] = t[n]);
						return e
					}).apply(this, arguments)
				};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.createRouter = t.RouterMount = void 0;
				var n = r(282),
					a = r(789),
					i = r(662),
					u = r(460),
					l = r(890),
					p = r(314),
					c = function() {},
					s = new Promise((function(e) {
						return c = e
					}));
				t.createRouter = function(e) {
					var t = a.assertNewOptions(e),
						r = {
							options: t,
							mount: [],
							Vue: null,
							proxyHookDeps: n.proxyHookDeps,
							appMain: {},
							enterPath: "",
							$route: null,
							$lockStatus: !1,
							routesMap: {},
							lifeCycle: i.registerRouterHooks(n.lifeCycle, t),
							push: function(e) {
								l.lockNavjump(e, r, "push")
							},
							replace: function(e) {
								l.lockNavjump(e, r, "replace")
							},
							replaceAll: function(e) {
								l.lockNavjump(e, r, "replaceAll")
							},
							pushTab: function(e) {
								l.lockNavjump(e, r, "pushTab")
							},
							back: function(e, t) {
								void 0 === e && (e = 1), "[object Object]" !== a.getDataType(t) ?
									t = {
										from: "navigateBack"
									} : Reflect.has(t, "from") || (t = o(o({}, t), {
										from: "navigateBack"
									})), l.lockNavjump(e + "", r, "back", void 0, t)
							},
							forceGuardEach: function(e, t) {
								l.forceGuardEach(r, e, t)
							},
							beforeEach: function(e) {
								i.registerEachHooks(r, "beforeHooks", e)
							},
							afterEach: function(e) {
								i.registerEachHooks(r, "afterHooks", e)
							},
							install: function(e) {
								r.Vue = e, p.rewriteMethod(this), u.initMixins(e, this), Object
									.defineProperty(e.prototype, "$Router", {
										get: function() {
											var e = r;
											return Object.defineProperty(this, "$Router", {
												value: e,
												writable: !1,
												configurable: !1,
												enumerable: !1
											}), Object.seal(e)
										}
									}), Object.defineProperty(e.prototype, "$Route", {
										get: function() {
											return l.createRoute(r)
										}
									}), Object.defineProperty(e.prototype, "$AppReady", {
										get: function() {
											return "h5" === r.options.platform ? Promise
												.resolve() : s
										},
										set: function(e) {
											!0 === e && c()
										}
									})
							}
						};
					return a.def(r, "currentRoute", (function() {
						return l.createRoute(r)
					})), r.beforeEach((function(e, t, r) {
						return r()
					})), r.afterEach((function() {})), r
				}, t.RouterMount = function(e, t, r) {
					if (void 0 === r && (r = "#app"), "[object Array]" !== a.getDataType(t.mount))
					throw new Error("挂载路由失败，router.app 应该为数组类型。当前类型：" + typeof t.mount);
					if (t.mount.push({
							app: e,
							el: r
						}), "h5" === t.options.platform) {
						var o = t.$route;
						o.replace({
							path: o.currentRoute.fullPath
						})
					}
				}
			},
			809: function(e, t, r) {
				"use strict";
				var o = this && this.__assign || function() {
						return (o = Object.assign || function(e) {
							for (var t, r = 1, o = arguments.length; r < o; r++)
								for (var n in t = arguments[r]) Object.prototype.hasOwnProperty
									.call(t, n) && (e[n] = t[n]);
							return e
						}).apply(this, arguments)
					},
					n = this && this.__awaiter || function(e, t, r, o) {
						return new(r || (r = Promise))((function(n, a) {
							function i(e) {
								try {
									l(o.next(e))
								} catch (e) {
									a(e)
								}
							}

							function u(e) {
								try {
									l(o.throw(e))
								} catch (e) {
									a(e)
								}
							}

							function l(e) {
								var t;
								e.done ? n(e.value) : (t = e.value, t instanceof r ? t : new r((
									function(e) {
										e(t)
									}))).then(i, u)
							}
							l((o = o.apply(e, t || [])).next())
						}))
					},
					a = this && this.__generator || function(e, t) {
						var r, o, n, a, i = {
							label: 0,
							sent: function() {
								if (1 & n[0]) throw n[1];
								return n[1]
							},
							trys: [],
							ops: []
						};
						return a = {
							next: u(0),
							throw: u(1),
							return: u(2)
						}, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
							return this
						}), a;

						function u(a) {
							return function(u) {
								return function(a) {
									if (r) throw new TypeError("Generator is already executing.");
									for (; i;) try {
										if (r = 1, o && (n = 2 & a[0] ? o.return : a[0] ? o
												.throw || ((n = o.return) && n.call(o), 0) : o
												.next) && !(n = n.call(o, a[1])).done) return n;
										switch (o = 0, n && (a = [2 & a[0], n.value]), a[0]) {
											case 0:
											case 1:
												n = a;
												break;
											case 4:
												return i.label++, {
													value: a[1],
													done: !1
												};
											case 5:
												i.label++, o = a[1], a = [0];
												continue;
											case 7:
												a = i.ops.pop(), i.trys.pop();
												continue;
											default:
												if (!((n = (n = i.trys).length > 0 && n[n
															.length - 1]) || 6 !== a[0] && 2 !==
														a[0])) {
													i = 0;
													continue
												}
												if (3 === a[0] && (!n || a[1] > n[0] && a[1] <
														n[3])) {
													i.label = a[1];
													break
												}
												if (6 === a[0] && i.label < n[1]) {
													i.label = n[1], n = a;
													break
												}
												if (n && i.label < n[2]) {
													i.label = n[2], i.ops.push(a);
													break
												}
												n[2] && i.ops.pop(), i.trys.pop();
												continue
										}
										a = t.call(e, i)
									} catch (e) {
										a = [6, e], o = 0
									} finally {
										r = n = 0
									}
									if (5 & a[0]) throw a[1];
									return {
										value: a[0] ? a[1] : void 0,
										done: !0
									}
								}([a, u])
							}
						}
					},
					i = this && this.__rest || function(e, t) {
						var r = {};
						for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (
							r[o] = e[o]);
						if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
							var n = 0;
							for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) t.indexOf(o[n]) <
								0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[
									n]])
						}
						return r
					};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.formatOriginURLQuery = t.uniOriginJump = void 0;
				var u = r(99),
					l = r(789),
					p = r(282),
					c = r(845),
					s = 0,
					f = "reLaunch";

				function h(e, t, r) {
					var n, a = t.url,
						i = t.path,
						p = t.query,
						c = t.animationType,
						s = t.animationDuration,
						f = t.events,
						h = t.success,
						v = t.fail,
						y = t.complete,
						g = t.delta,
						d = t.animation,
						m = u.stringifyQuery(p || {}),
						b = "" === m ? i || a : (i || a) + m,
						O = {};
					return "app-plus" === e.options.platform && "navigateBack" !== r && (O = (null === (n =
						e.options.APP) || void 0 === n ? void 0 : n.animation) || {}, O = o(o({},
						O), d || {})), l.notDeepClearNull({
						delta: g,
						url: b,
						animationType: c || O.animationType,
						animationDuration: s || O.animationDuration,
						events: f,
						success: h,
						fail: v,
						complete: y
					})
				}
				t.uniOriginJump = function(e, t, r, u, v, y) {
					var g = h(e, u, r),
						d = g.complete,
						m = i(g, ["complete"]),
						b = e.options.platform;
					null != y && !1 === y ? (0 === s && (s++, "h5" !== b && (c.resetAndCallPageHook(e, m
						.url), e.Vue.prototype.$AppReady = !0)), d && d.apply(null, {
						msg: "forceGuardEach强制触发并且不执行跳转"
					}), v && v.apply(null, {
						msg: "forceGuardEach强制触发并且不执行跳转"
					})) : (0 === s && ("app-plus" === b ? c.resetAndCallPageHook(e, m.url) :
						new RegExp(p.mpPlatformReg, "g").test(b) && c.resetAndCallPageHook(e, m
							.url, !1)), t(o(o({}, m), {
						from: u.BACKTYPE,
						complete: function() {
							for (var t, o, i, u, h = [], y = 0; y < arguments
								.length; y++) h[y] = arguments[y];
							return n(this, void 0, void 0, (function() {
								var n, y, g;
								return a(this, (function(a) {
									switch (a.label) {
										case 0:
											return 0 ===
												s && (s++,
													"h5" !==
													b && (
														new RegExp(
															p
															.mpPlatformReg,
															"g"
															)
														.test(
															b
															) &&
														c
														.resetPageHook(
															e
															),
														e
														.Vue
														.prototype
														.$AppReady = !
														0,
														"app-plus" ===
														b &&
														((n = plus
																.nativeObj
																.View
																.getViewById(
																	"router-loadding"
																	)
																) &&
															n
															.close(),
															(y = null ===
																(t = e
																	.options
																	.APP
																	) ||
																void 0 ===
																t ?
																void 0 :
																t
																.launchedHook
																) &&
															y()
															)
														)),
												g = 0,
												new RegExp(p
													.mpPlatformReg,
													"g")
												.test(b) ?
												g = null ===
												(o = e
													.options
													.applet
													) ||
												void 0 ===
												o ? void 0 :
												o
												.animationDuration :
												"app-plus" ===
												b &&
												"navigateBack" ===
												r &&
												"navigateTo" ===
												f && (g =
													null ===
													(u = null ===
														(i = e
															.options
															.APP
															) ||
														void 0 ===
														i ?
														void 0 :
														i
														.animation
														) ||
													void 0 ===
													u ?
													void 0 :
													u
													.animationDuration
													),
												"navigateTo" !==
												r &&
												"navigateBack" !==
												r || 0 ===
												g ? [3, 2] :
												[4, l
													.timeOut(
														g)
												];
										case 1:
											a.sent(), a
												.label = 2;
										case 2:
											return f = r,
												d && d
												.apply(null,
													h), v &&
												v.apply(
													null, h
													), [2]
									}
								}))
							}))
						}
					})))
				}, t.formatOriginURLQuery = h
			}
		}, t = {},
		function r(o) {
			if (t[o]) return t[o].exports;
			var n = t[o] = {
				exports: {}
			};
			return e[o].call(n.exports, n, n.exports, r), n.exports
		}(607);
	var e, t
}));
