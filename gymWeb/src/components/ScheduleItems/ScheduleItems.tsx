import { useState } from 'react';
import React from 'react';

interface ScheduleItemProps {
    id: number;
    title: string;
    time: string;
    trainer: string;
    onClick: (activity: string) => void;
}
const ScheduleItem: React.FC<ScheduleItemProps> = props => {
    const { title, time, trainer, onClick } = props;
    const [action, setButton] = useState('Reservar');
    const [buttonStyle, setButtonStyle] = useState('green');

    function handleClick() {
        onClick(title);
        if (action === 'Reservar') {
            setButton('RESERVADO');
            setButtonStyle('red');
        } else {
            setButton('Reservar');
            setButtonStyle('green');
        }
    }
    return (
        <>
            <tr>
                <td>{title}</td>
                <td>{time}</td>
                <td>{trainer}</td>
                <td>
                    {' '}
                    <button
                        style={{
                            backgroundColor: buttonStyle,
                            fontSize: '17px',
                            padding: '3px',
                            cursor: 'pointer',
                        }}
                        onClick={handleClick}
                    >
                        {action}
                    </button>
                </td>
            </tr>
        </>
    );
};

export default ScheduleItem;
