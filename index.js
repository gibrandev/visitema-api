const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/user"));

app.listen(port, () => {
    console.log(`Visinema app listening on port ${port}`)
})