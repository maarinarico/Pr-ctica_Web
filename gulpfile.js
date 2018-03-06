var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require("gulp-html-import");
// Para optimizar las imágenes
var imagemin = require("gulp-imagemin")


gulp.task("default", ["html", "sass"], function(){
    browserSync.init({ server: "dist/" });
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]);
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]); 
});

gulp.task("sass", function(){
    gulp.src("src/scss/style.scss")
        .pipe(sass().on("error", function(error){ 
            // return notify().write(error); 
        }))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
        // .pipe(notify("SASS Compilado OK”))
});

gulp.task("html", function(){
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/"))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
        // .pipe(notify("HTML importado"));
});

gulp.task("img", function(){
    gulp.src("src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
})
