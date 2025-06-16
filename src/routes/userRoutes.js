const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth'); 

/**
 * @swagger
 * /api/users/register:
 * post:
 * summary: Registra um novo usuário
 * tags: [Usuários]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 201:
 * description: Usuário criado com sucesso
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/users/login:
 * post:
 * summary: Realiza login
 * tags: [Usuários]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 200:
 * description: Login bem-sucedido
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users:
 * get:
 * summary: Lista todos os usuários
 * tags: [Usuários]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de usuários retornada com sucesso
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: string
 * name:
 * type: string
 * email:
 * type: string
 * admin:
 * type: boolean
 * 401:
 * description: Não autorizado (token não fornecido ou inválido)
 */
router.get('/', authMiddleware, userController.index);

module.exports = router;