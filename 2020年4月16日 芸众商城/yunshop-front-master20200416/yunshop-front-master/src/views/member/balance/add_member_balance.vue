<template>
    <div id="addBalance">
        <c-title :hide="false" text="保单添加"></c-title>
        <div class="content">
            <van-cell-group>
                <van-field type="number" :clearable="true" label="序号:" v-model="serial_number" placeholder="请输入序号" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="店面名称:" v-model="storeName" placeholder="请输入店面名称" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="被保险人:" v-model="insuer" placeholder="请输入营业执照公司名称或法人姓名" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="证件号码:" v-model="certificateNumber" placeholder="请输入营业执照信用代码、法人身份证号码" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="被保险人联系方式:" v-model="information" placeholder="请输入保险人联系方式" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="保险地址:" v-model="insuranceAddress" placeholder="**省**市**区/县**乡/镇**路**号" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="投保财产:" v-model="insuredProperty" placeholder="需如实填写,尽可能全面" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="用户类型: " v-model="usertype" placeholder="例如（店铺、仓库、工厂、金店）" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="保额（万元）:" v-model="amountForce" placeholder="请输入保额" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="保险期限 (年):" v-model="insurancePeriod" placeholder="请输入保险期限" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="保费 (元):" v-model="premium" placeholder="请输入保费" />
            </van-cell-group>
            <van-cell title="投保险种:" is-link :value="insuranceTypeVal?insuranceTypeVal:'请选择投保险种'"  @click="insuranceTypeshowBtn"/>
            <van-cell-group>
                <van-field :clearable="true" label="附加玻璃险（35元保1万）份:" v-model="glassRisk " placeholder="请输入玻璃险" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="投保人: " v-model="insurer" placeholder="请输入投保人" />
            </van-cell-group>
            <van-cell-group>
                <van-field :clearable="true" label="备注信息: " v-model="Memoinformation" placeholder="请输入备注信息" />
            </van-cell-group>
            <div class="button">
                <van-button type="danger" round  size="large" @click="submit">添加保单</van-button>
            </div>
        </div>
        <van-popup v-model="insuranceTypeshow" position="bottom">
            <van-picker :show-toolbar="true" @confirm="insuranceTypebtn" @cancel="insuranceTypeClose" :columns="columns"/>
        </van-popup>
    </div>
</template>

<script>
    import add_member_balance from "./add_member_balancecontroller";
    export default add_member_balance;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    #addBalance{
        padding-top: 40px;
        .content{
          text-align: left;
            .button{
                padding:1rem;
            }
        }
    }
</style>