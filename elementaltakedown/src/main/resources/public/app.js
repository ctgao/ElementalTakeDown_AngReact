const API_URL = `http://localhost:8080`
//http://localhost:8080/api/character-cards

function fetchAllCharaCards() {
    fetch(`${API_URL}/api/character-cards`)
        .then((res) => {
            console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showCharaCardList(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('posts').innerHTML = 'Error Loading All Character Cards'
        })
}


function fetchCharaCard(charaCardId) {
    fetch(`${API_URL}/api/character-cards/${charaCardId}`)
        .then((res) => {
            console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showCharaCard(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('posts').innerHTML = 'Error Loading Single Character Card'
        })
}

function showCharaCardList(data) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('posts');
    const list = document.createDocumentFragment();

    data.map(function(post) {
        console.log("Character Card:", post);
        let li = document.createElement('li');
        let title = document.createElement('h3');
        title.innerHTML = `<a href="/characterdetailed.html?chara_id=${post.id}">${post.name}</a>`;

        li.appendChild(title);
        list.appendChild(li);
    });

    ul.appendChild(list);
}

function showCharaCard(post) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('post');
    const detail = document.createDocumentFragment();

    console.log("Character Card:", post);
    let li = document.createElement('div');
    let title = document.createElement('h2');
    let body = document.createElement('p');
    title.innerHTML = `${post.name}`;
    body.innerHTML = `${post.element}`;

    li.appendChild(title);
    li.appendChild(body);
    detail.appendChild(li);

    ul.appendChild(detail);
}

function parseCardId() {
     try {
         var url_string = (window.location.href).toLowerCase();
         console.log(url_string);
         var url = new URL(url_string);
         var charaCardId = url.searchParams.get("chara_id");
         return charaCardId
       } catch (err) {
         console.log("Issues with Parsing URL Parameter's - " + err);
         return "0"
       }
 }

function handlePages() {
    let charaCardId = parseCardId()
    console.log("character_card_id: ", charaCardId)

    if (charaCardId != null) {
        console.log("found a character_card_id")
        fetchCharaCard(charaCardId)
    } else {
        console.log("load all character cards")
        fetchAllCharaCards()
    }
}

handlePages()

