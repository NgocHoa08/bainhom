<?php
require 'auth.php';
if ($_SESSION['userRole'] !== 'parent') {
    header('Location: login.php');
    exit;
}
?>
<h2>Chào mừng Phụ huynh <?php echo $_SESSION['userEmail']; ?>!</h2>
<a href="logout.php">Đăng xuất</a>
