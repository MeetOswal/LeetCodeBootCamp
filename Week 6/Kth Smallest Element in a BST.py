class Solution:

    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack, cur = [], root # first in, last out
        
        # iterative in-order DFS traversal
        while True:
            while cur: # go as left as possible
                stack.append(cur)
                cur = cur.left

            cur = stack.pop() # last one, smallest node
            k -= 1
            if k == 0:
                return cur.val
                
            cur = cur.right
