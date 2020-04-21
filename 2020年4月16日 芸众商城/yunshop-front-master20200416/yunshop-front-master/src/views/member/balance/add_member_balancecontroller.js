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
            ]
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
        submit(){
            let that = this;
            let json = {
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
                    additional_glass_risk:this.glassRisk,
                    note:this.Memoinformation
                }
            }
            let urls = 'plugin.supplier.frontend.insurance.insurance-add'
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

    },
    components: {
        cTitle
    }
};