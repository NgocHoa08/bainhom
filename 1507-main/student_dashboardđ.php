<?php
require 'auth.php';
if ($_SESSION['userRole'] !== 'student') {
    header('Location: login.php');
    exit;
}
?>
<h2>Chào mừng Sinh viên <?php echo $_SESSION['userEmail']; ?>!</h2>
<a href="logout.php">Đăng xuất</a>
