function produto(id, nome, valorUnitario) {
    this.id = id;
    this.nome = nome + Date.now();
    this.valorUnitario = valorUnitario;
    this._lastChange = Date.now();
    this._removed = false; // Quando true, esse registro será removido do app.
}

function updatesMock() {
    this.now = Date.now();
    this.updates = [];
    for (var index = 1; index < 1001; index++) {
        this.updates.push(new produto(index, "produto" + index, index * 100));
    }
    return this;
}

function ok() {
    this.status = "ok";
    this.now = Date.now();
    return this;
}

var appRouter = function (app) {
    app.get("/produtos/", function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        console.log(req.query.since);
        var updatesObjects = new updatesMock();
        res.send(JSON.stringify(updatesObjects));
    });

    app.post("/produtos", function (req, res) {
        console.log("chamou o post");
        var deuCerto = new ok();
        res.send(JSON.stringify(deuCerto));
    });

}

module.exports = appRouter;