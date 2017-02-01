import seller from 'components/seller/seller'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'

export default [
    {
        path:'/',
        component:  goods
    },
    {
        path: '/seller',
        component: seller
    },
    {
        path: '/ratings',
        component: ratings
    }

]