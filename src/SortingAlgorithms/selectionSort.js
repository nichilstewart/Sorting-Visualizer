import { swap } from "./utilities";

export function getSelectionSortAnimations(array){
    const copy = [...array];

    const animations=[];
    for (let i=0;i<copy.length-1;i++) {
        var minind=i;
        for (let j=i+1;j<copy.length;j++) {
            animations.push([[minind, j], false]);
            if (copy[j]<copy[minind]) {
                minind=j;
            }
        }
        if (minind !== i) {
            swap(copy, i, minind);
            animations.push([[i, copy[i]], true]);
            animations.push([[minind, copy[minind]], true]);
        }
    }
    return animations;
}

export const selectionSortDescription = {
    title: 'Selection Sort',
    description: (
      <div>
        <p>
         "Selection sort is an in-place comparison sorting algorithm. The 
         algorithm divides the input list into a sorted sublist of items built
         from left to right at the front of the list and a sublist of 
         the remaining unsorted items. The 
         algorithm functions by finding the smallest
         element in the unsorted sublist, swapping it with the leftmost unsorted 
         element, and moving the sublist boundaries one element 
         to the right."
          &nbsp;
          <a href="https://en.wikipedia.org/wiki/Selection_sort">
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
        Best Time: O(<em>n</em><sup>2</sup>)
      </span>
    ),
    space: 
      <span>
      Space Complexity: O(1)
      </span>
  };