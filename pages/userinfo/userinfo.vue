<template>
	<view>
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<text class="bg-upload-btn yticon icon-paizhao">{{userInfo.status==1?'启用中':'未启用'}}</text>
			<view class="portrait-box">
				<image class="portrait" :src="userInfo.icon || '/static/missing-face.png'"></image>
				<text class="pt-upload-btn yticon icon-paizhao">更新头像</text>
			</view>
		</view>

		<view>
			<form @submit="formSubmit" @reset="formReset">



				<view class="uni-form-item uni-column">
					<view class="title">用户名</view>
					<input class="uni-input" name="input" :placeholder="userInfo.username" />
					
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">昵称</view>
					<input class="uni-input" name="input" :placeholder="userInfo.nickname" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">性别</view>
					<radio-group name="radio" v-model="userInfo.gender">
						<label>
							<radio :value="1"  /><text>男</text>
						</label>
						<label>
							<radio :value="2"  /><text>女</text>
						</label>
						<label>
							<radio :value="0"  /><text>未知</text>
						</label>
					</radio-group>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">手机号</view>
					<input class="uni-input" name="input" :placeholder="userInfo.phone" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">地址</view>
					<input class="uni-input" name="input" :placeholder="userInfo.city" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">密码</view>
					<input class="uni-input" name="input" :placeholder="userInfo.nickname" />
				</view>

				<view class="uni-btn-v">
					<button form-type="submit">提交</button>
					<button type="default" form-type="reset">重置</button>
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
		
	}
</style>