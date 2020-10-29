import { swap } from "./utilities";

export function getInsertionSortAnimations(arr) {
  const copy = [...arr];
  const animations = [];
  for (let i = 1; i < copy.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      animations.push([[j, j + 1], false]);
      if (copy[j + 1] < copy[j]) {
        animations.push([[j, copy[j + 1]], true]);
        animations.push([[j + 1, copy[j]], true]);
        swap(copy, j, j + 1);
      } else break;
    }
  }
  return animations;
}

export const insertionSortDescription = {
  title: 'Insertion Sort',
  description: (
    <div>
      <p>
        "Insertion sort is a simple sorting algorithm that builds the final 
        sorted array (or list) one item at a time. Insertion sort iterates, 
        consuming one input element each repetition, and growing a sorted 
        output list. At each iteration, insertion sort removes one element 
        from the input data, finds the location it belongs within the sorted 
        list, and inserts it there. It repeats until no input elements remain." 
        &nbsp;
        <a href="https://en.wikipedia.org/wiki/Insertion_sort">
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
      Average Time: O(<em>n</em><sup>2</sup>)
    </span>
  ),
  bestCase: (
    <span>
      Best Time: O(<em>n</em>)
    </span>
  ),
  space: 
    <span>
    Space Complexity: O(1)
    </span>
};