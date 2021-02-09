const url = "http://localhost:8000/users";
const vm = new Vue(
    {
        el: "#app",
        data: {
            results: []
        },
        mounted() {
            axios.get(url).then(res => {
                this.results = res.data;
            });
        },
        methods: {
            async delete_user(id) {
                alert("Вы уверены, что хотите удалить пользователя?");
                for (var i = 0; i < this.results.length; i++)
                    if (this.results[i].id === id) {
                        this.results.splice(i, 1);
                        await axios.delete("http://localhost:8000/user/" + id)
                        return;
                    }
            }, 

            async add_user() {
                const user = {"name":document.getElementById("name").value, "age":document.getElementById("age").value, "avatar":document.getElementById("avatar").value, "location":document.getElementById("location").value};
                if (form_validation()) {
                    await axios.post("http://localhost:8000/user/", user);
                    this.results.push(user);
                }
                else {
                    alert("Заполните все формы.");
                }
            },

            async setup_data() {
                for (var i = 0; i < 10; i++) {
                    const data = await axios.get("https://randomuser.me/api/");
                    let name = data.data.results[0].name.first + " " + data.data.results[0].name.last;
                    let age = data.data.results[0].dob.age;
                    let avatar = data.data.results[0].picture.large;
                    let location = data.data.results[0].location.city + ", " + data.data.results[0].location.country; 
                    const user = { "name": name, "age": age, "avatar": avatar, "location":location };
                    await axios.post("http://localhost:8000/user/", user);
                    this.results.push(user);
                }
            }
        }
    }
);

function form_validation() {
    let flag = true;

    var name = document.getElementById('name').value;
    if (name == "") {
        document.getElementById('name').style.borderColor = "red";
        flag = false;
    } else {
        document.getElementById('name').style.borderColor = "green";
    }

    var age = document.getElementById('age').value;
    if (age == "") {
        document.getElementById('age').style.borderColor = "red";
        flag = false;
    } else {
        document.getElementById('age').style.borderColor = "green";
    }

    var avatar = document.getElementById('avatar').value;
    if (avatar == "") {
        document.getElementById('avatar').style.borderColor = "red";
        flag = false;
    } else {
        document.getElementById('avatar').style.borderColor = "green";
    }

    var location = document.getElementById('location').value;
    if (avatar == "") {
        document.getElementById('location').style.borderColor = "red";
        flag = false;
    } else {
        document.getElementById('location').style.borderColor = "green";
    }

    return flag;
}