import { swap } from "./utilities";

export function getShakerSortAnimations(array) {
    const arr = [...array];
    let animations = [];
    animations = generateShakerSortAnimations(arr, animations);
    return animations;
}
  
function generateShakerSortAnimations(arr, animations) {
    var swapped;
    do {
        for (var i = 0; i < arr.length - 2; i++) {
            if (arr[i] > arr[i + 1]) {
                animations.push([[i, i+1], false]);
                animations.push([[i, arr[i+1]], true]);
                animations.push([[i, i+1], false]);
                animations.push([[i+1, arr[i]], true]);
                swap(arr, i, i+1);
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
        swapped = false;
        for (i = arr.length - 2; i > 0; i--) {
            if (arr[i] > arr[i + 1]) {
                animations.push([[i, i+1], false]);
                animations.push([[i, arr[i+1]], true]);
                animations.push([[i, i+1], false]);
                animations.push([[i+1, arr[i]], true]);
                swap(arr, i, i+1);
                swapped = true;
            }
        }
    } while (swapped);
    return animations;
}

export const shakerSortDescription = {
    title: 'Shaker Sort',
    description: (
      <div>
        <p>
            "Shaker sort, also known as cocktail shaker sort, 
            is an extension of bubble sort. The algorithm extends bubble sort by 
            operating in two directions. While it improves on bubble sort by more 
            quickly moving items to the beginning of the list, it provides only 
            marginal performance improvements."
          &nbsp;
          <a href="https://en.wikipedia.org/wiki/Cocktail_shaker_sort">
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