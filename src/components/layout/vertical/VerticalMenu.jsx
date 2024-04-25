'use client'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const params = useParams()
  const { isBreakpointReached } = useVerticalNav()

  // Vars
  const { transitionDuration } = verticalNavOptions
  const { lang: locale, id } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {/* For Dashboard */}
        <MenuItem href={`/${locale}/dashboards/crm`} icon={<i className='tabler-layout-dashboard-filled' />}>
          {dictionary['navigation'].dashboards}
        </MenuItem>
        {/* For Ordering */}
        <MenuItem href={`/${locale}/apps/ordering`} icon={<i className='tabler-border-all' />}>
          Ordering
        </MenuItem>
        {/* For Location Order */}
        <MenuItem href={`/${locale}/apps/locationOrder`} icon={<i className='tabler-current-location' />}>
          Location Order
        </MenuItem>
        {/* For Branching */}
        <MenuItem href={`/${locale}/apps/branching`} icon={<i className='tabler-git-branch' />}>
          Branching
        </MenuItem>
        {/* For POS */}
        <MenuItem href={`/${locale}/apps/pos`} icon={<i className='tabler-http-post' />}>
          POS
        </MenuItem>
        {/* For Customer */}
        <MenuItem href={`/${locale}/apps/customer`} icon={<i className='tabler-user-square' />}>
          Customer
        </MenuItem>

        {/* <SubMenu label={dictionary['navigation'].invoice} icon={<i className='tabler-file-description' />}>
          <MenuItem href={`/${locale}/apps/invoice/list`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/invoice/preview/${id || '4987'}`}>
            {dictionary['navigation'].preview}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/invoice/edit/${id || '4987'}`}>{dictionary['navigation'].edit}</MenuItem>
          <MenuItem href={`/${locale}/apps/invoice/add`}>{dictionary['navigation'].add}</MenuItem>
        </SubMenu> */}

        <SubMenu label='Items' icon={<i className='tabler-menu-2' />}>
          <MenuItem href={`/${locale}/apps/user/list`}>List Food</MenuItem>
          <MenuItem href={`/${locale}/apps/user/view`}>List Category</MenuItem>
        </SubMenu>

        <SubMenu label={dictionary['navigation'].rolesPermissions} icon={<i className='tabler-lock' />}>
          <MenuItem href={`/${locale}/apps/roles`}>{dictionary['navigation'].roles}</MenuItem>
          <MenuItem href={`/${locale}/apps/permissions`}>{dictionary['navigation'].permissions}</MenuItem>
        </SubMenu>
      </Menu>

      {/* <Menu
          popoutMenuOffset={{ mainAxis: 23 }}
          menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
          renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
          renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
          menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
        >
          <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
        </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
