const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/proxy', async (req, res) => {
    const { ip, port, apiType } = req.query;

    let apiUrl;
    if (apiType === 'edTunnel') {
        apiUrl = `https://proxyip.edtunnel.best/api?ip=${ip}&host=speed.cloudflare.com&port=${port}&tls=true`;
    } else if (apiType === 'deta') {
        apiUrl = `https://cfport-1-n2942152.deta.app/check?ip=${ip}&host=speed.cloudflare.com&port=${port}&tls=true`;
    } else if (apiType === 'boilingFrame') {
        apiUrl = `https://p01--boiling-frame--kw6dd7bjv2nr.code.run/check?ip=${ip}&host=speed.cloudflare.com&port=${port}&tls=true`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from the API' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
