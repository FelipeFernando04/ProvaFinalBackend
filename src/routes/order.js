// routes/order.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const auth = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - total
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do pedido
 *         userId:
 *           type: integer
 *           description: ID do usuário que fez o pedido
 *         total:
 *           type: number
 *           format: float
 *           description: Valor total do pedido
 *         status:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *           description: Status do pedido
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', auth, orderController.getAll);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Lista pedidos do usuário logado
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos do usuário
 */
router.get('/my-orders', auth, orderController.getUserOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Busca pedido por ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/:id', auth, orderController.getById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
router.post('/', auth, orderController.create);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Atualiza um pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 */
router.put('/:id', auth, orderController.update);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Remove um pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pedido removido com sucesso
 */
router.delete('/:id', auth, orderController.delete);

module.exports = router;