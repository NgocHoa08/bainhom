// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Các chức năng hiện có của bạn ---

    // 1. Biểu đồ loginChart (tiến độ học tập theo 4 tuần tháng 7/2025)
    const loginCtx = document.getElementById('loginChart');
    if (loginCtx) {
        const weeks = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
        const progress = [25, 50, 75, 100];
        const ctx = loginCtx.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 180);
        gradient.addColorStop(0, 'rgba(40, 199, 111, 0.25)'); // Xanh lá nhạt
        gradient.addColorStop(0.5, 'rgba(255, 193, 7, 0.18)'); // Vàng nhạt
        gradient.addColorStop(1, 'rgba(255, 87, 34, 0.15)'); // Cam nhạt
        
        const pointColors = progress.map(val => {
            if (val >= 80) return '#28c76f'; // Xanh lá
            if (val >= 60) return '#ffc107'; // Vàng
            return '#ff5722'; // Cam
        });
        
        new Chart(loginCtx, {
            type: 'line',
            data: {
                labels: weeks,
                datasets: [{
                    label: 'Tiến độ học tập',
                    data: progress,
                    borderColor: '#4e73df', // Màu đường
                    backgroundColor: gradient, // Sử dụng gradient cho vùng dưới đường
                    tension: 0.4, // Làm mềm đường cong
                    fill: true, // Tô màu vùng dưới đường
                    pointBackgroundColor: pointColors, // Màu điểm
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Quan trọng để chart có thể co giãn
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Hoàn thành (%)'
                        },
                        grid: {
                            color: '#e0e0e0', // Màu đường kẻ ngang
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false // Ẩn đường kẻ dọc
                        },
                        title: {
                            display: true,
                            text: 'Tuần'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Ẩn legend
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // 2. Chức năng Tabs (trong assignment.html, quizzes.html)
    // Assignment Tabs
    const assignmentTabs = document.getElementById('assignment-tabs');
    if (assignmentTabs) {
        const todoBtn = document.getElementById('tab-todo');
        const doneBtn = document.getElementById('tab-done');
        const todoContent = document.getElementById('tab-content-todo');
        const doneContent = document.getElementById('tab-content-done');

        if (todoBtn && doneBtn && todoContent && doneContent) {
            function showTab(tabName) {
                if (tabName === 'todo') {
                    todoContent.style.display = 'block';
                    doneContent.style.display = 'none';
                    todoBtn.classList.add('active');
                    doneBtn.classList.remove('active');
                    todoBtn.style.background = '#e3f0ff';
                    todoBtn.style.color = '#2a4cb3';
                    doneBtn.style.background = '#f8f9fc';
                    doneBtn.style.color = '#888';
                } else {
                    doneContent.style.display = 'block';
                    todoContent.style.display = 'none';
                    doneBtn.classList.add('active');
                    todoBtn.classList.remove('active');
                    doneBtn.style.background = '#e3f0ff';
                    doneBtn.style.color = '#2a4cb3';
                    todoBtn.style.background = '#f8f9fc';
                    todoBtn.style.color = '#888';
                }
            }
            todoBtn.addEventListener('click', () => showTab('todo'));
            doneBtn.addEventListener('click', () => showTab('done'));

            // Load initial content for 'Bài tập được giao'
            todoContent.innerHTML = `
                <div class="assignment-item" style="border: 1px solid #ddd; padding: 20px; margin-bottom: 15px; border-radius: 8px; background-color: #fff; display: flex; align-items: center; gap: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <div class="assignment-icon" style="font-size: 2.5rem; color: #4e73df; flex-shrink: 0; display: flex; justify-content: center; align-items: center; width: 60px; height: 60px; border-radius: 50%; background-color: #e6eefc;">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="assignment-info" style="flex-grow: 1;">
                        <h3 style="margin-top: 0; color: #333; font-size: 1.25rem;">Bài tập lớn môn Lập trình Web</h3>
                        <p style="color: #666; font-size: 0.95rem; margin-bottom: 8px;">Mô tả: Xây dựng ứng dụng web quản lý sinh viên sử dụng HTML, CSS, JavaScript.</p>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #777;">
                            <span>Môn học: Lập trình Web</span>
                            <span>Hạn nộp: <strong style="color: #e74a3b;">20/07/2025</strong></span>
                        </div>
                    </div>
                    <button class="btn-submit" style="background-color: #1cc88a; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.2s; flex-shrink: 0;">Nộp bài</button>
                </div>
                <div class="assignment-item" style="border: 1px solid #ddd; padding: 20px; margin-bottom: 15px; border-radius: 8px; background-color: #fff; display: flex; align-items: center; gap: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <div class="assignment-icon" style="font-size: 2.5rem; color: #4e73df; flex-shrink: 0; display: flex; justify-content: center; align-items: center; width: 60px; height: 60px; border-radius: 50%; background-color: #e6eefc;">
                        <i class="fas fa-chart-pie"></i>
                    </div>
                    <div class="assignment-info" style="flex-grow: 1;">
                        <h3 style="margin-top: 0; color: #333; font-size: 1.25rem;">Bài tập cá nhân môn Cấu trúc dữ liệu</h3>
                        <p style="color: #666; font-size: 0.95rem; margin-bottom: 8px;">Mô tả: Triển khai các thuật toán tìm kiếm và sắp xếp.</p>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #777;">
                            <span>Môn học: Cấu trúc dữ liệu</span>
                            <span>Hạn nộp: <strong style="color: #e74a3b;">28/07/2025</strong></span>
                        </div>
                    </div>
                    <button class="btn-submit" style="background-color: #1cc88a; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.2s; flex-shrink: 0;">Nộp bài</button>
                </div>
            `;
            doneContent.innerHTML = `
                <div class="assignment-item" style="border: 1px solid #ddd; padding: 20px; margin-bottom: 15px; border-radius: 8px; background-color: #f9f9f9; display: flex; align-items: center; gap: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <div class="assignment-icon" style="font-size: 2.5rem; color: #1cc88a; flex-shrink: 0; display: flex; justify-content: center; align-items: center; width: 60px; height: 60px; border-radius: 50%; background-color: #e0f6e9;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="assignment-info" style="flex-grow: 1;">
                        <h3 style="margin-top: 0; color: #333; font-size: 1.25rem;">Bài tập nhóm môn Hệ điều hành</h3>
                        <p style="color: #666; font-size: 0.95rem; margin-bottom: 8px;">Mô tả: Nghiên cứu về quản lý tiến trình trong Linux.</p>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #777;">
                            <span>Môn học: Hệ điều hành</span>
                            <span>Ngày nộp: <strong style="color: #1cc88a;">05/06/2025</strong></span>
                        </div>
                    </div>
                    <span style="color: #1cc88a; font-weight: bold; flex-shrink: 0; font-size: 1.1rem;">Đã nộp</span>
                </div>
            `;
        }
    }

    // Quizzes Tabs
    const quizTabs = document.getElementById('quiz-tabs');
    if (quizTabs) {
        const upcomingBtn = document.getElementById('tab-upcoming');
        const doneQuizBtn = document.getElementById('tab-done');
        const upcomingContent = document.getElementById('tab-content-upcoming');
        const doneQuizContent = document.getElementById('tab-content-done');

        if (upcomingBtn && doneQuizBtn && upcomingContent && doneQuizContent) {
            function showQuizTab(tabName) {
                if (tabName === 'upcoming') {
                    upcomingContent.style.display = 'block';
                    doneQuizContent.style.display = 'none';
                    upcomingBtn.classList.add('active');
                    doneQuizBtn.classList.remove('active');
                    upcomingBtn.style.background = '#e3f0ff';
                    upcomingBtn.style.color = '#2a4cb3';
                    doneQuizBtn.style.background = '#f8f9fc';
                    doneQuizBtn.style.color = '#888';
                } else {
                    doneQuizContent.style.display = 'block';
                    upcomingContent.style.display = 'none';
                    doneQuizBtn.classList.add('active');
                    upcomingBtn.classList.remove('active');
                    doneQuizBtn.style.background = '#e3f0ff';
                    doneQuizBtn.style.color = '#2a4cb3';
                    upcomingBtn.style.background = '#f8f9fc';
                    upcomingBtn.style.color = '#888';
                }
            }
            upcomingBtn.addEventListener('click', () => showQuizTab('upcoming'));
            doneQuizBtn.addEventListener('click', () => showQuizTab('done'));

            // Load initial content for 'Bài kiểm tra sắp tới'
            upcomingContent.innerHTML = `
                <div class="quiz-item" style="border: 1px solid #ddd; padding: 20px; margin-bottom: 15px; border-radius: 8px; background-color: #fff; display: flex; align-items: center; gap: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <div class="quiz-icon" style="font-size: 2.5rem; color: #e74a3b; flex-shrink: 0; display: flex; justify-content: center; align-items: center; width: 60px; height: 60px; border-radius: 50%; background-color: #ffe6e6;">
                        <i class="fas fa-file-invoice"></i>
                    </div>
                    <div class="quiz-info" style="flex-grow: 1;">
                        <h3 style="margin-top: 0; color: #333; font-size: 1.25rem;">Bài kiểm tra giữa kỳ - Toán cao cấp</h3>
                        <p style="color: #666; font-size: 0.95rem; margin-bottom: 8px;">Thời gian: 60 phút - Số câu: 20</p>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #777;">
                            <span>Môn học: Toán cao cấp</span>
                            <span>Ngày thi: <strong style="color: #e74a3b;">22/07/2025</strong></span>
                        </div>
                    </div>
                    <button class="btn-submit" style="background-color: #4e73df; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.2s; flex-shrink: 0;">Bắt đầu kiểm tra</button>
                </div>
                <div class="quiz-item" style="border: 1px solid #ddd; padding: 20px; margin-bottom: 15px; border-radius: 8px; background-color: #fff; display: flex; align-items: center; gap: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <div class="quiz-icon" style="font-size: 2.5rem; color: #f6c23e; flex-shrink: 0; display: flex; justify-content: center; align-items: center; width: 60px; height: 60px; border-radius: 50%; background-color: #fff4e0;">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                    <div class="quiz-info" style="flex-grow: 1;">
                        <h3 style="margin-top: 0; color: #333; font-size: 1.25rem;">Kiểm tra thực hành - Lập trình C++</h3>
                        <p style="color: #666; font-size: 0.95rem; margin-bottom: 8px;">Thời gian: 90 phút - 2 bài code</p>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #777;">
                            <span>Môn học: Lập trình C++</span>
                            <span>Ngày thi: <strong style="color: #e74a3b;">01/08/2025</strong></span>
                        </div>
                    </div>
                    <button class="btn-submit" style="background-color: #4e73df; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.2s; flex-shrink: 0;">Bắt đầu kiểm tra</button>
                </div>
            `;
            doneQuizContent.innerHTML = `
                <div class="quiz-item" style="border: 1px solid #ddd; padding: 20px; margin-bottom: 15px; border-radius: 8px; background-color: #f9f9f9; display: flex; align-items: center; gap: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <div class="quiz-icon" style="font-size: 2.5rem; color: #1cc88a; flex-shrink: 0; display: flex; justify-content: center; align-items: center; width: 60px; height: 60px; border-radius: 50%; background-color: #e0f6e9;">
                        <i class="fas fa-award"></i>
                    </div>
                    <div class="quiz-info" style="flex-grow: 1;">
                        <h3 style="margin-top: 0; color: #333; font-size: 1.25rem;">Bài kiểm tra cuối kỳ - Tin học đại cương</h3>
                        <p style="color: #666; font-size: 0.95rem; margin-bottom: 8px;">Điểm số: <strong style="color: #1cc88a;">9.5/10</strong></p>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #777;">
                            <span>Môn học: Tin học đại cương</span>
                            <span>Ngày hoàn thành: <strong style="color: #1cc88a;">15/05/2025</strong></span>
                        </div>
                    </div>
                    <button class="btn-submit" style="background-color: #1cc88a; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.2s; flex-shrink: 0;">Xem kết quả</button>
                </div>
            `;
        }
    }

    // 3. Notification Dropdown Toggle
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.querySelector('.notification-dropdown');

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
            notificationDropdown.classList.toggle('show');
        });

        document.addEventListener('click', function(e) {
            if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
        });
    }

    // 4. Email Permission Modal
    var emailPermissionMenu = document.querySelector('.email-permission-menu'); // Giả sử bạn có một nút/liên kết với class này
    var emailPermissionModal = document.getElementById('emailPermissionModal');
    var closeEmailModalBtn = document.getElementById('closeEmailModal');

    if (emailPermissionMenu && emailPermissionModal && closeEmailModalBtn) {
        emailPermissionMenu.addEventListener('click', function(e) {
            e.preventDefault();
            emailPermissionModal.style.display = 'flex';
            document.getElementById('permissionEmail').focus();
        });
        closeEmailModalBtn.addEventListener('click', function() {
            emailPermissionModal.style.display = 'none';
        });
        // Đóng modal khi click ra ngoài nội dung
        emailPermissionModal.addEventListener('mousedown', function(e) {
            if (e.target === emailPermissionModal) {
                emailPermissionModal.style.display = 'none';
            }
        });
    }

    // Xử lý gửi form yêu cầu cấp quyền email
    var emailPermissionForm = document.getElementById('emailPermissionForm');
    if (emailPermissionForm) {
        emailPermissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var email = document.getElementById('permissionEmail').value.trim();
            if (!email) {
                alert('Vui lòng nhập email của bạn!');
                return;
            }
            // Demo: alert, thực tế sẽ gửi request lên server
            alert('Yêu cầu cấp quyền email đã được gửi cho: ' + email);
            emailPermissionModal.style.display = 'none';
            emailPermissionForm.reset();
        });
    }

    // --- Bắt đầu phần logic phân quyền Frontend (NEW) ---

    // Hàm giả lập lấy vai trò người dùng (trong thực tế sẽ lấy từ Backend sau khi đăng nhập)
    function getUserRole() {
        // Lấy vai trò đã lưu trong localStorage. Mặc định là 'student' nếu không tìm thấy.
        return localStorage.getItem('userRole') || 'student';
    }

    // Thiết lập vai trò cho thẻ body và điều chỉnh giao diện
    function setRoleBasedUI() {
        const userRole = getUserRole(); // Lấy vai trò của người dùng hiện tại
        const body = document.body; // Lấy thẻ <body>

        // Xóa các lớp vai trò cũ nếu có, để tránh xung đột khi chuyển trang hoặc đổi vai trò
        body.classList.remove('role-admin', 'role-teacher', 'role-student', 'role-parent');

        // Thêm lớp vai trò mới vào thẻ body
        if (userRole) {
            body.classList.add(`role-${userRole}`);
        }

        // Điều chỉnh tiêu đề/lời chào mừng trên dashboard (nếu có id="welcome-message")
        const welcomeMessageElement = document.getElementById('welcome-message');
        if (welcomeMessageElement) {
            switch (userRole) {
                case 'admin':
                    welcomeMessageElement.textContent = 'Chào mừng, Quản trị viên!';
                    break;
                case 'teacher':
                    welcomeMessageElement.textContent = 'Chào mừng, Thầy/Cô!';
                    break;
                case 'parent':
                    welcomeMessageElement.textContent = 'Chào mừng, Quý phụ huynh!';
                    break;
                case 'student':
                    welcomeMessageElement.textContent = 'Chào mừng trở lại, Nguyễn Văn A!';
                    break;
                default:
                    welcomeMessageElement.textContent = 'Chào mừng bạn!';
            }
        }
    }

    // Gọi hàm này khi trang được tải lần đầu để áp dụng phân quyền
    setRoleBasedUI();

    // --- Logic giả lập đăng nhập từ Login.html (NEW) ---
    // Giả sử form đăng nhập của bạn trong Login.html có id="loginForm"
    // và trường username/email có id="username"
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn chặn form submit mặc định

            // Trong thực tế: Bạn sẽ gửi dữ liệu đăng nhập đến backend để xác thực
            const usernameInput = document.getElementById('username');
            // const passwordInput = document.getElementById('password'); // Mật khẩu không dùng cho demo frontend

            let mockUserRole = 'student'; // Mặc định là học sinh

            // Logic đơn giản để giả lập vai trò dựa trên username nhập vào
            if (usernameInput && usernameInput.value.toLowerCase() === 'admin') {
                mockUserRole = 'admin';
            } else if (usernameInput && usernameInput.value.toLowerCase() === 'teacher') {
                mockUserRole = 'teacher';
            } else if (usernameInput && usernameInput.value.toLowerCase() === 'parent') {
                mockUserRole = 'parent';
            }
            // Các trường hợp khác sẽ là 'student' theo mặc định

            localStorage.setItem('userRole', mockUserRole); // Lưu vai trò vào localStorage

            // Chuyển hướng đến trang Dashboard chính (HTML.HTML)
            // Khi trang HTML.HTML tải, setRoleBasedUI() sẽ tự động chạy và áp dụng giao diện
            window.location.href = 'HTML.HTML';
        });
    }

    // --- Kết thúc phần logic phân quyền Frontend ---

});