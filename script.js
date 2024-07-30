const express = require('express');
const axios = require('axios');
const app = express();

const CLIENT_ID = '1267914396990963815';
const CLIENT_SECRET = 'xxS2v6LWvt__mG_cpfO9ZyqtWMzKvb84';
const REDIRECT_URI = 'https://iamkyo22.github.io/Iamhyo.github.io/';

app.use(express.static('public')); // Para servir arquivos estáticos como HTML e CSS

// Simulação de autenticação
app.get('/api/check-auth', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Não autenticado');
    }

    // Verifica o token com Discord
    axios.get('https://discord.com/api/v10/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        const user = response.data;
        res.json({
            username: user.username,
            email: user.email,
            avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        });
    })
    .catch(error => {
        console.error('Erro ao verificar token:', error);
        res.status(401).send('Não autenticado');
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
