export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/manage/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Cài đặt tài khoản']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Cập nhật thông tin',
        to: '/manage/update',
        icon: 'cil-puzzle'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Đổi mật khẩu',
        to: '/ForgetPass',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Quản lý']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Quản lý',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'Quản lý người dùng',
            to: '/manage/users'
          },
          {
            name: 'Quản lý quán',
            to: '/manage/store'
          }
        ]
      }
    ]
  }
]