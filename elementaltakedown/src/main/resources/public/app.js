const API_URL = `http://localhost:8080`
//http://localhost:8080/api/character-cards

function fetchAllCharaCards() {
    fetch(`${API_URL}/api/character-cards`)
        .then((res) => {
//            console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showCharaCardList(data);
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('posts').innerHTML = 'Error Loading All Character Cards'
        })
}


function fetchCharaCard(charaCardId) {
    fetch(`${API_URL}/api/character-cards/${charaCardId}`)
        .then((res) => {
//            console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showCharaCard(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('post').innerHTML = 'Error Loading Single Character Card'
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
    let title = document.createElement('h1');
    title.className = post.element.toLowerCase();
    let body = document.createElement('h3');
    body.className = post.element.toLowerCase();
    body.style = "padding-left: 25px";
    let basic = document.createElement('div');
    basic.id = 'basicatk';
    let skill = document.createElement('div');
    skill.id = 'skillatk';
    let ult = document.createElement('div');
    ult.id = 'ultatk';

    title.innerHTML = `${post.name}`;
    body.innerHTML = `Element: ${post.element}`;
    fetchBasic(post.basic.id);
    fetchSkill(post.skill.id);
    fetchUlt(post.ultimate.id);

    li.appendChild(title);
    li.appendChild(body);
    li.appendChild(basic);
    li.appendChild(skill);
    li.appendChild(ult);

    detail.appendChild(li);

    ul.appendChild(detail);
}

function fetchBasic(atkId) {
    fetch(`${API_URL}/api/basic-atks/${atkId}`)
        .then((res) => {
//            console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showBasicDetail(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('post').innerHTML = 'Error Loading Basic ATK data'
        })
}

function showBasicDetail(post1) {
    console.log("Basic ATK:", post1);

    let li1 = document.getElementById('basicatk');
    let title1 = document.createElement('h3');
    let desc1 = document.createElement('p');

    title1.innerHTML = `${post1.name}`;
    desc1.innerHTML = `${post1.description}`;
    desc1.style = "padding-left: 25px";

    li1.appendChild(title1);
    li1.appendChild(desc1);
}

function fetchSkill(atkId) {
    fetch(`${API_URL}/api/skill-atks/${atkId}`)
        .then((res) => {
//            console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showSkillDetail(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('post').innerHTML = 'Error Loading Skill ATK data'
        })
}

function showSkillDetail(post2){
    console.log("Skill ATK:", post2);

    let li2 = document.getElementById('skillatk');
    let title2 = document.createElement('h3');
    let desc2 = document.createElement('p');

    title2.innerHTML = `${post2.name}`;
    desc2.innerHTML = `${post2.description}`;
    desc2.style = "padding-left: 25px";

    li2.appendChild(title2);
    li2.appendChild(desc2);
}

function fetchUlt(atkId) {
    fetch(`${API_URL}/api/ultimate-atks/${atkId}`)
        .then((res) => {
//            console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
            showUltDetail(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('posts').innerHTML = 'Error Loading Ultimate ATK data'
        })
}

function showUltDetail(post3){
    console.log("Ultimate ATK:", post3);

    let li3 = document.getElementById('ultatk');
    let title3 = document.createElement('h3');
    let desc3 = document.createElement('p');
    let cost3 = document.createElement('p');

    title3.innerHTML = `${post3.name}`;
    cost3.innerHTML = `Required Energy: ${post3.requiredEnergy}`;
    cost3.style = "padding-left: 25px";
    desc3.innerHTML = `${post3.description}`;
    desc3.style = "padding-left: 25px";

    li3.appendChild(title3);
    li3.appendChild(cost3);
    li3.appendChild(desc3);
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

