export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: any;
  title?: boolean;
  children?: any;
  variant?: string;
  attributes?: object;
  divider?: boolean;
  class?: string;
}
function datosNavData(n: NavData) {
  console.log(n.name);
}

export const navItems: NavData[] = [
  {
    name: 'TecNM',
    url: '/dashboard',
    icon: 'icon-speedometer',
    /*badge: {
      variant: 'info',
      text: 'NEW'
    }*/
  },
  {
    name: 'Seguimiento de Egresados',
    url: '/base',
    icon: 'icon-screen-desktop',
    children: [
      {
        name: 'Encuestas',
        url: '/http://google.com',
        icon: 'icon-puzzle'
      },
      {
        name: 'Notificaciones',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Empleadores',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Roles',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    name: 'Sistema2',
    url: '/buttons',
    icon: 'icon-screen-desktop',
    children: [
      {
        name: '2.1',
        url: '/buttons/buttons',
        icon: 'icon-puzzle'
      },
      {
        name: '2.2',
        url: '/buttons/dropdowns',
        icon: 'icon-puzzle'
      },
      {
        name: '2.3',
        url: '/buttons/brand-buttons',
        icon: 'icon-puzzle'
      }
    ]
  },
  /*  {
      name: 'Cha',
      url: '/charts',
      icon: 'icon-pie-chart'
    },*/
  {
    name: 'Sistema 3',
    url: '/icons',
    icon: 'icon-screen-desktop',
    children: [
      {
        name: '3.1',
        url: '/icons/coreui-icons',
        icon: 'icon-puzzle',
        /*badge: {
          variant: 'success',
          text: 'NEW'
        }*/
      },
      {
        name: '3.2',
        url: '/icons/flags',
        icon: 'icon-puzzle'
      },
      {
        name: '3.3',
        url: '/icons/font-awesome',
        icon: 'icon-puzzle',
        /*badge: {
          variant: 'secondary',
          text: '4.7'
        }*/
      },
      {
        name: '3.4',
        url: '/icons/simple-line-icons',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Sistema 4',
    url: '/notifications',
    icon: 'icon-screen-desktop',
    children: [
      {
        name: '4.1',
        url: '/notifications/alerts',
        icon: 'icon-puzzle'
      },
      {
        name: '4.2',
        url: '/notifications/badges',
        icon: 'icon-puzzle'
      },
      {
        name: '4.3',
        url: '/notifications/modals',
        icon: 'icon-puzzle'
      }
    ]
  },
];
