<template>
    <div>
        <div style="width: 30%; height: 380px;float:left;" ref="points"></div>
        <div style="width: 30%; height: 380px;float:left;" ref="certif"></div>
        <div style="width: 30%; height: 380px;float:left;" ref="adult"></div>
        <div style="width: 30%; height: 380px;float:left;" ref="child"></div>
        <div style="width: 30%; height: 380px;float:left;" ref="vaccine"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
import {getPointsEcharts,getCertificateEcharts,getAdultEcharts,getChildEcharts,getVaccinesEcharts} from '@/api/modules/statictis'
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
            this.points = echarts.init(this.$refs.points);
            this.certif = echarts.init(this.$refs.certif);
            this.adult = echarts.init(this.$refs.adult);
            this.child = echarts.init(this.$refs.child);
            this.vaccine = echarts.init(this.$refs.vaccine);
            //3.配置数据
            let poption = {
                title:{text:'接种点疫苗总接种数'},
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
            let ceoption = {
            title:{text:'各疫苗总接种数'},
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
            let aoption = {
            title:{text:'成人疫苗总接种数'},
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
            let coption = {
            title:{text:'儿童疫苗总接种数'},
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
            this.points.setOption(poption);
            this.certif.setOption(ceoption);
            this.adult.setOption(aoption);
            this.child.setOption(coption);
            this.vaccine.setOption(voption);
        },
        getDataList(){
            let reqs = {
                vsid:cookie.get("vsid")
            }
            getPointsEcharts(reqs).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                if(resp.status==200){
                     for(var i=0;i<resp.data.length;i++){
                        xaxis.push(resp.data[i].name)
                        yaxis.push(resp.data[i].total)
                     }
                }
                this.points.setOption({
                    xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                });
            });
            getCertificateEcharts(reqs).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                if(resp.status==200){
                     for(var i=0;i<resp.data.length;i++){
                        xaxis.push(resp.data[i].name)
                        yaxis.push(resp.data[i].total)
                     }
                }
                this.certif.setOption({
                    xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                });
            });
            getAdultEcharts(reqs).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                if(resp.status==200){
                     for(var i=0;i<resp.data.length;i++){
                        xaxis.push(resp.data[i].name)
                        yaxis.push(resp.data[i].total)
                     }
                }
                this.adult.setOption({
                    xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                });
            });
            getChildEcharts(reqs).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                if(resp.status==200){
                     for(var i=0;i<resp.data.length;i++){
                        xaxis.push(resp.data[i].name)
                        yaxis.push(resp.data[i].total)
                     }
                }
                this.child.setOption({
                    xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                });
            });
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