let WIDTH = 400;
let ROW_HEIGHT = 75;

class Game
{
    constructor(){
        this.answer = new Row(this.GetRandomPeg(),this.GetRandomPeg(),this.GetRandomPeg(),this.GetRandomPeg());
        this.answer.background = 'darkgrey';
        this.turn = 0;

        this.scribble = new Scribble();              // global mode

        this.rows = [];
        for(var i=0;i<10;i++){

          /*if(i==0){
            this.rows.push(new Row(this.GetRandomPeg(),this.GetRandomPeg(),this.GetRandomPeg(),this.GetRandomPeg()));
        } else*/ {
              this.rows.push(new Row(null,null,null,null));
          }
        }

        this.showAnswer = false;
        this.remainingPossibilities = [];
        for(let p1=0;p1<8;p1++){
            for(let p2=0;p2<8;p2++){
                for(let p3=0;p3<8;p3++){
                    for(let p4=0;p4<8;p4++){
                        this.remainingPossibilities.push(new Row(p1,p2,p3,p4));
                    }
                }
            }
        }
    }

    GetRandomPeg(){ return this.GetRandomInt(8); }

    GetRandomInt(max){ return Math.floor(Math.random() * max); }

    NextMove(){
        let newRow = this.remainingPossibilities[this.GetRandomInt(this.remainingPossibilities.length)];
        //let newRow = new Row(this.GetRandomPeg(),this.GetRandomPeg(),this.GetRandomPeg(),this.GetRandomPeg());
        this.rows[this.turn] = newRow;
        let score = this.answer.scoreGuess(this.rows[this.turn]);
        this.rows[this.turn].SetScore(score);

        this.remainingPossibilities = this.remainingPossibilities.filter(r=>{
            let thisScore = r.scoreGuess(newRow);
            //console.log("r="+r+" newRow="+newRow+" score="+thisScore+" wantedScore="+score);
            return thisScore==score;
        });

        this.turn++;
    }
    
    DrawRemainingPossibilities(){
        let size = 5;
        let currentTop = ROW_HEIGHT/2;
        let left = 2*ROW_HEIGHT+WIDTH + (ROW_HEIGHT/2);

        fill(0);
        let s = this.remainingPossibilities.length+" options remaining";
        if(this.remainingPossibilities.length==1){
            s = "SOLVED";
        }
        text(s, left, currentTop-10);

        this.remainingPossibilities.forEach(pos=>{

            let curLeft = left;

            pos.pegs.forEach(p=>{
                fill(pegColours[p]);
                stroke(pegColours[p]); 
                circle(curLeft,currentTop,size,size); 
                curLeft += size+(size/3); 
            });

            currentTop += size+(size/2);

            if(currentTop>ROW_HEIGHT*12){
                currentTop = ROW_HEIGHT/2;
                left += size*8;
            }
        });
    }

    mouseClicked(){
        if(this.showAnswer){
            this.answer.mouseClicked();
        }
    }
 
    Draw(){
        let currentTop = ROW_HEIGHT;
        let left = ROW_HEIGHT;
        this.rows.forEach(x=>{x.draw(this.scribble, left, currentTop, left+WIDTH, ROW_HEIGHT); currentTop+=ROW_HEIGHT;});

        if(this.showAnswer){
            this.answer.draw(this.scribble, left, currentTop, left+WIDTH, ROW_HEIGHT); 
        } else {
            let dummyAnswer = new Row(8,8,8,8);
            dummyAnswer.draw(this.scribble, left, currentTop, left+WIDTH, ROW_HEIGHT); 
        }
        currentTop+=ROW_HEIGHT;

        this.DrawRemainingPossibilities();

        //textWrap(WORD);
        //text(this.remainingPossibilities.toString(), 0,0,1000,100)
    }
}