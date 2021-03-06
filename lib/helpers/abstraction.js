"use strict";

// node_modules/nodeparse/lib/data/data.json

let fs = require("fs");
let utils = require("../utils");

/*
 * Remove the HTTP request for /favicon.ico
 *
 * @param {String} url The url of the HTTP request.
 * @param {String} target the target url we want to eliminate.
 * */
function removeUrl(url, target) {
	/* On checking type String. */
	if (!utils.isString(url) || !utils.isString(target)) {
		throw "Error: url and target is type String.";
	}

	/* On checking if not "favicon.ico" */
	if (url.split("/")[1] !== "favicon.ico") {
		/* On writing content to the file */
		writeFile("../lib/data/data.json", url);

		return url;
	}
	/* favicon.ico */
	return readFile("../lib/data/data.json");
}

/*
 * Writing url to the file.
 *
 * @param{String} path the path of the file we're gonna write.
 * @param{String} content the content we will write.
 * */
function writeFile(path, content) {
	fs.writeFileSync(path, JSON.stringify(content), "utf8", (error) => {
		if (error) {
			throw error;
		}
	});
}

/* Reading latest line.
	*
	* @param{String} path the path of the file we're gonna read.
	*
	* */
function readFile(path) {
	let data = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));

	writeFile("../lib/data/data.json", "");
	
	return data;
}

/* Export modules. */
module.exports = {
	removeUrl: removeUrl	
};
