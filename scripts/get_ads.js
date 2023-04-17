if (sessionStorage.getItem("Authorization") == null) {
  window.location.href = '../pages/login.html';
}

async function exitAccount()
{
  if (sessionStorage.getItem("Authorization") != null) {
    sessionStorage.removeItem("Authorization");
    window.location.href = '../index.html';
  }
}
async function getArticles()
{
  const response = await fetch("http://127.0.0.1:5000/advertisement/public", {method:"GET"});
  const data = await response.json();
  const adContainer = document.querySelector('.container');
  data.forEach((ad, index) => {
    console.log(ad)
    if (index < data.length){
      const adElement = document.createElement('div');
      adElement.className = "listing";
      if(ad.photoUrl != null)
      {
        const adImg = document.createElement("img");
        adImg.src = `http://127.0.0.1/orlykM.github.io:63342/imgs/${ad.photoUrl}`;
        adElement.appendChild(adImg);
      }

      const adTitle = document.createElement("h2");
      adTitle.textContent = `${ad.title}`;
      adElement.appendChild(adTitle);

      const adType = document.createElement("span");
      adType.className = "public";
      adType.textContent = "Public";
      adElement.appendChild(adType);

      const category_name = "";
      const category_response = fetch(`http://127.0.0.1:5000/category/${ad.id_category}`, {method: "GET"})
        .then(re => re.json()).then(dat => {this.category_name = dat.name});

      const adCategory = document.createElement("h3");
      adCategory.textContent = category_name;
      adElement.appendChild(adCategory);

      const adAbout = document.createElement("p");
      adAbout.textContent = `${ad.about}`;
      adElement.appendChild(adAbout)

      const adDate = document.createElement("p");
      adDate.className = "date";
      adDate.textContent = `${ad.publishingDate}`;
      adElement.appendChild(adDate);

      const adButton = document.createElement("button");
      adButton.className = "select-btn";
      adButton.textContent = "Show";
      adElement.appendChild(adButton);

      adContainer.appendChild(adElement);
    }
})
}
getArticles()
