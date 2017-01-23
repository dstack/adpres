let Metalsmith  = require('metalsmith');
let collections = require('metalsmith-collections');
let layouts     = require('metalsmith-layouts');
let markdown    = require('metalsmith-markdown');
let tags        = require('metalsmith-tags');
let ignore      = require('metalsmith-ignore');
let stylus      = require('metalsmith-stylus');
let nib         = require('nib');

let helpers     = require('./src/_helpers')

let args = process.argv.slice(2);

const prodMetaData = {
  siteURL: "http://dstack.github.io/adpres"
}

let config = {
  siteURL: 'file://'+__dirname.replace(/\\/gi, '/') + '/public',
  siteName: "Awesome Dev Presentations",
  description: "A collection of presentations designed to make you a better developer.",
  generatorName: "Metalsmith",
  generatorURL: "http://metalsmith.io/",
  currentYear: new Date().getFullYear()
};

if(args.indexOf('--prod') > -1){
  config = Object.assign({}, config, prodMetaData);
}

Metalsmith(__dirname)
  .metadata(config)
  .source('./src')
  .destination('./public')
  //.clean(true)
  .use(collections({
    pres: '_presentations/*.md',
    sortBy: 'author',
    reverse: true
  }))
  .use(tags({
    path: 'tags/:tag.html',
    layout: 'tag-page.hbs',
  }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    directory: 'src/_layouts',
    default: 'base.hbs',
    partials: 'src/_partials',
    helpers: helpers
  }))
  .use(ignore([
    '_**/*',
    'css/*'
  ]))
  .build(function(err) {
    if (err) throw err;
  });

// css specific build, because layouts
Metalsmith(__dirname)
  .source('./src/css')
  .destination('./public/css')
  .use(stylus({
    compress: true,
    use: [nib()]
  }))
  .build(function(err) {
    if (err) throw err;
  });
