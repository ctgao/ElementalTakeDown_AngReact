const API_URL = `http://localhost:8080`
//http://localhost:8080/api/character-cards

function fetchAllCharaCards() {
  fetch(`${API_URL}/archive/admin`)
      .then((res) => {
          return res.json();
      })
      .then((data) => {
          handlePages(data);
      })
      .catch((error) => {
          console.log(`Error Fetching data : ${error}`)
          document.getElementById('posts').innerHTML = 'Error Loading All Character Cards'
      })
}

function handlePages() {
  ul.innerHTML = '';
  const list = document.createDocumentFragment();

  data.map(function(post) {
    console.log("Character Card:", post);

//  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
//  <label for="vehicle1"> I have a bike</label><br>

    let label = document.createElement("label");
    let input = document.createElement('input');

    input.type="checkbox";
    input.id=`card${post.id}`;
    input.value=post.id;
    label.innerHTML = post.name;

    label.appendChild(checkbox);
    list.appendChild(label);
    list.appendChild(document.createElement("br"));
  });

  ul.appendChild(list);
}

const ul = document.getElementById('cards-checklist');

fetchAllCharaCards();
