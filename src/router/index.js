import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'

// import Message from 'element-ui'

Vue.use(Router)

const router = new Router({

  routes: [
    {
      
      // name: 'HelloWorld',
      // component: HelloWorld
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children:[
        {
          name: 'users',
          path: 'users',
          component: Users
          
        },{
          name: 'rights',
          path: '/rights',
          component: Right
        },{
          name: 'roles',
          path: '/roles',
          component: Role
        }
      ]
      
    }
  ]
})


router.beforeEach((to, from, next) => {
  next()
  if(to.path==='/login'){
    next()
  } else {
    const token = localStorage.getItem('token')
    if(!token){
      // Message.warning('回到登录页')
      router.push({
        name:'login'
      })
      return
    }
    next()
  }



})

export default router
