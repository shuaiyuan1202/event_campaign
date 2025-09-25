const { createApp } = Vue;

createApp({
    data() {
        return {
            // 页面状态
            currentPage: 'list', // 'list' | 'detail'
            activeTab: 'basic-info', // 'basic-info' | 'planning' | 'audience'
            
            // 模态框状态
            showCreateModal: false,
            showAudienceModal: false,
            showAudienceListModal: false,
            showMaterialModal: false,
            showConfigModal: false,
            
            // 活动数据
            campaigns: [
                {
                    id: 156,
                    name: '内容营销测试001',
                    type: '内容营销',
                    status: '执行中',
                    startTime: '2025-06-13 15:32',
                    products: 'group0110,group...',
                    description: '这是一个内容营销活动的测试'
                },
                {
                    id: 154,
                    name: '3333',
                    type: '内容营销',
                    status: '执行中',
                    startTime: '2025-08-12 17:42',
                    products: 'Delta_AD',
                    description: ''
                }
            ],
            
            // 新建活动表单
            newCampaign: {
                type: '会议营销',
                name: '',
                description: '',
                products: ''
            },
            
            // 当前查看的活动
            currentCampaign: {},
            
            // 标签页配置
            tabs: [
                { key: 'basic-info', name: '基本信息' },
                { key: 'planning', name: '活动规划' },
                { key: 'audience', name: '目标人群' }
            ],
            
            // 规划步骤
            planningSteps: [
                { key: 'audience', name: '目标人群', completed: false },
                { key: 'content', name: '内容', completed: false },
                { key: 'flow', name: '会议自动化流程', completed: false },
                { key: 'task', name: '任务设置', completed: false }
            ],
            taskSettings: {
                title: '',
                content: '',
                employeeSuggestion: 'rep-only',
                executorLogic: 'prefer-existing'
            },
            
            // 目标人群相关
            audienceCreated: false,
            audienceStats: {
                total: 11,
                regions: 32
            },
            audienceTags: [
                { id: 1, name: 'TST001 - A', selected: true },
                { id: 2, name: 'TST001 - B', selected: false },
                { id: 3, name: '贝伐珠单抗 - A', selected: false },
                { id: 4, name: '拉帕替尼 - A', selected: false },
                { id: 5, name: '更多...', selected: false }
            ],
            audienceRange: 'all',
            audience: {
                doctors: [
                    { id: 2462, name: '李大魁', code: 'AC00000000231', hospital: '中国医科大学院...', title: '', duty: '', specialty: '', gender: '男', department: '药剂科', removed: true },
                    { id: 2463, name: '董怡', code: 'AC00000000232', hospital: '中国医科大学院...', title: '', duty: '', specialty: '', gender: '女', department: '放疗科', removed: true },
                    { id: 2464, name: '魏丽', code: 'AC00000000234', hospital: '中国医科大学院...', title: '', duty: '', specialty: '', gender: '女', department: '心胸外科', removed: false },
                    { id: 2465, name: '丁国芳', code: 'AC00000000238', hospital: '中国医科大学院...', title: '', duty: '', specialty: '', gender: '女', department: '儿科', removed: true },
                    { id: 2466, name: '王丹华', code: 'AC00000000241', hospital: '中国人民解放军...', title: '', duty: '', specialty: '', gender: '女', department: '儿科', removed: false },
                    { id: 2467, name: '王会珍', code: 'AC00000000246', hospital: '中国医科大学院...', title: '', duty: '', specialty: '', gender: '女', department: '其他', removed: true },
                    { id: 2468, name: '陈晨', code: 'AC00000000351', hospital: '首都医科大学附...', title: '', duty: '', specialty: '', gender: '男', department: '药剂科', removed: true },
                    { id: 2469, name: '李玉珍', code: 'AC00000000384', hospital: '北京大学人民医院', title: '', duty: '', specialty: '', gender: '女', department: '药剂科', removed: false },
                    { id: 2470, name: '李清', code: 'AC00000000393', hospital: '北京大学第一医院', title: '', duty: '', specialty: '', gender: '男', department: '药剂科', removed: false },
                    { id: 2471, name: '王广发', code: 'AC00000000397', hospital: '北京大学第一医院', title: '', duty: '', specialty: '', gender: '男', department: '肝胆胰外科', removed: false },
                    { id: 2472, name: '杜怀清', code: 'AC00000000425', hospital: '北京大学第一医院', title: '', duty: '', specialty: '', gender: '女', department: '烧伤整形', removed: false }
                ]
            },
            
            // 内容材料相关
            selectedMaterials: [],
            tempSelectedMaterials: [], // 临时选择的材料
            allMaterials: [],
            currentMaterialPage: 1,
            materialsPerPage: 9,
            
            // 流程相关
            flowSaved: false,
            selectedFlowItems: {},
            currentEditingCardId: null,
            configModalTitle: '',
            configModalContent: '',
            
            // 流程数据
            flowData: {
                pre: {
                    title: '会前',
                    items: [
                        {
                            id: 'invite',
                            name: '参会人邀约',
                            desc: '将邀请函群发给计划邀请的医生',
                            icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                            editable: true,
                            settings: {
                                target: '计划邀请的医生',
                                time: 0,
                                pushChannel: '企业微信'
                            }
                        },
                        {
                            id: 'material_pre',
                            name: '材料推送',
                            desc: '将会议材料群发给参会人',
                            icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                            editable: true,
                            settings: {
                                target: '接受邀请的参会人',
                                time: 30,
                                pushChannel: '企业微信'
                            }
                        },
                        {
                            id: 'survey_pre',
                            name: '问卷推送',
                            desc: '将会议问卷群发给参会人',
                            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
                            editable: true,
                            settings: {
                                target: '接受邀请的参会人',
                                time: 15,
                                pushChannel: '企业微信'
                            }
                        }
                    ]
                },
                mid: {
                    title: '会中',
                    items: [
                        {
                            id: 'reminder',
                            name: '会前提醒',
                            desc: '会议开始前进行会议提醒',
                            icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
                            editable: true,
                            settings: {
                                target: '接受邀请的参会人',
                                timeMode: 'before',
                                timeValue: 5
                            }
                        }
                    ]
                },
                post: {
                    title: '会后',
                    items: [
                        {
                            id: 'material_post',
                            name: '材料推送',
                            desc: '将会议材料群发给参会人',
                            icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                            editable: true,
                            settings: {
                                target: '有效参会人',
                                time: 60,
                                pushChannel: '企业微信'
                            }
                        },
                        {
                            id: 'survey_post',
                            name: '问卷推送',
                            desc: '将会议问卷群发给参会人',
                            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
                            editable: true,
                            settings: {
                                target: '有效参会人',
                                time: 120,
                                pushChannel: '企业微信'
                            }
                        },
                        {
                            id: 'visit',
                            name: '拜访提醒',
                            desc: '对部分参会人为代表创建会后拜访任务',
                            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.975M15 10a4 4 0 11-8 0 4 4 0 018 0z',
                            editable: true,
                            settings: {
                                target: '有效参会人',
                                time: 1440
                            }
                        }
                    ]
                }
            }
        }
    },
    
    computed: {
        // 当前页面的材料
        currentPageMaterials() {
            const start = (this.currentMaterialPage - 1) * this.materialsPerPage;
            const end = start + this.materialsPerPage;
            return this.allMaterials.slice(start, end);
        },
        
        // 总页数
        totalMaterialPages() {
            return Math.ceil(this.allMaterials.length / this.materialsPerPage);
        }
    },
    
    mounted() {
        // 初始化材料数据
        this.initializeMaterials();
        // 默认切换到基本信息标签
        this.switchTab('basic-info');
    },
    
    methods: {
        // 页面切换
        goBackToList() {
            this.currentPage = 'list';
        },
        
        viewCampaignDetail(campaign) {
            this.currentCampaign = { ...campaign };
            this.currentPage = 'detail';
            this.switchTab('basic-info'); // 默认显示基本信息
        },
        
        // 标签切换
        switchTab(tabKey) {
            this.activeTab = tabKey;
        },
        
        // 模态框控制
        closeModalOnOverlay(event) {
            if (event.target === event.currentTarget) {
                this.showCreateModal = false;
                this.showAudienceModal = false;
                this.showMaterialModal = false;
                this.showConfigModal = false;
            }
        },
        
        // 创建活动
        createCampaign() {
            if (!this.newCampaign.name.trim()) {
                alert('活动名称不能为空！');
                return;
            }
            
            // 创建新活动
            const newId = Math.max(...this.campaigns.map(c => c.id)) + 1;
            const campaign = {
                id: newId,
                name: this.newCampaign.name,
                type: this.newCampaign.type,
                status: '草稿',
                startTime: new Date().toLocaleString('zh-CN'),
                products: this.newCampaign.products,
                description: this.newCampaign.description
            };
            
            this.campaigns.unshift(campaign);
            
            // 重置表单
            this.newCampaign = {
                type: '会议营销',
                name: '',
                description: '',
                products: ''
            };
            
            this.showCreateModal = false;
            alert('活动创建成功！');
        },
        
        // 产品标签处理
        getProductTags(products) {
            if (!products) return [];
            return products.split(',').map(p => p.trim()).filter(p => p);
        },
        
        // 滚动到指定区域
        scrollToSection(sectionKey) {
            const element = document.getElementById(`section-${sectionKey}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
        
        // 目标人群相关方法
        toggleTag(tagId) {
            const tag = this.audienceTags.find(t => t.id === tagId);
            if (tag) {
                tag.selected = !tag.selected;
            }
        },
        
        createAudience() {
            this.audienceCreated = true;
            this.showAudienceModal = false;
            this.planningSteps[0].completed = true;
            alert('目标人群创建成功！');
        },
        
        recreateAudience() {
            this.audienceCreated = false;
        },
        
        // 初始化材料数据
        initializeMaterials() {
            this.allMaterials = [];
            for (let i = 1; i <= 25; i++) {
                this.allMaterials.push({
                    id: i,
                    name: `内容材料 ${i}`,
                    publishTime: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
                });
            }
        },
        
        // 材料选择相关方法
        isMaterialSelected(materialId) {
            return this.tempSelectedMaterials.some(m => m.id === materialId);
        },
        
        toggleMaterial(material) {
            const index = this.tempSelectedMaterials.findIndex(m => m.id === material.id);
            if (index > -1) {
                this.tempSelectedMaterials.splice(index, 1);
            } else {
                this.tempSelectedMaterials.push({ ...material });
            }
        },
        
        confirmSelectMaterial() {
            this.selectedMaterials = [...this.tempSelectedMaterials];
            this.showMaterialModal = false;
            if (this.selectedMaterials.length > 0) {
                this.planningSteps[1].completed = true;
            }
        },
        
        removeMaterial(materialId) {
            this.selectedMaterials = this.selectedMaterials.filter(m => m.id !== materialId);
            this.tempSelectedMaterials = this.tempSelectedMaterials.filter(m => m.id !== materialId);
            if (this.selectedMaterials.length === 0) {
                this.planningSteps[1].completed = false;
            }
        },
        
        // 分页相关方法
        changePage(page) {
            if (page >= 1 && page <= this.totalMaterialPages) {
                this.currentMaterialPage = page;
            }
        },
        
        // 流程相关方法
        isFlowCardSelected(cardId, phase) {
            return this.selectedFlowItems[phase] && this.selectedFlowItems[phase].includes(cardId);
        },
        
        toggleFlowCard(cardId, phase) {
            if (!this.selectedFlowItems[phase]) {
                this.selectedFlowItems[phase] = [];
            }
            
            const index = this.selectedFlowItems[phase].indexOf(cardId);
            if (index > -1) {
                this.selectedFlowItems[phase].splice(index, 1);
            } else {
                this.selectedFlowItems[phase].push(cardId);
            }
        },
        
        getSelectedFlowItems(phase) {
            if (!this.selectedFlowItems[phase]) return [];
            return this.flowData[phase].items.filter(item => 
                this.selectedFlowItems[phase].includes(item.id)
            );
        },
        
        saveFlow() {
            this.flowSaved = true;
            this.planningSteps[2].completed = true;
        },
        
        editFlow() {
            this.flowSaved = false;
        },
        
        // 配置模态框相关方法
        openConfigModal(cardId) {
            this.currentEditingCardId = cardId;
            
            // 查找对应的卡片
            let targetCard = null;
            for (const phase in this.flowData) {
                targetCard = this.flowData[phase].items.find(item => item.id === cardId);
                if (targetCard) break;
            }
            
            if (!targetCard) return;
            
            this.configModalTitle = `配置 - ${targetCard.name}`;
            this.configModalContent = this.generateConfigForm(targetCard);
            this.showConfigModal = true;
        },
        
        generateConfigForm(card) {
            const settings = card.settings;
            let formHtml = '';
            
            if (card.id === 'reminder') {
                formHtml = `
                    <div class="form-group">
                        <label>推送对象</label>
                        <select class="form-select" id="config-target">
                            <option value="接受邀请的参会人" ${settings.target === '接受邀请的参会人' ? 'selected' : ''}>接受邀请的参会人</option>
                            <option value="有效参会人" ${settings.target === '有效参会人' ? 'selected' : ''}>有效参会人</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>提醒时间</label>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <select class="form-select" id="config-time-mode" style="width: auto;">
                                <option value="before" ${settings.timeMode === 'before' ? 'selected' : ''}>会议开始前</option>
                                <option value="after" ${settings.timeMode === 'after' ? 'selected' : ''}>会议结束后</option>
                            </select>
                            <input type="number" class="form-control" id="config-time-value" value="${settings.timeValue}" style="width: 80px;">
                            <span>分钟</span>
                        </div>
                    </div>
                `;
            } else if (card.id === 'invite') {
                formHtml = `
                    <div class="form-group">
                        <label>推送对象</label>
                        <select class="form-select" id="config-target">
                            <option value="计划邀请的医生" ${settings.target === '计划邀请的医生' ? 'selected' : ''}>计划邀请的医生</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>推送渠道</label>
                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="pushChannel" value="企业微信" ${settings.pushChannel === '企业微信' ? 'checked' : ''}> 企业微信
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="pushChannel" value="服务号" ${settings.pushChannel === '服务号' ? 'checked' : ''}> 服务号
                            </label>
                        </div>
                    </div>
                `;
            } else {
                formHtml = `
                    <div class="form-group">
                        <label>推送对象</label>
                        <select class="form-select" id="config-target">
                            <option value="接受邀请的参会人" ${settings.target === '接受邀请的参会人' ? 'selected' : ''}>接受邀请的参会人</option>
                            <option value="有效参会人" ${settings.target === '有效参会人' ? 'selected' : ''}>有效参会人</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>推送时间</label>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <input type="number" class="form-control" id="config-time" value="${settings.time}" style="width: 80px;">
                            <span>分钟后</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>推送渠道</label>
                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="pushChannel" value="企业微信" ${settings.pushChannel === '企业微信' ? 'checked' : ''}> 企业微信
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="pushChannel" value="服务号" ${settings.pushChannel === '服务号' ? 'checked' : ''}> 服务号
                            </label>
                        </div>
                    </div>
                `;
            }
            
            return formHtml;
        },
        
        saveConfig() {
            // 查找对应的卡片并更新设置
            let targetCard = null;
            for (const phase in this.flowData) {
                targetCard = this.flowData[phase].items.find(item => item.id === this.currentEditingCardId);
                if (targetCard) break;
            }
            
            if (!targetCard) return;
            
            // 获取表单数据
            const target = document.getElementById('config-target')?.value;
            
            if (this.currentEditingCardId === 'reminder') {
                const timeMode = document.getElementById('config-time-mode')?.value;
                const timeValue = document.getElementById('config-time-value')?.value;
                targetCard.settings = {
                    target: target,
                    timeMode: timeMode,
                    timeValue: parseInt(timeValue)
                };
            } else if (this.currentEditingCardId === 'invite') {
                const pushChannel = document.querySelector('input[name="pushChannel"]:checked')?.value;
                targetCard.settings = {
                    target: target,
                    time: 0,
                    pushChannel: pushChannel
                };
            } else {
                const time = document.getElementById('config-time')?.value;
                const pushChannel = document.querySelector('input[name="pushChannel"]:checked')?.value;
                targetCard.settings = {
                    target: target,
                    time: parseInt(time),
                    pushChannel: pushChannel
                };
            }
            
            this.showConfigModal = false;
        },
        
        getSettingsString(cardId, settings) {
            if (cardId === 'reminder') {
                const timeText = settings.timeMode === 'before' ? '会议开始前' : '会议结束后';
                return `推送对象: ${settings.target}<br>提醒时间: ${timeText} ${settings.timeValue} 分钟`;
            } else if (cardId === 'invite') {
                let settingsString = `推送对象: ${settings.target}`;
                if (settings.pushChannel) {
                    settingsString += `<br>推送渠道: ${settings.pushChannel}`;
                }
                return settingsString;
            } else {
                let settingsString = `推送对象: ${settings.target}<br>推送时间: ${settings.time} 分钟后`;
                if (settings.pushChannel) {
                    settingsString += `<br>推送渠道: ${settings.pushChannel}`;
                }
                return settingsString;
            }
        }
    }
}).mount('#app');