# Simple Web Proxy

A minimal HTML frontend with a Node.js backend proxy.

## Run

1. Open a terminal in `c:\Users\tcsridgewood\web-proxy`
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000`

## How it works

- `public/index.html` is the frontend UI.
- `server.js` exposes `/proxy?url=...` and forwards the remote response.
- The proxy returns remote content through the backend server.
