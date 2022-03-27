import Vue from 'vue'
import {Form,FormItem,Button,Container,Header,Aside,Main,Menu,Submenu,MenuItemGroup,MenuItem,Card,TableColumn,Table,Pagination,Row,Col,Dialog,MessageBox,RadioGroup,Radio} from 'element-ui'
import { Input } from 'element-ui'
//导入弹窗提示框
import {Message} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
