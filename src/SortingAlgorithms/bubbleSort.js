import { swap } from "./utilities";

export function getBubbleSortAnimations(array) {
    const animations = [];
    const copy = [...array];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, animations, copy);
    return animations;
}

function bubbleSortHelper(array, animations, copy) {
    let len = copy.length;
    for (let i = 0; i < len-2; i++) {
        for (let j = 0; j < len-i-1; j++) {   

            animations.push([[j, j+1], false]);

            if (copy[j] > copy[j+1]) {
                swap(copy, j, j+1);
            }     
            animations.push([[j, copy[j]], true]);
            animations.push([[j+1, copy[j+1]], true]);
        }
    }
}

export const bubbleSortDescription = {
    title: 'Bubble Sort',
    description: (
      <div>
        <p>
          "Bubble sort is a simple 
          sorting algorithm that repeatedly steps through the list, compares 
          adjacent elements and swaps them if they are in the wrong order. 
          The pass through the list is repeated until the list is sorted. 
          The algorithm, which is a comparison sort, is named for the way 
          smaller or larger elements "bubble" to the top of the list." 
          &nbsp;
          <a href="https://en.wikipedia.org/wiki/Bubble_sort">
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