import { shallowMount,mount } from '@vue/test-utils'
import videoCard from '@/components/videoCard.vue'

describe('articleCard.vue', () => {
    it('props传参测试1', () => {
        var content={
            id:1,
            cover:"1",//封面
            title:"钢琴烤串",
            releaseTime:"2022-04-04 12:12:12",//发布时间
            user:{
                avatar:"http://qn.cugxp.top//user_head_pic/test.png",//头像地址
                nickname:"手工耿",//昵称
            },
            duration:"40",//时长
            playTimes:"40",//播放次数
            secondType:"建筑"//二级分类
        };
        const  wrapper=shallowMount(videoCard,{

            propsData: {
                content:content
            }
        });
        var vm=wrapper.vm;
        expect(vm.props.content).toBe(content);
        expect(wrapper.text()).toMatch("钢琴烤串2022-04-04 12:12:1240秒40次播放");
    });
    it('props传参测试2', () => {
        var content={
            id:1,
            cover:"http://qn.cugxp.top//user_head_pic/test.png",//封面
            title:"测试",
            releaseTime:"2022-04-04 12:12:12",//发布时间
            user:{
                avatar:"http://qn.cugxp.top//user_head_pic/test.png",//头像地址
                nickname:"手工耿2",//昵称
            },
            duration:"80",//时长
            playTimes:"80",//播放次数
            secondType:"建筑"//二级分类
        };
        const  wrapper=mount(videoCard,{
            propsData: {
                content:content
            },
            mocks: {
                $router:{
                    push:jest.fn(() => Promise.resolve())
                }
            }
        });
        var vm=wrapper.vm;
        expect(vm.props.content).toBe(content);
        expect(wrapper.text()).toMatch("测试2022-04-04 12:12:12建筑80秒80次播放");
    });
    it('部分存在性测试', () => {
        var content={
            id:1,
            cover:"http://qn.cugxp.top//user_head_pic/test.png",//封面
            title:"测试",
            releaseTime:"2022-04-04 12:12:12",//发布时间
            user:{
                avatar:"http://qn.cugxp.top//user_head_pic/test.png",//头像地址
                nickname:"手工耿2",//昵称
            },
            duration:"80",//时长
            playTimes:"80",//播放次数
            secondType:"建筑"//二级分类
        };
        const  wrapper=mount(videoCard,{
            propsData: {
                content:content
            },
            mocks: {
                $router:{
                    push:jest.fn(() => Promise.resolve())
                }
            }
        });
        expect(wrapper.classes('videoCard')).toBe(true)
    });
})
