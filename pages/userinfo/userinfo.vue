<template>

	<view class="content">
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<text class="bg-upload-btn yticon icon-paizhao">{{userInfo.status==1?'已启用':'未启用'}}</text>
			<view class="portrait-box">
				
				
				
				<image class="portrait" :src="userInfo.icon || '/static/missing-face.png'"></image>
				<text class="pt-upload-btn yticon icon-paizhao">更换头像</text>
				
				
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">账号：</text>
			<input class="input" type="text" v-model="userInfo.username" placeholder="账号"
				placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">昵称：</text>
			<input class="input" type="text" v-model="userInfo.nickname" placeholder="昵称"
				placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">性别</text>
			<!-- <switch :checked="userInfo.gender==1" color="#fa436a" @change="switchChange" /> -->
			<radio-group name="radio" v-model="userInfo.gender">
				<label>
					<radio :checked="userInfo.gender==1" @click="handleGenderChange(1)" /><text>男</text>
				</label>
				<label>
					<radio :checked="userInfo.gender==2" @click="handleGenderChange(2)" /><text>女</text>
				</label>
				<label>
					<radio :checked="userInfo.gender==0" @click="handleGenderChange(0)" /><text>未知</text>
				</label>
			</radio-group>
		</view>
		<view class="row b-b">
			<text class="tit">手机号码：</text>
			<input class="input" type="number" v-model="userInfo.phone" placeholder="手机号码"
				placeholder-class="placeholder" />
		</view>
		<!-- 		<view class="row b-b">
			<text class="tit">所在区域</text>
			<text @click="chooseLocation" class="input">
				{{addressData.province}} {{addressData.city}} {{addressData.region}}
			</text>
			<text class="yticon icon-shouhuodizhi" @click="chooseLocation"></text>
		</view> -->
		<view class="row b-b">
			<text class="tit">密码</text>
			<input class="input" type="password" v-model="userInfo.password" placeholder="所在区域"
				placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">详细地址：</text>
			<input class="input" type="text" v-model="userInfo.city" placeholder="详细地址"
				placeholder-class="placeholder" />
		</view>
		<!-- {{userInfo.gender}} -->
		<!-- <view class="row default-row">
			
		</view> -->
		<button class="add-btn" style="background: #1fd8b3;" @click="confirm">提交</button>
		<button class="add-btn">取消</button>
		<br>
	</view>
</template>

<script>
	import {
		chooseImage,
		uploadFiles,
		uploadImage,
		delImage,
		previewImage
	} from '@/components/upload-images';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		addAddress,
		updateAddress,
		fetchAddressDetail
	} from '@/api/address.js';
	import {
		memberInfo,
		updateMember
	} from '@/api/member.js';
	import {
		userInfo
	} from 'os';
	export default {
		components:{
			chooseImage,
			uploadFiles,
			uploadImage,
			delImage,
			previewImage
		},
		
		
		data() {
			return {
				memberData: {
					id: '',
					username: '',
					nickname: '',
					phone: '',
					status: '',
					icon: '',
					gender: '',
					city: '',
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		onLoad(option) {
			let title = '个人资料';
			if (option.type === 'edit') {
				title = '编辑个人资料'
				memberInfo().then(response => {
					this.memberData = response.data;
				});
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			//动态更改性别
			handleGenderChange(value) {
				this.userInfo.gender = value;
			},

			//提交
			confirm() {
				this.memberData.id = this.userInfo.id;
				this.memberData.username = this.userInfo.username;
				this.memberData.nickname = this.userInfo.nickname;
				this.memberData.password = this.userInfo.password;
				this.memberData.phone = this.userInfo.phone;
				this.memberData.icon = this.userInfo.icon;
				this.memberData.gender = this.userInfo.gender;
				this.memberData.city = this.userInfo.city;
				let data = this.memberData;
				if (!data.username) {
					this.$api.msg('请填写收货人姓名');
					return;
				}

				updateMember(this.memberData).then(response => {
					this.$message({
						message: '修改成功！',
						type: 'success'
					});
					//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
					setTimeout(() => {
						uni.navigateBack()
					}, 800)
				});


			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 150upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
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
			font-size: 10px;
			right: 22px;
			bottom: 10upx;
		}

		.bg-upload-btn {
			right: 20upx;
			bottom: 16upx;
		}
	}
</style>