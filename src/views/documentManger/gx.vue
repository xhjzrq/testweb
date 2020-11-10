<template>
  <div class="app-container">
    <el-container>
      <el-header style="height: 40px" class="aaaa">
        <el-row :gutter="50">
          <el-col :span="15">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="工程编号">
                <el-input v-model="input" placeholder="工程编号" />
              </el-form-item>
              <el-form-item label="制作图号">
                <el-input v-model="tuhao" placeholder="分段号" />
              </el-form-item>
              <el-form-item>
                <el-button
                  icon="el-icon-search"
                  circle
                  size="medium"
                  @click="fetchData()"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside
          style="margin-top: 21px; height: 541px; background: white"
          width="200px"
        >
     <el-tree
          :data="treedata"
          :props="defaultProps"
          node-key="id"
          @node-click="handleNodeClick"
        />
      </el-aside>

 <el-main>
        <el-row>
          <el-upload
            ref="upload"
            class="upload-demo"
            :data="projectData"
            :disabled="disabled"
            :multiple="true"
            :show-file-list="false"
            :accept="'.pdf'"
            :action="href()"
            :before-upload="beforeUpload"
            :on-success="uploaddone"
            :file-list="fileList"
            :auto-upload="true"
          >
            <!-- <el-button slot="trigger" :disabled="disabled" type="primary">选取文件</el-button> -->

            <el-button size="small" type="primary" :disabled="disabled">点击上传</el-button>
            <!-- <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button> -->
          </el-upload>
        </el-row>

        <div class="zza">
          <el-table
            v-loading="loading"
            :data="tableOne"
            border
            style="width: 100%"
            :header-cell-style="{
              background: '#eef1f6',
              color: '#606266',
              padding: '0px',
            }"
            :row-style="iRowStyle"
            :cell-style="iCellStyle"
          >
            <el-table-column
              type="index"
              width="50"
            />
            <el-table-column
              prop="name"
              label="文件名"
              align="center"
            />
            <el-table-column
              prop="size"
              label="文件大小(kb)"
              align="center"
            />
            <el-table-column label="操作" :resizable="true">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="update(scope.row)"
                >查看</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="del(scope.row.name)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getPdfList, getPdf, getListDist, getPdfDel } from '@/api/table'
import { Message, MessageBox } from 'element-ui'
import pdf from 'vue-pdf'

export default {
  name: 'Filepdf',
  components: {
    pdf
  },
  data() {
    return {
      tableOne: [],
      disabled: true,
      drawingno: '',
      input: 'C10K-1',
      tuhao: '',
      inputt: '',
      loading: false,
      treedata: [],
      tree: [],
      fileList: [],
      projectData: {},
      defaultProps: {
        children: 'pipeSketchLists',
        label: 'project'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    href() {
      return 'http://192.122.15.199:18001/api/files/upload'
    },
    check() {
      if (this.projectData == '' || this.projectData == undefined) {
        Message({
          //  message: res.message,
          message: '请选择一级目录',
          type: 'error',
          duration: 5 * 1000
        })
        this.authenStatus = 1
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploaddone(res, file, fileList) {
      console.log(fileList.length)
      console.log(this.fileList)
      this.handleNodeClick(this.projectData)
    },
    beforeUpload(files) {
      this.fileList = []
      this.fileList.push(files)
      console.log(this.fileList)
    },
    handleNodeClick(data) {
      console.log(data)
      this.loading = true
      this.projectData = data
      getPdfList(this.projectData.project).then((response) => {
        //  this. loading=false
        this.tableOne = response.data.list
        this.loading = false
        console.log(this.projectData.project)
        if (this.projectData.project == '工程编号') {
          this.disabled = true
        } else {
          this.disabled = false
        }
      })
      console.log(this.tableOne)
    },

    iRowStyle: function({ row, rowIndex }) {
      return 'height:40px'
    },
    iHeaderRowStyle: function({ row, rowIndex }) {
      return 'height:40px'
    },
    iCellStyle: function({ row, column, rowIndex, columnIndex }) {
      return 'padding:0px'
    },

    fetchData() {
      getListDist()
        .then((response) => {
          this.treedata = []
          this.treedata.push(response.data.list)
        })
        .catch(() => {
          console.log('aa')
        })
    },
    update(data) {
      const fileName = data.name.substring(0, data.name.indexOf('.'))
      // console.log(fileName);
      // let routeData = this.$router.resolve({
      //   path: "/pdf",
      //   query: {
      //     name: fileName,
      //   },
      // });
      this.$router.push({ name: 'Openpdf', query: { name: fileName, sname: this.projectData.project }})
      // window.open(routeData.href, "_blank");
    },
    del(data) {
      MessageBox.confirm('是否删除文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          getPdfDel(data, this.projectData.project).then((response) => {
            this.handleNodeClick(this.projectData)
          })

          Message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

 <style lang ="scss" scoped>
div {
  font-size: 12px;
}
.label-wrap {
  label {
    float: left;
    line-height: 40px;
    width: 100px;
  }
  .warp-content {
    margin-left: 60px;
  }
}
</style>
