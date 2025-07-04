// Default code templates
const DEFAULT_CODE = {
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test the function
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]`,

  python: `def two_sum(nums, target):
    """
    Find two numbers in the array that add up to target.
    
    Args:
        nums: List of integers
        target: Target sum
        
    Returns:
        List of two indices
    """
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
            
        num_map[num] = i
    
    return []

# Test the function
print(two_sum([2, 7, 11, 15], 9))  # Expected: [0, 1]`,

  java: `import java.util.*;

class Solution {
    /**
     * Find two numbers in the array that add up to target.
     * 
     * @param nums Array of integers
     * @param target Target sum
     * @return Array of two indices
     */
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] result = solution.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result)); // Expected: [0, 1]
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    /**
     * Find two numbers in the array that add up to target.
     * 
     * @param nums Vector of integers
     * @param target Target sum
     * @return Vector of two indices
     */
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            
            map[nums[i]] = i;
        }
        
        return {};
    }
};

int main() {
    Solution solution;
    vector<int> nums = {2, 7, 11, 15};
    vector<int> result = solution.twoSum(nums, 9);
    
    cout << "[" << result[0] << ", " << result[1] << "]" << endl; // Expected: [0, 1]
    return 0;
}`,

  c: `#include <stdio.h>
#include <stdlib.h>

/**
 * Find two numbers in the array that add up to target.
 * 
 * @param nums Array of integers
 * @param numsSize Size of the array
 * @param target Target sum
 * @param returnSize Pointer to return the size of result
 * @return Array of two indices
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    
    // Simple O(n²) approach for demonstration
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    
    *returnSize = 0;
    return NULL;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int target = 9;
    int returnSize;
    
    int* result = twoSum(nums, 4, target, &returnSize);
    
    if (result != NULL) {
        printf("[%d, %d]\\n", result[0], result[1]); // Expected: [0, 1]
        free(result);
    }
    
    return 0;
}`,

  typescript: `/**
 * Find two numbers in the array that add up to target.
 */
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test the function
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]`,

  go: `package main

import "fmt"

// twoSum finds two numbers in the array that add up to target
func twoSum(nums []int, target int) []int {
    numMap := make(map[int]int)
    
    for i, num := range nums {
        complement := target - num
        
        if index, exists := numMap[complement]; exists {
            return []int{index, i}
        }
        
        numMap[num] = i
    }
    
    return []int{}
}

func main() {
    nums := []int{2, 7, 11, 15}
    target := 9
    result := twoSum(nums, target)
    
    fmt.Printf("%v\\n", result) // Expected: [0 1]
}`,

  rust: `use std::collections::HashMap;

impl Solution {
    /// Find two numbers in the array that add up to target
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut map = HashMap::new();
        
        for (i, num) in nums.iter().enumerate() {
            let complement = target - num;
            
            if let Some(&index) = map.get(&complement) {
                return vec![index as i32, i as i32];
            }
            
            map.insert(num, i);
        }
        
        vec![]
    }
}

struct Solution;

fn main() {
    let nums = vec![2, 7, 11, 15];
    let target = 9;
    let result = Solution::two_sum(nums, target);
    
    println!("{:?}", result); // Expected: [0, 1]
}`,
};

export { DEFAULT_CODE };
