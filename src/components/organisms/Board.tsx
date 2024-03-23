import React from 'react';
import Square from '../atoms/Square';

type Props = {
	xIsNext: boolean,
	squares: string[],
	onPlay: (value: string[]) => void
}

const Board: React.FC<Props> = ({ xIsNext, squares, onPlay }) => {	
	const calculateWinner = (squares: string[]) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		]
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return [squares[a], lines[i]]
			}
		}
		return [null, []]
	}
	
	const [winner, winLine] = calculateWinner(squares)

	const handleClick = (index: number) => {
		if (squares[index] || winner) return
		const nextSquare = squares.slice()
		if (xIsNext) {
			nextSquare[index] = 'X'
		} else {
			nextSquare[index] = '○'
		}
		onPlay(nextSquare)
	}

	let status;
	let fill = squares.every((square) => square)
	if (winner) {
		status = "Winner: " + winner
	} else if (fill) {
		status = "Draw"
	} else {
		status = "Next player: " + (xIsNext ? 'X' : '○')
	}

	const squareList = (squareCount: number, line: any) => {
		const rowCount = Math.sqrt(squareCount)
		return Array(rowCount).fill(null).map((_, rowIndex: number) => {
			const rowSquares = Array(rowCount).fill(null).map((_, columnIndex: number) => {
				const index = rowCount * rowIndex + columnIndex
				return <Square value={squares[index]} onSquareClick={() => handleClick(index)} key={"column-" + index} isActive={line.includes(index)} />
			})
			return <div className="board-row" key={"row-" + rowIndex}>
				{rowSquares}
			</div>
		})
	}
	
	return <>
		<div className="status">{status}</div>
		{squareList(squares.length, winLine)}
	</>
}

export default Board;
