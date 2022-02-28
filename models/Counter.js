const {Schema, model} = require('mongoose')


const Counter = new Schema ({
    title: {type: String, require: true},
    typeincome: {type: String, require: true},
    timestamp: {type: Number, require: true},
    income: {type: Number, require: true},
    period: {type: Number, require: true},
    output: {type: Number, require: true}
})

module.exports = model('Counter', Counter)