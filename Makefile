PATH := ${PATH}:${PWD}/node_modules/.bin

all: clean copy babel pug clean-views browserify sass external-css appcache

clean-public:
	rm -rf compiled public/{js,css,views,*.html}

clean-js:
	rm -rf compiled public/js

clean-css:
	rm -rf public/css/index*.css*

clean-css-external:
	rm -rf public/css/external*.css*

clean-server:
	rm -rf app

clean-views:
	rm -rf public/views

clean: clean-public clean-js clean-css clean-css-external clean-server clean-views

eslint:
	eslint src/app public/src/js

babel-app:
	babel src/app -d app

babel: babel-app

copy:
	mkdir -p public/fonts
	cp node_modules/font-awesome/fonts/* public/fonts

browserify:
	mkdir -p public/js
	browserify -p [minifyify --no-map] -r bootstrap -r angular -r angular-route -r jquery -r sweetalert -r swal-forms -r socket.io-client > public/js/external.min.js
	# Can't minifyify this
	browserify --no-bundle-external -d  -t babelify -t browserify-ng-html2js public/src/js/index.js > public/js/index.min.js

sass:
	node-sass --recursive --output-style compressed public/src/css/index.scss > public/css/index.min.css

external-css:
	mkdir -p public/css
	rework-npm public/src/css/external.css | cleancss -o public/css/external.min.css

pug:
	pug -O config/locals.json public/src -o public

appcache:
	cd public && node-appcache -d .

start:
	forever start -a -l forever.out -o pcomm.out -e pcomm.err -p logs app/server.js

stop:
	forever stop app/server.js

restart:
	forever restart app/server.js

watch-js:
	watchy -w **/*.js **/*.json -- make clean copy pug
