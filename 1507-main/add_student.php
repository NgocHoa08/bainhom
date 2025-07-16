<?php
session_start();
if (!isset($_SESSION['userRole']) || $_SESSION['userRole'] !== 'teacher') {
    header('Location: Login.html');
    exit;
}

$host = 'localhost';
$dbname = 'bainhom';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = trim(strtolower($_POST['email']));
        $pass = $_POST['password'];

        $stmt = $conn->prepare("INSERT INTO users (email, password, role, created_at) VALUES (?, ?, 'student', NOW())");
        $stmt->execute([$email, $pass]);

        header('Location: teacher_dashboard.php');
        exit;
    }

} catch (PDOException $e) {
    die("Lỗi kết nối: " . $e->getMessage());
}
?>
