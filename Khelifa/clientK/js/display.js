


window.onload = function (){
    let username = sessionStorage.getItem('username');
    console.log(username)
    displaytweet (sessionStorage.getItem('username'));
    document.getElementById('postbtn').onclick = postTweet;
};

async function displaytweet (username){
    const response = await fetch(`http://localhost:3000/tweetS/${username}`)
    const result = await response.json();
    console.log(result)

    let html = ""
    for (let each of result){
        html += `<div class="card mb-3">
        <div class="card-body">
          <div class="d-flex flex-start">
            <div class="w-100">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h6 class="text-primary fw-bold mb-0">
                  <i class="fab fa-twitter"></i>
                    ${each.username}
                  <span class="text-dark ms-2"
                   
                  </span>
                  ${each.comment}
                </h6>
                <p class="mb-0">${each.date}</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>`
    }
    document.getElementById('div').innerHTML = html;
    console.log('----in display')
};


async function postTweet(){
    console.log("-----in postTweet")
   const response = await fetch('http://localhost:3000/tweetS', {
    method: 'POST',
    body: JSON.stringify({
        username: sessionStorage.getItem('username'),
        comment: document.getElementById('textarea').value
    }),
    headers: {
        'Content-Type': 'application/json'
    }
   })
   const result = await response.json();
   console.log(result)
   displaytweet (sessionStorage.getItem('username'));
}