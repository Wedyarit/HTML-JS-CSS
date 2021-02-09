let users = []

function format() {
    let phone_number = new String(document.getElementById("phone_number").value);
    let formatedNumber = "+7 (___) ___-__-__";
    let startingIndex;
    if (phone_number.startsWith("8")) {
        formatedNumber = "+7 "
        startingIndex = 1;
    } else {
        formatedNumber = "+7 "
        startingIndex = 2;
    }

    formatedNumber += `(${phone_number.substr(startingIndex, 3)}) ${phone_number.substr(startingIndex + 3, 3)}-${phone_number.substr(startingIndex + 6, 2)}-${phone_number.substr(startingIndex + 8, 7)}`
    document.getElementById("result").innerHTML = formatedNumber;
}
