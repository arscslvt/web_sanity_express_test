import express from 'express'

const app = express()
const port = 3000

app.get('/WSSDORICOVERI/:params', (req, res) => {
    const params = req.params.params;

    // WS path accepts: /WSSDORICOVERI/{$codicePrenotazione}%7C{$tipoEvento}{$idSDO}
    // this params contains {codicePrenotazione}|{tipoEvento}{idSDO}

    const splitted = params.split('|');

    const codicePrenotazione = splitted[0];
    if (!codicePrenotazione) return res.status(400).json({
        error: "codicePrenotazione is required"
    });

    const tipoEvento = splitted[1][0];
    if (!tipoEvento) throw res.status(400).send("tipoEvento is required");
    if(!["P", "R", "V"].includes(tipoEvento)) return res.status(400).json({
        error: "tipoEvento must be P, R or V"
    })

    // regex if theres something after tipoEvento
    const idSDO = splitted[1].replace(/[A-Za-z]/g, '');
    if (!idSDO) return res.status(400).json({
        error: "idSDO is required"
    });

    console.log("\n[NUOVA RICHIESTA]");
    console.log(`codicePrenotazione: ${codicePrenotazione}`);
    console.log(`tipoEvento: ${tipoEvento}`);
    console.log(`idSDO: ${idSDO}`);

    const res_json = {
        esito: "OK",
        operazione: "WSSDORICOVERI",
    }

    res.status(200).send(res_json);
})

app.listen(port, () => {
  console.log(`WebSanity Simulator listening on port ${port}`)
})