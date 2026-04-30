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

	for (var __keys_key = Object.keys(x), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
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

	for (var __keys_key = Object.keys(oldRecord), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
		newRecord[key] = oldRecord[key];
	}

	for (var __keys_key = Object.keys(updatedFields), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
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
			for (var __keys_k = Object.keys(value), __i_k = 0; __i_k < __keys_k.length; __i_k++) { var k = __keys_k[__i_k];
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
		for (var __keys_i = Object.keys(value), __i_i = 0; __i_i < __keys_i.length; __i_i++) { var i = __keys_i[__i_i];
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
		for (var __keys_key = Object.keys(value), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
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
			for (var __keys_key = Object.keys(value), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
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
	for (var __keys_key = Object.keys(_Platform_effectManagers), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
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

	for (var __keys_home = Object.keys(managers), __i_home = 0; __i_home < __keys_home.length; __i_home++) { var home = __keys_home[__i_home];
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
	for (var __keys_name = Object.keys(exports), __i_name = 0; __i_name < __keys_name.length; __i_name++) { var name = __keys_name[__i_name];
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
	for (var __keys_name = Object.keys(exports), __i_name = 0; __i_name < __keys_name.length; __i_name++) { var name = __keys_name[__i_name];
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var __keys_key = Object.keys(facts), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var __keys_key = Object.keys(styles), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var __keys_key = Object.keys(attrs), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var __keys_key = Object.keys(nsAttrs), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var __keys_key = Object.keys(events), __i_key = 0; __i_key < __keys_key.length; __i_key++) { var key = __keys_key[__i_key];
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var __keys_xKey = Object.keys(x), __i_xKey = 0; __i_xKey < __keys_xKey.length; __i_xKey++) { var xKey = __keys_xKey[__i_xKey];
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var __keys_yKey = Object.keys(y), __i_yKey = 0; __i_yKey < __keys_yKey.length; __i_yKey++) { var yKey = __keys_yKey[__i_yKey];
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}

function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}var $author$project$Main$OnUrlChange = function (a) {
	return {$: 'OnUrlChange', a: a};
};
var $author$project$Main$OnUrlRequest = function (a) {
	return {$: 'OnUrlRequest', a: a};
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
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
var $elm$core$Basics$append = _Utils_append;
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
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
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
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $author$project$Main$Clipboard = {$: 'Clipboard'};
var $author$project$Main$Live = {$: 'Live'};
var $author$project$Main$NotStarted = {$: 'NotStarted'};
var $elm$browser$Browser$Events$Visible = {$: 'Visible'};
var $author$project$Swipe$None = {$: 'None'};
var $author$project$Swipe$blanco = $author$project$Swipe$None;
var $author$project$Main$fotoJsonUrl = 'fotojson.jpg';
var $author$project$Main$peoplePrefix = 'people/';
var $author$project$Main$urlDisplay = function (url) {
	if (A2($elm$core$String$startsWith, 'http', url)) {
		var cnt = A2($elm$core$String$startsWith, 'https://', url) ? 8 : 0;
		return A2($elm$core$String$dropLeft, cnt, url);
	} else {
		if (A2($elm$core$String$startsWith, $author$project$Main$peoplePrefix, url)) {
			return A2(
				$elm$core$String$dropLeft,
				$elm$core$String$length($author$project$Main$peoplePrefix),
				url);
		} else {
			return url;
		}
	}
};
var $author$project$Main$srcSource = function (src) {
	return {
		label: $elm$core$Maybe$Nothing,
		src: $author$project$Main$urlDisplay(src),
		url: $elm$core$Maybe$Nothing
	};
};
var $author$project$Main$fotoJsonSource = $author$project$Main$srcSource($author$project$Main$fotoJsonUrl);
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
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
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm_community$string_extra$String$Extra$leftOfBack = F2(
	function (pattern, string) {
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (a) {
					return A2($elm$core$String$left, a, string);
				},
				$elm$core$List$head(
					$elm$core$List$reverse(
						A2($elm$core$String$indexes, pattern, string)))));
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm_community$string_extra$String$Extra$rightOfBack = F2(
	function (pattern, string) {
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Basics$add(
						$elm$core$String$length(pattern)),
					function (a) {
						return A2($elm$core$String$dropLeft, a, string);
					}),
				$elm$core$List$head(
					$elm$core$List$reverse(
						A2($elm$core$String$indexes, pattern, string)))));
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm_community$string_extra$String$Extra$regexFromString = A2(
	$elm$core$Basics$composeR,
	$elm$regex$Regex$fromString,
	$elm$core$Maybe$withDefault($elm$regex$Regex$never));
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $elm$core$String$cons = _String_cons;
var $elm_community$string_extra$String$Extra$changeCase = F2(
	function (mutator, word) {
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (_v0) {
					var head = _v0.a;
					var tail = _v0.b;
					return A2(
						$elm$core$String$cons,
						mutator(head),
						tail);
				},
				$elm$core$String$uncons(word)));
	});
var $elm$core$Char$toUpper = _Char_toUpper;
var $elm_community$string_extra$String$Extra$toSentenceCase = function (word) {
	return A2($elm_community$string_extra$String$Extra$changeCase, $elm$core$Char$toUpper, word);
};
var $elm_community$string_extra$String$Extra$toTitleCase = function (ws) {
	var uppercaseMatch = A2(
		$elm$regex$Regex$replace,
		$elm_community$string_extra$String$Extra$regexFromString('\\w+'),
		A2(
			$elm$core$Basics$composeR,
			function ($) {
				return $.match;
			},
			$elm_community$string_extra$String$Extra$toSentenceCase));
	return A3(
		$elm$regex$Regex$replace,
		$elm_community$string_extra$String$Extra$regexFromString('^([a-z])|\\s+([a-z])'),
		A2(
			$elm$core$Basics$composeR,
			function ($) {
				return $.match;
			},
			uppercaseMatch),
		ws);
};
var $author$project$Main$getLabelFromFileName = function (filename) {
	var noType = A2($elm_community$string_extra$String$Extra$leftOfBack, '.', filename);
	var name = A2($elm_community$string_extra$String$Extra$rightOfBack, '/', noType);
	return $elm_community$string_extra$String$Extra$toTitleCase(
		A3(
			$elm$core$String$replace,
			'_',
			' ',
			A3(
				$elm$core$String$replace,
				'-',
				' ',
				(name === '') ? noType : name)));
};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$State = function (a) {
	return {$: 'State', a: a};
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$initialState = function (prefix) {
	return $billstclair$elm_localstorage$PortFunnel$LocalStorage$State(
		{isLoaded: false, prefix: prefix, simulationDict: $elm$core$Dict$empty});
};
var $author$project$PortFunnels$initialState = function (prefix) {
	return {
		storage: $billstclair$elm_localstorage$PortFunnel$LocalStorage$initialState(prefix)
	};
};
var $author$project$Main$localStoragePrefix = 'fotojson';
var $elm$core$Debug$log = _Debug_log;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = F2(
	function (url, key) {
		return _Utils_Tuple2(
			{
				clipboard: '',
				copyFrom: $author$project$Main$Live,
				copyTo: $author$project$Main$Clipboard,
				defaultSources: _List_fromArray(
					[$author$project$Main$fotoJsonSource]),
				editingIdx: 0,
				editingIdxStr: '0',
				editingLabel: $author$project$Main$getLabelFromFileName($author$project$Main$fotoJsonUrl),
				editingSrc: $author$project$Main$fotoJsonUrl,
				editingUrl: '',
				err: $elm$core$Maybe$Nothing,
				funnelState: $author$project$PortFunnels$initialState($author$project$Main$localStoragePrefix),
				gesture: $author$project$Swipe$blanco,
				isFocused: false,
				key: key,
				lastKey: '',
				lastSources: _List_fromArray(
					[$author$project$Main$fotoJsonUrl]),
				lastSwapTime: 0,
				mergeEditingSources: true,
				reallyDeleteState: false,
				searchCnt: 10,
				searchStart: 0,
				searchString: '',
				settings: $elm$core$Maybe$Nothing,
				showControls: false,
				showEditingSources: true,
				showHelp: true,
				showSearch: false,
				sourcePanelIdx: -1,
				sourcePanels: _List_Nil,
				sources: _List_fromArray(
					[$author$project$Main$fotoJsonSource]),
				srcIdx: 0,
				started: $author$project$Main$NotStarted,
				switchEnabled: true,
				switchPeriod: '5',
				time: 0,
				title: 'Foto JSON app',
				undoModel: $elm$core$Maybe$Nothing,
				url: A2($elm$core$Debug$log, 'init, initial url', url),
				visibility: $elm$browser$Browser$Events$Visible
			},
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Main$ClipboardContents = function (a) {
	return {$: 'ClipboardContents', a: a};
};
var $author$project$Main$Process = function (a) {
	return {$: 'Process', a: a};
};
var $author$project$Main$ReceiveSettings = function (a) {
	return {$: 'ReceiveSettings', a: a};
};
var $author$project$Main$ReceiveTime = function (a) {
	return {$: 'ReceiveTime', a: a};
};
var $author$project$Main$SetVisible = function (a) {
	return {$: 'SetVisible', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$clipboardContents = _Platform_incomingPort('clipboardContents', $elm$json$Json$Decode$string);
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
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
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
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
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $author$project$Main$getSettings = _Platform_incomingPort(
	'getSettings',
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2(
				$elm$json$Json$Decode$map,
				$elm$core$Maybe$Just,
				A2(
					$elm$json$Json$Decode$andThen,
					function (title) {
						return A2(
							$elm$json$Json$Decode$andThen,
							function (showTitle) {
								return A2(
									$elm$json$Json$Decode$andThen,
									function (localStoragePrefix) {
										return A2(
											$elm$json$Json$Decode$andThen,
											function (githubUrl) {
												return A2(
													$elm$json$Json$Decode$andThen,
													function (copyright) {
														return $elm$json$Json$Decode$succeed(
															{copyright: copyright, githubUrl: githubUrl, localStoragePrefix: localStoragePrefix, showTitle: showTitle, title: title});
													},
													A2(
														$elm$json$Json$Decode$field,
														'copyright',
														$elm$json$Json$Decode$oneOf(
															_List_fromArray(
																[
																	$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																	A2(
																	$elm$json$Json$Decode$map,
																	$elm$core$Maybe$Just,
																	A2(
																		$elm$json$Json$Decode$andThen,
																		function (url) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (text) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (date) {
																							return $elm$json$Json$Decode$succeed(
																								{date: date, text: text, url: url});
																						},
																						A2($elm$json$Json$Decode$field, 'date', $elm$json$Json$Decode$string));
																				},
																				A2($elm$json$Json$Decode$field, 'text', $elm$json$Json$Decode$string));
																		},
																		A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string)))
																]))));
											},
											A2(
												$elm$json$Json$Decode$field,
												'githubUrl',
												$elm$json$Json$Decode$oneOf(
													_List_fromArray(
														[
															$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
															A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
														]))));
									},
									A2($elm$json$Json$Decode$field, 'localStoragePrefix', $elm$json$Json$Decode$string));
							},
							A2($elm$json$Json$Decode$field, 'showTitle', $elm$json$Json$Decode$bool));
					},
					A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string)))
			])));
var $author$project$Main$OnKeyPress = F2(
	function (a, b) {
		return {$: 'OnKeyPress', a: a, b: b};
	});
var $author$project$Main$keyDecoder = function (keyDown) {
	return A2(
		$elm$json$Json$Decode$map,
		$author$project$Main$OnKeyPress(keyDown),
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
};
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
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
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
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
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keyup');
var $elm$browser$Browser$Events$Hidden = {$: 'Hidden'};
var $elm$browser$Browser$Events$withHidden = F2(
	function (func, isHidden) {
		return func(
			isHidden ? $elm$browser$Browser$Events$Hidden : $elm$browser$Browser$Events$Visible);
	});
var $elm$browser$Browser$Events$onVisibilityChange = function (func) {
	var info = _Browser_visibilityInfo(_Utils_Tuple0);
	return A3(
		$elm$browser$Browser$Events$on,
		$elm$browser$Browser$Events$Document,
		info.change,
		A2(
			$elm$json$Json$Decode$map,
			$elm$browser$Browser$Events$withHidden(func),
			A2(
				$elm$json$Json$Decode$field,
				'target',
				A2($elm$json$Json$Decode$field, info.hidden, $elm$json$Json$Decode$bool))));
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$PortFunnels$subPort = _Platform_incomingPort('subPort', $elm$json$Json$Decode$value);
var $author$project$PortFunnels$subscriptions = F2(
	function (process, model) {
		return $author$project$PortFunnels$subPort(process);
	});
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onVisibilityChange($author$project$Main$SetVisible),
				$elm$browser$Browser$Events$onKeyUp(
				$author$project$Main$keyDecoder(false)),
				A2($elm$time$Time$every, 100.0, $author$project$Main$ReceiveTime),
				A2($author$project$PortFunnels$subscriptions, $author$project$Main$Process, model),
				$elm$browser$Browser$Events$onKeyDown(
				$author$project$Main$keyDecoder(true)),
				$author$project$Main$getSettings($author$project$Main$ReceiveSettings),
				$author$project$Main$clipboardContents($author$project$Main$ClipboardContents)
			]));
};
var $author$project$Main$Started = {$: 'Started'};
var $author$project$Main$Undo = {$: 'Undo'};
var $author$project$Main$keyIsCommand = function (key) {
	return (key === 'Control') || (key === 'Meta');
};
var $author$project$Main$modelToSavedModel = function (model) {
	return {lastSources: model.lastSources, mergeEditingSources: model.mergeEditingSources, showControls: model.showControls, showEditingSources: model.showEditingSources, showHelp: model.showHelp, showSearch: model.showSearch, sourcePanelIdx: model.sourcePanelIdx, sourcePanels: model.sourcePanels, sources: model.sources, srcIdx: model.srcIdx, switchEnabled: model.switchEnabled, switchPeriod: model.switchPeriod};
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$not = _Basics_not;
var $elm$json$Json$Encode$bool = _Json_wrap;
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
var $author$project$Main$encodeSource = function (_v0) {
	var src = _v0.src;
	var label = _v0.label;
	var url = _v0.url;
	return ((_Utils_eq(label, $elm$core$Maybe$Nothing) || _Utils_eq(
		label,
		$elm$core$Maybe$Just(''))) && (_Utils_eq(url, $elm$core$Maybe$Nothing) || _Utils_eq(
		url,
		$elm$core$Maybe$Just('')))) ? $elm$json$Json$Encode$string(src) : $elm$json$Json$Encode$object(
		$elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						_Utils_Tuple2(
						'src',
						$elm$json$Json$Encode$string(src))
					]),
					function () {
					if (label.$ === 'Nothing') {
						return _List_Nil;
					} else {
						if (label.a === '') {
							return _List_Nil;
						} else {
							var l = label.a;
							return _List_fromArray(
								[
									_Utils_Tuple2(
									'label',
									$elm$json$Json$Encode$string(l))
								]);
						}
					}
				}(),
					function () {
					if (url.$ === 'Nothing') {
						return _List_Nil;
					} else {
						if (url.a === '') {
							return _List_Nil;
						} else {
							var u = url.a;
							return _List_fromArray(
								[
									_Utils_Tuple2(
									'url',
									$elm$json$Json$Encode$string(u))
								]);
						}
					}
				}()
				])));
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$Main$encodeSourcePanel = function (panel) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(panel.name)),
				_Utils_Tuple2(
				'panels',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodeSource, panel.panels))
			]));
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Main$encodeSavedModel = function (savedModel) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'sources',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodeSource, savedModel.sources)),
				_Utils_Tuple2(
				'lastSources',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, savedModel.lastSources)),
				_Utils_Tuple2(
				'srcIdx',
				$elm$json$Json$Encode$int(savedModel.srcIdx)),
				_Utils_Tuple2(
				'sourcePanels',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodeSourcePanel, savedModel.sourcePanels)),
				_Utils_Tuple2(
				'sourcePanelIdx',
				$elm$json$Json$Encode$int(savedModel.sourcePanelIdx)),
				_Utils_Tuple2(
				'switchPeriod',
				$elm$json$Json$Encode$string(savedModel.switchPeriod)),
				_Utils_Tuple2(
				'switchEnabled',
				$elm$json$Json$Encode$bool(savedModel.switchEnabled)),
				_Utils_Tuple2(
				'showControls',
				$elm$json$Json$Encode$bool(savedModel.showControls)),
				_Utils_Tuple2(
				'showEditingSources',
				$elm$json$Json$Encode$bool(savedModel.showEditingSources)),
				_Utils_Tuple2(
				'showHelp',
				$elm$json$Json$Encode$bool(savedModel.showHelp)),
				_Utils_Tuple2(
				'mergeEditingSources',
				$elm$json$Json$Encode$bool(savedModel.mergeEditingSources)),
				_Utils_Tuple2(
				'showSearch',
				$elm$json$Json$Encode$bool(savedModel.showSearch))
			]));
};
var $author$project$Main$pk = {model: 'model'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$getPrefix = function (_v0) {
	var state = _v0.a;
	return state.prefix;
};
var $author$project$PortFunnels$cmdPort = _Platform_outgoingPort('cmdPort', $elm$core$Basics$identity);
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $billstclair$elm_port_funnel$PortFunnel$decodeValue = F2(
	function (decoder, value) {
		var _v0 = A2($elm$json$Json$Decode$decodeValue, decoder, value);
		if (_v0.$ === 'Ok') {
			var res = _v0.a;
			return $elm$core$Result$Ok(res);
		} else {
			var err = _v0.a;
			return $elm$core$Result$Err(
				$elm$json$Json$Decode$errorToString(err));
		}
	});
var $billstclair$elm_port_funnel$PortFunnel$GenericMessage = F3(
	function (moduleName, tag, args) {
		return {args: args, moduleName: moduleName, tag: tag};
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $billstclair$elm_port_funnel$PortFunnel$genericMessageDecoder = A4(
	$elm$json$Json$Decode$map3,
	$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
	A2($elm$json$Json$Decode$field, 'module', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'tag', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'args', $elm$json$Json$Decode$value));
var $billstclair$elm_port_funnel$PortFunnel$decodeGenericMessage = function (value) {
	return A2($billstclair$elm_port_funnel$PortFunnel$decodeValue, $billstclair$elm_port_funnel$PortFunnel$genericMessageDecoder, value);
};
var $billstclair$elm_port_funnel$PortFunnel$encodeGenericMessage = function (message) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'module',
				$elm$json$Json$Encode$string(message.moduleName)),
				_Utils_Tuple2(
				'tag',
				$elm$json$Json$Encode$string(message.tag)),
				_Utils_Tuple2('args', message.args)
			]));
};
var $billstclair$elm_port_funnel$PortFunnel$makeSimulatedFunnelCmdPort = F4(
	function (_v0, simulator, tagger, value) {
		var moduleDesc = _v0.a;
		var _v1 = $billstclair$elm_port_funnel$PortFunnel$decodeGenericMessage(value);
		if (_v1.$ === 'Err') {
			return $elm$core$Platform$Cmd$none;
		} else {
			var genericMessage = _v1.a;
			var _v2 = moduleDesc.decoder(genericMessage);
			if (_v2.$ === 'Err') {
				return $elm$core$Platform$Cmd$none;
			} else {
				var message = _v2.a;
				var _v3 = simulator(message);
				if (_v3.$ === 'Nothing') {
					return $elm$core$Platform$Cmd$none;
				} else {
					var receivedMessage = _v3.a;
					return A2(
						$elm$core$Task$perform,
						tagger,
						$elm$core$Task$succeed(
							$billstclair$elm_port_funnel$PortFunnel$encodeGenericMessage(
								moduleDesc.encoder(receivedMessage))));
				}
			}
		}
	});
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$Clear = function (a) {
	return {$: 'Clear', a: a};
};
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$Get = F2(
	function (a, b) {
		return {$: 'Get', a: a, b: b};
	});
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$Got = F3(
	function (a, b, c) {
		return {$: 'Got', a: a, b: b, c: c};
	});
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$Keys = F3(
	function (a, b, c) {
		return {$: 'Keys', a: a, b: b, c: c};
	});
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$ListKeys = F2(
	function (a, b) {
		return {$: 'ListKeys', a: a, b: b};
	});
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$Put = F2(
	function (a, b) {
		return {$: 'Put', a: a, b: b};
	});
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$SessionStorage = function (a) {
	return {$: 'SessionStorage', a: a};
};
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulateClear = function (a) {
	return {$: 'SimulateClear', a: a};
};
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulateGet = F2(
	function (a, b) {
		return {$: 'SimulateGet', a: a, b: b};
	});
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulateListKeys = F2(
	function (a, b) {
		return {$: 'SimulateListKeys', a: a, b: b};
	});
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulatePut = F2(
	function (a, b) {
		return {$: 'SimulatePut', a: a, b: b};
	});
var $billstclair$elm_localstorage$PortFunnel$InternalTypes$Startup = {$: 'Startup'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$GotRecord = F3(
	function (label, key, value) {
		return {key: key, label: label, value: value};
	});
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$gotDecoder = A4(
	$elm$json$Json$Decode$map3,
	$billstclair$elm_localstorage$PortFunnel$LocalStorage$GotRecord,
	A2(
		$elm$json$Json$Decode$field,
		'label',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string)),
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$value));
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$KeysRecord = F3(
	function (label, prefix, keys) {
		return {keys: keys, label: label, prefix: prefix};
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$keysDecoder = A4(
	$elm$json$Json$Decode$map3,
	$billstclair$elm_localstorage$PortFunnel$LocalStorage$KeysRecord,
	A2(
		$elm$json$Json$Decode$field,
		'label',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string)),
	A2($elm$json$Json$Decode$field, 'prefix', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'keys',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$labeledStringDecoder = function (property) {
	return A3(
		$elm$json$Json$Decode$map2,
		$elm$core$Tuple$pair,
		A2(
			$elm$json$Json$Decode$field,
			'label',
			$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string)),
		A2($elm$json$Json$Decode$field, property, $elm$json$Json$Decode$string));
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$PutRecord = F2(
	function (key, value) {
		return {key: key, value: value};
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$putDecoder = A3(
	$elm$json$Json$Decode$map2,
	$billstclair$elm_localstorage$PortFunnel$LocalStorage$PutRecord,
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$value));
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$NOTAG = {$: 'NOTAG'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$ClearTag = {$: 'ClearTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$GetTag = {$: 'GetTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$GotTag = {$: 'GotTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$KeysTag = {$: 'KeysTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$ListKeysTag = {$: 'ListKeysTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$PutTag = {$: 'PutTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$SessionStorageTag = {$: 'SessionStorageTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$SimulateClearTag = {$: 'SimulateClearTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$SimulateGetTag = {$: 'SimulateGetTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$SimulateListKeysTag = {$: 'SimulateListKeysTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$SimulatePutTag = {$: 'SimulatePutTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$StartupTag = {$: 'StartupTag'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$clearTag = 'clear';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$getTag = 'get';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$gotTag = 'got';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$keysTag = 'keys';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$listKeysTag = 'listkeys';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$putTag = 'put';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$sessionStorageTag = 'sessionstorage';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$simulateClearTag = 'simulateclear';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$simulateGetTag = 'simulateget';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$simulateListKeysTag = 'simulatelistkeys';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$simulatePutTag = 'simulateput';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$startupTag = 'startup';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$tagDict = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$startupTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$StartupTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$getTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$GetTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$gotTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$GotTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$putTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$PutTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$listKeysTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$ListKeysTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$keysTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$KeysTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$clearTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$ClearTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$sessionStorageTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$SessionStorageTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$simulateGetTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$SimulateGetTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$simulatePutTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$SimulatePutTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$simulateListKeysTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$SimulateListKeysTag),
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$simulateClearTag, $billstclair$elm_localstorage$PortFunnel$LocalStorage$SimulateClearTag)
		]));
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$strtag = function (str) {
	var _v0 = A2($elm$core$Dict$get, str, $billstclair$elm_localstorage$PortFunnel$LocalStorage$tagDict);
	if (_v0.$ === 'Just') {
		var tag = _v0.a;
		return tag;
	} else {
		return $billstclair$elm_localstorage$PortFunnel$LocalStorage$NOTAG;
	}
};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$decode = function (_v0) {
	var tag = _v0.tag;
	var args = _v0.args;
	var _v1 = $billstclair$elm_localstorage$PortFunnel$LocalStorage$strtag(tag);
	switch (_v1.$) {
		case 'GetTag':
			var _v2 = A2(
				$elm$json$Json$Decode$decodeValue,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$labeledStringDecoder('key'),
				args);
			if (_v2.$ === 'Ok') {
				var _v3 = _v2.a;
				var label = _v3.a;
				var key = _v3.b;
				return $elm$core$Result$Ok(
					A2($billstclair$elm_localstorage$PortFunnel$InternalTypes$Get, label, key));
			} else {
				return $elm$core$Result$Err(
					'Get key not a string: ' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		case 'GotTag':
			var _v4 = A2($elm$json$Json$Decode$decodeValue, $billstclair$elm_localstorage$PortFunnel$LocalStorage$gotDecoder, args);
			if (_v4.$ === 'Ok') {
				var label = _v4.a.label;
				var key = _v4.a.key;
				var value = _v4.a.value;
				return $elm$core$Result$Ok(
					A3(
						$billstclair$elm_localstorage$PortFunnel$InternalTypes$Got,
						label,
						key,
						_Utils_eq(value, $elm$json$Json$Encode$null) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(value)));
			} else {
				return $elm$core$Result$Err(
					'Got not { label, key, value }: ' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		case 'PutTag':
			var _v5 = A2($elm$json$Json$Decode$decodeValue, $billstclair$elm_localstorage$PortFunnel$LocalStorage$putDecoder, args);
			if (_v5.$ === 'Ok') {
				var key = _v5.a.key;
				var value = _v5.a.value;
				return $elm$core$Result$Ok(
					A2(
						$billstclair$elm_localstorage$PortFunnel$InternalTypes$Put,
						key,
						_Utils_eq(value, $elm$json$Json$Encode$null) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(value)));
			} else {
				return $elm$core$Result$Err(
					'Put not { key, value }: ' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		case 'ListKeysTag':
			var _v6 = A2(
				$elm$json$Json$Decode$decodeValue,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$labeledStringDecoder('prefix'),
				args);
			if (_v6.$ === 'Ok') {
				var _v7 = _v6.a;
				var label = _v7.a;
				var prefix = _v7.b;
				return $elm$core$Result$Ok(
					A2($billstclair$elm_localstorage$PortFunnel$InternalTypes$ListKeys, label, prefix));
			} else {
				return $elm$core$Result$Err(
					'ListKeys prefix not a string: ' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		case 'KeysTag':
			var _v8 = A2($elm$json$Json$Decode$decodeValue, $billstclair$elm_localstorage$PortFunnel$LocalStorage$keysDecoder, args);
			if (_v8.$ === 'Ok') {
				var label = _v8.a.label;
				var prefix = _v8.a.prefix;
				var keys = _v8.a.keys;
				return $elm$core$Result$Ok(
					A3($billstclair$elm_localstorage$PortFunnel$InternalTypes$Keys, label, prefix, keys));
			} else {
				return $elm$core$Result$Err(
					'Keys not { prefix, keys }: ' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		case 'ClearTag':
			var _v9 = A2($elm$json$Json$Decode$decodeValue, $elm$json$Json$Decode$string, args);
			if (_v9.$ === 'Ok') {
				var prefix = _v9.a;
				return $elm$core$Result$Ok(
					$billstclair$elm_localstorage$PortFunnel$InternalTypes$Clear(prefix));
			} else {
				return $elm$core$Result$Err(
					'Clear prefix not a string: ' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		case 'SessionStorageTag':
			var _v10 = A2($elm$json$Json$Decode$decodeValue, $elm$json$Json$Decode$bool, args);
			if (_v10.$ === 'Ok') {
				var enable = _v10.a;
				return $elm$core$Result$Ok(
					$billstclair$elm_localstorage$PortFunnel$InternalTypes$SessionStorage(enable));
			} else {
				return $elm$core$Result$Err(
					'SessionStorage enable not a bool.' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		case 'StartupTag':
			return $elm$core$Result$Ok($billstclair$elm_localstorage$PortFunnel$InternalTypes$Startup);
		case 'SimulateGetTag':
			var _v11 = A2(
				$elm$json$Json$Decode$decodeValue,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$labeledStringDecoder('key'),
				args);
			if (_v11.$ === 'Ok') {
				var _v12 = _v11.a;
				var label = _v12.a;
				var key = _v12.b;
				return $elm$core$Result$Ok(
					A2($billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulateGet, label, key));
			} else {
				return $elm$core$Result$Err(
					'Get key not a string: ' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		case 'SimulatePutTag':
			var _v13 = A2($elm$json$Json$Decode$decodeValue, $billstclair$elm_localstorage$PortFunnel$LocalStorage$putDecoder, args);
			if (_v13.$ === 'Ok') {
				var key = _v13.a.key;
				var value = _v13.a.value;
				return $elm$core$Result$Ok(
					A2(
						$billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulatePut,
						key,
						_Utils_eq(value, $elm$json$Json$Encode$null) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(value)));
			} else {
				return $elm$core$Result$Err(
					'SimulatePut not { key, value }: ' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		case 'SimulateListKeysTag':
			var _v14 = A2(
				$elm$json$Json$Decode$decodeValue,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$labeledStringDecoder('prefix'),
				args);
			if (_v14.$ === 'Ok') {
				var _v15 = _v14.a;
				var label = _v15.a;
				var prefix = _v15.b;
				return $elm$core$Result$Ok(
					A2($billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulateListKeys, label, prefix));
			} else {
				return $elm$core$Result$Err(
					'SimulateListKeys prefix not a string: ' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		case 'SimulateClearTag':
			var _v16 = A2($elm$json$Json$Decode$decodeValue, $elm$json$Json$Decode$string, args);
			if (_v16.$ === 'Ok') {
				var prefix = _v16.a;
				return $elm$core$Result$Ok(
					$billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulateClear(prefix));
			} else {
				return $elm$core$Result$Err(
					'SimulateClear prefix not a string: ' + A2($elm$json$Json$Encode$encode, 0, args));
			}
		default:
			return $elm$core$Result$Err('Unknown tag: ' + tag);
	}
};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$encodeLabeledString = F3(
	function (label, string, property) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'label',
					function () {
						if (label.$ === 'Just') {
							var lab = label.a;
							return $elm$json$Json$Encode$string(lab);
						} else {
							return $elm$json$Json$Encode$null;
						}
					}()),
					_Utils_Tuple2(
					property,
					$elm$json$Json$Encode$string(string))
				]));
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName = 'LocalStorage';
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$encode = function (message) {
	switch (message.$) {
		case 'Startup':
			return A3($billstclair$elm_port_funnel$PortFunnel$GenericMessage, $billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName, $billstclair$elm_localstorage$PortFunnel$LocalStorage$startupTag, $elm$json$Json$Encode$null);
		case 'Get':
			var label = message.a;
			var key = message.b;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$getTag,
				A3($billstclair$elm_localstorage$PortFunnel$LocalStorage$encodeLabeledString, label, key, 'key'));
		case 'Got':
			var label = message.a;
			var key = message.b;
			var value = message.c;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$gotTag,
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'label',
							function () {
								if (label.$ === 'Just') {
									var lab = label.a;
									return $elm$json$Json$Encode$string(lab);
								} else {
									return $elm$json$Json$Encode$null;
								}
							}()),
							_Utils_Tuple2(
							'key',
							$elm$json$Json$Encode$string(key)),
							_Utils_Tuple2(
							'value',
							function () {
								if (value.$ === 'Nothing') {
									return $elm$json$Json$Encode$null;
								} else {
									var v = value.a;
									return v;
								}
							}())
						])));
		case 'Put':
			var key = message.a;
			var value = message.b;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$putTag,
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'key',
							$elm$json$Json$Encode$string(key)),
							_Utils_Tuple2(
							'value',
							function () {
								if (value.$ === 'Nothing') {
									return $elm$json$Json$Encode$null;
								} else {
									var v = value.a;
									return v;
								}
							}())
						])));
		case 'ListKeys':
			var label = message.a;
			var prefix = message.b;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$listKeysTag,
				A3($billstclair$elm_localstorage$PortFunnel$LocalStorage$encodeLabeledString, label, prefix, 'prefix'));
		case 'Keys':
			var label = message.a;
			var prefix = message.b;
			var keys = message.c;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$keysTag,
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'label',
							function () {
								if (label.$ === 'Just') {
									var lab = label.a;
									return $elm$json$Json$Encode$string(lab);
								} else {
									return $elm$json$Json$Encode$null;
								}
							}()),
							_Utils_Tuple2(
							'prefix',
							$elm$json$Json$Encode$string(prefix)),
							_Utils_Tuple2(
							'keys',
							A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, keys))
						])));
		case 'Clear':
			var prefix = message.a;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$clearTag,
				$elm$json$Json$Encode$string(prefix));
		case 'SessionStorage':
			var enable = message.a;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$sessionStorageTag,
				$elm$json$Json$Encode$bool(enable));
		case 'SimulateGet':
			var label = message.a;
			var key = message.b;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$simulateGetTag,
				A3($billstclair$elm_localstorage$PortFunnel$LocalStorage$encodeLabeledString, label, key, 'key'));
		case 'SimulatePut':
			var key = message.a;
			var value = message.b;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$simulatePutTag,
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'key',
							$elm$json$Json$Encode$string(key)),
							_Utils_Tuple2(
							'value',
							function () {
								if (value.$ === 'Nothing') {
									return $elm$json$Json$Encode$null;
								} else {
									var v = value.a;
									return v;
								}
							}())
						])));
		case 'SimulateListKeys':
			var label = message.a;
			var prefix = message.b;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$simulateListKeysTag,
				A3($billstclair$elm_localstorage$PortFunnel$LocalStorage$encodeLabeledString, label, prefix, 'prefix'));
		default:
			var prefix = message.a;
			return A3(
				$billstclair$elm_port_funnel$PortFunnel$GenericMessage,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$simulateClearTag,
				$elm$json$Json$Encode$string(prefix));
	}
};
var $billstclair$elm_port_funnel$PortFunnel$ModuleDesc = function (a) {
	return {$: 'ModuleDesc', a: a};
};
var $billstclair$elm_port_funnel$PortFunnel$ModuleDescRecord = F4(
	function (moduleName, encoder, decoder, process) {
		return {decoder: decoder, encoder: encoder, moduleName: moduleName, process: process};
	});
var $billstclair$elm_port_funnel$PortFunnel$makeModuleDesc = F4(
	function (name, encoder, decoder, processor) {
		return $billstclair$elm_port_funnel$PortFunnel$ModuleDesc(
			A4($billstclair$elm_port_funnel$PortFunnel$ModuleDescRecord, name, encoder, decoder, processor));
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$GetResponse = function (a) {
	return {$: 'GetResponse', a: a};
};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$ListKeysResponse = function (a) {
	return {$: 'ListKeysResponse', a: a};
};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$NoResponse = {$: 'NoResponse'};
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
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $elm_community$dict_extra$Dict$Extra$removeWhen = F2(
	function (pred, dict) {
		return A2(
			$elm$core$Dict$filter,
			F2(
				function (k, v) {
					return !A2(pred, k, v);
				}),
			dict);
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$stripPrefix = F2(
	function (prefix, key) {
		return (prefix === '') ? key : A2(
			$elm$core$String$dropLeft,
			1 + $elm$core$String$length(prefix),
			key);
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$process = F2(
	function (message, boxedState) {
		var state = boxedState.a;
		switch (message.$) {
			case 'Got':
				var label = message.a;
				var key = message.b;
				var value = message.c;
				return _Utils_Tuple2(
					boxedState,
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$GetResponse(
						{
							key: A2($billstclair$elm_localstorage$PortFunnel$LocalStorage$stripPrefix, state.prefix, key),
							label: label,
							value: value
						}));
			case 'Keys':
				var label = message.a;
				var prefix = message.b;
				var keys = message.c;
				return _Utils_Tuple2(
					boxedState,
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$ListKeysResponse(
						{
							keys: A2(
								$elm$core$List$map,
								$billstclair$elm_localstorage$PortFunnel$LocalStorage$stripPrefix(state.prefix),
								keys),
							label: label,
							prefix: A2($billstclair$elm_localstorage$PortFunnel$LocalStorage$stripPrefix, state.prefix, prefix)
						}));
			case 'Startup':
				return _Utils_Tuple2(
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$State(
						_Utils_update(
							state,
							{isLoaded: true})),
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$NoResponse);
			case 'SimulateGet':
				var label = message.a;
				var key = message.b;
				return _Utils_Tuple2(
					boxedState,
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$GetResponse(
						{
							key: A2($billstclair$elm_localstorage$PortFunnel$LocalStorage$stripPrefix, state.prefix, key),
							label: label,
							value: A2($elm$core$Dict$get, key, state.simulationDict)
						}));
			case 'SimulatePut':
				var key = message.a;
				var value = message.b;
				return _Utils_Tuple2(
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$State(
						_Utils_update(
							state,
							{
								simulationDict: function () {
									if (value.$ === 'Nothing') {
										return A2($elm$core$Dict$remove, key, state.simulationDict);
									} else {
										var v = value.a;
										return A3($elm$core$Dict$insert, key, v, state.simulationDict);
									}
								}()
							})),
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$NoResponse);
			case 'SimulateListKeys':
				var label = message.a;
				var prefix = message.b;
				return _Utils_Tuple2(
					boxedState,
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$ListKeysResponse(
						{
							keys: A3(
								$elm$core$Dict$foldr,
								F3(
									function (k, _v2, res) {
										return A2($elm$core$String$startsWith, prefix, k) ? A2(
											$elm$core$List$cons,
											A2($billstclair$elm_localstorage$PortFunnel$LocalStorage$stripPrefix, state.prefix, k),
											res) : res;
									}),
								_List_Nil,
								state.simulationDict),
							label: label,
							prefix: A2($billstclair$elm_localstorage$PortFunnel$LocalStorage$stripPrefix, state.prefix, prefix)
						}));
			case 'SimulateClear':
				var prefix = message.a;
				return _Utils_Tuple2(
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$State(
						_Utils_update(
							state,
							{
								simulationDict: A2(
									$elm_community$dict_extra$Dict$Extra$removeWhen,
									F2(
										function (k, _v3) {
											return A2($elm$core$String$startsWith, prefix, k);
										}),
									state.simulationDict)
							})),
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$NoResponse);
			default:
				return _Utils_Tuple2(
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$State(state),
					$billstclair$elm_localstorage$PortFunnel$LocalStorage$NoResponse);
		}
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleDesc = A4($billstclair$elm_port_funnel$PortFunnel$makeModuleDesc, $billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName, $billstclair$elm_localstorage$PortFunnel$LocalStorage$encode, $billstclair$elm_localstorage$PortFunnel$LocalStorage$decode, $billstclair$elm_localstorage$PortFunnel$LocalStorage$process);
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$simulator = function (message) {
	switch (message.$) {
		case 'Get':
			var label = message.a;
			var key = message.b;
			return $elm$core$Maybe$Just(
				A2($billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulateGet, label, key));
		case 'Put':
			var key = message.a;
			var value = message.b;
			return $elm$core$Maybe$Just(
				A2($billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulatePut, key, value));
		case 'ListKeys':
			var label = message.a;
			var prefix = message.b;
			return $elm$core$Maybe$Just(
				A2($billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulateListKeys, label, prefix));
		case 'Clear':
			var prefix = message.a;
			return $elm$core$Maybe$Just(
				$billstclair$elm_localstorage$PortFunnel$InternalTypes$SimulateClear(prefix));
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$makeSimulatedCmdPort = A2($billstclair$elm_port_funnel$PortFunnel$makeSimulatedFunnelCmdPort, $billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleDesc, $billstclair$elm_localstorage$PortFunnel$LocalStorage$simulator);
var $author$project$PortFunnels$simulatedPortDict = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2($billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName, $billstclair$elm_localstorage$PortFunnel$LocalStorage$makeSimulatedCmdPort)
		]));
var $author$project$PortFunnels$getCmdPort = F3(
	function (tagger, moduleName, useSimulator) {
		if (!useSimulator) {
			return $author$project$PortFunnels$cmdPort;
		} else {
			var _v0 = A2($elm$core$Dict$get, moduleName, $author$project$PortFunnels$simulatedPortDict);
			if (_v0.$ === 'Just') {
				var makeSimulatedCmdPort = _v0.a;
				return makeSimulatedCmdPort(tagger);
			} else {
				return $author$project$PortFunnels$cmdPort;
			}
		}
	});
var $author$project$Main$getCmdPort = F2(
	function (moduleName, _v0) {
		return A3($author$project$PortFunnels$getCmdPort, $author$project$Main$Process, moduleName, false);
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$addPrefix = F2(
	function (prefix, key) {
		return (prefix === '') ? key : (prefix + ('.' + key));
	});
var $billstclair$elm_port_funnel$PortFunnel$messageToValue = F2(
	function (_v0, message) {
		var moduleDesc = _v0.a;
		return $billstclair$elm_port_funnel$PortFunnel$encodeGenericMessage(
			moduleDesc.encoder(message));
	});
var $billstclair$elm_port_funnel$PortFunnel$sendMessage = F3(
	function (moduleDesc, cmdPort, message) {
		return cmdPort(
			A2($billstclair$elm_port_funnel$PortFunnel$messageToValue, moduleDesc, message));
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$send = F3(
	function (wrapper, message, _v0) {
		var state = _v0.a;
		var prefix = state.prefix;
		var mess = function () {
			switch (message.$) {
				case 'Get':
					var label = message.a;
					var key = message.b;
					return A2(
						$billstclair$elm_localstorage$PortFunnel$InternalTypes$Get,
						label,
						A2($billstclair$elm_localstorage$PortFunnel$LocalStorage$addPrefix, prefix, key));
				case 'Put':
					var key = message.a;
					var value = message.b;
					return A2(
						$billstclair$elm_localstorage$PortFunnel$InternalTypes$Put,
						A2($billstclair$elm_localstorage$PortFunnel$LocalStorage$addPrefix, prefix, key),
						value);
				case 'ListKeys':
					var label = message.a;
					var pref = message.b;
					return A2(
						$billstclair$elm_localstorage$PortFunnel$InternalTypes$ListKeys,
						label,
						A2($billstclair$elm_localstorage$PortFunnel$LocalStorage$addPrefix, prefix, pref));
				case 'Clear':
					var pref = message.a;
					return $billstclair$elm_localstorage$PortFunnel$InternalTypes$Clear(
						A2($billstclair$elm_localstorage$PortFunnel$LocalStorage$addPrefix, prefix, pref));
				default:
					return message;
			}
		}();
		return A3($billstclair$elm_port_funnel$PortFunnel$sendMessage, $billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleDesc, wrapper, mess);
	});
var $author$project$Main$localStorageSend = F2(
	function (state, message) {
		return A3(
			$billstclair$elm_localstorage$PortFunnel$LocalStorage$send,
			A2($author$project$Main$getCmdPort, $billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName, _Utils_Tuple0),
			message,
			state);
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$put = $billstclair$elm_localstorage$PortFunnel$InternalTypes$Put;
var $author$project$Main$put = F3(
	function (state, key, value) {
		var prefix = $billstclair$elm_localstorage$PortFunnel$LocalStorage$getPrefix(state);
		return A2(
			$author$project$Main$localStorageSend,
			state,
			A2(
				$billstclair$elm_localstorage$PortFunnel$LocalStorage$put,
				A2($elm$core$Debug$log, 'put ' + prefix, key),
				value));
	});
var $author$project$Main$saveSavedModel = F2(
	function (state, savedModel) {
		return A3(
			$author$project$Main$put,
			state,
			$author$project$Main$pk.model,
			$elm$core$Maybe$Just(
				$author$project$Main$encodeSavedModel(savedModel)));
	});
var $author$project$Main$DeleteState = {$: 'DeleteState'};
var $author$project$Main$GotIndex = F3(
	function (a, b, c) {
		return {$: 'GotIndex', a: a, b: b, c: c};
	});
var $author$project$Main$SequenceCmds = function (a) {
	return {$: 'SequenceCmds', a: a};
};
var $author$project$Main$SetDefaultSources = function (a) {
	return {$: 'SetDefaultSources', a: a};
};
var $author$project$Main$nothingIfBlank = function (s) {
	return (s === '') ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(s);
};
var $author$project$Main$canonicalizeSource = function (source) {
	var src = $author$project$Main$urlDisplay(source.src);
	var maybeUrl = function () {
		var _v1 = source.url;
		if (_v1.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var url = _v1.a;
			return $author$project$Main$nothingIfBlank(url);
		}
	}();
	var _default = $author$project$Main$getLabelFromFileName(source.src);
	var maybeLabel = function () {
		var _v0 = source.label;
		if (_v0.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var label = _v0.a;
			return _Utils_eq(label, _default) ? $elm$core$Maybe$Nothing : $author$project$Main$nothingIfBlank(label);
		}
	}();
	return (_Utils_eq(source.src, src) && (_Utils_eq(source.label, maybeLabel) && _Utils_eq(source.url, maybeUrl))) ? source : _Utils_update(
		source,
		{label: maybeLabel, src: src, url: maybeUrl});
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
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $author$project$Main$setEditingFields = F3(
	function (idx, source, model) {
		var label = function () {
			var _v0 = source.label;
			if (_v0.$ === 'Nothing') {
				return $author$project$Main$getLabelFromFileName(source.src);
			} else {
				var l = _v0.a;
				return l;
			}
		}();
		return _Utils_update(
			model,
			{
				editingIdx: idx,
				editingIdxStr: $elm$core$String$fromInt(idx),
				editingLabel: label,
				editingSrc: $author$project$Main$urlDisplay(source.src),
				editingUrl: A2($elm$core$Maybe$withDefault, '', source.url)
			});
	});
var $author$project$Main$initializeEditingFields = function (model) {
	initializeEditingFields:
	while (true) {
		var _v0 = A2($elm_community$list_extra$List$Extra$getAt, model.srcIdx, model.sources);
		if (_v0.$ === 'Just') {
			var source = _v0.a;
			return A3($author$project$Main$setEditingFields, model.srcIdx, source, model);
		} else {
			if (!model.srcIdx) {
				return model;
			} else {
				var $temp$model = _Utils_update(
					model,
					{srcIdx: 0});
				model = $temp$model;
				continue initializeEditingFields;
			}
		}
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm_community$list_extra$List$Extra$splitAt = F2(
	function (n, xs) {
		return _Utils_Tuple2(
			A2($elm$core$List$take, n, xs),
			A2($elm$core$List$drop, n, xs));
	});
var $author$project$Main$insertInList = F3(
	function (insertIdx, item, items) {
		var len = $elm$core$List$length(items);
		var idx = ((insertIdx < 0) || (_Utils_cmp(insertIdx, len) > 0)) ? len : insertIdx;
		var _v0 = A2($elm_community$list_extra$List$Extra$splitAt, idx, items);
		var head = _v0.a;
		var tail = _v0.b;
		return _Utils_Tuple2(
			idx,
			_Utils_ap(
				head,
				A2($elm$core$List$cons, item, tail)));
	});
var $author$project$Main$isEditingCurrent = function (model) {
	var _v0 = $elm$core$String$toInt(model.editingIdxStr);
	if (_v0.$ === 'Nothing') {
		return false;
	} else {
		var editingIdx = _v0.a;
		if (!_Utils_eq(editingIdx, model.editingIdx)) {
			return false;
		} else {
			var _v1 = A2($elm_community$list_extra$List$Extra$getAt, model.editingIdx, model.sources);
			if (_v1.$ === 'Nothing') {
				return false;
			} else {
				var source = _v1.a;
				return _Utils_eq(
					$author$project$Main$canonicalizeSource(source),
					$author$project$Main$canonicalizeSource(
						{
							label: $elm$core$Maybe$Just(model.editingLabel),
							src: model.editingSrc,
							url: $elm$core$Maybe$Just(model.editingUrl)
						}));
			}
		}
	}
};
var $author$project$Main$modelToUndoModel = function (model) {
	return {editingIdx: model.editingIdx, editingIdxStr: model.editingIdxStr, editingLabel: model.editingLabel, editingSrc: model.editingSrc, editingUrl: model.editingUrl, sourcePanelIdx: model.sourcePanelIdx, sourcePanels: model.sourcePanels, sources: model.sources, srcIdx: model.srcIdx};
};
var $author$project$Main$msgs = {addNewSources: 'Added new sources', addSource: 'Added new image', addSourcePanel: 'Added Film Roll', changeSource: 'Changed image', copyClipboardToLive: 'Copied Clipboard to Live', copyLive: 'Copied Live', copyPanel: 'Copied Film Roll', deleteSource: 'Deleted image', deleteSourcePanel: 'Deleted Film Roll', lookupSource: 'Updated editor from Live', moveSource: 'Moved image', moveSourcePanel: 'Moved Film Roll', overwriteSourcePanel: 'Overwrote Film Roll', restoreSourcePanel: 'Overwrote Film Roll', saveSourcePanel: 'Film Roll made live'};
var $erlandsona$assoc_set$AssocSet$Set = function (a) {
	return {$: 'Set', a: a};
};
var $pzp1997$assoc_list$AssocList$D = function (a) {
	return {$: 'D', a: a};
};
var $pzp1997$assoc_list$AssocList$empty = $pzp1997$assoc_list$AssocList$D(_List_Nil);
var $erlandsona$assoc_set$AssocSet$empty = $erlandsona$assoc_set$AssocSet$Set($pzp1997$assoc_list$AssocList$empty);
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $pzp1997$assoc_list$AssocList$remove = F2(
	function (targetKey, _v0) {
		var alist = _v0.a;
		return $pzp1997$assoc_list$AssocList$D(
			A2(
				$elm$core$List$filter,
				function (_v1) {
					var key = _v1.a;
					return !_Utils_eq(key, targetKey);
				},
				alist));
	});
var $pzp1997$assoc_list$AssocList$insert = F3(
	function (key, value, dict) {
		var _v0 = A2($pzp1997$assoc_list$AssocList$remove, key, dict);
		var alteredAlist = _v0.a;
		return $pzp1997$assoc_list$AssocList$D(
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(key, value),
				alteredAlist));
	});
var $erlandsona$assoc_set$AssocSet$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $erlandsona$assoc_set$AssocSet$Set(
			A3($pzp1997$assoc_list$AssocList$insert, key, _Utils_Tuple0, dict));
	});
var $erlandsona$assoc_set$AssocSet$fromList = function (list) {
	return A3($elm$core$List$foldr, $erlandsona$assoc_set$AssocSet$insert, $erlandsona$assoc_set$AssocSet$empty, list);
};
var $pzp1997$assoc_list$AssocList$keys = function (_v0) {
	var alist = _v0.a;
	return A2($elm$core$List$map, $elm$core$Tuple$first, alist);
};
var $erlandsona$assoc_set$AssocSet$toList = function (_v0) {
	var dict = _v0.a;
	return $pzp1997$assoc_list$AssocList$keys(dict);
};
var $author$project$Main$uniqueifyList = function (list) {
	return $erlandsona$assoc_set$AssocSet$toList(
		$erlandsona$assoc_set$AssocSet$fromList(list));
};
var $author$project$Main$addSource = F4(
	function (maybeIdx, source, updateEditor, model) {
		var sources = model.sources;
		var idx = A2($elm$core$Maybe$withDefault, -2, maybeIdx) + 1;
		var editorChanged = updateEditor && $author$project$Main$isEditingCurrent(model);
		var canonicalSource = $author$project$Main$canonicalizeSource(source);
		var _v0 = A3($author$project$Main$insertInList, idx, canonicalSource, sources);
		var srcIdx = _v0.a;
		var newSources = _v0.b;
		return (editorChanged ? $author$project$Main$initializeEditingFields : $elm$core$Basics$identity)(
			_Utils_update(
				model,
				{
					editingIdxStr: $elm$core$String$fromInt(srcIdx),
					err: $elm$core$Maybe$Just($author$project$Main$msgs.addSource),
					lastSources: $author$project$Main$uniqueifyList(
						A2($elm$core$List$cons, canonicalSource.src, model.lastSources)),
					sources: newSources,
					srcIdx: srcIdx,
					undoModel: $elm$core$Maybe$Just(
						$author$project$Main$modelToUndoModel(model))
				}));
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$clear = $billstclair$elm_localstorage$PortFunnel$InternalTypes$Clear;
var $author$project$Main$clearKeys = F2(
	function (state, prefix) {
		return A2(
			$author$project$Main$localStorageSend,
			state,
			$billstclair$elm_localstorage$PortFunnel$LocalStorage$clear(prefix));
	});
var $author$project$Main$clipboardRead = _Platform_outgoingPort('clipboardRead', $elm$json$Json$Encode$string);
var $author$project$Main$clipboardWrite = _Platform_outgoingPort('clipboardWrite', $elm$json$Json$Encode$string);
var $author$project$Main$copyOptionLabel = function (copyOption) {
	switch (copyOption.$) {
		case 'Clipboard':
			return 'Clipboard';
		case 'Live':
			return 'Live';
		case 'Displayed':
			return 'Displayed';
		default:
			return 'Selected Roll';
	}
};
var $author$project$Main$Noop = {$: 'Noop'};
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $elm$browser$Browser$Dom$focus = _Browser_call('focus');
var $author$project$Main$selectElement = _Platform_outgoingPort('selectElement', $elm$json$Json$Encode$string);
var $author$project$Main$focusInput = function (id) {
	return A2(
		$elm$core$Task$perform,
		$author$project$Main$SequenceCmds,
		$elm$core$Task$succeed(
			_List_fromArray(
				[
					A2(
					$elm$core$Task$attempt,
					function (_v0) {
						return $author$project$Main$Noop;
					},
					$elm$browser$Browser$Dom$focus(id)),
					$author$project$Main$selectElement(id)
				])));
};
var $author$project$Main$ids = {sourcePanelName: 'sourcePanelName'};
var $elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $author$project$Main$newSourcePanelName = function (panels) {
	var loop = F2(
		function (index, name) {
			loop:
			while (true) {
				var _v0 = A2(
					$elm_community$list_extra$List$Extra$find,
					function (p) {
						return _Utils_eq(p.name, name);
					},
					panels);
				if (_v0.$ === 'Just') {
					var $temp$index = index + 1,
						$temp$name = 'new' + $elm$core$String$fromInt(index + 1);
					index = $temp$index;
					name = $temp$name;
					continue loop;
				} else {
					return name;
				}
			}
		});
	return A2(loop, 1, 'new');
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm_community$list_extra$List$Extra$updateAt = F3(
	function (index, fn, list) {
		if (index < 0) {
			return list;
		} else {
			var tail = A2($elm$core$List$drop, index, list);
			if (tail.b) {
				var x = tail.a;
				var xs = tail.b;
				return _Utils_ap(
					A2($elm$core$List$take, index, list),
					A2(
						$elm$core$List$cons,
						fn(x),
						xs));
			} else {
				return list;
			}
		}
	});
var $elm_community$list_extra$List$Extra$setAt = F2(
	function (index, value) {
		return A2(
			$elm_community$list_extra$List$Extra$updateAt,
			index,
			$elm$core$Basics$always(value));
	});
var $Janiczek$cmd_extra$Cmd$Extra$withCmd = F2(
	function (cmd, model) {
		return _Utils_Tuple2(model, cmd);
	});
var $author$project$Main$copyToPanel = F3(
	function (fromName, sources, model) {
		var panels = model.sourcePanels;
		var idx = model.sourcePanelIdx;
		var _v0 = A2($elm_community$list_extra$List$Extra$getAt, idx, panels);
		if (_v0.$ === 'Nothing') {
			var name = $author$project$Main$newSourcePanelName(panels);
			return A2(
				$Janiczek$cmd_extra$Cmd$Extra$withCmd,
				$author$project$Main$focusInput($author$project$Main$ids.sourcePanelName),
				_Utils_update(
					model,
					{
						err: $elm$core$Maybe$Just($author$project$Main$msgs.addSourcePanel + (' from ' + fromName)),
						sourcePanelIdx: 0,
						sourcePanels: A2(
							$elm$core$List$cons,
							{name: name, panels: model.sources},
							panels),
						undoModel: $elm$core$Maybe$Just(
							$author$project$Main$modelToUndoModel(model))
					}));
		} else {
			var panel = _v0.a;
			var newPanel = {name: panel.name, panels: model.sources};
			return A2(
				$Janiczek$cmd_extra$Cmd$Extra$withCmd,
				$author$project$Main$focusInput($author$project$Main$ids.sourcePanelName),
				_Utils_update(
					model,
					{
						err: $elm$core$Maybe$Just($author$project$Main$msgs.overwriteSourcePanel + (' from ' + fromName)),
						sourcePanels: A3($elm_community$list_extra$List$Extra$setAt, idx, newPanel, panels),
						undoModel: $elm$core$Maybe$Just(
							$author$project$Main$modelToUndoModel(model))
					}));
		}
	});
var $elm_community$list_extra$List$Extra$reverseAppend = F2(
	function (list1, list2) {
		return A3($elm$core$List$foldl, $elm$core$List$cons, list2, list1);
	});
var $elm_community$list_extra$List$Extra$removeHelp = F4(
	function (list, x, xs, previousElements) {
		removeHelp:
		while (true) {
			if (!xs.b) {
				return list;
			} else {
				var y = xs.a;
				var ys = xs.b;
				if (_Utils_eq(x, y)) {
					return A2($elm_community$list_extra$List$Extra$reverseAppend, previousElements, ys);
				} else {
					var $temp$list = list,
						$temp$x = x,
						$temp$xs = ys,
						$temp$previousElements = A2($elm$core$List$cons, y, previousElements);
					list = $temp$list;
					x = $temp$x;
					xs = $temp$xs;
					previousElements = $temp$previousElements;
					continue removeHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$remove = F2(
	function (x, xs) {
		return A4($elm_community$list_extra$List$Extra$removeHelp, xs, x, xs, _List_Nil);
	});
var $Janiczek$cmd_extra$Cmd$Extra$withNoCmd = function (model) {
	return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
};
var $author$project$Main$copyItems = function (model) {
	if (_Utils_eq(model.copyFrom, model.copyTo)) {
		return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
	} else {
		var _v0 = model.copyFrom;
		switch (_v0.$) {
			case 'Clipboard':
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					$author$project$Main$clipboardRead(''),
					_Utils_update(
						model,
						{clipboard: ''}));
			case 'Panel':
				var undoModel = $elm$core$Maybe$Just(
					$author$project$Main$modelToUndoModel(model));
				var _v1 = A2($elm_community$list_extra$List$Extra$getAt, model.sourcePanelIdx, model.sourcePanels);
				if (_v1.$ === 'Nothing') {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var panel = _v1.a;
					var _v2 = model.copyTo;
					switch (_v2.$) {
						case 'Panel':
							return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
						case 'Live':
							return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
								$author$project$Main$initializeEditingFields(
									_Utils_update(
										model,
										{
											err: $elm$core$Maybe$Just(
												$author$project$Main$msgs.copyPanel + (' to ' + $author$project$Main$copyOptionLabel($author$project$Main$Live))),
											sources: panel.panels,
											srcIdx: 0,
											undoModel: undoModel
										})));
						case 'Displayed':
							return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
						default:
							var json = A2($elm$json$Json$Encode$list, $author$project$Main$encodeSource, panel.panels);
							return A2(
								$Janiczek$cmd_extra$Cmd$Extra$withCmd,
								$author$project$Main$clipboardWrite(
									A2($elm$json$Json$Encode$encode, 0, json)),
								_Utils_update(
									model,
									{
										err: $elm$core$Maybe$Just(
											$author$project$Main$msgs.copyPanel + (' to ' + $author$project$Main$copyOptionLabel($author$project$Main$Clipboard)))
									}));
					}
				}
			case 'Displayed':
				var _v3 = A2($elm_community$list_extra$List$Extra$getAt, model.sourcePanelIdx, model.sourcePanels);
				if (_v3.$ === 'Nothing') {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var panel = _v3.a;
					var _v4 = A2($elm_community$list_extra$List$Extra$getAt, model.srcIdx, model.sources);
					if (_v4.$ === 'Nothing') {
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
					} else {
						var source = _v4.a;
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
							_Utils_update(
								model,
								{
									sourcePanels: A3(
										$elm_community$list_extra$List$Extra$setAt,
										model.sourcePanelIdx,
										_Utils_update(
											panel,
											{
												panels: _Utils_ap(
													panel.panels,
													_List_fromArray(
														[source]))
											}),
										model.sourcePanels),
									sources: A2($elm_community$list_extra$List$Extra$remove, source, model.sources)
								}));
					}
				}
			default:
				var _v5 = model.copyTo;
				switch (_v5.$) {
					case 'Live':
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
					case 'Displayed':
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
					case 'Clipboard':
						var json = A2($elm$json$Json$Encode$list, $author$project$Main$encodeSource, model.sources);
						return A2(
							$Janiczek$cmd_extra$Cmd$Extra$withCmd,
							$author$project$Main$clipboardWrite(
								A2($elm$json$Json$Encode$encode, 0, json)),
							_Utils_update(
								model,
								{
									err: $elm$core$Maybe$Just(
										$author$project$Main$msgs.copyLive + (' to ' + $author$project$Main$copyOptionLabel($author$project$Main$Clipboard)))
								}));
					default:
						return A3(
							$author$project$Main$copyToPanel,
							$author$project$Main$copyOptionLabel($author$project$Main$Live),
							model.sources,
							model);
				}
		}
	}
};
var $elm$core$Process$sleep = _Process_sleep;
var $author$project$Main$delay = F2(
	function (millis, msg) {
		return A2(
			$elm$core$Task$perform,
			function (_v0) {
				return msg;
			},
			$elm$core$Process$sleep(millis));
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Main$maybeSwitchEditor = F2(
	function (idx, model) {
		if (!$author$project$Main$isEditingCurrent(model)) {
			return model;
		} else {
			var _v0 = A2($elm_community$list_extra$List$Extra$getAt, idx, model.sources);
			if (_v0.$ === 'Nothing') {
				return model;
			} else {
				var source = _v0.a;
				return _Utils_update(
					model,
					{
						editingIdx: idx,
						editingIdxStr: $elm$core$String$fromInt(idx),
						editingLabel: function () {
							var _v1 = source.label;
							if (_v1.$ === 'Just') {
								var label = _v1.a;
								return label;
							} else {
								return $author$project$Main$getLabelFromFileName(source.src);
							}
						}(),
						editingSrc: $author$project$Main$urlDisplay(source.src),
						editingUrl: A2($elm$core$Maybe$withDefault, '', source.url)
					});
			}
		}
	});
var $author$project$Main$viewImage = F2(
	function (index, model) {
		var sources = model.sources;
		var size = $elm$core$List$length(sources);
		var idx = (index < 0) ? (size - 1) : ((_Utils_cmp(index, size) > -1) ? 0 : index);
		var mdl = A2($author$project$Main$maybeSwitchEditor, idx, model);
		return _Utils_update(
			mdl,
			{lastSwapTime: model.time, srcIdx: idx});
	});
var $author$project$Main$digitKey = F2(
	function (digit, model) {
		var idx = function () {
			var _v0 = $elm$core$String$toInt(digit);
			if (_v0.$ === 'Just') {
				var i = _v0.a;
				return i;
			} else {
				return 0;
			}
		}();
		return A2($author$project$Main$viewImage, idx, model);
	});
var $author$project$Swipe$deltaX = function (gesture) {
	if (gesture.$ === 'EndGesture') {
		var from = gesture.a.from;
		var to = gesture.a.to;
		return $elm$core$Maybe$Just(to.x - from.x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Swipe$isSwipeType = F2(
	function (delta, predicate) {
		return A2(
			$elm$core$Basics$composeR,
			delta,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Maybe$map(predicate),
				$elm$core$Maybe$withDefault(false)));
	});
var $author$project$Swipe$isLeftSwipe = function (sensitivity) {
	return A2(
		$author$project$Swipe$isSwipeType,
		$author$project$Swipe$deltaX,
		function (dX) {
			return _Utils_cmp(dX, -sensitivity) < 1;
		});
};
var $author$project$Swipe$isRightSwipe = function (sensitivity) {
	return A2(
		$author$project$Swipe$isSwipeType,
		$author$project$Swipe$deltaX,
		function (dX) {
			return _Utils_cmp(dX, sensitivity) > -1;
		});
};
var $author$project$Swipe$isTap = function (gesture) {
	if (gesture.$ === 'EndTap') {
		return true;
	} else {
		return false;
	}
};
var $author$project$Main$nextImage = function (model) {
	return A2($author$project$Main$viewImage, model.srcIdx + 1, model);
};
var $author$project$Main$prevImage = function (model) {
	return A2($author$project$Main$viewImage, model.srcIdx - 1, model);
};
var $author$project$Swipe$EndGesture = function (a) {
	return {$: 'EndGesture', a: a};
};
var $author$project$Swipe$EndTap = function (a) {
	return {$: 'EndTap', a: a};
};
var $author$project$Swipe$Moved = function (a) {
	return {$: 'Moved', a: a};
};
var $author$project$Swipe$Started = function (a) {
	return {$: 'Started', a: a};
};
var $author$project$Swipe$addToTrail = F2(
	function (coordinate, _v0) {
		var from = _v0.from;
		var to = _v0.to;
		var through = _v0.through;
		return {
			from: from,
			through: A2($elm$core$List$cons, to, through),
			to: coordinate
		};
	});
var $author$project$Swipe$record = F2(
	function (_v0, gesture) {
		var eventType = _v0.a;
		var coordinate = _v0.b;
		var _v1 = _Utils_Tuple2(eventType, gesture);
		switch (_v1.a.$) {
			case 'Start':
				var _v2 = _v1.a;
				return $author$project$Swipe$Started(coordinate);
			case 'Move':
				switch (_v1.b.$) {
					case 'Started':
						var _v3 = _v1.a;
						var prev = _v1.b.a;
						return $author$project$Swipe$Moved(
							{from: prev, through: _List_Nil, to: coordinate});
					case 'Moved':
						var _v4 = _v1.a;
						var trail = _v1.b.a;
						return $author$project$Swipe$Moved(
							A2($author$project$Swipe$addToTrail, coordinate, trail));
					default:
						var _v5 = _v1.a;
						return $author$project$Swipe$Started(coordinate);
				}
			default:
				if (_v1.b.$ === 'Moved') {
					var _v6 = _v1.a;
					var trail = _v1.b.a;
					return $author$project$Swipe$EndGesture(
						A2($author$project$Swipe$addToTrail, coordinate, trail));
				} else {
					var _v7 = _v1.a;
					return $author$project$Swipe$EndTap(coordinate);
				}
		}
	});
var $author$project$Main$endSwipe = F2(
	function (event, model) {
		var sensitivity = 10;
		var mdl = _Utils_update(
			model,
			{gesture: $author$project$Swipe$blanco});
		var gesture = A2($author$project$Swipe$record, event, model.gesture);
		var _v0 = _Utils_Tuple3(
			$author$project$Swipe$isTap(gesture),
			A2($author$project$Swipe$isLeftSwipe, sensitivity, gesture),
			A2($author$project$Swipe$isRightSwipe, sensitivity, gesture));
		var isTap = _v0.a;
		var isLeftSwipe = _v0.b;
		var isRightSwipe = _v0.c;
		return _Utils_Tuple2(
			(isTap || isLeftSwipe) ? $author$project$Main$nextImage(mdl) : (isRightSwipe ? $author$project$Main$prevImage(mdl) : mdl),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Main$copyUrlToPanel = F2(
	function (s, model) {
		var source = $author$project$Main$srcSource(s);
		var _v0 = A2($elm_community$list_extra$List$Extra$getAt, model.sourcePanelIdx, model.sourcePanels);
		if (_v0.$ === 'Nothing') {
			return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
		} else {
			var panel = _v0.a;
			var panelCnt = $elm$core$List$length(panel.panels);
			return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
				_Utils_update(
					model,
					{
						sourcePanels: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.sourcePanelIdx,
							_Utils_update(
								panel,
								{
									panels: A3($elm_community$list_extra$List$Extra$setAt, panelCnt, source, panel.panels)
								}),
							model.sourcePanels)
					}));
		}
	});
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$Main$Source = F3(
	function (src, label, url) {
		return {label: label, src: src, url: url};
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (path, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						$elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _v0 = A2(
				$elm$json$Json$Decode$decodeValue,
				A2($elm$json$Json$Decode$at, path, $elm$json$Json$Decode$value),
				input);
			if (_v0.$ === 'Ok') {
				var rawValue = _v0.a;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_v1.$ === 'Ok') {
					var finalResult = _v1.a;
					return $elm$json$Json$Decode$succeed(finalResult);
				} else {
					return A2(
						$elm$json$Json$Decode$at,
						path,
						nullOr(valDecoder));
				}
			} else {
				return $elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2($elm$json$Json$Decode$andThen, handleResult, $elm$json$Json$Decode$value);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				_List_fromArray(
					[key]),
				valDecoder,
				fallback),
			decoder);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $author$project$Main$sourceDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$andThen,
			function (s) {
				return $elm$json$Json$Decode$succeed(
					$author$project$Main$srcSource(s));
			},
			$elm$json$Json$Decode$string),
			A2(
			$elm$json$Json$Decode$andThen,
			function (s) {
				return $elm$json$Json$Decode$succeed(
					$author$project$Main$canonicalizeSource(s));
			},
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'url',
				$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
				$elm$core$Maybe$Nothing,
				A4(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'label',
					$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
					$elm$core$Maybe$Nothing,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'src',
						$elm$json$Json$Decode$string,
						$elm$json$Json$Decode$succeed($author$project$Main$Source)))))
		]));
var $author$project$Main$finishCopyFromClipboard = F2(
	function (s, model) {
		var _v0 = A2(
			$elm$json$Json$Decode$decodeString,
			$elm$json$Json$Decode$list($author$project$Main$sourceDecoder),
			s);
		if (_v0.$ === 'Err') {
			var _v1 = model.copyTo;
			switch (_v1.$) {
				case 'Live':
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						A4(
							$author$project$Main$addSource,
							$elm$core$Maybe$Just(model.srcIdx + 1),
							$author$project$Main$srcSource(s),
							true,
							model));
				case 'Panel':
					var _v2 = model.copyFrom;
					if (_v2.$ === 'Live') {
						return A2($author$project$Main$copyUrlToPanel, s, model);
					} else {
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
					}
				default:
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
			}
		} else {
			var sources = _v0.a;
			var _v3 = model.copyTo;
			switch (_v3.$) {
				case 'Clipboard':
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				case 'Live':
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						($author$project$Main$isEditingCurrent(model) ? $author$project$Main$initializeEditingFields : $elm$core$Basics$identity)(
							_Utils_update(
								model,
								{
									err: $elm$core$Maybe$Just($author$project$Main$msgs.copyClipboardToLive),
									sources: sources,
									srcIdx: 0,
									undoModel: $elm$core$Maybe$Just(
										$author$project$Main$modelToUndoModel(model))
								})));
				case 'Displayed':
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				default:
					return A3(
						$author$project$Main$copyToPanel,
						$author$project$Main$copyOptionLabel($author$project$Main$Live),
						sources,
						model);
			}
		}
	});
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
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
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
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
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $author$project$Main$httpGet = function (args) {
	return $elm$http$Http$request(
		{body: $elm$http$Http$emptyBody, expect: args.expect, headers: args.headers, method: 'GET', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: args.url});
};
var $author$project$Main$sourcesDecoder = $elm$json$Json$Decode$list($author$project$Main$sourceDecoder);
var $author$project$Main$httpGetJsonFile = F2(
	function (url, receiver) {
		return $author$project$Main$httpGet(
			{
				expect: A2($elm$http$Http$expectJson, receiver, $author$project$Main$sourcesDecoder),
				headers: _List_fromArray(
					[
						A2($elm$http$Http$header, 'Cache-control', 'no-cache, no-store, must-revalidate'),
						A2($elm$http$Http$header, 'Pragma', 'no-cache'),
						A2($elm$http$Http$header, 'Expires', '0')
					]),
				url: url
			});
	});
var $author$project$Main$indexJson = 'images/index.json';
var $author$project$Main$msgCmd = function (msg) {
	return A2(
		$elm$core$Task$perform,
		$elm$core$Basics$identity,
		$elm$core$Task$succeed(msg));
};
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $author$project$Main$finishUrlParse = F5(
	function (url, maybeTitle, maybeSources, setSourceList, model) {
		var mdl = function () {
			var _v1 = A2($elm$core$Debug$log, 'maybeTitle', maybeTitle);
			if (_v1.$ === 'Nothing') {
				return model;
			} else {
				var title = _v1.a;
				return _Utils_update(
					model,
					{title: title});
			}
		}();
		var _v0 = A2($elm$core$Debug$log, 'maybeSources', maybeSources);
		if (_v0.$ === 'Just') {
			var sources = _v0.a;
			return _Utils_Tuple2(
				mdl,
				$author$project$Main$msgCmd(
					A3(
						$author$project$Main$GotIndex,
						$elm$url$Url$toString(url),
						setSourceList,
						$elm$core$Result$Ok(sources))));
		} else {
			var indexUrl = $author$project$Main$indexJson;
			var s = A2(
				$elm$core$Debug$log,
				'getIndexJson: (indexUrl, setSourceList)',
				_Utils_Tuple2(indexUrl, setSourceList));
			return _Utils_Tuple2(
				mdl,
				A2(
					$author$project$Main$httpGetJsonFile,
					indexUrl,
					A2($author$project$Main$GotIndex, indexUrl, setSourceList)));
		}
	});
var $author$project$Main$fixCopyFromEqualsTo = F2(
	function (setCopyFrom, model) {
		if (!_Utils_eq(model.copyFrom, model.copyTo)) {
			return model;
		} else {
			var newOption = (!_Utils_eq(model.copyFrom, $author$project$Main$Live)) ? $author$project$Main$Live : $author$project$Main$Clipboard;
			return setCopyFrom ? _Utils_update(
				model,
				{copyFrom: newOption}) : _Utils_update(
				model,
				{copyTo: newOption});
		}
	});
var $author$project$PortFunnels$LocalStorageHandler = function (a) {
	return {$: 'LocalStorageHandler', a: a};
};
var $billstclair$elm_port_funnel$PortFunnel$FunnelSpec = F4(
	function (accessors, moduleDesc, commander, handler) {
		return {accessors: accessors, commander: commander, handler: handler, moduleDesc: moduleDesc};
	});
var $author$project$PortFunnels$LocalStorageFunnel = function (a) {
	return {$: 'LocalStorageFunnel', a: a};
};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$commander = F2(
	function (_v0, _v1) {
		return $elm$core$Platform$Cmd$none;
	});
var $billstclair$elm_port_funnel$PortFunnel$StateAccessors = F2(
	function (get, set) {
		return {get: get, set: set};
	});
var $author$project$PortFunnels$localStorageAccessors = A2(
	$billstclair$elm_port_funnel$PortFunnel$StateAccessors,
	function ($) {
		return $.storage;
	},
	F2(
		function (substate, state) {
			return _Utils_update(
				state,
				{storage: substate});
		}));
var $author$project$PortFunnels$handlerToFunnel = function (handler) {
	var localStorageHandler = handler.a;
	return _Utils_Tuple2(
		$billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName,
		$author$project$PortFunnels$LocalStorageFunnel(
			A4($billstclair$elm_port_funnel$PortFunnel$FunnelSpec, $author$project$PortFunnels$localStorageAccessors, $billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleDesc, $billstclair$elm_localstorage$PortFunnel$LocalStorage$commander, localStorageHandler)));
};
var $author$project$PortFunnels$makeFunnelDict = F2(
	function (handlers, portGetter) {
		return _Utils_Tuple2(
			$elm$core$Dict$fromList(
				A2($elm$core$List$map, $author$project$PortFunnels$handlerToFunnel, handlers)),
			portGetter);
	});
var $author$project$Main$StartedReadingModel = {$: 'StartedReadingModel'};
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$get = $billstclair$elm_localstorage$PortFunnel$InternalTypes$Get($elm$core$Maybe$Nothing);
var $author$project$Main$get = F2(
	function (state, key) {
		var prefix = $billstclair$elm_localstorage$PortFunnel$LocalStorage$getPrefix(state);
		return A2(
			$author$project$Main$localStorageSend,
			state,
			$billstclair$elm_localstorage$PortFunnel$LocalStorage$get(
				A2($elm$core$Debug$log, 'get ' + prefix, key)));
	});
var $author$project$Main$FinishUrlParse = F4(
	function (a, b, c, d) {
		return {$: 'FinishUrlParse', a: a, b: b, c: c, d: d};
	});
var $elm$url$Url$Parser$Internal$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$Query$custom = F2(
	function (key, func) {
		return $elm$url$Url$Parser$Internal$Parser(
			function (dict) {
				return func(
					A2(
						$elm$core$Maybe$withDefault,
						_List_Nil,
						A2($elm$core$Dict$get, key, dict)));
			});
	});
var $author$project$Main$maybeParseSourcesList = function (strings) {
	var folder = F2(
		function (s, maybeSources) {
			if (maybeSources.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var sources = maybeSources.a;
				var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Main$sourcesDecoder, s);
				if (_v1.$ === 'Err') {
					return $elm$core$Maybe$Nothing;
				} else {
					var newSources = _v1.a;
					return $elm$core$Maybe$Just(
						_Utils_ap(sources, newSources));
				}
			}
		});
	return A3(
		$elm$core$List$foldl,
		folder,
		$elm$core$Maybe$Just(_List_Nil),
		strings);
};
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.unvisited;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.value);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0.a;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.path),
					$elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					$elm$core$Basics$identity)));
	});
var $elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$query = function (_v0) {
	var queryParser = _v0.a;
	return $elm$url$Url$Parser$Parser(
		function (_v1) {
			var visited = _v1.visited;
			var unvisited = _v1.unvisited;
			var params = _v1.params;
			var frag = _v1.frag;
			var value = _v1.value;
			return _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					visited,
					unvisited,
					params,
					frag,
					value(
						queryParser(params)))
				]);
		});
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0.a;
		var parseAfter = _v1.a;
		return $elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					$elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var $elm$url$Url$Parser$questionMark = F2(
	function (parser, queryParser) {
		return A2(
			$elm$url$Url$Parser$slash,
			parser,
			$elm$url$Url$Parser$query(queryParser));
	});
var $elm$url$Url$Parser$Query$string = function (key) {
	return A2(
		$elm$url$Url$Parser$Query$custom,
		key,
		function (stringList) {
			if (stringList.b && (!stringList.b.b)) {
				var str = stringList.a;
				return $elm$core$Maybe$Just(str);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		});
};
var $elm$url$Url$Parser$top = $elm$url$Url$Parser$Parser(
	function (state) {
		return _List_fromArray(
			[state]);
	});
var $author$project$Main$getIndexJson = F2(
	function (url, setSourceList) {
		var titleParser = $elm$url$Url$Parser$Query$string('title');
		var filmParser = A2($elm$url$Url$Parser$Query$custom, 'film', $author$project$Main$maybeParseSourcesList);
		var emptyUrl = A2(
			$elm$core$Debug$log,
			'getIndexJson, emptyUrl',
			_Utils_update(
				url,
				{path: '/'}));
		var _v0 = A2(
			$elm$core$Debug$log,
			'  (titleParse, filmParse)',
			function () {
				var _v1 = emptyUrl.query;
				if (_v1.$ === 'Nothing') {
					return _Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
				} else {
					var query = _v1.a;
					return _Utils_Tuple2(
						A2(
							$elm$core$Maybe$withDefault,
							$elm$core$Maybe$Nothing,
							A2(
								$elm$url$Url$Parser$parse,
								A2($elm$url$Url$Parser$questionMark, $elm$url$Url$Parser$top, titleParser),
								emptyUrl)),
						function (f) {
							if ((f.$ === 'Just') && (!f.a.b)) {
								return $elm$core$Maybe$Nothing;
							} else {
								return f;
							}
						}(
							A2(
								$elm$core$Maybe$withDefault,
								$elm$core$Maybe$Nothing,
								A2(
									$elm$url$Url$Parser$parse,
									A2($elm$url$Url$Parser$questionMark, $elm$url$Url$Parser$top, filmParser),
									emptyUrl))));
				}
			}());
		var titleParse = _v0.a;
		var filmParse = _v0.b;
		return $author$project$Main$msgCmd(
			A4($author$project$Main$FinishUrlParse, url, titleParse, filmParse, setSourceList));
	});
var $author$project$Main$SavedModel = function (sources) {
	return function (lastSources) {
		return function (srcIdx) {
			return function (sourcePanels) {
				return function (sourcePanelIdx) {
					return function (switchPeriod) {
						return function (switchEnabled) {
							return function (showControls) {
								return function (showEditingSources) {
									return function (showHelp) {
										return function (mergeEditingSources) {
											return function (showSearch) {
												return {lastSources: lastSources, mergeEditingSources: mergeEditingSources, showControls: showControls, showEditingSources: showEditingSources, showHelp: showHelp, showSearch: showSearch, sourcePanelIdx: sourcePanelIdx, sourcePanels: sourcePanels, sources: sources, srcIdx: srcIdx, switchEnabled: switchEnabled, switchPeriod: switchPeriod};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Main$lastSourcesDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
			A2(
			$elm$json$Json$Decode$andThen,
			function (sources) {
				return $elm$json$Json$Decode$succeed(
					A2(
						$elm$core$List$map,
						function ($) {
							return $.src;
						},
						sources));
			},
			$author$project$Main$sourcesDecoder)
		]));
var $author$project$Main$SourcePanel = F2(
	function (name, panels) {
		return {name: name, panels: panels};
	});
var $author$project$Main$sourcePanelDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'panels',
	$elm$json$Json$Decode$list($author$project$Main$sourceDecoder),
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'name',
		$elm$json$Json$Decode$string,
		$elm$json$Json$Decode$succeed($author$project$Main$SourcePanel)));
var $author$project$Main$savedModelDecoder = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'showSearch',
	$elm$json$Json$Decode$bool,
	false,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'mergeEditingSources',
		$elm$json$Json$Decode$bool,
		true,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'showHelp',
			$elm$json$Json$Decode$bool,
			true,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'showEditingSources',
				$elm$json$Json$Decode$bool,
				true,
				A4(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'showControls',
					$elm$json$Json$Decode$bool,
					false,
					A4(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'switchEnabled',
						$elm$json$Json$Decode$bool,
						true,
						A4(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'switchPeriod',
							$elm$json$Json$Decode$string,
							'5',
							A4(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'sourcePanelIdx',
								$elm$json$Json$Decode$int,
								0,
								A4(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
									'sourcePanels',
									$elm$json$Json$Decode$list($author$project$Main$sourcePanelDecoder),
									_List_Nil,
									A4(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
										'srcIdx',
										$elm$json$Json$Decode$int,
										0,
										A4(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
											'lastSources',
											$author$project$Main$lastSourcesDecoder,
											_List_Nil,
											A3(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'sources',
												$author$project$Main$sourcesDecoder,
												$elm$json$Json$Decode$succeed($author$project$Main$SavedModel)))))))))))));
var $author$project$Main$savedModelToModel = F2(
	function (savedModel, model) {
		return _Utils_update(
			model,
			{lastSources: savedModel.lastSources, mergeEditingSources: savedModel.mergeEditingSources, showControls: savedModel.showControls, showEditingSources: savedModel.showEditingSources, showHelp: savedModel.showHelp, showSearch: savedModel.showSearch, sourcePanelIdx: savedModel.sourcePanelIdx, sourcePanels: savedModel.sourcePanels, sources: savedModel.sources, srcIdx: savedModel.srcIdx, switchEnabled: savedModel.switchEnabled, switchPeriod: savedModel.switchPeriod});
	});
var $author$project$Main$handleGetModel = F2(
	function (maybeValue, model) {
		var model2 = _Utils_update(
			model,
			{err: $elm$core$Maybe$Nothing, started: $author$project$Main$Started});
		if (maybeValue.$ === 'Nothing') {
			var s = A2($elm$core$Debug$log, 'null model value, getIndexJson', true);
			return A2(
				$Janiczek$cmd_extra$Cmd$Extra$withCmd,
				A2($author$project$Main$getIndexJson, model2.url, true),
				model2);
		} else {
			var value = maybeValue.a;
			var _v1 = A2($elm$json$Json$Decode$decodeValue, $author$project$Main$savedModelDecoder, value);
			if (_v1.$ === 'Err') {
				var err = _v1.a;
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					A2($author$project$Main$getIndexJson, model2.url, true),
					_Utils_update(
						model2,
						{
							err: $elm$core$Maybe$Just(
								A2(
									$elm$core$Debug$log,
									'Error decoding SavedModel',
									$elm$json$Json$Decode$errorToString(err)))
						}));
			} else {
				var savedModel = _v1.a;
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					A2($author$project$Main$getIndexJson, model2.url, false),
					A2(
						$author$project$Main$savedModelToModel,
						A2($elm$core$Debug$log, 'savedModel', savedModel),
						model2));
			}
		}
	});
var $author$project$Main$handleGetResponse = F4(
	function (maybeLabel, key, maybeValue, model) {
		if (maybeLabel.$ === 'Nothing') {
			return _Utils_eq(
				A2($elm$core$Debug$log, 'handleGetResponse, key', key),
				$author$project$Main$pk.model) ? A2($author$project$Main$handleGetModel, maybeValue, model) : $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
		} else {
			var label = maybeLabel.a;
			if (maybeValue.$ === 'Nothing') {
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
			} else {
				var value = maybeValue.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
			}
		}
	});
var $billstclair$elm_localstorage$PortFunnel$LocalStorage$isLoaded = function (_v0) {
	var state = _v0.a;
	return state.isLoaded;
};
var $author$project$Main$storageHandler = F3(
	function (response, state, model) {
		var mdl = _Utils_update(
			model,
			{
				started: ($billstclair$elm_localstorage$PortFunnel$LocalStorage$isLoaded(state.storage) && _Utils_eq(model.started, $author$project$Main$NotStarted)) ? $author$project$Main$StartedReadingModel : model.started
			});
		var cmd = (_Utils_eq(mdl.started, $author$project$Main$StartedReadingModel) && _Utils_eq(model.started, $author$project$Main$NotStarted)) ? A2($author$project$Main$get, mdl.funnelState.storage, $author$project$Main$pk.model) : $elm$core$Platform$Cmd$none;
		if (response.$ === 'GetResponse') {
			var label = response.a.label;
			var key = response.a.key;
			var value = response.a.value;
			return A4($author$project$Main$handleGetResponse, label, key, value, mdl);
		} else {
			return A2($Janiczek$cmd_extra$Cmd$Extra$withCmd, cmd, mdl);
		}
	});
var $author$project$Main$funnelDict = A2(
	$author$project$PortFunnels$makeFunnelDict,
	_List_fromArray(
		[
			$author$project$PortFunnels$LocalStorageHandler($author$project$Main$storageHandler)
		]),
	$author$project$Main$getCmdPort);
var $author$project$Main$getLocalStoragePrefix = function (maybeSettings) {
	if (maybeSettings.$ === 'Nothing') {
		return $author$project$Main$localStoragePrefix;
	} else {
		var settings = maybeSettings.a;
		return settings.localStoragePrefix;
	}
};
var $author$project$Main$indexSampleJson = 'images/index-sample.json';
var $author$project$Main$Displayed = {$: 'Displayed'};
var $author$project$Main$Panel = {$: 'Panel'};
var $author$project$Main$labelCopyOption = function (string) {
	switch (string) {
		case 'Clipboard':
			return $author$project$Main$Clipboard;
		case 'Live':
			return $author$project$Main$Live;
		case 'Displayed':
			return $author$project$Main$Displayed;
		case 'Selected Roll':
			return $author$project$Main$Panel;
		default:
			return $author$project$Main$Live;
	}
};
var $pzp1997$assoc_list$AssocList$get = F2(
	function (targetKey, _v0) {
		get:
		while (true) {
			var alist = _v0.a;
			if (!alist.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var _v2 = alist.a;
				var key = _v2.a;
				var value = _v2.b;
				var rest = alist.b;
				if (_Utils_eq(key, targetKey)) {
					return $elm$core$Maybe$Just(value);
				} else {
					var $temp$targetKey = targetKey,
						$temp$_v0 = $pzp1997$assoc_list$AssocList$D(rest);
					targetKey = $temp$targetKey;
					_v0 = $temp$_v0;
					continue get;
				}
			}
		}
	});
var $pzp1997$assoc_list$AssocList$member = F2(
	function (targetKey, dict) {
		var _v0 = A2($pzp1997$assoc_list$AssocList$get, targetKey, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $pzp1997$assoc_list$AssocList$diff = F2(
	function (_v0, rightDict) {
		var leftAlist = _v0.a;
		return $pzp1997$assoc_list$AssocList$D(
			A2(
				$elm$core$List$filter,
				function (_v1) {
					var key = _v1.a;
					return !A2($pzp1997$assoc_list$AssocList$member, key, rightDict);
				},
				leftAlist));
	});
var $erlandsona$assoc_set$AssocSet$diff = F2(
	function (_v0, _v1) {
		var dict1 = _v0.a;
		var dict2 = _v1.a;
		return $erlandsona$assoc_set$AssocSet$Set(
			A2($pzp1997$assoc_list$AssocList$diff, dict1, dict2));
	});
var $author$project$Main$maybeAddNewSources = F2(
	function (indexSources, model) {
		if (!model.mergeEditingSources) {
			return model;
		} else {
			var lastSources = A2($elm$core$List$map, $author$project$Main$urlDisplay, model.lastSources);
			var lastSourcesSet = $erlandsona$assoc_set$AssocSet$fromList(lastSources);
			var indexStringsSet = $erlandsona$assoc_set$AssocSet$fromList(
				A2(
					$elm$core$List$map,
					$author$project$Main$urlDisplay,
					A2(
						$elm$core$List$map,
						function ($) {
							return $.src;
						},
						indexSources)));
			var newSourcesSet = A2($erlandsona$assoc_set$AssocSet$diff, indexStringsSet, lastSourcesSet);
			var newSources = A2(
				$elm$core$Debug$log,
				'maybeAddNewSource, newsources',
				$erlandsona$assoc_set$AssocSet$toList(newSourcesSet));
			var err = _Utils_eq(newSources, _List_Nil) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				$author$project$Main$msgs.addNewSources + (': ' + $elm$core$String$fromInt(
					$elm$core$List$length(newSources))));
			return _Utils_update(
				model,
				{
					err: err,
					lastSources: lastSources,
					sources: _Utils_ap(
						model.sources,
						A2($elm$core$List$map, $author$project$Main$srcSource, newSources))
				});
		}
	});
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
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $billstclair$elm_port_funnel$PortFunnel$process = F4(
	function (accessors, _v0, genericMessage, state) {
		var moduleDesc = _v0.a;
		var _v1 = moduleDesc.decoder(genericMessage);
		if (_v1.$ === 'Err') {
			var err = _v1.a;
			return $elm$core$Result$Err(err);
		} else {
			var message = _v1.a;
			var substate = accessors.get(state);
			var _v2 = A2(moduleDesc.process, message, substate);
			var substate2 = _v2.a;
			var response = _v2.b;
			return $elm$core$Result$Ok(
				_Utils_Tuple2(
					A2(accessors.set, substate2, state),
					response));
		}
	});
var $Janiczek$cmd_extra$Cmd$Extra$withCmds = F2(
	function (cmds, model) {
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(cmds));
	});
var $billstclair$elm_port_funnel$PortFunnel$appProcess = F5(
	function (cmdPort, genericMessage, funnel, state, model) {
		var _v0 = A4($billstclair$elm_port_funnel$PortFunnel$process, funnel.accessors, funnel.moduleDesc, genericMessage, state);
		if (_v0.$ === 'Err') {
			var error = _v0.a;
			return $elm$core$Result$Err(error);
		} else {
			var _v1 = _v0.a;
			var state2 = _v1.a;
			var response = _v1.b;
			var gmToCmdPort = function (gm) {
				return cmdPort(
					$billstclair$elm_port_funnel$PortFunnel$encodeGenericMessage(gm));
			};
			var cmd = A2(funnel.commander, gmToCmdPort, response);
			var _v2 = A3(funnel.handler, response, state2, model);
			var model2 = _v2.a;
			var cmd2 = _v2.b;
			return $elm$core$Result$Ok(
				A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmds,
					_List_fromArray(
						[cmd, cmd2]),
					model2));
		}
	});
var $author$project$PortFunnels$appTrampoline = F5(
	function (portGetter, genericMessage, funnel, state, model) {
		var appFunnel = funnel.a;
		return A5(
			$billstclair$elm_port_funnel$PortFunnel$appProcess,
			A2(portGetter, $billstclair$elm_localstorage$PortFunnel$LocalStorage$moduleName, model),
			genericMessage,
			appFunnel,
			state,
			model);
	});
var $billstclair$elm_port_funnel$PortFunnel$processValue = F5(
	function (funnels, appTrampoline, value, state, model) {
		var _v0 = $billstclair$elm_port_funnel$PortFunnel$decodeGenericMessage(value);
		if (_v0.$ === 'Err') {
			var error = _v0.a;
			return $elm$core$Result$Err(error);
		} else {
			var genericMessage = _v0.a;
			var moduleName = genericMessage.moduleName;
			var _v1 = A2($elm$core$Dict$get, moduleName, funnels);
			if (_v1.$ === 'Just') {
				var funnel = _v1.a;
				var _v2 = A4(appTrampoline, genericMessage, funnel, state, model);
				if (_v2.$ === 'Err') {
					var error = _v2.a;
					return $elm$core$Result$Err(error);
				} else {
					var _v3 = _v2.a;
					var model2 = _v3.a;
					var cmd = _v3.b;
					return $elm$core$Result$Ok(
						_Utils_Tuple2(model2, cmd));
				}
			} else {
				return $elm$core$Result$Err('Unknown moduleName: ' + moduleName);
			}
		}
	});
var $author$project$PortFunnels$processValue = F4(
	function (_v0, value, state, model) {
		var funnelDict = _v0.a;
		var portGetter = _v0.b;
		return A5(
			$billstclair$elm_port_funnel$PortFunnel$processValue,
			funnelDict,
			$author$project$PortFunnels$appTrampoline(portGetter),
			value,
			state,
			model);
	});
var $elm$browser$Browser$Navigation$reloadAndSkipCache = _Browser_reload(true);
var $elm_community$list_extra$List$Extra$removeAt = F2(
	function (index, l) {
		if (index < 0) {
			return l;
		} else {
			var _v0 = A2($elm$core$List$drop, index, l);
			if (!_v0.b) {
				return l;
			} else {
				var rest = _v0.b;
				return _Utils_ap(
					A2($elm$core$List$take, index, l),
					rest);
			}
		}
	});
var $author$project$Main$selectSourcePanel = F2(
	function (idx, model) {
		if (_Utils_cmp(
			idx,
			$elm$core$List$length(model.sourcePanels)) > 0) {
			return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
		} else {
			var _v0 = _Utils_eq(idx, model.sourcePanelIdx) ? _Utils_Tuple2(-1, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
				idx,
				$author$project$Main$focusInput($author$project$Main$ids.sourcePanelName));
			var i = _v0.a;
			var cmd = _v0.b;
			return A2(
				$Janiczek$cmd_extra$Cmd$Extra$withCmd,
				cmd,
				_Utils_update(
					model,
					{sourcePanelIdx: i}));
		}
	});
var $elm_community$list_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$findIndex = $elm_community$list_extra$List$Extra$findIndexHelp(0);
var $elm_community$list_extra$List$Extra$elemIndex = function (x) {
	return $elm_community$list_extra$List$Extra$findIndex(
		$elm$core$Basics$eq(x));
};
var $author$project$Main$setSourcePanelNamed = F3(
	function (name, sources, sourcePanels) {
		var _v0 = A2(
			$elm_community$list_extra$List$Extra$find,
			function (sp) {
				return _Utils_eq(sp.name, name);
			},
			sourcePanels);
		if (_v0.$ === 'Nothing') {
			return A2(
				$elm$core$List$cons,
				{name: name, panels: sources},
				sourcePanels);
		} else {
			var panel = _v0.a;
			if (_Utils_eq(panel.panels, sources)) {
				return sourcePanels;
			} else {
				var _v1 = A2($elm_community$list_extra$List$Extra$elemIndex, panel, sourcePanels);
				if (_v1.$ === 'Nothing') {
					return sourcePanels;
				} else {
					var idx = _v1.a;
					return A3(
						$elm_community$list_extra$List$Extra$setAt,
						idx,
						_Utils_update(
							panel,
							{panels: sources}),
						sourcePanels);
				}
			}
		}
	});
var $elm$core$Basics$round = _Basics_round;
var $elm$core$String$toFloat = _String_toFloat;
var $author$project$Main$swapInterval = function (model) {
	return $elm$core$Basics$round(
		function () {
			var _v0 = $elm$core$String$toFloat(model.switchPeriod);
			if (_v0.$ === 'Just') {
				var f = _v0.a;
				return A2($elm$core$Basics$max, 1, f);
			} else {
				return 5;
			}
		}() * 1000);
};
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$Main$undoModelToModel = F2(
	function (undoModel, model) {
		return _Utils_update(
			model,
			{editingIdx: undoModel.editingIdx, editingIdxStr: undoModel.editingIdxStr, editingLabel: undoModel.editingLabel, editingSrc: undoModel.editingSrc, editingUrl: undoModel.editingUrl, sourcePanelIdx: undoModel.sourcePanelIdx, sourcePanels: undoModel.sourcePanels, sources: undoModel.sources, srcIdx: undoModel.srcIdx});
	});
var $author$project$Main$undo = function (model) {
	var _v0 = model.undoModel;
	if (_v0.$ === 'Nothing') {
		return model;
	} else {
		var undoModel = _v0.a;
		var mdl = A2($author$project$Main$undoModelToModel, undoModel, model);
		return $author$project$Main$initializeEditingFields(
			_Utils_update(
				mdl,
				{undoModel: $elm$core$Maybe$Nothing}));
	}
};
var $author$project$Main$updateInternal = F3(
	function (doUpdate, msg, modelIn) {
		var model = (_Utils_eq(msg, $author$project$Main$DeleteState) || (!doUpdate)) ? modelIn : _Utils_update(
			modelIn,
			{reallyDeleteState: false});
		switch (msg.$) {
			case 'OnUrlChange':
				var url = msg.a;
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'OnUrlRequest':
				var urlRequest = msg.a;
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'Swipe':
				var event = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							gesture: A2($author$project$Swipe$record, event, model.gesture)
						}));
			case 'EndSwipe':
				var event = msg.a;
				return A2($author$project$Main$endSwipe, event, model);
			case 'FinishUrlParse':
				var url = msg.a;
				var maybeTitle = msg.b;
				var maybeSources = msg.c;
				var setSourceList = msg.d;
				return A5($author$project$Main$finishUrlParse, url, maybeTitle, maybeSources, setSourceList, model);
			case 'MouseDown':
				return _Utils_Tuple2(
					$author$project$Main$nextImage(model),
					$elm$core$Platform$Cmd$none);
			case 'ReceiveTime':
				var posix = msg.a;
				var millis = $elm$time$Time$posixToMillis(posix);
				var lastSwapTime = model.lastSwapTime;
				var m = _Utils_update(
					model,
					{
						lastSwapTime: (!lastSwapTime) ? millis : lastSwapTime,
						time: millis
					});
				return (_Utils_eq(m.visibility, $elm$browser$Browser$Events$Visible) && (m.switchEnabled && (_Utils_cmp(
					millis,
					m.lastSwapTime + $author$project$Main$swapInterval(m)) > -1))) ? _Utils_Tuple2(
					$author$project$Main$nextImage(
						_Utils_update(
							m,
							{lastSwapTime: millis})),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(m, $elm$core$Platform$Cmd$none);
			case 'SetVisible':
				var v = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							visibility: A2($elm$core$Debug$log, 'visibility', v)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetSrcIdx':
				var idxStr = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					A2($author$project$Main$digitKey, idxStr, model));
			case 'OnKeyPress':
				var isDown = msg.a;
				var key = msg.b;
				var mdl = _Utils_update(
					model,
					{lastKey: key});
				var lastKey = model.lastKey;
				var lastKeyWasCommand = (!model.isFocused) && $author$project$Main$keyIsCommand(lastKey);
				var _v1 = model.isFocused ? _Utils_Tuple2(
					_List_fromArray(
						['ArrowLeft']),
					_List_fromArray(
						['ArrowRight'])) : _Utils_Tuple2(
					_List_fromArray(
						['ArrowLeft', 'j', 'J', 'd', 'D', 's', 'S']),
					_List_fromArray(
						['ArrowRight', 'l', 'L', 'k', 'K', 'f', 'F']));
				var leftKeys = _v1.a;
				var rightKeys = _v1.b;
				return (!isDown) ? $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						mdl,
						{lastKey: ''})) : (A2($elm$core$List$member, key, leftKeys) ? $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					$author$project$Main$prevImage(mdl)) : (A2($elm$core$List$member, key, rightKeys) ? $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					$author$project$Main$nextImage(mdl)) : (((!model.isFocused) && ((key >= '0') && (key <= '9'))) ? $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					A2($author$project$Main$digitKey, key, mdl)) : ((lastKeyWasCommand && (key === 'z')) ? $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					$author$project$Main$undo(mdl)) : ((lastKeyWasCommand && (key === 'c')) ? $author$project$Main$copyItems(
					_Utils_update(
						model,
						{copyFrom: $author$project$Main$Live, copyTo: $author$project$Main$Clipboard})) : ((lastKeyWasCommand && (key === 'v')) ? $author$project$Main$copyItems(
					_Utils_update(
						model,
						{copyFrom: $author$project$Main$Clipboard, copyTo: $author$project$Main$Live})) : $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(mdl)))))));
			case 'InputSwitchPeriod':
				var string = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{switchPeriod: string}));
			case 'SearchMore':
				var morep = msg.a;
				var matchCnt = msg.b;
				var searchCnt = model.searchCnt;
				var newCnt = morep ? ((searchCnt < 50) ? 50 : ((searchCnt === 50) ? 100 : (searchCnt + 100))) : ((searchCnt > 100) ? (searchCnt - 100) : ((searchCnt > 50) ? 50 : 10));
				var newStart = (!model.searchStart) ? model.searchStart : A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, model.searchStart, matchCnt - newCnt));
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{searchCnt: newCnt, searchStart: newStart}));
			case 'ScrollSearch':
				var downp = msg.a;
				var matchCnt = msg.b;
				var mdl = function () {
					if (downp) {
						var maxStart = matchCnt - model.searchCnt;
						return (_Utils_cmp(model.searchStart, maxStart) > -1) ? model : _Utils_update(
							model,
							{
								searchStart: A2($elm$core$Basics$min, maxStart, model.searchStart + model.searchCnt)
							});
					} else {
						if (model.searchStart <= 0) {
							return model;
						} else {
							return _Utils_update(
								model,
								{
									searchStart: A2($elm$core$Basics$max, 0, model.searchStart - model.searchCnt)
								});
						}
					}
				}();
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(mdl);
			case 'ToggleSwitchEnabled':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{lastSwapTime: model.time, switchEnabled: !model.switchEnabled}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleControls':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{showControls: !model.showControls}));
			case 'ToggleShowEditingSources':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{showEditingSources: !model.showEditingSources}));
			case 'ToggleShowHelp':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{showHelp: !model.showHelp}));
			case 'ToggleMergeEditingSources':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{mergeEditingSources: !model.mergeEditingSources}));
			case 'ToggleShowSearch':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{showSearch: !model.showSearch}));
			case 'DeleteAll':
				var newSources = A2($elm$core$List$take, 1, model.sources);
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					$author$project$Main$initializeEditingFields(
						_Utils_update(
							model,
							{
								sources: newSources,
								srcIdx: 0,
								undoModel: $elm$core$Maybe$Just(
									$author$project$Main$modelToUndoModel(model))
							})));
			case 'AddEditingSrc':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					A4(
						$author$project$Main$addSource,
						$elm$core$String$toInt(model.editingIdxStr),
						{
							label: $elm$core$Maybe$Just(model.editingLabel),
							src: model.editingSrc,
							url: $elm$core$Maybe$Just(model.editingUrl)
						},
						false,
						_Utils_update(
							model,
							{
								undoModel: $elm$core$Maybe$Just(
									$author$project$Main$modelToUndoModel(model))
							})));
			case 'ChangeEditingSrc':
				var sources = model.sources;
				var idx = model.editingIdx;
				var _v2 = A2($elm_community$list_extra$List$Extra$getAt, idx, sources);
				if (_v2.$ === 'Nothing') {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var source = _v2.a;
					var src = model.editingSrc;
					var newSource = $author$project$Main$canonicalizeSource(
						_Utils_update(
							source,
							{
								label: $elm$core$Maybe$Just(model.editingLabel),
								src: src,
								url: $elm$core$Maybe$Just(model.editingUrl)
							}));
					var newSources = A3($elm_community$list_extra$List$Extra$setAt, idx, newSource, sources);
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						A3(
							$author$project$Main$setEditingFields,
							idx,
							newSource,
							_Utils_update(
								model,
								{
									err: $elm$core$Maybe$Just($author$project$Main$msgs.changeSource),
									lastSources: $author$project$Main$uniqueifyList(
										A2($elm$core$List$cons, newSource.src, model.lastSources)),
									sources: newSources,
									srcIdx: idx,
									undoModel: $elm$core$Maybe$Just(
										$author$project$Main$modelToUndoModel(model))
								})));
				}
			case 'MoveEditingSrc':
				var _v3 = A2($elm_community$list_extra$List$Extra$getAt, model.editingIdx, model.sources);
				if (_v3.$ === 'Nothing') {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var source = _v3.a;
					var sources = A2($elm_community$list_extra$List$Extra$removeAt, model.editingIdx, model.sources);
					var idx = A2(
						$elm$core$Maybe$withDefault,
						-1,
						$elm$core$String$toInt(model.editingIdxStr));
					var _v4 = A3($author$project$Main$insertInList, idx, source, sources);
					var newIdx = _v4.a;
					var newSources = _v4.b;
					var mdl = _Utils_update(
						model,
						{
							err: $elm$core$Maybe$Just($author$project$Main$msgs.moveSource),
							sources: newSources,
							srcIdx: newIdx,
							undoModel: $elm$core$Maybe$Just(
								$author$project$Main$modelToUndoModel(model))
						});
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						A3($author$project$Main$setEditingFields, newIdx, source, mdl));
				}
			case 'LookupEditingSrc':
				var idx = A2(
					$elm$core$Maybe$withDefault,
					-1,
					$elm$core$String$toInt(model.editingIdxStr));
				var _v5 = A2($elm_community$list_extra$List$Extra$getAt, idx, model.sources);
				if (_v5.$ === 'Nothing') {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var source = _v5.a;
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						A3(
							$author$project$Main$setEditingFields,
							idx,
							source,
							_Utils_update(
								model,
								{
									err: $elm$core$Maybe$Just($author$project$Main$msgs.lookupSource),
									undoModel: $elm$core$Maybe$Just(
										$author$project$Main$modelToUndoModel(model))
								})));
				}
			case 'DeleteEditingSrc':
				if ($elm$core$List$length(model.sources) <= 1) {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var newSources = A2($elm_community$list_extra$List$Extra$removeAt, model.editingIdx, model.sources);
					var newIdx = A2($elm$core$Basics$max, 0, model.editingIdx - 1);
					var mdl = _Utils_update(
						model,
						{
							err: $elm$core$Maybe$Just($author$project$Main$msgs.deleteSource),
							sources: newSources,
							srcIdx: newIdx,
							undoModel: $elm$core$Maybe$Just(
								$author$project$Main$modelToUndoModel(model))
						});
					var _v6 = A2($elm_community$list_extra$List$Extra$getAt, newIdx, newSources);
					if (_v6.$ === 'Nothing') {
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
					} else {
						var source = _v6.a;
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
							A3($author$project$Main$setEditingFields, newIdx, source, mdl));
					}
				}
			case 'InputEditingIdxStr':
				var idxstr = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{editingIdxStr: idxstr}));
			case 'InputEditingSrc':
				var editingSrc = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							editingLabel: (model.editingLabel === '') ? $author$project$Main$getLabelFromFileName(editingSrc) : (_Utils_eq(
								model.editingLabel,
								$author$project$Main$getLabelFromFileName(model.editingSrc)) ? '' : model.editingLabel),
							editingSrc: editingSrc
						}));
			case 'InputEditingName':
				var name = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{editingLabel: name}));
			case 'InputEditingUrl':
				var url = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{editingUrl: url}));
			case 'AddSourcePanel':
				var firstp = msg.a;
				var name = $author$project$Main$newSourcePanelName(model.sourcePanels);
				var panel = {name: name, panels: model.sources};
				var idx = firstp ? 0 : (model.sourcePanelIdx + 1);
				var _v7 = A2(
					$elm$core$Debug$log,
					'insertInList ' + $elm$core$String$fromInt(idx),
					A3($author$project$Main$insertInList, idx, panel, model.sourcePanels));
				var newIdx = _v7.a;
				var panels = _v7.b;
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					$author$project$Main$focusInput($author$project$Main$ids.sourcePanelName),
					_Utils_update(
						model,
						{
							err: $elm$core$Maybe$Just($author$project$Main$msgs.addSourcePanel),
							sourcePanelIdx: newIdx,
							sourcePanels: panels,
							undoModel: $elm$core$Maybe$Just(
								$author$project$Main$modelToUndoModel(model))
						}));
			case 'SaveRestoreSourcePanel':
				var savep = msg.a;
				var _v8 = A2($elm_community$list_extra$List$Extra$getAt, model.sourcePanelIdx, model.sourcePanels);
				if (_v8.$ === 'Nothing') {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var panel = _v8.a;
					return savep ? $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						$author$project$Main$initializeEditingFields(
							_Utils_update(
								model,
								{
									err: $elm$core$Maybe$Just($author$project$Main$msgs.saveSourcePanel),
									sources: panel.panels,
									srcIdx: 0,
									undoModel: $elm$core$Maybe$Just(
										$author$project$Main$modelToUndoModel(model))
								}))) : $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just($author$project$Main$msgs.restoreSourcePanel),
								sourcePanels: A3(
									$elm_community$list_extra$List$Extra$setAt,
									model.sourcePanelIdx,
									_Utils_update(
										panel,
										{panels: model.sources}),
									model.sourcePanels),
								undoModel: $elm$core$Maybe$Just(
									$author$project$Main$modelToUndoModel(model))
							}));
				}
			case 'DeleteSourcePanel':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							err: $elm$core$Maybe$Just($author$project$Main$msgs.deleteSourcePanel),
							sourcePanelIdx: -1,
							sourcePanels: A2($elm_community$list_extra$List$Extra$removeAt, model.sourcePanelIdx, model.sourcePanels),
							undoModel: $elm$core$Maybe$Just(
								$author$project$Main$modelToUndoModel(model))
						}));
			case 'MoveSourcePanelUp':
				var moveUp = msg.a;
				if (model.sourcePanelIdx < 0) {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var idx = model.sourcePanelIdx + (moveUp ? (-1) : 1);
					if ((idx < 0) || (_Utils_cmp(
						idx,
						$elm$core$List$length(model.sourcePanels)) > -1)) {
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
					} else {
						var sourcePanels = model.sourcePanels;
						var sourcePanelIdx = model.sourcePanelIdx;
						var _v9 = A2($elm_community$list_extra$List$Extra$getAt, sourcePanelIdx, sourcePanels);
						if (_v9.$ === 'Nothing') {
							return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
						} else {
							var panel = _v9.a;
							var panels = A2($elm_community$list_extra$List$Extra$removeAt, sourcePanelIdx, sourcePanels);
							var _v10 = A3($author$project$Main$insertInList, idx, panel, panels);
							var newIdx = _v10.a;
							var newSourcePanels = _v10.b;
							return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
								_Utils_update(
									model,
									{
										err: $elm$core$Maybe$Just($author$project$Main$msgs.moveSourcePanel),
										sourcePanelIdx: newIdx,
										sourcePanels: newSourcePanels,
										undoModel: $elm$core$Maybe$Just(
											$author$project$Main$modelToUndoModel(model))
									}));
						}
					}
				}
			case 'SelectSourcePanel':
				var idx = msg.a;
				return A2($author$project$Main$selectSourcePanel, idx, model);
			case 'InputEditingPanelName':
				var name = msg.a;
				var _v11 = A2($elm_community$list_extra$List$Extra$getAt, model.sourcePanelIdx, model.sourcePanels);
				if (_v11.$ === 'Nothing') {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var panel = _v11.a;
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						_Utils_update(
							model,
							{
								sourcePanels: A3(
									$elm_community$list_extra$List$Extra$setAt,
									model.sourcePanelIdx,
									_Utils_update(
										panel,
										{name: name}),
									model.sourcePanels)
							}));
				}
			case 'Copy':
				return $author$project$Main$copyItems(model);
			case 'SetCopyFrom':
				var option = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					A2(
						$author$project$Main$fixCopyFromEqualsTo,
						false,
						_Utils_update(
							model,
							{
								copyFrom: $author$project$Main$labelCopyOption(option)
							})));
			case 'SetCopyTo':
				var option = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					A2(
						$author$project$Main$fixCopyFromEqualsTo,
						true,
						_Utils_update(
							model,
							{
								copyTo: $author$project$Main$labelCopyOption(option)
							})));
			case 'Undo':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					$author$project$Main$undo(model));
			case 'InputSearchString':
				var s = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{searchStart: 0, searchString: s}));
			case 'Focus':
				var isFocused = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{isFocused: isFocused}));
			case 'InputClipboard':
				var s = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{clipboard: s}));
			case 'ReadClipboard':
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					$author$project$Main$clipboardRead(''),
					_Utils_update(
						model,
						{clipboard: ''}));
			case 'ClipboardContents':
				var s = msg.a;
				return A2(
					$author$project$Main$finishCopyFromClipboard,
					s,
					_Utils_update(
						model,
						{clipboard: s}));
			case 'WriteClipboard':
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					$author$project$Main$clipboardWrite(model.clipboard),
					_Utils_update(
						model,
						{clipboard: ''}));
			case 'ReloadFromServer':
				return A2($Janiczek$cmd_extra$Cmd$Extra$withCmd, $elm$browser$Browser$Navigation$reloadAndSkipCache, model);
			case 'DeleteState':
				if (model.reallyDeleteState) {
					var _v12 = A2($author$project$Main$init, model.url, model.key);
					var mdl = _v12.a;
					var cmd = _v12.b;
					return A2(
						$Janiczek$cmd_extra$Cmd$Extra$withCmds,
						_List_fromArray(
							[
								cmd,
								A2($author$project$Main$clearKeys, mdl.funnelState.storage, ''),
								A2($author$project$Main$getIndexJson, model.url, true)
							]),
						_Utils_update(
							mdl,
							{reallyDeleteState: false, started: $author$project$Main$Started}));
				} else {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						_Utils_update(
							model,
							{reallyDeleteState: true}));
				}
			case 'Noop':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
			case 'SequenceCmds':
				var commands = msg.a;
				if (!commands.b) {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var first = commands.a;
					var rest = commands.b;
					return A2(
						$Janiczek$cmd_extra$Cmd$Extra$withCmds,
						_List_fromArray(
							[
								first,
								A2(
								$author$project$Main$delay,
								1,
								$author$project$Main$SequenceCmds(rest))
							]),
						model);
				}
			case 'GotIndex':
				var filename = msg.a;
				var setSourcesList = msg.b;
				var result = msg.c;
				var x = _Utils_Tuple3(
					A2($elm$core$Debug$log, 'GotIndex, filename', filename),
					A2($elm$core$Debug$log, '  setSourcesList', setSourcesList),
					A2($elm$core$Debug$log, '  result', result));
				if (result.$ === 'Err') {
					var e = result.a;
					if (_Utils_eq(filename, $author$project$Main$indexJson)) {
						var url = $author$project$Main$indexSampleJson;
						return A2(
							$Janiczek$cmd_extra$Cmd$Extra$withCmd,
							A2(
								$author$project$Main$httpGetJsonFile,
								url,
								A2($author$project$Main$GotIndex, url, setSourcesList)),
							model);
					} else {
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
							_Utils_update(
								model,
								{
									err: $elm$core$Maybe$Just(
										$elm$core$Debug$toString(e))
								}));
					}
				} else {
					var sources = result.a;
					var indexSources = sources;
					var mdl = $author$project$Main$initializeEditingFields(
						setSourcesList ? _Utils_update(
							model,
							{sources: indexSources}) : A2($author$project$Main$maybeAddNewSources, indexSources, model));
					return A2(
						$Janiczek$cmd_extra$Cmd$Extra$withCmd,
						$author$project$Main$msgCmd(
							$author$project$Main$SetDefaultSources(indexSources)),
						_Utils_update(
							mdl,
							{
								defaultSources: indexSources,
								lastSources: $author$project$Main$uniqueifyList(
									A2(
										$elm$core$List$map,
										function ($) {
											return $.src;
										},
										mdl.sources))
							}));
				}
			case 'SetDefaultSources':
				var sources = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							sourcePanels: A3(
								$author$project$Main$setSourcePanelNamed,
								'default',
								A2($elm$core$Debug$log, 'SetDefaultSources', sources),
								model.sourcePanels)
						}));
			case 'Process':
				var value = msg.a;
				var _v15 = A4($author$project$PortFunnels$processValue, $author$project$Main$funnelDict, value, model.funnelState, model);
				if (_v15.$ === 'Err') {
					var error = _v15.a;
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just(
									$elm$core$Debug$toString(error))
							}));
				} else {
					var res = _v15.a;
					return res;
				}
			default:
				var settings = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							funnelState: $author$project$PortFunnels$initialState(
								$author$project$Main$getLocalStoragePrefix(settings)),
							settings: A2($elm$core$Debug$log, 'receive settings', settings)
						}));
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		var partOfCommandZ = function () {
			if (msg.$ === 'OnKeyPress') {
				var isDown = msg.a;
				var key = msg.b;
				return (!isDown) || ($author$project$Main$keyIsCommand(key) || ($author$project$Main$keyIsCommand(model.lastKey) && (key === 'z')));
			} else {
				return false;
			}
		}();
		var notUndo = (!_Utils_eq(msg, $author$project$Main$Undo)) && (!partOfCommandZ);
		var doUpdate = function () {
			switch (msg.$) {
				case 'Noop':
					return false;
				case 'Focus':
					return false;
				case 'ReceiveTime':
					return false;
				case 'DeleteState':
					return false;
				case 'Process':
					return false;
				case 'ReceiveSettings':
					return false;
				case 'GotIndex':
					return false;
				case 'SetDefaultSources':
					return false;
				case 'SetVisible':
					return false;
				case 'SequenceCmds':
					return false;
				default:
					return true;
			}
		}();
		var noErrModel = doUpdate ? _Utils_update(
			model,
			{err: $elm$core$Maybe$Nothing}) : model;
		var undoneModel = (doUpdate && notUndo) ? _Utils_update(
			noErrModel,
			{undoModel: $elm$core$Maybe$Nothing}) : noErrModel;
		var _v0 = A3($author$project$Main$updateInternal, doUpdate, msg, undoneModel);
		var mdl = _v0.a;
		var cmd = _v0.b;
		if (doUpdate && _Utils_eq(mdl.started, $author$project$Main$Started)) {
			var savedModel = $author$project$Main$modelToSavedModel(model);
			var savedMdl = $author$project$Main$modelToSavedModel(mdl);
			if (_Utils_eq(savedMdl, savedModel)) {
				return A2($Janiczek$cmd_extra$Cmd$Extra$withCmd, cmd, mdl);
			} else {
				var m = A2($elm$core$Debug$log, 'update, msg', msg);
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmds,
					_List_fromArray(
						[
							cmd,
							A2($author$project$Main$saveSavedModel, mdl.funnelState.storage, savedMdl)
						]),
					mdl);
			}
		} else {
			return A2($Janiczek$cmd_extra$Cmd$Extra$withCmd, cmd, mdl);
		}
	});
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$InputSwitchPeriod = function (a) {
	return {$: 'InputSwitchPeriod', a: a};
};
var $author$project$Main$ReloadFromServer = {$: 'ReloadFromServer'};
var $author$project$Main$ToggleSwitchEnabled = {$: 'ToggleSwitchEnabled'};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$b = _VirtualDom_node('b');
var $author$project$Main$b = function (string) {
	return A2(
		$elm$html$Html$b,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(string)
			]));
};
var $elm$html$Html$br = _VirtualDom_node('br');
var $author$project$Main$br = A2($elm$html$Html$br, _List_Nil, _List_Nil);
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Main$titledButton = F4(
	function (theTitle, enabled, msg, label) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(msg),
					$elm$html$Html$Attributes$disabled(!enabled),
					$elm$html$Html$Attributes$title(theTitle),
					A2($elm$html$Html$Attributes$style, 'border-radius', '9999px'),
					A2($elm$html$Html$Attributes$style, 'border-width', '1px')
				]),
			_List_fromArray(
				[
					$author$project$Main$b(label)
				]));
	});
var $author$project$Main$enabledButton = $author$project$Main$titledButton('');
var $author$project$Main$button = $author$project$Main$enabledButton(true);
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$Main$titledCheckBox = F4(
	function (theTitle, msg, isChecked, label) {
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick(msg),
					A2($elm$html$Html$Attributes$style, 'cursor', 'default'),
					$elm$html$Html$Attributes$title(theTitle),
					A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('checkbox'),
							$elm$html$Html$Attributes$checked(isChecked)
						]),
					_List_Nil),
					$author$project$Main$b(label)
				]));
	});
var $author$project$Main$checkBox = $author$project$Main$titledCheckBox('');
var $author$project$Main$imagePrefix = 'images/';
var $author$project$Main$imgTypes = A2($elm$core$String$split, ',', 'jpg,jpeg,gif,png,svg,webp');
var $author$project$Main$urlType = function (url) {
	return function (l) {
		var _v0 = $elm$core$List$head(l);
		if (_v0.$ === 'Nothing') {
			return '';
		} else {
			var res = _v0.a;
			return res;
		}
	}(
		$elm$core$List$reverse(
			A2($elm$core$String$split, '.', url)));
};
var $author$project$Main$isImageUrl = function (url) {
	var fileUrlType = $author$project$Main$urlType(url);
	return A2($elm$core$List$member, fileUrlType, $author$project$Main$imgTypes);
};
var $author$project$Main$nonPeopleFiles = _List_Nil;
var $author$project$Main$computeImgSrc = F2(
	function (maybeSource, idx) {
		if (maybeSource.$ === 'Nothing') {
			return _Utils_Tuple2(
				$elm$core$String$fromInt(idx),
				'');
		} else {
			var source = maybeSource.a;
			var src = function () {
				if (A2($elm$core$String$startsWith, 'http', source.src)) {
					return source.src;
				} else {
					var prefix = A2($elm$core$List$member, source.src, $author$project$Main$nonPeopleFiles) ? $author$project$Main$imagePrefix : (A2($elm$core$String$startsWith, $author$project$Main$peoplePrefix, source.src) ? $author$project$Main$imagePrefix : (A2($elm$core$String$contains, '/', source.src) ? 'https://' : ($author$project$Main$isImageUrl(source.src) ? _Utils_ap($author$project$Main$imagePrefix, $author$project$Main$peoplePrefix) : 'https://')));
					return _Utils_ap(prefix, source.src);
				}
			}();
			var url = function () {
				var _v1 = source.url;
				if (_v1.$ === 'Nothing') {
					return src;
				} else {
					var u = _v1.a;
					return (u === '') ? src : u;
				}
			}();
			return _Utils_Tuple2(src, url);
		}
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Main$Focus = function (a) {
	return {$: 'Focus', a: a};
};
var $elm$html$Html$Events$onBlur = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'blur',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onFocus = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'focus',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Main$focusTrackingInput = F2(
	function (attributes, elements) {
		return A2(
			$elm$html$Html$input,
			$elm$core$List$concat(
				_List_fromArray(
					[
						attributes,
						_List_fromArray(
						[
							$elm$html$Html$Events$onFocus(
							$author$project$Main$Focus(true)),
							$elm$html$Html$Events$onBlur(
							$author$project$Main$Focus(false))
						])
					])),
			elements);
	});
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $author$project$Main$h2 = function (title) {
	return A2(
		$elm$html$Html$h2,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(title)
			]));
};
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$virtual_dom$VirtualDom$lazy2 = _VirtualDom_lazy2;
var $elm$html$Html$Lazy$lazy2 = $elm$virtual_dom$VirtualDom$lazy2;
var $author$project$Main$modelLabel = function (model) {
	var _v0 = A2($elm_community$list_extra$List$Extra$getAt, model.srcIdx, model.sources);
	if (_v0.$ === 'Just') {
		var s = _v0.a;
		var _v1 = s.label;
		if (_v1.$ === 'Just') {
			var l = _v1.a;
			return l;
		} else {
			return $author$project$Main$getLabelFromFileName(s.src);
		}
	} else {
		return '';
	}
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Main$ToggleControls = {$: 'ToggleControls'};
var $author$project$Main$showControlsButton = function (model) {
	return A2(
		$author$project$Main$button,
		$author$project$Main$ToggleControls,
		model.showControls ? 'Hide Controls' : 'Show Controls');
};
var $elm$core$Char$fromCode = _Char_fromCode;
var $elm$core$String$fromList = _String_fromList;
var $author$project$Main$stringFromCode = function (code) {
	return $elm$core$String$fromList(
		_List_fromArray(
			[
				$elm$core$Char$fromCode(code)
			]));
};
var $author$project$Main$special = {
	biohazard: $author$project$Main$stringFromCode(9763),
	black_star: $author$project$Main$stringFromCode(10036),
	checkmark: $author$project$Main$stringFromCode(10003),
	copyright: $author$project$Main$stringFromCode(169),
	hourglass: $author$project$Main$stringFromCode(8987),
	hourglass_flowing: $author$project$Main$stringFromCode(9203),
	middleDot: $author$project$Main$stringFromCode(183),
	nbsp: $author$project$Main$stringFromCode(160)
};
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Main$ToggleMergeEditingSources = {$: 'ToggleMergeEditingSources'};
var $author$project$Main$ToggleShowSearch = {$: 'ToggleShowSearch'};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $author$project$Main$center = $elm$html$Html$node('center');
var $elm$virtual_dom$VirtualDom$lazy4 = _VirtualDom_lazy4;
var $elm$html$Html$Lazy$lazy4 = $elm$virtual_dom$VirtualDom$lazy4;
var $author$project$Main$viewClipboardTest = function (model) {
	return $elm$html$Html$text('');
};
var $author$project$Main$Copy = {$: 'Copy'};
var $author$project$Main$SetCopyFrom = function (a) {
	return {$: 'SetCopyFrom', a: a};
};
var $author$project$Main$SetCopyTo = function (a) {
	return {$: 'SetCopyTo', a: a};
};
var $author$project$Main$copyPlaces = _List_fromArray(
	[$author$project$Main$Live, $author$project$Main$Displayed, $author$project$Main$Clipboard, $author$project$Main$Panel]);
var $author$project$Main$isPanelSelectable = function (model) {
	return (model.sourcePanelIdx >= 0) && (_Utils_cmp(
		model.sourcePanelIdx,
		$elm$core$List$length(model.sourcePanels)) < 0);
};
var $author$project$Main$isFromSelectable = F2(
	function (option, model) {
		switch (option.$) {
			case 'Clipboard':
				return true;
			case 'Live':
				return true;
			case 'Displayed':
				return true;
			default:
				return $author$project$Main$isPanelSelectable(model);
		}
	});
var $author$project$Main$isFromSelected = F2(
	function (option, model) {
		return _Utils_eq(model.copyFrom, option);
	});
var $author$project$Main$isToSelectable = F2(
	function (option, model) {
		return true;
	});
var $author$project$Main$isToSelected = F2(
	function (option, model) {
		return _Utils_eq(model.copyTo, option);
	});
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $author$project$Main$viewOption = F4(
	function (isSelected, isSelectable, copyOption, model) {
		var label = $author$project$Main$copyOptionLabel(copyOption);
		return A2(
			$elm$html$Html$option,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value(label),
					$elm$html$Html$Attributes$selected(
					A2(isSelected, copyOption, model)),
					$elm$html$Html$Attributes$disabled(
					!A2(isSelectable, copyOption, model))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(label)
				]));
	});
var $author$project$Main$viewCopyButtons = function (model) {
	return A2(
		$elm$html$Html$p,
		_List_Nil,
		_List_fromArray(
			[
				A2($author$project$Main$button, $author$project$Main$Copy, 'Copy'),
				$author$project$Main$b(' from: '),
				A2(
				$elm$html$Html$select,
				_List_fromArray(
					[
						$elm$html$Html$Events$onInput($author$project$Main$SetCopyFrom)
					]),
				A2(
					$elm$core$List$map,
					function (option) {
						return A4($author$project$Main$viewOption, $author$project$Main$isFromSelected, $author$project$Main$isFromSelectable, option, model);
					},
					$author$project$Main$copyPlaces)),
				$elm$html$Html$text(' '),
				$author$project$Main$b('to: '),
				A2(
				$elm$html$Html$select,
				_List_fromArray(
					[
						$elm$html$Html$Events$onInput($author$project$Main$SetCopyTo)
					]),
				A2(
					$elm$core$List$map,
					function (option) {
						return A4($author$project$Main$viewOption, $author$project$Main$isToSelected, $author$project$Main$isToSelectable, option, model);
					},
					$author$project$Main$copyPlaces))
			]));
};
var $author$project$Main$ToggleShowEditingSources = {$: 'ToggleShowEditingSources'};
var $author$project$Main$AddEditingSrc = {$: 'AddEditingSrc'};
var $author$project$Main$ChangeEditingSrc = {$: 'ChangeEditingSrc'};
var $author$project$Main$DeleteEditingSrc = {$: 'DeleteEditingSrc'};
var $author$project$Main$InputEditingIdxStr = function (a) {
	return {$: 'InputEditingIdxStr', a: a};
};
var $author$project$Main$InputEditingName = function (a) {
	return {$: 'InputEditingName', a: a};
};
var $author$project$Main$InputEditingSrc = function (a) {
	return {$: 'InputEditingSrc', a: a};
};
var $author$project$Main$InputEditingUrl = function (a) {
	return {$: 'InputEditingUrl', a: a};
};
var $author$project$Main$LookupEditingSrc = {$: 'LookupEditingSrc'};
var $author$project$Main$MoveEditingSrc = {$: 'MoveEditingSrc'};
var $author$project$Main$ToggleShowHelp = {$: 'ToggleShowHelp'};
var $author$project$Main$showHelpButton = function (model) {
	return A2(
		$author$project$Main$button,
		$author$project$Main$ToggleShowHelp,
		model.showHelp ? 'Hide help' : 'Show help');
};
var $elm$html$Html$em = _VirtualDom_node('em');
var $author$project$Main$em = function (string) {
	return A2(
		$elm$html$Html$em,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(string)
			]));
};
var $author$project$Main$viewHelp = A2(
	$elm$html$Html$span,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Text boxes above are: '),
					$author$project$Main$em('index'),
					$elm$html$Html$text(', '),
					$author$project$Main$em('display'),
					$elm$html$Html$text(', '),
					$author$project$Main$em('label'),
					$elm$html$Html$text(', '),
					$author$project$Main$em('url.'),
					$author$project$Main$br,
					$author$project$Main$em('display'),
					$elm$html$Html$text(' is a URL or a builtin image path.'),
					$author$project$Main$br,
					$author$project$Main$em('label'),
					$elm$html$Html$text(' allows you to override the file name default.'),
					$author$project$Main$br,
					$author$project$Main$em('url'),
					$elm$html$Html$text(' allows you to open a different page than the '),
					$author$project$Main$em('display'),
					$elm$html$Html$text(' image on click.'),
					$author$project$Main$br,
					$elm$html$Html$text('Modify '),
					$author$project$Main$em('index'),
					$elm$html$Html$text(', and click Move or Lookup button'),
					$author$project$Main$br,
					$elm$html$Html$text('Modify '),
					$author$project$Main$em('display'),
					$elm$html$Html$text(', '),
					$author$project$Main$em('label'),
					$elm$html$Html$text(', or '),
					$author$project$Main$em('url'),
					$elm$html$Html$text(', and click Change button.'),
					$author$project$Main$br,
					$elm$html$Html$text('Change all (or none) and click Add button.'),
					$author$project$Main$br,
					$elm$html$Html$text('Paste is Add plus copy clipboard to '),
					$author$project$Main$em('index'),
					$elm$html$Html$text('.'),
					$author$project$Main$br,
					$elm$html$Html$text('Add and Paste add to end if '),
					$author$project$Main$em('index'),
					$elm$html$Html$text(' is out of range or not an integer.')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('The Add button makes a new record after the index.'),
					$author$project$Main$br,
					$elm$html$Html$text('If the index is non-numeric, negative, '),
					$elm$html$Html$text('or too large, adds to the end.'),
					$author$project$Main$br,
					$elm$html$Html$text('The Change button updates the record with your changes.'),
					$author$project$Main$br,
					$elm$html$Html$text('The Move button moves the current record to the changed index.'),
					$author$project$Main$br,
					$elm$html$Html$text('The Lookup button refreshes the editing fields from the index.'),
					$author$project$Main$br,
					$elm$html$Html$text('The Delete button deletes the record.')
				]))
		]));
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $author$project$Main$viewEditingSourcesInternal = function (model) {
	return A2(
		$elm$html$Html$span,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$author$project$Main$focusTrackingInput,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput($author$project$Main$InputEditingIdxStr),
								$elm$html$Html$Attributes$width(2),
								$elm$html$Html$Attributes$value(model.editingIdxStr),
								A2($elm$html$Html$Attributes$style, 'max-width', '3em')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(model.editingIdxStr)
							])),
						$elm$html$Html$text(' : '),
						A2(
						$author$project$Main$focusTrackingInput,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput($author$project$Main$InputEditingSrc),
								$elm$html$Html$Attributes$width(30),
								$elm$html$Html$Attributes$value(model.editingSrc),
								A2($elm$html$Html$Attributes$style, 'min-height', '1em'),
								A2($elm$html$Html$Attributes$style, 'min-width', '20em')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(model.editingSrc)
							])),
						$elm$html$Html$text(' '),
						A2(
						$author$project$Main$focusTrackingInput,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput($author$project$Main$InputEditingName),
								$elm$html$Html$Attributes$width(20),
								$elm$html$Html$Attributes$value(model.editingLabel)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(model.editingLabel)
							])),
						$elm$html$Html$text(' '),
						A2(
						$author$project$Main$focusTrackingInput,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput($author$project$Main$InputEditingUrl),
								$elm$html$Html$Attributes$width(20),
								$elm$html$Html$Attributes$value(model.editingUrl)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(model.editingUrl)
							])),
						function () {
						var source = A2(
							$elm$core$Maybe$withDefault,
							$author$project$Main$srcSource(''),
							A2($elm_community$list_extra$List$Extra$getAt, model.editingIdx, model.sources));
						var isCurrent = $author$project$Main$isEditingCurrent(model);
						var editingUrl = $author$project$Main$nothingIfBlank(model.editingUrl);
						var editingLabel = _Utils_eq(
							model.editingLabel,
							$author$project$Main$getLabelFromFileName(source.src)) ? $elm$core$Maybe$Nothing : ((model.editingLabel === '') ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(model.editingLabel));
						var editingIdx = A2(
							$elm$core$Maybe$withDefault,
							-1,
							$elm$core$String$toInt(model.editingIdxStr));
						var editingIdxChanged = (!_Utils_eq(editingIdx, model.editingIdx)) && (!_Utils_eq(editingIdx, -1));
						return A2(
							$elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									A2($author$project$Main$button, $author$project$Main$AddEditingSrc, 'Add'),
									$elm$html$Html$text(' '),
									A3($author$project$Main$enabledButton, !isCurrent, $author$project$Main$ChangeEditingSrc, 'Change'),
									$elm$html$Html$text(' '),
									A3(
									$author$project$Main$enabledButton,
									!_Utils_eq(editingIdx, model.editingIdx),
									$author$project$Main$MoveEditingSrc,
									'Move'),
									$elm$html$Html$text(' '),
									A3(
									$author$project$Main$enabledButton,
									(!_Utils_eq(editingIdx, -1)) && (!isCurrent),
									$author$project$Main$LookupEditingSrc,
									'Lookup'),
									$elm$html$Html$text(' '),
									A3(
									$author$project$Main$enabledButton,
									!(editingIdxChanged || _Utils_eq(editingIdx, -1)),
									$author$project$Main$DeleteEditingSrc,
									'Delete')
								]));
					}(),
						$author$project$Main$showHelpButton(model),
						(!model.showHelp) ? $elm$html$Html$text('') : A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								$author$project$Main$viewHelp,
								$author$project$Main$showHelpButton(model)
							]))
					]))
			]));
};
var $author$project$Main$DeleteAll = {$: 'DeleteAll'};
var $author$project$Main$viewSaveDeleteButtons = function (model) {
	return A2(
		$elm$html$Html$p,
		_List_Nil,
		_List_fromArray(
			[
				A2($author$project$Main$button, $author$project$Main$DeleteAll, 'Delete all'),
				$elm$html$Html$text(' '),
				A3(
				$author$project$Main$enabledButton,
				!_Utils_eq(model.undoModel, $elm$core$Maybe$Nothing),
				$author$project$Main$Undo,
				'Undo')
			]));
};
var $author$project$Main$viewEditingSources = function (model) {
	return A2(
		$elm$html$Html$span,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$author$project$Main$button,
				$author$project$Main$ToggleShowEditingSources,
				model.showEditingSources ? 'Hide editor' : 'Show editor'),
				$author$project$Main$br,
				(!model.showEditingSources) ? $elm$html$Html$text('') : A2(
				$elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Main$viewSaveDeleteButtons(model),
						$author$project$Main$viewEditingSourcesInternal(model)
					]))
			]));
};
var $author$project$Main$InputSearchString = function (a) {
	return {$: 'InputSearchString', a: a};
};
var $author$project$Main$ScrollSearch = F2(
	function (a, b) {
		return {$: 'ScrollSearch', a: a, b: b};
	});
var $author$project$Main$SearchMore = F2(
	function (a, b) {
		return {$: 'SearchMore', a: a, b: b};
	});
var $author$project$Main$SetSrcIdx = function (a) {
	return {$: 'SetSrcIdx', a: a};
};
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$Attributes$colspan = function (n) {
	return A2(
		_VirtualDom_attribute,
		'colspan',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $author$project$Main$h3 = function (title) {
	return A2(
		$elm$html$Html$h3,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(title)
			]));
};
var $elm$core$String$toLower = _String_toLower;
var $author$project$Main$caselessContains = F2(
	function (search, string) {
		return A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(search),
			$elm$core$String$toLower(string));
	});
var $author$project$Main$matchesSearchString = F2(
	function (string, _v0) {
		var src = _v0.src;
		var label = _v0.label;
		var url = _v0.url;
		var url2 = function () {
			if (url.$ === 'Nothing') {
				return '';
			} else {
				var u = url.a;
				return u;
			}
		}();
		var lab = function () {
			if (label.$ === 'Nothing') {
				return $author$project$Main$getLabelFromFileName(src);
			} else {
				var l = label.a;
				return l;
			}
		}();
		return A2($author$project$Main$caselessContains, string, src) || (A2($author$project$Main$caselessContains, string, lab) || A2($author$project$Main$caselessContains, string, url2));
	});
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$td = _VirtualDom_node('td');
var $author$project$Main$td = function (s) {
	return A2(
		$elm$html$Html$td,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(s)
			]));
};
var $elm$html$Html$th = _VirtualDom_node('th');
var $author$project$Main$th = function (s) {
	return A2(
		$elm$html$Html$th,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(s)
			]));
};
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$Main$EndSwipe = function (a) {
	return {$: 'EndSwipe', a: a};
};
var $author$project$Main$MouseDown = {$: 'MouseDown'};
var $author$project$Main$Swipe = function (a) {
	return {$: 'Swipe', a: a};
};
var $author$project$Main$centerFit = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'max-width', '100%'),
		A2($elm$html$Html$Attributes$style, 'max-height', '100vh')
	]);
var $elm$html$Html$embed = _VirtualDom_node('embed');
var $author$project$Main$noPointerEvents = A2($elm$html$Html$Attributes$style, 'pointer-events', 'none');
var $author$project$Main$embedDiv = F2(
	function (attributes, elements) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick($author$project$Main$MouseDown)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$embed,
					A2($elm$core$List$cons, $author$project$Main$noPointerEvents, attributes),
					elements)
				]));
	});
var $elm$html$Html$img = _VirtualDom_node('img');
var $author$project$Swipe$End = {$: 'End'};
var $author$project$Swipe$Touch = F2(
	function (a, b) {
		return {$: 'Touch', a: a, b: b};
	});
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $author$project$Swipe$Position = F2(
	function (x, y) {
		return {x: x, y: y};
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $author$project$Swipe$decodeTouchWithOptions = F3(
	function (fieldName, options, tagger) {
		return A2(
			$elm$json$Json$Decode$map,
			function (p) {
				return {
					message: tagger(p),
					preventDefault: options.preventDefault,
					stopPropagation: options.stopPropagation
				};
			},
			A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					[fieldName, '0']),
				A3(
					$elm$json$Json$Decode$map2,
					F2(
						function (x, y) {
							return A2($author$project$Swipe$Position, x, y);
						}),
					A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
					A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float))));
	});
var $author$project$Swipe$onEndWithOptions = F2(
	function (options, tagger) {
		return A2(
			$elm$html$Html$Events$custom,
			'touchend',
			A3(
				$author$project$Swipe$decodeTouchWithOptions,
				'changedTouches',
				options,
				A2(
					$elm$core$Basics$composeR,
					$author$project$Swipe$Touch($author$project$Swipe$End),
					tagger)));
	});
var $author$project$Swipe$onEnd = $author$project$Swipe$onEndWithOptions(
	{preventDefault: true, stopPropagation: false});
var $author$project$Swipe$Move = {$: 'Move'};
var $author$project$Swipe$decodeTouch = F2(
	function (fieldName, tagger) {
		return A2(
			$elm$json$Json$Decode$map,
			tagger,
			A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					[fieldName, '0']),
				A3(
					$elm$json$Json$Decode$map2,
					$author$project$Swipe$Position,
					A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
					A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float))));
	});
var $author$project$Swipe$onMove = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'touchmove',
		A2(
			$author$project$Swipe$decodeTouch,
			'changedTouches',
			A2(
				$elm$core$Basics$composeR,
				$author$project$Swipe$Touch($author$project$Swipe$Move),
				tagger)));
};
var $author$project$Swipe$Start = {$: 'Start'};
var $author$project$Swipe$onStart = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'touchstart',
		A2(
			$author$project$Swipe$decodeTouch,
			'touches',
			A2(
				$elm$core$Basics$composeR,
				$author$project$Swipe$Touch($author$project$Swipe$Start),
				tagger)));
};
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $author$project$Main$viewSrc = F4(
	function (forTable, url, maxHeight, maxWidth) {
		var isImage = $author$project$Main$isImageUrl(url);
		return A2(
			isImage ? $elm$html$Html$img : $author$project$Main$embedDiv,
			$elm$core$List$concat(
				_List_fromArray(
					[
						_List_fromArray(
						[
							$elm$html$Html$Attributes$src(url),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							$elm$html$Html$Events$onClick($author$project$Main$MouseDown),
							((!isImage) && (!forTable)) ? A2($elm$html$Html$Attributes$style, 'height', 'max-content') : A2($elm$html$Html$Attributes$style, '', ''),
							A2(
							$elm$html$Html$Attributes$style,
							'max-height',
							forTable ? maxHeight : '500px')
						]),
						forTable ? _List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'max-width', maxWidth)
						]) : ((isImage && (!forTable)) ? $author$project$Main$centerFit : _List_Nil),
						_List_fromArray(
						[
							$author$project$Swipe$onStart($author$project$Main$Swipe),
							$author$project$Swipe$onMove($author$project$Main$Swipe),
							$author$project$Swipe$onEnd($author$project$Main$EndSwipe)
						])
					])),
			_List_Nil);
	});
var $author$project$Main$viewSearch = F4(
	function (searchStart, searchCnt, searchString, sources) {
		return A2(
			$elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Main$h3('Search'),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$author$project$Main$b('Search for: '),
							A2(
							$author$project$Main$focusTrackingInput,
							_List_fromArray(
								[
									$elm$html$Html$Events$onInput($author$project$Main$InputSearchString),
									$elm$html$Html$Attributes$value(searchString),
									$elm$html$Html$Attributes$width(20),
									A2($elm$html$Html$Attributes$style, 'min-width', '20em')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(searchString)
								]))
						])),
					function () {
					var tableColumnCnt = 4;
					var setSrc = function (idx) {
						return $author$project$Main$SetSrcIdx(
							$elm$core$String$fromInt(idx));
					};
					var showSource = function (_v3) {
						var idx = _v3.a;
						var source = _v3.b;
						return _List_fromArray(
							[
								A2(
								$elm$html$Html$tr,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick(
										setSrc(idx))
									]),
								_List_fromArray(
									[
										$author$project$Main$td(
										$elm$core$String$fromInt(idx)),
										A2(
										$elm$html$Html$td,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'text-align', 'center')
											]),
										_List_fromArray(
											[
												A4(
												$author$project$Main$viewSrc,
												true,
												A2(
													$author$project$Main$computeImgSrc,
													$elm$core$Maybe$Just(source),
													idx).a,
												'3em',
												'4em')
											])),
										$author$project$Main$td(
										$author$project$Main$urlDisplay(source.src)),
										$author$project$Main$td(
										function () {
											var _v1 = source.label;
											if (_v1.$ === 'Nothing') {
												return $author$project$Main$getLabelFromFileName(source.src);
											} else {
												var lab = _v1.a;
												return lab;
											}
										}())
									])),
								function () {
								var _v2 = source.url;
								if (_v2.$ === 'Nothing') {
									return $elm$html$Html$text('');
								} else {
									var url = _v2.a;
									return A2(
										$elm$html$Html$tr,
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick(
												setSrc(idx))
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$td,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$colspan(2)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text($author$project$Main$special.nbsp)
													])),
												A2(
												$elm$html$Html$td,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$colspan(tableColumnCnt - 2)
													]),
												_List_fromArray(
													[
														$author$project$Main$b('url: '),
														$elm$html$Html$text(url)
													]))
											]));
								}
							}()
							]);
					};
					var matchedPairs = A2(
						$elm$core$List$filter,
						function (_v0) {
							var source = _v0.b;
							return A2($author$project$Main$matchesSearchString, searchString, source);
						},
						A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, sources));
					var panels = A2(
						$elm$core$List$take,
						searchCnt,
						A2($elm$core$List$drop, searchStart, matchedPairs));
					var matchCnt = $elm$core$List$length(matchedPairs);
					return A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$table,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('prettyTable')
									]),
								$elm$core$List$concat(
									_List_fromArray(
										[
											_List_fromArray(
											[
												A2(
												$elm$html$Html$tr,
												_List_Nil,
												_List_fromArray(
													[
														$author$project$Main$th('idx'),
														$author$project$Main$th('image'),
														$author$project$Main$th('src'),
														$author$project$Main$th('label')
													]))
											]),
											$elm$core$List$concat(
											A2($elm$core$List$map, showSource, panels)),
											_List_fromArray(
											[
												A2(
												$elm$html$Html$tr,
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$style, 'align', 'left')
													]),
												_List_fromArray(
													[
														function () {
														var cntDelta = (!searchStart) ? 0 : 1;
														return A2(
															$elm$html$Html$td,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$colspan(tableColumnCnt)
																]),
															_List_fromArray(
																[
																	A3(
																	$author$project$Main$enabledButton,
																	_Utils_cmp(searchStart, matchCnt - searchCnt) < 0,
																	A2($author$project$Main$ScrollSearch, true, matchCnt),
																	'v'),
																	A3(
																	$author$project$Main$enabledButton,
																	searchStart > 0,
																	A2($author$project$Main$ScrollSearch, false, matchCnt),
																	'^'),
																	A3(
																	$author$project$Main$enabledButton,
																	_Utils_cmp(searchCnt, matchCnt) < 0,
																	A2($author$project$Main$SearchMore, true, matchCnt),
																	'More'),
																	$elm$html$Html$text(' '),
																	A3(
																	$author$project$Main$enabledButton,
																	searchCnt > 10,
																	A2($author$project$Main$SearchMore, false, matchCnt),
																	'Less'),
																	$elm$html$Html$text(' (showing '),
																	(searchStart > 0) ? A2(
																	$elm$html$Html$span,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			$elm$core$String$fromInt(searchStart)),
																			$elm$html$Html$text('-')
																		])) : $elm$html$Html$text(''),
																	$elm$html$Html$text(
																	$elm$core$String$fromInt(
																		A2($elm$core$Basics$min, (searchStart + searchCnt) - cntDelta, matchCnt))),
																	$elm$html$Html$text(' of '),
																	$elm$html$Html$text(
																	$elm$core$String$fromInt(matchCnt)),
																	$elm$html$Html$text(' matches)')
																]));
													}()
													]))
											])
										])))
							]));
				}()
				]));
	});
var $author$project$Main$AddSourcePanel = function (a) {
	return {$: 'AddSourcePanel', a: a};
};
var $author$project$Main$DeleteSourcePanel = {$: 'DeleteSourcePanel'};
var $author$project$Main$InputEditingPanelName = function (a) {
	return {$: 'InputEditingPanelName', a: a};
};
var $author$project$Main$MoveSourcePanelUp = function (a) {
	return {$: 'MoveSourcePanelUp', a: a};
};
var $author$project$Main$SaveRestoreSourcePanel = function (a) {
	return {$: 'SaveRestoreSourcePanel', a: a};
};
var $author$project$Main$SelectSourcePanel = function (a) {
	return {$: 'SelectSourcePanel', a: a};
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $author$project$Main$viewSourcePanel = F3(
	function (model, idx, panel) {
		var sources = panel.panels;
		var isEditing = _Utils_eq(idx, model.sourcePanelIdx);
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					function () {
					if (!isEditing) {
						return A2(
							$elm$html$Html$th,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick(
									$author$project$Main$SelectSourcePanel(idx))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(panel.name)
								]));
					} else {
						var isLast = _Utils_eq(
							model.sourcePanelIdx,
							$elm$core$List$length(model.sourcePanels) - 1);
						var isFirst = !model.sourcePanelIdx;
						return A2(
							$elm$html$Html$th,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'text-align', 'left')
								]),
							_List_fromArray(
								[
									A2(
									$author$project$Main$focusTrackingInput,
									_List_fromArray(
										[
											$elm$html$Html$Events$onInput($author$project$Main$InputEditingPanelName),
											$elm$html$Html$Attributes$value(panel.name),
											A2($elm$html$Html$Attributes$style, 'width', '100%'),
											A2($elm$html$Html$Attributes$style, 'min-height', '1em'),
											A2($elm$html$Html$Attributes$style, 'min-width', '10em'),
											$elm$html$Html$Attributes$id($author$project$Main$ids.sourcePanelName)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(panel.name)
										])),
									$author$project$Main$br,
									A3(
									$author$project$Main$enabledButton,
									!isFirst,
									$author$project$Main$MoveSourcePanelUp(true),
									'^'),
									$elm$html$Html$text(' '),
									A2(
									$author$project$Main$button,
									$author$project$Main$SaveRestoreSourcePanel(true),
									'Install'),
									$elm$html$Html$text(' '),
									A2(
									$author$project$Main$button,
									$author$project$Main$SaveRestoreSourcePanel(false),
									'Set'),
									$author$project$Main$br,
									A3(
									$author$project$Main$enabledButton,
									!isLast,
									$author$project$Main$MoveSourcePanelUp(false),
									'v'),
									$elm$html$Html$text(' '),
									A2(
									$author$project$Main$button,
									$author$project$Main$AddSourcePanel(false),
									'Add'),
									$elm$html$Html$text(' '),
									A2($author$project$Main$button, $author$project$Main$DeleteSourcePanel, 'Delete')
								]));
					}
				}(),
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick(
							$author$project$Main$SelectSourcePanel(idx))
						]),
					function () {
						var sourcesCnt = $elm$core$List$length(sources);
						var nameCnt = 2;
						var names = A2(
							$elm$core$List$intersperse,
							', ',
							A2(
								$elm$core$List$map,
								function ($) {
									return $.src;
								},
								A2($elm$core$List$take, nameCnt, sources)));
						return $elm$core$List$concat(
							_List_fromArray(
								[
									_List_fromArray(
									[
										$elm$html$Html$text('('),
										$elm$html$Html$text(
										$elm$core$String$fromInt(sourcesCnt)),
										$elm$html$Html$text(') ')
									]),
									A2($elm$core$List$map, $elm$html$Html$text, names),
									_List_fromArray(
									[
										(_Utils_cmp(nameCnt, sourcesCnt) < 0) ? $elm$html$Html$text(', ...') : $elm$html$Html$text('')
									])
								]));
					}())
				]));
	});
var $author$project$Main$viewSourcePanels = function (model) {
	return A2(
		$elm$html$Html$span,
		_List_Nil,
		_List_fromArray(
			[
				$author$project$Main$h3('Film Rolls'),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Main$button,
								$author$project$Main$AddSourcePanel(true),
								'Add')
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$table,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('prettyTable')
									]),
								A2(
									$elm$core$List$indexedMap,
									F2(
										function (idx, panel) {
											return A3($author$project$Main$viewSourcePanel, model, idx, panel);
										}),
									model.sourcePanels))
							]))
					]))
			]));
};
var $author$project$Main$viewControls = function (model) {
	return A2(
		$author$project$Main$center,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Main$h2('Controls'),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								A3($author$project$Main$checkBox, $author$project$Main$ToggleMergeEditingSources, model.mergeEditingSources, 'Merge new app images with your list.')
							])),
						$author$project$Main$viewCopyButtons(model),
						$author$project$Main$viewEditingSources(model),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$Main$button,
								$author$project$Main$ToggleShowSearch,
								model.showSearch ? 'Show Film Rolls' : 'Show Search')
							])),
						model.showSearch ? A5($elm$html$Html$Lazy$lazy4, $author$project$Main$viewSearch, model.searchStart, model.searchCnt, model.searchString, model.sources) : $author$project$Main$viewSourcePanels(model),
						$author$project$Main$viewClipboardTest(model),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								model.reallyDeleteState ? A2($author$project$Main$button, $author$project$Main$DeleteState, 'Really Delete State') : A2($author$project$Main$button, $author$project$Main$DeleteState, 'Delete State (after confirmation)')
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$author$project$Main$showControlsButton(model)
							]))
					]))
			]));
};
var $author$project$Main$sourceLabel = function (s) {
	var _v0 = s.label;
	if (_v0.$ === 'Just') {
		var label = _v0.a;
		return label;
	} else {
		return $author$project$Main$getLabelFromFileName(s.src);
	}
};
var $author$project$Main$viewSourceLinks = F2(
	function (index, sources) {
		return A2(
			$elm$html$Html$p,
			_List_Nil,
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (idx, s) {
						var label = $author$project$Main$sourceLabel(s);
						var idxstr = $elm$core$String$fromInt(idx);
						var idxElements = _List_fromArray(
							[
								$elm$html$Html$text($author$project$Main$special.nbsp),
								$elm$html$Html$text(idxstr),
								$elm$html$Html$text($author$project$Main$special.nbsp)
							]);
						return _Utils_eq(idx, index) ? A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$title(label)
								]),
							_Utils_ap(
								idxElements,
								_List_fromArray(
									[
										$elm$html$Html$text(' ')
									]))) : A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('#'),
											$elm$html$Html$Events$onClick(
											$author$project$Main$SetSrcIdx(idxstr)),
											A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
											$elm$html$Html$Attributes$title(label)
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'text-decoration', 'underline')
												]),
											idxElements)
										])),
									$elm$html$Html$text(' ')
								]));
					}),
				sources));
	});
var $author$project$Main$viewInternal = function (model) {
	var name = $author$project$Main$modelLabel(model);
	var index = model.srcIdx;
	var maybeSource = A2($elm_community$list_extra$List$Extra$getAt, index, model.sources);
	var _v0 = A2($author$project$Main$computeImgSrc, maybeSource, model.srcIdx);
	var modelSrc = _v0.a;
	var url = _v0.b;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'margin', 'auto'),
				A2($elm$html$Html$Attributes$style, 'max-height', '60em'),
				A2($elm$html$Html$Attributes$style, 'overflow', 'auto')
			]),
		_List_fromArray(
			[
				function () {
				var _v1 = model.settings;
				if (_v1.$ === 'Nothing') {
					return $elm$html$Html$text('');
				} else {
					var settings = _v1.a;
					return settings.showTitle ? $author$project$Main$h2(settings.title) : $elm$html$Html$text('');
				}
			}(),
				A4($author$project$Main$viewSrc, false, modelSrc, '', ''),
				$author$project$Main$br,
				$elm$html$Html$text(
				$elm$core$String$fromInt(index)),
				$elm$html$Html$text(': '),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href(url),
						$elm$html$Html$Attributes$target('_blank')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						name + (' (' + ($author$project$Main$urlType(url) + ')')))
					])),
				A3($elm$html$Html$Lazy$lazy2, $author$project$Main$viewSourceLinks, index, model.sources),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						function () {
						var _v2 = model.err;
						if (_v2.$ === 'Nothing') {
							return $elm$html$Html$text('');
						} else {
							var err = _v2.a;
							return A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'color', 'red')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(err),
										$author$project$Main$br
									]));
						}
					}(),
						function () {
						var keys = model.isFocused ? 'arrows' : 's/f, j/l, arrows,';
						return $elm$html$Html$text('Click on the image to change. Or press ' + (keys + ' or digit links above.'));
					}(),
						$author$project$Main$br,
						A3($author$project$Main$checkBox, $author$project$Main$ToggleSwitchEnabled, model.switchEnabled, 'Auto-switch images'),
						$author$project$Main$b(', period: '),
						A2(
						$author$project$Main$focusTrackingInput,
						_List_fromArray(
							[
								$elm$html$Html$Events$onInput($author$project$Main$InputSwitchPeriod),
								$elm$html$Html$Attributes$value(model.switchPeriod),
								$elm$html$Html$Attributes$width(2),
								A2($elm$html$Html$Attributes$style, 'min-height', '1em'),
								A2($elm$html$Html$Attributes$style, 'width', '2em')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(model.switchPeriod)
							])),
						$author$project$Main$br,
						$elm$html$Html$text($author$project$Main$special.copyright),
						function () {
						var _v3 = model.settings;
						if (_v3.$ === 'Nothing') {
							return A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('2024-2025, '),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('https://billstclair.com/'),
												$elm$html$Html$Attributes$target('_blank')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Bill St. Clair')
											]))
									]));
						} else {
							var info = _v3.a;
							var _v4 = info.copyright;
							if (_v4.$ === 'Nothing') {
								return $elm$html$Html$text('');
							} else {
								var copyrightInfo = _v4.a;
								return A2(
									$elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(copyrightInfo.date),
											$elm$html$Html$text(', '),
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href(copyrightInfo.url),
													$elm$html$Html$Attributes$target('_blank')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(copyrightInfo.text)
												]))
										]));
							}
						}
					}(),
						function () {
						var _v5 = model.settings;
						if (_v5.$ === 'Nothing') {
							return A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$br,
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('https://github.com/billstclair/fotojson'),
												$elm$html$Html$Attributes$target('_blank')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('GitHub')
											]))
									]));
						} else {
							var settings = _v5.a;
							var _v6 = settings.githubUrl;
							if (_v6.$ === 'Nothing') {
								return $elm$html$Html$text('');
							} else {
								var githubUrl = _v6.a;
								return A2(
									$elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											$author$project$Main$br,
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href(githubUrl),
													$elm$html$Html$Attributes$target('_blank')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('GitHub')
												]))
										]));
							}
						}
					}(),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								A2($author$project$Main$button, $author$project$Main$ReloadFromServer, 'Reload code from server')
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$author$project$Main$showControlsButton(model)
							])),
						model.showControls ? A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								A2($elm$html$Html$hr, _List_Nil, _List_Nil),
								$author$project$Main$viewControls(model)
							])) : $elm$html$Html$text('')
					]))
			]));
};
var $author$project$Main$view = function (model) {
	return {
		body: _List_fromArray(
			[
				(!_Utils_eq(model.started, $author$project$Main$Started)) ? $elm$html$Html$text('') : $author$project$Main$viewInternal(model)
			]),
		title: model.title
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{
		init: function (flags) {
			return $author$project$Main$init;
		},
		onUrlChange: $author$project$Main$OnUrlChange,
		onUrlRequest: $author$project$Main$OnUrlRequest,
		subscriptions: $author$project$Main$subscriptions,
		update: $author$project$Main$update,
		view: $author$project$Main$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));