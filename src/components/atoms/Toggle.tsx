import React from 'react';

type Props = {
	isDesc: boolean
	onToggle: (value: boolean) => void
}

const Toggle: React.FC<Props> = ({ isDesc, onToggle }) => {
  return <div className={`toggle ${isDesc ? 'active' : ''}`}>
		<div className={`toggle-switch ${isDesc ? 'active' : ''}`} onClick={() => onToggle(!isDesc)} />
	</div>
}

export default Toggle;
	