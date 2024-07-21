const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do body-parser para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbcf'
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão estabelecida com o banco de dados MySQL');
});

// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para salvar dados do formulário
app.post('/salvar_agenda', (req, res) => {
    const {eventName, eventDate, eventTime, eventDescription} = req.body;

    // Query SQL para inserir dados
    const sql = 'INSERT INTO dbcf.events (eventName, eventDate, eventTime, eventDescription) VALUES (?, ?, ?, ?)';
    const values = [eventName, eventDate, eventTime, eventDescription];

    // Executar query
    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Erro ao salvar os dados:', error);
            res.status(500).json({ success: false, message: 'Erro ao salvar os dados' });
        } else {
            console.log('Dados salvos com sucesso');
            res.json({ success: true, message: 'Dados salvos com sucesso' });
        }
    });
});

// Configuração para servir arquivos estáticos (CSS, JavaScript, etc.) do diretório 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
