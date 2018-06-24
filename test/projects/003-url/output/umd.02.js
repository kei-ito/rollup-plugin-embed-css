/*
{
	"format": "umd",
	"options": {
		"mangle": true,
		"dest": "path-to-project-root/output/css-output/umd.02.css"
	}
}
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	var classNames = {"foo":"_1"};

	window.classNames = classNames;

})));
