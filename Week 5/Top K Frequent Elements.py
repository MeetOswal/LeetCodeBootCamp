class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        cnt = collections.Counter(nums)
        unique = list(cnt.items())  # (number, frequency) pairs list

        self.quickselect(unique, 0, len(unique) - 1, k - 1)

        return [pair[0] for pair in unique[:k]]


    def quickselect(self, arr, low, high, k):
        if low == high:
            return arr[low]

        i = self.partition(arr, low, high)
        if k == i:
            return arr[k]
        elif k < i:
            return self.quickselect(arr, low, i - 1, k)
        else:
            return self.quickselect(arr, i + 1, high, k)


    def partition(self, arr, low, high):
        pivot = arr[high][1]
        i = low
        for j in range(low, high):
            if arr[j][1] > pivot:
                arr[i], arr[j] = arr[j], arr[i]
                i += 1

        arr[i], arr[high] = arr[high], arr[i]

        return i
