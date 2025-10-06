const multer = require('multer')

const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

// 3️⃣ Export dono ko ek sath
module.exports = upload 