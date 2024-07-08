import express from 'express'

const app = express()
const port = 3000

app.get('/WSSDORICOVERI/:params', (req, res) => {
    const params = req.params.params;

    // params is like /WSSDORICOVERI/{$codicePrenotazione}%7C{$tipoEvento}{$idSDO}
    // params is: pren1|Psdo1
    const splitted = params.split('|');
    const codicePrenotazione = splitted[0];
    const tipoEvento = splitted[1][0];
    const idSDO = params.substring(splitted[0].length + tipoEvento.length + 1, params.length - 1);

    console.log("\n[NUOVA RICHIESTA]");
    console.log(`codicePrenotazione: ${codicePrenotazione}`);
    console.log(`tipoEvento: ${tipoEvento}`);
    console.log(`idSDO: ${idSDO}`);

    res.send(`
        <p>codicePrenotazione: ${codicePrenotazione}</p>
        <p>tipoEvento: ${tipoEvento}</p>
        <p>idSDO: ${idSDO}</p>    
    `)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})