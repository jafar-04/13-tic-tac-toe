import { useState } from "react"


export default function XOGame () {

    const [turn, setTurn] = useState("x")
    const [gameRunning, setGameRunning] = useState(true)
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    const [gameArr, setGameArr] = useState(["", "", "", "", "", "", "", "", ""]);
    const [describe, setDescribe] = useState("x Turn")
    let newAr = []

    const handleCellClick = (ind) => {
        const current = document.querySelector(`#cell${ind}`)
        if(current.innerText != "" || gameRunning == false) {
            return
        }
        newAr = [...gameArr]
        newAr[ind] = turn
        setGameArr(newAr)
        setDescribe(d => d == "x Turn" ? "o Turn" : "x Turn")
        setTurn(t => t == "x" ? "o" : "x")
        checkWin()
    }

    const checkWin = () => {
        for(let i = 0; i < winConditions.length; i++) {
            const currenCondition = winConditions[i]
            const first = newAr[currenCondition[0]]
            const second = newAr[currenCondition[1]]
            const third = newAr[currenCondition[2]]
            if (first != "" && second != "" && third != "") {
                if(first == second && second == third) {
                    window.alert(`${turn} Won!`)
                    setGameRunning(false);
                    setDescribe(`${turn} Won`)
                    return
                }
            }
        }
        if(!newAr.some(a => a == "")) {
            setDescribe("That is a Draw!")
            alert("Draw")
            return
        }
    }

    const handleRestart = () => {
        setGameArr(["", "", "", "", "", "", "", "", ""])
        setGameRunning(true);
        setDescribe(`${turn} Turn`)
    }

    return (<div className="container">
                <div className="title"><h3>Tic Tac Toe Game</h3></div>
                <div className="cells-container">
                        {gameArr.map((ele, index) => 
                            <div key={index} 
                                 id={`cell${index}`} 
                                 onClick={() => handleCellClick(index)} className="cell">{ele}
                            </div>)}
                </div>
                <p>{describe}</p>
                <button onClick={handleRestart}>Restart</button>
            </div>)
}