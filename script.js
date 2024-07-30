const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const CLIENT_ID = '1267914396990963815';  // Seu Client ID
const CLIENT_SECRET = 'xxS2v6LWvt__mG_cpfO9ZyqtWMzKvb84';  // Seu Client Secret
const REDIRECT_URI = 'https://iamkyo22.github.io/Iamhyo.github.io/';

app.post('/exchange-token', async (req, res) => {
    const code = req.body.code;
    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': REDIRECT_URI,
            'scope': 'email dm_channels.read'
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        res.json({ token: response.data.access_token });
    } catch (error) {
        console.error('Erro ao trocar código por token:', error);
        res.status(500).send('Erro ao processar a solicitação.');
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
