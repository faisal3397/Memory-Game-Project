
const closeCards = function(){
    document.querySelectorAll(".card").forEach(el => {
    
        el.setAttribute("class", "card")
    })
}
const openCards = function(){
    document.querySelectorAll(".card").forEach(el => {
    
        el.setAttribute("class", "card open show")
    })

    setTimeout(closeCards, 5000);
}
var tick; // defined it outside because it will be used outside "game()" function to clear the timer
const game = function(){
    var cards = []
    var lockedCardsArray = []
    var comparedCardsArray = []
    var counter = 0;
    var timer = 0;
    var starRating = 3;
    
    
    document.querySelectorAll(".card").forEach(el => {
        cards.push(el)
    })

    document.querySelector(".deck").innerHTML="" //we have to empty the ul to add the shuffled cards

    shuffle(cards)

    cards.forEach(el => { //after shuffling the cards we append them to the empty ul
        document.querySelector(".deck").appendChild(el);
    })

    openCards()

    cards.forEach(el => {
        el.addEventListener("click",function(){

            if(comparedCardsArray.length < 2){
                comparedCardsArray.push(el)
            }else{
                counter++;
                document.querySelector(".moves").innerHTML = counter
                if(counter > 8){
                    
                    document.querySelector(".stars").innerHTML = ` 
                    <li><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>
                    `
                    starRating =  3
                }
                if(counter > 12){
                    
                    document.querySelector(".stars").innerHTML = ` 
                    <li><i class="fa fa-star"></i></li>`

                    starRating =  1
                }
                if(counter > 16){
                    
                    document.querySelector(".stars").innerHTML = ``

                    starRating = 0
                }// Defined a move counter and based on the counter the number of stars will decrease

                if(comparedCardsArray[0].childNodes[1].className == comparedCardsArray[1].childNodes[1].className){
                    compareValue = "same"
                    lockedCardsArray.push(comparedCardsArray[0])
                    lockedCardsArray.push(comparedCardsArray[1])
                    // console.log(lockedCardsArray,"locked");
                    comparedCardsArray.pop();
                    comparedCardsArray.pop()
                }else{
                    compareValue = "different"
                    comparedCardsArray[0].setAttribute("class", "card")
                    comparedCardsArray[1].setAttribute("class", "card")
                    comparedCardsArray.pop();
                    comparedCardsArray.pop()
                    
                }
            
            }

            comparedCardsArray.forEach(el =>{
            el.setAttribute("class", "card open show avoid-clicks")
            })
            lockedCardsArray.forEach(el => {
                el.setAttribute("class", "card match")
                
            })

            
            if(lockedCardsArray.length == 16){
                console.log(lockedCardsArray, "Locked"); 
                clearInterval(tick)
                while(lockedCardsArray.length > 0){
                    lockedCardsArray.pop()
                }
                swal({ //Display a congratulations popup
                    title: "Good job!",
                    text: `Congrats you win with ${counter} moves and in ${timer} seconds. Your Star Rating is ${starRating}`,
                    icon: "success",
                    button: "One more time?"
                }).then(() => {
                    window.location.reload();
                });
            }
            

        })
        
    })
    
    tick = setInterval(function(){
        timer++
        document.querySelector(".timer").innerHTML =  `${timer} seconds`    
    },1000)
    
    
}

document.addEventListener('DOMContentLoaded', game())

document.querySelector(".restart").addEventListener('click', function(){

    window.location.reload();
})



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
