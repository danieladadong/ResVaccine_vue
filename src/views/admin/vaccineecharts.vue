<template>
    <div>
        <div style="width: 100%; height: 380px;float:left;" ref="vaccine"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
import {getVaccinesEcharts} from '@/api/modules/statictis'
import cookie from 'js-cookie'
export default {
    data() { 
        return { 
            points: null,
            certif: null,
            adult: null,
            child: null,
            vaccine: null
        }
    },
    created(){

    },
    mounted() {
        this.init();
        this.getDataList();
    },
     methods: {
        init() {
            //2.初始化
            this.vaccine = echarts.init(this.$refs.vaccine);
            //3.配置数据
            let voption = {
            title:{text:'疫苗总接种数'},
            xAxis: {data: [] }, //X轴
            yAxis: {}, //Y轴
            series: [{ data: [], type: 'bar' }],
            label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                    color: 'black',
                    fontSize: 16
                }
            }
            };
            // 4.传入数据
            this.vaccine.setOption(voption);
        },
        getDataList(){
            let reqs = {
                vsid:cookie.get("vsid")
            }
            getVaccinesEcharts(reqs).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                if(resp.status==200){
                     for(var i=0;i<resp.data.length;i++){
                        xaxis.push(resp.data[i].name)
                        yaxis.push(resp.data[i].total)
                     }
                }
                this.vaccine.setOption({
                    xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                });
            });
        }
    }
}
</script>