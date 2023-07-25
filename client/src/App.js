import { useEffect, useState } from 'react';
import axiosInstance from './utils/axiosUtil';
import getError from './utils/error';

function MessageBox({ error }) {
	return (error ?
		<div className='mb-3 message-box'>
			{error}
		</div> :
		<></>
	)
}
function App() {
	const [result, setResult] = useState();
	const [error, setError] = useState("");
	const [input, setInput] = useState({
		symbol: "",
		date: null
	});

	const handleInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			setResult(null);

			const { data } = await axiosInstance.post("/fetchStockData", input);
			console.log({ data })
			if (data) {
				setResult(data);
			}
			else {
				setError(getError(error));
				console.log(getError(error));
			}
		} catch (error) {
			setError(getError(error));
			console.log(getError(error));
		}
	}
	return (
		<div className='container'>
			<div className='input-box'>
				<h3>Trade Statistic</h3>
				<MessageBox error={error} />
				<form onSubmit={submitHandler}>
					<div className='mb-3'>
						<label htmlFor='symbol'>Stock Symbol</label>
						<input placeholder='Enter Stock Symbol' name='symbol' value={input.symbol} onChange={handleInput} />
					</div>

					<div className='mb-3'>
						<label htmlFor='date'>Date</label>
						<input type='date' name='date' value={input.date} onChange={handleInput} />
					</div>

					<button className='submit-btn' type='submit'>Submit</button>
				</form>
			</div>
			{result &&
				<div className='output-box'>
					<div style={{ overflowX: "auto" }}>
						<table>
							<caption>Daily Stock</caption>
							<thead>
								<tr>
									<th>Fields</th>
									<th>Data</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>Open</th>
									<td>{result.open}</td>
								</tr>
								<tr>
									<th>Close</th>
									<td>{result.close}</td>
								</tr>
								<tr>
									<th>High</th>
									<td>{result.high}</td>
								</tr>
								<tr>
									<th>Low</th>
									<td>{result.low}</td>
								</tr>
								<tr>
									<th>Volumne</th>
									<td>{result.volume}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			}
		</div>
	);
}

export default App;