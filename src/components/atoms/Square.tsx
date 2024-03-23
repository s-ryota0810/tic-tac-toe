import React from 'react';

type Props = {
	value: string
	isActive: boolean
	onSquareClick: React.MouseEventHandler<HTMLButtonElement>
}

const Square: React.FC<Props> = ({ value, isActive, onSquareClick }) => {
	return <button className={`square ${isActive ? 'win-line' : ''}`} onClick={onSquareClick}>{value}</button>
}

export default Square;
