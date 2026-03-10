const API_KEY="AIzaSyAJGq1CADFCPboHoNKo0fV8szdrie-_WnM"
const CHANNEL_ID="UCKQ_q75TKeAcYXYeu0uaWlQ"

const videosDiv=document.getElementById("videos")
const trendingDiv=document.getElementById("trending")

const modal=document.getElementById("playerModal")
const player=document.getElementById("videoPlayer")
const closePlayer=document.getElementById("closePlayer")

const subs=document.getElementById("subs")

let videos=[]


fetch(
`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
)
.then(res=>res.json())
.then(data=>{

let count=data.items[0].statistics.subscriberCount

let i=0

let interval=setInterval(()=>{

subs.innerText=i

i+=Math.ceil(count/100)

if(i>=count){

subs.innerText=count
clearInterval(interval)

}

},20)

})


fetch(
`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
)
.then(res=>res.json())
.then(data=>{

videos=data.items

display(videosDiv,videos)
display(trendingDiv,videos.slice(0,6))

})


function display(container,list){

container.innerHTML=""

list.forEach(v=>{

if(v.id.videoId){

let div=document.createElement("div")

div.className="video"

div.innerHTML=`

<img src="https://img.youtube.com/vi/${v.id.videoId}/maxresdefault.jpg">

<p>${v.snippet.title}</p>

`

div.onclick=()=>{

modal.style.display="flex"
player.src=`https://www.youtube.com/embed/${v.id.videoId}?autoplay=1`

}

container.appendChild(div)

}

})

}


closePlayer.onclick=()=>{

modal.style.display="none"
player.src=""

}



//// THREE JS BACKGROUND

const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer=new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth,window.innerHeight)

document
.getElementById("three-bg")
.appendChild(renderer.domElement)

const geometry=new THREE.BoxGeometry()

const material=new THREE.MeshBasicMaterial({
color:0x00ffff,
wireframe:true
})

let cubes=[]

for(let i=0;i<40;i++){

let cube=new THREE.Mesh(geometry,material)

cube.position.x=(Math.random()-0.5)*20
cube.position.y=(Math.random()-0.5)*20
cube.position.z=(Math.random()-0.5)*20

scene.add(cube)

cubes.push(cube)

}

camera.position.z=10

function animate(){

requestAnimationFrame(animate)

cubes.forEach(c=>{

c.rotation.x+=0.01
c.rotation.y+=0.01

})

renderer.render(scene,camera)

}

animate()



//// MINECRAFT BLOCKS

const mcScene=new THREE.Scene()
const mcCamera=new THREE.PerspectiveCamera(75,window.innerWidth/400,0.1,1000)
const mcRenderer=new THREE.WebGLRenderer()

mcRenderer.setSize(window.innerWidth,400)

document.getElementById("minecraft3d")
.appendChild(mcRenderer.domElement)

const texture=new THREE.TextureLoader()
.load("https://i.imgur.com/OPa1F4S.png")

const cubeMaterial=new THREE.MeshBasicMaterial({map:texture})

let blocks=[]

for(let i=0;i<25;i++){

let cube=new THREE.Mesh(new THREE.BoxGeometry(),cubeMaterial)

cube.position.x=(Math.random()-0.5)*10
cube.position.y=(Math.random()-0.5)*6
cube.position.z=(Math.random()-0.5)*10

mcScene.add(cube)

blocks.push(cube)

}

mcCamera.position.z=8

function animateMC(){

requestAnimationFrame(animateMC)

blocks.forEach(b=>{
b.rotation.x+=0.01
b.rotation.y+=0.01
})

mcRenderer.render(mcScene,mcCamera)

}

animateMC()



//// ROBLOX AVATAR

const rbScene=new THREE.Scene()
const rbCamera=new THREE.PerspectiveCamera(75,window.innerWidth/400,0.1,1000)
const rbRenderer=new THREE.WebGLRenderer()

rbRenderer.setSize(window.innerWidth,400)

document.getElementById("roblox3d")
.appendChild(rbRenderer.domElement)

const loader=new THREE.GLTFLoader()

loader.load(
"https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb",
function(gltf){

const avatar=gltf.scene
rbScene.add(avatar)

avatar.scale.set(1.5,1.5,1.5)

function animateRB(){

requestAnimationFrame(animateRB)

avatar.rotation.y+=0.01

rbRenderer.render(rbScene,rbCamera)

}

animateRB()

})

rbCamera.position.z=5



//// ARK DINOSAUR

const arkScene=new THREE.Scene()
const arkCamera=new THREE.PerspectiveCamera(75,window.innerWidth/400,0.1,1000)
const arkRenderer=new THREE.WebGLRenderer()

arkRenderer.setSize(window.innerWidth,400)

document.getElementById("ark3d")
.appendChild(arkRenderer.domElement)

const arkLoader=new THREE.GLTFLoader()

arkLoader.load(
"https://threejs.org/examples/models/gltf/Flamingo.glb",
function(gltf){

const dino=gltf.scene
arkScene.add(dino)

dino.scale.set(0.02,0.02,0.02)

function animateARK(){

requestAnimationFrame(animateARK)

dino.rotation.y+=0.01

arkRenderer.render(arkScene,arkCamera)

}

animateARK()

})

arkCamera.position.z=5
