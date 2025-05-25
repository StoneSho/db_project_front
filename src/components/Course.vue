<template>
    <div style="padding: 20px;">
        <el-form label-width="100px">
            <!--查询模块-->>
            <el-form-item label="查询方式">
                <!--双向绑定action及其内部值，触发-->
                <el-select v-model="action" placeholder="请选择查询方式">
                    <el-option label="查询全部课程" value="selectAll"></el-option>
                    <el-option label="按课程ID查询" value="selectById"></el-option>
                    <el-option label="按课程代码查询" value="selectByCode"></el-option>
                    <el-option label="按课程名称查询" value="selectByName"></el-option>
                    <el-option label="查询选课学生" value="selectStudents"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="输入JSON">
                <el-input type="textarea" v-model="jsonInput" :rows="4"
                    placeholder='如 {"course_id":1} 或 {"course_code":"JS101"} 或 {"course_name":"高等数学"}' />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAction">查询</el-button>
            </el-form-item>
        </el-form>

        <!--结果显示模块-->>
        <el-table v-if="Array.isArray(result)" :data="result" style="width: 100%; margin-top: 20px;">
            <el-table-column prop="course_id" label="课程ID" width="100" />
            <el-table-column prop="course_code" label="课程代码" width="120" />
            <el-table-column prop="course_name" label="课程名称" width="180" />
        </el-table>

        <!--查询选课学生模块-->
        <!--当studentOfCourse表不为空时，且data时通过该方法获取时显示-->>
        <el-table v-if="studentsOfCourse.length" :data="studentsOfCourse" style="width: 100%; margin-top: 20px;">
            <el-table-column prop="studentId" label="ID" width="100" />
            <el-table-column prop="studentNumber" label="学号" width="120" />
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="gender" label="性别" width="80" />
            <el-table-column prop="age" label="年龄" width="80" />
            <el-table-column prop="major" label="专业" width="120" />
            <el-table-column prop="className" label="班级" width="120" />
            <el-table-column prop="phone" label="电话" width="140" />
            <el-table-column prop="email" label="邮箱" width="180" />
        </el-table>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Course",
    data() {
        return {
            action: '',
            jsonInput: '',
            result: null,
            studentsOfCourse: []
        }
    },
    methods: {
        handleAction() {
            var data = {};
            //判断是否为正确的json格式
            if (this.jsonInput) {
                try {
                    data = JSON.parse(this.jsonInput);
                } catch (e) {
                    this.$message.error('JSON格式错误！');  //$message为element-ui的提示，三秒自动消失，success，warning，info，error
                    return;
                }
            }

            this.result = null;
            //将result和返回的data进行绑定
            if (this.action === 'selectAll') {
                axios.get('/course/selectAll').then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'selectById') {
                if (!data.course_id) return this.$message.error('请输入course_id');
                axios.get(`/course/selectById/${data.course_id}`).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'selectByCode') {
                if (!data.course_code) return this.$message.error('请输入course_code');
                axios.get(`/course/selectByCode/${data.course_code}`).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'selectByName') {
                if (!data.course_name) return this.$message.error('请输入course_name');
                axios.get(`/course/selectByName/${data.course_name}`).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'selectStudents') {
                if (!data.course_id) return this.$message.error('请输入course_id');
                axios.get(`/course/students/${data.course_id}`).then(res => {
                    this.studentsOfCourse = res.data;
                });
            }
        }
    }
}
</script>