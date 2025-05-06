// delay.js
export default function delay(req, res, next) {
  setTimeout(() => {
    next();
  }, 1000); // exemplo: 1 segundo de delay
}