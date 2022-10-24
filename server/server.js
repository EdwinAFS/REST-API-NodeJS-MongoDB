require("./config/config");
const mongoose = require("mongoose");
const app = require("./app");

// db connection
mongoose
    .connect(process.env.urlDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((db) => console.log("db is connected"))
    .catch((err) => console.log(err));

app.listen(process.env.PORT || 3000, () => {
    console.log(`server en el puerto ${process.env.PORT || 3000}`);
});
