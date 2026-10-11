let nav2=document.querySelector(".nav2");
let logo=document.querySelector(".logo");
let link=document.querySelectorAll(".link a");

window.addEventListener("scroll",()=>{
    if(window.scrollY>0){
        nav2.style.backgroundColor="rgb(3, 68, 12)";
        link.forEach(navlink=>{
            navlink.style.color="white";
        })
        logo.src = "./media/rocket-black.png";
    }else{
        nav2.style.backgroundColor="rgb(0, 0, 0)"
        link.forEach(navlink=>{
            navlink.style.color="white";
        })
        logo.src = "./media/rocket-white.png" ;
    }
});

//count

let one=document.querySelector("#numberOne");
let two=document.querySelector("#numberTwo");
let three=document.querySelector("#numberThree");

function createInterval(totalNumber,element){
    let count=0;
    let interval=setInterval(()=>{
        if(count<totalNumber){
            count++;
            element.innerHTML=count;
        }else{
            clearInterval(interval);
        }
    })
};

let confirm = false;
let observer= new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting && confirm==false){
            createInterval(250,one);
            createInterval(550,two);
            createInterval(50,three);
            confirm=true;
            setTimeout(()=>{
                confirm=false;
            },5000);
        }
    })
})

observer.observe(one);


//reviews

const reviews = [
    { name: "John Smith", review: "Excellent product quality and friendly staff!" },
    { name: "Emily Johnson", review: "Amazing shop with a great variety of products." },
    { name: "Michael Brown", review: "Great prices and high-quality products!" },
    { name: "Sophia Williams", review: "A wonderful shopping experience!" },
    { name: "Daniel Davis", review: "Helpful staff and excellent customer service." },
    { name: "Olivia Wilson", review: "A clean shop with plenty of choices." },
    { name: "James Miller", review: "Great value for money. Very satisfied!" },
    { name: "Isabella Taylor", review: "Beautiful products and affordable prices." },
    { name: "William Anderson", review: "Fast service and friendly staff!" },
    { name: "Ava Thomas", review: "Fantastic shop with excellent products." }
];

let review=document.querySelector(".carousel-inner");
reviews.forEach(element=>{
    let div=document.createElement("div");
    div.classList.add("carousel-item");
    div.innerHTML=`
    <p class="fs-4 mb-0 mt-3">${element.name}</p>
    <p class="fs-5 mt-0">"${element.review}"</p>
    `
    review.appendChild(div);
})


