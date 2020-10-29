import React, { useState, useEffect, useRef } from 'react';
import './SortingVisualizer.css';
import { swap } from "../SortingAlgorithms/utilities";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

//get algorithm animation arrays
import { getQuickSortAnimations } from '../SortingAlgorithms/quickSort';
import { getInsertionSortAnimations } from '../SortingAlgorithms/insertionSort';
import { getMergeSortAnimations } from '../SortingAlgorithms/mergeSort';
import { getBubbleSortAnimations } from '../SortingAlgorithms/bubbleSort';
import { getHeapSortAnimations } from '../SortingAlgorithms/heapSort';
import { getSelectionSortAnimations } from '../SortingAlgorithms/selectionSort';
import { getShellSortAnimations } from '../SortingAlgorithms/shellSort';
import { getShakerSortAnimations } from '../SortingAlgorithms/shakerSort';

//get algorithm descriptions
import { baseTextDescription } from '../SortingAlgorithms/baseText';
import { bubbleSortDescription } from '../SortingAlgorithms/bubbleSort';
import { selectionSortDescription } from '../SortingAlgorithms/selectionSort';
import { insertionSortDescription } from '../SortingAlgorithms/insertionSort';
import { mergeSortDescription } from '../SortingAlgorithms/mergeSort';
import { quickSortDescription } from '../SortingAlgorithms/quickSort';
import { heapSortDescription } from '../SortingAlgorithms/heapSort';
import { shellSortDescription } from '../SortingAlgorithms/shellSort';
import { shakerSortDescription } from '../SortingAlgorithms/shakerSort';



const ARR_LEN = 100;
const MIN_NUM = 5;
const MAX_NUM = 400;
const DELAY = 5;
const ACCESSED_COLOUR = 'skyblue';
const SORTED_COLOUR = 'darkorange';
let desc = 'initial';


export default function SortVisualizer(props) {
  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef(null);

  let ALGORITHM_DESC = {
    'initial': baseTextDescription,
    'bubbleSort': bubbleSortDescription,
    'selectionSort': selectionSortDescription,
    'insertionSort': insertionSortDescription,
    'mergeSort': mergeSortDescription,
    'quickSort': quickSortDescription,
    'heapSort': heapSortDescription,
    'shellSort': shellSortDescription,
    'shakerSort': shakerSortDescription,
  };

  useEffect(initialiseArray, []);

  function initialiseArray() {
    if (isSorting) return;
    if (isSorted) resetArrayColour();
    setIsSorted(false);
    const arr = [];
    for (let i = 0; i < ARR_LEN; i++) {
      arr.push((MAX_NUM - MIN_NUM) * (i / ARR_LEN) + MIN_NUM);
    }
    shuffle(arr);
    setArr(arr);
    desc = 'initial';
  }

  function mergeSort() {
    desc = 'mergeSort';
    const animations = getMergeSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function insertionSort() {
    desc = 'insertionSort';
    const animations = getInsertionSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function quickSort() {
    desc = 'quickSort';
    const animations = getQuickSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function bubbleSort() {
    desc = 'bubbleSort';
    const animations = getBubbleSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function heapSort() {
    desc = 'heapSort';
    const animations = getHeapSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function selectionSort() {
    desc = 'selectionSort';
    const animations = getSelectionSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function shellSort() {
    desc = 'shellSort';
    const animations = getShellSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function shakerSort() {
    desc = 'shakerSort';
    const animations = getShakerSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function animateArrayUpdate(animations) {
    if (isSorting) return;
    setIsSorting(true);
    animations.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          } else {
            const [i] = comparison;
            animateArrayAccess(i);
          }
        } else {
          setArr((prevArr) => {
            const [k, newValue] = comparison;
            const newArr = [...prevArr];
            newArr[k] = newValue;
            return newArr;
          });
        }
      }, index * DELAY);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * DELAY);
  }

  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, DELAY);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = '';
    }, DELAY * 2);
  }

  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOUR),
        i * DELAY,
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrayBars.length * DELAY);
  }

  function resetArrayColour() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = '';
    }
  }

  return (
    <div className="body">
        <div className="header">
            Sorting Algorithm Visualizer &nbsp;
            <button className="btn-alt btn-1" onClick={initialiseArray}>Reset Array</button>
            <button className="btn btn-1" onClick={mergeSort}>Merge Sort</button>
            <button className="btn btn-1" onClick={quickSort}>Quick Sort</button>
            <button className="btn btn-1" onClick={heapSort}>Heap Sort</button>
            <button className="btn btn-1" onClick={insertionSort}>Insertion Sort</button>
            <button className="btn btn-1" onClick={selectionSort}>Selection Sort</button>
            <button className="btn btn-1" onClick={bubbleSort}>Bubble Sort</button>
            <button className="btn btn-1" onClick={shellSort}>Shell Sort</button>
            <button className="btn btn-1" onClick={shakerSort}>Shaker Sort</button>
        </div> 
        <div className="array-container" ref={containerRef}>
            {arr.map((barHeight, index) => (
                <div
                    className="array-bar"
                    style={{
                    height: `${barHeight}px`,
                    }}
                    key={index}
                ></div>
            ))}
        </div>
        <div className='text-description'>
          <div className='child-div'>
                <h2>{ALGORITHM_DESC[desc].title}</h2>
                {ALGORITHM_DESC[desc].description}
                <Container className ='time-box'>
                  <Row>
                    <Col>{ALGORITHM_DESC[desc].worstCase}</Col>
                    <Col>{ALGORITHM_DESC[desc].averageCase}</Col>
                    <Col>{ALGORITHM_DESC[desc].bestCase}</Col>
                    <Col>{ALGORITHM_DESC[desc].space}</Col>
                  </Row>
                </Container>
          </div>
        </div>
        
        <div className='footer'>
          <Container>
            <Row className="justify-content-md-center">
                  <Col xs lg="2" style={{color: "white"}}>Nichil Stewart</Col>
                  <Col xs lg="1"><a href="https://github.com/nichilstewart">GitHub</a></Col>
                  <Col xs lg="1"><a href="https://www.linkedin.com/in/nichil-stewart-33369397/">LinkedIn</a></Col>
                  <Col xs lg="1"><a href="mailto:nichilst@usc.edu">Email</a></Col>
              </Row>
          </Container>
        </div>
    </div>
  );
}

const shuffle = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    swap(arr, i, randomIndex);
  }
};