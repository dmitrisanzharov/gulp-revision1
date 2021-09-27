const gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat'); 
var cssnano = require('gulp-cssnano');
var del = require('del');



gulp.task('consoleIt', done => {
    console.log('gulp is running');
    done();
});

gulp.task('html', done=> {
    gulp.src('./html/*.html')
    .pipe(gulp.dest(`dist/html/${new Date().getFullYear().toString() + new Date().getMonth().toString() + new Date().getDate().toString()}`));
    done();
});


gulp.task('js', async done=> {

    await del(['./dist/js/*.js']); 

    gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
    done(); 
});


gulp.task('sass', done => {
    gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
    done(); 
}); 


// delete files




// defautl and watch
gulp.task('watch', ()=> {
    gulp.watch('./js/*.js', gulp.series('js'));
    gulp.watch('./sass/*.scss', gulp.series('sass'));
});



gulp.task('default', gulp.series('consoleIt', 'html', 'js', 'sass'));



