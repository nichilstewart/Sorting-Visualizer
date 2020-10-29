import { swap } from './utilities';

export function getQuickSortAnimations(arr) {
  const copy = [...arr];
  const animations = [];
  quickSortHelper(copy, 0, copy.length - 1, animations);
  return animations;
}

function quickSortHelper(arr, left, right, animations) {
  if (right <= left) return;
  const part = partition(arr, left, right, animations);
  quickSortHelper(arr, left, part, animations);
  quickSortHelper(arr, part + 1, right, animations);
}

function partition(arr, left, right, animations) {
  let i = left;
  let j = right + 1;
  const pivot = arr[left];
  while (true) {
    while (arr[++i] <= pivot) {
      if (i === right) break;
      animations.push([[i], false]);
    }
    while (arr[--j] >= pivot) {
      if (j === left) break;
      animations.push([[j], false]);
    }
    if (j <= i) break;
    animations.push([[i, arr[j]], true]);
    animations.push([[j, arr[i]], true]);
    swap(arr, i, j);
  }
  animations.push([[left, arr[j]], true]);
  animations.push([[j, arr[left]], true]);
  swap(arr, left, j);
  return j;
}

export const quickSortDescription = {
  title: 'Quick Sort',
  description: (
    <div>
      <p>
        "Quicksort is a divide-and-conquer algorithm. It works by selecting a
         'pivot' element from the array and partitioning the other elements 
         into two sub-arrays, according to whether they are less than or greater
          than the pivot. The sub-arrays are then sorted recursively. This can 
          be done in-place, requiring small additional amounts of memory to 
          perform the sorting."
        &nbsp;
        <a href="https://en.wikipedia.org/wiki/Quicksort">
          Wikipedia Link.
        </a>
      </p>
    </div>
  ),
  worstCase: (
    <span>
      Worst Time: O(<em>n</em><sup>2</sup>)
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
    Space Complexity: O(log <em>n</em>)
    </span>
};