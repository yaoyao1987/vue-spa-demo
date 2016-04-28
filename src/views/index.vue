<template>
    <!--简介 start-->
    <section class="row" @click="open=!open">
        <div class="about" :class="open?'line-clamp':''">
            我是首页，首页的详细介绍
             我是首页，首页的详细介绍
              我是首页，首页的详细介绍
               我是首页，首页的详细介绍
                我是首页，首页的详细介绍
             我是首页，首页的详细介绍
              我是首页，首页的详细介绍
               我是首页，首页的详细介绍
                我是首页，首页的详细介绍
             我是首页，首页的详细介绍
              我是首页，首页的详细介绍
               我是首页，首页的详细介绍
                我是首页，首页的详细介绍
        </div>
    </section>
    <!--/简介 end-->
    <!-- 图片列表 start-->
    <section class="row-media mt15">
        <h2 class="heading-large">图片列表</h2>
        <div class="col" v-link="{name:'detail',params:{id:1}}">
            <img alt="haha" />
            <h3>图片1</h3>
        </div>
        <div class="col" v-link="{name:'detail',params:{id:1}}">
            <img alt="haha" />
            <h3>图片2</h3>
        </div>
        <div class="col" v-link="{name:'detail',params:{id:1}}">
            <img alt="haha" />
            <h3>图片3</h3>
        </div>
        <div class="col" v-link="{name:'detail',params:{id:1}}">
            <img alt="haha" />
            <h3>图片4</h3>
        </div>
    </section>
    <!--/图片列表 end-->
    <!--foot start-->
    <foot></foot>
    <!--/foot end-->
</template>
<script>
import foot from '../components/footer'

export default {
	data(){
		return {
			open:true,
            courses:[]  //数据
		}
	},
    //路由对象
    route: {
        data(transition){
            let self = this;
            //如果从其他页面返回，取sessionStorge
            if (transition.from.name) {
                self.courses = JSON.parse(sessionStorage.courses);
                //dom加载之前
                self.$nextTick(()=>{
                    //dom加载之后
                    //解除禁用滚动事件
                    document.body.style.overflow = 'auto';
                    //滚动到之前的位置
                    window.scrollTo(0,sessionStorage.scrollTop);
                })
            }else{
                //页面初次加载获取的数据
                self.getCourses();
            }
        },
        deactivate(transition) {
            let self = this;
            //禁用滚动事件
            document.body.style.overflow = 'hidden';

            //
            if (transition.to.name) {
                sessionStorage.scrollTop = document.body.scrollTop;
                sessionStorage.courses = JSON.stringify(self.courses);
            }else{
                //跳转时删除缓存数据
                sessionStorage.removeItem("courses");
            }
            transition.next();
        },
    },
    methods: {
        getCourses(){
            //ajax获取数据
        }
    },
	components:{
		foot
	}
}
</script>
