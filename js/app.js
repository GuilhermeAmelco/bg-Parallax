const parallax__elements = document.querySelectorAll('.parallax');

let xValue = 0, 
    yValue = 0,
    rotateDegree = 0;

function update(CursorPosition) {
    parallax__elements.forEach(element => {
        let speedx = element.dataset.speedx;
        let speedy = element.dataset.speedy;
        let speedz = element.dataset.speedz;
        let rotation = element.dataset.rotation;

        
        let isInLeft = parseFloat(getComputedStyle(element).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (CursorPosition - parseFloat(getComputedStyle(element).left)) * isInLeft * 0.1;

        element.style.transform = 
        `
        perspective(2300px) translateZ(${-zValue * speedz}px)
        rotateY(${rotateDegree * rotation}deg)
        translateX(calc(-50% + ${-xValue * speedx}px)) 
        translateY(calc(-50% + ${-yValue * speedy}px)) 
        ` 
    })
}

update(0);

window.addEventListener('mousemove', (e) => {
    /* Precisamos saber o quão distante o mouse está ao centro */

    /* 
    posição do mouse - a metade da largura ou a altura, 
    nos dá valores negativos se estamos ao lado esquerdo ou a acima do meio
    e nós da valores positivos se estamos ao lado direto e abaixo 
    */
    xValue = e.clientX - window.innerWidth / 2; 
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
    
    update(e.clientX);
});


/* GSAP ANIMATION */


// let timeline = gsap.timeline();

// parallax__elements.forEach(el => {
//     timeline.from(
//         el, 
//         {
//             top: `${el.offsetHeight / 2 + el.dataset.distance}px`,
//             duration: 2,
//         }
//     )
// })



