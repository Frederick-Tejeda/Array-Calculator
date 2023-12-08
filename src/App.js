import './App.css';
import { useState, useEffect } from 'react'
import * as math from 'mathjs'

var arrayA = [], arrayB = [];
var lengthArrayA = [undefined, undefined], lengthArrayB = [undefined, undefined];
var operation = '+';

function App() {
	
	const [newArrayA, setNewArrayA] = useState([])
	const [isArrayACreated, setIsArrayACreated] = useState(false);
	const [newArrayB, setNewArrayB] = useState([])
	const [isArrayBCreated, setIsArrayBCreated] = useState(false);
	const [newArrayC, setNewArrayC] = useState([])
	const [operationString, setOperationString] = useState('')
	const [operationResult, setOperationResult] = useState('')
	
	const CreateArrayA  = () => {		
		arrayA = [];
		
		if(Number(lengthArrayA[0]) < 1 || Number(lengthArrayA[1]) < 1) return;
		
		try{
			for(let y = 0; y <= Number(lengthArrayA[0]) - 1; y++){
				arrayA[y] = []
				for(let x = 0; x <= Number(lengthArrayA[1]) - 1; x++){
					if(isArrayACreated){
						arrayA[y][x] = (y >= newArrayA.length || x >= newArrayA[0].length) ? '0' : String(newArrayA[y][x])
					}
					else{
						arrayA[y][x] = '0';

					}
					setIsArrayACreated(true)
				}
			}
			setNewArrayA(arrayA)
			CreateArrayC()
		}catch(err){
			console.log(err)
		}
	}
	
	const CreateArrayB  = () => {
		arrayB = [];
		
		if(Number(lengthArrayB[0]) < 1 || Number(lengthArrayB[1]) < 1) return;
		
		try{
			for(let y = 0; y <= Number(lengthArrayB[0]) - 1; y++){
				arrayB[y] = []
				for(let x = 0; x <= Number(lengthArrayB[1]) - 1; x++){
					if(isArrayBCreated){
						arrayB[y][x] = (y >= newArrayB.length || x >= newArrayB[0].length) ? '0' : String(newArrayB[y][x])
					}else{
						arrayB[y][x] = '0';
					}
					setIsArrayBCreated(true)
				}
			}
			setNewArrayB(arrayB)
			CreateArrayC()
		}catch(err){
			console.log(err)
		}
	}
	
	const CreateArrayC = () => {
		
		try{

			if(Number(lengthArrayB[0]) && Number(lengthArrayB[1]) && Number(lengthArrayA[0]) && Number(lengthArrayA[1]) && (Number(lengthArrayB[1]) > 0 && Number(lengthArrayB[1]) > 0 && Number(lengthArrayA[0]) > 0 && Number(lengthArrayA[1]) > 0)){ 
				
				const [mA, mB] = [math.matrix(arrayA), math.matrix(arrayB)];	
				
				if(lengthArrayA[0] === lengthArrayB[0]){
					if(lengthArrayA[1] === lengthArrayB[1]){
						try{
						setNewArrayC((operation === '+') ? math.add(mA, mB) : (operation === '-') ? math.subtract(mA, mB) : math.multiply(mA, mB)); 
						}
						catch(err){
							console.log(err)
							console.log(`arrayA: ${arrayA} || arrayB: ${arrayB}`)
							setNewArrayC({"_data": "Invalid operation"})
						}
					}
					return
				}
				
				if(lengthArrayA[0] === lengthArrayB[1]){
					if(lengthArrayA[1] === lengthArrayB[0]){
						try{
						setNewArrayC((operation === '+') ? math.add(mA, mB) : (operation === '-') ? math.subtract(mA, mB) : math.multiply(mA, mB)); 
						}
						catch(err){
							console.log(err)
							setNewArrayC({"_data": "Invalid operation"})
						}	
					}
					return
				}
			}
		}catch(err){
			console.log(err)
		}
	}
	
	const AddToArrayA = (data, y, x) => {
		let currentArray = newArrayA
		currentArray[y][x] = (data === '') ? '0' : data
		setNewArrayA(currentArray)
		CreateArrayC()
	}
	
	const AddToArrayB = (data, y, x) => {
		let currentArray = newArrayB
		currentArray[y][x] = (data === '') ? '0' : data
		setNewArrayB(currentArray)
		CreateArrayC()
	}
	
	const SetOperation = (e) => {
		operation = e.target.value; 
		CreateArrayC(); 
	}
	
	useEffect(() => {
		setOperationString((operation === '+') ? 'A + B' : (operation === '-') ? 'A - B' : 'AB')
		setOperationResult((newArrayC['_size'] !== undefined) ? `${JSON.stringify(newArrayC._size[0])} x ${JSON.stringify(newArrayC._size[1])}` : '')
	}, [operation, newArrayC])
	
	
  return (
    <main>
		<div id="app">
			<section id="Arrays">
				<article>
					<div id="ArrayA" className="ArrayA-B" style={{height: '100%'}}>
						{arrayA.map((y, keyY) => (<div key={keyY}>{y.map((x, keyX) => (<input key={keyX} className="inputA" placeholder={x} onChange={(e) => AddToArrayA(e.target.value, keyY, keyX)}/>))}</div>))}
					</div>
				</article>
				<article>
					<div id="ArrayB" className="ArrayA-B">
						{arrayB.map((y, keyY) => (<div key={keyY}>{y.map((x, keyX) => (<input key={keyX} className="inputB" placeholder={x} onChange={(e) => AddToArrayB(e.target.value, keyY, keyX)}/>))}</div>))}
					</div>
				</article>
			</section>
			<section id="input-container">
				<article>
					<label>{'Matrix A '}
						<input type="text" placeholder="3" onChange={(e) => {lengthArrayA[0] = e.target.value; CreateArrayA()}} />
						{' X '}
						<input type="text" placeholder="2" onChange={(e) => {lengthArrayA[1] = e.target.value; CreateArrayA()}} />
					</label>
				</article>
				<article>
					<label>{'Matrix B '}
						<input type="text" placeholder="3" onChange={(e) => {lengthArrayB[0] = e.target.value; CreateArrayB()}} />
						{' X '}
						<input type="text" placeholder="2" onChange={(e) => {lengthArrayB[1] = e.target.value; CreateArrayB()}} />
					</label>
				</article>
			</section>
			<hr />
				<div id="operation-container">
					<p>Operation: </p> <select onChange={(e) => SetOperation(e)}>
						<option value="+">+</option>
						<option value="-">-</option>
						<option value="x">x</option>	
					</select>
				</div>
			<hr />
			<section id="result-array">
				<article>
						<div id="ArrayC" style={{display: 'grid', placeItems: 'center', gridTemplateColumns: `${(newArrayC["_size"] !== undefined) ? ' auto'.repeat(newArrayC._size[1]) : ' auto' }`}}>
							{(newArrayC["_data"] !== undefined) ? newArrayC._data.map((item, key) => item.map((i, key) => <div className="grid-item" key={key}>{i}</div>)) : ''}
						</div>
				</article>
				<div>
					<p>{operationString + ' = ' + operationResult}</p>
				</div>
			</section>
		</div>
    </main>
  );
}

export default App;
