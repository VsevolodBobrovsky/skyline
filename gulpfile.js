'use strict';

var http = require('http'),
	gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	imageminJpegtran = require('imagemin-jpegtran'),
	nodemon = require('gulp-nodemon'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/*.js',
		style: 'src/style/*.scss',
		img: 'src/img/*.*',
		fonts: 'src/fonts/*.*'
	},
	watch: {
		html: 'src/*.html',
		js: 'src/js/*.js',
		style: 'src/style/*.scss',
		img: 'src/img/*.*',
		fonts: 'src/fonts/*.*'
	},
	clean: './build'
};

var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: true,
	host: 'localhost',
	port: 8080,
	logPrefix: "Bobrovsky"
};

gulp.task('html:build', function(){
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('js:build', function(){
	gulp.src(path.src.js)
		// .pipe(uglify())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('style:build', function(){
	gulp.src(path.src.style)
		.pipe(sass())
		// .pipe(prefixer())
		// .pipe(cssmin())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function(){
	gulp.src(path.src.img)
		/*.pipe(imagemin({
			progressive: true,
			use: [imageminJpegtran()],
			interlaced: true
		}))*/
		.pipe(gulp.dest(path.build.img));
});

gulp.task('fonts:build', function(){
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'image:build',
	'fonts:build'
]);

gulp.task('webserver', function(){
	browserSync(config);
});

gulp.task('watch', function(){
	watch([path.watch.html], function(event, cb) {
		gulp.start('html:build');
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build');
	});
	watch([path.watch.style], function(event, cb) {
		gulp.start('style:build');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('image:build');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');
	});
});

gulp.task('default', ['build', 'webserver', 'watch']);