const form = document.querySelector('form')

form.addEventListener("submit", function (e)
{
  e.preventDefault()
  const payload = new FormData(form)
  let headers = new Headers();
  encodedCredentials = btoa(payload.get("email") + ":" + payload.get("password"))
  headers.set('Authorization', 'Basic ' + btoa(payload.get("email") + ":" + payload.get("password")));
  const options = {
    method: 'GET',
    headers: headers
  }
  try {
      const response = fetch('http://127.0.0.1:5000/user/self', options).then(
        res => res.json()
      ).then(data => {
        if(data === "Not Found")
        {
          alert('Invalid username or password');
          window.location.reload();
        }
        else
        {
          sessionStorage.setItem('Authorization', `Basic ${encodedCredentials}`);
          window.location.href = '../pages/ads_main.html';
        }
        });
    }
    catch (error)
    {
      alert('Invalid username or password');
    }
})