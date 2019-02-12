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

export const navItems: NavData[] = [
  {
    name: 'Sistemas',
    url: '/dashboard',
    icon: 'icon-speedometer',
    /*badge: {
      variant: 'info',
      text: 'NEW'
    }*/
  },
  {
    name: 'Sistema 1',
    url: '/base',
    icon: 'icon-screen-desktop',
    children: [
      {
        name: '1.1',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: '1.2',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: '1.3',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: '1.4',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      /*{
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }*/
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
 /* {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },*/
  /*{
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },*/
 /* {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }*/
];
