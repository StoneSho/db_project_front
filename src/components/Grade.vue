<template>
    <div style="padding: 20px;">
        <el-form label-width="100px">
            <el-form-item label="查询方式">
                <el-select v-model="action" placeholder="请选择查询方式">
                    <el-option label="查询全部成绩" value="selectAll"></el-option>
                    <el-option label="按成绩ID查询" value="selectById"></el-option>
                    <el-option label="按学生ID查询" value="selectByStudentId"></el-option>
                    <el-option label="按课程ID查询" value="selectByCourseId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="输入JSON">
                <el-input type="textarea" v-model="jsonInput" :rows="4"
                    placeholder='如 {"grade_id":1} 或 {"student_id":1} 或 {"course_id":1}' />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAction">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table v-if="Array.isArray(result)" :data="result" style="width: 100%; margin-top: 20px;">
            <el-table-column prop="grade_id" label="成绩ID" width="100" />
            <el-table-column prop="student_id" label="学生ID" width="120" />
            <el-table-column prop="course_id" label="课程ID" width="120" />
            <el-table-column prop="score" label="分数" width="120" />
        </el-table>
        <div v-else-if="result" style="margin-top: 20px; color: #409EFF;">{{ result }}</div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Grade",
    data() {
        return {
            action: '',
            jsonInput: '',
            result: null
        }
    },
    methods: {
        handleAction() {
            var data = {};
            if (this.jsonInput) {
                try {
                    data = JSON.parse(this.jsonInput);
                } catch (e) {
                    this.$message.error('JSON格式错误！');
                    return;
                }
            }
            this.result = null;
            if (this.action === 'selectAll') {
                axios.get('/grade/selectAll').then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'selectById') {
                if (!data.grade_id) return this.$message.error('请输入grade_id');
                axios.get(`/grade/selectById/${data.grade_id}`).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'selectByStudentId') {
                if (!data.student_id) return this.$message.error('请输入student_id');
                axios.get(`/grade/selectByStudentId/${data.student_id}`).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'selectByCourseId') {
                if (!data.course_id) return this.$message.error('请输入course_id');
                axios.get(`/grade/selectByCourseId/${data.course_id}`).then(res => {
                    this.result = res.data;
                });
            }
        }
    }
}
</script>