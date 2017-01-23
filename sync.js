let bs = require('browser-sync').create();

bs.init({
  server: './',
  startPath: '/public/',
  injectChanges: false
});

//bs.watch("**/**").on("change", bs.reload);
