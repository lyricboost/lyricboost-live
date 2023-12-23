// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'mdi:view-dashboard'
  },
  {
    title: 'Song Book',
    path: '/song-book',
    icon: 'mdi:email-outline'
  }
]

export default navigation
