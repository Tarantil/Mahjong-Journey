var gulp = require('gulp'), 
	sass = require('gulp-sass')(require('sass')), 
	browserSync = require('browser-sync'),
	concat      = require('gulp-concat'), 
	cssnano     = require('gulp-cssnano'), 
	rename      = require('gulp-rename'),
	uglify      = require('gulp-uglify'),
	del         = require('del'), 
	imagemin    = require('gulp-image'), 
	pngquant    = require('imagemin-pngquant'), 
	cache       = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){ 
	return gulp.src('app/sass/**/*.sass') 
		.pipe(sass()) 
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('app/css')) 
		.pipe(browserSync.reload({stream: true})) 
});

gulp.task('browser-sync', function() { 
	browserSync({ 
		proxy: "mahjong-journey.loc",
		notify: false
	});
});

gulp.task('css-libs', function() {
	return gulp.src('app/sass/**/*.sass') 
		.pipe(sass()) 
		.pipe(cssnano()) 
		.pipe(rename({suffix: '.min'})) 
		.pipe(gulp.dest('app/css')); 
});

gulp.task('scripts', function() {
	return gulp.src(['app/js/**/*.js', 'app/libs/**/*.js'])
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts-build', function() {
	return gulp.src(['app/js/**/*.js', 'app/libs/**/*.js'])
		.pipe(uglify())
		.pipe(rename({suffix: '.min'})) 
		.pipe(gulp.dest('dist/js')); 
});

gulp.task('code', function() {
	return gulp.src('app/*.php')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('clean', async function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') 
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); 
});

gulp.task('prebuild', async function() {
 
	var buildCss = gulp.src([ 
		'app/css/main.min.css'
		])
	.pipe(gulp.dest('dist/css'))

 	var buildVideos = gulp.src('app/video/**/*')
	.pipe(gulp.dest('dist/video'))

	var buildFonts = gulp.src('app/fonts/**/*') 
	.pipe(gulp.dest('dist/fonts'))
 
	var buildHtml = gulp.src('app/*.php') 
	.pipe(gulp.dest('dist'));
 
});

gulp.task('clear', function () {
	return cache.clearAll();
})

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('app/sass/**/*.sass', gulp.parallel('css-libs'));
	gulp.watch('app/*.php', gulp.parallel('code')); 
	gulp.watch('app/js/**/*.js', gulp.parallel('scripts')); 
});

gulp.task('default', gulp.parallel('css-libs','sass', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild','clean', 'img', 'sass', 'scripts-build'));