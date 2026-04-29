import string
from typing import List, Tuple, Dict

# hàm tạo ma trận 5x5 từ key
def generate_matrix(key: str) -> List[List[str]]:
    """
    tạo ma trận 5x5 từ key:
    - chuyển văn bản thành chữ in hoa
    - J -> I
    - loại bỏ các ký tự trùng lặp
    """
    key = key.upper().replace("J", "I")

    seen = set()
    matrix_list = []

    # thêm các ký tự của key vào ma trận trước
    for char in key:
        if char.isalpha() and char not in seen:
            seen.add(char)
            matrix_list.append(char)

    # thêm các kí tự chữ cái còn lại vào ma trận
    for char in string.ascii_uppercase:
        if char == "J":
            continue
        if char not in seen:
            seen.add(char)
            matrix_list.append(char)

    # mảng 1 chiều chuyển đổi thành mảng 2 chiều 5x5
    return [matrix_list[i:i + 5] for i in range(0, 25, 5)]


# hàm tìm vị trí cho các ký tự
def build_position_map(matrix: List[List[str]]) -> Dict[str, Tuple[int, int]]:
    """
    ánh xạ: ký tự -> (hàng, cột)
    """
    return {
        matrix[i][j]: (i, j)
        for i in range(5)
        for j in range(5)
    }


# hàm chuẩn hóa văn bản đầu vào
def clean_text(text: str) -> str:
    """
    chuyển thành chữ hoa, J -> I và chỉ giữ lại các kí tự chữ cái
    """
    return "".join(filter(str.isalpha, text.upper().replace("J", "I")))


# hàm chia văn bản thành các cặp ký tự
def create_pairs(text: str, encrypt: bool) -> List[Tuple[str, str]]:
    """
    nếu mã hóa: tách cặp và chèn thêm ký tự X hoặc Y nếu trùng nhau
    nếu giải mã: tạo thành từng cặp 2 ký tự
    """
    text = clean_text(text)
    pairs = []

    # trường hợp giải mã
    if not encrypt:
        for i in range(0, len(text), 2):
            a = text[i]
            b = text[i + 1] if i + 1 < len(text) else "X"
            pairs.append((a, b))
        return pairs

    # trường hợp mã hóa
    i = 0
    while i < len(text):
        a = text[i]

        if i + 1 < len(text):
            b = text[i + 1]

            if a == b:
                # chèn y nếu ký tự bị trùng là x, ngược lại chèn x
                filler = "Y" if a == "X" else "X"
                pairs.append((a, filler))
                i += 1
            else:
                pairs.append((a, b))
                i += 2
        else:
            # xử lý ký tự lẻ cuối cùng
            filler = "Y" if a == "X" else "X"
            pairs.append((a, filler))
            i += 1

    return pairs


# hàm xử lý thuật toán playfair
def process_playfair(text: str, key: str, encrypt: bool = True) -> str:
    """
    thực hiện quá trình mã hóa hoặc giải mã dựa trên cờ encrypt
    """
    
    # tạo ma trận 5x5 từ key
    matrix = generate_matrix(key)
    
    # tìm vị trí cho các ký tự
    pos_map = build_position_map(matrix)
    
    # chia văn bản thành các cặp ký tự
    pairs = create_pairs(text, encrypt)

    result = []

    for a, b in pairs:
        # kiểm tra xem ký tự có tồn tại trong ma trận hay không
        if a not in pos_map or b not in pos_map:
            raise ValueError(f"ký tự không hợp lệ: {a} hoặc {b}")

        row1, col1 = pos_map[a]
        row2, col2 = pos_map[b]

        # hai ký tự nằm cùng một hàng
        if row1 == row2:
            if encrypt:
                result.append(matrix[row1][(col1 + 1) % 5])
                result.append(matrix[row2][(col2 + 1) % 5])
            else:
                result.append(matrix[row1][(col1 - 1) % 5])
                result.append(matrix[row2][(col2 - 1) % 5])

        # hai ký tự nằm cùng một cột
        elif col1 == col2:
            if encrypt:
                result.append(matrix[(row1 + 1) % 5][col1])
                result.append(matrix[(row2 + 1) % 5][col2])
            else:
                result.append(matrix[(row1 - 1) % 5][col1])
                result.append(matrix[(row2 - 1) % 5][col2])

        # hai ký tự tạo thành các góc của hình chữ nhật
        else:
            result.append(matrix[row1][col2])
            result.append(matrix[row2][col1])

    return "".join(result)