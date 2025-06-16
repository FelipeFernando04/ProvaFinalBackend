require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./config/database'); // ✅ Corrigido

const PORT = process.env.PORT || 3000;

// 👇 TESTE: veja se as variáveis estão sendo carregadas
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD === '' ? '(vazio)' : 'tem senha');
console.log('DB_NAME:', process.env.DB_NAME);

sequelize.sync({ alter: true }).then(() => {
  console.log('Banco sincronizado');
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch(err => {
  console.error('Erro ao conectar com banco:', err);
});
