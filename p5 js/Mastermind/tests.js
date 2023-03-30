class Assert
{
    constructor(){}

    AreEqual(expected,actual,msg){
        if(expected!==actual){
            console.log(msg+" expected:"+expected+" actual:"+actual);
        }
    }
}

class Tests
{
    constructor()
    {
        this.Assert = new Assert();
    }

    Run(){
        console.log("Begin tests");
        
        //this.Assert.AreEqual(1,2,"hello");

        let scoreTests = [
            {answer:[0,0,0,0], guess:[1,1,1,1], score:0},
            {answer:[0,0,0,0], guess:[1,1,0,0], score:20},
            {answer:[0,0,0,1], guess:[1,2,2,2], score:1},
            {answer:[1,2,3,4], guess:[4,3,2,1], score:4},
            {answer:[1,2,3,4], guess:[1,2,3,4], score:40},
            {answer:[1,1,0,0], guess:[2,1,2,0], score:20},
            {answer:[1,0,0,0], guess:[2,2,1,1], score:1}
        ];

        for(var i=0;i<scoreTests.length;i++){
            let test = scoreTests[i];
            let a = new Row(test.answer[0],test.answer[1],test.answer[2],test.answer[3]);
            let g = new Row(test.guess[0],test.guess[1],test.guess[2],test.guess[3]);
            this.Assert.AreEqual(test.score, a.scoreGuess(g), "answer=" + a.toString() + " guess=" + g.toString());
        }

        console.log("End tests");
    }
}

let t = new Tests()
t.Run();