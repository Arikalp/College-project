var tl=gsap.timeline();

tl.from(".navbar .logo img",{
    y:-100,
    duration:1,
    opacity:0,
})

tl.from(".members li a ",{
    y:-100,
    duration:0.8,
    opacity:0,
})

tl.from(".content .article span",{
    x:-200,
    duration:0.4,
    opacity:0,
    stagger:1,
}
)

tl.from(".mindful span",{
    x:200,
    duration:1,
    opacity:0,
    
}
)