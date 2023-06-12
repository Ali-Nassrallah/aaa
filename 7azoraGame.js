var gameContainer=document.querySelector('.container');
var arrayBlocks=Array.from(gameContainer.children);
var orderRange=Array.from(Array(arrayBlocks.length).keys());
var temp;
var curr;
document.querySelector('.controls span').onclick = function(){
    var nname=prompt("what is your name: ");
    if(nname=="null" || nname==""){
        document.querySelector(".name span").innerHTML="Unknown";
    }
    else{
        document.querySelector(".name span").innerHTML=nname; 
    }
    document.querySelector('.controls').remove();
    arrayBlocks.forEach((element,i)=>{
        document.querySelector('.container').classList.add('no-clicking');
        element.classList.add('is-flipped');
        setTimeout(()=>{
            document.querySelector('.container').classList.remove('no-clicking');
            element.classList.remove('is-flipped');
        },4000);
    })
}


for(var i=0;i<arrayBlocks.length;i++){
    curr=Math.floor(Math.random() * orderRange.length);
    temp=orderRange[i];
    orderRange[i]=orderRange[curr];
    orderRange[curr]=temp;
}
arrayBlocks.forEach((element,i)=>{
    element.style.order=orderRange[i];
    element.onclick=function(){
        flipBlock(element);
    }
})
function flipBlock(element){
    element.classList.add('is-flipped');

    var arrayflipped=arrayBlocks.filter(element => element.classList.contains('is-flipped'));
    
    if(arrayflipped.length == 2){
        
        document.querySelector('.container').classList.add('no-clicking');
        setTimeout(() => {
            document.querySelector('.container').classList.remove('no-clicking');
        },1000);
        
        if(arrayflipped[0].dataset.technology === arrayflipped[1].dataset.technology)
        {
            document.querySelector(".correct").play();
            arrayflipped[0].classList.remove('is-flipped');
            arrayflipped[1].classList.remove('is-flipped');
            arrayflipped[0].classList.add('has-matched');
            arrayflipped[1].classList.add('has-matched');
        }
        else{
            document.querySelector(".wrong").play();
            setTimeout(()=>{
            arrayflipped[0].classList.remove('is-flipped');
            arrayflipped[1].classList.remove('is-flipped');
            },1000);   
        }
        document.querySelector('.tries span').innerHTML=parseInt(document.querySelector('.tries span').innerHTML)+1;
    }
    
}