import express, { response } from "express";
import { body, cookie, validationResult } from "express-validator"
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { User } from "./schema/user.mjs";
import { Expense } from "./schema/expense.mjs";
import { Feed } from "./schema/feedback.mjs"
import { hashPassword } from "./utils/helpers.mjs";
import 'dotenv/config';
import request from "request";
import bcrypt from "bcrypt";

import cors from 'cors'


const app = express();

const mongo_uri = process.env.MONGODB_URI;
const alpha_van = process.env.ALPHA_VAN

mongoose.connect(mongo_uri)
    .then(() => console.log('Database is connected'))
    .catch((err) =>
        console.error('Error connecting to the database:', err));


const corsOrigin = "https://regulaexpi-frontend.onrender.com";

app.use(cors({
    origin: corsOrigin,
    credentials: true,
}
));


app.use(express.json());

app.use(session({
    secret: 'lolz',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (60000 * 60) * 3,
        secure: false,
        sameSite: 'none',
        httpOnly: false,
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
})
);

passport.serializeUser((user, done) => {

    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {

    try {
        const findUser = await User.findById(id);
        if (!findUser) throw new Error("User not found");
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
})

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await User.findOne({ username });
            if (!findUser) throw new Error("User not found");

            const isMatch = await bcrypt.compareSync(password, findUser.password);
            if (!isMatch)
                throw new Error("Bad credentials.");

            done(null, findUser);

        }
        catch (err) {
            done(err, null);
        }
    })
)


app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})



app.post("/api/Login", passport.authenticate("local"), (req, res) => {
    console.log('!');
    const { username } = req.body;
    req.session.start = true;
    req.session.user = username;
    req.session.save((err) => {
        if (err)
            console.log("Error saving session:", err);
         else 
            console.log("Session data saved successfully");
    });
    return res.status(200).send({ user: req.session.user, session: req.session.start });
});

app.get("/api/Login/NavBar"  ,(req, res) => {


    
    if (req.session.start == true) {
        return res.send(req.session.user);
    }
    else
        return res.send(false);

})

app.get("/api/Login/SetExpenses", (req, res) => {

    if (req.session.start == true) {
        return res.status(200).send("OK");
    }
    else
        return res.send(false);

})

app.get("/api/Login/Add", async (req, res) => {

    if (req.session.start == true) {
        return res.status(200).send({ user: req.session.user, session: req.session.start });
    }
    else
        return res.send(false);

})
app.post("/api/Login/AddExpenses", async (req, res) => {

    const { user, name } = req.body;
    const newExpense = new Expense(req.body);

    try {
        const findExpense = await Expense.findOne({ user, name });
        if (findExpense) throw new Error("Expense already exists.");
        const savedExpense = await newExpense.save();
        console.log(savedExpense);
        return res.send("Data saved");
    } catch (err) {
        console.log(err)
        return res.send("Error: " + err.message);
    }

})



app.get("/api/Login/Delete", async (req, res) => {

    if (req.session.start == true)
        return res.status(200).send({ user: req.session.user, session: req.session.start });
    else
        return res.send(false);

})
app.post("/api/Login/DeleteExpenses", async (req, res) => {

    const { name, user } = req.body;


    try {
        const findExpense = await Expense.findOneAndDelete({ name, user });
        if (!findExpense) throw new Error("Expense does not exist.");
        return res.send(findExpense);
    } catch (err) {
        console.log(err)
        return res.send("Error: " + err.message);
    }

})




app.get("/api/Login/Modify", (req, res) => {

    if (req.session.start == true)
        return res.status(200).send({ user: req.session.user, session: req.session.start });
    else
        return res.send(false);

})
app.post("/api/Login/ModifyExpenses", async (req, res) => {


    const { expense, user } = req.body;

    const newExpense = new Expense(req.body);

    try {
        const findExpense = await Expense.findOneAndUpdate({ name: expense, user: user }, { name: newExpense.name, amount: newExpense.amount, upi: newExpense.upi });
        if (!findExpense) throw new Error("Expense does not exist.!");
        console.log(findExpense);
        return res.send(findExpense.toJSON());
    } catch (err) {
        console.log(err)
        return res.send("Error: " + err.message);
    }

})


app.get("/api/Login/Check", (req, res) => {

    if (req.session.start == true)
        return res.status(200).send({ user: req.session.user, session: req.session.start });
    else
        return res.send(false);

})
app.post("/api/Login/CheckExpenses", async (req, res) => {


    const { name, user } = req.body;

    if (name === "*") {
        try {
            Expense.find({ user }).then(function (products) {
                try {
                    if (products.length == 0) throw new Error("No expense registered yet.");

                    res.send(products);
                }
                catch (err) {
                    console.log(products);
                    console.log(err)
                    return res.send("Error: " + err.message);
                }
            });
        } catch (err) {
            console.log(err)
            return res.send("Error: " + err.message);
        }

    }

    else {
        try {
            const findExpense = await Expense.findOne({ name, user });
            if (!findExpense) throw new Error("Expense does not exist.");
            console.log(findExpense);
            return res.send(findExpense.toJSON());
        } catch (err) {
            console.log(err)
            return res.send("Error: " + err.message);
        }

    }

})



app.get("/api/Login/Payment", (req, res) => {

    if (req.session.start == true)
        return res.status(200).send("OK");
    else
        return res.send(false);

})

app.get("/api/Login/Analytics", (req, res) => {

    if (req.session.start == true)
        return res.status(200).send({ user: req.session.user, session: req.session.start });
    else
        return res.send(false);

})

app.post("/api/Login/Chart", async (req, res) => {

    const { user } = req.body;



    try {
        Expense.find({ user }).then(function (products) {
            try {
                if (products.length == 0) throw new Error("No expense registered yet.");

                let data = new Array(1 + products.length);
                data[0] = ["Name", "Amount"];

                for (let i = 0, j = 1, name = "", amount = 0; i < products.length; i++, j++) {

                    name = products[i].name
                    amount = products[i].amount

                    data[j] = [];

                    data[j].push(name);
                    data[j].push(parseFloat(amount.toString()));

                }


                return res.send(data);
            }
            catch (err) {
                console.log(err)
                return res.send("Error: " + err.message);
            }
        });
    } catch (err) {
        console.log(err)
        return res.send("Error: " + err.message);
    }
})




app.get("/api/Login/Stock", (req, res) => {

    if (req.session.start == true)
        return res.status(200).send({ user: req.session.user, session: req.session.start });
    else
        return res.send(false);

})

app.post("/api/Login/GetStock", (req, res) => {

    const { keyword } = req.body;

    const uri = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${alpha_van}`;

    request.get({
        url: uri,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {

            console.log(data.bestMatches[0]);
        }
    });


});



app.get("/api/Login/Feedback", (req, res) => {

    if (req.session.start == true) {
        try {
            Feed.find({}).then(function (products) {
                try {
                    if (products.length == 0) throw new Error("No feedbacks yet. Add yours now. :D");



                    let data = new Array(1);


                    for (let i = 0, j = 0; i < products.length; i++, j++) {

                        data[i] = products[i].feed


                    }

                    return res.status(200).send({ user: req.session.user, session: req.session.start, data: data });
                }
                catch (err) {
                    console.log(err)
                    let data = new Array(1);
                    data[0] = err.message;
                    return res.status(200).send({ user: req.session.user, session: req.session.start, data: data });
                }
            });
        } catch (err) {
            console.log(err)
            let data = new Array(1);
            data[0] = err.message;
            return res.status(200).send({ user: req.session.user, session: req.session.start, data: data });
        }
    }
    else
        return res.send(false);

})

app.post("/api/Login/AddFeed", async (req, res) => {


    const newFeed = new Feed(req.body);

    try {
        const savedFeed = await newFeed.save();
        console.log(savedFeed);
        return res.send("Feed saved. Thank you for time.");
    } catch (err) {
        console.log(err)
        return res.send("Error: " + err.message);
    }

})






app.get("/api/Login/Logout", (req, res) => {

     if (req.session.start === true) {
        req.session.start == false;
        req.session.save((err) => {
        if (err)
            console.log("Error saving session:", err);
         else 
            console.log("Session data saved successfully");
        });
        req.session.destroy();
        return res.status(200).send("OK");
     }
     else
         return res.send(false);

})





app.post("/api/Signup",
    [
        body("email").
            isEmail().withMessage("Please enter a valid email."),

        body("username").
            isAlphanumeric().withMessage("Username must contain a mix of character and numbers."),

        body("password").
            isStrongPassword().withMessage("Password must be of min length of 8 and contain at least one number, symbol, lowercase and uppercase character"),

        body("cpassword").
            isLength(0).withMessage("You must confirm password.")

    ],

    async (req, res) => {


        const result = validationResult(req);

        const { email, username, password, cpassword } = req.body;
        if (password !== cpassword)
            return res.send('Passwords does not match.');

        try {
            if (result["errors"].length == 0) {
                const { body } = req;
                body.password = await hashPassword(body.password);
                const newUser = new User(body);
                try {
                    const savedUser = await newUser.save();
                    console.log(savedUser);
                } catch (err) {
                    console.log(err)
                    return res.send("User or email already exists.");
                }
                return res.send("login");
            }
            else
                return res.send(result["errors"][0]["msg"]);
        }
        catch (err) {
            console.log(err);
        }


    });



