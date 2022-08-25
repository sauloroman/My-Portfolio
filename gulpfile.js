// #################################
// IMPORT DEPENDENCIES
// #################################

// GULP
const { src, dest, series, watch } = require('gulp');

// CSS DEPENDENCIES
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// IMAGE DEPENDENCIES
const images = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// #################################
// GULP TASKS
// #################################

const compile = function( done ) {

  src('./src/sass/main.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass({ outputStyle: 'expanded'}) )
    .pipe( postcss([ autoprefixer(), cssnano() ]))
    .pipe( sourcemaps.write('.'))
    .pipe( dest('./build/css') )

  done();
}

const attention = () => watch('./src/sass/**/*.scss', compile );

const imagemin = function() {
  return src('./src/Img/**/*')
    .pipe( images({ optimizationLevel: 3}) )
    .pipe( dest('./build/img') );
}

const imagesWebp = function() {
  return src('./src/Img/**/*.{png,jpg,jpeg}')
    .pipe( webp({ quality: 50 }) )
    .pipe( dest('./build/img') );
}

const imagesAvif = function() {
  return src('./src/Img/**/*.{png,jpg,jpeg}')
    .pipe( avif({ quality: 50 }) )
    .pipe( dest('./build/img') );
}

// #################################
// EXPORT TASKS
// #################################

exports.compile = compile;
exports.attention = attention;
exports.imagemin = imagemin;
exports.imagesWebp = imagesWebp;
exports.imagesAvif = imagesAvif;
exports.default = series(  imagemin, imagesWebp, imagesAvif, compile, attention );