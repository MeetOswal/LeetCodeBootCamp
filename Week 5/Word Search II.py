class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        # Build the trie
        trie = {}
        for word in words:
            curr_subtrie = trie
            for idx, char in enumerate(word):
                stored_word, next_subtrie = curr_subtrie.get(char, (None, {}))
                # Store the word in the final charater's node
                curr_subtrie[char] = (word if idx == len(word) - 1 else stored_word, next_subtrie)
                curr_subtrie = next_subtrie
        
        found = []
        m, n = len(board), len(board[0])
        def explore(i, j, curr_subtrie=trie):
            char = board[i][j]
            if char in curr_subtrie:
                # Move to the next node in the trie
                stored_word, next_subtrie = curr_subtrie[char]

                # Base case:
                # A word has been found
                if stored_word:
                    # Add the word to the return list
                    found.append(stored_word)
                    # Remove the word from the trie to avoid finding duplicates
                    curr_subtrie[char] = None, next_subtrie
                    # Delete the subtree if it is empty (pruning)
                    if not next_subtrie:
                        curr_subtrie.pop(char)
                
                # Recursive step:
                # Mark the board spot as visited
                board[i][j] = "."
                if next_subtrie:
                    # Recursively explore in 4 directions
                    if i > 0:
                        explore(i-1, j, next_subtrie)
                    if i < m-1:
                        explore(i+1, j, next_subtrie)
                    if j > 0:
                        explore(i, j-1, next_subtrie)
                    if j < n-1: 
                        explore(i, j+1, next_subtrie)

                    # Delete the subtree if it is empty (pruning)
                    if not next_subtrie:
                        curr_subtrie.pop(char)
                
                # Unmark the board spot
                board[i][j] = char

        # Run explore on every grid space
        # Sort of like #200 Number of Islands
        for i in range(m):
            for j in range(n):
                # As the trie gets smaller less exploration will be done
                explore(i, j)

        return found
