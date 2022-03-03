# server-counter:

post('/registration')

post('/login')

post('/addcounter')

get('/counters')

delete('/delcounter')

## registration:

{username, password}

## login:

{username, password}
it return \<token\>

### In subsequent requests, add Headers: Autorization with value: Bearer \<token\>

## addcounter:

{username: string,

title: {type: String, require: true},

typeincome: {type: String, require: true},

timestamp: {type: Number, require: true},

income: {type: Number, require: true},

period: {type: Number, require: true},

output: {type: Number, require: true}}

## delcounter:

{ username, index, title }

## counters
