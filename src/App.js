import React, { useState, useEffect, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './App.css';

function App() {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [pause, setPause] = useState(true);
	const [start, setStart] = useState(false);
	const [breaks, setBreaks] = useState(false);
	const [shortBreaks, setShortBreaks] = useState(false);
	const [longBreaks, setLongBreaks] = useState(false);
	const [reset, setReset] = useState(0);

	const handleClick = () => {
		console.log('handle clicked');
		if (start === false) {
			if (shortBreaks === false && longBreaks === false) {
				setMinutes(25);
			}
			setStart(true);
		}
		setPause(!pause);

		console.log(pause, 'pause');
	};
	const handleReset = () => {
		setMinutes(25);
		setSeconds(0);
		setStart(false);
		setPause(true);
		setReset((prevKey) => prevKey + 1);
	};

	var interval = useRef();
	useEffect(() => {
		if (pause === false) {
			interval.current = setInterval(() => {
				if (seconds > 0) {
					setSeconds(seconds - 1);
				}
				if (seconds === 0) {
					if (minutes === 0) {
						clearInterval(interval.current);
					} else {
						setMinutes(minutes - 1);
						setSeconds(59);
					}
				}
				if (minutes === 0 && seconds === 0) {
					if (breaks) {
						setMinutes(25);
						setBreaks(false);
						setShortBreaks(false);
						setLongBreaks(false);
					} else {
						setMinutes(5);
						setBreaks(true);
						setShortBreaks(true);
						setLongBreaks(false);
					}
					setStart(true);
					setPause(true);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval.current);
		};
	});

	const durationProp = shortBreaks ? 375 : longBreaks ? 1125 : 1875;
	const colorProp = shortBreaks
		? [['#A30000', 0.33], ['#F7B801', 0.33], ['#004777']]
		: longBreaks
		? [['#F7B801', 0.33], ['#A30000', 0.33], ['#F7B801']]
		: [['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']];

	return (
		<div>
			<div className="container">
				<h1>Pomodoro</h1>
				<div className="buttons">
					<div
						className="button"
						onClick={() => {
							setMinutes(25);
							setSeconds(0);
							setPause(true);
							setShortBreaks(false);
							setLongBreaks(false);
							setReset((prevKey) => prevKey + 1);
						}}
						style={
							!shortBreaks && !longBreaks
								? { backgroundColor: '#1d1d1d', fontWeight: 'bold' }
								: { backgroundColor: '#131313' }
						}
					>
						Pomodoro
					</div>
					<div
						className="button"
						onClick={() => {
							setMinutes(5);
							setSeconds(0);
							setPause(true);
							setShortBreaks(true);
							setLongBreaks(false);
							setReset((prevKey) => prevKey + 1);
						}}
						style={
							shortBreaks
								? { backgroundColor: '#1d1d1d', fontWeight: 'bold' }
								: { backgroundColor: '#131313' }
						}
					>
						Short Break
					</div>
					<div
						className="button"
						onClick={() => {
							setMinutes(15);
							setSeconds(0);
							setPause(true);
							setShortBreaks(false);
							setLongBreaks(true);
							setReset((prevKey) => prevKey + 1);
						}}
						style={
							longBreaks
								? { backgroundColor: '#1d1d1d', fontWeight: 'bold' }
								: { backgroundColor: '#131313' }
						}
					>
						Long Break
					</div>
				</div>

				<div className="circle">
					<CountdownCircleTimer
						key={reset}
						isPlaying={start && !pause ? true : false}
						duration={durationProp}
						colors={colorProp}
						trailColor={'#333'}
						size={300}
					>
						<div className="time">
							{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
						</div>
					</CountdownCircleTimer>
				</div>

				<div className="buttons-bottom">
					<div className="button" onClick={handleClick}>
						{pause ? 'START' : 'PAUSE'}
					</div>

					<div className="button" onClick={handleReset}>
						RESET
					</div>
				</div>
			</div>
		</div>
	);
}
export default App;
