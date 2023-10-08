class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        count = set()
        for i in nums:
            if i in count:
                return True
            count.add(i)
        return False