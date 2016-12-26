'use strict';

var gulp = require('gulp'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	imageminJpegtran = require('imagemin-jpegtran'),
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
		js: 'src/js/main.js',
		style: 'src/style/main.scss',
		img: 'src/img/**/*.*',
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

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
	gulp.src(path.src.style)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(cssmin())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
	gulp.src(path.src.img)
		.pipe(imagemin({
			progressive: true,
			use: [imageminJpegtran()],
			arithmetic: true,
			interlaced: true
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'image:build',
	'fonts:build'
]);

gulp.task('default', ['build']);