/*
{
	"format": "umd",
	"options": {
		"base": "path-to-project-root/src",
		"dest": "path-to-project-root/output/css-output/umd.00.css"
	}
}
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	var classNames = {"foo":"_foo_css_foo","bar-baz":"_foo_css_bar-baz"};

	window.classNames = classNames;

})));
