import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Define different sorting algorithms
type SortingAlgorithm = 'bubble' | 'merge' | 'quick';

const SortingVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [speed, setSpeed] = useState(50); // Higher value means slower
  const [arraySize, setArraySize] = useState(20);
  
  const timeoutIds = useRef<number[]>([]);
  
  // Initialize array
  useEffect(() => {
    resetArray();
    // Clear any running animations when component unmounts
    return () => {
      timeoutIds.current.forEach(id => clearTimeout(id));
    };
  }, [arraySize]);

  const resetArray = () => {
    // Clear any running animations
    timeoutIds.current.forEach(id => clearTimeout(id));
    timeoutIds.current = [];
    
    // Create new random array
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 100));
    }
    setArray(newArray);
    setCompleted(false);
  };

  const randomIntFromInterval = (min: number, max: number) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const bubbleSort = () => {
    setSorting(true);
    const arrayCopy = [...array];
    const animations = [];

    for (let i = 0; i < arrayCopy.length; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        // Current elements being compared
        animations.push([j, j + 1, false]); // Comparison
        
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
          animations.push([j, j + 1, true]); // Swap
        }
      }
    }

    const animationSpeed = 101 - speed;
    
    for (let i = 0; i < animations.length; i++) {
      const timeoutId = setTimeout(() => {
        const [first, second, isSwap] = animations[i];
        
        if (isSwap) {
          // Swap elements
          setArray(prevArray => {
            const newArray = [...prevArray];
            [newArray[first], newArray[second]] = [newArray[second], newArray[first]];
            return newArray;
          });
        }
        
        // Mark as completed after the last animation
        if (i === animations.length - 1) {
          setSorting(false);
          setCompleted(true);
        }
      }, i * animationSpeed);
      
      timeoutIds.current.push(timeoutId);
    }
  };

  const mergeSort = () => {
    setSorting(true);
    const arrayCopy = [...array];
    const animations: [number, number, boolean][] = [];
    
    // Helper function to merge two subarrays
    const merge = (arr: number[], left: number, mid: number, right: number) => {
      const leftSubarrayLength = mid - left + 1;
      const rightSubarrayLength = right - mid;
      
      // Create temporary subarrays
      const leftSubarray = new Array(leftSubarrayLength);
      const rightSubarray = new Array(rightSubarrayLength);
      
      // Copy data to temporary subarrays
      for (let i = 0; i < leftSubarrayLength; i++) {
        leftSubarray[i] = arr[left + i];
      }
      for (let j = 0; j < rightSubarrayLength; j++) {
        rightSubarray[j] = arr[mid + 1 + j];
      }
      
      // Merge the temporary subarrays back into arr
      let i = 0, j = 0, k = left;
      
      while (i < leftSubarrayLength && j < rightSubarrayLength) {
        animations.push([left + i, mid + 1 + j, false]); // Compare
        
        if (leftSubarray[i] <= rightSubarray[j]) {
          animations.push([k, leftSubarray[i], true]); // Replace
          arr[k] = leftSubarray[i];
          i++;
        } else {
          animations.push([k, rightSubarray[j], true]); // Replace
          arr[k] = rightSubarray[j];
          j++;
        }
        k++;
      }
      
      // Copy the remaining elements of leftSubarray, if any
      while (i < leftSubarrayLength) {
        animations.push([k, leftSubarray[i], true]); // Replace
        arr[k] = leftSubarray[i];
        i++;
        k++;
      }
      
      // Copy the remaining elements of rightSubarray, if any
      while (j < rightSubarrayLength) {
        animations.push([k, rightSubarray[j], true]); // Replace
        arr[k] = rightSubarray[j];
        j++;
        k++;
      }
    };
    
    // Main recursive merge sort function
    const mergeSortHelper = (arr: number[], left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        mergeSortHelper(arr, left, mid);
        mergeSortHelper(arr, mid + 1, right);
        
        merge(arr, left, mid, right);
      }
    };
    
    mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1);
    
    const animationSpeed = 101 - speed;

    for (let i = 0; i < animations.length; i++) {
      const timeoutId = setTimeout(() => {
        const [first, second, isSwap] = animations[i];
        
        if (isSwap) {
          // Update the value at index
          setArray(prevArray => {
            const newArray = [...prevArray];
            newArray[first] = second as number;
            return newArray;
          });
        }
        
        // Mark as completed after the last animation
        if (i === animations.length - 1) {
          setSorting(false);
          setCompleted(true);
        }
      }, i * animationSpeed);
      
      timeoutIds.current.push(timeoutId);
    }
  };

  const quickSort = () => {
    setSorting(true);
    const arrayCopy = [...array];
    const animations: [number, number, boolean][] = [];
    
    // Quick sort helper function
    const partition = (arr: number[], low: number, high: number) => {
      // Taking the last element as pivot
      const pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        animations.push([j, high, false]); // Compare with pivot
        
        if (arr[j] <= pivot) {
          i++;
          
          // Swap elements
          animations.push([i, j, true]); // Swap
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      
      // Swap pivot to its correct position
      animations.push([i + 1, high, true]); // Swap
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      
      return i + 1; // Return pivot position
    };
    
    // Main recursive quick sort function
    const quickSortHelper = (arr: number[], low: number, high: number) => {
      if (low < high) {
        const pivotIndex = partition(arr, low, high);
        
        quickSortHelper(arr, low, pivotIndex - 1);
        quickSortHelper(arr, pivotIndex + 1, high);
      }
    };
    
    quickSortHelper(arrayCopy, 0, arrayCopy.length - 1);
    
    const animationSpeed = 101 - speed;
    
    for (let i = 0; i < animations.length; i++) {
      const timeoutId = setTimeout(() => {
        const [first, second, isSwap] = animations[i];
        
        if (isSwap) {
          // Swap elements
          setArray(prevArray => {
            const newArray = [...prevArray];
            [newArray[first], newArray[second]] = [newArray[second], newArray[first]];
            return newArray;
          });
        }
        
        // Mark as completed after the last animation
        if (i === animations.length - 1) {
          setSorting(false);
          setCompleted(true);
        }
      }, i * animationSpeed);
      
      timeoutIds.current.push(timeoutId);
    }
  };

  const startSorting = () => {
    resetArray();
    setCompleted(false);
    
    // Wait a bit to let the array reset before starting
    setTimeout(() => {
      if (algorithm === 'bubble') bubbleSort();
      else if (algorithm === 'merge') mergeSort();
      else if (algorithm === 'quick') quickSort();
    }, 100);
  };

  return (
    <div className="flex flex-col">
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as SortingAlgorithm)}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary dark:text-white"
            disabled={sorting}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
          
          <div className="flex items-center">
            <label htmlFor="speed" className="mr-2 text-sm">Speed:</label>
            <input
              id="speed"
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="accent-accent"
              disabled={sorting}
            />
          </div>
          
          <div className="flex items-center">
            <label htmlFor="size" className="mr-2 text-sm">Size:</label>
            <input
              id="size"
              type="range"
              min="5"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              className="accent-accent"
              disabled={sorting}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={resetArray}
            disabled={sorting}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50"
          >
            Reset
          </button>
          
          <button
            onClick={startSorting}
            disabled={sorting}
            className="px-4 py-2 rounded-md bg-accent text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Sort
          </button>
        </div>
      </div>
      
      {/* Visualization */}
      <div className="h-64 flex items-end justify-center gap-1 border-b border-gray-300 dark:border-gray-600 relative">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            className={`w-full ${
              completed ? 'bg-green-400 dark:bg-green-600' : 'bg-accent'
            }`}
            style={{ height: `${value}%` }}
            animate={{ height: `${value}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        ))}
      </div>
      
      {/* Algorithm description */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <h4 className="font-semibold mb-2">
          {algorithm === 'bubble' && 'Bubble Sort'}
          {algorithm === 'merge' && 'Merge Sort'}
          {algorithm === 'quick' && 'Quick Sort'}
        </h4>
        
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {algorithm === 'bubble' && (
            'Bubble Sort works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. Time Complexity: O(n²)'
          )}
          {algorithm === 'merge' && (
            'Merge Sort divides the array into halves, sorts each half, then merges them back together. It uses the "divide and conquer" strategy. Time Complexity: O(n log n)'
          )}
          {algorithm === 'quick' && (
            'Quick Sort selects a "pivot" element and partitions the array around it. Elements less than the pivot go before it, while elements greater go after. Time Complexity: O(n log n) average case, O(n²) worst case'
          )}
        </p>
      </div>
    </div>
  );
};

export default SortingVisualizer; 