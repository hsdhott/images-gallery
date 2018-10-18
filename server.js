const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.static(__dirname + '/'));
app.get('/images', (_, res) => {
  res.sendFile(__dirname + '/api/photos.json')
})

//assuming app is express Object.
// app.get('/',function(req,res){
//   res.sendFile(__dirname + '/index.html');
// });

app.listen(PORT)
console.log(`Server is running on PORT: ${PORT}`);