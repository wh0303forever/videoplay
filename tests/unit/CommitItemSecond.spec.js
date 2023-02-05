import { shallowMount } from '@vue/test-utils'
import CommitItemSecond from '@/components/CommitItemSecond.vue'

describe('CommitItemSecond.vue', () => {
    it('props传参测试1', () => {
        var SecondComment={
            id:1,//评论id
            content:'asd',//评论内容
            user:{//评论者
                image_path:'asd',//头像地址
                user_name:'asd',//昵称
            },
            releaseTime:'2022-12-23 23:12：23',//发布时间
            commentUserId:1,//回复的评论的id
            userResponseNickname:'asd'//回复的用户的昵称
        };
        const  wrapper=shallowMount(CommitItemSecond,{
            propsData: {
                SecondComment:SecondComment,
                userid:1,
                isLogin:true,
                Freplying:false
            }
        });
        var vm=wrapper.vm;
        expect(vm.props.SecondComment).toBe(SecondComment);
        expect(vm.props.userid).toBe(1);
        expect(vm.props.isLogin).toBe(true);
        expect(vm.props.Freplying).toBe(false);
        expect(wrapper.text()).toBe('asd@：asd2022-12-23 23:12：23回复');
    });

    it('props传参测试2', () => {
        var SecondComment={
            id:1,//评论id
            content:'asd',//评论内容
            user:{//评论者
                image_path:'asd',//头像地址
                user_name:'asd',//昵称
            },
            releaseTime:'2022-12-23 23:12：23',//发布时间
            commentUserId:0,//回复的评论的id
            userResponseNickname:'asd'//回复的用户的昵称
        };
        const  wrapper=shallowMount(CommitItemSecond,{
            propsData: {
                SecondComment:SecondComment,
                userid:0,
                isLogin:true,
                Freplying:false
            }
        });
        var vm=wrapper.vm;
        expect(vm.props.SecondComment).toBe(SecondComment);
        expect(vm.props.userid).toBe(0);
        expect(vm.props.isLogin).toBe(true);
        expect(vm.props.Freplying).toBe(false);
        expect(wrapper.text()).toBe('asd@：asd2022-12-23 23:12：23回复');
    });
})
