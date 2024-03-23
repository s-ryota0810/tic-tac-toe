// https://ja.react.dev/learn/tutorial-tic-tac-toe#wrapping-up

import React, { useState } from 'react'
import Board from './Board'
import Toggle from '../atoms/Toggle'

const Game: React.FC = () => {
	const [xIsNext, setXIsNext] = useState(true)
	const [history, setHistory] = useState([Array(9).fill(null)])
	const [currentMove, setCurrentMove] = useState(0)
	const currentSquare = history[currentMove]
	const [isDesc, setIsDesc] = useState(false)
	const [place, setPlace] = useState<Place[]>([])
	
	type Place = {
		row: number,
		col: number
	}
	
	const handlePlay = (nextSquare: string[]) => {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquare]
		setHistory(nextHistory)
		setCurrentMove(nextHistory.length - 1)
		setXIsNext(!xIsNext)
		addPlace(nextSquare, nextHistory[nextHistory.length - 2])
	}
	
	const addPlace = (currentHistory: (null|string)[], prevHistory: (null|string)[]) => {
		const currentIndex = currentHistory.findIndex((value: null|string, index: number) => {
			return prevHistory[index] !== value
		})
		if (currentIndex === -1) return
		console.log(currentIndex + 1)
		setPlace([...place, { row: Math.floor((currentIndex) / 3) + 1, col: (currentIndex) % 3 + 1}])
		console.log(place)
	}
	
	const jumpTo = (index: number) => {
		setCurrentMove(index)		
		setXIsNext(index % 2 === 0)
	}
	
	const moves = history.map((squares: string[], index: number) => {
		let description
		if (index === currentMove) {
			description = 'You are at move #…'
			return <li key={description}>
				<span>{description}</span>
			</li>
		}
		if (index > 0) {
			description = 'Go to move #' + index + ` (${place[index].row}, ${place[index].col})`
		} else {
			description = 'Go to game start' + ` (${place[0].row}, ${place[0].col})`
		}
		
		return <li key={description}>
			<button onClick={() => jumpTo(index)}>{description}</button>
		</li>
	})
	
	const displayMoves = () => {
		if (!isDesc) {
			return moves
		} else {
			return moves.reverse()
		}
	}
	return <div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<div>
					<Toggle isDesc={isDesc} onToggle={(value: boolean) => setIsDesc(value)} />
				</div>
				<ol reversed={isDesc}>{displayMoves()}</ol>
			</div>
		</div>
}

export default Game;
