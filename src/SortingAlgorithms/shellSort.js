export function getShellSortAnimations(arr) {

    const array = [...arr];
    const animations = [];
    var len = array.length;
    var h = 1;
    while (h < len / 2) {
        h = 2 * h + 1;
    }
    while (h > 0) {
        for (var i = h; i < len; i++) {
            for (var j = i; j > 0 && array[j] < array[j - h]; j -= h) {                
                animations.push([[j, j-h], false]);
                animations.push([[j, array[j-h]], true]);
                animations.push([[j-h, array[j]], true]);
                array[j] = [array[j - h], (array[j - h] = array[j])][0];
            }
        }
        h = Math.floor(h / 2);
    }
  return animations;
}


export const shellSortDescription = {
    title: 'Shell Sort',
    description: (
      <div>
        <p>
          "Shellsort is an in-place 
          comparison sort. 
          The method starts by sorting pairs of elements far apart from each other, 
          then progressively reducing the gap between elements to be compared. 
          By starting with far apart elements, it can move some out-of-place 
          elements into position faster than a simple nearest neighbor exchange." 
          &nbsp;
          <a href="https://en.wikipedia.org/wiki/Shellsort">
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
        Average Time: O(<em>n</em> log<sup>2</sup> <em>n</em>)
      </span> 
    ),
    bestCase: (
      <span>
        Best Time: O(<em>n</em> log<sup>2</sup> <em>n</em>)
      </span>
    ),
    space: 
      <span>
      Space Complexity: O(1)
      </span>
  };