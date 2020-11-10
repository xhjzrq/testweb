<template>

  <div class="app-container">

    <div v-show="fileType === 'pdf'" class="pdf">
      <span style="text-align: center;">
        <span
          style="    margin-right: 600px;
    "
        >图号:{{ name }}</span>
          
        <span>
          <span class="turn" :class="{grey: currentPage==1}" @click="changePdfPage(0)">上一页</span>
          {{ currentPage }} / {{ pageCount }}
          <span class="turn" :class="{grey: currentPage==pageCount}" @click="changePdfPage(1)">下一页</span>
        </span>

        <button
          :class="{select:idx==0}"
          @touchstart="idx=0"
          @touchend="idx=-1"
          @click="scaleD"
        >
          放大
        </button>
        <button
          :class="{select:idx==1}"
          @touchstart="idx=1"
          @touchend="idx=-1"
          @click="scaleX"
        >
          缩小
        </button>
        <button @click="clock">旋转</button>

        <!-- <button @click="counterClock">旋转1</button> -->

      </span>
      <div style=" overflow-x: auto ;
    white-space: nowrap ;">
      <pdf
        ref="pdf"
        :src="pdfUrl"
        :page="currentPage"
        :rotate="pageRotate"
        @num-pages="pageCount=$event"
        @page-loaded="currentPage=$event"
        @loaded="loadPdfHandler"
      />
</div>
    </div>
  </div>
</template>
<script >
import pdf from 'vue-pdf'
export default {
  name: 'OpenPfd',
  components: {
    pdf
  },
  data() {
    return {
      pdfUrl: '', // pdf文件地址
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      page: 0,
      name: '',
      sname: '',
      scale: 100, // 放大系数
      idx: -1,
      pageRotate: 0
    }
  },
  mounted() {
    // const toast = this.$toast.loading({
    //   duration: 0,
    //   message: '加载中...',
    //   forbidClick: true,
    //   loadingType: 'spinner',
    // });
    // 这里给pdfUrl赋值
    // this.pdfUrl = "../../src/images/511BMP133PM.pdf";

    console.log('进来了')

    // this.currentPage=this.$route.params.name
  },
  created() {
    console.log('进来了create')
    this.page = this.$route.query.page
    if (this.page == '' || this.page == undefined) {
      this.page = 1
    }
    this.name = this.$route.query.name
    this.sname = this.$route.query.sname

    console.log(this.name + '---' + this.sname)
    //  this.name='511BMP133PM'
    //this.pdfUrl = `/${this.name}.pdf`
    this.pdfUrl = `http://192.122.15.199/project01/pdf/${this.sname}/${this.name}.pdf`
   
    //this.pdfUrl = "/511BMP133PM.pdf";
   
    console.log(this.pdfUrl)
  
    this.pdfUrl = pdf.createLoadingTask(this.pdfUrl)
  },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        // console.log(this.currentPage)
      }
    },
    loadPdfHandler(e) {
      // this.$toast.clear();
      console.log(this.page)
      this.currentPage = Number(this.page) // 加载的时候先加载第一页
    },
    scaleD() {
      this.scale += 5
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
    },
    scaleX() {
      if (this.scale == 100) {
        return
      }
      this.scale += -5
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
    },
    clock() {
      this.pageRotate += 90
    },
    // 页面逆时针翻转90度。
    counterClock() {
      this.pageRotate -= 90
    }
  }
}
</script>
