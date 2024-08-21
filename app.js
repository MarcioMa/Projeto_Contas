const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do body-parser para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Configuração do pool de conexão com o banco de dados MySQL
const pool = mysql.createPool({
  connectionLimit: 10, // número máximo de conexões simultâneas
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbcf'
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
    
    // Pegar uma conexão do pool
    pool.getConnection((err, connection) => {
      if (err) {
          console.error('Erro ao obter conexão do pool:', err);
          res.status(500).json({ success: false, message: 'Erro ao salvar os dados' });
          return;
      }

    // Executar query
        connection.query(sql, values, (error, results, fields) => {
            // Liberar a conexão de volta ao pool
            connection.release();

            if (error) {
                console.error('Erro ao salvar os dados:', error);
                res.status(500).json({ success: false, message: 'Erro ao salvar os dados' });
            } else {
                console.log('Dados salvos com sucesso');
                res.json({ success: true, message: 'Dados salvos com sucesso' });
            }
        });
    });
});

// Aqui você deve buscar os dados da agenda no seu banco de dados (MySQL)
app.get('/lista', (req, res) => {
  // Pegar uma conexão do pool
  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Erro ao obter conexão do pool:', err);
          res.status(500).json({ error: 'Erro ao buscar eventos' });
          return;
      }

      // Executar query
      connection.query('SELECT * FROM events', (error, results, fields) => {
        // Liberar a conexão de volta ao pool
        connection.release();

        if (error) {
            console.error('Erro ao buscar eventos:', error);
            res.status(500).json({ error: 'Erro ao buscar eventos' });
        } else {
            res.json(results); // Retorna os eventos encontrados em formato JSON
        }
    });
  });
});

// Rota para executar Delete agenda
app.delete('/excluir/:id', (req, res) => {
  const eventId = req.params.id;

  if (!eventId) {
    return res.status(400).json({ error: 'ID do evento inválido' });
  }

  const sql = 'DELETE FROM events WHERE idEvents = ?';

  // Pegar uma conexão do pool
  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Erro ao obter conexão do pool:', err);
          res.status(500).json({ error: 'Erro ao excluir evento' });
          return;
      }

      // Executar query
      connection.query(sql, [eventId], (error, results, fields) => {
          // Liberar a conexão de volta ao pool
          connection.release();

          if (error) {
        console.error('Erro ao excluir evento:', error);
        return res.status(500).json({ error: 'Erro ao excluir evento' });
      }

      // Verificar se o evento foi realmente excluído
      if (results.affectedRows === 0) {
        console.log(`Evento com ID ${eventId} não encontrado`);
        return res.status(404).json({ error: `Evento com ID ${eventId} não encontrado` });
      }

      console.log(`Evento com ID ${eventId} excluído com sucesso`);
      res.json({ message: `Evento com ID ${eventId} excluído com sucesso` });
    });
  });
});

// Rota para salvar o registro
app.post('/salvar_registro', (req, res) => {
  const { nomeConta, dataEmissao, valor, vencimento, status } = req.body;

  // Validação simples dos dados recebidos
  if (!nomeConta || !dataEmissao || !valor || !vencimento || !status) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  // SQL para inserir o novo registro
  const sql = 'INSERT INTO contas (nomeConta, dataEmissao, valor, vencimento, status) VALUES (?, ?, ?, ?, ?)';

  // Obter uma conexão do pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao obter conexão do pool:', err);
      return res.status(500).json({ success: false, message: 'Erro ao salvar o registro.' });
    }

    // Executar a query
    connection.query(sql, [nomeConta, dataEmissao, valor, vencimento, status], (error, results) => {
      // Liberar a conexão de volta ao pool
      connection.release();

      if (error) {
        console.error('Erro ao salvar o registro:', error);
        return res.status(500).json({ success: false, message: 'Erro ao salvar o registro.' });
      }

      // Sucesso
      res.json({ success: true, message: 'Registro salvo com sucesso!' });
    });
  });
});

//Lista de registro salvo
app.get('/registros', (req, res) => {
  // SQL para buscar todos os registros da tabela contas
  const sql = 'SELECT * FROM contas';
  
  // Obter uma conexão do pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao obter conexão do pool:', err);
      return res.status(500).json({ success: false, message: 'Erro ao obter conexão do pool.' });
    }
    
    // Executar a query SQL
    connection.query(sql, (error, results) => {
      // Liberar a conexão de volta ao pool
      connection.release();
      
      if (error) {
        console.error('Erro ao executar a query:', error);
        return res.status(500).json({ success: false, message: 'Erro ao executar a query SQL.' });
      }
      
      // Verificar se há resultados da consulta
      if (results.length > 0) {
        res.json({ success: true, data: results });
      } else {
        res.status(404).json({ success: false, message: 'Nenhum registro encontrado.' });
      }
    });
  });
});

// Rota para executar Delete contas
app.delete('/excluir_registro/:id', (req, res) => {
  const idConta = req.params.id;
 
  if (!idConta) {
    return res.status(400).json({ error: 'ID do conta inválido' });
  }

  const sql = 'DELETE FROM contas WHERE idContas = ?';

  // Pegar uma conexão do pool
  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Erro ao obter conexão do pool:', err);
          res.status(500).json({ error: 'Erro ao excluir conta' });
          return;
      }

      // Executar query
      connection.query(sql, [idConta], (error, results, fields) => {
          // Liberar a conexão de volta ao pool
          connection.release();

        if (error) {
        console.error('Erro ao excluir conta:', error);
        return res.status(500).json({ error: 'Erro ao excluir conta' });
      }

      // Verificar se o conta foi realmente excluído
      if (results.affectedRows === 0) {
        console.log(`Conta com ID ${idConta} não encontrado`);
        return res.status(404).json({ error: `Conta com ID ${idConta} não encontrado` });
      }

      console.log(`Conta com ID ${idConta} excluído com sucesso`);
      res.json({ success: true });
    });
  });
});

// Rota para atualizar um registro específico verificando e alterando somente os campos diferentes
app.put('/atualizar_registro/:id', (req, res) => {
  const id = req.params.id;
  const { nomeConta, dataEmissao, valor, vencimento, status } = req.body;

  // Validar se pelo menos um campo foi fornecido para atualização
  if (!nomeConta && !dataEmissao && !valor && !vencimento && !status) {
      return res.status(400).json({ error: 'Nenhum campo válido para atualização foi fornecido.' });
  }

  // Consulta SQL para obter os dados atuais do registro
  const sqlSelect = 'SELECT * FROM contas WHERE idContas = ?';

  // Consulta SQL para atualizar os campos modificados
  let sqlUpdate = 'UPDATE contas SET ';
  const params = [];

  // Array para armazenar os campos que foram modificados
  const camposAtualizados = [];

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Erro ao obter conexão do pool:', err);
          return res.status(500).json({ error: 'Erro ao atualizar registro.' });
      }

      // Executar a primeira query para obter os dados atuais
      connection.query(sqlSelect, [id], (error, results, fields) => {
          if (error) {
              connection.release();
              console.error('Erro ao obter registro:', error);
              return res.status(500).json({ error: 'Erro ao obter registro.' });
          }

          if (results.length === 0) {
              connection.release();
              return res.status(404).json({ error: `Registro com ID ${id} não encontrado.` });
          }

          const registroAtual = results[0];

          // Verificar e construir a query SQL dinamicamente
          if (nomeConta && nomeConta !== registroAtual.nomeConta) {
              sqlUpdate += 'nomeConta = ?, ';
              params.push(nomeConta);
              camposAtualizados.push('nomeConta');
          }
          if (dataEmissao && dataEmissao !== registroAtual.dataEmissao) {
              sqlUpdate += 'dataEmissao = ?, ';
              params.push(dataEmissao);
              camposAtualizados.push('dataEmissao');
          }
          if (valor && valor !== registroAtual.valor) {
              sqlUpdate += 'valor = ?, ';
              params.push(valor);
              camposAtualizados.push('valor');
          }
          if (vencimento && vencimento !== registroAtual.vencimento) {
              sqlUpdate += 'vencimento = ?, ';
              params.push(vencimento);
              camposAtualizados.push('vencimento');
          }
          if (status && status !== registroAtual.status) {
              sqlUpdate += 'status = ?, ';
              params.push(status);
              camposAtualizados.push('status');
          }

          // Remover a última vírgula e espaço da query SQL
          sqlUpdate = sqlUpdate.slice(0, -2);

          // Adicionar a condição WHERE para o ID do registro
          sqlUpdate += ' WHERE idContas = ?';
          params.push(id);

          // Executar a query de atualização se houver campos modificados
          if (camposAtualizados.length > 0) {
              connection.query(sqlUpdate, params, (errorUpdate, resultsUpdate, fieldsUpdate) => {
                  connection.release(); // Liberar a conexão de volta ao pool

                  if (errorUpdate) {
                      console.error('Erro ao atualizar registro:', errorUpdate);
                      return res.status(500).json({ error: 'Erro ao atualizar registro.' });
                  }

                  console.log(`Registro com ID ${id} atualizado com sucesso.`);
                  res.json({ success: true });
              });
          } else {
              // Caso nenhum campo tenha sido modificado
              connection.release();
              res.json({ message: 'Nenhum campo foi modificado.' });
          }
      });
  });
});


// Configuração para servir arquivos estáticos (CSS, JavaScript, etc.) do diretório 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});