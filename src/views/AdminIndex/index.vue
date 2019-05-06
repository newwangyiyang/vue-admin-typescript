<template>
    <div class="admin_index_wrap">
        <div>
            <el-button type="primary" @click="dialogFormVisible=true">新增商家</el-button>
        </div>
        <el-table
            :data="tableData"
            style="width: 75%">
            <el-table-column
            label="创建日期"
            width="210">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.swBaCreatetime }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="账号"
            width="180">
                <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.swBaAccount }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
            label="密码"
            width="180">
                <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.swBaPassword }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <!-- 新增商家弹窗 -->
        <el-dialog title="新增商家" :visible.sync="dialogFormVisible" width="25%">
            <el-form data-vv-scope="newboss">
                <el-form-item label="商家账号" :label-width="'80px'">
                    <el-input 
                    v-model="form.account" 
                    autocomplete="off"
                    v-validate="'required|min:5'"
                    data-vv-as="商家账号"
                    name="account"
                    ></el-input>
                    <span class="error_msg">{{ errors.first('newboss.account') }}</span>    
                </el-form-item>
                <el-form-item label="商家密码" :label-width="'80px'">
                    <el-input 
                    v-model="form.password" 
                    autocomplete="off"
                    v-validate="'required|min:5'"
                    data-vv-as="商家密码"
                    name="password"
                    ></el-input>
                    <span class="error_msg">{{ errors.first('newboss.password') }}</span>    
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="subNewBossByAccountAndPassword">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑商家弹窗 -->
        <el-dialog title="编辑商家" :visible.sync="dialogFormVisibleForUpdate" width="25%">
            <el-form data-vv-scope="newboss">
                <el-form-item label="商家账号" :label-width="'80px'">
                    <el-input 
                    v-model="formUpdate.swBaAccount" 
                    autocomplete="off"
                    v-validate="'required|min:5'"
                    data-vv-as="商家账号"
                    name="account"
                    ></el-input>
                    <span class="error_msg">{{ errors.first('newboss.account') }}</span>    
                </el-form-item>
                <el-form-item label="商家密码" :label-width="'80px'">
                    <el-input 
                    v-model="formUpdate.swBaPassword" 
                    autocomplete="off"
                    v-validate="'required|min:5'"
                    data-vv-as="商家密码"
                    name="password"
                    ></el-input>
                    <span class="error_msg">{{ errors.first('newboss.password') }}</span>    
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleForUpdate = false">取 消</el-button>
                <el-button type="primary" @click="subUpdateBossById">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MyVue from '@/MyVue';
import { addBossByAccountAndPass, bossList, updateBossById, delBossById } from '@/api/adminIndex';
import dayjs from 'dayjs'
import { BossListItemIF } from '@/interface/paramsIF';



@Component
export default class adminIndex extends MyVue {
    private tableData: BossListItemIF[] = []
    // 新增
    private dialogFormVisible = false
    private form = {
        account: '',
        password: ''
    }
    // 更新
    private dialogFormVisibleForUpdate = false
    private formUpdate: BossListItemIF = {
        swBaId: '',
        swBaAccount: '',
        swBaCreatetime: '',
        swBaPassword: ''
    }

    private async mounted() { // 页面初始化，获取所有商家的列表信息
        const res: Ajax.AxiosResponse = await bossList();
        const data = res.data
        if(data.code === 0) {
            const l: BossListItemIF[] = data.data
            l.forEach(v => {
                v.swBaCreatetime = dayjs(v.swBaCreatetime).format('YYYY-MM-DD HH:mm:ss')
            })
            this.tableData = l
        }
    }
    private handleEdit(index: number, row: BossListItemIF) { // 编辑商家账号
        this.formUpdate = row
        console.log(this.formUpdate)
        this.dialogFormVisibleForUpdate = true
    }
    private async handleDelete(index: number, row: BossListItemIF) { // 根据id删除商家账号
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            const res: Ajax.AxiosResponse = await delBossById(row.swBaId)
            if(res.data.code === 0) {
                this.$message.success('删除成功')
                this.tableData.splice(index, 1)
            } else {
                this.$message.error(res.data.msg)
            }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
    subNewBossByAccountAndPassword() { // 1、根据账号密码，新增新的商家
        this.$validator.validateAll('newboss').then(async res => {
            if(res) {
                const res: Ajax.AxiosResponse = await addBossByAccountAndPass(this.form)
                const data: Ajax.AjaxResponse = res.data
                if(data.code === 0) {
                    const obj: BossListItemIF = data.data
                    obj.swBaCreatetime = dayjs(obj.swBaCreatetime).format('YYYY-MM-DD HH:mm:ss')
                    this.tableData.push(obj)
                    this.$message({
                        message: '新增商家成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false

                } else {
                    this.$message.error(data.msg);
                }
            }
        })
    }
    private async subUpdateBossById() {
        const res: Ajax.AxiosResponse = await updateBossById(this.formUpdate)
        const data = res.data
        if(data.code === 0) {
            this.$message.success('商家账号编辑成功')
            this.dialogFormVisibleForUpdate = false
        } else {
            this.$message.error(data.msg);
        }
    }
}

</script>

<style lang="scss" scoped>
.admin_index_wrap {
    padding: 20px;
}
</style>