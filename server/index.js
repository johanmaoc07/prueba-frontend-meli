

const express = require('express');
const cors = require('cors');

const app = express();



app.use(cors());
app.use(express.json());


app.get('/api/countries', (req, res) => {
  res.json([
    { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
    { code: 'MX', name: 'México', flag: '🇲🇽' },
  ]);
});


app.get('/api/user/:id', (req, res) => {
  res.json({
    id: req.params.id,
    fullname: 'Johan Mauricio Cepeda',
    email: 'johan.maoc@gmail.com',
    country: 'CO',
    address: 'Tv 6a #3-86, La Calera, Colombia',
    phone: '300 123 4567'
  });
});


app.put('/api/user/:id', (req, res) => {
  const updateData = req.body;
  

  res.json({
    id: req.params.id,
    ...updateData,
    email: 'johan.maoc@gmail.com', 
    phone: '300 123 4567'      
  });
});


app.listen(5000, () => {
  console.log('Servidor en puerto 5000');
});