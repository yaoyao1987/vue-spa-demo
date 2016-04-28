'use strict'

export default function(router) {
    router.map({
        '/': {
            name: 'home',
            component(resolve) {
                require(['./views/index.vue'], resolve)
            }
        },
        '/detail/:id': {
            name: 'detail',
            component(resolve) {
                require(['./views/detail.vue'], resolve)
            }
        }
    })
}
