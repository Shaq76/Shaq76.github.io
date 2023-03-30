let pegColours = ['white','yellow','orange','purple','green','red','black','blue','darkgrey'];

class Row
{
    constructor(p1,p2,p3,p4){
        this.pegs = [p1,p2,p3,p4];
        this.pegRects = [];
        this.results = [null,null,null,null];
        this.background = 'lightgrey';
    }

    scoreGuess(guess){
        let score = 0;
        let usedAnswer = [false,false,false,false];
        let usedGuess = [false,false,false,false];

        // Score the RED pegs
        for(let i=0;i<4;i++){
            if(this.pegs[i]===guess.pegs[i]){
                score += 10;
                usedAnswer[i] = true;
                usedGuess[i] = true;
            }
        }

        // Score the WHITE pegs
        for(let gs=0;gs<4;gs++)
        {
            if(usedGuess[gs]){
                continue;
            }

            for(let ans=0;ans<4;ans++)
            {
                if(usedAnswer[ans]){
                    continue;
                }

                if(this.pegs[ans]===guess.pegs[gs])
                {
                    usedAnswer[ans] = true;
                    usedGuess[gs] = true;
                    score += 1;
                }
            }
        }
        
        return score;
    }

    SetScore(score){
        this.score = score;
        this.results = [];
        while(score>0)
        {
            if(score>=10){
                this.results.push('red');
                score -=10;
            } else {
                this.results.push('white');
                score -=1;
            }
        }
    }

    toString(){
        return this.pegs.toString();
    }

    draw(scribble, left, top, width, height){
        stroke('grey');
        fill(this.background);
        strokeWeight( 1 );

        //console.log("Rect="+left+","+top+","+width+","+height);
        //rect(left,top,width,height)
        randomSeed(top);
        scribble.scribbleRect( left+width/2, top+height/2, width, height );

        let size = height-10;
        let cTop = top + (height-size)/2 + size/2;
        let curLeft = left + size/2 + 10;

        this.pegRects = [];
        let pegIndex = 0;
        this.pegs.forEach(p=>{ 
            if(p===null){return;}
            fill(pegColours[p]); 
            stroke(pegColours[p]);

            //circle(curLeft,cTop,size,size);

            let xs = [];
            let ys = [];
            for(var angle=0;angle<2*Math.PI;angle+=Math.PI/20){
                let radius = size;
                let pointAngleInRadians = angle;
                var x = curLeft+Math.cos(pointAngleInRadians) * radius/2;
                var y = cTop+Math.sin(pointAngleInRadians) * radius/2;
                xs.push(x);
                ys.push(y);
            }
            randomSeed(p+pegIndex);
            scribble.scribbleFilling(xs, ys, 2, 95);
            pegIndex = pegIndex + 1;
            
            this.pegRects.push({x:curLeft-size/2,y:cTop-size/2,w:size,h:size});
            curLeft += size+10; 
        });

        let t = top + height/4;
        let b = top + height - height/4;
        let r = left+width - height/4;
        let l = r - height+ height/2;
        let resultCenters = [[l,t],[r,t],[l,b],[r,b]];
        let index =0;

        this.results.forEach(res=>{
            let pos = resultCenters[index];
            if(res===null){
                return;
            }
            stroke(res);
            fill(res);
            circle(pos[0],pos[1],height/5,height/5)
            index+=1;
        });
    }

    mouseClicked(){
        for(var i=0;i<this.pegRects.length;i++)
        {
            if(mouseX>this.pegRects[i].x && mouseX<this.pegRects[i].x+this.pegRects[i].w && 
               mouseY>this.pegRects[i].y && mouseY<this.pegRects[i].y+this.pegRects[i].h)
            {
                this.pegs[i] = (this.pegs[i]+1)%8;
            }
        }
    }
}