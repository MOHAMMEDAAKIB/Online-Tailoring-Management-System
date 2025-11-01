// test-bcrypt.js
const bcrypt = require('bcryptjs');

(async () => {
  const password = 'MySecret123!';
  const hash = await bcrypt.hash(password, 10);
  console.log('Hash:', hash);

  const ok = await bcrypt.compare('MySecret123!', hash);
  console.log('Password matches?', ok);
})();