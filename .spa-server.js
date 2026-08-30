const http = require('http'), fs = require('fs'), path = require('path');
const root = '/mnt/agents/output/app/dist';
const mime = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.svg':'image/svg+xml' };
http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  const m = urlPath.match(/\/(assets\/.*)$/);
  if (m) urlPath = '/' + m[1];
  let p = path.join(root, urlPath);
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(root, 'index.html');
  res.setHeader('Content-Type', mime[path.extname(p)] || 'application/octet-stream');
  fs.createReadStream(p).pipe(res);
}).listen(8932, () => console.log('SPA server on 8932'));
