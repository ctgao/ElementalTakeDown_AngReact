const API_URL = `http://localhost:8080`

function doPostOfForm() {
    const formData = new FormData(form);

    //adding things into the form to resolve requirements
    formData.append("basic-id", 1);
    formData.append("skill-id", 1);
    formData.append("ultimate-id", 1);

    console.log("lets go form data whoo");
    // Display the values
    for (const value of formData.values()) {
      console.log(value);
    }

    postJSON(formData)
    return false;
}

async function postJSON(data) {
    // CURRENT BUG
//     "JSON parse error: Unexpected character ('-' (code 45)) in numeric value: expected digit (0-9) to follow minus sign, for valid numeri…"
//    DUNNO why we're getting this parsing error, nothing should have a dash except for maybe ???
// the basics???? HUMMMMM

    try {
      const response = await fetch(`${API_URL}/api/character-cards`, {
        method: "POST", // or 'PUT'
        headers: {
//          "Content-Type": "application/json",
            "Content-type": "application/json; charset=UTF-8"
        },
        body: data,
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
}

const form = document.getElementById("add-chara-form");
