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
                <el-input v-model="tuhao" placeholder="制作图号" />
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

          <el-col :span="9" style="text-align: right">
            <el-button type="primary" size="small" @click="aaa"
              >导出EXCEL</el-button
            >
          </el-col>
        </el-row>
        <!-- <el-col :span="8">&nbsp;</el-col>
          <el-col :span="2"> <el-button type="primary" size="small"  @click="aaa">导出EXCEL</el-button> </el-col>
        </el-row>-->
        <!-- <el-row>

        </el-row>-->
      </el-header>
      <el-container>
        <el-aside
          style="margin-top: 21px; height: 541px; background: white"
          width="400px"
        >
          <!-- <span style="font-weight:bold;">船支制作图</span> -->
          <!-- <a-tree show-line :default-expanded-keys="['0-0-0']" :tree-data="treeData"  @select="onSelect">
    <a-icon slot="switcherIcon" type="down" />
          </a-tree>-->

          <el-tree
            :data="treedata"
            :props="defaultProps"
            node-key="id"
            @node-click="handleNodeClick"
           
          >
          <!-- <span slot-scope="{ node}">
      <i class="el-icon-folder"></i>
      <span style="padding-left: 4px;">{{node.label}}</span>
    </span> -->

          </el-tree>
        </el-aside>

        <el-main>
          <div class="zz" style="font-size:12px">          
           

<a-descriptions :title="one.titleName" bordered  size="small"  :column="4">
   

    <a-descriptions-item label="船号" >{{one.ch}}</a-descriptions-item> 
    <a-descriptions-item label="区域" >{{one.qy}}</a-descriptions-item> 
    <a-descriptions-item label="安装图号" >{{one.azth}}</a-descriptions-item> 
    <a-descriptions-item label="制作图号/托盘表号" ><a @click="open()">{{one.zzth}}</a></a-descriptions-item> 
    <a-descriptions-item label="托盘表名称"  :span="2">{{one.tpbmc}}</a-descriptions-item> 
    <a-descriptions-item label="卡号"   :span="2"></a-descriptions-item> 
    <a-descriptions-item label="设计部门"  :span="2">船研所机装设计室一科</a-descriptions-item> 
    <a-descriptions-item label="联系电话"  :span="2">84487232/2022/804</a-descriptions-item> 
    
  </a-descriptions>
           <!-- <span style="font-weight: bold">部件材料数据</span> -->
            <el-table
              v-loading="loading"
              :data="tableTwo"
              border
              style="width: 100%"
              height="400px"
              :header-cell-style="{
                background: '#eef1f6',
                color: '#606266',
                padding: '0px',
              }"
              :row-style="iRowStyle"
              :cell-style="iCellStyle"
            >
              <el-table-column
                prop="bjxh"
                label="部件序号"
                width="100"
                align="center"
              />
              <el-table-column
                prop="bjdh"
                label="部件号"
                width="120"
                align="center"
              />
             
              <el-table-column
                prop="bjmc"
                label="部件名称"  
                width="150"
                align="center"
              />  
              <el-table-column prop="bjgg" label="部件规格" align="center" />
              <el-table-column prop="th" label="标准图号" align="center" />
              <el-table-column prop="xt" label="系统" align="center" />
              <el-table-column prop="bjcz" label="部件材质" align="center" />
              <el-table-column prop="jldw" label="计量单位" align="center" />
              <el-table-column prop="sl" label="数量" align="center" />
              <el-table-column prop="bjzl" label="重量" align="center"/>
    
             
              <el-table-column prop="flsl" label="面积" align="center" />
              <el-table-column prop="cplx" label="部件来处" align="center" />
              <el-table-column prop="gcbm" label="订货单号" align="center" />
              <el-table-column prop="gcmc" label="安装位置" align="center" />
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getDYList, getADy, getTXexcel } from "@/api/table";
import { Message, MessageBox } from "element-ui";

export default {
  name: "dy",
  data() {
    return {
      tableOne: [],
      tableTwo: [],
      tableThree: [],
      drawingno: "",
      zzth:'',
      input: "T308K-5#",
      tuhao: "",
      inputt: "",
      loading: false,
      treedata: [
      
      ],
      tree: [],
      defaultProps: {
        children: "treelist",
        label: "czbh",
      },
      one:{
        titleName:'',
        ch:'',
        qy:'',
        azth:'',
        zzth:'',
        tpbmc:'',
        kh:'',

      },
     

    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    gernerateId: function (index) {
      return "0-0-" + index;
      console.log("0-0-" + index);
    },
    handleNodeClick(data) {
      console.log(data);
      let temp=data.czbh
       if (data.czbh.indexOf('-')==-1 || data.czbh==this.input){
         return 
       }else{
          this.zzth=data.czbh.substring(0,data.czbh.indexOf('-')) 
          this.one.titleName=data.czbh.substring(data.czbh.indexOf('-')+1,data.czbh.length) 
       }
     // this.drawingno = data.czbh;
     console.log(this.zzth)
     console.log(this.one.titleName)
      
      if (data.czbh == "") {
        Message({
          //  message: res.message,
          message: "请输入正确船支编号",
          type: "error",
          duration: 5 * 1000,
        });
        return;
      }

      // getATx(this.inputt, data.czbh).then((response) => {
      //   this.tableOne = response.data.list;
      //   this.tableTwo = response.data.list1;

      //   this.loading = false;
      // });

      getADy(this.input,this.zzth).then((res)=>{
        this.tableTwo = res.data.list
           console.log(res.data.list)
           this.one.ch=res.data.list[0].czbh
           this.one.qy= res.data.list[0].kh.substring(6,9)
           this.one.azth=res.data.list[0].azqy
           this.one.zzth=res.data.list[0].zzth
           this.one.tpbmc=res.data.list[0].kh
      }).catch(()=>{
        this.one.ch=''
           this.one.qy= ''
           this.one.azth=''
           this.one.zzth=''
           this.one.tpbmc=''
      })

      console.log(this.tableOne);
    },

    iRowStyle: function ({ row, rowIndex }) {
      return "height:30px";
    },
    iHeaderRowStyle: function ({ row, rowIndex }) {
      return "height:30px";
    },
    iCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    },

    fetchData() {
      //  this.$set(this.treedata[0].children,0,"")
      if (this.input == "") {
        Message({
          //  message: res.message,
          message: "请输入正确船支编号",
          type: "error",
          duration: 5 * 1000,
        });
        return;
      }

      getDYList(this.input, this.tuhao)
        .then((response) => {
          this.treedata = [];
          this.inputt = this.input;
           //this.treedata=response.data.list;
          console.log(response.data.list);
          this.treedata.push(response.data.list);
          // console.log(this.treedata)
        })
        .catch(() => {
          console.log("aa");

          // this.treedata[0].children=[]
          // this.$set(this.treedata[0],0,'')
          //  console.log(this.treedata[0])
          //  this.treedata[0].drawingno=''
          //  this.$forceUpdate()
        });
    },
    aaa() {
      getTXexcel(this.inputt, this.drawingno).then((response) => {
        console.log(response.data);
        const link = document.createElement("a");
        const blob = new Blob([response], { type: "application/vnd.ms-excel" });
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);

        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = "铁舾生产设计数据.xlsx"; // 下载的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    open(){
      console.log('111111')
    }
  },
};
</script>

<style  scoped>
div {
  font-size: 12px;
}
</style>
