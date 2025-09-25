const { createApp } = Vue;

createApp({
    data() {
        return {
            // 用户信息
            userInfo: {
                name: 'yongchun.xing',
                role: '代表1'
            },
            
            // 学术会议任务
            meetingTask: {
                title: '2025年心血管疾病诊疗新进展科室会',
                description: '展示（安络血公司：诊疗方案及适用人群）并强调可达龙在心律失常治疗中的优势',
                progress: {
                    completed: 0,
                    total: 2
                },
                status: {
                    completed: 0,
                    total: 1
                }
            },
            
            // 公告信息
            announcement: {
                title: '公告',
                content: 'CRM系统将于本月15日凌晨2:00-5:00进行升级维护，期间系统暂停使用，请各位提前做好工作安排。'
            },
            
            // 主数据管理项目
            dataItems: [
                { id: 1, label: '我的医院', icon: 'hospital', color: 'blue' },
                { id: 2, label: '我的医生', icon: 'doctor', color: 'blue' },
                { id: 3, label: '我的产品', icon: 'product', color: 'green' },
                { id: 4, label: '药店管理', icon: 'pharmacy', color: 'blue' },
                { id: 5, label: '新增患者数记录', icon: 'patient', color: 'green' },
                { id: 6, label: '医生(或医院)处方更新申请', icon: 'prescription', color: 'green' },
                { id: 7, label: '自标医生维护', icon: 'maintenance', color: 'green' },
                { id: 8, label: '经销商管理', icon: 'distributor', color: 'blue' },
                { id: 9, label: '经销商人员管理', icon: 'staff', color: 'blue' },
                { id: 10, label: '我的医院产品', icon: 'hospital-product', color: 'blue' },
                { id: 11, label: '我的工厂', icon: 'factory', color: 'blue' },
                { id: 12, label: '智能建议', icon: 'ai', color: 'orange' }
            ],
            
            // 活动管理项目
            activityItems: [
                { id: 1, label: '参会医生次数统计', icon: 'statistics', color: 'blue' },
                { id: 2, label: '讲者中心', icon: 'speaker', color: 'green' },
                { id: 3, label: '我的活动', icon: 'activity', color: 'blue' },
                { id: 4, label: '销量分析', icon: 'analysis', color: 'blue' }
            ],
            
            tasks: [], // 新增，用于存放从 tasks.json 加载的任务
            showCampaignDetailPage: false, // 控制详情页的显示
            currentCampaign: null, // 当前选择的营销活动
            showInappropriatePopup: false, // 控制“不合适”弹窗的显示
            inappropriateReasons: [ // “不合适”的原因选项
                { id: 1, text: '客户参会频次超限' },
                { id: 2, text: '区域预算不足' },
                { id: 3, text: '信息存在合规风险' },
                { id: 4, text: '信息重复或时机不当' },
                { id: 5, text: '客户近期无参会意愿' },
                { id: 6, text: '当前客户关系不适宜' },
                { id: 7, text: '与本地其他活动冲突' },
                { id: 8, text: '任务分配错误（非本人客户）' },
                { id: 9, text: '任务内容不适用于该客户' }
            ],
            selectedReasons: [], // 选中的原因
            
            // 底部导航
            
            // 底部导航
            navItems: [
                { id: 1, label: '首页', icon: 'home', active: true },
                { id: 2, label: '日程', icon: 'calendar', active: false },
                { id: 3, label: '工作', icon: 'work', active: false },
                { id: 4, label: '看板', icon: 'dashboard', active: false }
            ]
        };
    },
    
    mounted() {
        console.log('医药代表工作台页面已加载');
        
        // 可以在这里添加页面初始化逻辑
        this.initializePage();
    },
    
    methods: {
        // 页面初始化
        initializePage() {
            console.log('初始化页面数据');
            
            // 模拟加载用户数据
            this.loadUserData();
            
            // 加载任务数据
            this.loadTasks();
        },
        
        // 加载用户数据
        loadUserData() {
            // 这里可以从API获取用户数据
            console.log('加载用户数据:', this.userInfo);
        },
        
        // 从 tasks.json 加载任务数据
        loadTasks() {
            fetch('tasks.json')
                .then(response => response.json())
                .then(data => {
                    this.tasks = data;
                    console.log('成功加载任务数据:', this.tasks);
                })
                .catch(error => console.error('加载任务数据失败:', error));
        },

        // 处理学术会议任务完成
        handleCompleteTask(task) {
            if (task.mission_type !== '创建会议') {
                window.location.href = 'event.html';
            } else {
                this.currentCampaign = task;
                this.showCampaignDetailPage = true;
            }
        },

        closeCampaignDetailPage() {
            this.showCampaignDetailPage = false;
            this.currentCampaign = null;
        },

        openInappropriatePopup() {
            this.showInappropriatePopup = true;
        },

        closeInappropriatePopup() {
            this.showInappropriatePopup = false;
            this.selectedReasons = []; // 重置选项
        },

        submitInappropriateReasons() {
            if (this.selectedReasons.length === 0) {
                alert('请至少选择一个原因');
                return;
            }
            console.log('提交的不合适原因:', this.selectedReasons);
            this.closeInappropriatePopup();
            this.closeCampaignDetailPage();
            // 在这里可以添加将原因发送到服务器的逻辑
        },

        executeCampaign() {
            window.location.href = 'event.html';
        },
        
        // 处理数据项点击
        handleDataItemClick(item) {
            console.log('点击数据项:', item.label);
            alert(`打开 ${item.label} 页面`);
            // 这里可以添加具体的页面跳转逻辑
        },
        
        // 处理活动项点击
        handleActivityItemClick(item) {
            console.log('点击活动项:', item.label);
            alert(`打开 ${item.label} 页面`);
            // 这里可以添加具体的页面跳转逻辑
        },
        
        // 处理底部导航点击
        handleNavClick(clickedItem) {
            // 重置所有导航项的激活状态
            this.navItems.forEach(item => {
                item.active = item.id === clickedItem.id;
            });
            
            console.log('切换到:', clickedItem.label);
            
            // 根据不同的导航项执行不同的操作
            switch(clickedItem.label) {
                case '首页':
                    // 已经在首页，无需操作
                    break;
                case '日程':
                    alert('跳转到日程页面');
                    break;
                case '工作':
                    alert('跳转到工作页面');
                    break;
                case '看板':
                    alert('跳转到看板页面');
                    break;
            }
        },
        
        // 处理悬浮按钮点击
        handleFabClick() {
            console.log('点击悬浮按钮');
            alert('打开快捷操作菜单');
            // 这里可以显示快捷操作菜单
        },
        
        // 处理菜单按钮点击
        handleMenuClick() {
            console.log('点击菜单按钮');
            alert('打开侧边菜单');
            // 这里可以显示侧边菜单
        },
        
        // 查看全部公告
        viewAllAnnouncements() {
            console.log('查看全部公告');
            alert('跳转到公告列表页面');
        },
        
        // 格式化进度显示
        formatProgress(progress) {
            return `${progress.completed}/${progress.total}`;
        }
    }
}).mount('#app');