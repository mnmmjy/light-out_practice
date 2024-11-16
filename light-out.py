import random

# ボードのサイズ (5x5 ライトアウトを例にします)
SIZE = 5

def create_board(size):
    """初期ボードをランダムに生成"""
    return [[random.randint(0, 1) for _ in range(size)] for _ in range(size)]

def print_board(board):
    """ボードをコンソールに表示"""
    for row in board:
        print('　'.join(['白' if cell == 0 else '黒' for cell in row]))
    print()

def toggle_cell(board, x, y):
    """指定したセルと隣接セルを反転する"""
    if 0 <= x < SIZE and 0 <= y < SIZE:
        board[x][y] = 1 - board[x][y] # 自分自身を反転

def toggle_neighbors(board, x, y):
    toggle_cell(board, x, y) #中心セル
    toggle_cell(board, x-1, y) #上
    toggle_cell(board, x+1, y) #下
    toggle_cell(board, x, y-1) #左
    toggle_cell(board, x, y+1) #右

def is_solved(board):
    """すべてのセルが白 (0) ならクリア"""
    return all(cell == 0 for row in board for cell in row)

#ゲーム初期化
board = create_board(SIZE)
print("初期状態:")
print_board(board)

# ゲームループ
while not is_solved(board):
    try:
        #プレイヤー入力
        print("ボードの状態:")
        print_board(board)
        print("セルを選択 (例: 1 1 は左上、行列は1始まり):")
        x, y = map(int, input("行 列: ").split())
        x -= 1 # 0始まりに変換
        y -= 1 # 0始まりに変換 
        if 0 <= x < SIZE and 0 <= y < SIZE:
            toggle_neighbors(board, x, y)
        else:
            print("範囲外の入力です。再入力してください。")
    except ValueError:
        print("無効な入力です。正しい形で入力してください。")

#クリアした場合
print("クリア！")
print_board(board)
 



