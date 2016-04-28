<template>
    <div class="row-meida">
        <!-- <img class="datu" v-lazy="" alt="自拍" /> -->
    </div>
    <div class="row mt15">
        我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情
        我是详情我是详情我是详情我是详情
        我是详情我是详情我是详情我是详情
        我是详情我是详情我是详情我是详情
        我是详情我是详情我是详情我是详情
    </div>
    <div class="row">
        <h2>人气作品</h2>
        <div id="popular-wrapper" class="vscroll-wrapper popular-wrapper">
            <div class="vscroll-scroller popular-scroller">
                <ul>
                    <li v-for="item in populars" track-by="$index">
                        <img class="rqzp" :src="item.author.avatar_url">
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <foot></foot>
</template>
<script>
import IScroll from '../assets/js/iscroll'
import foot from '../components/footer'

export default {
    data(){
        return {
            open: false,
            vScroll: null,  //横向滚动条对象
            isVRefresh: false,  //横向滚动是否可以更新
            populars: [],   //作品，
            searchKey: {
                page: 1,
                limit: 2,
                tab: 'all',
                mdrender:true
            }
        }
    },
    //路由对象
    route: {
        data (transition){
            var self = this;

            //页面初次加载获取的数据
            // self.getData();

            //获取人气作品
            self.getPopulars();
        }
    },
    methods: {
        getPopulars(){
            var self = this;
            let params = 'page='+self.searchKey.page+'&limit='+self.searchKey.limit+'&tab='+self.searchKey.tab+'&mdrender='+self.searchKey.mdrender;
            //获取数据
            self.$http({
                url: 'https://cnodejs.org/api/v1/topics?'+params,
                method: 'GET'
            }).then((response)=>{
                self.populars = response.data.data;

                if (self.vScroll) {
                    self.refreshScroll();
                }

                self.$nextTick(()=>{
                    //DOM现在更新了
                    var _self = this;

                    if (!self.vScroll) {

                        self.vScroll = new IScroll('#popular-wrapper',{
                            eventPassthrough: true,
                            scrollX: true,
                            scrollY: false,
                            preventDefault: false
                        });
                    }

                    //滚到底部时加载数据
                    self.vScroll.on('scrollEnd',function(e){
                        if (self.isVRefresh) {
                            return false;
                        }
                        if (-(this.x-document.body.clientWidth) >= this.scrollerWidth) {
                            console.log('turn right');
                            self.isVRefresh = true;
                            self.getScrollPopularsData();
                        }
                    });

                    self.$el.addEventListener('touchmove',function(e){
                        e.preventDefault();
                    },false);
                });
            });
        },
        getScrollPopularsData(){
            var self = this;
            self.searchKey.limit += 10;
            self.getPopulars();
        },
        refreshScroll(){
            let self = this,
                $popularWrapper = document.getElementById('popular-wrapper'),
                $ul = $popularWrapper.querySelector('ul'),
                liArray = $popularWrapper.querySelectorAll('li'),
                liNum = self.populars.length,
                scrollToNum = liNum>10?liNum-10:liNum;
            self.isVRefresh = false;
            //给容器赋宽度
            $ul.style.width = (liArray[0].clientHeight + 10) * liNum +'px';
            self.vScroll.refresh();
            self.vScroll.scrollToElement($popularWrapper.querySelector('li:nth-child('+scrollToNum+')'));
        }
    },
    components:{
        foot
    }
}
</script>
<style>
.h100 {
    height: 1rem;
}
.popular-scroller ul {
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
}
.popular-scroller li {
    width: 1.2rem;
    height: 1rem;
    float: left;
    line-height: 1rem;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: #fafafa;
    overflow: hidden;
    text-align: center;
}
</style>
