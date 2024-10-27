function getTimeString(time) {
    // get hour and rest seconds
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hours and ${minute} minutes and ${remainingSecond} seconds ago`
}


//1. fetch, load and show the category on html

// create load categories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(response => response.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}

// create DisplayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    //   add data in html
    categories.forEach((item) => {

        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${(item.category_id)})" class="btn category-btn">${item.category}</button>
        `
        // add button to a category container
        categoryContainer.append(buttonContainer);
    })
}



// show videos by category

const loadCategoryVideos = (id) => {
    // fetch
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(response => response.json())
        .then(data => {
            // shobaike active class remove koro
            removeActiveClass();
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active")
            displayVideos(data.category)
        })
        .catch(error => console.log(error))
};

// load videos
const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(response => response.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

// active-btn functionality
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove("active");
    }
}

// display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = "";
    if (videos.length === 0) {
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
            <img src="assets/Icon.png">
            <h2 class="font-bold text-3xl text-center">There is no content here.</h2>
        </div>
        `;
        return;
    } else {
        videoContainer.classList.add("grid")
    }
    videos.forEach(item => {
        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
        <figure class="h-[200px] relative">
                  <img class="h-full w-full object-cover"
                    src="${item.thumbnail}"
                    alt="thumbnail" />
                    ${item.others.posted_date.length === 0 ? "" : `<span class="absolute right-2 bottom-2 p-1 bg-black rounded text-white text-xs">${getTimeString(item.others.posted_date)}</span>`}  
                </figure>
                <div class="flex px-0 py-2 gap-2">                  
                  <div>
                  <img class="w-10 h-10 rounded-full object-cover" src="${item.authors[0].profile_picture}">
                  </div>
                  <div>
                  <h2 class="text-base font-extrabold">${item.title}</h2>
                  <div class="flex gap-2 items-center">
                  <p>${item.authors[0].profile_name}</p>
                  ${item.authors[0].verified === true ? `<img class="w-4" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000">` : ""}
                  </div>
                  <p>${item.others.views}</p>
                  <button onclick="loadDetails('${item.video_id}')" class="btn btn-sm btn-error">Details</button>
                  </div>
                </div>
     `;
        videoContainer.append(card)
    })

}

const loadDetails = async (videoId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
    const data = await response.json();
    displayDetails(data.video);
};

const displayDetails = (video) => {
    console.log(video)
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
    <img src="${video.thumbnail}"/>
    <br>
    <p>${video.description}</p>  
    `
    // testing way one
    //    document.getElementById('showModalData').click();
    document.getElementById('customModal').showModal();
}

// search functionality
document.getElementById('search-input').addEventListener("keyup", (e)=>{
    loadVideos(e.target.value)
})

// calling the function
loadVideos();
// calling the function
loadCategories()