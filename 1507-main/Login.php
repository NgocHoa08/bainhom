<?php
session_start();

$host = '127.0.0.1';  // Dùng IP thay vì 'localhost'
$port = '3306';       // Cổng mặc định của MySQL, kiểm tra trên XAMPP
$dbname = 'bainhom';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = strtolower(trim($_POST['email']));
        $pass = $_POST['password'];

        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email AND password = :password");
        $stmt->execute(['email' => $email, 'password' => $pass]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $_SESSION['userRole'] = $user['role'];
            $_SESSION['userEmail'] = $user['email'];

            switch ($user['role']) {
                case 'admin':
                    header('Location: admin_dashboard.html');
                    break;
                case 'teacher':
                    header('Location: teacher_dashboard.html');
                    break;
                case 'parent':
                    header('Location: parent_dashboard.html');
                    break;
                case 'student':
                    header('Location: student_dashboard.HTML');
                    break;
                default:
                    header('Location: Login.html?error=Không xác định quyền truy cập');
            }
            exit;
        } else {
            header('Location: Login.html?error=Sai email hoặc mật khẩu');
            exit;
        }
    }
} catch (PDOException $e) {
    die("<p style='color:red;'>Lỗi kết nối: " . $e->getMessage() . "</p>");
}
?>
