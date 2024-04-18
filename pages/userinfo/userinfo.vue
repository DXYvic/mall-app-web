<template>
	<view>
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<text class="bg-upload-btn yticon icon-paizhao">{{userInfo.status==1?'启用中':'未启用'}}</text>
			<view class="portrait-box">
				<image class="portrait" :src="userInfo.icon || '/static/missing-face.png'"></image>
				<text class="pt-upload-btn yticon icon-paizhao" @click="changeicon">更新头像</text>
			</view>
		</view>

		<view>
			<form @submit="formSubmit" @reset="formReset">



				<view class="uni-form-item" style="margin: 15px;">
					<view class="title">用户名</view>
					<input class="uni-input" name="input" :placeholder="userInfo.username" />
					
				</view>
				<view class="uni-form-item" style="margin: 15px;">
					<view class="title">昵称</view>
					<input class="uni-input" name="input" :placeholder="userInfo.nickname" />
				</view>
				<view class="uni-form-item" style="margin: 15px;">
					    <radio-group v-model="gender">
							<view class="title">性别</view>
					      <label class="radio-label" v-for="(item, index) in genderOptions" :key="index">
					        <radio :value="item.value">{{ item.label }}</radio>
					      </label>
					    </radio-group>
				</view>
				<view class="uni-form-item" style="margin: 15px;">
					<view class="title">手机号</view>
					<input class="uni-input" name="input" :placeholder="userInfo.phone" />
				</view>
				<view class="uni-form-item" style="margin: 15px;">
					<view class="title">地址</view>
					<input class="uni-input" name="input" :placeholder="userInfo.city" />
				</view>
				<view class="uni-form-item" style="margin: 15px;">
					<view class="title">修改密码</view>
					<input class="uni-input" type="password" name="password" placeholder="输入新密码"/>
				</view>

				<view class="btn-member">
					<button type="primary"  form-type="submit">提交</button><br>
					
					<button type="primary" plain="true" form-type="reset">重置</button><br>
					
				</view>
			</form>
		</view>

	</view>
</template>

<script>
	import { userInfo } from 'os';
import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				      gender: '0', // 假设用户性别为男
				      genderOptions: [
				        { label: '男', value: '1' },
				        { label: '女', value: '2' },
						{ label: '未知', value:'0'}
				      ]
			};
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}

	.user-section {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 460upx;
		padding: 40upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}

		.portrait-box {
			width: 200upx;
			height: 200upx;
			border: 6upx solid #fff;
			border-radius: 50%;
			position: relative;
			z-index: 2;
		}

		.portrait {
			position: relative;
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		

		.yticon {
			position: absolute;
			line-height: 1;
			z-index: 5;
			font-size: 48upx;
			color: #fff;
			padding: 4upx 6upx;
			border-radius: 6upx;
			background: rgba(0, 0, 0, .4);
		}

		.pt-upload-btn {
			font-size: 12px;
			right: 17px;
			// text-align: center;
			bottom: 10upx;
		}

		.uni-form-item .title {
			padding: 20rpx 0;
		}

		.bg-upload-btn {
			right: 20upx;
			bottom: 16upx;
		}	
		.uni-form-item{
			margin-bottom: 15px;
		}

		.btn-member{
			
		}
	}
</style>