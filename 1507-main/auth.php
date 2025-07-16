<?php
session_start();
if (!isset($_SESSION['userRole'])) {
    header('Location: Login.html?error=Vui lòng đăng nhập lại');
    exit;
}
