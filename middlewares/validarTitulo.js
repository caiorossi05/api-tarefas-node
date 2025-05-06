export function validarTitulo(req, res, next) {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== 'string') {
    return res.status(400).json({ erro: 'Título é obrigatório e deve ser uma string' });
  }

  next();
}
