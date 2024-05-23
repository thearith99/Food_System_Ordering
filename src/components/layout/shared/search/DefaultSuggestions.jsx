// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Third-party Imports
import { useKBar } from 'kbar'
import classnames from 'classnames'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const defaultSuggestions = [
  {
    sectionLabel: 'Popular Searches',
    items: [
      {
<<<<<<< HEAD
        label: 'Dashboards',
        href: '/dashboards/crm',
        icon: 'tabler-layout-dashboard-filled'
      },
      {
        label: 'Ordering',
        href: '/apps/ordering',
        icon: 'tabler-border-all'
      },
      {
        label: 'Location Order',
        href: '/apps/locationOrder',
        icon: 'tabler-current-location'
      },
      {
        label: 'Branching',
        href: '/apps/branching',
        icon: 'tabler-git-branch'
=======
        label: 'Analytics',
        href: '/dashboards/analytics',
        icon: 'tabler-trending-up'
      },
      {
        label: 'CRM',
        href: '/dashboards/crm',
        icon: 'tabler-chart-pie-2'
      },
      {
        label: 'eCommerce',
        href: '/dashboards/ecommerce',
        icon: 'tabler-shopping-cart'
      },
      {
        label: 'User List',
        href: '/apps/user/list',
        icon: 'tabler-file-description'
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
      }
    ]
  },
  {
    sectionLabel: 'Apps',
    items: [
      {
<<<<<<< HEAD
        label: 'POS',
        href: '/apps/pos',
        icon: 'tabler-http-post'
      },
      {
        label: 'Customer',
=======
        label: 'Customer List',
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
        href: '/apps/customer',
        icon: 'tabler-user-square'
      },
      {
<<<<<<< HEAD
        label: 'List Food',
        href: '/apps/items/listFood',
        icon: 'tabler-menu-2'
      },
      {
        label: 'List Category',
        href: '/apps/items/listCategory',
        icon: 'tabler-menu-2'
=======
        label: 'Invoice List',
        href: '/apps/invoice/list',
        icon: 'tabler-file-info'
      },
      {
        label: 'User List',
        href: '/apps/user/list',
        icon: 'tabler-file-invoice'
      },
      {
        label: 'Roles & Permissions',
        href: '/apps/roles',
        icon: 'tabler-lock'
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
      }
    ]
  },
  {
    sectionLabel: 'Pages',
    items: [
      {
        label: 'User Profile',
        href: '/pages/user-profile',
        icon: 'tabler-user'
      },
      {
        label: 'Account Settings',
        href: '/pages/account-settings',
        icon: 'tabler-settings'
      },
      {
        label: 'Pricing',
        href: '/pages/pricing',
        icon: 'tabler-currency-dollar'
      },
      {
        label: 'FAQ',
        href: '/pages/faq',
        icon: 'tabler-help-circle'
      }
    ]
  },
  {
    sectionLabel: 'Forms & Charts',
    items: [
      {
        label: 'Form Layouts',
        href: '/forms/form-layouts',
        icon: 'tabler-layout'
      },
      {
        label: 'Form Validation',
        href: '/forms/form-validation',
        icon: 'tabler-checkup-list'
      },
      {
        label: 'Form Wizard',
        href: '/forms/form-wizard',
        icon: 'tabler-git-merge'
      },
      {
        label: 'Apex Charts',
        href: '/charts/apex-charts',
        icon: 'tabler-chart-ppf'
      }
    ]
  }
]

const DefaultSuggestions = () => {
  // Hooks
  const { query } = useKBar()
  const { lang: locale } = useParams()

  return (
    <div className='flex grow flex-wrap gap-x-[48px] gap-y-8 plb-14 pli-16 overflow-y-auto overflow-x-hidden'>
      {defaultSuggestions.map((section, index) => (
        <div
          key={index}
          className='flex flex-col justify-center overflow-x-hidden gap-4 basis-full sm:basis-[calc((100%-3rem)/2)]'
        >
          <p className='text-xs leading-[1.16667] uppercase text-textDisabled tracking-[0.8px]'>
            {section.sectionLabel}
          </p>
          <ul className='flex flex-col gap-4'>
            {section.items.map((item, i) => (
              <li key={i} className='flex'>
                <Link
                  href={getLocalizedUrl(item.href, locale)}
                  onClick={query.toggle}
                  className='flex items-center overflow-x-hidden cursor-pointer gap-2 hover:text-primary focus-visible:text-primary focus-visible:outline-0'
                >
                  {item.icon && <i className={classnames(item.icon, 'flex text-xl')} />}
                  <p className='text-[15px] leading-[1.4667] truncate'>{item.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default DefaultSuggestions
