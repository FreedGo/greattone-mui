/**
 * Created by Freed on 2017/5/8.
 * E-mail:flyxz@126.com.
 * GitHub:FreedGo@github.com.
 */

var gulp      = require('gulp');
var uglify    = require('gulp-uglify');//获取 uglify 模块（用于压缩 JS）;
var cssnano   = require('gulp-cssnano');
var rename    = require('gulp-rename');//gulp-rename 用于重命名
var sourcemaps = require('gulp-sourcemaps');//用于检查js压缩报错
var less      = require('gulp-less');

/**
 * 压缩所有js和css
 *
 */
//todo 暂时没有找到批量命名方法
gulp.task('nanojs',function () {
	gulp.src('./js/*js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		// .pipe(rename({suffix: '.min'}))  // 上面如果是 ['js/*.js'],要把所有的文件都添加.min.js后缀
		.pipe(rename(function (path) {
			path.basename += ".min";//所有的文件都添加.min.js后缀
		}))
		.pipe(gulp.dest('./dist/'))
})

// 压缩 js 文件
// 在命令行使用 gulp js 启动此任务
gulp.task('js', function() {
	// 1. 找到文件
	gulp.src('./js/*.js')
	// 2. 压缩文件
		.pipe(uglify())
		.pipe(rename(function (path) {
			path.basename += ".min";//所有的文件都添加.min.js后缀
		}))
		// 3. 另存压缩后的文件
		.pipe(gulp.dest('./dist/js'))
});

// 压缩 css 文件
// 在命令行使用 gulp css 启动此任务
gulp.task('css', function () {
	// 1. 找到文件
	gulp.src('./css/*.css')
	// 2. 压缩文件
		.pipe(cssnano())
		.pipe(rename(function (path) {
			path.basename += ".min";//所有的文件都添加.min.js后缀
		}))
		// 3. 另存为压缩文件
		.pipe(gulp.dest('./dist/css'))
});


/**
 * 监听js修改，并上传服务器
 */
gulp.task('watchjs', function () {
	// 监听文件修改，当文件被修改则执行 js，css 任务
	gulp.watch('./js/*.js',function (e) {
		gulp.src(e.path)
			// 2. 压缩文件
			.pipe(uglify())
			// 3. 重命名文件
			.pipe(rename(function (path) {
				path.basename += ".min";//所有的文件都添加.min.js后缀
			}))
			// 4. 另存压缩后的文件
			.pipe(gulp.dest('./dist/js'))
			// 5.上传到服务器指定目录
			.pipe(scp({
					host: '139.196.144.56',
					username: 'root',
					password: '19940915kuN',
					dest: '/alidata/www/hao3.0/dist/js'
				})).on('error', function(err) {
					console.log(err);
				})

	})
});
/**
 * 监听js修改，并上传服务器
 */
gulp.task('less', function () {
	// 监听文件修改，当文件被修改则执行 js，css 任务
	gulp.watch('./src/less/*.less',function (e) {
		gulp.src(e.path)
			// 2. 压缩文件
			.pipe(less())
			// 4. 另存压缩后的文件
			.pipe(gulp.dest('./src/css/'))
	})
});
/**
 * 监听js/css修改，
 */
gulp.task('watchAll', function () {
	// 监听文件修改，当文件被修改则执行 js，css 任务
	gulp.watch('./js/*.js',function (e) {
		gulp.src(e.path)
		// 2. 压缩文件
			.pipe(uglify())
			// 3. 重命名文件
			.pipe(rename(function (path) {
				path.basename += ".min";//所有的文件都添加.min.js后缀
			}))
			// 4. 另存压缩后的文件
			.pipe(gulp.dest('./dist/js'));
			// 5.上传到服务器指定目录
		// 	.pipe(scp({
		// 		host: '139.196.144.56',
		// 		username: 'root',
		// 		password: 'HaoQinSheng2016..++',
		// 		dest: '/alidata/www/hao3.0/dist/js'
		// 	})).on('error', function(err) {
		// 	console.log(err);
		// })
	})
	gulp.watch('./css/*.css',function (e) {
		gulp.src(e.path)
		// 2. 压缩文件
			.pipe(minifyCSS())
			// 3. 重命名文件
			.pipe(rename(function (path) {
				path.basename += ".min";//所有的文件都添加.min.js后缀
			}))
			// 4. 另存压缩后的文件
			.pipe(gulp.dest('./dist/css'));
			// 5.上传到服务器指定目录1
		// 	.pipe(scp({
		// 		host: '139.196.144.56',
		// 		username: 'root',
		// 		password: '19940915kuN',
		// 		dest: '/alidata/www/hao3.0/dist/css'
		// 	})).on('error', function(err) {
		// 	console.log(err);
		// })

	})
});
gulp.task('watchcss', function () {
	// 监听文件修改，当文件被修改则执行 js，css 任务
	gulp.watch('./css/*.css',function (e) {
		gulp.src(e.path)
		// 2. 压缩文件
			.pipe(minifyCSS())
			.pipe(rename(function (path) {
				path.basename += ".min";//所有的文件都添加.min.js后缀
			}))
			// 3. 另存压缩后的文件
			.pipe(gulp.dest('./dist/css'))

	})
});
// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 js,css 任务和 watch 任务
gulp.task('default', ['js','css','watch']);
