class Solution:
    def minAddToMakeValid(self, s: str) -> int:
        stack=[]
        c=0
        for i in s:
            if i=='(':
                stack.append(i)
                continue
            if i==')':
                if not stack:
                    c+=1
                else:
                    if stack[-1]=='(':
                        stack.pop()
                continue
            c+=1
        return c+len(stack)
