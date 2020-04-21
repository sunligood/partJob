import cTitle from "components/title";
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            serial_number:'',
            storeName:'',
            insuer:'',
            certificateNumber:'',
            information:'',
            insuranceAddress:'',
            insuredProperty:'',
            usertype:'',
            amountForce:'',
            insurancePeriod:'',
            premium:'',
            insuranceTypeVal:'',
            glassRisk:'',
            insurer:'',
            Memoinformation:'',
            insuranceTypeshow:false,
            columns: [
                { text: '火险+盗抢', },
                { text: '单独盗抢',}
            ],
            id:''
        };
    },
    methods: {
        insuranceTypeshowBtn(){
            this.insuranceTypeshow = true;
        },
        insuranceTypebtn(e){
            this.insuranceTypeVal = e.text;
            this.insuranceTypeshow = false;
        },
        insuranceTypeClose(){
            this.insuranceTypeshow = false;
        },
        getJson(){
            let that = this;
            let json = {id: that.id}
            let urls = 'plugin.supplier.frontend.insurance.insurance-edit'
            $http.post(urls, json).then(function (response) {
                if (response.result == 1) {
                    that.serial_number = response.data.serial_number;
                    that.storeName = response.data.shop_name;
                    that.insuer =  response.data.insured;
                    that.certificateNumber = response.data.identification_number;
                    that.information = response.data.phone;
                    that.insuranceAddress = response.data.address;
                    that.insuredProperty = response.data.insured_property;
                    that.usertype = response.data.customer_type;
                    that.amountForce = response.data.insured_amount;
                    that.insurancePeriod= response.data.guarantee_period;
                    that.premium = response.data.premium;
                    that.insurer = response.data.insurance_company;
                    that.insuranceTypeVal=response.data.insurance_coverage;
                    that.glassRisk= response.data.additional_glass_risk;
                    that.Memoinformation=response.data.note;
                } else {
                    that.$notify(response.msg)
                }
            }, function (response) {})
        },
        submit(){
            let that = this;
            let json ={
                id: this.id,
                data:{
                    serial_number:this.serial_number,
                    shop_name:this.storeName,
                    insured:this.insuer,
                    identification_number:this.certificateNumber,
                    phone:this.information,
                    address:this.insuranceAddress,
                    insured_property:this.insuredProperty,
                    customer_type:this.usertype,
                    insured_amount:this.amountForce,
                    guarantee_period:this.insurancePeriod,
                    premium:this.premium,
                    insurance_company:this.insurer,
                    insurance_coverage:this.insuranceTypeVal,
                    additional_glass_risk :this.glassRisk,
                    note:this.Memoinformation
                }
            }
            let urls = 'plugin.supplier.frontend.insurance.insurance-edit'
            $http.post(urls, json).then(function (response) {
                if (response.result == 1) {
                    Toast(response.msg);
                    that.$router.go(-1);
                } else {
                    that.$notify(response.msg)
                }
            }, function (response) {})
        }
    },
    activated() {
        this.id = this.$route.params.id;
        this.getJson()
    },
    components: {
        cTitle
    }
};