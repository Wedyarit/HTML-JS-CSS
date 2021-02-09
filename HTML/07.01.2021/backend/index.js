const express = require("express");
const cors = require("cors");

let users = [];

const app = express();
app.use(express.json());
app.use(cors());
const port = 8000;

(async () => {
    app.get('/users',async(req,res) => {
        res.send(JSON.stringify(users))
    });

    app.get('/user/:id',async(req,res) => {
        let user = users.find(x => x.id === req.params.id);

        if (user == null)
            res.status(404).send('{"code":404}');
        else 
            res.status(201).send(JSON.stringify(user));
    });

    app.post('/user', async (req, res) => {
        let id = '1';
        if (users[users.length - 1] != null)
            id = parseInt(users[users.length - 1].id + 1).toString();

        const user = {
            "name": req.body.name,
            "age": req.body.age,
            "location": req.body.location,
            "avatar": req.body.avatar,
            "id": id
        };
        users.push(user);
        res.status(201).send('{"code":201}');
    });

    app.delete('/user/:id', async(req, res) => {
        for (var i = 0; i < users.length; i++)
            if (users[i].id === req.params.id) { 
                users.splice(i, 1);
                res.status(201).send('{"code":201}');
                return;
            }

        res.status(404).send('{"code":404}');
    });

    
    app.listen(port, () => {
        console.log(`Сервер был запущен: http://localhost:${port}\n`);
    });

})();

