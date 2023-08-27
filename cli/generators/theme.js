(function (scope) {
    "use strict";
    function F(arity, fun, wrapper) {
        wrapper.a = arity;
        wrapper.f = fun;
        return wrapper;
    }
    function F2(fun) {
        var curried = function (a) {
            return function (b) {
                return fun(a, b);
            };
        };
        curried.a2 = fun;
        return curried;
    }
    function F3(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return fun(a, b, c);
                };
            };
        };
        curried.a3 =
            fun;
        return curried;
    }
    function F4(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return fun(a, b, c, d);
                    };
                };
            };
        };
        curried.a4 = fun;
        return curried;
    }
    function F5(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return fun(a, b, c, d, e);
                        };
                    };
                };
            };
        };
        curried.a5 = fun;
        return curried;
    }
    function F6(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return fun(a, b, c, d, e, f);
                            };
                        };
                    };
                };
            };
        };
        curried.a6 = fun;
        return curried;
    }
    function F7(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) { return fun(a, b, c, d, e, f, g); };
                            };
                        };
                    };
                };
            };
        };
        curried.
            a7 = fun;
        return curried;
    }
    function F8(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return fun(a, b, c, d, e, f, g, h);
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        curried.a8 = fun;
        return curried;
    }
    function F9(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return function (i) {
                                            return fun(a, b, c, d, e, f, g, h, i);
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        curried
            .a9 = fun;
        return curried;
    }
    function A2(fun, a, b) {
        return fun.a2 ? fun.a2(a, b) : fun(a)(b);
    }
    function A3(fun, a, b, c) {
        return fun.a3 ? fun.a3(a, b, c) : fun(a)(b)(c);
    }
    function A4(fun, a, b, c, d) {
        return fun.a4 ? fun.a4(a, b, c, d) : fun(a)(b)(c)(d);
    }
    function A5(fun, a, b, c, d, e) {
        return fun.a5 ? fun.a5(a, b, c, d, e)
            : fun(a)(b)(c)(d)(e);
    }
    function A6(fun, a, b, c, d, e, f) {
        return fun.a6 ? fun.a6(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
    }
    function A7(fun, a, b, c, d, e, f, g) {
        return fun.a7 ? fun.a7(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
    }
    function A8(fun, a, b, c, d, e, f, g, h) {
        return fun.a8 ? fun.a8(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
    }
    function A9(fun, a, b, c, d, e, f, g, h, i) {
        return fun.a9 ? fun.a9(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
    }
    var _JsArray_empty = [];
    function _JsArray_singleton(value) {
        return [value];
    }
    function _JsArray_length(array) {
        return array.length;
    }
    var _JsArray_initialize_fn = function (size, offset, func) {
        var result = new Array(size);
        for (var i = 0; i < size; i++) {
            result[i] = func(offset + i);
        }
        return result;
    }, _JsArray_initialize = F3(_JsArray_initialize_fn);
    var _JsArray_initializeFromList_fn = function (max, ls) {
        var result = new Array(max);
        for (var i = 0; i < max && ls.b; i++) {
            result[i] = ls.a;
            ls = ls.b;
        }
        result.length = i;
        return _Utils_Tuple2(result, ls);
    }, _JsArray_initializeFromList = F2(_JsArray_initializeFromList_fn);
    var _JsArray_unsafeGet_fn = function (index, array) {
        return array[index];
    }, _JsArray_unsafeGet = F2(_JsArray_unsafeGet_fn);
    var _JsArray_unsafeSet_fn = function (index, value, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = array[i];
        }
        result[index] = value;
        return result;
    }, _JsArray_unsafeSet = F3(_JsArray_unsafeSet_fn);
    var _JsArray_push_fn = function (value, array) {
        var length = array.length;
        var result = new Array(length + 1);
        for (var i = 0; i < length; i++) {
            result[i] = array[i];
        }
        result[length] = value;
        return result;
    }, _JsArray_push = F2(_JsArray_push_fn);
    var _JsArray_foldl_fn = function (func, acc, array) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
            acc = A2(func, array[i], acc);
        }
        return acc;
    }, _JsArray_foldl_fn_unwrapped = function (func, acc, array) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
            acc = func(array[i], acc);
        }
        return acc;
    }, _JsArray_foldl = F3(_JsArray_foldl_fn);
    var _JsArray_foldr_fn = function (func, acc, array) {
        for (var i = array.length - 1; i >= 0; i--) {
            acc = A2(func, array[i], acc);
        }
        return acc;
    }, _JsArray_foldr_fn_unwrapped = function (func, acc, array) {
        for (var i = array.length - 1; i >= 0; i--) {
            acc = func(array[i], acc);
        }
        return acc;
    }, _JsArray_foldr = F3(_JsArray_foldr_fn);
    var _JsArray_map_fn = function (func, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = func(array[i]);
        }
        return result;
    }, _JsArray_map = F2(_JsArray_map_fn);
    var _JsArray_indexedMap_fn = function (func, offset, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = A2(func, offset + i, array[i]);
        }
        return result;
    }, _JsArray_indexedMap_fn_unwrapped = function (func, offset, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = func(offset + i, array[i]);
        }
        return result;
    }, _JsArray_indexedMap = F3(_JsArray_indexedMap_fn);
    var _JsArray_slice_fn = function (from, to, array) {
        return array.slice(from, to);
    }, _JsArray_slice = F3(_JsArray_slice_fn);
    var _JsArray_appendN_fn = function (n, dest, source) {
        var destLen = dest.length;
        var itemsToCopy = n - destLen;
        if (itemsToCopy > source.length) {
            itemsToCopy = source.length;
        }
        var size = destLen + itemsToCopy;
        var result = new Array(size);
        for (var i = 0; i < destLen; i++) {
            result[i] = dest[i];
        }
        for (var i = 0; i < itemsToCopy; i++) {
            result[i + destLen] = source[i];
        }
        return result;
    }, _JsArray_appendN = F3(_JsArray_appendN_fn);
    var _Debug_log_fn = function (tag, value) {
        return value;
    }, _Debug_log = F2(_Debug_log_fn);
    var _Debug_log_UNUSED_fn = function (tag, value) {
        console.log(tag + ": " + _Debug_toString(value));
        return value;
    }, _Debug_log_UNUSED = F2(_Debug_log_UNUSED_fn);
    function _Debug_todo(moduleName, region) {
        return function (message) {
            _Debug_crash(8, moduleName, region, message);
        };
    }
    function _Debug_todoCase(moduleName, region, value) {
        return function (message) {
            _Debug_crash(9, moduleName, region, value, message);
        };
    }
    function _Debug_toString(value) {
        return "<internals>";
    }
    function _Debug_toString_UNUSED(value) {
        return _Debug_toAnsiString(false, value);
    }
    function _Debug_toAnsiString(ansi, value) {
        if (typeof value === "function") {
            return _Debug_internalColor(ansi, "<function>");
        }
        if (typeof value === "boolean") {
            return _Debug_ctorColor(ansi, value ? "True" : "False");
        }
        if (typeof value === "number") {
            return _Debug_numberColor(ansi, value + "");
        }
        if (value instanceof String) {
            return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
        }
        if (typeof value === "string") {
            return _Debug_stringColor(ansi, "\"" + _Debug_addSlashes(value, false) + "\"");
        }
        if (typeof value === "object" && "$" in value) {
            var tag = value.$;
            if (typeof tag === "number") {
                return _Debug_internalColor(ansi, "<internals>");
            }
            if (tag[0] === "#") {
                var output = [];
                for (var k in value) {
                    if (k === "$")
                        continue;
                    output.push(_Debug_toAnsiString(ansi, value[k]));
                }
                return "(" + output.join(",") + ")";
            }
            if (tag === "Set_elm_builtin") {
                return _Debug_ctorColor(ansi, "Set")
                    + _Debug_fadeColor(ansi, ".fromList") + " "
                    + _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
            }
            if (tag === "RBNode_elm_builtin" || tag === "RBEmpty_elm_builtin") {
                return _Debug_ctorColor(ansi, "Dict")
                    + _Debug_fadeColor(ansi, ".fromList") + " "
                    + _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
            }
            if (tag === "Array_elm_builtin") {
                return _Debug_ctorColor(ansi, "Array")
                    + _Debug_fadeColor(ansi, ".fromList") + " "
                    + _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
            }
            if (tag === "::" || tag === "[]") {
                var output = "[";
                value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b);
                for (; value.b; value = value.b) {
                    output += "," + _Debug_toAnsiString(ansi, value.a);
                }
                return output + "]";
            }
            var output = "";
            for (var i in value) {
                if (i === "$")
                    continue;
                var str = _Debug_toAnsiString(ansi, value[i]);
                var c0 = str[0];
                var parenless = c0 === "{" || c0 === "(" || c0 === "[" || c0 === "<" || c0 === "\"" || str.indexOf(" ") < 0;
                output += " " + (parenless ? str : "(" + str + ")");
            }
            return _Debug_ctorColor(ansi, tag) + output;
        }
        if (typeof DataView === "function" && value instanceof DataView) {
            return _Debug_stringColor(ansi, "<" + value.byteLength + " bytes>");
        }
        if (typeof File !== "undefined" && value instanceof File) {
            return _Debug_internalColor(ansi, "<" + value.name + ">");
        }
        if (typeof value === "object") {
            var output = [];
            for (var key in value) {
                var field = key[0] === "_" ? key.slice(1) : key;
                output.push(_Debug_fadeColor(ansi, field) + " = " + _Debug_toAnsiString(ansi, value[key]));
            }
            if (output.length === 0) {
                return "{}";
            }
            return "{ " + output.join(", ") + " }";
        }
        return _Debug_internalColor(ansi, "<internals>");
    }
    function _Debug_addSlashes(str, isChar) {
        var s = str
            .replace(/\\/g, "\\\\")
            .replace(/\n/g, "\\n")
            .replace(/\t/g, "\\t")
            .replace(/\r/g, "\\r")
            .replace(/\v/g, "\\v")
            .replace(/\0/g, "\\0");
        if (isChar) {
            return s.replace(/\'/g, "\\'");
        }
        else {
            return s.replace(/\"/g, "\\\"");
        }
    }
    function _Debug_ctorColor(ansi, string) {
        return ansi ? "\u001B[96m" + string + "\u001B[0m" : string;
    }
    function _Debug_numberColor(ansi, string) {
        return ansi ? "\u001B[95m" + string + "\u001B[0m" : string;
    }
    function _Debug_stringColor(ansi, string) {
        return ansi ? "\u001B[93m" + string + "\u001B[0m" : string;
    }
    function _Debug_charColor(ansi, string) {
        return ansi ? "\u001B[92m" + string + "\u001B[0m" : string;
    }
    function _Debug_fadeColor(ansi, string) {
        return ansi ? "\u001B[37m" + string + "\u001B[0m" : string;
    }
    function _Debug_internalColor(ansi, string) {
        return ansi ? "\u001B[36m" + string + "\u001B[0m" : string;
    }
    function _Debug_toHexDigit(n) {
        return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
    }
    function _Debug_crash(identifier) {
        throw new Error("https://github.com/elm/core/blob/1.0.0/hints/" + identifier + ".md");
    }
    function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4) {
        switch (identifier) {
            case 0:
                throw new Error("What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById(\"elm-node\")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.");
            case 1:
                throw new Error("Browser.application programs cannot handle URLs like this:\n\n    " + document.location.href + "\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.");
            case 2:
                var jsonErrorString = fact1;
                throw new Error("Problem with the flags given to your Elm program on initialization.\n\n" + jsonErrorString);
            case 3:
                var portName = fact1;
                throw new Error("There can only be one port named `" + portName + "`, but your program has multiple.");
            case 4:
                var portName = fact1;
                var problem = fact2;
                throw new Error("Trying to send an unexpected type of value through port `" + portName + "`:\n" + problem);
            case 5:
                throw new Error("Trying to use `(==)` on functions.\nThere is no way to know if functions are \"the same\" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.");
            case 6:
                var moduleName = fact1;
                throw new Error("Your page is loading multiple Elm scripts with a module named " + moduleName + ". Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!");
            case 8:
                var moduleName = fact1;
                var region = fact2;
                var message = fact3;
                throw new Error("TODO in module `" + moduleName + "` " + _Debug_regionToString(region) + "\n\n" + message);
            case 9:
                var moduleName = fact1;
                var region = fact2;
                var value = fact3;
                var message = fact4;
                throw new Error("TODO in module `" + moduleName + "` from the `case` expression "
                    + _Debug_regionToString(region) + "\n\nIt received the following value:\n\n    "
                    + _Debug_toString(value).replace("\n", "\n    ")
                    + "\n\nBut the branch that handles it says:\n\n    " + message.replace("\n", "\n    "));
            case 10:
                throw new Error("Bug in https://github.com/elm/virtual-dom/issues");
            case 11:
                throw new Error("Cannot perform mod 0. Division by zero error.");
        }
    }
    function _Debug_regionToString(region) {
        if (region.r.aA === region.l.aA) {
            return "on line " + region.r.aA;
        }
        return "on lines " + region.r.aA + " through " + region.l.aA;
    }
    function _Utils_eq(x, y) {
        for (var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack); isEqual && (pair = stack.pop()); isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)) { }
        return isEqual;
    }
    function _Utils_eqHelp(x, y, depth, stack) {
        if (x === y) {
            return true;
        }
        if (typeof x !== "object" || x === null || y === null) {
            typeof x === "function" && _Debug_crash(5);
            return false;
        }
        if (depth > 100) {
            stack.push(_Utils_Tuple2(x, y));
            return true;
        }
        if (x.$ < 0) {
            x = $elm$core$Dict$toList(x);
            y = $elm$core$Dict$toList(y);
        }
        for (var key in x) {
            if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack)) {
                return false;
            }
        }
        return true;
    }
    var _Utils_equal = F2(_Utils_eq);
    var _Utils_notEqual_fn = function (a, b) { return !_Utils_eq(a, b); }, _Utils_notEqual = F2(_Utils_notEqual_fn);
    function _Utils_cmp(x, y, ord) {
        if (typeof x !== "object") {
            return x === y ? 0 : x < y ? -1 : 1;
        }
        if (typeof x.$ === "undefined") {
            return (ord = _Utils_cmp(x.a, y.a))
                ? ord
                : (ord = _Utils_cmp(x.b, y.b))
                    ? ord
                    : _Utils_cmp(x.c, y.c);
        }
        for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) { }
        return ord || (x.b ? 1 : y.b ? -1 : 0);
    }
    var _Utils_lt_fn = function (a, b) { return _Utils_cmp(a, b) < 0; }, _Utils_lt = F2(_Utils_lt_fn);
    var _Utils_le_fn = function (a, b) { return _Utils_cmp(a, b) < 1; }, _Utils_le = F2(_Utils_le_fn);
    var _Utils_gt_fn = function (a, b) { return _Utils_cmp(a, b) > 0; }, _Utils_gt = F2(_Utils_gt_fn);
    var _Utils_ge_fn = function (a, b) { return _Utils_cmp(a, b) >= 0; }, _Utils_ge = F2(_Utils_ge_fn);
    var _Utils_compare_fn = function (x, y) {
        var n = _Utils_cmp(x, y);
        return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
    }, _Utils_compare = F2(_Utils_compare_fn);
    var _Utils_Tuple0 = 0;
    var _Utils_Tuple0_UNUSED = { $: "#0" };
    function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
    function _Utils_Tuple2_UNUSED(a, b) { return { $: "#2", a: a, b: b }; }
    function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
    function _Utils_Tuple3_UNUSED(a, b, c) { return { $: "#3", a: a, b: b, c: c }; }
    function _Utils_chr(c) { return c; }
    function _Utils_chr_UNUSED(c) { return new String(c); }
    function _Utils_update(oldRecord, updatedFields) {
        var newRecord = {};
        for (var key in oldRecord) {
            newRecord[key] = oldRecord[key];
        }
        for (var key in updatedFields) {
            newRecord[key] = updatedFields[key];
        }
        return newRecord;
    }
    var _Utils_append = F2(_Utils_ap);
    function _Utils_ap(xs, ys) {
        if (typeof xs === "string") {
            return xs + ys;
        }
        if (!xs.b) {
            return ys;
        }
        var root = _List_Cons(xs.a, ys);
        xs = xs.b;
        for (var curr = root; xs.b; xs = xs.b) {
            curr = curr.b = _List_Cons(xs.a, ys);
        }
        return root;
    }
    var _List_Nil = { $: 0, a: null, b: null };
    var _List_Nil_UNUSED = { $: "[]" };
    function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
    function _List_Cons_UNUSED(hd, tl) { return { $: "::", a: hd, b: tl }; }
    var _List_cons = F2(_List_Cons);
    function _List_fromArray(arr) {
        var out = _List_Nil;
        for (var i = arr.length; i--;) {
            out = _List_Cons(arr[i], out);
        }
        return out;
    }
    function _List_toArray(xs) {
        for (var out = []; xs.b; xs = xs.b) {
            out.push(xs.a);
        }
        return out;
    }
    var _List_map2_fn = function (f, xs, ys) {
        for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) {
            arr.push(A2(f, xs.a, ys.a));
        }
        return _List_fromArray(arr);
    }, _List_map2_fn_unwrapped = function (f, xs, ys) {
        for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) {
            arr.push(f(xs.a, ys.a));
        }
        return _List_fromArray(arr);
    }, _List_map2 = F3(_List_map2_fn);
    var _List_map3_fn = function (f, xs, ys, zs) {
        for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(A3(f, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map3_fn_unwrapped = function (f, xs, ys, zs) {
        for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(f(xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map3 = F4(_List_map3_fn);
    var _List_map4_fn = function (f, ws, xs, ys, zs) {
        for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map4_fn_unwrapped = function (f, ws, xs, ys, zs) {
        for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(f(ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map4 = F5(_List_map4_fn);
    var _List_map5_fn = function (f, vs, ws, xs, ys, zs) {
        for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map5_fn_unwrapped = function (f, vs, ws, xs, ys, zs) {
        for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(f(vs.a, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map5 = F6(_List_map5_fn);
    var _List_sortBy_fn = function (f, xs) {
        return _List_fromArray(_List_toArray(xs).sort(function (a, b) {
            return _Utils_cmp(f(a), f(b));
        }));
    }, _List_sortBy = F2(_List_sortBy_fn);
    var _List_sortWith_fn = function (f, xs) {
        return _List_fromArray(_List_toArray(xs).sort(function (a, b) {
            var ord = A2(f, a, b);
            return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
        }));
    }, _List_sortWith_fn_unwrapped = function (f, xs) {
        return _List_fromArray(_List_toArray(xs).sort(function (a, b) {
            var ord = f(a, b);
            return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
        }));
    }, _List_sortWith = F2(_List_sortWith_fn);
    var _Basics_add_fn = function (a, b) { return a + b; }, _Basics_add = F2(_Basics_add_fn);
    var _Basics_sub_fn = function (a, b) { return a - b; }, _Basics_sub = F2(_Basics_sub_fn);
    var _Basics_mul_fn = function (a, b) { return a * b; }, _Basics_mul = F2(_Basics_mul_fn);
    var _Basics_fdiv_fn = function (a, b) { return a / b; }, _Basics_fdiv = F2(_Basics_fdiv_fn);
    var _Basics_idiv_fn = function (a, b) { return (a / b) | 0; }, _Basics_idiv = F2(_Basics_idiv_fn);
    var _Basics_pow_fn = Math.pow, _Basics_pow = F2(_Basics_pow_fn);
    var _Basics_remainderBy_fn = function (b, a) { return a % b; }, _Basics_remainderBy = F2(_Basics_remainderBy_fn);
    var _Basics_modBy_fn = function (modulus, x) {
        var answer = x % modulus;
        return modulus === 0
            ? _Debug_crash(11)
            :
                ((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
                    ? answer + modulus
                    : answer;
    }, _Basics_modBy = F2(_Basics_modBy_fn);
    var _Basics_pi = Math.PI;
    var _Basics_e = Math.E;
    var _Basics_cos = Math.cos;
    var _Basics_sin = Math.sin;
    var _Basics_tan = Math.tan;
    var _Basics_acos = Math.acos;
    var _Basics_asin = Math.asin;
    var _Basics_atan = Math.atan;
    var _Basics_atan2_fn = Math.atan2, _Basics_atan2 = F2(_Basics_atan2_fn);
    function _Basics_toFloat(x) { return x; }
    function _Basics_truncate(n) { return n | 0; }
    function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }
    var _Basics_ceiling = Math.ceil;
    var _Basics_floor = Math.floor;
    var _Basics_round = Math.round;
    var _Basics_sqrt = Math.sqrt;
    var _Basics_log = Math.log;
    var _Basics_isNaN = isNaN;
    function _Basics_not(bool) { return !bool; }
    var _Basics_and_fn = function (a, b) { return a && b; }, _Basics_and = F2(_Basics_and_fn);
    var _Basics_or_fn = function (a, b) { return a || b; }, _Basics_or = F2(_Basics_or_fn);
    var _Basics_xor_fn = function (a, b) { return a !== b; }, _Basics_xor = F2(_Basics_xor_fn);
    var _String_cons_fn = function (chr, str) {
        return chr + str;
    }, _String_cons = F2(_String_cons_fn);
    function _String_uncons(string) {
        var word = string.charCodeAt(0);
        return !isNaN(word)
            ? $elm$core$Maybe$Just(55296 <= word && word <= 56319
                ? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
                : _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1)))
            : $elm$core$Maybe$Nothing;
    }
    var _String_append_fn = function (a, b) {
        return a + b;
    }, _String_append = F2(_String_append_fn);
    function _String_length(str) {
        return str.length;
    }
    var _String_map_fn = function (func, string) {
        var len = string.length;
        var array = new Array(len);
        var i = 0;
        while (i < len) {
            var word = string.charCodeAt(i);
            if (55296 <= word && word <= 56319) {
                array[i] = func(_Utils_chr(string[i] + string[i + 1]));
                i += 2;
                continue;
            }
            array[i] = func(_Utils_chr(string[i]));
            i++;
        }
        return array.join("");
    }, _String_map = F2(_String_map_fn);
    var _String_filter_fn = function (isGood, str) {
        var arr = [];
        var len = str.length;
        var i = 0;
        while (i < len) {
            var char = str[i];
            var word = str.charCodeAt(i);
            i++;
            if (55296 <= word && word <= 56319) {
                char += str[i];
                i++;
            }
            if (isGood(_Utils_chr(char))) {
                arr.push(char);
            }
        }
        return arr.join("");
    }, _String_filter = F2(_String_filter_fn);
    function _String_reverse(str) {
        var len = str.length;
        var arr = new Array(len);
        var i = 0;
        while (i < len) {
            var word = str.charCodeAt(i);
            if (55296 <= word && word <= 56319) {
                arr[len - i] = str[i + 1];
                i++;
                arr[len - i] = str[i - 1];
                i++;
            }
            else {
                arr[len - i] = str[i];
                i++;
            }
        }
        return arr.join("");
    }
    var _String_foldl_fn = function (func, state, string) {
        var len = string.length;
        var i = 0;
        while (i < len) {
            var char = string[i];
            var word = string.charCodeAt(i);
            i++;
            if (55296 <= word && word <= 56319) {
                char += string[i];
                i++;
            }
            state = A2(func, _Utils_chr(char), state);
        }
        return state;
    }, _String_foldl_fn_unwrapped = function (func, state, string) {
        var len = string.length;
        var i = 0;
        while (i < len) {
            var char = string[i];
            var word = string.charCodeAt(i);
            i++;
            if (55296 <= word && word <= 56319) {
                char += string[i];
                i++;
            }
            state = func(_Utils_chr(char), state);
        }
        return state;
    }, _String_foldl = F3(_String_foldl_fn);
    var _String_foldr_fn = function (func, state, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            state = A2(func, _Utils_chr(char), state);
        }
        return state;
    }, _String_foldr_fn_unwrapped = function (func, state, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            state = func(_Utils_chr(char), state);
        }
        return state;
    }, _String_foldr = F3(_String_foldr_fn);
    var _String_split_fn = function (sep, str) {
        return str.split(sep);
    }, _String_split = F2(_String_split_fn);
    var _String_join_fn = function (sep, strs) {
        return strs.join(sep);
    }, _String_join = F2(_String_join_fn);
    var _String_slice_fn = function (start, end, str) {
        return str.slice(start, end);
    }, _String_slice = F3(_String_slice_fn);
    function _String_trim(str) {
        return str.trim();
    }
    function _String_trimLeft(str) {
        return str.replace(/^\s+/, "");
    }
    function _String_trimRight(str) {
        return str.replace(/\s+$/, "");
    }
    function _String_words(str) {
        return _List_fromArray(str.trim().split(/\s+/g));
    }
    function _String_lines(str) {
        return _List_fromArray(str.split(/\r\n|\r|\n/g));
    }
    function _String_toUpper(str) {
        return str.toUpperCase();
    }
    function _String_toLower(str) {
        return str.toLowerCase();
    }
    var _String_any_fn = function (isGood, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            if (isGood(_Utils_chr(char))) {
                return true;
            }
        }
        return false;
    }, _String_any = F2(_String_any_fn);
    var _String_all_fn = function (isGood, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            if (!isGood(_Utils_chr(char))) {
                return false;
            }
        }
        return true;
    }, _String_all = F2(_String_all_fn);
    var _String_contains_fn = function (sub, str) {
        return str.indexOf(sub) > -1;
    }, _String_contains = F2(_String_contains_fn);
    var _String_startsWith_fn = function (sub, str) {
        return str.indexOf(sub) === 0;
    }, _String_startsWith = F2(_String_startsWith_fn);
    var _String_endsWith_fn = function (sub, str) {
        return str.length >= sub.length &&
            str.lastIndexOf(sub) === str.length - sub.length;
    }, _String_endsWith = F2(_String_endsWith_fn);
    var _String_indexes_fn = function (sub, str) {
        var subLen = sub.length;
        if (subLen < 1) {
            return _List_Nil;
        }
        var i = 0;
        var is = [];
        while ((i = str.indexOf(sub, i)) > -1) {
            is.push(i);
            i = i + subLen;
        }
        return _List_fromArray(is);
    }, _String_indexes = F2(_String_indexes_fn);
    function _String_fromNumber(number) {
        return number + "";
    }
    function _String_toInt(str) {
        var total = 0;
        var code0 = str.charCodeAt(0);
        var start = code0 == 43 || code0 == 45 ? 1 : 0;
        for (var i = start; i < str.length; ++i) {
            var code = str.charCodeAt(i);
            if (code < 48 || 57 < code) {
                return $elm$core$Maybe$Nothing;
            }
            total = 10 * total + code - 48;
        }
        return i == start
            ? $elm$core$Maybe$Nothing
            : $elm$core$Maybe$Just(code0 == 45 ? -total : total);
    }
    function _String_toFloat(s) {
        if (s.length === 0 || /[\sxbo]/.test(s)) {
            return $elm$core$Maybe$Nothing;
        }
        var n = +s;
        return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
    }
    function _String_fromList(chars) {
        return _List_toArray(chars).join("");
    }
    function _Char_toCode(char) {
        var code = char.charCodeAt(0);
        if (55296 <= code && code <= 56319) {
            return (code - 55296) * 1024 + char.charCodeAt(1) - 56320 + 65536;
        }
        return code;
    }
    function _Char_fromCode(code) {
        return _Utils_chr((code < 0 || 1114111 < code)
            ? "\uFFFD"
            :
                (code <= 65535)
                    ? String.fromCharCode(code)
                    :
                        (code -= 65536,
                            String.fromCharCode(Math.floor(code / 1024) + 55296, code % 1024 + 56320)));
    }
    function _Char_toUpper(char) {
        return _Utils_chr(char.toUpperCase());
    }
    function _Char_toLower(char) {
        return _Utils_chr(char.toLowerCase());
    }
    function _Char_toLocaleUpper(char) {
        return _Utils_chr(char.toLocaleUpperCase());
    }
    function _Char_toLocaleLower(char) {
        return _Utils_chr(char.toLocaleLowerCase());
    }
    function _Json_succeed(msg) {
        return {
            $: 0,
            a: msg
        };
    }
    function _Json_fail(msg) {
        return {
            $: 1,
            a: msg
        };
    }
    function _Json_decodePrim(decoder) {
        return { $: 2, b: decoder };
    }
    var _Json_decodeInt = _Json_decodePrim(function (value) {
        return (typeof value !== "number")
            ? _Json_expecting("an INT", value)
            :
                (-2147483647 < value && value < 2147483647 && (value | 0) === value)
                    ? $elm$core$Result$Ok(value)
                    :
                        (isFinite(value) && !(value % 1))
                            ? $elm$core$Result$Ok(value)
                            : _Json_expecting("an INT", value);
    });
    var _Json_decodeBool = _Json_decodePrim(function (value) {
        return (typeof value === "boolean")
            ? $elm$core$Result$Ok(value)
            : _Json_expecting("a BOOL", value);
    });
    var _Json_decodeFloat = _Json_decodePrim(function (value) {
        return (typeof value === "number")
            ? $elm$core$Result$Ok(value)
            : _Json_expecting("a FLOAT", value);
    });
    var _Json_decodeValue = _Json_decodePrim(function (value) {
        return $elm$core$Result$Ok(_Json_wrap(value));
    });
    var _Json_decodeString = _Json_decodePrim(function (value) {
        return (typeof value === "string")
            ? $elm$core$Result$Ok(value)
            : (value instanceof String)
                ? $elm$core$Result$Ok(value + "")
                : _Json_expecting("a STRING", value);
    });
    function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
    function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }
    function _Json_decodeNull(value) { return { $: 5, c: value }; }
    var _Json_decodeField_fn = function (field, decoder) {
        return {
            $: 6,
            d: field,
            b: decoder
        };
    }, _Json_decodeField = F2(_Json_decodeField_fn);
    var _Json_decodeIndex_fn = function (index, decoder) {
        return {
            $: 7,
            e: index,
            b: decoder
        };
    }, _Json_decodeIndex = F2(_Json_decodeIndex_fn);
    function _Json_decodeKeyValuePairs(decoder) {
        return {
            $: 8,
            b: decoder
        };
    }
    function _Json_mapMany(f, decoders) {
        return {
            $: 9,
            f: f,
            g: decoders
        };
    }
    var _Json_andThen_fn = function (callback, decoder) {
        return {
            $: 10,
            b: decoder,
            h: callback
        };
    }, _Json_andThen = F2(_Json_andThen_fn);
    function _Json_oneOf(decoders) {
        return {
            $: 11,
            g: decoders
        };
    }
    var _Json_map1_fn = function (f, d1) {
        return _Json_mapMany(f, [d1]);
    }, _Json_map1 = F2(_Json_map1_fn);
    var _Json_map2_fn = function (f, d1, d2) {
        return _Json_mapMany(f, [d1, d2]);
    }, _Json_map2 = F3(_Json_map2_fn);
    var _Json_map3_fn = function (f, d1, d2, d3) {
        return _Json_mapMany(f, [d1, d2, d3]);
    }, _Json_map3 = F4(_Json_map3_fn);
    var _Json_map4_fn = function (f, d1, d2, d3, d4) {
        return _Json_mapMany(f, [d1, d2, d3, d4]);
    }, _Json_map4 = F5(_Json_map4_fn);
    var _Json_map5_fn = function (f, d1, d2, d3, d4, d5) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
    }, _Json_map5 = F6(_Json_map5_fn);
    var _Json_map6_fn = function (f, d1, d2, d3, d4, d5, d6) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
    }, _Json_map6 = F7(_Json_map6_fn);
    var _Json_map7_fn = function (f, d1, d2, d3, d4, d5, d6, d7) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
    }, _Json_map7 = F8(_Json_map7_fn);
    var _Json_map8_fn = function (f, d1, d2, d3, d4, d5, d6, d7, d8) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
    }, _Json_map8 = F9(_Json_map8_fn);
    var _Json_runOnString_fn = function (decoder, string) {
        try {
            var value = JSON.parse(string);
            return _Json_runHelp(decoder, value);
        }
        catch (e) {
            return $elm$core$Result$Err($elm$json$Json$Decode$Failure_fn("This is not valid JSON! " + e.message, _Json_wrap(string)));
        }
    }, _Json_runOnString = F2(_Json_runOnString_fn);
    var _Json_run_fn = function (decoder, value) {
        return _Json_runHelp(decoder, _Json_unwrap(value));
    }, _Json_run = F2(_Json_run_fn);
    function _Json_runHelp(decoder, value) {
        switch (decoder.$) {
            case 2:
                return decoder.b(value);
            case 5:
                return (value === null)
                    ? $elm$core$Result$Ok(decoder.c)
                    : _Json_expecting("null", value);
            case 3:
                if (!_Json_isArray(value)) {
                    return _Json_expecting("a LIST", value);
                }
                return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);
            case 4:
                if (!_Json_isArray(value)) {
                    return _Json_expecting("an ARRAY", value);
                }
                return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);
            case 6:
                var field = decoder.d;
                if (typeof value !== "object" || value === null || !(field in value)) {
                    return _Json_expecting("an OBJECT with a field named `" + field + "`", value);
                }
                var result = _Json_runHelp(decoder.b, value[field]);
                return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err($elm$json$Json$Decode$Field_fn(field, result.a));
            case 7:
                var index = decoder.e;
                if (!_Json_isArray(value)) {
                    return _Json_expecting("an ARRAY", value);
                }
                if (index >= value.length) {
                    return _Json_expecting("a LONGER array. Need index " + index + " but only see " + value.length + " entries", value);
                }
                var result = _Json_runHelp(decoder.b, value[index]);
                return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err($elm$json$Json$Decode$Index_fn(index, result.a));
            case 8:
                if (typeof value !== "object" || value === null || _Json_isArray(value)) {
                    return _Json_expecting("an OBJECT", value);
                }
                var keyValuePairs = _List_Nil;
                for (var key in value) {
                    if (value.hasOwnProperty(key)) {
                        var result = _Json_runHelp(decoder.b, value[key]);
                        if (!$elm$core$Result$isOk(result)) {
                            return $elm$core$Result$Err($elm$json$Json$Decode$Field_fn(key, result.a));
                        }
                        keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
                    }
                }
                return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));
            case 9:
                var answer = decoder.f;
                var decoders = decoder.g;
                for (var i = 0; i < decoders.length; i++) {
                    var result = _Json_runHelp(decoders[i], value);
                    if (!$elm$core$Result$isOk(result)) {
                        return result;
                    }
                    answer = answer(result.a);
                }
                return $elm$core$Result$Ok(answer);
            case 10:
                var result = _Json_runHelp(decoder.b, value);
                return (!$elm$core$Result$isOk(result))
                    ? result
                    : _Json_runHelp(decoder.h(result.a), value);
            case 11:
                var errors = _List_Nil;
                for (var temp = decoder.g; temp.b; temp = temp.b) {
                    var result = _Json_runHelp(temp.a, value);
                    if ($elm$core$Result$isOk(result)) {
                        return result;
                    }
                    errors = _List_Cons(result.a, errors);
                }
                return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));
            case 1:
                return $elm$core$Result$Err($elm$json$Json$Decode$Failure_fn(decoder.a, _Json_wrap(value)));
            case 0:
                return $elm$core$Result$Ok(decoder.a);
        }
    }
    function _Json_runArrayDecoder(decoder, value, toElmValue) {
        var len = value.length;
        var array = new Array(len);
        for (var i = 0; i < len; i++) {
            var result = _Json_runHelp(decoder, value[i]);
            if (!$elm$core$Result$isOk(result)) {
                return $elm$core$Result$Err($elm$json$Json$Decode$Index_fn(i, result.a));
            }
            array[i] = result.a;
        }
        return $elm$core$Result$Ok(toElmValue(array));
    }
    function _Json_isArray(value) {
        return Array.isArray(value) || (typeof FileList !== "undefined" && value instanceof FileList);
    }
    function _Json_toElmArray(array) {
        return $elm$core$Array$initialize_fn(array.length, function (i) { return array[i]; });
    }
    function _Json_expecting(type, value) {
        return $elm$core$Result$Err($elm$json$Json$Decode$Failure_fn("Expecting " + type, _Json_wrap(value)));
    }
    function _Json_equality(x, y) {
        if (x === y) {
            return true;
        }
        if (x.$ !== y.$) {
            return false;
        }
        switch (x.$) {
            case 0:
            case 1:
                return x.a === y.a;
            case 2:
                return x.b === y.b;
            case 5:
                return x.c === y.c;
            case 3:
            case 4:
            case 8:
                return _Json_equality(x.b, y.b);
            case 6:
                return x.d === y.d && _Json_equality(x.b, y.b);
            case 7:
                return x.e === y.e && _Json_equality(x.b, y.b);
            case 9:
                return x.f === y.f && _Json_listEquality(x.g, y.g);
            case 10:
                return x.h === y.h && _Json_equality(x.b, y.b);
            case 11:
                return _Json_listEquality(x.g, y.g);
        }
    }
    function _Json_listEquality(aDecoders, bDecoders) {
        var len = aDecoders.length;
        if (len !== bDecoders.length) {
            return false;
        }
        for (var i = 0; i < len; i++) {
            if (!_Json_equality(aDecoders[i], bDecoders[i])) {
                return false;
            }
        }
        return true;
    }
    var _Json_encode_fn = function (indentLevel, value) {
        return JSON.stringify(_Json_unwrap(value), null, indentLevel) + "";
    }, _Json_encode = F2(_Json_encode_fn);
    function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
    function _Json_unwrap_UNUSED(value) { return value.a; }
    function _Json_wrap(value) { return value; }
    function _Json_unwrap(value) { return value; }
    function _Json_emptyArray() { return []; }
    function _Json_emptyObject() { return {}; }
    var _Json_addField_fn = function (key, value, object) {
        object[key] = _Json_unwrap(value);
        return object;
    }, _Json_addField = F3(_Json_addField_fn);
    function _Json_addEntry(func) {
        return F2(function (entry, array) {
            array.push(_Json_unwrap(func(entry)));
            return array;
        });
    }
    var _Json_encodeNull = _Json_wrap(null);
    var _Parser_isSubString_fn = function (smallString, offset, row, col, bigString) {
        var smallLength = smallString.length;
        var isGood = offset + smallLength <= bigString.length;
        for (var i = 0; isGood && i < smallLength;) {
            var code = bigString.charCodeAt(offset);
            isGood =
                smallString[i++] === bigString[offset++]
                    && (code === 10
                        ? (row++, col = 1)
                        : (col++, (code & 63488) === 55296 ? smallString[i++] === bigString[offset++] : 1));
        }
        return _Utils_Tuple3(isGood ? offset : -1, row, col);
    }, _Parser_isSubString = F5(_Parser_isSubString_fn);
    var _Parser_isSubChar_fn = function (predicate, offset, string) {
        return (string.length <= offset
            ? -1
            :
                (string.charCodeAt(offset) & 63488) === 55296
                    ? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
                    :
                        (predicate(_Utils_chr(string[offset]))
                            ? ((string[offset] === "\n") ? -2 : (offset + 1))
                            : -1));
    }, _Parser_isSubChar = F3(_Parser_isSubChar_fn);
    var _Parser_isAsciiCode_fn = function (code, offset, string) {
        return string.charCodeAt(offset) === code;
    }, _Parser_isAsciiCode = F3(_Parser_isAsciiCode_fn);
    var _Parser_chompBase10_fn = function (offset, string) {
        for (; offset < string.length; offset++) {
            var code = string.charCodeAt(offset);
            if (code < 48 || 57 < code) {
                return offset;
            }
        }
        return offset;
    }, _Parser_chompBase10 = F2(_Parser_chompBase10_fn);
    var _Parser_consumeBase_fn = function (base, offset, string) {
        for (var total = 0; offset < string.length; offset++) {
            var digit = string.charCodeAt(offset) - 48;
            if (digit < 0 || base <= digit)
                break;
            total = base * total + digit;
        }
        return _Utils_Tuple2(offset, total);
    }, _Parser_consumeBase = F3(_Parser_consumeBase_fn);
    var _Parser_consumeBase16_fn = function (offset, string) {
        for (var total = 0; offset < string.length; offset++) {
            var code = string.charCodeAt(offset);
            if (48 <= code && code <= 57) {
                total = 16 * total + code - 48;
            }
            else if (65 <= code && code <= 70) {
                total = 16 * total + code - 55;
            }
            else if (97 <= code && code <= 102) {
                total = 16 * total + code - 87;
            }
            else {
                break;
            }
        }
        return _Utils_Tuple2(offset, total);
    }, _Parser_consumeBase16 = F2(_Parser_consumeBase16_fn);
    var _Parser_findSubString_fn = function (smallString, offset, row, col, bigString) {
        var newOffset = bigString.indexOf(smallString, offset);
        var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;
        while (offset < target) {
            var code = bigString.charCodeAt(offset++);
            code === 10
                ? (col = 1, row++)
                : (col++, (code & 63488) === 55296 && offset++);
        }
        return _Utils_Tuple3(newOffset, row, col);
    }, _Parser_findSubString = F5(_Parser_findSubString_fn);
    function _Scheduler_succeed(value) {
        return {
            $: 0,
            a: value
        };
    }
    function _Scheduler_fail(error) {
        return {
            $: 1,
            a: error
        };
    }
    function _Scheduler_binding(callback) {
        return {
            $: 2,
            b: callback,
            c: null
        };
    }
    var _Scheduler_andThen_fn = function (callback, task) {
        return {
            $: 3,
            b: callback,
            d: task
        };
    }, _Scheduler_andThen = F2(_Scheduler_andThen_fn);
    var _Scheduler_onError_fn = function (callback, task) {
        return {
            $: 4,
            b: callback,
            d: task
        };
    }, _Scheduler_onError = F2(_Scheduler_onError_fn);
    function _Scheduler_receive(callback) {
        return {
            $: 5,
            b: callback
        };
    }
    var _Scheduler_guid = 0;
    function _Scheduler_rawSpawn(task) {
        var proc = {
            $: 0,
            e: _Scheduler_guid++,
            f: task,
            g: null,
            h: []
        };
        _Scheduler_enqueue(proc);
        return proc;
    }
    function _Scheduler_spawn(task) {
        return _Scheduler_binding(function (callback) {
            callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
        });
    }
    function _Scheduler_rawSend(proc, msg) {
        proc.h.push(msg);
        _Scheduler_enqueue(proc);
    }
    var _Scheduler_send_fn = function (proc, msg) {
        return _Scheduler_binding(function (callback) {
            _Scheduler_rawSend(proc, msg);
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    }, _Scheduler_send = F2(_Scheduler_send_fn);
    function _Scheduler_kill(proc) {
        return _Scheduler_binding(function (callback) {
            var task = proc.f;
            if (task.$ === 2 && task.c) {
                task.c();
            }
            proc.f = null;
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    }
    var _Scheduler_working = false;
    var _Scheduler_queue = [];
    function _Scheduler_enqueue(proc) {
        _Scheduler_queue.push(proc);
        if (_Scheduler_working) {
            return;
        }
        _Scheduler_working = true;
        while (proc = _Scheduler_queue.shift()) {
            _Scheduler_step(proc);
        }
        _Scheduler_working = false;
    }
    function _Scheduler_step(proc) {
        while (proc.f) {
            var rootTag = proc.f.$;
            if (rootTag === 0 || rootTag === 1) {
                while (proc.g && proc.g.$ !== rootTag) {
                    proc.g = proc.g.i;
                }
                if (!proc.g) {
                    return;
                }
                proc.f = proc.g.b(proc.f.a);
                proc.g = proc.g.i;
            }
            else if (rootTag === 2) {
                proc.f.c = proc.f.b(function (newRoot) {
                    proc.f = newRoot;
                    _Scheduler_enqueue(proc);
                });
                return;
            }
            else if (rootTag === 5) {
                if (proc.h.length === 0) {
                    return;
                }
                proc.f = proc.f.b(proc.h.shift());
            }
            else {
                proc.g = {
                    $: rootTag === 3 ? 0 : 1,
                    b: proc.f.b,
                    i: proc.g
                };
                proc.f = proc.f.d;
            }
        }
    }
    function _Process_sleep(time) {
        return _Scheduler_binding(function (callback) {
            var id = setTimeout(function () {
                callback(_Scheduler_succeed(_Utils_Tuple0));
            }, time);
            return function () { clearTimeout(id); };
        });
    }
    var _Platform_worker_fn = function (impl, flagDecoder, debugMetadata, args) {
        return _Platform_initialize(flagDecoder, args, impl.az, impl.aK, impl.aD, function () { return function () { }; });
    }, _Platform_worker = F4(_Platform_worker_fn);
    function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder) {
        var result = _Json_run_fn(flagDecoder, _Json_wrap(args ? args["flags"] : undefined));
        $elm$core$Result$isOk(result) || _Debug_crash(2);
        var managers = {};
        var initPair = init(result.a);
        var model = initPair.a;
        var stepper = stepperBuilder(sendToApp, model);
        var ports = _Platform_setupEffects(managers, sendToApp);
        function sendToApp(msg, viewMetadata) {
            var pair = A2(update, msg, model);
            stepper(model = pair.a, viewMetadata);
            _Platform_enqueueEffects(managers, pair.b, subscriptions(model));
        }
        _Platform_enqueueEffects(managers, initPair.b, subscriptions(model));
        return ports ? { ports: ports } : {};
    }
    var _Platform_preload;
    function _Platform_registerPreload(url) {
        _Platform_preload.add(url);
    }
    var _Platform_effectManagers = {};
    function _Platform_setupEffects(managers, sendToApp) {
        var ports;
        for (var key in _Platform_effectManagers) {
            var manager = _Platform_effectManagers[key];
            if (manager.a) {
                ports = ports || {};
                ports[key] = manager.a(key, sendToApp);
            }
            managers[key] = _Platform_instantiateManager(manager, sendToApp);
        }
        return ports;
    }
    function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap) {
        return {
            b: init,
            c: onEffects,
            d: onSelfMsg,
            e: cmdMap,
            f: subMap
        };
    }
    function _Platform_instantiateManager(info, sendToApp) {
        var router = {
            g: sendToApp,
            h: undefined
        };
        var onEffects = info.c;
        var onSelfMsg = info.d;
        var cmdMap = info.e;
        var subMap = info.f;
        function loop(state) {
            return _Scheduler_andThen_fn(loop, _Scheduler_receive(function (msg) {
                var value = msg.a;
                if (msg.$ === 0) {
                    return A3(onSelfMsg, router, value, state);
                }
                return cmdMap && subMap
                    ? A4(onEffects, router, value.i, value.j, state)
                    : A3(onEffects, router, cmdMap ? value.i : value.j, state);
            }));
        }
        return router.h = _Scheduler_rawSpawn(_Scheduler_andThen_fn(loop, info.b));
    }
    var _Platform_sendToApp_fn = function (router, msg) {
        return _Scheduler_binding(function (callback) {
            router.g(msg);
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    }, _Platform_sendToApp = F2(_Platform_sendToApp_fn);
    var _Platform_sendToSelf_fn = function (router, msg) {
        return _Scheduler_send_fn(router.h, {
            $: 0,
            a: msg
        });
    }, _Platform_sendToSelf = F2(_Platform_sendToSelf_fn);
    function _Platform_leaf(home) {
        return function (value) {
            return {
                $: 1,
                k: home,
                l: value
            };
        };
    }
    function _Platform_batch(list) {
        return {
            $: 2,
            m: list
        };
    }
    var _Platform_map_fn = function (tagger, bag) {
        return {
            $: 3,
            n: tagger,
            o: bag
        };
    }, _Platform_map = F2(_Platform_map_fn);
    var _Platform_effectsQueue = [];
    var _Platform_effectsActive = false;
    function _Platform_enqueueEffects(managers, cmdBag, subBag) {
        _Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });
        if (_Platform_effectsActive)
            return;
        _Platform_effectsActive = true;
        for (var fx; fx = _Platform_effectsQueue.shift();) {
            _Platform_dispatchEffects(fx.p, fx.q, fx.r);
        }
        _Platform_effectsActive = false;
    }
    function _Platform_dispatchEffects(managers, cmdBag, subBag) {
        var effectsDict = {};
        _Platform_gatherEffects(true, cmdBag, effectsDict, null);
        _Platform_gatherEffects(false, subBag, effectsDict, null);
        for (var home in managers) {
            _Scheduler_rawSend(managers[home], {
                $: "fx",
                a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
            });
        }
    }
    function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers) {
        switch (bag.$) {
            case 1:
                var home = bag.k;
                var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
                effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
                return;
            case 2:
                for (var list = bag.m; list.b; list = list.b) {
                    _Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
                }
                return;
            case 3:
                _Platform_gatherEffects(isCmd, bag.o, effectsDict, {
                    s: bag.n,
                    t: taggers
                });
                return;
        }
    }
    function _Platform_toEffect(isCmd, home, taggers, value) {
        function applyTaggers(x) {
            for (var temp = taggers; temp; temp = temp.t) {
                x = temp.s(x);
            }
            return x;
        }
        var map = isCmd
            ? _Platform_effectManagers[home].e
            : _Platform_effectManagers[home].f;
        return A2(map, applyTaggers, value);
    }
    function _Platform_insert(isCmd, newEffect, effects) {
        effects = effects || { i: _List_Nil, j: _List_Nil };
        isCmd
            ? (effects.i = _List_Cons(newEffect, effects.i))
            : (effects.j = _List_Cons(newEffect, effects.j));
        return effects;
    }
    function _Platform_checkPortName(name) {
        if (_Platform_effectManagers[name]) {
            _Debug_crash(3, name);
        }
    }
    function _Platform_outgoingPort(name, converter) {
        _Platform_checkPortName(name);
        _Platform_effectManagers[name] = {
            e: _Platform_outgoingPortMap,
            u: converter,
            a: _Platform_setupOutgoingPort
        };
        return _Platform_leaf(name);
    }
    var _Platform_outgoingPortMap_fn = function (tagger, value) { return value; }, _Platform_outgoingPortMap = F2(_Platform_outgoingPortMap_fn);
    function _Platform_setupOutgoingPort(name) {
        var subs = [];
        var converter = _Platform_effectManagers[name].u;
        var init = _Process_sleep(0);
        _Platform_effectManagers[name].b = init;
        _Platform_effectManagers[name].c = F3(function (router, cmdList, state) {
            for (; cmdList.b; cmdList = cmdList.b) {
                var currentSubs = subs;
                var value = _Json_unwrap(converter(cmdList.a));
                for (var i = 0; i < currentSubs.length; i++) {
                    currentSubs[i](value);
                }
            }
            return init;
        });
        function subscribe(callback) {
            subs.push(callback);
        }
        function unsubscribe(callback) {
            subs = subs.slice();
            var index = subs.indexOf(callback);
            if (index >= 0) {
                subs.splice(index, 1);
            }
        }
        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe
        };
    }
    function _Platform_incomingPort(name, converter) {
        _Platform_checkPortName(name);
        _Platform_effectManagers[name] = {
            f: _Platform_incomingPortMap,
            u: converter,
            a: _Platform_setupIncomingPort
        };
        return _Platform_leaf(name);
    }
    var _Platform_incomingPortMap_fn = function (tagger, finalTagger) {
        return function (value) {
            return tagger(finalTagger(value));
        };
    }, _Platform_incomingPortMap = F2(_Platform_incomingPortMap_fn);
    function _Platform_setupIncomingPort(name, sendToApp) {
        var subs = _List_Nil;
        var converter = _Platform_effectManagers[name].u;
        var init = _Scheduler_succeed(null);
        _Platform_effectManagers[name].b = init;
        _Platform_effectManagers[name].c = F3(function (router, subList, state) {
            subs = subList;
            return init;
        });
        function send(incomingValue) {
            var result = _Json_run_fn(converter, _Json_wrap(incomingValue));
            $elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);
            var value = result.a;
            for (var temp = subs; temp.b; temp = temp.b) {
                sendToApp(temp.a(value));
            }
        }
        return { send: send };
    }
    function _Platform_export(exports) {
        scope["Elm"]
            ? _Platform_mergeExportsProd(scope["Elm"], exports)
            : scope["Elm"] = exports;
    }
    function _Platform_mergeExportsProd(obj, exports) {
        for (var name in exports) {
            (name in obj)
                ? (name == "init")
                    ? _Debug_crash(6)
                    : _Platform_mergeExportsProd(obj[name], exports[name])
                : (obj[name] = exports[name]);
        }
    }
    function _Platform_export_UNUSED(exports) {
        scope["Elm"]
            ? _Platform_mergeExportsDebug("Elm", scope["Elm"], exports)
            : scope["Elm"] = exports;
    }
    function _Platform_mergeExportsDebug(moduleName, obj, exports) {
        for (var name in exports) {
            (name in obj)
                ? (name == "init")
                    ? _Debug_crash(6, moduleName)
                    : _Platform_mergeExportsDebug(moduleName + "." + name, obj[name], exports[name])
                : (obj[name] = exports[name]);
        }
    }
    var _Bitwise_and_fn = function (a, b) {
        return a & b;
    }, _Bitwise_and = F2(_Bitwise_and_fn);
    var _Bitwise_or_fn = function (a, b) {
        return a | b;
    }, _Bitwise_or = F2(_Bitwise_or_fn);
    var _Bitwise_xor_fn = function (a, b) {
        return a ^ b;
    }, _Bitwise_xor = F2(_Bitwise_xor_fn);
    function _Bitwise_complement(a) {
        return ~a;
    }
    ;
    var _Bitwise_shiftLeftBy_fn = function (offset, a) {
        return a << offset;
    }, _Bitwise_shiftLeftBy = F2(_Bitwise_shiftLeftBy_fn);
    var _Bitwise_shiftRightBy_fn = function (offset, a) {
        return a >> offset;
    }, _Bitwise_shiftRightBy = F2(_Bitwise_shiftRightBy_fn);
    var _Bitwise_shiftRightZfBy_fn = function (offset, a) {
        return a >>> offset;
    }, _Bitwise_shiftRightZfBy = F2(_Bitwise_shiftRightZfBy_fn);
    var $elm$core$List$cons = _List_cons;
    var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
    var $elm$core$Array$foldr_fn = function (func, baseCase, _v0) {
        var tree = _v0.c;
        var tail = _v0.d;
        var helper = F2(function (node, acc) {
            if (!node.$) {
                var subTree = node.a;
                return _JsArray_foldr_fn(helper, acc, subTree);
            }
            else {
                var values = node.a;
                return _JsArray_foldr_fn(func, acc, values);
            }
        });
        return _JsArray_foldr_fn(helper, _JsArray_foldr_fn(func, baseCase, tail), tree);
    }, $elm$core$Array$foldr = F3($elm$core$Array$foldr_fn);
    var $elm$core$Array$toList = function (array) {
        return $elm$core$Array$foldr_fn($elm$core$List$cons, _List_Nil, array);
    };
    var $elm$core$Dict$foldr_fn = function (func, acc, t) {
        foldr: while (true) {
            if (t.$ === -2) {
                return acc;
            }
            else {
                var key = t.b;
                var value = t.c;
                var left = t.d;
                var right = t.e;
                var $temp$func = func, $temp$acc = A3(func, key, value, $elm$core$Dict$foldr_fn(func, acc, right)), $temp$t = left;
                func = $temp$func;
                acc = $temp$acc;
                t = $temp$t;
                continue foldr;
            }
        }
    }, $elm$core$Dict$foldr_fn_unwrapped = function (func, acc, t) {
        foldr: while (true) {
            if (t.$ === -2) {
                return acc;
            }
            else {
                var key = t.b;
                var value = t.c;
                var left = t.d;
                var right = t.e;
                var $temp$func = func, $temp$acc = func(key, value, $elm$core$Dict$foldr_fn_unwrapped(func, acc, right)), $temp$t = left;
                func = $temp$func;
                acc = $temp$acc;
                t = $temp$t;
                continue foldr;
            }
        }
    }, $elm$core$Dict$foldr = F3($elm$core$Dict$foldr_fn);
    var $elm$core$Dict$toList = function (dict) {
        return $elm$core$Dict$foldr_fn_unwrapped(function (key, value, list) {
            return _List_Cons(_Utils_Tuple2(key, value), list);
        }, _List_Nil, dict);
    };
    var $elm$core$Dict$keys = function (dict) {
        return $elm$core$Dict$foldr_fn_unwrapped(function (key, value, keyList) {
            return _List_Cons(key, keyList);
        }, _List_Nil, dict);
    };
    var $elm$core$Set$toList = function (_v0) {
        var dict = _v0;
        return $elm$core$Dict$keys(dict);
    };
    var $elm$core$Basics$EQ = 1;
    var $elm$core$Basics$GT = 2;
    var $elm$core$Basics$LT = 0;
    var $author$project$Theme$Theme_fn = function (colors, palettes, spacing, typography, borders, shadows) {
        return { ec: borders, b0: colors, fm: palettes, dA: shadows, dF: spacing, fJ: typography };
    }, $author$project$Theme$Theme = F6($author$project$Theme$Theme_fn);
    var $author$project$Theme$BorderVariant_fn = function (rounded, width) {
        return { ds: rounded, bK: width };
    }, $author$project$Theme$BorderVariant = F2($author$project$Theme$BorderVariant_fn);
    var $elm$core$Basics$apR_fn = function (x, f) {
        return f(x);
    }, $elm$core$Basics$apR = F2($elm$core$Basics$apR_fn);
    var $elm$core$Result$Err = function (a) {
        return { $: 1, a: a };
    };
    var $elm$json$Json$Decode$Failure_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $elm$json$Json$Decode$Failure = F2($elm$json$Json$Decode$Failure_fn);
    var $elm$json$Json$Decode$Field_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$json$Json$Decode$Field = F2($elm$json$Json$Decode$Field_fn);
    var $elm$json$Json$Decode$Index_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $elm$json$Json$Decode$Index = F2($elm$json$Json$Decode$Index_fn);
    var $elm$core$Result$Ok = function (a) {
        return { $: 0, a: a };
    };
    var $elm$json$Json$Decode$OneOf = function (a) {
        return { $: 2, a: a };
    };
    var $elm$core$Basics$False = 1;
    var $elm$core$Basics$add = _Basics_add;
    var $elm$core$Maybe$Just = function (a) { return { $: 0, a: a }; };
    var $elm$core$Maybe$Nothing = { $: 1, a: null };
    var $elm$core$String$all = _String_all;
    var $elm$core$Basics$and = _Basics_and;
    var $elm$core$Basics$append = _Utils_append;
    var $elm$json$Json$Encode$encode = _Json_encode;
    var $elm$core$String$fromInt = _String_fromNumber;
    var $elm$core$String$join_fn = function (sep, chunks) {
        return _String_join_fn(sep, _List_toArray(chunks));
    }, $elm$core$String$join = F2($elm$core$String$join_fn);
    var $elm$core$String$split_fn = function (sep, string) {
        return _List_fromArray(_String_split_fn(sep, string));
    }, $elm$core$String$split = F2($elm$core$String$split_fn);
    var $elm$json$Json$Decode$indent = function (str) {
        return $elm$core$String$join_fn("\n    ", $elm$core$String$split_fn("\n", str));
    };
    var $elm$core$List$foldl_fn = function (func, acc, list) {
        foldl: while (true) {
            if (!list.b) {
                return acc;
            }
            else {
                var x = list.a;
                var xs = list.b;
                var $temp$func = func, $temp$acc = A2(func, x, acc), $temp$list = xs;
                func = $temp$func;
                acc = $temp$acc;
                list = $temp$list;
                continue foldl;
            }
        }
    }, $elm$core$List$foldl_fn_unwrapped = function (func, acc, list) {
        foldl: while (true) {
            if (!list.b) {
                return acc;
            }
            else {
                var x = list.a;
                var xs = list.b;
                var $temp$func = func, $temp$acc = func(x, acc), $temp$list = xs;
                func = $temp$func;
                acc = $temp$acc;
                list = $temp$list;
                continue foldl;
            }
        }
    }, $elm$core$List$foldl = F3($elm$core$List$foldl_fn);
    var $elm$core$List$length = function (xs) {
        return $elm$core$List$foldl_fn_unwrapped(function (_v0, i) {
            return i + 1;
        }, 0, xs);
    };
    var $elm$core$List$map2 = _List_map2;
    var $elm$core$Basics$le = _Utils_le;
    var $elm$core$Basics$sub = _Basics_sub;
    var $elm$core$List$rangeHelp_fn = function (lo, hi, list) {
        rangeHelp: while (true) {
            if (_Utils_cmp(lo, hi) < 1) {
                var $temp$lo = lo, $temp$hi = hi - 1, $temp$list = _List_Cons(hi, list);
                lo = $temp$lo;
                hi = $temp$hi;
                list = $temp$list;
                continue rangeHelp;
            }
            else {
                return list;
            }
        }
    }, $elm$core$List$rangeHelp = F3($elm$core$List$rangeHelp_fn);
    var $elm$core$List$range_fn = function (lo, hi) {
        return $elm$core$List$rangeHelp_fn(lo, hi, _List_Nil);
    }, $elm$core$List$range = F2($elm$core$List$range_fn);
    var $elm$core$List$indexedMap_fn = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (var i = 0; xs.b; i++, xs = xs.b) {
            var next = _List_Cons(A2(f, i, xs.a), _List_Nil);
            end.b = next;
            end = next;
        }
        return tmp.b;
    }, $elm$core$List$indexedMap_fn_unwrapped = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (var i = 0; xs.b; i++, xs = xs.b) {
            var next = _List_Cons(f(i, xs.a), _List_Nil);
            end.b = next;
            end = next;
        }
        return tmp.b;
    }, $elm$core$List$indexedMap = F2($elm$core$List$indexedMap_fn);
    var $elm$core$Char$toCode = _Char_toCode;
    var $elm$core$Char$isLower = function (_char) {
        var code = $elm$core$Char$toCode(_char);
        return (97 <= code) && (code <= 122);
    };
    var $elm$core$Char$isUpper = function (_char) {
        var code = $elm$core$Char$toCode(_char);
        return (code <= 90) && (65 <= code);
    };
    var $elm$core$Basics$or = _Basics_or;
    var $elm$core$Char$isAlpha = function (_char) {
        return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
    };
    var $elm$core$Char$isDigit = function (_char) {
        var code = $elm$core$Char$toCode(_char);
        return (code <= 57) && (48 <= code);
    };
    var $elm$core$Char$isAlphaNum = function (_char) {
        return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
    };
    var $elm$core$List$reverse = function (list) {
        return $elm$core$List$foldl_fn($elm$core$List$cons, _List_Nil, list);
    };
    var $elm$core$String$uncons = _String_uncons;
    var $elm$json$Json$Decode$errorOneOf_fn = function (i, error) {
        return "\n\n(" + ($elm$core$String$fromInt(i + 1) + (") " + $elm$json$Json$Decode$indent($elm$json$Json$Decode$errorToString(error))));
    }, $elm$json$Json$Decode$errorOneOf = F2($elm$json$Json$Decode$errorOneOf_fn);
    var $elm$json$Json$Decode$errorToString = function (error) {
        return $elm$json$Json$Decode$errorToStringHelp_fn(error, _List_Nil);
    };
    var $elm$json$Json$Decode$errorToStringHelp_fn = function (error, context) {
        errorToStringHelp: while (true) {
            switch (error.$) {
                case 0:
                    var f = error.a;
                    var err = error.b;
                    var isSimple = function () {
                        var _v1 = $elm$core$String$uncons(f);
                        if (_v1.$ === 1) {
                            return false;
                        }
                        else {
                            var _v2 = _v1.a;
                            var _char = _v2.a;
                            var rest = _v2.b;
                            return $elm$core$Char$isAlpha(_char) && _String_all_fn($elm$core$Char$isAlphaNum, rest);
                        }
                    }();
                    var fieldName = isSimple ? ("." + f) : ("['" + (f + "']"));
                    var $temp$error = err, $temp$context = _List_Cons(fieldName, context);
                    error = $temp$error;
                    context = $temp$context;
                    continue errorToStringHelp;
                case 1:
                    var i = error.a;
                    var err = error.b;
                    var indexName = "[" + ($elm$core$String$fromInt(i) + "]");
                    var $temp$error = err, $temp$context = _List_Cons(indexName, context);
                    error = $temp$error;
                    context = $temp$context;
                    continue errorToStringHelp;
                case 2:
                    var errors = error.a;
                    if (!errors.b) {
                        return "Ran into a Json.Decode.oneOf with no possibilities" + function () {
                            if (!context.b) {
                                return "!";
                            }
                            else {
                                return " at json" + $elm$core$String$join_fn("", $elm$core$List$reverse(context));
                            }
                        }();
                    }
                    else {
                        if (!errors.b.b) {
                            var err = errors.a;
                            var $temp$error = err, $temp$context = context;
                            error = $temp$error;
                            context = $temp$context;
                            continue errorToStringHelp;
                        }
                        else {
                            var starter = function () {
                                if (!context.b) {
                                    return "Json.Decode.oneOf";
                                }
                                else {
                                    return "The Json.Decode.oneOf at json" + $elm$core$String$join_fn("", $elm$core$List$reverse(context));
                                }
                            }();
                            var introduction = starter + (" failed in the following " + ($elm$core$String$fromInt($elm$core$List$length(errors)) + " ways:"));
                            return $elm$core$String$join_fn("\n\n", _List_Cons(introduction, $elm$core$List$indexedMap_fn($elm$json$Json$Decode$errorOneOf, errors)));
                        }
                    }
                default:
                    var msg = error.a;
                    var json = error.b;
                    var introduction = function () {
                        if (!context.b) {
                            return "Problem with the given value:\n\n";
                        }
                        else {
                            return "Problem with the value at json" + ($elm$core$String$join_fn("", $elm$core$List$reverse(context)) + ":\n\n    ");
                        }
                    }();
                    return introduction + ($elm$json$Json$Decode$indent(_Json_encode_fn(4, json)) + ("\n\n" + msg));
            }
        }
    }, $elm$json$Json$Decode$errorToStringHelp = F2($elm$json$Json$Decode$errorToStringHelp_fn);
    var $elm$core$Array$branchFactor = 32;
    var $elm$core$Array$Array_elm_builtin_fn = function (a, b, c, d) {
        return { $: 0, a: a, b: b, c: c, d: d };
    }, $elm$core$Array$Array_elm_builtin = F4($elm$core$Array$Array_elm_builtin_fn);
    var $elm$core$Elm$JsArray$empty = _JsArray_empty;
    var $elm$core$Basics$ceiling = _Basics_ceiling;
    var $elm$core$Basics$fdiv = _Basics_fdiv;
    var $elm$core$Basics$logBase_fn = function (base, number) {
        return _Basics_log(number) / _Basics_log(base);
    }, $elm$core$Basics$logBase = F2($elm$core$Basics$logBase_fn);
    var $elm$core$Basics$toFloat = _Basics_toFloat;
    var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling($elm$core$Basics$logBase_fn(2, $elm$core$Array$branchFactor));
    var $elm$core$Array$empty = $elm$core$Array$Array_elm_builtin_fn(0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
    var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
    var $elm$core$Array$Leaf = function (a) {
        return { $: 1, a: a };
    };
    var $elm$core$Basics$apL_fn = function (f, x) {
        return f(x);
    }, $elm$core$Basics$apL = F2($elm$core$Basics$apL_fn);
    var $elm$core$Basics$eq = _Utils_equal;
    var $elm$core$Basics$floor = _Basics_floor;
    var $elm$core$Elm$JsArray$length = _JsArray_length;
    var $elm$core$Basics$gt = _Utils_gt;
    var $elm$core$Basics$max_fn = function (x, y) {
        return (_Utils_cmp(x, y) > 0) ? x : y;
    }, $elm$core$Basics$max = F2($elm$core$Basics$max_fn);
    var $elm$core$Basics$mul = _Basics_mul;
    var $elm$core$Array$SubTree = function (a) {
        return { $: 0, a: a };
    };
    var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
    var $elm$core$Array$compressNodes_fn = function (nodes, acc) {
        compressNodes: while (true) {
            var _v0 = _JsArray_initializeFromList_fn($elm$core$Array$branchFactor, nodes);
            var node = _v0.a;
            var remainingNodes = _v0.b;
            var newAcc = _List_Cons($elm$core$Array$SubTree(node), acc);
            if (!remainingNodes.b) {
                return $elm$core$List$reverse(newAcc);
            }
            else {
                var $temp$nodes = remainingNodes, $temp$acc = newAcc;
                nodes = $temp$nodes;
                acc = $temp$acc;
                continue compressNodes;
            }
        }
    }, $elm$core$Array$compressNodes = F2($elm$core$Array$compressNodes_fn);
    var $elm$core$Tuple$first = function (_v0) {
        var x = _v0.a;
        return x;
    };
    var $elm$core$Array$treeFromBuilder_fn = function (nodeList, nodeListSize) {
        treeFromBuilder: while (true) {
            var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
            if (newNodeSize === 1) {
                return _JsArray_initializeFromList_fn($elm$core$Array$branchFactor, nodeList).a;
            }
            else {
                var $temp$nodeList = $elm$core$Array$compressNodes_fn(nodeList, _List_Nil), $temp$nodeListSize = newNodeSize;
                nodeList = $temp$nodeList;
                nodeListSize = $temp$nodeListSize;
                continue treeFromBuilder;
            }
        }
    }, $elm$core$Array$treeFromBuilder = F2($elm$core$Array$treeFromBuilder_fn);
    var $elm$core$Array$builderToArray_fn = function (reverseNodeList, builder) {
        if (!builder.x) {
            return $elm$core$Array$Array_elm_builtin_fn($elm$core$Elm$JsArray$length(builder.A), $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, builder.A);
        }
        else {
            var treeLen = builder.x * $elm$core$Array$branchFactor;
            var depth = $elm$core$Basics$floor($elm$core$Basics$logBase_fn($elm$core$Array$branchFactor, treeLen - 1));
            var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.C) : builder.C;
            var tree = $elm$core$Array$treeFromBuilder_fn(correctNodeList, builder.x);
            return $elm$core$Array$Array_elm_builtin_fn($elm$core$Elm$JsArray$length(builder.A) + treeLen, $elm$core$Basics$max_fn(5, depth * $elm$core$Array$shiftStep), tree, builder.A);
        }
    }, $elm$core$Array$builderToArray = F2($elm$core$Array$builderToArray_fn);
    var $elm$core$Basics$idiv = _Basics_idiv;
    var $elm$core$Basics$lt = _Utils_lt;
    var $elm$core$Array$initializeHelp_fn = function (fn, fromIndex, len, nodeList, tail) {
        initializeHelp: while (true) {
            if (fromIndex < 0) {
                return $elm$core$Array$builderToArray_fn(false, { C: nodeList, x: (len / $elm$core$Array$branchFactor) | 0, A: tail });
            }
            else {
                var leaf = $elm$core$Array$Leaf(_JsArray_initialize_fn($elm$core$Array$branchFactor, fromIndex, fn));
                var $temp$fn = fn, $temp$fromIndex = fromIndex - $elm$core$Array$branchFactor, $temp$len = len, $temp$nodeList = _List_Cons(leaf, nodeList), $temp$tail = tail;
                fn = $temp$fn;
                fromIndex = $temp$fromIndex;
                len = $temp$len;
                nodeList = $temp$nodeList;
                tail = $temp$tail;
                continue initializeHelp;
            }
        }
    }, $elm$core$Array$initializeHelp = F5($elm$core$Array$initializeHelp_fn);
    var $elm$core$Basics$remainderBy = _Basics_remainderBy;
    var $elm$core$Array$initialize_fn = function (len, fn) {
        if (len <= 0) {
            return $elm$core$Array$empty;
        }
        else {
            var tailLen = len % $elm$core$Array$branchFactor;
            var tail = _JsArray_initialize_fn(tailLen, len - tailLen, fn);
            var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
            return $elm$core$Array$initializeHelp_fn(fn, initialFromIndex, len, _List_Nil, tail);
        }
    }, $elm$core$Array$initialize = F2($elm$core$Array$initialize_fn);
    var $elm$core$Basics$True = 0;
    var $elm$core$Result$isOk = function (result) {
        if (!result.$) {
            return true;
        }
        else {
            return false;
        }
    };
    var $elm$json$Json$Decode$field = _Json_decodeField;
    var $elm$json$Json$Decode$int = _Json_decodeInt;
    var $elm$json$Json$Decode$map = _Json_map1;
    var $elm$json$Json$Decode$map2 = _Json_map2;
    var $elm$json$Json$Decode$oneOf = _Json_oneOf;
    var $elm$json$Json$Decode$succeed = _Json_succeed;
    var $elm$json$Json$Decode$maybe = function (decoder) {
        return $elm$json$Json$Decode$oneOf(_List_fromArray([
            _Json_map1_fn($elm$core$Maybe$Just, decoder),
            $elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
        ]));
    };
    var $elm$core$Maybe$withDefault_fn = function (_default, maybe) {
        if (!maybe.$) {
            var value = maybe.a;
            return value;
        }
        else {
            return _default;
        }
    }, $elm$core$Maybe$withDefault = F2($elm$core$Maybe$withDefault_fn);
    var $author$project$Theme$Decoder$decodeBorderVariant = _Json_map2_fn($author$project$Theme$BorderVariant, _Json_map1_fn($elm$core$Maybe$withDefault(0), $elm$json$Json$Decode$maybe(_Json_decodeField_fn("rounded", $elm$json$Json$Decode$int))), _Json_map1_fn($elm$core$Maybe$withDefault(1), $elm$json$Json$Decode$maybe(_Json_decodeField_fn("width", $elm$json$Json$Decode$int))));
    var $author$project$Theme$ColorPalette_fn = function (foreground, background, border) {
        return { aM: background, a8: border, eK: foreground };
    }, $author$project$Theme$ColorPalette = F3($author$project$Theme$ColorPalette_fn);
    var $elm$core$Basics$identity = function (x) {
        return x;
    };
    var $author$project$Theme$Name = $elm$core$Basics$identity;
    var $elm$json$Json$Decode$andThen = _Json_andThen;
    var $elm$json$Json$Decode$fail = _Json_fail;
    var $elm$parser$Parser$Advanced$Empty = { $: 0 };
    var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
    var $elm$parser$Parser$Advanced$Append_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $elm$parser$Parser$Advanced$Append = F2($elm$parser$Parser$Advanced$Append_fn);
    var $elm$parser$Parser$Advanced$Bad_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $elm$parser$Parser$Advanced$Bad = F2($elm$parser$Parser$Advanced$Bad_fn);
    var $elm$parser$Parser$Advanced$oneOfHelp_fn = function (s0, bag, parsers) {
        oneOfHelp: while (true) {
            if (!parsers.b) {
                return $elm$parser$Parser$Advanced$Bad_fn(false, bag);
            }
            else {
                var parse = parsers.a;
                var remainingParsers = parsers.b;
                var _v1 = parse(s0);
                if (!_v1.$) {
                    var step = _v1;
                    return step;
                }
                else {
                    var step = _v1;
                    var p = step.a;
                    var x = step.b;
                    if (p) {
                        return step;
                    }
                    else {
                        var $temp$s0 = s0, $temp$bag = $elm$parser$Parser$Advanced$Append_fn(bag, x), $temp$parsers = remainingParsers;
                        s0 = $temp$s0;
                        bag = $temp$bag;
                        parsers = $temp$parsers;
                        continue oneOfHelp;
                    }
                }
            }
        }
    }, $elm$parser$Parser$Advanced$oneOfHelp = F3($elm$parser$Parser$Advanced$oneOfHelp_fn);
    var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
        return function (s) {
            return $elm$parser$Parser$Advanced$oneOfHelp_fn(s, $elm$parser$Parser$Advanced$Empty, parsers);
        };
    };
    var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
    var $author$project$Theme$Color_fn = function (a, b, c) {
        return { $: 0, a: a, b: b, c: c };
    }, $author$project$Theme$Color = F3($author$project$Theme$Color_fn);
    var $elm$core$Basics$always_fn = function (a, _v0) {
        return a;
    }, $elm$core$Basics$always = F2($elm$core$Basics$always_fn);
    var $elm$parser$Parser$Advanced$Good_fn = function (a, b, c) {
        return { $: 0, a: a, b: b, c: c };
    }, $elm$parser$Parser$Advanced$Good = F3($elm$parser$Parser$Advanced$Good_fn);
    var $elm$parser$Parser$Advanced$map2_fn = function (func, _v0, _v1) {
        var parseA = _v0;
        var parseB = _v1;
        return function (s0) {
            var _v2 = parseA(s0);
            if (_v2.$ === 1) {
                var p = _v2.a;
                var x = _v2.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p1 = _v2.a;
                var a = _v2.b;
                var s1 = _v2.c;
                var _v3 = parseB(s1);
                if (_v3.$ === 1) {
                    var p2 = _v3.a;
                    var x = _v3.b;
                    return $elm$parser$Parser$Advanced$Bad_fn(p1 || p2, x);
                }
                else {
                    var p2 = _v3.a;
                    var b = _v3.b;
                    var s2 = _v3.c;
                    return $elm$parser$Parser$Advanced$Good_fn(p1 || p2, A2(func, a, b), s2);
                }
            }
        };
    }, $elm$parser$Parser$Advanced$map2_fn_unwrapped = function (func, _v0, _v1) {
        var parseA = _v0;
        var parseB = _v1;
        return function (s0) {
            var _v2 = parseA(s0);
            if (_v2.$ === 1) {
                var p = _v2.a;
                var x = _v2.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p1 = _v2.a;
                var a = _v2.b;
                var s1 = _v2.c;
                var _v3 = parseB(s1);
                if (_v3.$ === 1) {
                    var p2 = _v3.a;
                    var x = _v3.b;
                    return $elm$parser$Parser$Advanced$Bad_fn(p1 || p2, x);
                }
                else {
                    var p2 = _v3.a;
                    var b = _v3.b;
                    var s2 = _v3.c;
                    return $elm$parser$Parser$Advanced$Good_fn(p1 || p2, func(a, b), s2);
                }
            }
        };
    }, $elm$parser$Parser$Advanced$map2 = F3($elm$parser$Parser$Advanced$map2_fn);
    var $elm$parser$Parser$Advanced$ignorer_fn = function (keepParser, ignoreParser) {
        return $elm$parser$Parser$Advanced$map2_fn($elm$core$Basics$always, keepParser, ignoreParser);
    }, $elm$parser$Parser$Advanced$ignorer = F2($elm$parser$Parser$Advanced$ignorer_fn);
    var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
    var $elm$parser$Parser$Advanced$keeper_fn = function (parseFunc, parseArg) {
        return $elm$parser$Parser$Advanced$map2_fn($elm$core$Basics$apL, parseFunc, parseArg);
    }, $elm$parser$Parser$Advanced$keeper = F2($elm$parser$Parser$Advanced$keeper_fn);
    var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
    var $elm$parser$Parser$Advanced$succeed = function (a) {
        return function (s) {
            return $elm$parser$Parser$Advanced$Good_fn(false, a, s);
        };
    };
    var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
    var $elm$parser$Parser$ExpectingSymbol = function (a) {
        return { $: 8, a: a };
    };
    var $elm$parser$Parser$Advanced$Token_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$parser$Parser$Advanced$Token = F2($elm$parser$Parser$Advanced$Token_fn);
    var $elm$parser$Parser$Advanced$AddRight_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $elm$parser$Parser$Advanced$AddRight = F2($elm$parser$Parser$Advanced$AddRight_fn);
    var $elm$parser$Parser$Advanced$DeadEnd_fn = function (row, col, problem, contextStack) {
        return { b$: col, er: contextStack, fo: problem, du: row };
    }, $elm$parser$Parser$Advanced$DeadEnd = F4($elm$parser$Parser$Advanced$DeadEnd_fn);
    var $elm$parser$Parser$Advanced$fromState_fn = function (s, x) {
        return $elm$parser$Parser$Advanced$AddRight_fn($elm$parser$Parser$Advanced$Empty, $elm$parser$Parser$Advanced$DeadEnd_fn(s.du, s.b$, x, s.k));
    }, $elm$parser$Parser$Advanced$fromState = F2($elm$parser$Parser$Advanced$fromState_fn);
    var $elm$core$String$isEmpty = function (string) {
        return string === "";
    };
    var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
    var $elm$core$Basics$negate = function (n) {
        return -n;
    };
    var $elm$core$Basics$not = _Basics_not;
    var $elm$parser$Parser$Advanced$token = function (_v0) {
        var str = _v0.a;
        var expecting = _v0.b;
        var progress = !$elm$core$String$isEmpty(str);
        return function (s) {
            var _v1 = _Parser_isSubString_fn(str, s.fc, s.du, s.b$, s.bv);
            var newOffset = _v1.a;
            var newRow = _v1.b;
            var newCol = _v1.c;
            return newOffset === -1 ? $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, expecting)) : $elm$parser$Parser$Advanced$Good_fn(progress, 0, { b$: newCol, k: s.k, o: s.o, fc: newOffset, du: newRow, bv: s.bv });
        };
    };
    var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
    var $elm$parser$Parser$symbol = function (str) {
        return $elm$parser$Parser$Advanced$symbol($elm$parser$Parser$Advanced$Token_fn(str, $elm$parser$Parser$ExpectingSymbol(str)));
    };
    var $author$project$Theme$Decoder$hex8 = $elm$parser$Parser$oneOf(_List_fromArray([
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(0), $elm$parser$Parser$symbol("0")),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(1), $elm$parser$Parser$symbol("1")),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(2), $elm$parser$Parser$symbol("2")),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(3), $elm$parser$Parser$symbol("3")),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(4), $elm$parser$Parser$symbol("4")),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(5), $elm$parser$Parser$symbol("5")),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(6), $elm$parser$Parser$symbol("6")),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(7), $elm$parser$Parser$symbol("7")),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(8), $elm$parser$Parser$symbol("8")),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(9), $elm$parser$Parser$symbol("9")),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(10), $elm$parser$Parser$oneOf(_List_fromArray([
            $elm$parser$Parser$symbol("a"),
            $elm$parser$Parser$symbol("A")
        ]))),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(11), $elm$parser$Parser$oneOf(_List_fromArray([
            $elm$parser$Parser$symbol("b"),
            $elm$parser$Parser$symbol("B")
        ]))),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(12), $elm$parser$Parser$oneOf(_List_fromArray([
            $elm$parser$Parser$symbol("c"),
            $elm$parser$Parser$symbol("C")
        ]))),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(13), $elm$parser$Parser$oneOf(_List_fromArray([
            $elm$parser$Parser$symbol("d"),
            $elm$parser$Parser$symbol("D")
        ]))),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(14), $elm$parser$Parser$oneOf(_List_fromArray([
            $elm$parser$Parser$symbol("e"),
            $elm$parser$Parser$symbol("E")
        ]))),
        $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(15), $elm$parser$Parser$oneOf(_List_fromArray([
            $elm$parser$Parser$symbol("f"),
            $elm$parser$Parser$symbol("F")
        ])))
    ]));
    var $author$project$Theme$Decoder$parseHex16 = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed(F2(function (one, two) {
        return (one * 16) + two;
    })), $author$project$Theme$Decoder$hex8), $author$project$Theme$Decoder$hex8);
    var $author$project$Theme$Decoder$parseHex = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($author$project$Theme$Color), $elm$parser$Parser$symbol("#")), $author$project$Theme$Decoder$parseHex16), $author$project$Theme$Decoder$parseHex16), $author$project$Theme$Decoder$parseHex16);
    var $elm$parser$Parser$ExpectingInt = { $: 1 };
    var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
    var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
    var $elm$parser$Parser$Advanced$bumpOffset_fn = function (newOffset, s) {
        return { b$: s.b$ + (newOffset - s.fc), k: s.k, o: s.o, fc: newOffset, du: s.du, bv: s.bv };
    }, $elm$parser$Parser$Advanced$bumpOffset = F2($elm$parser$Parser$Advanced$bumpOffset_fn);
    var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
    var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
    var $elm$parser$Parser$Advanced$consumeExp_fn = function (offset, src) {
        if (_Parser_isAsciiCode_fn(101, offset, src) || _Parser_isAsciiCode_fn(69, offset, src)) {
            var eOffset = offset + 1;
            var expOffset = (_Parser_isAsciiCode_fn(43, eOffset, src) || _Parser_isAsciiCode_fn(45, eOffset, src)) ? (eOffset + 1) : eOffset;
            var newOffset = _Parser_chompBase10_fn(expOffset, src);
            return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
        }
        else {
            return offset;
        }
    }, $elm$parser$Parser$Advanced$consumeExp = F2($elm$parser$Parser$Advanced$consumeExp_fn);
    var $elm$parser$Parser$Advanced$consumeDotAndExp_fn = function (offset, src) {
        return _Parser_isAsciiCode_fn(46, offset, src) ? $elm$parser$Parser$Advanced$consumeExp_fn(_Parser_chompBase10_fn(offset + 1, src), src) : $elm$parser$Parser$Advanced$consumeExp_fn(offset, src);
    }, $elm$parser$Parser$Advanced$consumeDotAndExp = F2($elm$parser$Parser$Advanced$consumeDotAndExp_fn);
    var $elm$parser$Parser$Advanced$finalizeInt_fn = function (invalid, handler, startOffset, _v0, s) {
        var endOffset = _v0.a;
        var n = _v0.b;
        if (handler.$ === 1) {
            var x = handler.a;
            return $elm$parser$Parser$Advanced$Bad_fn(true, $elm$parser$Parser$Advanced$fromState_fn(s, x));
        }
        else {
            var toValue = handler.a;
            return _Utils_eq(startOffset, endOffset) ? $elm$parser$Parser$Advanced$Bad_fn(_Utils_cmp(s.fc, startOffset) < 0, $elm$parser$Parser$Advanced$fromState_fn(s, invalid)) : $elm$parser$Parser$Advanced$Good_fn(true, toValue(n), $elm$parser$Parser$Advanced$bumpOffset_fn(endOffset, s));
        }
    }, $elm$parser$Parser$Advanced$finalizeInt = F5($elm$parser$Parser$Advanced$finalizeInt_fn);
    var $elm$parser$Parser$Advanced$fromInfo_fn = function (row, col, x, context) {
        return $elm$parser$Parser$Advanced$AddRight_fn($elm$parser$Parser$Advanced$Empty, $elm$parser$Parser$Advanced$DeadEnd_fn(row, col, x, context));
    }, $elm$parser$Parser$Advanced$fromInfo = F4($elm$parser$Parser$Advanced$fromInfo_fn);
    var $elm$core$String$slice = _String_slice;
    var $elm$core$String$toFloat = _String_toFloat;
    var $elm$parser$Parser$Advanced$finalizeFloat_fn = function (invalid, expecting, intSettings, floatSettings, intPair, s) {
        var intOffset = intPair.a;
        var floatOffset = $elm$parser$Parser$Advanced$consumeDotAndExp_fn(intOffset, s.bv);
        if (floatOffset < 0) {
            return $elm$parser$Parser$Advanced$Bad_fn(true, $elm$parser$Parser$Advanced$fromInfo_fn(s.du, s.b$ - (floatOffset + s.fc), invalid, s.k));
        }
        else {
            if (_Utils_eq(s.fc, floatOffset)) {
                return $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, expecting));
            }
            else {
                if (_Utils_eq(intOffset, floatOffset)) {
                    return $elm$parser$Parser$Advanced$finalizeInt_fn(invalid, intSettings, s.fc, intPair, s);
                }
                else {
                    if (floatSettings.$ === 1) {
                        var x = floatSettings.a;
                        return $elm$parser$Parser$Advanced$Bad_fn(true, $elm$parser$Parser$Advanced$fromState_fn(s, invalid));
                    }
                    else {
                        var toValue = floatSettings.a;
                        var _v1 = $elm$core$String$toFloat(_String_slice_fn(s.fc, floatOffset, s.bv));
                        if (_v1.$ === 1) {
                            return $elm$parser$Parser$Advanced$Bad_fn(true, $elm$parser$Parser$Advanced$fromState_fn(s, invalid));
                        }
                        else {
                            var n = _v1.a;
                            return $elm$parser$Parser$Advanced$Good_fn(true, toValue(n), $elm$parser$Parser$Advanced$bumpOffset_fn(floatOffset, s));
                        }
                    }
                }
            }
        }
    }, $elm$parser$Parser$Advanced$finalizeFloat = F6($elm$parser$Parser$Advanced$finalizeFloat_fn);
    var $elm$parser$Parser$Advanced$number = function (c) {
        return function (s) {
            if (_Parser_isAsciiCode_fn(48, s.fc, s.bv)) {
                var zeroOffset = s.fc + 1;
                var baseOffset = zeroOffset + 1;
                return _Parser_isAsciiCode_fn(120, zeroOffset, s.bv) ? $elm$parser$Parser$Advanced$finalizeInt_fn(c.eV, c.cu, baseOffset, _Parser_consumeBase16_fn(baseOffset, s.bv), s) : (_Parser_isAsciiCode_fn(111, zeroOffset, s.bv) ? $elm$parser$Parser$Advanced$finalizeInt_fn(c.eV, c.c1, baseOffset, _Parser_consumeBase_fn(8, baseOffset, s.bv), s) : (_Parser_isAsciiCode_fn(98, zeroOffset, s.bv) ? $elm$parser$Parser$Advanced$finalizeInt_fn(c.eV, c.bS, baseOffset, _Parser_consumeBase_fn(2, baseOffset, s.bv), s) : $elm$parser$Parser$Advanced$finalizeFloat_fn(c.eV, c.cd, c.cF, c.ck, _Utils_Tuple2(zeroOffset, 0), s)));
            }
            else {
                return $elm$parser$Parser$Advanced$finalizeFloat_fn(c.eV, c.cd, c.cF, c.ck, _Parser_consumeBase_fn(10, s.fc, s.bv), s);
            }
        };
    };
    var $elm$parser$Parser$Advanced$int_fn = function (expecting, invalid) {
        return $elm$parser$Parser$Advanced$number({
            bS: $elm$core$Result$Err(invalid),
            cd: expecting,
            ck: $elm$core$Result$Err(invalid),
            cu: $elm$core$Result$Err(invalid),
            cF: $elm$core$Result$Ok($elm$core$Basics$identity),
            eV: invalid,
            c1: $elm$core$Result$Err(invalid)
        });
    }, $elm$parser$Parser$Advanced$int = F2($elm$parser$Parser$Advanced$int_fn);
    var $elm$parser$Parser$int = $elm$parser$Parser$Advanced$int_fn($elm$parser$Parser$ExpectingInt, $elm$parser$Parser$ExpectingInt);
    var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
    var $elm$parser$Parser$Advanced$chompWhileHelp_fn = function (isGood, offset, row, col, s0) {
        chompWhileHelp: while (true) {
            var newOffset = _Parser_isSubChar_fn(isGood, offset, s0.bv);
            if (newOffset === -1) {
                return $elm$parser$Parser$Advanced$Good_fn(_Utils_cmp(s0.fc, offset) < 0, 0, { b$: col, k: s0.k, o: s0.o, fc: offset, du: row, bv: s0.bv });
            }
            else {
                if (newOffset === -2) {
                    var $temp$isGood = isGood, $temp$offset = offset + 1, $temp$row = row + 1, $temp$col = 1, $temp$s0 = s0;
                    isGood = $temp$isGood;
                    offset = $temp$offset;
                    row = $temp$row;
                    col = $temp$col;
                    s0 = $temp$s0;
                    continue chompWhileHelp;
                }
                else {
                    var $temp$isGood = isGood, $temp$offset = newOffset, $temp$row = row, $temp$col = col + 1, $temp$s0 = s0;
                    isGood = $temp$isGood;
                    offset = $temp$offset;
                    row = $temp$row;
                    col = $temp$col;
                    s0 = $temp$s0;
                    continue chompWhileHelp;
                }
            }
        }
    }, $elm$parser$Parser$Advanced$chompWhileHelp = F5($elm$parser$Parser$Advanced$chompWhileHelp_fn);
    var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
        return function (s) {
            return $elm$parser$Parser$Advanced$chompWhileHelp_fn(isGood, s.fc, s.du, s.b$, s);
        };
    };
    var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(function (c) {
        return (c === " ") || ((c === "\n") || (c === "\r"));
    });
    var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
    var $author$project$Theme$Decoder$parseRgb = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($author$project$Theme$Color), $elm$parser$Parser$symbol("rgb(")), $elm$parser$Parser$spaces), $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$int, $elm$parser$Parser$spaces), $elm$parser$Parser$symbol(",")), $elm$parser$Parser$spaces)), $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$int, $elm$parser$Parser$spaces), $elm$parser$Parser$symbol(",")), $elm$parser$Parser$spaces)), $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$int, $elm$parser$Parser$spaces), $elm$parser$Parser$symbol(")")));
    var $author$project$Theme$Decoder$parseColor = $elm$parser$Parser$oneOf(_List_fromArray([$author$project$Theme$Decoder$parseRgb, $author$project$Theme$Decoder$parseHex]));
    var $elm$core$List$foldrHelper_fn = function (fn, acc, ctr, ls) {
        if (!ls.b) {
            return acc;
        }
        else {
            var a = ls.a;
            var r1 = ls.b;
            if (!r1.b) {
                return A2(fn, a, acc);
            }
            else {
                var b = r1.a;
                var r2 = r1.b;
                if (!r2.b) {
                    return A2(fn, a, A2(fn, b, acc));
                }
                else {
                    var c = r2.a;
                    var r3 = r2.b;
                    if (!r3.b) {
                        return A2(fn, a, A2(fn, b, A2(fn, c, acc)));
                    }
                    else {
                        var d = r3.a;
                        var r4 = r3.b;
                        var res = (ctr > 500) ? $elm$core$List$foldl_fn(fn, acc, $elm$core$List$reverse(r4)) : $elm$core$List$foldrHelper_fn(fn, acc, ctr + 1, r4);
                        return A2(fn, a, A2(fn, b, A2(fn, c, A2(fn, d, res))));
                    }
                }
            }
        }
    }, $elm$core$List$foldrHelper_fn_unwrapped = function (fn, acc, ctr, ls) {
        if (!ls.b) {
            return acc;
        }
        else {
            var a = ls.a;
            var r1 = ls.b;
            if (!r1.b) {
                return fn(a, acc);
            }
            else {
                var b = r1.a;
                var r2 = r1.b;
                if (!r2.b) {
                    return fn(a, fn(b, acc));
                }
                else {
                    var c = r2.a;
                    var r3 = r2.b;
                    if (!r3.b) {
                        return fn(a, fn(b, fn(c, acc)));
                    }
                    else {
                        var d = r3.a;
                        var r4 = r3.b;
                        var res = (ctr > 500) ? $elm$core$List$foldl_fn_unwrapped(fn, acc, $elm$core$List$reverse(r4)) : $elm$core$List$foldrHelper_fn_unwrapped(fn, acc, ctr + 1, r4);
                        return fn(a, fn(b, fn(c, fn(d, res))));
                    }
                }
            }
        }
    }, $elm$core$List$foldrHelper = F4($elm$core$List$foldrHelper_fn);
    var $elm$core$List$foldr_fn = function (fn, acc, ls) {
        return $elm$core$List$foldrHelper_fn(fn, acc, 0, ls);
    }, $elm$core$List$foldr = F3($elm$core$List$foldr_fn);
    var $elm$core$List$map_fn = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; xs.b; xs
            = xs.b) {
            var next = _List_Cons(f(xs.a), _List_Nil);
            end.b = next;
            end = next;
        }
        return tmp.b;
    }, $elm$core$List$map = F2($elm$core$List$map_fn);
    var $elm$parser$Parser$DeadEnd_fn = function (row, col, problem) {
        return { b$: col, fo: problem, du: row };
    }, $elm$parser$Parser$DeadEnd = F3($elm$parser$Parser$DeadEnd_fn);
    var $elm$parser$Parser$problemToDeadEnd = function (p) {
        return $elm$parser$Parser$DeadEnd_fn(p.du, p.b$, p.fo);
    };
    var $elm$parser$Parser$Advanced$bagToList_fn = function (bag, list) {
        bagToList: while (true) {
            switch (bag.$) {
                case 0:
                    return list;
                case 1:
                    var bag1 = bag.a;
                    var x = bag.b;
                    var $temp$bag = bag1, $temp$list = _List_Cons(x, list);
                    bag = $temp$bag;
                    list = $temp$list;
                    continue bagToList;
                default:
                    var bag1 = bag.a;
                    var bag2 = bag.b;
                    var $temp$bag = bag1, $temp$list = $elm$parser$Parser$Advanced$bagToList_fn(bag2, list);
                    bag = $temp$bag;
                    list = $temp$list;
                    continue bagToList;
            }
        }
    }, $elm$parser$Parser$Advanced$bagToList = F2($elm$parser$Parser$Advanced$bagToList_fn);
    var $elm$parser$Parser$Advanced$run_fn = function (_v0, src) {
        var parse = _v0;
        var _v1 = parse({ b$: 1, k: _List_Nil, o: 1, fc: 0, du: 1, bv: src });
        if (!_v1.$) {
            var value = _v1.b;
            return $elm$core$Result$Ok(value);
        }
        else {
            var bag = _v1.b;
            return $elm$core$Result$Err($elm$parser$Parser$Advanced$bagToList_fn(bag, _List_Nil));
        }
    }, $elm$parser$Parser$Advanced$run = F2($elm$parser$Parser$Advanced$run_fn);
    var $elm$parser$Parser$run_fn = function (parser, source) {
        var _v0 = $elm$parser$Parser$Advanced$run_fn(parser, source);
        if (!_v0.$) {
            var a = _v0.a;
            return $elm$core$Result$Ok(a);
        }
        else {
            var problems = _v0.a;
            return $elm$core$Result$Err($elm$core$List$map_fn($elm$parser$Parser$problemToDeadEnd, problems));
        }
    }, $elm$parser$Parser$run = F2($elm$parser$Parser$run_fn);
    var $elm$json$Json$Decode$string = _Json_decodeString;
    var $author$project$Theme$Decoder$decodeColor = _Json_andThen_fn(function (string) {
        var _v0 = $elm$parser$Parser$run_fn($author$project$Theme$Decoder$parseColor, string);
        if (!_v0.$) {
            var color = _v0.a;
            return $elm$json$Json$Decode$succeed(color);
        }
        else {
            var err = _v0.a;
            return $elm$json$Json$Decode$fail("I don't recognize this color: " + string);
        }
    }, $elm$json$Json$Decode$string);
    var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
    var $elm$json$Json$Decode$map3 = _Json_map3;
    var $author$project$Theme$Decoder$decodeColorPalette = _Json_map1_fn($elm$core$List$map(function (_v0) {
        var key = _v0.a;
        var palette = _v0.b;
        return { eX: palette, c: key };
    }), $elm$json$Json$Decode$keyValuePairs(_Json_map3_fn($author$project$Theme$ColorPalette, _Json_decodeField_fn("foreground", $author$project$Theme$Decoder$decodeColor), _Json_decodeField_fn("background", $author$project$Theme$Decoder$decodeColor), _Json_decodeField_fn("border", $author$project$Theme$Decoder$decodeColor))));
    var $elm$core$List$append_fn = function (xs, ys) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; xs.b; xs = xs.b) {
            var next = _List_Cons(xs.a, _List_Nil);
            end.b = next;
            end = next;
        }
        end.b = ys;
        return tmp.b;
    }, $elm$core$List$append = F2($elm$core$List$append_fn);
    var $elm$core$List$concat = function (lists) {
        if (!lists.b) {
            return _List_Nil;
        }
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; lists.b.b; lists = lists.b) {
            var xs = lists.a;
            for (; xs.b; xs = xs.b) {
                var next = _List_Cons(xs.a, _List_Nil);
                end.b = next;
                end = next;
            }
        }
        end.b = lists.a;
        return tmp.b;
    };
    var $elm$core$List$concatMap_fn = function (f, lists) {
        if (!lists.b) {
            return _List_Nil;
        }
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; lists.b.
            b; lists = lists.b) {
            var xs = f(lists.a);
            for (; xs.b; xs = xs.b) {
                var next = _List_Cons(xs.a, _List_Nil);
                end.b = next;
                end = next;
            }
        }
        end.b = f(lists.a);
        return tmp.b;
    }, $elm$core$List$concatMap = F2($elm$core$List$concatMap_fn);
    var $author$project$Theme$Palette = function (a) {
        return { $: 1, a: a };
    };
    var $author$project$Theme$Single = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$Theme$Decoder$decodeNamed = function (inner) {
        return _Json_map1_fn($elm$core$List$map(function (_v0) {
            var key = _v0.a;
            var value = _v0.b;
            return { eX: value, c: key };
        }), $elm$json$Json$Decode$keyValuePairs(inner));
    };
    var $author$project$Theme$Decoder$decodePalette = function (decodeThing) {
        return $elm$json$Json$Decode$oneOf(_List_fromArray([
            _Json_map1_fn($author$project$Theme$Single, decodeThing),
            _Json_map1_fn($author$project$Theme$Palette, $author$project$Theme$Decoder$decodeNamed(decodeThing))
        ]));
    };
    var $author$project$Theme$nameToString = function (_v0) {
        var name = _v0;
        return name;
    };
    var $author$project$Theme$Decoder$flattenPalette = function (_v0) {
        var key = _v0.a;
        var palette = _v0.b;
        if (!palette.$) {
            var color = palette.a;
            return _List_fromArray([
                { eX: color, c: key }
            ]);
        }
        else {
            var colors = palette.a;
            return $elm$core$List$map_fn(function (_v2) {
                var name = _v2.c;
                var item = _v2.eX;
                return {
                    eX: item,
                    c: _Utils_ap(key, $author$project$Theme$nameToString(name))
                };
            }, colors);
        }
    };
    var $author$project$Theme$Decoder$decodeColorSwatch = _Json_map1_fn($elm$core$List$concatMap($author$project$Theme$Decoder$flattenPalette), $elm$json$Json$Decode$keyValuePairs($author$project$Theme$Decoder$decodePalette($author$project$Theme$Decoder$decodeColor)));
    var $author$project$Theme$Typeface_fn = function (face, fallback, weight, size, lineSpacing, colors) {
        return { b0: colors, eF: face, eG: fallback, e2: lineSpacing, bu: size, a4: weight };
    }, $author$project$Theme$Typeface = F6($author$project$Theme$Typeface_fn);
    var $elm$json$Json$Decode$list = _Json_decodeList;
    var $elm$json$Json$Decode$map6 = _Json_map6;
    var $author$project$Theme$Decoder$decodeTypeface = _Json_map6_fn($author$project$Theme$Typeface, _Json_decodeField_fn("face", $elm$json$Json$Decode$string), _Json_decodeField_fn("fallback", $elm$json$Json$Decode$list($elm$json$Json$Decode$string)), _Json_map1_fn($elm$core$Maybe$withDefault(400), $elm$json$Json$Decode$maybe(_Json_decodeField_fn("weight", $elm$json$Json$Decode$int))), _Json_decodeField_fn("size", $elm$json$Json$Decode$int), _Json_map1_fn($elm$core$Maybe$withDefault(1), $elm$json$Json$Decode$maybe(_Json_decodeField_fn("lineSpacing", $elm$json$Json$Decode$int))), _Json_decodeField_fn("color", $author$project$Theme$Decoder$decodePalette($author$project$Theme$Decoder$decodeColor)));
    var $author$project$Theme$Decoder$decode = _Json_map6_fn($author$project$Theme$Theme, _Json_decodeField_fn("colors", $author$project$Theme$Decoder$decodeColorSwatch), _Json_decodeField_fn("palettes", $author$project$Theme$Decoder$decodeColorPalette), _Json_decodeField_fn("spacing", $author$project$Theme$Decoder$decodeNamed($elm$json$Json$Decode$int)), _Json_decodeField_fn("typography", $author$project$Theme$Decoder$decodeNamed($author$project$Theme$Decoder$decodeTypeface)), _Json_decodeField_fn("borders", $author$project$Theme$Decoder$decodeNamed($author$project$Theme$Decoder$decodeBorderVariant)), _Json_decodeField_fn("shadows", $elm$json$Json$Decode$succeed(_List_Nil)));
    var $elm$json$Json$Decode$decodeValue = _Json_run;
    var $elm$json$Json$Encode$list_fn = function (func, entries) {
        return _Json_wrap($elm$core$List$foldl_fn(_Json_addEntry(func), _Json_emptyArray(0), entries));
    }, $elm$json$Json$Encode$list = F2($elm$json$Json$Encode$list_fn);
    var $elm$json$Json$Encode$object = function (pairs) {
        return _Json_wrap($elm$core$List$foldl_fn_unwrapped(function (_v0, obj) {
            var k = _v0.a;
            var v = _v0.b;
            return _Json_addField_fn(k, v, obj);
        }, _Json_emptyObject(0), pairs));
    };
    var $elm$json$Json$Encode$string = _Json_wrap;
    var $author$project$Gen$CodeGen$Generate$onFailureSend = _Platform_outgoingPort("onFailureSend", $elm$json$Json$Encode$list(function ($) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("description", $elm$json$Json$Encode$string($.aR)),
            _Utils_Tuple2("title", $elm$json$Json$Encode$string($.a$))
        ]));
    }));
    var $author$project$Gen$CodeGen$Generate$error = function (errs) {
        return $author$project$Gen$CodeGen$Generate$onFailureSend(errs);
    };
    var $author$project$Gen$CodeGen$Generate$onSuccessSend = _Platform_outgoingPort("onSuccessSend", $elm$json$Json$Encode$list(function ($) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("contents", $elm$json$Json$Encode$string($.b2)),
            _Utils_Tuple2("path", $elm$json$Json$Encode$string($.db)),
            _Utils_Tuple2("warnings", $elm$json$Json$Encode$list(function ($) {
                return $elm$json$Json$Encode$object(_List_fromArray([
                    _Utils_Tuple2("declaration", $elm$json$Json$Encode$string($.es)),
                    _Utils_Tuple2("warning", $elm$json$Json$Encode$string($.fP))
                ]));
            })($.dZ))
        ]));
    }));
    var $author$project$Gen$CodeGen$Generate$files = function (list) {
        return $author$project$Gen$CodeGen$Generate$onSuccessSend(list);
    };
    var $elm$core$Platform$Cmd$batch = _Platform_batch;
    var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
    var $elm$core$Platform$Sub$batch = _Platform_batch;
    var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
    var $elm$core$Platform$worker = _Platform_worker;
    var $author$project$Gen$CodeGen$Generate$fromJson_fn = function (decoder, f) {
        return $elm$core$Platform$worker({
            az: function (flags) {
                var _v0 = _Json_run_fn(decoder, flags);
                if (!_v0.$) {
                    var input = _v0.a;
                    return _Utils_Tuple2(0, $author$project$Gen$CodeGen$Generate$files(f(input)));
                }
                else {
                    var e = _v0.a;
                    return _Utils_Tuple2(0, $author$project$Gen$CodeGen$Generate$error(_List_fromArray([
                        {
                            aR: $elm$json$Json$Decode$errorToString(e),
                            a$: "Error decoding flags"
                        }
                    ])));
                }
            },
            aD: function (_v1) {
                return $elm$core$Platform$Sub$none;
            },
            aK: F2(function (_v2, model) {
                return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
            })
        });
    }, $author$project$Gen$CodeGen$Generate$fromJson = F2($author$project$Gen$CodeGen$Generate$fromJson_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$Annotation = $elm$core$Basics$identity;
    var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed = F2($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$formatAliasKey_fn = function (mod, name) {
        return $elm$core$String$join_fn(".", mod) + ("." + name);
    }, $mdgriffith$elm_codegen$Internal$Compiler$formatAliasKey = F2($mdgriffith$elm_codegen$Internal$Compiler$formatAliasKey_fn);
    var $elm$core$Basics$composeL_fn = function (g, f, x) {
        return g(f(x));
    }, $elm$core$Basics$composeL = F3($elm$core$Basics$composeL_fn);
    var $stil4m$elm_syntax$Elm$Syntax$Node$value = function (_v0) {
        var v = _v0.b;
        return v;
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$denode = $stil4m$elm_syntax$Elm$Syntax$Node$value;
    var $mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper = function (ann) {
        switch (ann.$) {
            case 0:
                var str = ann.a;
                return _List_fromArray([str]);
            case 1:
                var modName = ann.a;
                var anns = ann.b;
                return $elm$core$List$concatMap_fn(A2($elm$core$Basics$composeL, $mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper, $mdgriffith$elm_codegen$Internal$Compiler$denode), anns);
            case 2:
                return _List_Nil;
            case 3:
                var tupled = ann.a;
                return $elm$core$List$concatMap_fn(A2($elm$core$Basics$composeL, $mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper, $mdgriffith$elm_codegen$Internal$Compiler$denode), tupled);
            case 4:
                var recordDefinition = ann.a;
                return $elm$core$List$concatMap_fn(function (nodedField) {
                    var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$denode(nodedField);
                    var name = _v1.a;
                    var field = _v1.b;
                    return $mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper($mdgriffith$elm_codegen$Internal$Compiler$denode(field));
                }, recordDefinition);
            case 5:
                var recordName = ann.a;
                var recordDefinition = ann.b;
                return _List_Cons($mdgriffith$elm_codegen$Internal$Compiler$denode(recordName), $elm$core$List$concatMap_fn(function (nodedField) {
                    var _v2 = $mdgriffith$elm_codegen$Internal$Compiler$denode(nodedField);
                    var name = _v2.a;
                    var field = _v2.b;
                    return $mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper($mdgriffith$elm_codegen$Internal$Compiler$denode(field));
                }, $mdgriffith$elm_codegen$Internal$Compiler$denode(recordDefinition)));
            default:
                var one = ann.a;
                var two = ann.b;
                return $elm$core$List$concatMap_fn($mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper, _List_fromArray([
                    $mdgriffith$elm_codegen$Internal$Compiler$denode(one),
                    $mdgriffith$elm_codegen$Internal$Compiler$denode(two)
                ]));
        }
    };
    var $elm$core$List$any_fn = function (isOkay, list) {
        any: while (true) {
            if (!list.b) {
                return false;
            }
            else {
                var x = list.a;
                var xs = list.b;
                if (isOkay(x)) {
                    return true;
                }
                else {
                    var $temp$isOkay = isOkay, $temp$list = xs;
                    isOkay = $temp$isOkay;
                    list = $temp$list;
                    continue any;
                }
            }
        }
    }, $elm$core$List$any = F2($elm$core$List$any_fn);
    var $elm$core$List$member_fn = function (x, xs) {
        return $elm$core$List$any_fn(function (a) {
            return _Utils_eq(a, x);
        }, xs);
    }, $elm$core$List$member = F2($elm$core$List$member_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$uniqueHelp_fn = function (f, existing, remaining, accumulator) {
        uniqueHelp: while (true) {
            if (!remaining.b) {
                return $elm$core$List$reverse(accumulator);
            }
            else {
                var first = remaining.a;
                var rest = remaining.b;
                var computedFirst = f(first);
                if ($elm$core$List$member_fn(computedFirst, existing)) {
                    var $temp$f = f, $temp$existing = existing, $temp$remaining = rest, $temp$accumulator = accumulator;
                    f = $temp$f;
                    existing = $temp$existing;
                    remaining = $temp$remaining;
                    accumulator = $temp$accumulator;
                    continue uniqueHelp;
                }
                else {
                    var $temp$f = f, $temp$existing = _List_Cons(computedFirst, existing), $temp$remaining = rest, $temp$accumulator = _List_Cons(first, accumulator);
                    f = $temp$f;
                    existing = $temp$existing;
                    remaining = $temp$remaining;
                    accumulator = $temp$accumulator;
                    continue uniqueHelp;
                }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$uniqueHelp = F4($mdgriffith$elm_codegen$Internal$Compiler$uniqueHelp_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$unique = function (list) {
        return $mdgriffith$elm_codegen$Internal$Compiler$uniqueHelp_fn($elm$core$Basics$identity, _List_Nil, list, _List_Nil);
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$getGenerics = function (_v0) {
        var details = _v0;
        return $mdgriffith$elm_codegen$Internal$Compiler$unique($mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper(details.a));
    };
    var $elm$core$Dict$Black = 1;
    var $elm$core$Dict$RBNode_elm_builtin_fn = function (a, b, c, d, e) {
        return { $: -1, a: a, b: b, c: c, d: d, e: e };
    }, $elm$core$Dict$RBNode_elm_builtin = F5($elm$core$Dict$RBNode_elm_builtin_fn);
    var $elm$core$Dict$RBEmpty_elm_builtin = { $: -2 };
    var $elm$core$Dict$Red = 0;
    var $elm$core$Dict$balance_fn = function (color, key, value, left, right) {
        if ((right.$ === -1) && (!right.a)) {
            var _v1 = right.a;
            var rK = right.b;
            var rV = right.c;
            var rLeft = right.d;
            var rRight = right.e;
            if ((left.$ === -1) && (!left.a)) {
                var _v3 = left.a;
                var lK = left.b;
                var lV = left.c;
                var lLeft = left.d;
                var lRight = left.e;
                return $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, $elm$core$Dict$RBNode_elm_builtin_fn(1, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(1, rK, rV, rLeft, rRight));
            }
            else {
                return $elm$core$Dict$RBNode_elm_builtin_fn(color, rK, rV, $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, left, rLeft), rRight);
            }
        }
        else {
            if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
                var _v5 = left.a;
                var lK = left.b;
                var lV = left.c;
                var _v6 = left.d;
                var _v7 = _v6.a;
                var llK = _v6.b;
                var llV = _v6.c;
                var llLeft = _v6.d;
                var llRight = _v6.e;
                var lRight = left.e;
                return $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, $elm$core$Dict$RBNode_elm_builtin_fn(1, llK, llV, llLeft, llRight), $elm$core$Dict$RBNode_elm_builtin_fn(1, key, value, lRight, right));
            }
            else {
                return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, left, right);
            }
        }
    }, $elm$core$Dict$balance = F5($elm$core$Dict$balance_fn);
    var $elm$core$Basics$compare = _Utils_compare;
    var $elm$core$Dict$insertHelp_fn = function (key, value, dict) {
        if (dict.$ === -2) {
            return $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
        }
        else {
            var nColor = dict.a;
            var nKey = dict.b;
            var nValue = dict.c;
            var nLeft = dict.d;
            var nRight = dict.e;
            var _v1 = _Utils_compare_fn(key, nKey);
            switch (_v1) {
                case 0:
                    return $elm$core$Dict$balance_fn(nColor, nKey, nValue, $elm$core$Dict$insertHelp_fn(key, value, nLeft), nRight);
                case 1:
                    return $elm$core$Dict$RBNode_elm_builtin_fn(nColor, nKey, value, nLeft, nRight);
                default:
                    return $elm$core$Dict$balance_fn(nColor, nKey, nValue, nLeft, $elm$core$Dict$insertHelp_fn(key, value, nRight));
            }
        }
    }, $elm$core$Dict$insertHelp = F3($elm$core$Dict$insertHelp_fn);
    var $elm$core$Dict$insert_fn = function (key, value, dict) {
        var _v0 = $elm$core$Dict$insertHelp_fn(key, value, dict);
        if ((_v0.$ === -1) && (!_v0.a)) {
            var _v1 = _v0.a;
            var k = _v0.b;
            var v = _v0.c;
            var l = _v0.d;
            var r = _v0.e;
            return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, l, r);
        }
        else {
            var x = _v0;
            return x;
        }
    }, $elm$core$Dict$insert = F3($elm$core$Dict$insert_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$addAlias_fn = function (mod, name, ann, aliasCache) {
        var annDetails = ann;
        return $elm$core$Dict$insert_fn($mdgriffith$elm_codegen$Internal$Compiler$formatAliasKey_fn(mod, name), {
            aF: annDetails.a,
            bH: $mdgriffith$elm_codegen$Internal$Compiler$getGenerics(ann)
        }, aliasCache);
    }, $mdgriffith$elm_codegen$Internal$Compiler$addAlias = F4($mdgriffith$elm_codegen$Internal$Compiler$addAlias_fn);
    var $elm$core$String$length = _String_length;
    var $elm$core$String$dropLeft_fn = function (n, string) {
        return (n < 1) ? string : _String_slice_fn(n, $elm$core$String$length(string), string);
    }, $elm$core$String$dropLeft = F2($elm$core$String$dropLeft_fn);
    var $elm$core$String$left_fn = function (n, string) {
        return (n < 1) ? "" : _String_slice_fn(0, n, string);
    }, $elm$core$String$left = F2($elm$core$String$left_fn);
    var $elm$core$String$toUpper = _String_toUpper;
    var $mdgriffith$elm_codegen$Internal$Format$formatType = function (str) {
        return _Utils_ap($elm$core$String$toUpper($elm$core$String$left_fn(1, str)), $elm$core$String$dropLeft_fn(1, str));
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$getAliases = function (_v0) {
        var ann = _v0;
        return ann.av;
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports = function (_v0) {
        var details = _v0;
        return details.g;
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation = function (_v0) {
        var details = _v0;
        return details.a;
    };
    var $elm$core$Dict$foldl_fn = function (func, acc, dict) {
        foldl: while (true) {
            if (dict.$ === -2) {
                return acc;
            }
            else {
                var key = dict.b;
                var value = dict.c;
                var left = dict.d;
                var right = dict.e;
                var $temp$func = func, $temp$acc = A3(func, key, value, $elm$core$Dict$foldl_fn(func, acc, left)), $temp$dict = right;
                func = $temp$func;
                acc = $temp$acc;
                dict = $temp$dict;
                continue foldl;
            }
        }
    }, $elm$core$Dict$foldl_fn_unwrapped = function (func, acc, dict) {
        foldl: while (true) {
            if (dict.$ === -2) {
                return acc;
            }
            else {
                var key = dict.b;
                var value = dict.c;
                var left = dict.d;
                var right = dict.e;
                var $temp$func = func, $temp$acc = func(key, value, $elm$core$Dict$foldl_fn_unwrapped(func, acc, left)), $temp$dict = right;
                func = $temp$func;
                acc = $temp$acc;
                dict = $temp$dict;
                continue foldl;
            }
        }
    }, $elm$core$Dict$foldl = F3($elm$core$Dict$foldl_fn);
    var $elm$core$Dict$union_fn = function (t1, t2) {
        return $elm$core$Dict$foldl_fn($elm$core$Dict$insert, t2, t1);
    }, $elm$core$Dict$union = F2($elm$core$Dict$union_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$mergeAliases = $elm$core$Dict$union;
    var $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $stil4m$elm_syntax$Elm$Syntax$Node$Node = F2($stil4m$elm_syntax$Elm$Syntax$Node$Node_fn);
    var $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange = {
        l: { b1: 0, du: 0 },
        r: { b1: 0, du: 0 }
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$nodify = function (exp) {
        return $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, exp);
    };
    var $mdgriffith$elm_codegen$Elm$Annotation$alias_fn = function (mod, name, vars, target) {
        return {
            av: $mdgriffith$elm_codegen$Internal$Compiler$addAlias_fn(mod, name, target, $elm$core$List$foldl_fn_unwrapped(function (ann, aliases) {
                return $elm$core$Dict$union_fn($mdgriffith$elm_codegen$Internal$Compiler$getAliases(ann), aliases);
            }, $mdgriffith$elm_codegen$Internal$Compiler$getAliases(target), vars)),
            a: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(_Utils_Tuple2(mod, $mdgriffith$elm_codegen$Internal$Format$formatType(name))), $elm$core$List$map_fn(A2($elm$core$Basics$composeL, $mdgriffith$elm_codegen$Internal$Compiler$nodify, $mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation), vars)),
            g: function () {
                if (!mod.b) {
                    return $elm$core$List$concatMap_fn($mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, vars);
                }
                else {
                    return _Utils_ap(_List_fromArray([mod]), $elm$core$List$concatMap_fn($mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, vars));
                }
            }()
        };
    }, $mdgriffith$elm_codegen$Elm$Annotation$alias = F4($mdgriffith$elm_codegen$Elm$Annotation$alias_fn);
    var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
    var $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases = $elm$core$Dict$empty;
    var $mdgriffith$elm_codegen$Elm$Annotation$getAliases = function (_v0) {
        var ann = _v0;
        return ann.av;
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0 = $mdgriffith$elm_codegen$Internal$Compiler$nodify, $mdgriffith$elm_codegen$Internal$Compiler$nodifyAll = $elm$core$List$map($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0);
    var $mdgriffith$elm_codegen$Elm$Annotation$typed_fn = function (mod, name, args) {
        return {
            av: $elm$core$List$foldl_fn_unwrapped(function (ann, aliases) {
                return $elm$core$Dict$union_fn($mdgriffith$elm_codegen$Elm$Annotation$getAliases(ann), aliases);
            }, $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, args),
            a: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(_Utils_Tuple2(mod, name)), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation, args))),
            g: $elm$core$List$concatMap_fn($mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, args)
        };
    }, $mdgriffith$elm_codegen$Elm$Annotation$typed = F3($mdgriffith$elm_codegen$Elm$Annotation$typed_fn);
    var $mdgriffith$elm_codegen$Elm$Annotation$int = $mdgriffith$elm_codegen$Elm$Annotation$typed_fn(_List_Nil, "Int", _List_Nil);
    var $author$project$Gen$Ui$moduleName_ = _List_fromArray(["Ui"]);
    var $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn = function (mod, name, args) {
        return {
            av: $elm$core$List$foldl_fn_unwrapped(function (ann, aliases) {
                return $elm$core$Dict$union_fn($mdgriffith$elm_codegen$Elm$Annotation$getAliases(ann), aliases);
            }, $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, args),
            a: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(_Utils_Tuple2(mod, $mdgriffith$elm_codegen$Internal$Format$formatType(name))), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation, args))),
            g: _List_Cons(mod, $elm$core$List$concatMap_fn($mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, args))
        };
    }, $mdgriffith$elm_codegen$Elm$Annotation$namedWith = F3($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn);
    var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record = function (a) {
        return { $: 4, a: a };
    };
    var $elm$core$Basics$composeR_fn = function (f, g, x) {
        return g(f(x));
    }, $elm$core$Basics$composeR = F3($elm$core$Basics$composeR_fn);
    var $mdgriffith$elm_codegen$Internal$Format$sanitize = function (str) {
        switch (str) {
            case "in":
                return "in_";
            case "type":
                return "type_";
            case "case":
                return "case_";
            case "let":
                return "let_";
            case "module":
                return "module_";
            case "exposing":
                return "exposing_";
            case "where":
                return "where_";
            case "main":
                return "main_";
            case "port":
                return "port_";
            case "as":
                return "as_";
            case "if":
                return "if_";
            case "import":
                return "import_";
            default:
                return str;
        }
    };
    var $elm$core$String$toLower = _String_toLower;
    var $mdgriffith$elm_codegen$Internal$Format$formatValue = function (str) {
        var formatted = _Utils_ap($elm$core$String$toLower($elm$core$String$left_fn(1, str)), $elm$core$String$dropLeft_fn(1, str));
        return $mdgriffith$elm_codegen$Internal$Format$sanitize(formatted);
    };
    var $elm$core$Tuple$second = function (_v0) {
        var y = _v0.b;
        return y;
    };
    var $mdgriffith$elm_codegen$Elm$Annotation$record = function (fields) {
        return {
            av: $elm$core$List$foldl_fn_unwrapped(function (_v0, aliases) {
                var ann = _v0.b;
                return $elm$core$Dict$union_fn($mdgriffith$elm_codegen$Elm$Annotation$getAliases(ann), aliases);
            }, $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, fields),
            a: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0, $elm$core$List$map_fn(function (_v1) {
                var name = _v1.a;
                var ann = _v1.b;
                return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$nodify($mdgriffith$elm_codegen$Internal$Format$formatValue(name)), $mdgriffith$elm_codegen$Internal$Compiler$nodify($mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(ann)));
            }, fields))),
            g: $elm$core$List$concatMap_fn(A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports), fields)
        };
    };
    var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_codegen$Elm$Annotation$var = function (a) {
        return {
            av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
            a: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType($mdgriffith$elm_codegen$Internal$Format$formatValue(a)),
            g: _List_Nil
        };
    };
    var $author$project$Gen$Ui$annotation_ = {
        d6: $mdgriffith$elm_codegen$Elm$Annotation$alias_fn($author$project$Gen$Ui$moduleName_, "Angle", _List_Nil, $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Internal", "Style2"]), "Angle", _List_Nil)),
        d9: function (attributeArg0) {
            return $mdgriffith$elm_codegen$Elm$Annotation$alias_fn($author$project$Gen$Ui$moduleName_, "Attribute", _List_fromArray([attributeArg0]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Internal", "Model2"]), "Attribute", _List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
            ])));
        },
        en: $mdgriffith$elm_codegen$Elm$Annotation$alias_fn($author$project$Gen$Ui$moduleName_, "Color", _List_Nil, $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Internal", "Style2"]), "Color", _List_Nil)),
        b8: $mdgriffith$elm_codegen$Elm$Annotation$alias_fn($author$project$Gen$Ui$moduleName_, "Edges", _List_Nil, $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
            _Utils_Tuple2("top", $mdgriffith$elm_codegen$Elm$Annotation$int),
            _Utils_Tuple2("right", $mdgriffith$elm_codegen$Elm$Annotation$int),
            _Utils_Tuple2("bottom", $mdgriffith$elm_codegen$Elm$Annotation$int),
            _Utils_Tuple2("left", $mdgriffith$elm_codegen$Elm$Annotation$int)
        ]))),
        ex: function (elementArg0) {
            return $mdgriffith$elm_codegen$Elm$Annotation$alias_fn($author$project$Gen$Ui$moduleName_, "Element", _List_fromArray([elementArg0]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Internal", "Model2"]), "Element", _List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
            ])));
        },
        cq: $mdgriffith$elm_codegen$Elm$Annotation$alias_fn($author$project$Gen$Ui$moduleName_, "Gradient", _List_Nil, $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Internal", "Style2"]), "Gradient", _List_Nil)),
        e$: $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Length", _List_Nil),
        fh: $mdgriffith$elm_codegen$Elm$Annotation$alias_fn($author$project$Gen$Ui$moduleName_, "Option", _List_Nil, $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Internal", "Model2"]), "Option", _List_Nil)),
        df: $mdgriffith$elm_codegen$Elm$Annotation$alias_fn($author$project$Gen$Ui$moduleName_, "Position", _List_Nil, $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
            _Utils_Tuple2("x", $mdgriffith$elm_codegen$Elm$Annotation$int),
            _Utils_Tuple2("y", $mdgriffith$elm_codegen$Elm$Annotation$int),
            _Utils_Tuple2("z", $mdgriffith$elm_codegen$Elm$Annotation$int)
        ])))
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$Expression = $elm$core$Basics$identity;
    var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn = function (a, b) {
        return { $: 6, a: a, b: b };
    }, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation = F2($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$MismatchedTypeVariables = { $: 4 };
    var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled = function (a) {
        return { $: 3, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn = function (a, b) {
        return { $: 14, a: a, b: b };
    }, $mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify = F2($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn);
    var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit = { $: 2 };
    var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord_fn = function (a, b) {
        return { $: 5, a: a, b: b };
    }, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord = F2($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$containsFieldByName_fn = function (_v0, _v2) {
        var _v1 = _v0.a;
        var oneName = _v1.b;
        var _v3 = _v2.a;
        var twoName = _v3.b;
        return _Utils_eq(oneName, twoName);
    }, $mdgriffith$elm_codegen$Internal$Compiler$containsFieldByName = F2($mdgriffith$elm_codegen$Internal$Compiler$containsFieldByName_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$mergeFieldLists_fn = function (fieldOne, fieldTwo) {
        return $elm$core$List$foldl_fn_unwrapped(function (_new, existing) {
            var newField = _new.b;
            return $elm$core$List$any_fn(A2($elm$core$Basics$composeL, $mdgriffith$elm_codegen$Internal$Compiler$containsFieldByName(newField), $mdgriffith$elm_codegen$Internal$Compiler$denode), existing) ? existing : _List_Cons(_new, existing);
        }, fieldOne, fieldTwo);
    }, $mdgriffith$elm_codegen$Internal$Compiler$mergeFieldLists = F2($mdgriffith$elm_codegen$Internal$Compiler$mergeFieldLists_fn);
    var $elm$core$Dict$get_fn = function (targetKey, dict) {
        get: while (true) {
            if (dict.$ === -2) {
                return $elm$core$Maybe$Nothing;
            }
            else {
                var key = dict.b;
                var value = dict.c;
                var left = dict.d;
                var right = dict.e;
                var _v1 = _Utils_compare_fn(targetKey, key);
                switch (_v1) {
                    case 0:
                        var $temp$targetKey = targetKey, $temp$dict = left;
                        targetKey = $temp$targetKey;
                        dict = $temp$dict;
                        continue get;
                    case 1:
                        return $elm$core$Maybe$Just(value);
                    default:
                        var $temp$targetKey = targetKey, $temp$dict = right;
                        targetKey = $temp$targetKey;
                        dict = $temp$dict;
                        continue get;
                }
            }
        }
    }, $elm$core$Dict$get = F2($elm$core$Dict$get_fn);
    var $elm$core$Dict$getMin = function (dict) {
        getMin: while (true) {
            if ((dict.$ === -1) && (dict.d.$ === -1)) {
                var left = dict.d;
                var $temp$dict = left;
                dict = $temp$dict;
                continue getMin;
            }
            else {
                return dict;
            }
        }
    };
    var $elm$core$Dict$moveRedLeft = function (dict) {
        if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
            if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
                var clr = dict.a;
                var k = dict.b;
                var v = dict.c;
                var _v1 = dict.d;
                var lClr = _v1.a;
                var lK = _v1.b;
                var lV = _v1.c;
                var lLeft = _v1.d;
                var lRight = _v1.e;
                var _v2 = dict.e;
                var rClr = _v2.a;
                var rK = _v2.b;
                var rV = _v2.c;
                var rLeft = _v2.d;
                var _v3 = rLeft.a;
                var rlK = rLeft.b;
                var rlV = rLeft.c;
                var rlL = rLeft.d;
                var rlR = rLeft.e;
                var rRight = _v2.e;
                return $elm$core$Dict$RBNode_elm_builtin_fn(0, rlK, rlV, $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, lLeft, lRight), rlL), $elm$core$Dict$RBNode_elm_builtin_fn(1, rK, rV, rlR, rRight));
            }
            else {
                var clr = dict.a;
                var k = dict.b;
                var v = dict.c;
                var _v4 = dict.d;
                var lClr = _v4.a;
                var lK = _v4.b;
                var lV = _v4.c;
                var lLeft = _v4.d;
                var lRight = _v4.e;
                var _v5 = dict.e;
                var rClr = _v5.a;
                var rK = _v5.b;
                var rV = _v5.c;
                var rLeft = _v5.d;
                var rRight = _v5.e;
                if (clr === 1) {
                    return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(0, rK, rV, rLeft, rRight));
                }
                else {
                    return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(0, rK, rV, rLeft, rRight));
                }
            }
        }
        else {
            return dict;
        }
    };
    var $elm$core$Dict$moveRedRight = function (dict) {
        if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
            if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
                var clr = dict.a;
                var k = dict.b;
                var v = dict.c;
                var _v1 = dict.d;
                var lClr = _v1.a;
                var lK = _v1.b;
                var lV = _v1.c;
                var _v2 = _v1.d;
                var _v3 = _v2.a;
                var llK = _v2.b;
                var llV = _v2.c;
                var llLeft = _v2.d;
                var llRight = _v2.e;
                var lRight = _v1.e;
                var _v4 = dict.e;
                var rClr = _v4.a;
                var rK = _v4.b;
                var rV = _v4.c;
                var rLeft = _v4.d;
                var rRight = _v4.e;
                return $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, $elm$core$Dict$RBNode_elm_builtin_fn(1, llK, llV, llLeft, llRight), $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, lRight, $elm$core$Dict$RBNode_elm_builtin_fn(0, rK, rV, rLeft, rRight)));
            }
            else {
                var clr = dict.a;
                var k = dict.b;
                var v = dict.c;
                var _v5 = dict.d;
                var lClr = _v5.a;
                var lK = _v5.b;
                var lV = _v5.c;
                var lLeft = _v5.d;
                var lRight = _v5.e;
                var _v6 = dict.e;
                var rClr = _v6.a;
                var rK = _v6.b;
                var rV = _v6.c;
                var rLeft = _v6.d;
                var rRight = _v6.e;
                if (clr === 1) {
                    return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(0, rK, rV, rLeft, rRight));
                }
                else {
                    return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(0, rK, rV, rLeft, rRight));
                }
            }
        }
        else {
            return dict;
        }
    };
    var $elm$core$Dict$removeHelpPrepEQGT_fn = function (targetKey, dict, color, key, value, left, right) {
        if ((left.$ === -1) && (!left.a)) {
            var _v1 = left.a;
            var lK = left.b;
            var lV = left.c;
            var lLeft = left.d;
            var lRight = left.e;
            return $elm$core$Dict$RBNode_elm_builtin_fn(color, lK, lV, lLeft, $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, lRight, right));
        }
        else {
            _v2$2: while (true) {
                if ((right.$ === -1) && (right.a === 1)) {
                    if (right.d.$ === -1) {
                        if (right.d.a === 1) {
                            var _v3 = right.a;
                            var _v4 = right.d;
                            var _v5 = _v4.a;
                            return $elm$core$Dict$moveRedRight(dict);
                        }
                        else {
                            break _v2$2;
                        }
                    }
                    else {
                        var _v6 = right.a;
                        var _v7 = right.d;
                        return $elm$core$Dict$moveRedRight(dict);
                    }
                }
                else {
                    break _v2$2;
                }
            }
            return dict;
        }
    }, $elm$core$Dict$removeHelpPrepEQGT = F7($elm$core$Dict$removeHelpPrepEQGT_fn);
    var $elm$core$Dict$removeMin = function (dict) {
        if ((dict.$ === -1) && (dict.d.$ === -1)) {
            var color = dict.a;
            var key = dict.b;
            var value = dict.c;
            var left = dict.d;
            var lColor = left.a;
            var lLeft = left.d;
            var right = dict.e;
            if (lColor === 1) {
                if ((lLeft.$ === -1) && (!lLeft.a)) {
                    var _v3 = lLeft.a;
                    return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, $elm$core$Dict$removeMin(left), right);
                }
                else {
                    var _v4 = $elm$core$Dict$moveRedLeft(dict);
                    if (_v4.$ === -1) {
                        var nColor = _v4.a;
                        var nKey = _v4.b;
                        var nValue = _v4.c;
                        var nLeft = _v4.d;
                        var nRight = _v4.e;
                        return $elm$core$Dict$balance_fn(nColor, nKey, nValue, $elm$core$Dict$removeMin(nLeft), nRight);
                    }
                    else {
                        return $elm$core$Dict$RBEmpty_elm_builtin;
                    }
                }
            }
            else {
                return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, $elm$core$Dict$removeMin(left), right);
            }
        }
        else {
            return $elm$core$Dict$RBEmpty_elm_builtin;
        }
    };
    var $elm$core$Dict$removeHelp_fn = function (targetKey, dict) {
        if (dict.$ === -2) {
            return $elm$core$Dict$RBEmpty_elm_builtin;
        }
        else {
            var color = dict.a;
            var key = dict.b;
            var value = dict.c;
            var left = dict.d;
            var right = dict.e;
            if (_Utils_cmp(targetKey, key) < 0) {
                if ((left.$ === -1) && (left.a === 1)) {
                    var _v4 = left.a;
                    var lLeft = left.d;
                    if ((lLeft.$ === -1) && (!lLeft.a)) {
                        var _v6 = lLeft.a;
                        return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, $elm$core$Dict$removeHelp_fn(targetKey, left), right);
                    }
                    else {
                        var _v7 = $elm$core$Dict$moveRedLeft(dict);
                        if (_v7.$ === -1) {
                            var nColor = _v7.a;
                            var nKey = _v7.b;
                            var nValue = _v7.c;
                            var nLeft = _v7.d;
                            var nRight = _v7.e;
                            return $elm$core$Dict$balance_fn(nColor, nKey, nValue, $elm$core$Dict$removeHelp_fn(targetKey, nLeft), nRight);
                        }
                        else {
                            return $elm$core$Dict$RBEmpty_elm_builtin;
                        }
                    }
                }
                else {
                    return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, $elm$core$Dict$removeHelp_fn(targetKey, left), right);
                }
            }
            else {
                return $elm$core$Dict$removeHelpEQGT_fn(targetKey, $elm$core$Dict$removeHelpPrepEQGT_fn(targetKey, dict, color, key, value, left, right));
            }
        }
    }, $elm$core$Dict$removeHelp = F2($elm$core$Dict$removeHelp_fn);
    var $elm$core$Dict$removeHelpEQGT_fn = function (targetKey, dict) {
        if (dict.$ === -1) {
            var color = dict.a;
            var key = dict.b;
            var value = dict.c;
            var left = dict.d;
            var right = dict.e;
            if (_Utils_eq(targetKey, key)) {
                var _v1 = $elm$core$Dict$getMin(right);
                if (_v1.$ === -1) {
                    var minKey = _v1.b;
                    var minValue = _v1.c;
                    return $elm$core$Dict$balance_fn(color, minKey, minValue, left, $elm$core$Dict$removeMin(right));
                }
                else {
                    return $elm$core$Dict$RBEmpty_elm_builtin;
                }
            }
            else {
                return $elm$core$Dict$balance_fn(color, key, value, left, $elm$core$Dict$removeHelp_fn(targetKey, right));
            }
        }
        else {
            return $elm$core$Dict$RBEmpty_elm_builtin;
        }
    }, $elm$core$Dict$removeHelpEQGT = F2($elm$core$Dict$removeHelpEQGT_fn);
    var $elm$core$Dict$remove_fn = function (key, dict) {
        var _v0 = $elm$core$Dict$removeHelp_fn(key, dict);
        if ((_v0.$ === -1) && (!_v0.a)) {
            var _v1 = _v0.a;
            var k = _v0.b;
            var v = _v0.c;
            var l = _v0.d;
            var r = _v0.e;
            return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, l, r);
        }
        else {
            var x = _v0;
            return x;
        }
    }, $elm$core$Dict$remove = F2($elm$core$Dict$remove_fn);
    var $elm$core$Dict$update_fn = function (targetKey, alter, dictionary) {
        var _v0 = alter($elm$core$Dict$get_fn(targetKey, dictionary));
        if (!_v0.$) {
            var value = _v0.a;
            return $elm$core$Dict$insert_fn(targetKey, value, dictionary);
        }
        else {
            return $elm$core$Dict$remove_fn(targetKey, dictionary);
        }
    }, $elm$core$Dict$update = F3($elm$core$Dict$update_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$addInference_fn = function (key, value, infs) {
        return $elm$core$Dict$update_fn(key, function (maybeValue) {
            if (maybeValue.$ === 1) {
                return $elm$core$Maybe$Just(value);
            }
            else {
                if (maybeValue.a.$ === 5) {
                    var _v1 = maybeValue.a;
                    var _v2 = _v1.a;
                    var range = _v2.a;
                    var recordName = _v2.b;
                    var _v3 = _v1.b;
                    var fieldRange = _v3.a;
                    var fields = _v3.b;
                    if (value.$ === 5) {
                        var _v5 = value.a;
                        var existingRange = _v5.a;
                        var existingRecordName = _v5.b;
                        var _v6 = value.b;
                        var existingFieldRange = _v6.a;
                        var existingFields = _v6.b;
                        return $elm$core$Maybe$Just($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord_fn($stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(range, recordName), $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(fieldRange, $mdgriffith$elm_codegen$Internal$Compiler$mergeFieldLists_fn(fields, existingFields))));
                    }
                    else {
                        return maybeValue;
                    }
                }
                else {
                    var existing = maybeValue.a;
                    return $elm$core$Maybe$Just(existing);
                }
            }
        }, infs);
    }, $mdgriffith$elm_codegen$Internal$Compiler$addInference = F3($mdgriffith$elm_codegen$Internal$Compiler$addInference_fn);
    var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
    var $elm$core$Set$empty = $elm$core$Dict$empty;
    var $elm$core$Dict$fromList = function (assocs) {
        return $elm$core$List$foldl_fn_unwrapped(function (_v0, dict) {
            var key = _v0.a;
            var value = _v0.b;
            return $elm$core$Dict$insert_fn(key, value, dict);
        }, $elm$core$Dict$empty, assocs);
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$getAlias_fn = function (_v0, cache) {
        var _v1 = _v0.b;
        var modName = _v1.a;
        var name = _v1.b;
        return $elm$core$Dict$get_fn($mdgriffith$elm_codegen$Internal$Compiler$formatAliasKey_fn(modName, name), cache);
    }, $mdgriffith$elm_codegen$Internal$Compiler$getAlias = F2($mdgriffith$elm_codegen$Internal$Compiler$getAlias_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$CouldNotFindField = function (a) {
        return { $: 7, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$getField_fn = function (name, val, fields, captured) {
        getField: while (true) {
            if (!fields.b) {
                return $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$CouldNotFindField({
                    eB: $elm$core$List$map_fn(A2($elm$core$Basics$composeR, $mdgriffith$elm_codegen$Internal$Compiler$denode, A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $mdgriffith$elm_codegen$Internal$Compiler$denode)), captured),
                    S: name
                }));
            }
            else {
                var top = fields.a;
                var remain = fields.b;
                var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$denode(top);
                var topFieldName = _v1.a;
                var topFieldVal = _v1.b;
                var topName = $mdgriffith$elm_codegen$Internal$Compiler$denode(topFieldName);
                var topVal = $mdgriffith$elm_codegen$Internal$Compiler$denode(topFieldVal);
                if (_Utils_eq(topName, name)) {
                    return $elm$core$Result$Ok(_Utils_Tuple2(topVal, _Utils_ap(captured, remain)));
                }
                else {
                    var $temp$name = name, $temp$val = val, $temp$fields = remain, $temp$captured = _List_Cons(top, captured);
                    name = $temp$name;
                    val = $temp$val;
                    fields = $temp$fields;
                    captured = $temp$captured;
                    continue getField;
                }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$getField = F4($mdgriffith$elm_codegen$Internal$Compiler$getField_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$isAppendable = function (annotation) {
        _v0$2: while (true) {
            if ((annotation.$ === 1) && (!annotation.a.b.a.b)) {
                switch (annotation.a.b.b) {
                    case "String":
                        var _v1 = annotation.a;
                        var _v2 = _v1.b;
                        return true;
                    case "List":
                        if (annotation.b.b && (!annotation.b.b.b)) {
                            var _v3 = annotation.a;
                            var _v4 = _v3.b;
                            var _v5 = annotation.b;
                            var _v6 = _v5.a;
                            var inner = _v6.b;
                            return true;
                        }
                        else {
                            break _v0$2;
                        }
                    default:
                        break _v0$2;
                }
            }
            else {
                break _v0$2;
            }
        }
        return false;
    };
    var $elm$core$List$all_fn = function (isOkay, list) {
        all: while (true) {
            if (!list.b) {
                return true;
            }
            else {
                var x = list.a;
                if (!isOkay(x)) {
                    return false;
                }
                list = list.b;
                continue all;
            }
        }
    }, $elm$core$List$all = F2($elm$core$List$all_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$isComparable = function (annotation) {
        isComparable: while (true) {
            _v0$6: while (true) {
                switch (annotation.$) {
                    case 1:
                        if (annotation.a.b.a.b) {
                            if (((annotation.a.b.a.a === "Char") && (!annotation.a.b.a.b.b)) && (annotation.a.b.b === "Char")) {
                                var _v5 = annotation.a;
                                var _v6 = _v5.b;
                                var _v7 = _v6.a;
                                return true;
                            }
                            else {
                                break _v0$6;
                            }
                        }
                        else {
                            switch (annotation.a.b.b) {
                                case "Int":
                                    var _v1 = annotation.a;
                                    var _v2 = _v1.b;
                                    return true;
                                case "Float":
                                    var _v3 = annotation.a;
                                    var _v4 = _v3.b;
                                    return true;
                                case "String":
                                    var _v8 = annotation.a;
                                    var _v9 = _v8.b;
                                    return true;
                                case "List":
                                    if (annotation.b.b && (!annotation.b.b.b)) {
                                        var _v10 = annotation.a;
                                        var _v11 = _v10.b;
                                        var _v12 = annotation.b;
                                        var _v13 = _v12.a;
                                        var inner = _v13.b;
                                        var $temp$annotation = inner;
                                        annotation = $temp$annotation;
                                        continue isComparable;
                                    }
                                    else {
                                        break _v0$6;
                                    }
                                default:
                                    break _v0$6;
                            }
                        }
                    case 3:
                        var innerList = annotation.a;
                        return $elm$core$List$all_fn(A2($elm$core$Basics$composeL, $mdgriffith$elm_codegen$Internal$Compiler$isComparable, $mdgriffith$elm_codegen$Internal$Compiler$denode), innerList);
                    default:
                        break _v0$6;
                }
            }
            return false;
        }
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$isNumber = function (annotation) {
        _v0$2: while (true) {
            if ((annotation.$ === 1) && (!annotation.a.b.a.b)) {
                switch (annotation.a.b.b) {
                    case "Int":
                        var _v1 = annotation.a;
                        var _v2 = _v1.b;
                        return true;
                    case "Float":
                        var _v3 = annotation.a;
                        var _v4 = _v3.b;
                        return true;
                    default:
                        break _v0$2;
                }
            }
            else {
                break _v0$2;
            }
        }
        return false;
    };
    var $elm$core$Bitwise$and = _Bitwise_and;
    var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
    var $elm$core$String$repeatHelp_fn = function (n, chunk, result) {
        return (n <= 0) ? result : $elm$core$String$repeatHelp_fn(n >> 1, _Utils_ap(chunk, chunk), (!(n & 1)) ? result : _Utils_ap(result, chunk));
    }, $elm$core$String$repeatHelp = F3($elm$core$String$repeatHelp_fn);
    var $elm$core$String$repeat_fn = function (n, chunk) {
        return $elm$core$String$repeatHelp_fn(n, chunk, "");
    }, $elm$core$String$repeat = F2($elm$core$String$repeat_fn);
    var $stil4m$structured_writer$StructuredWriter$asIndent = function (amount) {
        return $elm$core$String$repeat_fn(amount, " ");
    };
    var $elm$core$String$concat = function (strings) {
        return $elm$core$String$join_fn("", strings);
    };
    var $stil4m$structured_writer$StructuredWriter$writeIndented_fn = function (indent_, w) {
        switch (w.$) {
            case 0:
                var _v1 = w.a;
                var pre = _v1.a;
                var sep = _v1.b;
                var post = _v1.c;
                var differentLines = w.b;
                var items = w.c;
                var seperator = differentLines ? ("\n" + ($stil4m$structured_writer$StructuredWriter$asIndent(indent_) + sep)) : sep;
                return $elm$core$String$concat(_List_fromArray([
                    pre,
                    $elm$core$String$join_fn(seperator, $elm$core$List$map_fn(A2($elm$core$Basics$composeR, $elm$core$Basics$identity, $stil4m$structured_writer$StructuredWriter$writeIndented(indent_)), items)),
                    post
                ]));
            case 1:
                var items = w.a;
                return $elm$core$String$join_fn("\n" + $stil4m$structured_writer$StructuredWriter$asIndent(indent_), $elm$core$List$concatMap_fn(A2($elm$core$Basics$composeR, $stil4m$structured_writer$StructuredWriter$writeIndented(0), $elm$core$String$split("\n")), items));
            case 2:
                var s = w.a;
                return s;
            case 4:
                var n = w.a;
                var next = w.b;
                return _Utils_ap($stil4m$structured_writer$StructuredWriter$asIndent(n + indent_), $stil4m$structured_writer$StructuredWriter$writeIndented_fn(n + indent_, next));
            case 5:
                var items = w.a;
                return $elm$core$String$join_fn(" ", $elm$core$List$map_fn($stil4m$structured_writer$StructuredWriter$writeIndented(indent_), items));
            case 6:
                var items = w.a;
                return $elm$core$String$concat($elm$core$List$map_fn($stil4m$structured_writer$StructuredWriter$writeIndented(indent_), items));
            default:
                var x = w.a;
                var y = w.b;
                return _Utils_ap($stil4m$structured_writer$StructuredWriter$writeIndented_fn(indent_, x), $stil4m$structured_writer$StructuredWriter$writeIndented_fn(indent_, y));
        }
    }, $stil4m$structured_writer$StructuredWriter$writeIndented = F2($stil4m$structured_writer$StructuredWriter$writeIndented_fn);
    var $stil4m$structured_writer$StructuredWriter$write_a0 = 0, $stil4m$structured_writer$StructuredWriter$write = $stil4m$structured_writer$StructuredWriter$writeIndented($stil4m$structured_writer$StructuredWriter$write_a0);
    var $stil4m$elm_syntax$Elm$Writer$write = $stil4m$structured_writer$StructuredWriter$write;
    var $stil4m$structured_writer$StructuredWriter$Sep_fn = function (a, b, c) {
        return { $: 0, a: a, b: b, c: c };
    }, $stil4m$structured_writer$StructuredWriter$Sep = F3($stil4m$structured_writer$StructuredWriter$Sep_fn);
    var $stil4m$structured_writer$StructuredWriter$bracesComma_a0 = _Utils_Tuple3("{", ", ", "}"), $stil4m$structured_writer$StructuredWriter$bracesComma = $stil4m$structured_writer$StructuredWriter$Sep($stil4m$structured_writer$StructuredWriter$bracesComma_a0);
    var $stil4m$structured_writer$StructuredWriter$Joined = function (a) {
        return { $: 6, a: a };
    };
    var $stil4m$structured_writer$StructuredWriter$join = $stil4m$structured_writer$StructuredWriter$Joined;
    var $stil4m$structured_writer$StructuredWriter$parensComma_a0 = _Utils_Tuple3("(", ", ", ")"), $stil4m$structured_writer$StructuredWriter$parensComma = $stil4m$structured_writer$StructuredWriter$Sep($stil4m$structured_writer$StructuredWriter$parensComma_a0);
    var $elm$core$String$contains = _String_contains;
    var $stil4m$structured_writer$StructuredWriter$Str = function (a) {
        return { $: 2, a: a };
    };
    var $stil4m$structured_writer$StructuredWriter$string = $stil4m$structured_writer$StructuredWriter$Str;
    var $stil4m$elm_syntax$Elm$Writer$parensIfContainsSpaces = function (w) {
        return _String_contains_fn(" ", $stil4m$structured_writer$StructuredWriter$writeIndented_fn($stil4m$structured_writer$StructuredWriter$write_a0, w)) ? $stil4m$structured_writer$StructuredWriter$join(_List_fromArray([
            $stil4m$structured_writer$StructuredWriter$string("("),
            w,
            $stil4m$structured_writer$StructuredWriter$string(")")
        ])) : w;
    };
    var $stil4m$structured_writer$StructuredWriter$sepByComma_a0 = _Utils_Tuple3("", ", ", ""), $stil4m$structured_writer$StructuredWriter$sepByComma = $stil4m$structured_writer$StructuredWriter$Sep($stil4m$structured_writer$StructuredWriter$sepByComma_a0);
    var $stil4m$structured_writer$StructuredWriter$Spaced = function (a) {
        return { $: 5, a: a };
    };
    var $stil4m$structured_writer$StructuredWriter$spaced = $stil4m$structured_writer$StructuredWriter$Spaced;
    var $stil4m$elm_syntax$Elm$Writer$writeRecordField = function (_v4) {
        var _v5 = _v4.b;
        var name = _v5.a;
        var ref = _v5.b;
        return $stil4m$structured_writer$StructuredWriter$spaced(_List_fromArray([
            $stil4m$structured_writer$StructuredWriter$string($stil4m$elm_syntax$Elm$Syntax$Node$value(name)),
            $stil4m$structured_writer$StructuredWriter$string(":"),
            $stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(ref)
        ]));
    };
    var $stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation = function (_v0) {
        var typeAnnotation = _v0.b;
        switch (typeAnnotation.$) {
            case 0:
                var s = typeAnnotation.a;
                return $stil4m$structured_writer$StructuredWriter$string(s);
            case 1:
                var moduleNameAndName = typeAnnotation.a;
                var args = typeAnnotation.b;
                var moduleName = $stil4m$elm_syntax$Elm$Syntax$Node$value(moduleNameAndName).a;
                var k = $stil4m$elm_syntax$Elm$Syntax$Node$value(moduleNameAndName).b;
                return $stil4m$structured_writer$StructuredWriter$spaced(_List_Cons($stil4m$structured_writer$StructuredWriter$string($elm$core$String$join_fn(".", _Utils_ap(moduleName, _List_fromArray([k])))), $elm$core$List$map_fn(A2($elm$core$Basics$composeR, $stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation, $stil4m$elm_syntax$Elm$Writer$parensIfContainsSpaces), args)));
            case 2:
                return $stil4m$structured_writer$StructuredWriter$string("()");
            case 3:
                var xs = typeAnnotation.a;
                return $stil4m$structured_writer$StructuredWriter$Sep_fn($stil4m$structured_writer$StructuredWriter$parensComma_a0, false, $elm$core$List$map_fn($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation, xs));
            case 4:
                var xs = typeAnnotation.a;
                return $stil4m$structured_writer$StructuredWriter$Sep_fn($stil4m$structured_writer$StructuredWriter$bracesComma_a0, false, $elm$core$List$map_fn($stil4m$elm_syntax$Elm$Writer$writeRecordField, xs));
            case 5:
                var name = typeAnnotation.a;
                var fields = typeAnnotation.b;
                return $stil4m$structured_writer$StructuredWriter$spaced(_List_fromArray([
                    $stil4m$structured_writer$StructuredWriter$string("{"),
                    $stil4m$structured_writer$StructuredWriter$string($stil4m$elm_syntax$Elm$Syntax$Node$value(name)),
                    $stil4m$structured_writer$StructuredWriter$string("|"),
                    $stil4m$structured_writer$StructuredWriter$Sep_fn($stil4m$structured_writer$StructuredWriter$sepByComma_a0, false, $elm$core$List$map_fn($stil4m$elm_syntax$Elm$Writer$writeRecordField, $stil4m$elm_syntax$Elm$Syntax$Node$value(fields))),
                    $stil4m$structured_writer$StructuredWriter$string("}")
                ]));
            default:
                var left = typeAnnotation.a;
                var right = typeAnnotation.b;
                var addParensForSubTypeAnnotation = function (type_) {
                    if (type_.b.$ === 6) {
                        var _v3 = type_.b;
                        return $stil4m$structured_writer$StructuredWriter$join(_List_fromArray([
                            $stil4m$structured_writer$StructuredWriter$string("("),
                            $stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(type_),
                            $stil4m$structured_writer$StructuredWriter$string(")")
                        ]));
                    }
                    else {
                        return $stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(type_);
                    }
                };
                return $stil4m$structured_writer$StructuredWriter$spaced(_List_fromArray([
                    addParensForSubTypeAnnotation(left),
                    $stil4m$structured_writer$StructuredWriter$string("->"),
                    addParensForSubTypeAnnotation(right)
                ]));
        }
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$checkRestrictions_fn = function (restrictions, type_) {
        switch (restrictions.$) {
            case 0:
                return $elm$core$Result$Ok(type_);
            case 5:
                var constraints = restrictions.a;
                return $elm$core$Result$Err($stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + (" needs to be: " + ($elm$core$String$join_fn(", ", $elm$core$List$concatMap_fn(function (constraint) {
                    switch (constraint.$) {
                        case 0:
                            return _List_Nil;
                        case 5:
                            return _List_Nil;
                        case 1:
                            return _List_fromArray(["a number"]);
                        case 3:
                            return _List_fromArray(["comparable"]);
                        case 2:
                            return _List_fromArray(["appendable"]);
                        default:
                            return _List_fromArray(["appendable and comparable"]);
                    }
                }, constraints)) + "\n\nbut that's impossible!  Or Elm Codegen's s typechecker is off.")));
            case 1:
                return $mdgriffith$elm_codegen$Internal$Compiler$isNumber(type_) ? $elm$core$Result$Ok(type_) : $elm$core$Result$Err($stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + " is not a number");
            case 3:
                return $mdgriffith$elm_codegen$Internal$Compiler$isComparable(type_) ? $elm$core$Result$Ok(type_) : $elm$core$Result$Err($stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + " is not comparable.  Only Ints, Floats, Chars, Strings and Lists and Tuples of those things are comparable.");
            case 2:
                return $mdgriffith$elm_codegen$Internal$Compiler$isAppendable(type_) ? $elm$core$Result$Ok(type_) : $elm$core$Result$Err($stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + " is not appendable.  Only Strings and Lists are appendable.");
            default:
                return ($mdgriffith$elm_codegen$Internal$Compiler$isComparable(type_) || $mdgriffith$elm_codegen$Internal$Compiler$isAppendable(type_)) ? $elm$core$Result$Ok(type_) : $elm$core$Result$Err($stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + " is not appendable/comparable.  Only Strings and Lists are allowed here.");
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$checkRestrictions = F2($mdgriffith$elm_codegen$Internal$Compiler$checkRestrictions_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$NoRestrictions = { $: 0 };
    var $mdgriffith$elm_codegen$Internal$Compiler$IsAppendable = { $: 2 };
    var $mdgriffith$elm_codegen$Internal$Compiler$IsAppendableComparable = { $: 4 };
    var $mdgriffith$elm_codegen$Internal$Compiler$IsComparable = { $: 3 };
    var $mdgriffith$elm_codegen$Internal$Compiler$IsNumber = { $: 1 };
    var $elm$core$String$startsWith = _String_startsWith;
    var $mdgriffith$elm_codegen$Internal$Compiler$nameToRestrictions = function (name) {
        return _String_startsWith_fn("number", name) ? $mdgriffith$elm_codegen$Internal$Compiler$IsNumber : (_String_startsWith_fn("comparable", name) ? $mdgriffith$elm_codegen$Internal$Compiler$IsComparable : (_String_startsWith_fn("appendable", name) ? $mdgriffith$elm_codegen$Internal$Compiler$IsAppendable : (_String_startsWith_fn("compappend", name) ? $mdgriffith$elm_codegen$Internal$Compiler$IsAppendableComparable : $mdgriffith$elm_codegen$Internal$Compiler$NoRestrictions)));
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted = function (a) {
        return { $: 5, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$restrictFurther_fn = function (restriction, newRestriction) {
        switch (restriction.$) {
            case 0:
                return newRestriction;
            case 5:
                var constraints = restriction.a;
                switch (newRestriction.$) {
                    case 5:
                        var newConstraints = newRestriction.a;
                        return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(_Utils_ap(constraints, newConstraints));
                    case 0:
                        return restriction;
                    default:
                        return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(_List_Cons(newRestriction, constraints));
                }
            case 1:
                switch (newRestriction.$) {
                    case 1:
                        return newRestriction;
                    case 0:
                        return restriction;
                    case 5:
                        var constraints = newRestriction.a;
                        return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(_List_Cons(restriction, constraints));
                    default:
                        return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(_List_fromArray([restriction, newRestriction]));
                }
            case 3:
                switch (newRestriction.$) {
                    case 0:
                        return restriction;
                    case 4:
                        return newRestriction;
                    case 3:
                        return newRestriction;
                    case 5:
                        var constraints = newRestriction.a;
                        return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(_List_Cons(restriction, constraints));
                    default:
                        return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(_List_fromArray([restriction, newRestriction]));
                }
            case 2:
                switch (newRestriction.$) {
                    case 0:
                        return restriction;
                    case 4:
                        return newRestriction;
                    case 3:
                        return newRestriction;
                    case 5:
                        var constraints = newRestriction.a;
                        return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(_List_Cons(restriction, constraints));
                    default:
                        return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(_List_fromArray([restriction, newRestriction]));
                }
            default:
                switch (newRestriction.$) {
                    case 0:
                        return restriction;
                    case 4:
                        return newRestriction;
                    case 3:
                        return newRestriction;
                    case 2:
                        return newRestriction;
                    case 5:
                        var constraints = newRestriction.a;
                        return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(_List_Cons(restriction, constraints));
                    default:
                        return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(_List_fromArray([restriction, newRestriction]));
                }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$restrictFurther = F2($mdgriffith$elm_codegen$Internal$Compiler$restrictFurther_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$getRestrictionsHelper_fn = function (existingRestrictions, notation, cache) {
        getRestrictionsHelper: while (true) {
            switch (notation.$) {
                case 6:
                    var _v1 = notation.a;
                    var oneCoords = _v1.a;
                    var one = _v1.b;
                    var _v2 = notation.b;
                    var twoCoords = _v2.a;
                    var two = _v2.b;
                    return existingRestrictions;
                case 0:
                    var name = notation.a;
                    var $temp$existingRestrictions = $mdgriffith$elm_codegen$Internal$Compiler$restrictFurther_fn(existingRestrictions, $mdgriffith$elm_codegen$Internal$Compiler$nameToRestrictions(name)), $temp$notation = $elm$core$Maybe$withDefault_fn($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit, $elm$core$Dict$get_fn(name, cache)), $temp$cache = cache;
                    existingRestrictions = $temp$existingRestrictions;
                    notation = $temp$notation;
                    cache = $temp$cache;
                    continue getRestrictionsHelper;
                case 1:
                    var nodedModuleName = notation.a;
                    var vars = notation.b;
                    return existingRestrictions;
                case 2:
                    return existingRestrictions;
                case 3:
                    var nodes = notation.a;
                    return existingRestrictions;
                case 4:
                    var fields = notation.a;
                    return existingRestrictions;
                default:
                    var baseName = notation.a;
                    var _v3 = notation.b;
                    var recordNode = _v3.a;
                    var fields = _v3.b;
                    return existingRestrictions;
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$getRestrictionsHelper = F3($mdgriffith$elm_codegen$Internal$Compiler$getRestrictionsHelper_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$getRestrictions_fn = function (notation, cache) {
        return $mdgriffith$elm_codegen$Internal$Compiler$getRestrictionsHelper_fn($mdgriffith$elm_codegen$Internal$Compiler$NoRestrictions, notation, cache);
    }, $mdgriffith$elm_codegen$Internal$Compiler$getRestrictions = F2($mdgriffith$elm_codegen$Internal$Compiler$getRestrictions_fn);
    var $elm$core$Set$insert_fn = function (key, _v0) {
        var dict = _v0;
        return $elm$core$Dict$insert_fn(key, 0, dict);
    }, $elm$core$Set$insert = F2($elm$core$Set$insert_fn);
    var $elm$core$Result$map_fn = function (func, ra) {
        if (!ra.$) {
            var a = ra.a;
            return $elm$core$Result$Ok(func(a));
        }
        else {
            var e = ra.a;
            return $elm$core$Result$Err(e);
        }
    }, $elm$core$Result$map = F2($elm$core$Result$map_fn);
    var $elm$core$Result$map2_fn = function (func, ra, rb) {
        if (ra.$ === 1) {
            var x = ra.a;
            return $elm$core$Result$Err(x);
        }
        else {
            var a = ra.a;
            if (rb.$ === 1) {
                var x = rb.a;
                return $elm$core$Result$Err(x);
            }
            else {
                var b = rb.a;
                return $elm$core$Result$Ok(A2(func, a, b));
            }
        }
    }, $elm$core$Result$map2_fn_unwrapped = function (func, ra, rb) {
        if (ra.$ === 1) {
            var x = ra.a;
            return $elm$core$Result$Err(x);
        }
        else {
            var a = ra.a;
            if (rb.$ === 1) {
                var x = rb.a;
                return $elm$core$Result$Err(x);
            }
            else {
                var b = rb.a;
                return $elm$core$Result$Ok(func(a, b));
            }
        }
    }, $elm$core$Result$map2 = F3($elm$core$Result$map2_fn);
    var $elm$core$Dict$member_fn = function (key, dict) {
        var _v0 = $elm$core$Dict$get_fn(key, dict);
        if (!_v0.$) {
            return true;
        }
        else {
            return false;
        }
    }, $elm$core$Dict$member = F2($elm$core$Dict$member_fn);
    var $elm$core$Set$member_fn = function (key, _v0) {
        var dict = _v0;
        return $elm$core$Dict$member_fn(key, dict);
    }, $elm$core$Set$member = F2($elm$core$Set$member_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$resolveVariableList_fn = function (visited, cache, nodes, processed) {
        resolveVariableList: while (true) {
            if (!nodes.b) {
                return $elm$core$Result$Ok($elm$core$List$reverse(processed));
            }
            else {
                var _v17 = nodes.a;
                var coords = _v17.a;
                var top = _v17.b;
                var remain = nodes.b;
                var _v18 = $mdgriffith$elm_codegen$Internal$Compiler$resolveVariables_fn(visited, cache, top);
                if (!_v18.$) {
                    var resolved = _v18.a;
                    var $temp$visited = visited, $temp$cache = cache, $temp$nodes = remain, $temp$processed = _List_Cons($stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(coords, resolved), processed);
                    visited = $temp$visited;
                    cache = $temp$cache;
                    nodes = $temp$nodes;
                    processed = $temp$processed;
                    continue resolveVariableList;
                }
                else {
                    var err = _v18.a;
                    return $elm$core$Result$Err(err);
                }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$resolveVariableList = F4($mdgriffith$elm_codegen$Internal$Compiler$resolveVariableList_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$resolveVariables_fn = function (visited, cache, annotation) {
        resolveVariables: while (true) {
            switch (annotation.$) {
                case 6:
                    var _v1 = annotation.a;
                    var oneCoords = _v1.a;
                    var one = _v1.b;
                    var _v2 = annotation.b;
                    var twoCoords = _v2.a;
                    var two = _v2.b;
                    return $elm$core$Result$map2_fn_unwrapped(function (oneResolved, twoResolved) {
                        return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(oneCoords, oneResolved), $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(twoCoords, twoResolved));
                    }, $mdgriffith$elm_codegen$Internal$Compiler$resolveVariables_fn(visited, cache, one), $mdgriffith$elm_codegen$Internal$Compiler$resolveVariables_fn(visited, cache, two));
                case 0:
                    var name = annotation.a;
                    if ($elm$core$Set$member_fn(name, visited)) {
                        return $elm$core$Result$Err("Infinite type inference loop!  Whoops.  This is an issue with elm-codegen.  If you can report this to the elm-codegen repo, that would be appreciated!");
                    }
                    else {
                        var _v3 = $elm$core$Dict$get_fn(name, cache);
                        if (_v3.$ === 1) {
                            return $elm$core$Result$Ok(annotation);
                        }
                        else {
                            var newType = _v3.a;
                            var $temp$visited = $elm$core$Set$insert_fn(name, visited), $temp$cache = cache, $temp$annotation = newType;
                            visited = $temp$visited;
                            cache = $temp$cache;
                            annotation = $temp$annotation;
                            continue resolveVariables;
                        }
                    }
                case 1:
                    var nodedModuleName = annotation.a;
                    var vars = annotation.b;
                    return $elm$core$Result$map_fn($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed(nodedModuleName), $mdgriffith$elm_codegen$Internal$Compiler$resolveVariableList_fn(visited, cache, vars, _List_Nil));
                case 2:
                    return $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit);
                case 3:
                    var nodes = annotation.a;
                    return $elm$core$Result$map_fn($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled, $mdgriffith$elm_codegen$Internal$Compiler$resolveVariableList_fn(visited, cache, nodes, _List_Nil));
                case 4:
                    var fields = annotation.a;
                    return $elm$core$Result$map_fn(A2($elm$core$Basics$composeL, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record, $elm$core$List$reverse), $elm$core$List$foldl_fn_unwrapped(function (_v4, found) {
                        var fieldRange = _v4.a;
                        var _v5 = _v4.b;
                        var name = _v5.a;
                        var _v6 = _v5.b;
                        var fieldTypeRange = _v6.a;
                        var fieldType = _v6.b;
                        if (found.$ === 1) {
                            var err = found.a;
                            return $elm$core$Result$Err(err);
                        }
                        else {
                            var processedFields = found.a;
                            var _v8 = $mdgriffith$elm_codegen$Internal$Compiler$resolveVariables_fn(visited, cache, fieldType);
                            if (_v8.$ === 1) {
                                var err = _v8.a;
                                return $elm$core$Result$Err(err);
                            }
                            else {
                                var resolvedField = _v8.a;
                                var restrictions = $mdgriffith$elm_codegen$Internal$Compiler$getRestrictions_fn(annotation, cache);
                                var _v9 = $mdgriffith$elm_codegen$Internal$Compiler$checkRestrictions_fn(restrictions, resolvedField);
                                if (!_v9.$) {
                                    return $elm$core$Result$Ok(_List_Cons($stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(fieldRange, _Utils_Tuple2(name, $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(fieldTypeRange, resolvedField))), processedFields));
                                }
                                else {
                                    var err = _v9.a;
                                    return $elm$core$Result$Err(err);
                                }
                            }
                        }
                    }, $elm$core$Result$Ok(_List_Nil), fields));
                default:
                    var baseName = annotation.a;
                    var _v10 = annotation.b;
                    var recordNode = _v10.a;
                    var fields = _v10.b;
                    var newFieldResult = $elm$core$List$foldl_fn_unwrapped(function (_v11, found) {
                        var fieldRange = _v11.a;
                        var _v12 = _v11.b;
                        var name = _v12.a;
                        var _v13 = _v12.b;
                        var fieldTypeRange = _v13.a;
                        var fieldType = _v13.b;
                        if (found.$ === 1) {
                            var err = found.a;
                            return $elm$core$Result$Err(err);
                        }
                        else {
                            var processedFields = found.a;
                            var _v15 = $mdgriffith$elm_codegen$Internal$Compiler$resolveVariables_fn(visited, cache, fieldType);
                            if (_v15.$ === 1) {
                                var err = _v15.a;
                                return $elm$core$Result$Err(err);
                            }
                            else {
                                var resolvedField = _v15.a;
                                var restrictions = $mdgriffith$elm_codegen$Internal$Compiler$getRestrictions_fn(annotation, cache);
                                return $elm$core$Result$Ok(_List_Cons($stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(fieldRange, _Utils_Tuple2(name, $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(fieldTypeRange, resolvedField))), processedFields));
                            }
                        }
                    }, $elm$core$Result$Ok(_List_Nil), fields);
                    return $elm$core$Result$map_fn(function (newFields) {
                        return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord_fn(baseName, $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(recordNode, $elm$core$List$reverse(newFields)));
                    }, newFieldResult);
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$resolveVariables = F3($mdgriffith$elm_codegen$Internal$Compiler$resolveVariables_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn = function (aliases, vars, one, two) {
        unifiable: while (true) {
            switch (one.$) {
                case 0:
                    var varName = one.a;
                    var _v21 = $elm$core$Dict$get_fn(varName, vars);
                    if (_v21.$ === 1) {
                        if (!two.$) {
                            var varNameB = two.a;
                            return _Utils_eq(varNameB, varName) ? _Utils_Tuple2(vars, $elm$core$Result$Ok(one)) : _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(varName, two, vars), $elm$core$Result$Ok(two));
                        }
                        else {
                            return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(varName, two, vars), $elm$core$Result$Ok(two));
                        }
                    }
                    else {
                        var found = _v21.a;
                        if (!two.$) {
                            var varNameB = two.a;
                            if (_Utils_eq(varNameB, varName)) {
                                return _Utils_Tuple2(vars, $elm$core$Result$Ok(one));
                            }
                            else {
                                var _v24 = $elm$core$Dict$get_fn(varNameB, vars);
                                if (_v24.$ === 1) {
                                    return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(varNameB, found, vars), $elm$core$Result$Ok(two));
                                }
                                else {
                                    var foundTwo = _v24.a;
                                    var $temp$aliases = aliases, $temp$vars = vars, $temp$one = found, $temp$two = foundTwo;
                                    aliases = $temp$aliases;
                                    vars = $temp$vars;
                                    one = $temp$one;
                                    two = $temp$two;
                                    continue unifiable;
                                }
                            }
                        }
                        else {
                            var $temp$aliases = aliases, $temp$vars = vars, $temp$one = found, $temp$two = two;
                            aliases = $temp$aliases;
                            vars = $temp$vars;
                            one = $temp$one;
                            two = $temp$two;
                            continue unifiable;
                        }
                    }
                case 1:
                    var oneName = one.a;
                    var oneVars = one.b;
                    switch (two.$) {
                        case 1:
                            var twoName = two.a;
                            var twoContents = two.b;
                            if (_Utils_eq($mdgriffith$elm_codegen$Internal$Compiler$denode(oneName), $mdgriffith$elm_codegen$Internal$Compiler$denode(twoName))) {
                                var _v26 = $mdgriffith$elm_codegen$Internal$Compiler$unifiableLists_fn(aliases, vars, oneVars, twoContents, _List_Nil);
                                if (!_v26.b.$) {
                                    var newVars = _v26.a;
                                    var unifiedContent = _v26.b.a;
                                    return _Utils_Tuple2(newVars, $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn(twoName, unifiedContent)));
                                }
                                else {
                                    var newVars = _v26.a;
                                    var err = _v26.b.a;
                                    return _Utils_Tuple2(newVars, $elm$core$Result$Err(err));
                                }
                            }
                            else {
                                return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn(one, two)));
                            }
                        case 0:
                            var b = two.a;
                            return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(b, one, vars), $elm$core$Result$Ok(one));
                        default:
                            var _v27 = $mdgriffith$elm_codegen$Internal$Compiler$unifyWithAlias_fn(aliases, vars, oneName, oneVars, two);
                            if (_v27.$ === 1) {
                                return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn(one, two)));
                            }
                            else {
                                var unified = _v27.a;
                                return unified;
                            }
                    }
                case 2:
                    switch (two.$) {
                        case 0:
                            var b = two.a;
                            var _v29 = $elm$core$Dict$get_fn(b, vars);
                            if (_v29.$ === 1) {
                                return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(b, one, vars), $elm$core$Result$Ok(one));
                            }
                            else {
                                var foundTwo = _v29.a;
                                var $temp$aliases = aliases, $temp$vars = vars, $temp$one = one, $temp$two = foundTwo;
                                aliases = $temp$aliases;
                                vars = $temp$vars;
                                one = $temp$one;
                                two = $temp$two;
                                continue unifiable;
                            }
                        case 2:
                            return _Utils_Tuple2(vars, $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit));
                        default:
                            return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn(one, two)));
                    }
                case 3:
                    var valsA = one.a;
                    switch (two.$) {
                        case 0:
                            var b = two.a;
                            var _v31 = $elm$core$Dict$get_fn(b, vars);
                            if (_v31.$ === 1) {
                                return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(b, one, vars), $elm$core$Result$Ok(one));
                            }
                            else {
                                var foundTwo = _v31.a;
                                var $temp$aliases = aliases, $temp$vars = vars, $temp$one = one, $temp$two = foundTwo;
                                aliases = $temp$aliases;
                                vars = $temp$vars;
                                one = $temp$one;
                                two = $temp$two;
                                continue unifiable;
                            }
                        case 3:
                            var valsB = two.a;
                            var _v32 = $mdgriffith$elm_codegen$Internal$Compiler$unifiableLists_fn(aliases, vars, valsA, valsB, _List_Nil);
                            if (!_v32.b.$) {
                                var newVars = _v32.a;
                                var unified = _v32.b.a;
                                return _Utils_Tuple2(newVars, $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(unified)));
                            }
                            else {
                                var newVars = _v32.a;
                                var err = _v32.b.a;
                                return _Utils_Tuple2(newVars, $elm$core$Result$Err(err));
                            }
                        default:
                            return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn(one, two)));
                    }
                case 4:
                    var fieldsA = one.a;
                    switch (two.$) {
                        case 0:
                            var b = two.a;
                            var _v34 = $elm$core$Dict$get_fn(b, vars);
                            if (_v34.$ === 1) {
                                return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(b, one, vars), $elm$core$Result$Ok(one));
                            }
                            else {
                                var foundTwo = _v34.a;
                                var $temp$aliases = aliases, $temp$vars = vars, $temp$one = one, $temp$two = foundTwo;
                                aliases = $temp$aliases;
                                vars = $temp$vars;
                                one = $temp$one;
                                two = $temp$two;
                                continue unifiable;
                            }
                        case 5:
                            var _v35 = two.a;
                            var twoRecName = _v35.b;
                            var _v36 = two.b;
                            var fieldsB = _v36.b;
                            var _v37 = $elm$core$Dict$get_fn(twoRecName, vars);
                            if (_v37.$ === 1) {
                                var _v38 = $mdgriffith$elm_codegen$Internal$Compiler$unifiableFields_fn(aliases, vars, fieldsA, fieldsB, _List_Nil);
                                if (!_v38.b.$) {
                                    var newVars = _v38.a;
                                    var unifiedFields = _v38.b.a;
                                    return _Utils_Tuple2(newVars, $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
                                }
                                else {
                                    var newVars = _v38.a;
                                    var err = _v38.b.a;
                                    return _Utils_Tuple2(newVars, $elm$core$Result$Err(err));
                                }
                            }
                            else {
                                var knownType = _v37.a;
                                var _v39 = $mdgriffith$elm_codegen$Internal$Compiler$unifiableFields_fn(aliases, vars, fieldsA, fieldsB, _List_Nil);
                                if (!_v39.b.$) {
                                    var newVars = _v39.a;
                                    var unifiedFields = _v39.b.a;
                                    return _Utils_Tuple2(newVars, $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
                                }
                                else {
                                    var newVars = _v39.a;
                                    var err = _v39.b.a;
                                    return _Utils_Tuple2(newVars, $elm$core$Result$Err(err));
                                }
                            }
                        case 4:
                            var fieldsB = two.a;
                            var _v40 = $mdgriffith$elm_codegen$Internal$Compiler$unifiableFields_fn(aliases, vars, fieldsA, fieldsB, _List_Nil);
                            if (!_v40.b.$) {
                                var newVars = _v40.a;
                                var unifiedFields = _v40.b.a;
                                return _Utils_Tuple2(newVars, $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
                            }
                            else {
                                var newVars = _v40.a;
                                var err = _v40.b.a;
                                return _Utils_Tuple2(newVars, $elm$core$Result$Err(err));
                            }
                        case 1:
                            var twoName = two.a;
                            var twoVars = two.b;
                            var _v41 = $mdgriffith$elm_codegen$Internal$Compiler$unifyWithAlias_fn(aliases, vars, twoName, twoVars, one);
                            if (_v41.$ === 1) {
                                return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn(one, two)));
                            }
                            else {
                                var unified = _v41.a;
                                return unified;
                            }
                        default:
                            return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn(one, two)));
                    }
                case 5:
                    var _v42 = one.a;
                    var reVarName = _v42.b;
                    var _v43 = one.b;
                    var fieldsARange = _v43.a;
                    var fieldsA = _v43.b;
                    switch (two.$) {
                        case 0:
                            var b = two.a;
                            var _v45 = $elm$core$Dict$get_fn(b, vars);
                            if (_v45.$ === 1) {
                                return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(b, one, vars), $elm$core$Result$Ok(one));
                            }
                            else {
                                var foundTwo = _v45.a;
                                var $temp$aliases = aliases, $temp$vars = vars, $temp$one = one, $temp$two = foundTwo;
                                aliases = $temp$aliases;
                                vars = $temp$vars;
                                one = $temp$one;
                                two = $temp$two;
                                continue unifiable;
                            }
                        case 5:
                            var _v46 = two.a;
                            var twoRecName = _v46.b;
                            var _v47 = two.b;
                            var fieldsB = _v47.b;
                            var _v48 = $elm$core$Dict$get_fn(twoRecName, vars);
                            if (_v48.$ === 1) {
                                var _v49 = $mdgriffith$elm_codegen$Internal$Compiler$unifiableFields_fn(aliases, vars, fieldsA, fieldsB, _List_Nil);
                                if (!_v49.b.$) {
                                    var newVars = _v49.a;
                                    var unifiedFields = _v49.b.a;
                                    return _Utils_Tuple2(newVars, $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
                                }
                                else {
                                    var newVars = _v49.a;
                                    var err = _v49.b.a;
                                    return _Utils_Tuple2(newVars, $elm$core$Result$Err(err));
                                }
                            }
                            else {
                                var knownType = _v48.a;
                                var _v50 = $mdgriffith$elm_codegen$Internal$Compiler$unifiableFields_fn(aliases, vars, fieldsA, fieldsB, _List_Nil);
                                if (!_v50.b.$) {
                                    var newVars = _v50.a;
                                    var unifiedFields = _v50.b.a;
                                    return _Utils_Tuple2(newVars, $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
                                }
                                else {
                                    var newVars = _v50.a;
                                    var err = _v50.b.a;
                                    return _Utils_Tuple2(newVars, $elm$core$Result$Err(err));
                                }
                            }
                        case 4:
                            var fieldsB = two.a;
                            var _v51 = $mdgriffith$elm_codegen$Internal$Compiler$unifiableFields_fn(aliases, vars, fieldsA, fieldsB, _List_Nil);
                            if (!_v51.b.$) {
                                var newVars = _v51.a;
                                var unifiedFields = _v51.b.a;
                                return _Utils_Tuple2(newVars, $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
                            }
                            else {
                                var newVars = _v51.a;
                                var err = _v51.b.a;
                                return _Utils_Tuple2(newVars, $elm$core$Result$Err(err));
                            }
                        case 1:
                            var twoName = two.a;
                            var twoVars = two.b;
                            var _v52 = $mdgriffith$elm_codegen$Internal$Compiler$unifyWithAlias_fn(aliases, vars, twoName, twoVars, one);
                            if (_v52.$ === 1) {
                                return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn(one, two)));
                            }
                            else {
                                var unified = _v52.a;
                                return unified;
                            }
                        default:
                            return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn(one, two)));
                    }
                default:
                    var oneA = one.a;
                    var oneB = one.b;
                    switch (two.$) {
                        case 0:
                            var b = two.a;
                            var _v54 = $elm$core$Dict$get_fn(b, vars);
                            if (_v54.$ === 1) {
                                return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(b, one, vars), $elm$core$Result$Ok(one));
                            }
                            else {
                                var foundTwo = _v54.a;
                                var $temp$aliases = aliases, $temp$vars = vars, $temp$one = one, $temp$two = foundTwo;
                                aliases = $temp$aliases;
                                vars = $temp$vars;
                                one = $temp$one;
                                two = $temp$two;
                                continue unifiable;
                            }
                        case 6:
                            var twoA = two.a;
                            var twoB = two.b;
                            var _v55 = $mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn(aliases, vars, $mdgriffith$elm_codegen$Internal$Compiler$denode(oneA), $mdgriffith$elm_codegen$Internal$Compiler$denode(twoA));
                            if (!_v55.b.$) {
                                var aVars = _v55.a;
                                var unifiedA = _v55.b.a;
                                var _v56 = $mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn(aliases, aVars, $mdgriffith$elm_codegen$Internal$Compiler$denode(oneB), $mdgriffith$elm_codegen$Internal$Compiler$denode(twoB));
                                if (!_v56.b.$) {
                                    var bVars = _v56.a;
                                    var unifiedB = _v56.b.a;
                                    return _Utils_Tuple2(bVars, $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(unifiedA), $mdgriffith$elm_codegen$Internal$Compiler$nodify(unifiedB))));
                                }
                                else {
                                    var otherwise = _v56;
                                    return otherwise;
                                }
                            }
                            else {
                                var otherwise = _v55;
                                return otherwise;
                            }
                        default:
                            return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify_fn(one, two)));
                    }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$unifiable = F4($mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$unifiableFields_fn = function (aliases, vars, one, two, unified) {
        unifiableFields: while (true) {
            var _v13 = _Utils_Tuple2(one, two);
            if (!_v13.a.b) {
                if (!_v13.b.b) {
                    return _Utils_Tuple2(vars, $elm$core$Result$Ok($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0, $elm$core$List$reverse(unified))));
                }
                else {
                    return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$MismatchedTypeVariables));
                }
            }
            else {
                var _v14 = _v13.a;
                var oneX = _v14.a;
                var oneRemain = _v14.b;
                var twoFields = _v13.b;
                var _v15 = $mdgriffith$elm_codegen$Internal$Compiler$denode(oneX);
                var oneFieldName = _v15.a;
                var oneFieldVal = _v15.b;
                var oneName = $mdgriffith$elm_codegen$Internal$Compiler$denode(oneFieldName);
                var oneVal = $mdgriffith$elm_codegen$Internal$Compiler$denode(oneFieldVal);
                var _v16 = $mdgriffith$elm_codegen$Internal$Compiler$getField_fn(oneName, oneVal, twoFields, _List_Nil);
                if (!_v16.$) {
                    var _v17 = _v16.a;
                    var matchingFieldVal = _v17.a;
                    var remainingTwo = _v17.b;
                    var _v18 = $mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn(aliases, vars, oneVal, matchingFieldVal);
                    var newVars = _v18.a;
                    var unifiedFieldResult = _v18.b;
                    if (!unifiedFieldResult.$) {
                        var unifiedField = unifiedFieldResult.a;
                        var $temp$aliases = aliases, $temp$vars = newVars, $temp$one = oneRemain, $temp$two = remainingTwo, $temp$unified = _List_Cons(_Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$nodify(oneName), $mdgriffith$elm_codegen$Internal$Compiler$nodify(unifiedField)), unified);
                        aliases = $temp$aliases;
                        vars = $temp$vars;
                        one = $temp$one;
                        two = $temp$two;
                        unified = $temp$unified;
                        continue unifiableFields;
                    }
                    else {
                        var err = unifiedFieldResult.a;
                        return _Utils_Tuple2(newVars, $elm$core$Result$Err(err));
                    }
                }
                else {
                    var notFound = _v16.a;
                    return _Utils_Tuple2(vars, $elm$core$Result$Err(notFound));
                }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$unifiableFields = F5($mdgriffith$elm_codegen$Internal$Compiler$unifiableFields_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$unifiableLists_fn = function (aliases, vars, one, two, unified) {
        unifiableLists: while (true) {
            var _v6 = _Utils_Tuple2(one, two);
            _v6$3: while (true) {
                if (!_v6.a.b) {
                    if (!_v6.b.b) {
                        return _Utils_Tuple2(vars, $elm$core$Result$Ok($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0, $elm$core$List$reverse(unified))));
                    }
                    else {
                        break _v6$3;
                    }
                }
                else {
                    if (_v6.b.b) {
                        if ((!_v6.a.b.b) && (!_v6.b.b.b)) {
                            var _v7 = _v6.a;
                            var oneX = _v7.a;
                            var _v8 = _v6.b;
                            var twoX = _v8.a;
                            var _v9 = $mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn(aliases, vars, $mdgriffith$elm_codegen$Internal$Compiler$denode(oneX), $mdgriffith$elm_codegen$Internal$Compiler$denode(twoX));
                            if (!_v9.b.$) {
                                var newVars = _v9.a;
                                var un = _v9.b.a;
                                return _Utils_Tuple2(newVars, $elm$core$Result$Ok($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0, $elm$core$List$reverse(_List_Cons(un, unified)))));
                            }
                            else {
                                var newVars = _v9.a;
                                var err = _v9.b.a;
                                return _Utils_Tuple2(newVars, $elm$core$Result$Err(err));
                            }
                        }
                        else {
                            var _v10 = _v6.a;
                            var oneX = _v10.a;
                            var oneRemain = _v10.b;
                            var _v11 = _v6.b;
                            var twoX = _v11.a;
                            var twoRemain = _v11.b;
                            var _v12 = $mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn(aliases, vars, $mdgriffith$elm_codegen$Internal$Compiler$denode(oneX), $mdgriffith$elm_codegen$Internal$Compiler$denode(twoX));
                            if (!_v12.b.$) {
                                var newVars = _v12.a;
                                var un = _v12.b.a;
                                var $temp$aliases = aliases, $temp$vars = newVars, $temp$one = oneRemain, $temp$two = twoRemain, $temp$unified = _List_Cons(un, unified);
                                aliases = $temp$aliases;
                                vars = $temp$vars;
                                one = $temp$one;
                                two = $temp$two;
                                unified = $temp$unified;
                                continue unifiableLists;
                            }
                            else {
                                var newVars = _v12.a;
                                var err = _v12.b.a;
                                return _Utils_Tuple2(vars, $elm$core$Result$Err(err));
                            }
                        }
                    }
                    else {
                        break _v6$3;
                    }
                }
            }
            return _Utils_Tuple2(vars, $elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$MismatchedTypeVariables));
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$unifiableLists = F5($mdgriffith$elm_codegen$Internal$Compiler$unifiableLists_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$unifyWithAlias_fn = function (aliases, vars, typename, typeVars, typeToUnifyWith) {
        var _v0 = $mdgriffith$elm_codegen$Internal$Compiler$getAlias_fn(typename, aliases);
        if (_v0.$ === 1) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var foundAlias = _v0.a;
            var fullAliasedType = function () {
                var _v3 = foundAlias.bH;
                if (!_v3.b) {
                    return foundAlias.aF;
                }
                else {
                    var makeAliasVarCache = F2(function (varName, _v5) {
                        var varType = _v5.b;
                        return _Utils_Tuple2(varName, varType);
                    });
                    var _v4 = $mdgriffith$elm_codegen$Internal$Compiler$resolveVariables_fn($elm$core$Set$empty, $elm$core$Dict$fromList(_List_map2_fn(makeAliasVarCache, foundAlias.bH, typeVars)), foundAlias.aF);
                    if (!_v4.$) {
                        var resolvedType = _v4.a;
                        return resolvedType;
                    }
                    else {
                        return foundAlias.aF;
                    }
                }
            }();
            var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn(aliases, vars, fullAliasedType, typeToUnifyWith);
            var returnedVars = _v1.a;
            var unifiedResult = _v1.b;
            if (!unifiedResult.$) {
                var finalInference = unifiedResult.a;
                return $elm$core$Maybe$Just(_Utils_Tuple2(returnedVars, $elm$core$Result$Ok(fullAliasedType)));
            }
            else {
                var err = unifiedResult.a;
                return $elm$core$Maybe$Nothing;
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$unifyWithAlias = F5($mdgriffith$elm_codegen$Internal$Compiler$unifyWithAlias_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$unifyOn_fn = function (_v0, res) {
        var annDetails = _v0;
        if (res.$ === 1) {
            return res;
        }
        else {
            var inf = res.a;
            var _v2 = $mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn(inf.av, inf.i, annDetails.a, inf.t);
            var newInferences = _v2.a;
            var finalResult = _v2.b;
            if (!finalResult.$) {
                var finalType = finalResult.a;
                return $elm$core$Result$Ok({
                    av: $elm$core$Dict$union_fn(annDetails.av, inf.av),
                    i: newInferences,
                    t: finalType
                });
            }
            else {
                var err = finalResult.a;
                return $elm$core$Result$Err(_List_fromArray([err]));
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$unifyOn = F2($mdgriffith$elm_codegen$Internal$Compiler$unifyOn_fn);
    var $mdgriffith$elm_codegen$Elm$withType_fn = function (ann, _v0) {
        var annDetails = ann;
        var toExp = _v0;
        return function (index) {
            var exp = toExp(index);
            return _Utils_update(exp, {
                a: function () {
                    var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$unifyOn_fn(ann, exp.a);
                    if (!_v1.$) {
                        var unified = _v1.a;
                        return $elm$core$Result$Ok(unified);
                    }
                    else {
                        var _v2 = exp.a;
                        if (!_v2.$) {
                            var expressionAnnotation = _v2.a;
                            return $elm$core$Result$Ok({ av: expressionAnnotation.av, i: expressionAnnotation.i, t: annDetails.a });
                        }
                        else {
                            var err = _v2.a;
                            return $elm$core$Result$Ok({ av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, i: $elm$core$Dict$empty, t: annDetails.a });
                        }
                    }
                }(),
                g: _Utils_ap(exp.g, annDetails.g)
            });
        };
    }, $mdgriffith$elm_codegen$Elm$withType = F2($mdgriffith$elm_codegen$Elm$withType_fn);
    var $author$project$Theme$Generate$Ui$attr = function (a) {
        return $mdgriffith$elm_codegen$Elm$withType_fn($author$project$Gen$Ui$annotation_.d9($mdgriffith$elm_codegen$Elm$Annotation$var("msg")), a);
    };
    var $stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue = F2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue_fn);
    var $mdgriffith$elm_codegen$Internal$Index$indexToString = function (_v0) {
        var top = _v0.a;
        var tail = _v0.b;
        var scope = _v0.c;
        var check = _v0.d;
        return _Utils_ap((!top) ? "" : ("_" + $elm$core$String$fromInt(top)), function () {
            if (!tail.b) {
                return "";
            }
            else {
                if (!tail.b.b) {
                    var one = tail.a;
                    return "_" + $elm$core$String$fromInt(one);
                }
                else {
                    if (!tail.b.b.b) {
                        var one = tail.a;
                        var _v2 = tail.b;
                        var two = _v2.a;
                        return "_" + ($elm$core$String$fromInt(one) + ("_" + $elm$core$String$fromInt(two)));
                    }
                    else {
                        if (!tail.b.b.b.b) {
                            var one = tail.a;
                            var _v3 = tail.b;
                            var two = _v3.a;
                            var _v4 = _v3.b;
                            var three = _v4.a;
                            return "_" + ($elm$core$String$fromInt(one) + ("_" + ($elm$core$String$fromInt(two) + ("_" + $elm$core$String$fromInt(three)))));
                        }
                        else {
                            return "_" + $elm$core$String$join_fn("_", $elm$core$List$map_fn($elm$core$String$fromInt, tail));
                        }
                    }
                }
            }
        }());
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$mapNode_fn = function (fn, _v0) {
        var range = _v0.a;
        var n = _v0.b;
        return $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(range, fn(n));
    }, $mdgriffith$elm_codegen$Internal$Compiler$mapNode = F2($mdgriffith$elm_codegen$Internal$Compiler$mapNode_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation_fn = function (index, ann) {
        switch (ann.$) {
            case 0:
                var str = ann.a;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(_Utils_ap(str, $mdgriffith$elm_codegen$Internal$Index$indexToString(index)));
            case 1:
                var modName = ann.a;
                var anns = ann.b;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn(modName, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$mapNode($mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation(index)), anns));
            case 2:
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit;
            case 3:
                var tupled = ann.a;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$mapNode($mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation(index)), tupled));
            case 4:
                var recordDefinition = ann.a;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$protectField(index), recordDefinition));
            case 5:
                var recordName = ann.a;
                var _v3 = ann.b;
                var recordRange = _v3.a;
                var recordDefinition = _v3.b;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord_fn($mdgriffith$elm_codegen$Internal$Compiler$mapNode_fn(function (n) {
                    return _Utils_ap(n, $mdgriffith$elm_codegen$Internal$Index$indexToString(index));
                }, recordName), $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(recordRange, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$protectField(index), recordDefinition)));
            default:
                var one = ann.a;
                var two = ann.b;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($mdgriffith$elm_codegen$Internal$Compiler$mapNode_fn($mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation(index), one), $mdgriffith$elm_codegen$Internal$Compiler$mapNode_fn($mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation(index), two));
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation = F2($mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$protectField_fn = function (index, _v0) {
        var nodeRange = _v0.a;
        var _v1 = _v0.b;
        var nodedName = _v1.a;
        var nodedType = _v1.b;
        return $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(nodeRange, _Utils_Tuple2(nodedName, $mdgriffith$elm_codegen$Internal$Compiler$mapNode_fn($mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation(index), nodedType)));
    }, $mdgriffith$elm_codegen$Internal$Compiler$protectField = F2($mdgriffith$elm_codegen$Internal$Compiler$protectField_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$getInnerInference_fn = function (index, _v0) {
        var details = _v0;
        return {
            av: details.av,
            i: $elm$core$Dict$empty,
            t: $mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation_fn(index, details.a)
        };
    }, $mdgriffith$elm_codegen$Internal$Compiler$getInnerInference = F2($mdgriffith$elm_codegen$Internal$Compiler$getInnerInference_fn);
    var $mdgriffith$elm_codegen$Internal$Index$protectTypeName_fn = function (base, index) {
        var top = index.a;
        var tail = index.b;
        var scope = index.c;
        var check = index.d;
        if (!tail.b) {
            return $mdgriffith$elm_codegen$Internal$Format$formatValue(base);
        }
        else {
            return $mdgriffith$elm_codegen$Internal$Format$formatValue(_Utils_ap(base, $mdgriffith$elm_codegen$Internal$Index$indexToString(index)));
        }
    }, $mdgriffith$elm_codegen$Internal$Index$protectTypeName = F2($mdgriffith$elm_codegen$Internal$Index$protectTypeName_fn);
    var $mdgriffith$elm_codegen$Elm$value = function (details) {
        return function (index) {
            return {
                a: function () {
                    var _v0 = details.a;
                    if (_v0.$ === 1) {
                        var typename = $mdgriffith$elm_codegen$Internal$Index$protectTypeName_fn(details.c, index);
                        return $elm$core$Result$Ok({
                            av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
                            i: $elm$core$Dict$empty,
                            t: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(typename)
                        });
                    }
                    else {
                        var ann = _v0.a;
                        return $elm$core$Result$Ok($mdgriffith$elm_codegen$Internal$Compiler$getInnerInference_fn(index, ann));
                    }
                }(),
                f: $stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue_fn(details.b, $mdgriffith$elm_codegen$Internal$Format$sanitize(details.c)),
                g: function () {
                    var _v1 = details.a;
                    if (_v1.$ === 1) {
                        var _v2 = details.b;
                        if (!_v2.b) {
                            return _List_Nil;
                        }
                        else {
                            return _List_fromArray([details.b]);
                        }
                    }
                    else {
                        var ann = _v1.a;
                        var _v3 = details.b;
                        if (!_v3.b) {
                            return $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(ann);
                        }
                        else {
                            return _List_Cons(details.b, $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(ann));
                        }
                    }
                }()
            };
        };
    };
    var $author$project$Gen$Ui$Font$bold = $mdgriffith$elm_codegen$Elm$value({
        a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui", "Font"]), "Weight", _List_Nil)),
        b: _List_fromArray(["Ui", "Font"]),
        c: "bold"
    });
    var $stil4m$elm_syntax$Elm$Syntax$Expression$Application = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$FunctionAppliedToTooManyArgs_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $mdgriffith$elm_codegen$Internal$Compiler$FunctionAppliedToTooManyArgs = F2($mdgriffith$elm_codegen$Internal$Compiler$FunctionAppliedToTooManyArgs_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$makeFunctionReversedHelper_fn = function (last, reversedArgs) {
        makeFunctionReversedHelper: while (true) {
            if (!reversedArgs.b) {
                return last;
            }
            else {
                if (!reversedArgs.b.b) {
                    var penUlt = reversedArgs.a;
                    return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($stil4m$elm_syntax$Elm$Syntax$Node$Node_fn($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, penUlt), $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, last));
                }
                else {
                    var penUlt = reversedArgs.a;
                    var remain = reversedArgs.b;
                    var $temp$last = $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($stil4m$elm_syntax$Elm$Syntax$Node$Node_fn($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, penUlt), $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, last)), $temp$reversedArgs = remain;
                    last = $temp$last;
                    reversedArgs = $temp$reversedArgs;
                    continue makeFunctionReversedHelper;
                }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$makeFunctionReversedHelper = F2($mdgriffith$elm_codegen$Internal$Compiler$makeFunctionReversedHelper_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$makeFunction_fn = function (result, args) {
        return $mdgriffith$elm_codegen$Internal$Compiler$makeFunctionReversedHelper_fn(result, $elm$core$List$reverse(args));
    }, $mdgriffith$elm_codegen$Internal$Compiler$makeFunction = F2($mdgriffith$elm_codegen$Internal$Compiler$makeFunction_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$applyTypeHelper_fn = function (aliases, cache, fn, args) {
        applyTypeHelper: while (true) {
            switch (fn.$) {
                case 6:
                    var one = fn.a;
                    var two = fn.b;
                    if (!args.b) {
                        return $elm$core$Result$Ok({ av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, i: cache, t: fn });
                    }
                    else {
                        var top = args.a;
                        var rest = args.b;
                        var _v2 = $mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn(aliases, cache, $mdgriffith$elm_codegen$Internal$Compiler$denode(one), top);
                        if (!_v2.b.$) {
                            var variableCache = _v2.a;
                            var $temp$aliases = aliases, $temp$cache = variableCache, $temp$fn = $mdgriffith$elm_codegen$Internal$Compiler$denode(two), $temp$args = rest;
                            aliases = $temp$aliases;
                            cache = $temp$cache;
                            fn = $temp$fn;
                            args = $temp$args;
                            continue applyTypeHelper;
                        }
                        else {
                            var varCache = _v2.a;
                            var err = _v2.b.a;
                            return $elm$core$Result$Err(_List_fromArray([err]));
                        }
                    }
                case 0:
                    var varName = fn.a;
                    if (!args.b) {
                        return $elm$core$Result$Ok({ av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, i: cache, t: fn });
                    }
                    else {
                        var resultType = $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(varName + "_result");
                        return $elm$core$Result$Ok({
                            av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
                            i: $mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(varName, $mdgriffith$elm_codegen$Internal$Compiler$makeFunction_fn(resultType, args), cache),
                            t: resultType
                        });
                    }
                default:
                    var _final = fn;
                    if (!args.b) {
                        return $elm$core$Result$Ok({ av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, i: cache, t: fn });
                    }
                    else {
                        return $elm$core$Result$Err(_List_fromArray([
                            $mdgriffith$elm_codegen$Internal$Compiler$FunctionAppliedToTooManyArgs_fn(_final, args)
                        ]));
                    }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$applyTypeHelper = F4($mdgriffith$elm_codegen$Internal$Compiler$applyTypeHelper_fn);
    var $elm$core$Dict$merge_fn = function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
        var stepState = F3(function (rKey, rValue, _v0) {
            stepState: while (true) {
                var list = _v0.a;
                var result = _v0.b;
                if (!list.b) {
                    return _Utils_Tuple2(list, A3(rightStep, rKey, rValue, result));
                }
                else {
                    var _v2 = list.a;
                    var lKey = _v2.a;
                    var lValue = _v2.b;
                    var rest = list.b;
                    if (_Utils_cmp(lKey, rKey) < 0) {
                        var $temp$rKey = rKey, $temp$rValue = rValue, $temp$_v0 = _Utils_Tuple2(rest, A3(leftStep, lKey, lValue, result));
                        rKey = $temp$rKey;
                        rValue = $temp$rValue;
                        _v0 = $temp$_v0;
                        continue stepState;
                    }
                    else {
                        if (_Utils_cmp(lKey, rKey) > 0) {
                            return _Utils_Tuple2(list, A3(rightStep, rKey, rValue, result));
                        }
                        else {
                            return _Utils_Tuple2(rest, A4(bothStep, lKey, lValue, rValue, result));
                        }
                    }
                }
            }
        });
        var _v3 = $elm$core$Dict$foldl_fn(stepState, _Utils_Tuple2($elm$core$Dict$toList(leftDict), initialResult), rightDict);
        var leftovers = _v3.a;
        var intermediateResult = _v3.b;
        return $elm$core$List$foldl_fn_unwrapped(function (_v4, result) {
            var k = _v4.a;
            var v = _v4.b;
            return A3(leftStep, k, v, result);
        }, intermediateResult, leftovers);
    }, $elm$core$Dict$merge = F6($elm$core$Dict$merge_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$mergeInferences_fn = function (one, two) {
        return $elm$core$Dict$merge_fn($elm$core$Dict$insert, F4(function (key, oneVal, twoVal, d) {
            if (oneVal.$ === 5) {
                var recordName = oneVal.a;
                var _v1 = oneVal.b;
                var oneRange = _v1.a;
                var recordDefinition = _v1.b;
                if (twoVal.$ === 5) {
                    var twoRecordName = twoVal.a;
                    var _v3 = twoVal.b;
                    var twoRange = _v3.a;
                    var twoRecordDefinition = _v3.b;
                    return $elm$core$Dict$insert_fn(key, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord_fn(recordName, $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(oneRange, _Utils_ap(recordDefinition, twoRecordDefinition))), d);
                }
                else {
                    return $elm$core$Dict$insert_fn(key, oneVal, d);
                }
            }
            else {
                return $elm$core$Dict$insert_fn(key, oneVal, d);
            }
        }), $elm$core$Dict$insert, one, two, $elm$core$Dict$empty);
    }, $mdgriffith$elm_codegen$Internal$Compiler$mergeInferences = F2($mdgriffith$elm_codegen$Internal$Compiler$mergeInferences_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$mergeArgInferences_fn = function (expressions, annotations, inferences) {
        mergeArgInferences: while (true) {
            if (!expressions.b) {
                return $elm$core$Result$Ok({
                    i: inferences,
                    aI: $elm$core$List$reverse(annotations)
                });
            }
            else {
                var top = expressions.a;
                var remain = expressions.b;
                var _v1 = top.a;
                if (!_v1.$) {
                    var ann = _v1.a;
                    var $temp$expressions = remain, $temp$annotations = _List_Cons(ann.t, annotations), $temp$inferences = $mdgriffith$elm_codegen$Internal$Compiler$mergeInferences_fn(inferences, ann.i);
                    expressions = $temp$expressions;
                    annotations = $temp$annotations;
                    inferences = $temp$inferences;
                    continue mergeArgInferences;
                }
                else {
                    var err = _v1.a;
                    return $elm$core$Result$Err(err);
                }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$mergeArgInferences = F3($mdgriffith$elm_codegen$Internal$Compiler$mergeArgInferences_fn);
    var $mdgriffith$elm_codegen$Internal$Index$typecheck = function (_v0) {
        var top = _v0.a;
        var tail = _v0.b;
        var scope = _v0.c;
        var check = _v0.d;
        return check;
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$applyType_fn = function (index, annotation, args) {
        if (annotation.$ === 1) {
            var err = annotation.a;
            return $elm$core$Result$Err(err);
        }
        else {
            var fnAnnotation = annotation.a;
            if ($mdgriffith$elm_codegen$Internal$Index$typecheck(index)) {
                var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$mergeArgInferences_fn(args, _List_Nil, fnAnnotation.i);
                if (!_v1.$) {
                    var mergedArgs = _v1.a;
                    return $mdgriffith$elm_codegen$Internal$Compiler$applyTypeHelper_fn(fnAnnotation.av, mergedArgs.i, fnAnnotation.t, mergedArgs.aI);
                }
                else {
                    var err = _v1.a;
                    return $elm$core$Result$Err(err);
                }
            }
            else {
                return $elm$core$Result$Err(_List_Nil);
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$applyType = F3($mdgriffith$elm_codegen$Internal$Compiler$applyType_fn);
    var $mdgriffith$elm_codegen$Internal$Index$Index_fn = function (a, b, c, d) {
        return { $: 0, a: a, b: b, c: c, d: d };
    }, $mdgriffith$elm_codegen$Internal$Index$Index = F4($mdgriffith$elm_codegen$Internal$Index$Index_fn);
    var $mdgriffith$elm_codegen$Internal$Index$dive = function (_v0) {
        var top = _v0.a;
        var tail = _v0.b;
        var scope = _v0.c;
        var check = _v0.d;
        return $mdgriffith$elm_codegen$Internal$Index$Index_fn(0, _List_Cons(top, tail), scope, check);
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$expression = function (toExp) {
        return function (index) {
            return toExp($mdgriffith$elm_codegen$Internal$Index$dive(index));
        };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$getImports = function (exp) {
        return exp.g;
    };
    var $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression = function (a) {
        return { $: 14, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$parens = function (expr) {
        switch (expr.$) {
            case 0:
                return expr;
            case 7:
                var i = expr.a;
                return expr;
            case 11:
                return expr;
            case 8:
                return expr;
            case 9:
                return expr;
            case 13:
                return expr;
            case 14:
                return expr;
            case 12:
                return expr;
            case 19:
                return expr;
            case 3:
                return expr;
            case 21:
                return expr;
            case 22:
                return expr;
            case 18:
                return expr;
            case 17:
                return expr;
            default:
                return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression($mdgriffith$elm_codegen$Internal$Compiler$nodify(expr));
        }
    };
    var $mdgriffith$elm_codegen$Internal$Index$next = function (_v0) {
        var top = _v0.a;
        var tail = _v0.b;
        var scope = _v0.c;
        var check = _v0.d;
        return $mdgriffith$elm_codegen$Internal$Index$Index_fn(top + 1, tail, scope, check);
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$threadHelper_fn = function (index, exps, rendered) {
        threadHelper: while (true) {
            if (!exps.b) {
                return $elm$core$List$reverse(rendered);
            }
            else {
                var toExpDetails = exps.a;
                var remain = exps.b;
                var $temp$index = $mdgriffith$elm_codegen$Internal$Index$next(index), $temp$exps = remain, $temp$rendered = _List_Cons(toExpDetails(index), rendered);
                index = $temp$index;
                exps = $temp$exps;
                rendered = $temp$rendered;
                continue threadHelper;
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$threadHelper = F3($mdgriffith$elm_codegen$Internal$Compiler$threadHelper_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$thread_fn = function (index, exps) {
        return $mdgriffith$elm_codegen$Internal$Compiler$threadHelper_fn(index, exps, _List_Nil);
    }, $mdgriffith$elm_codegen$Internal$Compiler$thread = F2($mdgriffith$elm_codegen$Internal$Compiler$thread_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails_fn = function (index, _v0) {
        var toExp = _v0;
        return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Index$next(index), toExp(index));
    }, $mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails = F2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails_fn);
    var $mdgriffith$elm_codegen$Elm$apply_fn = function (fnExp, argExpressions) {
        return $mdgriffith$elm_codegen$Internal$Compiler$expression(function (index) {
            var _v0 = $mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails_fn(index, fnExp);
            var annotationIndex = _v0.a;
            var fnDetails = _v0.b;
            var args = $mdgriffith$elm_codegen$Internal$Compiler$thread_fn(annotationIndex, argExpressions);
            return {
                a: $mdgriffith$elm_codegen$Internal$Compiler$applyType_fn(index, fnDetails.a, args),
                f: $stil4m$elm_syntax$Elm$Syntax$Expression$Application($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0, _List_Cons(fnDetails.f, $elm$core$List$map_fn(A2($elm$core$Basics$composeL, $mdgriffith$elm_codegen$Internal$Compiler$parens, function ($) {
                    return $.f;
                }), args)))),
                g: _Utils_ap(fnDetails.g, $elm$core$List$concatMap_fn($mdgriffith$elm_codegen$Internal$Compiler$getImports, args))
            };
        });
    }, $mdgriffith$elm_codegen$Elm$apply = F2($mdgriffith$elm_codegen$Elm$apply_fn);
    var $mdgriffith$elm_codegen$Elm$Annotation$function_fn = function (anns, _return) {
        return {
            av: $elm$core$List$foldl_fn_unwrapped(function (ann, aliases) {
                return $elm$core$Dict$union_fn($mdgriffith$elm_codegen$Elm$Annotation$getAliases(ann), aliases);
            }, $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, _List_Cons(_return, anns)),
            a: $elm$core$List$foldr_fn(F2(function (ann, fn) {
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(ann), $mdgriffith$elm_codegen$Internal$Compiler$nodify(fn));
            }), $mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(_return), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation, anns)),
            g: _Utils_ap($mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(_return), $elm$core$List$concatMap_fn($mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, anns))
        };
    }, $mdgriffith$elm_codegen$Elm$Annotation$function = F2($mdgriffith$elm_codegen$Elm$Annotation$function_fn);
    var $stil4m$elm_syntax$Elm$Syntax$Expression$Integer = function (a) {
        return { $: 7, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Types$nodify = function (exp) {
        return $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, exp);
    };
    var $mdgriffith$elm_codegen$Internal$Types$int = $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn($mdgriffith$elm_codegen$Internal$Types$nodify(_Utils_Tuple2(_List_Nil, "Int")), _List_Nil);
    var $mdgriffith$elm_codegen$Elm$int = function (intVal) {
        return function (_v0) {
            return {
                a: $elm$core$Result$Ok({ av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, i: $elm$core$Dict$empty, t: $mdgriffith$elm_codegen$Internal$Types$int }),
                f: $stil4m$elm_syntax$Elm$Syntax$Expression$Integer(intVal),
                g: _List_Nil
            };
        };
    };
    var $author$project$Gen$Ui$border = function (borderArg) {
        return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
            a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
            ])))),
            b: _List_fromArray(["Ui"]),
            c: "border"
        }), _List_fromArray([
            $mdgriffith$elm_codegen$Elm$int(borderArg)
        ]));
    };
    var $mdgriffith$elm_codegen$Elm$Annotation$bool = $mdgriffith$elm_codegen$Elm$Annotation$typed_fn(_List_Nil, "Bool", _List_Nil);
    var $mdgriffith$elm_codegen$Elm$Annotation$float = $mdgriffith$elm_codegen$Elm$Annotation$typed_fn(_List_Nil, "Float", _List_Nil);
    var $mdgriffith$elm_codegen$Elm$Annotation$list = function (inner) {
        return $mdgriffith$elm_codegen$Elm$Annotation$typed_fn(_List_Nil, "List", _List_fromArray([inner]));
    };
    var $mdgriffith$elm_codegen$Elm$Annotation$string = $mdgriffith$elm_codegen$Elm$Annotation$typed_fn(_List_Nil, "String", _List_Nil);
    var $author$project$Gen$Ui$call_ = {
        bM: function (aboveArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "above"
            }), _List_fromArray([aboveArg]));
        },
        bO: F2(function (attrIfArg, attrIfArg0) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$bool,
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "attrIf"
            }), _List_fromArray([attrIfArg, attrIfArg0]));
        }),
        aM: function (backgroundArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Color", _List_Nil)
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "background"
            }), _List_fromArray([backgroundArg]));
        },
        bP: function (backgroundGradientArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Gradient", _List_Nil))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "backgroundGradient"
            }), _List_fromArray([backgroundGradientArg]));
        },
        bQ: function (behindContentArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "behindContent"
            }), _List_fromArray([behindContentArg]));
        },
        bR: function (belowArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "below"
            }), _List_fromArray([belowArg]));
        },
        a8: function (borderArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "border"
            }), _List_fromArray([borderArg]));
        },
        bT: function (borderColorArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Color", _List_Nil)
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "borderColor"
            }), _List_fromArray([borderColorArg]));
        },
        bU: function (borderGradientArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
                        _Utils_Tuple2("width", $mdgriffith$elm_codegen$Elm$Annotation$int),
                        _Utils_Tuple2("gradient", $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Gradient", _List_Nil)),
                        _Utils_Tuple2("background", $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Gradient", _List_Nil))
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "borderGradient"
            }), _List_fromArray([borderGradientArg]));
        },
        bV: function (borderWithArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Edges", _List_Nil)
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "borderWith"
            }), _List_fromArray([borderWithArg]));
        },
        b_: F2(function (clippedArg, clippedArg0) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))),
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "clipped"
            }), _List_fromArray([clippedArg, clippedArg0]));
        }),
        b1: F2(function (columnArg, columnArg0) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))),
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ])))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "column"
            }), _List_fromArray([columnArg, columnArg0]));
        }),
        b5: function (downArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Position", _List_Nil))),
                b: _List_fromArray(["Ui"]),
                c: "down"
            }), _List_fromArray([downArg]));
        },
        b6: function (downloadArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$string]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "download"
            }), _List_fromArray([downloadArg]));
        },
        b7: function (downloadAsArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
                        _Utils_Tuple2("url", $mdgriffith$elm_codegen$Elm$Annotation$string),
                        _Utils_Tuple2("filename", $mdgriffith$elm_codegen$Elm$Annotation$string)
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "downloadAs"
            }), _List_fromArray([downloadAsArg]));
        },
        b9: F2(function (elArg, elArg0) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))),
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "el"
            }), _List_fromArray([elArg, elArg0]));
        }),
        cb: F2(function (embedArg, embedArg0) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))),
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Html"]), "Html", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "embed"
            }), _List_fromArray([embedArg, embedArg0]));
        }),
        ce: function (explainArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Todo", _List_Nil)
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "explain"
            }), _List_fromArray([explainArg]));
        },
        cr: function (heightArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Length", _List_Nil)
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "height"
            }), _List_fromArray([heightArg]));
        },
        cs: function (heightMaxArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "heightMax"
            }), _List_fromArray([heightMaxArg]));
        },
        ct: function (heightMinArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "heightMin"
            }), _List_fromArray([heightMinArg]));
        },
        cw: function (htmlArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Html"]), "Html", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "html"
            }), _List_fromArray([htmlArg]));
        },
        cx: function (htmlAttributeArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Html"]), "Attribute", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "htmlAttribute"
            }), _List_fromArray([htmlAttributeArg]));
        },
        cz: function (idArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$string]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "id"
            }), _List_fromArray([idArg]));
        },
        cB: F2(function (imageArg, imageArg0) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))),
                    $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
                        _Utils_Tuple2("source", $mdgriffith$elm_codegen$Elm$Annotation$string),
                        _Utils_Tuple2("description", $mdgriffith$elm_codegen$Elm$Annotation$string)
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "image"
            }), _List_fromArray([imageArg, imageArg0]));
        }),
        cC: function (inFrontArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "inFront"
            }), _List_fromArray([inFrontArg]));
        },
        cM: F2(function (layoutArg, layoutArg0) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))),
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Html"]), "Html", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "layout"
            }), _List_fromArray([layoutArg, layoutArg0]));
        }),
        bk: function (leftArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Position", _List_Nil))),
                b: _List_fromArray(["Ui"]),
                c: "left"
            }), _List_fromArray([leftArg]));
        },
        cQ: function (linkArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$string]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "link"
            }), _List_fromArray([linkArg]));
        },
        cR: function (linkNewTabArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$string]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "linkNewTab"
            }), _List_fromArray([linkNewTabArg]));
        },
        cS: F2(function (mapArg, mapArg0) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]), $mdgriffith$elm_codegen$Elm$Annotation$var("msg1")),
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg1")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "map"
            }), _List_fromArray([mapArg, mapArg0]));
        }),
        cZ: function (moveArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Position", _List_Nil)
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "move"
            }), _List_fromArray([moveArg]));
        },
        c2: function (onLeftArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "onLeft"
            }), _List_fromArray([onLeftArg]));
        },
        c3: function (onRightArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "onRight"
            }), _List_fromArray([onRightArg]));
        },
        c4: function (opacityArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$float]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "opacity"
            }), _List_fromArray([opacityArg]));
        },
        c8: function (paddingArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "padding"
            }), _List_fromArray([paddingArg]));
        },
        c9: function (paddingWithArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Edges", _List_Nil)
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "paddingWith"
            }), _List_fromArray([paddingWithArg]));
        },
        da: function (paletteArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
                        _Utils_Tuple2("background", $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Color", _List_Nil)),
                        _Utils_Tuple2("border", $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Color", _List_Nil)),
                        _Utils_Tuple2("font", $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Color", _List_Nil))
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "palette"
            }), _List_fromArray([paletteArg]));
        },
        de: function (portionArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Length", _List_Nil))),
                b: _List_fromArray(["Ui"]),
                c: "portion"
            }), _List_fromArray([portionArg]));
        },
        dj: function (pxArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Length", _List_Nil))),
                b: _List_fromArray(["Ui"]),
                c: "px"
            }), _List_fromArray([pxArg]));
        },
        dl: function (radiansArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$float]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Angle", _List_Nil))),
                b: _List_fromArray(["Ui"]),
                c: "radians"
            }), _List_fromArray([radiansArg]));
        },
        dq: F3(function (rgbArg, rgbArg0, rgbArg1) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Color", _List_Nil))),
                b: _List_fromArray(["Ui"]),
                c: "rgb"
            }), _List_fromArray([rgbArg, rgbArg0, rgbArg1]));
        }),
        br: function (rightArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Position", _List_Nil))),
                b: _List_fromArray(["Ui"]),
                c: "right"
            }), _List_fromArray([rightArg]));
        },
        dr: function (rotateArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Angle", _List_Nil)
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "rotate"
            }), _List_fromArray([rotateArg]));
        },
        ds: function (roundedArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "rounded"
            }), _List_fromArray([roundedArg]));
        },
        dt: function (roundedWithArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
                        _Utils_Tuple2("topLeft", $mdgriffith$elm_codegen$Elm$Annotation$int),
                        _Utils_Tuple2("topRight", $mdgriffith$elm_codegen$Elm$Annotation$int),
                        _Utils_Tuple2("bottomLeft", $mdgriffith$elm_codegen$Elm$Annotation$int),
                        _Utils_Tuple2("bottomRight", $mdgriffith$elm_codegen$Elm$Annotation$int)
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "roundedWith"
            }), _List_fromArray([roundedWithArg]));
        },
        du: F2(function (rowArg, rowArg0) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))),
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ])))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "row"
            }), _List_fromArray([rowArg, rowArg0]));
        }),
        dv: function (scaleArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$float]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "scale"
            }), _List_fromArray([scaleArg]));
        },
        dx: F2(function (scrollableArg, scrollableArg0) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))),
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                        $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "scrollable"
            }), _List_fromArray([scrollableArg, scrollableArg0]));
        }),
        dF: function (spacingArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "spacing"
            }), _List_fromArray([spacingArg]));
        },
        dG: function (spacingWithArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
                        _Utils_Tuple2("horizontal", $mdgriffith$elm_codegen$Elm$Annotation$int),
                        _Utils_Tuple2("vertical", $mdgriffith$elm_codegen$Elm$Annotation$int)
                    ]))
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "spacingWith"
            }), _List_fromArray([spacingWithArg]));
        },
        dO: function (textArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$string]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Element", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "text"
            }), _List_fromArray([textArg]));
        },
        dR: function (turnsArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$float]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Angle", _List_Nil))),
                b: _List_fromArray(["Ui"]),
                c: "turns"
            }), _List_fromArray([turnsArg]));
        },
        dU: function (upArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Position", _List_Nil))),
                b: _List_fromArray(["Ui"]),
                c: "up"
            }), _List_fromArray([upArg]));
        },
        bK: function (widthArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Length", _List_Nil)
                ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "width"
            }), _List_fromArray([widthArg]));
        },
        d_: function (widthMaxArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "widthMax"
            }), _List_fromArray([widthMaxArg]));
        },
        d$: function (widthMinArg) {
            return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
                a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
                ])))),
                b: _List_fromArray(["Ui"]),
                c: "widthMin"
            }), _List_fromArray([widthMinArg]));
        }
    };
    var $mdgriffith$elm_codegen$Elm$Op$BinOp_fn = function (a, b, c) {
        return { $: 0, a: a, b: b, c: c };
    }, $mdgriffith$elm_codegen$Elm$Op$BinOp = F3($mdgriffith$elm_codegen$Elm$Op$BinOp_fn);
    var $stil4m$elm_syntax$Elm$Syntax$Infix$Right = 1;
    var $stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication_fn = function (a, b, c, d) {
        return { $: 2, a: a, b: b, c: c, d: d };
    }, $stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication = F4($stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication_fn);
    var $mdgriffith$elm_codegen$Elm$Op$applyInfix_fn = function (extraImports, _v0, infixAnnotation, l, r) {
        var symbol = _v0.a;
        var dir = _v0.b;
        return function (index) {
            var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails_fn(index, l);
            var leftIndex = _v1.a;
            var left = _v1.b;
            var _v2 = $mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails_fn(leftIndex, r);
            var rightIndex = _v2.a;
            var right = _v2.b;
            var annotationIndex = $mdgriffith$elm_codegen$Internal$Index$next(rightIndex);
            return {
                a: $mdgriffith$elm_codegen$Internal$Compiler$applyType_fn(index, $elm$core$Result$Ok({ av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, i: $elm$core$Dict$empty, t: infixAnnotation }), _List_fromArray([left, right])),
                f: $stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication_fn(symbol, dir, $mdgriffith$elm_codegen$Internal$Compiler$nodify($mdgriffith$elm_codegen$Internal$Compiler$parens(left.f)), $mdgriffith$elm_codegen$Internal$Compiler$nodify($mdgriffith$elm_codegen$Internal$Compiler$parens(right.f))),
                g: _Utils_ap(extraImports, _Utils_ap(left.g, right.g))
            };
        };
    }, $mdgriffith$elm_codegen$Elm$Op$applyInfix = F5($mdgriffith$elm_codegen$Elm$Op$applyInfix_fn);
    var $mdgriffith$elm_codegen$Internal$Types$function_fn = function (args, _return) {
        return $elm$core$List$foldr_fn(F2(function (ann, fn) {
            return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($mdgriffith$elm_codegen$Internal$Types$nodify(ann), $mdgriffith$elm_codegen$Internal$Types$nodify(fn));
        }), _return, args);
    }, $mdgriffith$elm_codegen$Internal$Types$function = F2($mdgriffith$elm_codegen$Internal$Types$function_fn);
    var $mdgriffith$elm_codegen$Internal$Types$list = function (inner) {
        return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn($mdgriffith$elm_codegen$Internal$Types$nodify(_Utils_Tuple2(_List_Nil, "List")), _List_fromArray([
            $mdgriffith$elm_codegen$Internal$Types$nodify(inner)
        ]));
    };
    var $mdgriffith$elm_codegen$Internal$Types$formatValue = function (str) {
        var formatted = _Utils_eq($elm$core$String$toUpper(str), str) ? $elm$core$String$toLower(str) : _Utils_ap($elm$core$String$toLower($elm$core$String$left_fn(1, str)), $elm$core$String$dropLeft_fn(1, str));
        return $mdgriffith$elm_codegen$Internal$Format$sanitize(formatted);
    };
    var $mdgriffith$elm_codegen$Internal$Types$var = function (name) {
        return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType($mdgriffith$elm_codegen$Internal$Types$formatValue(name));
    };
    var $mdgriffith$elm_codegen$Elm$Op$cons_a0 = _List_Nil, $mdgriffith$elm_codegen$Elm$Op$cons_a1 = $mdgriffith$elm_codegen$Elm$Op$BinOp_fn("::", 1, 5), $mdgriffith$elm_codegen$Elm$Op$cons_a2 = $mdgriffith$elm_codegen$Internal$Types$function_fn(_List_fromArray([
        $mdgriffith$elm_codegen$Internal$Types$var("a"),
        $mdgriffith$elm_codegen$Internal$Types$list($mdgriffith$elm_codegen$Internal$Types$var("a"))
    ]), $mdgriffith$elm_codegen$Internal$Types$list($mdgriffith$elm_codegen$Internal$Types$var("a"))), $mdgriffith$elm_codegen$Elm$Op$cons = A3($mdgriffith$elm_codegen$Elm$Op$applyInfix, $mdgriffith$elm_codegen$Elm$Op$cons_a0, $mdgriffith$elm_codegen$Elm$Op$cons_a1, $mdgriffith$elm_codegen$Elm$Op$cons_a2);
    var $mdgriffith$elm_codegen$Internal$Compiler$Declaration = function (a) {
        return { $: 0, a: a };
    };
    var $stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$NotExposed = { $: 0 };
    var $elm$core$Result$andThen_fn = function (callback, result) {
        if (!result.$) {
            var value = result.a;
            return callback(value);
        }
        else {
            var msg = result.a;
            return $elm$core$Result$Err(msg);
        }
    }, $elm$core$Result$andThen = F2($elm$core$Result$andThen_fn);
    var $stil4m$elm_syntax$Elm$Syntax$Node$map_fn = function (f, _v0) {
        var r = _v0.a;
        var a = _v0.b;
        return $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(r, f(a));
    }, $stil4m$elm_syntax$Elm$Syntax$Node$map = F2($stil4m$elm_syntax$Elm$Syntax$Node$map_fn);
    var $elm$core$Tuple$mapSecond_fn = function (func, _v0) {
        var x = _v0.a;
        var y = _v0.b;
        return _Utils_Tuple2(x, func(y));
    }, $elm$core$Tuple$mapSecond = F2($elm$core$Tuple$mapSecond_fn);
    var $mdgriffith$elm_codegen$Internal$Clean$doRename_fn = function (dict, ann) {
        switch (ann.$) {
            case 0:
                var generic = ann.a;
                var _v1 = $elm$core$Dict$get_fn(generic, dict);
                if (_v1.$ === 1) {
                    return ann;
                }
                else {
                    var renamed = _v1.a;
                    return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(renamed);
                }
            case 1:
                var name = ann.a;
                var nodedVars = ann.b;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn(name, $elm$core$List$map_fn($stil4m$elm_syntax$Elm$Syntax$Node$map($mdgriffith$elm_codegen$Internal$Clean$doRename(dict)), nodedVars));
            case 2:
                return ann;
            case 3:
                var nodedVars = ann.a;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled($elm$core$List$map_fn($stil4m$elm_syntax$Elm$Syntax$Node$map($mdgriffith$elm_codegen$Internal$Clean$doRename(dict)), nodedVars));
            case 4:
                var record = ann.a;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record($elm$core$List$map_fn($stil4m$elm_syntax$Elm$Syntax$Node$map($elm$core$Tuple$mapSecond($stil4m$elm_syntax$Elm$Syntax$Node$map($mdgriffith$elm_codegen$Internal$Clean$doRename(dict)))), record));
            case 5:
                var name = ann.a;
                var _v2 = ann.b;
                var range = _v2.a;
                var record = _v2.b;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord_fn(name, $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn(range, $elm$core$List$map_fn($stil4m$elm_syntax$Elm$Syntax$Node$map($elm$core$Tuple$mapSecond($stil4m$elm_syntax$Elm$Syntax$Node$map($mdgriffith$elm_codegen$Internal$Clean$doRename(dict)))), record)));
            default:
                var nodeOne = ann.a;
                var nodeTwo = ann.b;
                return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($stil4m$elm_syntax$Elm$Syntax$Node$map_fn($mdgriffith$elm_codegen$Internal$Clean$doRename(dict), nodeOne), $stil4m$elm_syntax$Elm$Syntax$Node$map_fn($mdgriffith$elm_codegen$Internal$Clean$doRename(dict), nodeTwo));
        }
    }, $mdgriffith$elm_codegen$Internal$Clean$doRename = F2($mdgriffith$elm_codegen$Internal$Clean$doRename_fn);
    var $mdgriffith$elm_codegen$Internal$Clean$prepareRename_fn = function (ann, dict) {
        switch (ann.$) {
            case 0:
                var generic = ann.a;
                return $elm$core$Set$insert_fn(generic, dict);
            case 1:
                var name = ann.a;
                var nodedVars = ann.b;
                return $elm$core$List$foldl_fn_unwrapped(function (_v1, d) {
                    var tipe = _v1.b;
                    return $mdgriffith$elm_codegen$Internal$Clean$prepareRename_fn(tipe, d);
                }, dict, nodedVars);
            case 2:
                return dict;
            case 3:
                var nodedVars = ann.a;
                return $elm$core$List$foldl_fn_unwrapped(function (_v2, d) {
                    var tipe = _v2.b;
                    return $mdgriffith$elm_codegen$Internal$Clean$prepareRename_fn(tipe, d);
                }, dict, nodedVars);
            case 4:
                var record = ann.a;
                return $elm$core$List$foldl_fn_unwrapped(function (_v3, d) {
                    var _v4 = _v3.b;
                    var _v5 = _v4.b;
                    var field = _v5.b;
                    return $mdgriffith$elm_codegen$Internal$Clean$prepareRename_fn(field, d);
                }, dict, record);
            case 5:
                var name = ann.a;
                var _v6 = ann.b;
                var range = _v6.a;
                var record = _v6.b;
                return $elm$core$List$foldl_fn_unwrapped(function (_v7, d) {
                    var _v8 = _v7.b;
                    var _v9 = _v8.b;
                    var field = _v9.b;
                    return $mdgriffith$elm_codegen$Internal$Clean$prepareRename_fn(field, d);
                }, dict, record);
            default:
                var _v10 = ann.a;
                var one = _v10.b;
                var _v11 = ann.b;
                var two = _v11.b;
                return $mdgriffith$elm_codegen$Internal$Clean$prepareRename_fn(two, $mdgriffith$elm_codegen$Internal$Clean$prepareRename_fn(one, dict));
        }
    }, $mdgriffith$elm_codegen$Internal$Clean$prepareRename = F2($mdgriffith$elm_codegen$Internal$Clean$prepareRename_fn);
    var $mdgriffith$elm_codegen$Internal$Clean$findClean_fn = function (i, name, set) {
        findClean: while (true) {
            var newName = (!i) ? name : _Utils_ap(name, $elm$core$String$fromInt(i));
            if ($elm$core$Set$member_fn(newName, set)) {
                var $temp$i = i + 1, $temp$name = name, $temp$set = set;
                i = $temp$i;
                name = $temp$name;
                set = $temp$set;
                continue findClean;
            }
            else {
                return name;
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Clean$findClean = F3($mdgriffith$elm_codegen$Internal$Clean$findClean_fn);
    var $elm$core$Set$foldl_fn = function (func, initialState, _v0) {
        var dict = _v0;
        return $elm$core$Dict$foldl_fn_unwrapped(function (key, _v1, state) {
            return A2(func, key, state);
        }, initialState, dict);
    }, $elm$core$Set$foldl_fn_unwrapped = function (func, initialState, _v0) {
        var dict = _v0;
        return $elm$core$Dict$foldl_fn_unwrapped(function (key, _v1, state) {
            return func(key, state);
        }, initialState, dict);
    }, $elm$core$Set$foldl = F3($elm$core$Set$foldl_fn);
    var $mdgriffith$elm_codegen$Internal$Clean$sanitized = function (str) {
        var _v0 = $elm$core$String$split_fn("_", str);
        if (!_v0.b) {
            return str;
        }
        else {
            var top = _v0.a;
            var remain = _v0.b;
            return top;
        }
    };
    var $mdgriffith$elm_codegen$Internal$Clean$verify = function (set) {
        return $elm$core$Set$foldl_fn_unwrapped(function (name, gathered) {
            var newName = $mdgriffith$elm_codegen$Internal$Clean$findClean_fn(0, $mdgriffith$elm_codegen$Internal$Clean$sanitized(name), set);
            return $elm$core$Dict$insert_fn(name, newName, gathered);
        }, $elm$core$Dict$empty, set);
    };
    var $mdgriffith$elm_codegen$Internal$Clean$clean = function (ann) {
        var renames = $mdgriffith$elm_codegen$Internal$Clean$verify($mdgriffith$elm_codegen$Internal$Clean$prepareRename_fn(ann, $elm$core$Set$empty));
        return $mdgriffith$elm_codegen$Internal$Clean$doRename_fn(renames, ann);
    };
    var $mdgriffith$elm_codegen$Internal$Format$formatDeclarationName = function (str) {
        if (str === "main") {
            return "main";
        }
        else {
            return $mdgriffith$elm_codegen$Internal$Format$formatValue(str);
        }
    };
    var $elm$core$Result$mapError_fn = function (f, result) {
        if (!result.$) {
            var v = result.a;
            return $elm$core$Result$Ok(v);
        }
        else {
            var e = result.a;
            return $elm$core$Result$Err(f(e));
        }
    }, $elm$core$Result$mapError = F2($elm$core$Result$mapError_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$inferenceErrorToString = function (inf) {
        switch (inf.$) {
            case 1:
                var str = inf.a;
                return "Todo " + str;
            case 0:
                var one = inf.a;
                var two = inf.b;
                return "There are multiple different types in a list: \n\n" + ("    " + ($stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(one))) + ("\n\n    " + $stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(two))))));
            case 11:
                var details = inf.a;
                return "Mismatched record update";
            case 2:
                return "Case statement is empty";
            case 3:
                var fn = inf.a;
                var args = inf.b;
                return "The following is being called as a function\n\n    " + ($stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(fn))) + ("\n\nwith these arguments:\n\n    " + ($elm$core$String$join_fn(" -> ", $elm$core$List$map_fn(function (arg) {
                    return $stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(arg)));
                }, args)) + "\n\nbut that's wrong, right?")));
            case 5:
                var fieldName = inf.a;
                return "There is a duplicate field in a record: " + fieldName;
            case 6:
                return "Case returns different types.";
            case 7:
                var found = inf.a;
                return "I can't find ." + (found.S + (", this record only has these fields:\n\n    " + $elm$core$String$join_fn("\n    ", found.eB)));
            case 8:
                var attempting = inf.a;
                return "You're trying to access\n\n    ." + (attempting.S + ("\n\nbut this value isn't a record. It's a\n\n    " + $stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(attempting.aq)))));
            case 9:
                var attempting = inf.a;
                return "You're trying to access\n\n    ." + (attempting.S + ("\n\nbut this value isn't a record, it's a\n\n    " + ($stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(attempting.aq))) + "\n\nIs this value supposed to be an alias for a record? If so, check out Elm.alias!")));
            case 10:
                var details = inf.a;
                return details.et + " not found, though I was trying to unpack it in a let expression.";
            case 12:
                var type_ = inf.a;
                return $stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + " is not appendable.  Only Strings and Lists are appendable";
            case 13:
                var type_ = inf.a;
                return $stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + " is not appendable.  Only Strings and Lists are appendable";
            case 14:
                var one = inf.a;
                var two = inf.b;
                return "I found\n\n    " + ($stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(one))) + ("\n\nBut I was expecting:\n\n    " + $stil4m$elm_syntax$Elm$Writer$write($stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation($mdgriffith$elm_codegen$Internal$Compiler$nodify(two)))));
            default:
                return "Different lists of type variables";
        }
    };
    var $mdgriffith$elm_codegen$Elm$renderError = function (err) {
        if (!err.b) {
            return "";
        }
        else {
            return $elm$core$String$join_fn("\n\n", $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$inferenceErrorToString, err));
        }
    };
    var $elm$core$Set$fromList = function (list) {
        return $elm$core$List$foldl_fn($elm$core$Set$insert, $elm$core$Set$empty, list);
    };
    var $elm$core$Basics$neq = _Utils_notEqual;
    var $mdgriffith$elm_codegen$Internal$Compiler$simplify = function (fullStr) {
        return $elm$core$List$foldl_fn_unwrapped(function (piece, str) {
            var isDigit = _String_all_fn($elm$core$Char$isDigit, piece);
            if (isDigit) {
                return str;
            }
            else {
                if (str === "") {
                    return piece;
                }
                else {
                    return str + ("_" + piece);
                }
            }
        }, "", $elm$core$String$split_fn("_", fullStr));
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper_fn = function (existing, renames, type_) {
        switch (type_.$) {
            case 0:
                var varName = type_.a;
                var _v1 = $elm$core$Dict$get_fn(varName, renames);
                if (_v1.$ === 1) {
                    var simplified = $mdgriffith$elm_codegen$Internal$Compiler$simplify(varName);
                    return ($elm$core$Set$member_fn(simplified, existing) && (!_Utils_eq(varName, simplified))) ? _Utils_Tuple2(renames, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(simplified)) : _Utils_Tuple2($elm$core$Dict$insert_fn(varName, simplified, renames), $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(simplified));
                }
                else {
                    var rename = _v1.a;
                    return _Utils_Tuple2(renames, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(rename));
                }
            case 1:
                var name = type_.a;
                var vars = type_.b;
                var _v2 = $elm$core$List$foldl_fn_unwrapped(function (typevar, _v3) {
                    var varUsed = _v3.a;
                    var varList = _v3.b;
                    var _v4 = $mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper_fn(existing, varUsed, $mdgriffith$elm_codegen$Internal$Compiler$denode(typevar));
                    var oneUsed = _v4.a;
                    var oneType = _v4.b;
                    return _Utils_Tuple2(oneUsed, _List_Cons($mdgriffith$elm_codegen$Internal$Compiler$nodify(oneType), varList));
                }, _Utils_Tuple2(renames, _List_Nil), vars);
                var newUsed = _v2.a;
                var newVars = _v2.b;
                return _Utils_Tuple2(newUsed, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn(name, $elm$core$List$reverse(newVars)));
            case 2:
                return _Utils_Tuple2(renames, type_);
            case 3:
                var valsA = type_.a;
                return _Utils_Tuple2(renames, type_);
            case 4:
                var fieldsA = type_.a;
                return _Utils_Tuple2(renames, type_);
            case 5:
                var _v5 = type_.a;
                var reVarName = _v5.b;
                var _v6 = type_.b;
                var fieldsARange = _v6.a;
                var fieldsA = _v6.b;
                return _Utils_Tuple2(renames, type_);
            default:
                var one = type_.a;
                var two = type_.b;
                var _v7 = $mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper_fn(existing, renames, $mdgriffith$elm_codegen$Internal$Compiler$denode(one));
                var oneUsed = _v7.a;
                var oneType = _v7.b;
                var _v8 = $mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper_fn(existing, oneUsed, $mdgriffith$elm_codegen$Internal$Compiler$denode(two));
                var twoUsed = _v8.a;
                var twoType = _v8.b;
                return _Utils_Tuple2(twoUsed, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(oneType), $mdgriffith$elm_codegen$Internal$Compiler$nodify(twoType)));
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper = F3($mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariables = function (type_) {
        var existing = $elm$core$Set$fromList($mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper(type_));
        return $mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper_fn(existing, $elm$core$Dict$empty, type_).b;
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$resolve_fn = function (index, cache, annotation) {
        if ($mdgriffith$elm_codegen$Internal$Index$typecheck(index)) {
            var restrictions = $mdgriffith$elm_codegen$Internal$Compiler$getRestrictions_fn(annotation, cache);
            var _v0 = $mdgriffith$elm_codegen$Internal$Compiler$resolveVariables_fn($elm$core$Set$empty, cache, annotation);
            if (!_v0.$) {
                var newAnnotation = _v0.a;
                return $mdgriffith$elm_codegen$Internal$Compiler$checkRestrictions_fn(restrictions, $mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariables(newAnnotation));
            }
            else {
                var err = _v0.a;
                return $elm$core$Result$Err(err);
            }
        }
        else {
            return $elm$core$Result$Err("Type inference skipped.");
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$resolve = F3($mdgriffith$elm_codegen$Internal$Compiler$resolve_fn);
    var $mdgriffith$elm_codegen$Elm$declaration_fn = function (nameStr, _v0) {
        var toBody = _v0;
        var name = $mdgriffith$elm_codegen$Internal$Format$formatDeclarationName(nameStr);
        return $mdgriffith$elm_codegen$Internal$Compiler$Declaration({
            ab: $elm$core$Maybe$Nothing,
            an: $mdgriffith$elm_codegen$Internal$Compiler$NotExposed,
            g: _List_Nil,
            c: name,
            at: function (index) {
                var body = toBody(index);
                var resolvedType = $elm$core$Result$andThen_fn(function (sig) {
                    return $mdgriffith$elm_codegen$Internal$Compiler$resolve_fn(index, sig.i, sig.t);
                }, $elm$core$Result$mapError_fn($mdgriffith$elm_codegen$Elm$renderError, body.a));
                var maybeWarning = function () {
                    if (!resolvedType.$) {
                        var sig = resolvedType.a;
                        var _v5 = body.a;
                        if (!_v5.$) {
                            var inference = _v5.a;
                            return $elm$core$Maybe$Nothing;
                        }
                        else {
                            if (!_v5.a.b) {
                                return $elm$core$Maybe$Nothing;
                            }
                            else {
                                var err = _v5.a;
                                return $elm$core$Maybe$Just({
                                    es: name,
                                    fP: $mdgriffith$elm_codegen$Elm$renderError(err)
                                });
                            }
                        }
                    }
                    else {
                        if (resolvedType.a === "") {
                            return $elm$core$Maybe$Nothing;
                        }
                        else {
                            var err = resolvedType.a;
                            return $elm$core$Maybe$Just({ es: name, fP: err });
                        }
                    }
                }();
                return {
                    al: body.g,
                    es: $stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration({
                        es: function () {
                            var _v1 = body.f;
                            if (_v1.$ === 17) {
                                var lam = _v1.a;
                                return $mdgriffith$elm_codegen$Internal$Compiler$nodify({
                                    a6: lam.W,
                                    f: lam.f,
                                    c: $mdgriffith$elm_codegen$Internal$Compiler$nodify(name)
                                });
                            }
                            else {
                                return $mdgriffith$elm_codegen$Internal$Compiler$nodify({
                                    a6: _List_Nil,
                                    f: $mdgriffith$elm_codegen$Internal$Compiler$nodify(body.f),
                                    c: $mdgriffith$elm_codegen$Internal$Compiler$nodify(name)
                                });
                            }
                        }(),
                        bb: $elm$core$Maybe$Nothing,
                        fw: function () {
                            var _v2 = body.a;
                            if (!_v2.$) {
                                var sig = _v2.a;
                                if (!resolvedType.$) {
                                    if (!resolvedType.a.$) {
                                        var generic = resolvedType.a.a;
                                        return $elm$core$Maybe$Nothing;
                                    }
                                    else {
                                        var finalType = resolvedType.a;
                                        return $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Compiler$nodify({
                                            c: $mdgriffith$elm_codegen$Internal$Compiler$nodify(name),
                                            a2: $mdgriffith$elm_codegen$Internal$Compiler$nodify($mdgriffith$elm_codegen$Internal$Clean$clean(finalType))
                                        }));
                                    }
                                }
                                else {
                                    var errMsg = resolvedType.a;
                                    return $elm$core$Maybe$Nothing;
                                }
                            }
                            else {
                                return $elm$core$Maybe$Nothing;
                            }
                        }()
                    }),
                    fP: maybeWarning
                };
            }
        });
    }, $mdgriffith$elm_codegen$Elm$declaration = F2($mdgriffith$elm_codegen$Elm$declaration_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$Exposed = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$expose = function (decl) {
        switch (decl.$) {
            case 1:
                return decl;
            case 2:
                return decl;
            default:
                var details = decl.a;
                return $mdgriffith$elm_codegen$Internal$Compiler$Declaration(_Utils_update(details, {
                    an: $mdgriffith$elm_codegen$Internal$Compiler$Exposed({ ax: false, ap: $elm$core$Maybe$Nothing })
                }));
        }
    };
    var $mdgriffith$elm_codegen$Elm$expose = $mdgriffith$elm_codegen$Internal$Compiler$expose;
    var $stil4m$elm_syntax$Elm$Syntax$Exposing$All = function (a) {
        return { $: 0, a: a };
    };
    var $stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Comments$Markdown = function (a) {
        return { $: 0, a: a };
    };
    var $stil4m$elm_syntax$Elm$Syntax$Module$NormalModule = function (a) {
        return { $: 0, a: a };
    };
    var $stil4m$elm_syntax$Elm$Syntax$Module$PortModule = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$RenderedBlock = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$RenderedComment = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$RenderedDecl = function (a) {
        return { $: 0, a: a };
    };
    var $stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration = function (a) {
        return { $: 1, a: a };
    };
    var $stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Render$addDocs_fn = function (maybeDoc, decl) {
        if (maybeDoc.$ === 1) {
            return decl;
        }
        else {
            var doc = maybeDoc.a;
            switch (decl.$) {
                case 0:
                    var func = decl.a;
                    return $stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(_Utils_update(func, {
                        bb: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Compiler$nodify(doc))
                    }));
                case 1:
                    var typealias = decl.a;
                    return $stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration(_Utils_update(typealias, {
                        bb: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Compiler$nodify(doc))
                    }));
                case 2:
                    var typeDecl = decl.a;
                    return $stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration(_Utils_update(typeDecl, {
                        bb: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Compiler$nodify(doc))
                    }));
                case 3:
                    var sig = decl.a;
                    return decl;
                case 4:
                    return decl;
                default:
                    return decl;
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Render$addDocs = F2($mdgriffith$elm_codegen$Internal$Render$addDocs_fn);
    var $stil4m$elm_syntax$Elm$Syntax$Exposing$FunctionExpose = function (a) {
        return { $: 1, a: a };
    };
    var $stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose = function (a) {
        return { $: 3, a: a };
    };
    var $stil4m$elm_syntax$Elm$Syntax$Exposing$TypeOrAliasExpose = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Render$addExposed_fn = function (exposed, declaration, otherExposes) {
        if (!exposed.$) {
            return otherExposes;
        }
        else {
            var details = exposed.a;
            switch (declaration.$) {
                case 0:
                    var fn = declaration.a;
                    var fnName = $mdgriffith$elm_codegen$Internal$Compiler$denode(function ($) {
                        return $.c;
                    }($mdgriffith$elm_codegen$Internal$Compiler$denode(fn.es)));
                    return _List_Cons($stil4m$elm_syntax$Elm$Syntax$Exposing$FunctionExpose(fnName), otherExposes);
                case 1:
                    var synonym = declaration.a;
                    var aliasName = $mdgriffith$elm_codegen$Internal$Compiler$denode(synonym.c);
                    return _List_Cons($stil4m$elm_syntax$Elm$Syntax$Exposing$TypeOrAliasExpose(aliasName), otherExposes);
                case 2:
                    var myType = declaration.a;
                    var typeName = $mdgriffith$elm_codegen$Internal$Compiler$denode(myType.c);
                    return details.ax ? _List_Cons($stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose({
                        c: typeName,
                        fg: $elm$core$Maybe$Just($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange)
                    }), otherExposes) : _List_Cons($stil4m$elm_syntax$Elm$Syntax$Exposing$TypeOrAliasExpose(typeName), otherExposes);
                case 3:
                    var myPort = declaration.a;
                    var typeName = $mdgriffith$elm_codegen$Internal$Compiler$denode(myPort.c);
                    return _List_Cons($stil4m$elm_syntax$Elm$Syntax$Exposing$FunctionExpose(typeName), otherExposes);
                case 4:
                    var inf = declaration.a;
                    return otherExposes;
                default:
                    return otherExposes;
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Render$addExposed = F3($mdgriffith$elm_codegen$Internal$Render$addExposed_fn);
    var $mdgriffith$elm_codegen$Internal$Comments$Comment = $elm$core$Basics$identity;
    var $mdgriffith$elm_codegen$Internal$Comments$addPart_fn = function (_v0, part) {
        var parts = _v0;
        return _List_Cons(part, parts);
    }, $mdgriffith$elm_codegen$Internal$Comments$addPart = F2($mdgriffith$elm_codegen$Internal$Comments$addPart_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$fullModName = function (name) {
        return $elm$core$String$join_fn(".", name);
    };
    var $elm$core$List$sortBy = _List_sortBy;
    var $mdgriffith$elm_codegen$Internal$Render$dedupImports = function (mods) {
        return _List_sortBy_fn($mdgriffith$elm_codegen$Internal$Compiler$fullModName, $elm$core$List$foldl_fn_unwrapped(function (mod, _v0) {
            var set = _v0.a;
            var gathered = _v0.b;
            var stringName = $mdgriffith$elm_codegen$Internal$Compiler$fullModName(mod);
            return $elm$core$Set$member_fn(stringName, set) ? _Utils_Tuple2(set, gathered) : _Utils_Tuple2($elm$core$Set$insert_fn(stringName, set), _List_Cons(mod, gathered));
        }, _Utils_Tuple2($elm$core$Set$empty, _List_Nil), mods).b);
    };
    var $mdgriffith$elm_codegen$Internal$Comments$emptyComment = _List_Nil;
    var $elm$core$List$maybeCons_fn = function (f, mx, xs) {
        var _v0 = f(mx);
        if (!_v0.$) {
            var x = _v0.a;
            return _List_Cons(x, xs);
        }
        else {
            return xs;
        }
    }, $elm$core$List$maybeCons = F3($elm$core$List$maybeCons_fn);
    var $elm$core$List$filterMap_fn = function (f, xs) {
        return $elm$core$List$foldr_fn($elm$core$List$maybeCons(f), _List_Nil, xs);
    }, $elm$core$List$filterMap = F2($elm$core$List$filterMap_fn);
    var $mdgriffith$elm_codegen$Internal$Render$matchName_fn = function (one, two) {
        if (one.$ === 1) {
            if (two.$ === 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            var oneName = one.a;
            if (two.$ === 1) {
                return false;
            }
            else {
                var twoName = two.a;
                return _Utils_eq(oneName, twoName);
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Render$matchName = F2($mdgriffith$elm_codegen$Internal$Render$matchName_fn);
    var $mdgriffith$elm_codegen$Internal$Render$groupExposing = function (items) {
        return $elm$core$List$map_fn(function (doc) {
            return _Utils_update(doc, {
                cU: $elm$core$List$reverse(doc.cU)
            });
        }, $elm$core$List$foldr_fn(F2(function (_v0, acc) {
            var maybeGroup = _v0.a;
            var name = _v0.b;
            if (!acc.b) {
                return _List_fromArray([
                    {
                        ap: maybeGroup,
                        cU: _List_fromArray([name])
                    }
                ]);
            }
            else {
                var top = acc.a;
                var groups = acc.b;
                return $mdgriffith$elm_codegen$Internal$Render$matchName_fn(maybeGroup, top.ap) ? _List_Cons({
                    ap: top.ap,
                    cU: _List_Cons(name, top.cU)
                }, groups) : _List_Cons({
                    ap: maybeGroup,
                    cU: _List_fromArray([name])
                }, acc);
            }
        }), _List_Nil, items));
    };
    var $stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$builtIn = function (name) {
        _v0$13: while (true) {
            if (name.b) {
                if (name.b.b) {
                    if ((name.a === "Platform") && (!name.b.b.b)) {
                        switch (name.b.a) {
                            case "Sub":
                                var _v1 = name.b;
                                return true;
                            case "Cmd":
                                var _v2 = name.b;
                                return true;
                            default:
                                break _v0$13;
                        }
                    }
                    else {
                        break _v0$13;
                    }
                }
                else {
                    switch (name.a) {
                        case "List":
                            return true;
                        case "Maybe":
                            return true;
                        case "String":
                            return true;
                        case "Basics":
                            return true;
                        case "Char":
                            return true;
                        case "Debug":
                            return true;
                        case "Tuple":
                            return true;
                        case "Result":
                            return true;
                        case "Platform":
                            return true;
                        case "Sub":
                            return true;
                        case "Cmd":
                            return true;
                        default:
                            break _v0$13;
                    }
                }
            }
            else {
                break _v0$13;
            }
        }
        return false;
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$findAlias_fn = function (modName, aliases) {
        findAlias: while (true) {
            if (!aliases.b) {
                return $elm$core$Maybe$Nothing;
            }
            else {
                var _v1 = aliases.a;
                var aliasModName = _v1.a;
                var alias = _v1.b;
                var remain = aliases.b;
                if (_Utils_eq(modName, aliasModName)) {
                    return $elm$core$Maybe$Just(alias);
                }
                else {
                    var $temp$modName = modName, $temp$aliases = remain;
                    modName = $temp$modName;
                    aliases = $temp$aliases;
                    continue findAlias;
                }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$findAlias = F2($mdgriffith$elm_codegen$Internal$Compiler$findAlias_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$isParser = function (name) {
        _v0$2: while (true) {
            if (name.b && (name.a === "Parser")) {
                if (!name.b.b) {
                    return true;
                }
                else {
                    if ((name.b.a === "Advanced") && (!name.b.b.b)) {
                        var _v1 = name.b;
                        return true;
                    }
                    else {
                        break _v0$2;
                    }
                }
            }
            else {
                break _v0$2;
            }
        }
        return false;
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$isUrlParser = function (name) {
        if ((((name.b && (name.a === "Url")) && name.b.b) && (name.b.a === "Parser")) && (!name.b.b.b)) {
            var _v1 = name.b;
            return true;
        }
        else {
            return false;
        }
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$makeImport_fn = function (aliases, name) {
        if (!name.b) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$findAlias_fn(name, aliases);
            if (_v1.$ === 1) {
                return $mdgriffith$elm_codegen$Internal$Compiler$builtIn(name) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just({
                    cf: $mdgriffith$elm_codegen$Internal$Compiler$isUrlParser(name) ? $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(_List_fromArray([
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose("</>")),
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose("<?>"))
                    ])))) : ($mdgriffith$elm_codegen$Internal$Compiler$isParser(name) ? $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(_List_fromArray([
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose("|=")),
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose("|."))
                    ])))) : $elm$core$Maybe$Nothing),
                    cW: $elm$core$Maybe$Nothing,
                    bm: $mdgriffith$elm_codegen$Internal$Compiler$nodify(name)
                });
            }
            else {
                var alias = _v1.a;
                return $elm$core$Maybe$Just({
                    cf: $mdgriffith$elm_codegen$Internal$Compiler$isUrlParser(name) ? $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(_List_fromArray([
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose("</>")),
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose("<?>"))
                    ])))) : ($mdgriffith$elm_codegen$Internal$Compiler$isParser(name) ? $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(_List_fromArray([
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose("|=")),
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose("|."))
                    ])))) : $elm$core$Maybe$Nothing),
                    cW: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Compiler$nodify(_List_fromArray([alias]))),
                    bm: $mdgriffith$elm_codegen$Internal$Compiler$nodify(name)
                });
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$makeImport = F2($mdgriffith$elm_codegen$Internal$Compiler$makeImport_fn);
    var $the_sett$elm_pretty_printer$Internals$Concatenate_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $the_sett$elm_pretty_printer$Internals$Concatenate = F2($the_sett$elm_pretty_printer$Internals$Concatenate_fn);
    var $the_sett$elm_pretty_printer$Pretty$append_fn = function (doc1, doc2) {
        return $the_sett$elm_pretty_printer$Internals$Concatenate_fn(function (_v0) {
            return doc1;
        }, function (_v1) {
            return doc2;
        });
    }, $the_sett$elm_pretty_printer$Pretty$append = F2($the_sett$elm_pretty_printer$Pretty$append_fn);
    var $elm_community$basics_extra$Basics$Extra$flip_fn = function (f, b, a) {
        return A2(f, a, b);
    }, $elm_community$basics_extra$Basics$Extra$flip_fn_unwrapped = function (f, b, a) {
        return f(a, b);
    }, $elm_community$basics_extra$Basics$Extra$flip = F3($elm_community$basics_extra$Basics$Extra$flip_fn);
    var $the_sett$elm_pretty_printer$Pretty$a_a0 = $the_sett$elm_pretty_printer$Pretty$append, $the_sett$elm_pretty_printer$Pretty$a = $elm_community$basics_extra$Basics$Extra$flip($the_sett$elm_pretty_printer$Pretty$a_a0);
    var $the_sett$elm_pretty_printer$Internals$Line_fn = function (a, b) {
        return { $: 4, a: a, b: b };
    }, $the_sett$elm_pretty_printer$Internals$Line = F2($the_sett$elm_pretty_printer$Internals$Line_fn);
    var $the_sett$elm_pretty_printer$Pretty$line = $the_sett$elm_pretty_printer$Internals$Line_fn(" ", "");
    var $the_sett$elm_pretty_printer$Internals$Empty = { $: 0 };
    var $the_sett$elm_pretty_printer$Pretty$empty = $the_sett$elm_pretty_printer$Internals$Empty;
    var $the_sett$elm_pretty_printer$Pretty$join_fn = function (sep, docs) {
        join: while (true) {
            if (!docs.b) {
                return $the_sett$elm_pretty_printer$Pretty$empty;
            }
            else {
                if (!docs.a.$) {
                    var _v1 = docs.a;
                    var ds = docs.b;
                    var $temp$sep = sep, $temp$docs = ds;
                    sep = $temp$sep;
                    docs = $temp$docs;
                    continue join;
                }
                else {
                    var d = docs.a;
                    var ds = docs.b;
                    var step = F2(function (x, rest) {
                        if (!x.$) {
                            return rest;
                        }
                        else {
                            var doc = x;
                            return $the_sett$elm_pretty_printer$Pretty$append_fn(sep, $the_sett$elm_pretty_printer$Pretty$append_fn(doc, rest));
                        }
                    });
                    var spersed = $elm$core$List$foldr_fn(step, $the_sett$elm_pretty_printer$Pretty$empty, ds);
                    return $the_sett$elm_pretty_printer$Pretty$append_fn(d, spersed);
                }
            }
        }
    }, $the_sett$elm_pretty_printer$Pretty$join = F2($the_sett$elm_pretty_printer$Pretty$join_fn);
    var $the_sett$elm_pretty_printer$Pretty$lines_a0 = $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$lines = $the_sett$elm_pretty_printer$Pretty$join($the_sett$elm_pretty_printer$Pretty$lines_a0);
    var $elm$core$Maybe$map_fn = function (f, maybe) {
        if (!maybe.$) {
            var value = maybe.a;
            return $elm$core$Maybe$Just(f(value));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    }, $elm$core$Maybe$map = F2($elm$core$Maybe$map_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe_a0 = $mdgriffith$elm_codegen$Internal$Compiler$denode, $mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe = $elm$core$Maybe$map($mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe_a0);
    var $mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0 = $mdgriffith$elm_codegen$Internal$Compiler$denode, $mdgriffith$elm_codegen$Internal$Compiler$denodeAll = $elm$core$List$map($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0);
    var $the_sett$elm_pretty_printer$Internals$Text_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $the_sett$elm_pretty_printer$Internals$Text = F2($the_sett$elm_pretty_printer$Internals$Text_fn);
    var $elm$core$String$cons = _String_cons;
    var $elm$core$String$fromChar = function (_char) {
        return _String_cons_fn(_char, "");
    };
    var $the_sett$elm_pretty_printer$Pretty$char = function (c) {
        return $the_sett$elm_pretty_printer$Internals$Text_fn($elm$core$String$fromChar(c), $elm$core$Maybe$Nothing);
    };
    var $the_sett$elm_pretty_printer$Pretty$surround_fn = function (left, right, doc) {
        return $the_sett$elm_pretty_printer$Pretty$append_fn($the_sett$elm_pretty_printer$Pretty$append_fn(left, doc), right);
    }, $the_sett$elm_pretty_printer$Pretty$surround = F3($the_sett$elm_pretty_printer$Pretty$surround_fn);
    var $the_sett$elm_pretty_printer$Pretty$parens = function (doc) {
        return $the_sett$elm_pretty_printer$Pretty$surround_fn($the_sett$elm_pretty_printer$Pretty$char("("), $the_sett$elm_pretty_printer$Pretty$char(")"), doc);
    };
    var $the_sett$elm_pretty_printer$Pretty$string = function (val) {
        return $the_sett$elm_pretty_printer$Internals$Text_fn(val, $elm$core$Maybe$Nothing);
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyTopLevelExpose = function (tlExpose) {
        switch (tlExpose.$) {
            case 0:
                var val = tlExpose.a;
                return $the_sett$elm_pretty_printer$Pretty$parens($the_sett$elm_pretty_printer$Pretty$string(val));
            case 1:
                var val = tlExpose.a;
                return $the_sett$elm_pretty_printer$Pretty$string(val);
            case 2:
                var val = tlExpose.a;
                return $the_sett$elm_pretty_printer$Pretty$string(val);
            default:
                var exposedType = tlExpose.a;
                var _v1 = exposedType.fg;
                if (_v1.$ === 1) {
                    return $the_sett$elm_pretty_printer$Pretty$string(exposedType.c);
                }
                else {
                    return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("(..)"), $the_sett$elm_pretty_printer$Pretty$string(exposedType.c));
                }
        }
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyTopLevelExposes = function (exposes) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$string(", "), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Write$prettyTopLevelExpose, exposes));
    };
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$combineTopLevelExposes = function (exposes) {
        if (!exposes.b) {
            return $stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose("");
        }
        else {
            var hd = exposes.a;
            var tl = exposes.b;
            return $elm$core$List$foldl_fn_unwrapped(function (exp, result) {
                var _v1 = _Utils_Tuple2(exp, result);
                if (_v1.a.$ === 3) {
                    var typeExpose = _v1.a.a;
                    var _v2 = typeExpose.fg;
                    if (!_v2.$) {
                        return exp;
                    }
                    else {
                        return result;
                    }
                }
                else {
                    if (_v1.b.$ === 3) {
                        var typeExpose = _v1.b.a;
                        var _v3 = typeExpose.fg;
                        if (!_v3.$) {
                            return result;
                        }
                        else {
                            return exp;
                        }
                    }
                    else {
                        return result;
                    }
                }
            }, hd, tl);
        }
    };
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName = function (tle) {
        switch (tle.$) {
            case 0:
                var val = tle.a;
                return val;
            case 1:
                var val = tle.a;
                return val;
            case 2:
                var val = tle.a;
                return val;
            default:
                var exposedType = tle.a;
                return exposedType.c;
        }
    };
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$groupByExposingName = function (innerImports) {
        var _v0 = function () {
            if (!innerImports.b) {
                return _Utils_Tuple3("", _List_Nil, _List_fromArray([_List_Nil]));
            }
            else {
                var hd = innerImports.a;
                return $elm$core$List$foldl_fn_unwrapped(function (exp, _v2) {
                    var currName = _v2.a;
                    var currAccum = _v2.b;
                    var accum = _v2.c;
                    var nextName = $mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(exp);
                    return _Utils_eq(nextName, currName) ? _Utils_Tuple3(currName, _List_Cons(exp, currAccum), accum) : _Utils_Tuple3(nextName, _List_fromArray([exp]), _List_Cons(currAccum, accum));
                }, _Utils_Tuple3($mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(hd), _List_Nil, _List_Nil), innerImports);
            }
        }();
        var hdGroup = _v0.b;
        var remGroups = _v0.c;
        return $elm$core$List$reverse(_List_Cons(hdGroup, remGroups));
    };
    var $elm$core$List$sortWith = _List_sortWith;
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeOrder_fn = function (tlel, tler) {
        var _v0 = _Utils_Tuple2(tlel, tler);
        if (!_v0.a.$) {
            if (!_v0.b.$) {
                return _Utils_compare_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(tlel), $mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(tler));
            }
            else {
                return 0;
            }
        }
        else {
            if (!_v0.b.$) {
                return 2;
            }
            else {
                return _Utils_compare_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(tlel), $mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(tler));
            }
        }
    }, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeOrder = F2($mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeOrder_fn);
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupExposings = function (tlExposings) {
        return $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$combineTopLevelExposes, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$groupByExposingName(_List_sortWith_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeOrder, tlExposings)));
    };
    var $the_sett$elm_pretty_printer$Pretty$space = $the_sett$elm_pretty_printer$Pretty$char(" ");
    var $mdgriffith$elm_codegen$Internal$Write$prettyExposing = function (exposing_) {
        var exposings = function () {
            if (!exposing_.$) {
                return $the_sett$elm_pretty_printer$Pretty$parens($the_sett$elm_pretty_printer$Pretty$string(".."));
            }
            else {
                var tll = exposing_.a;
                return $the_sett$elm_pretty_printer$Pretty$parens($mdgriffith$elm_codegen$Internal$Write$prettyTopLevelExposes($mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupExposings($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, tll))));
            }
        }();
        return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, exposings, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$space, $the_sett$elm_pretty_printer$Pretty$string("exposing")));
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyMaybe_fn = function (prettyFn, maybeVal) {
        return $elm$core$Maybe$withDefault_fn($the_sett$elm_pretty_printer$Pretty$empty, $elm$core$Maybe$map_fn(prettyFn, maybeVal));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyMaybe = F2($mdgriffith$elm_codegen$Internal$Write$prettyMaybe_fn);
    var $mdgriffith$elm_codegen$Internal$Write$dot = $the_sett$elm_pretty_printer$Pretty$string(".");
    var $mdgriffith$elm_codegen$Internal$Write$prettyModuleName = function (name) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($mdgriffith$elm_codegen$Internal$Write$dot, $elm$core$List$map_fn($the_sett$elm_pretty_printer$Pretty$string, name));
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyModuleNameAlias = function (name) {
        if (!name.b) {
            return $the_sett$elm_pretty_printer$Pretty$empty;
        }
        else {
            return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$join_fn($mdgriffith$elm_codegen$Internal$Write$dot, $elm$core$List$map_fn($the_sett$elm_pretty_printer$Pretty$string, name)), $the_sett$elm_pretty_printer$Pretty$string("as "));
        }
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyImport = function (import_) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$space, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("import"),
            $mdgriffith$elm_codegen$Internal$Write$prettyModuleName($mdgriffith$elm_codegen$Internal$Compiler$denode(import_.bm)),
            $mdgriffith$elm_codegen$Internal$Write$prettyMaybe_fn($mdgriffith$elm_codegen$Internal$Write$prettyModuleNameAlias, $elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe_a0, import_.cW)),
            $mdgriffith$elm_codegen$Internal$Write$prettyMaybe_fn($mdgriffith$elm_codegen$Internal$Write$prettyExposing, $elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe_a0, import_.cf))
        ]));
    };
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode = $stil4m$elm_syntax$Elm$Syntax$Node$value;
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeMaybe_a0 = $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeMaybe = $elm$core$Maybe$map($mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeMaybe_a0);
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeAll_a0 = $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeAll = $elm$core$List$map($mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeAll_a0);
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodify = function (exp) {
        return $stil4m$elm_syntax$Elm$Syntax$Node$Node_fn($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, exp);
    };
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyAll_a0 = $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodify, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyAll = $elm$core$List$map($mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyAll_a0);
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinExposings_fn = function (left, right) {
        var _v0 = _Utils_Tuple2(left, right);
        if (!_v0.a.$) {
            var range = _v0.a.a;
            return $stil4m$elm_syntax$Elm$Syntax$Exposing$All(range);
        }
        else {
            if (!_v0.b.$) {
                var range = _v0.b.a;
                return $stil4m$elm_syntax$Elm$Syntax$Exposing$All(range);
            }
            else {
                var leftNodes = _v0.a.a;
                var rightNodes = _v0.b.a;
                return $stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyAll_a0, $elm$core$List$append_fn($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeAll_a0, leftNodes), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeAll_a0, rightNodes))));
            }
        }
    }, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinExposings = F2($mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinExposings_fn);
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinMaybeExposings_fn = function (maybeLeft, maybeRight) {
        var _v0 = _Utils_Tuple2(maybeLeft, maybeRight);
        if (_v0.a.$ === 1) {
            if (_v0.b.$ === 1) {
                var _v1 = _v0.a;
                var _v2 = _v0.b;
                return $elm$core$Maybe$Nothing;
            }
            else {
                var _v4 = _v0.a;
                var right = _v0.b.a;
                return $elm$core$Maybe$Just(right);
            }
        }
        else {
            if (_v0.b.$ === 1) {
                var left = _v0.a.a;
                var _v3 = _v0.b;
                return $elm$core$Maybe$Just(left);
            }
            else {
                var left = _v0.a.a;
                var right = _v0.b.a;
                return $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinExposings_fn(left, right));
            }
        }
    }, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinMaybeExposings = F2($mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinMaybeExposings_fn);
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyMaybe_a0 = $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodify, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyMaybe = $elm$core$Maybe$map($mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyMaybe_a0);
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$or_fn = function (ma, mb) {
        if (ma.$ === 1) {
            return mb;
        }
        else {
            return ma;
        }
    }, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$or = F2($mdgriffith$elm_codegen$Internal$ImportsAndExposing$or_fn);
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupExposing = function (exp) {
        if (!exp.$) {
            var range = exp.a;
            return $stil4m$elm_syntax$Elm$Syntax$Exposing$All(range);
        }
        else {
            var nodes = exp.a;
            return $stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyAll_a0, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupExposings($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeAll_a0, nodes))));
        }
    };
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$combineImports = function (innerImports) {
        if (!innerImports.b) {
            return {
                cf: $elm$core$Maybe$Nothing,
                cW: $elm$core$Maybe$Nothing,
                bm: $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodify(_List_Nil)
            };
        }
        else {
            var hd = innerImports.a;
            var tl = innerImports.b;
            var combinedImports = $elm$core$List$foldl_fn_unwrapped(function (imp, result) {
                return {
                    cf: $elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyMaybe_a0, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinMaybeExposings_fn($elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeMaybe_a0, imp.cf), $elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeMaybe_a0, result.cf))),
                    cW: $mdgriffith$elm_codegen$Internal$ImportsAndExposing$or_fn(imp.cW, result.cW),
                    bm: imp.bm
                };
            }, hd, tl);
            return _Utils_update(combinedImports, {
                cf: $elm$core$Maybe$map_fn(A2($elm$core$Basics$composeR, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode, A2($elm$core$Basics$composeR, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupExposing, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodify)), combinedImports.cf)
            });
        }
    };
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$groupByModuleName = function (innerImports) {
        var _v0 = function () {
            if (!innerImports.b) {
                return _Utils_Tuple3(_List_Nil, _List_Nil, _List_fromArray([_List_Nil]));
            }
            else {
                var hd = innerImports.a;
                return $elm$core$List$foldl_fn_unwrapped(function (imp, _v2) {
                    var currName = _v2.a;
                    var currAccum = _v2.b;
                    var accum = _v2.c;
                    var nextName = $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode(imp.bm);
                    return _Utils_eq(nextName, currName) ? _Utils_Tuple3(currName, _List_Cons(imp, currAccum), accum) : _Utils_Tuple3(nextName, _List_fromArray([imp]), _List_Cons(currAccum, accum));
                }, _Utils_Tuple3($mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode(hd.bm), _List_Nil, _List_Nil), innerImports);
            }
        }();
        var hdGroup = _v0.b;
        var remGroups = _v0.c;
        return $elm$core$List$reverse(_List_Cons(hdGroup, remGroups));
    };
    var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupImports = function (imports) {
        var impName = function (imp) {
            return $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode(imp.bm);
        };
        return $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$ImportsAndExposing$combineImports, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$groupByModuleName(_List_sortBy_fn(impName, imports)));
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyImports = function (imports) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Write$prettyImport, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupImports(imports)));
    };
    var $mdgriffith$elm_codegen$Internal$Write$importsPretty = function (imports) {
        if (!imports.b) {
            return $the_sett$elm_pretty_printer$Pretty$line;
        }
        else {
            return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $mdgriffith$elm_codegen$Internal$Write$prettyImports(imports))));
        }
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyComments = function (comments) {
        if (!comments.b) {
            return $the_sett$elm_pretty_printer$Pretty$empty;
        }
        else {
            return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, $elm$core$List$map_fn($the_sett$elm_pretty_printer$Pretty$string, comments))));
        }
    };
    var $elm$core$List$drop_fn = function (n, list) {
        drop: while (true) {
            if (n <= 0) {
                return list;
            }
            else {
                if (!list.b) {
                    return list;
                }
                else {
                    var x = list.a;
                    var xs = list.b;
                    var $temp$n = n - 1, $temp$list = xs;
                    n = $temp$n;
                    list = $temp$list;
                    continue drop;
                }
            }
        }
    }, $elm$core$List$drop = F2($elm$core$List$drop_fn);
    var $the_sett$elm_pretty_printer$Internals$Nest_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $the_sett$elm_pretty_printer$Internals$Nest = F2($the_sett$elm_pretty_printer$Internals$Nest_fn);
    var $the_sett$elm_pretty_printer$Pretty$nest_fn = function (depth, doc) {
        return $the_sett$elm_pretty_printer$Internals$Nest_fn(depth, function (_v0) {
            return doc;
        });
    }, $the_sett$elm_pretty_printer$Pretty$nest = F2($the_sett$elm_pretty_printer$Pretty$nest_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyDocumentation = function (docs) {
        return _String_contains_fn("\n", docs) ? $the_sett$elm_pretty_printer$Pretty$string("{-| " + (docs + "\n-}")) : $the_sett$elm_pretty_printer$Pretty$string("{-| " + (docs + " -}"));
    };
    var $the_sett$elm_pretty_printer$Internals$Union_fn = function (a, b) {
        return { $: 5, a: a, b: b };
    }, $the_sett$elm_pretty_printer$Internals$Union = F2($the_sett$elm_pretty_printer$Internals$Union_fn);
    var $the_sett$elm_pretty_printer$Internals$flatten = function (doc) {
        flatten: while (true) {
            switch (doc.$) {
                case 1:
                    var doc1 = doc.a;
                    var doc2 = doc.b;
                    return $the_sett$elm_pretty_printer$Internals$Concatenate_fn(function (_v1) {
                        return $the_sett$elm_pretty_printer$Internals$flatten(doc1(0));
                    }, function (_v2) {
                        return $the_sett$elm_pretty_printer$Internals$flatten(doc2(0));
                    });
                case 2:
                    var i = doc.a;
                    var doc1 = doc.b;
                    return $the_sett$elm_pretty_printer$Internals$Nest_fn(i, function (_v3) {
                        return $the_sett$elm_pretty_printer$Internals$flatten(doc1(0));
                    });
                case 5:
                    var doc1 = doc.a;
                    var doc2 = doc.b;
                    var $temp$doc = doc1;
                    doc = $temp$doc;
                    continue flatten;
                case 4:
                    var hsep = doc.a;
                    return $the_sett$elm_pretty_printer$Internals$Text_fn(hsep, $elm$core$Maybe$Nothing);
                case 6:
                    var fn = doc.a;
                    var $temp$doc = fn(0);
                    doc = $temp$doc;
                    continue flatten;
                case 7:
                    var fn = doc.a;
                    var $temp$doc = fn(0);
                    doc = $temp$doc;
                    continue flatten;
                default:
                    var x = doc;
                    return x;
            }
        }
    };
    var $the_sett$elm_pretty_printer$Pretty$group = function (doc) {
        return $the_sett$elm_pretty_printer$Internals$Union_fn($the_sett$elm_pretty_printer$Internals$flatten(doc), doc);
    };
    var $mdgriffith$elm_codegen$Internal$Write$isNakedCompound = function (typeAnn) {
        switch (typeAnn.$) {
            case 1:
                if (!typeAnn.b.b) {
                    return false;
                }
                else {
                    var args = typeAnn.b;
                    return true;
                }
            case 6:
                return true;
            default:
                return false;
        }
    };
    var $elm$core$Tuple$mapBoth_fn = function (funcA, funcB, _v0) {
        var x = _v0.a;
        var y = _v0.b;
        return _Utils_Tuple2(funcA(x), funcB(y));
    }, $elm$core$Tuple$mapBoth = F3($elm$core$Tuple$mapBoth_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyModuleNameDot_fn = function (aliases, name) {
        if (!name.b) {
            return $the_sett$elm_pretty_printer$Pretty$empty;
        }
        else {
            var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$findAlias_fn(name, aliases);
            if (_v1.$ === 1) {
                return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $mdgriffith$elm_codegen$Internal$Write$dot, $the_sett$elm_pretty_printer$Pretty$join_fn($mdgriffith$elm_codegen$Internal$Write$dot, $elm$core$List$map_fn($the_sett$elm_pretty_printer$Pretty$string, name)));
            }
            else {
                var alias = _v1.a;
                return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $mdgriffith$elm_codegen$Internal$Write$dot, $the_sett$elm_pretty_printer$Pretty$string(alias));
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyModuleNameDot = F2($mdgriffith$elm_codegen$Internal$Write$prettyModuleNameDot_fn);
    var $the_sett$elm_pretty_printer$Pretty$separators = function (sep) {
        return $the_sett$elm_pretty_printer$Pretty$join($the_sett$elm_pretty_printer$Internals$Line_fn(sep, sep));
    };
    var $the_sett$elm_pretty_printer$Pretty$words_a0 = $the_sett$elm_pretty_printer$Pretty$space, $the_sett$elm_pretty_printer$Pretty$words = $the_sett$elm_pretty_printer$Pretty$join($the_sett$elm_pretty_printer$Pretty$words_a0);
    var $mdgriffith$elm_codegen$Internal$Write$prettyFieldTypeAnn_fn = function (aliases, _v8) {
        var name = _v8.a;
        var ann = _v8.b;
        return $the_sett$elm_pretty_printer$Pretty$group($the_sett$elm_pretty_printer$Pretty$nest_fn(4, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                $the_sett$elm_pretty_printer$Pretty$string(name),
                $the_sett$elm_pretty_printer$Pretty$string(":")
            ])),
            $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation_fn(aliases, ann)
        ]))));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyFieldTypeAnn = F2($mdgriffith$elm_codegen$Internal$Write$prettyFieldTypeAnn_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyFunctionTypeAnnotation_fn = function (aliases, left, right) {
        var expandLeft = function (ann) {
            if (ann.$ === 6) {
                return $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotationParens_fn(aliases, ann);
            }
            else {
                return $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation_fn(aliases, ann);
            }
        };
        var innerFnTypeAnn = F2(function (innerLeft, innerRight) {
            var rightSide = expandRight($mdgriffith$elm_codegen$Internal$Compiler$denode(innerRight));
            if (rightSide.b) {
                var hd = rightSide.a;
                var tl = rightSide.b;
                return _List_Cons(expandLeft($mdgriffith$elm_codegen$Internal$Compiler$denode(innerLeft)), _List_Cons($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                    $the_sett$elm_pretty_printer$Pretty$string("->"),
                    hd
                ])), tl));
            }
            else {
                return _List_Nil;
            }
        });
        var expandRight = function (ann) {
            if (ann.$ === 6) {
                var innerLeft = ann.a;
                var innerRight = ann.b;
                return A2(innerFnTypeAnn, innerLeft, innerRight);
            }
            else {
                return _List_fromArray([
                    $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation_fn(aliases, ann)
                ]);
            }
        };
        return $the_sett$elm_pretty_printer$Pretty$group($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, A2(innerFnTypeAnn, left, right)));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyFunctionTypeAnnotation = F3($mdgriffith$elm_codegen$Internal$Write$prettyFunctionTypeAnnotation_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyGenericRecord_fn = function (aliases, paramName, fields) {
        var open = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("{"),
            $the_sett$elm_pretty_printer$Pretty$string(paramName)
        ])));
        var close = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("}"), $the_sett$elm_pretty_printer$Pretty$line);
        var addBarToFirst = function (exprs) {
            if (!exprs.b) {
                return _List_Nil;
            }
            else {
                var hd = exprs.a;
                var tl = exprs.b;
                return _List_Cons($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, hd, $the_sett$elm_pretty_printer$Pretty$string("| ")), tl);
            }
        };
        if (!fields.b) {
            return $the_sett$elm_pretty_printer$Pretty$string("{}");
        }
        else {
            return $the_sett$elm_pretty_printer$Pretty$group($the_sett$elm_pretty_printer$Pretty$surround_fn($the_sett$elm_pretty_printer$Pretty$empty, close, $the_sett$elm_pretty_printer$Pretty$nest_fn(4, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, A2($the_sett$elm_pretty_printer$Pretty$separators, ", ", addBarToFirst($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Write$prettyFieldTypeAnn(aliases), $elm$core$List$map_fn(A2($elm$core$Tuple$mapBoth, $mdgriffith$elm_codegen$Internal$Compiler$denode, $mdgriffith$elm_codegen$Internal$Compiler$denode), fields)))), open))));
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyGenericRecord = F3($mdgriffith$elm_codegen$Internal$Write$prettyGenericRecord_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyRecord_fn = function (aliases, fields) {
        var open = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$space, $the_sett$elm_pretty_printer$Pretty$string("{"));
        var close = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("}"), $the_sett$elm_pretty_printer$Pretty$line);
        if (!fields.b) {
            return $the_sett$elm_pretty_printer$Pretty$string("{}");
        }
        else {
            return $the_sett$elm_pretty_printer$Pretty$group($the_sett$elm_pretty_printer$Pretty$surround_fn(open, close, A2($the_sett$elm_pretty_printer$Pretty$separators, ", ", $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Write$prettyFieldTypeAnn(aliases), $elm$core$List$map_fn(A2($elm$core$Tuple$mapBoth, $mdgriffith$elm_codegen$Internal$Compiler$denode, $mdgriffith$elm_codegen$Internal$Compiler$denode), fields)))));
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyRecord = F2($mdgriffith$elm_codegen$Internal$Write$prettyRecord_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyTupled_fn = function (aliases, anns) {
        return $the_sett$elm_pretty_printer$Pretty$parens($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$space, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$string(", "), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation(aliases), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, anns))), $the_sett$elm_pretty_printer$Pretty$space)));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyTupled = F2($mdgriffith$elm_codegen$Internal$Write$prettyTupled_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation_fn = function (aliases, typeAnn) {
        switch (typeAnn.$) {
            case 0:
                var val = typeAnn.a;
                return $the_sett$elm_pretty_printer$Pretty$string(val);
            case 1:
                var fqName = typeAnn.a;
                var anns = typeAnn.b;
                return $mdgriffith$elm_codegen$Internal$Write$prettyTyped_fn(aliases, fqName, anns);
            case 2:
                return $the_sett$elm_pretty_printer$Pretty$string("()");
            case 3:
                var anns = typeAnn.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyTupled_fn(aliases, anns);
            case 4:
                var recordDef = typeAnn.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyRecord_fn(aliases, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, recordDef));
            case 5:
                var paramName = typeAnn.a;
                var recordDef = typeAnn.b;
                return $mdgriffith$elm_codegen$Internal$Write$prettyGenericRecord_fn(aliases, $mdgriffith$elm_codegen$Internal$Compiler$denode(paramName), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, $mdgriffith$elm_codegen$Internal$Compiler$denode(recordDef)));
            default:
                var fromAnn = typeAnn.a;
                var toAnn = typeAnn.b;
                return $mdgriffith$elm_codegen$Internal$Write$prettyFunctionTypeAnnotation_fn(aliases, fromAnn, toAnn);
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation = F2($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotationParens_fn = function (aliases, typeAnn) {
        return $mdgriffith$elm_codegen$Internal$Write$isNakedCompound(typeAnn) ? $the_sett$elm_pretty_printer$Pretty$parens($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation_fn(aliases, typeAnn)) : $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation_fn(aliases, typeAnn);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotationParens = F2($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotationParens_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyTyped_fn = function (aliases, fqName, anns) {
        var argsDoc = $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotationParens(aliases), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, anns)));
        var _v0 = $mdgriffith$elm_codegen$Internal$Compiler$denode(fqName);
        var moduleName = _v0.a;
        var typeName = _v0.b;
        var typeDoc = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string(typeName), $mdgriffith$elm_codegen$Internal$Write$prettyModuleNameDot_fn(aliases, moduleName));
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([typeDoc, argsDoc]));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyTyped = F3($mdgriffith$elm_codegen$Internal$Write$prettyTyped_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyValueConstructor_fn = function (aliases, cons) {
        return $the_sett$elm_pretty_printer$Pretty$nest_fn(4, $the_sett$elm_pretty_printer$Pretty$group($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(cons.c)),
            $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotationParens(aliases), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, cons.a6)))
        ]))));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyValueConstructor = F2($mdgriffith$elm_codegen$Internal$Write$prettyValueConstructor_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyValueConstructors_fn = function (aliases, constructors) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("| "), $the_sett$elm_pretty_printer$Pretty$line), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Write$prettyValueConstructor(aliases), constructors));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyValueConstructors = F2($mdgriffith$elm_codegen$Internal$Write$prettyValueConstructors_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyCustomType_fn = function (aliases, type_) {
        var customTypePretty = $the_sett$elm_pretty_printer$Pretty$nest_fn(4, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $mdgriffith$elm_codegen$Internal$Write$prettyValueConstructors_fn(aliases, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, type_.eq)), $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("= "), $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("type"),
            $the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(type_.c)),
            $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, $elm$core$List$map_fn($the_sett$elm_pretty_printer$Pretty$string, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, type_.cp)))
        ]))))));
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $mdgriffith$elm_codegen$Internal$Write$prettyMaybe_fn($mdgriffith$elm_codegen$Internal$Write$prettyDocumentation, $elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe_a0, type_.bb)),
            customTypePretty
        ]));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyCustomType = F2($mdgriffith$elm_codegen$Internal$Write$prettyCustomType_fn);
    var $mdgriffith$elm_codegen$Internal$Write$adjustExpressionParentheses_fn = function (context, expression) {
        var shouldRemove = function (expr) {
            var _v3 = _Utils_Tuple3(context.ah, context.ag, expr);
            _v3$1: while (true) {
                if (_v3.a) {
                    return true;
                }
                else {
                    switch (_v3.c.$) {
                        case 1:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return (context.q < 11) ? true : false;
                            }
                        case 3:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                var _v4 = _v3.c;
                                return true;
                            }
                        case 7:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return true;
                            }
                        case 8:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return true;
                            }
                        case 9:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return true;
                            }
                        case 10:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return true;
                            }
                        case 11:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return true;
                            }
                        case 12:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return true;
                            }
                        case 13:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return true;
                            }
                        case 18:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return true;
                            }
                        case 19:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return true;
                            }
                        case 20:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                var _v5 = _v3.c;
                                return true;
                            }
                        case 21:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return true;
                            }
                        case 22:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                var _v6 = _v3.c;
                                return true;
                            }
                        default:
                            if (_v3.b) {
                                break _v3$1;
                            }
                            else {
                                return false;
                            }
                    }
                }
            }
            return true;
        };
        var removeParens = function (expr) {
            if (expr.$ === 14) {
                var innerExpr = expr.a;
                return shouldRemove($mdgriffith$elm_codegen$Internal$Compiler$denode(innerExpr)) ? removeParens($mdgriffith$elm_codegen$Internal$Compiler$denode(innerExpr)) : expr;
            }
            else {
                return expr;
            }
        };
        var addParens = function (expr) {
            var _v1 = _Utils_Tuple3(context.ah, context.ag, expr);
            _v1$4: while (true) {
                if ((!_v1.a) && (!_v1.b)) {
                    switch (_v1.c.$) {
                        case 15:
                            return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression($mdgriffith$elm_codegen$Internal$Compiler$nodify(expr));
                        case 16:
                            return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression($mdgriffith$elm_codegen$Internal$Compiler$nodify(expr));
                        case 17:
                            return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression($mdgriffith$elm_codegen$Internal$Compiler$nodify(expr));
                        case 4:
                            var _v2 = _v1.c;
                            return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression($mdgriffith$elm_codegen$Internal$Compiler$nodify(expr));
                        default:
                            break _v1$4;
                    }
                }
                else {
                    break _v1$4;
                }
            }
            return expr;
        };
        return addParens(removeParens(expression));
    }, $mdgriffith$elm_codegen$Internal$Write$adjustExpressionParentheses = F2($mdgriffith$elm_codegen$Internal$Write$adjustExpressionParentheses_fn);
    var $the_sett$elm_pretty_printer$Internals$Column = function (a) {
        return { $: 7, a: a };
    };
    var $the_sett$elm_pretty_printer$Pretty$column = $the_sett$elm_pretty_printer$Internals$Column;
    var $the_sett$elm_pretty_printer$Internals$Nesting = function (a) {
        return { $: 6, a: a };
    };
    var $the_sett$elm_pretty_printer$Pretty$nesting = $the_sett$elm_pretty_printer$Internals$Nesting;
    var $the_sett$elm_pretty_printer$Pretty$align = function (doc) {
        return $the_sett$elm_pretty_printer$Pretty$column(function (currentColumn) {
            return $the_sett$elm_pretty_printer$Pretty$nesting(function (indentLvl) {
                return $the_sett$elm_pretty_printer$Pretty$nest_fn(currentColumn - indentLvl, doc);
            });
        });
    };
    var $elm$core$Basics$modBy = _Basics_modBy;
    var $mdgriffith$elm_codegen$Internal$Write$decrementIndent_fn = function (currentIndent, spaces) {
        var modded = _Basics_modBy_fn(4, currentIndent - spaces);
        return (!modded) ? 4 : modded;
    }, $mdgriffith$elm_codegen$Internal$Write$decrementIndent = F2($mdgriffith$elm_codegen$Internal$Write$decrementIndent_fn);
    var $mdgriffith$elm_codegen$Internal$Write$doubleLines_a0 = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$line), $mdgriffith$elm_codegen$Internal$Write$doubleLines = $the_sett$elm_pretty_printer$Pretty$join($mdgriffith$elm_codegen$Internal$Write$doubleLines_a0);
    var $mdgriffith$elm_codegen$Internal$Write$escapeChar = function (val) {
        switch (val) {
            case "\\":
                return "\\\\";
            case "'":
                return "\\'";
            case "\t":
                return "\\t";
            case "\n":
                return "\\n";
            default:
                var c = val;
                return $elm$core$String$fromChar(c);
        }
    };
    var $elm$core$String$fromFloat = _String_fromNumber;
    var $the_sett$elm_pretty_printer$Internals$copy_fn = function (i, s) {
        return (!i) ? "" : _Utils_ap(s, $the_sett$elm_pretty_printer$Internals$copy_fn(i - 1, s));
    }, $the_sett$elm_pretty_printer$Internals$copy = F2($the_sett$elm_pretty_printer$Internals$copy_fn);
    var $the_sett$elm_pretty_printer$Pretty$hang_fn = function (spaces, doc) {
        return $the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$nest_fn(spaces, doc));
    }, $the_sett$elm_pretty_printer$Pretty$hang = F2($the_sett$elm_pretty_printer$Pretty$hang_fn);
    var $the_sett$elm_pretty_printer$Pretty$indent_fn = function (spaces, doc) {
        return $the_sett$elm_pretty_printer$Pretty$hang_fn(spaces, $the_sett$elm_pretty_printer$Pretty$append_fn($the_sett$elm_pretty_printer$Pretty$string($the_sett$elm_pretty_printer$Internals$copy_fn(spaces, " ")), doc));
    }, $the_sett$elm_pretty_printer$Pretty$indent = F2($the_sett$elm_pretty_printer$Pretty$indent_fn);
    var $mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn = function (flag, doc) {
        return flag ? doc : $the_sett$elm_pretty_printer$Pretty$group(doc);
    }, $mdgriffith$elm_codegen$Internal$Write$optionalGroup = F2($mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn);
    var $mdgriffith$elm_codegen$Internal$Write$precedence = function (symbol) {
        switch (symbol) {
            case ">>":
                return 9;
            case "<<":
                return 9;
            case "^":
                return 8;
            case "*":
                return 7;
            case "/":
                return 7;
            case "//":
                return 7;
            case "%":
                return 7;
            case "rem":
                return 7;
            case "+":
                return 6;
            case "-":
                return 6;
            case "++":
                return 5;
            case "::":
                return 5;
            case "==":
                return 4;
            case "/=":
                return 4;
            case "<":
                return 4;
            case ">":
                return 4;
            case "<=":
                return 4;
            case ">=":
                return 4;
            case "&&":
                return 3;
            case "||":
                return 2;
            case "|>":
                return 0;
            case "<|":
                return 0;
            default:
                return 0;
        }
    };
    var $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern = function (a) {
        return { $: 14, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Write$adjustPatternParentheses_fn = function (isTop, pattern) {
        var shouldRemove = function (pat) {
            var _v5 = _Utils_Tuple2(isTop, pat);
            _v5$2: while (true) {
                switch (_v5.b.$) {
                    case 12:
                        if (!_v5.a) {
                            var _v6 = _v5.b;
                            return false;
                        }
                        else {
                            break _v5$2;
                        }
                    case 13:
                        var _v7 = _v5.b;
                        return false;
                    default:
                        break _v5$2;
                }
            }
            return isTop;
        };
        var removeParens = function (pat) {
            if (pat.$ === 14) {
                var innerPat = pat.a;
                return shouldRemove($mdgriffith$elm_codegen$Internal$Compiler$denode(innerPat)) ? removeParens($mdgriffith$elm_codegen$Internal$Compiler$denode(innerPat)) : pat;
            }
            else {
                return pat;
            }
        };
        var addParens = function (pat) {
            var _v1 = _Utils_Tuple2(isTop, pat);
            _v1$2: while (true) {
                if (!_v1.a) {
                    switch (_v1.b.$) {
                        case 12:
                            if (_v1.b.b.b) {
                                var _v2 = _v1.b;
                                var _v3 = _v2.b;
                                return $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern($mdgriffith$elm_codegen$Internal$Compiler$nodify(pat));
                            }
                            else {
                                break _v1$2;
                            }
                        case 13:
                            var _v4 = _v1.b;
                            return $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern($mdgriffith$elm_codegen$Internal$Compiler$nodify(pat));
                        default:
                            break _v1$2;
                    }
                }
                else {
                    break _v1$2;
                }
            }
            return pat;
        };
        return addParens(removeParens(pattern));
    }, $mdgriffith$elm_codegen$Internal$Write$adjustPatternParentheses = F2($mdgriffith$elm_codegen$Internal$Write$adjustPatternParentheses_fn);
    var $the_sett$elm_pretty_printer$Pretty$braces = function (doc) {
        return $the_sett$elm_pretty_printer$Pretty$surround_fn($the_sett$elm_pretty_printer$Pretty$char("{"), $the_sett$elm_pretty_printer$Pretty$char("}"), doc);
    };
    var $mdgriffith$elm_codegen$Internal$Write$quotes = function (doc) {
        return $the_sett$elm_pretty_printer$Pretty$surround_fn($the_sett$elm_pretty_printer$Pretty$char("\""), $the_sett$elm_pretty_printer$Pretty$char("\""), doc);
    };
    var $mdgriffith$elm_codegen$Internal$Write$singleQuotes = function (doc) {
        return $the_sett$elm_pretty_printer$Pretty$surround_fn($the_sett$elm_pretty_printer$Pretty$char("'"), $the_sett$elm_pretty_printer$Pretty$char("'"), doc);
    };
    var $elm$core$String$fromList = _String_fromList;
    var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
        unsafeToDigit: while (true) {
            switch (num) {
                case 0:
                    return "0";
                case 1:
                    return "1";
                case 2:
                    return "2";
                case 3:
                    return "3";
                case 4:
                    return "4";
                case 5:
                    return "5";
                case 6:
                    return "6";
                case 7:
                    return "7";
                case 8:
                    return "8";
                case 9:
                    return "9";
                case 10:
                    return "a";
                case 11:
                    return "b";
                case 12:
                    return "c";
                case 13:
                    return "d";
                case 14:
                    return "e";
                case 15:
                    return "f";
                default:
                    var $temp$num = num;
                    num = $temp$num;
                    continue unsafeToDigit;
            }
        }
    };
    var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits_fn = function (digits, num) {
        unsafePositiveToDigits: while (true) {
            if (num < 16) {
                return _List_Cons($rtfeldman$elm_hex$Hex$unsafeToDigit(num), digits);
            }
            else {
                var $temp$digits = _List_Cons($rtfeldman$elm_hex$Hex$unsafeToDigit(_Basics_modBy_fn(16, num)), digits), $temp$num = (num / 16) | 0;
                digits = $temp$digits;
                num = $temp$num;
                continue unsafePositiveToDigits;
            }
        }
    }, $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits_fn);
    var $rtfeldman$elm_hex$Hex$toString = function (num) {
        return $elm$core$String$fromList((num < 0) ? _List_Cons("-", $rtfeldman$elm_hex$Hex$unsafePositiveToDigits_fn(_List_Nil, -num)) : $rtfeldman$elm_hex$Hex$unsafePositiveToDigits_fn(_List_Nil, num));
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyPatternInner_fn = function (aliases, isTop, pattern) {
        var _v0 = $mdgriffith$elm_codegen$Internal$Write$adjustPatternParentheses_fn(isTop, pattern);
        switch (_v0.$) {
            case 0:
                return $the_sett$elm_pretty_printer$Pretty$string("_");
            case 1:
                return $the_sett$elm_pretty_printer$Pretty$string("()");
            case 2:
                var val = _v0.a;
                return $mdgriffith$elm_codegen$Internal$Write$singleQuotes($the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Write$escapeChar(val)));
            case 3:
                var val = _v0.a;
                return $mdgriffith$elm_codegen$Internal$Write$quotes($the_sett$elm_pretty_printer$Pretty$string(val));
            case 4:
                var val = _v0.a;
                return $the_sett$elm_pretty_printer$Pretty$string($elm$core$String$fromInt(val));
            case 5:
                var val = _v0.a;
                return $the_sett$elm_pretty_printer$Pretty$string($rtfeldman$elm_hex$Hex$toString(val));
            case 6:
                var val = _v0.a;
                return $the_sett$elm_pretty_printer$Pretty$string($elm$core$String$fromFloat(val));
            case 7:
                var vals = _v0.a;
                return $the_sett$elm_pretty_printer$Pretty$parens($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$space, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$string(", "), $elm$core$List$map_fn(A2($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, true), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, vals))), $the_sett$elm_pretty_printer$Pretty$space)));
            case 8:
                var fields = _v0.a;
                return $the_sett$elm_pretty_printer$Pretty$braces($the_sett$elm_pretty_printer$Pretty$surround_fn($the_sett$elm_pretty_printer$Pretty$space, $the_sett$elm_pretty_printer$Pretty$space, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$string(", "), $elm$core$List$map_fn($the_sett$elm_pretty_printer$Pretty$string, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, fields)))));
            case 9:
                var hdPat = _v0.a;
                var tlPat = _v0.b;
                return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                    $mdgriffith$elm_codegen$Internal$Write$prettyPatternInner_fn(aliases, false, $mdgriffith$elm_codegen$Internal$Compiler$denode(hdPat)),
                    $the_sett$elm_pretty_printer$Pretty$string("::"),
                    $mdgriffith$elm_codegen$Internal$Write$prettyPatternInner_fn(aliases, false, $mdgriffith$elm_codegen$Internal$Compiler$denode(tlPat))
                ]));
            case 10:
                var listPats = _v0.a;
                if (!listPats.b) {
                    return $the_sett$elm_pretty_printer$Pretty$string("[]");
                }
                else {
                    var open = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$space, $the_sett$elm_pretty_printer$Pretty$string("["));
                    var close = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("]"), $the_sett$elm_pretty_printer$Pretty$space);
                    return $the_sett$elm_pretty_printer$Pretty$surround_fn(open, close, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$string(", "), $elm$core$List$map_fn(A2($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, false), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, listPats))));
                }
            case 11:
                var _var = _v0.a;
                return $the_sett$elm_pretty_printer$Pretty$string(_var);
            case 12:
                var qnRef = _v0.a;
                var listPats = _v0.b;
                return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_Cons($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string(qnRef.c), $mdgriffith$elm_codegen$Internal$Write$prettyModuleNameDot_fn(aliases, qnRef.bm)), $elm$core$List$map_fn(A2($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, false), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, listPats))));
            case 13:
                var pat = _v0.a;
                var name = _v0.b;
                return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                    $mdgriffith$elm_codegen$Internal$Write$prettyPatternInner_fn(aliases, false, $mdgriffith$elm_codegen$Internal$Compiler$denode(pat)),
                    $the_sett$elm_pretty_printer$Pretty$string("as"),
                    $the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(name))
                ]));
            default:
                var pat = _v0.a;
                return $the_sett$elm_pretty_printer$Pretty$parens($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner_fn(aliases, true, $mdgriffith$elm_codegen$Internal$Compiler$denode(pat)));
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyPatternInner = F3($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyArgs_fn = function (aliases, args) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, $elm$core$List$map_fn(A2($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, false), args));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyArgs = F2($mdgriffith$elm_codegen$Internal$Write$prettyArgs_fn);
    var $elm$core$String$replace_fn = function (before, after, string) {
        return $elm$core$String$join_fn(after, $elm$core$String$split_fn(before, string));
    }, $elm$core$String$replace = F3($elm$core$String$replace_fn);
    var $mdgriffith$elm_codegen$Internal$Write$escape = function (val) {
        return $elm$core$String$replace_fn("\t", "\\t", $elm$core$String$replace_fn("\n", "\\n", $elm$core$String$replace_fn("\"", "\\\"", $elm$core$String$replace_fn("\\", "\\\\", val))));
    };
    var $mdgriffith$elm_codegen$Internal$Write$tripleQuotes = function (doc) {
        return $the_sett$elm_pretty_printer$Pretty$surround_fn($the_sett$elm_pretty_printer$Pretty$string("\"\"\""), $the_sett$elm_pretty_printer$Pretty$string("\"\"\""), doc);
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyLiteral = function (val) {
        return _String_contains_fn("\n", val) ? $mdgriffith$elm_codegen$Internal$Write$tripleQuotes($the_sett$elm_pretty_printer$Pretty$string(val)) : $mdgriffith$elm_codegen$Internal$Write$quotes($the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Write$escape(val)));
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyPattern_fn = function (aliases, pattern) {
        return $mdgriffith$elm_codegen$Internal$Write$prettyPatternInner_fn(aliases, true, pattern);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyPattern = F2($mdgriffith$elm_codegen$Internal$Write$prettyPattern_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettySignature_fn = function (aliases, sig) {
        return $the_sett$elm_pretty_printer$Pretty$group($the_sett$elm_pretty_printer$Pretty$nest_fn(4, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                $the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(sig.c)),
                $the_sett$elm_pretty_printer$Pretty$string(":")
            ])),
            $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation_fn(aliases, $mdgriffith$elm_codegen$Internal$Compiler$denode(sig.a2))
        ]))));
    }, $mdgriffith$elm_codegen$Internal$Write$prettySignature = F2($mdgriffith$elm_codegen$Internal$Write$prettySignature_fn);
    var $the_sett$elm_pretty_printer$Pretty$tightline = $the_sett$elm_pretty_printer$Internals$Line_fn("", "");
    var $elm$core$String$padLeft_fn = function (n, _char, string) {
        return _Utils_ap($elm$core$String$repeat_fn(n - $elm$core$String$length(string), $elm$core$String$fromChar(_char)), string);
    }, $elm$core$String$padLeft = F3($elm$core$String$padLeft_fn);
    var $mdgriffith$elm_codegen$Internal$Write$toHexString = function (val) {
        var padWithZeros = function (str) {
            var length = $elm$core$String$length(str);
            return (length < 2) ? $elm$core$String$padLeft_fn(2, "0", str) : (((length > 2) && (length < 4)) ? $elm$core$String$padLeft_fn(4, "0", str) : (((length > 4) && (length < 8)) ? $elm$core$String$padLeft_fn(8, "0", str) : str));
        };
        return "0x" + padWithZeros($elm$core$String$toUpper($rtfeldman$elm_hex$Hex$toString(val)));
    };
    var $mdgriffith$elm_codegen$Internal$Write$topContext = { ag: false, ah: true, q: 11 };
    var $elm$core$List$unzip = function (pairs) {
        var aHead = _List_Cons(undefined, _List_Nil);
        var bHead = _List_Cons(undefined, _List_Nil);
        var aEnd = aHead;
        var bEnd = bHead;
        for (; pairs.b; pairs = pairs.b) {
            var tuple = pairs.a;
            var aNext = _List_Cons(tuple.a, _List_Nil);
            aEnd.b = aNext;
            aEnd = aNext;
            var bNext = _List_Cons(tuple.b, _List_Nil);
            bEnd.b = bNext;
            bEnd = bNext;
        }
        return _Utils_Tuple2(aHead.b, bHead.
            b);
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyApplication_fn = function (aliases, indent, exprs) {
        var _v30 = $elm$core$Tuple$mapSecond_fn($elm$core$List$any($elm$core$Basics$identity), $elm$core$List$unzip($elm$core$List$map_fn(A3($mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner, aliases, { ag: false, ah: false, q: 11 }, 4), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, exprs))));
        var prettyExpressions = _v30.a;
        var alwaysBreak = _v30.b;
        return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$nest_fn(indent, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, prettyExpressions)))), alwaysBreak);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyApplication = F3($mdgriffith$elm_codegen$Internal$Write$prettyApplication_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyCaseBlock_fn = function (aliases, indent, caseBlock) {
        var prettyCase = function (_v29) {
            var pattern = _v29.a;
            var expr = _v29.b;
            return $the_sett$elm_pretty_printer$Pretty$indent_fn(indent, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$indent_fn(4, $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(expr)).a), $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string(" ->"), $mdgriffith$elm_codegen$Internal$Write$prettyPattern_fn(aliases, $mdgriffith$elm_codegen$Internal$Compiler$denode(pattern))))));
        };
        var patternsPart = $the_sett$elm_pretty_printer$Pretty$join_fn($mdgriffith$elm_codegen$Internal$Write$doubleLines_a0, $elm$core$List$map_fn(prettyCase, caseBlock.z));
        var casePart = function () {
            var _v28 = $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(caseBlock.f));
            var caseExpression = _v28.a;
            var alwaysBreak = _v28.b;
            return $mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
                $the_sett$elm_pretty_printer$Pretty$nest_fn(indent, $mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
                    $the_sett$elm_pretty_printer$Pretty$string("case"),
                    caseExpression
                ])))),
                $the_sett$elm_pretty_printer$Pretty$string("of")
            ])));
        }();
        return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([casePart, patternsPart]))), true);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyCaseBlock = F3($mdgriffith$elm_codegen$Internal$Write$prettyCaseBlock_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyExpression_fn = function (aliases, expression) {
        return $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, expression).a;
    }, $mdgriffith$elm_codegen$Internal$Write$prettyExpression = F2($mdgriffith$elm_codegen$Internal$Write$prettyExpression_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn = function (aliases, context, indent, expression) {
        var _v26 = $mdgriffith$elm_codegen$Internal$Write$adjustExpressionParentheses_fn(context, expression);
        switch (_v26.$) {
            case 0:
                return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string("()"), false);
            case 1:
                var exprs = _v26.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyApplication_fn(aliases, indent, exprs);
            case 2:
                var symbol = _v26.a;
                var dir = _v26.b;
                var exprl = _v26.c;
                var exprr = _v26.d;
                return $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplication_fn(aliases, indent, symbol, dir, exprl, exprr);
            case 3:
                var modl = _v26.a;
                var val = _v26.b;
                return _Utils_Tuple2($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string(val), $mdgriffith$elm_codegen$Internal$Write$prettyModuleNameDot_fn(aliases, modl)), false);
            case 4:
                var exprBool = _v26.a;
                var exprTrue = _v26.b;
                var exprFalse = _v26.c;
                return $mdgriffith$elm_codegen$Internal$Write$prettyIfBlock_fn(aliases, indent, exprBool, exprTrue, exprFalse);
            case 5:
                var symbol = _v26.a;
                return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$parens($the_sett$elm_pretty_printer$Pretty$string(symbol)), false);
            case 6:
                var symbol = _v26.a;
                return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string(symbol), false);
            case 7:
                var val = _v26.a;
                return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string($elm$core$String$fromInt(val)), false);
            case 8:
                var val = _v26.a;
                return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Write$toHexString(val)), false);
            case 9:
                var val = _v26.a;
                return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string($elm$core$String$fromFloat(val)), false);
            case 10:
                var expr = _v26.a;
                var _v27 = $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(expr));
                var prettyExpr = _v27.a;
                var alwaysBreak = _v27.b;
                return _Utils_Tuple2($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, prettyExpr, $the_sett$elm_pretty_printer$Pretty$string("-")), alwaysBreak);
            case 11:
                var val = _v26.a;
                return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Write$prettyLiteral(val), false);
            case 12:
                var val = _v26.a;
                return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Write$singleQuotes($the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Write$escapeChar(val))), false);
            case 13:
                var exprs = _v26.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyTupledExpression_fn(aliases, indent, exprs);
            case 14:
                var expr = _v26.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyParenthesizedExpression_fn(aliases, indent, expr);
            case 15:
                var letBlock = _v26.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyLetBlock_fn(aliases, indent, letBlock);
            case 16:
                var caseBlock = _v26.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyCaseBlock_fn(aliases, indent, caseBlock);
            case 17:
                var lambda = _v26.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyLambdaExpression_fn(aliases, indent, lambda);
            case 18:
                var setters = _v26.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyRecordExpr_fn(aliases, setters);
            case 19:
                var exprs = _v26.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyList_fn(aliases, indent, exprs);
            case 20:
                var expr = _v26.a;
                var field = _v26.b;
                return $mdgriffith$elm_codegen$Internal$Write$prettyRecordAccess_fn(aliases, expr, field);
            case 21:
                var field = _v26.a;
                return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string(field), false);
            case 22:
                var _var = _v26.a;
                var setters = _v26.b;
                return $mdgriffith$elm_codegen$Internal$Write$prettyRecordUpdateExpression_fn(aliases, indent, _var, setters);
            default:
                var val = _v26.a;
                return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string("glsl"), true);
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner = F4($mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyFun_fn = function (aliases, fn) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $mdgriffith$elm_codegen$Internal$Write$prettyMaybe_fn($mdgriffith$elm_codegen$Internal$Write$prettyDocumentation, $elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe_a0, fn.bb)),
            $mdgriffith$elm_codegen$Internal$Write$prettyMaybe_fn($mdgriffith$elm_codegen$Internal$Write$prettySignature(aliases), $elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe_a0, fn.fw)),
            $mdgriffith$elm_codegen$Internal$Write$prettyFunctionImplementation_fn(aliases, $mdgriffith$elm_codegen$Internal$Compiler$denode(fn.es))
        ]));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyFun = F2($mdgriffith$elm_codegen$Internal$Write$prettyFun_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyFunctionImplementation_fn = function (aliases, impl) {
        return $the_sett$elm_pretty_printer$Pretty$nest_fn(4, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $mdgriffith$elm_codegen$Internal$Write$prettyExpression_fn(aliases, $mdgriffith$elm_codegen$Internal$Compiler$denode(impl.f)), $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(impl.c)),
            $mdgriffith$elm_codegen$Internal$Write$prettyArgs_fn(aliases, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, impl.a6)),
            $the_sett$elm_pretty_printer$Pretty$string("=")
        ])))));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyFunctionImplementation = F2($mdgriffith$elm_codegen$Internal$Write$prettyFunctionImplementation_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyIfBlock_fn = function (aliases, indent, exprBool, exprTrue, exprFalse) {
        var innerIfBlock = F3(function (innerExprBool, innerExprTrue, innerExprFalse) {
            var truePart = $the_sett$elm_pretty_printer$Pretty$indent_fn(indent, $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(innerExprTrue)).a);
            var ifPart = function () {
                var _v25 = $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(innerExprBool));
                var prettyBoolExpr = _v25.a;
                var alwaysBreak = _v25.b;
                return $mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
                    $the_sett$elm_pretty_printer$Pretty$nest_fn(indent, $mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
                        $the_sett$elm_pretty_printer$Pretty$string("if"),
                        $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(innerExprBool)).a
                    ])))),
                    $the_sett$elm_pretty_printer$Pretty$string("then")
                ])));
            }();
            var falsePart = function () {
                var _v24 = $mdgriffith$elm_codegen$Internal$Compiler$denode(innerExprFalse);
                if (_v24.$ === 4) {
                    var nestedExprBool = _v24.a;
                    var nestedExprTrue = _v24.b;
                    var nestedExprFalse = _v24.c;
                    return A3(innerIfBlock, nestedExprBool, nestedExprTrue, nestedExprFalse);
                }
                else {
                    return _List_fromArray([
                        $the_sett$elm_pretty_printer$Pretty$indent_fn(indent, $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(innerExprFalse)).a)
                    ]);
                }
            }();
            var elsePart = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("else"), $the_sett$elm_pretty_printer$Pretty$line);
            var context = $mdgriffith$elm_codegen$Internal$Write$topContext;
            if (!falsePart.b) {
                return _List_Nil;
            }
            else {
                if (!falsePart.b.b) {
                    var falseExpr = falsePart.a;
                    return _List_fromArray([ifPart, truePart, elsePart, falseExpr]);
                }
                else {
                    var hd = falsePart.a;
                    var tl = falsePart.b;
                    return $elm$core$List$append_fn(_List_fromArray([
                        ifPart,
                        truePart,
                        $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([elsePart, hd]))
                    ]), tl);
                }
            }
        });
        var prettyExpressions = A3(innerIfBlock, exprBool, exprTrue, exprFalse);
        return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, prettyExpressions)), true);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyIfBlock = F5($mdgriffith$elm_codegen$Internal$Write$prettyIfBlock_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyLambdaExpression_fn = function (aliases, indent, lambda) {
        var _v22 = $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(lambda.f));
        var prettyExpr = _v22.a;
        var alwaysBreak = _v22.b;
        return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$nest_fn(indent, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string(" ->"), $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, $elm$core$List$map_fn(A2($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, false), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, lambda.W))), $the_sett$elm_pretty_printer$Pretty$string("\\"))),
            prettyExpr
        ]))))), alwaysBreak);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyLambdaExpression = F3($mdgriffith$elm_codegen$Internal$Write$prettyLambdaExpression_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyLetBlock_fn = function (aliases, indent, letBlock) {
        return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("let"),
            $the_sett$elm_pretty_printer$Pretty$indent_fn(indent, $the_sett$elm_pretty_printer$Pretty$join_fn($mdgriffith$elm_codegen$Internal$Write$doubleLines_a0, $elm$core$List$map_fn(A2($mdgriffith$elm_codegen$Internal$Write$prettyLetDeclaration, aliases, indent), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, letBlock.aw)))),
            $the_sett$elm_pretty_printer$Pretty$string("in"),
            $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(letBlock.f)).a
        ]))), true);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyLetBlock = F3($mdgriffith$elm_codegen$Internal$Write$prettyLetBlock_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyLetDeclaration_fn = function (aliases, indent, letDecl) {
        if (!letDecl.$) {
            var fn = letDecl.a;
            return $mdgriffith$elm_codegen$Internal$Write$prettyFun_fn(aliases, fn);
        }
        else {
            var pattern = letDecl.a;
            var expr = letDecl.b;
            return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$indent_fn(indent, $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(expr)).a), $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                $mdgriffith$elm_codegen$Internal$Write$prettyPatternInner_fn(aliases, false, $mdgriffith$elm_codegen$Internal$Compiler$denode(pattern)),
                $the_sett$elm_pretty_printer$Pretty$string("=")
            ]))));
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyLetDeclaration = F3($mdgriffith$elm_codegen$Internal$Write$prettyLetDeclaration_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyList_fn = function (aliases, indent, exprs) {
        var open = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$space, $the_sett$elm_pretty_printer$Pretty$string("["));
        var close = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("]"), $the_sett$elm_pretty_printer$Pretty$line);
        if (!exprs.b) {
            return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string("[]"), false);
        }
        else {
            var _v20 = $elm$core$Tuple$mapSecond_fn($elm$core$List$any($elm$core$Basics$identity), $elm$core$List$unzip($elm$core$List$map_fn(A3($mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner, aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, $mdgriffith$elm_codegen$Internal$Write$decrementIndent_fn(indent, 2)), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, exprs))));
            var prettyExpressions = _v20.a;
            var alwaysBreak = _v20.b;
            return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$surround_fn(open, close, A2($the_sett$elm_pretty_printer$Pretty$separators, ", ", prettyExpressions)))), alwaysBreak);
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyList = F3($mdgriffith$elm_codegen$Internal$Write$prettyList_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplication_fn = function (aliases, indent, symbol, dir, exprl, exprr) {
        return (symbol === "<|") ? $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationLeft_fn(aliases, indent, symbol, dir, exprl, exprr) : $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationRight_fn(aliases, indent, symbol, dir, exprl, exprr);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplication = F6($mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplication_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationLeft_fn = function (aliases, indent, symbol, _v16, exprl, exprr) {
        var context = {
            ag: true,
            ah: false,
            q: $mdgriffith$elm_codegen$Internal$Write$precedence(symbol)
        };
        var _v17 = $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, context, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(exprr));
        var prettyExpressionRight = _v17.a;
        var alwaysBreakRight = _v17.b;
        var _v18 = $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, context, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(exprl));
        var prettyExpressionLeft = _v18.a;
        var alwaysBreakLeft = _v18.b;
        var alwaysBreak = alwaysBreakLeft || alwaysBreakRight;
        return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$nest_fn(4, $mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                prettyExpressionLeft,
                $the_sett$elm_pretty_printer$Pretty$string(symbol)
            ])),
            prettyExpressionRight
        ])))), alwaysBreak);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationLeft = F6($mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationLeft_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationRight_fn = function (aliases, indent, symbol, _v11, exprl, exprr) {
        var expandExpr = F3(function (innerIndent, context, expr) {
            if (expr.$ === 2) {
                var sym = expr.a;
                var left = expr.c;
                var right = expr.d;
                return A4(innerOpApply, false, sym, left, right);
            }
            else {
                return _List_fromArray([
                    $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, context, innerIndent, expr)
                ]);
            }
        });
        var innerOpApply = F4(function (isTop, sym, left, right) {
            var innerIndent = $mdgriffith$elm_codegen$Internal$Write$decrementIndent_fn(4, $elm$core$String$length(symbol) + 1);
            var leftIndent = isTop ? indent : innerIndent;
            var context = {
                ag: "<|" === sym,
                ah: false,
                q: $mdgriffith$elm_codegen$Internal$Write$precedence(sym)
            };
            var rightSide = A3(expandExpr, innerIndent, context, $mdgriffith$elm_codegen$Internal$Compiler$denode(right));
            if (rightSide.b) {
                var _v14 = rightSide.a;
                var hdExpr = _v14.a;
                var hdBreak = _v14.b;
                var tl = rightSide.b;
                return $elm$core$List$append_fn(A3(expandExpr, leftIndent, context, $mdgriffith$elm_codegen$Internal$Compiler$denode(left)), _List_Cons(_Utils_Tuple2($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, hdExpr, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$space, $the_sett$elm_pretty_printer$Pretty$string(sym))), hdBreak), tl));
            }
            else {
                return _List_Nil;
            }
        });
        var _v12 = $elm$core$Tuple$mapSecond_fn($elm$core$List$any($elm$core$Basics$identity), $elm$core$List$unzip(A4(innerOpApply, true, symbol, exprl, exprr)));
        var prettyExpressions = _v12.a;
        var alwaysBreak = _v12.b;
        return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$nest_fn(indent, $the_sett$elm_pretty_printer$Pretty$line), prettyExpressions))), alwaysBreak);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationRight = F6($mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationRight_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyParenthesizedExpression_fn = function (aliases, indent, expr) {
        var open = $the_sett$elm_pretty_printer$Pretty$string("(");
        var close = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string(")"), $the_sett$elm_pretty_printer$Pretty$tightline);
        var _v10 = $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, $mdgriffith$elm_codegen$Internal$Write$decrementIndent_fn(indent, 1), $mdgriffith$elm_codegen$Internal$Compiler$denode(expr));
        var prettyExpr = _v10.a;
        var alwaysBreak = _v10.b;
        return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$surround_fn(open, close, $the_sett$elm_pretty_printer$Pretty$nest_fn(1, prettyExpr)))), alwaysBreak);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyParenthesizedExpression = F3($mdgriffith$elm_codegen$Internal$Write$prettyParenthesizedExpression_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyRecordAccess_fn = function (aliases, expr, field) {
        var _v9 = $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(expr));
        var prettyExpr = _v9.a;
        var alwaysBreak = _v9.b;
        return _Utils_Tuple2($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(field)), $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $mdgriffith$elm_codegen$Internal$Write$dot, prettyExpr)), alwaysBreak);
    }, $mdgriffith$elm_codegen$Internal$Write$prettyRecordAccess = F3($mdgriffith$elm_codegen$Internal$Write$prettyRecordAccess_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyRecordExpr_fn = function (aliases, setters) {
        var open = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$space, $the_sett$elm_pretty_printer$Pretty$string("{"));
        var close = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("}"), $the_sett$elm_pretty_printer$Pretty$line);
        if (!setters.b) {
            return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string("{}"), false);
        }
        else {
            var _v8 = $elm$core$Tuple$mapSecond_fn($elm$core$List$any($elm$core$Basics$identity), $elm$core$List$unzip($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Write$prettySetter(aliases), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, setters))));
            var prettyExpressions = _v8.a;
            var alwaysBreak = _v8.b;
            return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$surround_fn(open, close, A2($the_sett$elm_pretty_printer$Pretty$separators, ", ", prettyExpressions)))), alwaysBreak);
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyRecordExpr = F2($mdgriffith$elm_codegen$Internal$Write$prettyRecordExpr_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyRecordUpdateExpression_fn = function (aliases, indent, _var, setters) {
        var open = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("{"),
            $the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(_var))
        ])));
        var close = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("}"), $the_sett$elm_pretty_printer$Pretty$line);
        var addBarToFirst = function (exprs) {
            if (!exprs.b) {
                return _List_Nil;
            }
            else {
                var hd = exprs.a;
                var tl = exprs.b;
                return _List_Cons($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, hd, $the_sett$elm_pretty_printer$Pretty$string("| ")), tl);
            }
        };
        if (!setters.b) {
            return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string("{}"), false);
        }
        else {
            var _v5 = $elm$core$Tuple$mapSecond_fn($elm$core$List$any($elm$core$Basics$identity), $elm$core$List$unzip($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Write$prettySetter(aliases), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, setters))));
            var prettyExpressions = _v5.a;
            var alwaysBreak = _v5.b;
            return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$surround_fn($the_sett$elm_pretty_printer$Pretty$empty, close, $the_sett$elm_pretty_printer$Pretty$nest_fn(indent, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, A2($the_sett$elm_pretty_printer$Pretty$separators, ", ", addBarToFirst(prettyExpressions)), open))))), alwaysBreak);
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyRecordUpdateExpression = F4($mdgriffith$elm_codegen$Internal$Write$prettyRecordUpdateExpression_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettySetter_fn = function (aliases, _v2) {
        var fld = _v2.a;
        var val = _v2.b;
        var _v3 = $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner_fn(aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, $mdgriffith$elm_codegen$Internal$Compiler$denode(val));
        var prettyExpr = _v3.a;
        var alwaysBreak = _v3.b;
        return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$nest_fn(4, $mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                $the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(fld)),
                $the_sett$elm_pretty_printer$Pretty$string("=")
            ])),
            prettyExpr
        ])))), alwaysBreak);
    }, $mdgriffith$elm_codegen$Internal$Write$prettySetter = F2($mdgriffith$elm_codegen$Internal$Write$prettySetter_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyTupledExpression_fn = function (aliases, indent, exprs) {
        var open = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$space, $the_sett$elm_pretty_printer$Pretty$string("("));
        var close = $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string(")"), $the_sett$elm_pretty_printer$Pretty$line);
        if (!exprs.b) {
            return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$string("()"), false);
        }
        else {
            var _v1 = $elm$core$Tuple$mapSecond_fn($elm$core$List$any($elm$core$Basics$identity), $elm$core$List$unzip($elm$core$List$map_fn(A3($mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner, aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, $mdgriffith$elm_codegen$Internal$Write$decrementIndent_fn(indent, 2)), $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, exprs))));
            var prettyExpressions = _v1.a;
            var alwaysBreak = _v1.b;
            return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Write$optionalGroup_fn(alwaysBreak, $the_sett$elm_pretty_printer$Pretty$align($the_sett$elm_pretty_printer$Pretty$surround_fn(open, close, A2($the_sett$elm_pretty_printer$Pretty$separators, ", ", prettyExpressions)))), alwaysBreak);
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyTupledExpression = F3($mdgriffith$elm_codegen$Internal$Write$prettyTupledExpression_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyDestructuring_fn = function (aliases, pattern, expr) {
        return $the_sett$elm_pretty_printer$Pretty$nest_fn(4, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                $mdgriffith$elm_codegen$Internal$Write$prettyPattern_fn(aliases, pattern),
                $the_sett$elm_pretty_printer$Pretty$string("=")
            ])),
            $mdgriffith$elm_codegen$Internal$Write$prettyExpression_fn(aliases, expr)
        ])));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyDestructuring = F3($mdgriffith$elm_codegen$Internal$Write$prettyDestructuring_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyInfix = function (infix_) {
        var dirToString = function (direction) {
            switch (direction) {
                case 0:
                    return "left";
                case 1:
                    return "right";
                default:
                    return "non";
            }
        };
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("infix"),
            $the_sett$elm_pretty_printer$Pretty$string(dirToString($mdgriffith$elm_codegen$Internal$Compiler$denode(infix_.m))),
            $the_sett$elm_pretty_printer$Pretty$string($elm$core$String$fromInt($mdgriffith$elm_codegen$Internal$Compiler$denode(infix_.q))),
            $the_sett$elm_pretty_printer$Pretty$parens($the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(infix_.p))),
            $the_sett$elm_pretty_printer$Pretty$string("="),
            $the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(infix_.n))
        ]));
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyPortDeclaration_fn = function (aliases, sig) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("port"),
            $mdgriffith$elm_codegen$Internal$Write$prettySignature_fn(aliases, sig)
        ]));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyPortDeclaration = F2($mdgriffith$elm_codegen$Internal$Write$prettyPortDeclaration_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyTypeAlias_fn = function (aliases, tAlias) {
        var typeAliasPretty = $the_sett$elm_pretty_printer$Pretty$nest_fn(4, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation_fn(aliases, $mdgriffith$elm_codegen$Internal$Compiler$denode(tAlias.a2)), $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("type alias"),
            $the_sett$elm_pretty_printer$Pretty$string($mdgriffith$elm_codegen$Internal$Compiler$denode(tAlias.c)),
            $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, $elm$core$List$map_fn($the_sett$elm_pretty_printer$Pretty$string, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeAll_a0, tAlias.cp))),
            $the_sett$elm_pretty_printer$Pretty$string("=")
        ])))));
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, _List_fromArray([
            $mdgriffith$elm_codegen$Internal$Write$prettyMaybe_fn($mdgriffith$elm_codegen$Internal$Write$prettyDocumentation, $elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe_a0, tAlias.bb)),
            typeAliasPretty
        ]));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyTypeAlias = F2($mdgriffith$elm_codegen$Internal$Write$prettyTypeAlias_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyElmSyntaxDeclaration_fn = function (aliases, decl) {
        switch (decl.$) {
            case 0:
                var fn = decl.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyFun_fn(aliases, fn);
            case 1:
                var tAlias = decl.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyTypeAlias_fn(aliases, tAlias);
            case 2:
                var type_ = decl.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyCustomType_fn(aliases, type_);
            case 3:
                var sig = decl.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyPortDeclaration_fn(aliases, sig);
            case 4:
                var infix_ = decl.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyInfix(infix_);
            default:
                var pattern = decl.a;
                var expr = decl.b;
                return $mdgriffith$elm_codegen$Internal$Write$prettyDestructuring_fn(aliases, $mdgriffith$elm_codegen$Internal$Compiler$denode(pattern), $mdgriffith$elm_codegen$Internal$Compiler$denode(expr));
        }
    }, $mdgriffith$elm_codegen$Internal$Write$prettyElmSyntaxDeclaration = F2($mdgriffith$elm_codegen$Internal$Write$prettyElmSyntaxDeclaration_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyDeclarations_fn = function (aliases, decls) {
        return $elm$core$List$foldl_fn($elm$core$Basics$apL, $the_sett$elm_pretty_printer$Pretty$empty, $elm$core$Basics$composeR_fn($elm$core$List$reverse, A2($elm$core$Basics$composeR, $elm$core$List$drop(1), $elm$core$List$reverse), $elm$core$List$concatMap_fn(function (decl) {
            switch (decl.$) {
                case 1:
                    var content = decl.a;
                    return _List_fromArray([
                        $the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$string(content + "\n")),
                        A2($elm$core$Basics$composeR, $the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line), $the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line))
                    ]);
                case 2:
                    var source = decl.a;
                    return _List_fromArray([
                        $the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$string(source)),
                        A2($elm$core$Basics$composeR, $the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line), A2($elm$core$Basics$composeR, $the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line), $the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line)))
                    ]);
                default:
                    var innerDecl = decl.a;
                    return _List_fromArray([
                        $the_sett$elm_pretty_printer$Pretty$a($mdgriffith$elm_codegen$Internal$Write$prettyElmSyntaxDeclaration_fn(aliases, innerDecl)),
                        A2($elm$core$Basics$composeR, $the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line), A2($elm$core$Basics$composeR, $the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line), $the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line)))
                    ]);
            }
        }, decls)));
    }, $mdgriffith$elm_codegen$Internal$Write$prettyDeclarations = F2($mdgriffith$elm_codegen$Internal$Write$prettyDeclarations_fn);
    var $mdgriffith$elm_codegen$Internal$Comments$delimeters = function (doc) {
        return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$string("-}"), $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, doc, $the_sett$elm_pretty_printer$Pretty$string("{-| "))));
    };
    var $mdgriffith$elm_codegen$Internal$Comments$getParts = function (_v0) {
        var parts = _v0;
        return $elm$core$List$reverse(parts);
    };
    var $mdgriffith$elm_codegen$Internal$Comments$DocTags = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Comments$fitAndSplit_fn = function (width, tags) {
        if (!tags.b) {
            return _List_Nil;
        }
        else {
            var t = tags.a;
            var ts = tags.b;
            var _v1 = $elm$core$List$foldl_fn_unwrapped(function (tag, _v2) {
                var allSplits = _v2.a;
                var curSplit = _v2.b;
                var remaining = _v2.c;
                return (_Utils_cmp($elm$core$String$length(tag), remaining) < 1) ? _Utils_Tuple3(allSplits, _List_Cons(tag, curSplit), remaining - $elm$core$String$length(tag)) : _Utils_Tuple3(_Utils_ap(allSplits, _List_fromArray([
                    $elm$core$List$reverse(curSplit)
                ])), _List_fromArray([tag]), width - $elm$core$String$length(tag));
            }, _Utils_Tuple3(_List_Nil, _List_fromArray([t]), width - $elm$core$String$length(t)), ts);
            var splitsExceptLast = _v1.a;
            var lastSplit = _v1.b;
            return _Utils_ap(splitsExceptLast, _List_fromArray([
                $elm$core$List$reverse(lastSplit)
            ]));
        }
    }, $mdgriffith$elm_codegen$Internal$Comments$fitAndSplit = F2($mdgriffith$elm_codegen$Internal$Comments$fitAndSplit_fn);
    var $elm$core$List$sort = function (xs) {
        return _List_sortBy_fn($elm$core$Basics$identity, xs);
    };
    var $mdgriffith$elm_codegen$Internal$Comments$mergeDocTags = function (innerParts) {
        var _v0 = $elm$core$List$foldr_fn(F2(function (part, _v1) {
            var accum = _v1.a;
            var context = _v1.b;
            if (context.$ === 1) {
                if (part.$ === 2) {
                    var tags = part.a;
                    return _Utils_Tuple2(accum, $elm$core$Maybe$Just(tags));
                }
                else {
                    var otherPart = part;
                    return _Utils_Tuple2(_List_Cons(otherPart, accum), $elm$core$Maybe$Nothing);
                }
            }
            else {
                var contextTags = context.a;
                if (part.$ === 2) {
                    var tags = part.a;
                    return _Utils_Tuple2(accum, $elm$core$Maybe$Just(_Utils_ap(contextTags, tags)));
                }
                else {
                    var otherPart = part;
                    return _Utils_Tuple2(_List_Cons(otherPart, _List_Cons($mdgriffith$elm_codegen$Internal$Comments$DocTags($elm$core$List$sort(contextTags)), accum)), $elm$core$Maybe$Nothing);
                }
            }
        }), _Utils_Tuple2(_List_Nil, $elm$core$Maybe$Nothing), innerParts);
        var partsExceptMaybeFirst = _v0.a;
        var maybeFirstPart = _v0.b;
        if (maybeFirstPart.$ === 1) {
            return partsExceptMaybeFirst;
        }
        else {
            var tags = maybeFirstPart.a;
            return _List_Cons($mdgriffith$elm_codegen$Internal$Comments$DocTags($elm$core$List$sort(tags)), partsExceptMaybeFirst);
        }
    };
    var $mdgriffith$elm_codegen$Internal$Comments$layoutTags_fn = function (width, parts) {
        return $elm$core$List$foldr_fn(F2(function (part, _v0) {
            var accumParts = _v0.a;
            var accumDocTags = _v0.b;
            if (part.$ === 2) {
                var tags = part.a;
                var splits = $mdgriffith$elm_codegen$Internal$Comments$fitAndSplit_fn(width, tags);
                return _Utils_Tuple2(_Utils_ap($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Comments$DocTags, splits), accumParts), _Utils_ap(accumDocTags, splits));
            }
            else {
                var otherPart = part;
                return _Utils_Tuple2(_List_Cons(otherPart, accumParts), accumDocTags);
            }
        }), _Utils_Tuple2(_List_Nil, _List_Nil), $mdgriffith$elm_codegen$Internal$Comments$mergeDocTags(parts));
    }, $mdgriffith$elm_codegen$Internal$Comments$layoutTags = F2($mdgriffith$elm_codegen$Internal$Comments$layoutTags_fn);
    var $the_sett$elm_pretty_printer$Internals$NLine_fn = function (a, b, c) {
        return { $: 2, a: a, b: b, c: c };
    }, $the_sett$elm_pretty_printer$Internals$NLine = F3($the_sett$elm_pretty_printer$Internals$NLine_fn);
    var $the_sett$elm_pretty_printer$Internals$NNil = { $: 0 };
    var $the_sett$elm_pretty_printer$Internals$NText_fn = function (a, b, c) {
        return { $: 1, a: a, b: b, c: c };
    }, $the_sett$elm_pretty_printer$Internals$NText = F3($the_sett$elm_pretty_printer$Internals$NText_fn);
    var $the_sett$elm_pretty_printer$Internals$fits_fn = function (w, normal) {
        fits: while (true) {
            if (w < 0) {
                return false;
            }
            else {
                switch (normal.$) {
                    case 0:
                        return true;
                    case 1:
                        var text = normal.a;
                        var innerNormal = normal.b;
                        var $temp$w = w - $elm$core$String$length(text), $temp$normal = innerNormal(0);
                        w = $temp$w;
                        normal = $temp$normal;
                        continue fits;
                    default:
                        return true;
                }
            }
        }
    }, $the_sett$elm_pretty_printer$Internals$fits = F2($the_sett$elm_pretty_printer$Internals$fits_fn);
    var $the_sett$elm_pretty_printer$Internals$better_fn = function (w, k, doc, doc2Fn) {
        return $the_sett$elm_pretty_printer$Internals$fits_fn(w - k, doc) ? doc : doc2Fn(0);
    }, $the_sett$elm_pretty_printer$Internals$better = F4($the_sett$elm_pretty_printer$Internals$better_fn);
    var $the_sett$elm_pretty_printer$Internals$best_fn = function (width, startCol, x) {
        var be = F3(function (w, k, docs) {
            be: while (true) {
                if (!docs.b) {
                    return $the_sett$elm_pretty_printer$Internals$NNil;
                }
                else {
                    switch (docs.a.b.$) {
                        case 0:
                            var _v1 = docs.a;
                            var i = _v1.a;
                            var _v2 = _v1.b;
                            var ds = docs.b;
                            var $temp$w = w, $temp$k = k, $temp$docs = ds;
                            w = $temp$w;
                            k = $temp$k;
                            docs = $temp$docs;
                            continue be;
                        case 1:
                            var _v3 = docs.a;
                            var i = _v3.a;
                            var _v4 = _v3.b;
                            var doc = _v4.a;
                            var doc2 = _v4.b;
                            var ds = docs.b;
                            var $temp$w = w, $temp$k = k, $temp$docs = _List_Cons(_Utils_Tuple2(i, doc(0)), _List_Cons(_Utils_Tuple2(i, doc2(0)), ds));
                            w = $temp$w;
                            k = $temp$k;
                            docs = $temp$docs;
                            continue be;
                        case 2:
                            var _v5 = docs.a;
                            var i = _v5.a;
                            var _v6 = _v5.b;
                            var j = _v6.a;
                            var doc = _v6.b;
                            var ds = docs.b;
                            var $temp$w = w, $temp$k = k, $temp$docs = _List_Cons(_Utils_Tuple2(i + j, doc(0)), ds);
                            w = $temp$w;
                            k = $temp$k;
                            docs = $temp$docs;
                            continue be;
                        case 3:
                            var _v7 = docs.a;
                            var i = _v7.a;
                            var _v8 = _v7.b;
                            var text = _v8.a;
                            var maybeTag = _v8.b;
                            var ds = docs.b;
                            return $the_sett$elm_pretty_printer$Internals$NText_fn(text, function (_v9) {
                                return A3(be, w, k + $elm$core$String$length(text), ds);
                            }, maybeTag);
                        case 4:
                            var _v10 = docs.a;
                            var i = _v10.a;
                            var _v11 = _v10.b;
                            var vsep = _v11.b;
                            var ds = docs.b;
                            return $the_sett$elm_pretty_printer$Internals$NLine_fn(i, vsep, function (_v12) {
                                return A3(be, w, i + $elm$core$String$length(vsep), ds);
                            });
                        case 5:
                            var _v13 = docs.a;
                            var i = _v13.a;
                            var _v14 = _v13.b;
                            var doc = _v14.a;
                            var doc2 = _v14.b;
                            var ds = docs.b;
                            return $the_sett$elm_pretty_printer$Internals$better_fn(w, k, A3(be, w, k, _List_Cons(_Utils_Tuple2(i, doc), ds)), function (_v15) {
                                return A3(be, w, k, _List_Cons(_Utils_Tuple2(i, doc2), ds));
                            });
                        case 6:
                            var _v16 = docs.a;
                            var i = _v16.a;
                            var fn = _v16.b.a;
                            var ds = docs.b;
                            var $temp$w = w, $temp$k = k, $temp$docs = _List_Cons(_Utils_Tuple2(i, fn(i)), ds);
                            w = $temp$w;
                            k = $temp$k;
                            docs = $temp$docs;
                            continue be;
                        default:
                            var _v17 = docs.a;
                            var i = _v17.a;
                            var fn = _v17.b.a;
                            var ds = docs.b;
                            var $temp$w = w, $temp$k = k, $temp$docs = _List_Cons(_Utils_Tuple2(i, fn(k)), ds);
                            w = $temp$w;
                            k = $temp$k;
                            docs = $temp$docs;
                            continue be;
                    }
                }
            }
        });
        return A3(be, width, startCol, _List_fromArray([
            _Utils_Tuple2(0, x)
        ]));
    }, $the_sett$elm_pretty_printer$Internals$best = F3($the_sett$elm_pretty_printer$Internals$best_fn);
    var $the_sett$elm_pretty_printer$Internals$layout = function (normal) {
        var layoutInner = F2(function (normal2, acc) {
            layoutInner: while (true) {
                switch (normal2.$) {
                    case 0:
                        return acc;
                    case 1:
                        var text = normal2.a;
                        var innerNormal = normal2.b;
                        var maybeTag = normal2.c;
                        var $temp$normal2 = innerNormal(0), $temp$acc = _List_Cons(text, acc);
                        normal2 = $temp$normal2;
                        acc = $temp$acc;
                        continue layoutInner;
                    default:
                        var i = normal2.a;
                        var sep = normal2.b;
                        var innerNormal = normal2.c;
                        var norm = innerNormal(0);
                        if (norm.$ === 2) {
                            var $temp$normal2 = innerNormal(0), $temp$acc = _List_Cons("\n" + sep, acc);
                            normal2 = $temp$normal2;
                            acc = $temp$acc;
                            continue layoutInner;
                        }
                        else {
                            var $temp$normal2 = innerNormal(0), $temp$acc = _List_Cons("\n" + ($the_sett$elm_pretty_printer$Internals$copy_fn(i, " ") + sep), acc);
                            normal2 = $temp$normal2;
                            acc = $temp$acc;
                            continue layoutInner;
                        }
                }
            }
        });
        return $elm$core$String$concat($elm$core$List$reverse(A2(layoutInner, normal, _List_Nil)));
    };
    var $the_sett$elm_pretty_printer$Pretty$pretty_fn = function (w, doc) {
        return $the_sett$elm_pretty_printer$Internals$layout($the_sett$elm_pretty_printer$Internals$best_fn(w, 0, doc));
    }, $the_sett$elm_pretty_printer$Pretty$pretty = F2($the_sett$elm_pretty_printer$Pretty$pretty_fn);
    var $mdgriffith$elm_codegen$Internal$Comments$prettyCode = function (val) {
        return $the_sett$elm_pretty_printer$Pretty$indent_fn(4, $the_sett$elm_pretty_printer$Pretty$string(val));
    };
    var $mdgriffith$elm_codegen$Internal$Comments$prettyMarkdown = function (val) {
        return $the_sett$elm_pretty_printer$Pretty$string(val);
    };
    var $mdgriffith$elm_codegen$Internal$Comments$prettyTags = function (tags) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("@docs"),
            $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$string(", "), $elm$core$List$map_fn($the_sett$elm_pretty_printer$Pretty$string, tags))
        ]));
    };
    var $mdgriffith$elm_codegen$Internal$Comments$prettyCommentPart = function (part) {
        switch (part.$) {
            case 0:
                var val = part.a;
                return $mdgriffith$elm_codegen$Internal$Comments$prettyMarkdown(val);
            case 1:
                var val = part.a;
                return $mdgriffith$elm_codegen$Internal$Comments$prettyCode(val);
            default:
                var tags = part.a;
                return $mdgriffith$elm_codegen$Internal$Comments$prettyTags(tags);
        }
    };
    var $mdgriffith$elm_codegen$Internal$Comments$prettyFileComment_fn = function (width, comment) {
        var _v0 = $mdgriffith$elm_codegen$Internal$Comments$layoutTags_fn(width, $mdgriffith$elm_codegen$Internal$Comments$getParts(comment));
        var parts = _v0.a;
        var splits = _v0.b;
        return _Utils_Tuple2($the_sett$elm_pretty_printer$Pretty$pretty_fn(width, $mdgriffith$elm_codegen$Internal$Comments$delimeters($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$lines_a0, $elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Comments$prettyCommentPart, parts)))), splits);
    }, $mdgriffith$elm_codegen$Internal$Comments$prettyFileComment = F2($mdgriffith$elm_codegen$Internal$Comments$prettyFileComment_fn);
    var $mdgriffith$elm_codegen$Internal$Write$prettyDefaultModuleData = function (moduleData) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("module"),
            $mdgriffith$elm_codegen$Internal$Write$prettyModuleName($mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.bm)),
            $mdgriffith$elm_codegen$Internal$Write$prettyExposing($mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.cf))
        ]));
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyEffectModuleData = function (moduleData) {
        var prettyCmdAndSub = F2(function (maybeCmd, maybeSub) {
            var _v0 = _Utils_Tuple2(maybeCmd, maybeSub);
            if (!_v0.a.$) {
                if (!_v0.b.$) {
                    var cmdName = _v0.a.a;
                    var subName = _v0.b.a;
                    return $elm$core$Maybe$Just($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                        $the_sett$elm_pretty_printer$Pretty$string("where { command ="),
                        $the_sett$elm_pretty_printer$Pretty$string(cmdName),
                        $the_sett$elm_pretty_printer$Pretty$string(","),
                        $the_sett$elm_pretty_printer$Pretty$string("subscription ="),
                        $the_sett$elm_pretty_printer$Pretty$string(subName),
                        $the_sett$elm_pretty_printer$Pretty$string("}")
                    ])));
                }
                else {
                    var cmdName = _v0.a.a;
                    var _v3 = _v0.b;
                    return $elm$core$Maybe$Just($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                        $the_sett$elm_pretty_printer$Pretty$string("where { command ="),
                        $the_sett$elm_pretty_printer$Pretty$string(cmdName),
                        $the_sett$elm_pretty_printer$Pretty$string("}")
                    ])));
                }
            }
            else {
                if (_v0.b.$ === 1) {
                    var _v1 = _v0.a;
                    var _v2 = _v0.b;
                    return $elm$core$Maybe$Nothing;
                }
                else {
                    var _v4 = _v0.a;
                    var subName = _v0.b.a;
                    return $elm$core$Maybe$Just($the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
                        $the_sett$elm_pretty_printer$Pretty$string("where { subscription ="),
                        $the_sett$elm_pretty_printer$Pretty$string(subName),
                        $the_sett$elm_pretty_printer$Pretty$string("}")
                    ])));
                }
            }
        });
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("effect module"),
            $mdgriffith$elm_codegen$Internal$Write$prettyModuleName($mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.bm)),
            $mdgriffith$elm_codegen$Internal$Write$prettyMaybe_fn($elm$core$Basics$identity, A2(prettyCmdAndSub, $elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe_a0, moduleData.eo), $elm$core$Maybe$map_fn($mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe_a0, moduleData.fE))),
            $mdgriffith$elm_codegen$Internal$Write$prettyExposing($mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.cf))
        ]));
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyPortModuleData = function (moduleData) {
        return $the_sett$elm_pretty_printer$Pretty$join_fn($the_sett$elm_pretty_printer$Pretty$words_a0, _List_fromArray([
            $the_sett$elm_pretty_printer$Pretty$string("port module"),
            $mdgriffith$elm_codegen$Internal$Write$prettyModuleName($mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.bm)),
            $mdgriffith$elm_codegen$Internal$Write$prettyExposing($mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.cf))
        ]));
    };
    var $mdgriffith$elm_codegen$Internal$Write$prettyModule = function (mod) {
        switch (mod.$) {
            case 0:
                var defaultModuleData = mod.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyDefaultModuleData(defaultModuleData);
            case 1:
                var defaultModuleData = mod.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyPortModuleData(defaultModuleData);
            default:
                var effectModuleData = mod.a;
                return $mdgriffith$elm_codegen$Internal$Write$prettyEffectModuleData(effectModuleData);
        }
    };
    var $mdgriffith$elm_codegen$Internal$Write$prepareLayout_fn = function (width, file) {
        return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $mdgriffith$elm_codegen$Internal$Write$prettyDeclarations_fn(file.av, file.aw), $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $mdgriffith$elm_codegen$Internal$Write$importsPretty(file.g), function (doc) {
            var _v0 = file.ep;
            if (_v0.$ === 1) {
                return doc;
            }
            else {
                var fileComment = _v0.a;
                var _v1 = $mdgriffith$elm_codegen$Internal$Comments$prettyFileComment_fn(width, fileComment);
                var fileCommentStr = _v1.a;
                var innerTags = _v1.b;
                return $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $mdgriffith$elm_codegen$Internal$Write$prettyComments(_List_fromArray([fileCommentStr])), doc));
            }
        }($elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $elm_community$basics_extra$Basics$Extra$flip_fn($the_sett$elm_pretty_printer$Pretty$a_a0, $the_sett$elm_pretty_printer$Pretty$line, $mdgriffith$elm_codegen$Internal$Write$prettyModule(file.cX))))));
    }, $mdgriffith$elm_codegen$Internal$Write$prepareLayout = F2($mdgriffith$elm_codegen$Internal$Write$prepareLayout_fn);
    var $mdgriffith$elm_codegen$Internal$Write$pretty_fn = function (width, file) {
        return $the_sett$elm_pretty_printer$Pretty$pretty_fn(width, $mdgriffith$elm_codegen$Internal$Write$prepareLayout_fn(width, file));
    }, $mdgriffith$elm_codegen$Internal$Write$pretty = F2($mdgriffith$elm_codegen$Internal$Write$pretty_fn);
    var $mdgriffith$elm_codegen$Internal$Write$write_a0 = 80, $mdgriffith$elm_codegen$Internal$Write$write = $mdgriffith$elm_codegen$Internal$Write$pretty($mdgriffith$elm_codegen$Internal$Write$write_a0);
    var $mdgriffith$elm_codegen$Internal$Render$render_fn = function (toDocComment, fileDetails) {
        var rendered = $elm$core$List$foldl_fn_unwrapped(function (decl, gathered) {
            switch (decl.$) {
                case 1:
                    var comm = decl.a;
                    return _Utils_update(gathered, {
                        aw: _List_Cons($mdgriffith$elm_codegen$Internal$Compiler$RenderedComment(comm), gathered.aw)
                    });
                case 2:
                    var block = decl.a;
                    return _Utils_update(gathered, {
                        aw: _List_Cons($mdgriffith$elm_codegen$Internal$Compiler$RenderedBlock(block), gathered.aw)
                    });
                default:
                    var decDetails = decl.a;
                    var result = decDetails.at(fileDetails.h);
                    return {
                        aw: _List_Cons($mdgriffith$elm_codegen$Internal$Compiler$RenderedDecl($mdgriffith$elm_codegen$Internal$Render$addDocs_fn(decDetails.ab, result.es)), gathered.aw),
                        an: $mdgriffith$elm_codegen$Internal$Render$addExposed_fn(decDetails.an, result.es, gathered.an),
                        ao: function () {
                            var _v5 = decDetails.an;
                            if (!_v5.$) {
                                return gathered.ao;
                            }
                            else {
                                var details = _v5.a;
                                return _List_Cons(_Utils_Tuple2(details.ap, decDetails.c), gathered.ao);
                            }
                        }(),
                        ay: function () {
                            if (gathered.ay) {
                                return gathered.ay;
                            }
                            else {
                                var _v6 = result.es;
                                if (_v6.$ === 3) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                        }(),
                        g: _Utils_ap(result.al, _Utils_ap(decDetails.g, gathered.g)),
                        dZ: function () {
                            var _v7 = result.fP;
                            if (_v7.$ === 1) {
                                return gathered.dZ;
                            }
                            else {
                                var warn = _v7.a;
                                return _List_Cons(warn, gathered.dZ);
                            }
                        }()
                    };
            }
        }, { aw: _List_Nil, an: _List_Nil, ao: _List_Nil, ay: false, g: _List_Nil, dZ: _List_Nil }, fileDetails.aw);
        var body = $mdgriffith$elm_codegen$Internal$Write$pretty_fn($mdgriffith$elm_codegen$Internal$Write$write_a0, {
            av: fileDetails.av,
            ep: function () {
                var _v0 = rendered.ao;
                if (!_v0.b) {
                    return $elm$core$Maybe$Nothing;
                }
                else {
                    return $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Comments$addPart_fn($mdgriffith$elm_codegen$Internal$Comments$emptyComment, $mdgriffith$elm_codegen$Internal$Comments$Markdown("\n" + $elm$core$String$join_fn("\n\n", toDocComment($mdgriffith$elm_codegen$Internal$Render$groupExposing(_List_sortBy_fn(function (_v1) {
                        var group = _v1.a;
                        if (group.$ === 1) {
                            return "zzzzzzzzz";
                        }
                        else {
                            var name = group.a;
                            return name;
                        }
                    }, rendered.ao)))))));
                }
            }(),
            aw: $elm$core$List$reverse(rendered.aw),
            g: $elm$core$List$filterMap_fn($mdgriffith$elm_codegen$Internal$Compiler$makeImport(fileDetails.av), $mdgriffith$elm_codegen$Internal$Render$dedupImports(rendered.g)),
            cX: (rendered.ay ? $stil4m$elm_syntax$Elm$Syntax$Module$PortModule : $stil4m$elm_syntax$Elm$Syntax$Module$NormalModule)({
                cf: function () {
                    var _v3 = rendered.an;
                    if (!_v3.b) {
                        return $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$All($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange));
                    }
                    else {
                        return $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0, rendered.an)));
                    }
                }(),
                bm: $mdgriffith$elm_codegen$Internal$Compiler$nodify(fileDetails.bm)
            })
        });
        return {
            b2: body,
            db: $elm$core$String$join_fn("/", fileDetails.bm) + ".elm",
            dZ: rendered.dZ
        };
    }, $mdgriffith$elm_codegen$Internal$Render$render = F2($mdgriffith$elm_codegen$Internal$Render$render_fn);
    var $mdgriffith$elm_codegen$Elm$docs = function (group) {
        var _v0 = group.ap;
        if (_v0.$ === 1) {
            return "@docs " + $elm$core$String$join_fn(", ", group.cU);
        }
        else {
            var groupName = _v0.a;
            return "## " + (groupName + ("\n\n@docs " + $elm$core$String$join_fn(", ", group.cU)));
        }
    };
    var $elm$core$List$isEmpty = function (xs) {
        if (!xs.b) {
            return true;
        }
        else {
            return false;
        }
    };
    var $mdgriffith$elm_codegen$Elm$renderStandardComment = function (groups) {
        return $elm$core$List$isEmpty(groups) ? _List_Nil : $elm$core$List$map_fn($mdgriffith$elm_codegen$Elm$docs, groups);
    };
    var $mdgriffith$elm_codegen$Internal$Index$startIndex = $mdgriffith$elm_codegen$Internal$Index$Index_fn(0, _List_Nil, $elm$core$Set$empty, true);
    var $mdgriffith$elm_codegen$Elm$file_fn = function (mod, decs) {
        return $mdgriffith$elm_codegen$Internal$Render$render_fn($mdgriffith$elm_codegen$Elm$renderStandardComment, { av: _List_Nil, aw: decs, h: $mdgriffith$elm_codegen$Internal$Index$startIndex, bm: mod });
    }, $mdgriffith$elm_codegen$Elm$file = F2($mdgriffith$elm_codegen$Elm$file_fn);
    var $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression = function (a) {
        return { $: 17, a: a };
    };
    var $stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern = function (a) {
        return { $: 11, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Index$getName_fn = function (desiredName, index) {
        var top = index.a;
        var tail = index.b;
        var scope = index.c;
        var check = index.d;
        var formattedName = $mdgriffith$elm_codegen$Internal$Format$formatValue(desiredName);
        if (!$elm$core$Set$member_fn(formattedName, scope)) {
            return _Utils_Tuple2(formattedName, $mdgriffith$elm_codegen$Internal$Index$Index_fn(top, tail, $elm$core$Set$insert_fn(formattedName, scope), check));
        }
        else {
            var protectedName = _Utils_ap(formattedName, $elm$core$String$fromInt(top));
            if (!$elm$core$Set$member_fn(protectedName, scope)) {
                return _Utils_Tuple2(protectedName, $mdgriffith$elm_codegen$Internal$Index$Index_fn(top + 1, tail, $elm$core$Set$insert_fn(protectedName, scope), check));
            }
            else {
                var protectedNameLevel2 = _Utils_ap(formattedName, $mdgriffith$elm_codegen$Internal$Index$indexToString(index));
                return _Utils_Tuple2(protectedNameLevel2, $mdgriffith$elm_codegen$Internal$Index$Index_fn(top + 1, tail, $elm$core$Set$insert_fn(protectedNameLevel2, scope), check));
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Index$getName = F2($mdgriffith$elm_codegen$Internal$Index$getName_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType_fn = function (index, desiredName, maybeAnnotation) {
        var _v0 = $mdgriffith$elm_codegen$Internal$Index$getName_fn(desiredName, index);
        var name = _v0.a;
        var newIndex = _v0.b;
        var _v1 = function () {
            if (maybeAnnotation.$ === 1) {
                return {
                    av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
                    a: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType($mdgriffith$elm_codegen$Internal$Index$protectTypeName_fn(desiredName, index)),
                    g: _List_Nil
                };
            }
            else {
                var ann = maybeAnnotation.a;
                return ann;
            }
        }();
        var imports = _v1.g;
        var annotation = _v1.a;
        var aliases = _v1.av;
        return {
            h: newIndex,
            c: name,
            t: annotation,
            u: function (ignoredIndex_) {
                return {
                    a: $elm$core$Result$Ok({ av: aliases, i: $elm$core$Dict$empty, t: annotation }),
                    f: $stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue_fn(_List_Nil, name),
                    g: imports
                };
            }
        };
    }, $mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType = F3($mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType_fn);
    var $mdgriffith$elm_codegen$Elm$fn2_fn = function (_v0, _v1, toExpression) {
        var oneBaseName = _v0.a;
        var maybeOneType = _v0.b;
        var twoBaseName = _v1.a;
        var maybeTwoType = _v1.b;
        return $mdgriffith$elm_codegen$Internal$Compiler$expression(function (index) {
            var one = $mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType_fn(index, oneBaseName, maybeOneType);
            var two = $mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType_fn(one.h, twoBaseName, maybeTwoType);
            var _v2 = $mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails_fn(two.h, A2(toExpression, one.u, two.u));
            var newIndex_ = _v2.a;
            var _return = _v2.b;
            return {
                a: function () {
                    var _v3 = _return.a;
                    if (_v3.$ === 1) {
                        var err = _v3.a;
                        return _return.a;
                    }
                    else {
                        var returnAnnotation = _v3.a;
                        return $elm$core$Result$Ok({
                            av: returnAnnotation.av,
                            i: returnAnnotation.i,
                            t: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(one.t), $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(two.t), $mdgriffith$elm_codegen$Internal$Compiler$nodify(returnAnnotation.t))))
                        });
                    }
                }(),
                f: $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression({
                    W: _List_fromArray([
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(one.c)),
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(two.c))
                    ]),
                    f: $mdgriffith$elm_codegen$Internal$Compiler$nodify(_return.f)
                }),
                g: _return.g
            };
        });
    }, $mdgriffith$elm_codegen$Elm$fn2_fn_unwrapped = function (_v0, _v1, toExpression) {
        var oneBaseName = _v0.a;
        var maybeOneType = _v0.b;
        var twoBaseName = _v1.a;
        var maybeTwoType = _v1.b;
        return $mdgriffith$elm_codegen$Internal$Compiler$expression(function (index) {
            var one = $mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType_fn(index, oneBaseName, maybeOneType);
            var two = $mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType_fn(one.h, twoBaseName, maybeTwoType);
            var _v2 = $mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails_fn(two.h, toExpression(one.u, two.u));
            var newIndex_ = _v2.a;
            var _return = _v2.b;
            return {
                a: function () {
                    var _v3 = _return.a;
                    if (_v3.$ === 1) {
                        var err = _v3.a;
                        return _return.a;
                    }
                    else {
                        var returnAnnotation = _v3.a;
                        return $elm$core$Result$Ok({
                            av: returnAnnotation.av,
                            i: returnAnnotation.i,
                            t: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(one.t), $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(two.t), $mdgriffith$elm_codegen$Internal$Compiler$nodify(returnAnnotation.t))))
                        });
                    }
                }(),
                f: $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression({
                    W: _List_fromArray([
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(one.c)),
                        $mdgriffith$elm_codegen$Internal$Compiler$nodify($stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(two.c))
                    ]),
                    f: $mdgriffith$elm_codegen$Internal$Compiler$nodify(_return.f)
                }),
                g: _return.g
            };
        });
    }, $mdgriffith$elm_codegen$Elm$fn2 = F3($mdgriffith$elm_codegen$Elm$fn2_fn);
    var $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr = function (a) {
        return { $: 19, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$MismatchedList_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_codegen$Internal$Compiler$MismatchedList = F2($mdgriffith$elm_codegen$Internal$Compiler$MismatchedList_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$unifyHelper_fn = function (exps, existing) {
        unifyHelper: while (true) {
            if (!exps.b) {
                return $elm$core$Result$Ok(existing);
            }
            else {
                var top = exps.a;
                var remain = exps.b;
                var _v1 = top.a;
                if (!_v1.$) {
                    var ann = _v1.a;
                    var _v2 = $mdgriffith$elm_codegen$Internal$Compiler$unifiable_fn(ann.av, ann.i, ann.t, existing.t);
                    if (_v2.b.$ === 1) {
                        var err = _v2.b.a;
                        return $elm$core$Result$Err(_List_fromArray([
                            $mdgriffith$elm_codegen$Internal$Compiler$MismatchedList_fn(ann.t, existing.t)
                        ]));
                    }
                    else {
                        var cache = _v2.a;
                        var _new = _v2.b.a;
                        var $temp$exps = remain, $temp$existing = {
                            av: existing.av,
                            i: $mdgriffith$elm_codegen$Internal$Compiler$mergeInferences_fn(existing.i, cache),
                            t: _new
                        };
                        exps = $temp$exps;
                        existing = $temp$existing;
                        continue unifyHelper;
                    }
                }
                else {
                    var err = _v1.a;
                    return $elm$core$Result$Err(err);
                }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$unifyHelper = F2($mdgriffith$elm_codegen$Internal$Compiler$unifyHelper_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$unify = function (exps) {
        if (!exps.b) {
            return $elm$core$Result$Ok({
                av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
                i: $elm$core$Dict$empty,
                t: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType("a")
            });
        }
        else {
            var top = exps.a;
            var remain = exps.b;
            var _v1 = top.a;
            if (!_v1.$) {
                var ann = _v1.a;
                return $mdgriffith$elm_codegen$Internal$Compiler$unifyHelper_fn(remain, ann);
            }
            else {
                var err = _v1.a;
                return $elm$core$Result$Err(err);
            }
        }
    };
    var $mdgriffith$elm_codegen$Elm$list = function (exprs) {
        return $mdgriffith$elm_codegen$Internal$Compiler$expression(function (index) {
            var exprDetails = $mdgriffith$elm_codegen$Internal$Compiler$thread_fn(index, exprs);
            return {
                a: $elm$core$Result$map_fn(function (inner) {
                    return {
                        av: inner.av,
                        i: inner.i,
                        t: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(_Utils_Tuple2(_List_Nil, "List")), _List_fromArray([
                            $mdgriffith$elm_codegen$Internal$Compiler$nodify(inner.t)
                        ]))
                    };
                }, $mdgriffith$elm_codegen$Internal$Compiler$unify(exprDetails)),
                f: $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr($elm$core$List$map_fn(A2($elm$core$Basics$composeR, function ($) {
                    return $.f;
                }, $mdgriffith$elm_codegen$Internal$Compiler$nodify), exprDetails)),
                g: $elm$core$List$concatMap_fn($mdgriffith$elm_codegen$Internal$Compiler$getImports, exprDetails)
            };
        });
    };
    var $elm$core$Tuple$pair_fn = function (a, b) {
        return _Utils_Tuple2(a, b);
    }, $elm$core$Tuple$pair = F2($elm$core$Tuple$pair_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$DuplicateFieldInRecord = function (a) {
        return { $: 5, a: a };
    };
    var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr = function (a) {
        return { $: 18, a: a };
    };
    var $mdgriffith$elm_codegen$Elm$record = function (fields) {
        return $mdgriffith$elm_codegen$Internal$Compiler$expression(function (index) {
            var unified = $elm$core$List$foldl_fn_unwrapped(function (_v4, found) {
                var unformattedFieldName = _v4.a;
                var fieldExpression = _v4.b;
                var fieldName = $mdgriffith$elm_codegen$Internal$Format$formatValue(unformattedFieldName);
                var _v5 = $mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails_fn(found.h, fieldExpression);
                var newIndex = _v5.a;
                var exp = _v5.b;
                return {
                    ac: function () {
                        if ($elm$core$Set$member_fn(fieldName, found.aX)) {
                            return _List_Cons($mdgriffith$elm_codegen$Internal$Compiler$DuplicateFieldInRecord(fieldName), found.ac);
                        }
                        else {
                            var _v6 = exp.a;
                            if (_v6.$ === 1) {
                                if (!_v6.a.b) {
                                    return found.ac;
                                }
                                else {
                                    var errs = _v6.a;
                                    return _Utils_ap(errs, found.ac);
                                }
                            }
                            else {
                                var ann = _v6.a;
                                return found.ac;
                            }
                        }
                    }(),
                    ad: function () {
                        var _v7 = exp.a;
                        if (_v7.$ === 1) {
                            var err = _v7.a;
                            return found.ad;
                        }
                        else {
                            var ann = _v7.a;
                            return _List_Cons(_Utils_Tuple2($mdgriffith$elm_codegen$Internal$Format$formatValue(fieldName), ann), found.ad);
                        }
                    }(),
                    aS: _List_Cons(_Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldName), $mdgriffith$elm_codegen$Internal$Compiler$nodify(exp.f)), found.aS),
                    g: _Utils_ap(exp.g, found.g),
                    h: newIndex,
                    aX: $elm$core$Set$insert_fn(fieldName, found.aX)
                };
            }, { ac: _List_Nil, ad: _List_Nil, aS: _List_Nil, g: _List_Nil, h: index, aX: $elm$core$Set$empty }, fields);
            return {
                a: function () {
                    var _v0 = unified.ac;
                    if (!_v0.b) {
                        return $elm$core$Result$Ok({
                            av: $elm$core$List$foldl_fn_unwrapped(function (_v1, gathered) {
                                var name = _v1.a;
                                var ann = _v1.b;
                                return $elm$core$Dict$union_fn(ann.av, gathered);
                            }, $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, unified.ad),
                            i: $elm$core$List$foldl_fn_unwrapped(function (_v2, gathered) {
                                var name = _v2.a;
                                var ann = _v2.b;
                                return $mdgriffith$elm_codegen$Internal$Compiler$mergeInferences_fn(ann.i, gathered);
                            }, $elm$core$Dict$empty, unified.ad),
                            t: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0, $elm$core$List$map_fn(function (_v3) {
                                var name = _v3.a;
                                var ann = _v3.b;
                                return _Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$nodify(name), $mdgriffith$elm_codegen$Internal$Compiler$nodify(ann.t));
                            }, $elm$core$List$reverse(unified.ad))))
                        });
                    }
                    else {
                        var errs = _v0;
                        return $elm$core$Result$Err(errs);
                    }
                }(),
                f: $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr($elm$core$List$map_fn($mdgriffith$elm_codegen$Internal$Compiler$nodifyAll_a0, $elm$core$List$reverse(unified.aS))),
                g: unified.g
            };
        });
    };
    var $stil4m$elm_syntax$Elm$Syntax$Expression$Literal = function (a) {
        return { $: 11, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Types$string = $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed_fn($mdgriffith$elm_codegen$Internal$Types$nodify(_Utils_Tuple2(_List_Nil, "String")), _List_Nil);
    var $mdgriffith$elm_codegen$Elm$string = function (literal) {
        return function (_v0) {
            return {
                a: $elm$core$Result$Ok({ av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, i: $elm$core$Dict$empty, t: $mdgriffith$elm_codegen$Internal$Types$string }),
                f: $stil4m$elm_syntax$Elm$Syntax$Expression$Literal(literal),
                g: _List_Nil
            };
        };
    };
    var $author$project$Gen$Ui$Font$font = function (fontArg) {
        return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
            a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
                    _Utils_Tuple2("name", $mdgriffith$elm_codegen$Elm$Annotation$string),
                    _Utils_Tuple2("fallback", $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui", "Font"]), "Font", _List_Nil))),
                    _Utils_Tuple2("variants", $mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui", "Font"]), "Variant", _List_Nil))),
                    _Utils_Tuple2("weight", $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui", "Font"]), "Weight", _List_Nil)),
                    _Utils_Tuple2("size", $mdgriffith$elm_codegen$Elm$Annotation$int)
                ]))
            ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
            ])))),
            b: _List_fromArray(["Ui", "Font"]),
            c: "font"
        }), _List_fromArray([
            $mdgriffith$elm_codegen$Elm$record(_List_fromArray([
                $elm$core$Tuple$pair_fn("name", $mdgriffith$elm_codegen$Elm$string(fontArg.c)),
                $elm$core$Tuple$pair_fn("fallback", $mdgriffith$elm_codegen$Elm$list(fontArg.eG)),
                $elm$core$Tuple$pair_fn("variants", $mdgriffith$elm_codegen$Elm$list(fontArg.bI)),
                $elm$core$Tuple$pair_fn("weight", fontArg.a4),
                $elm$core$Tuple$pair_fn("size", $mdgriffith$elm_codegen$Elm$int(fontArg.bu))
            ]))
        ]));
    };
    var $author$project$Gen$Ui$rgb_fn = function (rgbArg, rgbArg0, rgbArg1) {
        return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
            a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Color", _List_Nil))),
            b: _List_fromArray(["Ui"]),
            c: "rgb"
        }), _List_fromArray([
            $mdgriffith$elm_codegen$Elm$int(rgbArg),
            $mdgriffith$elm_codegen$Elm$int(rgbArg0),
            $mdgriffith$elm_codegen$Elm$int(rgbArg1)
        ]));
    }, $author$project$Gen$Ui$rgb = F3($author$project$Gen$Ui$rgb_fn);
    var $author$project$Theme$Generate$Ui$toColor = function (_v0) {
        var r = _v0.a;
        var g = _v0.b;
        var b = _v0.c;
        return $author$project$Gen$Ui$rgb_fn(r, g, b);
    };
    var $author$project$Theme$Generate$Ui$field_fn = function (named, toVal) {
        return _Utils_Tuple2($author$project$Theme$nameToString(named.c), toVal(named.eX));
    }, $author$project$Theme$Generate$Ui$field = F2($author$project$Theme$Generate$Ui$field_fn);
    var $author$project$Theme$Generate$Ui$toFields_fn = function (toExp, fields) {
        return $elm$core$List$map_fn(function (item) {
            return $author$project$Theme$Generate$Ui$field_fn(item, toExp);
        }, fields);
    }, $author$project$Theme$Generate$Ui$toFields = F2($author$project$Theme$Generate$Ui$toFields_fn);
    var $author$project$Theme$Generate$Ui$generateColors = function (theme) {
        return $mdgriffith$elm_codegen$Elm$file_fn(_List_fromArray(["Ui", "Theme", "Color"]), $elm$core$List$map_fn(function (_v0) {
            var name = _v0.a;
            var val = _v0.b;
            return $mdgriffith$elm_codegen$Elm$expose($mdgriffith$elm_codegen$Elm$declaration_fn(name, val));
        }, $author$project$Theme$Generate$Ui$toFields_fn($author$project$Theme$Generate$Ui$toColor, theme.b0)));
    };
    var $author$project$Gen$Ui$palette = function (paletteArg) {
        return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
            a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
                    _Utils_Tuple2("background", $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Color", _List_Nil)),
                    _Utils_Tuple2("border", $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Color", _List_Nil)),
                    _Utils_Tuple2("font", $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Color", _List_Nil))
                ]))
            ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
            ])))),
            b: _List_fromArray(["Ui"]),
            c: "palette"
        }), _List_fromArray([
            $mdgriffith$elm_codegen$Elm$record(_List_fromArray([
                $elm$core$Tuple$pair_fn("background", paletteArg.aM),
                $elm$core$Tuple$pair_fn("border", paletteArg.a8),
                $elm$core$Tuple$pair_fn("font", paletteArg.eJ)
            ]))
        ]));
    };
    var $author$project$Theme$Generate$Ui$generatePalettes = function (theme) {
        return $mdgriffith$elm_codegen$Elm$file_fn(_List_fromArray(["Ui", "Theme", "Palette"]), $elm$core$List$map_fn(function (_v0) {
            var name = _v0.c;
            var item = _v0.eX;
            return $mdgriffith$elm_codegen$Elm$expose($mdgriffith$elm_codegen$Elm$declaration_fn($author$project$Theme$nameToString(name), $author$project$Gen$Ui$palette({
                aM: $author$project$Theme$Generate$Ui$toColor(item.aM),
                a8: $author$project$Theme$Generate$Ui$toColor(item.a8),
                eJ: $author$project$Theme$Generate$Ui$toColor(item.eK)
            })));
        }, theme.fm));
    };
    var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess_fn = function (a, b) {
        return { $: 20, a: a, b: b };
    }, $stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess = F2($stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$AttemptingGetOnTypeNameNotAnAlias = function (a) {
        return { $: 9, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$AttemptingToGetOnIncorrectType = function (a) {
        return { $: 8, a: a };
    };
    var $mdgriffith$elm_codegen$Internal$Compiler$getFieldFromList_fn = function (selector, fields) {
        getFieldFromList: while (true) {
            if (!fields.b) {
                return $elm$core$Maybe$Nothing;
            }
            else {
                var nodifiedTop = fields.a;
                var remain = fields.b;
                var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$denode(nodifiedTop);
                var fieldname = _v1.a;
                var contents = _v1.b;
                if (_Utils_eq($mdgriffith$elm_codegen$Internal$Compiler$denode(fieldname), selector)) {
                    return $elm$core$Maybe$Just($mdgriffith$elm_codegen$Internal$Compiler$denode(contents));
                }
                else {
                    var $temp$selector = selector, $temp$fields = remain;
                    selector = $temp$selector;
                    fields = $temp$fields;
                    continue getFieldFromList;
                }
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$getFieldFromList = F2($mdgriffith$elm_codegen$Internal$Compiler$getFieldFromList_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$inferRecordField_fn = function (index, _v0) {
        var nameOfRecord = _v0.c$;
        var fieldName = _v0.ch;
        var fieldType = $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType($mdgriffith$elm_codegen$Internal$Format$formatValue(_Utils_ap(fieldName, $mdgriffith$elm_codegen$Internal$Index$indexToString(index))));
        return $elm$core$Result$Ok({
            av: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
            i: $mdgriffith$elm_codegen$Internal$Compiler$addInference_fn(nameOfRecord, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(nameOfRecord), $mdgriffith$elm_codegen$Internal$Compiler$nodify(_List_fromArray([
                $mdgriffith$elm_codegen$Internal$Compiler$nodify(_Utils_Tuple2($mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldName), $mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldType)))
            ]))), $elm$core$Dict$empty),
            t: fieldType
        });
    }, $mdgriffith$elm_codegen$Internal$Compiler$inferRecordField = F2($mdgriffith$elm_codegen$Internal$Compiler$inferRecordField_fn);
    var $mdgriffith$elm_codegen$Internal$Compiler$resolveField_fn = function (index, type_, aliases, inferences, fieldName) {
        resolveField: while (true) {
            if ($mdgriffith$elm_codegen$Internal$Index$typecheck(index)) {
                switch (type_.$) {
                    case 4:
                        var fields = type_.a;
                        var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$getFieldFromList_fn(fieldName, fields);
                        if (!_v1.$) {
                            var ann = _v1.a;
                            return $elm$core$Result$Ok({ av: aliases, i: inferences, t: ann });
                        }
                        else {
                            return $elm$core$Result$Err(_List_fromArray([
                                $mdgriffith$elm_codegen$Internal$Compiler$CouldNotFindField({
                                    eB: $elm$core$List$map_fn(A2($elm$core$Basics$composeR, $mdgriffith$elm_codegen$Internal$Compiler$denode, A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $mdgriffith$elm_codegen$Internal$Compiler$denode)), fields),
                                    S: fieldName
                                })
                            ]));
                        }
                    case 5:
                        var name = type_.a;
                        var fields = type_.b;
                        var _v2 = $mdgriffith$elm_codegen$Internal$Compiler$getFieldFromList_fn(fieldName, $mdgriffith$elm_codegen$Internal$Compiler$denode(fields));
                        if (!_v2.$) {
                            var ann = _v2.a;
                            return $elm$core$Result$Ok({ av: aliases, i: inferences, t: ann });
                        }
                        else {
                            return $elm$core$Result$Err(_List_fromArray([
                                $mdgriffith$elm_codegen$Internal$Compiler$CouldNotFindField({
                                    eB: $elm$core$List$map_fn(A2($elm$core$Basics$composeR, $mdgriffith$elm_codegen$Internal$Compiler$denode, A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $mdgriffith$elm_codegen$Internal$Compiler$denode)), $mdgriffith$elm_codegen$Internal$Compiler$denode(fields)),
                                    S: fieldName
                                })
                            ]));
                        }
                    case 0:
                        var nameOfRecord = type_.a;
                        return $mdgriffith$elm_codegen$Internal$Compiler$inferRecordField_fn(index, { ch: fieldName, c$: nameOfRecord });
                    case 1:
                        var nodedModAndName = type_.a;
                        var vars = type_.b;
                        var _v3 = $mdgriffith$elm_codegen$Internal$Compiler$getAlias_fn(nodedModAndName, aliases);
                        if (_v3.$ === 1) {
                            return $elm$core$Result$Err(_List_fromArray([
                                $mdgriffith$elm_codegen$Internal$Compiler$AttemptingGetOnTypeNameNotAnAlias({ S: fieldName, aq: type_ })
                            ]));
                        }
                        else {
                            var aliased = _v3.a;
                            var $temp$index = index, $temp$type_ = aliased.aF, $temp$aliases = aliases, $temp$inferences = inferences, $temp$fieldName = fieldName;
                            index = $temp$index;
                            type_ = $temp$type_;
                            aliases = $temp$aliases;
                            inferences = $temp$inferences;
                            fieldName = $temp$fieldName;
                            continue resolveField;
                        }
                    case 3:
                        return $elm$core$Result$Err(_List_fromArray([
                            $mdgriffith$elm_codegen$Internal$Compiler$AttemptingToGetOnIncorrectType({ S: fieldName, aq: type_ })
                        ]));
                    case 2:
                        return $elm$core$Result$Err(_List_fromArray([
                            $mdgriffith$elm_codegen$Internal$Compiler$AttemptingToGetOnIncorrectType({ S: fieldName, aq: type_ })
                        ]));
                    default:
                        return $elm$core$Result$Err(_List_fromArray([
                            $mdgriffith$elm_codegen$Internal$Compiler$AttemptingToGetOnIncorrectType({ S: fieldName, aq: type_ })
                        ]));
                }
            }
            else {
                return $elm$core$Result$Err(_List_Nil);
            }
        }
    }, $mdgriffith$elm_codegen$Internal$Compiler$resolveField = F5($mdgriffith$elm_codegen$Internal$Compiler$resolveField_fn);
    var $mdgriffith$elm_codegen$Elm$get_fn = function (unformattedFieldName, recordExpression) {
        return function (index) {
            var fieldName = $mdgriffith$elm_codegen$Internal$Format$formatValue(unformattedFieldName);
            var _v0 = $mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails_fn(index, recordExpression);
            var expr = _v0.b;
            return {
                a: function () {
                    var _v1 = expr.a;
                    if (!_v1.$) {
                        var recordAnn = _v1.a;
                        return $mdgriffith$elm_codegen$Internal$Compiler$resolveField_fn(index, recordAnn.t, recordAnn.av, recordAnn.i, fieldName);
                    }
                    else {
                        var otherwise = _v1;
                        return otherwise;
                    }
                }(),
                f: $stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess_fn($mdgriffith$elm_codegen$Internal$Compiler$nodify(expr.f), $mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldName)),
                g: expr.g
            };
        };
    }, $mdgriffith$elm_codegen$Elm$get = F2($mdgriffith$elm_codegen$Elm$get_fn);
    var $author$project$Gen$Ui$make_ = {
        b8: function (edges_args) {
            return $mdgriffith$elm_codegen$Elm$withType_fn($mdgriffith$elm_codegen$Elm$Annotation$alias_fn(_List_fromArray(["Ui"]), "Edges", _List_Nil, $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
                _Utils_Tuple2("top", $mdgriffith$elm_codegen$Elm$Annotation$int),
                _Utils_Tuple2("right", $mdgriffith$elm_codegen$Elm$Annotation$int),
                _Utils_Tuple2("bottom", $mdgriffith$elm_codegen$Elm$Annotation$int),
                _Utils_Tuple2("left", $mdgriffith$elm_codegen$Elm$Annotation$int)
            ]))), $mdgriffith$elm_codegen$Elm$record(_List_fromArray([
                $elm$core$Tuple$pair_fn("top", edges_args.fG),
                $elm$core$Tuple$pair_fn("right", edges_args.br),
                $elm$core$Tuple$pair_fn("bottom", edges_args.ed),
                $elm$core$Tuple$pair_fn("left", edges_args.bk)
            ])));
        },
        df: function (position_args) {
            return $mdgriffith$elm_codegen$Elm$withType_fn($mdgriffith$elm_codegen$Elm$Annotation$alias_fn(_List_fromArray(["Ui"]), "Position", _List_Nil, $mdgriffith$elm_codegen$Elm$Annotation$record(_List_fromArray([
                _Utils_Tuple2("x", $mdgriffith$elm_codegen$Elm$Annotation$int),
                _Utils_Tuple2("y", $mdgriffith$elm_codegen$Elm$Annotation$int),
                _Utils_Tuple2("z", $mdgriffith$elm_codegen$Elm$Annotation$int)
            ]))), $mdgriffith$elm_codegen$Elm$record(_List_fromArray([
                $elm$core$Tuple$pair_fn("x", position_args.fR),
                $elm$core$Tuple$pair_fn("y", position_args.fS),
                $elm$core$Tuple$pair_fn("z", position_args.fT)
            ])));
        }
    };
    var $author$project$Gen$Ui$padding = function (paddingArg) {
        return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
            a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
            ])))),
            b: _List_fromArray(["Ui"]),
            c: "padding"
        }), _List_fromArray([
            $mdgriffith$elm_codegen$Elm$int(paddingArg)
        ]));
    };
    var $author$project$Gen$Ui$paddingWith = function (paddingWithArg) {
        return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
            a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Edges", _List_Nil)
            ]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
            ])))),
            b: _List_fromArray(["Ui"]),
            c: "paddingWith"
        }), _List_fromArray([paddingWithArg]));
    };
    var $author$project$Gen$Ui$Font$regular = $mdgriffith$elm_codegen$Elm$value({
        a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui", "Font"]), "Weight", _List_Nil)),
        b: _List_fromArray(["Ui", "Font"]),
        c: "regular"
    });
    var $author$project$Gen$Ui$Font$serif = $mdgriffith$elm_codegen$Elm$value({
        a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui", "Font"]), "Font", _List_Nil)),
        b: _List_fromArray(["Ui", "Font"]),
        c: "serif"
    });
    var $author$project$Gen$Ui$spacing = function (spacingArg) {
        return $mdgriffith$elm_codegen$Elm$apply_fn($mdgriffith$elm_codegen$Elm$value({
            a: $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$function_fn(_List_fromArray([$mdgriffith$elm_codegen$Elm$Annotation$int]), $mdgriffith$elm_codegen$Elm$Annotation$namedWith_fn(_List_fromArray(["Ui"]), "Attribute", _List_fromArray([
                $mdgriffith$elm_codegen$Elm$Annotation$var("msg")
            ])))),
            b: _List_fromArray(["Ui"]),
            c: "spacing"
        }), _List_fromArray([
            $mdgriffith$elm_codegen$Elm$int(spacingArg)
        ]));
    };
    var $mdgriffith$elm_codegen$Elm$val = function (name) {
        return $mdgriffith$elm_codegen$Elm$value({ a: $elm$core$Maybe$Nothing, b: _List_Nil, c: name });
    };
    var $author$project$Theme$Generate$Ui$generate = function (theme) {
        return _List_fromArray([
            $author$project$Theme$Generate$Ui$generateColors(theme),
            $author$project$Theme$Generate$Ui$generatePalettes(theme),
            $mdgriffith$elm_codegen$Elm$file_fn(_List_fromArray(["Ui", "Theme"]), $elm$core$List$concat(_List_fromArray([
                _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$expose($mdgriffith$elm_codegen$Elm$declaration_fn("layout", $mdgriffith$elm_codegen$Elm$fn2_fn_unwrapped(_Utils_Tuple2("attrs", $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$list($author$project$Gen$Ui$annotation_.d9($mdgriffith$elm_codegen$Elm$Annotation$var("msg"))))), _Utils_Tuple2("body", $elm$core$Maybe$Nothing), function (attrs, body) {
                        return A2($author$project$Gen$Ui$call_.cM, $mdgriffith$elm_codegen$Elm$Op$applyInfix_fn($mdgriffith$elm_codegen$Elm$Op$cons_a0, $mdgriffith$elm_codegen$Elm$Op$cons_a1, $mdgriffith$elm_codegen$Elm$Op$cons_a2, $mdgriffith$elm_codegen$Elm$get_fn("default", $mdgriffith$elm_codegen$Elm$val("font")), attrs), body);
                    })))
                ]),
                $elm$core$List$filterMap_fn(function (typeface) {
                    var name = $author$project$Theme$nameToString(typeface.c);
                    return $elm$core$List$member_fn(name, _List_fromArray(["h1", "h2", "h3", "h4", "h5", "h6"])) ? $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$expose($mdgriffith$elm_codegen$Elm$declaration_fn(name, $mdgriffith$elm_codegen$Elm$fn2_fn_unwrapped(_Utils_Tuple2("attrs", $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$list($author$project$Gen$Ui$annotation_.d9($mdgriffith$elm_codegen$Elm$Annotation$var("msg"))))), _Utils_Tuple2("label", $elm$core$Maybe$Just($mdgriffith$elm_codegen$Elm$Annotation$string)), function (attrs, label) {
                        return A2($author$project$Gen$Ui$call_.b9, $mdgriffith$elm_codegen$Elm$Op$applyInfix_fn($mdgriffith$elm_codegen$Elm$Op$cons_a0, $mdgriffith$elm_codegen$Elm$Op$cons_a1, $mdgriffith$elm_codegen$Elm$Op$cons_a2, $mdgriffith$elm_codegen$Elm$get_fn(name, $mdgriffith$elm_codegen$Elm$val("font")), attrs), $author$project$Gen$Ui$call_.dO(label));
                    })))) : $elm$core$Maybe$Nothing;
                }, theme.fJ),
                _List_fromArray([
                    $mdgriffith$elm_codegen$Elm$expose($mdgriffith$elm_codegen$Elm$declaration_fn("font", $mdgriffith$elm_codegen$Elm$record($author$project$Theme$Generate$Ui$toFields_fn(function (typeface) {
                        return $author$project$Gen$Ui$Font$font({
                            eG: _List_fromArray([$author$project$Gen$Ui$Font$serif]),
                            c: typeface.eF,
                            bu: typeface.bu,
                            bI: _List_Nil,
                            a4: (typeface.a4 === 400) ? $author$project$Gen$Ui$Font$regular : $author$project$Gen$Ui$Font$bold
                        });
                    }, theme.fJ)))),
                    $mdgriffith$elm_codegen$Elm$expose($mdgriffith$elm_codegen$Elm$declaration_fn("border", $mdgriffith$elm_codegen$Elm$record($author$project$Theme$Generate$Ui$toFields_fn(function (border) {
                        return $author$project$Gen$Ui$border(border.bK);
                    }, theme.ec)))),
                    $mdgriffith$elm_codegen$Elm$expose($mdgriffith$elm_codegen$Elm$declaration_fn("spacing", $mdgriffith$elm_codegen$Elm$record($author$project$Theme$Generate$Ui$toFields_fn(A2($elm$core$Basics$composeL, $author$project$Theme$Generate$Ui$attr, $author$project$Gen$Ui$spacing), theme.dF)))),
                    $mdgriffith$elm_codegen$Elm$expose($mdgriffith$elm_codegen$Elm$declaration_fn("padding", $mdgriffith$elm_codegen$Elm$record(_Utils_ap($author$project$Theme$Generate$Ui$toFields_fn(A2($elm$core$Basics$composeL, $author$project$Theme$Generate$Ui$attr, $author$project$Gen$Ui$padding), theme.dF), _List_fromArray([
                        _Utils_Tuple2("xy", $mdgriffith$elm_codegen$Elm$record($author$project$Theme$Generate$Ui$toFields_fn(function (spacingX) {
                            return $mdgriffith$elm_codegen$Elm$record($author$project$Theme$Generate$Ui$toFields_fn(function (spacingY) {
                                return $author$project$Theme$Generate$Ui$attr($author$project$Gen$Ui$paddingWith($author$project$Gen$Ui$make_.b8({
                                    ed: $mdgriffith$elm_codegen$Elm$int(spacingY),
                                    bk: $mdgriffith$elm_codegen$Elm$int(spacingX),
                                    br: $mdgriffith$elm_codegen$Elm$int(spacingX),
                                    fG: $mdgriffith$elm_codegen$Elm$int(spacingY)
                                })));
                            }, theme.dF));
                        }, theme.dF)))
                    ])))))
                ])
            ])))
        ]);
    };
    var $author$project$Theme$Generate$generate = function (theme) {
        return $author$project$Theme$Generate$Ui$generate(theme);
    };
    var $elm$json$Json$Decode$value = _Json_decodeValue;
    var $author$project$Generate$main = $author$project$Gen$CodeGen$Generate$fromJson_fn($author$project$Theme$Decoder$decode, $author$project$Theme$Generate$generate);
    _Platform_export({ "Generate": { "init": $author$project$Generate$main($elm$json$Json$Decode$value)(0) } });
}(this));
