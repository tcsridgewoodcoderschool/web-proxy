const express = require('express');
const { URL } = require('url');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing url parameter. Use /proxy?url=https://example.com');
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
  } catch (err) {
    return res.status(400).send('Invalid url parameter');
  }

  try {
    const response = await fetch(parsedUrl.href, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Node.js Simple Web Proxy'
      }
    });

    res.status(response.status);
    response.headers.forEach((value, key) => {
      if (key === 'content-encoding') return;
      if (key === 'set-cookie') return;
      if (key === 'content-security-policy') return;
      if (key === 'content-security-policy-report-only') return;
      res.setHeader(key, value);
    });

    const body = response.body;
    if (!body) {
      return res.end();
    }

    body.pipe(res);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(502).send('Unable to fetch the requested URL.');
  }
});

app.listen(PORT, () => {
  console.log(`Web proxy running at http://localhost:${PORT}`);
  console.log('Open http://localhost:' + PORT + ' in your browser and enter a URL to proxy.');
});
