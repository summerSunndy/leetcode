/*
1. 两数——target - arr [I], 对其存成map，可map[target - arr[I]] 对应的是其数组下标
2. 三数——a + b + c = 0; 先对其进行排序，c = - (a + b)，从两端开始找符合条件的a,b； a+b+c<0 向后；>0 从后向前
*/
function three_add(nums){
  const len = nums.length
  if( len < 3 ) return []
  let result = []
  nums = nums.sort();
  for(let i = 0; i < len - 2; i++){
    if(nums[i]>0) break;
    // 去掉重复的起点
    if( i > 0 && nums[i] == nums[i-1]){
      continue
    }
    let left = i + 1
    let right = len - 1
    while(left < right){
      let sum = nums[left] + nums[right] + nums[i]
      if(sum == 0){
        result.push([nums[i], nums[left], nums[right]])
        // 去掉重复的左右点
        while(left < right && nums[left] == nums[left + 1]){
          left++
        }
        while(left < right && nums[right] == nums[right - 1]){
          right--
        }
        left++
        right--
      }else if(sum > 0){
        right--
      }else{
        left++
      }
    }
  }
  return result;
}

// console.log(three_add([-1,0,1,2,-1,-4]))
console.log(three_add([-1,0,1,2,-1,-4,-2,-3,3,0,4]))

function four_add(nums, target){
  const len = nums.length
  if( len < 4 ) return []
  let result = []
  nums = nums.sort();
  for(let i = 0; i < len - 3; i++){
    if( i > 0 && nums[i] == nums[i-1]){
      continue
    }
    const min = nums[i] + nums[i+1] + nums[i+2] + nums[i+3]
    if(min>target) break;
    const max = nums[len-4] + nums[len-3] + nums[len-2] + nums[len-1]
    if(max<target) break;
    // 去掉重复的起点
    for( let j = i + 1; j< len - 2; j++){
      // 去看重复起点？
      if(j > i+1 && nums[j] == nums[j-1]){
        continue;
      }
      const min = nums[i] + nums[j] + nums[j+1] + nums[j+2]
      if(min>target) break;
      const max = nums[i] + nums[len-3] + nums[len-2] + nums[len-1]
      if(max<target) break;
      let left = i + 1
      let right = len - 1
      while(left < right){
        let sum = nums[left] + nums[right] + nums[i] + nums[j]
        if(sum == target){
          result.push([nums[i], nums[j], nums[left], nums[right]])
          // 去掉重复的左右点
          while(left < right && nums[left] == nums[left + 1]){
            left++
          }
          while(left < right && nums[right] == nums[right - 1]){
            right--
          }
          left++
          right--
        }else if(sum > 0){
          right--
        }else{
          left++
        }
      }
    }
  }
  return result;
}
