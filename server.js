/**
 * Gifty server
 *
 * Copyright © 2014 by Moses Holmström
 *
 * Gifty software is available under the GNU AFFERO GENERAL PUBLIC LICENSE
 * Version 3 (see below). For information about licensing of included
 * parts and packages copyrighted by other authors please see the
 * copyright notices within individual packages or files.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * For more information about licensing visit:
 * http://www.fsf.org/licensing/licenses/agpl-3.0.html
 *
 */
var config = require('./config.json');
var express = require('express');
var sass = require('node-sass');
var path = require('path');
var app = express();

app.use(express.errorHandler());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.locals.pretty = true;

// routes
app.get('/', function(req, res){
	res.render('index', config.jadeConfig);
});

app.use(sass.middleware({
	src: __dirname + '/sass',
	dest: __dirname + '/public',
	outputStyle: 'expanded'
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.port);
console.log('Gifty server started at http://localhost:' + config.port);
