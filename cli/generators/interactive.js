(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
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
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
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

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
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

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
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


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$append = _Utils_append;
var $author$project$Options$Options = F3(
	function (output, project, viewers) {
		return {output: output, project: project, viewers: viewers};
	});
var $elm$project_metadata_utils$Elm$Docs$Module = F6(
	function (name, comment, unions, aliases, values, binops) {
		return {aliases: aliases, binops: binops, comment: comment, name: name, unions: unions, values: values};
	});
var $elm$project_metadata_utils$Elm$Docs$Alias = F4(
	function (name, comment, args, tipe) {
		return {args: args, comment: comment, name: name, tipe: tipe};
	});
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
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
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Forbidden = {$: 'Forbidden'};
var $elm$project_metadata_utils$Elm$Type$Lambda = F2(
	function (a, b) {
		return {$: 'Lambda', a: a, b: b};
	});
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$project_metadata_utils$Elm$Type$Record = F2(
	function (a, b) {
		return {$: 'Record', a: a, b: b};
	});
var $elm$project_metadata_utils$Elm$Type$Type = F2(
	function (a, b) {
		return {$: 'Type', a: a, b: b};
	});
var $elm$project_metadata_utils$Elm$Type$Var = function (a) {
	return {$: 'Var', a: a};
};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$core$String$isEmpty = function (string) {
	return string === '';
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
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $elm$project_metadata_utils$Elm$Type$arrow = $elm$parser$Parser$symbol('->');
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0.a;
	return $elm$parser$Parser$Advanced$Parser(
		function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 'Bad') {
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, false, x);
			} else {
				var a = _v1.b;
				var s1 = _v1.c;
				return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
			}
		});
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $elm$project_metadata_utils$Elm$Type$comma = $elm$parser$Parser$symbol(',');
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$project_metadata_utils$Elm$Type$isInnerVarChar = function (_char) {
	return $elm$core$Char$isAlphaNum(_char) || _Utils_eq(
		_char,
		_Utils_chr('_'));
};
var $elm$parser$Parser$ExpectingVariable = {$: 'ExpectingVariable'};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$core$String$slice = _String_slice;
var $elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {col: col, context: context, indent: indent, offset: offset, row: row, src: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$variable = function (i) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var firstOffset = A3($elm$parser$Parser$Advanced$isSubChar, i.start, s.offset, s.src);
			if (_Utils_eq(firstOffset, -1)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, i.expecting));
			} else {
				var s1 = _Utils_eq(firstOffset, -2) ? A7($elm$parser$Parser$Advanced$varHelp, i.inner, s.offset + 1, s.row + 1, 1, s.src, s.indent, s.context) : A7($elm$parser$Parser$Advanced$varHelp, i.inner, firstOffset, s.row, s.col + 1, s.src, s.indent, s.context);
				var name = A3($elm$core$String$slice, s.offset, s1.offset, s.src);
				return A2($elm$core$Set$member, name, i.reserved) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, i.expecting)) : A3($elm$parser$Parser$Advanced$Good, true, name, s1);
			}
		});
};
var $elm$parser$Parser$variable = function (i) {
	return $elm$parser$Parser$Advanced$variable(
		{expecting: $elm$parser$Parser$ExpectingVariable, inner: i.inner, reserved: i.reserved, start: i.start});
};
var $elm$project_metadata_utils$Elm$Type$var = function (isFirst) {
	return $elm$parser$Parser$variable(
		{inner: $elm$project_metadata_utils$Elm$Type$isInnerVarChar, reserved: $elm$core$Set$empty, start: isFirst});
};
var $elm$project_metadata_utils$Elm$Type$lowVar = $elm$project_metadata_utils$Elm$Type$var($elm$core$Char$isLower);
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$project_metadata_utils$Elm$Type$spaces = $elm$parser$Parser$chompWhile(
	function (_char) {
		return _Utils_eq(
			_char,
			_Utils_chr(' '));
	});
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$project_metadata_utils$Elm$Type$extension = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($elm$core$Maybe$Just),
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$backtrackable($elm$project_metadata_utils$Elm$Type$lowVar),
						$elm$parser$Parser$backtrackable($elm$project_metadata_utils$Elm$Type$spaces)),
					$elm$parser$Parser$symbol('|')),
				$elm$project_metadata_utils$Elm$Type$spaces)),
			$elm$parser$Parser$succeed($elm$core$Maybe$Nothing)
		]));
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = thunk(_Utils_Tuple0);
			var parse = _v0.a;
			return parse(s);
		});
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$project_metadata_utils$Elm$Type$capVar = $elm$project_metadata_utils$Elm$Type$var($elm$core$Char$isUpper);
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$project_metadata_utils$Elm$Type$qualifiedCapVarHelp = function (_v0) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						$elm$parser$Parser$Loop(_Utils_Tuple0)),
					$elm$parser$Parser$symbol('.')),
				$elm$project_metadata_utils$Elm$Type$capVar),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(_Utils_Tuple0))
			]));
};
var $elm$project_metadata_utils$Elm$Type$qualifiedCapVar = $elm$parser$Parser$getChompedString(
	A2(
		$elm$parser$Parser$ignorer,
		$elm$project_metadata_utils$Elm$Type$capVar,
		A2($elm$parser$Parser$loop, _Utils_Tuple0, $elm$project_metadata_utils$Elm$Type$qualifiedCapVarHelp)));
var $elm$parser$Parser$Advanced$revAlways = F2(
	function (_v0, b) {
		return b;
	});
var $elm$parser$Parser$Advanced$skip = F2(
	function (iParser, kParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$parser$Parser$Advanced$revAlways, iParser, kParser);
	});
var $elm$parser$Parser$Advanced$sequenceEndForbidden = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				$elm$parser$Parser$Advanced$sequenceEndForbidden,
				ender,
				ws,
				parseItem,
				sep,
				A2($elm$core$List$cons, item, revItems));
		};
		return A2(
			$elm$parser$Parser$Advanced$skip,
			ws,
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								$elm$parser$Parser$Advanced$map,
								function (item) {
									return $elm$parser$Parser$Advanced$Loop(
										A2($elm$core$List$cons, item, revItems));
								},
								parseItem))),
						A2(
						$elm$parser$Parser$Advanced$map,
						function (_v0) {
							return $elm$parser$Parser$Advanced$Done(
								$elm$core$List$reverse(revItems));
						},
						ender)
					])));
	});
var $elm$parser$Parser$Advanced$sequenceEndMandatory = F4(
	function (ws, parseItem, sep, revItems) {
		return $elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$Advanced$map,
					function (item) {
						return $elm$parser$Parser$Advanced$Loop(
							A2($elm$core$List$cons, item, revItems));
					},
					A2(
						$elm$parser$Parser$Advanced$ignorer,
						parseItem,
						A2(
							$elm$parser$Parser$Advanced$ignorer,
							ws,
							A2($elm$parser$Parser$Advanced$ignorer, sep, ws)))),
					A2(
					$elm$parser$Parser$Advanced$map,
					function (_v0) {
						return $elm$parser$Parser$Advanced$Done(
							$elm$core$List$reverse(revItems));
					},
					$elm$parser$Parser$Advanced$succeed(_Utils_Tuple0))
				]));
	});
var $elm$parser$Parser$Advanced$sequenceEndOptional = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var parseEnd = A2(
			$elm$parser$Parser$Advanced$map,
			function (_v0) {
				return $elm$parser$Parser$Advanced$Done(
					$elm$core$List$reverse(revItems));
			},
			ender);
		return A2(
			$elm$parser$Parser$Advanced$skip,
			ws,
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							$elm$parser$Parser$Advanced$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$Advanced$map,
										function (item) {
											return $elm$parser$Parser$Advanced$Loop(
												A2($elm$core$List$cons, item, revItems));
										},
										parseItem),
										parseEnd
									])))),
						parseEnd
					])));
	});
var $elm$parser$Parser$Advanced$sequenceEnd = F5(
	function (ender, ws, parseItem, sep, trailing) {
		var chompRest = function (item) {
			switch (trailing.$) {
				case 'Forbidden':
					return A2(
						$elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4($elm$parser$Parser$Advanced$sequenceEndForbidden, ender, ws, parseItem, sep));
				case 'Optional':
					return A2(
						$elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4($elm$parser$Parser$Advanced$sequenceEndOptional, ender, ws, parseItem, sep));
				default:
					return A2(
						$elm$parser$Parser$Advanced$ignorer,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								$elm$parser$Parser$Advanced$skip,
								sep,
								A2(
									$elm$parser$Parser$Advanced$skip,
									ws,
									A2(
										$elm$parser$Parser$Advanced$loop,
										_List_fromArray(
											[item]),
										A3($elm$parser$Parser$Advanced$sequenceEndMandatory, ws, parseItem, sep))))),
						ender);
			}
		};
		return $elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2($elm$parser$Parser$Advanced$andThen, chompRest, parseItem),
					A2(
					$elm$parser$Parser$Advanced$map,
					function (_v0) {
						return _List_Nil;
					},
					ender)
				]));
	});
var $elm$parser$Parser$Advanced$sequence = function (i) {
	return A2(
		$elm$parser$Parser$Advanced$skip,
		$elm$parser$Parser$Advanced$token(i.start),
		A2(
			$elm$parser$Parser$Advanced$skip,
			i.spaces,
			A5(
				$elm$parser$Parser$Advanced$sequenceEnd,
				$elm$parser$Parser$Advanced$token(i.end),
				i.spaces,
				i.item,
				$elm$parser$Parser$Advanced$token(i.separator),
				i.trailing)));
};
var $elm$parser$Parser$Advanced$Forbidden = {$: 'Forbidden'};
var $elm$parser$Parser$Advanced$Mandatory = {$: 'Mandatory'};
var $elm$parser$Parser$Advanced$Optional = {$: 'Optional'};
var $elm$parser$Parser$toAdvancedTrailing = function (trailing) {
	switch (trailing.$) {
		case 'Forbidden':
			return $elm$parser$Parser$Advanced$Forbidden;
		case 'Optional':
			return $elm$parser$Parser$Advanced$Optional;
		default:
			return $elm$parser$Parser$Advanced$Mandatory;
	}
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$sequence = function (i) {
	return $elm$parser$Parser$Advanced$sequence(
		{
			end: $elm$parser$Parser$toToken(i.end),
			item: i.item,
			separator: $elm$parser$Parser$toToken(i.separator),
			spaces: i.spaces,
			start: $elm$parser$Parser$toToken(i.start),
			trailing: $elm$parser$Parser$toAdvancedTrailing(i.trailing)
		});
};
var $elm$project_metadata_utils$Elm$Type$Tuple = function (a) {
	return {$: 'Tuple', a: a};
};
var $elm$project_metadata_utils$Elm$Type$tuplize = function (args) {
	if (args.b && (!args.b.b)) {
		var arg = args.a;
		return arg;
	} else {
		return $elm$project_metadata_utils$Elm$Type$Tuple(args);
	}
};
var $elm$project_metadata_utils$Elm$Type$chompArgs = function (revArgs) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$map,
				function (arg) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$List$cons, arg, revArgs));
				},
				A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$backtrackable($elm$project_metadata_utils$Elm$Type$spaces)),
					$elm$project_metadata_utils$Elm$Type$cyclic$term())),
				A2(
				$elm$parser$Parser$map,
				function (_v2) {
					return $elm$parser$Parser$Done(
						$elm$core$List$reverse(revArgs));
				},
				$elm$parser$Parser$succeed(_Utils_Tuple0))
			]));
};
var $elm$project_metadata_utils$Elm$Type$recordEndHelp = function (revFields) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed(
							function (f) {
								return $elm$parser$Parser$Loop(
									A2($elm$core$List$cons, f, revFields));
							}),
						$elm$project_metadata_utils$Elm$Type$comma),
					$elm$project_metadata_utils$Elm$Type$spaces),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$project_metadata_utils$Elm$Type$cyclic$field(),
					$elm$project_metadata_utils$Elm$Type$spaces)),
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					function (_v1) {
						return $elm$parser$Parser$Done(
							$elm$core$List$reverse(revFields));
					}),
				$elm$parser$Parser$symbol('}'))
			]));
};
var $elm$project_metadata_utils$Elm$Type$tipeHelp = function (t) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$map,
				$elm$project_metadata_utils$Elm$Type$Lambda(t),
				$elm$project_metadata_utils$Elm$Type$cyclic$arrowAndType()),
				$elm$parser$Parser$succeed(t)
			]));
};
function $elm$project_metadata_utils$Elm$Type$cyclic$arrowAndType() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$backtrackable($elm$project_metadata_utils$Elm$Type$spaces)),
				$elm$project_metadata_utils$Elm$Type$arrow),
			$elm$project_metadata_utils$Elm$Type$spaces),
		$elm$project_metadata_utils$Elm$Type$cyclic$tipe());
}
function $elm$project_metadata_utils$Elm$Type$cyclic$tipeTerm() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2($elm$parser$Parser$map, $elm$project_metadata_utils$Elm$Type$Var, $elm$project_metadata_utils$Elm$Type$lowVar),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed($elm$project_metadata_utils$Elm$Type$Type),
					$elm$project_metadata_utils$Elm$Type$qualifiedCapVar),
				A2($elm$parser$Parser$loop, _List_Nil, $elm$project_metadata_utils$Elm$Type$chompArgs)),
				$elm$project_metadata_utils$Elm$Type$cyclic$record(),
				$elm$project_metadata_utils$Elm$Type$cyclic$tuple()
			]));
}
function $elm$project_metadata_utils$Elm$Type$cyclic$term() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2($elm$parser$Parser$map, $elm$project_metadata_utils$Elm$Type$Var, $elm$project_metadata_utils$Elm$Type$lowVar),
				A2(
				$elm$parser$Parser$map,
				function (name) {
					return A2($elm$project_metadata_utils$Elm$Type$Type, name, _List_Nil);
				},
				$elm$project_metadata_utils$Elm$Type$qualifiedCapVar),
				$elm$project_metadata_utils$Elm$Type$cyclic$record(),
				$elm$project_metadata_utils$Elm$Type$cyclic$tuple()
			]));
}
function $elm$project_metadata_utils$Elm$Type$cyclic$record() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						F2(
							function (ext, fs) {
								return A2($elm$project_metadata_utils$Elm$Type$Record, fs, ext);
							})),
					$elm$parser$Parser$symbol('{')),
				$elm$project_metadata_utils$Elm$Type$spaces),
			$elm$project_metadata_utils$Elm$Type$extension),
		$elm$project_metadata_utils$Elm$Type$cyclic$recordEnd());
}
function $elm$project_metadata_utils$Elm$Type$cyclic$recordEnd() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (f) {
					return A2(
						$elm$parser$Parser$loop,
						_List_fromArray(
							[f]),
						$elm$project_metadata_utils$Elm$Type$recordEndHelp);
				},
				A2(
					$elm$parser$Parser$ignorer,
					$elm$project_metadata_utils$Elm$Type$cyclic$field(),
					$elm$project_metadata_utils$Elm$Type$spaces)),
				A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(_List_Nil),
				$elm$parser$Parser$symbol('}'))
			]));
}
function $elm$project_metadata_utils$Elm$Type$cyclic$field() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($elm$core$Tuple$pair),
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					A2($elm$parser$Parser$ignorer, $elm$project_metadata_utils$Elm$Type$lowVar, $elm$project_metadata_utils$Elm$Type$spaces),
					$elm$parser$Parser$symbol(':')),
				$elm$project_metadata_utils$Elm$Type$spaces)),
		$elm$project_metadata_utils$Elm$Type$cyclic$tipe());
}
function $elm$project_metadata_utils$Elm$Type$cyclic$tuple() {
	return A2(
		$elm$parser$Parser$map,
		$elm$project_metadata_utils$Elm$Type$tuplize,
		$elm$parser$Parser$sequence(
			{
				end: ')',
				item: $elm$project_metadata_utils$Elm$Type$cyclic$tipe(),
				separator: ',',
				spaces: $elm$project_metadata_utils$Elm$Type$spaces,
				start: '(',
				trailing: $elm$parser$Parser$Forbidden
			}));
}
function $elm$project_metadata_utils$Elm$Type$cyclic$tipe() {
	return $elm$parser$Parser$lazy(
		function (_v0) {
			return A2(
				$elm$parser$Parser$andThen,
				$elm$project_metadata_utils$Elm$Type$tipeHelp,
				$elm$project_metadata_utils$Elm$Type$cyclic$tipeTerm());
		});
}
try {
	var $elm$project_metadata_utils$Elm$Type$arrowAndType = $elm$project_metadata_utils$Elm$Type$cyclic$arrowAndType();
	$elm$project_metadata_utils$Elm$Type$cyclic$arrowAndType = function () {
		return $elm$project_metadata_utils$Elm$Type$arrowAndType;
	};
	var $elm$project_metadata_utils$Elm$Type$tipeTerm = $elm$project_metadata_utils$Elm$Type$cyclic$tipeTerm();
	$elm$project_metadata_utils$Elm$Type$cyclic$tipeTerm = function () {
		return $elm$project_metadata_utils$Elm$Type$tipeTerm;
	};
	var $elm$project_metadata_utils$Elm$Type$term = $elm$project_metadata_utils$Elm$Type$cyclic$term();
	$elm$project_metadata_utils$Elm$Type$cyclic$term = function () {
		return $elm$project_metadata_utils$Elm$Type$term;
	};
	var $elm$project_metadata_utils$Elm$Type$record = $elm$project_metadata_utils$Elm$Type$cyclic$record();
	$elm$project_metadata_utils$Elm$Type$cyclic$record = function () {
		return $elm$project_metadata_utils$Elm$Type$record;
	};
	var $elm$project_metadata_utils$Elm$Type$recordEnd = $elm$project_metadata_utils$Elm$Type$cyclic$recordEnd();
	$elm$project_metadata_utils$Elm$Type$cyclic$recordEnd = function () {
		return $elm$project_metadata_utils$Elm$Type$recordEnd;
	};
	var $elm$project_metadata_utils$Elm$Type$field = $elm$project_metadata_utils$Elm$Type$cyclic$field();
	$elm$project_metadata_utils$Elm$Type$cyclic$field = function () {
		return $elm$project_metadata_utils$Elm$Type$field;
	};
	var $elm$project_metadata_utils$Elm$Type$tuple = $elm$project_metadata_utils$Elm$Type$cyclic$tuple();
	$elm$project_metadata_utils$Elm$Type$cyclic$tuple = function () {
		return $elm$project_metadata_utils$Elm$Type$tuple;
	};
	var $elm$project_metadata_utils$Elm$Type$tipe = $elm$project_metadata_utils$Elm$Type$cyclic$tipe();
	$elm$project_metadata_utils$Elm$Type$cyclic$tipe = function () {
		return $elm$project_metadata_utils$Elm$Type$tipe;
	};
} catch ($) {
	throw 'Some top-level definitions from `Elm.Type` are causing infinite recursion:\n\n  ┌─────┐\n  │    arrowAndType\n  │     ↓\n  │    tipeTerm\n  │     ↓\n  │    chompArgs\n  │     ↓\n  │    term\n  │     ↓\n  │    record\n  │     ↓\n  │    recordEnd\n  │     ↓\n  │    field\n  │     ↓\n  │    recordEndHelp\n  │     ↓\n  │    tuple\n  │     ↓\n  │    tipe\n  │     ↓\n  │    tipeHelp\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $elm$project_metadata_utils$Elm$Type$parse = function (source) {
	return A2($elm$parser$Parser$run, $elm$project_metadata_utils$Elm$Type$tipe, source);
};
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$project_metadata_utils$Elm$Type$decoderHelp = function (string) {
	var _v0 = $elm$project_metadata_utils$Elm$Type$parse(string);
	if (_v0.$ === 'Err') {
		var error = _v0.a;
		return $elm$json$Json$Decode$fail('TODO');
	} else {
		var actualType = _v0.a;
		return $elm$json$Json$Decode$succeed(actualType);
	}
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$project_metadata_utils$Elm$Type$decoder = A2($elm$json$Json$Decode$andThen, $elm$project_metadata_utils$Elm$Type$decoderHelp, $elm$json$Json$Decode$string);
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map4 = _Json_map4;
var $elm$project_metadata_utils$Elm$Docs$aliasDecoder = A5(
	$elm$json$Json$Decode$map4,
	$elm$project_metadata_utils$Elm$Docs$Alias,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'comment', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'args',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2($elm$json$Json$Decode$field, 'type', $elm$project_metadata_utils$Elm$Type$decoder));
var $elm$project_metadata_utils$Elm$Docs$Binop = F5(
	function (name, comment, tipe, associativity, precedence) {
		return {associativity: associativity, comment: comment, name: name, precedence: precedence, tipe: tipe};
	});
var $elm$project_metadata_utils$Elm$Docs$Left = {$: 'Left'};
var $elm$project_metadata_utils$Elm$Docs$None = {$: 'None'};
var $elm$project_metadata_utils$Elm$Docs$Right = {$: 'Right'};
var $elm$project_metadata_utils$Elm$Docs$toAssoc = function (str) {
	switch (str) {
		case 'left':
			return $elm$json$Json$Decode$succeed($elm$project_metadata_utils$Elm$Docs$Left);
		case 'non':
			return $elm$json$Json$Decode$succeed($elm$project_metadata_utils$Elm$Docs$None);
		case 'right':
			return $elm$json$Json$Decode$succeed($elm$project_metadata_utils$Elm$Docs$Right);
		default:
			return $elm$json$Json$Decode$fail('expecting one of the following values: left, non, right');
	}
};
var $elm$project_metadata_utils$Elm$Docs$assocDecoder = A2($elm$json$Json$Decode$andThen, $elm$project_metadata_utils$Elm$Docs$toAssoc, $elm$json$Json$Decode$string);
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map5 = _Json_map5;
var $elm$project_metadata_utils$Elm$Docs$binopDecoder = A6(
	$elm$json$Json$Decode$map5,
	$elm$project_metadata_utils$Elm$Docs$Binop,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'comment', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'type', $elm$project_metadata_utils$Elm$Type$decoder),
	A2($elm$json$Json$Decode$field, 'associativity', $elm$project_metadata_utils$Elm$Docs$assocDecoder),
	A2($elm$json$Json$Decode$field, 'precedence', $elm$json$Json$Decode$int));
var $elm$json$Json$Decode$map6 = _Json_map6;
var $elm$project_metadata_utils$Elm$Docs$Union = F4(
	function (name, comment, args, tags) {
		return {args: args, comment: comment, name: name, tags: tags};
	});
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$project_metadata_utils$Elm$Docs$tagDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$index,
		1,
		$elm$json$Json$Decode$list($elm$project_metadata_utils$Elm$Type$decoder)));
var $elm$project_metadata_utils$Elm$Docs$unionDecoder = A5(
	$elm$json$Json$Decode$map4,
	$elm$project_metadata_utils$Elm$Docs$Union,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'comment', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'args',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'cases',
		$elm$json$Json$Decode$list($elm$project_metadata_utils$Elm$Docs$tagDecoder)));
var $elm$project_metadata_utils$Elm$Docs$Value = F3(
	function (name, comment, tipe) {
		return {comment: comment, name: name, tipe: tipe};
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$project_metadata_utils$Elm$Docs$valueDecoder = A4(
	$elm$json$Json$Decode$map3,
	$elm$project_metadata_utils$Elm$Docs$Value,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'comment', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'type', $elm$project_metadata_utils$Elm$Type$decoder));
var $elm$project_metadata_utils$Elm$Docs$decoder = A7(
	$elm$json$Json$Decode$map6,
	$elm$project_metadata_utils$Elm$Docs$Module,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'comment', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'unions',
		$elm$json$Json$Decode$list($elm$project_metadata_utils$Elm$Docs$unionDecoder)),
	A2(
		$elm$json$Json$Decode$field,
		'aliases',
		$elm$json$Json$Decode$list($elm$project_metadata_utils$Elm$Docs$aliasDecoder)),
	A2(
		$elm$json$Json$Decode$field,
		'values',
		$elm$json$Json$Decode$list($elm$project_metadata_utils$Elm$Docs$valueDecoder)),
	A2(
		$elm$json$Json$Decode$field,
		'binops',
		$elm$json$Json$Decode$list($elm$project_metadata_utils$Elm$Docs$binopDecoder)));
var $author$project$Options$decoder = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Options$Options,
	A2($elm$json$Json$Decode$field, 'output', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'project',
		$elm$json$Json$Decode$list($elm$project_metadata_utils$Elm$Docs$decoder)),
	A2(
		$elm$json$Json$Decode$field,
		'viewers',
		$elm$json$Json$Decode$list($elm$project_metadata_utils$Elm$Docs$decoder)));
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Gen$CodeGen$Generate$onFailureSend = _Platform_outgoingPort(
	'onFailureSend',
	$elm$json$Json$Encode$list(
		function ($) {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'description',
						$elm$json$Json$Encode$string($.description)),
						_Utils_Tuple2(
						'title',
						$elm$json$Json$Encode$string($.title))
					]));
		}));
var $author$project$Gen$CodeGen$Generate$error = function (errs) {
	return $author$project$Gen$CodeGen$Generate$onFailureSend(errs);
};
var $author$project$Gen$CodeGen$Generate$onSuccessSend = _Platform_outgoingPort(
	'onSuccessSend',
	$elm$json$Json$Encode$list(
		function ($) {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'contents',
						$elm$json$Json$Encode$string($.contents)),
						_Utils_Tuple2(
						'path',
						$elm$json$Json$Encode$string($.path)),
						_Utils_Tuple2(
						'warnings',
						$elm$json$Json$Encode$list(
							function ($) {
								return $elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'declaration',
											$elm$json$Json$Encode$string($.declaration)),
											_Utils_Tuple2(
											'warning',
											$elm$json$Json$Encode$string($.warning))
										]));
							})($.warnings))
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
var $author$project$Gen$CodeGen$Generate$fromJson = F2(
	function (decoder, f) {
		return $elm$core$Platform$worker(
			{
				init: function (flags) {
					var _v0 = A2($elm$json$Json$Decode$decodeValue, decoder, flags);
					if (_v0.$ === 'Ok') {
						var input = _v0.a;
						return _Utils_Tuple2(
							_Utils_Tuple0,
							$author$project$Gen$CodeGen$Generate$files(
								f(input)));
					} else {
						var e = _v0.a;
						return _Utils_Tuple2(
							_Utils_Tuple0,
							$author$project$Gen$CodeGen$Generate$error(
								_List_fromArray(
									[
										{
										description: $elm$json$Json$Decode$errorToString(e),
										title: 'Error decoding flags'
									}
									])));
					}
				},
				subscriptions: function (_v1) {
					return $elm$core$Platform$Sub$none;
				},
				update: F2(
					function (_v2, model) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					})
			});
	});
var $author$project$Generate$Page$generate = function (options) {
	return _List_Nil;
};
var $stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration = function (a) {
	return {$: 'CustomTypeDeclaration', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$Declaration = function (a) {
	return {$: 'Declaration', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$NotExposed = {$: 'NotExposed'};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
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
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $mdgriffith$elm_codegen$Elm$deduplicate = function (listToDeduplicate) {
	return $elm$core$List$reverse(
		A3(
			$elm$core$List$foldl,
			F2(
				function (item, untouched) {
					var set = untouched.a;
					var innerList = untouched.b;
					return A2($elm$core$Set$member, item, set) ? untouched : _Utils_Tuple2(
						A2($elm$core$Set$insert, item, set),
						A2($elm$core$List$cons, item, innerList));
				}),
			_Utils_Tuple2($elm$core$Set$empty, _List_Nil),
			listToDeduplicate).b);
};
var $elm$core$String$length = _String_length;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toUpper = _String_toUpper;
var $mdgriffith$elm_codegen$Internal$Format$formatType = function (str) {
	return _Utils_ap(
		$elm$core$String$toUpper(
			A2($elm$core$String$left, 1, str)),
		A2($elm$core$String$dropLeft, 1, str));
};
var $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports = function (_v0) {
	var details = _v0.a;
	return details.imports;
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $stil4m$elm_syntax$Elm$Syntax$Node$value = function (_v0) {
	var v = _v0.b;
	return v;
};
var $mdgriffith$elm_codegen$Internal$Compiler$denode = $stil4m$elm_syntax$Elm$Syntax$Node$value;
var $mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper = function (ann) {
	switch (ann.$) {
		case 'GenericType':
			var str = ann.a;
			return _List_fromArray(
				[str]);
		case 'Typed':
			var modName = ann.a;
			var anns = ann.b;
			return A2(
				$elm$core$List$concatMap,
				A2($elm$core$Basics$composeL, $mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper, $mdgriffith$elm_codegen$Internal$Compiler$denode),
				anns);
		case 'Unit':
			return _List_Nil;
		case 'Tupled':
			var tupled = ann.a;
			return A2(
				$elm$core$List$concatMap,
				A2($elm$core$Basics$composeL, $mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper, $mdgriffith$elm_codegen$Internal$Compiler$denode),
				tupled);
		case 'Record':
			var recordDefinition = ann.a;
			return A2(
				$elm$core$List$concatMap,
				function (nodedField) {
					var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$denode(nodedField);
					var name = _v1.a;
					var field = _v1.b;
					return $mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper(
						$mdgriffith$elm_codegen$Internal$Compiler$denode(field));
				},
				recordDefinition);
		case 'GenericRecord':
			var recordName = ann.a;
			var recordDefinition = ann.b;
			return A2(
				$elm$core$List$cons,
				$mdgriffith$elm_codegen$Internal$Compiler$denode(recordName),
				A2(
					$elm$core$List$concatMap,
					function (nodedField) {
						var _v2 = $mdgriffith$elm_codegen$Internal$Compiler$denode(nodedField);
						var name = _v2.a;
						var field = _v2.b;
						return $mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper(
							$mdgriffith$elm_codegen$Internal$Compiler$denode(field));
					},
					$mdgriffith$elm_codegen$Internal$Compiler$denode(recordDefinition)));
		default:
			var one = ann.a;
			var two = ann.b;
			return A2(
				$elm$core$List$concatMap,
				$mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper,
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Internal$Compiler$denode(one),
						$mdgriffith$elm_codegen$Internal$Compiler$denode(two)
					]));
	}
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return $elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2($elm$core$List$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2($elm$core$List$cons, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2($elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$unique = function (list) {
	return A4($mdgriffith$elm_codegen$Internal$Compiler$uniqueHelp, $elm$core$Basics$identity, _List_Nil, list, _List_Nil);
};
var $mdgriffith$elm_codegen$Internal$Compiler$getGenerics = function (_v0) {
	var details = _v0.a;
	return $mdgriffith$elm_codegen$Internal$Compiler$unique(
		$mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper(details.annotation));
};
var $mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation = function (_v0) {
	var details = _v0.a;
	return details.annotation;
};
var $stil4m$elm_syntax$Elm$Syntax$Node$Node = F2(
	function (a, b) {
		return {$: 'Node', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange = {
	end: {column: 0, row: 0},
	start: {column: 0, row: 0}
};
var $mdgriffith$elm_codegen$Internal$Compiler$nodify = function (exp) {
	return A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, exp);
};
var $mdgriffith$elm_codegen$Elm$customType = F2(
	function (name, variants) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Declaration(
			{
				docs: $elm$core$Maybe$Nothing,
				exposed: $mdgriffith$elm_codegen$Internal$Compiler$NotExposed,
				imports: A2(
					$elm$core$List$concatMap,
					function (_v0) {
						var listAnn = _v0.b;
						return A2($elm$core$List$concatMap, $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, listAnn);
					},
					variants),
				name: name,
				toBody: function (index) {
					return {
						additionalImports: _List_Nil,
						declaration: $stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration(
							{
								constructors: A2(
									$elm$core$List$map,
									function (_v1) {
										var varName = _v1.a;
										var vars = _v1.b;
										return $mdgriffith$elm_codegen$Internal$Compiler$nodify(
											{
												_arguments: A2(
													$elm$core$List$map,
													A2($elm$core$Basics$composeR, $mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation, $mdgriffith$elm_codegen$Internal$Compiler$nodify),
													vars),
												name: $mdgriffith$elm_codegen$Internal$Compiler$nodify(
													$mdgriffith$elm_codegen$Internal$Format$formatType(varName))
											});
									},
									variants),
								documentation: $elm$core$Maybe$Nothing,
								generics: A2(
									$elm$core$List$map,
									$mdgriffith$elm_codegen$Internal$Compiler$nodify,
									$mdgriffith$elm_codegen$Elm$deduplicate(
										A2(
											$elm$core$List$concatMap,
											function (_v2) {
												var listAnn = _v2.b;
												return A2($elm$core$List$concatMap, $mdgriffith$elm_codegen$Internal$Compiler$getGenerics, listAnn);
											},
											variants))),
								name: $mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$mdgriffith$elm_codegen$Internal$Format$formatType(name))
							}),
						warning: $elm$core$Maybe$Nothing
					};
				}
			});
	});
var $mdgriffith$elm_codegen$Internal$Compiler$Exposed = function (a) {
	return {$: 'Exposed', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$expose = function (decl) {
	switch (decl.$) {
		case 'Comment':
			return decl;
		case 'Block':
			return decl;
		default:
			var details = decl.a;
			return $mdgriffith$elm_codegen$Internal$Compiler$Declaration(
				_Utils_update(
					details,
					{
						exposed: $mdgriffith$elm_codegen$Internal$Compiler$Exposed(
							{exposeConstructor: false, group: $elm$core$Maybe$Nothing})
					}));
	}
};
var $mdgriffith$elm_codegen$Elm$expose = $mdgriffith$elm_codegen$Internal$Compiler$expose;
var $stil4m$elm_syntax$Elm$Syntax$Exposing$All = function (a) {
	return {$: 'All', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit = function (a) {
	return {$: 'Explicit', a: a};
};
var $mdgriffith$elm_codegen$Internal$Comments$Markdown = function (a) {
	return {$: 'Markdown', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Module$NormalModule = function (a) {
	return {$: 'NormalModule', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Module$PortModule = function (a) {
	return {$: 'PortModule', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$RenderedBlock = function (a) {
	return {$: 'RenderedBlock', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$RenderedComment = function (a) {
	return {$: 'RenderedComment', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$RenderedDecl = function (a) {
	return {$: 'RenderedDecl', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration = function (a) {
	return {$: 'AliasDeclaration', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration = function (a) {
	return {$: 'FunctionDeclaration', a: a};
};
var $mdgriffith$elm_codegen$Internal$Render$addDocs = F2(
	function (maybeDoc, decl) {
		if (maybeDoc.$ === 'Nothing') {
			return decl;
		} else {
			var doc = maybeDoc.a;
			switch (decl.$) {
				case 'FunctionDeclaration':
					var func = decl.a;
					return $stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(
						_Utils_update(
							func,
							{
								documentation: $elm$core$Maybe$Just(
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(doc))
							}));
				case 'AliasDeclaration':
					var typealias = decl.a;
					return $stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration(
						_Utils_update(
							typealias,
							{
								documentation: $elm$core$Maybe$Just(
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(doc))
							}));
				case 'CustomTypeDeclaration':
					var typeDecl = decl.a;
					return $stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration(
						_Utils_update(
							typeDecl,
							{
								documentation: $elm$core$Maybe$Just(
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(doc))
							}));
				case 'PortDeclaration':
					var sig = decl.a;
					return decl;
				case 'InfixDeclaration':
					return decl;
				default:
					return decl;
			}
		}
	});
var $stil4m$elm_syntax$Elm$Syntax$Exposing$FunctionExpose = function (a) {
	return {$: 'FunctionExpose', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose = function (a) {
	return {$: 'TypeExpose', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$TypeOrAliasExpose = function (a) {
	return {$: 'TypeOrAliasExpose', a: a};
};
var $mdgriffith$elm_codegen$Internal$Render$addExposed = F3(
	function (exposed, declaration, otherExposes) {
		if (exposed.$ === 'NotExposed') {
			return otherExposes;
		} else {
			var details = exposed.a;
			switch (declaration.$) {
				case 'FunctionDeclaration':
					var fn = declaration.a;
					var fnName = $mdgriffith$elm_codegen$Internal$Compiler$denode(
						function ($) {
							return $.name;
						}(
							$mdgriffith$elm_codegen$Internal$Compiler$denode(fn.declaration)));
					return A2(
						$elm$core$List$cons,
						$stil4m$elm_syntax$Elm$Syntax$Exposing$FunctionExpose(fnName),
						otherExposes);
				case 'AliasDeclaration':
					var synonym = declaration.a;
					var aliasName = $mdgriffith$elm_codegen$Internal$Compiler$denode(synonym.name);
					return A2(
						$elm$core$List$cons,
						$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeOrAliasExpose(aliasName),
						otherExposes);
				case 'CustomTypeDeclaration':
					var myType = declaration.a;
					var typeName = $mdgriffith$elm_codegen$Internal$Compiler$denode(myType.name);
					return details.exposeConstructor ? A2(
						$elm$core$List$cons,
						$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose(
							{
								name: typeName,
								open: $elm$core$Maybe$Just($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange)
							}),
						otherExposes) : A2(
						$elm$core$List$cons,
						$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeOrAliasExpose(typeName),
						otherExposes);
				case 'PortDeclaration':
					var myPort = declaration.a;
					var typeName = $mdgriffith$elm_codegen$Internal$Compiler$denode(myPort.name);
					return A2(
						$elm$core$List$cons,
						$stil4m$elm_syntax$Elm$Syntax$Exposing$FunctionExpose(typeName),
						otherExposes);
				case 'InfixDeclaration':
					var inf = declaration.a;
					return otherExposes;
				default:
					return otherExposes;
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Comments$Comment = function (a) {
	return {$: 'Comment', a: a};
};
var $mdgriffith$elm_codegen$Internal$Comments$addPart = F2(
	function (_v0, part) {
		var parts = _v0.a;
		return $mdgriffith$elm_codegen$Internal$Comments$Comment(
			A2($elm$core$List$cons, part, parts));
	});
var $mdgriffith$elm_codegen$Internal$Compiler$fullModName = function (name) {
	return A2($elm$core$String$join, '.', name);
};
var $elm$core$List$sortBy = _List_sortBy;
var $mdgriffith$elm_codegen$Internal$Render$dedupImports = function (mods) {
	return A2(
		$elm$core$List$sortBy,
		$mdgriffith$elm_codegen$Internal$Compiler$fullModName,
		A3(
			$elm$core$List$foldl,
			F2(
				function (mod, _v0) {
					var set = _v0.a;
					var gathered = _v0.b;
					var stringName = $mdgriffith$elm_codegen$Internal$Compiler$fullModName(mod);
					return A2($elm$core$Set$member, stringName, set) ? _Utils_Tuple2(set, gathered) : _Utils_Tuple2(
						A2($elm$core$Set$insert, stringName, set),
						A2($elm$core$List$cons, mod, gathered));
				}),
			_Utils_Tuple2($elm$core$Set$empty, _List_Nil),
			mods).b);
};
var $mdgriffith$elm_codegen$Internal$Comments$emptyComment = $mdgriffith$elm_codegen$Internal$Comments$Comment(_List_Nil);
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $mdgriffith$elm_codegen$Internal$Render$matchName = F2(
	function (one, two) {
		if (one.$ === 'Nothing') {
			if (two.$ === 'Nothing') {
				return true;
			} else {
				return false;
			}
		} else {
			var oneName = one.a;
			if (two.$ === 'Nothing') {
				return false;
			} else {
				var twoName = two.a;
				return _Utils_eq(oneName, twoName);
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Render$groupExposing = function (items) {
	return A2(
		$elm$core$List$map,
		function (doc) {
			return _Utils_update(
				doc,
				{
					members: $elm$core$List$reverse(doc.members)
				});
		},
		A3(
			$elm$core$List$foldr,
			F2(
				function (_v0, acc) {
					var maybeGroup = _v0.a;
					var name = _v0.b;
					if (!acc.b) {
						return _List_fromArray(
							[
								{
								group: maybeGroup,
								members: _List_fromArray(
									[name])
							}
							]);
					} else {
						var top = acc.a;
						var groups = acc.b;
						return A2($mdgriffith$elm_codegen$Internal$Render$matchName, maybeGroup, top.group) ? A2(
							$elm$core$List$cons,
							{
								group: top.group,
								members: A2($elm$core$List$cons, name, top.members)
							},
							groups) : A2(
							$elm$core$List$cons,
							{
								group: maybeGroup,
								members: _List_fromArray(
									[name])
							},
							acc);
					}
				}),
			_List_Nil,
			items));
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose = function (a) {
	return {$: 'InfixExpose', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$builtIn = function (name) {
	_v0$13:
	while (true) {
		if (name.b) {
			if (name.b.b) {
				if ((name.a === 'Platform') && (!name.b.b.b)) {
					switch (name.b.a) {
						case 'Sub':
							var _v1 = name.b;
							return true;
						case 'Cmd':
							var _v2 = name.b;
							return true;
						default:
							break _v0$13;
					}
				} else {
					break _v0$13;
				}
			} else {
				switch (name.a) {
					case 'List':
						return true;
					case 'Maybe':
						return true;
					case 'String':
						return true;
					case 'Basics':
						return true;
					case 'Char':
						return true;
					case 'Debug':
						return true;
					case 'Tuple':
						return true;
					case 'Result':
						return true;
					case 'Platform':
						return true;
					case 'Sub':
						return true;
					case 'Cmd':
						return true;
					default:
						break _v0$13;
				}
			}
		} else {
			break _v0$13;
		}
	}
	return false;
};
var $mdgriffith$elm_codegen$Internal$Compiler$findAlias = F2(
	function (modName, aliases) {
		findAlias:
		while (true) {
			if (!aliases.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var _v1 = aliases.a;
				var aliasModName = _v1.a;
				var alias = _v1.b;
				var remain = aliases.b;
				if (_Utils_eq(modName, aliasModName)) {
					return $elm$core$Maybe$Just(alias);
				} else {
					var $temp$modName = modName,
						$temp$aliases = remain;
					modName = $temp$modName;
					aliases = $temp$aliases;
					continue findAlias;
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$isParser = function (name) {
	_v0$2:
	while (true) {
		if (name.b && (name.a === 'Parser')) {
			if (!name.b.b) {
				return true;
			} else {
				if ((name.b.a === 'Advanced') && (!name.b.b.b)) {
					var _v1 = name.b;
					return true;
				} else {
					break _v0$2;
				}
			}
		} else {
			break _v0$2;
		}
	}
	return false;
};
var $mdgriffith$elm_codegen$Internal$Compiler$isUrlParser = function (name) {
	if ((((name.b && (name.a === 'Url')) && name.b.b) && (name.b.a === 'Parser')) && (!name.b.b.b)) {
		var _v1 = name.b;
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_codegen$Internal$Compiler$makeImport = F2(
	function (aliases, name) {
		if (!name.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v1 = A2($mdgriffith$elm_codegen$Internal$Compiler$findAlias, name, aliases);
			if (_v1.$ === 'Nothing') {
				return $mdgriffith$elm_codegen$Internal$Compiler$builtIn(name) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
					{
						exposingList: $mdgriffith$elm_codegen$Internal$Compiler$isUrlParser(name) ? $elm$core$Maybe$Just(
							$mdgriffith$elm_codegen$Internal$Compiler$nodify(
								$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('</>')),
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('<?>'))
										])))) : ($mdgriffith$elm_codegen$Internal$Compiler$isParser(name) ? $elm$core$Maybe$Just(
							$mdgriffith$elm_codegen$Internal$Compiler$nodify(
								$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('|=')),
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('|.'))
										])))) : $elm$core$Maybe$Nothing),
						moduleAlias: $elm$core$Maybe$Nothing,
						moduleName: $mdgriffith$elm_codegen$Internal$Compiler$nodify(name)
					});
			} else {
				var alias = _v1.a;
				return $elm$core$Maybe$Just(
					{
						exposingList: $mdgriffith$elm_codegen$Internal$Compiler$isUrlParser(name) ? $elm$core$Maybe$Just(
							$mdgriffith$elm_codegen$Internal$Compiler$nodify(
								$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('</>')),
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('<?>'))
										])))) : ($mdgriffith$elm_codegen$Internal$Compiler$isParser(name) ? $elm$core$Maybe$Just(
							$mdgriffith$elm_codegen$Internal$Compiler$nodify(
								$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('|=')),
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('|.'))
										])))) : $elm$core$Maybe$Nothing),
						moduleAlias: $elm$core$Maybe$Just(
							$mdgriffith$elm_codegen$Internal$Compiler$nodify(
								_List_fromArray(
									[alias]))),
						moduleName: $mdgriffith$elm_codegen$Internal$Compiler$nodify(name)
					});
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$nodifyAll = $elm$core$List$map($mdgriffith$elm_codegen$Internal$Compiler$nodify);
var $the_sett$elm_pretty_printer$Internals$Concatenate = F2(
	function (a, b) {
		return {$: 'Concatenate', a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$append = F2(
	function (doc1, doc2) {
		return A2(
			$the_sett$elm_pretty_printer$Internals$Concatenate,
			function (_v0) {
				return doc1;
			},
			function (_v1) {
				return doc2;
			});
	});
var $elm_community$basics_extra$Basics$Extra$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var $the_sett$elm_pretty_printer$Pretty$a = $elm_community$basics_extra$Basics$Extra$flip($the_sett$elm_pretty_printer$Pretty$append);
var $the_sett$elm_pretty_printer$Internals$Line = F2(
	function (a, b) {
		return {$: 'Line', a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$line = A2($the_sett$elm_pretty_printer$Internals$Line, ' ', '');
var $the_sett$elm_pretty_printer$Internals$Empty = {$: 'Empty'};
var $the_sett$elm_pretty_printer$Pretty$empty = $the_sett$elm_pretty_printer$Internals$Empty;
var $the_sett$elm_pretty_printer$Pretty$join = F2(
	function (sep, docs) {
		join:
		while (true) {
			if (!docs.b) {
				return $the_sett$elm_pretty_printer$Pretty$empty;
			} else {
				if (docs.a.$ === 'Empty') {
					var _v1 = docs.a;
					var ds = docs.b;
					var $temp$sep = sep,
						$temp$docs = ds;
					sep = $temp$sep;
					docs = $temp$docs;
					continue join;
				} else {
					var d = docs.a;
					var ds = docs.b;
					var step = F2(
						function (x, rest) {
							if (x.$ === 'Empty') {
								return rest;
							} else {
								var doc = x;
								return A2(
									$the_sett$elm_pretty_printer$Pretty$append,
									sep,
									A2($the_sett$elm_pretty_printer$Pretty$append, doc, rest));
							}
						});
					var spersed = A3($elm$core$List$foldr, step, $the_sett$elm_pretty_printer$Pretty$empty, ds);
					return A2($the_sett$elm_pretty_printer$Pretty$append, d, spersed);
				}
			}
		}
	});
var $the_sett$elm_pretty_printer$Pretty$lines = $the_sett$elm_pretty_printer$Pretty$join($the_sett$elm_pretty_printer$Pretty$line);
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe = $elm$core$Maybe$map($mdgriffith$elm_codegen$Internal$Compiler$denode);
var $mdgriffith$elm_codegen$Internal$Compiler$denodeAll = $elm$core$List$map($mdgriffith$elm_codegen$Internal$Compiler$denode);
var $the_sett$elm_pretty_printer$Internals$Text = F2(
	function (a, b) {
		return {$: 'Text', a: a, b: b};
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $the_sett$elm_pretty_printer$Pretty$char = function (c) {
	return A2(
		$the_sett$elm_pretty_printer$Internals$Text,
		$elm$core$String$fromChar(c),
		$elm$core$Maybe$Nothing);
};
var $the_sett$elm_pretty_printer$Pretty$surround = F3(
	function (left, right, doc) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$append,
			A2($the_sett$elm_pretty_printer$Pretty$append, left, doc),
			right);
	});
var $the_sett$elm_pretty_printer$Pretty$parens = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$char(
			_Utils_chr('(')),
		$the_sett$elm_pretty_printer$Pretty$char(
			_Utils_chr(')')),
		doc);
};
var $the_sett$elm_pretty_printer$Pretty$string = function (val) {
	return A2($the_sett$elm_pretty_printer$Internals$Text, val, $elm$core$Maybe$Nothing);
};
var $mdgriffith$elm_codegen$Internal$Write$prettyTopLevelExpose = function (tlExpose) {
	switch (tlExpose.$) {
		case 'InfixExpose':
			var val = tlExpose.a;
			return $the_sett$elm_pretty_printer$Pretty$parens(
				$the_sett$elm_pretty_printer$Pretty$string(val));
		case 'FunctionExpose':
			var val = tlExpose.a;
			return $the_sett$elm_pretty_printer$Pretty$string(val);
		case 'TypeOrAliasExpose':
			var val = tlExpose.a;
			return $the_sett$elm_pretty_printer$Pretty$string(val);
		default:
			var exposedType = tlExpose.a;
			var _v1 = exposedType.open;
			if (_v1.$ === 'Nothing') {
				return $the_sett$elm_pretty_printer$Pretty$string(exposedType.name);
			} else {
				return A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$string('(..)'),
					$the_sett$elm_pretty_printer$Pretty$string(exposedType.name));
			}
	}
};
var $mdgriffith$elm_codegen$Internal$Write$prettyTopLevelExposes = function (exposes) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$join,
		$the_sett$elm_pretty_printer$Pretty$string(', '),
		A2($elm$core$List$map, $mdgriffith$elm_codegen$Internal$Write$prettyTopLevelExpose, exposes));
};
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$combineTopLevelExposes = function (exposes) {
	if (!exposes.b) {
		return $stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('');
	} else {
		var hd = exposes.a;
		var tl = exposes.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (exp, result) {
					var _v1 = _Utils_Tuple2(exp, result);
					if (_v1.a.$ === 'TypeExpose') {
						var typeExpose = _v1.a.a;
						var _v2 = typeExpose.open;
						if (_v2.$ === 'Just') {
							return exp;
						} else {
							return result;
						}
					} else {
						if (_v1.b.$ === 'TypeExpose') {
							var typeExpose = _v1.b.a;
							var _v3 = typeExpose.open;
							if (_v3.$ === 'Just') {
								return result;
							} else {
								return exp;
							}
						} else {
							return result;
						}
					}
				}),
			hd,
			tl);
	}
};
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName = function (tle) {
	switch (tle.$) {
		case 'InfixExpose':
			var val = tle.a;
			return val;
		case 'FunctionExpose':
			var val = tle.a;
			return val;
		case 'TypeOrAliasExpose':
			var val = tle.a;
			return val;
		default:
			var exposedType = tle.a;
			return exposedType.name;
	}
};
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$groupByExposingName = function (innerImports) {
	var _v0 = function () {
		if (!innerImports.b) {
			return _Utils_Tuple3(
				'',
				_List_Nil,
				_List_fromArray(
					[_List_Nil]));
		} else {
			var hd = innerImports.a;
			return A3(
				$elm$core$List$foldl,
				F2(
					function (exp, _v2) {
						var currName = _v2.a;
						var currAccum = _v2.b;
						var accum = _v2.c;
						var nextName = $mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(exp);
						return _Utils_eq(nextName, currName) ? _Utils_Tuple3(
							currName,
							A2($elm$core$List$cons, exp, currAccum),
							accum) : _Utils_Tuple3(
							nextName,
							_List_fromArray(
								[exp]),
							A2($elm$core$List$cons, currAccum, accum));
					}),
				_Utils_Tuple3(
					$mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(hd),
					_List_Nil,
					_List_Nil),
				innerImports);
		}
	}();
	var hdGroup = _v0.b;
	var remGroups = _v0.c;
	return $elm$core$List$reverse(
		A2($elm$core$List$cons, hdGroup, remGroups));
};
var $elm$core$List$sortWith = _List_sortWith;
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeOrder = F2(
	function (tlel, tler) {
		var _v0 = _Utils_Tuple2(tlel, tler);
		if (_v0.a.$ === 'InfixExpose') {
			if (_v0.b.$ === 'InfixExpose') {
				return A2(
					$elm$core$Basics$compare,
					$mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(tlel),
					$mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(tler));
			} else {
				return $elm$core$Basics$LT;
			}
		} else {
			if (_v0.b.$ === 'InfixExpose') {
				return $elm$core$Basics$GT;
			} else {
				return A2(
					$elm$core$Basics$compare,
					$mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(tlel),
					$mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeName(tler));
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupExposings = function (tlExposings) {
	return A2(
		$elm$core$List$map,
		$mdgriffith$elm_codegen$Internal$ImportsAndExposing$combineTopLevelExposes,
		$mdgriffith$elm_codegen$Internal$ImportsAndExposing$groupByExposingName(
			A2($elm$core$List$sortWith, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$topLevelExposeOrder, tlExposings)));
};
var $the_sett$elm_pretty_printer$Pretty$space = $the_sett$elm_pretty_printer$Pretty$char(
	_Utils_chr(' '));
var $mdgriffith$elm_codegen$Internal$Write$prettyExposing = function (exposing_) {
	var exposings = function () {
		if (exposing_.$ === 'All') {
			return $the_sett$elm_pretty_printer$Pretty$parens(
				$the_sett$elm_pretty_printer$Pretty$string('..'));
		} else {
			var tll = exposing_.a;
			return $the_sett$elm_pretty_printer$Pretty$parens(
				$mdgriffith$elm_codegen$Internal$Write$prettyTopLevelExposes(
					$mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupExposings(
						$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(tll))));
		}
	}();
	return A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		exposings,
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			$the_sett$elm_pretty_printer$Pretty$string('exposing')));
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyMaybe = F2(
	function (prettyFn, maybeVal) {
		return A2(
			$elm$core$Maybe$withDefault,
			$the_sett$elm_pretty_printer$Pretty$empty,
			A2($elm$core$Maybe$map, prettyFn, maybeVal));
	});
var $mdgriffith$elm_codegen$Internal$Write$dot = $the_sett$elm_pretty_printer$Pretty$string('.');
var $mdgriffith$elm_codegen$Internal$Write$prettyModuleName = function (name) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$join,
		$mdgriffith$elm_codegen$Internal$Write$dot,
		A2($elm$core$List$map, $the_sett$elm_pretty_printer$Pretty$string, name));
};
var $mdgriffith$elm_codegen$Internal$Write$prettyModuleNameAlias = function (name) {
	if (!name.b) {
		return $the_sett$elm_pretty_printer$Pretty$empty;
	} else {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			A2(
				$the_sett$elm_pretty_printer$Pretty$join,
				$mdgriffith$elm_codegen$Internal$Write$dot,
				A2($elm$core$List$map, $the_sett$elm_pretty_printer$Pretty$string, name)),
			$the_sett$elm_pretty_printer$Pretty$string('as '));
	}
};
var $mdgriffith$elm_codegen$Internal$Write$prettyImport = function (import_) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$join,
		$the_sett$elm_pretty_printer$Pretty$space,
		_List_fromArray(
			[
				$the_sett$elm_pretty_printer$Pretty$string('import'),
				$mdgriffith$elm_codegen$Internal$Write$prettyModuleName(
				$mdgriffith$elm_codegen$Internal$Compiler$denode(import_.moduleName)),
				A2(
				$mdgriffith$elm_codegen$Internal$Write$prettyMaybe,
				$mdgriffith$elm_codegen$Internal$Write$prettyModuleNameAlias,
				$mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe(import_.moduleAlias)),
				A2(
				$mdgriffith$elm_codegen$Internal$Write$prettyMaybe,
				$mdgriffith$elm_codegen$Internal$Write$prettyExposing,
				$mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe(import_.exposingList))
			]));
};
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode = $stil4m$elm_syntax$Elm$Syntax$Node$value;
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeMaybe = $elm$core$Maybe$map($mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode);
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeAll = $elm$core$List$map($mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode);
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodify = function (exp) {
	return A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, exp);
};
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyAll = $elm$core$List$map($mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodify);
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinExposings = F2(
	function (left, right) {
		var _v0 = _Utils_Tuple2(left, right);
		if (_v0.a.$ === 'All') {
			var range = _v0.a.a;
			return $stil4m$elm_syntax$Elm$Syntax$Exposing$All(range);
		} else {
			if (_v0.b.$ === 'All') {
				var range = _v0.b.a;
				return $stil4m$elm_syntax$Elm$Syntax$Exposing$All(range);
			} else {
				var leftNodes = _v0.a.a;
				var rightNodes = _v0.b.a;
				return $stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
					$mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyAll(
						A2(
							$elm$core$List$append,
							$mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeAll(leftNodes),
							$mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeAll(rightNodes))));
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinMaybeExposings = F2(
	function (maybeLeft, maybeRight) {
		var _v0 = _Utils_Tuple2(maybeLeft, maybeRight);
		if (_v0.a.$ === 'Nothing') {
			if (_v0.b.$ === 'Nothing') {
				var _v1 = _v0.a;
				var _v2 = _v0.b;
				return $elm$core$Maybe$Nothing;
			} else {
				var _v4 = _v0.a;
				var right = _v0.b.a;
				return $elm$core$Maybe$Just(right);
			}
		} else {
			if (_v0.b.$ === 'Nothing') {
				var left = _v0.a.a;
				var _v3 = _v0.b;
				return $elm$core$Maybe$Just(left);
			} else {
				var left = _v0.a.a;
				var right = _v0.b.a;
				return $elm$core$Maybe$Just(
					A2($mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinExposings, left, right));
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyMaybe = $elm$core$Maybe$map($mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodify);
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$or = F2(
	function (ma, mb) {
		if (ma.$ === 'Nothing') {
			return mb;
		} else {
			return ma;
		}
	});
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupExposing = function (exp) {
	if (exp.$ === 'All') {
		var range = exp.a;
		return $stil4m$elm_syntax$Elm$Syntax$Exposing$All(range);
	} else {
		var nodes = exp.a;
		return $stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
			$mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyAll(
				$mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupExposings(
					$mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeAll(nodes))));
	}
};
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$combineImports = function (innerImports) {
	if (!innerImports.b) {
		return {
			exposingList: $elm$core$Maybe$Nothing,
			moduleAlias: $elm$core$Maybe$Nothing,
			moduleName: $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodify(_List_Nil)
		};
	} else {
		var hd = innerImports.a;
		var tl = innerImports.b;
		var combinedImports = A3(
			$elm$core$List$foldl,
			F2(
				function (imp, result) {
					return {
						exposingList: $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodifyMaybe(
							A2(
								$mdgriffith$elm_codegen$Internal$ImportsAndExposing$joinMaybeExposings,
								$mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeMaybe(imp.exposingList),
								$mdgriffith$elm_codegen$Internal$ImportsAndExposing$denodeMaybe(result.exposingList))),
						moduleAlias: A2($mdgriffith$elm_codegen$Internal$ImportsAndExposing$or, imp.moduleAlias, result.moduleAlias),
						moduleName: imp.moduleName
					};
				}),
			hd,
			tl);
		return _Utils_update(
			combinedImports,
			{
				exposingList: A2(
					$elm$core$Maybe$map,
					A2(
						$elm$core$Basics$composeR,
						$mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode,
						A2($elm$core$Basics$composeR, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupExposing, $mdgriffith$elm_codegen$Internal$ImportsAndExposing$nodify)),
					combinedImports.exposingList)
			});
	}
};
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$groupByModuleName = function (innerImports) {
	var _v0 = function () {
		if (!innerImports.b) {
			return _Utils_Tuple3(
				_List_Nil,
				_List_Nil,
				_List_fromArray(
					[_List_Nil]));
		} else {
			var hd = innerImports.a;
			return A3(
				$elm$core$List$foldl,
				F2(
					function (imp, _v2) {
						var currName = _v2.a;
						var currAccum = _v2.b;
						var accum = _v2.c;
						var nextName = $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode(imp.moduleName);
						return _Utils_eq(nextName, currName) ? _Utils_Tuple3(
							currName,
							A2($elm$core$List$cons, imp, currAccum),
							accum) : _Utils_Tuple3(
							nextName,
							_List_fromArray(
								[imp]),
							A2($elm$core$List$cons, currAccum, accum));
					}),
				_Utils_Tuple3(
					$mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode(hd.moduleName),
					_List_Nil,
					_List_Nil),
				innerImports);
		}
	}();
	var hdGroup = _v0.b;
	var remGroups = _v0.c;
	return $elm$core$List$reverse(
		A2($elm$core$List$cons, hdGroup, remGroups));
};
var $mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupImports = function (imports) {
	var impName = function (imp) {
		return $mdgriffith$elm_codegen$Internal$ImportsAndExposing$denode(imp.moduleName);
	};
	return A2(
		$elm$core$List$map,
		$mdgriffith$elm_codegen$Internal$ImportsAndExposing$combineImports,
		$mdgriffith$elm_codegen$Internal$ImportsAndExposing$groupByModuleName(
			A2($elm$core$List$sortBy, impName, imports)));
};
var $mdgriffith$elm_codegen$Internal$Write$prettyImports = function (imports) {
	return $the_sett$elm_pretty_printer$Pretty$lines(
		A2(
			$elm$core$List$map,
			$mdgriffith$elm_codegen$Internal$Write$prettyImport,
			$mdgriffith$elm_codegen$Internal$ImportsAndExposing$sortAndDedupImports(imports)));
};
var $mdgriffith$elm_codegen$Internal$Write$importsPretty = function (imports) {
	if (!imports.b) {
		return $the_sett$elm_pretty_printer$Pretty$line;
	} else {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_pretty_printer$Pretty$line,
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$line,
					$mdgriffith$elm_codegen$Internal$Write$prettyImports(imports))));
	}
};
var $mdgriffith$elm_codegen$Internal$Write$prettyComments = function (comments) {
	if (!comments.b) {
		return $the_sett$elm_pretty_printer$Pretty$empty;
	} else {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_pretty_printer$Pretty$line,
				$the_sett$elm_pretty_printer$Pretty$lines(
					A2($elm$core$List$map, $the_sett$elm_pretty_printer$Pretty$string, comments))));
	}
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $the_sett$elm_pretty_printer$Internals$Nest = F2(
	function (a, b) {
		return {$: 'Nest', a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$nest = F2(
	function (depth, doc) {
		return A2(
			$the_sett$elm_pretty_printer$Internals$Nest,
			depth,
			function (_v0) {
				return doc;
			});
	});
var $elm$core$String$contains = _String_contains;
var $mdgriffith$elm_codegen$Internal$Write$prettyDocumentation = function (docs) {
	return A2($elm$core$String$contains, '\n', docs) ? $the_sett$elm_pretty_printer$Pretty$string('{-| ' + (docs + '\n-}')) : $the_sett$elm_pretty_printer$Pretty$string('{-| ' + (docs + ' -}'));
};
var $the_sett$elm_pretty_printer$Internals$Union = F2(
	function (a, b) {
		return {$: 'Union', a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Internals$flatten = function (doc) {
	flatten:
	while (true) {
		switch (doc.$) {
			case 'Concatenate':
				var doc1 = doc.a;
				var doc2 = doc.b;
				return A2(
					$the_sett$elm_pretty_printer$Internals$Concatenate,
					function (_v1) {
						return $the_sett$elm_pretty_printer$Internals$flatten(
							doc1(_Utils_Tuple0));
					},
					function (_v2) {
						return $the_sett$elm_pretty_printer$Internals$flatten(
							doc2(_Utils_Tuple0));
					});
			case 'Nest':
				var i = doc.a;
				var doc1 = doc.b;
				return A2(
					$the_sett$elm_pretty_printer$Internals$Nest,
					i,
					function (_v3) {
						return $the_sett$elm_pretty_printer$Internals$flatten(
							doc1(_Utils_Tuple0));
					});
			case 'Union':
				var doc1 = doc.a;
				var doc2 = doc.b;
				var $temp$doc = doc1;
				doc = $temp$doc;
				continue flatten;
			case 'Line':
				var hsep = doc.a;
				return A2($the_sett$elm_pretty_printer$Internals$Text, hsep, $elm$core$Maybe$Nothing);
			case 'Nesting':
				var fn = doc.a;
				var $temp$doc = fn(0);
				doc = $temp$doc;
				continue flatten;
			case 'Column':
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
	return A2(
		$the_sett$elm_pretty_printer$Internals$Union,
		$the_sett$elm_pretty_printer$Internals$flatten(doc),
		doc);
};
var $mdgriffith$elm_codegen$Internal$Write$isNakedCompound = function (typeAnn) {
	switch (typeAnn.$) {
		case 'Typed':
			if (!typeAnn.b.b) {
				return false;
			} else {
				var args = typeAnn.b;
				return true;
			}
		case 'FunctionTypeAnnotation':
			return true;
		default:
			return false;
	}
};
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyModuleNameDot = F2(
	function (aliases, name) {
		if (!name.b) {
			return $the_sett$elm_pretty_printer$Pretty$empty;
		} else {
			var _v1 = A2($mdgriffith$elm_codegen$Internal$Compiler$findAlias, name, aliases);
			if (_v1.$ === 'Nothing') {
				return A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$mdgriffith$elm_codegen$Internal$Write$dot,
					A2(
						$the_sett$elm_pretty_printer$Pretty$join,
						$mdgriffith$elm_codegen$Internal$Write$dot,
						A2($elm$core$List$map, $the_sett$elm_pretty_printer$Pretty$string, name)));
			} else {
				var alias = _v1.a;
				return A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$mdgriffith$elm_codegen$Internal$Write$dot,
					$the_sett$elm_pretty_printer$Pretty$string(alias));
			}
		}
	});
var $the_sett$elm_pretty_printer$Pretty$separators = function (sep) {
	return $the_sett$elm_pretty_printer$Pretty$join(
		A2($the_sett$elm_pretty_printer$Internals$Line, sep, sep));
};
var $the_sett$elm_pretty_printer$Pretty$words = $the_sett$elm_pretty_printer$Pretty$join($the_sett$elm_pretty_printer$Pretty$space);
var $mdgriffith$elm_codegen$Internal$Write$prettyFieldTypeAnn = F2(
	function (aliases, _v8) {
		var name = _v8.a;
		var ann = _v8.b;
		return $the_sett$elm_pretty_printer$Pretty$group(
			A2(
				$the_sett$elm_pretty_printer$Pretty$nest,
				4,
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							$the_sett$elm_pretty_printer$Pretty$words(
							_List_fromArray(
								[
									$the_sett$elm_pretty_printer$Pretty$string(name),
									$the_sett$elm_pretty_printer$Pretty$string(':')
								])),
							A2($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation, aliases, ann)
						]))));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyFunctionTypeAnnotation = F3(
	function (aliases, left, right) {
		var expandLeft = function (ann) {
			if (ann.$ === 'FunctionTypeAnnotation') {
				return A2($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotationParens, aliases, ann);
			} else {
				return A2($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation, aliases, ann);
			}
		};
		var innerFnTypeAnn = F2(
			function (innerLeft, innerRight) {
				var rightSide = expandRight(
					$mdgriffith$elm_codegen$Internal$Compiler$denode(innerRight));
				if (rightSide.b) {
					var hd = rightSide.a;
					var tl = rightSide.b;
					return A2(
						$elm$core$List$cons,
						expandLeft(
							$mdgriffith$elm_codegen$Internal$Compiler$denode(innerLeft)),
						A2(
							$elm$core$List$cons,
							$the_sett$elm_pretty_printer$Pretty$words(
								_List_fromArray(
									[
										$the_sett$elm_pretty_printer$Pretty$string('->'),
										hd
									])),
							tl));
				} else {
					return _List_Nil;
				}
			});
		var expandRight = function (ann) {
			if (ann.$ === 'FunctionTypeAnnotation') {
				var innerLeft = ann.a;
				var innerRight = ann.b;
				return A2(innerFnTypeAnn, innerLeft, innerRight);
			} else {
				return _List_fromArray(
					[
						A2($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation, aliases, ann)
					]);
			}
		};
		return $the_sett$elm_pretty_printer$Pretty$group(
			$the_sett$elm_pretty_printer$Pretty$lines(
				A2(innerFnTypeAnn, left, right)));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyGenericRecord = F3(
	function (aliases, paramName, fields) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			$the_sett$elm_pretty_printer$Pretty$words(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$string('{'),
						$the_sett$elm_pretty_printer$Pretty$string(paramName)
					])));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string('}'),
			$the_sett$elm_pretty_printer$Pretty$line);
		var addBarToFirst = function (exprs) {
			if (!exprs.b) {
				return _List_Nil;
			} else {
				var hd = exprs.a;
				var tl = exprs.b;
				return A2(
					$elm$core$List$cons,
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						hd,
						$the_sett$elm_pretty_printer$Pretty$string('| ')),
					tl);
			}
		};
		if (!fields.b) {
			return $the_sett$elm_pretty_printer$Pretty$string('{}');
		} else {
			return $the_sett$elm_pretty_printer$Pretty$group(
				A3(
					$the_sett$elm_pretty_printer$Pretty$surround,
					$the_sett$elm_pretty_printer$Pretty$empty,
					close,
					A2(
						$the_sett$elm_pretty_printer$Pretty$nest,
						4,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							A2(
								$the_sett$elm_pretty_printer$Pretty$separators,
								', ',
								addBarToFirst(
									A2(
										$elm$core$List$map,
										$mdgriffith$elm_codegen$Internal$Write$prettyFieldTypeAnn(aliases),
										A2(
											$elm$core$List$map,
											A2($elm$core$Tuple$mapBoth, $mdgriffith$elm_codegen$Internal$Compiler$denode, $mdgriffith$elm_codegen$Internal$Compiler$denode),
											fields)))),
							open))));
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyRecord = F2(
	function (aliases, fields) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			$the_sett$elm_pretty_printer$Pretty$string('{'));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string('}'),
			$the_sett$elm_pretty_printer$Pretty$line);
		if (!fields.b) {
			return $the_sett$elm_pretty_printer$Pretty$string('{}');
		} else {
			return $the_sett$elm_pretty_printer$Pretty$group(
				A3(
					$the_sett$elm_pretty_printer$Pretty$surround,
					open,
					close,
					A2(
						$the_sett$elm_pretty_printer$Pretty$separators,
						', ',
						A2(
							$elm$core$List$map,
							$mdgriffith$elm_codegen$Internal$Write$prettyFieldTypeAnn(aliases),
							A2(
								$elm$core$List$map,
								A2($elm$core$Tuple$mapBoth, $mdgriffith$elm_codegen$Internal$Compiler$denode, $mdgriffith$elm_codegen$Internal$Compiler$denode),
								fields)))));
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyTupled = F2(
	function (aliases, anns) {
		return $the_sett$elm_pretty_printer$Pretty$parens(
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_pretty_printer$Pretty$space,
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					A2(
						$the_sett$elm_pretty_printer$Pretty$join,
						$the_sett$elm_pretty_printer$Pretty$string(', '),
						A2(
							$elm$core$List$map,
							$mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation(aliases),
							$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(anns))),
					$the_sett$elm_pretty_printer$Pretty$space)));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation = F2(
	function (aliases, typeAnn) {
		switch (typeAnn.$) {
			case 'GenericType':
				var val = typeAnn.a;
				return $the_sett$elm_pretty_printer$Pretty$string(val);
			case 'Typed':
				var fqName = typeAnn.a;
				var anns = typeAnn.b;
				return A3($mdgriffith$elm_codegen$Internal$Write$prettyTyped, aliases, fqName, anns);
			case 'Unit':
				return $the_sett$elm_pretty_printer$Pretty$string('()');
			case 'Tupled':
				var anns = typeAnn.a;
				return A2($mdgriffith$elm_codegen$Internal$Write$prettyTupled, aliases, anns);
			case 'Record':
				var recordDef = typeAnn.a;
				return A2(
					$mdgriffith$elm_codegen$Internal$Write$prettyRecord,
					aliases,
					$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(recordDef));
			case 'GenericRecord':
				var paramName = typeAnn.a;
				var recordDef = typeAnn.b;
				return A3(
					$mdgriffith$elm_codegen$Internal$Write$prettyGenericRecord,
					aliases,
					$mdgriffith$elm_codegen$Internal$Compiler$denode(paramName),
					$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(
						$mdgriffith$elm_codegen$Internal$Compiler$denode(recordDef)));
			default:
				var fromAnn = typeAnn.a;
				var toAnn = typeAnn.b;
				return A3($mdgriffith$elm_codegen$Internal$Write$prettyFunctionTypeAnnotation, aliases, fromAnn, toAnn);
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotationParens = F2(
	function (aliases, typeAnn) {
		return $mdgriffith$elm_codegen$Internal$Write$isNakedCompound(typeAnn) ? $the_sett$elm_pretty_printer$Pretty$parens(
			A2($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation, aliases, typeAnn)) : A2($mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation, aliases, typeAnn);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyTyped = F3(
	function (aliases, fqName, anns) {
		var argsDoc = $the_sett$elm_pretty_printer$Pretty$words(
			A2(
				$elm$core$List$map,
				$mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotationParens(aliases),
				$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(anns)));
		var _v0 = $mdgriffith$elm_codegen$Internal$Compiler$denode(fqName);
		var moduleName = _v0.a;
		var typeName = _v0.b;
		var typeDoc = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(typeName),
			A2($mdgriffith$elm_codegen$Internal$Write$prettyModuleNameDot, aliases, moduleName));
		return $the_sett$elm_pretty_printer$Pretty$words(
			_List_fromArray(
				[typeDoc, argsDoc]));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyValueConstructor = F2(
	function (aliases, cons) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			$the_sett$elm_pretty_printer$Pretty$group(
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							$the_sett$elm_pretty_printer$Pretty$string(
							$mdgriffith$elm_codegen$Internal$Compiler$denode(cons.name)),
							$the_sett$elm_pretty_printer$Pretty$lines(
							A2(
								$elm$core$List$map,
								$mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotationParens(aliases),
								$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(cons._arguments)))
						]))));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyValueConstructors = F2(
	function (aliases, constructors) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$join,
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_pretty_printer$Pretty$string('| '),
				$the_sett$elm_pretty_printer$Pretty$line),
			A2(
				$elm$core$List$map,
				$mdgriffith$elm_codegen$Internal$Write$prettyValueConstructor(aliases),
				constructors));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyCustomType = F2(
	function (aliases, type_) {
		var customTypePretty = A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				A2(
					$mdgriffith$elm_codegen$Internal$Write$prettyValueConstructors,
					aliases,
					$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(type_.constructors)),
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$string('= '),
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$line,
						$the_sett$elm_pretty_printer$Pretty$words(
							_List_fromArray(
								[
									$the_sett$elm_pretty_printer$Pretty$string('type'),
									$the_sett$elm_pretty_printer$Pretty$string(
									$mdgriffith$elm_codegen$Internal$Compiler$denode(type_.name)),
									$the_sett$elm_pretty_printer$Pretty$words(
									A2(
										$elm$core$List$map,
										$the_sett$elm_pretty_printer$Pretty$string,
										$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(type_.generics)))
								]))))));
		return $the_sett$elm_pretty_printer$Pretty$lines(
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_codegen$Internal$Write$prettyMaybe,
					$mdgriffith$elm_codegen$Internal$Write$prettyDocumentation,
					$mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe(type_.documentation)),
					customTypePretty
				]));
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression = function (a) {
	return {$: 'ParenthesizedExpression', a: a};
};
var $mdgriffith$elm_codegen$Internal$Write$adjustExpressionParentheses = F2(
	function (context, expression) {
		var shouldRemove = function (expr) {
			var _v3 = _Utils_Tuple3(context.isTop, context.isLeftPipe, expr);
			_v3$1:
			while (true) {
				if (_v3.a) {
					return true;
				} else {
					switch (_v3.c.$) {
						case 'Application':
							if (_v3.b) {
								break _v3$1;
							} else {
								return (context.precedence < 11) ? true : false;
							}
						case 'FunctionOrValue':
							if (_v3.b) {
								break _v3$1;
							} else {
								var _v4 = _v3.c;
								return true;
							}
						case 'Integer':
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 'Hex':
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 'Floatable':
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 'Negation':
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 'Literal':
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 'CharLiteral':
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 'TupledExpression':
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 'RecordExpr':
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 'ListExpr':
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 'RecordAccess':
							if (_v3.b) {
								break _v3$1;
							} else {
								var _v5 = _v3.c;
								return true;
							}
						case 'RecordAccessFunction':
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 'RecordUpdateExpression':
							if (_v3.b) {
								break _v3$1;
							} else {
								var _v6 = _v3.c;
								return true;
							}
						default:
							if (_v3.b) {
								break _v3$1;
							} else {
								return false;
							}
					}
				}
			}
			return true;
		};
		var removeParens = function (expr) {
			if (expr.$ === 'ParenthesizedExpression') {
				var innerExpr = expr.a;
				return shouldRemove(
					$mdgriffith$elm_codegen$Internal$Compiler$denode(innerExpr)) ? removeParens(
					$mdgriffith$elm_codegen$Internal$Compiler$denode(innerExpr)) : expr;
			} else {
				return expr;
			}
		};
		var addParens = function (expr) {
			var _v1 = _Utils_Tuple3(context.isTop, context.isLeftPipe, expr);
			_v1$4:
			while (true) {
				if ((!_v1.a) && (!_v1.b)) {
					switch (_v1.c.$) {
						case 'LetExpression':
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(expr));
						case 'CaseExpression':
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(expr));
						case 'LambdaExpression':
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(expr));
						case 'IfBlock':
							var _v2 = _v1.c;
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(expr));
						default:
							break _v1$4;
					}
				} else {
					break _v1$4;
				}
			}
			return expr;
		};
		return addParens(
			removeParens(expression));
	});
var $the_sett$elm_pretty_printer$Internals$Column = function (a) {
	return {$: 'Column', a: a};
};
var $the_sett$elm_pretty_printer$Pretty$column = $the_sett$elm_pretty_printer$Internals$Column;
var $the_sett$elm_pretty_printer$Internals$Nesting = function (a) {
	return {$: 'Nesting', a: a};
};
var $the_sett$elm_pretty_printer$Pretty$nesting = $the_sett$elm_pretty_printer$Internals$Nesting;
var $the_sett$elm_pretty_printer$Pretty$align = function (doc) {
	return $the_sett$elm_pretty_printer$Pretty$column(
		function (currentColumn) {
			return $the_sett$elm_pretty_printer$Pretty$nesting(
				function (indentLvl) {
					return A2($the_sett$elm_pretty_printer$Pretty$nest, currentColumn - indentLvl, doc);
				});
		});
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $mdgriffith$elm_codegen$Internal$Write$decrementIndent = F2(
	function (currentIndent, spaces) {
		var modded = A2($elm$core$Basics$modBy, 4, currentIndent - spaces);
		return (!modded) ? 4 : modded;
	});
var $mdgriffith$elm_codegen$Internal$Write$doubleLines = $the_sett$elm_pretty_printer$Pretty$join(
	A2($the_sett$elm_pretty_printer$Pretty$a, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$line));
var $mdgriffith$elm_codegen$Internal$Write$escapeChar = function (val) {
	switch (val.valueOf()) {
		case '\\':
			return '\\\\';
		case '\'':
			return '\\\'';
		case '\t':
			return '\\t';
		case '\n':
			return '\\n';
		default:
			var c = val;
			return $elm$core$String$fromChar(c);
	}
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $the_sett$elm_pretty_printer$Internals$copy = F2(
	function (i, s) {
		return (!i) ? '' : _Utils_ap(
			s,
			A2($the_sett$elm_pretty_printer$Internals$copy, i - 1, s));
	});
var $the_sett$elm_pretty_printer$Pretty$hang = F2(
	function (spaces, doc) {
		return $the_sett$elm_pretty_printer$Pretty$align(
			A2($the_sett$elm_pretty_printer$Pretty$nest, spaces, doc));
	});
var $the_sett$elm_pretty_printer$Pretty$indent = F2(
	function (spaces, doc) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$hang,
			spaces,
			A2(
				$the_sett$elm_pretty_printer$Pretty$append,
				$the_sett$elm_pretty_printer$Pretty$string(
					A2($the_sett$elm_pretty_printer$Internals$copy, spaces, ' ')),
				doc));
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $mdgriffith$elm_codegen$Internal$Write$optionalGroup = F2(
	function (flag, doc) {
		return flag ? doc : $the_sett$elm_pretty_printer$Pretty$group(doc);
	});
var $mdgriffith$elm_codegen$Internal$Write$precedence = function (symbol) {
	switch (symbol) {
		case '>>':
			return 9;
		case '<<':
			return 9;
		case '^':
			return 8;
		case '*':
			return 7;
		case '/':
			return 7;
		case '//':
			return 7;
		case '%':
			return 7;
		case 'rem':
			return 7;
		case '+':
			return 6;
		case '-':
			return 6;
		case '++':
			return 5;
		case '::':
			return 5;
		case '==':
			return 4;
		case '/=':
			return 4;
		case '<':
			return 4;
		case '>':
			return 4;
		case '<=':
			return 4;
		case '>=':
			return 4;
		case '&&':
			return 3;
		case '||':
			return 2;
		case '|>':
			return 0;
		case '<|':
			return 0;
		default:
			return 0;
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern = function (a) {
	return {$: 'ParenthesizedPattern', a: a};
};
var $mdgriffith$elm_codegen$Internal$Write$adjustPatternParentheses = F2(
	function (isTop, pattern) {
		var shouldRemove = function (pat) {
			var _v5 = _Utils_Tuple2(isTop, pat);
			_v5$2:
			while (true) {
				switch (_v5.b.$) {
					case 'NamedPattern':
						if (!_v5.a) {
							var _v6 = _v5.b;
							return false;
						} else {
							break _v5$2;
						}
					case 'AsPattern':
						var _v7 = _v5.b;
						return false;
					default:
						break _v5$2;
				}
			}
			return isTop;
		};
		var removeParens = function (pat) {
			if (pat.$ === 'ParenthesizedPattern') {
				var innerPat = pat.a;
				return shouldRemove(
					$mdgriffith$elm_codegen$Internal$Compiler$denode(innerPat)) ? removeParens(
					$mdgriffith$elm_codegen$Internal$Compiler$denode(innerPat)) : pat;
			} else {
				return pat;
			}
		};
		var addParens = function (pat) {
			var _v1 = _Utils_Tuple2(isTop, pat);
			_v1$2:
			while (true) {
				if (!_v1.a) {
					switch (_v1.b.$) {
						case 'NamedPattern':
							if (_v1.b.b.b) {
								var _v2 = _v1.b;
								var _v3 = _v2.b;
								return $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern(
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(pat));
							} else {
								break _v1$2;
							}
						case 'AsPattern':
							var _v4 = _v1.b;
							return $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern(
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(pat));
						default:
							break _v1$2;
					}
				} else {
					break _v1$2;
				}
			}
			return pat;
		};
		return addParens(
			removeParens(pattern));
	});
var $the_sett$elm_pretty_printer$Pretty$braces = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$char(
			_Utils_chr('{')),
		$the_sett$elm_pretty_printer$Pretty$char(
			_Utils_chr('}')),
		doc);
};
var $mdgriffith$elm_codegen$Internal$Write$quotes = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$char(
			_Utils_chr('\"')),
		$the_sett$elm_pretty_printer$Pretty$char(
			_Utils_chr('\"')),
		doc);
};
var $mdgriffith$elm_codegen$Internal$Write$singleQuotes = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$char(
			_Utils_chr('\'')),
		$the_sett$elm_pretty_printer$Pretty$char(
			_Utils_chr('\'')),
		doc);
};
var $elm$core$String$fromList = _String_fromList;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			_Utils_chr('-'),
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $mdgriffith$elm_codegen$Internal$Write$prettyPatternInner = F3(
	function (aliases, isTop, pattern) {
		var _v0 = A2($mdgriffith$elm_codegen$Internal$Write$adjustPatternParentheses, isTop, pattern);
		switch (_v0.$) {
			case 'AllPattern':
				return $the_sett$elm_pretty_printer$Pretty$string('_');
			case 'UnitPattern':
				return $the_sett$elm_pretty_printer$Pretty$string('()');
			case 'CharPattern':
				var val = _v0.a;
				return $mdgriffith$elm_codegen$Internal$Write$singleQuotes(
					$the_sett$elm_pretty_printer$Pretty$string(
						$mdgriffith$elm_codegen$Internal$Write$escapeChar(val)));
			case 'StringPattern':
				var val = _v0.a;
				return $mdgriffith$elm_codegen$Internal$Write$quotes(
					$the_sett$elm_pretty_printer$Pretty$string(val));
			case 'IntPattern':
				var val = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$string(
					$elm$core$String$fromInt(val));
			case 'HexPattern':
				var val = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$string(
					$rtfeldman$elm_hex$Hex$toString(val));
			case 'FloatPattern':
				var val = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$string(
					$elm$core$String$fromFloat(val));
			case 'TuplePattern':
				var vals = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$parens(
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$space,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							A2(
								$the_sett$elm_pretty_printer$Pretty$join,
								$the_sett$elm_pretty_printer$Pretty$string(', '),
								A2(
									$elm$core$List$map,
									A2($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, true),
									$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(vals))),
							$the_sett$elm_pretty_printer$Pretty$space)));
			case 'RecordPattern':
				var fields = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$braces(
					A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						$the_sett$elm_pretty_printer$Pretty$space,
						$the_sett$elm_pretty_printer$Pretty$space,
						A2(
							$the_sett$elm_pretty_printer$Pretty$join,
							$the_sett$elm_pretty_printer$Pretty$string(', '),
							A2(
								$elm$core$List$map,
								$the_sett$elm_pretty_printer$Pretty$string,
								$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(fields)))));
			case 'UnConsPattern':
				var hdPat = _v0.a;
				var tlPat = _v0.b;
				return $the_sett$elm_pretty_printer$Pretty$words(
					_List_fromArray(
						[
							A3(
							$mdgriffith$elm_codegen$Internal$Write$prettyPatternInner,
							aliases,
							false,
							$mdgriffith$elm_codegen$Internal$Compiler$denode(hdPat)),
							$the_sett$elm_pretty_printer$Pretty$string('::'),
							A3(
							$mdgriffith$elm_codegen$Internal$Write$prettyPatternInner,
							aliases,
							false,
							$mdgriffith$elm_codegen$Internal$Compiler$denode(tlPat))
						]));
			case 'ListPattern':
				var listPats = _v0.a;
				if (!listPats.b) {
					return $the_sett$elm_pretty_printer$Pretty$string('[]');
				} else {
					var open = A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$space,
						$the_sett$elm_pretty_printer$Pretty$string('['));
					var close = A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$string(']'),
						$the_sett$elm_pretty_printer$Pretty$space);
					return A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						open,
						close,
						A2(
							$the_sett$elm_pretty_printer$Pretty$join,
							$the_sett$elm_pretty_printer$Pretty$string(', '),
							A2(
								$elm$core$List$map,
								A2($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, false),
								$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(listPats))));
				}
			case 'VarPattern':
				var _var = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$string(_var);
			case 'NamedPattern':
				var qnRef = _v0.a;
				var listPats = _v0.b;
				return $the_sett$elm_pretty_printer$Pretty$words(
					A2(
						$elm$core$List$cons,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							$the_sett$elm_pretty_printer$Pretty$string(qnRef.name),
							A2($mdgriffith$elm_codegen$Internal$Write$prettyModuleNameDot, aliases, qnRef.moduleName)),
						A2(
							$elm$core$List$map,
							A2($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, false),
							$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(listPats))));
			case 'AsPattern':
				var pat = _v0.a;
				var name = _v0.b;
				return $the_sett$elm_pretty_printer$Pretty$words(
					_List_fromArray(
						[
							A3(
							$mdgriffith$elm_codegen$Internal$Write$prettyPatternInner,
							aliases,
							false,
							$mdgriffith$elm_codegen$Internal$Compiler$denode(pat)),
							$the_sett$elm_pretty_printer$Pretty$string('as'),
							$the_sett$elm_pretty_printer$Pretty$string(
							$mdgriffith$elm_codegen$Internal$Compiler$denode(name))
						]));
			default:
				var pat = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$parens(
					A3(
						$mdgriffith$elm_codegen$Internal$Write$prettyPatternInner,
						aliases,
						true,
						$mdgriffith$elm_codegen$Internal$Compiler$denode(pat)));
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyArgs = F2(
	function (aliases, args) {
		return $the_sett$elm_pretty_printer$Pretty$words(
			A2(
				$elm$core$List$map,
				A2($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, false),
				args));
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $mdgriffith$elm_codegen$Internal$Write$escape = function (val) {
	return A3(
		$elm$core$String$replace,
		'\t',
		'\\t',
		A3(
			$elm$core$String$replace,
			'\n',
			'\\n',
			A3(
				$elm$core$String$replace,
				'\"',
				'\\\"',
				A3($elm$core$String$replace, '\\', '\\\\', val))));
};
var $mdgriffith$elm_codegen$Internal$Write$tripleQuotes = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$string('\"\"\"'),
		$the_sett$elm_pretty_printer$Pretty$string('\"\"\"'),
		doc);
};
var $mdgriffith$elm_codegen$Internal$Write$prettyLiteral = function (val) {
	return A2($elm$core$String$contains, '\n', val) ? $mdgriffith$elm_codegen$Internal$Write$tripleQuotes(
		$the_sett$elm_pretty_printer$Pretty$string(val)) : $mdgriffith$elm_codegen$Internal$Write$quotes(
		$the_sett$elm_pretty_printer$Pretty$string(
			$mdgriffith$elm_codegen$Internal$Write$escape(val)));
};
var $mdgriffith$elm_codegen$Internal$Write$prettyPattern = F2(
	function (aliases, pattern) {
		return A3($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, true, pattern);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettySignature = F2(
	function (aliases, sig) {
		return $the_sett$elm_pretty_printer$Pretty$group(
			A2(
				$the_sett$elm_pretty_printer$Pretty$nest,
				4,
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							$the_sett$elm_pretty_printer$Pretty$words(
							_List_fromArray(
								[
									$the_sett$elm_pretty_printer$Pretty$string(
									$mdgriffith$elm_codegen$Internal$Compiler$denode(sig.name)),
									$the_sett$elm_pretty_printer$Pretty$string(':')
								])),
							A2(
							$mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation,
							aliases,
							$mdgriffith$elm_codegen$Internal$Compiler$denode(sig.typeAnnotation))
						]))));
	});
var $the_sett$elm_pretty_printer$Pretty$tightline = A2($the_sett$elm_pretty_printer$Internals$Line, '', '');
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $mdgriffith$elm_codegen$Internal$Write$toHexString = function (val) {
	var padWithZeros = function (str) {
		var length = $elm$core$String$length(str);
		return (length < 2) ? A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			str) : (((length > 2) && (length < 4)) ? A3(
			$elm$core$String$padLeft,
			4,
			_Utils_chr('0'),
			str) : (((length > 4) && (length < 8)) ? A3(
			$elm$core$String$padLeft,
			8,
			_Utils_chr('0'),
			str) : str));
	};
	return '0x' + padWithZeros(
		$elm$core$String$toUpper(
			$rtfeldman$elm_hex$Hex$toString(val)));
};
var $mdgriffith$elm_codegen$Internal$Write$topContext = {isLeftPipe: false, isTop: true, precedence: 11};
var $elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_v0, _v1) {
			var x = _v0.a;
			var y = _v0.b;
			var xs = _v1.a;
			var ys = _v1.b;
			return _Utils_Tuple2(
				A2($elm$core$List$cons, x, xs),
				A2($elm$core$List$cons, y, ys));
		});
	return A3(
		$elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var $mdgriffith$elm_codegen$Internal$Write$prettyApplication = F3(
	function (aliases, indent, exprs) {
		var _v30 = A2(
			$elm$core$Tuple$mapSecond,
			$elm$core$List$any($elm$core$Basics$identity),
			$elm$core$List$unzip(
				A2(
					$elm$core$List$map,
					A3(
						$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
						aliases,
						{isLeftPipe: false, isTop: false, precedence: 11},
						4),
					$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(exprs))));
		var prettyExpressions = _v30.a;
		var alwaysBreak = _v30.b;
		return _Utils_Tuple2(
			A2(
				$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A2(
						$the_sett$elm_pretty_printer$Pretty$nest,
						indent,
						$the_sett$elm_pretty_printer$Pretty$lines(prettyExpressions)))),
			alwaysBreak);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyCaseBlock = F3(
	function (aliases, indent, caseBlock) {
		var prettyCase = function (_v29) {
			var pattern = _v29.a;
			var expr = _v29.b;
			return A2(
				$the_sett$elm_pretty_printer$Pretty$indent,
				indent,
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					A2(
						$the_sett$elm_pretty_printer$Pretty$indent,
						4,
						A4(
							$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
							aliases,
							$mdgriffith$elm_codegen$Internal$Write$topContext,
							4,
							$mdgriffith$elm_codegen$Internal$Compiler$denode(expr)).a),
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$line,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							$the_sett$elm_pretty_printer$Pretty$string(' ->'),
							A2(
								$mdgriffith$elm_codegen$Internal$Write$prettyPattern,
								aliases,
								$mdgriffith$elm_codegen$Internal$Compiler$denode(pattern))))));
		};
		var patternsPart = $mdgriffith$elm_codegen$Internal$Write$doubleLines(
			A2($elm$core$List$map, prettyCase, caseBlock.cases));
		var casePart = function () {
			var _v28 = A4(
				$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
				aliases,
				$mdgriffith$elm_codegen$Internal$Write$topContext,
				4,
				$mdgriffith$elm_codegen$Internal$Compiler$denode(caseBlock.expression));
			var caseExpression = _v28.a;
			var alwaysBreak = _v28.b;
			return A2(
				$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							A2(
							$the_sett$elm_pretty_printer$Pretty$nest,
							indent,
							A2(
								$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
								alwaysBreak,
								$the_sett$elm_pretty_printer$Pretty$lines(
									_List_fromArray(
										[
											$the_sett$elm_pretty_printer$Pretty$string('case'),
											caseExpression
										])))),
							$the_sett$elm_pretty_printer$Pretty$string('of')
						])));
		}();
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$align(
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[casePart, patternsPart]))),
			true);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyExpression = F2(
	function (aliases, expression) {
		return A4($mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner, aliases, $mdgriffith$elm_codegen$Internal$Write$topContext, 4, expression).a;
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner = F4(
	function (aliases, context, indent, expression) {
		var _v26 = A2($mdgriffith$elm_codegen$Internal$Write$adjustExpressionParentheses, context, expression);
		switch (_v26.$) {
			case 'UnitExpr':
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string('()'),
					false);
			case 'Application':
				var exprs = _v26.a;
				return A3($mdgriffith$elm_codegen$Internal$Write$prettyApplication, aliases, indent, exprs);
			case 'OperatorApplication':
				var symbol = _v26.a;
				var dir = _v26.b;
				var exprl = _v26.c;
				var exprr = _v26.d;
				return A6($mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplication, aliases, indent, symbol, dir, exprl, exprr);
			case 'FunctionOrValue':
				var modl = _v26.a;
				var val = _v26.b;
				return _Utils_Tuple2(
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$string(val),
						A2($mdgriffith$elm_codegen$Internal$Write$prettyModuleNameDot, aliases, modl)),
					false);
			case 'IfBlock':
				var exprBool = _v26.a;
				var exprTrue = _v26.b;
				var exprFalse = _v26.c;
				return A5($mdgriffith$elm_codegen$Internal$Write$prettyIfBlock, aliases, indent, exprBool, exprTrue, exprFalse);
			case 'PrefixOperator':
				var symbol = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$parens(
						$the_sett$elm_pretty_printer$Pretty$string(symbol)),
					false);
			case 'Operator':
				var symbol = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string(symbol),
					false);
			case 'Integer':
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string(
						$elm$core$String$fromInt(val)),
					false);
			case 'Hex':
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string(
						$mdgriffith$elm_codegen$Internal$Write$toHexString(val)),
					false);
			case 'Floatable':
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string(
						$elm$core$String$fromFloat(val)),
					false);
			case 'Negation':
				var expr = _v26.a;
				var _v27 = A4(
					$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
					aliases,
					$mdgriffith$elm_codegen$Internal$Write$topContext,
					4,
					$mdgriffith$elm_codegen$Internal$Compiler$denode(expr));
				var prettyExpr = _v27.a;
				var alwaysBreak = _v27.b;
				return _Utils_Tuple2(
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						prettyExpr,
						$the_sett$elm_pretty_printer$Pretty$string('-')),
					alwaysBreak);
			case 'Literal':
				var val = _v26.a;
				return _Utils_Tuple2(
					$mdgriffith$elm_codegen$Internal$Write$prettyLiteral(val),
					false);
			case 'CharLiteral':
				var val = _v26.a;
				return _Utils_Tuple2(
					$mdgriffith$elm_codegen$Internal$Write$singleQuotes(
						$the_sett$elm_pretty_printer$Pretty$string(
							$mdgriffith$elm_codegen$Internal$Write$escapeChar(val))),
					false);
			case 'TupledExpression':
				var exprs = _v26.a;
				return A3($mdgriffith$elm_codegen$Internal$Write$prettyTupledExpression, aliases, indent, exprs);
			case 'ParenthesizedExpression':
				var expr = _v26.a;
				return A3($mdgriffith$elm_codegen$Internal$Write$prettyParenthesizedExpression, aliases, indent, expr);
			case 'LetExpression':
				var letBlock = _v26.a;
				return A3($mdgriffith$elm_codegen$Internal$Write$prettyLetBlock, aliases, indent, letBlock);
			case 'CaseExpression':
				var caseBlock = _v26.a;
				return A3($mdgriffith$elm_codegen$Internal$Write$prettyCaseBlock, aliases, indent, caseBlock);
			case 'LambdaExpression':
				var lambda = _v26.a;
				return A3($mdgriffith$elm_codegen$Internal$Write$prettyLambdaExpression, aliases, indent, lambda);
			case 'RecordExpr':
				var setters = _v26.a;
				return A2($mdgriffith$elm_codegen$Internal$Write$prettyRecordExpr, aliases, setters);
			case 'ListExpr':
				var exprs = _v26.a;
				return A3($mdgriffith$elm_codegen$Internal$Write$prettyList, aliases, indent, exprs);
			case 'RecordAccess':
				var expr = _v26.a;
				var field = _v26.b;
				return A3($mdgriffith$elm_codegen$Internal$Write$prettyRecordAccess, aliases, expr, field);
			case 'RecordAccessFunction':
				var field = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string(field),
					false);
			case 'RecordUpdateExpression':
				var _var = _v26.a;
				var setters = _v26.b;
				return A4($mdgriffith$elm_codegen$Internal$Write$prettyRecordUpdateExpression, aliases, indent, _var, setters);
			default:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string('glsl'),
					true);
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyFun = F2(
	function (aliases, fn) {
		return $the_sett$elm_pretty_printer$Pretty$lines(
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_codegen$Internal$Write$prettyMaybe,
					$mdgriffith$elm_codegen$Internal$Write$prettyDocumentation,
					$mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe(fn.documentation)),
					A2(
					$mdgriffith$elm_codegen$Internal$Write$prettyMaybe,
					$mdgriffith$elm_codegen$Internal$Write$prettySignature(aliases),
					$mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe(fn.signature)),
					A2(
					$mdgriffith$elm_codegen$Internal$Write$prettyFunctionImplementation,
					aliases,
					$mdgriffith$elm_codegen$Internal$Compiler$denode(fn.declaration))
				]));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyFunctionImplementation = F2(
	function (aliases, impl) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				A2(
					$mdgriffith$elm_codegen$Internal$Write$prettyExpression,
					aliases,
					$mdgriffith$elm_codegen$Internal$Compiler$denode(impl.expression)),
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$line,
					$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								$the_sett$elm_pretty_printer$Pretty$string(
								$mdgriffith$elm_codegen$Internal$Compiler$denode(impl.name)),
								A2(
								$mdgriffith$elm_codegen$Internal$Write$prettyArgs,
								aliases,
								$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(impl._arguments)),
								$the_sett$elm_pretty_printer$Pretty$string('=')
							])))));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyIfBlock = F5(
	function (aliases, indent, exprBool, exprTrue, exprFalse) {
		var innerIfBlock = F3(
			function (innerExprBool, innerExprTrue, innerExprFalse) {
				var truePart = A2(
					$the_sett$elm_pretty_printer$Pretty$indent,
					indent,
					A4(
						$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
						aliases,
						$mdgriffith$elm_codegen$Internal$Write$topContext,
						4,
						$mdgriffith$elm_codegen$Internal$Compiler$denode(innerExprTrue)).a);
				var ifPart = function () {
					var _v25 = A4(
						$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
						aliases,
						$mdgriffith$elm_codegen$Internal$Write$topContext,
						4,
						$mdgriffith$elm_codegen$Internal$Compiler$denode(innerExprBool));
					var prettyBoolExpr = _v25.a;
					var alwaysBreak = _v25.b;
					return A2(
						$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
						alwaysBreak,
						$the_sett$elm_pretty_printer$Pretty$lines(
							_List_fromArray(
								[
									A2(
									$the_sett$elm_pretty_printer$Pretty$nest,
									indent,
									A2(
										$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
										alwaysBreak,
										$the_sett$elm_pretty_printer$Pretty$lines(
											_List_fromArray(
												[
													$the_sett$elm_pretty_printer$Pretty$string('if'),
													A4(
													$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
													aliases,
													$mdgriffith$elm_codegen$Internal$Write$topContext,
													4,
													$mdgriffith$elm_codegen$Internal$Compiler$denode(innerExprBool)).a
												])))),
									$the_sett$elm_pretty_printer$Pretty$string('then')
								])));
				}();
				var falsePart = function () {
					var _v24 = $mdgriffith$elm_codegen$Internal$Compiler$denode(innerExprFalse);
					if (_v24.$ === 'IfBlock') {
						var nestedExprBool = _v24.a;
						var nestedExprTrue = _v24.b;
						var nestedExprFalse = _v24.c;
						return A3(innerIfBlock, nestedExprBool, nestedExprTrue, nestedExprFalse);
					} else {
						return _List_fromArray(
							[
								A2(
								$the_sett$elm_pretty_printer$Pretty$indent,
								indent,
								A4(
									$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
									aliases,
									$mdgriffith$elm_codegen$Internal$Write$topContext,
									4,
									$mdgriffith$elm_codegen$Internal$Compiler$denode(innerExprFalse)).a)
							]);
					}
				}();
				var elsePart = A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$string('else'),
					$the_sett$elm_pretty_printer$Pretty$line);
				var context = $mdgriffith$elm_codegen$Internal$Write$topContext;
				if (!falsePart.b) {
					return _List_Nil;
				} else {
					if (!falsePart.b.b) {
						var falseExpr = falsePart.a;
						return _List_fromArray(
							[ifPart, truePart, elsePart, falseExpr]);
					} else {
						var hd = falsePart.a;
						var tl = falsePart.b;
						return A2(
							$elm$core$List$append,
							_List_fromArray(
								[
									ifPart,
									truePart,
									$the_sett$elm_pretty_printer$Pretty$words(
									_List_fromArray(
										[elsePart, hd]))
								]),
							tl);
					}
				}
			});
		var prettyExpressions = A3(innerIfBlock, exprBool, exprTrue, exprFalse);
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$align(
				$the_sett$elm_pretty_printer$Pretty$lines(prettyExpressions)),
			true);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyLambdaExpression = F3(
	function (aliases, indent, lambda) {
		var _v22 = A4(
			$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
			aliases,
			$mdgriffith$elm_codegen$Internal$Write$topContext,
			4,
			$mdgriffith$elm_codegen$Internal$Compiler$denode(lambda.expression));
		var prettyExpr = _v22.a;
		var alwaysBreak = _v22.b;
		return _Utils_Tuple2(
			A2(
				$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A2(
						$the_sett$elm_pretty_printer$Pretty$nest,
						indent,
						$the_sett$elm_pretty_printer$Pretty$lines(
							_List_fromArray(
								[
									A2(
									$the_sett$elm_pretty_printer$Pretty$a,
									$the_sett$elm_pretty_printer$Pretty$string(' ->'),
									A2(
										$the_sett$elm_pretty_printer$Pretty$a,
										$the_sett$elm_pretty_printer$Pretty$words(
											A2(
												$elm$core$List$map,
												A2($mdgriffith$elm_codegen$Internal$Write$prettyPatternInner, aliases, false),
												$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(lambda.args))),
										$the_sett$elm_pretty_printer$Pretty$string('\\'))),
									prettyExpr
								]))))),
			alwaysBreak);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyLetBlock = F3(
	function (aliases, indent, letBlock) {
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$align(
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							$the_sett$elm_pretty_printer$Pretty$string('let'),
							A2(
							$the_sett$elm_pretty_printer$Pretty$indent,
							indent,
							$mdgriffith$elm_codegen$Internal$Write$doubleLines(
								A2(
									$elm$core$List$map,
									A2($mdgriffith$elm_codegen$Internal$Write$prettyLetDeclaration, aliases, indent),
									$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(letBlock.declarations)))),
							$the_sett$elm_pretty_printer$Pretty$string('in'),
							A4(
							$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
							aliases,
							$mdgriffith$elm_codegen$Internal$Write$topContext,
							4,
							$mdgriffith$elm_codegen$Internal$Compiler$denode(letBlock.expression)).a
						]))),
			true);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyLetDeclaration = F3(
	function (aliases, indent, letDecl) {
		if (letDecl.$ === 'LetFunction') {
			var fn = letDecl.a;
			return A2($mdgriffith$elm_codegen$Internal$Write$prettyFun, aliases, fn);
		} else {
			var pattern = letDecl.a;
			var expr = letDecl.b;
			return A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				A2(
					$the_sett$elm_pretty_printer$Pretty$indent,
					indent,
					A4(
						$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
						aliases,
						$mdgriffith$elm_codegen$Internal$Write$topContext,
						4,
						$mdgriffith$elm_codegen$Internal$Compiler$denode(expr)).a),
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$line,
					$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Internal$Write$prettyPatternInner,
								aliases,
								false,
								$mdgriffith$elm_codegen$Internal$Compiler$denode(pattern)),
								$the_sett$elm_pretty_printer$Pretty$string('=')
							]))));
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyList = F3(
	function (aliases, indent, exprs) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			$the_sett$elm_pretty_printer$Pretty$string('['));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(']'),
			$the_sett$elm_pretty_printer$Pretty$line);
		if (!exprs.b) {
			return _Utils_Tuple2(
				$the_sett$elm_pretty_printer$Pretty$string('[]'),
				false);
		} else {
			var _v20 = A2(
				$elm$core$Tuple$mapSecond,
				$elm$core$List$any($elm$core$Basics$identity),
				$elm$core$List$unzip(
					A2(
						$elm$core$List$map,
						A3(
							$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
							aliases,
							$mdgriffith$elm_codegen$Internal$Write$topContext,
							A2($mdgriffith$elm_codegen$Internal$Write$decrementIndent, indent, 2)),
						$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(exprs))));
			var prettyExpressions = _v20.a;
			var alwaysBreak = _v20.b;
			return _Utils_Tuple2(
				A2(
					$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$align(
						A3(
							$the_sett$elm_pretty_printer$Pretty$surround,
							open,
							close,
							A2($the_sett$elm_pretty_printer$Pretty$separators, ', ', prettyExpressions)))),
				alwaysBreak);
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplication = F6(
	function (aliases, indent, symbol, dir, exprl, exprr) {
		return (symbol === '<|') ? A6($mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationLeft, aliases, indent, symbol, dir, exprl, exprr) : A6($mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationRight, aliases, indent, symbol, dir, exprl, exprr);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationLeft = F6(
	function (aliases, indent, symbol, _v16, exprl, exprr) {
		var context = {
			isLeftPipe: true,
			isTop: false,
			precedence: $mdgriffith$elm_codegen$Internal$Write$precedence(symbol)
		};
		var _v17 = A4(
			$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
			aliases,
			context,
			4,
			$mdgriffith$elm_codegen$Internal$Compiler$denode(exprr));
		var prettyExpressionRight = _v17.a;
		var alwaysBreakRight = _v17.b;
		var _v18 = A4(
			$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
			aliases,
			context,
			4,
			$mdgriffith$elm_codegen$Internal$Compiler$denode(exprl));
		var prettyExpressionLeft = _v18.a;
		var alwaysBreakLeft = _v18.b;
		var alwaysBreak = alwaysBreakLeft || alwaysBreakRight;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_pretty_printer$Pretty$nest,
				4,
				A2(
					$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$lines(
						_List_fromArray(
							[
								$the_sett$elm_pretty_printer$Pretty$words(
								_List_fromArray(
									[
										prettyExpressionLeft,
										$the_sett$elm_pretty_printer$Pretty$string(symbol)
									])),
								prettyExpressionRight
							])))),
			alwaysBreak);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyOperatorApplicationRight = F6(
	function (aliases, indent, symbol, _v11, exprl, exprr) {
		var expandExpr = F3(
			function (innerIndent, context, expr) {
				if (expr.$ === 'OperatorApplication') {
					var sym = expr.a;
					var left = expr.c;
					var right = expr.d;
					return A4(innerOpApply, false, sym, left, right);
				} else {
					return _List_fromArray(
						[
							A4($mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner, aliases, context, innerIndent, expr)
						]);
				}
			});
		var innerOpApply = F4(
			function (isTop, sym, left, right) {
				var innerIndent = A2(
					$mdgriffith$elm_codegen$Internal$Write$decrementIndent,
					4,
					$elm$core$String$length(symbol) + 1);
				var leftIndent = isTop ? indent : innerIndent;
				var context = {
					isLeftPipe: '<|' === sym,
					isTop: false,
					precedence: $mdgriffith$elm_codegen$Internal$Write$precedence(sym)
				};
				var rightSide = A3(
					expandExpr,
					innerIndent,
					context,
					$mdgriffith$elm_codegen$Internal$Compiler$denode(right));
				if (rightSide.b) {
					var _v14 = rightSide.a;
					var hdExpr = _v14.a;
					var hdBreak = _v14.b;
					var tl = rightSide.b;
					return A2(
						$elm$core$List$append,
						A3(
							expandExpr,
							leftIndent,
							context,
							$mdgriffith$elm_codegen$Internal$Compiler$denode(left)),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								A2(
									$the_sett$elm_pretty_printer$Pretty$a,
									hdExpr,
									A2(
										$the_sett$elm_pretty_printer$Pretty$a,
										$the_sett$elm_pretty_printer$Pretty$space,
										$the_sett$elm_pretty_printer$Pretty$string(sym))),
								hdBreak),
							tl));
				} else {
					return _List_Nil;
				}
			});
		var _v12 = A2(
			$elm$core$Tuple$mapSecond,
			$elm$core$List$any($elm$core$Basics$identity),
			$elm$core$List$unzip(
				A4(innerOpApply, true, symbol, exprl, exprr)));
		var prettyExpressions = _v12.a;
		var alwaysBreak = _v12.b;
		return _Utils_Tuple2(
			A2(
				$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A2(
						$the_sett$elm_pretty_printer$Pretty$join,
						A2($the_sett$elm_pretty_printer$Pretty$nest, indent, $the_sett$elm_pretty_printer$Pretty$line),
						prettyExpressions))),
			alwaysBreak);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyParenthesizedExpression = F3(
	function (aliases, indent, expr) {
		var open = $the_sett$elm_pretty_printer$Pretty$string('(');
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(')'),
			$the_sett$elm_pretty_printer$Pretty$tightline);
		var _v10 = A4(
			$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
			aliases,
			$mdgriffith$elm_codegen$Internal$Write$topContext,
			A2($mdgriffith$elm_codegen$Internal$Write$decrementIndent, indent, 1),
			$mdgriffith$elm_codegen$Internal$Compiler$denode(expr));
		var prettyExpr = _v10.a;
		var alwaysBreak = _v10.b;
		return _Utils_Tuple2(
			A2(
				$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						open,
						close,
						A2($the_sett$elm_pretty_printer$Pretty$nest, 1, prettyExpr)))),
			alwaysBreak);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyRecordAccess = F3(
	function (aliases, expr, field) {
		var _v9 = A4(
			$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
			aliases,
			$mdgriffith$elm_codegen$Internal$Write$topContext,
			4,
			$mdgriffith$elm_codegen$Internal$Compiler$denode(expr));
		var prettyExpr = _v9.a;
		var alwaysBreak = _v9.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_pretty_printer$Pretty$string(
					$mdgriffith$elm_codegen$Internal$Compiler$denode(field)),
				A2($the_sett$elm_pretty_printer$Pretty$a, $mdgriffith$elm_codegen$Internal$Write$dot, prettyExpr)),
			alwaysBreak);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyRecordExpr = F2(
	function (aliases, setters) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			$the_sett$elm_pretty_printer$Pretty$string('{'));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string('}'),
			$the_sett$elm_pretty_printer$Pretty$line);
		if (!setters.b) {
			return _Utils_Tuple2(
				$the_sett$elm_pretty_printer$Pretty$string('{}'),
				false);
		} else {
			var _v8 = A2(
				$elm$core$Tuple$mapSecond,
				$elm$core$List$any($elm$core$Basics$identity),
				$elm$core$List$unzip(
					A2(
						$elm$core$List$map,
						$mdgriffith$elm_codegen$Internal$Write$prettySetter(aliases),
						$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(setters))));
			var prettyExpressions = _v8.a;
			var alwaysBreak = _v8.b;
			return _Utils_Tuple2(
				A2(
					$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$align(
						A3(
							$the_sett$elm_pretty_printer$Pretty$surround,
							open,
							close,
							A2($the_sett$elm_pretty_printer$Pretty$separators, ', ', prettyExpressions)))),
				alwaysBreak);
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyRecordUpdateExpression = F4(
	function (aliases, indent, _var, setters) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			$the_sett$elm_pretty_printer$Pretty$words(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$string('{'),
						$the_sett$elm_pretty_printer$Pretty$string(
						$mdgriffith$elm_codegen$Internal$Compiler$denode(_var))
					])));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string('}'),
			$the_sett$elm_pretty_printer$Pretty$line);
		var addBarToFirst = function (exprs) {
			if (!exprs.b) {
				return _List_Nil;
			} else {
				var hd = exprs.a;
				var tl = exprs.b;
				return A2(
					$elm$core$List$cons,
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						hd,
						$the_sett$elm_pretty_printer$Pretty$string('| ')),
					tl);
			}
		};
		if (!setters.b) {
			return _Utils_Tuple2(
				$the_sett$elm_pretty_printer$Pretty$string('{}'),
				false);
		} else {
			var _v5 = A2(
				$elm$core$Tuple$mapSecond,
				$elm$core$List$any($elm$core$Basics$identity),
				$elm$core$List$unzip(
					A2(
						$elm$core$List$map,
						$mdgriffith$elm_codegen$Internal$Write$prettySetter(aliases),
						$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(setters))));
			var prettyExpressions = _v5.a;
			var alwaysBreak = _v5.b;
			return _Utils_Tuple2(
				A2(
					$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$align(
						A3(
							$the_sett$elm_pretty_printer$Pretty$surround,
							$the_sett$elm_pretty_printer$Pretty$empty,
							close,
							A2(
								$the_sett$elm_pretty_printer$Pretty$nest,
								indent,
								A2(
									$the_sett$elm_pretty_printer$Pretty$a,
									A2(
										$the_sett$elm_pretty_printer$Pretty$separators,
										', ',
										addBarToFirst(prettyExpressions)),
									open))))),
				alwaysBreak);
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettySetter = F2(
	function (aliases, _v2) {
		var fld = _v2.a;
		var val = _v2.b;
		var _v3 = A4(
			$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
			aliases,
			$mdgriffith$elm_codegen$Internal$Write$topContext,
			4,
			$mdgriffith$elm_codegen$Internal$Compiler$denode(val));
		var prettyExpr = _v3.a;
		var alwaysBreak = _v3.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_pretty_printer$Pretty$nest,
				4,
				A2(
					$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$lines(
						_List_fromArray(
							[
								$the_sett$elm_pretty_printer$Pretty$words(
								_List_fromArray(
									[
										$the_sett$elm_pretty_printer$Pretty$string(
										$mdgriffith$elm_codegen$Internal$Compiler$denode(fld)),
										$the_sett$elm_pretty_printer$Pretty$string('=')
									])),
								prettyExpr
							])))),
			alwaysBreak);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyTupledExpression = F3(
	function (aliases, indent, exprs) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			$the_sett$elm_pretty_printer$Pretty$string('('));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(')'),
			$the_sett$elm_pretty_printer$Pretty$line);
		if (!exprs.b) {
			return _Utils_Tuple2(
				$the_sett$elm_pretty_printer$Pretty$string('()'),
				false);
		} else {
			var _v1 = A2(
				$elm$core$Tuple$mapSecond,
				$elm$core$List$any($elm$core$Basics$identity),
				$elm$core$List$unzip(
					A2(
						$elm$core$List$map,
						A3(
							$mdgriffith$elm_codegen$Internal$Write$prettyExpressionInner,
							aliases,
							$mdgriffith$elm_codegen$Internal$Write$topContext,
							A2($mdgriffith$elm_codegen$Internal$Write$decrementIndent, indent, 2)),
						$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(exprs))));
			var prettyExpressions = _v1.a;
			var alwaysBreak = _v1.b;
			return _Utils_Tuple2(
				A2(
					$mdgriffith$elm_codegen$Internal$Write$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$align(
						A3(
							$the_sett$elm_pretty_printer$Pretty$surround,
							open,
							close,
							A2($the_sett$elm_pretty_printer$Pretty$separators, ', ', prettyExpressions)))),
				alwaysBreak);
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyDestructuring = F3(
	function (aliases, pattern, expr) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			$the_sett$elm_pretty_printer$Pretty$lines(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								A2($mdgriffith$elm_codegen$Internal$Write$prettyPattern, aliases, pattern),
								$the_sett$elm_pretty_printer$Pretty$string('=')
							])),
						A2($mdgriffith$elm_codegen$Internal$Write$prettyExpression, aliases, expr)
					])));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyInfix = function (infix_) {
	var dirToString = function (direction) {
		switch (direction.$) {
			case 'Left':
				return 'left';
			case 'Right':
				return 'right';
			default:
				return 'non';
		}
	};
	return $the_sett$elm_pretty_printer$Pretty$words(
		_List_fromArray(
			[
				$the_sett$elm_pretty_printer$Pretty$string('infix'),
				$the_sett$elm_pretty_printer$Pretty$string(
				dirToString(
					$mdgriffith$elm_codegen$Internal$Compiler$denode(infix_.direction))),
				$the_sett$elm_pretty_printer$Pretty$string(
				$elm$core$String$fromInt(
					$mdgriffith$elm_codegen$Internal$Compiler$denode(infix_.precedence))),
				$the_sett$elm_pretty_printer$Pretty$parens(
				$the_sett$elm_pretty_printer$Pretty$string(
					$mdgriffith$elm_codegen$Internal$Compiler$denode(infix_.operator))),
				$the_sett$elm_pretty_printer$Pretty$string('='),
				$the_sett$elm_pretty_printer$Pretty$string(
				$mdgriffith$elm_codegen$Internal$Compiler$denode(infix_._function))
			]));
};
var $mdgriffith$elm_codegen$Internal$Write$prettyPortDeclaration = F2(
	function (aliases, sig) {
		return $the_sett$elm_pretty_printer$Pretty$words(
			_List_fromArray(
				[
					$the_sett$elm_pretty_printer$Pretty$string('port'),
					A2($mdgriffith$elm_codegen$Internal$Write$prettySignature, aliases, sig)
				]));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyTypeAlias = F2(
	function (aliases, tAlias) {
		var typeAliasPretty = A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				A2(
					$mdgriffith$elm_codegen$Internal$Write$prettyTypeAnnotation,
					aliases,
					$mdgriffith$elm_codegen$Internal$Compiler$denode(tAlias.typeAnnotation)),
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$line,
					$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								$the_sett$elm_pretty_printer$Pretty$string('type alias'),
								$the_sett$elm_pretty_printer$Pretty$string(
								$mdgriffith$elm_codegen$Internal$Compiler$denode(tAlias.name)),
								$the_sett$elm_pretty_printer$Pretty$words(
								A2(
									$elm$core$List$map,
									$the_sett$elm_pretty_printer$Pretty$string,
									$mdgriffith$elm_codegen$Internal$Compiler$denodeAll(tAlias.generics))),
								$the_sett$elm_pretty_printer$Pretty$string('=')
							])))));
		return $the_sett$elm_pretty_printer$Pretty$lines(
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_codegen$Internal$Write$prettyMaybe,
					$mdgriffith$elm_codegen$Internal$Write$prettyDocumentation,
					$mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe(tAlias.documentation)),
					typeAliasPretty
				]));
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyElmSyntaxDeclaration = F2(
	function (aliases, decl) {
		switch (decl.$) {
			case 'FunctionDeclaration':
				var fn = decl.a;
				return A2($mdgriffith$elm_codegen$Internal$Write$prettyFun, aliases, fn);
			case 'AliasDeclaration':
				var tAlias = decl.a;
				return A2($mdgriffith$elm_codegen$Internal$Write$prettyTypeAlias, aliases, tAlias);
			case 'CustomTypeDeclaration':
				var type_ = decl.a;
				return A2($mdgriffith$elm_codegen$Internal$Write$prettyCustomType, aliases, type_);
			case 'PortDeclaration':
				var sig = decl.a;
				return A2($mdgriffith$elm_codegen$Internal$Write$prettyPortDeclaration, aliases, sig);
			case 'InfixDeclaration':
				var infix_ = decl.a;
				return $mdgriffith$elm_codegen$Internal$Write$prettyInfix(infix_);
			default:
				var pattern = decl.a;
				var expr = decl.b;
				return A3(
					$mdgriffith$elm_codegen$Internal$Write$prettyDestructuring,
					aliases,
					$mdgriffith$elm_codegen$Internal$Compiler$denode(pattern),
					$mdgriffith$elm_codegen$Internal$Compiler$denode(expr));
		}
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyDeclarations = F2(
	function (aliases, decls) {
		return A3(
			$elm$core$List$foldl,
			$elm$core$Basics$apL,
			$the_sett$elm_pretty_printer$Pretty$empty,
			A3(
				$elm$core$Basics$composeR,
				$elm$core$List$reverse,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$List$drop(1),
					$elm$core$List$reverse),
				A2(
					$elm$core$List$concatMap,
					function (decl) {
						switch (decl.$) {
							case 'RenderedComment':
								var content = decl.a;
								return _List_fromArray(
									[
										$the_sett$elm_pretty_printer$Pretty$a(
										$the_sett$elm_pretty_printer$Pretty$string(content + '\n')),
										A2(
										$elm$core$Basics$composeR,
										$the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line),
										$the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line))
									]);
							case 'RenderedBlock':
								var source = decl.a;
								return _List_fromArray(
									[
										$the_sett$elm_pretty_printer$Pretty$a(
										$the_sett$elm_pretty_printer$Pretty$string(source)),
										A2(
										$elm$core$Basics$composeR,
										$the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line),
										A2(
											$elm$core$Basics$composeR,
											$the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line),
											$the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line)))
									]);
							default:
								var innerDecl = decl.a;
								return _List_fromArray(
									[
										$the_sett$elm_pretty_printer$Pretty$a(
										A2($mdgriffith$elm_codegen$Internal$Write$prettyElmSyntaxDeclaration, aliases, innerDecl)),
										A2(
										$elm$core$Basics$composeR,
										$the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line),
										A2(
											$elm$core$Basics$composeR,
											$the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line),
											$the_sett$elm_pretty_printer$Pretty$a($the_sett$elm_pretty_printer$Pretty$line)))
									]);
						}
					},
					decls)));
	});
var $mdgriffith$elm_codegen$Internal$Comments$delimeters = function (doc) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$string('-}'),
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				doc,
				$the_sett$elm_pretty_printer$Pretty$string('{-| '))));
};
var $mdgriffith$elm_codegen$Internal$Comments$getParts = function (_v0) {
	var parts = _v0.a;
	return $elm$core$List$reverse(parts);
};
var $mdgriffith$elm_codegen$Internal$Comments$DocTags = function (a) {
	return {$: 'DocTags', a: a};
};
var $mdgriffith$elm_codegen$Internal$Comments$fitAndSplit = F2(
	function (width, tags) {
		if (!tags.b) {
			return _List_Nil;
		} else {
			var t = tags.a;
			var ts = tags.b;
			var _v1 = A3(
				$elm$core$List$foldl,
				F2(
					function (tag, _v2) {
						var allSplits = _v2.a;
						var curSplit = _v2.b;
						var remaining = _v2.c;
						return (_Utils_cmp(
							$elm$core$String$length(tag),
							remaining) < 1) ? _Utils_Tuple3(
							allSplits,
							A2($elm$core$List$cons, tag, curSplit),
							remaining - $elm$core$String$length(tag)) : _Utils_Tuple3(
							_Utils_ap(
								allSplits,
								_List_fromArray(
									[
										$elm$core$List$reverse(curSplit)
									])),
							_List_fromArray(
								[tag]),
							width - $elm$core$String$length(tag));
					}),
				_Utils_Tuple3(
					_List_Nil,
					_List_fromArray(
						[t]),
					width - $elm$core$String$length(t)),
				ts);
			var splitsExceptLast = _v1.a;
			var lastSplit = _v1.b;
			return _Utils_ap(
				splitsExceptLast,
				_List_fromArray(
					[
						$elm$core$List$reverse(lastSplit)
					]));
		}
	});
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $mdgriffith$elm_codegen$Internal$Comments$mergeDocTags = function (innerParts) {
	var _v0 = A3(
		$elm$core$List$foldr,
		F2(
			function (part, _v1) {
				var accum = _v1.a;
				var context = _v1.b;
				if (context.$ === 'Nothing') {
					if (part.$ === 'DocTags') {
						var tags = part.a;
						return _Utils_Tuple2(
							accum,
							$elm$core$Maybe$Just(tags));
					} else {
						var otherPart = part;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, otherPart, accum),
							$elm$core$Maybe$Nothing);
					}
				} else {
					var contextTags = context.a;
					if (part.$ === 'DocTags') {
						var tags = part.a;
						return _Utils_Tuple2(
							accum,
							$elm$core$Maybe$Just(
								_Utils_ap(contextTags, tags)));
					} else {
						var otherPart = part;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								otherPart,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_codegen$Internal$Comments$DocTags(
										$elm$core$List$sort(contextTags)),
									accum)),
							$elm$core$Maybe$Nothing);
					}
				}
			}),
		_Utils_Tuple2(_List_Nil, $elm$core$Maybe$Nothing),
		innerParts);
	var partsExceptMaybeFirst = _v0.a;
	var maybeFirstPart = _v0.b;
	if (maybeFirstPart.$ === 'Nothing') {
		return partsExceptMaybeFirst;
	} else {
		var tags = maybeFirstPart.a;
		return A2(
			$elm$core$List$cons,
			$mdgriffith$elm_codegen$Internal$Comments$DocTags(
				$elm$core$List$sort(tags)),
			partsExceptMaybeFirst);
	}
};
var $mdgriffith$elm_codegen$Internal$Comments$layoutTags = F2(
	function (width, parts) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (part, _v0) {
					var accumParts = _v0.a;
					var accumDocTags = _v0.b;
					if (part.$ === 'DocTags') {
						var tags = part.a;
						var splits = A2($mdgriffith$elm_codegen$Internal$Comments$fitAndSplit, width, tags);
						return _Utils_Tuple2(
							_Utils_ap(
								A2($elm$core$List$map, $mdgriffith$elm_codegen$Internal$Comments$DocTags, splits),
								accumParts),
							_Utils_ap(accumDocTags, splits));
					} else {
						var otherPart = part;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, otherPart, accumParts),
							accumDocTags);
					}
				}),
			_Utils_Tuple2(_List_Nil, _List_Nil),
			$mdgriffith$elm_codegen$Internal$Comments$mergeDocTags(parts));
	});
var $the_sett$elm_pretty_printer$Internals$NLine = F3(
	function (a, b, c) {
		return {$: 'NLine', a: a, b: b, c: c};
	});
var $the_sett$elm_pretty_printer$Internals$NNil = {$: 'NNil'};
var $the_sett$elm_pretty_printer$Internals$NText = F3(
	function (a, b, c) {
		return {$: 'NText', a: a, b: b, c: c};
	});
var $the_sett$elm_pretty_printer$Internals$fits = F2(
	function (w, normal) {
		fits:
		while (true) {
			if (w < 0) {
				return false;
			} else {
				switch (normal.$) {
					case 'NNil':
						return true;
					case 'NText':
						var text = normal.a;
						var innerNormal = normal.b;
						var $temp$w = w - $elm$core$String$length(text),
							$temp$normal = innerNormal(_Utils_Tuple0);
						w = $temp$w;
						normal = $temp$normal;
						continue fits;
					default:
						return true;
				}
			}
		}
	});
var $the_sett$elm_pretty_printer$Internals$better = F4(
	function (w, k, doc, doc2Fn) {
		return A2($the_sett$elm_pretty_printer$Internals$fits, w - k, doc) ? doc : doc2Fn(_Utils_Tuple0);
	});
var $the_sett$elm_pretty_printer$Internals$best = F3(
	function (width, startCol, x) {
		var be = F3(
			function (w, k, docs) {
				be:
				while (true) {
					if (!docs.b) {
						return $the_sett$elm_pretty_printer$Internals$NNil;
					} else {
						switch (docs.a.b.$) {
							case 'Empty':
								var _v1 = docs.a;
								var i = _v1.a;
								var _v2 = _v1.b;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = ds;
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							case 'Concatenate':
								var _v3 = docs.a;
								var i = _v3.a;
								var _v4 = _v3.b;
								var doc = _v4.a;
								var doc2 = _v4.b;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i,
										doc(_Utils_Tuple0)),
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(
											i,
											doc2(_Utils_Tuple0)),
										ds));
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							case 'Nest':
								var _v5 = docs.a;
								var i = _v5.a;
								var _v6 = _v5.b;
								var j = _v6.a;
								var doc = _v6.b;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i + j,
										doc(_Utils_Tuple0)),
									ds);
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							case 'Text':
								var _v7 = docs.a;
								var i = _v7.a;
								var _v8 = _v7.b;
								var text = _v8.a;
								var maybeTag = _v8.b;
								var ds = docs.b;
								return A3(
									$the_sett$elm_pretty_printer$Internals$NText,
									text,
									function (_v9) {
										return A3(
											be,
											w,
											k + $elm$core$String$length(text),
											ds);
									},
									maybeTag);
							case 'Line':
								var _v10 = docs.a;
								var i = _v10.a;
								var _v11 = _v10.b;
								var vsep = _v11.b;
								var ds = docs.b;
								return A3(
									$the_sett$elm_pretty_printer$Internals$NLine,
									i,
									vsep,
									function (_v12) {
										return A3(
											be,
											w,
											i + $elm$core$String$length(vsep),
											ds);
									});
							case 'Union':
								var _v13 = docs.a;
								var i = _v13.a;
								var _v14 = _v13.b;
								var doc = _v14.a;
								var doc2 = _v14.b;
								var ds = docs.b;
								return A4(
									$the_sett$elm_pretty_printer$Internals$better,
									w,
									k,
									A3(
										be,
										w,
										k,
										A2(
											$elm$core$List$cons,
											_Utils_Tuple2(i, doc),
											ds)),
									function (_v15) {
										return A3(
											be,
											w,
											k,
											A2(
												$elm$core$List$cons,
												_Utils_Tuple2(i, doc2),
												ds));
									});
							case 'Nesting':
								var _v16 = docs.a;
								var i = _v16.a;
								var fn = _v16.b.a;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i,
										fn(i)),
									ds);
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							default:
								var _v17 = docs.a;
								var i = _v17.a;
								var fn = _v17.b.a;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i,
										fn(k)),
									ds);
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
						}
					}
				}
			});
		return A3(
			be,
			width,
			startCol,
			_List_fromArray(
				[
					_Utils_Tuple2(0, x)
				]));
	});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $the_sett$elm_pretty_printer$Internals$layout = function (normal) {
	var layoutInner = F2(
		function (normal2, acc) {
			layoutInner:
			while (true) {
				switch (normal2.$) {
					case 'NNil':
						return acc;
					case 'NText':
						var text = normal2.a;
						var innerNormal = normal2.b;
						var maybeTag = normal2.c;
						var $temp$normal2 = innerNormal(_Utils_Tuple0),
							$temp$acc = A2($elm$core$List$cons, text, acc);
						normal2 = $temp$normal2;
						acc = $temp$acc;
						continue layoutInner;
					default:
						var i = normal2.a;
						var sep = normal2.b;
						var innerNormal = normal2.c;
						var norm = innerNormal(_Utils_Tuple0);
						if (norm.$ === 'NLine') {
							var $temp$normal2 = innerNormal(_Utils_Tuple0),
								$temp$acc = A2($elm$core$List$cons, '\n' + sep, acc);
							normal2 = $temp$normal2;
							acc = $temp$acc;
							continue layoutInner;
						} else {
							var $temp$normal2 = innerNormal(_Utils_Tuple0),
								$temp$acc = A2(
								$elm$core$List$cons,
								'\n' + (A2($the_sett$elm_pretty_printer$Internals$copy, i, ' ') + sep),
								acc);
							normal2 = $temp$normal2;
							acc = $temp$acc;
							continue layoutInner;
						}
				}
			}
		});
	return $elm$core$String$concat(
		$elm$core$List$reverse(
			A2(layoutInner, normal, _List_Nil)));
};
var $the_sett$elm_pretty_printer$Pretty$pretty = F2(
	function (w, doc) {
		return $the_sett$elm_pretty_printer$Internals$layout(
			A3($the_sett$elm_pretty_printer$Internals$best, w, 0, doc));
	});
var $mdgriffith$elm_codegen$Internal$Comments$prettyCode = function (val) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$indent,
		4,
		$the_sett$elm_pretty_printer$Pretty$string(val));
};
var $mdgriffith$elm_codegen$Internal$Comments$prettyMarkdown = function (val) {
	return $the_sett$elm_pretty_printer$Pretty$string(val);
};
var $mdgriffith$elm_codegen$Internal$Comments$prettyTags = function (tags) {
	return $the_sett$elm_pretty_printer$Pretty$words(
		_List_fromArray(
			[
				$the_sett$elm_pretty_printer$Pretty$string('@docs'),
				A2(
				$the_sett$elm_pretty_printer$Pretty$join,
				$the_sett$elm_pretty_printer$Pretty$string(', '),
				A2($elm$core$List$map, $the_sett$elm_pretty_printer$Pretty$string, tags))
			]));
};
var $mdgriffith$elm_codegen$Internal$Comments$prettyCommentPart = function (part) {
	switch (part.$) {
		case 'Markdown':
			var val = part.a;
			return $mdgriffith$elm_codegen$Internal$Comments$prettyMarkdown(val);
		case 'Code':
			var val = part.a;
			return $mdgriffith$elm_codegen$Internal$Comments$prettyCode(val);
		default:
			var tags = part.a;
			return $mdgriffith$elm_codegen$Internal$Comments$prettyTags(tags);
	}
};
var $mdgriffith$elm_codegen$Internal$Comments$prettyFileComment = F2(
	function (width, comment) {
		var _v0 = A2(
			$mdgriffith$elm_codegen$Internal$Comments$layoutTags,
			width,
			$mdgriffith$elm_codegen$Internal$Comments$getParts(comment));
		var parts = _v0.a;
		var splits = _v0.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_pretty_printer$Pretty$pretty,
				width,
				$mdgriffith$elm_codegen$Internal$Comments$delimeters(
					$the_sett$elm_pretty_printer$Pretty$lines(
						A2($elm$core$List$map, $mdgriffith$elm_codegen$Internal$Comments$prettyCommentPart, parts)))),
			splits);
	});
var $mdgriffith$elm_codegen$Internal$Write$prettyDefaultModuleData = function (moduleData) {
	return $the_sett$elm_pretty_printer$Pretty$words(
		_List_fromArray(
			[
				$the_sett$elm_pretty_printer$Pretty$string('module'),
				$mdgriffith$elm_codegen$Internal$Write$prettyModuleName(
				$mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.moduleName)),
				$mdgriffith$elm_codegen$Internal$Write$prettyExposing(
				$mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.exposingList))
			]));
};
var $mdgriffith$elm_codegen$Internal$Write$prettyEffectModuleData = function (moduleData) {
	var prettyCmdAndSub = F2(
		function (maybeCmd, maybeSub) {
			var _v0 = _Utils_Tuple2(maybeCmd, maybeSub);
			if (_v0.a.$ === 'Just') {
				if (_v0.b.$ === 'Just') {
					var cmdName = _v0.a.a;
					var subName = _v0.b.a;
					return $elm$core$Maybe$Just(
						$the_sett$elm_pretty_printer$Pretty$words(
							_List_fromArray(
								[
									$the_sett$elm_pretty_printer$Pretty$string('where { command ='),
									$the_sett$elm_pretty_printer$Pretty$string(cmdName),
									$the_sett$elm_pretty_printer$Pretty$string(','),
									$the_sett$elm_pretty_printer$Pretty$string('subscription ='),
									$the_sett$elm_pretty_printer$Pretty$string(subName),
									$the_sett$elm_pretty_printer$Pretty$string('}')
								])));
				} else {
					var cmdName = _v0.a.a;
					var _v3 = _v0.b;
					return $elm$core$Maybe$Just(
						$the_sett$elm_pretty_printer$Pretty$words(
							_List_fromArray(
								[
									$the_sett$elm_pretty_printer$Pretty$string('where { command ='),
									$the_sett$elm_pretty_printer$Pretty$string(cmdName),
									$the_sett$elm_pretty_printer$Pretty$string('}')
								])));
				}
			} else {
				if (_v0.b.$ === 'Nothing') {
					var _v1 = _v0.a;
					var _v2 = _v0.b;
					return $elm$core$Maybe$Nothing;
				} else {
					var _v4 = _v0.a;
					var subName = _v0.b.a;
					return $elm$core$Maybe$Just(
						$the_sett$elm_pretty_printer$Pretty$words(
							_List_fromArray(
								[
									$the_sett$elm_pretty_printer$Pretty$string('where { subscription ='),
									$the_sett$elm_pretty_printer$Pretty$string(subName),
									$the_sett$elm_pretty_printer$Pretty$string('}')
								])));
				}
			}
		});
	return $the_sett$elm_pretty_printer$Pretty$words(
		_List_fromArray(
			[
				$the_sett$elm_pretty_printer$Pretty$string('effect module'),
				$mdgriffith$elm_codegen$Internal$Write$prettyModuleName(
				$mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.moduleName)),
				A2(
				$mdgriffith$elm_codegen$Internal$Write$prettyMaybe,
				$elm$core$Basics$identity,
				A2(
					prettyCmdAndSub,
					$mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe(moduleData.command),
					$mdgriffith$elm_codegen$Internal$Compiler$denodeMaybe(moduleData.subscription))),
				$mdgriffith$elm_codegen$Internal$Write$prettyExposing(
				$mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.exposingList))
			]));
};
var $mdgriffith$elm_codegen$Internal$Write$prettyPortModuleData = function (moduleData) {
	return $the_sett$elm_pretty_printer$Pretty$words(
		_List_fromArray(
			[
				$the_sett$elm_pretty_printer$Pretty$string('port module'),
				$mdgriffith$elm_codegen$Internal$Write$prettyModuleName(
				$mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.moduleName)),
				$mdgriffith$elm_codegen$Internal$Write$prettyExposing(
				$mdgriffith$elm_codegen$Internal$Compiler$denode(moduleData.exposingList))
			]));
};
var $mdgriffith$elm_codegen$Internal$Write$prettyModule = function (mod) {
	switch (mod.$) {
		case 'NormalModule':
			var defaultModuleData = mod.a;
			return $mdgriffith$elm_codegen$Internal$Write$prettyDefaultModuleData(defaultModuleData);
		case 'PortModule':
			var defaultModuleData = mod.a;
			return $mdgriffith$elm_codegen$Internal$Write$prettyPortModuleData(defaultModuleData);
		default:
			var effectModuleData = mod.a;
			return $mdgriffith$elm_codegen$Internal$Write$prettyEffectModuleData(effectModuleData);
	}
};
var $mdgriffith$elm_codegen$Internal$Write$prepareLayout = F2(
	function (width, file) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			A2($mdgriffith$elm_codegen$Internal$Write$prettyDeclarations, file.aliases, file.declarations),
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$mdgriffith$elm_codegen$Internal$Write$importsPretty(file.imports),
				function (doc) {
					var _v0 = file.comments;
					if (_v0.$ === 'Nothing') {
						return doc;
					} else {
						var fileComment = _v0.a;
						var _v1 = A2($mdgriffith$elm_codegen$Internal$Comments$prettyFileComment, width, fileComment);
						var fileCommentStr = _v1.a;
						var innerTags = _v1.b;
						return A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							$the_sett$elm_pretty_printer$Pretty$line,
							A2(
								$the_sett$elm_pretty_printer$Pretty$a,
								$mdgriffith$elm_codegen$Internal$Write$prettyComments(
									_List_fromArray(
										[fileCommentStr])),
								doc));
					}
				}(
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$line,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							$the_sett$elm_pretty_printer$Pretty$line,
							$mdgriffith$elm_codegen$Internal$Write$prettyModule(file.moduleDefinition))))));
	});
var $mdgriffith$elm_codegen$Internal$Write$pretty = F2(
	function (width, file) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$pretty,
			width,
			A2($mdgriffith$elm_codegen$Internal$Write$prepareLayout, width, file));
	});
var $mdgriffith$elm_codegen$Internal$Write$write = $mdgriffith$elm_codegen$Internal$Write$pretty(80);
var $mdgriffith$elm_codegen$Internal$Render$render = F2(
	function (toDocComment, fileDetails) {
		var rendered = A3(
			$elm$core$List$foldl,
			F2(
				function (decl, gathered) {
					switch (decl.$) {
						case 'Comment':
							var comm = decl.a;
							return _Utils_update(
								gathered,
								{
									declarations: A2(
										$elm$core$List$cons,
										$mdgriffith$elm_codegen$Internal$Compiler$RenderedComment(comm),
										gathered.declarations)
								});
						case 'Block':
							var block = decl.a;
							return _Utils_update(
								gathered,
								{
									declarations: A2(
										$elm$core$List$cons,
										$mdgriffith$elm_codegen$Internal$Compiler$RenderedBlock(block),
										gathered.declarations)
								});
						default:
							var decDetails = decl.a;
							var result = decDetails.toBody(fileDetails.index);
							return {
								declarations: A2(
									$elm$core$List$cons,
									$mdgriffith$elm_codegen$Internal$Compiler$RenderedDecl(
										A2($mdgriffith$elm_codegen$Internal$Render$addDocs, decDetails.docs, result.declaration)),
									gathered.declarations),
								exposed: A3($mdgriffith$elm_codegen$Internal$Render$addExposed, decDetails.exposed, result.declaration, gathered.exposed),
								exposedGroups: function () {
									var _v5 = decDetails.exposed;
									if (_v5.$ === 'NotExposed') {
										return gathered.exposedGroups;
									} else {
										var details = _v5.a;
										return A2(
											$elm$core$List$cons,
											_Utils_Tuple2(details.group, decDetails.name),
											gathered.exposedGroups);
									}
								}(),
								hasPorts: function () {
									if (gathered.hasPorts) {
										return gathered.hasPorts;
									} else {
										var _v6 = result.declaration;
										if (_v6.$ === 'PortDeclaration') {
											return true;
										} else {
											return false;
										}
									}
								}(),
								imports: _Utils_ap(
									result.additionalImports,
									_Utils_ap(decDetails.imports, gathered.imports)),
								warnings: function () {
									var _v7 = result.warning;
									if (_v7.$ === 'Nothing') {
										return gathered.warnings;
									} else {
										var warn = _v7.a;
										return A2($elm$core$List$cons, warn, gathered.warnings);
									}
								}()
							};
					}
				}),
			{declarations: _List_Nil, exposed: _List_Nil, exposedGroups: _List_Nil, hasPorts: false, imports: _List_Nil, warnings: _List_Nil},
			fileDetails.declarations);
		var body = $mdgriffith$elm_codegen$Internal$Write$write(
			{
				aliases: fileDetails.aliases,
				comments: function () {
					var _v0 = rendered.exposedGroups;
					if (!_v0.b) {
						return $elm$core$Maybe$Nothing;
					} else {
						return $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Internal$Comments$addPart,
								$mdgriffith$elm_codegen$Internal$Comments$emptyComment,
								$mdgriffith$elm_codegen$Internal$Comments$Markdown(
									'\n' + A2(
										$elm$core$String$join,
										'\n\n',
										toDocComment(
											$mdgriffith$elm_codegen$Internal$Render$groupExposing(
												A2(
													$elm$core$List$sortBy,
													function (_v1) {
														var group = _v1.a;
														if (group.$ === 'Nothing') {
															return 'zzzzzzzzz';
														} else {
															var name = group.a;
															return name;
														}
													},
													rendered.exposedGroups)))))));
					}
				}(),
				declarations: $elm$core$List$reverse(rendered.declarations),
				imports: A2(
					$elm$core$List$filterMap,
					$mdgriffith$elm_codegen$Internal$Compiler$makeImport(fileDetails.aliases),
					$mdgriffith$elm_codegen$Internal$Render$dedupImports(rendered.imports)),
				moduleDefinition: (rendered.hasPorts ? $stil4m$elm_syntax$Elm$Syntax$Module$PortModule : $stil4m$elm_syntax$Elm$Syntax$Module$NormalModule)(
					{
						exposingList: function () {
							var _v3 = rendered.exposed;
							if (!_v3.b) {
								return $mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$stil4m$elm_syntax$Elm$Syntax$Exposing$All($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange));
							} else {
								return $mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
										$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(rendered.exposed)));
							}
						}(),
						moduleName: $mdgriffith$elm_codegen$Internal$Compiler$nodify(fileDetails.moduleName)
					})
			});
		return {
			contents: body,
			path: A2($elm$core$String$join, '/', fileDetails.moduleName) + '.elm',
			warnings: rendered.warnings
		};
	});
var $mdgriffith$elm_codegen$Elm$docs = function (group) {
	var _v0 = group.group;
	if (_v0.$ === 'Nothing') {
		return '@docs ' + A2($elm$core$String$join, ', ', group.members);
	} else {
		var groupName = _v0.a;
		return '## ' + (groupName + ('\n\n@docs ' + A2($elm$core$String$join, ', ', group.members)));
	}
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_codegen$Elm$renderStandardComment = function (groups) {
	return $elm$core$List$isEmpty(groups) ? _List_Nil : A2($elm$core$List$map, $mdgriffith$elm_codegen$Elm$docs, groups);
};
var $mdgriffith$elm_codegen$Internal$Index$Index = F4(
	function (a, b, c, d) {
		return {$: 'Index', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_codegen$Internal$Index$startIndex = A4($mdgriffith$elm_codegen$Internal$Index$Index, 0, _List_Nil, $elm$core$Set$empty, true);
var $mdgriffith$elm_codegen$Elm$file = F2(
	function (mod, decs) {
		return A2(
			$mdgriffith$elm_codegen$Internal$Render$render,
			$mdgriffith$elm_codegen$Elm$renderStandardComment,
			{aliases: _List_Nil, declarations: decs, index: $mdgriffith$elm_codegen$Internal$Index$startIndex, moduleName: mod});
	});
var $mdgriffith$elm_codegen$Elm$Variant = F2(
	function (a, b) {
		return {$: 'Variant', a: a, b: b};
	});
var $mdgriffith$elm_codegen$Elm$variant = function (name) {
	return A2($mdgriffith$elm_codegen$Elm$Variant, name, _List_Nil);
};
var $author$project$Generate$PageId$generate = function (options) {
	return A2(
		$mdgriffith$elm_codegen$Elm$file,
		_List_fromArray(
			['Dev', 'Page', 'Id']),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$expose(
				A2(
					$mdgriffith$elm_codegen$Elm$customType,
					'Id',
					A2(
						$elm$core$List$map,
						function (mod) {
							return $mdgriffith$elm_codegen$Elm$variant(
								A2(
									$elm$core$String$join,
									'_',
									A2($elm$core$String$split, '.', mod.name)));
						},
						options.project)))
			]));
};
var $elm$core$Debug$log = _Debug_log;
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation = F2(
	function (a, b) {
		return {$: 'FunctionTypeAnnotation', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord = F2(
	function (a, b) {
		return {$: 'GenericRecord', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType = function (a) {
	return {$: 'GenericType', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record = function (a) {
	return {$: 'Record', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled = function (a) {
	return {$: 'Tupled', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed = F2(
	function (a, b) {
		return {$: 'Typed', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Node$map = F2(
	function (f, _v0) {
		var r = _v0.a;
		var a = _v0.b;
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			r,
			f(a));
	});
var $mdgriffith$elm_codegen$Internal$Clean$doRename = F2(
	function (dict, ann) {
		switch (ann.$) {
			case 'GenericType':
				var generic = ann.a;
				var _v1 = A2($elm$core$Dict$get, generic, dict);
				if (_v1.$ === 'Nothing') {
					return ann;
				} else {
					var renamed = _v1.a;
					return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(renamed);
				}
			case 'Typed':
				var name = ann.a;
				var nodedVars = ann.b;
				return A2(
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
					name,
					A2(
						$elm$core$List$map,
						$stil4m$elm_syntax$Elm$Syntax$Node$map(
							$mdgriffith$elm_codegen$Internal$Clean$doRename(dict)),
						nodedVars));
			case 'Unit':
				return ann;
			case 'Tupled':
				var nodedVars = ann.a;
				return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(
					A2(
						$elm$core$List$map,
						$stil4m$elm_syntax$Elm$Syntax$Node$map(
							$mdgriffith$elm_codegen$Internal$Clean$doRename(dict)),
						nodedVars));
			case 'Record':
				var record = ann.a;
				return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(
					A2(
						$elm$core$List$map,
						$stil4m$elm_syntax$Elm$Syntax$Node$map(
							$elm$core$Tuple$mapSecond(
								$stil4m$elm_syntax$Elm$Syntax$Node$map(
									$mdgriffith$elm_codegen$Internal$Clean$doRename(dict)))),
						record));
			case 'GenericRecord':
				var name = ann.a;
				var _v2 = ann.b;
				var range = _v2.a;
				var record = _v2.b;
				return A2(
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord,
					name,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						range,
						A2(
							$elm$core$List$map,
							$stil4m$elm_syntax$Elm$Syntax$Node$map(
								$elm$core$Tuple$mapSecond(
									$stil4m$elm_syntax$Elm$Syntax$Node$map(
										$mdgriffith$elm_codegen$Internal$Clean$doRename(dict)))),
							record)));
			default:
				var nodeOne = ann.a;
				var nodeTwo = ann.b;
				return A2(
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$map,
						$mdgriffith$elm_codegen$Internal$Clean$doRename(dict),
						nodeOne),
					A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$map,
						$mdgriffith$elm_codegen$Internal$Clean$doRename(dict),
						nodeTwo));
		}
	});
var $mdgriffith$elm_codegen$Internal$Clean$prepareRename = F2(
	function (ann, dict) {
		switch (ann.$) {
			case 'GenericType':
				var generic = ann.a;
				return A2($elm$core$Set$insert, generic, dict);
			case 'Typed':
				var name = ann.a;
				var nodedVars = ann.b;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (_v1, d) {
							var tipe = _v1.b;
							return A2($mdgriffith$elm_codegen$Internal$Clean$prepareRename, tipe, d);
						}),
					dict,
					nodedVars);
			case 'Unit':
				return dict;
			case 'Tupled':
				var nodedVars = ann.a;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (_v2, d) {
							var tipe = _v2.b;
							return A2($mdgriffith$elm_codegen$Internal$Clean$prepareRename, tipe, d);
						}),
					dict,
					nodedVars);
			case 'Record':
				var record = ann.a;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (_v3, d) {
							var _v4 = _v3.b;
							var _v5 = _v4.b;
							var field = _v5.b;
							return A2($mdgriffith$elm_codegen$Internal$Clean$prepareRename, field, d);
						}),
					dict,
					record);
			case 'GenericRecord':
				var name = ann.a;
				var _v6 = ann.b;
				var range = _v6.a;
				var record = _v6.b;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (_v7, d) {
							var _v8 = _v7.b;
							var _v9 = _v8.b;
							var field = _v9.b;
							return A2($mdgriffith$elm_codegen$Internal$Clean$prepareRename, field, d);
						}),
					dict,
					record);
			default:
				var _v10 = ann.a;
				var one = _v10.b;
				var _v11 = ann.b;
				var two = _v11.b;
				return A2(
					$mdgriffith$elm_codegen$Internal$Clean$prepareRename,
					two,
					A2($mdgriffith$elm_codegen$Internal$Clean$prepareRename, one, dict));
		}
	});
var $mdgriffith$elm_codegen$Internal$Clean$findClean = F3(
	function (i, name, set) {
		findClean:
		while (true) {
			var newName = (!i) ? name : _Utils_ap(
				name,
				$elm$core$String$fromInt(i));
			if (A2($elm$core$Set$member, newName, set)) {
				var $temp$i = i + 1,
					$temp$name = name,
					$temp$set = set;
				i = $temp$i;
				name = $temp$name;
				set = $temp$set;
				continue findClean;
			} else {
				return name;
			}
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Set$foldl = F3(
	function (func, initialState, _v0) {
		var dict = _v0.a;
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (key, _v1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var $mdgriffith$elm_codegen$Internal$Clean$sanitized = function (str) {
	var _v0 = A2($elm$core$String$split, '_', str);
	if (!_v0.b) {
		return str;
	} else {
		var top = _v0.a;
		var remain = _v0.b;
		return top;
	}
};
var $mdgriffith$elm_codegen$Internal$Clean$verify = function (set) {
	return A3(
		$elm$core$Set$foldl,
		F2(
			function (name, gathered) {
				var newName = A3(
					$mdgriffith$elm_codegen$Internal$Clean$findClean,
					0,
					$mdgriffith$elm_codegen$Internal$Clean$sanitized(name),
					set);
				return A3($elm$core$Dict$insert, name, newName, gathered);
			}),
		$elm$core$Dict$empty,
		set);
};
var $mdgriffith$elm_codegen$Internal$Clean$clean = function (ann) {
	var renames = $mdgriffith$elm_codegen$Internal$Clean$verify(
		A2($mdgriffith$elm_codegen$Internal$Clean$prepareRename, ann, $elm$core$Set$empty));
	return A2($mdgriffith$elm_codegen$Internal$Clean$doRename, renames, ann);
};
var $mdgriffith$elm_codegen$Internal$Format$sanitize = function (str) {
	switch (str) {
		case 'in':
			return 'in_';
		case 'type':
			return 'type_';
		case 'case':
			return 'case_';
		case 'let':
			return 'let_';
		case 'module':
			return 'module_';
		case 'exposing':
			return 'exposing_';
		case 'where':
			return 'where_';
		case 'main':
			return 'main_';
		case 'port':
			return 'port_';
		case 'as':
			return 'as_';
		case 'if':
			return 'if_';
		case 'import':
			return 'import_';
		default:
			return str;
	}
};
var $elm$core$String$toLower = _String_toLower;
var $mdgriffith$elm_codegen$Internal$Format$formatValue = function (str) {
	var formatted = _Utils_ap(
		$elm$core$String$toLower(
			A2($elm$core$String$left, 1, str)),
		A2($elm$core$String$dropLeft, 1, str));
	return $mdgriffith$elm_codegen$Internal$Format$sanitize(formatted);
};
var $mdgriffith$elm_codegen$Internal$Format$formatDeclarationName = function (str) {
	if (str === 'main') {
		return 'main';
	} else {
		return $mdgriffith$elm_codegen$Internal$Format$formatValue(str);
	}
};
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $stil4m$structured_writer$StructuredWriter$asIndent = function (amount) {
	return A2($elm$core$String$repeat, amount, ' ');
};
var $stil4m$structured_writer$StructuredWriter$writeIndented = F2(
	function (indent_, w) {
		switch (w.$) {
			case 'Sep':
				var _v1 = w.a;
				var pre = _v1.a;
				var sep = _v1.b;
				var post = _v1.c;
				var differentLines = w.b;
				var items = w.c;
				var seperator = differentLines ? ('\n' + ($stil4m$structured_writer$StructuredWriter$asIndent(indent_) + sep)) : sep;
				return $elm$core$String$concat(
					_List_fromArray(
						[
							pre,
							A2(
							$elm$core$String$join,
							seperator,
							A2(
								$elm$core$List$map,
								A2(
									$elm$core$Basics$composeR,
									$elm$core$Basics$identity,
									$stil4m$structured_writer$StructuredWriter$writeIndented(indent_)),
								items)),
							post
						]));
			case 'Breaked':
				var items = w.a;
				return A2(
					$elm$core$String$join,
					'\n' + $stil4m$structured_writer$StructuredWriter$asIndent(indent_),
					A2(
						$elm$core$List$concatMap,
						A2(
							$elm$core$Basics$composeR,
							$stil4m$structured_writer$StructuredWriter$writeIndented(0),
							$elm$core$String$split('\n')),
						items));
			case 'Str':
				var s = w.a;
				return s;
			case 'Indent':
				var n = w.a;
				var next = w.b;
				return _Utils_ap(
					$stil4m$structured_writer$StructuredWriter$asIndent(n + indent_),
					A2($stil4m$structured_writer$StructuredWriter$writeIndented, n + indent_, next));
			case 'Spaced':
				var items = w.a;
				return A2(
					$elm$core$String$join,
					' ',
					A2(
						$elm$core$List$map,
						$stil4m$structured_writer$StructuredWriter$writeIndented(indent_),
						items));
			case 'Joined':
				var items = w.a;
				return $elm$core$String$concat(
					A2(
						$elm$core$List$map,
						$stil4m$structured_writer$StructuredWriter$writeIndented(indent_),
						items));
			default:
				var x = w.a;
				var y = w.b;
				return _Utils_ap(
					A2($stil4m$structured_writer$StructuredWriter$writeIndented, indent_, x),
					A2($stil4m$structured_writer$StructuredWriter$writeIndented, indent_, y));
		}
	});
var $stil4m$structured_writer$StructuredWriter$write = $stil4m$structured_writer$StructuredWriter$writeIndented(0);
var $stil4m$elm_syntax$Elm$Writer$write = $stil4m$structured_writer$StructuredWriter$write;
var $stil4m$structured_writer$StructuredWriter$Sep = F3(
	function (a, b, c) {
		return {$: 'Sep', a: a, b: b, c: c};
	});
var $stil4m$structured_writer$StructuredWriter$bracesComma = $stil4m$structured_writer$StructuredWriter$Sep(
	_Utils_Tuple3('{', ', ', '}'));
var $stil4m$structured_writer$StructuredWriter$Joined = function (a) {
	return {$: 'Joined', a: a};
};
var $stil4m$structured_writer$StructuredWriter$join = $stil4m$structured_writer$StructuredWriter$Joined;
var $stil4m$structured_writer$StructuredWriter$parensComma = $stil4m$structured_writer$StructuredWriter$Sep(
	_Utils_Tuple3('(', ', ', ')'));
var $stil4m$structured_writer$StructuredWriter$Str = function (a) {
	return {$: 'Str', a: a};
};
var $stil4m$structured_writer$StructuredWriter$string = $stil4m$structured_writer$StructuredWriter$Str;
var $stil4m$elm_syntax$Elm$Writer$parensIfContainsSpaces = function (w) {
	return A2(
		$elm$core$String$contains,
		' ',
		$stil4m$structured_writer$StructuredWriter$write(w)) ? $stil4m$structured_writer$StructuredWriter$join(
		_List_fromArray(
			[
				$stil4m$structured_writer$StructuredWriter$string('('),
				w,
				$stil4m$structured_writer$StructuredWriter$string(')')
			])) : w;
};
var $stil4m$structured_writer$StructuredWriter$sepByComma = $stil4m$structured_writer$StructuredWriter$Sep(
	_Utils_Tuple3('', ', ', ''));
var $stil4m$structured_writer$StructuredWriter$Spaced = function (a) {
	return {$: 'Spaced', a: a};
};
var $stil4m$structured_writer$StructuredWriter$spaced = $stil4m$structured_writer$StructuredWriter$Spaced;
var $stil4m$elm_syntax$Elm$Writer$writeRecordField = function (_v4) {
	var _v5 = _v4.b;
	var name = _v5.a;
	var ref = _v5.b;
	return $stil4m$structured_writer$StructuredWriter$spaced(
		_List_fromArray(
			[
				$stil4m$structured_writer$StructuredWriter$string(
				$stil4m$elm_syntax$Elm$Syntax$Node$value(name)),
				$stil4m$structured_writer$StructuredWriter$string(':'),
				$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(ref)
			]));
};
var $stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation = function (_v0) {
	var typeAnnotation = _v0.b;
	switch (typeAnnotation.$) {
		case 'GenericType':
			var s = typeAnnotation.a;
			return $stil4m$structured_writer$StructuredWriter$string(s);
		case 'Typed':
			var moduleNameAndName = typeAnnotation.a;
			var args = typeAnnotation.b;
			var moduleName = $stil4m$elm_syntax$Elm$Syntax$Node$value(moduleNameAndName).a;
			var k = $stil4m$elm_syntax$Elm$Syntax$Node$value(moduleNameAndName).b;
			return $stil4m$structured_writer$StructuredWriter$spaced(
				A2(
					$elm$core$List$cons,
					$stil4m$structured_writer$StructuredWriter$string(
						A2(
							$elm$core$String$join,
							'.',
							_Utils_ap(
								moduleName,
								_List_fromArray(
									[k])))),
					A2(
						$elm$core$List$map,
						A2($elm$core$Basics$composeR, $stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation, $stil4m$elm_syntax$Elm$Writer$parensIfContainsSpaces),
						args)));
		case 'Unit':
			return $stil4m$structured_writer$StructuredWriter$string('()');
		case 'Tupled':
			var xs = typeAnnotation.a;
			return A2(
				$stil4m$structured_writer$StructuredWriter$parensComma,
				false,
				A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation, xs));
		case 'Record':
			var xs = typeAnnotation.a;
			return A2(
				$stil4m$structured_writer$StructuredWriter$bracesComma,
				false,
				A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Writer$writeRecordField, xs));
		case 'GenericRecord':
			var name = typeAnnotation.a;
			var fields = typeAnnotation.b;
			return $stil4m$structured_writer$StructuredWriter$spaced(
				_List_fromArray(
					[
						$stil4m$structured_writer$StructuredWriter$string('{'),
						$stil4m$structured_writer$StructuredWriter$string(
						$stil4m$elm_syntax$Elm$Syntax$Node$value(name)),
						$stil4m$structured_writer$StructuredWriter$string('|'),
						A2(
						$stil4m$structured_writer$StructuredWriter$sepByComma,
						false,
						A2(
							$elm$core$List$map,
							$stil4m$elm_syntax$Elm$Writer$writeRecordField,
							$stil4m$elm_syntax$Elm$Syntax$Node$value(fields))),
						$stil4m$structured_writer$StructuredWriter$string('}')
					]));
		default:
			var left = typeAnnotation.a;
			var right = typeAnnotation.b;
			var addParensForSubTypeAnnotation = function (type_) {
				if (type_.b.$ === 'FunctionTypeAnnotation') {
					var _v3 = type_.b;
					return $stil4m$structured_writer$StructuredWriter$join(
						_List_fromArray(
							[
								$stil4m$structured_writer$StructuredWriter$string('('),
								$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(type_),
								$stil4m$structured_writer$StructuredWriter$string(')')
							]));
				} else {
					return $stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(type_);
				}
			};
			return $stil4m$structured_writer$StructuredWriter$spaced(
				_List_fromArray(
					[
						addParensForSubTypeAnnotation(left),
						$stil4m$structured_writer$StructuredWriter$string('->'),
						addParensForSubTypeAnnotation(right)
					]));
	}
};
var $mdgriffith$elm_codegen$Internal$Compiler$inferenceErrorToString = function (inf) {
	switch (inf.$) {
		case 'Todo':
			var str = inf.a;
			return 'Todo ' + str;
		case 'MismatchedList':
			var one = inf.a;
			var two = inf.b;
			return 'There are multiple different types in a list: \n\n' + ('    ' + ($stil4m$elm_syntax$Elm$Writer$write(
				$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(one))) + ('\n\n    ' + $stil4m$elm_syntax$Elm$Writer$write(
				$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(two))))));
		case 'RecordUpdateIncorrectFields':
			var details = inf.a;
			return 'Mismatched record update';
		case 'EmptyCaseStatement':
			return 'Case statement is empty';
		case 'FunctionAppliedToTooManyArgs':
			var fn = inf.a;
			var args = inf.b;
			return 'The following is being called as a function\n\n    ' + ($stil4m$elm_syntax$Elm$Writer$write(
				$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(fn))) + ('\n\nwith these arguments:\n\n    ' + (A2(
				$elm$core$String$join,
				' -> ',
				A2(
					$elm$core$List$map,
					function (arg) {
						return $stil4m$elm_syntax$Elm$Writer$write(
							$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(arg)));
					},
					args)) + '\n\nbut that\'s wrong, right?')));
		case 'DuplicateFieldInRecord':
			var fieldName = inf.a;
			return 'There is a duplicate field in a record: ' + fieldName;
		case 'CaseBranchesReturnDifferentTypes':
			return 'Case returns different types.';
		case 'CouldNotFindField':
			var found = inf.a;
			return 'I can\'t find .' + (found.field + (', this record only has these fields:\n\n    ' + A2($elm$core$String$join, '\n    ', found.existingFields)));
		case 'AttemptingToGetOnIncorrectType':
			var attempting = inf.a;
			return 'You\'re trying to access\n\n    .' + (attempting.field + ('\n\nbut this value isn\'t a record. It\'s a\n\n    ' + $stil4m$elm_syntax$Elm$Writer$write(
				$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(attempting.on)))));
		case 'AttemptingGetOnTypeNameNotAnAlias':
			var attempting = inf.a;
			return 'You\'re trying to access\n\n    .' + (attempting.field + ('\n\nbut this value isn\'t a record, it\'s a\n\n    ' + ($stil4m$elm_syntax$Elm$Writer$write(
				$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(attempting.on))) + '\n\nIs this value supposed to be an alias for a record? If so, check out Elm.alias!')));
		case 'LetFieldNotFound':
			var details = inf.a;
			return details.desiredField + ' not found, though I was trying to unpack it in a let expression.';
		case 'NotAppendable':
			var type_ = inf.a;
			return $stil4m$elm_syntax$Elm$Writer$write(
				$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + ' is not appendable.  Only Strings and Lists are appendable';
		case 'NotComparable':
			var type_ = inf.a;
			return $stil4m$elm_syntax$Elm$Writer$write(
				$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + ' is not appendable.  Only Strings and Lists are appendable';
		case 'UnableToUnify':
			var one = inf.a;
			var two = inf.b;
			return 'I found\n\n    ' + ($stil4m$elm_syntax$Elm$Writer$write(
				$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(one))) + ('\n\nBut I was expecting:\n\n    ' + $stil4m$elm_syntax$Elm$Writer$write(
				$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(two)))));
		default:
			return 'Different lists of type variables';
	}
};
var $mdgriffith$elm_codegen$Elm$renderError = function (err) {
	if (!err.b) {
		return '';
	} else {
		return A2(
			$elm$core$String$join,
			'\n\n',
			A2($elm$core$List$map, $mdgriffith$elm_codegen$Internal$Compiler$inferenceErrorToString, err));
	}
};
var $mdgriffith$elm_codegen$Internal$Compiler$isAppendable = function (annotation) {
	_v0$2:
	while (true) {
		if ((annotation.$ === 'Typed') && (!annotation.a.b.a.b)) {
			switch (annotation.a.b.b) {
				case 'String':
					var _v1 = annotation.a;
					var _v2 = _v1.b;
					return true;
				case 'List':
					if (annotation.b.b && (!annotation.b.b.b)) {
						var _v3 = annotation.a;
						var _v4 = _v3.b;
						var _v5 = annotation.b;
						var _v6 = _v5.a;
						var inner = _v6.b;
						return true;
					} else {
						break _v0$2;
					}
				default:
					break _v0$2;
			}
		} else {
			break _v0$2;
		}
	}
	return false;
};
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$isComparable = function (annotation) {
	isComparable:
	while (true) {
		_v0$6:
		while (true) {
			switch (annotation.$) {
				case 'Typed':
					if (annotation.a.b.a.b) {
						if (((annotation.a.b.a.a === 'Char') && (!annotation.a.b.a.b.b)) && (annotation.a.b.b === 'Char')) {
							var _v5 = annotation.a;
							var _v6 = _v5.b;
							var _v7 = _v6.a;
							return true;
						} else {
							break _v0$6;
						}
					} else {
						switch (annotation.a.b.b) {
							case 'Int':
								var _v1 = annotation.a;
								var _v2 = _v1.b;
								return true;
							case 'Float':
								var _v3 = annotation.a;
								var _v4 = _v3.b;
								return true;
							case 'String':
								var _v8 = annotation.a;
								var _v9 = _v8.b;
								return true;
							case 'List':
								if (annotation.b.b && (!annotation.b.b.b)) {
									var _v10 = annotation.a;
									var _v11 = _v10.b;
									var _v12 = annotation.b;
									var _v13 = _v12.a;
									var inner = _v13.b;
									var $temp$annotation = inner;
									annotation = $temp$annotation;
									continue isComparable;
								} else {
									break _v0$6;
								}
							default:
								break _v0$6;
						}
					}
				case 'Tupled':
					var innerList = annotation.a;
					return A2(
						$elm$core$List$all,
						A2($elm$core$Basics$composeL, $mdgriffith$elm_codegen$Internal$Compiler$isComparable, $mdgriffith$elm_codegen$Internal$Compiler$denode),
						innerList);
				default:
					break _v0$6;
			}
		}
		return false;
	}
};
var $mdgriffith$elm_codegen$Internal$Compiler$isNumber = function (annotation) {
	_v0$2:
	while (true) {
		if ((annotation.$ === 'Typed') && (!annotation.a.b.a.b)) {
			switch (annotation.a.b.b) {
				case 'Int':
					var _v1 = annotation.a;
					var _v2 = _v1.b;
					return true;
				case 'Float':
					var _v3 = annotation.a;
					var _v4 = _v3.b;
					return true;
				default:
					break _v0$2;
			}
		} else {
			break _v0$2;
		}
	}
	return false;
};
var $mdgriffith$elm_codegen$Internal$Compiler$checkRestrictions = F2(
	function (restrictions, type_) {
		switch (restrictions.$) {
			case 'NoRestrictions':
				return $elm$core$Result$Ok(type_);
			case 'Overconstrainted':
				var constraints = restrictions.a;
				return $elm$core$Result$Err(
					$stil4m$elm_syntax$Elm$Writer$write(
						$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
							$mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + (' needs to be: ' + (A2(
						$elm$core$String$join,
						', ',
						A2(
							$elm$core$List$concatMap,
							function (constraint) {
								switch (constraint.$) {
									case 'NoRestrictions':
										return _List_Nil;
									case 'Overconstrainted':
										return _List_Nil;
									case 'IsNumber':
										return _List_fromArray(
											['a number']);
									case 'IsComparable':
										return _List_fromArray(
											['comparable']);
									case 'IsAppendable':
										return _List_fromArray(
											['appendable']);
									default:
										return _List_fromArray(
											['appendable and comparable']);
								}
							},
							constraints)) + '\n\nbut that\'s impossible!  Or Elm Codegen\'s s typechecker is off.')));
			case 'IsNumber':
				return $mdgriffith$elm_codegen$Internal$Compiler$isNumber(type_) ? $elm$core$Result$Ok(type_) : $elm$core$Result$Err(
					$stil4m$elm_syntax$Elm$Writer$write(
						$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
							$mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + ' is not a number');
			case 'IsComparable':
				return $mdgriffith$elm_codegen$Internal$Compiler$isComparable(type_) ? $elm$core$Result$Ok(type_) : $elm$core$Result$Err(
					$stil4m$elm_syntax$Elm$Writer$write(
						$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
							$mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + ' is not comparable.  Only Ints, Floats, Chars, Strings and Lists and Tuples of those things are comparable.');
			case 'IsAppendable':
				return $mdgriffith$elm_codegen$Internal$Compiler$isAppendable(type_) ? $elm$core$Result$Ok(type_) : $elm$core$Result$Err(
					$stil4m$elm_syntax$Elm$Writer$write(
						$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
							$mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + ' is not appendable.  Only Strings and Lists are appendable.');
			default:
				return ($mdgriffith$elm_codegen$Internal$Compiler$isComparable(type_) || $mdgriffith$elm_codegen$Internal$Compiler$isAppendable(type_)) ? $elm$core$Result$Ok(type_) : $elm$core$Result$Err(
					$stil4m$elm_syntax$Elm$Writer$write(
						$stil4m$elm_syntax$Elm$Writer$writeTypeAnnotation(
							$mdgriffith$elm_codegen$Internal$Compiler$nodify(type_))) + ' is not appendable/comparable.  Only Strings and Lists are allowed here.');
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$NoRestrictions = {$: 'NoRestrictions'};
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit = {$: 'Unit'};
var $mdgriffith$elm_codegen$Internal$Compiler$IsAppendable = {$: 'IsAppendable'};
var $mdgriffith$elm_codegen$Internal$Compiler$IsAppendableComparable = {$: 'IsAppendableComparable'};
var $mdgriffith$elm_codegen$Internal$Compiler$IsComparable = {$: 'IsComparable'};
var $mdgriffith$elm_codegen$Internal$Compiler$IsNumber = {$: 'IsNumber'};
var $elm$core$String$startsWith = _String_startsWith;
var $mdgriffith$elm_codegen$Internal$Compiler$nameToRestrictions = function (name) {
	return A2($elm$core$String$startsWith, 'number', name) ? $mdgriffith$elm_codegen$Internal$Compiler$IsNumber : (A2($elm$core$String$startsWith, 'comparable', name) ? $mdgriffith$elm_codegen$Internal$Compiler$IsComparable : (A2($elm$core$String$startsWith, 'appendable', name) ? $mdgriffith$elm_codegen$Internal$Compiler$IsAppendable : (A2($elm$core$String$startsWith, 'compappend', name) ? $mdgriffith$elm_codegen$Internal$Compiler$IsAppendableComparable : $mdgriffith$elm_codegen$Internal$Compiler$NoRestrictions)));
};
var $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted = function (a) {
	return {$: 'Overconstrainted', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$restrictFurther = F2(
	function (restriction, newRestriction) {
		switch (restriction.$) {
			case 'NoRestrictions':
				return newRestriction;
			case 'Overconstrainted':
				var constraints = restriction.a;
				switch (newRestriction.$) {
					case 'Overconstrainted':
						var newConstraints = newRestriction.a;
						return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(
							_Utils_ap(constraints, newConstraints));
					case 'NoRestrictions':
						return restriction;
					default:
						return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(
							A2($elm$core$List$cons, newRestriction, constraints));
				}
			case 'IsNumber':
				switch (newRestriction.$) {
					case 'IsNumber':
						return newRestriction;
					case 'NoRestrictions':
						return restriction;
					case 'Overconstrainted':
						var constraints = newRestriction.a;
						return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(
							A2($elm$core$List$cons, restriction, constraints));
					default:
						return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(
							_List_fromArray(
								[restriction, newRestriction]));
				}
			case 'IsComparable':
				switch (newRestriction.$) {
					case 'NoRestrictions':
						return restriction;
					case 'IsAppendableComparable':
						return newRestriction;
					case 'IsComparable':
						return newRestriction;
					case 'Overconstrainted':
						var constraints = newRestriction.a;
						return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(
							A2($elm$core$List$cons, restriction, constraints));
					default:
						return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(
							_List_fromArray(
								[restriction, newRestriction]));
				}
			case 'IsAppendable':
				switch (newRestriction.$) {
					case 'NoRestrictions':
						return restriction;
					case 'IsAppendableComparable':
						return newRestriction;
					case 'IsComparable':
						return newRestriction;
					case 'Overconstrainted':
						var constraints = newRestriction.a;
						return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(
							A2($elm$core$List$cons, restriction, constraints));
					default:
						return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(
							_List_fromArray(
								[restriction, newRestriction]));
				}
			default:
				switch (newRestriction.$) {
					case 'NoRestrictions':
						return restriction;
					case 'IsAppendableComparable':
						return newRestriction;
					case 'IsComparable':
						return newRestriction;
					case 'IsAppendable':
						return newRestriction;
					case 'Overconstrainted':
						var constraints = newRestriction.a;
						return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(
							A2($elm$core$List$cons, restriction, constraints));
					default:
						return $mdgriffith$elm_codegen$Internal$Compiler$Overconstrainted(
							_List_fromArray(
								[restriction, newRestriction]));
				}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$getRestrictionsHelper = F3(
	function (existingRestrictions, notation, cache) {
		getRestrictionsHelper:
		while (true) {
			switch (notation.$) {
				case 'FunctionTypeAnnotation':
					var _v1 = notation.a;
					var oneCoords = _v1.a;
					var one = _v1.b;
					var _v2 = notation.b;
					var twoCoords = _v2.a;
					var two = _v2.b;
					return existingRestrictions;
				case 'GenericType':
					var name = notation.a;
					var $temp$existingRestrictions = A2(
						$mdgriffith$elm_codegen$Internal$Compiler$restrictFurther,
						existingRestrictions,
						$mdgriffith$elm_codegen$Internal$Compiler$nameToRestrictions(name)),
						$temp$notation = A2(
						$elm$core$Maybe$withDefault,
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit,
						A2($elm$core$Dict$get, name, cache)),
						$temp$cache = cache;
					existingRestrictions = $temp$existingRestrictions;
					notation = $temp$notation;
					cache = $temp$cache;
					continue getRestrictionsHelper;
				case 'Typed':
					var nodedModuleName = notation.a;
					var vars = notation.b;
					return existingRestrictions;
				case 'Unit':
					return existingRestrictions;
				case 'Tupled':
					var nodes = notation.a;
					return existingRestrictions;
				case 'Record':
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
	});
var $mdgriffith$elm_codegen$Internal$Compiler$getRestrictions = F2(
	function (notation, cache) {
		return A3($mdgriffith$elm_codegen$Internal$Compiler$getRestrictionsHelper, $mdgriffith$elm_codegen$Internal$Compiler$NoRestrictions, notation, cache);
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 'Err') {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 'Err') {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$resolveVariableList = F4(
	function (visited, cache, nodes, processed) {
		resolveVariableList:
		while (true) {
			if (!nodes.b) {
				return $elm$core$Result$Ok(
					$elm$core$List$reverse(processed));
			} else {
				var _v17 = nodes.a;
				var coords = _v17.a;
				var top = _v17.b;
				var remain = nodes.b;
				var _v18 = A3($mdgriffith$elm_codegen$Internal$Compiler$resolveVariables, visited, cache, top);
				if (_v18.$ === 'Ok') {
					var resolved = _v18.a;
					var $temp$visited = visited,
						$temp$cache = cache,
						$temp$nodes = remain,
						$temp$processed = A2(
						$elm$core$List$cons,
						A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, coords, resolved),
						processed);
					visited = $temp$visited;
					cache = $temp$cache;
					nodes = $temp$nodes;
					processed = $temp$processed;
					continue resolveVariableList;
				} else {
					var err = _v18.a;
					return $elm$core$Result$Err(err);
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$resolveVariables = F3(
	function (visited, cache, annotation) {
		resolveVariables:
		while (true) {
			switch (annotation.$) {
				case 'FunctionTypeAnnotation':
					var _v1 = annotation.a;
					var oneCoords = _v1.a;
					var one = _v1.b;
					var _v2 = annotation.b;
					var twoCoords = _v2.a;
					var two = _v2.b;
					return A3(
						$elm$core$Result$map2,
						F2(
							function (oneResolved, twoResolved) {
								return A2(
									$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
									A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, oneCoords, oneResolved),
									A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, twoCoords, twoResolved));
							}),
						A3($mdgriffith$elm_codegen$Internal$Compiler$resolveVariables, visited, cache, one),
						A3($mdgriffith$elm_codegen$Internal$Compiler$resolveVariables, visited, cache, two));
				case 'GenericType':
					var name = annotation.a;
					if (A2($elm$core$Set$member, name, visited)) {
						return $elm$core$Result$Err('Infinite type inference loop!  Whoops.  This is an issue with elm-codegen.  If you can report this to the elm-codegen repo, that would be appreciated!');
					} else {
						var _v3 = A2($elm$core$Dict$get, name, cache);
						if (_v3.$ === 'Nothing') {
							return $elm$core$Result$Ok(annotation);
						} else {
							var newType = _v3.a;
							var $temp$visited = A2($elm$core$Set$insert, name, visited),
								$temp$cache = cache,
								$temp$annotation = newType;
							visited = $temp$visited;
							cache = $temp$cache;
							annotation = $temp$annotation;
							continue resolveVariables;
						}
					}
				case 'Typed':
					var nodedModuleName = annotation.a;
					var vars = annotation.b;
					return A2(
						$elm$core$Result$map,
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed(nodedModuleName),
						A4($mdgriffith$elm_codegen$Internal$Compiler$resolveVariableList, visited, cache, vars, _List_Nil));
				case 'Unit':
					return $elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit);
				case 'Tupled':
					var nodes = annotation.a;
					return A2(
						$elm$core$Result$map,
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled,
						A4($mdgriffith$elm_codegen$Internal$Compiler$resolveVariableList, visited, cache, nodes, _List_Nil));
				case 'Record':
					var fields = annotation.a;
					return A2(
						$elm$core$Result$map,
						A2($elm$core$Basics$composeL, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record, $elm$core$List$reverse),
						A3(
							$elm$core$List$foldl,
							F2(
								function (_v4, found) {
									var fieldRange = _v4.a;
									var _v5 = _v4.b;
									var name = _v5.a;
									var _v6 = _v5.b;
									var fieldTypeRange = _v6.a;
									var fieldType = _v6.b;
									if (found.$ === 'Err') {
										var err = found.a;
										return $elm$core$Result$Err(err);
									} else {
										var processedFields = found.a;
										var _v8 = A3($mdgriffith$elm_codegen$Internal$Compiler$resolveVariables, visited, cache, fieldType);
										if (_v8.$ === 'Err') {
											var err = _v8.a;
											return $elm$core$Result$Err(err);
										} else {
											var resolvedField = _v8.a;
											var restrictions = A2($mdgriffith$elm_codegen$Internal$Compiler$getRestrictions, annotation, cache);
											var _v9 = A2($mdgriffith$elm_codegen$Internal$Compiler$checkRestrictions, restrictions, resolvedField);
											if (_v9.$ === 'Ok') {
												return $elm$core$Result$Ok(
													A2(
														$elm$core$List$cons,
														A2(
															$stil4m$elm_syntax$Elm$Syntax$Node$Node,
															fieldRange,
															_Utils_Tuple2(
																name,
																A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, fieldTypeRange, resolvedField))),
														processedFields));
											} else {
												var err = _v9.a;
												return $elm$core$Result$Err(err);
											}
										}
									}
								}),
							$elm$core$Result$Ok(_List_Nil),
							fields));
				default:
					var baseName = annotation.a;
					var _v10 = annotation.b;
					var recordNode = _v10.a;
					var fields = _v10.b;
					var newFieldResult = A3(
						$elm$core$List$foldl,
						F2(
							function (_v11, found) {
								var fieldRange = _v11.a;
								var _v12 = _v11.b;
								var name = _v12.a;
								var _v13 = _v12.b;
								var fieldTypeRange = _v13.a;
								var fieldType = _v13.b;
								if (found.$ === 'Err') {
									var err = found.a;
									return $elm$core$Result$Err(err);
								} else {
									var processedFields = found.a;
									var _v15 = A3($mdgriffith$elm_codegen$Internal$Compiler$resolveVariables, visited, cache, fieldType);
									if (_v15.$ === 'Err') {
										var err = _v15.a;
										return $elm$core$Result$Err(err);
									} else {
										var resolvedField = _v15.a;
										var restrictions = A2($mdgriffith$elm_codegen$Internal$Compiler$getRestrictions, annotation, cache);
										return $elm$core$Result$Ok(
											A2(
												$elm$core$List$cons,
												A2(
													$stil4m$elm_syntax$Elm$Syntax$Node$Node,
													fieldRange,
													_Utils_Tuple2(
														name,
														A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, fieldTypeRange, resolvedField))),
												processedFields));
									}
								}
							}),
						$elm$core$Result$Ok(_List_Nil),
						fields);
					return A2(
						$elm$core$Result$map,
						function (newFields) {
							return A2(
								$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord,
								baseName,
								A2(
									$stil4m$elm_syntax$Elm$Syntax$Node$Node,
									recordNode,
									$elm$core$List$reverse(newFields)));
						},
						newFieldResult);
			}
		}
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $mdgriffith$elm_codegen$Internal$Compiler$simplify = function (fullStr) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (piece, str) {
				var isDigit = A2($elm$core$String$all, $elm$core$Char$isDigit, piece);
				if (isDigit) {
					return str;
				} else {
					if (str === '') {
						return piece;
					} else {
						return str + ('_' + piece);
					}
				}
			}),
		'',
		A2($elm$core$String$split, '_', fullStr));
};
var $mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper = F3(
	function (existing, renames, type_) {
		switch (type_.$) {
			case 'GenericType':
				var varName = type_.a;
				var _v1 = A2($elm$core$Dict$get, varName, renames);
				if (_v1.$ === 'Nothing') {
					var simplified = $mdgriffith$elm_codegen$Internal$Compiler$simplify(varName);
					return (A2($elm$core$Set$member, simplified, existing) && (!_Utils_eq(varName, simplified))) ? _Utils_Tuple2(
						renames,
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(simplified)) : _Utils_Tuple2(
						A3($elm$core$Dict$insert, varName, simplified, renames),
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(simplified));
				} else {
					var rename = _v1.a;
					return _Utils_Tuple2(
						renames,
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(rename));
				}
			case 'Typed':
				var name = type_.a;
				var vars = type_.b;
				var _v2 = A3(
					$elm$core$List$foldl,
					F2(
						function (typevar, _v3) {
							var varUsed = _v3.a;
							var varList = _v3.b;
							var _v4 = A3(
								$mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper,
								existing,
								varUsed,
								$mdgriffith$elm_codegen$Internal$Compiler$denode(typevar));
							var oneUsed = _v4.a;
							var oneType = _v4.b;
							return _Utils_Tuple2(
								oneUsed,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(oneType),
									varList));
						}),
					_Utils_Tuple2(renames, _List_Nil),
					vars);
				var newUsed = _v2.a;
				var newVars = _v2.b;
				return _Utils_Tuple2(
					newUsed,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
						name,
						$elm$core$List$reverse(newVars)));
			case 'Unit':
				return _Utils_Tuple2(renames, type_);
			case 'Tupled':
				var valsA = type_.a;
				return _Utils_Tuple2(renames, type_);
			case 'Record':
				var fieldsA = type_.a;
				return _Utils_Tuple2(renames, type_);
			case 'GenericRecord':
				var _v5 = type_.a;
				var reVarName = _v5.b;
				var _v6 = type_.b;
				var fieldsARange = _v6.a;
				var fieldsA = _v6.b;
				return _Utils_Tuple2(renames, type_);
			default:
				var one = type_.a;
				var two = type_.b;
				var _v7 = A3(
					$mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper,
					existing,
					renames,
					$mdgriffith$elm_codegen$Internal$Compiler$denode(one));
				var oneUsed = _v7.a;
				var oneType = _v7.b;
				var _v8 = A3(
					$mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper,
					existing,
					oneUsed,
					$mdgriffith$elm_codegen$Internal$Compiler$denode(two));
				var twoUsed = _v8.a;
				var twoType = _v8.b;
				return _Utils_Tuple2(
					twoUsed,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(oneType),
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(twoType)));
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariables = function (type_) {
	var existing = $elm$core$Set$fromList(
		$mdgriffith$elm_codegen$Internal$Compiler$getGenericsHelper(type_));
	return A3($mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariablesHelper, existing, $elm$core$Dict$empty, type_).b;
};
var $mdgriffith$elm_codegen$Internal$Index$typecheck = function (_v0) {
	var top = _v0.a;
	var tail = _v0.b;
	var scope = _v0.c;
	var check = _v0.d;
	return check;
};
var $mdgriffith$elm_codegen$Internal$Compiler$resolve = F3(
	function (index, cache, annotation) {
		if ($mdgriffith$elm_codegen$Internal$Index$typecheck(index)) {
			var restrictions = A2($mdgriffith$elm_codegen$Internal$Compiler$getRestrictions, annotation, cache);
			var _v0 = A3($mdgriffith$elm_codegen$Internal$Compiler$resolveVariables, $elm$core$Set$empty, cache, annotation);
			if (_v0.$ === 'Ok') {
				var newAnnotation = _v0.a;
				return A2(
					$mdgriffith$elm_codegen$Internal$Compiler$checkRestrictions,
					restrictions,
					$mdgriffith$elm_codegen$Internal$Compiler$rewriteTypeVariables(newAnnotation));
			} else {
				var err = _v0.a;
				return $elm$core$Result$Err(err);
			}
		} else {
			return $elm$core$Result$Err('Type inference skipped.');
		}
	});
var $mdgriffith$elm_codegen$Elm$declaration = F2(
	function (nameStr, _v0) {
		var toBody = _v0.a;
		var name = $mdgriffith$elm_codegen$Internal$Format$formatDeclarationName(nameStr);
		return $mdgriffith$elm_codegen$Internal$Compiler$Declaration(
			{
				docs: $elm$core$Maybe$Nothing,
				exposed: $mdgriffith$elm_codegen$Internal$Compiler$NotExposed,
				imports: _List_Nil,
				name: name,
				toBody: function (index) {
					var body = toBody(index);
					var resolvedType = A2(
						$elm$core$Result$andThen,
						function (sig) {
							return A3($mdgriffith$elm_codegen$Internal$Compiler$resolve, index, sig.inferences, sig.type_);
						},
						A2($elm$core$Result$mapError, $mdgriffith$elm_codegen$Elm$renderError, body.annotation));
					var maybeWarning = function () {
						if (resolvedType.$ === 'Ok') {
							var sig = resolvedType.a;
							var _v5 = body.annotation;
							if (_v5.$ === 'Ok') {
								var inference = _v5.a;
								return $elm$core$Maybe$Nothing;
							} else {
								if (!_v5.a.b) {
									return $elm$core$Maybe$Nothing;
								} else {
									var err = _v5.a;
									return $elm$core$Maybe$Just(
										{
											declaration: name,
											warning: $mdgriffith$elm_codegen$Elm$renderError(err)
										});
								}
							}
						} else {
							if (resolvedType.a === '') {
								return $elm$core$Maybe$Nothing;
							} else {
								var err = resolvedType.a;
								return $elm$core$Maybe$Just(
									{declaration: name, warning: err});
							}
						}
					}();
					return {
						additionalImports: body.imports,
						declaration: $stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(
							{
								declaration: function () {
									var _v1 = body.expression;
									if (_v1.$ === 'LambdaExpression') {
										var lam = _v1.a;
										return $mdgriffith$elm_codegen$Internal$Compiler$nodify(
											{
												_arguments: lam.args,
												expression: lam.expression,
												name: $mdgriffith$elm_codegen$Internal$Compiler$nodify(name)
											});
									} else {
										return $mdgriffith$elm_codegen$Internal$Compiler$nodify(
											{
												_arguments: _List_Nil,
												expression: $mdgriffith$elm_codegen$Internal$Compiler$nodify(body.expression),
												name: $mdgriffith$elm_codegen$Internal$Compiler$nodify(name)
											});
									}
								}(),
								documentation: $elm$core$Maybe$Nothing,
								signature: function () {
									var _v2 = body.annotation;
									if (_v2.$ === 'Ok') {
										var sig = _v2.a;
										if (resolvedType.$ === 'Ok') {
											if (resolvedType.a.$ === 'GenericType') {
												var generic = resolvedType.a.a;
												return $elm$core$Maybe$Nothing;
											} else {
												var finalType = resolvedType.a;
												return $elm$core$Maybe$Just(
													$mdgriffith$elm_codegen$Internal$Compiler$nodify(
														{
															name: $mdgriffith$elm_codegen$Internal$Compiler$nodify(name),
															typeAnnotation: $mdgriffith$elm_codegen$Internal$Compiler$nodify(
																$mdgriffith$elm_codegen$Internal$Clean$clean(finalType))
														}));
											}
										} else {
											var errMsg = resolvedType.a;
											return $elm$core$Maybe$Nothing;
										}
									} else {
										return $elm$core$Maybe$Nothing;
									}
								}()
							}),
						warning: maybeWarning
					};
				}
			});
	});
var $mdgriffith$elm_codegen$Elm$alias = F2(
	function (name, innerAnnotation) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Declaration(
			{
				docs: $elm$core$Maybe$Nothing,
				exposed: $mdgriffith$elm_codegen$Internal$Compiler$NotExposed,
				imports: $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(innerAnnotation),
				name: name,
				toBody: function (index) {
					return {
						additionalImports: _List_Nil,
						declaration: $stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration(
							{
								documentation: $elm$core$Maybe$Nothing,
								generics: A2(
									$elm$core$List$map,
									$mdgriffith$elm_codegen$Internal$Compiler$nodify,
									$mdgriffith$elm_codegen$Internal$Compiler$getGenerics(innerAnnotation)),
								name: $mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$mdgriffith$elm_codegen$Internal$Format$formatType(name)),
								typeAnnotation: $mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(innerAnnotation))
							}),
						warning: $elm$core$Maybe$Nothing
					};
				}
			});
	});
var $mdgriffith$elm_codegen$Internal$Compiler$Annotation = function (a) {
	return {$: 'Annotation', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$formatAliasKey = F2(
	function (mod, name) {
		return A2($elm$core$String$join, '.', mod) + ('.' + name);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$addAlias = F4(
	function (mod, name, ann, aliasCache) {
		var annDetails = ann.a;
		return A3(
			$elm$core$Dict$insert,
			A2($mdgriffith$elm_codegen$Internal$Compiler$formatAliasKey, mod, name),
			{
				target: annDetails.annotation,
				variables: $mdgriffith$elm_codegen$Internal$Compiler$getGenerics(ann)
			},
			aliasCache);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$getAliases = function (_v0) {
	var ann = _v0.a;
	return ann.aliases;
};
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$mergeAliases = $elm$core$Dict$union;
var $mdgriffith$elm_codegen$Elm$Annotation$alias = F4(
	function (mod, name, vars, target) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
			{
				aliases: A4(
					$mdgriffith$elm_codegen$Internal$Compiler$addAlias,
					mod,
					name,
					target,
					A3(
						$elm$core$List$foldl,
						F2(
							function (ann, aliases) {
								return A2(
									$mdgriffith$elm_codegen$Internal$Compiler$mergeAliases,
									$mdgriffith$elm_codegen$Internal$Compiler$getAliases(ann),
									aliases);
							}),
						$mdgriffith$elm_codegen$Internal$Compiler$getAliases(target),
						vars)),
				annotation: A2(
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(
						_Utils_Tuple2(
							mod,
							$mdgriffith$elm_codegen$Internal$Format$formatType(name))),
					A2(
						$elm$core$List$map,
						A2($elm$core$Basics$composeL, $mdgriffith$elm_codegen$Internal$Compiler$nodify, $mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation),
						vars)),
				imports: function () {
					if (!mod.b) {
						return A2($elm$core$List$concatMap, $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, vars);
					} else {
						return _Utils_ap(
							_List_fromArray(
								[mod]),
							A2($elm$core$List$concatMap, $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, vars));
					}
				}()
			});
	});
var $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases = $elm$core$Dict$empty;
var $mdgriffith$elm_codegen$Elm$Annotation$getAliases = function (_v0) {
	var ann = _v0.a;
	return ann.aliases;
};
var $mdgriffith$elm_codegen$Elm$Annotation$namedWith = F3(
	function (mod, name, args) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
			{
				aliases: A3(
					$elm$core$List$foldl,
					F2(
						function (ann, aliases) {
							return A2(
								$mdgriffith$elm_codegen$Internal$Compiler$mergeAliases,
								$mdgriffith$elm_codegen$Elm$Annotation$getAliases(ann),
								aliases);
						}),
					$mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
					args),
				annotation: A2(
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(
						_Utils_Tuple2(
							mod,
							$mdgriffith$elm_codegen$Internal$Format$formatType(name))),
					$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
						A2($elm$core$List$map, $mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation, args))),
				imports: A2(
					$elm$core$List$cons,
					mod,
					A2($elm$core$List$concatMap, $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, args))
			});
	});
var $mdgriffith$elm_codegen$Internal$Compiler$Expression = function (a) {
	return {$: 'Expression', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue = F2(
	function (a, b) {
		return {$: 'FunctionOrValue', a: a, b: b};
	});
var $mdgriffith$elm_codegen$Internal$Index$indexToString = function (_v0) {
	var top = _v0.a;
	var tail = _v0.b;
	var scope = _v0.c;
	var check = _v0.d;
	return _Utils_ap(
		(!top) ? '' : ('_' + $elm$core$String$fromInt(top)),
		function () {
			if (!tail.b) {
				return '';
			} else {
				if (!tail.b.b) {
					var one = tail.a;
					return '_' + $elm$core$String$fromInt(one);
				} else {
					if (!tail.b.b.b) {
						var one = tail.a;
						var _v2 = tail.b;
						var two = _v2.a;
						return '_' + ($elm$core$String$fromInt(one) + ('_' + $elm$core$String$fromInt(two)));
					} else {
						if (!tail.b.b.b.b) {
							var one = tail.a;
							var _v3 = tail.b;
							var two = _v3.a;
							var _v4 = _v3.b;
							var three = _v4.a;
							return '_' + ($elm$core$String$fromInt(one) + ('_' + ($elm$core$String$fromInt(two) + ('_' + $elm$core$String$fromInt(three)))));
						} else {
							return '_' + A2(
								$elm$core$String$join,
								'_',
								A2($elm$core$List$map, $elm$core$String$fromInt, tail));
						}
					}
				}
			}
		}());
};
var $mdgriffith$elm_codegen$Internal$Compiler$mapNode = F2(
	function (fn, _v0) {
		var range = _v0.a;
		var n = _v0.b;
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			range,
			fn(n));
	});
var $mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation = F2(
	function (index, ann) {
		switch (ann.$) {
			case 'GenericType':
				var str = ann.a;
				return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(
					_Utils_ap(
						str,
						$mdgriffith$elm_codegen$Internal$Index$indexToString(index)));
			case 'Typed':
				var modName = ann.a;
				var anns = ann.b;
				return A2(
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
					modName,
					A2(
						$elm$core$List$map,
						$mdgriffith$elm_codegen$Internal$Compiler$mapNode(
							$mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation(index)),
						anns));
			case 'Unit':
				return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit;
			case 'Tupled':
				var tupled = ann.a;
				return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(
					A2(
						$elm$core$List$map,
						$mdgriffith$elm_codegen$Internal$Compiler$mapNode(
							$mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation(index)),
						tupled));
			case 'Record':
				var recordDefinition = ann.a;
				return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(
					A2(
						$elm$core$List$map,
						$mdgriffith$elm_codegen$Internal$Compiler$protectField(index),
						recordDefinition));
			case 'GenericRecord':
				var recordName = ann.a;
				var _v3 = ann.b;
				var recordRange = _v3.a;
				var recordDefinition = _v3.b;
				return A2(
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord,
					A2(
						$mdgriffith$elm_codegen$Internal$Compiler$mapNode,
						function (n) {
							return _Utils_ap(
								n,
								$mdgriffith$elm_codegen$Internal$Index$indexToString(index));
						},
						recordName),
					A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						recordRange,
						A2(
							$elm$core$List$map,
							$mdgriffith$elm_codegen$Internal$Compiler$protectField(index),
							recordDefinition)));
			default:
				var one = ann.a;
				var two = ann.b;
				return A2(
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
					A2(
						$mdgriffith$elm_codegen$Internal$Compiler$mapNode,
						$mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation(index),
						one),
					A2(
						$mdgriffith$elm_codegen$Internal$Compiler$mapNode,
						$mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation(index),
						two));
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$protectField = F2(
	function (index, _v0) {
		var nodeRange = _v0.a;
		var _v1 = _v0.b;
		var nodedName = _v1.a;
		var nodedType = _v1.b;
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			nodeRange,
			_Utils_Tuple2(
				nodedName,
				A2(
					$mdgriffith$elm_codegen$Internal$Compiler$mapNode,
					$mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation(index),
					nodedType)));
	});
var $mdgriffith$elm_codegen$Internal$Compiler$getInnerInference = F2(
	function (index, _v0) {
		var details = _v0.a;
		return {
			aliases: details.aliases,
			inferences: $elm$core$Dict$empty,
			type_: A2($mdgriffith$elm_codegen$Internal$Compiler$protectAnnotation, index, details.annotation)
		};
	});
var $mdgriffith$elm_codegen$Internal$Index$protectTypeName = F2(
	function (base, index) {
		var top = index.a;
		var tail = index.b;
		var scope = index.c;
		var check = index.d;
		if (!tail.b) {
			return $mdgriffith$elm_codegen$Internal$Format$formatValue(base);
		} else {
			return $mdgriffith$elm_codegen$Internal$Format$formatValue(
				_Utils_ap(
					base,
					$mdgriffith$elm_codegen$Internal$Index$indexToString(index)));
		}
	});
var $mdgriffith$elm_codegen$Elm$value = function (details) {
	return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
		function (index) {
			return {
				annotation: function () {
					var _v0 = details.annotation;
					if (_v0.$ === 'Nothing') {
						var typename = A2($mdgriffith$elm_codegen$Internal$Index$protectTypeName, details.name, index);
						return $elm$core$Result$Ok(
							{
								aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
								inferences: $elm$core$Dict$empty,
								type_: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(typename)
							});
					} else {
						var ann = _v0.a;
						return $elm$core$Result$Ok(
							A2($mdgriffith$elm_codegen$Internal$Compiler$getInnerInference, index, ann));
					}
				}(),
				expression: A2(
					$stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue,
					details.importFrom,
					$mdgriffith$elm_codegen$Internal$Format$sanitize(details.name)),
				imports: function () {
					var _v1 = details.annotation;
					if (_v1.$ === 'Nothing') {
						var _v2 = details.importFrom;
						if (!_v2.b) {
							return _List_Nil;
						} else {
							return _List_fromArray(
								[details.importFrom]);
						}
					} else {
						var ann = _v1.a;
						var _v3 = details.importFrom;
						if (!_v3.b) {
							return $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(ann);
						} else {
							return A2(
								$elm$core$List$cons,
								details.importFrom,
								$mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(ann));
						}
					}
				}()
			};
		});
};
var $mdgriffith$elm_codegen$Elm$Annotation$var = function (a) {
	return $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
		{
			aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
			annotation: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(
				$mdgriffith$elm_codegen$Internal$Format$formatValue(a)),
			imports: _List_Nil
		});
};
var $author$project$Gen$Ui$alignRight = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Ui']),
				'Attribute',
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
					]))),
		importFrom: _List_fromArray(
			['Ui']),
		name: 'alignRight'
	});
var $mdgriffith$elm_codegen$Elm$Annotation$named = F2(
	function (mod, name) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
			{
				aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
				annotation: A2(
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(
						_Utils_Tuple2(
							mod,
							$mdgriffith$elm_codegen$Internal$Format$formatType(name))),
					_List_Nil),
				imports: function () {
					if (!mod.b) {
						return _List_Nil;
					} else {
						return _List_fromArray(
							[mod]);
					}
				}()
			});
	});
var $author$project$Interactive$appTypes = {
	model: A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Model'),
	msg: A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Msg')
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Application = function (a) {
	return {$: 'Application', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$FunctionAppliedToTooManyArgs = F2(
	function (a, b) {
		return {$: 'FunctionAppliedToTooManyArgs', a: a, b: b};
	});
var $mdgriffith$elm_codegen$Internal$Compiler$containsFieldByName = F2(
	function (_v0, _v2) {
		var _v1 = _v0.a;
		var oneName = _v1.b;
		var _v3 = _v2.a;
		var twoName = _v3.b;
		return _Utils_eq(oneName, twoName);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$mergeFieldLists = F2(
	function (fieldOne, fieldTwo) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_new, existing) {
					var newField = _new.b;
					return A2(
						$elm$core$List$any,
						A2(
							$elm$core$Basics$composeL,
							$mdgriffith$elm_codegen$Internal$Compiler$containsFieldByName(newField),
							$mdgriffith$elm_codegen$Internal$Compiler$denode),
						existing) ? existing : A2($elm$core$List$cons, _new, existing);
				}),
			fieldOne,
			fieldTwo);
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
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
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
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
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
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
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
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
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$addInference = F3(
	function (key, value, infs) {
		return A3(
			$elm$core$Dict$update,
			key,
			function (maybeValue) {
				if (maybeValue.$ === 'Nothing') {
					return $elm$core$Maybe$Just(value);
				} else {
					if (maybeValue.a.$ === 'GenericRecord') {
						var _v1 = maybeValue.a;
						var _v2 = _v1.a;
						var range = _v2.a;
						var recordName = _v2.b;
						var _v3 = _v1.b;
						var fieldRange = _v3.a;
						var fields = _v3.b;
						if (value.$ === 'GenericRecord') {
							var _v5 = value.a;
							var existingRange = _v5.a;
							var existingRecordName = _v5.b;
							var _v6 = value.b;
							var existingFieldRange = _v6.a;
							var existingFields = _v6.b;
							return $elm$core$Maybe$Just(
								A2(
									$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord,
									A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, range, recordName),
									A2(
										$stil4m$elm_syntax$Elm$Syntax$Node$Node,
										fieldRange,
										A2($mdgriffith$elm_codegen$Internal$Compiler$mergeFieldLists, fields, existingFields))));
						} else {
							return maybeValue;
						}
					} else {
						var existing = maybeValue.a;
						return $elm$core$Maybe$Just(existing);
					}
				}
			},
			infs);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$makeFunctionReversedHelper = F2(
	function (last, reversedArgs) {
		makeFunctionReversedHelper:
		while (true) {
			if (!reversedArgs.b) {
				return last;
			} else {
				if (!reversedArgs.b.b) {
					var penUlt = reversedArgs.a;
					return A2(
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
						A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, penUlt),
						A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, last));
				} else {
					var penUlt = reversedArgs.a;
					var remain = reversedArgs.b;
					var $temp$last = A2(
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
						A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, penUlt),
						A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, last)),
						$temp$reversedArgs = remain;
					last = $temp$last;
					reversedArgs = $temp$reversedArgs;
					continue makeFunctionReversedHelper;
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$makeFunction = F2(
	function (result, args) {
		return A2(
			$mdgriffith$elm_codegen$Internal$Compiler$makeFunctionReversedHelper,
			result,
			$elm$core$List$reverse(args));
	});
var $mdgriffith$elm_codegen$Internal$Compiler$MismatchedTypeVariables = {$: 'MismatchedTypeVariables'};
var $mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify = F2(
	function (a, b) {
		return {$: 'UnableToUnify', a: a, b: b};
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $mdgriffith$elm_codegen$Internal$Compiler$getAlias = F2(
	function (_v0, cache) {
		var _v1 = _v0.b;
		var modName = _v1.a;
		var name = _v1.b;
		return A2(
			$elm$core$Dict$get,
			A2($mdgriffith$elm_codegen$Internal$Compiler$formatAliasKey, modName, name),
			cache);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$CouldNotFindField = function (a) {
	return {$: 'CouldNotFindField', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$getField = F4(
	function (name, val, fields, captured) {
		getField:
		while (true) {
			if (!fields.b) {
				return $elm$core$Result$Err(
					$mdgriffith$elm_codegen$Internal$Compiler$CouldNotFindField(
						{
							existingFields: A2(
								$elm$core$List$map,
								A2(
									$elm$core$Basics$composeR,
									$mdgriffith$elm_codegen$Internal$Compiler$denode,
									A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $mdgriffith$elm_codegen$Internal$Compiler$denode)),
								captured),
							field: name
						}));
			} else {
				var top = fields.a;
				var remain = fields.b;
				var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$denode(top);
				var topFieldName = _v1.a;
				var topFieldVal = _v1.b;
				var topName = $mdgriffith$elm_codegen$Internal$Compiler$denode(topFieldName);
				var topVal = $mdgriffith$elm_codegen$Internal$Compiler$denode(topFieldVal);
				if (_Utils_eq(topName, name)) {
					return $elm$core$Result$Ok(
						_Utils_Tuple2(
							topVal,
							_Utils_ap(captured, remain)));
				} else {
					var $temp$name = name,
						$temp$val = val,
						$temp$fields = remain,
						$temp$captured = A2($elm$core$List$cons, top, captured);
					name = $temp$name;
					val = $temp$val;
					fields = $temp$fields;
					captured = $temp$captured;
					continue getField;
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$unifiable = F4(
	function (aliases, vars, one, two) {
		unifiable:
		while (true) {
			switch (one.$) {
				case 'GenericType':
					var varName = one.a;
					var _v21 = A2($elm$core$Dict$get, varName, vars);
					if (_v21.$ === 'Nothing') {
						if (two.$ === 'GenericType') {
							var varNameB = two.a;
							return _Utils_eq(varNameB, varName) ? _Utils_Tuple2(
								vars,
								$elm$core$Result$Ok(one)) : _Utils_Tuple2(
								A3($mdgriffith$elm_codegen$Internal$Compiler$addInference, varName, two, vars),
								$elm$core$Result$Ok(two));
						} else {
							return _Utils_Tuple2(
								A3($mdgriffith$elm_codegen$Internal$Compiler$addInference, varName, two, vars),
								$elm$core$Result$Ok(two));
						}
					} else {
						var found = _v21.a;
						if (two.$ === 'GenericType') {
							var varNameB = two.a;
							if (_Utils_eq(varNameB, varName)) {
								return _Utils_Tuple2(
									vars,
									$elm$core$Result$Ok(one));
							} else {
								var _v24 = A2($elm$core$Dict$get, varNameB, vars);
								if (_v24.$ === 'Nothing') {
									return _Utils_Tuple2(
										A3($mdgriffith$elm_codegen$Internal$Compiler$addInference, varNameB, found, vars),
										$elm$core$Result$Ok(two));
								} else {
									var foundTwo = _v24.a;
									var $temp$aliases = aliases,
										$temp$vars = vars,
										$temp$one = found,
										$temp$two = foundTwo;
									aliases = $temp$aliases;
									vars = $temp$vars;
									one = $temp$one;
									two = $temp$two;
									continue unifiable;
								}
							}
						} else {
							var $temp$aliases = aliases,
								$temp$vars = vars,
								$temp$one = found,
								$temp$two = two;
							aliases = $temp$aliases;
							vars = $temp$vars;
							one = $temp$one;
							two = $temp$two;
							continue unifiable;
						}
					}
				case 'Typed':
					var oneName = one.a;
					var oneVars = one.b;
					switch (two.$) {
						case 'Typed':
							var twoName = two.a;
							var twoContents = two.b;
							if (_Utils_eq(
								$mdgriffith$elm_codegen$Internal$Compiler$denode(oneName),
								$mdgriffith$elm_codegen$Internal$Compiler$denode(twoName))) {
								var _v26 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifiableLists, aliases, vars, oneVars, twoContents, _List_Nil);
								if (_v26.b.$ === 'Ok') {
									var newVars = _v26.a;
									var unifiedContent = _v26.b.a;
									return _Utils_Tuple2(
										newVars,
										$elm$core$Result$Ok(
											A2($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed, twoName, unifiedContent)));
								} else {
									var newVars = _v26.a;
									var err = _v26.b.a;
									return _Utils_Tuple2(
										newVars,
										$elm$core$Result$Err(err));
								}
							} else {
								return _Utils_Tuple2(
									vars,
									$elm$core$Result$Err(
										A2($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify, one, two)));
							}
						case 'GenericType':
							var b = two.a;
							return _Utils_Tuple2(
								A3($mdgriffith$elm_codegen$Internal$Compiler$addInference, b, one, vars),
								$elm$core$Result$Ok(one));
						default:
							var _v27 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifyWithAlias, aliases, vars, oneName, oneVars, two);
							if (_v27.$ === 'Nothing') {
								return _Utils_Tuple2(
									vars,
									$elm$core$Result$Err(
										A2($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify, one, two)));
							} else {
								var unified = _v27.a;
								return unified;
							}
					}
				case 'Unit':
					switch (two.$) {
						case 'GenericType':
							var b = two.a;
							var _v29 = A2($elm$core$Dict$get, b, vars);
							if (_v29.$ === 'Nothing') {
								return _Utils_Tuple2(
									A3($mdgriffith$elm_codegen$Internal$Compiler$addInference, b, one, vars),
									$elm$core$Result$Ok(one));
							} else {
								var foundTwo = _v29.a;
								var $temp$aliases = aliases,
									$temp$vars = vars,
									$temp$one = one,
									$temp$two = foundTwo;
								aliases = $temp$aliases;
								vars = $temp$vars;
								one = $temp$one;
								two = $temp$two;
								continue unifiable;
							}
						case 'Unit':
							return _Utils_Tuple2(
								vars,
								$elm$core$Result$Ok($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit));
						default:
							return _Utils_Tuple2(
								vars,
								$elm$core$Result$Err(
									A2($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify, one, two)));
					}
				case 'Tupled':
					var valsA = one.a;
					switch (two.$) {
						case 'GenericType':
							var b = two.a;
							var _v31 = A2($elm$core$Dict$get, b, vars);
							if (_v31.$ === 'Nothing') {
								return _Utils_Tuple2(
									A3($mdgriffith$elm_codegen$Internal$Compiler$addInference, b, one, vars),
									$elm$core$Result$Ok(one));
							} else {
								var foundTwo = _v31.a;
								var $temp$aliases = aliases,
									$temp$vars = vars,
									$temp$one = one,
									$temp$two = foundTwo;
								aliases = $temp$aliases;
								vars = $temp$vars;
								one = $temp$one;
								two = $temp$two;
								continue unifiable;
							}
						case 'Tupled':
							var valsB = two.a;
							var _v32 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifiableLists, aliases, vars, valsA, valsB, _List_Nil);
							if (_v32.b.$ === 'Ok') {
								var newVars = _v32.a;
								var unified = _v32.b.a;
								return _Utils_Tuple2(
									newVars,
									$elm$core$Result$Ok(
										$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(unified)));
							} else {
								var newVars = _v32.a;
								var err = _v32.b.a;
								return _Utils_Tuple2(
									newVars,
									$elm$core$Result$Err(err));
							}
						default:
							return _Utils_Tuple2(
								vars,
								$elm$core$Result$Err(
									A2($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify, one, two)));
					}
				case 'Record':
					var fieldsA = one.a;
					switch (two.$) {
						case 'GenericType':
							var b = two.a;
							var _v34 = A2($elm$core$Dict$get, b, vars);
							if (_v34.$ === 'Nothing') {
								return _Utils_Tuple2(
									A3($mdgriffith$elm_codegen$Internal$Compiler$addInference, b, one, vars),
									$elm$core$Result$Ok(one));
							} else {
								var foundTwo = _v34.a;
								var $temp$aliases = aliases,
									$temp$vars = vars,
									$temp$one = one,
									$temp$two = foundTwo;
								aliases = $temp$aliases;
								vars = $temp$vars;
								one = $temp$one;
								two = $temp$two;
								continue unifiable;
							}
						case 'GenericRecord':
							var _v35 = two.a;
							var twoRecName = _v35.b;
							var _v36 = two.b;
							var fieldsB = _v36.b;
							var _v37 = A2($elm$core$Dict$get, twoRecName, vars);
							if (_v37.$ === 'Nothing') {
								var _v38 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifiableFields, aliases, vars, fieldsA, fieldsB, _List_Nil);
								if (_v38.b.$ === 'Ok') {
									var newVars = _v38.a;
									var unifiedFields = _v38.b.a;
									return _Utils_Tuple2(
										newVars,
										$elm$core$Result$Ok(
											$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
								} else {
									var newVars = _v38.a;
									var err = _v38.b.a;
									return _Utils_Tuple2(
										newVars,
										$elm$core$Result$Err(err));
								}
							} else {
								var knownType = _v37.a;
								var _v39 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifiableFields, aliases, vars, fieldsA, fieldsB, _List_Nil);
								if (_v39.b.$ === 'Ok') {
									var newVars = _v39.a;
									var unifiedFields = _v39.b.a;
									return _Utils_Tuple2(
										newVars,
										$elm$core$Result$Ok(
											$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
								} else {
									var newVars = _v39.a;
									var err = _v39.b.a;
									return _Utils_Tuple2(
										newVars,
										$elm$core$Result$Err(err));
								}
							}
						case 'Record':
							var fieldsB = two.a;
							var _v40 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifiableFields, aliases, vars, fieldsA, fieldsB, _List_Nil);
							if (_v40.b.$ === 'Ok') {
								var newVars = _v40.a;
								var unifiedFields = _v40.b.a;
								return _Utils_Tuple2(
									newVars,
									$elm$core$Result$Ok(
										$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
							} else {
								var newVars = _v40.a;
								var err = _v40.b.a;
								return _Utils_Tuple2(
									newVars,
									$elm$core$Result$Err(err));
							}
						case 'Typed':
							var twoName = two.a;
							var twoVars = two.b;
							var _v41 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifyWithAlias, aliases, vars, twoName, twoVars, one);
							if (_v41.$ === 'Nothing') {
								return _Utils_Tuple2(
									vars,
									$elm$core$Result$Err(
										A2($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify, one, two)));
							} else {
								var unified = _v41.a;
								return unified;
							}
						default:
							return _Utils_Tuple2(
								vars,
								$elm$core$Result$Err(
									A2($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify, one, two)));
					}
				case 'GenericRecord':
					var _v42 = one.a;
					var reVarName = _v42.b;
					var _v43 = one.b;
					var fieldsARange = _v43.a;
					var fieldsA = _v43.b;
					switch (two.$) {
						case 'GenericType':
							var b = two.a;
							var _v45 = A2($elm$core$Dict$get, b, vars);
							if (_v45.$ === 'Nothing') {
								return _Utils_Tuple2(
									A3($mdgriffith$elm_codegen$Internal$Compiler$addInference, b, one, vars),
									$elm$core$Result$Ok(one));
							} else {
								var foundTwo = _v45.a;
								var $temp$aliases = aliases,
									$temp$vars = vars,
									$temp$one = one,
									$temp$two = foundTwo;
								aliases = $temp$aliases;
								vars = $temp$vars;
								one = $temp$one;
								two = $temp$two;
								continue unifiable;
							}
						case 'GenericRecord':
							var _v46 = two.a;
							var twoRecName = _v46.b;
							var _v47 = two.b;
							var fieldsB = _v47.b;
							var _v48 = A2($elm$core$Dict$get, twoRecName, vars);
							if (_v48.$ === 'Nothing') {
								var _v49 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifiableFields, aliases, vars, fieldsA, fieldsB, _List_Nil);
								if (_v49.b.$ === 'Ok') {
									var newVars = _v49.a;
									var unifiedFields = _v49.b.a;
									return _Utils_Tuple2(
										newVars,
										$elm$core$Result$Ok(
											$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
								} else {
									var newVars = _v49.a;
									var err = _v49.b.a;
									return _Utils_Tuple2(
										newVars,
										$elm$core$Result$Err(err));
								}
							} else {
								var knownType = _v48.a;
								var _v50 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifiableFields, aliases, vars, fieldsA, fieldsB, _List_Nil);
								if (_v50.b.$ === 'Ok') {
									var newVars = _v50.a;
									var unifiedFields = _v50.b.a;
									return _Utils_Tuple2(
										newVars,
										$elm$core$Result$Ok(
											$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
								} else {
									var newVars = _v50.a;
									var err = _v50.b.a;
									return _Utils_Tuple2(
										newVars,
										$elm$core$Result$Err(err));
								}
							}
						case 'Record':
							var fieldsB = two.a;
							var _v51 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifiableFields, aliases, vars, fieldsA, fieldsB, _List_Nil);
							if (_v51.b.$ === 'Ok') {
								var newVars = _v51.a;
								var unifiedFields = _v51.b.a;
								return _Utils_Tuple2(
									newVars,
									$elm$core$Result$Ok(
										$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(unifiedFields)));
							} else {
								var newVars = _v51.a;
								var err = _v51.b.a;
								return _Utils_Tuple2(
									newVars,
									$elm$core$Result$Err(err));
							}
						case 'Typed':
							var twoName = two.a;
							var twoVars = two.b;
							var _v52 = A5($mdgriffith$elm_codegen$Internal$Compiler$unifyWithAlias, aliases, vars, twoName, twoVars, one);
							if (_v52.$ === 'Nothing') {
								return _Utils_Tuple2(
									vars,
									$elm$core$Result$Err(
										A2($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify, one, two)));
							} else {
								var unified = _v52.a;
								return unified;
							}
						default:
							return _Utils_Tuple2(
								vars,
								$elm$core$Result$Err(
									A2($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify, one, two)));
					}
				default:
					var oneA = one.a;
					var oneB = one.b;
					switch (two.$) {
						case 'GenericType':
							var b = two.a;
							var _v54 = A2($elm$core$Dict$get, b, vars);
							if (_v54.$ === 'Nothing') {
								return _Utils_Tuple2(
									A3($mdgriffith$elm_codegen$Internal$Compiler$addInference, b, one, vars),
									$elm$core$Result$Ok(one));
							} else {
								var foundTwo = _v54.a;
								var $temp$aliases = aliases,
									$temp$vars = vars,
									$temp$one = one,
									$temp$two = foundTwo;
								aliases = $temp$aliases;
								vars = $temp$vars;
								one = $temp$one;
								two = $temp$two;
								continue unifiable;
							}
						case 'FunctionTypeAnnotation':
							var twoA = two.a;
							var twoB = two.b;
							var _v55 = A4(
								$mdgriffith$elm_codegen$Internal$Compiler$unifiable,
								aliases,
								vars,
								$mdgriffith$elm_codegen$Internal$Compiler$denode(oneA),
								$mdgriffith$elm_codegen$Internal$Compiler$denode(twoA));
							if (_v55.b.$ === 'Ok') {
								var aVars = _v55.a;
								var unifiedA = _v55.b.a;
								var _v56 = A4(
									$mdgriffith$elm_codegen$Internal$Compiler$unifiable,
									aliases,
									aVars,
									$mdgriffith$elm_codegen$Internal$Compiler$denode(oneB),
									$mdgriffith$elm_codegen$Internal$Compiler$denode(twoB));
								if (_v56.b.$ === 'Ok') {
									var bVars = _v56.a;
									var unifiedB = _v56.b.a;
									return _Utils_Tuple2(
										bVars,
										$elm$core$Result$Ok(
											A2(
												$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(unifiedA),
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(unifiedB))));
								} else {
									var otherwise = _v56;
									return otherwise;
								}
							} else {
								var otherwise = _v55;
								return otherwise;
							}
						default:
							return _Utils_Tuple2(
								vars,
								$elm$core$Result$Err(
									A2($mdgriffith$elm_codegen$Internal$Compiler$UnableToUnify, one, two)));
					}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$unifiableFields = F5(
	function (aliases, vars, one, two, unified) {
		unifiableFields:
		while (true) {
			var _v13 = _Utils_Tuple2(one, two);
			if (!_v13.a.b) {
				if (!_v13.b.b) {
					return _Utils_Tuple2(
						vars,
						$elm$core$Result$Ok(
							$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
								$elm$core$List$reverse(unified))));
				} else {
					return _Utils_Tuple2(
						vars,
						$elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$MismatchedTypeVariables));
				}
			} else {
				var _v14 = _v13.a;
				var oneX = _v14.a;
				var oneRemain = _v14.b;
				var twoFields = _v13.b;
				var _v15 = $mdgriffith$elm_codegen$Internal$Compiler$denode(oneX);
				var oneFieldName = _v15.a;
				var oneFieldVal = _v15.b;
				var oneName = $mdgriffith$elm_codegen$Internal$Compiler$denode(oneFieldName);
				var oneVal = $mdgriffith$elm_codegen$Internal$Compiler$denode(oneFieldVal);
				var _v16 = A4($mdgriffith$elm_codegen$Internal$Compiler$getField, oneName, oneVal, twoFields, _List_Nil);
				if (_v16.$ === 'Ok') {
					var _v17 = _v16.a;
					var matchingFieldVal = _v17.a;
					var remainingTwo = _v17.b;
					var _v18 = A4($mdgriffith$elm_codegen$Internal$Compiler$unifiable, aliases, vars, oneVal, matchingFieldVal);
					var newVars = _v18.a;
					var unifiedFieldResult = _v18.b;
					if (unifiedFieldResult.$ === 'Ok') {
						var unifiedField = unifiedFieldResult.a;
						var $temp$aliases = aliases,
							$temp$vars = newVars,
							$temp$one = oneRemain,
							$temp$two = remainingTwo,
							$temp$unified = A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(oneName),
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(unifiedField)),
							unified);
						aliases = $temp$aliases;
						vars = $temp$vars;
						one = $temp$one;
						two = $temp$two;
						unified = $temp$unified;
						continue unifiableFields;
					} else {
						var err = unifiedFieldResult.a;
						return _Utils_Tuple2(
							newVars,
							$elm$core$Result$Err(err));
					}
				} else {
					var notFound = _v16.a;
					return _Utils_Tuple2(
						vars,
						$elm$core$Result$Err(notFound));
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$unifiableLists = F5(
	function (aliases, vars, one, two, unified) {
		unifiableLists:
		while (true) {
			var _v6 = _Utils_Tuple2(one, two);
			_v6$3:
			while (true) {
				if (!_v6.a.b) {
					if (!_v6.b.b) {
						return _Utils_Tuple2(
							vars,
							$elm$core$Result$Ok(
								$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
									$elm$core$List$reverse(unified))));
					} else {
						break _v6$3;
					}
				} else {
					if (_v6.b.b) {
						if ((!_v6.a.b.b) && (!_v6.b.b.b)) {
							var _v7 = _v6.a;
							var oneX = _v7.a;
							var _v8 = _v6.b;
							var twoX = _v8.a;
							var _v9 = A4(
								$mdgriffith$elm_codegen$Internal$Compiler$unifiable,
								aliases,
								vars,
								$mdgriffith$elm_codegen$Internal$Compiler$denode(oneX),
								$mdgriffith$elm_codegen$Internal$Compiler$denode(twoX));
							if (_v9.b.$ === 'Ok') {
								var newVars = _v9.a;
								var un = _v9.b.a;
								return _Utils_Tuple2(
									newVars,
									$elm$core$Result$Ok(
										$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
											$elm$core$List$reverse(
												A2($elm$core$List$cons, un, unified)))));
							} else {
								var newVars = _v9.a;
								var err = _v9.b.a;
								return _Utils_Tuple2(
									newVars,
									$elm$core$Result$Err(err));
							}
						} else {
							var _v10 = _v6.a;
							var oneX = _v10.a;
							var oneRemain = _v10.b;
							var _v11 = _v6.b;
							var twoX = _v11.a;
							var twoRemain = _v11.b;
							var _v12 = A4(
								$mdgriffith$elm_codegen$Internal$Compiler$unifiable,
								aliases,
								vars,
								$mdgriffith$elm_codegen$Internal$Compiler$denode(oneX),
								$mdgriffith$elm_codegen$Internal$Compiler$denode(twoX));
							if (_v12.b.$ === 'Ok') {
								var newVars = _v12.a;
								var un = _v12.b.a;
								var $temp$aliases = aliases,
									$temp$vars = newVars,
									$temp$one = oneRemain,
									$temp$two = twoRemain,
									$temp$unified = A2($elm$core$List$cons, un, unified);
								aliases = $temp$aliases;
								vars = $temp$vars;
								one = $temp$one;
								two = $temp$two;
								unified = $temp$unified;
								continue unifiableLists;
							} else {
								var newVars = _v12.a;
								var err = _v12.b.a;
								return _Utils_Tuple2(
									vars,
									$elm$core$Result$Err(err));
							}
						}
					} else {
						break _v6$3;
					}
				}
			}
			return _Utils_Tuple2(
				vars,
				$elm$core$Result$Err($mdgriffith$elm_codegen$Internal$Compiler$MismatchedTypeVariables));
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$unifyWithAlias = F5(
	function (aliases, vars, typename, typeVars, typeToUnifyWith) {
		var _v0 = A2($mdgriffith$elm_codegen$Internal$Compiler$getAlias, typename, aliases);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var foundAlias = _v0.a;
			var fullAliasedType = function () {
				var _v3 = foundAlias.variables;
				if (!_v3.b) {
					return foundAlias.target;
				} else {
					var makeAliasVarCache = F2(
						function (varName, _v5) {
							var varType = _v5.b;
							return _Utils_Tuple2(varName, varType);
						});
					var _v4 = A3(
						$mdgriffith$elm_codegen$Internal$Compiler$resolveVariables,
						$elm$core$Set$empty,
						$elm$core$Dict$fromList(
							A3($elm$core$List$map2, makeAliasVarCache, foundAlias.variables, typeVars)),
						foundAlias.target);
					if (_v4.$ === 'Ok') {
						var resolvedType = _v4.a;
						return resolvedType;
					} else {
						return foundAlias.target;
					}
				}
			}();
			var _v1 = A4($mdgriffith$elm_codegen$Internal$Compiler$unifiable, aliases, vars, fullAliasedType, typeToUnifyWith);
			var returnedVars = _v1.a;
			var unifiedResult = _v1.b;
			if (unifiedResult.$ === 'Ok') {
				var finalInference = unifiedResult.a;
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						returnedVars,
						$elm$core$Result$Ok(fullAliasedType)));
			} else {
				var err = unifiedResult.a;
				return $elm$core$Maybe$Nothing;
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$applyTypeHelper = F4(
	function (aliases, cache, fn, args) {
		applyTypeHelper:
		while (true) {
			switch (fn.$) {
				case 'FunctionTypeAnnotation':
					var one = fn.a;
					var two = fn.b;
					if (!args.b) {
						return $elm$core$Result$Ok(
							{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: cache, type_: fn});
					} else {
						var top = args.a;
						var rest = args.b;
						var _v2 = A4(
							$mdgriffith$elm_codegen$Internal$Compiler$unifiable,
							aliases,
							cache,
							$mdgriffith$elm_codegen$Internal$Compiler$denode(one),
							top);
						if (_v2.b.$ === 'Ok') {
							var variableCache = _v2.a;
							var $temp$aliases = aliases,
								$temp$cache = variableCache,
								$temp$fn = $mdgriffith$elm_codegen$Internal$Compiler$denode(two),
								$temp$args = rest;
							aliases = $temp$aliases;
							cache = $temp$cache;
							fn = $temp$fn;
							args = $temp$args;
							continue applyTypeHelper;
						} else {
							var varCache = _v2.a;
							var err = _v2.b.a;
							return $elm$core$Result$Err(
								_List_fromArray(
									[err]));
						}
					}
				case 'GenericType':
					var varName = fn.a;
					if (!args.b) {
						return $elm$core$Result$Ok(
							{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: cache, type_: fn});
					} else {
						var resultType = $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(varName + '_result');
						return $elm$core$Result$Ok(
							{
								aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
								inferences: A3(
									$mdgriffith$elm_codegen$Internal$Compiler$addInference,
									varName,
									A2($mdgriffith$elm_codegen$Internal$Compiler$makeFunction, resultType, args),
									cache),
								type_: resultType
							});
					}
				default:
					var _final = fn;
					if (!args.b) {
						return $elm$core$Result$Ok(
							{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: cache, type_: fn});
					} else {
						return $elm$core$Result$Err(
							_List_fromArray(
								[
									A2($mdgriffith$elm_codegen$Internal$Compiler$FunctionAppliedToTooManyArgs, _final, args)
								]));
					}
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$mergeInferences = F2(
	function (one, two) {
		return A6(
			$elm$core$Dict$merge,
			$elm$core$Dict$insert,
			F4(
				function (key, oneVal, twoVal, d) {
					if (oneVal.$ === 'GenericRecord') {
						var recordName = oneVal.a;
						var _v1 = oneVal.b;
						var oneRange = _v1.a;
						var recordDefinition = _v1.b;
						if (twoVal.$ === 'GenericRecord') {
							var twoRecordName = twoVal.a;
							var _v3 = twoVal.b;
							var twoRange = _v3.a;
							var twoRecordDefinition = _v3.b;
							return A3(
								$elm$core$Dict$insert,
								key,
								A2(
									$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord,
									recordName,
									A2(
										$stil4m$elm_syntax$Elm$Syntax$Node$Node,
										oneRange,
										_Utils_ap(recordDefinition, twoRecordDefinition))),
								d);
						} else {
							return A3($elm$core$Dict$insert, key, oneVal, d);
						}
					} else {
						return A3($elm$core$Dict$insert, key, oneVal, d);
					}
				}),
			$elm$core$Dict$insert,
			one,
			two,
			$elm$core$Dict$empty);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$mergeArgInferences = F3(
	function (expressions, annotations, inferences) {
		mergeArgInferences:
		while (true) {
			if (!expressions.b) {
				return $elm$core$Result$Ok(
					{
						inferences: inferences,
						types: $elm$core$List$reverse(annotations)
					});
			} else {
				var top = expressions.a;
				var remain = expressions.b;
				var _v1 = top.annotation;
				if (_v1.$ === 'Ok') {
					var ann = _v1.a;
					var $temp$expressions = remain,
						$temp$annotations = A2($elm$core$List$cons, ann.type_, annotations),
						$temp$inferences = A2($mdgriffith$elm_codegen$Internal$Compiler$mergeInferences, inferences, ann.inferences);
					expressions = $temp$expressions;
					annotations = $temp$annotations;
					inferences = $temp$inferences;
					continue mergeArgInferences;
				} else {
					var err = _v1.a;
					return $elm$core$Result$Err(err);
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$applyType = F3(
	function (index, annotation, args) {
		if (annotation.$ === 'Err') {
			var err = annotation.a;
			return $elm$core$Result$Err(err);
		} else {
			var fnAnnotation = annotation.a;
			if ($mdgriffith$elm_codegen$Internal$Index$typecheck(index)) {
				var _v1 = A3($mdgriffith$elm_codegen$Internal$Compiler$mergeArgInferences, args, _List_Nil, fnAnnotation.inferences);
				if (_v1.$ === 'Ok') {
					var mergedArgs = _v1.a;
					return A4($mdgriffith$elm_codegen$Internal$Compiler$applyTypeHelper, fnAnnotation.aliases, mergedArgs.inferences, fnAnnotation.type_, mergedArgs.types);
				} else {
					var err = _v1.a;
					return $elm$core$Result$Err(err);
				}
			} else {
				return $elm$core$Result$Err(_List_Nil);
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Index$dive = function (_v0) {
	var top = _v0.a;
	var tail = _v0.b;
	var scope = _v0.c;
	var check = _v0.d;
	return A4(
		$mdgriffith$elm_codegen$Internal$Index$Index,
		0,
		A2($elm$core$List$cons, top, tail),
		scope,
		check);
};
var $mdgriffith$elm_codegen$Internal$Compiler$expression = function (toExp) {
	return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
		function (index) {
			return toExp(
				$mdgriffith$elm_codegen$Internal$Index$dive(index));
		});
};
var $mdgriffith$elm_codegen$Internal$Compiler$getImports = function (exp) {
	return exp.imports;
};
var $mdgriffith$elm_codegen$Internal$Compiler$parens = function (expr) {
	switch (expr.$) {
		case 'UnitExpr':
			return expr;
		case 'Integer':
			var i = expr.a;
			return expr;
		case 'Literal':
			return expr;
		case 'Hex':
			return expr;
		case 'Floatable':
			return expr;
		case 'TupledExpression':
			return expr;
		case 'ParenthesizedExpression':
			return expr;
		case 'CharLiteral':
			return expr;
		case 'ListExpr':
			return expr;
		case 'FunctionOrValue':
			return expr;
		case 'RecordAccessFunction':
			return expr;
		case 'RecordUpdateExpression':
			return expr;
		case 'RecordExpr':
			return expr;
		case 'LambdaExpression':
			return expr;
		default:
			return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
				$mdgriffith$elm_codegen$Internal$Compiler$nodify(expr));
	}
};
var $mdgriffith$elm_codegen$Internal$Index$next = function (_v0) {
	var top = _v0.a;
	var tail = _v0.b;
	var scope = _v0.c;
	var check = _v0.d;
	return A4($mdgriffith$elm_codegen$Internal$Index$Index, top + 1, tail, scope, check);
};
var $mdgriffith$elm_codegen$Internal$Compiler$threadHelper = F3(
	function (index, exps, rendered) {
		threadHelper:
		while (true) {
			if (!exps.b) {
				return $elm$core$List$reverse(rendered);
			} else {
				var toExpDetails = exps.a.a;
				var remain = exps.b;
				var $temp$index = $mdgriffith$elm_codegen$Internal$Index$next(index),
					$temp$exps = remain,
					$temp$rendered = A2(
					$elm$core$List$cons,
					toExpDetails(index),
					rendered);
				index = $temp$index;
				exps = $temp$exps;
				rendered = $temp$rendered;
				continue threadHelper;
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$thread = F2(
	function (index, exps) {
		return A3($mdgriffith$elm_codegen$Internal$Compiler$threadHelper, index, exps, _List_Nil);
	});
var $mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails = F2(
	function (index, _v0) {
		var toExp = _v0.a;
		return _Utils_Tuple2(
			$mdgriffith$elm_codegen$Internal$Index$next(index),
			toExp(index));
	});
var $mdgriffith$elm_codegen$Elm$apply = F2(
	function (fnExp, argExpressions) {
		return $mdgriffith$elm_codegen$Internal$Compiler$expression(
			function (index) {
				var _v0 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, index, fnExp);
				var annotationIndex = _v0.a;
				var fnDetails = _v0.b;
				var args = A2($mdgriffith$elm_codegen$Internal$Compiler$thread, annotationIndex, argExpressions);
				return {
					annotation: A3($mdgriffith$elm_codegen$Internal$Compiler$applyType, index, fnDetails.annotation, args),
					expression: $stil4m$elm_syntax$Elm$Syntax$Expression$Application(
						$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
							A2(
								$elm$core$List$cons,
								fnDetails.expression,
								A2(
									$elm$core$List$map,
									A2(
										$elm$core$Basics$composeL,
										$mdgriffith$elm_codegen$Internal$Compiler$parens,
										function ($) {
											return $.expression;
										}),
									args)))),
					imports: _Utils_ap(
						fnDetails.imports,
						A2($elm$core$List$concatMap, $mdgriffith$elm_codegen$Internal$Compiler$getImports, args))
				};
			});
	});
var $mdgriffith$elm_codegen$Elm$Annotation$function = F2(
	function (anns, _return) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
			{
				aliases: A3(
					$elm$core$List$foldl,
					F2(
						function (ann, aliases) {
							return A2(
								$mdgriffith$elm_codegen$Internal$Compiler$mergeAliases,
								$mdgriffith$elm_codegen$Elm$Annotation$getAliases(ann),
								aliases);
						}),
					$mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
					A2($elm$core$List$cons, _return, anns)),
				annotation: A3(
					$elm$core$List$foldr,
					F2(
						function (ann, fn) {
							return A2(
								$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(ann),
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(fn));
						}),
					$mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(_return),
					A2($elm$core$List$map, $mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation, anns)),
				imports: _Utils_ap(
					$mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(_return),
					A2($elm$core$List$concatMap, $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, anns))
			});
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$Integer = function (a) {
	return {$: 'Integer', a: a};
};
var $mdgriffith$elm_codegen$Internal$Types$nodify = function (exp) {
	return A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, exp);
};
var $mdgriffith$elm_codegen$Internal$Types$int = A2(
	$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
	$mdgriffith$elm_codegen$Internal$Types$nodify(
		_Utils_Tuple2(_List_Nil, 'Int')),
	_List_Nil);
var $mdgriffith$elm_codegen$Elm$int = function (intVal) {
	return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
		function (_v0) {
			return {
				annotation: $elm$core$Result$Ok(
					{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: $elm$core$Dict$empty, type_: $mdgriffith$elm_codegen$Internal$Types$int}),
				expression: $stil4m$elm_syntax$Elm$Syntax$Expression$Integer(intVal),
				imports: _List_Nil
			};
		});
};
var $mdgriffith$elm_codegen$Elm$Annotation$typed = F3(
	function (mod, name, args) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
			{
				aliases: A3(
					$elm$core$List$foldl,
					F2(
						function (ann, aliases) {
							return A2(
								$mdgriffith$elm_codegen$Internal$Compiler$mergeAliases,
								$mdgriffith$elm_codegen$Elm$Annotation$getAliases(ann),
								aliases);
						}),
					$mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
					args),
				annotation: A2(
					$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(
						_Utils_Tuple2(mod, name)),
					$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
						A2($elm$core$List$map, $mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation, args))),
				imports: A2($elm$core$List$concatMap, $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports, args)
			});
	});
var $mdgriffith$elm_codegen$Elm$Annotation$int = A3($mdgriffith$elm_codegen$Elm$Annotation$typed, _List_Nil, 'Int', _List_Nil);
var $author$project$Gen$Ui$border = function (borderArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[$mdgriffith$elm_codegen$Elm$Annotation$int]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'border'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$int(borderArg)
			]));
};
var $author$project$Gen$Ui$borderColor = function (borderColorArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Color',
								_List_Nil)
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'borderColor'
			}),
		_List_fromArray(
			[borderColorArg]));
};
var $mdgriffith$elm_codegen$Internal$Branch$Branch = function (a) {
	return {$: 'Branch', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern = F2(
	function (a, b) {
		return {$: 'NamedPattern', a: a, b: b};
	});
var $mdgriffith$elm_codegen$Elm$Case$branch0 = F2(
	function (name, exp) {
		return $mdgriffith$elm_codegen$Internal$Branch$Branch(
			function (index) {
				return _Utils_Tuple3(
					index,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
						{
							moduleName: _List_Nil,
							name: $mdgriffith$elm_codegen$Internal$Format$formatType(name)
						},
						_List_Nil),
					exp);
			});
	});
var $stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern = function (a) {
	return {$: 'VarPattern', a: a};
};
var $mdgriffith$elm_codegen$Internal$Index$getName = F2(
	function (desiredName, index) {
		var top = index.a;
		var tail = index.b;
		var scope = index.c;
		var check = index.d;
		var formattedName = $mdgriffith$elm_codegen$Internal$Format$formatValue(desiredName);
		if (!A2($elm$core$Set$member, formattedName, scope)) {
			return _Utils_Tuple2(
				formattedName,
				A4(
					$mdgriffith$elm_codegen$Internal$Index$Index,
					top,
					tail,
					A2($elm$core$Set$insert, formattedName, scope),
					check));
		} else {
			var protectedName = _Utils_ap(
				formattedName,
				$elm$core$String$fromInt(top));
			if (!A2($elm$core$Set$member, protectedName, scope)) {
				return _Utils_Tuple2(
					protectedName,
					A4(
						$mdgriffith$elm_codegen$Internal$Index$Index,
						top + 1,
						tail,
						A2($elm$core$Set$insert, protectedName, scope),
						check));
			} else {
				var protectedNameLevel2 = _Utils_ap(
					formattedName,
					$mdgriffith$elm_codegen$Internal$Index$indexToString(index));
				return _Utils_Tuple2(
					protectedNameLevel2,
					A4(
						$mdgriffith$elm_codegen$Internal$Index$Index,
						top + 1,
						tail,
						A2($elm$core$Set$insert, protectedNameLevel2, scope),
						check));
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$toVarWithType = F3(
	function (index, desiredName, _v0) {
		var ann = _v0.a;
		var _v1 = A2($mdgriffith$elm_codegen$Internal$Index$getName, desiredName, index);
		var name = _v1.a;
		var newIndex = _v1.b;
		return {
			exp: $mdgriffith$elm_codegen$Internal$Compiler$Expression(
				function (ignoredIndex_) {
					return {
						annotation: $elm$core$Result$Ok(
							{aliases: ann.aliases, inferences: $elm$core$Dict$empty, type_: ann.annotation}),
						expression: A2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue, _List_Nil, name),
						imports: ann.imports
					};
				}),
			index: newIndex,
			name: name
		};
	});
var $mdgriffith$elm_codegen$Elm$Case$branch1 = F3(
	function (name, _v0, toExp) {
		var argName = _v0.a;
		var argType = _v0.b;
		return $mdgriffith$elm_codegen$Internal$Branch$Branch(
			function (index) {
				var _var = A3($mdgriffith$elm_codegen$Internal$Compiler$toVarWithType, index, argName, argType);
				return _Utils_Tuple3(
					_var.index,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
						{
							moduleName: _List_Nil,
							name: $mdgriffith$elm_codegen$Internal$Format$formatType(name)
						},
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(
								$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(_var.name))
							])),
					toExp(_var.exp));
			});
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$CaseExpression = function (a) {
	return {$: 'CaseExpression', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$EmptyCaseStatement = {$: 'EmptyCaseStatement'};
var $mdgriffith$elm_codegen$Elm$Case$combineInferences = F2(
	function (infs, infResult) {
		if (infResult.$ === 'Ok') {
			var inferred = infResult.a;
			return $elm$core$Result$Ok(
				_Utils_update(
					inferred,
					{
						inferences: A2($mdgriffith$elm_codegen$Internal$Compiler$mergeInferences, infs, inferred.inferences)
					}));
		} else {
			var err = infResult.a;
			return $elm$core$Result$Err(err);
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$unifyOn = F2(
	function (_v0, res) {
		var annDetails = _v0.a;
		if (res.$ === 'Err') {
			return res;
		} else {
			var inf = res.a;
			var _v2 = A4($mdgriffith$elm_codegen$Internal$Compiler$unifiable, inf.aliases, inf.inferences, annDetails.annotation, inf.type_);
			var newInferences = _v2.a;
			var finalResult = _v2.b;
			if (finalResult.$ === 'Ok') {
				var finalType = finalResult.a;
				return $elm$core$Result$Ok(
					{
						aliases: A2($mdgriffith$elm_codegen$Internal$Compiler$mergeAliases, annDetails.aliases, inf.aliases),
						inferences: newInferences,
						type_: finalType
					});
			} else {
				var err = finalResult.a;
				return $elm$core$Result$Err(
					_List_fromArray(
						[err]));
			}
		}
	});
var $mdgriffith$elm_codegen$Elm$Case$captureCaseHelper = F3(
	function (mainCaseExpressionModule, _v0, accum) {
		var toBranch = _v0.a;
		var _v1 = toBranch(
			$mdgriffith$elm_codegen$Internal$Index$dive(accum.index));
		var branchIndex = _v1.a;
		var originalPattern = _v1.b;
		var caseExpression = _v1.c;
		var _v2 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, branchIndex, caseExpression);
		var newIndex = _v2.a;
		var exp = _v2.b;
		var pattern = function () {
			if (!mainCaseExpressionModule.b) {
				return originalPattern;
			} else {
				if (originalPattern.$ === 'NamedPattern') {
					var named = originalPattern.a;
					var vars = originalPattern.b;
					return A2(
						$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
						{moduleName: mainCaseExpressionModule, name: named.name},
						vars);
				} else {
					return originalPattern;
				}
			}
		}();
		return {
			annotation: function () {
				var _v3 = accum.annotation;
				if (_v3.$ === 'Nothing') {
					return $elm$core$Maybe$Just(exp.annotation);
				} else {
					if (_v3.a.$ === 'Ok') {
						var gatheredAnnotation = _v3.a.a;
						return $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Internal$Compiler$unifyOn,
								$mdgriffith$elm_codegen$Internal$Compiler$Annotation(
									{aliases: gatheredAnnotation.aliases, annotation: gatheredAnnotation.type_, imports: _List_Nil}),
								A2($mdgriffith$elm_codegen$Elm$Case$combineInferences, gatheredAnnotation.inferences, exp.annotation)));
					} else {
						var err = _v3.a;
						return $elm$core$Maybe$Just(err);
					}
				}
			}(),
			cases: A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(pattern),
					$mdgriffith$elm_codegen$Internal$Compiler$nodify(exp.expression)),
				accum.cases),
			imports: _Utils_ap(accum.imports, exp.imports),
			index: accum.index
		};
	});
var $mdgriffith$elm_codegen$Internal$Compiler$importInferences = F2(
	function (one, two) {
		return {
			aliases: A2($mdgriffith$elm_codegen$Internal$Compiler$mergeAliases, one.aliases, two.aliases),
			inferences: A2($mdgriffith$elm_codegen$Internal$Compiler$mergeInferences, one.inferences, two.inferences),
			type_: two.type_
		};
	});
var $mdgriffith$elm_codegen$Elm$Case$captureCase = F4(
	function (mainExpression, mainExpressionTypeModule, index, branches) {
		var _v0 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, index, mainExpression);
		var branchIndex = _v0.a;
		var mainExpressionDetails = _v0.b;
		var caseExp = A3(
			$elm$core$List$foldl,
			$mdgriffith$elm_codegen$Elm$Case$captureCaseHelper(mainExpressionTypeModule),
			{annotation: $elm$core$Maybe$Nothing, cases: _List_Nil, imports: _List_Nil, index: branchIndex},
			branches);
		return _Utils_Tuple2(
			mainExpressionDetails,
			_Utils_update(
				caseExp,
				{
					annotation: function () {
						var _v1 = caseExp.annotation;
						if ((_v1.$ === 'Just') && (_v1.a.$ === 'Ok')) {
							var inference = _v1.a.a;
							var _v2 = mainExpressionDetails.annotation;
							if (_v2.$ === 'Err') {
								var err = _v2.a;
								return $elm$core$Maybe$Just(
									$elm$core$Result$Err(err));
							} else {
								var mainAnn = _v2.a;
								return $elm$core$Maybe$Just(
									$elm$core$Result$Ok(
										A2($mdgriffith$elm_codegen$Internal$Compiler$importInferences, mainAnn, inference)));
							}
						} else {
							return caseExp.annotation;
						}
					}()
				}));
	});
var $mdgriffith$elm_codegen$Internal$Compiler$getTypeModule = function (_v0) {
	var annotation = _v0.a;
	var _v1 = annotation.annotation;
	if (_v1.$ === 'Typed') {
		var _v2 = _v1.a;
		var _v3 = _v2.b;
		var mod = _v3.a;
		var typeName = _v3.b;
		return mod;
	} else {
		return _List_Nil;
	}
};
var $mdgriffith$elm_codegen$Elm$withType = F2(
	function (ann, _v0) {
		var annDetails = ann.a;
		var toExp = _v0.a;
		return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
			function (index) {
				var exp = toExp(index);
				return _Utils_update(
					exp,
					{
						annotation: function () {
							var _v1 = A2($mdgriffith$elm_codegen$Internal$Compiler$unifyOn, ann, exp.annotation);
							if (_v1.$ === 'Ok') {
								var unified = _v1.a;
								return $elm$core$Result$Ok(unified);
							} else {
								var _v2 = exp.annotation;
								if (_v2.$ === 'Ok') {
									var expressionAnnotation = _v2.a;
									return $elm$core$Result$Ok(
										{aliases: expressionAnnotation.aliases, inferences: expressionAnnotation.inferences, type_: annDetails.annotation});
								} else {
									var err = _v2.a;
									return $elm$core$Result$Ok(
										{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: $elm$core$Dict$empty, type_: annDetails.annotation});
								}
							}
						}(),
						imports: _Utils_ap(exp.imports, annDetails.imports)
					});
			});
	});
var $mdgriffith$elm_codegen$Elm$Case$custom = F3(
	function (mainExpression, annotation, branches) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
			function (index) {
				var myMain = A2($mdgriffith$elm_codegen$Elm$withType, annotation, mainExpression);
				var _v0 = A4(
					$mdgriffith$elm_codegen$Elm$Case$captureCase,
					myMain,
					$mdgriffith$elm_codegen$Internal$Compiler$getTypeModule(annotation),
					$mdgriffith$elm_codegen$Internal$Index$dive(index),
					branches);
				var expr = _v0.a;
				var gathered = _v0.b;
				return {
					annotation: function () {
						var _v1 = gathered.annotation;
						if (_v1.$ === 'Nothing') {
							return $elm$core$Result$Err(
								_List_fromArray(
									[$mdgriffith$elm_codegen$Internal$Compiler$EmptyCaseStatement]));
						} else {
							var ann = _v1.a;
							return ann;
						}
					}(),
					expression: $stil4m$elm_syntax$Elm$Syntax$Expression$CaseExpression(
						{
							cases: $elm$core$List$reverse(gathered.cases),
							expression: $mdgriffith$elm_codegen$Internal$Compiler$nodify(expr.expression)
						}),
					imports: _Utils_ap(expr.imports, gathered.imports)
				};
			});
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr = function (a) {
	return {$: 'ListExpr', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$MismatchedList = F2(
	function (a, b) {
		return {$: 'MismatchedList', a: a, b: b};
	});
var $mdgriffith$elm_codegen$Internal$Compiler$unifyHelper = F2(
	function (exps, existing) {
		unifyHelper:
		while (true) {
			if (!exps.b) {
				return $elm$core$Result$Ok(existing);
			} else {
				var top = exps.a;
				var remain = exps.b;
				var _v1 = top.annotation;
				if (_v1.$ === 'Ok') {
					var ann = _v1.a;
					var _v2 = A4($mdgriffith$elm_codegen$Internal$Compiler$unifiable, ann.aliases, ann.inferences, ann.type_, existing.type_);
					if (_v2.b.$ === 'Err') {
						var err = _v2.b.a;
						return $elm$core$Result$Err(
							_List_fromArray(
								[
									A2($mdgriffith$elm_codegen$Internal$Compiler$MismatchedList, ann.type_, existing.type_)
								]));
					} else {
						var cache = _v2.a;
						var _new = _v2.b.a;
						var $temp$exps = remain,
							$temp$existing = {
							aliases: existing.aliases,
							inferences: A2($mdgriffith$elm_codegen$Internal$Compiler$mergeInferences, existing.inferences, cache),
							type_: _new
						};
						exps = $temp$exps;
						existing = $temp$existing;
						continue unifyHelper;
					}
				} else {
					var err = _v1.a;
					return $elm$core$Result$Err(err);
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$unify = function (exps) {
	if (!exps.b) {
		return $elm$core$Result$Ok(
			{
				aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
				inferences: $elm$core$Dict$empty,
				type_: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType('a')
			});
	} else {
		var top = exps.a;
		var remain = exps.b;
		var _v1 = top.annotation;
		if (_v1.$ === 'Ok') {
			var ann = _v1.a;
			return A2($mdgriffith$elm_codegen$Internal$Compiler$unifyHelper, remain, ann);
		} else {
			var err = _v1.a;
			return $elm$core$Result$Err(err);
		}
	}
};
var $mdgriffith$elm_codegen$Elm$list = function (exprs) {
	return $mdgriffith$elm_codegen$Internal$Compiler$expression(
		function (index) {
			var exprDetails = A2($mdgriffith$elm_codegen$Internal$Compiler$thread, index, exprs);
			return {
				annotation: A2(
					$elm$core$Result$map,
					function (inner) {
						return {
							aliases: inner.aliases,
							inferences: inner.inferences,
							type_: A2(
								$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(
									_Utils_Tuple2(_List_Nil, 'List')),
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Internal$Compiler$nodify(inner.type_)
									]))
						};
					},
					$mdgriffith$elm_codegen$Internal$Compiler$unify(exprDetails)),
				expression: $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr(
					A2(
						$elm$core$List$map,
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.expression;
							},
							$mdgriffith$elm_codegen$Internal$Compiler$nodify),
						exprDetails)),
				imports: A2($elm$core$List$concatMap, $mdgriffith$elm_codegen$Internal$Compiler$getImports, exprDetails)
			};
		});
};
var $mdgriffith$elm_codegen$Elm$Annotation$list = function (inner) {
	return A3(
		$mdgriffith$elm_codegen$Elm$Annotation$typed,
		_List_Nil,
		'List',
		_List_fromArray(
			[inner]));
};
var $author$project$Gen$Ui$el = F2(
	function (elArg, elArg0) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Attribute',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))),
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Element',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'el'
				}),
			_List_fromArray(
				[
					$mdgriffith$elm_codegen$Elm$list(elArg),
					elArg0
				]));
	});
var $mdgriffith$elm_codegen$Elm$Op$BinOp = F3(
	function (a, b, c) {
		return {$: 'BinOp', a: a, b: b, c: c};
	});
var $stil4m$elm_syntax$Elm$Syntax$Infix$Left = {$: 'Left'};
var $stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication = F4(
	function (a, b, c, d) {
		return {$: 'OperatorApplication', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_codegen$Elm$Op$applyInfix = F5(
	function (extraImports, _v0, infixAnnotation, l, r) {
		var symbol = _v0.a;
		var dir = _v0.b;
		return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
			function (index) {
				var _v1 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, index, l);
				var leftIndex = _v1.a;
				var left = _v1.b;
				var _v2 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, leftIndex, r);
				var rightIndex = _v2.a;
				var right = _v2.b;
				var annotationIndex = $mdgriffith$elm_codegen$Internal$Index$next(rightIndex);
				return {
					annotation: A3(
						$mdgriffith$elm_codegen$Internal$Compiler$applyType,
						index,
						$elm$core$Result$Ok(
							{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: $elm$core$Dict$empty, type_: infixAnnotation}),
						_List_fromArray(
							[left, right])),
					expression: A4(
						$stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication,
						symbol,
						dir,
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(
							$mdgriffith$elm_codegen$Internal$Compiler$parens(left.expression)),
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(
							$mdgriffith$elm_codegen$Internal$Compiler$parens(right.expression))),
					imports: _Utils_ap(
						extraImports,
						_Utils_ap(left.imports, right.imports))
				};
			});
	});
var $mdgriffith$elm_codegen$Internal$Types$bool = A2(
	$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
	$mdgriffith$elm_codegen$Internal$Types$nodify(
		_Utils_Tuple2(_List_Nil, 'Bool')),
	_List_Nil);
var $mdgriffith$elm_codegen$Internal$Types$function = F2(
	function (args, _return) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (ann, fn) {
					return A2(
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
						$mdgriffith$elm_codegen$Internal$Types$nodify(ann),
						$mdgriffith$elm_codegen$Internal$Types$nodify(fn));
				}),
			_return,
			args);
	});
var $mdgriffith$elm_codegen$Internal$Types$formatValue = function (str) {
	var formatted = _Utils_eq(
		$elm$core$String$toUpper(str),
		str) ? $elm$core$String$toLower(str) : _Utils_ap(
		$elm$core$String$toLower(
			A2($elm$core$String$left, 1, str)),
		A2($elm$core$String$dropLeft, 1, str));
	return $mdgriffith$elm_codegen$Internal$Format$sanitize(formatted);
};
var $mdgriffith$elm_codegen$Internal$Types$var = function (name) {
	return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(
		$mdgriffith$elm_codegen$Internal$Types$formatValue(name));
};
var $mdgriffith$elm_codegen$Elm$Op$equal = A3(
	$mdgriffith$elm_codegen$Elm$Op$applyInfix,
	_List_Nil,
	A3($mdgriffith$elm_codegen$Elm$Op$BinOp, '==', $stil4m$elm_syntax$Elm$Syntax$Infix$Left, 4),
	A2(
		$mdgriffith$elm_codegen$Internal$Types$function,
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Internal$Types$var('a'),
				$mdgriffith$elm_codegen$Internal$Types$var('a')
			]),
		$mdgriffith$elm_codegen$Internal$Types$bool));
var $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression = function (a) {
	return {$: 'LambdaExpression', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType = F3(
	function (index, desiredName, maybeAnnotation) {
		var _v0 = A2($mdgriffith$elm_codegen$Internal$Index$getName, desiredName, index);
		var name = _v0.a;
		var newIndex = _v0.b;
		var _v1 = function () {
			if (maybeAnnotation.$ === 'Nothing') {
				return {
					aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
					annotation: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(
						A2($mdgriffith$elm_codegen$Internal$Index$protectTypeName, desiredName, index)),
					imports: _List_Nil
				};
			} else {
				var ann = maybeAnnotation.a.a;
				return ann;
			}
		}();
		var imports = _v1.imports;
		var annotation = _v1.annotation;
		var aliases = _v1.aliases;
		return {
			index: newIndex,
			name: name,
			type_: annotation,
			val: $mdgriffith$elm_codegen$Internal$Compiler$Expression(
				function (ignoredIndex_) {
					return {
						annotation: $elm$core$Result$Ok(
							{aliases: aliases, inferences: $elm$core$Dict$empty, type_: annotation}),
						expression: A2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue, _List_Nil, name),
						imports: imports
					};
				})
		};
	});
var $mdgriffith$elm_codegen$Elm$fn = F2(
	function (_v0, toExpression) {
		var oneBaseName = _v0.a;
		var maybeAnnotation = _v0.b;
		return $mdgriffith$elm_codegen$Internal$Compiler$expression(
			function (index) {
				var one = A3($mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType, index, oneBaseName, maybeAnnotation);
				var _v1 = toExpression(one.val);
				var toExpr = _v1.a;
				var _return = toExpr(one.index);
				return {
					annotation: function () {
						var _v2 = _return.annotation;
						if (_v2.$ === 'Err') {
							var err = _v2.a;
							return _return.annotation;
						} else {
							var returnAnnotation = _v2.a;
							return $elm$core$Result$Ok(
								{
									aliases: returnAnnotation.aliases,
									inferences: returnAnnotation.inferences,
									type_: A2(
										$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
										$mdgriffith$elm_codegen$Internal$Compiler$nodify(one.type_),
										$mdgriffith$elm_codegen$Internal$Compiler$nodify(returnAnnotation.type_))
								});
						}
					}(),
					expression: $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression(
						{
							args: _List_fromArray(
								[
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(one.name))
								]),
							expression: $mdgriffith$elm_codegen$Internal$Compiler$nodify(_return.expression)
						}),
					imports: _return.imports
				};
			});
	});
var $mdgriffith$elm_codegen$Elm$Declare$fn = F3(
	function (name, one, toExp) {
		var funcExp = A2($mdgriffith$elm_codegen$Elm$fn, one, toExp);
		var valueFrom = function (importFrom) {
			return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
				function (index) {
					var toFnExp = funcExp.a;
					var fnExp = toFnExp(index);
					return {
						annotation: fnExp.annotation,
						expression: A2(
							$stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue,
							importFrom,
							$mdgriffith$elm_codegen$Internal$Format$sanitize(name)),
						imports: fnExp.imports
					};
				});
		};
		var call = F2(
			function (importFrom, argOne) {
				return A2(
					$mdgriffith$elm_codegen$Elm$apply,
					valueFrom(importFrom),
					_List_fromArray(
						[argOne]));
			});
		return {
			call: call(_List_Nil),
			callFrom: call,
			declaration: A2($mdgriffith$elm_codegen$Elm$declaration, name, funcExp),
			value: valueFrom
		};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess = F2(
	function (a, b) {
		return {$: 'RecordAccess', a: a, b: b};
	});
var $mdgriffith$elm_codegen$Internal$Compiler$AttemptingGetOnTypeNameNotAnAlias = function (a) {
	return {$: 'AttemptingGetOnTypeNameNotAnAlias', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$AttemptingToGetOnIncorrectType = function (a) {
	return {$: 'AttemptingToGetOnIncorrectType', a: a};
};
var $mdgriffith$elm_codegen$Internal$Compiler$getFieldFromList = F2(
	function (selector, fields) {
		getFieldFromList:
		while (true) {
			if (!fields.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var nodifiedTop = fields.a;
				var remain = fields.b;
				var _v1 = $mdgriffith$elm_codegen$Internal$Compiler$denode(nodifiedTop);
				var fieldname = _v1.a;
				var contents = _v1.b;
				if (_Utils_eq(
					$mdgriffith$elm_codegen$Internal$Compiler$denode(fieldname),
					selector)) {
					return $elm$core$Maybe$Just(
						$mdgriffith$elm_codegen$Internal$Compiler$denode(contents));
				} else {
					var $temp$selector = selector,
						$temp$fields = remain;
					selector = $temp$selector;
					fields = $temp$fields;
					continue getFieldFromList;
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$inferRecordField = F2(
	function (index, _v0) {
		var nameOfRecord = _v0.nameOfRecord;
		var fieldName = _v0.fieldName;
		var fieldType = $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType(
			$mdgriffith$elm_codegen$Internal$Format$formatValue(
				_Utils_ap(
					fieldName,
					$mdgriffith$elm_codegen$Internal$Index$indexToString(index))));
		return $elm$core$Result$Ok(
			{
				aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
				inferences: A3(
					$mdgriffith$elm_codegen$Internal$Compiler$addInference,
					nameOfRecord,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord,
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(nameOfRecord),
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(
									_Utils_Tuple2(
										$mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldName),
										$mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldType)))
								]))),
					$elm$core$Dict$empty),
				type_: fieldType
			});
	});
var $mdgriffith$elm_codegen$Internal$Compiler$resolveField = F5(
	function (index, type_, aliases, inferences, fieldName) {
		resolveField:
		while (true) {
			if ($mdgriffith$elm_codegen$Internal$Index$typecheck(index)) {
				switch (type_.$) {
					case 'Record':
						var fields = type_.a;
						var _v1 = A2($mdgriffith$elm_codegen$Internal$Compiler$getFieldFromList, fieldName, fields);
						if (_v1.$ === 'Just') {
							var ann = _v1.a;
							return $elm$core$Result$Ok(
								{aliases: aliases, inferences: inferences, type_: ann});
						} else {
							return $elm$core$Result$Err(
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Internal$Compiler$CouldNotFindField(
										{
											existingFields: A2(
												$elm$core$List$map,
												A2(
													$elm$core$Basics$composeR,
													$mdgriffith$elm_codegen$Internal$Compiler$denode,
													A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $mdgriffith$elm_codegen$Internal$Compiler$denode)),
												fields),
											field: fieldName
										})
									]));
						}
					case 'GenericRecord':
						var name = type_.a;
						var fields = type_.b;
						var _v2 = A2(
							$mdgriffith$elm_codegen$Internal$Compiler$getFieldFromList,
							fieldName,
							$mdgriffith$elm_codegen$Internal$Compiler$denode(fields));
						if (_v2.$ === 'Just') {
							var ann = _v2.a;
							return $elm$core$Result$Ok(
								{aliases: aliases, inferences: inferences, type_: ann});
						} else {
							return $elm$core$Result$Err(
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Internal$Compiler$CouldNotFindField(
										{
											existingFields: A2(
												$elm$core$List$map,
												A2(
													$elm$core$Basics$composeR,
													$mdgriffith$elm_codegen$Internal$Compiler$denode,
													A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $mdgriffith$elm_codegen$Internal$Compiler$denode)),
												$mdgriffith$elm_codegen$Internal$Compiler$denode(fields)),
											field: fieldName
										})
									]));
						}
					case 'GenericType':
						var nameOfRecord = type_.a;
						return A2(
							$mdgriffith$elm_codegen$Internal$Compiler$inferRecordField,
							index,
							{fieldName: fieldName, nameOfRecord: nameOfRecord});
					case 'Typed':
						var nodedModAndName = type_.a;
						var vars = type_.b;
						var _v3 = A2($mdgriffith$elm_codegen$Internal$Compiler$getAlias, nodedModAndName, aliases);
						if (_v3.$ === 'Nothing') {
							return $elm$core$Result$Err(
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Internal$Compiler$AttemptingGetOnTypeNameNotAnAlias(
										{field: fieldName, on: type_})
									]));
						} else {
							var aliased = _v3.a;
							var $temp$index = index,
								$temp$type_ = aliased.target,
								$temp$aliases = aliases,
								$temp$inferences = inferences,
								$temp$fieldName = fieldName;
							index = $temp$index;
							type_ = $temp$type_;
							aliases = $temp$aliases;
							inferences = $temp$inferences;
							fieldName = $temp$fieldName;
							continue resolveField;
						}
					case 'Tupled':
						return $elm$core$Result$Err(
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Internal$Compiler$AttemptingToGetOnIncorrectType(
									{field: fieldName, on: type_})
								]));
					case 'Unit':
						return $elm$core$Result$Err(
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Internal$Compiler$AttemptingToGetOnIncorrectType(
									{field: fieldName, on: type_})
								]));
					default:
						return $elm$core$Result$Err(
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Internal$Compiler$AttemptingToGetOnIncorrectType(
									{field: fieldName, on: type_})
								]));
				}
			} else {
				return $elm$core$Result$Err(_List_Nil);
			}
		}
	});
var $mdgriffith$elm_codegen$Elm$get = F2(
	function (unformattedFieldName, recordExpression) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
			function (index) {
				var fieldName = $mdgriffith$elm_codegen$Internal$Format$formatValue(unformattedFieldName);
				var _v0 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, index, recordExpression);
				var expr = _v0.b;
				return {
					annotation: function () {
						var _v1 = expr.annotation;
						if (_v1.$ === 'Ok') {
							var recordAnn = _v1.a;
							return A5($mdgriffith$elm_codegen$Internal$Compiler$resolveField, index, recordAnn.type_, recordAnn.aliases, recordAnn.inferences, fieldName);
						} else {
							var otherwise = _v1;
							return otherwise;
						}
					}(),
					expression: A2(
						$stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess,
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(expr.expression),
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldName)),
					imports: expr.imports
				};
			});
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$IfBlock = F3(
	function (a, b, c) {
		return {$: 'IfBlock', a: a, b: b, c: c};
	});
var $mdgriffith$elm_codegen$Elm$ifThen = F3(
	function (condition, thenBranch, elseBranch) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
			function (index) {
				var _v0 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, index, condition);
				var condIndex = _v0.a;
				var cond = _v0.b;
				var _v1 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, condIndex, thenBranch);
				var thenIndex = _v1.a;
				var thenB = _v1.b;
				var _v2 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, thenIndex, elseBranch);
				var finalIndex = _v2.a;
				var elseB = _v2.b;
				return {
					annotation: thenB.annotation,
					expression: A3(
						$stil4m$elm_syntax$Elm$Syntax$Expression$IfBlock,
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(cond.expression),
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(thenB.expression),
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(elseB.expression)),
					imports: _Utils_ap(
						cond.imports,
						_Utils_ap(thenB.imports, elseB.imports))
				};
			});
	});
var $author$project$Interactive$moduleToTabName = function (mod) {
	return A3($elm$core$String$replace, '.', '', mod.name);
};
var $author$project$Gen$App$Effect$none = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_Nil,
				'Effect',
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
					]))),
		importFrom: _List_fromArray(
			['App', 'Effect']),
		name: 'none'
	});
var $author$project$Gen$Ui$Events$onClick = function (onClickArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui', 'Events']),
				name: 'onClick'
			}),
		_List_fromArray(
			[onClickArg]));
};
var $author$project$Gen$Ui$paddingXY = F2(
	function (paddingXYArg, paddingXYArg0) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'paddingXY'
				}),
			_List_fromArray(
				[
					$mdgriffith$elm_codegen$Elm$int(paddingXYArg),
					$mdgriffith$elm_codegen$Elm$int(paddingXYArg0)
				]));
	});
var $author$project$Gen$Ui$pointer = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Ui']),
				'Attribute',
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
					]))),
		importFrom: _List_fromArray(
			['Ui']),
		name: 'pointer'
	});
var $author$project$Gen$Ui$rgb = F3(
	function (rgbArg, rgbArg0, rgbArg1) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Color',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'rgb'
				}),
			_List_fromArray(
				[
					$mdgriffith$elm_codegen$Elm$int(rgbArg),
					$mdgriffith$elm_codegen$Elm$int(rgbArg0),
					$mdgriffith$elm_codegen$Elm$int(rgbArg1)
				]));
	});
var $author$project$Gen$Ui$rounded = function (roundedArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[$mdgriffith$elm_codegen$Elm$Annotation$int]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'rounded'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$int(roundedArg)
			]));
};
var $author$project$Gen$Ui$row = F2(
	function (rowArg, rowArg0) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Attribute',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))),
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Element',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											])))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Element',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'row'
				}),
			_List_fromArray(
				[
					$mdgriffith$elm_codegen$Elm$list(rowArg),
					$mdgriffith$elm_codegen$Elm$list(rowArg0)
				]));
	});
var $author$project$Gen$Ui$spacing = function (spacingArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[$mdgriffith$elm_codegen$Elm$Annotation$int]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'spacing'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$int(spacingArg)
			]));
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Literal = function (a) {
	return {$: 'Literal', a: a};
};
var $mdgriffith$elm_codegen$Internal$Types$string = A2(
	$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
	$mdgriffith$elm_codegen$Internal$Types$nodify(
		_Utils_Tuple2(_List_Nil, 'String')),
	_List_Nil);
var $mdgriffith$elm_codegen$Elm$string = function (literal) {
	return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
		function (_v0) {
			return {
				annotation: $elm$core$Result$Ok(
					{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: $elm$core$Dict$empty, type_: $mdgriffith$elm_codegen$Internal$Types$string}),
				expression: $stil4m$elm_syntax$Elm$Syntax$Expression$Literal(literal),
				imports: _List_Nil
			};
		});
};
var $mdgriffith$elm_codegen$Elm$Annotation$string = A3($mdgriffith$elm_codegen$Elm$Annotation$typed, _List_Nil, 'String', _List_Nil);
var $author$project$Gen$Ui$text = function (textArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[$mdgriffith$elm_codegen$Elm$Annotation$string]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Element',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'text'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$string(textArg)
			]));
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression = function (a) {
	return {$: 'TupledExpression', a: a};
};
var $mdgriffith$elm_codegen$Elm$tuple = F2(
	function (oneExp, twoExp) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
			function (index) {
				var _v0 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, index, oneExp);
				var oneIndex = _v0.a;
				var one = _v0.b;
				var _v1 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, oneIndex, twoExp);
				var twoIndex = _v1.a;
				var two = _v1.b;
				return {
					annotation: A3(
						$elm$core$Result$map2,
						F2(
							function (oneA, twoA) {
								return {
									aliases: A2($mdgriffith$elm_codegen$Internal$Compiler$mergeAliases, twoA.aliases, oneA.aliases),
									inferences: A2($mdgriffith$elm_codegen$Internal$Compiler$mergeInferences, twoA.inferences, oneA.inferences),
									type_: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(oneA.type_),
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(twoA.type_)
											]))
								};
							}),
						one.annotation,
						two.annotation),
					expression: $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression(
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(one.expression),
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(two.expression)
							])),
					imports: _Utils_ap(one.imports, two.imports)
				};
			});
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$LetDestructuring = F2(
	function (a, b) {
		return {$: 'LetDestructuring', a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$LetExpression = function (a) {
	return {$: 'LetExpression', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordUpdateExpression = F2(
	function (a, b) {
		return {$: 'RecordUpdateExpression', a: a, b: b};
	});
var $mdgriffith$elm_codegen$Internal$Compiler$RecordUpdateIncorrectFields = function (a) {
	return {$: 'RecordUpdateIncorrectFields', a: a};
};
var $mdgriffith$elm_codegen$Elm$presentAndMatching = F3(
	function (fieldName, fieldInference, existingFields) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, gathered) {
					var _v1 = _v0.b;
					var _v2 = _v1.a;
					var existingFieldName = _v2.b;
					var _v3 = _v1.b;
					var existingFieldType = _v3.b;
					return gathered ? gathered : (_Utils_eq(fieldName, existingFieldName) ? true : false);
				}),
			false,
			existingFields);
	});
var $mdgriffith$elm_codegen$Elm$verifyFieldsHelper = F2(
	function (existingFields, updatedFields) {
		verifyFieldsHelper:
		while (true) {
			if (!updatedFields.b) {
				return true;
			} else {
				var _v1 = updatedFields.a;
				var fieldName = _v1.a;
				var fieldInference = _v1.b;
				var remain = updatedFields.b;
				if (A3($mdgriffith$elm_codegen$Elm$presentAndMatching, fieldName, fieldInference, existingFields)) {
					var $temp$existingFields = existingFields,
						$temp$updatedFields = remain;
					existingFields = $temp$existingFields;
					updatedFields = $temp$updatedFields;
					continue verifyFieldsHelper;
				} else {
					return false;
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Elm$verifyFields = F2(
	function (updatedFields, existingFields) {
		return A2($mdgriffith$elm_codegen$Elm$verifyFieldsHelper, existingFields, updatedFields) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
			$mdgriffith$elm_codegen$Internal$Compiler$RecordUpdateIncorrectFields(
				{
					attemptingToUpdate: A2(
						$elm$core$List$map,
						function (_v0) {
							var fieldName = _v0.a;
							var fieldInference = _v0.b;
							return _Utils_Tuple2(fieldName, fieldInference.type_);
						},
						updatedFields),
					existingFields: A2(
						$elm$core$List$map,
						function (_v1) {
							var _v2 = _v1.b;
							var _v3 = _v2.a;
							var fieldName = _v3.b;
							var _v4 = _v2.b;
							var fieldInference = _v4.b;
							return _Utils_Tuple2(fieldName, fieldInference);
						},
						existingFields)
				}));
	});
var $mdgriffith$elm_codegen$Elm$updateRecord = F2(
	function (fields, recordExpression) {
		return $mdgriffith$elm_codegen$Internal$Compiler$expression(
			function (index) {
				var _v0 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, index, recordExpression);
				var recordIndex = _v0.a;
				var recordExp = _v0.b;
				var _v1 = A3(
					$elm$core$List$foldl,
					F2(
						function (_v2, _v3) {
							var fieldNameUnformatted = _v2.a;
							var fieldExp = _v2.b;
							var currentIndex = _v3.a;
							var fieldAnnotationResult = _v3.b;
							var items = _v3.c;
							var fieldName = $mdgriffith$elm_codegen$Internal$Format$formatValue(fieldNameUnformatted);
							var _v4 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, currentIndex, fieldExp);
							var newIndex = _v4.a;
							var exp = _v4.b;
							var currentFieldAnnotations = function () {
								if (fieldAnnotationResult.$ === 'Ok') {
									var fieldAnns = fieldAnnotationResult.a;
									var _v6 = exp.annotation;
									if (_v6.$ === 'Ok') {
										var fs = _v6.a;
										return $elm$core$Result$Ok(
											A2(
												$elm$core$List$cons,
												_Utils_Tuple2(fieldName, fs),
												fieldAnns));
									} else {
										var newErr = _v6.a;
										return $elm$core$Result$Err(newErr);
									}
								} else {
									var err = fieldAnnotationResult.a;
									var _v7 = exp.annotation;
									if (_v7.$ === 'Ok') {
										return fieldAnnotationResult;
									} else {
										var newErr = _v7.a;
										return $elm$core$Result$Err(
											_Utils_ap(err, newErr));
									}
								}
							}();
							return _Utils_Tuple3(
								newIndex,
								currentFieldAnnotations,
								A2(
									$elm$core$List$cons,
									_Utils_Tuple2(fieldName, exp),
									items));
						}),
					_Utils_Tuple3(
						recordIndex,
						$elm$core$Result$Ok(_List_Nil),
						_List_Nil),
					fields);
				var fieldIndex = _v1.a;
				var fieldAnnotationsGathered = _v1.b;
				var fieldDetails = _v1.c;
				return {
					annotation: function () {
						if (fieldAnnotationsGathered.$ === 'Err') {
							var fieldErrors = fieldAnnotationsGathered.a;
							return $elm$core$Result$Err(fieldErrors);
						} else {
							var verifiedFieldAnnotations = fieldAnnotationsGathered.a;
							var _v9 = recordExp.annotation;
							if (_v9.$ === 'Ok') {
								var recordAnn = _v9.a;
								var _v10 = recordAnn.type_;
								switch (_v10.$) {
									case 'Record':
										var existingFields = _v10.a;
										var _v11 = A2($mdgriffith$elm_codegen$Elm$verifyFields, verifiedFieldAnnotations, existingFields);
										if (_v11.$ === 'Nothing') {
											return recordExp.annotation;
										} else {
											var err = _v11.a;
											return $elm$core$Result$Err(
												_List_fromArray(
													[err]));
										}
									case 'GenericType':
										var nameOfRecord = _v10.a;
										return $elm$core$Result$Ok(
											{
												aliases: recordAnn.aliases,
												inferences: A3(
													$mdgriffith$elm_codegen$Internal$Compiler$addInference,
													nameOfRecord,
													A2(
														$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord,
														$mdgriffith$elm_codegen$Internal$Compiler$nodify(nameOfRecord),
														$mdgriffith$elm_codegen$Internal$Compiler$nodify(
															A2(
																$elm$core$List$map,
																function (_v12) {
																	var fieldName = _v12.a;
																	var inference = _v12.b;
																	return $mdgriffith$elm_codegen$Internal$Compiler$nodify(
																		_Utils_Tuple2(
																			$mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldName),
																			$mdgriffith$elm_codegen$Internal$Compiler$nodify(inference.type_)));
																},
																verifiedFieldAnnotations))),
													recordAnn.inferences),
												type_: recordAnn.type_
											});
									default:
										var otherwise = _v10;
										return recordExp.annotation;
								}
							} else {
								var otherwise = _v9;
								return otherwise;
							}
						}
					}(),
					expression: function () {
						var _v13 = recordExp.expression;
						if (_v13.$ === 'FunctionOrValue') {
							var name = _v13.b;
							return A2(
								$stil4m$elm_syntax$Elm$Syntax$Expression$RecordUpdateExpression,
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(name),
								A2(
									$elm$core$List$map,
									function (_v14) {
										var fieldName = _v14.a;
										var expDetails = _v14.b;
										return $mdgriffith$elm_codegen$Internal$Compiler$nodify(
											_Utils_Tuple2(
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldName),
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(expDetails.expression)));
									},
									$elm$core$List$reverse(fieldDetails)));
						} else {
							var name = 'record' + $mdgriffith$elm_codegen$Internal$Index$indexToString(fieldIndex);
							return $stil4m$elm_syntax$Elm$Syntax$Expression$LetExpression(
								{
									declarations: _List_fromArray(
										[
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											A2(
												$stil4m$elm_syntax$Elm$Syntax$Expression$LetDestructuring,
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(
													$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(name)),
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(recordExp.expression)))
										]),
									expression: $mdgriffith$elm_codegen$Internal$Compiler$nodify(
										A2(
											$stil4m$elm_syntax$Elm$Syntax$Expression$RecordUpdateExpression,
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(name),
											A2(
												$elm$core$List$map,
												function (_v15) {
													var fieldName = _v15.a;
													var expDetails = _v15.b;
													return $mdgriffith$elm_codegen$Internal$Compiler$nodify(
														_Utils_Tuple2(
															$mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldName),
															$mdgriffith$elm_codegen$Internal$Compiler$nodify(expDetails.expression)));
												},
												fieldDetails)))
								});
						}
					}(),
					imports: A2(
						$elm$core$List$concatMap,
						A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $mdgriffith$elm_codegen$Internal$Compiler$getImports),
						fieldDetails)
				};
			});
	});
var $mdgriffith$elm_codegen$Elm$variantWith = $mdgriffith$elm_codegen$Elm$Variant;
var $author$project$Interactive$codeOrOutput = F2(
	function (top, modules) {
		var variants = {code: 'ShowCode', output: 'ShowOutput'};
		var typeName = 'Focus';
		var type_ = A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, typeName);
		var valueNamed = function (name) {
			return $mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(type_),
					importFrom: _List_Nil,
					name: name
				});
		};
		var recordName = 'focus_';
		var msgName = 'FocusUpdated';
		return {
			declaration: A2(
				$mdgriffith$elm_codegen$Elm$customType,
				typeName,
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$variant('ShowCode'),
						$mdgriffith$elm_codegen$Elm$variant('ShowOutput')
					])),
			get: $mdgriffith$elm_codegen$Elm$get(recordName),
			init: _Utils_Tuple2(
				recordName,
				valueNamed('ShowOutput')),
			model: _Utils_Tuple2(recordName, type_),
			msg: A2(
				$mdgriffith$elm_codegen$Elm$variantWith,
				msgName,
				_List_fromArray(
					[
						A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, typeName)
					])),
			toString: A3(
				$mdgriffith$elm_codegen$Elm$Declare$fn,
				'tabToString',
				_Utils_Tuple2(
					'tab',
					$elm$core$Maybe$Just(type_)),
				function (tab) {
					return A3(
						$mdgriffith$elm_codegen$Elm$Case$custom,
						tab,
						type_,
						A2(
							$elm$core$List$map,
							function (mod) {
								return A2(
									$mdgriffith$elm_codegen$Elm$Case$branch0,
									$author$project$Interactive$moduleToTabName(mod),
									$mdgriffith$elm_codegen$Elm$string(mod.name));
							},
							modules));
				}),
			type_: type_,
			updateBranch: function (model) {
				return A3(
					$mdgriffith$elm_codegen$Elm$Case$branch1,
					msgName,
					_Utils_Tuple2(
						'newTab',
						A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, typeName)),
					function (tab) {
						return A2(
							$mdgriffith$elm_codegen$Elm$tuple,
							A2(
								$mdgriffith$elm_codegen$Elm$updateRecord,
								_List_fromArray(
									[
										_Utils_Tuple2(recordName, tab)
									]),
								model),
							$author$project$Gen$App$Effect$none);
					});
			},
			variants: variants,
			view: A3(
				$mdgriffith$elm_codegen$Elm$Declare$fn,
				'viewCodeOrResult',
				_Utils_Tuple2(
					'tab',
					$elm$core$Maybe$Just(type_)),
				function (tab) {
					return A2(
						$author$project$Gen$Ui$row,
						_List_fromArray(
							[
								$author$project$Gen$Ui$spacing(8),
								A2($author$project$Gen$Ui$paddingXY, 32, 8),
								$author$project$Gen$Ui$alignRight
							]),
						A2(
							$elm$core$List$map,
							function (_v0) {
								var label = _v0.a;
								var varName = _v0.b;
								return A2(
									$author$project$Gen$Ui$el,
									_List_fromArray(
										[
											A2($author$project$Gen$Ui$paddingXY, 8, 4),
											$author$project$Gen$Ui$border(1),
											$author$project$Gen$Ui$rounded(4),
											$author$project$Gen$Ui$pointer,
											$author$project$Gen$Ui$borderColor(
											A3(
												$mdgriffith$elm_codegen$Elm$ifThen,
												A2(
													$mdgriffith$elm_codegen$Elm$Op$equal,
													tab,
													valueNamed(varName)),
												A3($author$project$Gen$Ui$rgb, 1, 1, 1),
												A3($author$project$Gen$Ui$rgb, 0, 0, 0))),
											$author$project$Gen$Ui$Events$onClick(
											A2(
												$mdgriffith$elm_codegen$Elm$apply,
												$mdgriffith$elm_codegen$Elm$value(
													{
														annotation: $elm$core$Maybe$Just(
															A2(
																$mdgriffith$elm_codegen$Elm$Annotation$function,
																_List_fromArray(
																	[type_]),
																$author$project$Interactive$appTypes.msg)),
														importFrom: _List_Nil,
														name: msgName
													}),
												_List_fromArray(
													[
														$mdgriffith$elm_codegen$Elm$value(
														{
															annotation: $elm$core$Maybe$Just(type_),
															importFrom: _List_Nil,
															name: varName
														})
													])))
										]),
									$author$project$Gen$Ui$text(label));
							},
							_List_fromArray(
								[
									_Utils_Tuple2('Output', 'ShowOutput'),
									_Utils_Tuple2('Example', 'ShowCode')
								])));
				}),
			viewCall: function (model) {
				return A2(
					$mdgriffith$elm_codegen$Elm$apply,
					$mdgriffith$elm_codegen$Elm$value(
						{annotation: $elm$core$Maybe$Nothing, importFrom: _List_Nil, name: 'viewCodeOrResult'}),
					_List_fromArray(
						[
							A2($mdgriffith$elm_codegen$Elm$get, recordName, model)
						]));
			}
		};
	});
var $author$project$Gen$App$Page$moduleName_ = _List_fromArray(
	['App', 'Page']);
var $author$project$Gen$App$Page$annotation_ = {
	init: F2(
		function (initArg0, initArg1) {
			return A4(
				$mdgriffith$elm_codegen$Elm$Annotation$alias,
				$author$project$Gen$App$Page$moduleName_,
				'Init',
				_List_fromArray(
					[initArg0, initArg1]),
				A3(
					$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
					_List_fromArray(
						['App', 'Engine', 'Page']),
					'Init',
					_List_fromArray(
						[
							$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
							$mdgriffith$elm_codegen$Elm$Annotation$var('model')
						])));
		}),
	page: F3(
		function (pageArg0, pageArg1, pageArg2) {
			return A4(
				$mdgriffith$elm_codegen$Elm$Annotation$alias,
				$author$project$Gen$App$Page$moduleName_,
				'Page',
				_List_fromArray(
					[pageArg0, pageArg1, pageArg2]),
				A3(
					$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
					_List_fromArray(
						['App', 'Engine', 'Page']),
					'Page',
					_List_fromArray(
						[
							A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['App', 'Shared']),
							'Shared',
							_List_Nil),
							$mdgriffith$elm_codegen$Elm$Annotation$var('params'),
							$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
							$mdgriffith$elm_codegen$Elm$Annotation$var('model')
						])));
		})
};
var $mdgriffith$elm_codegen$Elm$fn3 = F4(
	function (_v0, _v1, _v2, toExpression) {
		var oneBaseName = _v0.a;
		var maybeOneType = _v0.b;
		var twoBaseName = _v1.a;
		var maybeTwoType = _v1.b;
		var threeBaseName = _v2.a;
		var maybeThreeType = _v2.b;
		return $mdgriffith$elm_codegen$Internal$Compiler$expression(
			function (index) {
				var one = A3($mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType, index, oneBaseName, maybeOneType);
				var two = A3($mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType, one.index, twoBaseName, maybeTwoType);
				var three = A3($mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType, two.index, threeBaseName, maybeThreeType);
				var _v3 = A2(
					$mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails,
					three.index,
					A3(toExpression, one.val, two.val, three.val));
				var newIndex = _v3.a;
				var _return = _v3.b;
				return {
					annotation: function () {
						var _v4 = _return.annotation;
						if (_v4.$ === 'Err') {
							var err = _v4.a;
							return _return.annotation;
						} else {
							var returnAnnotation = _v4.a;
							return $elm$core$Result$Ok(
								{
									aliases: returnAnnotation.aliases,
									inferences: returnAnnotation.inferences,
									type_: A2(
										$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
										$mdgriffith$elm_codegen$Internal$Compiler$nodify(one.type_),
										$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											A2(
												$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(two.type_),
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(
													A2(
														$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
														$mdgriffith$elm_codegen$Internal$Compiler$nodify(three.type_),
														$mdgriffith$elm_codegen$Internal$Compiler$nodify(returnAnnotation.type_))))))
								});
						}
					}(),
					expression: $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression(
						{
							args: _List_fromArray(
								[
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(one.name)),
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(two.name)),
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(three.name))
								]),
							expression: $mdgriffith$elm_codegen$Internal$Compiler$nodify(_return.expression)
						}),
					imports: _return.imports
				};
			});
	});
var $author$project$Gen$App$Page$init = function (initArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Elm$Annotation$var('model')
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_Nil,
							'Init',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
									$mdgriffith$elm_codegen$Elm$Annotation$var('model')
								])))),
				importFrom: _List_fromArray(
					['App', 'Page']),
				name: 'init'
			}),
		_List_fromArray(
			[initArg]));
};
var $mdgriffith$elm_codegen$Elm$Annotation$maybe = function (maybeArg) {
	return A3(
		$mdgriffith$elm_codegen$Elm$Annotation$typed,
		_List_Nil,
		'Maybe',
		_List_fromArray(
			[maybeArg]));
};
var $mdgriffith$elm_codegen$Internal$Compiler$DuplicateFieldInRecord = function (a) {
	return {$: 'DuplicateFieldInRecord', a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr = function (a) {
	return {$: 'RecordExpr', a: a};
};
var $mdgriffith$elm_codegen$Elm$record = function (fields) {
	return $mdgriffith$elm_codegen$Internal$Compiler$expression(
		function (index) {
			var unified = A3(
				$elm$core$List$foldl,
				F2(
					function (_v4, found) {
						var unformattedFieldName = _v4.a;
						var fieldExpression = _v4.b;
						var fieldName = $mdgriffith$elm_codegen$Internal$Format$formatValue(unformattedFieldName);
						var _v5 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, found.index, fieldExpression);
						var newIndex = _v5.a;
						var exp = _v5.b;
						return {
							errors: function () {
								if (A2($elm$core$Set$member, fieldName, found.passed)) {
									return A2(
										$elm$core$List$cons,
										$mdgriffith$elm_codegen$Internal$Compiler$DuplicateFieldInRecord(fieldName),
										found.errors);
								} else {
									var _v6 = exp.annotation;
									if (_v6.$ === 'Err') {
										if (!_v6.a.b) {
											return found.errors;
										} else {
											var errs = _v6.a;
											return _Utils_ap(errs, found.errors);
										}
									} else {
										var ann = _v6.a;
										return found.errors;
									}
								}
							}(),
							fieldAnnotations: function () {
								var _v7 = exp.annotation;
								if (_v7.$ === 'Err') {
									var err = _v7.a;
									return found.fieldAnnotations;
								} else {
									var ann = _v7.a;
									return A2(
										$elm$core$List$cons,
										_Utils_Tuple2(
											$mdgriffith$elm_codegen$Internal$Format$formatValue(fieldName),
											ann),
										found.fieldAnnotations);
								}
							}(),
							fields: A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(fieldName),
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(exp.expression)),
								found.fields),
							imports: _Utils_ap(exp.imports, found.imports),
							index: newIndex,
							passed: A2($elm$core$Set$insert, fieldName, found.passed)
						};
					}),
				{errors: _List_Nil, fieldAnnotations: _List_Nil, fields: _List_Nil, imports: _List_Nil, index: index, passed: $elm$core$Set$empty},
				fields);
			return {
				annotation: function () {
					var _v0 = unified.errors;
					if (!_v0.b) {
						return $elm$core$Result$Ok(
							{
								aliases: A3(
									$elm$core$List$foldl,
									F2(
										function (_v1, gathered) {
											var name = _v1.a;
											var ann = _v1.b;
											return A2($mdgriffith$elm_codegen$Internal$Compiler$mergeAliases, ann.aliases, gathered);
										}),
									$mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
									unified.fieldAnnotations),
								inferences: A3(
									$elm$core$List$foldl,
									F2(
										function (_v2, gathered) {
											var name = _v2.a;
											var ann = _v2.b;
											return A2($mdgriffith$elm_codegen$Internal$Compiler$mergeInferences, ann.inferences, gathered);
										}),
									$elm$core$Dict$empty,
									unified.fieldAnnotations),
								type_: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(
									$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
										A2(
											$elm$core$List$map,
											function (_v3) {
												var name = _v3.a;
												var ann = _v3.b;
												return _Utils_Tuple2(
													$mdgriffith$elm_codegen$Internal$Compiler$nodify(name),
													$mdgriffith$elm_codegen$Internal$Compiler$nodify(ann.type_));
											},
											$elm$core$List$reverse(unified.fieldAnnotations))))
							});
					} else {
						var errs = _v0;
						return $elm$core$Result$Err(errs);
					}
				}(),
				expression: $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr(
					$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
						$elm$core$List$reverse(unified.fields))),
				imports: unified.imports
			};
		});
};
var $author$project$Interactive$toInteractiveInitFields = function (interact) {
	return _Utils_Tuple2(
		interact.name,
		$mdgriffith$elm_codegen$Elm$record(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var info = _v0.b;
					return _Utils_Tuple2(name, info.init);
				},
				interact.fields)));
};
var $author$project$Interactive$toInitFields = function (mod) {
	return A2($elm$core$List$map, $author$project$Interactive$toInteractiveInitFields, mod.examples);
};
var $author$project$Gen$Maybe$withDefault = F2(
	function (withDefaultArg, withDefaultArg0) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('a'),
									$mdgriffith$elm_codegen$Elm$Annotation$maybe(
									$mdgriffith$elm_codegen$Elm$Annotation$var('a'))
								]),
							$mdgriffith$elm_codegen$Elm$Annotation$var('a'))),
					importFrom: _List_fromArray(
						['Maybe']),
					name: 'withDefault'
				}),
			_List_fromArray(
				[withDefaultArg, withDefaultArg0]));
	});
var $author$project$Interactive$init = F2(
	function (mod, additional) {
		return A2(
			$mdgriffith$elm_codegen$Elm$declaration,
			'init',
			A4(
				$mdgriffith$elm_codegen$Elm$fn3,
				_Utils_Tuple2(
					'params',
					$elm$core$Maybe$Just(
						$mdgriffith$elm_codegen$Elm$Annotation$var('params'))),
				_Utils_Tuple2(
					'shared',
					$elm$core$Maybe$Just(
						$mdgriffith$elm_codegen$Elm$Annotation$var('shared'))),
				_Utils_Tuple2(
					'maybeModel',
					$elm$core$Maybe$Just(
						$mdgriffith$elm_codegen$Elm$Annotation$maybe(
							A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Model')))),
				F3(
					function (params, shared, maybeModel) {
						return A2(
							$mdgriffith$elm_codegen$Elm$withType,
							A2(
								$author$project$Gen$App$Page$annotation_.init,
								A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Msg'),
								A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Model')),
							$author$project$Gen$App$Page$init(
								A2(
									$author$project$Gen$Maybe$withDefault,
									$mdgriffith$elm_codegen$Elm$record(
										A2(
											$elm$core$List$cons,
											additional.focus.init,
											_Utils_ap(
												additional.example.init,
												$author$project$Interactive$toInitFields(mod)))),
									maybeModel)));
					})));
	});
var $author$project$Interactive$logMsg = $mdgriffith$elm_codegen$Elm$variant('Log');
var $author$project$Gen$App$Effect$annotation_ = {
	effect: function (effectArg0) {
		return A3(
			$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
			_List_fromArray(
				['App', 'Effect']),
			'Effect',
			_List_fromArray(
				[effectArg0]));
	}
};
var $mdgriffith$elm_codegen$Elm$Annotation$record = function (fields) {
	return $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
		{
			aliases: A3(
				$elm$core$List$foldl,
				F2(
					function (_v0, aliases) {
						var ann = _v0.b;
						return A2(
							$mdgriffith$elm_codegen$Internal$Compiler$mergeAliases,
							$mdgriffith$elm_codegen$Elm$Annotation$getAliases(ann),
							aliases);
					}),
				$mdgriffith$elm_codegen$Internal$Compiler$emptyAliases,
				fields),
			annotation: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(
				$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
					A2(
						$elm$core$List$map,
						function (_v1) {
							var name = _v1.a;
							var ann = _v1.b;
							return _Utils_Tuple2(
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$mdgriffith$elm_codegen$Internal$Format$formatValue(name)),
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(ann)));
						},
						fields))),
			imports: A2(
				$elm$core$List$concatMap,
				A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports),
				fields)
		});
};
var $mdgriffith$elm_codegen$Elm$Annotation$tuple = F2(
	function (one, two) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
			{
				aliases: A2(
					$mdgriffith$elm_codegen$Internal$Compiler$mergeAliases,
					$mdgriffith$elm_codegen$Elm$Annotation$getAliases(one),
					$mdgriffith$elm_codegen$Elm$Annotation$getAliases(two)),
				annotation: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(
					$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(one),
								$mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(two)
							]))),
				imports: _Utils_ap(
					$mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(one),
					$mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(two))
			});
	});
var $author$project$Gen$App$Page$call_ = {
	authenticated: function (authenticatedArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'init',
											A2(
												$mdgriffith$elm_codegen$Elm$Annotation$function,
												_List_fromArray(
													[
														$mdgriffith$elm_codegen$Elm$Annotation$var('params'),
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'Shared']),
														'Shared',
														_List_Nil),
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_Nil,
														'Maybe',
														_List_fromArray(
															[
																$mdgriffith$elm_codegen$Elm$Annotation$var('model')
															]))
													]),
												A3(
													$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
													_List_Nil,
													'Init',
													_List_fromArray(
														[
															$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
															$mdgriffith$elm_codegen$Elm$Annotation$var('model')
														])))),
											_Utils_Tuple2(
											'update',
											A2(
												$mdgriffith$elm_codegen$Elm$Annotation$function,
												_List_fromArray(
													[
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'Shared']),
														'Shared',
														_List_Nil),
														$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
														$mdgriffith$elm_codegen$Elm$Annotation$var('model')
													]),
												A2(
													$mdgriffith$elm_codegen$Elm$Annotation$tuple,
													$mdgriffith$elm_codegen$Elm$Annotation$var('model'),
													A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'Effect']),
														'Effect',
														_List_fromArray(
															[
																$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
															]))))),
											_Utils_Tuple2(
											'subscriptions',
											A2(
												$mdgriffith$elm_codegen$Elm$Annotation$function,
												_List_fromArray(
													[
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'Shared']),
														'Shared',
														_List_Nil),
														$mdgriffith$elm_codegen$Elm$Annotation$var('model')
													]),
												A3(
													$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
													_List_fromArray(
														['App', 'Sub']),
													'Sub',
													_List_fromArray(
														[
															$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
														])))),
											_Utils_Tuple2(
											'view',
											A2(
												$mdgriffith$elm_codegen$Elm$Annotation$function,
												_List_fromArray(
													[
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'View', 'Id']),
														'Id',
														_List_Nil),
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'Shared']),
														'Shared',
														_List_Nil),
														$mdgriffith$elm_codegen$Elm$Annotation$var('model')
													]),
												A3(
													$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
													_List_fromArray(
														['App', 'View']),
													'View',
													_List_fromArray(
														[
															$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
														]))))
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_Nil,
								'Page',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('params'),
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
										$mdgriffith$elm_codegen$Elm$Annotation$var('model')
									])))),
					importFrom: _List_fromArray(
						['App', 'Page']),
					name: 'authenticated'
				}),
			_List_fromArray(
				[authenticatedArg]));
	},
	error: function (errorArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['App', 'Page', 'Error']),
									'Error',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_Nil,
								'Init',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
										$mdgriffith$elm_codegen$Elm$Annotation$var('model')
									])))),
					importFrom: _List_fromArray(
						['App', 'Page']),
					name: 'error'
				}),
			_List_fromArray(
				[errorArg]));
	},
	init: function (initArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('model')
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_Nil,
								'Init',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
										$mdgriffith$elm_codegen$Elm$Annotation$var('model')
									])))),
					importFrom: _List_fromArray(
						['App', 'Page']),
					name: 'init'
				}),
			_List_fromArray(
				[initArg]));
	},
	initWith: F2(
		function (initWithArg, initWithArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('model'),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['App', 'Effect']),
										'Effect',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_Nil,
									'Init',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
											$mdgriffith$elm_codegen$Elm$Annotation$var('model')
										])))),
						importFrom: _List_fromArray(
							['App', 'Page']),
						name: 'initWith'
					}),
				_List_fromArray(
					[initWithArg, initWithArg0]));
		}),
	loadFrom: function (loadFromArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['App', 'Effect']),
									'Effect',
									_List_fromArray(
										[
											A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_Nil,
											'Init',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
													$mdgriffith$elm_codegen$Elm$Annotation$var('model')
												]))
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_Nil,
								'Init',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
										$mdgriffith$elm_codegen$Elm$Annotation$var('model')
									])))),
					importFrom: _List_fromArray(
						['App', 'Page']),
					name: 'loadFrom'
				}),
			_List_fromArray(
				[loadFromArg]));
	},
	page: function (pageArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'init',
											A2(
												$mdgriffith$elm_codegen$Elm$Annotation$function,
												_List_fromArray(
													[
														$mdgriffith$elm_codegen$Elm$Annotation$var('params'),
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'Shared']),
														'Shared',
														_List_Nil),
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_Nil,
														'Maybe',
														_List_fromArray(
															[
																$mdgriffith$elm_codegen$Elm$Annotation$var('model')
															]))
													]),
												A3(
													$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
													_List_Nil,
													'Init',
													_List_fromArray(
														[
															$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
															$mdgriffith$elm_codegen$Elm$Annotation$var('model')
														])))),
											_Utils_Tuple2(
											'update',
											A2(
												$mdgriffith$elm_codegen$Elm$Annotation$function,
												_List_fromArray(
													[
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'Shared']),
														'Shared',
														_List_Nil),
														$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
														$mdgriffith$elm_codegen$Elm$Annotation$var('model')
													]),
												A2(
													$mdgriffith$elm_codegen$Elm$Annotation$tuple,
													$mdgriffith$elm_codegen$Elm$Annotation$var('model'),
													A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'Effect']),
														'Effect',
														_List_fromArray(
															[
																$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
															]))))),
											_Utils_Tuple2(
											'subscriptions',
											A2(
												$mdgriffith$elm_codegen$Elm$Annotation$function,
												_List_fromArray(
													[
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'Shared']),
														'Shared',
														_List_Nil),
														$mdgriffith$elm_codegen$Elm$Annotation$var('model')
													]),
												A3(
													$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
													_List_fromArray(
														['App', 'Sub']),
													'Sub',
													_List_fromArray(
														[
															$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
														])))),
											_Utils_Tuple2(
											'view',
											A2(
												$mdgriffith$elm_codegen$Elm$Annotation$function,
												_List_fromArray(
													[
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'View', 'Id']),
														'Id',
														_List_Nil),
														A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['App', 'Shared']),
														'Shared',
														_List_Nil),
														$mdgriffith$elm_codegen$Elm$Annotation$var('model')
													]),
												A3(
													$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
													_List_fromArray(
														['App', 'View']),
													'View',
													_List_fromArray(
														[
															$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
														]))))
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_Nil,
								'Page',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('params'),
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
										$mdgriffith$elm_codegen$Elm$Annotation$var('model')
									])))),
					importFrom: _List_fromArray(
						['App', 'Page']),
					name: 'page'
				}),
			_List_fromArray(
				[pageArg]));
	},
	withKey: F2(
		function (withKeyArg, withKeyArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('params')
											]),
										$mdgriffith$elm_codegen$Elm$Annotation$string),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_Nil,
										'Page',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('params'),
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
												$mdgriffith$elm_codegen$Elm$Annotation$var('model')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_Nil,
									'Page',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('params'),
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
											$mdgriffith$elm_codegen$Elm$Annotation$var('model')
										])))),
						importFrom: _List_fromArray(
							['App', 'Page']),
						name: 'withKey'
					}),
				_List_fromArray(
					[withKeyArg, withKeyArg0]));
		}),
	withPageCacheLimit: F2(
		function (withPageCacheLimitArg, withPageCacheLimitArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$int,
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_Nil,
										'Page',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('params'),
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
												$mdgriffith$elm_codegen$Elm$Annotation$var('model')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_Nil,
									'Page',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('params'),
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg'),
											$mdgriffith$elm_codegen$Elm$Annotation$var('model')
										])))),
						importFrom: _List_fromArray(
							['App', 'Page']),
						name: 'withPageCacheLimit'
					}),
				_List_fromArray(
					[withPageCacheLimitArg, withPageCacheLimitArg0]));
		})
};
var $author$project$Gen$App$Sub$none = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_Nil,
				'Sub',
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
					]))),
		importFrom: _List_fromArray(
			['App', 'Sub']),
		name: 'none'
	});
var $mdgriffith$elm_codegen$Elm$Annotation$unit = $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
	{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, annotation: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit, imports: _List_Nil});
var $author$project$Interactive$page = A2(
	$mdgriffith$elm_codegen$Elm$declaration,
	'page',
	A2(
		$mdgriffith$elm_codegen$Elm$withType,
		A3(
			$author$project$Gen$App$Page$annotation_.page,
			$mdgriffith$elm_codegen$Elm$Annotation$var('params'),
			A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Model'),
			A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Msg')),
		$author$project$Gen$App$Page$call_.page(
			$mdgriffith$elm_codegen$Elm$record(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'init',
						$mdgriffith$elm_codegen$Elm$value(
							{
								annotation: $elm$core$Maybe$Just(
									A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[$mdgriffith$elm_codegen$Elm$Annotation$unit]),
										A2(
											$mdgriffith$elm_codegen$Elm$Annotation$tuple,
											$author$project$Interactive$appTypes.model,
											$author$project$Gen$App$Effect$annotation_.effect(
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg'))))),
								importFrom: _List_Nil,
								name: 'init'
							})),
						_Utils_Tuple2(
						'update',
						$mdgriffith$elm_codegen$Elm$value(
							{
								annotation: $elm$core$Maybe$Just(
									A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[$author$project$Interactive$appTypes.msg, $author$project$Interactive$appTypes.model]),
										A2(
											$mdgriffith$elm_codegen$Elm$Annotation$tuple,
											$author$project$Interactive$appTypes.model,
											$author$project$Gen$App$Effect$annotation_.effect(
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg'))))),
								importFrom: _List_Nil,
								name: 'update'
							})),
						_Utils_Tuple2(
						'view',
						$mdgriffith$elm_codegen$Elm$value(
							{annotation: $elm$core$Maybe$Nothing, importFrom: _List_Nil, name: 'view'})),
						_Utils_Tuple2(
						'subscriptions',
						A2(
							$mdgriffith$elm_codegen$Elm$fn,
							_Utils_Tuple2('model', $elm$core$Maybe$Nothing),
							function (_v0) {
								return $author$project$Gen$App$Sub$none;
							}))
					])))));
var $author$project$Gen$Ui$moduleName_ = _List_fromArray(
	['Ui']);
var $author$project$Gen$Ui$annotation_ = {
	angle: A4(
		$mdgriffith$elm_codegen$Elm$Annotation$alias,
		$author$project$Gen$Ui$moduleName_,
		'Angle',
		_List_Nil,
		A3(
			$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
			_List_fromArray(
				['Internal', 'Style2']),
			'Angle',
			_List_Nil)),
	attribute: function (attributeArg0) {
		return A4(
			$mdgriffith$elm_codegen$Elm$Annotation$alias,
			$author$project$Gen$Ui$moduleName_,
			'Attribute',
			_List_fromArray(
				[attributeArg0]),
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Internal', 'Model2']),
				'Attribute',
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
					])));
	},
	color: A4(
		$mdgriffith$elm_codegen$Elm$Annotation$alias,
		$author$project$Gen$Ui$moduleName_,
		'Color',
		_List_Nil,
		A3(
			$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
			_List_fromArray(
				['Internal', 'Style2']),
			'Color',
			_List_Nil)),
	edges: A4(
		$mdgriffith$elm_codegen$Elm$Annotation$alias,
		$author$project$Gen$Ui$moduleName_,
		'Edges',
		_List_Nil,
		$mdgriffith$elm_codegen$Elm$Annotation$record(
			_List_fromArray(
				[
					_Utils_Tuple2('top', $mdgriffith$elm_codegen$Elm$Annotation$int),
					_Utils_Tuple2('right', $mdgriffith$elm_codegen$Elm$Annotation$int),
					_Utils_Tuple2('bottom', $mdgriffith$elm_codegen$Elm$Annotation$int),
					_Utils_Tuple2('left', $mdgriffith$elm_codegen$Elm$Annotation$int)
				]))),
	element: function (elementArg0) {
		return A4(
			$mdgriffith$elm_codegen$Elm$Annotation$alias,
			$author$project$Gen$Ui$moduleName_,
			'Element',
			_List_fromArray(
				[elementArg0]),
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Internal', 'Model2']),
				'Element',
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
					])));
	},
	gradient: A4(
		$mdgriffith$elm_codegen$Elm$Annotation$alias,
		$author$project$Gen$Ui$moduleName_,
		'Gradient',
		_List_Nil,
		A3(
			$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
			_List_fromArray(
				['Internal', 'Style2']),
			'Gradient',
			_List_Nil)),
	length: A3(
		$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
		_List_fromArray(
			['Ui']),
		'Length',
		_List_Nil),
	option: A4(
		$mdgriffith$elm_codegen$Elm$Annotation$alias,
		$author$project$Gen$Ui$moduleName_,
		'Option',
		_List_Nil,
		A3(
			$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
			_List_fromArray(
				['Internal', 'Model2']),
			'Option',
			_List_Nil)),
	position: A4(
		$mdgriffith$elm_codegen$Elm$Annotation$alias,
		$author$project$Gen$Ui$moduleName_,
		'Position',
		_List_Nil,
		$mdgriffith$elm_codegen$Elm$Annotation$record(
			_List_fromArray(
				[
					_Utils_Tuple2('x', $mdgriffith$elm_codegen$Elm$Annotation$int),
					_Utils_Tuple2('y', $mdgriffith$elm_codegen$Elm$Annotation$int),
					_Utils_Tuple2('z', $mdgriffith$elm_codegen$Elm$Annotation$int)
				])))
};
var $author$project$Interactive$capitalize = function (str) {
	var top = A2($elm$core$String$left, 1, str);
	var remain = A2($elm$core$String$dropLeft, 1, str);
	return _Utils_ap(
		$elm$core$String$toUpper(top),
		remain);
};
var $mdgriffith$elm_codegen$Elm$fn2 = F3(
	function (_v0, _v1, toExpression) {
		var oneBaseName = _v0.a;
		var maybeOneType = _v0.b;
		var twoBaseName = _v1.a;
		var maybeTwoType = _v1.b;
		return $mdgriffith$elm_codegen$Internal$Compiler$expression(
			function (index) {
				var one = A3($mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType, index, oneBaseName, maybeOneType);
				var two = A3($mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType, one.index, twoBaseName, maybeTwoType);
				var _v2 = A2(
					$mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails,
					two.index,
					A2(toExpression, one.val, two.val));
				var newIndex_ = _v2.a;
				var _return = _v2.b;
				return {
					annotation: function () {
						var _v3 = _return.annotation;
						if (_v3.$ === 'Err') {
							var err = _v3.a;
							return _return.annotation;
						} else {
							var returnAnnotation = _v3.a;
							return $elm$core$Result$Ok(
								{
									aliases: returnAnnotation.aliases,
									inferences: returnAnnotation.inferences,
									type_: A2(
										$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
										$mdgriffith$elm_codegen$Internal$Compiler$nodify(one.type_),
										$mdgriffith$elm_codegen$Internal$Compiler$nodify(
											A2(
												$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(two.type_),
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(returnAnnotation.type_))))
								});
						}
					}(),
					expression: $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression(
						{
							args: _List_fromArray(
								[
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(one.name)),
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(
									$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(two.name))
								]),
							expression: $mdgriffith$elm_codegen$Internal$Compiler$nodify(_return.expression)
						}),
					imports: _return.imports
				};
			});
	});
var $mdgriffith$elm_codegen$Elm$Annotation$bool = A3($mdgriffith$elm_codegen$Elm$Annotation$typed, _List_Nil, 'Bool', _List_Nil);
var $mdgriffith$elm_codegen$Elm$Annotation$float = A3($mdgriffith$elm_codegen$Elm$Annotation$typed, _List_Nil, 'Float', _List_Nil);
var $author$project$Interactive$inputToAnnotation = function (input) {
	switch (input.$) {
		case 'InputString':
			return $mdgriffith$elm_codegen$Elm$Annotation$string;
		case 'InputBool':
			return $mdgriffith$elm_codegen$Elm$Annotation$bool;
		case 'InputInt':
			return $mdgriffith$elm_codegen$Elm$Annotation$int;
		case 'InputFloat':
			return $mdgriffith$elm_codegen$Elm$Annotation$float;
		default:
			var inner = input.a;
			return $mdgriffith$elm_codegen$Elm$Annotation$maybe(
				$author$project$Interactive$inputToAnnotation(inner));
	}
};
var $author$project$Interactive$fieldsToAnnotation = function (fields) {
	return $mdgriffith$elm_codegen$Elm$Annotation$record(
		A2(
			$elm$core$List$map,
			function (_v0) {
				var name = _v0.a;
				var info = _v0.b;
				return _Utils_Tuple2(
					name,
					$author$project$Interactive$inputToAnnotation(info.input));
			},
			fields));
};
var $author$project$Interactive$toModelField = function (interact) {
	return _Utils_Tuple2(
		interact.name,
		$author$project$Interactive$fieldsToAnnotation(interact.fields));
};
var $author$project$Interactive$renderInteractiveViewer = F2(
	function (focus, interact) {
		return A2(
			$mdgriffith$elm_codegen$Elm$declaration,
			'view' + $author$project$Interactive$capitalize(interact.name),
			A3(
				$mdgriffith$elm_codegen$Elm$fn2,
				_Utils_Tuple2(
					'parent',
					$elm$core$Maybe$Just($author$project$Interactive$appTypes.model)),
				_Utils_Tuple2(
					'model',
					$elm$core$Maybe$Just(
						$author$project$Interactive$toModelField(interact).b)),
				F2(
					function (model, submodel) {
						return A2(
							$mdgriffith$elm_codegen$Elm$withType,
							$author$project$Gen$Ui$annotation_.element(
								A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Msg')),
							interact.view(
								{
									codeOrOutput: A2(
										$mdgriffith$elm_codegen$Elm$Op$equal,
										focus.get(model),
										$mdgriffith$elm_codegen$Elm$value(
											{
												annotation: $elm$core$Maybe$Just(focus.type_),
												importFrom: _List_Nil,
												name: focus.variants.output
											})),
									model: submodel,
									onChange: $mdgriffith$elm_codegen$Elm$value(
										{
											annotation: $elm$core$Maybe$Nothing,
											importFrom: _List_Nil,
											name: $author$project$Interactive$capitalize(interact.name)
										})
								}));
					})));
	});
var $author$project$Interactive$renderViewer = F2(
	function (focus, mod) {
		return A2(
			$elm$core$List$map,
			$author$project$Interactive$renderInteractiveViewer(focus),
			mod.examples);
	});
var $mdgriffith$elm_codegen$Elm$bool = function (on) {
	return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
		function (_v0) {
			return {
				annotation: $elm$core$Result$Ok(
					{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: $elm$core$Dict$empty, type_: $mdgriffith$elm_codegen$Internal$Types$bool}),
				expression: A2(
					$stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue,
					_List_Nil,
					on ? 'True' : 'False'),
				imports: _List_Nil
			};
		});
};
var $mdgriffith$elm_codegen$Elm$val = function (name) {
	return $mdgriffith$elm_codegen$Elm$value(
		{annotation: $elm$core$Maybe$Nothing, importFrom: _List_Nil, name: name});
};
var $author$project$Interactive$selectedExample = function () {
	var type_ = $mdgriffith$elm_codegen$Elm$Annotation$int;
	var typeName = 'SelectedExample';
	var recordName = 'selectedExample_';
	var msgName = 'SelectedExampleUpdated';
	return {
		get: $mdgriffith$elm_codegen$Elm$get(recordName),
		getMenuOpen: $mdgriffith$elm_codegen$Elm$get(recordName + '_menu'),
		init: _List_fromArray(
			[
				_Utils_Tuple2(
				recordName,
				$mdgriffith$elm_codegen$Elm$int(0)),
				_Utils_Tuple2(
				recordName + '_menu',
				$mdgriffith$elm_codegen$Elm$bool(false))
			]),
		model: _List_fromArray(
			[
				_Utils_Tuple2(recordName, type_),
				_Utils_Tuple2(recordName + '_menu', $mdgriffith$elm_codegen$Elm$Annotation$bool)
			]),
		msgs: _List_fromArray(
			[
				A2(
				$mdgriffith$elm_codegen$Elm$variantWith,
				msgName,
				_List_fromArray(
					[type_])),
				A2(
				$mdgriffith$elm_codegen$Elm$variantWith,
				msgName + '_MenuUpdated',
				_List_fromArray(
					[$mdgriffith$elm_codegen$Elm$Annotation$bool]))
			]),
		onClick: function (index) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$int]),
								$author$project$Interactive$appTypes.msg)),
						importFrom: _List_Nil,
						name: msgName
					}),
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$int(index)
					]));
		},
		toggleMenu: function (current) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$bool]),
								$author$project$Interactive$appTypes.msg)),
						importFrom: _List_Nil,
						name: msgName + '_MenuUpdated'
					}),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_codegen$Elm$apply,
						$mdgriffith$elm_codegen$Elm$val('not'),
						_List_fromArray(
							[current]))
					]));
		},
		type_: type_,
		updateBranch: function (model) {
			return A3(
				$mdgriffith$elm_codegen$Elm$Case$branch1,
				msgName,
				_Utils_Tuple2('newTab', type_),
				function (tab) {
					return A2(
						$mdgriffith$elm_codegen$Elm$tuple,
						A2(
							$mdgriffith$elm_codegen$Elm$updateRecord,
							_List_fromArray(
								[
									_Utils_Tuple2(recordName, tab)
								]),
							model),
						$author$project$Gen$App$Effect$none);
				});
		},
		updateMenuBranch: function (model) {
			return A3(
				$mdgriffith$elm_codegen$Elm$Case$branch1,
				msgName + '_MenuUpdated',
				_Utils_Tuple2('isOpen', type_),
				function (isOpen) {
					return A2(
						$mdgriffith$elm_codegen$Elm$tuple,
						A2(
							$mdgriffith$elm_codegen$Elm$updateRecord,
							_List_fromArray(
								[
									_Utils_Tuple2(recordName + '_menu', isOpen)
								]),
							model),
						$author$project$Gen$App$Effect$none);
				});
		}
	};
}();
var $author$project$Interactive$toModuleFields = function (mod) {
	return A2($elm$core$List$map, $author$project$Interactive$toModelField, mod.examples);
};
var $author$project$Interactive$toMsgVariantInteractive = function (interact) {
	return A2(
		$mdgriffith$elm_codegen$Elm$variantWith,
		interact.name,
		_List_fromArray(
			[
				$author$project$Interactive$fieldsToAnnotation(interact.fields)
			]));
};
var $author$project$Interactive$toMsgVariant = function (mod) {
	return A2($elm$core$List$map, $author$project$Interactive$toMsgVariantInteractive, mod.examples);
};
var $author$project$Interactive$logUpdate = function (model) {
	return A2(
		$mdgriffith$elm_codegen$Elm$Case$branch0,
		'Log',
		A2($mdgriffith$elm_codegen$Elm$tuple, model, $author$project$Gen$App$Effect$none));
};
var $author$project$Interactive$toMsgUpdateInteractive = F2(
	function (model, interact) {
		return A3(
			$mdgriffith$elm_codegen$Elm$Case$branch1,
			interact.name,
			_Utils_Tuple2(
				'updated',
				$author$project$Interactive$fieldsToAnnotation(interact.fields)),
			function (updated) {
				return A2(
					$mdgriffith$elm_codegen$Elm$tuple,
					A2(
						$mdgriffith$elm_codegen$Elm$updateRecord,
						_List_fromArray(
							[
								_Utils_Tuple2(interact.name, updated)
							]),
						model),
					$author$project$Gen$App$Effect$none);
			});
	});
var $author$project$Interactive$toMsgUpdate = F2(
	function (model, mod) {
		return A2(
			$elm$core$List$map,
			$author$project$Interactive$toMsgUpdateInteractive(model),
			mod.examples);
	});
var $author$project$Interactive$update = F3(
	function (modelAlias, mod, additional) {
		return A2(
			$mdgriffith$elm_codegen$Elm$declaration,
			'update',
			A3(
				$mdgriffith$elm_codegen$Elm$fn2,
				_Utils_Tuple2(
					'msg',
					$elm$core$Maybe$Just(
						A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Msg'))),
				_Utils_Tuple2(
					'model',
					$elm$core$Maybe$Just(modelAlias)),
				F2(
					function (msg, model) {
						return A2(
							$mdgriffith$elm_codegen$Elm$withType,
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$tuple,
								modelAlias,
								$author$project$Gen$App$Effect$annotation_.effect(
									A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Msg'))),
							A3(
								$mdgriffith$elm_codegen$Elm$Case$custom,
								msg,
								A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Msg'),
								A2(
									$elm$core$List$cons,
									$author$project$Interactive$logUpdate(model),
									A2(
										$elm$core$List$cons,
										additional.focus.updateBranch(model),
										A2(
											$elm$core$List$cons,
											additional.example.updateBranch(model),
											A2(
												$elm$core$List$cons,
												additional.example.updateMenuBranch(model),
												A2($author$project$Interactive$toMsgUpdate, model, mod)))))));
					})));
	});
var $author$project$Gen$App$View$moduleName_ = _List_fromArray(
	['App', 'View']);
var $author$project$Gen$App$View$annotation_ = {
	regions: function (regionsArg0) {
		return A4(
			$mdgriffith$elm_codegen$Elm$Annotation$alias,
			$author$project$Gen$App$View$moduleName_,
			'Regions',
			_List_fromArray(
				[regionsArg0]),
			$mdgriffith$elm_codegen$Elm$Annotation$record(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'primary',
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_Nil,
							'Maybe',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('view')
								]))),
						_Utils_Tuple2(
						'nav',
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_Nil,
							'Maybe',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('view')
								]))),
						_Utils_Tuple2(
						'detail',
						$mdgriffith$elm_codegen$Elm$Annotation$list(
							$mdgriffith$elm_codegen$Elm$Annotation$var('view')))
					])));
	},
	view: function (viewArg0) {
		return A4(
			$mdgriffith$elm_codegen$Elm$Annotation$alias,
			$author$project$Gen$App$View$moduleName_,
			'View',
			_List_fromArray(
				[viewArg0]),
			$mdgriffith$elm_codegen$Elm$Annotation$record(
				_List_fromArray(
					[
						_Utils_Tuple2('title', $mdgriffith$elm_codegen$Elm$Annotation$string),
						_Utils_Tuple2(
						'body',
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Html']),
							'Html',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))
					])));
	}
};
var $author$project$Gen$Ui$background = function (backgroundArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Color',
								_List_Nil)
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'background'
			}),
		_List_fromArray(
			[backgroundArg]));
};
var $author$project$Gen$Ui$below = function (belowArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Element',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									]))
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'below'
			}),
		_List_fromArray(
			[belowArg]));
};
var $author$project$Gen$Ui$Font$color = function (colorArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Color',
								_List_Nil)
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui', 'Font']),
				name: 'color'
			}),
		_List_fromArray(
			[colorArg]));
};
var $author$project$Gen$Ui$column = F2(
	function (columnArg, columnArg0) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Attribute',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))),
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Element',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											])))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Element',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'column'
				}),
			_List_fromArray(
				[
					$mdgriffith$elm_codegen$Elm$list(columnArg),
					$mdgriffith$elm_codegen$Elm$list(columnArg0)
				]));
	});
var $author$project$Gen$Ui$Font$family = function (familyArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Elm$Annotation$list(
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui', 'Font']),
									'Font',
									_List_Nil))
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui', 'Font']),
				name: 'family'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$list(familyArg)
			]));
};
var $author$project$Gen$Ui$fill = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Ui']),
				'Length',
				_List_Nil)),
		importFrom: _List_fromArray(
			['Ui']),
		name: 'fill'
	});
var $author$project$Gen$Ui$height = function (heightArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Length',
								_List_Nil)
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'height'
			}),
		_List_fromArray(
			[heightArg]));
};
var $author$project$Gen$Ui$htmlAttribute = function (htmlAttributeArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Html']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									]))
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'htmlAttribute'
			}),
		_List_fromArray(
			[htmlAttributeArg]));
};
var $author$project$Gen$Ui$inFront = function (inFrontArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Element',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									]))
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'inFront'
			}),
		_List_fromArray(
			[inFrontArg]));
};
var $author$project$Gen$Ui$layout = F2(
	function (layoutArg, layoutArg0) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Attribute',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))),
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Html']),
								'Html',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'layout'
				}),
			_List_fromArray(
				[
					$mdgriffith$elm_codegen$Elm$list(layoutArg),
					layoutArg0
				]));
	});
var $author$project$Gen$Ui$move = function (moveArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Position',
								_List_Nil)
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'move'
			}),
		_List_fromArray(
			[moveArg]));
};
var $author$project$Gen$Ui$none = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Ui']),
				'Element',
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
					]))),
		importFrom: _List_fromArray(
			['Ui']),
		name: 'none'
	});
var $author$project$Gen$Ui$padding = function (paddingArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[$mdgriffith$elm_codegen$Elm$Annotation$int]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'padding'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$int(paddingArg)
			]));
};
var $author$project$Gen$Ui$right = function (rightArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[$mdgriffith$elm_codegen$Elm$Annotation$int]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Position',
							_List_Nil))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'right'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$int(rightArg)
			]));
};
var $author$project$Gen$Ui$Font$sansSerif = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Ui', 'Font']),
				'Font',
				_List_Nil)),
		importFrom: _List_fromArray(
			['Ui', 'Font']),
		name: 'sansSerif'
	});
var $author$project$Gen$Ui$Font$size = function (sizeArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[$mdgriffith$elm_codegen$Elm$Annotation$int]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui', 'Font']),
				name: 'size'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$int(sizeArg)
			]));
};
var $author$project$Gen$Html$Attributes$style = F2(
	function (styleArg, styleArg0) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string, $mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Html']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Html', 'Attributes']),
					name: 'style'
				}),
			_List_fromArray(
				[
					$mdgriffith$elm_codegen$Elm$string(styleArg),
					$mdgriffith$elm_codegen$Elm$string(styleArg0)
				]));
	});
var $author$project$Gen$Ui$Font$typeface = function (typefaceArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[$mdgriffith$elm_codegen$Elm$Annotation$string]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui', 'Font']),
							'Font',
							_List_Nil))),
				importFrom: _List_fromArray(
					['Ui', 'Font']),
				name: 'typeface'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$string(typefaceArg)
			]));
};
var $author$project$Interactive$viewBody = F3(
	function (model, mod, additional) {
		var examplePicker = A2(
			$author$project$Gen$Ui$el,
			_List_fromArray(
				[
					$author$project$Gen$Ui$Font$size(24),
					A2($author$project$Gen$Ui$paddingXY, 32, 10),
					$author$project$Gen$Ui$pointer,
					$author$project$Gen$Ui$Font$family(
					_List_fromArray(
						[
							$author$project$Gen$Ui$Font$typeface('Fira Code'),
							$author$project$Gen$Ui$Font$sansSerif
						])),
					$author$project$Gen$Ui$Events$onClick(
					additional.example.toggleMenu(
						additional.example.getMenuOpen(model))),
					A3(
					$mdgriffith$elm_codegen$Elm$ifThen,
					additional.example.getMenuOpen(model),
					$author$project$Gen$Ui$below(
						A2(
							$author$project$Gen$Ui$column,
							_List_fromArray(
								[
									$author$project$Gen$Ui$padding(16),
									$author$project$Gen$Ui$move(
									$author$project$Gen$Ui$right(32)),
									$author$project$Gen$Ui$border(1),
									$author$project$Gen$Ui$rounded(4),
									$author$project$Gen$Ui$background(
									A3($author$project$Gen$Ui$rgb, 0, 0, 0)),
									$author$project$Gen$Ui$spacing(8)
								]),
							A2(
								$elm$core$List$indexedMap,
								F2(
									function (optionIndex, option) {
										return A2(
											$author$project$Gen$Ui$el,
											_List_fromArray(
												[
													$author$project$Gen$Ui$Events$onClick(
													additional.example.onClick(optionIndex))
												]),
											$author$project$Gen$Ui$text(option.name));
									}),
								mod.examples))),
					$author$project$Gen$Ui$pointer)
				]),
			$author$project$Gen$Ui$text('▶ ' + mod.name));
		return A2(
			$author$project$Gen$Ui$layout,
			_List_fromArray(
				[
					$author$project$Gen$Ui$htmlAttribute(
					A2($author$project$Gen$Html$Attributes$style, 'background', 'rgb(36,36,36)')),
					$author$project$Gen$Ui$Font$color(
					A3($author$project$Gen$Ui$rgb, 1, 1, 1)),
					$author$project$Gen$Ui$inFront(
					additional.focus.viewCall(model)),
					$author$project$Gen$Ui$Font$family(
					_List_fromArray(
						[
							$author$project$Gen$Ui$Font$typeface('Fira Code'),
							$author$project$Gen$Ui$Font$sansSerif
						]))
				]),
			A2(
				$author$project$Gen$Ui$column,
				_List_fromArray(
					[
						$author$project$Gen$Ui$height($author$project$Gen$Ui$fill),
						$author$project$Gen$Ui$spacing(16)
					]),
				A2(
					$elm$core$List$cons,
					examplePicker,
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (index, interact) {
								return A3(
									$mdgriffith$elm_codegen$Elm$ifThen,
									A2(
										$mdgriffith$elm_codegen$Elm$Op$equal,
										$mdgriffith$elm_codegen$Elm$int(index),
										additional.example.get(model)),
									A2(
										$author$project$Gen$Ui$column,
										_List_fromArray(
											[
												$author$project$Gen$Ui$height($author$project$Gen$Ui$fill)
											]),
										_List_fromArray(
											[
												A2(
												$mdgriffith$elm_codegen$Elm$apply,
												$mdgriffith$elm_codegen$Elm$val(
													'view' + $author$project$Interactive$capitalize(interact.name)),
												_List_fromArray(
													[
														model,
														A2($mdgriffith$elm_codegen$Elm$get, interact.name, model)
													]))
											])),
									$author$project$Gen$Ui$none);
							}),
						mod.examples))));
	});
var $author$project$Interactive$view = F3(
	function (modelAlias, mod, additional) {
		return A2(
			$mdgriffith$elm_codegen$Elm$declaration,
			'view',
			A2(
				$mdgriffith$elm_codegen$Elm$fn,
				_Utils_Tuple2(
					'model',
					$elm$core$Maybe$Just(modelAlias)),
				function (model) {
					return A2(
						$mdgriffith$elm_codegen$Elm$withType,
						$author$project$Gen$App$View$annotation_.view(
							A2($mdgriffith$elm_codegen$Elm$Annotation$named, _List_Nil, 'Msg')),
						$mdgriffith$elm_codegen$Elm$record(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'title',
									$mdgriffith$elm_codegen$Elm$string('Elm Interactive')),
									_Utils_Tuple2(
									'body',
									A3($author$project$Interactive$viewBody, model, mod, additional))
								])));
				}));
	});
var $author$project$Interactive$generate = F2(
	function (name, mod) {
		var focus = A2(
			$author$project$Interactive$codeOrOutput,
			mod,
			_List_fromArray(
				[mod]));
		var example = $author$project$Interactive$selectedExample;
		var modelType = $mdgriffith$elm_codegen$Elm$Annotation$record(
			A2(
				$elm$core$List$cons,
				focus.model,
				_Utils_ap(
					example.model,
					$author$project$Interactive$toModuleFields(mod))));
		var modelAlias = A4($mdgriffith$elm_codegen$Elm$Annotation$alias, _List_Nil, 'Model', _List_Nil, modelType);
		var additional = {example: example, focus: focus};
		return A2(
			$mdgriffith$elm_codegen$Elm$file,
			name,
			$elm$core$List$concat(
				_List_fromArray(
					[
						_List_fromArray(
						[
							$author$project$Interactive$page,
							focus.declaration,
							A2($mdgriffith$elm_codegen$Elm$alias, 'Model', modelType),
							A2($author$project$Interactive$init, mod, additional),
							A2(
							$mdgriffith$elm_codegen$Elm$customType,
							'Msg',
							A2(
								$elm$core$List$cons,
								$author$project$Interactive$logMsg,
								A2(
									$elm$core$List$cons,
									focus.msg,
									_Utils_ap(
										example.msgs,
										$author$project$Interactive$toMsgVariant(mod))))),
							A3($author$project$Interactive$update, modelAlias, mod, additional),
							focus.view.declaration,
							A3($author$project$Interactive$view, modelAlias, mod, additional)
						]),
						A2($author$project$Interactive$renderViewer, focus, mod)
					])));
	});
var $author$project$Interactive$InputBool = {$: 'InputBool'};
var $author$project$Interactive$bool = $author$project$Interactive$InputBool;
var $author$project$Example$Interactive$Build$genIdentity = A2(
	$mdgriffith$elm_codegen$Elm$fn,
	_Utils_Tuple2('a', $elm$core$Maybe$Nothing),
	function (a) {
		return a;
	});
var $mdgriffith$elm_codegen$Elm$Op$applyPipe = F4(
	function (_v0, infixAnnotation, l, r) {
		var symbol = _v0.a;
		var dir = _v0.b;
		return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
			function (index) {
				var _v1 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, index, l);
				var leftIndex = _v1.a;
				var left = _v1.b;
				var _v2 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, leftIndex, r);
				var rightIndex = _v2.a;
				var right = _v2.b;
				var annotationIndex = $mdgriffith$elm_codegen$Internal$Index$next(rightIndex);
				return {
					annotation: A3(
						$mdgriffith$elm_codegen$Internal$Compiler$applyType,
						index,
						$elm$core$Result$Ok(
							{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: $elm$core$Dict$empty, type_: infixAnnotation}),
						_List_fromArray(
							[left, right])),
					expression: A4(
						$stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication,
						symbol,
						dir,
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(left.expression),
						$mdgriffith$elm_codegen$Internal$Compiler$nodify(right.expression)),
					imports: _Utils_ap(left.imports, right.imports)
				};
			});
	});
var $mdgriffith$elm_codegen$Elm$Op$pipe = F2(
	function (r, l) {
		return A4(
			$mdgriffith$elm_codegen$Elm$Op$applyPipe,
			A3($mdgriffith$elm_codegen$Elm$Op$BinOp, '|>', $stil4m$elm_syntax$Elm$Syntax$Infix$Left, 0),
			A2(
				$mdgriffith$elm_codegen$Internal$Types$function,
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Internal$Types$var('a'),
						A2(
						$mdgriffith$elm_codegen$Internal$Types$function,
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Internal$Types$var('a')
							]),
						$mdgriffith$elm_codegen$Internal$Types$var('b'))
					]),
				$mdgriffith$elm_codegen$Internal$Types$var('b')),
			l,
			r);
	});
var $author$project$Example$Interactive$Build$applyBuilder = F2(
	function (_v0, value) {
		var includeBuilder = _v0.a;
		var builder = _v0.b;
		return A2(
			$mdgriffith$elm_codegen$Elm$Op$pipe,
			A3($mdgriffith$elm_codegen$Elm$ifThen, includeBuilder, builder, $author$project$Example$Interactive$Build$genIdentity),
			value);
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$Floatable = function (a) {
	return {$: 'Floatable', a: a};
};
var $mdgriffith$elm_codegen$Internal$Types$float = A2(
	$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
	$mdgriffith$elm_codegen$Internal$Types$nodify(
		_Utils_Tuple2(_List_Nil, 'Float')),
	_List_Nil);
var $mdgriffith$elm_codegen$Elm$float = function (floatVal) {
	return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
		function (_v0) {
			return {
				annotation: $elm$core$Result$Ok(
					{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: $elm$core$Dict$empty, type_: $mdgriffith$elm_codegen$Internal$Types$float}),
				expression: $stil4m$elm_syntax$Elm$Syntax$Expression$Floatable(floatVal),
				imports: _List_Nil
			};
		});
};
var $author$project$Interactive$InputFloat = {$: 'InputFloat'};
var $author$project$Interactive$float = $author$project$Interactive$InputFloat;
var $author$project$Example$Type$matchesName = F2(
	function (name, tipe) {
		switch (tipe.$) {
			case 'Type':
				var typeName = tipe.a;
				return _Utils_eq(typeName, name);
			case 'Lambda':
				var arg = tipe.a;
				var result = tipe.b;
				return A2($author$project$Example$Type$matchesName, name, arg) || A2($author$project$Example$Type$matchesName, name, result);
			default:
				return false;
		}
	});
var $author$project$Example$Type$isBuilderOfName = F2(
	function (name, tipe) {
		isBuilderOfName:
		while (true) {
			if (tipe.$ === 'Lambda') {
				var arg = tipe.a;
				var result = tipe.b;
				if (A2($author$project$Example$Type$matchesName, name, arg) && A2($author$project$Example$Type$matchesName, name, result)) {
					return true;
				} else {
					var $temp$name = name,
						$temp$tipe = result;
					name = $temp$name;
					tipe = $temp$tipe;
					continue isBuilderOfName;
				}
			} else {
				return false;
			}
		}
	});
var $author$project$Example$Type$getBuilderOf = F2(
	function (name, doc) {
		return A2($author$project$Example$Type$isBuilderOfName, name, doc.tipe) ? $elm$core$Maybe$Just(doc) : $elm$core$Maybe$Nothing;
	});
var $author$project$Interactive$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $author$project$Interactive$field = $author$project$Interactive$Field;
var $author$project$Example$Interactive$Build$getVal = F3(
	function (nameBase, options, context) {
		var arg = nameBase;
		return {
			context: _Utils_update(
				context,
				{
					fieldIndex: context.fieldIndex + 1,
					state: A2(
						$elm$core$List$cons,
						A2($author$project$Interactive$field, arg, options),
						context.state)
				}),
			drivenByModel: A2($mdgriffith$elm_codegen$Elm$get, arg, context.model)
		};
	});
var $author$project$Example$Interactive$Build$getValProtected = F3(
	function (nameBase, options, context) {
		var arg = _Utils_ap(
			nameBase,
			$elm$core$String$fromInt(context.fieldIndex));
		return {
			context: _Utils_update(
				context,
				{
					fieldIndex: context.fieldIndex + 1,
					state: A2(
						$elm$core$List$cons,
						A2($author$project$Interactive$field, arg, options),
						context.state)
				}),
			drivenByModel: A2($mdgriffith$elm_codegen$Elm$get, arg, context.model)
		};
	});
var $author$project$Interactive$InputInt = {$: 'InputInt'};
var $author$project$Interactive$int = $author$project$Interactive$InputInt;
var $author$project$Example$Type$isCreatorOf = F2(
	function (name, tipe) {
		isCreatorOf:
		while (true) {
			switch (tipe.$) {
				case 'Type':
					var typeName = tipe.a;
					return _Utils_eq(typeName, name);
				case 'Lambda':
					var arg = tipe.a;
					var result = tipe.b;
					if (A2($author$project$Example$Type$matchesName, name, arg)) {
						return false;
					} else {
						var $temp$name = name,
							$temp$tipe = result;
						name = $temp$name;
						tipe = $temp$tipe;
						continue isCreatorOf;
					}
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$getAnnotation = function (exp) {
	return exp.annotation;
};
var $mdgriffith$elm_codegen$Elm$maybe = function (maybeContent) {
	return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
		function (index) {
			if (maybeContent.$ === 'Nothing') {
				return {
					annotation: $elm$core$Result$Ok(
						A2(
							$mdgriffith$elm_codegen$Internal$Compiler$getInnerInference,
							index,
							$mdgriffith$elm_codegen$Elm$Annotation$maybe(
								$mdgriffith$elm_codegen$Elm$Annotation$var('a')))),
					expression: A2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue, _List_Nil, 'Nothing'),
					imports: _List_Nil
				};
			} else {
				var contentExp = maybeContent.a;
				var _v1 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, index, contentExp);
				var content = _v1.b;
				return {
					annotation: A2(
						$elm$core$Result$map,
						function (ann) {
							return {
								aliases: ann.aliases,
								inferences: ann.inferences,
								type_: A2(
									$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(
										_Utils_Tuple2(_List_Nil, 'Maybe')),
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Internal$Compiler$nodify(ann.type_)
										]))
							};
						},
						$mdgriffith$elm_codegen$Internal$Compiler$getAnnotation(content)),
					expression: $stil4m$elm_syntax$Elm$Syntax$Expression$Application(
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(
								A2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue, _List_Nil, 'Just')),
								$mdgriffith$elm_codegen$Internal$Compiler$nodify(
								$stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
									$mdgriffith$elm_codegen$Internal$Compiler$nodify(content.expression)))
							])),
					imports: $mdgriffith$elm_codegen$Internal$Compiler$getImports(content)
				};
			}
		});
};
var $mdgriffith$elm_codegen$Elm$just = function (content) {
	return $mdgriffith$elm_codegen$Elm$maybe(
		$elm$core$Maybe$Just(content));
};
var $author$project$Interactive$log = $mdgriffith$elm_codegen$Elm$value(
	{annotation: $elm$core$Maybe$Nothing, importFrom: _List_Nil, name: 'Log'});
var $author$project$Interactive$InputString = {$: 'InputString'};
var $author$project$Interactive$string = $author$project$Interactive$InputString;
var $elm$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		if (ra.$ === 'Err') {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 'Err') {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				if (rc.$ === 'Err') {
					var x = rc.a;
					return $elm$core$Result$Err(x);
				} else {
					var c = rc.a;
					return $elm$core$Result$Ok(
						A3(func, a, b, c));
				}
			}
		}
	});
var $mdgriffith$elm_codegen$Internal$Compiler$noImports = function (tipe) {
	return $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
		{aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, annotation: tipe, imports: _List_Nil});
};
var $mdgriffith$elm_codegen$Elm$Annotation$triple = F3(
	function (one, two, three) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Annotation(
			{
				aliases: A2(
					$mdgriffith$elm_codegen$Internal$Compiler$mergeAliases,
					A2(
						$mdgriffith$elm_codegen$Internal$Compiler$mergeAliases,
						$mdgriffith$elm_codegen$Elm$Annotation$getAliases(one),
						$mdgriffith$elm_codegen$Elm$Annotation$getAliases(two)),
					$mdgriffith$elm_codegen$Elm$Annotation$getAliases(three)),
				annotation: $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(
					$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(one),
								$mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(two),
								$mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(three)
							]))),
				imports: _Utils_ap(
					$mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(one),
					_Utils_ap(
						$mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(two),
						$mdgriffith$elm_codegen$Internal$Compiler$getAnnotationImports(three)))
			});
	});
var $mdgriffith$elm_codegen$Elm$triple = F3(
	function (oneExp, twoExp, threeExp) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
			function (index) {
				var _v0 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, index, oneExp);
				var oneIndex = _v0.a;
				var one = _v0.b;
				var _v1 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, oneIndex, twoExp);
				var twoIndex = _v1.a;
				var two = _v1.b;
				var _v2 = A2($mdgriffith$elm_codegen$Internal$Compiler$toExpressionDetails, twoIndex, threeExp);
				var threeIndex = _v2.a;
				var three = _v2.b;
				return {
					annotation: A4(
						$elm$core$Result$map3,
						F3(
							function (oneA, twoA, threeA) {
								return {
									aliases: A2(
										$mdgriffith$elm_codegen$Internal$Compiler$mergeAliases,
										threeA.aliases,
										A2($mdgriffith$elm_codegen$Internal$Compiler$mergeAliases, twoA.aliases, oneA.aliases)),
									inferences: A2(
										$mdgriffith$elm_codegen$Internal$Compiler$mergeInferences,
										threeA.inferences,
										A2($mdgriffith$elm_codegen$Internal$Compiler$mergeInferences, twoA.inferences, oneA.inferences)),
									type_: $mdgriffith$elm_codegen$Internal$Compiler$getInnerAnnotation(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$triple,
											$mdgriffith$elm_codegen$Internal$Compiler$noImports(oneA.type_),
											$mdgriffith$elm_codegen$Internal$Compiler$noImports(twoA.type_),
											$mdgriffith$elm_codegen$Internal$Compiler$noImports(threeA.type_)))
								};
							}),
						one.annotation,
						two.annotation,
						three.annotation),
					expression: $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression(
						$mdgriffith$elm_codegen$Internal$Compiler$nodifyAll(
							_List_fromArray(
								[one.expression, two.expression, three.expression]))),
					imports: _Utils_ap(
						one.imports,
						_Utils_ap(two.imports, three.imports))
				};
			});
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$UnitExpr = {$: 'UnitExpr'};
var $mdgriffith$elm_codegen$Internal$Compiler$inference = function (type_) {
	return {aliases: $mdgriffith$elm_codegen$Internal$Compiler$emptyAliases, inferences: $elm$core$Dict$empty, type_: type_};
};
var $mdgriffith$elm_codegen$Elm$unit = $mdgriffith$elm_codegen$Internal$Compiler$Expression(
	function (_v0) {
		return {
			annotation: $elm$core$Result$Ok(
				$mdgriffith$elm_codegen$Internal$Compiler$inference($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit)),
			expression: $stil4m$elm_syntax$Elm$Syntax$Expression$UnitExpr,
			imports: _List_Nil
		};
	});
var $author$project$Example$Interactive$Build$buildArg = F4(
	function (options, context, namespace, target) {
		_v5$6:
		while (true) {
			_v5$14:
			while (true) {
				switch (target.$) {
					case 'Var':
						if (target.a === 'msg') {
							return $elm$core$Result$Ok(
								{context: context, drivenByModel: $author$project$Interactive$log});
						} else {
							var _var = target.a;
							return $elm$core$Result$Err('I don\'t know how to build a ' + _var);
						}
					case 'Lambda':
						var arg = target.a;
						var result = target.b;
						return $elm$core$Result$Err('Nested lambdas');
					case 'Tuple':
						if (!target.a.b) {
							return $elm$core$Result$Ok(
								{context: context, drivenByModel: $mdgriffith$elm_codegen$Elm$unit});
						} else {
							if (target.a.b.b) {
								if (!target.a.b.b.b) {
									var _v6 = target.a;
									var one = _v6.a;
									var _v7 = _v6.b;
									var two = _v7.a;
									var _v8 = A4($author$project$Example$Interactive$Build$buildArg, options, context, namespace, one);
									if (_v8.$ === 'Ok') {
										var oneBuilt = _v8.a;
										var _v9 = A4($author$project$Example$Interactive$Build$buildArg, options, oneBuilt.context, namespace, two);
										if (_v9.$ === 'Ok') {
											var twoBuilt = _v9.a;
											return $elm$core$Result$Ok(
												{
													context: twoBuilt.context,
													drivenByModel: A2($mdgriffith$elm_codegen$Elm$tuple, oneBuilt.drivenByModel, twoBuilt.drivenByModel)
												});
										} else {
											var err = _v9.a;
											return $elm$core$Result$Err(err);
										}
									} else {
										var err = _v8.a;
										return $elm$core$Result$Err(err);
									}
								} else {
									if (!target.a.b.b.b.b) {
										var _v10 = target.a;
										var one = _v10.a;
										var _v11 = _v10.b;
										var two = _v11.a;
										var _v12 = _v11.b;
										var three = _v12.a;
										var _v13 = A4($author$project$Example$Interactive$Build$buildArg, options, context, namespace, one);
										if (_v13.$ === 'Ok') {
											var oneBuilt = _v13.a;
											var _v14 = A4($author$project$Example$Interactive$Build$buildArg, options, oneBuilt.context, namespace, two);
											if (_v14.$ === 'Ok') {
												var twoBuilt = _v14.a;
												var _v15 = A4($author$project$Example$Interactive$Build$buildArg, options, twoBuilt.context, namespace, three);
												if (_v15.$ === 'Ok') {
													var threeBuilt = _v15.a;
													return $elm$core$Result$Ok(
														{
															context: threeBuilt.context,
															drivenByModel: A3($mdgriffith$elm_codegen$Elm$triple, oneBuilt.drivenByModel, twoBuilt.drivenByModel, threeBuilt.drivenByModel)
														});
												} else {
													var err = _v15.a;
													return $elm$core$Result$Err(err);
												}
											} else {
												var err = _v14.a;
												return $elm$core$Result$Err(err);
											}
										} else {
											var err = _v13.a;
											return $elm$core$Result$Err(err);
										}
									} else {
										break _v5$6;
									}
								}
							} else {
								break _v5$6;
							}
						}
					case 'Type':
						if (!target.b.b) {
							switch (target.a) {
								case 'String.String':
									return $elm$core$Result$Ok(
										A3(
											$author$project$Example$Interactive$Build$getVal,
											namespace,
											{
												init: $mdgriffith$elm_codegen$Elm$string('Button'),
												input: $author$project$Interactive$string
											},
											context));
								case 'Basics.Boolean':
									return $elm$core$Result$Ok(
										A3(
											$author$project$Example$Interactive$Build$getVal,
											namespace,
											{
												init: $mdgriffith$elm_codegen$Elm$bool(true),
												input: $author$project$Interactive$bool
											},
											context));
								case 'Basics.Int':
									return $elm$core$Result$Ok(
										A3(
											$author$project$Example$Interactive$Build$getVal,
											namespace,
											{
												init: $mdgriffith$elm_codegen$Elm$int(1),
												input: $author$project$Interactive$int
											},
											context));
								case 'Basics.Float':
									return $elm$core$Result$Ok(
										A3(
											$author$project$Example$Interactive$Build$getVal,
											namespace,
											{
												init: $mdgriffith$elm_codegen$Elm$float(1),
												input: $author$project$Interactive$float
											},
											context));
								case 'Basics.Bool':
									return $elm$core$Result$Ok(
										A3(
											$author$project$Example$Interactive$Build$getVal,
											namespace,
											{
												init: $mdgriffith$elm_codegen$Elm$bool(true),
												input: $author$project$Interactive$bool
											},
											context));
								default:
									break _v5$14;
							}
						} else {
							if (!target.b.b.b) {
								switch (target.a) {
									case 'Maybe.Maybe':
										var _v16 = target.b;
										var inner = _v16.a;
										var _v17 = A4($author$project$Example$Interactive$Build$buildArg, options, context, namespace, inner);
										if (_v17.$ === 'Err') {
											var err = _v17.a;
											return $elm$core$Result$Err(err);
										} else {
											var innerExample = _v17.a;
											return $elm$core$Result$Ok(
												{
													context: innerExample.context,
													drivenByModel: $mdgriffith$elm_codegen$Elm$just(innerExample.drivenByModel)
												});
										}
									case 'List.List':
										var _v18 = target.b;
										var inner = _v18.a;
										var _v19 = A4($author$project$Example$Interactive$Build$buildArg, options, context, namespace, inner);
										if (_v19.$ === 'Err') {
											var err = _v19.a;
											return $elm$core$Result$Err(err);
										} else {
											var innerExample = _v19.a;
											return $elm$core$Result$Ok(
												{
													context: innerExample.context,
													drivenByModel: $mdgriffith$elm_codegen$Elm$list(
														_List_fromArray(
															[innerExample.drivenByModel]))
												});
										}
									default:
										break _v5$14;
								}
							} else {
								break _v5$14;
							}
						}
					default:
						var fields = target.a;
						var maybeName = target.b;
						var renderedResult = A3(
							$elm$core$List$foldl,
							F2(
								function (_v29, gathered) {
									var fieldName = _v29.a;
									var fieldType = _v29.b;
									if (gathered.$ === 'Err') {
										var err = gathered.a;
										return gathered;
									} else {
										var _v31 = gathered.a;
										var currentContext = _v31.a;
										var renderedFields = _v31.b;
										var _v32 = A4($author$project$Example$Interactive$Build$buildArg, options, currentContext, fieldName, fieldType);
										if (_v32.$ === 'Ok') {
											var fieldExample = _v32.a;
											return $elm$core$Result$Ok(
												_Utils_Tuple2(
													fieldExample.context,
													A2(
														$elm$core$List$cons,
														_Utils_Tuple2(fieldName, fieldExample.drivenByModel),
														renderedFields)));
										} else {
											var err = _v32.a;
											return $elm$core$Result$Err(err);
										}
									}
								}),
							$elm$core$Result$Ok(
								_Utils_Tuple2(context, _List_Nil)),
							fields);
						if (renderedResult.$ === 'Ok') {
							var _v28 = renderedResult.a;
							var newContext = _v28.a;
							var rendered = _v28.b;
							return $elm$core$Result$Ok(
								{
									context: newContext,
									drivenByModel: $mdgriffith$elm_codegen$Elm$record(rendered)
								});
						} else {
							var err = renderedResult.a;
							return $elm$core$Result$Err(err);
						}
				}
			}
			var name = target.a;
			var vars = target.b;
			return A3(
				$elm$core$List$foldl,
				F2(
					function (decl, buildResult) {
						if (buildResult.$ === 'Ok') {
							return buildResult;
						} else {
							if (A2($author$project$Example$Type$isCreatorOf, name, decl.tipe)) {
								if (options.allowOptionalIntermediates) {
									var _v21 = A3(
										$elm$core$List$foldl,
										F2(
											function (doc, untouched) {
												var ctxt = untouched.a;
												var existingBuilders = untouched.b;
												var _v22 = A2($author$project$Example$Type$getBuilderOf, name, doc);
												if (_v22.$ === 'Nothing') {
													return untouched;
												} else {
													var builder = _v22.a;
													var builtBuilderResult = A5(
														$author$project$Example$Interactive$Build$buildBuilder,
														{allowOptionalIntermediates: false},
														ctxt,
														builder,
														builder.tipe,
														_List_Nil);
													if (builtBuilderResult.$ === 'Err') {
														return untouched;
													} else {
														var builtBuilder = builtBuilderResult.a;
														var builderSwitch = A3(
															$author$project$Example$Interactive$Build$getValProtected,
															'includeBuilder',
															{
																init: $mdgriffith$elm_codegen$Elm$bool(false),
																input: $author$project$Interactive$bool
															},
															builtBuilder.context);
														return _Utils_Tuple2(
															builderSwitch.context,
															A2(
																$elm$core$List$cons,
																_Utils_Tuple2(builderSwitch.drivenByModel, builtBuilder.drivenByModel),
																existingBuilders));
													}
												}
											}),
										_Utils_Tuple2(context, _List_Nil),
										context.modul.values);
									var buildersContext = _v21.a;
									var builders = _v21.b;
									var exampleCall = A5(
										$author$project$Example$Interactive$Build$buildExampleCall,
										{allowOptionalIntermediates: false},
										buildersContext,
										{
											end: function (_v25) {
												return true;
											},
											start: decl
										},
										decl.tipe,
										_List_Nil);
									if (exampleCall.$ === 'Ok') {
										var builtValue = exampleCall.a;
										return $elm$core$Result$Ok(
											{
												context: builtValue.context,
												drivenByModel: A3($elm$core$List$foldl, $author$project$Example$Interactive$Build$applyBuilder, builtValue.drivenByModel, builders)
											});
									} else {
										var err = exampleCall.a;
										return $elm$core$Result$Err(err);
									}
								} else {
									return A5(
										$author$project$Example$Interactive$Build$buildExampleCall,
										{allowOptionalIntermediates: false},
										context,
										{
											end: function (_v26) {
												return true;
											},
											start: decl
										},
										decl.tipe,
										_List_Nil);
								}
							} else {
								return buildResult;
							}
						}
					}),
				$elm$core$Result$Err('I don\'t know how to build a ' + name),
				context.modul.values);
		}
		return $elm$core$Result$Err('I don\'t know how to build a tuple with values other than a 0, 2, and three.');
	});
var $author$project$Example$Interactive$Build$buildBuilder = F5(
	function (options, context, originalValue, targetType, args) {
		buildBuilder:
		while (true) {
			if (targetType.$ === 'Lambda') {
				if (targetType.b.$ === 'Lambda') {
					var arg = targetType.a;
					var result = targetType.b;
					var _v4 = A4($author$project$Example$Interactive$Build$buildArg, options, context, originalValue.name, arg);
					if (_v4.$ === 'Ok') {
						var argBuilt = _v4.a;
						var $temp$options = options,
							$temp$context = argBuilt.context,
							$temp$originalValue = originalValue,
							$temp$targetType = result,
							$temp$args = A2($elm$core$List$cons, argBuilt.drivenByModel, args);
						options = $temp$options;
						context = $temp$context;
						originalValue = $temp$originalValue;
						targetType = $temp$targetType;
						args = $temp$args;
						continue buildBuilder;
					} else {
						var err = _v4.a;
						return $elm$core$Result$Err(err);
					}
				} else {
					var arg = targetType.a;
					var result = targetType.b;
					return $elm$core$Result$Ok(
						{
							context: context,
							drivenByModel: A2(
								$mdgriffith$elm_codegen$Elm$apply,
								$mdgriffith$elm_codegen$Elm$value(
									{
										annotation: $elm$core$Maybe$Nothing,
										importFrom: A2($elm$core$String$split, '.', context.modul.name),
										name: originalValue.name
									}),
								$elm$core$List$reverse(args))
						});
				}
			} else {
				return A4($author$project$Example$Interactive$Build$buildArg, options, context, originalValue.name, targetType);
			}
		}
	});
var $author$project$Example$Interactive$Build$buildExampleCall = F5(
	function (options, context, bounds, targetType, args) {
		buildExampleCall:
		while (true) {
			if (targetType.$ === 'Lambda') {
				var arg = targetType.a;
				var result = targetType.b;
				var _v1 = A4($author$project$Example$Interactive$Build$buildArg, options, context, bounds.start.name, arg);
				if (_v1.$ === 'Ok') {
					var argBuilt = _v1.a;
					if (result.$ === 'Lambda') {
						var $temp$options = options,
							$temp$context = argBuilt.context,
							$temp$bounds = bounds,
							$temp$targetType = result,
							$temp$args = A2($elm$core$List$cons, argBuilt.drivenByModel, args);
						options = $temp$options;
						context = $temp$context;
						bounds = $temp$bounds;
						targetType = $temp$targetType;
						args = $temp$args;
						continue buildExampleCall;
					} else {
						return $elm$core$Result$Ok(
							{
								context: argBuilt.context,
								drivenByModel: A2(
									$mdgriffith$elm_codegen$Elm$apply,
									$mdgriffith$elm_codegen$Elm$value(
										{
											annotation: $elm$core$Maybe$Nothing,
											importFrom: A2($elm$core$String$split, '.', argBuilt.context.modul.name),
											name: bounds.start.name
										}),
									$elm$core$List$reverse(
										A2($elm$core$List$cons, argBuilt.drivenByModel, args)))
							});
					}
				} else {
					var err = _v1.a;
					return $elm$core$Result$Err(err);
				}
			} else {
				return $elm$core$Result$Ok(
					{
						context: context,
						drivenByModel: $mdgriffith$elm_codegen$Elm$value(
							{
								annotation: $elm$core$Maybe$Nothing,
								importFrom: A2($elm$core$String$split, '.', context.modul.name),
								name: bounds.start.name
							})
					});
			}
		}
	});
var $author$project$Interactive$fromType = function (tipe) {
	_v0$4:
	while (true) {
		if ((tipe.$ === 'Type') && (!tipe.b.b)) {
			switch (tipe.a) {
				case 'String.String':
					return $elm$core$Maybe$Just(
						{
							init: $mdgriffith$elm_codegen$Elm$string(''),
							input: $author$project$Interactive$InputString
						});
				case 'Basics.Bool':
					return $elm$core$Maybe$Just(
						{
							init: $mdgriffith$elm_codegen$Elm$bool(false),
							input: $author$project$Interactive$InputBool
						});
				case 'Basics.Int':
					return $elm$core$Maybe$Just(
						{
							init: $mdgriffith$elm_codegen$Elm$int(0),
							input: $author$project$Interactive$InputInt
						});
				case 'Basics.Float':
					return $elm$core$Maybe$Just(
						{
							init: $mdgriffith$elm_codegen$Elm$float(0),
							input: $author$project$Interactive$InputFloat
						});
				default:
					break _v0$4;
			}
		} else {
			break _v0$4;
		}
	}
	return $elm$core$Maybe$Nothing;
};
var $author$project$Example$Type$getArgsHelper = F2(
	function (tipe, found) {
		getArgsHelper:
		while (true) {
			if (tipe.$ === 'Lambda') {
				var arg = tipe.a;
				var result = tipe.b;
				var $temp$tipe = result,
					$temp$found = A2($elm$core$List$cons, arg, found);
				tipe = $temp$tipe;
				found = $temp$found;
				continue getArgsHelper;
			} else {
				return $elm$core$List$reverse(found);
			}
		}
	});
var $author$project$Example$Type$getArgs = function (tipe) {
	return A2($author$project$Example$Type$getArgsHelper, tipe, _List_Nil);
};
var $mdgriffith$elm_codegen$Elm$Case$maybe = F2(
	function (mainExpression, branches) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
			function (index) {
				var _v0 = A4(
					$mdgriffith$elm_codegen$Elm$Case$captureCase,
					mainExpression,
					_List_Nil,
					index,
					_List_fromArray(
						[
							$mdgriffith$elm_codegen$Internal$Branch$Branch(
							function (branchIndex) {
								return _Utils_Tuple3(
									branchIndex,
									A2(
										$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
										{moduleName: _List_Nil, name: 'Nothing'},
										_List_Nil),
									branches.nothing);
							}),
							$mdgriffith$elm_codegen$Internal$Branch$Branch(
							function (branchIndex) {
								var _v1 = branches.just;
								var justVarName = _v1.a;
								var toReturn = _v1.b;
								var just = A3($mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType, branchIndex, justVarName, $elm$core$Maybe$Nothing);
								return _Utils_Tuple3(
									just.index,
									A2(
										$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
										{moduleName: _List_Nil, name: 'Just'},
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(
												$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(just.name))
											])),
									toReturn(just.val));
							})
						]));
				var expr = _v0.a;
				var gathered = _v0.b;
				return {
					annotation: function () {
						var _v2 = gathered.annotation;
						if (_v2.$ === 'Nothing') {
							return $elm$core$Result$Err(
								_List_fromArray(
									[$mdgriffith$elm_codegen$Internal$Compiler$EmptyCaseStatement]));
						} else {
							var ann = _v2.a;
							return ann;
						}
					}(),
					expression: $stil4m$elm_syntax$Elm$Syntax$Expression$CaseExpression(
						{
							cases: $elm$core$List$reverse(gathered.cases),
							expression: $mdgriffith$elm_codegen$Internal$Compiler$nodify(expr.expression)
						}),
					imports: _Utils_ap(expr.imports, gathered.imports)
				};
			});
	});
var $author$project$Interactive$InputMaybe = function (a) {
	return {$: 'InputMaybe', a: a};
};
var $author$project$Interactive$maybe = $author$project$Interactive$InputMaybe;
var $author$project$Example$CallStack$name = function (_v0) {
	var call = _v0.a;
	return call.start.name;
};
var $mdgriffith$elm_codegen$Elm$nothing = $mdgriffith$elm_codegen$Elm$maybe($elm$core$Maybe$Nothing);
var $author$project$Example$CallStack$start = function (_v0) {
	var call = _v0.a;
	return call.start;
};
var $author$project$Example$Interactive$Build$buildHelper = F3(
	function (options, context, _v0) {
		var callstack = _v0.a;
		var starterCall = options.piped ? A5(
			$author$project$Example$Interactive$Build$buildBuilder,
			{allowOptionalIntermediates: options.allowOptionalIntermediates},
			context,
			callstack.start,
			callstack.start.tipe,
			_List_Nil) : A5(
			$author$project$Example$Interactive$Build$buildExampleCall,
			{allowOptionalIntermediates: options.allowOptionalIntermediates},
			context,
			{
				end: function (_v7) {
					return true;
				},
				start: callstack.start
			},
			callstack.start.tipe,
			_List_Nil);
		if (starterCall.$ === 'Ok') {
			var call = starterCall.a;
			return A3(
				$elm$core$List$foldl,
				F2(
					function (step, builtResult) {
						if (builtResult.$ === 'Ok') {
							var built = builtResult.a;
							if (step.required) {
								var _v3 = A3(
									$author$project$Example$Interactive$Build$buildHelper,
									_Utils_update(
										options,
										{piped: true}),
									built.context,
									step.step);
								if (_v3.$ === 'Ok') {
									var builtStep = _v3.a;
									return $elm$core$Result$Ok(
										{
											context: builtStep.context,
											drivenByModel: A2($mdgriffith$elm_codegen$Elm$Op$pipe, builtStep.drivenByModel, built.drivenByModel)
										});
								} else {
									var err = _v3.a;
									return $elm$core$Result$Err(err);
								}
							} else {
								var _v4 = $author$project$Example$Type$getArgs(
									$author$project$Example$CallStack$start(step.step).tipe);
								_v4$2:
								while (true) {
									if (_v4.b) {
										if (!_v4.b.b) {
											var boolVal = A3(
												$author$project$Example$Interactive$Build$getVal,
												$author$project$Example$CallStack$name(step.step),
												{
													init: $mdgriffith$elm_codegen$Elm$bool(false),
													input: $author$project$Interactive$bool
												},
												built.context);
											return $elm$core$Result$Ok(
												{
													context: boolVal.context,
													drivenByModel: A2(
														$mdgriffith$elm_codegen$Elm$Op$pipe,
														A3(
															$mdgriffith$elm_codegen$Elm$ifThen,
															boolVal.drivenByModel,
															$mdgriffith$elm_codegen$Elm$value(
																{
																	annotation: $elm$core$Maybe$Nothing,
																	importFrom: A2($elm$core$String$split, '.', context.modul.name),
																	name: $author$project$Example$CallStack$name(step.step)
																}),
															$author$project$Example$Interactive$Build$genIdentity),
														built.drivenByModel)
												});
										} else {
											if (!_v4.b.b.b) {
												var argType = _v4.a;
												var _v5 = _v4.b;
												var _v6 = $author$project$Interactive$fromType(argType);
												if (_v6.$ === 'Nothing') {
													return builtResult;
												} else {
													var input = _v6.a;
													var maybeVal = A3(
														$author$project$Example$Interactive$Build$getVal,
														$author$project$Example$CallStack$name(step.step),
														{
															init: $mdgriffith$elm_codegen$Elm$nothing,
															input: $author$project$Interactive$maybe(input.input)
														},
														built.context);
													return $elm$core$Result$Ok(
														{
															context: maybeVal.context,
															drivenByModel: A2(
																$mdgriffith$elm_codegen$Elm$Op$pipe,
																A2(
																	$mdgriffith$elm_codegen$Elm$Case$maybe,
																	maybeVal.drivenByModel,
																	{
																		just: _Utils_Tuple2(
																			$author$project$Example$CallStack$name(step.step) + '_option',
																			function (val) {
																				return A2(
																					$mdgriffith$elm_codegen$Elm$apply,
																					$mdgriffith$elm_codegen$Elm$value(
																						{
																							annotation: $elm$core$Maybe$Nothing,
																							importFrom: A2($elm$core$String$split, '.', context.modul.name),
																							name: $author$project$Example$CallStack$name(step.step)
																						}),
																					_List_fromArray(
																						[val]));
																			}),
																		nothing: $author$project$Example$Interactive$Build$genIdentity
																	}),
																built.drivenByModel)
														});
												}
											} else {
												break _v4$2;
											}
										}
									} else {
										break _v4$2;
									}
								}
								return builtResult;
							}
						} else {
							var err = builtResult.a;
							return $elm$core$Result$Err(err);
						}
					}),
				$elm$core$Result$Ok(call),
				$elm$core$List$reverse(callstack.steps));
		} else {
			var err = starterCall.a;
			return $elm$core$Result$Err(err);
		}
	});
var $author$project$Example$Interactive$Build$initContext = function (modul) {
	return {
		fieldIndex: 0,
		model: $mdgriffith$elm_codegen$Elm$value(
			{annotation: $elm$core$Maybe$Nothing, importFrom: _List_Nil, name: 'model'}),
		modul: modul,
		state: _List_Nil
	};
};
var $author$project$Example$Interactive$Build$build = F2(
	function (mod, callstack) {
		return A3(
			$author$project$Example$Interactive$Build$buildHelper,
			{allowOptionalIntermediates: true, piped: false},
			$author$project$Example$Interactive$Build$initContext(mod),
			callstack);
	});
var $author$project$Gen$Elm$apply = F2(
	function (applyArg, applyArg0) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil),
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'apply'
				}),
			_List_fromArray(
				[
					applyArg,
					$mdgriffith$elm_codegen$Elm$list(applyArg0)
				]));
	});
var $author$project$Example$Interactive$Rendered$genIdentity = A2(
	$mdgriffith$elm_codegen$Elm$fn,
	_Utils_Tuple2('a', $elm$core$Maybe$Nothing),
	function (a) {
		return a;
	});
var $author$project$Example$Interactive$Rendered$applyBuilder = F2(
	function (_v0, value) {
		var includeBuilder = _v0.a;
		var builder = _v0.b;
		return A2(
			$mdgriffith$elm_codegen$Elm$Op$pipe,
			A3($mdgriffith$elm_codegen$Elm$ifThen, includeBuilder, builder, $author$project$Example$Interactive$Rendered$genIdentity),
			value);
	});
var $mdgriffith$elm_codegen$Elm$Annotation$char = A3(
	$mdgriffith$elm_codegen$Elm$Annotation$typed,
	_List_fromArray(
		['Char']),
	'Char',
	_List_Nil);
var $author$project$Gen$Elm$call_ = {
	alias: F2(
		function (aliasArg, aliasArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm', 'Annotation']),
										'Annotation',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Declaration',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'alias'
					}),
				_List_fromArray(
					[aliasArg, aliasArg0]));
		}),
	apply: F2(
		function (applyArg, applyArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil),
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Expression',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'apply'
					}),
				_List_fromArray(
					[applyArg, applyArg0]));
		}),
	bool: function (boolArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$bool]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'bool'
				}),
			_List_fromArray(
				[boolArg]));
	},
	_char: function (charArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$char]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'char'
				}),
			_List_fromArray(
				[charArg]));
	},
	comment: function (commentArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Declaration',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'comment'
				}),
			_List_fromArray(
				[commentArg]));
	},
	customType: F2(
		function (customTypeArg, customTypeArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Variant',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Declaration',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'customType'
					}),
				_List_fromArray(
					[customTypeArg, customTypeArg0]));
		}),
	declaration: F2(
		function (declarationArg, declarationArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Declaration',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'declaration'
					}),
				_List_fromArray(
					[declarationArg, declarationArg0]));
		}),
	docs: function (docsArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'group',
											$mdgriffith$elm_codegen$Elm$Annotation$maybe($mdgriffith$elm_codegen$Elm$Annotation$string)),
											_Utils_Tuple2(
											'members',
											$mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$string))
										]))
								]),
							$mdgriffith$elm_codegen$Elm$Annotation$string)),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'docs'
				}),
			_List_fromArray(
				[docsArg]));
	},
	expose: function (exposeArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Declaration',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Declaration',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'expose'
				}),
			_List_fromArray(
				[exposeArg]));
	},
	exposeWith: F2(
		function (exposeWithArg, exposeWithArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$record(
										_List_fromArray(
											[
												_Utils_Tuple2('exposeConstructor', $mdgriffith$elm_codegen$Elm$Annotation$bool),
												_Utils_Tuple2(
												'group',
												$mdgriffith$elm_codegen$Elm$Annotation$maybe($mdgriffith$elm_codegen$Elm$Annotation$string))
											])),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Declaration',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Declaration',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'exposeWith'
					}),
				_List_fromArray(
					[exposeWithArg, exposeWithArg0]));
		}),
	file: F2(
		function (fileArg, fileArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$string),
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Declaration',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'File',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'file'
					}),
				_List_fromArray(
					[fileArg, fileArg0]));
		}),
	fileWith: F3(
		function (fileWithArg, fileWithArg0, fileWithArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$string),
										$mdgriffith$elm_codegen$Elm$Annotation$record(
										_List_fromArray(
											[
												_Utils_Tuple2(
												'docs',
												A2(
													$mdgriffith$elm_codegen$Elm$Annotation$function,
													_List_fromArray(
														[
															$mdgriffith$elm_codegen$Elm$Annotation$list(
															$mdgriffith$elm_codegen$Elm$Annotation$record(
																_List_fromArray(
																	[
																		_Utils_Tuple2(
																		'group',
																		$mdgriffith$elm_codegen$Elm$Annotation$maybe($mdgriffith$elm_codegen$Elm$Annotation$string)),
																		_Utils_Tuple2(
																		'members',
																		$mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$string))
																	])))
														]),
													$mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$string))),
												_Utils_Tuple2(
												'aliases',
												$mdgriffith$elm_codegen$Elm$Annotation$list(
													A2(
														$mdgriffith$elm_codegen$Elm$Annotation$tuple,
														$mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$string),
														$mdgriffith$elm_codegen$Elm$Annotation$string)))
											])),
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Declaration',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'File',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'fileWith'
					}),
				_List_fromArray(
					[fileWithArg, fileWithArg0, fileWithArg1]));
		}),
	_float: function (floatArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$float]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'float'
				}),
			_List_fromArray(
				[floatArg]));
	},
	fn: F2(
		function (fnArg, fnArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil)
											]),
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Expression',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'fn'
					}),
				_List_fromArray(
					[fnArg, fnArg0]));
		}),
	fn2: F3(
		function (fn2Arg, fn2Arg0, fn2Arg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil)
											]),
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Expression',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'fn2'
					}),
				_List_fromArray(
					[fn2Arg, fn2Arg0, fn2Arg1]));
		}),
	fn3: F4(
		function (fn3Arg, fn3Arg0, fn3Arg1, fn3Arg2) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil)
											]),
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Expression',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'fn3'
					}),
				_List_fromArray(
					[fn3Arg, fn3Arg0, fn3Arg1, fn3Arg2]));
		}),
	fn4: F5(
		function (fn4Arg, fn4Arg0, fn4Arg1, fn4Arg2, fn4Arg3) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil)
											]),
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Expression',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'fn4'
					}),
				_List_fromArray(
					[fn4Arg, fn4Arg0, fn4Arg1, fn4Arg2, fn4Arg3]));
		}),
	fn5: F6(
		function (fn5Arg, fn5Arg0, fn5Arg1, fn5Arg2, fn5Arg3, fn5Arg4) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil)
											]),
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Expression',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'fn5'
					}),
				_List_fromArray(
					[fn5Arg, fn5Arg0, fn5Arg1, fn5Arg2, fn5Arg3, fn5Arg4]));
		}),
	fn6: F7(
		function (fn6Arg, fn6Arg0, fn6Arg1, fn6Arg2, fn6Arg3, fn6Arg4, fn6Arg5) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil),
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil)
											]),
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Expression',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'fn6'
					}),
				_List_fromArray(
					[fn6Arg, fn6Arg0, fn6Arg1, fn6Arg2, fn6Arg3, fn6Arg4, fn6Arg5]));
		}),
	_function: F2(
		function (functionArg, functionArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A2(
											$mdgriffith$elm_codegen$Elm$Annotation$tuple,
											$mdgriffith$elm_codegen$Elm$Annotation$string,
											$mdgriffith$elm_codegen$Elm$Annotation$maybe(
												A3(
													$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
													_List_fromArray(
														['Elm', 'Annotation']),
													'Annotation',
													_List_Nil)))),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$list(
												A3(
													$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
													_List_fromArray(
														['Elm']),
													'Expression',
													_List_Nil))
											]),
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Expression',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'function'
					}),
				_List_fromArray(
					[functionArg, functionArg0]));
		}),
	functionReduced: F2(
		function (functionReducedArg, functionReducedArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil)
											]),
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Expression',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'functionReduced'
					}),
				_List_fromArray(
					[functionReducedArg, functionReducedArg0]));
		}),
	get: F2(
		function (getArg, getArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'get'
					}),
				_List_fromArray(
					[getArg, getArg0]));
		}),
	hex: function (hexArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'hex'
				}),
			_List_fromArray(
				[hexArg]));
	},
	ifThen: F3(
		function (ifThenArg, ifThenArg0, ifThenArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'ifThen'
					}),
				_List_fromArray(
					[ifThenArg, ifThenArg0, ifThenArg1]));
		}),
	_int: function (intArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'int'
				}),
			_List_fromArray(
				[intArg]));
	},
	just: function (justArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'just'
				}),
			_List_fromArray(
				[justArg]));
	},
	list: function (listArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'list'
				}),
			_List_fromArray(
				[listArg]));
	},
	maybe: function (maybeArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$maybe(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'maybe'
				}),
			_List_fromArray(
				[maybeArg]));
	},
	parse: function (parseArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Result']),
								'Result',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$record(
										_List_fromArray(
											[
												_Utils_Tuple2(
												'declarations',
												$mdgriffith$elm_codegen$Elm$Annotation$list(
													A3(
														$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
														_List_fromArray(
															['Elm']),
														'Declaration',
														_List_Nil)))
											]))
									])))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'parse'
				}),
			_List_fromArray(
				[parseArg]));
	},
	portIncoming: F2(
		function (portIncomingArg, portIncomingArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm', 'Annotation']),
											'Annotation',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Declaration',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'portIncoming'
					}),
				_List_fromArray(
					[portIncomingArg, portIncomingArg0]));
		}),
	portOutgoing: F2(
		function (portOutgoingArg, portOutgoingArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm', 'Annotation']),
										'Annotation',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Declaration',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'portOutgoing'
					}),
				_List_fromArray(
					[portOutgoingArg, portOutgoingArg0]));
		}),
	record: function (recordArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A2(
										$mdgriffith$elm_codegen$Elm$Annotation$tuple,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm']),
											'Expression',
											_List_Nil)))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'record'
				}),
			_List_fromArray(
				[recordArg]));
	},
	string: function (stringArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'string'
				}),
			_List_fromArray(
				[stringArg]));
	},
	toString: function (toStringArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil)
								]),
							$mdgriffith$elm_codegen$Elm$Annotation$string)),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'toString'
				}),
			_List_fromArray(
				[toStringArg]));
	},
	triple: F3(
		function (tripleArg, tripleArg0, tripleArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'triple'
					}),
				_List_fromArray(
					[tripleArg, tripleArg0, tripleArg1]));
		}),
	tuple: F2(
		function (tupleArg, tupleArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'tuple'
					}),
				_List_fromArray(
					[tupleArg, tupleArg0]));
		}),
	unsafe: function (unsafeArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Declaration',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'unsafe'
				}),
			_List_fromArray(
				[unsafeArg]));
	},
	unwrap: F3(
		function (unwrapArg, unwrapArg0, unwrapArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$string),
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'unwrap'
					}),
				_List_fromArray(
					[unwrapArg, unwrapArg0, unwrapArg1]));
		}),
	unwrapper: F2(
		function (unwrapperArg, unwrapperArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$string),
										$mdgriffith$elm_codegen$Elm$Annotation$string
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'unwrapper'
					}),
				_List_fromArray(
					[unwrapperArg, unwrapperArg0]));
		}),
	updateRecord: F2(
		function (updateRecordArg, updateRecordArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A2(
											$mdgriffith$elm_codegen$Elm$Annotation$tuple,
											$mdgriffith$elm_codegen$Elm$Annotation$string,
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm']),
												'Expression',
												_List_Nil))),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'updateRecord'
					}),
				_List_fromArray(
					[updateRecordArg, updateRecordArg0]));
		}),
	val: function (valArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'val'
				}),
			_List_fromArray(
				[valArg]));
	},
	value: function (valueArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'importFrom',
											$mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$string)),
											_Utils_Tuple2('name', $mdgriffith$elm_codegen$Elm$Annotation$string),
											_Utils_Tuple2(
											'annotation',
											$mdgriffith$elm_codegen$Elm$Annotation$maybe(
												A3(
													$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
													_List_fromArray(
														['Elm', 'Annotation']),
													'Annotation',
													_List_Nil)))
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'value'
				}),
			_List_fromArray(
				[valueArg]));
	},
	variant: function (variantArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Variant',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm']),
					name: 'variant'
				}),
			_List_fromArray(
				[variantArg]));
	},
	variantWith: F2(
		function (variantWithArg, variantWithArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Elm', 'Annotation']),
											'Annotation',
											_List_Nil))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Variant',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'variantWith'
					}),
				_List_fromArray(
					[variantWithArg, variantWithArg0]));
		}),
	withDocumentation: F2(
		function (withDocumentationArg, withDocumentationArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Declaration',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Declaration',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'withDocumentation'
					}),
				_List_fromArray(
					[withDocumentationArg, withDocumentationArg0]));
		}),
	withType: F2(
		function (withTypeArg, withTypeArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm', 'Annotation']),
										'Annotation',
										_List_Nil),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Elm']),
						name: 'withType'
					}),
				_List_fromArray(
					[withTypeArg, withTypeArg0]));
		})
};
var $author$project$Gen$Elm$nothing = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Elm']),
				'Expression',
				_List_Nil)),
		importFrom: _List_fromArray(
			['Elm']),
		name: 'nothing'
	});
var $author$project$Example$Interactive$Rendered$inputToLiteral = F2(
	function (input, exp) {
		switch (input.$) {
			case 'InputString':
				return $author$project$Gen$Elm$call_.string(exp);
			case 'InputBool':
				return $author$project$Gen$Elm$call_.bool(exp);
			case 'InputInt':
				return $author$project$Gen$Elm$call_._int(exp);
			case 'InputFloat':
				return $author$project$Gen$Elm$call_._float(exp);
			default:
				var inner = input.a;
				return $author$project$Gen$Elm$nothing;
		}
	});
var $author$project$Example$Interactive$Rendered$getVal = F3(
	function (nameBase, options, context) {
		var arg = nameBase;
		return {
			context: _Utils_update(
				context,
				{fieldIndex: context.fieldIndex + 1}),
			drivenByModel: A2(
				$author$project$Example$Interactive$Rendered$inputToLiteral,
				options.input,
				A2($mdgriffith$elm_codegen$Elm$get, arg, context.model))
		};
	});
var $author$project$Example$Interactive$Rendered$getValProtected = F3(
	function (nameBase, options, context) {
		var arg = _Utils_ap(
			nameBase,
			$elm$core$String$fromInt(context.fieldIndex));
		return {
			context: _Utils_update(
				context,
				{
					fieldIndex: context.fieldIndex + 1,
					state: A2(
						$elm$core$List$cons,
						A2($author$project$Interactive$field, arg, options),
						context.state)
				}),
			drivenByModel: A2($mdgriffith$elm_codegen$Elm$get, arg, context.model)
		};
	});
var $author$project$Gen$Elm$Op$pipe = F2(
	function (pipeArg, pipeArg0) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil),
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Elm']),
									'Expression',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Elm', 'Op']),
					name: 'pipe'
				}),
			_List_fromArray(
				[pipeArg, pipeArg0]));
	});
var $author$project$Gen$Elm$record = function (recordArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Elm$Annotation$list(
								A2(
									$mdgriffith$elm_codegen$Elm$Annotation$tuple,
									$mdgriffith$elm_codegen$Elm$Annotation$string,
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Elm']),
										'Expression',
										_List_Nil)))
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Elm']),
							'Expression',
							_List_Nil))),
				importFrom: _List_fromArray(
					['Elm']),
				name: 'record'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$list(recordArg)
			]));
};
var $author$project$Gen$Elm$value = function (valueArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								$mdgriffith$elm_codegen$Elm$Annotation$record(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'importFrom',
										$mdgriffith$elm_codegen$Elm$Annotation$list($mdgriffith$elm_codegen$Elm$Annotation$string)),
										_Utils_Tuple2('name', $mdgriffith$elm_codegen$Elm$Annotation$string),
										_Utils_Tuple2(
										'annotation',
										$mdgriffith$elm_codegen$Elm$Annotation$maybe(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Elm', 'Annotation']),
												'Annotation',
												_List_Nil)))
									]))
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Elm']),
							'Expression',
							_List_Nil))),
				importFrom: _List_fromArray(
					['Elm']),
				name: 'value'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$record(
				_List_fromArray(
					[
						A2(
						$elm$core$Tuple$pair,
						'importFrom',
						$mdgriffith$elm_codegen$Elm$list(
							A2($elm$core$List$map, $mdgriffith$elm_codegen$Elm$string, valueArg.importFrom))),
						A2(
						$elm$core$Tuple$pair,
						'name',
						$mdgriffith$elm_codegen$Elm$string(valueArg.name)),
						A2($elm$core$Tuple$pair, 'annotation', valueArg.annotation)
					]))
			]));
};
var $author$project$Example$Interactive$Rendered$buildArg = F4(
	function (options, context, namespace, target) {
		_v5$6:
		while (true) {
			_v5$13:
			while (true) {
				switch (target.$) {
					case 'Var':
						if (target.a === 'msg') {
							return $elm$core$Result$Ok(
								{
									context: context,
									drivenByModel: $author$project$Gen$Elm$value(
										{annotation: $mdgriffith$elm_codegen$Elm$nothing, importFrom: _List_Nil, name: 'Log'})
								});
						} else {
							var _var = target.a;
							return $elm$core$Result$Err('I don\'t know how to build a ' + _var);
						}
					case 'Lambda':
						var arg = target.a;
						var result = target.b;
						return $elm$core$Result$Err('Nested lambdas');
					case 'Tuple':
						if (!target.a.b) {
							return $elm$core$Result$Ok(
								{context: context, drivenByModel: $mdgriffith$elm_codegen$Elm$unit});
						} else {
							if (target.a.b.b) {
								if (!target.a.b.b.b) {
									var _v6 = target.a;
									var one = _v6.a;
									var _v7 = _v6.b;
									var two = _v7.a;
									var _v8 = A4($author$project$Example$Interactive$Rendered$buildArg, options, context, namespace, one);
									if (_v8.$ === 'Ok') {
										var oneBuilt = _v8.a;
										var _v9 = A4($author$project$Example$Interactive$Rendered$buildArg, options, oneBuilt.context, namespace, two);
										if (_v9.$ === 'Ok') {
											var twoBuilt = _v9.a;
											return $elm$core$Result$Ok(
												{
													context: twoBuilt.context,
													drivenByModel: A2($mdgriffith$elm_codegen$Elm$tuple, oneBuilt.drivenByModel, twoBuilt.drivenByModel)
												});
										} else {
											var err = _v9.a;
											return $elm$core$Result$Err(err);
										}
									} else {
										var err = _v8.a;
										return $elm$core$Result$Err(err);
									}
								} else {
									if (!target.a.b.b.b.b) {
										var _v10 = target.a;
										var one = _v10.a;
										var _v11 = _v10.b;
										var two = _v11.a;
										var _v12 = _v11.b;
										var three = _v12.a;
										var _v13 = A4($author$project$Example$Interactive$Rendered$buildArg, options, context, namespace, one);
										if (_v13.$ === 'Ok') {
											var oneBuilt = _v13.a;
											var _v14 = A4($author$project$Example$Interactive$Rendered$buildArg, options, oneBuilt.context, namespace, two);
											if (_v14.$ === 'Ok') {
												var twoBuilt = _v14.a;
												var _v15 = A4($author$project$Example$Interactive$Rendered$buildArg, options, twoBuilt.context, namespace, three);
												if (_v15.$ === 'Ok') {
													var threeBuilt = _v15.a;
													return $elm$core$Result$Ok(
														{
															context: threeBuilt.context,
															drivenByModel: A3($mdgriffith$elm_codegen$Elm$triple, oneBuilt.drivenByModel, twoBuilt.drivenByModel, threeBuilt.drivenByModel)
														});
												} else {
													var err = _v15.a;
													return $elm$core$Result$Err(err);
												}
											} else {
												var err = _v14.a;
												return $elm$core$Result$Err(err);
											}
										} else {
											var err = _v13.a;
											return $elm$core$Result$Err(err);
										}
									} else {
										break _v5$6;
									}
								}
							} else {
								break _v5$6;
							}
						}
					case 'Type':
						if (!target.b.b) {
							switch (target.a) {
								case 'String.String':
									return $elm$core$Result$Ok(
										A3(
											$author$project$Example$Interactive$Rendered$getVal,
											namespace,
											{
												init: $mdgriffith$elm_codegen$Elm$string(''),
												input: $author$project$Interactive$string
											},
											context));
								case 'Basics.Boolean':
									return $elm$core$Result$Ok(
										A3(
											$author$project$Example$Interactive$Rendered$getVal,
											namespace,
											{
												init: $mdgriffith$elm_codegen$Elm$bool(true),
												input: $author$project$Interactive$bool
											},
											context));
								case 'Basics.Int':
									return $elm$core$Result$Ok(
										A3(
											$author$project$Example$Interactive$Rendered$getVal,
											namespace,
											{
												init: $mdgriffith$elm_codegen$Elm$int(1),
												input: $author$project$Interactive$int
											},
											context));
								case 'Basics.Float':
									return $elm$core$Result$Ok(
										A3(
											$author$project$Example$Interactive$Rendered$getVal,
											namespace,
											{
												init: $mdgriffith$elm_codegen$Elm$float(1),
												input: $author$project$Interactive$float
											},
											context));
								default:
									break _v5$13;
							}
						} else {
							if (!target.b.b.b) {
								switch (target.a) {
									case 'Maybe.Maybe':
										var _v16 = target.b;
										var inner = _v16.a;
										var _v17 = A4($author$project$Example$Interactive$Rendered$buildArg, options, context, namespace, inner);
										if (_v17.$ === 'Err') {
											var err = _v17.a;
											return $elm$core$Result$Err(err);
										} else {
											var innerExample = _v17.a;
											return $elm$core$Result$Ok(
												{
													context: innerExample.context,
													drivenByModel: $mdgriffith$elm_codegen$Elm$just(innerExample.drivenByModel)
												});
										}
									case 'List.List':
										var _v18 = target.b;
										var inner = _v18.a;
										var _v19 = A4($author$project$Example$Interactive$Rendered$buildArg, options, context, namespace, inner);
										if (_v19.$ === 'Err') {
											var err = _v19.a;
											return $elm$core$Result$Err(err);
										} else {
											var innerExample = _v19.a;
											return $elm$core$Result$Ok(
												{
													context: innerExample.context,
													drivenByModel: $mdgriffith$elm_codegen$Elm$list(
														_List_fromArray(
															[innerExample.drivenByModel]))
												});
										}
									default:
										break _v5$13;
								}
							} else {
								break _v5$13;
							}
						}
					default:
						var fields = target.a;
						var maybeName = target.b;
						var renderedResult = A3(
							$elm$core$List$foldl,
							F2(
								function (_v29, gathered) {
									var fieldName = _v29.a;
									var fieldType = _v29.b;
									if (gathered.$ === 'Err') {
										var err = gathered.a;
										return gathered;
									} else {
										var _v31 = gathered.a;
										var currentContext = _v31.a;
										var renderedFields = _v31.b;
										var _v32 = A4($author$project$Example$Interactive$Rendered$buildArg, options, currentContext, fieldName, fieldType);
										if (_v32.$ === 'Ok') {
											var fieldExample = _v32.a;
											return $elm$core$Result$Ok(
												_Utils_Tuple2(
													fieldExample.context,
													A2(
														$elm$core$List$cons,
														A2(
															$mdgriffith$elm_codegen$Elm$tuple,
															$mdgriffith$elm_codegen$Elm$string(fieldName),
															fieldExample.drivenByModel),
														renderedFields)));
										} else {
											var err = _v32.a;
											return $elm$core$Result$Err(err);
										}
									}
								}),
							$elm$core$Result$Ok(
								_Utils_Tuple2(context, _List_Nil)),
							fields);
						if (renderedResult.$ === 'Ok') {
							var _v28 = renderedResult.a;
							var newContext = _v28.a;
							var rendered = _v28.b;
							return $elm$core$Result$Ok(
								{
									context: newContext,
									drivenByModel: $author$project$Gen$Elm$record(rendered)
								});
						} else {
							var err = renderedResult.a;
							return $elm$core$Result$Err(err);
						}
				}
			}
			var name = target.a;
			var vars = target.b;
			return A3(
				$elm$core$List$foldl,
				F2(
					function (decl, buildResult) {
						if (buildResult.$ === 'Ok') {
							return buildResult;
						} else {
							if (A2($author$project$Example$Type$isCreatorOf, name, decl.tipe)) {
								if (options.allowOptionalIntermediates) {
									var exampleCall = A5(
										$author$project$Example$Interactive$Rendered$buildExampleCall,
										{allowOptionalIntermediates: false},
										context,
										{
											end: function (_v25) {
												return true;
											},
											start: decl
										},
										decl.tipe,
										_List_Nil);
									if (exampleCall.$ === 'Ok') {
										var builtValue = exampleCall.a;
										var _v22 = A3(
											$elm$core$List$foldl,
											F2(
												function (doc, untouched) {
													var ctxt = untouched.a;
													var existingBuilders = untouched.b;
													var _v23 = A2($author$project$Example$Type$getBuilderOf, name, doc);
													if (_v23.$ === 'Nothing') {
														return untouched;
													} else {
														var builder = _v23.a;
														var builtBuilderResult = A5(
															$author$project$Example$Interactive$Rendered$buildBuilder,
															{allowOptionalIntermediates: false},
															ctxt,
															builder,
															builder.tipe,
															_List_Nil);
														if (builtBuilderResult.$ === 'Err') {
															return untouched;
														} else {
															var builtBuilder = builtBuilderResult.a;
															var builderSwitch = A3(
																$author$project$Example$Interactive$Rendered$getValProtected,
																'includeBuilder',
																{
																	init: $mdgriffith$elm_codegen$Elm$bool(false),
																	input: $author$project$Interactive$bool
																},
																builtBuilder.context);
															return _Utils_Tuple2(
																builderSwitch.context,
																A2(
																	$elm$core$List$cons,
																	_Utils_Tuple2(builderSwitch.drivenByModel, builtBuilder.drivenByModel),
																	existingBuilders));
														}
													}
												}),
											_Utils_Tuple2(builtValue.context, _List_Nil),
											context.modul.values);
										var buildersContext = _v22.a;
										var builders = _v22.b;
										return $elm$core$Result$Ok(
											{
												context: buildersContext,
												drivenByModel: A3($elm$core$List$foldl, $author$project$Example$Interactive$Rendered$applyBuilder, builtValue.drivenByModel, builders)
											});
									} else {
										var err = exampleCall.a;
										return $elm$core$Result$Err(err);
									}
								} else {
									return A5(
										$author$project$Example$Interactive$Rendered$buildExampleCall,
										{allowOptionalIntermediates: false},
										context,
										{
											end: function (_v26) {
												return true;
											},
											start: decl
										},
										decl.tipe,
										_List_Nil);
								}
							} else {
								return buildResult;
							}
						}
					}),
				$elm$core$Result$Err('I don\'t know how to build a ' + name),
				context.modul.values);
		}
		return $elm$core$Result$Err('I don\'t know how to build a tuple with values other than a 0, 2, and three.');
	});
var $author$project$Example$Interactive$Rendered$buildBuilder = F5(
	function (options, context, originalValue, targetType, args) {
		buildBuilder:
		while (true) {
			if (targetType.$ === 'Lambda') {
				if (targetType.b.$ === 'Lambda') {
					var arg = targetType.a;
					var result = targetType.b;
					var _v4 = A4($author$project$Example$Interactive$Rendered$buildArg, options, context, originalValue.name, arg);
					if (_v4.$ === 'Ok') {
						var argBuilt = _v4.a;
						var $temp$options = options,
							$temp$context = argBuilt.context,
							$temp$originalValue = originalValue,
							$temp$targetType = result,
							$temp$args = A2($elm$core$List$cons, argBuilt.drivenByModel, args);
						options = $temp$options;
						context = $temp$context;
						originalValue = $temp$originalValue;
						targetType = $temp$targetType;
						args = $temp$args;
						continue buildBuilder;
					} else {
						var err = _v4.a;
						return $elm$core$Result$Err(err);
					}
				} else {
					var arg = targetType.a;
					var result = targetType.b;
					return $elm$core$Result$Ok(
						{
							context: context,
							drivenByModel: A2(
								$mdgriffith$elm_codegen$Elm$fn,
								_Utils_Tuple2('a', $elm$core$Maybe$Nothing),
								$author$project$Gen$Elm$Op$pipe(
									A2(
										$author$project$Gen$Elm$apply,
										$author$project$Gen$Elm$value(
											{
												annotation: $mdgriffith$elm_codegen$Elm$nothing,
												importFrom: A2($elm$core$String$split, '.', context.modul.name),
												name: originalValue.name
											}),
										$elm$core$List$reverse(args))))
						});
				}
			} else {
				return A4($author$project$Example$Interactive$Rendered$buildArg, options, context, originalValue.name, targetType);
			}
		}
	});
var $author$project$Example$Interactive$Rendered$buildExampleCall = F5(
	function (options, context, bounds, targetType, args) {
		buildExampleCall:
		while (true) {
			if (targetType.$ === 'Lambda') {
				var arg = targetType.a;
				var result = targetType.b;
				var _v1 = A4($author$project$Example$Interactive$Rendered$buildArg, options, context, bounds.start.name, arg);
				if (_v1.$ === 'Ok') {
					var argBuilt = _v1.a;
					if (result.$ === 'Lambda') {
						var $temp$options = options,
							$temp$context = argBuilt.context,
							$temp$bounds = bounds,
							$temp$targetType = result,
							$temp$args = A2($elm$core$List$cons, argBuilt.drivenByModel, args);
						options = $temp$options;
						context = $temp$context;
						bounds = $temp$bounds;
						targetType = $temp$targetType;
						args = $temp$args;
						continue buildExampleCall;
					} else {
						return $elm$core$Result$Ok(
							{
								context: argBuilt.context,
								drivenByModel: A2(
									$author$project$Gen$Elm$apply,
									$author$project$Gen$Elm$value(
										{
											annotation: $mdgriffith$elm_codegen$Elm$nothing,
											importFrom: A2($elm$core$String$split, '.', argBuilt.context.modul.name),
											name: bounds.start.name
										}),
									$elm$core$List$reverse(
										A2($elm$core$List$cons, argBuilt.drivenByModel, args)))
							});
					}
				} else {
					var err = _v1.a;
					return $elm$core$Result$Err(err);
				}
			} else {
				return $elm$core$Result$Ok(
					{
						context: context,
						drivenByModel: $author$project$Gen$Elm$value(
							{
								annotation: $mdgriffith$elm_codegen$Elm$nothing,
								importFrom: A2($elm$core$String$split, '.', context.modul.name),
								name: bounds.start.name
							})
					});
			}
		}
	});
var $author$project$Example$Interactive$Rendered$buildHelper = F3(
	function (options, context, _v0) {
		var callstack = _v0.a;
		var starterCall = options.piped ? A5(
			$author$project$Example$Interactive$Rendered$buildBuilder,
			{allowOptionalIntermediates: options.allowOptionalIntermediates},
			context,
			callstack.start,
			callstack.start.tipe,
			_List_Nil) : A5(
			$author$project$Example$Interactive$Rendered$buildExampleCall,
			{allowOptionalIntermediates: options.allowOptionalIntermediates},
			context,
			{
				end: function (_v7) {
					return true;
				},
				start: callstack.start
			},
			callstack.start.tipe,
			_List_Nil);
		if (starterCall.$ === 'Ok') {
			var call = starterCall.a;
			return A3(
				$elm$core$List$foldl,
				F2(
					function (step, builtResult) {
						if (builtResult.$ === 'Ok') {
							var built = builtResult.a;
							if (step.required) {
								var _v3 = A3(
									$author$project$Example$Interactive$Rendered$buildHelper,
									_Utils_update(
										options,
										{piped: true}),
									built.context,
									step.step);
								if (_v3.$ === 'Ok') {
									var builtStep = _v3.a;
									return $elm$core$Result$Ok(
										{
											context: builtStep.context,
											drivenByModel: A2($mdgriffith$elm_codegen$Elm$Op$pipe, builtStep.drivenByModel, built.drivenByModel)
										});
								} else {
									var err = _v3.a;
									return $elm$core$Result$Err(err);
								}
							} else {
								var _v4 = $author$project$Example$Type$getArgs(
									$author$project$Example$CallStack$start(step.step).tipe);
								_v4$2:
								while (true) {
									if (_v4.b) {
										if (!_v4.b.b) {
											var boolVal = A2(
												$mdgriffith$elm_codegen$Elm$get,
												$author$project$Example$CallStack$name(step.step),
												built.context.model);
											return $elm$core$Result$Ok(
												{
													context: built.context,
													drivenByModel: A2(
														$mdgriffith$elm_codegen$Elm$Op$pipe,
														A3(
															$mdgriffith$elm_codegen$Elm$ifThen,
															boolVal,
															A2(
																$mdgriffith$elm_codegen$Elm$fn,
																_Utils_Tuple2('a', $elm$core$Maybe$Nothing),
																$author$project$Gen$Elm$Op$pipe(
																	A2(
																		$author$project$Gen$Elm$apply,
																		$author$project$Gen$Elm$value(
																			{
																				annotation: $mdgriffith$elm_codegen$Elm$nothing,
																				importFrom: A2($elm$core$String$split, '.', context.modul.name),
																				name: $author$project$Example$CallStack$name(step.step)
																			}),
																		_List_Nil))),
															$author$project$Example$Interactive$Rendered$genIdentity),
														built.drivenByModel)
												});
										} else {
											if (!_v4.b.b.b) {
												var argType = _v4.a;
												var _v5 = _v4.b;
												var _v6 = $author$project$Interactive$fromType(argType);
												if (_v6.$ === 'Nothing') {
													return builtResult;
												} else {
													var input = _v6.a;
													var maybeVal = A2(
														$mdgriffith$elm_codegen$Elm$get,
														$author$project$Example$CallStack$name(step.step),
														built.context.model);
													return $elm$core$Result$Ok(
														{
															context: built.context,
															drivenByModel: A2(
																$mdgriffith$elm_codegen$Elm$Op$pipe,
																A2(
																	$mdgriffith$elm_codegen$Elm$Case$maybe,
																	maybeVal,
																	{
																		just: _Utils_Tuple2(
																			$author$project$Example$CallStack$name(step.step) + '_option',
																			function (val) {
																				return A2(
																					$mdgriffith$elm_codegen$Elm$fn,
																					_Utils_Tuple2('a', $elm$core$Maybe$Nothing),
																					$author$project$Gen$Elm$Op$pipe(
																						A2(
																							$author$project$Gen$Elm$apply,
																							$author$project$Gen$Elm$value(
																								{
																									annotation: $mdgriffith$elm_codegen$Elm$nothing,
																									importFrom: A2($elm$core$String$split, '.', context.modul.name),
																									name: $author$project$Example$CallStack$name(step.step)
																								}),
																							_List_fromArray(
																								[
																									A2($author$project$Example$Interactive$Rendered$inputToLiteral, input.input, val)
																								]))));
																			}),
																		nothing: $author$project$Example$Interactive$Rendered$genIdentity
																	}),
																built.drivenByModel)
														});
												}
											} else {
												break _v4$2;
											}
										}
									} else {
										break _v4$2;
									}
								}
								return builtResult;
							}
						} else {
							var err = builtResult.a;
							return $elm$core$Result$Err(err);
						}
					}),
				$elm$core$Result$Ok(call),
				$elm$core$List$reverse(callstack.steps));
		} else {
			var err = starterCall.a;
			return $elm$core$Result$Err(err);
		}
	});
var $author$project$Example$Interactive$Rendered$initContext = function (modul) {
	return {
		fieldIndex: 0,
		model: $mdgriffith$elm_codegen$Elm$value(
			{annotation: $elm$core$Maybe$Nothing, importFrom: _List_Nil, name: 'model'}),
		modul: modul,
		state: _List_Nil
	};
};
var $author$project$Gen$Elm$toString = function (toStringArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Elm']),
								'Expression',
								_List_Nil)
							]),
						$mdgriffith$elm_codegen$Elm$Annotation$string)),
				importFrom: _List_fromArray(
					['Elm']),
				name: 'toString'
			}),
		_List_fromArray(
			[toStringArg]));
};
var $author$project$Example$Interactive$Rendered$build = F2(
	function (mod, callstack) {
		return A2(
			$elm$core$Result$map,
			function (ok) {
				return _Utils_update(
					ok,
					{
						drivenByModel: $author$project$Gen$Elm$toString(ok.drivenByModel)
					});
			},
			A3(
				$author$project$Example$Interactive$Rendered$buildHelper,
				{allowOptionalIntermediates: true, piped: false},
				$author$project$Example$Interactive$Rendered$initContext(mod),
				callstack));
	});
var $author$project$Example$CallStack$CallStack = function (a) {
	return {$: 'CallStack', a: a};
};
var $author$project$Example$Type$getResultType = function (tipe) {
	getResultType:
	while (true) {
		if (tipe.$ === 'Lambda') {
			var result = tipe.b;
			var $temp$tipe = result;
			tipe = $temp$tipe;
			continue getResultType;
		} else {
			return tipe;
		}
	}
};
var $author$project$Example$Type$listMatches = F2(
	function (ones, twos) {
		listMatches:
		while (true) {
			var _v6 = _Utils_Tuple2(ones, twos);
			_v6$2:
			while (true) {
				if (!_v6.a.b) {
					if (!_v6.b.b) {
						return true;
					} else {
						break _v6$2;
					}
				} else {
					if (_v6.b.b) {
						var _v7 = _v6.a;
						var oneTop = _v7.a;
						var oneRemain = _v7.b;
						var _v8 = _v6.b;
						var twoTop = _v8.a;
						var twoRemain = _v8.b;
						if (A2($author$project$Example$Type$matches, oneTop, twoTop)) {
							var $temp$ones = oneRemain,
								$temp$twos = twoRemain;
							ones = $temp$ones;
							twos = $temp$twos;
							continue listMatches;
						} else {
							return false;
						}
					} else {
						break _v6$2;
					}
				}
			}
			return false;
		}
	});
var $author$project$Example$Type$matches = F2(
	function (one, two) {
		switch (one.$) {
			case 'Var':
				var oneVar = one.a;
				if (two.$ === 'Var') {
					var twoVar = two.a;
					return true;
				} else {
					return false;
				}
			case 'Lambda':
				var fst = one.a;
				var snd = one.b;
				if (two.$ === 'Lambda') {
					var twoFst = two.a;
					var twoSnd = two.b;
					return A2($author$project$Example$Type$matches, fst, twoFst) && A2($author$project$Example$Type$matches, snd, twoSnd);
				} else {
					return false;
				}
			case 'Tuple':
				var ones = one.a;
				if (two.$ === 'Tuple') {
					var twos = two.a;
					return A2($author$project$Example$Type$listMatches, ones, twos);
				} else {
					return false;
				}
			case 'Type':
				var name = one.a;
				var types = one.b;
				if (two.$ === 'Type') {
					var twoName = two.a;
					var twoTypes = two.b;
					return _Utils_eq(name, twoName) && A2($author$project$Example$Type$listMatches, types, twoTypes);
				} else {
					return false;
				}
			default:
				var fields = one.a;
				var maybeExtensible = one.b;
				if (two.$ === 'Record') {
					var twoRecords = two.a;
					var twoMaybeExtensible = two.b;
					return false;
				} else {
					return false;
				}
		}
	});
var $author$project$Example$Type$isBuilderOf = F2(
	function (desiredResult, possibleBuilder) {
		isBuilderOf:
		while (true) {
			if (possibleBuilder.$ === 'Lambda') {
				var arg = possibleBuilder.a;
				var result = possibleBuilder.b;
				if (A2($author$project$Example$Type$matches, desiredResult, arg) && A2($author$project$Example$Type$matches, desiredResult, result)) {
					return true;
				} else {
					var $temp$desiredResult = desiredResult,
						$temp$possibleBuilder = result;
					desiredResult = $temp$desiredResult;
					possibleBuilder = $temp$possibleBuilder;
					continue isBuilderOf;
				}
			} else {
				return false;
			}
		}
	});
var $author$project$Example$CallStack$matchesResultType = F2(
	function (one, two) {
		return A2(
			$author$project$Example$Type$matches,
			$author$project$Example$Type$getResultType(one.tipe),
			$author$project$Example$Type$getResultType(two.tipe));
	});
var $author$project$Example$CallStack$mergeCallStacks = F2(
	function (maybeOne, maybeTwo) {
		var _v0 = _Utils_Tuple2(maybeOne, maybeTwo);
		if (_v0.a.$ === 'Just') {
			if (_v0.b.$ === 'Just') {
				var one = _v0.a.a;
				var two = _v0.b.a;
				return $elm$core$Maybe$Just(
					_Utils_ap(one, two));
			} else {
				var one = _v0.a.a;
				var _v1 = _v0.b;
				return $elm$core$Maybe$Just(one);
			}
		} else {
			if (_v0.b.$ === 'Just') {
				var _v2 = _v0.a;
				var two = _v0.b.a;
				return $elm$core$Maybe$Just(two);
			} else {
				var _v3 = _v0.a;
				var _v4 = _v0.b;
				return $elm$core$Maybe$Nothing;
			}
		}
	});
var $author$project$Example$CallStack$singleCall = function (val) {
	return $author$project$Example$CallStack$CallStack(
		{
			result: $author$project$Example$Type$getResultType(val.tipe),
			start: val,
			steps: _List_Nil
		});
};
var $author$project$Example$CallStack$find = F3(
	function (inScope, built, targeting) {
		var resultType = $author$project$Example$Type$getResultType(targeting.start.tipe);
		return targeting.end(resultType) ? $elm$core$Maybe$Just(
			_List_fromArray(
				[
					$author$project$Example$CallStack$CallStack(
					{
						result: resultType,
						start: targeting.start,
						steps: A2(
							$elm$core$List$filterMap,
							function (val) {
								return A2($author$project$Example$Type$isBuilderOf, resultType, val.tipe) ? $elm$core$Maybe$Just(
									{
										required: false,
										step: $author$project$Example$CallStack$singleCall(val)
									}) : $elm$core$Maybe$Nothing;
							},
							inScope)
					})
				])) : A3(
			$elm$core$List$foldl,
			F2(
				function (val, gathered) {
					if (A2($author$project$Example$CallStack$matchesResultType, val, targeting.start)) {
						return gathered;
					} else {
						if (A2(
							$elm$core$List$any,
							$author$project$Example$CallStack$matchesResultType(val),
							built)) {
							return gathered;
						} else {
							var maybeSubCallStacks = A3(
								$author$project$Example$CallStack$find,
								inScope,
								A2($elm$core$List$cons, targeting.start, built),
								{end: targeting.end, start: val});
							if (maybeSubCallStacks.$ === 'Nothing') {
								return gathered;
							} else {
								var subCallStacks = maybeSubCallStacks.a;
								return A2(
									$author$project$Example$CallStack$mergeCallStacks,
									gathered,
									$elm$core$Maybe$Just(
										A2(
											$elm$core$List$map,
											function (subCall) {
												var subCallDetails = subCall.a;
												var optionalBuilders = A2(
													$elm$core$List$filterMap,
													function (optionalVal) {
														return A2($author$project$Example$Type$isBuilderOf, resultType, optionalVal.tipe) ? $elm$core$Maybe$Just(
															{
																required: false,
																step: $author$project$Example$CallStack$singleCall(optionalVal)
															}) : $elm$core$Maybe$Nothing;
													},
													inScope);
												return $author$project$Example$CallStack$CallStack(
													{
														result: subCallDetails.result,
														start: targeting.start,
														steps: A2(
															$elm$core$List$cons,
															{
																required: true,
																step: $author$project$Example$CallStack$singleCall(subCallDetails.start)
															},
															_Utils_ap(optionalBuilders, subCallDetails.steps))
													});
											},
											subCallStacks)));
							}
						}
					}
				}),
			$elm$core$Maybe$Nothing,
			inScope);
	});
var $author$project$Example$CallStack$getResultType = function (_v0) {
	var call = _v0.a;
	return call.result;
};
var $author$project$Example$Interactive$runnerEnd = F2(
	function (runners, target) {
		runnerEnd:
		while (true) {
			if (!runners.b) {
				return false;
			} else {
				var runner = runners.a;
				var remain = runners.b;
				if (runner.canRun(target)) {
					return true;
				} else {
					var $temp$runners = remain,
						$temp$target = target;
					runners = $temp$runners;
					target = $temp$target;
					continue runnerEnd;
				}
			}
		}
	});
var $author$project$Example$Interactive$buildExampleCallStack = F2(
	function (mod, bounds) {
		var _v0 = A3(
			$author$project$Example$CallStack$find,
			mod.values,
			_List_Nil,
			{
				end: $author$project$Example$Interactive$runnerEnd(bounds.runners),
				start: bounds.start
			});
		if (_v0.$ === 'Nothing') {
			return $elm$core$Result$Err('No way to build desired type');
		} else {
			if (!_v0.a.b) {
				return $elm$core$Result$Err('No way to build desired type');
			} else {
				var _v1 = _v0.a;
				var callStack = _v1.a;
				var calls = _v1.b;
				var renderedResult = A2($author$project$Example$Interactive$Rendered$build, mod, callStack);
				var exampleResult = A2($author$project$Example$Interactive$Build$build, mod, callStack);
				var _v2 = _Utils_Tuple2(renderedResult, exampleResult);
				if ((_v2.a.$ === 'Ok') && (_v2.b.$ === 'Ok')) {
					var rendered = _v2.a.a;
					var example = _v2.b.a;
					return $elm$core$Result$Ok(
						{
							example: rendered,
							rendered: example,
							_return: $author$project$Example$CallStack$getResultType(callStack)
						});
				} else {
					return $elm$core$Result$Err('Something terribly terribly wrong happened');
				}
			}
		}
	});
var $author$project$Gen$Ui$call_ = {
	above: function (aboveArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'above'
				}),
			_List_fromArray(
				[aboveArg]));
	},
	attrIf: F2(
		function (attrIfArg, attrIfArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$bool,
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Attribute',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Attribute',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'attrIf'
					}),
				_List_fromArray(
					[attrIfArg, attrIfArg0]));
		}),
	background: function (backgroundArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Color',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'background'
				}),
			_List_fromArray(
				[backgroundArg]));
	},
	backgroundGradient: function (backgroundGradientArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Gradient',
										_List_Nil))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'backgroundGradient'
				}),
			_List_fromArray(
				[backgroundGradientArg]));
	},
	behindContent: function (behindContentArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'behindContent'
				}),
			_List_fromArray(
				[behindContentArg]));
	},
	below: function (belowArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'below'
				}),
			_List_fromArray(
				[belowArg]));
	},
	border: function (borderArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'border'
				}),
			_List_fromArray(
				[borderArg]));
	},
	borderColor: function (borderColorArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Color',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'borderColor'
				}),
			_List_fromArray(
				[borderColorArg]));
	},
	borderGradient: function (borderGradientArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2('width', $mdgriffith$elm_codegen$Elm$Annotation$int),
											_Utils_Tuple2(
											'gradient',
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Ui']),
												'Gradient',
												_List_Nil)),
											_Utils_Tuple2(
											'background',
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Ui']),
												'Gradient',
												_List_Nil))
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'borderGradient'
				}),
			_List_fromArray(
				[borderGradientArg]));
	},
	borderWith: function (borderWithArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Edges',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'borderWith'
				}),
			_List_fromArray(
				[borderWithArg]));
	},
	clipped: F2(
		function (clippedArg, clippedArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Ui']),
											'Attribute',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
												]))),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Element',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'clipped'
					}),
				_List_fromArray(
					[clippedArg, clippedArg0]));
		}),
	column: F2(
		function (columnArg, columnArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Ui']),
											'Attribute',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
												]))),
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Ui']),
											'Element',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
												])))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'column'
					}),
				_List_fromArray(
					[columnArg, columnArg0]));
		}),
	down: function (downArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Position',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'down'
				}),
			_List_fromArray(
				[downArg]));
	},
	download: function (downloadArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'download'
				}),
			_List_fromArray(
				[downloadArg]));
	},
	downloadAs: function (downloadAsArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2('url', $mdgriffith$elm_codegen$Elm$Annotation$string),
											_Utils_Tuple2('filename', $mdgriffith$elm_codegen$Elm$Annotation$string)
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'downloadAs'
				}),
			_List_fromArray(
				[downloadAsArg]));
	},
	el: F2(
		function (elArg, elArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Ui']),
											'Attribute',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
												]))),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Element',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'el'
					}),
				_List_fromArray(
					[elArg, elArg0]));
		}),
	embed: F2(
		function (embedArg, embedArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Ui']),
											'Attribute',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
												]))),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Element',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Html']),
									'Html',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'embed'
					}),
				_List_fromArray(
					[embedArg, embedArg0]));
		}),
	explain: function (explainArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Todo',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'explain'
				}),
			_List_fromArray(
				[explainArg]));
	},
	height: function (heightArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Length',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'height'
				}),
			_List_fromArray(
				[heightArg]));
	},
	heightMax: function (heightMaxArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'heightMax'
				}),
			_List_fromArray(
				[heightMaxArg]));
	},
	heightMin: function (heightMinArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'heightMin'
				}),
			_List_fromArray(
				[heightMinArg]));
	},
	html: function (htmlArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Html']),
									'Html',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Element',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'html'
				}),
			_List_fromArray(
				[htmlArg]));
	},
	htmlAttribute: function (htmlAttributeArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Html']),
									'Attribute',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'htmlAttribute'
				}),
			_List_fromArray(
				[htmlAttributeArg]));
	},
	id: function (idArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'id'
				}),
			_List_fromArray(
				[idArg]));
	},
	image: F2(
		function (imageArg, imageArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Ui']),
											'Attribute',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
												]))),
										$mdgriffith$elm_codegen$Elm$Annotation$record(
										_List_fromArray(
											[
												_Utils_Tuple2('source', $mdgriffith$elm_codegen$Elm$Annotation$string),
												_Utils_Tuple2('description', $mdgriffith$elm_codegen$Elm$Annotation$string)
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'image'
					}),
				_List_fromArray(
					[imageArg, imageArg0]));
		}),
	inFront: function (inFrontArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'inFront'
				}),
			_List_fromArray(
				[inFrontArg]));
	},
	layout: F2(
		function (layoutArg, layoutArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Ui']),
											'Attribute',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
												]))),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Element',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Html']),
									'Html',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'layout'
					}),
				_List_fromArray(
					[layoutArg, layoutArg0]));
		}),
	left: function (leftArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Position',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'left'
				}),
			_List_fromArray(
				[leftArg]));
	},
	link: function (linkArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'link'
				}),
			_List_fromArray(
				[linkArg]));
	},
	linkNewTab: function (linkNewTabArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'linkNewTab'
				}),
			_List_fromArray(
				[linkNewTabArg]));
	},
	map: F2(
		function (mapArg, mapArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]),
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg1')),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Element',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg1')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'map'
					}),
				_List_fromArray(
					[mapArg, mapArg0]));
		}),
	move: function (moveArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Position',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'move'
				}),
			_List_fromArray(
				[moveArg]));
	},
	onLeft: function (onLeftArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'onLeft'
				}),
			_List_fromArray(
				[onLeftArg]));
	},
	onRight: function (onRightArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'onRight'
				}),
			_List_fromArray(
				[onRightArg]));
	},
	opacity: function (opacityArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$float]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'opacity'
				}),
			_List_fromArray(
				[opacityArg]));
	},
	padding: function (paddingArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'padding'
				}),
			_List_fromArray(
				[paddingArg]));
	},
	paddingBottom: function (paddingBottomArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'paddingBottom'
				}),
			_List_fromArray(
				[paddingBottomArg]));
	},
	paddingLeft: function (paddingLeftArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'paddingLeft'
				}),
			_List_fromArray(
				[paddingLeftArg]));
	},
	paddingRight: function (paddingRightArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'paddingRight'
				}),
			_List_fromArray(
				[paddingRightArg]));
	},
	paddingTop: function (paddingTopArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'paddingTop'
				}),
			_List_fromArray(
				[paddingTopArg]));
	},
	paddingWith: function (paddingWithArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Edges',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'paddingWith'
				}),
			_List_fromArray(
				[paddingWithArg]));
	},
	paddingXY: F2(
		function (paddingXYArg, paddingXYArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Attribute',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'paddingXY'
					}),
				_List_fromArray(
					[paddingXYArg, paddingXYArg0]));
		}),
	palette: function (paletteArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'background',
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Ui']),
												'Color',
												_List_Nil)),
											_Utils_Tuple2(
											'border',
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Ui']),
												'Color',
												_List_Nil)),
											_Utils_Tuple2(
											'font',
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Ui']),
												'Color',
												_List_Nil))
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'palette'
				}),
			_List_fromArray(
				[paletteArg]));
	},
	portion: function (portionArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Length',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'portion'
				}),
			_List_fromArray(
				[portionArg]));
	},
	px: function (pxArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Length',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'px'
				}),
			_List_fromArray(
				[pxArg]));
	},
	radians: function (radiansArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$float]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Angle',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'radians'
				}),
			_List_fromArray(
				[radiansArg]));
	},
	rgb: F3(
		function (rgbArg, rgbArg0, rgbArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Color',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'rgb'
					}),
				_List_fromArray(
					[rgbArg, rgbArg0, rgbArg1]));
		}),
	rgba: F4(
		function (rgbaArg, rgbaArg0, rgbaArg1, rgbaArg2) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$int, $mdgriffith$elm_codegen$Elm$Annotation$float]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Color',
									_List_Nil))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'rgba'
					}),
				_List_fromArray(
					[rgbaArg, rgbaArg0, rgbaArg1, rgbaArg2]));
		}),
	right: function (rightArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Position',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'right'
				}),
			_List_fromArray(
				[rightArg]));
	},
	rotate: function (rotateArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Angle',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'rotate'
				}),
			_List_fromArray(
				[rotateArg]));
	},
	rounded: function (roundedArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'rounded'
				}),
			_List_fromArray(
				[roundedArg]));
	},
	roundedWith: function (roundedWithArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2('topLeft', $mdgriffith$elm_codegen$Elm$Annotation$int),
											_Utils_Tuple2('topRight', $mdgriffith$elm_codegen$Elm$Annotation$int),
											_Utils_Tuple2('bottomLeft', $mdgriffith$elm_codegen$Elm$Annotation$int),
											_Utils_Tuple2('bottomRight', $mdgriffith$elm_codegen$Elm$Annotation$int)
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'roundedWith'
				}),
			_List_fromArray(
				[roundedWithArg]));
	},
	row: F2(
		function (rowArg, rowArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Ui']),
											'Attribute',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
												]))),
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Ui']),
											'Element',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
												])))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'row'
					}),
				_List_fromArray(
					[rowArg, rowArg0]));
		}),
	scale: function (scaleArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$float]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'scale'
				}),
			_List_fromArray(
				[scaleArg]));
	},
	scrollable: F2(
		function (scrollableArg, scrollableArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Ui']),
											'Attribute',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
												]))),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Ui']),
										'Element',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Element',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui']),
						name: 'scrollable'
					}),
				_List_fromArray(
					[scrollableArg, scrollableArg0]));
		}),
	spacing: function (spacingArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'spacing'
				}),
			_List_fromArray(
				[spacingArg]));
	},
	spacingWith: function (spacingWithArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2('horizontal', $mdgriffith$elm_codegen$Elm$Annotation$int),
											_Utils_Tuple2('vertical', $mdgriffith$elm_codegen$Elm$Annotation$int)
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'spacingWith'
				}),
			_List_fromArray(
				[spacingWithArg]));
	},
	text: function (textArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Element',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'text'
				}),
			_List_fromArray(
				[textArg]));
	},
	turns: function (turnsArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$float]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Angle',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'turns'
				}),
			_List_fromArray(
				[turnsArg]));
	},
	up: function (upArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Position',
								_List_Nil))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'up'
				}),
			_List_fromArray(
				[upArg]));
	},
	width: function (widthArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Length',
									_List_Nil)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'width'
				}),
			_List_fromArray(
				[widthArg]));
	},
	widthMax: function (widthMaxArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'widthMax'
				}),
			_List_fromArray(
				[widthMaxArg]));
	},
	widthMin: function (widthMinArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$int]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Attribute',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
									])))),
					importFrom: _List_fromArray(
						['Ui']),
					name: 'widthMin'
				}),
			_List_fromArray(
				[widthMinArg]));
	}
};
var $author$project$Gen$Ui$centerY = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Ui']),
				'Attribute',
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
					]))),
		importFrom: _List_fromArray(
			['Ui']),
		name: 'centerY'
	});
var $author$project$Example$Interactive$getRunner = F2(
	function (runners, tipe) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (run, maybe) {
					if (maybe.$ === 'Nothing') {
						return run.canRun(tipe) ? $elm$core$Maybe$Just(run) : $elm$core$Maybe$Nothing;
					} else {
						return maybe;
					}
				}),
			$elm$core$Maybe$Nothing,
			runners);
	});
var $author$project$Gen$Ui$heightMin = function (heightMinArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[$mdgriffith$elm_codegen$Elm$Annotation$int]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'heightMin'
			}),
		_List_fromArray(
			[
				$mdgriffith$elm_codegen$Elm$int(heightMinArg)
			]));
};
var $author$project$Gen$Ui$shrink = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Ui']),
				'Length',
				_List_Nil)),
		importFrom: _List_fromArray(
			['Ui']),
		name: 'shrink'
	});
var $author$project$Gen$Ui$Theme$Input$call_ = {
	bool: F3(
		function (boolArg, boolArg0, boolArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[$mdgriffith$elm_codegen$Elm$Annotation$bool]),
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')),
										$mdgriffith$elm_codegen$Elm$Annotation$bool
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Ui',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui', 'Theme', 'Input']),
						name: 'bool'
					}),
				_List_fromArray(
					[boolArg, boolArg0, boolArg1]));
		}),
	_int: F3(
		function (intArg, intArg0, intArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[$mdgriffith$elm_codegen$Elm$Annotation$int]),
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')),
										$mdgriffith$elm_codegen$Elm$Annotation$int
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Ui',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui', 'Theme', 'Input']),
						name: 'int'
					}),
				_List_fromArray(
					[intArg, intArg0, intArg1]));
		}),
	maybeBool: F3(
		function (maybeBoolArg, maybeBoolArg0, maybeBoolArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_Nil,
												'Maybe',
												_List_fromArray(
													[$mdgriffith$elm_codegen$Elm$Annotation$bool]))
											]),
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_Nil,
										'Maybe',
										_List_fromArray(
											[$mdgriffith$elm_codegen$Elm$Annotation$bool]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Ui',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui', 'Theme', 'Input']),
						name: 'maybeBool'
					}),
				_List_fromArray(
					[maybeBoolArg, maybeBoolArg0, maybeBoolArg1]));
		}),
	maybeString: F3(
		function (maybeStringArg, maybeStringArg0, maybeStringArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_Nil,
												'Maybe',
												_List_fromArray(
													[$mdgriffith$elm_codegen$Elm$Annotation$string]))
											]),
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_Nil,
										'Maybe',
										_List_fromArray(
											[$mdgriffith$elm_codegen$Elm$Annotation$string]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Ui',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui', 'Theme', 'Input']),
						name: 'maybeString'
					}),
				_List_fromArray(
					[maybeStringArg, maybeStringArg0, maybeStringArg1]));
		}),
	string: F3(
		function (stringArg, stringArg0, stringArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[$mdgriffith$elm_codegen$Elm$Annotation$string]),
										$mdgriffith$elm_codegen$Elm$Annotation$var('msg')),
										$mdgriffith$elm_codegen$Elm$Annotation$string
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Ui']),
									'Ui',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
										])))),
						importFrom: _List_fromArray(
							['Ui', 'Theme', 'Input']),
						name: 'string'
					}),
				_List_fromArray(
					[stringArg, stringArg0, stringArg1]));
		})
};
var $author$project$Interactive$details = function (_v0) {
	var name = _v0.a;
	var opts = _v0.b;
	return {
		input: opts.input,
		key: name,
		label: A2($elm$core$String$startsWith, 'with', name) ? A3($elm$core$String$replace, 'with', '', name) : name,
		onChange: opts.input
	};
};
var $author$project$Example$Interactive$viewFieldInput = F2(
	function (opts, field) {
		var details = $author$project$Interactive$details(field);
		var updateValue = A2(
			$mdgriffith$elm_codegen$Elm$fn,
			_Utils_Tuple2('new', $elm$core$Maybe$Nothing),
			function (_new) {
				return A2(
					$mdgriffith$elm_codegen$Elm$apply,
					opts.onChange,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_codegen$Elm$updateRecord,
							_List_fromArray(
								[
									_Utils_Tuple2(details.key, _new)
								]),
							opts.model)
						]));
			});
		var _v0 = details.input;
		switch (_v0.$) {
			case 'InputString':
				return A3(
					$author$project$Gen$Ui$Theme$Input$call_.string,
					$mdgriffith$elm_codegen$Elm$string(details.label),
					updateValue,
					A2($mdgriffith$elm_codegen$Elm$get, details.key, opts.model));
			case 'InputBool':
				return A3(
					$author$project$Gen$Ui$Theme$Input$call_.bool,
					$mdgriffith$elm_codegen$Elm$string(details.label),
					updateValue,
					A2($mdgriffith$elm_codegen$Elm$get, details.key, opts.model));
			case 'InputInt':
				return A3(
					$author$project$Gen$Ui$Theme$Input$call_._int,
					$mdgriffith$elm_codegen$Elm$string(details.label),
					updateValue,
					A2($mdgriffith$elm_codegen$Elm$get, details.key, opts.model));
			case 'InputFloat':
				return $author$project$Gen$Ui$text('Float');
			default:
				switch (_v0.a.$) {
					case 'InputString':
						var _v1 = _v0.a;
						return A3(
							$author$project$Gen$Ui$Theme$Input$call_.maybeString,
							$mdgriffith$elm_codegen$Elm$string(details.label),
							updateValue,
							A2($mdgriffith$elm_codegen$Elm$get, details.key, opts.model));
					case 'InputBool':
						var _v2 = _v0.a;
						return A3(
							$author$project$Gen$Ui$Theme$Input$call_.maybeBool,
							$mdgriffith$elm_codegen$Elm$string(details.label),
							updateValue,
							A2($mdgriffith$elm_codegen$Elm$get, details.key, opts.model));
					default:
						return $author$project$Gen$Ui$text('Float');
				}
		}
	});
var $author$project$Gen$Ui$width = function (widthArg) {
	return A2(
		$mdgriffith$elm_codegen$Elm$apply,
		$mdgriffith$elm_codegen$Elm$value(
			{
				annotation: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_codegen$Elm$Annotation$function,
						_List_fromArray(
							[
								A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Ui']),
								'Length',
								_List_Nil)
							]),
						A3(
							$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
							_List_fromArray(
								['Ui']),
							'Attribute',
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
								])))),
				importFrom: _List_fromArray(
					['Ui']),
				name: 'width'
			}),
		_List_fromArray(
			[widthArg]));
};
var $author$project$Example$Interactive$viewInput = F2(
	function (viewOptions, fields) {
		return A2(
			$author$project$Gen$Ui$column,
			_List_fromArray(
				[
					$author$project$Gen$Ui$width($author$project$Gen$Ui$fill),
					$author$project$Gen$Ui$spacing(16)
				]),
			A2(
				$elm$core$List$map,
				$author$project$Example$Interactive$viewFieldInput(viewOptions),
				$elm$core$List$reverse(fields)));
	});
var $author$project$Example$Interactive$build = F2(
	function (modul, targeting) {
		var _v0 = A2($author$project$Example$Interactive$buildExampleCallStack, modul, targeting);
		if (_v0.$ === 'Ok') {
			var example = _v0.a;
			var _v1 = A2(
				$author$project$Example$Interactive$getRunner,
				targeting.runners,
				$author$project$Example$Type$getResultType(example._return));
			if (_v1.$ === 'Nothing') {
				return $elm$core$Result$Err('No Runner!  Huh, this shouldn\'t happen');
			} else {
				var runner = _v1.a;
				var fields = _Utils_ap(runner.fields, example.rendered.context.state);
				return $elm$core$Result$Ok(
					{
						fields: fields,
						name: targeting.start.name,
						view: function (opts) {
							return A2(
								$author$project$Gen$Ui$column,
								_List_fromArray(
									[
										$author$project$Gen$Ui$width($author$project$Gen$Ui$fill),
										$author$project$Gen$Ui$height($author$project$Gen$Ui$fill)
									]),
								_List_fromArray(
									[
										A3(
										$mdgriffith$elm_codegen$Elm$ifThen,
										opts.codeOrOutput,
										A2(
											$author$project$Gen$Ui$el,
											_List_fromArray(
												[
													$author$project$Gen$Ui$width($author$project$Gen$Ui$fill),
													$author$project$Gen$Ui$Font$color(
													A3($author$project$Gen$Ui$rgb, 0, 0, 0)),
													$author$project$Gen$Ui$background(
													A3($author$project$Gen$Ui$rgb, 1, 1, 1))
												]),
											A2(runner.view, opts, example.rendered.drivenByModel)),
										A2(
											$author$project$Gen$Ui$el,
											_List_fromArray(
												[
													$author$project$Gen$Ui$padding(32),
													$author$project$Gen$Ui$height($author$project$Gen$Ui$shrink),
													$author$project$Gen$Ui$heightMin(200)
												]),
											A2(
												$author$project$Gen$Ui$el,
												_List_fromArray(
													[$author$project$Gen$Ui$centerY]),
												$author$project$Gen$Ui$call_.text(example.example.drivenByModel)))),
										A2(
										$author$project$Gen$Ui$el,
										_List_fromArray(
											[
												$author$project$Gen$Ui$width($author$project$Gen$Ui$fill),
												$author$project$Gen$Ui$padding(32)
											]),
										A2($author$project$Example$Interactive$viewInput, opts, fields))
									]));
						}
					});
			}
		} else {
			var err = _v0.a;
			return $elm$core$Result$Err(err);
		}
	});
var $author$project$Gen$Ui$centerX = $mdgriffith$elm_codegen$Elm$value(
	{
		annotation: $elm$core$Maybe$Just(
			A3(
				$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
				_List_fromArray(
					['Ui']),
				'Attribute',
				_List_fromArray(
					[
						$mdgriffith$elm_codegen$Elm$Annotation$var('msg')
					]))),
		importFrom: _List_fromArray(
			['Ui']),
		name: 'centerX'
	});
var $author$project$Exemplar$element = {
	canRun: function (tipe) {
		if ((tipe.$ === 'Type') && (tipe.a === 'Element.Element')) {
			return true;
		} else {
			return false;
		}
	},
	fields: _List_Nil,
	view: F2(
		function (_v1, val) {
			var model = _v1.model;
			var onChange = _v1.onChange;
			return A2(
				$author$project$Gen$Ui$el,
				_List_fromArray(
					[
						$author$project$Gen$Ui$padding(32),
						$author$project$Gen$Ui$height($author$project$Gen$Ui$shrink),
						$author$project$Gen$Ui$heightMin(200)
					]),
				A2(
					$author$project$Gen$Ui$el,
					_List_fromArray(
						[$author$project$Gen$Ui$centerY, $author$project$Gen$Ui$centerX]),
					val));
		})
};
var $author$project$Example$Build$getValueNamed = F2(
	function (name, values) {
		getValueNamed:
		while (true) {
			if (!values.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var top = values.a;
				var remain = values.b;
				if (_Utils_eq(top.name, name)) {
					return $elm$core$Maybe$Just(top);
				} else {
					var $temp$name = name,
						$temp$values = remain;
					name = $temp$name;
					values = $temp$values;
					continue getValueNamed;
				}
			}
		}
	});
var $author$project$Example$Type$isBuilder = function (possibleBuilder) {
	isBuilder:
	while (true) {
		if (possibleBuilder.$ === 'Lambda') {
			var arg = possibleBuilder.a;
			var result = possibleBuilder.b;
			if (A2($author$project$Example$Type$matches, result, arg)) {
				return true;
			} else {
				var $temp$possibleBuilder = result;
				possibleBuilder = $temp$possibleBuilder;
				continue isBuilder;
			}
		} else {
			return false;
		}
	}
};
var $author$project$Example$Type$primitiveNames = _List_fromArray(
	['String.String', 'Basics.Bool', 'Basics.Int', 'Basics.Float']);
var $author$project$Example$Type$primitiveSingleContainers = _List_fromArray(
	['List.List', 'Maybe.Maybe']);
var $author$project$Example$Type$isPrimitive = function (tipe) {
	isPrimitive:
	while (true) {
		switch (tipe.$) {
			case 'Var':
				if (tipe.a === 'msg') {
					return true;
				} else {
					return false;
				}
			case 'Lambda':
				var arg = tipe.a;
				var result = tipe.b;
				return false;
			case 'Tuple':
				var tups = tipe.a;
				return A2($elm$core$List$all, $author$project$Example$Type$isPrimitive, tups);
			case 'Type':
				if (!tipe.b.b) {
					var name = tipe.a;
					return A2($elm$core$List$member, name, $author$project$Example$Type$primitiveNames);
				} else {
					if (!tipe.b.b.b) {
						var name = tipe.a;
						var _v1 = tipe.b;
						var inner = _v1.a;
						if (A2($elm$core$List$member, name, $author$project$Example$Type$primitiveSingleContainers)) {
							var $temp$tipe = inner;
							tipe = $temp$tipe;
							continue isPrimitive;
						} else {
							return false;
						}
					} else {
						return false;
					}
				}
			default:
				var fields = tipe.a;
				var maybeName = tipe.b;
				return A2(
					$elm$core$List$all,
					A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $author$project$Example$Type$isPrimitive),
					fields);
		}
	}
};
var $author$project$Example$Type$isStartingPointHelper = function (tipe) {
	isStartingPointHelper:
	while (true) {
		if (tipe.$ === 'Lambda') {
			var arg = tipe.a;
			var result = tipe.b;
			if ($author$project$Example$Type$isPrimitive(arg)) {
				var $temp$tipe = result;
				tipe = $temp$tipe;
				continue isStartingPointHelper;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
};
var $author$project$Example$Type$isStartingPoint = function (tipe) {
	return $author$project$Example$Type$isBuilder(tipe) ? false : $author$project$Example$Type$isStartingPointHelper(tipe);
};
var $author$project$Gen$Parser$call_ = {
	andThen: F2(
		function (andThenArg, andThenArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('a')
											]),
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Parser']),
											'Parser',
											_List_fromArray(
												[
													$mdgriffith$elm_codegen$Elm$Annotation$var('b')
												]))),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Parser']),
										'Parser',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('a')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Parser']),
									'Parser',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('b')
										])))),
						importFrom: _List_fromArray(
							['Parser']),
						name: 'andThen'
					}),
				_List_fromArray(
					[andThenArg, andThenArg0]));
		}),
	backtrackable: function (backtrackableArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Parser']),
									'Parser',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('a')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('a')
									])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'backtrackable'
				}),
			_List_fromArray(
				[backtrackableArg]));
	},
	chompIf: function (chompIfArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_codegen$Elm$Annotation$function,
									_List_fromArray(
										[$mdgriffith$elm_codegen$Elm$Annotation$char]),
									$mdgriffith$elm_codegen$Elm$Annotation$bool)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$unit])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'chompIf'
				}),
			_List_fromArray(
				[chompIfArg]));
	},
	chompUntil: function (chompUntilArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$unit])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'chompUntil'
				}),
			_List_fromArray(
				[chompUntilArg]));
	},
	chompUntilEndOr: function (chompUntilEndOrArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$unit])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'chompUntilEndOr'
				}),
			_List_fromArray(
				[chompUntilEndOrArg]));
	},
	chompWhile: function (chompWhileArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_codegen$Elm$Annotation$function,
									_List_fromArray(
										[$mdgriffith$elm_codegen$Elm$Annotation$char]),
									$mdgriffith$elm_codegen$Elm$Annotation$bool)
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$unit])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'chompWhile'
				}),
			_List_fromArray(
				[chompWhileArg]));
	},
	commit: function (commitArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('a')
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('a')
									])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'commit'
				}),
			_List_fromArray(
				[commitArg]));
	},
	deadEndsToString: function (deadEndsToStringArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Parser']),
										'DeadEnd',
										_List_Nil))
								]),
							$mdgriffith$elm_codegen$Elm$Annotation$string)),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'deadEndsToString'
				}),
			_List_fromArray(
				[deadEndsToStringArg]));
	},
	getChompedString: function (getChompedStringArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Parser']),
									'Parser',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('a')
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$string])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'getChompedString'
				}),
			_List_fromArray(
				[getChompedStringArg]));
	},
	keyword: function (keywordArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$unit])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'keyword'
				}),
			_List_fromArray(
				[keywordArg]));
	},
	lazy: function (lazyArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_codegen$Elm$Annotation$function,
									_List_fromArray(
										[$mdgriffith$elm_codegen$Elm$Annotation$unit]),
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Parser']),
										'Parser',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('a')
											])))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('a')
									])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'lazy'
				}),
			_List_fromArray(
				[lazyArg]));
	},
	lineComment: function (lineCommentArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$unit])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'lineComment'
				}),
			_List_fromArray(
				[lineCommentArg]));
	},
	loop: F2(
		function (loopArg, loopArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('state'),
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('state')
											]),
										A3(
											$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
											_List_fromArray(
												['Parser']),
											'Parser',
											_List_fromArray(
												[
													A3(
													$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
													_List_fromArray(
														['Parser']),
													'Step',
													_List_fromArray(
														[
															$mdgriffith$elm_codegen$Elm$Annotation$var('state'),
															$mdgriffith$elm_codegen$Elm$Annotation$var('a')
														]))
												])))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Parser']),
									'Parser',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('a')
										])))),
						importFrom: _List_fromArray(
							['Parser']),
						name: 'loop'
					}),
				_List_fromArray(
					[loopArg, loopArg0]));
		}),
	map: F2(
		function (mapArg, mapArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('a')
											]),
										$mdgriffith$elm_codegen$Elm$Annotation$var('b')),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Parser']),
										'Parser',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('a')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Parser']),
									'Parser',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('b')
										])))),
						importFrom: _List_fromArray(
							['Parser']),
						name: 'map'
					}),
				_List_fromArray(
					[mapArg, mapArg0]));
		}),
	mapChompedString: F2(
		function (mapChompedStringArg, mapChompedStringArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_codegen$Elm$Annotation$function,
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$string,
												$mdgriffith$elm_codegen$Elm$Annotation$var('a')
											]),
										$mdgriffith$elm_codegen$Elm$Annotation$var('b')),
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Parser']),
										'Parser',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('a')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Parser']),
									'Parser',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('b')
										])))),
						importFrom: _List_fromArray(
							['Parser']),
						name: 'mapChompedString'
					}),
				_List_fromArray(
					[mapChompedStringArg, mapChompedStringArg0]));
		}),
	multiComment: F3(
		function (multiCommentArg, multiCommentArg0, multiCommentArg1) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										$mdgriffith$elm_codegen$Elm$Annotation$string,
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Parser']),
										'Nestable',
										_List_Nil)
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Parser']),
									'Parser',
									_List_fromArray(
										[$mdgriffith$elm_codegen$Elm$Annotation$unit])))),
						importFrom: _List_fromArray(
							['Parser']),
						name: 'multiComment'
					}),
				_List_fromArray(
					[multiCommentArg, multiCommentArg0, multiCommentArg1]));
		}),
	number: function (numberArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'int',
											$mdgriffith$elm_codegen$Elm$Annotation$maybe(
												A2(
													$mdgriffith$elm_codegen$Elm$Annotation$function,
													_List_fromArray(
														[$mdgriffith$elm_codegen$Elm$Annotation$int]),
													$mdgriffith$elm_codegen$Elm$Annotation$var('a')))),
											_Utils_Tuple2(
											'hex',
											$mdgriffith$elm_codegen$Elm$Annotation$maybe(
												A2(
													$mdgriffith$elm_codegen$Elm$Annotation$function,
													_List_fromArray(
														[$mdgriffith$elm_codegen$Elm$Annotation$int]),
													$mdgriffith$elm_codegen$Elm$Annotation$var('a')))),
											_Utils_Tuple2(
											'octal',
											$mdgriffith$elm_codegen$Elm$Annotation$maybe(
												A2(
													$mdgriffith$elm_codegen$Elm$Annotation$function,
													_List_fromArray(
														[$mdgriffith$elm_codegen$Elm$Annotation$int]),
													$mdgriffith$elm_codegen$Elm$Annotation$var('a')))),
											_Utils_Tuple2(
											'binary',
											$mdgriffith$elm_codegen$Elm$Annotation$maybe(
												A2(
													$mdgriffith$elm_codegen$Elm$Annotation$function,
													_List_fromArray(
														[$mdgriffith$elm_codegen$Elm$Annotation$int]),
													$mdgriffith$elm_codegen$Elm$Annotation$var('a')))),
											_Utils_Tuple2(
											'float',
											$mdgriffith$elm_codegen$Elm$Annotation$maybe(
												A2(
													$mdgriffith$elm_codegen$Elm$Annotation$function,
													_List_fromArray(
														[$mdgriffith$elm_codegen$Elm$Annotation$float]),
													$mdgriffith$elm_codegen$Elm$Annotation$var('a'))))
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('a')
									])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'number'
				}),
			_List_fromArray(
				[numberArg]));
	},
	oneOf: function (oneOfArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$list(
									A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Parser']),
										'Parser',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('a')
											])))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('a')
									])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'oneOf'
				}),
			_List_fromArray(
				[oneOfArg]));
	},
	problem: function (problemArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('a')
									])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'problem'
				}),
			_List_fromArray(
				[problemArg]));
	},
	run: F2(
		function (runArg, runArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Parser']),
										'Parser',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('a')
											])),
										$mdgriffith$elm_codegen$Elm$Annotation$string
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Result']),
									'Result',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$list(
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Parser']),
												'DeadEnd',
												_List_Nil)),
											$mdgriffith$elm_codegen$Elm$Annotation$var('a')
										])))),
						importFrom: _List_fromArray(
							['Parser']),
						name: 'run'
					}),
				_List_fromArray(
					[runArg, runArg0]));
		}),
	sequence: function (sequenceArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2('start', $mdgriffith$elm_codegen$Elm$Annotation$string),
											_Utils_Tuple2('separator', $mdgriffith$elm_codegen$Elm$Annotation$string),
											_Utils_Tuple2('end', $mdgriffith$elm_codegen$Elm$Annotation$string),
											_Utils_Tuple2(
											'spaces',
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Parser']),
												'Parser',
												_List_fromArray(
													[$mdgriffith$elm_codegen$Elm$Annotation$unit]))),
											_Utils_Tuple2(
											'item',
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Parser']),
												'Parser',
												_List_fromArray(
													[
														$mdgriffith$elm_codegen$Elm$Annotation$var('a')
													]))),
											_Utils_Tuple2(
											'trailing',
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Parser']),
												'Trailing',
												_List_Nil))
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$list(
										$mdgriffith$elm_codegen$Elm$Annotation$var('a'))
									])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'sequence'
				}),
			_List_fromArray(
				[sequenceArg]));
	},
	succeed: function (succeedArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$var('a')
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$var('a')
									])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'succeed'
				}),
			_List_fromArray(
				[succeedArg]));
	},
	symbol: function (symbolArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$unit])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'symbol'
				}),
			_List_fromArray(
				[symbolArg]));
	},
	token: function (tokenArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[$mdgriffith$elm_codegen$Elm$Annotation$string]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$unit])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'token'
				}),
			_List_fromArray(
				[tokenArg]));
	},
	variable: function (variableArg) {
		return A2(
			$mdgriffith$elm_codegen$Elm$apply,
			$mdgriffith$elm_codegen$Elm$value(
				{
					annotation: $elm$core$Maybe$Just(
						A2(
							$mdgriffith$elm_codegen$Elm$Annotation$function,
							_List_fromArray(
								[
									$mdgriffith$elm_codegen$Elm$Annotation$record(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'start',
											A2(
												$mdgriffith$elm_codegen$Elm$Annotation$function,
												_List_fromArray(
													[$mdgriffith$elm_codegen$Elm$Annotation$char]),
												$mdgriffith$elm_codegen$Elm$Annotation$bool)),
											_Utils_Tuple2(
											'inner',
											A2(
												$mdgriffith$elm_codegen$Elm$Annotation$function,
												_List_fromArray(
													[$mdgriffith$elm_codegen$Elm$Annotation$char]),
												$mdgriffith$elm_codegen$Elm$Annotation$bool)),
											_Utils_Tuple2(
											'reserved',
											A3(
												$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
												_List_fromArray(
													['Set']),
												'Set',
												_List_fromArray(
													[$mdgriffith$elm_codegen$Elm$Annotation$string])))
										]))
								]),
							A3(
								$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
								_List_fromArray(
									['Parser']),
								'Parser',
								_List_fromArray(
									[$mdgriffith$elm_codegen$Elm$Annotation$string])))),
					importFrom: _List_fromArray(
						['Parser']),
					name: 'variable'
				}),
			_List_fromArray(
				[variableArg]));
	},
	withIndent: F2(
		function (withIndentArg, withIndentArg0) {
			return A2(
				$mdgriffith$elm_codegen$Elm$apply,
				$mdgriffith$elm_codegen$Elm$value(
					{
						annotation: $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_codegen$Elm$Annotation$function,
								_List_fromArray(
									[
										$mdgriffith$elm_codegen$Elm$Annotation$int,
										A3(
										$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
										_List_fromArray(
											['Parser']),
										'Parser',
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Elm$Annotation$var('a')
											]))
									]),
								A3(
									$mdgriffith$elm_codegen$Elm$Annotation$namedWith,
									_List_fromArray(
										['Parser']),
									'Parser',
									_List_fromArray(
										[
											$mdgriffith$elm_codegen$Elm$Annotation$var('a')
										])))),
						importFrom: _List_fromArray(
							['Parser']),
						name: 'withIndent'
					}),
				_List_fromArray(
					[withIndentArg, withIndentArg0]));
		})
};
var $mdgriffith$elm_codegen$Elm$Case$result = F2(
	function (mainExpression, branches) {
		return $mdgriffith$elm_codegen$Internal$Compiler$Expression(
			function (index) {
				var _v0 = A4(
					$mdgriffith$elm_codegen$Elm$Case$captureCase,
					mainExpression,
					_List_Nil,
					$mdgriffith$elm_codegen$Internal$Index$dive(index),
					_List_fromArray(
						[
							$mdgriffith$elm_codegen$Internal$Branch$Branch(
							function (branchIndex) {
								var _v1 = branches.ok;
								var okNameStr = _v1.a;
								var toOk = _v1.b;
								var ok = A3($mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType, branchIndex, okNameStr, $elm$core$Maybe$Nothing);
								return _Utils_Tuple3(
									ok.index,
									A2(
										$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
										{moduleName: _List_Nil, name: 'Ok'},
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(
												$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(ok.name))
											])),
									toOk(ok.val));
							}),
							$mdgriffith$elm_codegen$Internal$Branch$Branch(
							function (branchIndex) {
								var _v2 = branches.err;
								var errNameStr = _v2.a;
								var toErr = _v2.b;
								var err = A3($mdgriffith$elm_codegen$Internal$Compiler$toVarMaybeType, branchIndex, errNameStr, $elm$core$Maybe$Nothing);
								return _Utils_Tuple3(
									err.index,
									A2(
										$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
										{moduleName: _List_Nil, name: 'Err'},
										_List_fromArray(
											[
												$mdgriffith$elm_codegen$Internal$Compiler$nodify(
												$stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(err.name))
											])),
									toErr(err.val));
							})
						]));
				var expr = _v0.a;
				var gathered = _v0.b;
				return {
					annotation: function () {
						var _v3 = gathered.annotation;
						if (_v3.$ === 'Nothing') {
							return $elm$core$Result$Err(
								_List_fromArray(
									[$mdgriffith$elm_codegen$Internal$Compiler$EmptyCaseStatement]));
						} else {
							var ann = _v3.a;
							return ann;
						}
					}(),
					expression: $stil4m$elm_syntax$Elm$Syntax$Expression$CaseExpression(
						{
							cases: $elm$core$List$reverse(gathered.cases),
							expression: $mdgriffith$elm_codegen$Internal$Compiler$nodify(expr.expression)
						}),
					imports: _Utils_ap(expr.imports, gathered.imports)
				};
			});
	});
var $author$project$Exemplar$parser = {
	canRun: function (tipe) {
		if ((tipe.$ === 'Type') && (tipe.a === 'Parser.Parser')) {
			return true;
		} else {
			return false;
		}
	},
	fields: _List_fromArray(
		[
			A2(
			$author$project$Interactive$field,
			'Source',
			{
				init: $mdgriffith$elm_codegen$Elm$string('# Hello'),
				input: $author$project$Interactive$string
			})
		]),
	view: F2(
		function (_v1, foundParser) {
			var model = _v1.model;
			var onChange = _v1.onChange;
			return A2(
				$mdgriffith$elm_codegen$Elm$Case$result,
				A2(
					$author$project$Gen$Parser$call_.run,
					foundParser,
					A2($mdgriffith$elm_codegen$Elm$get, 'source', model)),
				{
					err: A2(
						$elm$core$Tuple$pair,
						'err',
						function (err) {
							return A2(
								$author$project$Gen$Ui$el,
								_List_fromArray(
									[
										A2($author$project$Gen$Ui$paddingXY, 32, 0),
										$author$project$Gen$Ui$width($author$project$Gen$Ui$fill),
										$author$project$Gen$Ui$htmlAttribute(
										A2($author$project$Gen$Html$Attributes$style, 'background', 'rgb(36,36,36)'))
									]),
								$author$project$Gen$Ui$call_.text(
									A2(
										$mdgriffith$elm_codegen$Elm$apply,
										$mdgriffith$elm_codegen$Elm$value(
											{
												annotation: $elm$core$Maybe$Nothing,
												importFrom: _List_fromArray(
													['Debug']),
												name: 'toString'
											}),
										_List_fromArray(
											[err]))));
						}),
					ok: A2(
						$elm$core$Tuple$pair,
						'ok',
						function (ok) {
							return A2(
								$author$project$Gen$Ui$el,
								_List_fromArray(
									[
										A2($author$project$Gen$Ui$paddingXY, 32, 0),
										$author$project$Gen$Ui$width($author$project$Gen$Ui$fill),
										$author$project$Gen$Ui$htmlAttribute(
										A2($author$project$Gen$Html$Attributes$style, 'background', 'rgb(36,36,36)'))
									]),
								$author$project$Gen$Ui$call_.text(
									A2(
										$mdgriffith$elm_codegen$Elm$apply,
										$mdgriffith$elm_codegen$Elm$value(
											{
												annotation: $elm$core$Maybe$Nothing,
												importFrom: _List_fromArray(
													['Debug']),
												name: 'toString'
											}),
										_List_fromArray(
											[ok]))));
						})
				});
		})
};
var $author$project$Exemplar$interactiveAll = function (mod) {
	var examples = A3(
		$elm$core$List$foldl,
		F2(
			function (val, exes) {
				if ($author$project$Example$Type$isStartingPoint(val.tipe)) {
					var _v0 = A2($author$project$Example$Build$getValueNamed, val.name, mod.values);
					if (_v0.$ === 'Nothing') {
						return exes;
					} else {
						var value = _v0.a;
						var builtResult = A2(
							$author$project$Example$Interactive$build,
							mod,
							{
								runners: _List_fromArray(
									[$author$project$Exemplar$element, $author$project$Exemplar$parser]),
								start: value
							});
						if (builtResult.$ === 'Err') {
							var err = builtResult.a;
							return exes;
						} else {
							var examp = builtResult.a;
							return A2($elm$core$List$cons, examp, exes);
						}
					}
				} else {
					return exes;
				}
			}),
		_List_Nil,
		mod.values);
	return $elm$core$Result$Ok(
		{examples: examples, name: mod.name});
};
var $author$project$Generate$renderExampleModule = function (mod) {
	var _v0 = $author$project$Exemplar$interactiveAll(mod);
	if (_v0.$ === 'Err') {
		var err = _v0.a;
		return A2(
			$elm$core$Debug$log,
			'error',
			A2(
				$mdgriffith$elm_codegen$Elm$file,
				_List_fromArray(
					['Live']),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_codegen$Elm$declaration,
						'error',
						$mdgriffith$elm_codegen$Elm$string(err))
					])));
	} else {
		var interactives = _v0.a;
		return A2(
			$elm$core$Debug$log,
			'interactives',
			A2(
				$author$project$Interactive$generate,
				A2(
					$elm$core$List$cons,
					'Dev',
					A2($elm$core$String$split, '.', interactives.name)),
				interactives));
	}
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Generate$main = A2(
	$author$project$Gen$CodeGen$Generate$fromJson,
	$author$project$Options$decoder,
	function (options) {
		var _v0 = A2($elm$core$Debug$log, 'options', options);
		return A2(
			$elm$core$List$cons,
			$author$project$Generate$PageId$generate(options),
			_Utils_ap(
				$author$project$Generate$Page$generate(options),
				A2($elm$core$List$map, $author$project$Generate$renderExampleModule, options.project)));
	});
_Platform_export({'Generate':{'init':$author$project$Generate$main($elm$json$Json$Decode$value)(0)}});}(this));