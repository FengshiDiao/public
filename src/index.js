
function parseAndCreatePage(rsp) {
    let s = "";
   
    s = "total number is: " + rsp.photos.photo.length + "<br/>";

    // http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}_[mstb].jpg
    // http://www.flickr.com/photos/{user-id}/{photo-id}

    // http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}_[mstb].jpg
    // http://www.flickr.com/photos/{user-id}/{photo-id}

    let photoLength = rsp.photos.photo.length;
    let photo = rsp.photos.photo;
    for (let i=0; i < photoLength; i++) {
        photo_branch = photo[i];
        t_url = "http://farm" + photo_branch.farm + ".static.flickr.com/" + photo_branch.server + "/" + photo_branch.id + "_" + photo_branch.secret + "_" + "t.jpg";
        p_url = "http://www.flickr.com/photos/" + photo_branch.owner + "/" + photo_branch.id;
        s +=  '<a href="' + p_url + '">' + '<img alt="'+ "大哥你好吗" + '"src="' + t_url + '"/>' + '</a>';
    }
    
    const appDiv = document.getElementById("app"); 
    appDiv.innerHTML = s; 
} 

const key = "37126fffd8d3b1ea114027e45fd74aa9";
const base = "https://api.flickr.com/services/rest/?";
const query = `&method=flickr.photos.search&api_key=${key}&tags=golden-retriever&per-page=50&format=json&nojsoncallback=1&media=photos`;
const url = base + query; 

fetch(url) 
    .then( (response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .then( (rsp) => parseAndCreatePage(rsp))
    .catch(function(error) {
        console.log("There has been a problem with your fetch operation: ",error.message);
    });
