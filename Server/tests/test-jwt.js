// test-jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'dev-secret';
const token = jwt.sign({ userId: 1, role: 'customer' }, secret, { expiresIn: '1h' });
console.log('Token:', token);

const payload = jwt.verify(token, secret);
console.log('Payload:', payload);