import { swap } from "./utilities";

let array_length = 0;
export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length < 1) return array;
    heapSort(array, animations);
    return animations;
}
  
function heapify(arr, i, animations) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let max = i;
    if (left < array_length && arr[left] > arr[max]) {
        animations.push([[left, max], false]);
        animations.push([[left, max], false]);
        max = left;
    }
    if (right < array_length && arr[right] > arr[max]) {
        animations.push([[right, max], false]);
        animations.push([[right, max], false]);
        max = right;
    }
    if (max != i) {
        animations.push([[i, arr[max]], true]);
        animations.push([[max, arr[i]], true]);
        swap(arr, i, max);
        heapify(arr, max, animations);
    }
}
  
function heapSort(arr, animations) {
    array_length = arr.length;
    for (var i = Math.floor(array_length / 2); i >= 0; i--) {
        heapify(arr, i, animations);
    }
    for (i = arr.length - 1; i > 0; i--) {
        //animations.push([[i, 0], false]);
        animations.push([[0, i], false]);
        animations.push([[0, arr[i]], true]);
        animations.push([[i, arr[0]], true]);
        swap(arr, 0, i);  
        array_length--;
        heapify(arr, 0, animations);
    }
}

export const heapSortDescription = {
    title: 'Heap Sort',
    description: (
      <div>
        <p>
          "Heapsort is a comparison-based sorting algorithm. Similar to selection sort, 
          heapsort divides its input into a sorted and an unsorted region, 
          and it iteratively shrinks the unsorted region by extracting the 
          largest element from it and inserting it into the sorted region. 
          Unlike selection sort, heap sort maintains the unsorted 
          region in a heap data structure to more quickly find the largest 
          element in each step." 
          &nbsp;
          <a href="https://en.wikipedia.org/wiki/Heapsort">
            Wikipedia Link.
          </a>
        </p>
      </div>
    ),
    worstCase: (
      <span>
        Worst Time: O(<em>n</em> log <em>n</em>)
      </span>
    ),
    averageCase: (
      <span>
        Average Time: O(<em>n</em> log <em>n</em>)
      </span>
    ),
    bestCase: (
      <span>
        Best Time: O(<em>n</em> log <em>n</em>)
      </span>
    ),
    space: 
      <span>
      Space Complexity: O(1)
      </span>
  };


