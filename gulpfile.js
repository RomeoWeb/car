

let project_folder = "dist";
let source_folder = "#src";

let path = {
   build:  {
      html: project_folder + "/",
      css: project_folder + "/css",
      js: project_folder + "/js",
      fonts: project_folder + "/fonts",
      images: project_folder + "/images"

   },
   src: {
      html: [source_folder + "/*.html", "!"+source_folder + "/_*.html"],
      css: [source_folder + "/scss/**/*.*", "!"+source_folder + "/_*.css"],
      // css: source_folder + "/scss/*.*",
      js: source_folder + "/js/main.js",
      images: source_folder + "/images/**/*{jpg,png,svg,gif,ico,webp}",
      fonts: source_folder + "/fonts/**/*.*"
   },
   watch: {
      html: source_folder + "/**/*.html",
      css: source_folder + "/scss/**/*.scss",
      js: source_folder + "/js/**/*.js",
      fonts: source_folder +"/fonts/**/*.*",
      images: source_folder + "/images/**/*{jpg,png,svg,gif,ico,webp}"
     
   },
   clean: "./" + project_folder +"/"

}

let {src, dest} = require('gulp'),
   gulp = require('gulp'),
   browsersync = require("browser-sync").create(),
   scss = require('gulp-sass'),
   del = require('del'),
   group_media = require('gulp-group-css-media-queries'),
   autoprefixer = require('gulp-autoprefixer'),
   fileinclude = require("gulp-file-include"),
   rename = require("gulp-rename"),
   uglify = require("gulp-uglify-es").default,
   imagemin = require("gulp-imagemin"),
   webp = require("gulp-webp"), 
   webphtml = require("gulp-webp-html"),
   htmlbeautufy = require("gulp-html-beautify"),
   webpcss = require("gulp-webpcss"),
   clean_css = require("gulp-clean-css");
   

function BrowserSync() {
      browsersync.init({
         server: {
            baseDir: "./" + project_folder +"/"
         },
         port: 3000,
         notify: false
      })
   }

function html() {
   return src(path.src.html)
      .pipe(fileinclude())
      .pipe(webphtml())
      .pipe(htmlbeautufy())
      .pipe(dest(path.build.html))
      .pipe(browsersync.stream());
}

function images() {
   return src(path.src.images)
      .pipe(webp({
         quality: 70
      }))
      .pipe(dest(path.build.images))
      .pipe(src(path.src.images))
      .pipe(
         imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3
         })
      )
      .pipe(dest(path.build.images))
      .pipe(browsersync.stream());
}

function fonts() {
   return src(path.src.fonts)
   .pipe(dest(path.build.fonts))
   .pipe(browsersync.stream());
}

function js() {
   return src(path.src.js)
      .pipe(fileinclude())
      .pipe(dest(path.build.js))
      .pipe(uglify())
      .pipe (
         rename ({
            extname: ".min.js"
         })
      )
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream());
}
function css() {
   return src(path.src.css)
      .pipe(
         scss({
         outputStyle: "expanded"
      })
      )
     .pipe (
         group_media()
      )
      .pipe(autoprefixer({
         overrideBrowsersList: ["last 5 versions"],
         cascade: false
     }))
      .pipe(webpcss())
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())

      .pipe(clean_css())
      
      .pipe (
         rename ({
            extname: ".min.css"
         })
      )
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream());
}

function WatchFiles() {
   gulp.watch([path.watch.html], html);
   gulp.watch([path.watch.css], css);
   gulp.watch([path.watch.js], js);
   gulp.watch([path.watch.fonts], fonts);
   gulp.watch([path.watch.images], images);
}
 
function clean() {
   return del(path.clean);
}


   let build = gulp.series(clean, gulp.parallel(css, html, js, images, fonts) );
   let watch = gulp.parallel(build, WatchFiles, BrowserSync);

   exports.fonts= fonts;
   exports.images = images;
   exports.js = js;
   exports.css = css;
   exports.html = html;
   exports.build = build;
   exports.watch = watch;
   exports.default = watch;

// let project_folder = "dist";
// let source_folder = "#src";

// let path = {
//    build:  {
//       html: project_folder + "/",
//       css: project_folder + "/css",
//       js: project_folder + "/js",
//       fonts: project_folder + "/fonts",
//       images: project_folder + "/images"
//    },
//    src: {
//       html: [source_folder + "/*.html", "!"+source_folder + "/_*.html"],
//       //css: source_folder + "/scss/style.scss",
//       css: source_folder + "/scss/*.*",
//       js: source_folder + "/js/*.*",
//       images: source_folder + "/images/**/*{jpg,png,svg,gif,ico,webp}",
//       fonts: source_folder + "/fonts/*.*"
//    },
//    watch: {
//       html: source_folder + "/**/*.html",
//       css: source_folder + "/scss/**/*.scss",
//       js: source_folder + "/js/**/*.js",
//       images: source_folder + "/images/**/*{jpg,png,svg,gif,ico,webp}"
//      },
//    clean: "./" + project_folder +"/"
// }

// let {src, dest} = require('gulp'),
//    gulp = require('gulp'),
//    browsersync = require("browser-sync").create(),
//    scss = require('gulp-sass'),
//    del = require('del'),
//    group_media = require('gulp-group-css-media-queries'),
//    autoprefixer = require('gulp-autoprefixer'),
//    fileinclude = require("gulp-file-include"),
//    rename = require("gulp-rename"),
//    uglify = require("gulp-uglify-es").default,
//    imagemin = require("gulp-imagemin"),
//    webp = require("gulp-webp"), 
//    webphtml = require("gulp-webp-html"),
//    htmlbeautufy = require("gulp-html-beautify"),
//    webpcss = require("gulp-webpcss"),
//    clean_css = require("gulp-clean-css");
   
// function BrowserSync() {
//       browsersync.init({
//          server: {
//             baseDir: "./" + project_folder +"/"
//          },
//          port: 3000,
//          notify: false
//       })
//    }

// function html() {
//    return src(path.src.html)
//       .pipe(fileinclude())
//       .pipe(webphtml())
//       .pipe(htmlbeautufy())
//       .pipe(dest(path.build.html))
//       .pipe(browsersync.stream());
// }

// function images() {
//    return src(path.src.images)
//       .pipe(webp({
//          quality: 70
//       }))
//       .pipe(dest(path.build.images))
//       .pipe(src(path.src.images))
//       .pipe(
//          imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             interlaced: true,
//             optimizationLevel: 3
//          })
//       )
//       .pipe(dest(path.build.images))
//       .pipe(browsersync.stream());
// }

// function fonts() {
//    return src(path.src.fonts)
//    .pipe(dest(path.build.fonts))
//    .pipe(browsersync.stream());
// }

// function js() {
//    return src(path.src.js)
//       .pipe(fileinclude())
//       .pipe(dest(path.build.js))
//       .pipe(uglify())
//       .pipe (
//          rename ({
//             extname: ".min.js"
//          })
//       )
//       .pipe(dest(path.build.js))
//       .pipe(browsersync.stream());
// }
// function css() {
//    return src(path.src.css)
//       .pipe(
//          scss({
//          outputStyle: "expanded"})
//       )
//      .pipe (
//          group_media()
//       )
//       .pipe(autoprefixer({
//          overrideBrowsersList: ["last 5 versions"],
//          cascade: false
//      }))
//       .pipe(webpcss())
//       .pipe(dest(path.build.css))
//       .pipe(clean_css())
//       .pipe (
//          rename ({
//             extname: ".min.css"
//          })
//       )
//       .pipe(dest(path.build.css))
//       .pipe(browsersync.stream());
// }

// function WatchFiles() {
//    gulp.watch([path.watch.html], html);
//    gulp.watch([path.watch.css], css);
//    gulp.watch([path.watch.js], js);
//    gulp.watch([path.watch.images], images);
// }
 
// function clean() {
//    return del(path.clean);
// }
//    let build = gulp.series(clean, gulp.parallel(css, html, js, images,fonts));
//    let watch = gulp.parallel(build, BrowserSync, WatchFiles);
//    exports.fonts= fonts;
//    exports.images = images;
//    exports.js = js;
//    exports.css = css;
//    exports.html = html;
//    exports.build = build;
//    exports.watch = watch;
//    exports.default = watch;