const mongoose = require("mongoose");

const EsquemaEvento = new mongoose.Schema({
    tipo: {type: String, required: true},
    data: {type: Date, required: true},
    detalhes: {type: String, required: false}
});

module.exports = mongoose.model('Evento', EsquemaEvento, 'evento');