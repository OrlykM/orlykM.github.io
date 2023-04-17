const form = document.querySelector("form")
form.addEventListener('submit', function post(e){
      e.preventDefault()
      const payload = new FormData(form)
      if (payload.get("password") != payload.get("password-confirmation"))
      {
            alert("Password and Confirm Password values not the same")
            window.location.reload();
      }
      else {
            payload.delete("password-confirmation")
            payload.set("isAdmin", 0)
            payload.set("userStatus", "regular")
            const body = JSON.stringify(Object.fromEntries(payload.entries()))
            body.isAdmin = 0
            // Костиль
            body.idlocation = 1
            fetch('http://127.0.0.1:5000/user', {
                  method: "POST",
                  body: body,
                  headers: {
                        'Content-Type': 'application/json'
                  }
            }).then(res => res.json())
              .then(data => {
                    if (data == "Missing required field")
                    {
                          alert("Missing some fields")
                          window.location.reload();
                    }
                    if (data == "Duplicate phone or email")
                    {
                          alert("Phone or email already used by someone")
                          window.location.reload();
                    }
                    else
                    {
                          window.location.href = '../pages/login.html';
                    }
              })
              .catch(err => console.log(err));
      }
})
