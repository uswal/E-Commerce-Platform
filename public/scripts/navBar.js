window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
var bool = false;
function myFunction() {
  const helper = document.getElementById("nav-helper-pc");
  const vw = window.innerWidth < 1150;
  if (window.pageYOffset >= sticky && bool == false) {
    navbar.classList.add("sticky");
    const f = !vw
      ? "#navbar .big{display:none;}.content {padding-top: 50px}"
      : "";
    helper.innerHTML = `
    #navbar{height:64px;}
    ${f}
    #navbar .nav-contents{transform:translateY(-20px);}
    #navbar .secondary .fsocials{transform:translateY(-40px);left:10px}
    #navbar .secondary .right{transform:translateY(-40px);right:10px}
    #navbar .nav-contents .hidden-logo{width:70px;padding-right: 32px;}
    .shop-now-eq{transform: translateY(-25px);}
    .navbar {position:fixed;}
    `;
    bool == true;
  } else {
    navbar.classList.remove("sticky");
    if (!vw)
      helper.innerHTML = `
    #navbar{height:170px;}
    
    `;
    bool == false;
  }
}
