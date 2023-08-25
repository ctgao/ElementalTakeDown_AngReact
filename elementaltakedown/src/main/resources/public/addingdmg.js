const API_URL = `http://localhost:8080`

//{
//  "id": 0,
//  "name": "string",
//  "dmgValue": 0,
//  "dmgElement": "WATER"
//}
// sample json

function doPostOfForm() {
    const formData = new FormData(form);
    var notIntYet = formData.get("dmgValue");
    formData.set("dmgValue", Number(notIntYet));
    var dataToSend = {};

    console.log("lets go form data whoo");
    // Display the values and store them as an array
    for (const key of formData.keys()) {
      console.log(key + " leading to "+ formData.get(key));
      dataToSend[key] = formData.get(key);
    }

    postJSON(dataToSend)
    return false;
}

async function postJSON(data) {
    try {
      const response = await fetch(`${API_URL}/api/damages`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
}

const form = document.getElementById("add-dmg-form");
