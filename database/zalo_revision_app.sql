CREATE TABLE subjects (
	`id` VARCHAR(4) PRIMARY KEY,
	`name` VARCHAR(100) UNIQUE NOT NULL,
	`classes` JSON NOT NULL,
	`questionTN` BOOLEAN,
	`questionDS` BOOLEAN,
	`questionTLN` BOOLEAN,
	`questionDVCT` BOOLEAN,
	`questionTL` BOOLEAN,
	`questionSX` BOOLEAN,
	`created_at` DATETIME DEFAULT NOW(),
	`update_at` DATETIME DEFAULT NOW(),
	`is_visible` BOOLEAN DEFAULT TRUE
);

CREATE TABLE topics (
	`id` VARCHAR(10) PRIMARY KEY,
	`name` VARCHAR(200) NOT NULL,
	`classes` JSON NOT NULL,
	`subject_id` VARCHAR(4) NOT NULL,
	`created_at` DATETIME DEFAULT NOW(),
	`update_at` DATETIME DEFAULT NOW(),
	`is_visible` BOOLEAN DEFAULT TRUE,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE achievements (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(256) NOT NULL,
   `description` VARCHAR(256) NOT NULL,
	`image` LONGTEXT NOT NULL
);
INSERT INTO subjects (`id`, `name`, `classes`, `questionTN`, `questionDS`, `questionTLN`, `questionDVCT`, `questionTL`, `questionSX`) VALUES
("VAN", "Ngữ văn", '[6,7,8,9,10,11,12]', FALSE, FALSE, FALSE, TRUE, TRUE, FALSE),
("TOAN", "Toán", '[6,7,8,9,10,11,12]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
("ANH", "Tiếng Anh", '[6,7,8,9,10,11,12]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
("KHTN", "Khoa học tự nhiên", '[6,7,8,9]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
("LSDL", "Lịch sử & Địa lý", '[6,7,8,9]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
("GDCD", "Giáo dục công dân", '[6,7,8,9]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE),
("CN", "Công nghệ", '[6,7,8,9]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE),
("TIN", "Tin học", '[6,7,8,9]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
("CNCN", "Công nghệ (Công nghiệp)", '[10,11,12]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE),
("CNNN", "Công nghệ (Nông nghiệp)", '[10,11,12]',  TRUE, TRUE, FALSE, TRUE, TRUE, FALSE),
("KTPL", "Giáo dục Kinh tế – Pháp luật", '[10,11,12]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE),
("LY", "Vật lý", '[10,11,12]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
("HOA", "Hóa học", '[10,11,12]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
("SINH", "Sinh học", '[10,11,12]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
("SU", "Lịch sử", '[10,11,12]', TRUE, TRUE, FALSE, TRUE, TRUE, TRUE),
("DIA", "Địa lý", '[10,11,12]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
("ICT", "Tin học (Ứng dụng)", '[10,11,12]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
("KHMT", "Tin học (KHMT)", '[10,11,12]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE);

INSERT INTO `topics` (`id`, `name`, `classes`, `subject_id`) VALUES
("TIN1", "Hệ điều hành và phần mềm ứng dụng", '[7]', "TIN"),
("TIN2", "Lập trình trực quan", '[8]', "TIN"),
("TOAN1", "Số nguyên", '[6]', "TIN"),
("TOAN2", "Tính đơn điệu của hàm số", '[12]', "TOAN"),
("ANH1", "Thì hiện tại đơn", '[6,7,8,9,10,11,12]', "ANH"),
("ANH2", "Thì hiện tại hoàn thành", '[10,11,12]', "ANH");

INSERT INTO `achievements` (`name`, `description`, `image`) VALUES
("Hoàn thành đề đầu tiên", "Hoàn thành đề đầu tiên", "/avatar/mystery.jpg"),
("Hoàn thành đề đầu tiên có kết quả từ 8 trở lên", "Hoàn thành đề đầu tiên có kết quả từ 8 trở lên", "/avatar/mystery.jpg"),
("Hoàn thành đề đầu tiên đạt điểm 10", "Hoàn thành đề đầu tiên đạt điểm 10", "/avatar/mystery.jpg"),
("Sử dụng hết thời gian làm bài", "Sử dụng hết thời gian làm bài", "/avatar/mystery.jpg"),
("Nộp bài trong khi còn 1/3 thời gian", "Nộp bài trong khi còn 1/3 thời gian", "/avatar/mystery.jpg"),
("Nộp bài và làm đầy đủ tất cả các câu", "Nộp bài và làm đầy đủ tất cả các câu", "/avatar/mystery.jpg"),
("Bình luận đầu tiên", "Bình luận đầu tiên", "/avatar/mystery.jpg"),
("Cập nhật bí danh", "Cập nhật bí danh", "/avatar/mystery.jpg"),
("Yêu thích 1 đề thi", "Yêu thích 1 đề thi", "/avatar/mystery.jpg"),
("Yêu thích 1 giáo viên", "Yêu thích 1 giáo viên", "/avatar/mystery.jpg"),
("Đăng nhập liên tục 7 ngày", "Đăng nhập liên tục 7 ngày", "/avatar/mystery.jpg"),
("Đăng nhập liên tục 30 ngày", "Đăng nhập liên tục 30 ngày", "/avatar/mystery.jpg"),
("Đăng nhập liên tục 60 ngày", "Đăng nhập liên tục 60 ngày", "/avatar/mystery.jpg"),
("Đăng nhập liên tục 120 ngày", "Đăng nhập liên tục 120 ngày", "/avatar/mystery.jpg"),
("Trở thành thí sinh giải đề nhanh nhất và đạt điểm cao nhất", "Trở thành thí sinh giải đề nhanh nhất và đạt điểm cao nhất", "/avatar/mystery.jpg"),
("Giải lại 1 đề 3 lần", "Giải lại 1 đề 3 lần", "/avatar/mystery.jpg"),
("Hoàn thành đề đầu tiên điểm 10 môn Văn", "Hoàn thành đề đầu tiên điểm 10 môn Văn", "/avatar/mystery.jpg"),
("Hoàn thành 12 đề đạt được điểm 8 trở lên", "Hoàn thành 12 đề đạt được điểm 8 trở lên", "/avatar/mystery.jpg"),
("Hoàn thành 12 đề đạt được điểm 10", "Hoàn thành 12 đề đạt được điểm 10", "/avatar/mystery.jpg"),
("Hoàn thành tất cả danh hiệu", "Hoàn thành tất cả danh hiệu", "/avatar/mystery.jpg");