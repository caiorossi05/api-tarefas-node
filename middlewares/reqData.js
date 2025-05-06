export default function reqData(req, res, next) {
  const agora = new Date().toLocaleString();
  console.log(`[${agora}] ${req.method} ${req.url}`);
  next();
};