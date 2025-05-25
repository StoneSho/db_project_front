# db_project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 数据库初始化

### 创建名为student_management_system的数据库
#### 1. 学生表（student）

| 字段名         | 类型         | 说明     |
| -------------- | ------------ | -------- |
| studentId      | int(11)      | 主键，自增 |
| studentNumber  | varchar(20)  | 学号     |
| name           | varchar(20)  | 姓名     |
| gender         | varchar(10)  | 性别     |
| age            | int(3)       | 年龄     |
| major          | varchar(50)  | 专业     |
| className      | varchar(20)  | 班级     |
| phone          | varchar(20)  | 电话     |
| email          | varchar(50)  | 邮箱     |
```sql
'CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT COMMENT ''学生ID'',
  `student_number` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT ''学号'',
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT ''姓名'',
  `gender` enum(''男'',''女'') COLLATE utf8mb4_general_ci NOT NULL DEFAULT ''男'' COMMENT ''性别'',
  `age` int DEFAULT NULL COMMENT ''年龄'',
  `major` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT ''专业'',
  `class_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT ''班级'',
  `phone` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT ''联系电话'',
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT ''邮箱'',
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `student_number_UNIQUE` (`student_number`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=''学生信息表'''
```
#### 2. 课程表（course）


| 字段名      | 类型         | 说明     |
| ----------- | ------------ | -------- |
| course_id   | int(11)      | 主键，自增 |
| course_code | varchar(20)  | 课程代码 |
| course_name | varchar(50)  | 课程名称 |

```sql
'CREATE TABLE `course` (
  `course_id` int NOT NULL AUTO_INCREMENT COMMENT ''课程ID'',
  `course_code` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT ''课程代码'',
  `course_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT ''课程名称'',
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_code` (`course_code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=''课程信息表'''
```
#### 3. 成绩表（grade）

| 字段名        | 类型      | 说明      |
| ---------- | ------- | ------- |
| grade_id   | int(11) | 主键，自增   |
| student_id | int(11) | 学生ID，外键 |
| course_id  | int(11) | 课程ID，外键 |
| score      | double  | 分数      |
```sql
'CREATE TABLE `grade` (
  `grade_id` int NOT NULL AUTO_INCREMENT COMMENT ''成绩ID'',
  `student_id` int NOT NULL COMMENT ''学生ID'',
  `course_id` int NOT NULL COMMENT ''课程ID'',
  `score` decimal(5,2) DEFAULT NULL COMMENT ''成绩'',
  PRIMARY KEY (`grade_id`),
  KEY `student_id` (`student_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE,
  CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=''学生成绩表'''
