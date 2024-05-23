'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

// Styled Component Imports
import StyledHeader from '@layouts/styles/vertical/StyledHeader'

const Navbar = props => {
  // Props
  const { children, overrideStyles } = props

  // Hooks
  const { settings } = useSettings()
  const theme = useTheme()

  // Vars
  const { navbarContentWidth } = settings
  const headerFixed = themeConfig.navbar.type === 'fixed'
  const headerStatic = themeConfig.navbar.type === 'static'
  const headerFloating = themeConfig.navbar.floating === true
  const headerDetached = themeConfig.navbar.detached === true
  const headerAttached = themeConfig.navbar.detached === false
  const headerBlur = themeConfig.navbar.blur === true
  const headerContentCompact = navbarContentWidth === 'compact'
  const headerContentWide = navbarContentWidth === 'wide'

  return (
    <StyledHeader
      theme={theme}
      overrideStyles={overrideStyles}
<<<<<<< HEAD
      className={classnames(verticalLayoutClasses.header, ' items-center justify-center is-full hidden', {
=======
      className={classnames(verticalLayoutClasses.header, 'flex items-center justify-center is-full', {
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
        [verticalLayoutClasses.headerFixed]: headerFixed,
        [verticalLayoutClasses.headerStatic]: headerStatic,
        [verticalLayoutClasses.headerFloating]: headerFloating,
        [verticalLayoutClasses.headerDetached]: !headerFloating && headerDetached,
        [verticalLayoutClasses.headerAttached]: !headerFloating && headerAttached,
        [verticalLayoutClasses.headerBlur]: headerBlur,
        [verticalLayoutClasses.headerContentCompact]: headerContentCompact,
        [verticalLayoutClasses.headerContentWide]: headerContentWide
      })}
    >
      <div className={classnames(verticalLayoutClasses.navbar, 'flex bs-full')}>{children}</div>
    </StyledHeader>
  )
}

export default Navbar
