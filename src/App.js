import './App.css';
import { useState, useEffect } from 'react'
import * as math from 'mathjs'

	var arrayA = [], arrayB = []
	var lengthArrayA = [undefined, undefined], lengthArrayB = [undefined, undefined]
	var operation = '+'

function App() {
	
	const [newArrayA, setNewArrayA] = useState([])
	const [newArrayB, setNewArrayB] = useState([])
	const [newArrayC, setNewArrayC] = useState([])
	const [operationString, setOperationString] = useState('')
	const [operationResult, setOperationResult] = useState('')
	
	
	
	const CreateArrayA  = () =>{		
		arrayA = []
		
		if(Number(lengthArrayA[0]) < 1 || Number(lengthArrayA[1]) < 1) return 
		
		for(let y = 0; y <= Number(lengthArrayA[0]) - 1; y++){
			arrayA[y] = []
			for(let x = 0; x <= Number(lengthArrayA[1]) - 1; x++){
				arrayA[y][x] = '0'
			}
			console.log('arrayA', arrayA)
		}
		setNewArrayA(arrayA)
		console.log(`arrayA: ${arrayA} || newArrayA: ${newArrayA}`)
		CreateArrayC()
	}
	
	const CreateArrayB  = () =>{
		arrayB = []
		
		if(Number(lengthArrayB[0]) < 1 || Number(lengthArrayB[1]) < 1) return 
		
		for(let y = 0; y <= Number(lengthArrayB[0]) - 1; y++){
			arrayB[y] = []
			for(let x = 0; x <= Number(lengthArrayB[1]) - 1; x++){
				arrayB[y][x] = 0
			}
			console.log('arrayB', arrayB)
		}
		setNewArrayB(arrayB)
		console.log(`arrayB: ${arrayB} || newArrayB: ${newArrayB}`)
		CreateArrayC()
	}
	
	const CreateArrayC = () => {
		
		console.log('inputs', document.getElementsByClassName('input'))
		if(Number(lengthArrayB[0]) && Number(lengthArrayB[1]) && Number(lengthArrayA[0]) && Number(lengthArrayA[1]) && (Number(lengthArrayB[1]) > 0 && Number(lengthArrayB[1]) > 0 && Number(lengthArrayA[0]) > 0 && Number(lengthArrayA[1]) > 0)){ 
			
			console.log(`arrayA: ${arrayA} || arrayB: ${arrayB}`)
			
			const mA = math.matrix(arrayA);
			const mB = math.matrix(arrayB);	
			
			if(lengthArrayA[0] === lengthArrayB[0]){
				if(lengthArrayA[1] === lengthArrayB[1]){
					try{
					setNewArrayC((operation === '+') ? math.add(mA, mB) : (operation === '-') ? math.subtract(mA, mB) : (operation === 'x') ? math.multiply(mA, mB) : math.divide(mA, mB)); 
					console.log((operation === '+') ? math.add(mA, mB) : (operation === '-') ? math.subtract(mA, mB) : (operation === 'x') ? math.multiply(mA, mB) : math.divide(mA, mB))
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
					setNewArrayC((operation === '+') ? math.add(mA, mB) : (operation === '-') ? math.subtract(mA, mB) : (operation === 'x') ? math.multiply(mA, mB) : math.divide(mA, mB)); 
					console.log((operation === '+') ? math.add(mA, mB) : (operation === '-') ? math.subtract(mA, mB) : (operation === 'x') ? math.multiply(mA, mB) : math.divide(mA, mB))
					}
					catch(err){
						console.log(err)
						console.log(`arrayA: ${arrayA} || arrayB: ${arrayB}`)
						setNewArrayC({"_data": "Invalid operation"})
					}
					
				}
				return
			}
			/*
			console.log(`CreateC. arrayA: ${arrayA} || arrayB: ${arrayB}`)
			
			const mA = math.matrix(arrayA);
			const mB = math.matrix(arrayB);
			
			try{
				setNewArrayC((operation === '+') ? math.add(mA, mB) : (operation === '-') ? math.subtract(mA, mB) : (operation === 'x') ? math.multiply(mA, mB) : math.divide(mA, mB)); 
				console.log((operation === '+') ? math.add(mA, mB) : (operation === '-') ? math.subtract(mA, mB) : (operation === 'x') ? math.multiply(mA, mB) : math.divide(mA, mB))
			}
			catch(err){
				console.log(err)
				console.log(`arrayA: ${arrayA} || arrayB: ${arrayB}`)
			}
		}*/
		}
	}
	
	const AddToArrayA = (data, y, x) => {
		let currentArray = newArrayA
		currentArray[y][x] = (data === '') ? '0' : data
		setNewArrayA(currentArray)
		console.log('currentArray', currentArray)
		CreateArrayC()
	}
	
	const AddToArrayB = (data, y, x) => {
		let currentArray = newArrayB
		currentArray[y][x] = (data === '') ? '0' : data
		setNewArrayB(currentArray)
		console.log('currentArray', currentArray)
		CreateArrayC()
	}
	
	const SetOperation = (e) => {
		operation = e.target.value; 
		CreateArrayC(); 
		console.log(e.target.value)}
	
	useEffect(() => {
		setOperationString((operation === '+') ? 'A+B' : (operation === '-') ? 'A-B' : (operation === 'x') ? 'AB' : 'A/B')
		console.log("newArrayC['_size[0]']", newArrayC['_size[0]'])
		setOperationResult((newArrayC['_size'] !== undefined) ? `${JSON.stringify(newArrayC._size[0])} x ${JSON.stringify(newArrayC._size[1])}` : 'nothing')
	}, [operation, newArrayC])
	
	
  return (
    <main>
		<div id="app">
			<section id="Arrays">
				<article>
					<div id="ArrayA" className="ArrayA-B" style={{height: '100%'}}>
						{arrayA.map((y, keyY) => (<div key={keyY}>{y.map((x, keyX) => (<input key={keyX} className="input" placeholder={x} onChange={(e) => AddToArrayA(e.target.value, keyY, keyX)}/>))}</div>))}
						{/*JSON.stringify(newArrayA)*/}
					</div>
				</article>
				<article>
					<div id="ArrayB" className="ArrayA-B">
						{arrayB.map((y, keyY) => (<div key={keyY}>{y.map((x, keyX) => (<input key={keyX} className="input" placeholder={x} onChange={(e) => AddToArrayB(e.target.value, keyY, keyX)}/>))}</div>))}
						{/*JSON.stringify(newArrayB)*/}
					</div>
				</article>
			</section>
			<section id="input-container">
				<article>
					<label>Matrix A
						<input type="text" placeholder="3" onChange={(e) => {lengthArrayA[0] = e.target.value; console.log('lengthArrayA', lengthArrayA); CreateArrayA()}} />
						X
						<input type="text" placeholder="2" onChange={(e) => {lengthArrayA[1] = e.target.value; console.log('lengthArrayA', lengthArrayA); CreateArrayA()}} />
					</label>
				</article>
				<article>
					<label>Matrix B
						<input type="text" placeholder="3" onChange={(e) => {lengthArrayB[0] = e.target.value; console.log('lengthArrayB', lengthArrayB); CreateArrayB()}} />
						X
						<input type="text" placeholder="2" onChange={(e) => {lengthArrayB[1] = e.target.value; console.log('lengthArrayB', lengthArrayB); CreateArrayB()}} />
					</label>
				</article>
			</section>
			<hr />
				<div id="operation-container">
					<p>Operation: </p> <select onChange={(e) => SetOperation(e)}>
						<option value="+">+</option>
						<option value="-">-</option>
						<option value="x">x</option>
						<option value="/">/</option>
					</select>
				</div>
			<hr />
			<section id="result-array">
				<article>
					<div id="ArrayC">
						<div id="grid-container" style={{display: 'grid', backgroundColor: '#2196F3', gridTemplateColumns: `${(newArrayC["_size"] !== undefined) ? ' auto'.repeat(newArrayC._size[1]) : ' auto' }`}}>
							{/*JSON.stringify(newArrayC._data)*/}
							{(newArrayC["_data"] !== undefined) ? newArrayC._data.map((item, key) => item.map((i, key) => <div className="grid-item" key={key}>{i}</div>)) : 'nothing'}
						</div>
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
