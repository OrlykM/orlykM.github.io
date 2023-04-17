// if (sessionStorage.getItem("Authorization") == null) {
//   window.location.href = '../pages/login.html';
// }
async function submit() {
  const form = document.querySelector("form")
  const payload = new FormData(form)
  var date = new Date()

  payload.set("publishingDate", `${date.getDate()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:
   ${date.getMinutes()}:${date.getSeconds()}`)
  payload.set("id_category", 1)
  const body = JSON.stringify(Object.fromEntries(payload.entries()))

  console.log(body)
  fetch('http://127.0.0.1:5000/user', {
      method: "POST",
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(res => res.json())
    .then(data => {
        window.location.href = '../pages/ads_main.html';
    }).catch(err => console.log(err));
}
