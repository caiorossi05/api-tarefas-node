// middlewares/delay.js
module.exports = async (req, res, next) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
    console.log('Aguardando 1 segundo antes de continuar');
    await delay(1000); // espera 1000 ms (1 segundo)
    
    next(); // segue para o próximo
  };
  