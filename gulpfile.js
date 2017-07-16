var gulp = require('gulp');
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();


gulp.task('sass', function() {
	return gulp.src('client/stylesheets/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('client'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'client'
		}
	});
})

gulp.task('concatCSS', ['sass'], function() {
    return gulp.src([
    		'client/bower_components/bootstrap/dist/css/bootstrap.min.css',
    		'client/stylesheet.css'
		    ])
		.pipe(concat('app.css'))
        .pipe(gulp.dest('client/build'));
});

gulp.task('css', ['concatCSS'], function() {
    return gulp.src('client/build/app.css')
		.pipe(cleanCSS())
		.pipe(rename('app.min.css'))
        .pipe(gulp.dest('client/build'));
});


gulp.task('concatJS', function() {
    return gulp.src([
    		'client/bower_components/angular/angular.js',
    		'client/bower_components/angular-route/angular-route.js',
    		'client/bower_components/jquery/dist/jquery.min.js',
    		'client/bower_components/bootstrap/dist/js/bootstrap.min.js',
    		'client/app.js',
    		'client/app.config.js',
    		'client/services/*.js',
		    'client/views/**/*.js', 
		    'client/directives/**/*.js'
		    ])
			.pipe(concat('app.js'))
			.pipe(ngAnnotate())
        .pipe(gulp.dest('client/build'));
});

gulp.task('js', ['concatJS'], function() {
	return gulp.src('client/build/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('client/build'));
});

gulp.task('watch', ['browserSync', 'css'], function() {
	gulp.watch('client/**/*.scss', ['css']);
	gulp.watch('client/**/*.html', browserSync.reload);
	gulp.watch('client/**/*.js', ['js'] , browserSync.reload);
});

gulp.task('build', ['js', 'css']);
