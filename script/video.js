//1. fetch, load and show the category on html

// create load categories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(response => response.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}


const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    //   add data in html
    categories.forEach((item) => {
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;

        // add button to a category container
        categoryContainer.append(button);
    })


}
// calling the function
loadCategories()

// load videos
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(response => response.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}
// card demo

// display videos
const displayVideos = (videos) => {
    // console.log('display video called', videos)
    // add data in html
    console.log(videos)
    const videoContainer = document.getElementById('video-container');
    videos.forEach(item => {
        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
        <figure class="h-[200px]">
                  <img class="h-full w-full object-cover"
                    src="${item.thumbnail}"
                    alt="thumbnail" />
                </figure>
                <div class="flex px-0 py-2 gap-2">                  
                  <div>
                  <img class="w-10 h-10 rounded-full object-cover" src="${item.authors[0].profile_picture}">
                  </div>
                  <div>
                  <h2 class="text-base font-extrabold">${item.title}</h2>
                  <p>${item.authors[0].profile_name}</p>
                  <p>${item.others.views}</p>
                  </div>
                </div>
     `;
     videoContainer.append(card)
    })
   
}
const cardDemo = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}


// calling the function
loadVideos();