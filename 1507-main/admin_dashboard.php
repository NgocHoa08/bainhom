<?php
require 'auth.php';
if ($_SESSION['userRole'] !== 'admin') {
    header('Location: Login.html?error=Bạn không có quyền truy cập');
    exit;
}
?>
<h2>Xin chào Admin <?php echo $_SESSION['userEmail']; ?>!</h2>
<a href="logout.php">Đăng xuất</a>
