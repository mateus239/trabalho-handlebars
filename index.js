const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

// Configurando Handlebars como mecanismo de visualização
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configurando o middleware body-parser para analisar dados do corpo das solicitações
app.use(bodyParser.urlencoded({ extended: false }));

// Dados iniciais de exemplo (lista de alunos)
let alunos = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'Pedro' }
];

// Rota para exibir a lista de alunos
app.get('/', (req, res) => {
    res.render('alunos', { alunos });
});

// Rota para exibir o formulário de cadastro de aluno
app.get('/alunos/novo', (req, res) => {
    res.render('novo-aluno');
});

// Rota para processar o formulário de cadastro de aluno
app.post('/alunos', (req, res) => {
    const { nome } = req.body;
    const id = alunos.length + 1;
    alunos.push({ id, nome });
    res.redirect('/');
});

// Rota para exibir detalhes de um aluno individual
app.get('/alunos/:id', (req, res) => {
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));
    res.render('detalhes-aluno', { aluno });
});

// Rota para exibir o formulário de edição de aluno
app.get('/alunos/:id/editar', (req, res) => {
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));
    res.render('editar-aluno', { aluno });
});

// Rota para processar o formulário de edição de aluno
app.post('/alunos/:id/editar', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const aluno = alunos.find(a => a.id === parseInt(id));
    aluno.nome = nome;
    res.redirect('/');
});

// Rota para excluir um aluno
app.post('/alunos/:id/excluir', (req, res) => {
    const { id } = req.params;
    alunos = alunos.filter(a => a.id !== parseInt(id));
    res.redirect('/');
});

// Configurando a pasta public para servir arquivos estáticos
app.use(express.static('public'));

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
