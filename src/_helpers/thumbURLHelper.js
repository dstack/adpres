module.exports = function(prefix, url){
  return url.indexOf('http') == 0? url : prefix + url;
}
