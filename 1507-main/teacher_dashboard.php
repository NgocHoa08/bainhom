<?php
session_start();
if (!isset($_SESSION['userRole']) || $_SESSION['userRole'] != 'teacher') {
    header('Location: login.html?error=Vui lòng đăng nhập đúng quyền');
    exit;
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Giáo viên - Quản lý</title>
</head>
<body>
    <h1>Xin chào, giáo viên <?php echo htmlspecialchars($_SESSION['userEmail']); ?></h1>
    <p>Đây là trang quản lý dành cho giáo viên.</p>
    <a href="logout.php">Đăng xuất</a>
</body>
</html>
