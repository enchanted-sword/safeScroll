let filterTags = [
  "funbun",
  "A1"
];
let filterBlogs = [
  "adultkoboldsonly",
  "dragondilfdick",
  "muttycum",
  "goatgirlbleats",
  "mothgirlmilk",
  "smell-girl",
  "dragongirluvula",
  "dogtaurgirlsheath"
]
let style = document.styleSheets[0];
style.insertRule(".safeScrollFiltered img {filter: blur 32px; transition: filter 1s;}");
style.insertRule(".safeScrollFiltered img:hover {filter: none;}")
function tagSearch(a, b) {
	let d = 0;
  	for (let w = 0; w < a.length; ++w) {
      for (let x = 0; x < b.length; ++x) {
          if(a[w] === b[x])) {
              ++d;
          }
          else {continue}
      }
    }
  	if (d > 0) {return true}
  	else {return false}
}
for (let i = 0; i < document.getElementsByClassName("FtjPK").length; ++i) {
  let post = document.getElementsByClassName("FtjPK")[i];
  let tags = [];
  let blogs = [];
  for (let n = 0; n < post.getElementsByClassName("BSUG4").length; ++n) {
  	blogs.push(post.getElementsByClassName("BSUG4")[n].innerText);
  }
  for (let r = 0; r < post.getElementsByClassName("sqHC2").length; ++r) {
  	blogs.push(post.getElementsByClassName("sqHC2")[r].innerText);
  }
  for (let z = 0; z < post.getElementsByClassName("KSLDH").length; ++z) {
  	tags.push(post.getElementsByClassName("KSLDH")[z].innerText);
  }
  if (post.getElementsByClassName("KFWLb").length > 0 || tagSearch(tags, filterTags || tagSearch(blogs, filterBlogs))) {
    post.classList.add("safeScrollFiltered");
  }
}
