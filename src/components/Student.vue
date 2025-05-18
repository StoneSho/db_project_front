<template>
    <div style="padding: 20px;">
        <el-form label-width="100px">
            <el-form-item label="操作类型">
                <el-select v-model="action" placeholder="请选择操作">
                    <el-option label="查询全部" value="selectAll"></el-option>
                    <el-option label="按ID查询" value="selectById"></el-option>
                    <el-option label="按姓名查询" value="selectByName"></el-option>
                    <el-option label="按学号查询" value="selectByNumber"></el-option>
                    <el-option label="添加学生" value="add"></el-option>
                    <el-option label="修改学生" value="update"></el-option>
                    <el-option label="删除学生（按ID）" value="deleteById"></el-option>
                    <el-option label="删除学生（按学号）" value="deleteByNumber"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="输入JSON">
                <el-input type="textarea" v-model="jsonInput" :rows="6"
                    placeholder='请输入JSON格式的数据，如 {"studentId":1, ...}' />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAction">提交</el-button>
            </el-form-item>
        </el-form>

        <el-table v-if="Array.isArray(result)" :data="result" style="width: 100%; margin-top: 20px;">
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
        <div v-else-if="result" style="margin-top: 20px; color: #409EFF;">{{ result }}</div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "StudentManager",
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
                axios.get('/student/selectAllstudent').then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'selectById') {
                if (!data.studentId) return this.$message.error('请输入studentId');
                axios.get(`/student/selectByid/${data.studentId}`).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'selectByName') {
                if (!data.name) return this.$message.error('请输入name');
                axios.get(`/student/selectByname/${data.name}`).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'selectByNumber') {
                if (!data.studentNumber) return this.$message.error('请输入studentNumber');
                axios.get(`/student/selectBynumber/${data.studentNumber}`).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'add') {
                axios.post('/student/addstudent', data).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'update') {
                axios.put('/student/updateBynumber', data).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'deleteById') {
                if (!data.studentId) return this.$message.error('请输入studentId');
                axios.delete(`/student/deleteById/${data.studentId}`).then(res => {
                    this.result = res.data;
                });
            } else if (this.action === 'deleteByNumber') {
                if (!data.studentNumber) return this.$message.error('请输入studentNumber');
                axios.delete(`/student/deleteByNumber/${data.studentNumber}`).then(res => {
                    this.result = res.data;
                });
            }
        }
    }
}
</script>