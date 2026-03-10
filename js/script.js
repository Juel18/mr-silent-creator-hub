const API_KEY="AIzaSyAEBSwFQQHGdg7EdKTWXaBvl6b6cOhFpXc"
const CHANNEL_ID="UCKQ_q75TKeAcYXYeu0uaWlQ"

const videosDiv=document.getElementById("videos")
const subs=document.getElementById("subs")

let videos=[]


// load subscriber count

fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`)
.then(res=>res.json())
.then(data=>{

if(subs){
subs.innerText=data.items[0].statistics.subscriberCount
}

})


// load videos

fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`)
.then(res=>res.json())
.then(data=>{

videos=data.items

display(videos)

})


function display(list){

if(!videosDiv) return

videosDiv.innerHTML=""

list.forEach(v=>{

if(v.id.videoId){

const id=v.id.videoId

const div=document.createElement("div")

div.className="video"

div.innerHTML=`
<img src="https://img.youtube.com/vi/${id}/maxresdefault.jpg">
<p>${v.snippet.title}</p>
`

div.onclick=()=>{
window.location=`watch.html?id=${id}`
}

videosDiv.appendChild(div)

}

})

}
