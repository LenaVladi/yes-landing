"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var htmlmin = require('gulp-htmlmin');
var pump = require("pump");
var run = require("run-sequence");

gulp.task("style", function() {
  gulp.src("source/sass/index.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("docs/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("docs"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("docs"));
});

gulp.task("images", function () {
  return gulp.src("source/image/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/image"));
});

gulp.task("webp", function () {
  return gulp.src("source/image/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/image"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/image/**",
    "source/js/**"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("docs"));
});

var del = require("del");
gulp.task("clean", function () {
  return del("docs");
});

gulp.task("compress", function (cb) {
  pump([
    gulp.src("source/scripts/*.js"),
    uglify()
  ],
    cb
  )
    .pipe(rename(function (path) {
      path.basename += ".min"
    }))
    .pipe(gulp.dest("docs/scripts"))
    .pipe(gulp.dest("source/scripts"));
});

gulp.task("build", function (done) {
  run("clean", "style", "images", "webp", "html", "compress", "copy", done);
});