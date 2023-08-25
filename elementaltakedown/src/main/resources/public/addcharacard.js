const API_URL = `http://localhost:8080/api`

const form = document.getElementById("add-chara-form");

async function parseForm() {
    // get the 3 jsons
    const basicJSON = await parseBasicATK();
    const skillJSON = await parseSkill();
    const ultimateJSON = await parseUlt();

    const formData = new FormData(form);
    var dataToSend = {};

    dataToSend["name"] = formData.get("name");
//    console.log("name of character: " + formData.get("name"));
    dataToSend["element"] = formData.get("element");
//    console.log("element of character: " + formData.get("element"));
    dataToSend["basic"] = basicJSON;
    dataToSend["skill"] = skillJSON;
    dataToSend["ultimate"] = ultimateJSON;

    postJSON(dataToSend, `${API_URL}/character-cards`);
    return false;
}

function parseDamage(type){
    var dataToSend = {};

    dataToSend["dmgValue"] = document.getElementById(`${type}dmgValue`).value;
//    console.log(`${type}damage value: ` + dataToSend["dmgValue"]);
    dataToSend["dmgElement"] = document.getElementById(`${type}dmgElement`).value;
//    console.log(`${type}damage element: ` + dataToSend["dmgElement"]);

    return postJSON(dataToSend, `${API_URL}/damages`);
}

async function parseBasicATK(){
    var dataToSend = {};
    const damageJSON = await parseDamage("basic-");

    dataToSend["name"] = document.getElementById("basic-name").value;
//    console.log("name of basic: " + dataToSend["name"]);
    dataToSend["description"] = document.getElementById("basic-desc").value;
//    console.log("description of basic: " + dataToSend["description"]);
    dataToSend["damage"] = damageJSON;

    var resultingJSON = await postJSON(dataToSend, `${API_URL}/basic-atks`);
    delete resultingJSON.damage;

    return resultingJSON;
}

async function parseSkill(){
    var dataToSend = {};
    const damageJSON = await parseDamage("skill-");

    dataToSend["name"] = document.getElementById("skill-name").value;
//    console.log("name of skill: " + dataToSend["name"]);
    dataToSend["description"] = document.getElementById("skill-desc").value;
//    console.log("description of skill: " + dataToSend["description"]);
    dataToSend["damage"] = damageJSON;

    var resultingJSON = await postJSON(dataToSend, `${API_URL}/skill-atks`);
    delete resultingJSON.damage;

    return resultingJSON;
}

async function parseUlt(){
    var dataToSend = {};

    const damageJSON = await parseDamage("ultimate-");

    dataToSend["name"] = document.getElementById("ultimate-name").value;
//    console.log("name of ultimate: " + dataToSend["name"]);
    dataToSend["description"] = document.getElementById("ultimate-desc").value;
//    console.log("description of ultimate: " + dataToSend["ultimate"]);
    dataToSend["requiredEnergy"] = document.getElementById("ultimate-energy").value;
//    console.log("required energy for ultimate: " + dataToSend["requiredEnergy"]);
    dataToSend["damage"] = damageJSON;

    var resultingJSON = await postJSON(dataToSend, `${API_URL}/ultimate-atks`);
    delete resultingJSON.damage;

    return resultingJSON;
}

async function postJSON(data, urlToPostTo) {
    try {
      const response = await fetch(urlToPostTo, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
}
